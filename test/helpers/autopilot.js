/**
 * An autopilot for the levels. It plans its own way through — tile by tile,
 * over floor it can roll onto, down drops it can survive, across on the
 * lifts, never through lava — fetches the keys before the doors, then rolls
 * the die along the plan with the same push the controls give. It waits for
 * crushers to go up, spikes to go in and lifts to come, and it fights
 * whatever it runs into, with the number on top of the die, as a player
 * does. If it can get the party down the stairs alive, a person can: the
 * tests hold every level to that.
 */

import * as GFX from '../../src/vendor/gfx/index.js';
import { hammerAt, liftAt, spikesAt } from '../../src/actors.js';
import { resolveBattle } from '../../src/battle.js';
import { createDelve, HARM, putBack, STEP, stepDelve } from '../../src/delve.js';
import { FALL_LIMIT } from '../../src/physics.js';
import { createParty, grant, heal, hurt, revive, rollBonus, seeded, wiped } from '../../src/party.js';

/** The furthest it will drop off a ledge: well short of a drop that hurts. */
export const DROP = FALL_LIMIT * 0.6;

const NEIGHBOURS = [
  [0, -1, (c) => [c.h[0], c.h[1]], (n) => [n.h[2], n.h[3]]],
  [0, 1, (c) => [c.h[2], c.h[3]], (n) => [n.h[0], n.h[1]]],
  [-1, 0, (c) => [c.h[0], c.h[2]], (n) => [n.h[1], n.h[3]]],
  [1, 0, (c) => [c.h[1], c.h[3]], (n) => [n.h[0], n.h[2]]],
];

const walkable = (c) => c && c.kind !== 'wall' && c.kind !== 'lava';

/**
 * The ways from tile to tile: a step to a neighbour that isn't higher at the
 * shared edge and isn't too far down, and a ride on each lift, from the
 * tiles beside it at one end of its run to those beside it at the other.
 * `rides` are the lift rides out of each tile: { to, lift, from, end }.
 */
export function graph(level) {
  const key = (x, z) => z * level.cols + x;
  const steps = new Map();
  const rides = new Map();
  for (let z = 0; z < level.rows; z++) {
    for (let x = 0; x < level.cols; x++) {
      const c = level.cell(x, z);
      if (!walkable(c)) continue;
      const out = [];
      for (const [dx, dz, mine, theirs] of NEIGHBOURS) {
        const n = level.cell(x + dx, z + dz);
        if (!walkable(n)) continue;
        const [a0, a1] = mine(c), [b0, b1] = theirs(n);
        const up = Math.max(b0 - a0, b1 - a1);
        const down = Math.max(a0 - b0, a1 - b1);
        if (up < 0.01 && down < DROP) out.push({ x: x + dx, z: z + dz, drop: Math.max(0, down) });
      }
      steps.set(key(x, z), out);
    }
  }
  level.lifts.forEach((l, i) => {
    // The tiles square beside the lift, level with its top, at one end of its run or the other.
    const beside = (end) => {
      const [ox, , oz] = l.to.map((v) => Math.round(v * end));
      const out = [];
      const top = l.h + l.to[1] * end;
      const consider = (x, z) => {
        const c = level.cell(x + ox, z + oz);
        if (walkable(c) && Math.abs(Math.max(...c.h) - top) < 0.01) out.push([x + ox, z + oz]);
      };
      for (let x = l.x; x < l.x + l.w; x++) { consider(x, l.z - 1); consider(x, l.z + l.d); }
      for (let z = l.z; z < l.z + l.d; z++) { consider(l.x - 1, z); consider(l.x + l.w, z); }
      return out;
    };
    const ends = [beside(0), beside(1)];
    for (const end of [0, 1]) {
      for (const [fx, fz] of ends[end]) {
        const list = rides.get(key(fx, fz)) ?? [];
        for (const [tx, tz] of ends[1 - end]) list.push({ x: tx, z: tz, lift: i, from: end });
        rides.set(key(fx, fz), list);
      }
    }
  });
  return { key, steps, rides };
}

/** Next to a drop or the dark: somewhere to go carefully. */
function edgy(level, x, z) {
  const c = level.cell(x, z);
  for (const [dx, dz] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
    const n = level.cell(x + dx, z + dz);
    if (!n || n.kind === 'lava') return true;
    if (n.kind !== 'wall' && Math.min(...n.h) < Math.min(...c.h) - 0.6) return true;
  }
  return false;
}

/**
 * The cheapest way from tile `from` to tile `to`, as a list of moves
 * ({ x, z } or a lift ride), or null. Doors are shut unless `keys` says one
 * can be opened, or it already is.
 */
