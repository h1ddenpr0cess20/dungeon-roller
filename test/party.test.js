import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createParty, heal, HEROES, hurt, rest, seeded, standing, wiped } from '../src/party.js';

test('four heroes, at their best', () => {
  const party = createParty();
  assert.equal(party.heroes.length, 4);
  assert.deepEqual(party.heroes.map((h) => h.name), HEROES.map((h) => h.name));
  for (const h of party.heroes) assert.equal(h.hp, h.max);
});

test('harm is spread over whoever is standing, the knight taking the most', () => {
  const party = createParty();
  const took = hurt(party, 40, seeded(3));
  assert.equal(took.reduce((a, b) => a + b, 0), 40);
  assert.ok(took[0] > took[3], 'the knight more than the mage');
  for (const [i, h] of party.heroes.entries()) assert.equal(h.hp, h.max - took[i]);
  // The same seed deals it the same way.
  const again = createParty();
  assert.deepEqual(hurt(again, 40, seeded(3)), took);
});

test('nobody goes below nothing, and when all four are down the party has fallen', () => {
  const party = createParty();
  const total = party.heroes.reduce((a, h) => a + h.hp, 0);
  const took = hurt(party, total + 50, seeded(1));
  assert.equal(took.reduce((a, b) => a + b, 0), total);
  assert.ok(party.heroes.every((h) => h.hp === 0));
  assert.ok(wiped(party));
  assert.equal(standing(party).length, 0);
});

test('a potion heals the standing, up to their best; a rest gets the fallen back up', () => {
  const party = createParty();
  party.heroes[0].hp = 0;
  party.heroes[1].hp = 5;
  party.heroes[2].hp = party.heroes[2].max - 2;
  const got = heal(party, 8);
  assert.deepEqual(got, [0, 8, 2, 0]);
  rest(party);
  assert.equal(party.heroes[0].hp, Math.ceil(party.heroes[0].max / 2));
  assert.ok(party.heroes.every((h) => h.hp > 0 && h.hp <= h.max));
});
