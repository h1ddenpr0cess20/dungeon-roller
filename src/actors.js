import { createMonsterMesh, FLIGHT, KNOCKED_OUT, MONSTERS } from './monsters.js';
import { collideBalls, createBall, PUSH, stepBall } from './physics.js';
import { stoneTexture } from './scenery.js';
import { isBaked, ready } from './models/library.js';
import { createStatic } from './models/model.js';
import { PROPS } from './models/props/index.js';

/**
 * Everything in a dungeon that moves or can be taken, and isn't the die:
 * monsters, crushers (stone blocks that slam down on the path), spikes (out
 * of the floor for a moment, now and then), lifts (platforms over the dark
 * and down shafts), portcullises (a key lifts them), and what lies about —
 * gold, chests, potions and keys.
 */

const CRUSHER_HEIGHT = 0.9;
const LIFT_THICKNESS = 0.5;
const DOOR_HEIGHT = 1.5;
const DOOR_THICKNESS = 0.18;

/** Further than this from the die, a monster with nothing to do stops being simulated. */
const SLEEP = 26;

/** Pickups that lie on the floor rather than float. */
const STILL = new Set(['chest', 'gold']);

const smooth = (t) => t * t * (3 - 2 * t);
const cycleOf = (time, period, phase) => ((((time + phase) / period) % 1) + 1) % 1;

/**
 * How far up a crusher is, from 0 (down on the path) to 1 (all the way up):
 * a slow climb, a wait at the top, a slam, and a wait at the bottom.
 */
export function hammerAt(time, period, phase = 0) {
  const u = cycleOf(time, period, phase);
  if (u < 0.5) return smooth(u / 0.5);
  if (u < 0.78) return 1;
  if (u < 0.84) {
    const t = (u - 0.78) / 0.06;
    return 1 - t * t;
  }
  return 0;
}

/** How far out spikes are, 0 (in the floor) to 1: a quick stab out, a moment out, back in. */
export function spikesAt(time, period, phase = 0) {
  const u = cycleOf(time, period, phase);
  if (u < 0.6) return 0;
  if (u < 0.65) return smooth((u - 0.6) / 0.05);
  if (u < 0.85) return 1;
  if (u < 0.92) return 1 - smooth((u - 0.85) / 0.07);
  return 0;
}

/** How far along its run a lift is, 0 to 1 and back, waiting `pause` (of a period) at each end. */
export function liftAt(time, period, phase = 0, pause = 0.18) {
  const u = cycleOf(time, period, phase);
  const run = 0.5 - pause;
  if (u < pause) return 0;
  if (u < 0.5) return smooth((u - pause) / run);
  if (u < 0.5 + pause) return 1;
  return 1 - smooth((u - 0.5 - pause) / run);
}

/** Where along a closed loop of points something is, `distance` round it. */
export function alongLoop(points, distance) {
  const legs = points.map((p, i) => {
    const q = points[(i + 1) % points.length];
    return { p, q, length: Math.hypot(q[0] - p[0], q[1] - p[1]) };
  });
  const total = legs.reduce((sum, l) => sum + l.length, 0) || 1;
  let d = ((distance % total) + total) % total;
  for (const leg of legs) {
    if (d <= leg.length) {
      const t = leg.length ? d / leg.length : 0;
      return [leg.p[0] + (leg.q[0] - leg.p[0]) * t, leg.p[1] + (leg.q[1] - leg.p[1]) * t];
    }
    d -= leg.length;
  }
  return points[0];
}

/** The highest floor under a rectangle of tiles. */
function floorUnder(dungeon, x, z, w, d) {
  let top = -Infinity;
  for (let j = z; j < z + d; j++) {
    for (let i = x; i < x + w; i++) {
      const c = dungeon.cell(i, j);
      if (c) top = Math.max(top, ...c.h);
    }
  }
  return top;
}

