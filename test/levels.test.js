import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as GFX from '../src/vendor/gfx/index.js';
import { createDelve } from '../src/delve.js';
import { LEVELS, loadLevel } from '../src/levels.js';
import { MONSTERS } from '../src/monsters.js';
import { drive, graph, plan } from './helpers/autopilot.js';

const exitsOf = (level) => {
  const out = [];
  for (let z = 0; z < level.rows; z++) for (let x = 0; x < level.cols; x++) if (level.cell(x, z)?.kind === 'exit') out.push([x, z]);
  return out;
};

for (const [i, make] of LEVELS.entries()) {
  const level = make();

  test(`${level.name}: starts on safe ground, one level deeper than the last, and has stairs down`, () => {
    assert.ok(level.isSafe(level.start.x, level.start.z));
    assert.equal(level.depth, i + 1);
    assert.ok(exitsOf(level).length > 0);
  });

  test(`${level.name}: everything in it stands on the floor`, () => {
    const floor = (x, z) => {
      const c = level.cell(Math.floor(x), Math.floor(z));
      return c && c.kind !== 'wall' && c.kind !== 'lava';
    };
    for (const m of level.mobs) {
      assert.ok(MONSTERS[m.kind], `no such monster as ${m.kind}`);
      assert.ok(floor(m.x, m.z), `${m.kind} at ${m.x},${m.z}`);
      if (MONSTERS[m.kind].move === 'crawl') for (const [x, z] of m.path) assert.ok(floor(x, z), `${m.kind}'s path at ${x},${z}`);
    }
    for (const p of level.pickups) assert.ok(floor(p.x, p.z), `${p.kind} at ${p.x},${p.z}`);
    for (const h of [...level.crushers, ...level.spikes, ...level.doors]) {
      for (let z = h.z; z < h.z + h.d; z++) for (let x = h.x; x < h.x + h.w; x++) assert.ok(floor(x + 0.5, z + 0.5), `trap or gate at ${x},${z}`);
    }
  });

  test(`${level.name}: a key for every gate, and the stairs can be reached`, () => {
    const keys = level.pickups.filter((p) => p.kind === 'key').length;
    assert.equal(keys, level.doors.length);
    // Every gate shut and no keys: the keys can be reached, in order; then the stairs, with them.
    const delve = createDelve(GFX, i);
    const net = graph(level);
    let at = [level.start.x, level.start.z];
    let held = 0;
    for (const k of level.pickups.filter((p) => p.kind === 'key')) {
      const to = [Math.floor(k.x), Math.floor(k.z)];
      assert.ok(plan(delve, net, at, to, held), `no way to the key at ${to}`);
      at = to;
      held++;
    }
    const exit = exitsOf(level)[0];
    assert.ok(plan(delve, net, at, exit, held), 'no way to the stairs');
    if (level.doors.length) assert.equal(plan(delve, net, [level.start.x, level.start.z], exit, 0), null, 'the gates can be got round');
  });

  test(`${level.name}: the autopilot gets the party down the stairs alive, without losing the die`, () => {
    const result = drive(i);
    assert.ok(result.finished, `stuck: ${JSON.stringify(result.stuck)} after ${result.time.toFixed(1)}s`);
    assert.equal(result.losses.length, 0, JSON.stringify(result.losses));
    assert.equal(result.harms.length, 0, JSON.stringify(result.harms));
    assert.ok(result.party.heroes.some((h) => h.hp > 0));
    assert.ok(result.fights.length >= 5, `only ${result.fights.length} fights`);
    // Long: a good deal longer than a Madness race, even going straight there.
    assert.ok(result.time > 60, `over in ${result.time.toFixed(1)}s`);
  });
}

test('each level goes deeper than the one before, and the last one has a dragon in it', () => {
  const levels = LEVELS.map((_, i) => loadLevel(i));
  for (let i = 1; i < levels.length; i++) assert.ok(levels[i].depth > levels[i - 1].depth);
  assert.ok(levels.at(-1).mobs.some((m) => MONSTERS[m.kind].boss));
});
