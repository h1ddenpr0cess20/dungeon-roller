import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildDungeon, Dungeon, linearRGB, WALL } from '../src/dungeon.js';

const palette = { tiles: ['#808080', '#707070', '#606060', '#505050'] };
const make = (cols = 12, rows = 12) => new Dungeon({ name: 't', cols, rows, palette });
const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;

test('heights: on the corners, and in between on a slope', () => {
  const c = make();
  c.slope(2, 2, 4, 2, 8, 4, 'x');
  assert.ok(near(c.heightAt(2, 3), 8));
  assert.ok(near(c.heightAt(4, 2.5), 6));
  assert.equal(c.heightAt(1.5, 3), null);
});

test('tiles off the grid are refused', () => {
  assert.throws(() => make(4, 4).flat(3, 3, 2, 1, 0), /off the grid/);
});

test('stairs step down a tile at a time, the first already a step below where they start', () => {
  const c = make(12, 4);
  c.stairs(1, 1, 5, 1, 9, 5, 'x');
  assert.deepEqual([1, 2, 3, 4, 5].map((x) => c.heightAt(x + 0.5, 1.5)), [9, 8, 7, 6, 5]);
});

test('walls go round a room, tall at the back and low at the front, and never over floor', () => {
  const c = make();
  c.flat(5, 1, 1, 3, 4); // something dug before, through where the wall would go
  c.room(2, 2, 4, 4, 4);
  assert.equal(c.cell(1, 3).kind, 'wall');
  assert.ok(near(c.cell(1, 3).h[0], 4 + WALL.back));
  assert.ok(near(c.cell(3, 1).h[0], 4 + WALL.back));
  assert.ok(near(c.cell(6, 3).h[0], 4 + WALL.front));
  assert.ok(near(c.cell(3, 6).h[0], 4 + WALL.front));
  assert.equal(c.cell(5, 1).kind, 'floor', 'the way in is left open');
  // A floor dug afterwards cuts a doorway through the wall.
  c.flat(3, 6, 1, 3, 4);
  assert.equal(c.cell(3, 6).kind, 'floor');
});

test('where two walls meet, the lower stands', () => {
  const c = make();
  c.wall(4, 4, 1, 1, 9);
  c.wall(4, 4, 1, 1, 6);
  c.wall(4, 4, 1, 1, 8);
  assert.equal(c.cell(4, 4).h[0], 6);
});

test('a gap stays clear: no wall is put into it later', () => {
  const c = make();
  c.gap(3, 3, 3, 1);
  c.room(3, 4, 3, 3, 2);
  assert.equal(c.cell(4, 3), null);
  assert.equal(c.cell(2, 3)?.kind, 'wall');
});

test('lava can be poured only into what is not yet dug', () => {
  const c = make();
  c.flat(4, 4, 1, 1, 3);
  c.lava(2, 2, 5, 5, 2, { fill: true });
  assert.equal(c.cell(4, 4).kind, 'floor');
  assert.equal(c.cell(3, 3).kind, 'lava');
  c.lava(4, 4, 1, 1, 2);
  assert.equal(c.cell(4, 4).kind, 'lava', 'and over anything without');
});

test('safe ground: level floor, with level floor or a wall all round it, and no trap on it', () => {
  const c = make();
  c.room(2, 2, 5, 5, 0);
  assert.ok(c.isSafe(2, 2), 'in a walled corner');
  assert.ok(c.isSafe(4, 4));
  c.flat(6, 4, 1, 1, 0.5);
  assert.ok(!c.isSafe(5, 4), 'next to a bump');
  c.spike(3, 3);
  assert.ok(!c.isSafe(3, 3), 'on spikes');
  c.clear(4, 6, 1, 1);
  assert.ok(!c.isSafe(4, 5), 'next to a hole');
  assert.ok(!c.isSafe(0, 0), 'over nothing');
});

test('every face is a finite triangle; tops face up; walls face out and come in bands a tile high', () => {
  const c = make();
  c.flat(4, 4, 1, 1, 3.5);
  const { tops, walls, world } = buildDungeon(c);
  assert.equal(tops.position.length, 2 * 9);
  for (const v of [...tops.position, ...walls.position, ...tops.normal, ...walls.normal, ...walls.uv]) assert.ok(Number.isFinite(v));
  for (let i = 1; i < tops.normal.length; i += 3) assert.equal(tops.normal[i], 1);
  for (let t = 0; t < walls.position.length / 9; t++) {
    const p = walls.position.slice(t * 9, t * 9 + 9);
    const cx = (p[0] + p[3] + p[6]) / 3 - 4.5, cz = (p[2] + p[5] + p[8]) / 3 - 4.5;
    const n = walls.normal.slice(t * 9, t * 9 + 3);
    assert.ok(cx * n[0] + cz * n[2] > 0, 'faces out');
    const ys = [p[1], p[4], p[7]];
    assert.ok(Math.max(...ys) - Math.min(...ys) <= 1 + 1e-6, 'a band at most a tile high');
  }
  for (let i = 0; i < walls.uv.length; i++) assert.ok(walls.uv[i] >= -1e-6 && walls.uv[i] <= 1 + 1e-6);
  // The physics gets each side whole: two tops and two triangles a side.
  assert.equal(world.triangles.length / 9, 2 + 4 * 2);
});

test('lava is drawn on its own, and collided with like any floor', () => {
  const c = make();
  c.lava(4, 4, 2, 1, 1);
  const { tops, lava, world } = buildDungeon(c);
  assert.equal(tops.position.length, 0);
  assert.equal(lava.position.length, 4 * 9);
  assert.ok(world.triangles.length / 9 >= 4);
});

test('colours are linear', () => {
  assert.deepEqual(linearRGB('#ffffff'), [1, 1, 1]);
  assert.deepEqual(linearRGB('#000000'), [0, 0, 0]);
});
