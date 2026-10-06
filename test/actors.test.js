import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as GFX from '../src/vendor/gfx/index.js';
import { alongLoop, createActors, hammerAt, liftAt, spikesAt } from '../src/actors.js';
import { buildDungeon, Dungeon } from '../src/dungeon.js';
import { createBall } from '../src/physics.js';

const STEP = 1 / 120;

test('a crusher climbs slowly, waits, and slams down fast', () => {
  const at = (u) => hammerAt(u * 2, 2);
  assert.equal(at(0), 0);
  assert.equal(at(0.5), 1);
  assert.ok(at(0.25) > 0.4 && at(0.25) < 0.6);
  assert.equal(at(0.85), 0);
});

test('spikes are in most of the time, and out for a moment', () => {
  let out = 0, total = 0;
  for (let t = 0; t < 2.2; t += 0.01) {
    const s = spikesAt(t, 2.2);
    assert.ok(s >= 0 && s <= 1);
    if (s > 0.5) out++;
    total++;
  }
  assert.ok(out / total > 0.15 && out / total < 0.4);
  assert.equal(spikesAt(0.2, 2.2), 0);
});

test('a lift waits at each end and glides between', () => {
  assert.equal(liftAt(0.1, 10, 0, 0.2), 0);
  assert.equal(liftAt(5.5, 10, 0, 0.2), 1);
  assert.ok(Math.abs(liftAt(3.5, 10, 0, 0.2) - 0.5) < 1e-9);
});

test('round a loop of points', () => {
  assert.deepEqual(alongLoop([[0, 0], [2, 0], [2, 2], [0, 2]], 3), [2, 1]);
  assert.deepEqual(alongLoop([[0, 0], [4, 0]], 6), [2, 0]);
});

function yard() {
  const c = new Dungeon({ name: 'yard', cols: 24, rows: 12, palette: { tiles: ['#808080'] } });
  c.flat(2, 2, 12, 6, 0);
  return c;
}

test('a monster comes for the die when it is near, and goes home when it is not', () => {
  const c = yard();
  c.mob('goblin', 10, 4, { range: 5 });
  const built = buildDungeon(c);
  const actors = createActors(GFX, c, built.world, { killY: -10 });
  const [m] = actors.mobs;
  const die = createBall({ x: 6.5, y: 0.36, z: 4.5, r: 0.36 });
  let touched = null;
  for (let t = 0; t < 4 && !touched; t += STEP) touched = actors.step(STEP, t, die);
  assert.equal(touched, m, 'it ran into the die');
  // With the die gone, back home it goes.
  for (let t = 0; t < 6; t += STEP) actors.step(STEP, t, null);
  assert.ok(Math.hypot(m.x - 10.5, m.z - 4.5) < 0.6, `home again, at ${m.x}, ${m.z}`);
});

test('a monster chasing the die stops at the edge rather than go over it', () => {
  const c = yard();
  c.flat(14, 4, 6, 1, 0); // a walk out over the dark
  c.mob('rat', 8, 4, { range: 12 });
  const built = buildDungeon(c);
  const actors = createActors(GFX, c, built.world, { killY: -10 });
  const [m] = actors.mobs;
  // The die out past the end of the yard, off to the side of the walk, over nothing.
  const die = createBall({ x: 17.5, y: 0.36, z: 6.5, r: 0.36 });
  for (let t = 0; t < 8; t += STEP) actors.step(STEP, t, die);
  assert.ok(!m.gone, 'it did not fall');
  assert.ok(c.heightAt(m.x, m.z) !== null);
});

test('flyers go round their loop, over gaps and all', () => {
  const c = yard();
  c.mob('bat', 3, 3, { path: [[3, 3], [20, 3]] });
  const built = buildDungeon(c);
  const actors = createActors(GFX, c, built.world, { killY: -10 });
  const [bat] = actors.mobs;
  let furthest = 0;
  for (let t = 0; t < 8; t += STEP) {
    actors.step(STEP, t, null);
    furthest = Math.max(furthest, bat.x);
  }
  assert.ok(furthest > 18, `got to ${furthest}`);
});
