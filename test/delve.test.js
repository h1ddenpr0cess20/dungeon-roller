import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as GFX from '../src/vendor/gfx/index.js';
import { createDelve, putBack, showing, STEP, stepDelve } from '../src/delve.js';

/** Run level `index` with the die put at (x, z) and pushed along `push`, until `until(out)` or `seconds`. */
function roll(delve, x, z, push, seconds, until = () => false) {
  const b = delve.ball;
  b.x = x + 0.5; b.z = z + 0.5; b.y = delve.level.heightAt(b.x, b.z) + b.r + 0.01;
  b.vx = b.vy = b.vz = 0;
  for (let t = 0; t < seconds; t += STEP) {
    const out = stepDelve(delve, push, STEP);
    if (until(out)) return out;
  }
  return null;
}

test('off the edge into the dark: the die is lost, and goes back to safe ground', () => {
  const delve = createDelve(GFX, 0);
  const level = delve.level;
  const start = [...delve.safe];
  // Off the side of the first bridge: a tile with nothing either side of it.
  let bridge = null;
  for (let z = 0; z < level.rows && !bridge; z++) {
    for (let x = 0; x < level.cols && !bridge; x++) {
      if (level.cell(x, z)?.kind === 'floor' && !level.cell(x, z - 1) && !level.cell(x, z + 1)) bridge = [x, z];
    }
  }
  const out = roll(delve, ...bridge, [0, 1], 6, (o) => o.outcome);
  assert.equal(out?.outcome, 'fell');
  putBack(delve);
  assert.deepEqual([delve.ball.x, delve.ball.y, delve.ball.z], start);
});

test('running into a monster starts a fight, with the number on top as the roll', () => {
  const delve = createDelve(GFX, 0);
  const mob = delve.actors.mobs[0];
  const out = roll(delve, Math.floor(mob.home[0]) - 3, Math.floor(mob.home[2]), [1, 0], 6, (o) => o.fight);
  assert.equal(out?.fight, mob);
  assert.ok(out.roll >= 1 && out.roll <= 20);
  assert.equal(out.roll, showing(delve));
});

test('gold is picked up by rolling over it', () => {
  const delve = createDelve(GFX, 0);
  const gold = delve.actors.pickups.find((p) => p.kind === 'gold');
  const out = roll(delve, Math.floor(gold.x), Math.floor(gold.z), [0, 0], 0.5, (o) => o.picked.length);
  assert.equal(out?.picked[0], gold);
  assert.ok(gold.taken);
});

test('a gate stays shut without a key, and lifts with one', () => {
  const delve = createDelve(GFX, 1);
  const gate = delve.actors.doors[0];
  const [x, z] = [gate.x + Math.floor(gate.w / 2), gate.z + Math.floor(gate.d / 2)];
  const back = gate.axis === 'x' ? [x - 2, z] : [x, z - 2];
  const push = gate.axis === 'x' ? [1, 0] : [0, 1];
  // Keep the monsters out of it.
  for (const m of delve.actors.mobs) delve.actors.defeat(m);
  const locked = roll(delve, ...back, push, 3, (o) => o.door);
  assert.equal(locked?.door, 'locked');
  assert.ok(gate.box.solid);
  delve.keys = 1;
  const opened = roll(delve, ...back, push, 3, (o) => o.door);
  assert.equal(opened?.door, 'opened');
  assert.equal(delve.keys, 0);
  roll(delve, ...back, [0, 0], 2);
  assert.ok(!gate.box.solid, 'and is up');
});

test('lava burns', () => {
  const delve = createDelve(GFX, 4);
  const level = delve.level;
  let lava = null;
  for (let z = 0; z < level.rows && !lava; z++) for (let x = 0; x < level.cols && !lava; x++) if (level.cell(x, z)?.kind === 'lava') lava = [x, z];
  const out = roll(delve, ...lava, [0, 0], 1, (o) => o.outcome);
  assert.equal(out?.outcome, 'burnt');
});

test('let go of on level ground, the die stops where it is rather than sliding', () => {
  const delve = createDelve(GFX, 0);
  const b = delve.ball;
  for (let t = 0; t < 0.5; t += STEP) stepDelve(delve, [0, 0], STEP);
  b.vx = 1.2;
  const x0 = b.x;
  for (let t = 0; t < 1.5; t += STEP) stepDelve(delve, [0, 0], STEP);
  assert.ok(Math.hypot(b.vx, b.vz) < 0.02, `still going at ${Math.hypot(b.vx, b.vz)}`);
  assert.ok(b.x - x0 < 0.35, `slid ${b.x - x0}`);
  assert.ok(delve.die.settled, 'and lies flat on a face');
});
