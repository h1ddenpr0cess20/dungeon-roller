import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as GFX from '../src/vendor/gfx/index.js';
import { CAST } from '../src/models/cast/index.js';
import { BUILT, standUp } from '../src/models/looks.js';
import { bake, createModel } from '../src/models/model.js';
import { Sculpt, build } from '../src/models/sdf.js';
import { Skeleton } from '../src/models/rig.js';

test('a sculpted ball meshes into a closed ball of the right size, its normals pointing out', () => {
  const s = new Sculpt().sphere([0, 0, 0], 0.2);
  const m = build(s, { cell: 0.02 });
  for (let v = 0; v < m.count; v++) {
    const p = [m.position[v * 3], m.position[v * 3 + 1], m.position[v * 3 + 2]];
    const r = Math.hypot(...p);
    assert.ok(Math.abs(r - 0.2) < 0.002, `vertex ${v} at radius ${r}`);
    const n = [m.normal[v * 3], m.normal[v * 3 + 1], m.normal[v * 3 + 2]];
    assert.ok((p[0] * n[0] + p[1] * n[1] + p[2] * n[2]) / r > 0.98);
  }
  // Closed: every edge is shared by exactly two triangles.
  const edges = new Map();
  for (let t = 0; t < m.index.length; t += 3) {
    for (let e = 0; e < 3; e++) {
      const a = m.index[t + e], b = m.index[t + (e + 1) % 3];
      const k = a < b ? `${a},${b}` : `${b},${a}`;
      edges.set(k, (edges.get(k) ?? 0) + 1);
    }
  }
  for (const [k, n] of edges) assert.equal(n, 2, `edge ${k}`);
});

test('a bone turned about its pivot carries its skin round with it', () => {
  const k = new Skeleton([['root', null, [0, 0, 0]], ['arm', 'root', [1, 0, 0]]]);
  k.turn('arm', 0, 0, Math.PI / 2);
  k.compute();
  const p = k.point('arm', [2, 0, 0]);
  assert.ok(Math.hypot(p[0] - 1, p[1] - 1, p[2]) < 1e-6, `got ${p}`);
});

for (const [name, def] of Object.entries(CAST)) {
  test(`${name}: bakes for the board within budget, every vertex fully weighted to real bones, and every clip poses it`, () => {
    const m = bake(def, { detail: 0.5 });
    assert.ok(m.count > 500 && m.count < (def.budget ?? 9000), `${m.count} vertices`);
    for (let v = 0; v < m.count; v++) {
      let w = 0;
      for (let i = 0; i < 4; i++) {
        w += m.skinWeight[v * 4 + i];
        assert.ok(m.skinIndex[v * 4 + i] < def.bones.length);
      }
      assert.ok(Math.abs(w - 1) < 1e-4, `vertex ${v} weighs ${w}`);
    }
    const model = createModel(GFX, def, { detail: 0.5 });
    const position = model.mesh.geometry.attributes.position.array;
    for (const clip of ['idle', 'walk', 'attack', 'hit', 'ko']) {
      for (const t of [0, 0.3, 1.2]) {
        model.pose({ clip, t, time: t, seed: 0, speed: 1 });
        for (let i = 0; i < position.length; i++) assert.ok(Number.isFinite(position[i]), `${clip} at ${t}`);
      }
    }
  });
}

/** The lowest vertex of everything under `group`, where it is in the world (a turned box's corners would dip lower than the thing does). */
function lowest(group) {
  let low = Infinity;
  const v = new GFX.Vector3();
  group.traverse((o) => {
    const p = o.geometry?.attributes?.position;
    if (!p || !o.visible) return;
    for (let i = 0; i < p.count; i++) low = Math.min(low, v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld).y);
  });
  return low;
}

for (const name of Object.keys(BUILT)) {
  test(`${name}: built from its own project, stands on the floor and poses through every clip`, () => {
    const look = standUp(GFX, name, { detail: 0.5 });
    for (const clip of ['idle', 'walk', 'attack', 'hit', 'ko']) {
      for (let t = 0; t <= 1; t += 1 / 30) look.pose({ clip, t, time: t, seed: 0, speed: 1 });
      look.group.updateMatrixWorld(true);
      const low = lowest(look.group);
      assert.ok(Number.isFinite(low), `${clip}: ${low}`);
      if (clip !== 'attack') assert.ok(low > -0.15, `${clip}: dips to ${low}`);
    }
  });
}
