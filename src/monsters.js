import { CAST } from './models/cast/index.js';
import { isBaked, ready } from './models/library.js';
import { BUILT, standUp } from './models/looks.js';

/**
 * What lives down there. Each kind has how it gets about — `walk` (pushed
 * over the floor like the die is, and after it when it comes near),
 * `crawl` (round a set loop on the floor) or `fly` (round a set loop in the
 * air, over gaps and all) — and what it is like to fight: `dc`, the roll the
 * party needs to beat it cleanly, `power`, how hard it hits back, and the
 * gold it was carrying.
 *
 * And how each one looks: a handful of plain shapes, built here, with an
 * `animate` that bobs, waddles or flaps it.
 */

export const MONSTERS = Object.freeze({
  rat: { name: 'Giant Rat', move: 'walk', dc: 6, power: 3, gold: 4, radius: 0.26, speed: 4.2 },
  skeleton: { name: 'Skeleton', move: 'walk', dc: 10, power: 5, gold: 12, radius: 0.32, speed: 3 },
  goblin: { name: 'Goblin', move: 'walk', dc: 9, power: 4, gold: 10, radius: 0.3, speed: 3.8 },
  orc: { name: 'Orc Brute', move: 'walk', dc: 13, power: 6, gold: 25, radius: 0.4, speed: 2.6 },
  slime: { name: 'Slime', move: 'crawl', dc: 8, power: 4, gold: 8, radius: 0.42, speed: 1.4 },
  egg: { name: 'Eggdreessen', move: 'walk', dc: 16, power: 10, gold: 200, radius: 0.8, speed: 1.2, boss: true },
  rock: { name: 'Boulder', move: 'walk', dc: 12, power: 5, gold: 16, radius: 0.4, speed: 2.2 },
  bat: { name: 'Cave Bat', move: 'fly', dc: 7, power: 2, gold: 5, radius: 0.28, speed: 2.4 },
  wraith: { name: 'Wraith', move: 'fly', dc: 14, power: 6, gold: 30, radius: 0.34, speed: 1.8 },
  dragon: { name: 'Red Dragon', move: 'walk', dc: 17, power: 12, gold: 250, radius: 0.85, speed: 1.4, boss: true },
});

/** How high a flyer goes over the floor where its loop starts. */
export const FLIGHT = 0.75;

const materials = new Map();

function material(GFX, name, colour, { emissive = null, glow = 0, roughness = 0.6, metalness = 0, opacity = 1 } = {}) {
  const key = `${name}`;
  if (materials.has(key)) return materials.get(key);
  const m = new GFX.MeshStandardMaterial({
    name, color: new GFX.Color(colour), roughness, metalness,
    emissive: new GFX.Color(emissive ?? '#000000'), emissiveIntensity: glow,
  });
  if (opacity < 1) { m.transparent = true; m.opacity = opacity; m.depthWrite = false; }
  materials.set(key, m);
  return m;
}

const eyes = (GFX, colour, size, apart, at, group) => {
  const glow = material(GFX, `eye-${colour}`, colour, { emissive: colour, glow: 2.2 });
  for (const side of [-1, 1]) {
    const e = new GFX.Mesh(new GFX.SphereGeometry(size, 10, 8), glow);
    e.position.set(at[0] + side * apart, at[1], at[2]);
    group.add(e);
  }
};

const sphere = (GFX, r, mat, [x, y, z], [sx, sy, sz] = [1, 1, 1], parent) => {
  const m = new GFX.Mesh(new GFX.SphereGeometry(r, 18, 12), mat);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  parent.add(m);
  return m;
};

