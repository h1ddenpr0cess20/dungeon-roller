import { createActors } from './actors.js';
import { createDieState, DIE_RADIUS, dieModel, stepDie, topFace } from './die.js';
import { buildDungeon, DEPTH } from './dungeon.js';
import { loadLevel } from './levels.js';
import { BREAK_SPEED, createBall, placeBall, stepBall } from './physics.js';
import { groundAxes } from './view.js';

/**
 * One level as it is played, without anything drawn or heard: the dungeon,
 * what moves and lies about in it, the die, and the rules — what loses the
 * die, what hurts the party, what starts a fight, what can be picked up and
 * where the die goes back to after a fall. The game draws it and keeps the
 * party; the tests drive it with an autopilot.
 */

/** The physics runs at a fixed rate, whatever the frame rate. */
export const STEP = 1 / 120;

/** How hard the die grips level ground when nothing pushes it: below `below` tiles a second, `rate` of its speed a second goes. */
export const GRIP = Object.freeze({ below: 1.6, rate: 7 });

/** What each way of coming to grief costs the party, in hit points spread over them. */
export const HARM = Object.freeze({
  fell: 6,
  burnt: 10,
  crushed: 9,
  spiked: 5,
  thud: 3,
});

/** A push on the screen (x right, y up) as a push along the ground, for a camera turned to `yaw`. */
export function toGround({ x, y }, yaw) {
  const { right, up } = groundAxes(yaw);
  return [x * right[0] + y * up[0], x * right[1] + y * up[1]];
}

export function createDelve(GFX, index, { ball = createBall({ r: DIE_RADIUS }), die = createDieState() } = {}) {
  const level = loadLevel(index);
  const built = buildDungeon(level);
  const killY = level.lowest - DEPTH - 2;
  const actors = createActors(GFX, level, built.world, { killY });
  const { x, z } = level.start;
  const safe = [x + 0.5, level.heightAt(x + 0.5, z + 0.5) + ball.r, z + 0.5];
  const delve = {
    index, level, built, world: built.world, actors, killY, ball, die, model: dieModel(GFX),
    time: 0, safe, keys: 0, explored: new Uint8Array(level.cols * level.rows), lockedAt: -Infinity,
  };
  actors.place(0);
  placeBall(ball, ...safe);
  explore(delve);
  return delve;
}

/** The die back on the last safe ground it rolled over. */
export function putBack(delve) {
  placeBall(delve.ball, ...delve.safe);
}

/** The number on top of the die right now. */
export const showing = (delve) => topFace(delve.model, delve.die.q).number;

/** Marks the tiles round the die as seen, for the map. */
function explore(delve) {
  const { level, ball, explored } = delve;
  const cx = Math.floor(ball.x), cz = Math.floor(ball.z), r = 6;
  for (let j = cz - r; j <= cz + r; j++) {
    for (let i = cx - r; i <= cx + r; i++) {
      if (i < 0 || j < 0 || i >= level.cols || j >= level.rows) continue;
      if ((i - cx) ** 2 + (j - cz) ** 2 <= r * r) explored[j * level.cols + i] = 1;
    }
  }
}

/**
 * One step of everything. `push` is along the ground ([x, z]). While `live`,
 * the rules apply and the monsters give chase; while `moving` is false, the
 * die stays where it is (burnt, or squashed).
 *
 * Returns what happened: how hard the die hit anything (`impact`); `outcome`
 * — null, 'exit', or how the die was lost: 'fell', 'burnt' or 'crushed';
 * `hurt` — harm that doesn't lose the die ('spiked', 'thud'); `fight` — the
 * monster it ran into, with `roll`, the number on top as it did; `picked` —
 * whatever it picked up; and `door` — 'opened' or 'locked' if it rolled
 * into a portcullis.
 */
export function stepDelve(delve, push, dt = STEP, { live = true, moving = true } = {}) {
  const ball = delve.ball;
  const level = delve.level;
  delve.time += dt;
  delve.actors.place(delve.time, dt);
  const touched = delve.actors.step(dt, delve.time, live && moving ? ball : null);
  const out = { impact: 0, outcome: null, hurt: null, fight: null, picked: [], door: null };
  if (!moving) return out;

  const result = stepBall(ball, delve.world, push[0], push[1], dt);
  // A d20 doesn't coast like a marble. Let go of it on level ground and it
  // tips over a face or two and stops, rather than sliding on flat.
  if (ball.grounded && !ball.on && Math.hypot(push[0], push[1]) < 0.05 && ball.ny > 0.97) {
    const speed = Math.hypot(ball.vx, ball.vz);
    if (speed < GRIP.below) {
      const k = Math.max(0, 1 - GRIP.rate * dt);
      ball.vx *= k;
      ball.vz *= k;
    }
  }
  stepDie(delve.die, ball, delve.model, dt);
  out.impact = result.impact;
  if (!live) return out;

  const cx = Math.floor(ball.x), cz = Math.floor(ball.z);
  const cell = level.cell(cx, cz);
  const onFloor = ball.grounded && !ball.on && cell && ball.y - ball.r - level.heightAt(ball.x, ball.z) < 0.2;

  if (result.crushed) { out.outcome = 'crushed'; return out; }
  if (onFloor && cell.kind === 'lava') { out.outcome = 'burnt'; return out; }
  if (ball.y < delve.killY) { out.outcome = 'fell'; return out; }
  if (result.landed && result.impact > BREAK_SPEED) out.hurt = 'thud';

  for (const s of delve.actors.spikes) {
    if (s.out < 0.5 || !onFloor) continue;
    if (cx < s.x || cz < s.z || cx >= s.x + s.w || cz >= s.z + s.d) continue;
    const cycle = Math.floor((delve.time + s.phase) / s.period);
    if (s.struck === cycle) continue;
    s.struck = cycle;
    out.hurt = 'spiked';
    ball.vy = 7;
    ball.grounded = false;
  }

  if (touched) {
    out.fight = touched;
    out.roll = showing(delve);
    return out;
  }

  for (const p of delve.actors.pickups) {
    if (p.taken) continue;
    if (Math.hypot(p.x - ball.x, p.z - ball.z) < 0.55 && Math.abs(ball.y - ball.r - p.y) < 0.8) {
      p.taken = true;
      if (p.kind === 'key') delve.keys++;
      out.picked.push(p);
    }
  }

  for (const g of delve.actors.doors) {
    if (!g.box.solid || g.opening >= 0) continue;
    const qx = Math.max(g.box.min[0], Math.min(ball.x, g.box.max[0]));
    const qy = Math.max(g.box.min[1], Math.min(ball.y, g.box.max[1]));
    const qz = Math.max(g.box.min[2], Math.min(ball.z, g.box.max[2]));
    if (Math.hypot(ball.x - qx, ball.y - qy, ball.z - qz) > ball.r + 0.08) continue;
    if (delve.keys > 0) {
      delve.keys--;
      delve.actors.open(g, delve.time);
      out.door = 'opened';
    } else if (delve.time - delve.lockedAt > 2) {
      delve.lockedAt = delve.time;
      out.door = 'locked';
    }
  }

  if (ball.grounded && !ball.on && cell) {
    if (cell.kind === 'exit') out.outcome = 'exit';
    else if (level.isSafe(cx, cz)) delve.safe = [cx + 0.5, cell.h[0] + ball.r, cz + 0.5];
  }
  explore(delve);
  return out;
}