export function plan(delve, net, from, to, keys) {
  const level = delve.level;
  const { key, steps, rides } = net;
  const doorOpen = (x, z) => delve.actors.doors.some((g) => !g.box.solid && x >= g.x && z >= g.z && x < g.x + g.w && z < g.z + g.d);
  const cost = new Map([[key(...from), 0]]);
  const back = new Map();
  const open = [[0, from[0], from[1]]];
  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [c0, x, z] = open.shift();
    if (x === to[0] && z === to[1]) break;
    if (c0 > cost.get(key(x, z))) continue;
    const moves = [...(steps.get(key(x, z)) ?? []), ...(rides.get(key(x, z)) ?? [])];
    for (const m of moves) {
      const cell = level.cell(m.x, m.z);
      if (cell.door && !doorOpen(m.x, m.z) && keys < 1) continue;
      let step = m.lift !== undefined ? 8 : 1 + (m.drop ?? 0) * 2;
      if (edgy(level, m.x, m.z)) step += 2;
      if (cell.trap) step += 25;
      if (cell.crush) step += 4;
      const total = c0 + step;
      if (total < (cost.get(key(m.x, m.z)) ?? Infinity)) {
        cost.set(key(m.x, m.z), total);
        back.set(key(m.x, m.z), { prev: [x, z], move: m });
        open.push([total, m.x, m.z]);
      }
    }
  }
  if (!back.has(key(...to)) && (from[0] !== to[0] || from[1] !== to[1])) return null;
  const moves = [];
  for (let at = to; at[0] !== from[0] || at[1] !== from[1];) {
    const b = back.get(key(...at));
    moves.unshift(b.move);
    at = b.prev;
  }
  return moves;
}

/** A crusher's place in its cycle, 0 to 1. */
const cycle = (time, period, phase) => ((((time + phase) / period) % 1) + 1) % 1;

/** Clear to go under crusher `h`: it has just gone up and is a good while off coming down. */
const crusherUp = (h) => (delve) => {
  const u = cycle(delve.time, h.period, h.phase);
  return u > 0.2 && u < 0.4 && hammerAt(delve.time, h.period, h.phase) > 0.35;
};

/** Clear to cross spikes `s`: just gone back in, and not out again for a while. */
const spikesIn = (s) => (delve) => {
  const u = cycle(delve.time, s.period, s.phase);
  return spikesAt(delve.time, s.period, s.phase) === 0 && (u > 0.93 || u < 0.15);
};

/** Lift `l` waiting at end `end`, early enough in the wait to get on or off before it goes. */
const liftWaiting = (l, end) => (delve) => {
  const s = liftAt(delve.time, l.period, l.phase, l.pause);
  const u = cycle(delve.time, l.period, l.phase);
  return end === 0 ? s === 0 && u < l.pause * 0.45 : s === 1 && u > 0.5 && u < 0.5 + l.pause * 0.45;
};

/** Turns a plan into waypoints: tile centres at a pace to suit, with waits and rides where they're needed. */
function waypoints(delve, moves, from) {
  const level = delve.level;
  const out = [];
  let prev = from;
  const centre = (x, z) => [x + 0.5, z + 0.5];
  const zoneOf = (list, x, z) => list.find((s) => x >= s.x && z >= s.z && x < s.x + s.w && z < s.z + s.d);
  for (const m of moves) {
    if (m.lift !== undefined) {
      const l = delve.actors.lifts[m.lift];
      const last = out[out.length - 1];
      const wait = { at: centre(...prev), speed: 2.5, stop: true, until: liftWaiting(l, m.from) };
      if (last) Object.assign(last, wait); else out.push(wait);
      out.push({ on: m.lift, at: [l.w / 2, l.d / 2], speed: 2.2, stop: true, until: liftWaiting(l, 1 - m.from), radius: 0.35 });
      out.push({ at: centre(m.x, m.z), speed: 2.2, radius: 0.4 });
      prev = [m.x, m.z];
      continue;
    }
    const cell = level.cell(m.x, m.z);
    const before = level.cell(...prev);
    const last = out[out.length - 1];
    // Wait on the tile before a crusher or spikes for the moment to go.
    if (cell.crush && !before.crush) {
      const h = zoneOf(delve.actors.crushers, m.x, m.z);
      const wait = { at: centre(...prev), speed: 2.5, stop: true, until: crusherUp(h) };
      if (last) Object.assign(last, wait); else out.push(wait);
    }
    if (cell.trap && !before.trap) {
      const s = zoneOf(delve.actors.spikes, m.x, m.z);
      const wait = { at: centre(...prev), speed: 2.5, stop: true, until: spikesIn(s) };
      if (last) Object.assign(last, wait); else out.push(wait);
    }
    let speed = 3.6;
    if (edgy(level, m.x, m.z)) speed = 2.6;
    if (!level.cell(m.x + 1, m.z) && !level.cell(m.x - 1, m.z) || !level.cell(m.x, m.z + 1) && !level.cell(m.x, m.z - 1)) speed = 2.2;
    if (cell.crush || cell.trap) speed = 4.5;
    const point = { at: centre(m.x, m.z), speed };
    if (cell.door) {
      const g = zoneOf(delve.actors.doors, m.x, m.z);
      if (g.box.solid) Object.assign(point, { stop: true, until: () => !g.box.solid || g.box.min[1] > g.base + 1.1, speed: 2 });
    }
    out.push(point);
    prev = [m.x, m.z];
  }
  return out;
}

