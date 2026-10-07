import { CAST } from './models/cast/index.js';
import { isBaked, ready } from './models/library.js';
import { BUILT, standUp } from './models/looks.js';

/**
 * What lives down there. Each kind has how it gets about — `walk` (pushed
 * over the floor like the die is, and after it when it comes near),
 * `crawl` (round a set loop on the floor) or `fly` (round a set loop in the
 * air, over gaps and all) — and what it is like to fight: `dc`, the roll the
 * party needs to beat it cleanly, `power`, how hard it hits back, the
 * gold it was carrying, and (a boss) `hp`, how many hits it takes to put it down.
 *
 * How each one looks is its model (models/): sculpted, or ported from one
 * of our other projects.
 */

export const MONSTERS = Object.freeze({
  rat: { name: 'Giant Rat', move: 'walk', dc: 7, power: 4, gold: 4, radius: 0.26, speed: 4.2 },
  skeleton: { name: 'Skeleton', move: 'walk', dc: 11, power: 7, gold: 12, radius: 0.32, speed: 3 },
  goblin: { name: 'Goblin', move: 'walk', dc: 10, power: 6, gold: 10, radius: 0.3, speed: 3.8 },
  orc: { name: 'Orc Brute', move: 'walk', dc: 14, power: 9, gold: 25, radius: 0.4, speed: 2.6 },
  slime: { name: 'Slime', move: 'crawl', dc: 9, power: 5, gold: 8, radius: 0.42, speed: 1.4 },
  egg: { name: 'Eggdreessen', move: 'walk', dc: 17, power: 10, gold: 200, radius: 0.8, speed: 1.2, boss: true, hp: 3 },
  rock: { name: 'Boulder', move: 'walk', dc: 13, power: 7, gold: 16, radius: 0.4, speed: 2.2 },
  bat: { name: 'Cave Bat', move: 'fly', dc: 8, power: 3, gold: 5, radius: 0.28, speed: 2.4 },
  wraith: { name: 'Wraith', move: 'fly', dc: 15, power: 9, gold: 30, radius: 0.34, speed: 1.8 },
  dragon: { name: 'Red Dragon', move: 'walk', dc: 18, power: 14, gold: 250, radius: 0.85, speed: 1.4, boss: true, hp: 4 },
});

/** How high a flyer goes over the floor where its loop starts. */
export const FLIGHT = 0.75;

/** How finely the monsters on the board are meshed: half the grid of a close-up. */
export const BOARD_DETAIL = 0.5;

/** How long an attack plays through, and how long a beaten monster takes to go down before it is gone. */
export const STRIKE = 0.9;
export const KNOCKED_OUT = 1.1;

/**
 * A monster to look at, standing on (0, 0, 0) and facing +z (a flyer's
 * (0, 0, 0) is its middle). `animate(t, moving, how)` makes it live; `body`
 * is the part that turns to face the way it goes.
 *
 * `how`: `chasing` (it hurries), `pace` (how fast it really goes),
 * `striking` (the die is in its reach: it attacks, an attack at a time) and
 * `down` (it is beaten: it goes down).
 *
 * Each is its model: sculpted (`models/cast/`, baked in the background as
 * the page loads, and there once its bake is in) or built whole (`BUILT`).
 */
export function createMonsterMesh(GFX, kind, { seed = 0 } = {}) {
  if (BUILT[kind]) return createBuiltMesh(GFX, kind, seed);
  if (CAST[kind]) return createSculptedMesh(GFX, kind);
  throw new Error(`no look for a ${kind}`);
}

/** Which clip it plays, and how far in: down once beaten, an attack when the die is in reach, else walking or idle. */
function clips() {
  let clip = 'idle', since = 0;
  return (t, moving, { striking = false, down = false } = {}) => {
    let next = down ? 'ko' : striking ? 'attack' : moving ? 'walk' : 'idle';
    // An attack plays through before it does anything else, and then another, if the die is still there.
    if (clip === 'attack' && !down && t - since < STRIKE) next = 'attack';
    else if (clip === 'attack' && next === 'attack') since = t;
    if (next !== clip) { clip = next; since = t; }
    return { clip, t: t - since };
  };
}

/** One of the creatures ported from their own projects (the slime...): there from the start. */
function createBuiltMesh(GFX, kind, seed) {
  const group = new GFX.Group();
  group.name = kind;
  const body = new GFX.Group();
  group.add(body);
  const look = standUp(GFX, kind, { detail: BOARD_DETAIL, hue: seed });
  body.add(look.group);
  const choose = clips();
  return {
    group,
    body,
    look,
    animate(t, moving, { chasing = false, pace, ...how } = {}) {
      look.pose({ ...choose(t, moving, how), time: t, speed: chasing ? 1 : 0.6, pace });
    },
  };
}

function createSculptedMesh(GFX, kind) {
  const group = new GFX.Group();
  group.name = kind;
  const body = new GFX.Group();
  group.add(body);
  let model = null;
  const attach = () => {
    model = standUp(GFX, kind, { detail: BOARD_DETAIL });
    body.add(model.group);
  };
  if (isBaked(kind, BOARD_DETAIL)) attach();
  else if (typeof window !== 'undefined') ready(kind, BOARD_DETAIL).then(attach);
  const choose = clips();
  let last = 0;
  return {
    group,
    body,
    animate(t, moving, { chasing = false, ...how } = {}) {
      if (!model) return;
      // Hurrying when it is after the die.
      model.pose({ ...choose(t, moving, how), time: t, speed: chasing ? 1 : 0.6 });
      last = t;
    },
    get posedAt() { return last; },
  };
}
