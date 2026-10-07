/**
 * The party: four heroes rolling along inside the die. Each has hit points,
 * and a weight for how much of any harm comes their way — the knight stands
 * in front and takes the most, the mage hangs back. When every one of them
 * is down, the delve is over.
 *
 * Revive potions are carried, and one is drunk the moment anyone falls.
 *
 * Heroes level up: every hero standing when a monster falls earns its
 * experience, and each level brings more hit points (healed on the spot) and,
 * as the party's average level climbs, a bonus on the battle roll.
 *
 * Harm is dealt a point at a time to a living hero picked by weight, from
 * whatever random source is passed in, so the tests can deal it the same way
 * every time.
 */

export const HEROES = Object.freeze([
  { id: 'knight', name: 'Knight', hp: 30, weight: 3, colour: '#c9d3e6', mark: 'K' },
  { id: 'rogue', name: 'Rogue', hp: 22, weight: 2, colour: '#9fd48a', mark: 'R' },
  { id: 'cleric', name: 'Cleric', hp: 24, weight: 2, colour: '#f2d27a', mark: 'C' },
  { id: 'mage', name: 'Mage', hp: 18, weight: 1, colour: '#b9a2f0', mark: 'M' },
]);

/** A seeded random source, 0 to 1 (mulberry32). */
export function seeded(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createParty() {
  return { heroes: HEROES.map((h) => ({ id: h.id, name: h.name, hp: h.hp, max: h.hp, weight: h.weight, level: 1, xp: 0 })), revives: 0 };
}

export const standing = (party) => party.heroes.filter((h) => h.hp > 0);

export const wiped = (party) => standing(party).length === 0;

/** `amount` points of harm, spread over whoever is still standing. Returns what each hero took. */
export function hurt(party, amount, random = Math.random) {
  const took = party.heroes.map(() => 0);
  for (let n = 0; n < amount; n++) {
    const up = party.heroes.filter((h) => h.hp > 0);
    if (!up.length) break;
    let pick = random() * up.reduce((s, h) => s + h.weight, 0);
    let hero = up[up.length - 1];
    for (const h of up) {
      pick -= h.weight;
      if (pick < 0) { hero = h; break; }
    }
    hero.hp -= 1;
    took[party.heroes.indexOf(hero)] += 1;
  }
  return took;
}

/** Everyone still standing gets `amount` back, up to their best. */
export function heal(party, amount) {
  return party.heroes.map((h) => {
    if (h.hp <= 0) return 0;
    const gain = Math.min(amount, h.max - h.hp);
    h.hp += gain;
    return gain;
  });
}

/**
 * A revive potion, if the party carries one and anyone is down: every
 * fallen hero gets back up with half their hit points. Returns what each
 * hero got back, or null if nothing was drunk.
 */
export function revive(party) {
  if (!party.revives || !party.heroes.some((h) => h.hp <= 0)) return null;
  party.revives -= 1;
  return party.heroes.map((h) => {
    if (h.hp > 0) return 0;
    const back = Math.ceil(h.max / 2);
    const gain = back - h.hp;
    h.hp = back;
    return gain;
  });
}

/** Down the stairs, a rest: the fallen get back up, and everyone gets half their hit points back. */
export function rest(party) {
  for (const h of party.heroes) h.hp = Math.min(h.max, Math.max(h.hp, 0) + Math.ceil(h.max / 2));
  return party;
}

export const MAX_LEVEL = 10;

/** Experience to go from `level` to the next. */
export const xpToNext = (level) => 30 * level;

/** Hit points a hero gains with each level. */
const hpPerLevel = (id) => 1 + Math.round(HEROES.find((h) => h.id === id).hp * 0.12);

/**
 * `xp` for every hero still standing. Returns, per hero, how many levels
 * they gained; each gain raises their best hit points and heals them by as
 * much.
 */
export function grant(party, xp) {
  return party.heroes.map((h) => {
    if (h.hp <= 0 || h.level >= MAX_LEVEL) return 0;
    h.xp += xp;
    let gained = 0;
    while (h.level < MAX_LEVEL && h.xp >= xpToNext(h.level)) {
      h.xp -= xpToNext(h.level);
      h.level += 1;
      gained += 1;
      const hp = hpPerLevel(h.id);
      h.max += hp;
      h.hp += hp;
    }
    if (h.level >= MAX_LEVEL) h.xp = 0;
    return gained;
  });
}

/** The bonus on the battle roll: a point for every three levels the party averages over the first. */
export function rollBonus(party) {
  const avg = party.heroes.reduce((s, h) => s + h.level, 0) / party.heroes.length;
  return Math.floor((avg - 1) / 3);
}
