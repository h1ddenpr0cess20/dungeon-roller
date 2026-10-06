import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as GFX from '../src/vendor/gfx/index.js';
import { createDieState, DIE_RADIUS, DIE_SCALE, dieModel, reachBelow, rotate, showNumber, stepDie, topFace } from '../src/die.js';
import { createBall } from '../src/physics.js';

const model = dieModel(GFX);
const STEP = 1 / 120;

test("it is Nat's d20: twenty faces, 1 to 20, opposite faces adding up to 21", () => {
  assert.equal(model.faces.length, 20);
  assert.deepEqual(model.faces.map((f) => f.number).sort((a, b) => a - b), Array.from({ length: 20 }, (_, i) => i + 1));
  for (const f of model.faces) {
    const opposite = model.faces.find((g) => g.number === 21 - f.number);
    const dot = f.normal[0] * opposite.normal[0] + f.normal[1] * opposite.normal[1] + f.normal[2] * opposite.normal[2];
    assert.ok(dot < -0.999, `${f.number} and ${21 - f.number} are opposite`);
  }
  assert.equal(model.corners.length, 12);
});

test('the number on top is the face whose normal points most nearly up', () => {
  const q = [0.31, -0.42, 0.18, 0.83];
  const l = Math.hypot(...q);
  for (let i = 0; i < 4; i++) q[i] /= l;
  const top = topFace(model, q);
  const best = Math.max(...model.faces.map((f) => rotate(q, f.normal)[1]));
  assert.equal(top.up, best);
  // Turned upside down, the face opposite is on top.
  const [x, y, z, w] = q;
  const flipped = topFace(model, [w, -z, y, -x]);
  assert.equal(flipped.number, 21 - top.number);
});

test('showNumber turns the die so that number is on top, flat', () => {
  for (const n of [1, 7, 13, 20]) {
    const die = createDieState();
    die.q = [0.3, 0.5, -0.2, 0.79];
    const l = Math.hypot(...die.q);
    die.q = die.q.map((v) => v / l);
    showNumber(die, model, n);
    const top = topFace(model, die.q);
    assert.equal(top.number, n);
    assert.ok(top.up > 0.9999);
  }
});

test('a die at rest tips over onto a face, and then reads one clean number', () => {
  const die = createDieState();
  die.q = [0.2, 0.1, 0.4, 0.89];
  const l = Math.hypot(...die.q);
  die.q = die.q.map((v) => v / l);
  const ball = createBall({ r: DIE_RADIUS });
  ball.grounded = true;
  for (let t = 0; t < 2; t += STEP) stepDie(die, ball, model, STEP);
  assert.ok(die.settled);
  assert.ok(topFace(model, die.q).up > 0.999);
  // Lying on a face, it reaches down only as far as the middle of a face; on a corner, further.
  const inradius = 0.7947 * DIE_SCALE;
  assert.ok(Math.abs(reachBelow(model, die.q) - inradius) < 1e-3);
  const anyhow = reachBelow(model, [0, 0, 0, 1]);
  assert.ok(anyhow > inradius && anyhow <= DIE_SCALE + 1e-9);
});

test('rolled along the ground it turns with the ground, and every number comes up', () => {
  const die = createDieState();
  const ball = createBall({ r: DIE_RADIUS });
  ball.grounded = true;
  ball.vx = 4;
  const seen = new Set();
  const before = rotate(die.q, [0, 0, 1]);
  for (let t = 0; t < 30; t += STEP) {
    stepDie(die, ball, model, STEP);
    seen.add(topFace(model, die.q).number);
  }
  assert.equal(seen.size, 20, `only ${[...seen].sort((a, b) => a - b)}`);
  assert.notDeepEqual(rotate(die.q, [0, 0, 1]), before);
});