export function createActors(GFX, dungeon, world, { killY }) {
  const group = new GFX.Group();
  group.name = 'actors';
  const stone = stoneTexture(GFX);

  // Monsters.
  const mobs = dungeon.mobs.map((m, i) => {
    const kind = MONSTERS[m.kind];
    if (!kind) throw new Error(`${dungeon.name}: no such monster as ${m.kind}`);
    const look = createMonsterMesh(GFX, m.kind, { seed: i });
    look.group.rotation.y = m.facing ?? 0;
    group.add(look.group);
    const ground = dungeon.heightAt(m.x, m.z) ?? 0;
    const mob = {
      ...m, i, stats: kind, look, heading: m.facing ?? 0, moving: false, dead: false, gone: false, chasing: false,
      home: [m.x, ground + kind.radius, m.z], leg: 0, travelled: 0,
      x: m.x, y: ground, z: m.z,
    };
    if (kind.move === 'walk') {
      mob.ball = createBall({ x: m.x, y: ground + kind.radius, z: m.z, r: kind.radius, mass: kind.boss ? 50 : 2.5 });
      mob.ball.grounded = true;
    } else {
      if (!m.path) throw new Error(`${dungeon.name}: a ${m.kind} needs a path`);
      mob.flight = ground + FLIGHT;
    }
    return mob;
  });
  const walkers = mobs.filter((m) => m.ball);

  // Crushers: stone, with iron teeth underneath and a chain up into the dark.
  const blockMaterial = new GFX.MeshStandardMaterial({ name: 'crusher', color: new GFX.Color('#8a8580'), map: stone.map, bumpMap: stone.bump, bumpScale: 2, roughness: 0.85 });
  const ironMaterial = new GFX.MeshStandardMaterial({ name: 'iron', color: new GFX.Color('#5d5f66'), roughness: 0.4, metalness: 0.85 });
  const crushers = dungeon.crushers.map((h) => {
    const base = floorUnder(dungeon, h.x, h.z, h.w, h.d);
    const inset = 0.06;
    const box = {
      solid: true, kind: 'crusher', vx: 0, vy: 0, vz: 0,
      min: [h.x + inset, base, h.z + inset], max: [h.x + h.w - inset, base + CRUSHER_HEIGHT, h.z + h.d - inset],
    };
    const head = new GFX.Mesh(new GFX.BoxGeometry(h.w - inset * 2, CRUSHER_HEIGHT, h.d - inset * 2), blockMaterial);
    for (let j = 0; j < h.d * 2; j++) {
      for (let i = 0; i < h.w * 2; i++) {
        const tooth = new GFX.Mesh(new GFX.ConeGeometry(0.1, 0.16, 6), ironMaterial);
        tooth.rotation.x = Math.PI;
        tooth.position.set(-h.w / 2 + 0.25 + i * 0.5, -CRUSHER_HEIGHT / 2 - 0.06, -h.d / 2 + 0.25 + j * 0.5);
        head.add(tooth);
      }
    }
    const chain = new GFX.Mesh(new GFX.CylinderGeometry(0.06, 0.06, 7, 8), ironMaterial);
    chain.position.y = CRUSHER_HEIGHT / 2 + 3.5;
    head.add(chain);
    head.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    head.receiveShadow = true;
    group.add(head);
    return { ...h, base, box, mesh: head };
  });

  // Spikes: a bed of iron points in each tile, hidden in the floor until they stab.
  const spikeGeometry = new GFX.ConeGeometry(0.07, 0.42, 6);
  const spikes = dungeon.spikes.map((s) => {
    const base = floorUnder(dungeon, s.x, s.z, s.w, s.d);
    const bed = new GFX.Group();
    for (let j = 0; j < s.d * 3; j++) {
      for (let i = 0; i < s.w * 3; i++) {
        const p = new GFX.Mesh(spikeGeometry, ironMaterial);
        p.position.set(s.x + (i + 0.5) / 3, 0, s.z + (j + 0.5) / 3);
        p.castShadow = true;
        bed.add(p);
      }
    }
    group.add(bed);
    return { ...s, base, mesh: bed, out: 0, struck: -1 };
  });

  // Lifts.
  const lifts = dungeon.lifts.map((l) => {
    const material = new GFX.MeshStandardMaterial({
      name: 'lift', color: new GFX.Color(dungeon.palette.lift ?? '#8c8478'),
      map: stone.map, bumpMap: stone.bump, bumpScale: 1.5, roughness: 0.8,
    });
    const mesh = new GFX.Mesh(new GFX.BoxGeometry(l.w, LIFT_THICKNESS, l.d), material);
    mesh.castShadow = mesh.receiveShadow = true;
    // Chains at the corners, up into the dark.
    for (const [cx, cz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const chain = new GFX.Mesh(new GFX.CylinderGeometry(0.03, 0.03, 9, 6), ironMaterial);
      chain.position.set(cx * (l.w / 2 - 0.12), 4.5, cz * (l.d / 2 - 0.12));
      mesh.add(chain);
    }
    group.add(mesh);
    const box = {
      solid: true, kind: 'lift', vx: 0, vy: 0, vz: 0,
      min: [l.x, l.h - LIFT_THICKNESS, l.z], max: [l.x + l.w, l.h, l.z + l.d],
    };
    return { ...l, box, mesh };
  });

  // Portcullises: a grid of iron bars across the way, which lift when a key is used on them.
  const doors = dungeon.doors.map((g) => {
    const base = floorUnder(dungeon, g.x, g.z, g.w, g.d);
    const across = g.axis === 'x' ? 'z' : 'x';
    const cx = g.x + g.w / 2, cz = g.z + g.d / 2;
    const span = across === 'x' ? g.w : g.d;
    const box = {
      solid: true, kind: 'door', vx: 0, vy: 0, vz: 0,
      min: across === 'x' ? [g.x, base, cz - DOOR_THICKNESS / 2] : [cx - DOOR_THICKNESS / 2, base, g.z],
      max: across === 'x' ? [g.x + g.w, base + DOOR_HEIGHT, cz + DOOR_THICKNESS / 2] : [cx + DOOR_THICKNESS / 2, base + DOOR_HEIGHT, g.z + g.d],
    };
    const mesh = new GFX.Group();
    const bars = Math.round(span * 5);
    for (let k = 0; k <= bars; k++) {
      const bar = new GFX.Mesh(new GFX.CylinderGeometry(0.035, 0.035, DOOR_HEIGHT, 6), ironMaterial);
      const a = -span / 2 + (k / bars) * span;
      bar.position.set(across === 'x' ? a : 0, 0, across === 'x' ? 0 : a);
      mesh.add(bar);
    }
    for (const y of [-0.45, 0.1, 0.6]) {
      const rail = new GFX.Mesh(new GFX.BoxGeometry(across === 'x' ? span : 0.06, 0.07, across === 'x' ? 0.06 : span), ironMaterial);
      rail.position.y = y;
      mesh.add(rail);
    }
    mesh.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    group.add(mesh);
    return { ...g, base, box, mesh, opening: -1, centre: [cx, base, cz] };
  });

  world.boxes = [...crushers.map((h) => h.box), ...lifts.map((l) => l.box), ...doors.map((g) => g.box)];

  // What lies about: the sculpted props (models/props/), each set down as soon as it is baked.
  const pickups = dungeon.pickups.map((p, i) => {
    const mesh = new GFX.Group();
    const spin = new GFX.Group();
    mesh.add(spin);
    const put = () => {
      const prop = createStatic(GFX, PROPS[p.kind]);
      // A heap as big as what's in it.
      if (p.kind === 'gold') prop.scale.setScalar(0.95 + 0.55 * Math.min(1, Math.max(0, (p.amount - 3) / 30)));
      spin.add(prop);
    };
    if (isBaked(p.kind, 1)) put();
    else if (typeof window !== 'undefined') ready(p.kind, 1).then(put);
    // Chests and gold sit where they were left, at whatever angle; the rest float and turn.
    if (STILL.has(p.kind)) spin.rotation.y = (i * 2.399963) % (Math.PI * 2);
    const ground = dungeon.heightAt(p.x, p.z) ?? 0;
    mesh.position.set(p.x, ground, p.z);
    group.add(mesh);
    return { ...p, y: ground, mesh, spin, taken: false };
  });

  const moveBox = (box, x, y, z, dt) => {
    if (dt > 0) {
      box.vx = (x - box.min[0]) / dt;
      box.vy = (y - box.min[1]) / dt;
      box.vz = (z - box.min[2]) / dt;
    }
    const sx = box.max[0] - box.min[0], sy = box.max[1] - box.min[1], sz = box.max[2] - box.min[2];
    box.min[0] = x; box.min[1] = y; box.min[2] = z;
    box.max[0] = x + sx; box.max[1] = y + sy; box.max[2] = z + sz;
  };

  /** Puts the kinematic things where they are at `time`. */
  function place(time, dt = 0) {
    for (const h of crushers) {
      moveBox(h.box, h.box.min[0], h.base + h.lift * hammerAt(time, h.period, h.phase), h.box.min[2], dt);
    }
    for (const l of lifts) {
      const s = liftAt(time, l.period, l.phase, l.pause);
      moveBox(l.box, l.x + l.to[0] * s, l.h - LIFT_THICKNESS + l.to[1] * s, l.z + l.to[2] * s, dt);
    }
    for (const g of doors) {
      const up = g.opening < 0 ? 0 : smooth(Math.min(1, (time - g.opening) / 0.9));
      moveBox(g.box, g.box.min[0], g.base + up * (DOOR_HEIGHT + 0.2), g.box.min[2], dt);
      if (up >= 1) g.box.solid = false;
    }
    for (const s of spikes) s.out = spikesAt(time, s.period, s.phase);
  }
  place(0);

  /** Is the ground ahead of a walker, going (dx, dz), somewhere it would go? */
  const footing = (b, dx, dz) => {
    const here = dungeon.heightAt(b.x, b.z);
    for (const reach of [0.45, 0.8]) {
      const x = b.x + dx * reach, z = b.z + dz * reach;
      const c = dungeon.cell(Math.floor(x), Math.floor(z));
      if (!c) return false;
      if (c.kind === 'lava') return false;
      const h = dungeon.heightAt(x, z);
      if (here !== null && h < here - 1.1) return false;
    }
    return true;
  };

  return {
    group, mobs, crushers, spikes, lifts, doors, pickups,
    place,

    /**
     * One physics step for every monster. `die` is the player's ball, or
     * null while there isn't one to chase. Returns the monster the die has
     * run into, if any.
     */
    step(dt, time, die) {
      let touched = null;
      for (const m of mobs) {
        if (m.dead || m.gone) continue;
        const kind = m.stats;
        if (m.ball) {
          const b = m.ball;
          const toDie = die ? Math.hypot(die.x - b.x, die.z - b.z) : Infinity;
          const fromHome = die ? Math.hypot(die.x - m.home[0], die.z - m.home[2]) : Infinity;
          m.chasing = die !== null && toDie < m.range && fromHome < m.range + 1.5 && Math.abs(die.y - b.y) < 1.6;
          let tx = m.home[0], tz = m.home[2];
          if (m.chasing) { tx = die.x; tz = die.z; }
          else if (m.path) {
            const [px, pz] = m.path[m.leg % m.path.length];
            if (Math.hypot(px - b.x, pz - b.z) < 0.4) m.leg++;
            [tx, tz] = m.path[m.leg % m.path.length];
          }
          const dx = tx - b.x, dz = tz - b.z, d = Math.hypot(dx, dz);
          const idle = !m.chasing && !m.path && d < 0.5;
          const still = b.grounded && Math.hypot(b.vx, b.vz) < 0.05;
          if (idle && still && toDie > SLEEP) { m.moving = false; continue; }
          let ax = 0, az = 0;
          if (d > (m.chasing ? 1e-3 : 0.3)) {
            ax = dx / d; az = dz / d;
            if (!footing(b, ax, az)) {
              // Not off the edge: brake instead.
              const v = Math.hypot(b.vx, b.vz);
              ax = v > 1e-3 ? -b.vx / v : 0;
              az = v > 1e-3 ? -b.vz / v : 0;
            }
          }
          stepBall(b, world, ax, az, dt, { push: PUSH * 0.6, topSpeed: kind.speed });
          if (Math.hypot(b.vx, b.vz) > 0.15) m.heading = Math.atan2(b.vx, b.vz);
          m.moving = Math.hypot(b.vx, b.vz) > 0.3;
          m.x = b.x; m.y = b.y - kind.radius; m.z = b.z;
          if (b.y < killY) m.gone = true;
          if (die && !touched) {
            const reach = die.r + kind.radius + 0.02;
            const ex = die.x - b.x, ey = die.y - b.y, ez = die.z - b.z;
            if (ex * ex + ey * ey + ez * ez < reach * reach) touched = m;
          }
        } else {
          m.travelled += kind.speed * dt;
          const [x, z] = alongLoop(m.path, m.travelled);
          const [nx, nz] = alongLoop(m.path, m.travelled + 0.05);
          if (Math.hypot(nx - x, nz - z) > 1e-6) m.heading = Math.atan2(nx - x, nz - z);
          m.x = x; m.z = z;
          m.moving = true;
          if (kind.move === 'fly') m.y = m.flight;
          else m.y = dungeon.heightAt(x, z) ?? m.y;
          if (die && !touched) {
            const centre = kind.move === 'fly' ? m.y : m.y + 0.2;
            const flat = Math.hypot(die.x - x, die.z - z);
            if (flat < die.r + kind.radius * (kind.move === 'fly' ? 1 : 0.8) && Math.abs(die.y - centre) < 0.65) touched = m;
          }
        }
      }
      for (let i = 0; i < walkers.length; i++) {
        const a = walkers[i];
        if (a.dead || a.gone) continue;
        for (let j = i + 1; j < walkers.length; j++) {
          const b = walkers[j];
          if (!b.dead && !b.gone) collideBalls(a.ball, b.ball, 0.5);
        }
      }
      return touched;
    },

    /** The monster is beaten: it goes down (see `sync`), and is gone from the dungeon. */
    defeat(mob) {
      mob.dead = true;
      mob.downAt = null;
    },

    /** Lift a portcullis, from `time`. */
    open(door, time) {
      if (door.opening < 0) door.opening = time;
    },

    /**
     * Meshes to match the state, once a frame. Only the monsters within
     * `reach` of `focus` (where the die is) move their limbs: the rest keep
     * their last pose, out of sight or nearly.
     */
    sync(dt, time, { focus = null, reach = 15 } = {}) {
      for (const m of mobs) {
        const g = m.look.group;
        // Beaten, it goes down where it stood, and then it is gone.
        if (m.dead && m.downAt === null) m.downAt = time;
        g.visible = !m.gone && (!m.dead || time - m.downAt < KNOCKED_OUT);
        if (!g.visible) continue;
        g.position.set(m.x, m.y, m.z);
        // Turn to face the way it goes, the short way round.
        let turn = m.heading - g.rotation.y;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        g.rotation.y += turn * Math.min(1, dt * 8);
        if (focus && Math.hypot(m.x - focus.x, m.z - focus.z) > reach) continue;
        // How fast it really goes over the ground (a boulder rolls by it), and whether the die is in its reach.
        const pace = m.ball && !m.dead ? Math.hypot(m.ball.vx, m.ball.vz) : 0;
        const striking = !m.dead && focus !== null && Math.hypot(m.x - focus.x, m.z - focus.z) < m.stats.radius + 1;
        m.look.animate(time + m.i * 1.37, m.moving && !m.dead, { chasing: m.chasing, pace, striking, down: m.dead });
      }
      for (const h of crushers) {
        h.mesh.position.set((h.box.min[0] + h.box.max[0]) / 2, (h.box.min[1] + h.box.max[1]) / 2, (h.box.min[2] + h.box.max[2]) / 2);
      }
      for (const s of spikes) {
        s.mesh.position.y = s.base - 0.3 + s.out * 0.48;
        s.mesh.visible = s.out > 0.01;
      }
      for (const l of lifts) {
        l.mesh.position.set((l.box.min[0] + l.box.max[0]) / 2, (l.box.min[1] + l.box.max[1]) / 2, (l.box.min[2] + l.box.max[2]) / 2);
      }
      for (const g of doors) {
        g.mesh.position.set(g.centre[0], (g.box.min[1] + g.box.max[1]) / 2, g.centre[2]);
      }
      for (const [i, p] of pickups.entries()) {
        p.mesh.visible = !p.taken;
        if (p.taken) continue;
        if (STILL.has(p.kind)) continue;
        p.spin.position.y = 0.06 + Math.sin(time * 2.4 + i) * 0.05;
        p.spin.rotation.y = time * 1.6 + i;
      }
    },
  };
}
