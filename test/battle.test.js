import assert from 'node:assert/strict';
import { test } from 'node:test';

import { resolveBattle } from '../src/battle.js';
import { MONSTERS } from '../src/monsters.js';

test('the roll decides it: a natural 20 is a critical, a 1 a fumble, the DC splits the rest', () => {
  const monster = MONSTERS.skeleton;
  assert.equal(resolveBattle({ roll: 20, monster }).grade, 'critical');
  assert.equal(resolveBattle({ roll: 1, monster }).grade, 'fumble');
  assert.equal(resolveBattle({ roll: monster.dc, monster }).grade, 'success');
  assert.equal(resolveBattle({ roll: monster.dc - 1, monster }).grade, 'struggle');
});

test('a better roll never costs the party more', () => {
  for (const monster of Object.values(MONSTERS)) {
    let last = Infinity;
    for (let roll = 1; roll <= 20; roll++) {
      const { damage } = resolveBattle({ roll, monster });
      assert.ok(damage <= last, `${monster.name}: ${roll} cost ${damage}, ${roll - 1} cost ${last}`);
      assert.ok(Number.isInteger(damage) && damage >= 0);
      last = damage;
    }
    assert.equal(resolveBattle({ roll: 20, monster }).damage, 0);
    assert.ok(resolveBattle({ roll: 1, monster }).damage > resolveBattle({ roll: 2, monster }).damage);
  }
});

test('the gold is the monster\'s, doubled on a critical', () => {
  const monster = MONSTERS.orc;
  assert.equal(resolveBattle({ roll: 14, monster }).gold, monster.gold);
  assert.equal(resolveBattle({ roll: 20, monster }).gold, monster.gold * 2);
});