const rod = (GFX, r, length, mat, [x, y, z], [rx, ry, rz] = [0, 0, 0], parent) => {
  const m = new GFX.Mesh(new GFX.CylinderGeometry(r, r, length, 8), mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  parent.add(m);
  return m;
};

const cone = (GFX, r, length, mat, [x, y, z], [rx, ry, rz] = [0, 0, 0], parent) => {
  const m = new GFX.Mesh(new GFX.ConeGeometry(r, length, 10), mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  parent.add(m);
  return m;
};

/**
 * A flat wing out to `side` (1 or −1): a triangle fan from the shoulder, both
 * faces of it, so it is lit from above and below and either way round.
 */
function wing(GFX, span, chord, mat, side = 1) {
  const p = [0, 0, 0, span * side, 0.05, -chord * 0.2, span * 0.75 * side, 0, chord * 0.55, span * 0.4 * side, 0, chord * 0.75, 0, 0, chord * 0.4];
  const fan = side > 0 ? [0, 1, 2, 0, 2, 3, 0, 3, 4] : [0, 2, 1, 0, 3, 2, 0, 4, 3];
  const idx = [...fan, ...fan.slice().reverse()];
  const position = new Float32Array(idx.flatMap((i) => [p[i * 3], p[i * 3 + 1], p[i * 3 + 2]]));
  const g = new GFX.BufferGeometry();
  g.setAttribute('position', new GFX.BufferAttribute(position, 3));
  g.computeVertexNormals();
  const m = new GFX.Mesh(g, mat);
  return m;
}

/** How finely the monsters on the board are meshed: half the grid of a close-up. */
export const BOARD_DETAIL = 0.5;

/**
 * A monster to look at, standing on (0, 0, 0) and facing +z (a flyer's
 * (0, 0, 0) is its middle). `animate(t, moving)` makes it live; `body` is
 * the part that turns to face the way it goes.
 *
 * Each is its sculpted model (`models/cast/`), baked in the background as
 * the page loads; until its bake comes in, it isn't there. A kind with no
 * sculpt yet is the old handful of plain shapes.
 */
export function createMonsterMesh(GFX, kind, { seed = 0 } = {}) {
  if (BUILT[kind]) return createBuiltMesh(GFX, kind, seed);
  if (CAST[kind]) return createSculptedMesh(GFX, kind);
  return createPlainMesh(GFX, kind);
}

/** One of the creatures ported from their own projects (the slime...): there from the start. */
function createBuiltMesh(GFX, kind, seed) {
  const group = new GFX.Group();
  group.name = kind;
  const body = new GFX.Group();
  group.add(body);
  const look = standUp(GFX, kind, { detail: BOARD_DETAIL, hue: seed });
  body.add(look.group);
  let clip = 'idle', since = 0;
  return {
    group,
    body,
    look,
    animate(t, moving, { chasing = false, pace } = {}) {
      const next = moving ? 'walk' : 'idle';
      if (next !== clip) { clip = next; since = t; }
      look.pose({ clip, t: t - since, time: t, speed: chasing ? 1 : 0.6, pace });
    },
  };
}

function createSculptedMesh(GFX, kind) {
  const group = new GFX.Group();
  group.name = kind;
  const body = new GFX.Group();
  group.add(body);
  let model = null;
  const attach = () => {
    model = standUp(GFX, kind, { detail: BOARD_DETAIL });
    body.add(model.group);
  };
  if (isBaked(kind, BOARD_DETAIL)) attach();
  else if (typeof window !== 'undefined') ready(kind, BOARD_DETAIL).then(attach);
  let clip = 'idle', since = 0, last = 0;
  return {
    group,
    body,
    animate(t, moving, { chasing = false } = {}) {
      if (!model) return;
      const next = moving ? 'walk' : 'idle';
      if (next !== clip) { clip = next; since = t; }
      // Hurrying when it is after the die.
      model.pose({ clip, t: t - since, time: t, speed: chasing ? 1 : 0.6 });
      last = t;
    },
    get posedAt() { return last; },
  };
}

function createPlainMesh(GFX, kind) {
  const group = new GFX.Group();
  group.name = kind;
  const body = new GFX.Group();
  group.add(body);
  let animate = () => {};

  if (kind === 'rat') {
    const fur = material(GFX, 'rat-fur', '#6b5b52', { roughness: 0.9 });
    const pink = material(GFX, 'rat-pink', '#d99a9a', { roughness: 0.7 });
    sphere(GFX, 0.2, fur, [0, 0.17, -0.04], [0.9, 0.8, 1.45], body);
    const head = sphere(GFX, 0.12, fur, [0, 0.2, 0.25], [0.9, 0.85, 1.3], body);
    sphere(GFX, 0.05, pink, [-0.08, 0.31, 0.2], [1, 1, 0.4], body);
    sphere(GFX, 0.05, pink, [0.08, 0.31, 0.2], [1, 1, 0.4], body);
    sphere(GFX, 0.025, pink, [0, 0.2, 0.4], [1, 1, 1], body);
    eyes(GFX, '#ff3b2f', 0.022, 0.055, [0, 0.25, 0.34], body);
    const tail = rod(GFX, 0.018, 0.5, pink, [0, 0.12, -0.45], [Math.PI / 2 + 0.3, 0, 0], body);
    animate = (t, moving) => {
      const k = moving ? 1 : 0.25;
      body.position.y = Math.abs(Math.sin(t * 18)) * 0.03 * k;
      tail.rotation.z = Math.sin(t * 9) * 0.5;
      head.rotation.x = Math.sin(t * 5) * 0.1;
    };
  } else if (kind === 'skeleton') {
    const bone = material(GFX, 'bone', '#e6dcc4', { roughness: 0.55 });
    const dark = material(GFX, 'socket', '#14100c', { roughness: 0.9 });
    const legs = [];
    for (const side of [-1, 1]) legs.push(rod(GFX, 0.028, 0.32, bone, [side * 0.08, 0.16, 0], [0, 0, 0], body));
    sphere(GFX, 0.07, bone, [0, 0.34, 0], [1.4, 0.6, 0.9], body);
    rod(GFX, 0.025, 0.24, bone, [0, 0.46, 0], [0, 0, 0], body);
    for (let i = 0; i < 3; i++) {
      const rib = new GFX.Mesh(new GFX.TorusGeometry(0.1 - i * 0.012, 0.014, 6, 16), bone);
      rib.position.set(0, 0.5 + i * 0.055, 0.01);
      rib.rotation.x = Math.PI / 2;
      rib.scale.set(1, 0.75, 1);
      body.add(rib);
    }
    const arms = [];
    for (const side of [-1, 1]) arms.push(rod(GFX, 0.022, 0.3, bone, [side * 0.15, 0.5, 0.02], [0.2, 0, side * 0.25], body));
    const skull = sphere(GFX, 0.1, bone, [0, 0.74, 0.01], [1, 1.05, 1.05], body);
    sphere(GFX, 0.06, bone, [0, 0.66, 0.05], [1.2, 0.6, 1], body);
    for (const side of [-1, 1]) sphere(GFX, 0.028, dark, [side * 0.04, 0.75, 0.09], [1, 1, 0.6], body);
    eyes(GFX, '#ff4a2a', 0.012, 0.04, [0, 0.75, 0.105], body);
    animate = (t, moving) => {
      const k = moving ? 1 : 0.15;
      legs[0].rotation.x = Math.sin(t * 10) * 0.5 * k;
      legs[1].rotation.x = -Math.sin(t * 10) * 0.5 * k;
      arms[0].rotation.x = 0.2 - Math.sin(t * 10) * 0.6 * k;
      arms[1].rotation.x = 0.2 + Math.sin(t * 10) * 0.6 * k;
      skull.rotation.z = Math.sin(t * 2.3) * 0.12;
      body.position.y = Math.abs(Math.sin(t * 10)) * 0.025 * k;
    };
  } else if (kind === 'goblin' || kind === 'orc') {
    const orc = kind === 'orc';
    const s = orc ? 1.35 : 1;
    const skin = material(GFX, `${kind}-skin`, orc ? '#6f8a4e' : '#7fb24a', { roughness: 0.7 });
    const cloth = material(GFX, `${kind}-cloth`, orc ? '#4a3426' : '#6b3e2a', { roughness: 0.9 });
    const metal = material(GFX, 'iron', '#8d9099', { roughness: 0.35, metalness: 0.8 });
    const legs = [];
    for (const side of [-1, 1]) legs.push(rod(GFX, 0.04 * s, 0.2 * s, cloth, [side * 0.07 * s, 0.1 * s, 0], [0, 0, 0], body));
    sphere(GFX, 0.15 * s, cloth, [0, 0.3 * s, 0], [1, 1.1, 0.85], body);
    const head = sphere(GFX, 0.13 * s, skin, [0, 0.52 * s, 0.03], [1, 0.95, 1], body);
    for (const side of [-1, 1]) {
      if (orc) cone(GFX, 0.018 * s, 0.07 * s, material(GFX, 'tusk', '#efe6cf'), [side * 0.05 * s, 0.47 * s, 0.14 * s], [-0.4, 0, 0], body);
      else cone(GFX, 0.04, 0.16, skin, [side * 0.15, 0.56, 0.02], [0, 0, side * -1.35], body);
    }
    eyes(GFX, orc ? '#ff6a1a' : '#ffd23a', 0.02 * s, 0.05 * s, [0, 0.55 * s, 0.14 * s], body);
    const arm = rod(GFX, 0.035 * s, 0.22 * s, skin, [0.17 * s, 0.33 * s, 0.04], [0.3, 0, 0.3], body);
    const weapon = orc
      ? rod(GFX, 0.045 * s, 0.38 * s, material(GFX, 'club', '#5a4030', { roughness: 0.9 }), [0.22 * s, 0.38 * s, 0.14 * s], [0.9, 0, 0], body)
      : cone(GFX, 0.025, 0.2, metal, [0.21, 0.33, 0.16], [1.3, 0, 0], body);
    if (orc) for (const side of [-1, 1]) sphere(GFX, 0.07 * s, metal, [side * 0.15 * s, 0.42 * s, 0], [1, 0.6, 1], body);
    animate = (t, moving) => {
      const k = moving ? 1 : 0.2;
      const pace = orc ? 7 : 11;
      legs[0].rotation.x = Math.sin(t * pace) * 0.6 * k;
      legs[1].rotation.x = -Math.sin(t * pace) * 0.6 * k;
      body.rotation.z = Math.sin(t * pace) * 0.06 * k;
      head.rotation.y = Math.sin(t * 1.7) * 0.3;
      arm.rotation.x = 0.3 + Math.sin(t * pace) * 0.4 * k;
      weapon.rotation.x = (orc ? 0.9 : 1.3) + Math.sin(t * pace) * 0.4 * k;
    };
  } else if (kind === 'bat') {
    const hide = material(GFX, 'bat', '#3a2c3e', { roughness: 0.8 });
    const membrane = new GFX.MeshStandardMaterial({ name: 'bat-wing', color: new GFX.Color('#4b3550'), roughness: 0.8 });
    sphere(GFX, 0.1, hide, [0, 0, 0], [1, 1, 1.2], body);
    sphere(GFX, 0.07, hide, [0, 0.05, 0.1], [1, 1, 1], body);
    for (const side of [-1, 1]) cone(GFX, 0.025, 0.08, hide, [side * 0.04, 0.12, 0.09], [0, 0, 0], body);
    eyes(GFX, '#ff3b2f', 0.016, 0.03, [0, 0.07, 0.16], body);
    const wings = [-1, 1].map((side) => {
      const w = wing(GFX, 0.42, 0.3, membrane, side);
      w.position.set(side * 0.06, 0, -0.08);
      body.add(w);
      return w;
    });
    animate = (t) => {
      const flap = Math.sin(t * 16);
      wings[0].rotation.z = -flap * 0.7;
      wings[1].rotation.z = flap * 0.7;
      body.position.y = Math.sin(t * 16) * 0.04;
    };
  } else if (kind === 'wraith') {
    const shroud = material(GFX, 'wraith', '#7d93b8', { emissive: '#4a7ab8', glow: 0.9, roughness: 0.8, opacity: 0.72 });
    const robe = new GFX.Mesh(new GFX.ConeGeometry(0.28, 0.75, 16, 1, true), shroud);
    robe.position.y = 0.05;
    robe.material.side = GFX.DoubleSide;
    body.add(robe);
    const hood = sphere(GFX, 0.15, shroud, [0, 0.42, 0], [1, 1.15, 1], body);
    eyes(GFX, '#9fe8ff', 0.022, 0.05, [0, 0.43, 0.12], body);
    const arms = [-1, 1].map((side) => cone(GFX, 0.05, 0.36, shroud, [side * 0.22, 0.2, 0.1], [1.1, 0, side * 0.4], body));
    animate = (t) => {
      body.position.y = Math.sin(t * 2.2) * 0.07;
      body.rotation.z = Math.sin(t * 1.3) * 0.06;
      arms[0].rotation.x = 1.1 + Math.sin(t * 3) * 0.25;
      arms[1].rotation.x = 1.1 - Math.sin(t * 3) * 0.25;
      hood.rotation.y = Math.sin(t * 0.9) * 0.3;
    };
  } else if (kind === 'dragon') {
    const scales = material(GFX, 'dragon', '#a8261c', { roughness: 0.45, metalness: 0.2 });
    const belly = material(GFX, 'dragon-belly', '#e0a050', { roughness: 0.6 });
    const horn = material(GFX, 'horn', '#e8dcc0', { roughness: 0.5 });
    const membrane = new GFX.MeshStandardMaterial({ name: 'dragon-wing', color: new GFX.Color('#7a1c18'), roughness: 0.7 });
    sphere(GFX, 0.55, scales, [0, 0.62, -0.1], [1, 0.85, 1.35], body);
    sphere(GFX, 0.42, belly, [0, 0.52, 0.12], [0.85, 0.7, 1.1], body);
    for (const [x, z] of [[-0.35, 0.3], [0.35, 0.3], [-0.35, -0.5], [0.35, -0.5]]) rod(GFX, 0.11, 0.4, scales, [x, 0.2, z], [0, 0, 0], body);
    const neck = rod(GFX, 0.18, 0.6, scales, [0, 1.0, 0.45], [0.7, 0, 0], body);
    const head = new GFX.Group();
    head.position.set(0, 1.28, 0.72);
    body.add(head);
    sphere(GFX, 0.24, scales, [0, 0, 0], [1, 0.85, 1.3], head);
    sphere(GFX, 0.15, scales, [0, -0.05, 0.28], [1, 0.7, 1.2], head);
    for (const side of [-1, 1]) cone(GFX, 0.05, 0.32, horn, [side * 0.13, 0.2, -0.12], [-0.9, 0, side * -0.3], head);
    eyes(GFX, '#ffd23a', 0.04, 0.12, [0, 0.07, 0.24], head);
    const tail = cone(GFX, 0.16, 1.1, scales, [0, 0.45, -1.05], [-Math.PI / 2 - 0.2, 0, 0], body);
    const wings = [-1, 1].map((side) => {
      const w = wing(GFX, 1.25, 0.95, membrane, side);
      w.position.set(side * 0.35, 0.95, -0.3);
      body.add(w);
      return w;
    });
    animate = (t) => {
      const breathe = Math.sin(t * 1.4);
      wings[0].rotation.z = -0.45 - breathe * 0.25;
      wings[1].rotation.z = 0.45 + breathe * 0.25;
      head.rotation.y = Math.sin(t * 0.7) * 0.35;
      head.rotation.x = Math.sin(t * 1.1) * 0.12;
      neck.rotation.x = 0.7 + breathe * 0.05;
      tail.rotation.y = Math.sin(t * 1.2) * 0.4;
      body.position.y = breathe * 0.02;
    };
  }

  group.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return { group, body, animate };
}