/**
 * Drive level `index` to the stairs. Returns whether it got there, how long
 * it took, every way the die was lost or the party hurt, the fights, and the
 * party as it came out.
 */
export function drive(index, { limit = 900, seed = 7, sample = null } = {}) {
  const delve = createDelve(GFX, index);
  const level = delve.level;
  const net = graph(level);
  const b = delve.ball;
  const random = seeded(seed);
  const party = createParty();
  const losses = [], harms = [], fights = [];

  const exits = [];
  for (let z = 0; z < level.rows; z++) for (let x = 0; x < level.cols; x++) if (level.cell(x, z)?.kind === 'exit') exits.push([x, z]);
  const keys = delve.actors.pickups.filter((p) => p.kind === 'key');

  const here = () => [Math.floor(b.x), Math.floor(b.z)];
  /** Where to go next: the next key not yet picked up, then the stairs. */
  const goal = () => {
    const k = keys.find((p) => !p.taken);
    return k ? [Math.floor(k.x), Math.floor(k.z)] : exits[Math.floor(exits.length / 2)];
  };
  let route = [];
  let wp = 0;
  const replan = () => {
    const moves = plan(delve, net, here(), goal(), delve.keys);
    route = moves ? waypoints(delve, moves, here()) : [];
    wp = 0;
    return moves !== null;
  };
  if (!replan()) return { finished: false, time: 0, losses, harms, fights, party, stuck: 'no way to the stairs' };

  let down = 0;
  let t = 0;
  let still = 0;
  let target = goal();

  while (t < limit) {
    t += STEP;
    if (down > 0) {
      down -= STEP;
      stepDelve(delve, [0, 0], STEP, { live: false, moving: false });
      if (down <= 0) { putBack(delve); replan(); }
      continue;
    }
    if (route.length === 0 || wp >= route.length) {
      const next = goal();
      if (!replan() || route.length === 0) return { finished: false, time: t, losses, harms, fights, party, stuck: { at: here(), goal: next } };
      target = next;
    }

    const w = route[wp];
    let [tx, tz] = w.at;
    if (w.on !== undefined) {
      const box = delve.actors.lifts[w.on].box;
      tx = box.min[0] + w.at[0];
      tz = box.min[2] + w.at[1];
    }
    const dx = tx - b.x, dz = tz - b.z;
    const d = Math.hypot(dx, dz);
    const waiting = w.until && !w.until(delve);
    if (!waiting && d < (w.radius ?? 0.5)) {
      wp++;
      continue;
    }

    const speed = w.speed ?? 3.6;
    const want = waiting || w.stop ? Math.min(speed, d * 2.5) : speed;
    const vx = d > 1e-3 ? (dx / d) * want : 0;
    const vz = d > 1e-3 ? (dz / d) * want : 0;
    let px = (vx - b.vx) * 0.9;
    let pz = (vz - b.vz) * 0.9;
    const l = Math.hypot(px, pz);
    if (l > 1) { px /= l; pz /= l; }

    const out = stepDelve(delve, [px, pz], STEP);
    sample?.(delve);
    if (Math.hypot(b.vx, b.vz) < 0.05 && !waiting) still += STEP; else still = 0;
    if (still > 20) return { finished: false, time: t, losses, harms, fights, party, stuck: { at: here(), wp, of: route.length, goal: target } };

    if (out.outcome === 'exit') return { finished: true, time: t, losses, harms, fights, party, delve };
    if (out.fight) {
      const result = resolveBattle({ roll: out.roll, monster: out.fight.stats, bonus: rollBonus(party) });
      hurt(party, result.damage, random);
      revive(party);
      if (!delve.actors.wound(out.fight, result.hits)) grant(party, Math.ceil(result.gold / 2));
      fights.push({ kind: out.fight.kind, roll: out.roll, grade: result.grade, damage: result.damage });
      b.vx = b.vz = 0;
      if (wiped(party)) return { finished: false, time: t, losses, harms, fights, party, stuck: 'party wiped' };
    }
    if (out.hurt) {
      harms.push({ how: out.hurt, at: here(), time: +t.toFixed(1) });
      hurt(party, HARM[out.hurt], random);
      revive(party);
    }
    for (const p of out.picked) {
      if (p.kind === 'potion') heal(party, p.amount);
      if (p.kind === 'revive') { party.revives += 1; revive(party); }
      if (p.kind === 'key') replan();
    }
    if (out.outcome) {
      losses.push({ how: out.outcome, at: [b.x.toFixed(1), b.y.toFixed(1), b.z.toFixed(1)], wp, time: t.toFixed(1) });
      hurt(party, HARM[out.outcome], random);
      revive(party);
      down = 1.7;
    }
  }
  return { finished: false, time: t, losses, harms, fights, party, stuck: 'out of time' };
}
