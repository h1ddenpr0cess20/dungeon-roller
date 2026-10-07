import { digger } from './dig.js';
import { Dungeon } from './dungeon.js';

/**
 * The levels, in order, each a floor further down. Every one starts high at
 * the back and winds down toward the camera to the stairs down — a good deal
 * further than a Madness race goes: halls, stairs, crypts, ledges over the
 * dark, bridges a tile wide, and monsters in the rooms.
 *
 * They are dug with `dig.js`, a piece at a time; the monsters, traps and
 * treasure are then put into the pieces by where they are in them.
 *
 * A palette's `tiles` are the floor, the stairs and ramps, the bridges, and
 * last the tops of the walls; `walls` are the colours down their sides.
 */

/** A tile and a heading, as a digger's cursor wants them. */
const pick = ([x, z], heading) => ({ x, z, heading });

/** Right across piece `p`, `along` it: where to put a crusher or spikes that bar the whole way. */
const across = (p, along, opts = {}, length = 1) => {
  const [x, z, w, d] = p.span(along, length);
  return [x, z, { w, d, ...opts }];
};

/** A portcullis right across piece `p`, `along` it. */
const gate = (c, p, along) => c.door(...p.span(along), { axis: p.dir[0] ? 'x' : 'z' });

/** A loop round the inside of piece `p`, `inset` tiles in from its sides, for something to go round. */
const loop = (p, inset = 1, from = 0, to = p.length) => {
  const lo = p.lo + inset, hi = p.lo + p.width - 1 - inset;
  const a = from + inset, b = to - 1 - inset;
  return [p.tile(a, lo), p.tile(b, lo), p.tile(b, hi), p.tile(a, hi)];
};

const CRYPT = {
  tiles: ['#9a958e', '#837d75', '#8a6d4c', '#6c6862'], walls: ['#6e6962', '#5e5953', '#5a4636', '#57524c'],
  ambient: [0.4, 0.42, 0.52], lift: '#8c8478',
};

function crypt() {
  const c = new Dungeon({ name: 'The Crypt', depth: 1, cols: 88, rows: 108, palette: CRYPT, intro: 'Rats and old bones. Mind the edges.' });
  // The way in.
  c.room(2, 4, 5, 5, 40, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 40, heading: '+x' });
  d.hall(8);
  d.turn('+z');
  d.hall(5);
  d.stairs(5, 2.5);
  // The first crypt: pillars down the middle, a skeleton standing guard.
  const crypt1 = d.room(9, 7);
  for (const k of [2, 6]) { c.pillar(...crypt1.tile(k, -2)); c.pillar(...crypt1.tile(k, 2)); }
  c.mob('skeleton', ...crypt1.tile(4, -1), { range: 5 });
  c.gold(...crypt1.tile(4, 3), 15).gold(...crypt1.tile(8, -3), 10);
  d.hall(4);
  d.turn('+x');
  // Along the edge of the dark, with a rat running the ledge.
  const ledge = d.ledge(10, { width: 2 });
  c.mob('rat', ...ledge.tile(7, 0), { range: 5 });
  d.bridge(6);
  const yard = d.room(7, 7);
  c.mob('rat', ...yard.tile(3, -2), { range: 6 }).mob('rat', ...yard.tile(5, 2), { range: 6 });
  // Off the back of the yard, a nook with a chest in it, and rats.
  const nook = d.fork().jump({ ...d.at, ...pick(yard.tile(3, -4), '-z') });
  nook.hall(4);
  const hoard = nook.room(4, 5);
  c.chest(...hoard.tile(2, 0), 40).mob('rat', ...hoard.tile(1, -1), { range: 4 });
  d.stairs(4, 2);
  d.turn('+z');
  // The long gallery: a bat loops up and down it.
  const gallery = d.hall(12);
  c.mob('bat', ...gallery.tile(2, 0), { path: [gallery.tile(2, -1), gallery.tile(10, -1), gallery.tile(10, 1), gallery.tile(2, 1)] });
  c.potion(...gallery.tile(11, 1));
  d.turn('-x');
  d.hall(8);
  d.stairs(3, 1.5);
  d.hall(5);
  d.turn('+z');
  d.ramp(6, 2.5);
  // The great crypt: tombs in rows, skeletons among them, a chest at the back.
  const great = d.room(13, 11);
  for (const k of [2, 5, 8, 11]) { c.pillar(...great.tile(k, -3), 0.8); c.pillar(...great.tile(k, 3), 0.8); }
  c.mob('skeleton', ...great.tile(4, -1), { range: 6 }).mob('skeleton', ...great.tile(9, 1), { range: 6 });
  c.chest(...great.tile(6, -5), 60).gold(...great.tile(10, 5), 15);
  d.hall(5);
  d.turn('+x');
  const walk = d.hall(10);
  c.mob('rat', ...walk.tile(6, 0), { range: 4 });
  d.stairs(4, 2);
  // Over the dark on a bridge, a tile wide.
  d.bridge(7);
  const landing = d.room(7, 7);
  c.mob('skeleton', ...landing.tile(4, 0), { range: 4 });
  c.gold(...landing.tile(1, 3), 20);
  d.hall(4);
  d.turn('+z');
  d.hall(6);
  d.stairs(6, 3);
  // The vigil: three skeletons keep it, and a bat goes round the top.
  const vigil = d.room(9, 9);
  for (const [a, b] of [[2, -2], [2, 2], [6, -2], [6, 2]]) c.pillar(...vigil.tile(a, b), 0.8);
  c.mob('skeleton', ...vigil.tile(3, 0), { range: 5 }).mob('skeleton', ...vigil.tile(6, -3), { range: 5 }).mob('skeleton', ...vigil.tile(7, 3), { range: 5 });
  c.mob('bat', ...vigil.tile(1, -3), { path: [vigil.tile(1, -3), vigil.tile(1, 3), vigil.tile(7, 3), vigil.tile(7, -3)] });
  c.potion(...vigil.tile(8, -4));
  d.hall(6);
  d.turn('+x');
  const edge = d.ledge(12, { width: 2 });
  c.mob('rat', ...edge.tile(5, 0), { range: 4 }).gold(...edge.tile(9, 1), 10);
  d.stairs(3, 1.5);
  d.hall(3);
  d.exit(3);
  return c;
}

const CATACOMBS = {
  tiles: ['#a89a82', '#8f826c', '#7a5e40', '#6e6454'], walls: ['#77695a', '#665a4b', '#5a4430', '#5e5446'],
  ambient: [0.42, 0.4, 0.44], trap: '#5e3a2a', lift: '#8a7e6a',
};

function catacombs() {
  const c = new Dungeon({ name: 'The Catacombs', depth: 2, cols: 110, rows: 110, palette: CATACOMBS, intro: 'The dead are stacked in the walls. Some of them get up.' });
  c.room(2, 4, 5, 5, 46, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 46, heading: '+x' });
  d.hall(5);
  // The crusher hall: two blocks, out of step.
  const crush = d.hall(9);
  c.crusher(...across(crush, 3, { period: 2.6 }));
  c.crusher(...across(crush, 6, { period: 2.6, phase: 1.3 }));
  const bones = d.room(7, 7);
  c.mob('skeleton', ...bones.tile(3, -2), { range: 5 }).mob('skeleton', ...bones.tile(5, 2), { range: 5 });
  c.gold(...bones.tile(6, -3), 15);
  d.turn('+z');
  d.stairs(5, 2.5);
  // Spikes, twice.
  const spiked = d.hall(10);
  c.spike(...across(spiked, 3, { period: 2.4 }));
  c.spike(...across(spiked, 7, { period: 2.4, phase: 1.2 }));
  // The ossuary: a slime goes round it.
  const ossuary = d.room(9, 9);
  for (const [a, b] of [[2, -2], [2, 2], [6, -2], [6, 2]]) c.pillar(...ossuary.tile(a, b), 0.8);
  c.mob('slime', ...ossuary.tile(1, -3), { path: loop(ossuary, 1) });
  c.mob('skeleton', ...ossuary.tile(5, 0), { range: 4 });
  c.potion(...ossuary.tile(4, 4));
  d.hall(4);
  d.turn('+x');
  // Over the dark, with a bat crossing back and forth.
  const span1 = d.bridge(8);
  c.mob('bat', ...span1.tile(2, 0), { path: [span1.tile(1, -2), span1.tile(6, 2)] });
  const hub = d.room(7, 7);
  c.mob('rat', ...hub.tile(2, 2), { range: 5 }).mob('rat', ...hub.tile(4, -2), { range: 5 });
  // The key is kept up a passage off the back of the hub.
  const keyway = d.fork().jump(pick(hub.tile(3, -4), '-z'));
  const kw = keyway.hall(6);
  c.spike(...across(kw, 3, { period: 2.2, phase: 0.5 }));
  const vault = keyway.room(5, 7);
  c.key(...vault.tile(3, 0)).mob('skeleton', ...vault.tile(2, -2), { range: 4 }).gold(...vault.tile(4, 2), 20);
  c.revive(...vault.tile(1, 2));
  d.stairs(4, 2);
  // The locked way on.
  const barred = d.hall(8);
  gate(c, barred, 4);
  d.turn('+z');
  d.ramp(8, 3);
  // The charnel hall: two slimes, skeletons, a chest.
  const charnel = d.room(11, 11);
  c.mob('slime', ...charnel.tile(1, -4), { path: loop(charnel, 1, 0, 6) });
  c.mob('slime', ...charnel.tile(6, 4), { path: loop(charnel, 1, 5, 11).reverse() });
  c.mob('skeleton', ...charnel.tile(5, -2), { range: 6 }).mob('skeleton', ...charnel.tile(7, 3), { range: 6 });
  c.chest(...charnel.tile(9, -5), 60);
  d.hall(5);
  // A narrow way, a tile wide, under two crushers.
  const squeeze = d.hall(9, { width: 1 });
  c.crusher(...across(squeeze, 3, { period: 2.4 }));
  c.crusher(...across(squeeze, 6, { period: 2.4, phase: 0.8 }));
  d.hall(3);
  d.turn('+x');
  const ledge = d.ledge(12, { width: 2 });
  c.mob('rat', ...ledge.tile(4, 0), { range: 4 }).mob('rat', ...ledge.tile(9, 1), { range: 4 });
  c.gold(...ledge.tile(11, 0), 10);
  d.stairs(4, 2);
  const crossing = d.room(7, 7);
  c.mob('skeleton', ...crossing.tile(3, 0), { range: 4 });
  d.hall(3);
  d.turn('+z');
  const lower = d.hall(10);
  c.spike(...across(lower, 2, { period: 2 }));
  c.spike(...across(lower, 5, { period: 2, phase: 0.7 }));
  c.spike(...across(lower, 8, { period: 2, phase: 1.4 }));
  d.stairs(4, 2);
  const tomb = d.room(9, 9);
  c.mob('slime', ...tomb.tile(1, -3), { path: loop(tomb, 1) });
  c.mob('skeleton', ...tomb.tile(4, 2), { range: 5 }).mob('skeleton', ...tomb.tile(6, -2), { range: 5 });
  c.potion(...tomb.tile(7, 4)).gold(...tomb.tile(2, 4), 15);
  d.hall(4);
  d.turn('+x');
  d.hall(8);
  d.stairs(3, 1.5);
  d.hall(3);
  d.exit(3);
  return c;
}

const PITS = {
  tiles: ['#7f8c7a', '#6c7868', '#5b6b4c', '#5e6a5a'], walls: ['#59634f', '#4b5545', '#3f4b37', '#4b5347'],
  ambient: [0.34, 0.48, 0.42], trap: '#2f4a26', lift: '#7a8670',
};

function pits() {
  const c = new Dungeon({ name: 'The Slime Pits', depth: 3, cols: 100, rows: 112, palette: PITS, intro: 'Something wet moves down here. A great many somethings.' });
  c.room(2, 4, 5, 5, 52, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 52, heading: '+x' });
  d.hall(6);
  // The first pool: a slime goes round it, rats in the wet.
  const pool = d.room(9, 9);
  c.mob('slime', ...pool.tile(1, -3), { path: loop(pool, 1) });
  c.mob('rat', ...pool.tile(5, 2), { range: 5 });
  c.potion(...pool.tile(7, -3));
  d.hall(3);
  // Down the first sewer: banked, no walls.
  d.chute(8, 3);
  const sump = d.room(7, 7);
  c.mob('slime', ...sump.tile(1, -2), { path: loop(sump, 1) }).gold(...sump.tile(5, 2), 15);
  d.turn('+z');
  d.hall(4);
  // Spikes in the drip.
  const drip = d.hall(10);
  c.spike(...across(drip, 3, { period: 2.4 }));
  c.spike(...across(drip, 7, { period: 2.4, phase: 1.2 }));
  d.stairs(4, 2);
  // The green hall: slimes going round both ends of it, rats in the middle.
  const green = d.room(11, 11);
  for (const [a, b] of [[3, -3], [3, 3], [7, -3], [7, 3]]) c.pillar(...green.tile(a, b), 0.8);
  c.mob('slime', ...green.tile(1, -4), { path: loop(green, 1, 0, 6) });
  c.mob('slime', ...green.tile(6, 4), { path: loop(green, 1, 5, 11).reverse() });
  c.mob('rat', ...green.tile(5, 0), { range: 6 }).mob('rat', ...green.tile(8, -2), { range: 6 });
  c.chest(...green.tile(9, 4), 50);
  // The key, out of the side of the green hall and over the dark.
  const side = d.fork().jump(pick(green.tile(5, -6), '+x'));
  side.hall(3);
  const reach = side.bridge(7);
  c.mob('bat', ...reach.tile(3, 0), { path: [reach.tile(1, 2), reach.tile(6, -2)] });
  const cell = side.room(5, 7);
  c.key(...cell.tile(3, 0)).mob('slime', ...cell.tile(1, -2), { path: loop(cell, 1) }).gold(...cell.tile(4, 2), 20);
  c.revive(...cell.tile(2, 0));
  d.hall(3);
  const barred = d.hall(6);
  gate(c, barred, 3);
  d.turn('+x');
  const ledge = d.ledge(12, { width: 2 });
  c.mob('rat', ...ledge.tile(4, 0), { range: 4 }).mob('rat', ...ledge.tile(9, 1), { range: 4 });
  d.bridge(6);
  // The cistern.
  const cistern = d.room(7, 7);
  c.mob('slime', ...cistern.tile(1, -2), { path: loop(cistern, 1) });
  c.mob('bat', ...cistern.tile(3, 0), { path: [cistern.tile(1, 2), cistern.tile(5, -2)] });
  c.potion(...cistern.tile(5, 2));
  d.turn('+z');
  // The long sewer down.
  d.chute(10, 4);
  const drain = d.room(9, 9);
  c.mob('slime', ...drain.tile(1, -3), { path: loop(drain, 1, 0, 5) });
  c.mob('slime', ...drain.tile(5, 3), { path: loop(drain, 1, 4, 9).reverse() });
  c.mob('rat', ...drain.tile(4, 0), { range: 5 });
  c.gold(...drain.tile(7, -3), 20);
  d.hall(3);
  d.turn('-x');
  d.hall(8);
  d.stairs(4, 2);
  // The font: the biggest pool of them.
  const font = d.room(9, 9);
  for (const [a, b] of [[2, -2], [2, 2], [6, -2], [6, 2]]) c.pillar(...font.tile(a, b), 0.8);
  c.mob('slime', ...font.tile(1, -3), { path: loop(font, 1) });
  c.mob('slime', ...font.tile(4, 0), { path: [font.tile(4, -1), font.tile(4, 1)] });
  c.mob('rat', ...font.tile(7, 3), { range: 4 });
  c.chest(...font.tile(7, -4), 60);
  d.turn('+z');
  d.hall(5);
  const last = d.hall(10);
  c.crusher(...across(last, 3, { period: 2.4 }));
  c.spike(...across(last, 7, { period: 2.2, phase: 0.6 }));
  d.ramp(6, 2.5);
  const outfall = d.room(7, 7);
  c.mob('slime', ...outfall.tile(1, -2), { path: loop(outfall, 1) }).mob('bat', ...outfall.tile(4, 0), { path: [outfall.tile(2, 2), outfall.tile(5, -2)] });
  d.hall(3);
  d.exit(3);
  return c;
}

const CHASM = {
  tiles: ['#8c95a3', '#76808e', '#6d5a48', '#5e6672'], walls: ['#5f6774', '#525a66', '#4a3c30', '#4c535e'],
  ambient: [0.36, 0.42, 0.56], lift: '#7d8694',
};

function chasm() {
  const c = new Dungeon({ name: 'The Chasm', depth: 4, cols: 92, rows: 92, palette: CHASM, intro: 'The floor gives out. Ride the platforms; wait for them.' });
  c.room(2, 4, 5, 5, 60, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 60, heading: '+x' });
  d.hall(5);
  // The first gap: a platform goes back and forth across it.
  d.ferry(8, { period: 6.5 });
  const camp = d.room(7, 7);
  c.mob('goblin', ...camp.tile(3, -2), { range: 5 }).mob('goblin', ...camp.tile(5, 2), { range: 5 });
  c.gold(...camp.tile(6, 3), 15);
  // The long bridge, a bat flying over it.
  const long = d.bridge(10);
  c.mob('bat', ...long.tile(3, 0), { path: [long.tile(2, -2), long.tile(8, 2)] });
  d.room(5, 5);
  d.turn('+z');
  // Down the first shaft.
  d.shaft(5, { period: 7 });
  d.hall(5);
  const echoes = d.room(9, 9);
  for (const [a, b] of [[2, -2], [2, 2], [6, -2], [6, 2]]) c.pillar(...echoes.tile(a, b), 0.8);
  c.mob('goblin', ...echoes.tile(4, -1), { range: 5 }).mob('goblin', ...echoes.tile(6, 3), { range: 5 });
  c.mob('bat', ...echoes.tile(1, 0), { path: loop(echoes, 1) });
  c.potion(...echoes.tile(8, -4));
  d.hall(4);
  d.turn('+x');
  // Along the lip of the chasm; a goblin paces it.
  const lip = d.ledge(14, { width: 2 });
  c.mob('goblin', ...lip.tile(6, 0), { range: 4, path: [lip.tile(3, 0), lip.tile(10, 0)] });
  c.gold(...lip.tile(12, 1), 10);
  d.ferry(9, { period: 7 });
  const perch = d.room(7, 7);
  c.mob('goblin', ...perch.tile(4, 0), { range: 4 });
  d.stairs(5, 2.5);
  d.turn('+z');
  const span2 = d.bridge(8);
  c.mob('bat', ...span2.tile(4, 0), { path: [span2.tile(1, 2), span2.tile(7, -2)] });
  const stand = d.room(7, 7);
  c.mob('goblin', ...stand.tile(2, 2), { range: 4 }).gold(...stand.tile(5, -3), 15);
  // Down again.
  d.shaft(4, { period: 6.5 });
  d.hall(4);
  d.turn('-x');
  d.hall(8);
  d.ferry(8, { period: 6.5 });
  // The goblins' roost: a fire, their loot, and a lot of goblins.
  const roost = d.room(9, 9);
  c.mob('goblin', ...roost.tile(2, -3), { range: 6 }).mob('goblin', ...roost.tile(4, 3), { range: 6 }).mob('goblin', ...roost.tile(7, 0), { range: 6 });
  c.mob('bat', ...roost.tile(1, 0), { path: loop(roost, 1) });
  c.chest(...roost.tile(4, -4), 70).potion(...roost.tile(7, 4));
  c.revive(...roost.tile(2, 4));
  d.hall(3);
  d.turn('+z');
  d.stairs(6, 3);
  // A bridge that turns, a tile wide all the way.
  d.bridge(6);
  d.turn('+x', { width: 1 });
  const zig = d.bridge(6);
  c.mob('bat', ...zig.tile(3, 0), { path: [zig.tile(0, -2), zig.tile(5, 2)] });
  d.turn('+z', { width: 1 });
  d.bridge(6);
  const last = d.room(7, 7);
  c.mob('goblin', ...last.tile(3, -2), { range: 5 }).mob('goblin', ...last.tile(4, 2), { range: 5 });
  d.hall(3);
  d.turn('+x');
  const brink = d.ledge(12, { width: 2 });
  c.gold(...brink.tile(6, 1), 15);
  d.ferry(7, { period: 6 });
  d.hall(4);
  d.stairs(3, 1.5);
  d.exit(3);
  return c;
}

const GROTTO = {
  tiles: ['#7c7486', '#6a6274', '#5a4a3e', '#5e566a'], walls: ['#554c62', '#4a4256', '#3e3226', '#4c445a'],
  ambient: [0.42, 0.36, 0.52], trap: '#4a2a4a', lift: '#7a7088',
};

function grotto() {
  const c = new Dungeon({ name: 'The Fungal Grotto', depth: 5, cols: 90, rows: 100, palette: GROTTO, intro: 'Mushrooms taller than a man, and things that live in the damp under them.' });
  c.room(2, 4, 5, 5, 60, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 60, heading: '+x' });
  d.hall(5);
  // The cap room: stalks like pillars, a slime round them.
  const caps = d.room(9, 9);
  for (const [a, b] of [[2, -2], [6, 2]]) c.pillar(...caps.tile(a, b), 1.4);
  c.mob('slime', ...caps.tile(1, -3), { path: loop(caps, 1) }).mob('rat', ...caps.tile(5, 2), { range: 5 });
  c.gold(...caps.tile(7, -3), 15);
  d.stairs(4, 2);
  const ledge = d.ledge(10, { width: 2 });
  c.mob('rat', ...ledge.tile(4, 0), { range: 4 }).mob('rat', ...ledge.tile(8, 1), { range: 4 });
  const spores = d.room(7, 7);
  c.mob('goblin', ...spores.tile(2, 2), { range: 4 }).mob('goblin', ...spores.tile(5, -2), { range: 4 });
  c.potion(...spores.tile(5, 2));
  d.turn('+z');
  d.hall(4);
  d.ferry(9, { period: 6 });
  // The great grotto.
  const great = d.room(11, 11);
  for (const [a, b] of [[3, -3], [3, 3], [7, -3], [7, 3]]) c.pillar(...great.tile(a, b), 1.4);
  c.mob('slime', ...great.tile(1, -4), { path: loop(great, 1, 0, 6) });
  c.mob('slime', ...great.tile(6, 4), { path: loop(great, 1, 5, 11).reverse() });
  c.mob('goblin', ...great.tile(5, 0), { range: 6 }).mob('goblin', ...great.tile(8, -2), { range: 6 });
  c.chest(...great.tile(9, 4), 60);
  // The key: out of the side of the grotto, over the dark.
  const side = d.fork().jump(pick(great.tile(5, -6), '+x'));
  side.hall(3);
  const reach = side.bridge(7);
  c.mob('bat', ...reach.tile(3, 0), { path: [reach.tile(1, 2), reach.tile(6, -2)] });
  const nook = side.room(5, 7);
  c.key(...nook.tile(3, 0)).mob('slime', ...nook.tile(1, -2), { path: loop(nook, 1) });
  c.revive(...nook.tile(2, 2));
  d.hall(3);
  const barred = d.hall(6);
  gate(c, barred, 3);
  d.turn('+x');
  d.chute(10, 3);
  const pool = d.room(9, 9);
  c.mob('slime', ...pool.tile(1, -3), { path: loop(pool, 1) }).mob('rat', ...pool.tile(5, 2), { range: 5 });
  c.gold(...pool.tile(7, 3), 20);
  d.turn('+z');
  const drip = d.hall(10);
  c.spike(...across(drip, 3, { period: 2.3 }));
  c.spike(...across(drip, 7, { period: 2.3, phase: 1.15 }));
  d.stairs(4, 2);
  const rot = d.room(9, 9);
  c.mob('goblin', ...rot.tile(3, -2), { range: 5 }).mob('goblin', ...rot.tile(6, 2), { range: 5 });
  c.mob('bat', ...rot.tile(4, 0), { path: loop(rot, 2) });
  c.potion(...rot.tile(7, -3));
  d.hall(3);
  d.turn('-x');
  const span = d.bridge(8);
  c.mob('bat', ...span.tile(3, 0), { path: [span.tile(1, 2), span.tile(6, -2)] });
  const wood = d.room(7, 7);
  c.pillar(...wood.tile(3, 2), 1.4);
  c.mob('goblin', ...wood.tile(3, -1), { range: 4 }).gold(...wood.tile(5, -2), 15);
  d.turn('+z');
  d.ramp(6, 2.5);
  const mouth = d.room(7, 7);
  c.mob('slime', ...mouth.tile(1, -2), { path: loop(mouth, 1) });
  d.hall(3);
  d.exit(3);
  return c;
}

const WARRENS = {
  tiles: ['#9a7c5c', '#86694c', '#6e5238', '#5e4a36'], walls: ['#6e5640', '#5e4834', '#4e3a28', '#54422e'],
  ambient: [0.44, 0.38, 0.34], trap: '#4a2a1c', lift: '#8a6e50',
};

function warrens() {
  const c = new Dungeon({ name: 'The Goblin Warrens', depth: 6, cols: 112, rows: 139, palette: WARRENS, intro: 'Goblins, and what they keep. Two gates, two keys.' });
  c.room(2, 4, 5, 5, 70, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 70, heading: '+x' });
  d.hall(6);
  const post = d.room(9, 7);
  c.mob('goblin', ...post.tile(3, -2), { range: 5 }).mob('goblin', ...post.tile(6, 2), { range: 5 });
  c.gold(...post.tile(8, -3), 10);
  d.turn('+z');
  const run = d.hall(9);
  c.spike(...across(run, 3, { period: 2.2 }));
  c.spike(...across(run, 6, { period: 2.2, phase: 1.1 }));
  // The mess hall, and the storeroom off its side where the first key is.
  const mess = d.room(11, 9);
  c.mob('goblin', ...mess.tile(3, -2), { range: 6 }).mob('goblin', ...mess.tile(6, 3), { range: 6 }).mob('goblin', ...mess.tile(8, -3), { range: 6 });
  c.potion(...mess.tile(1, 4));
  const store = d.fork().jump(pick(mess.tile(5, -5), '+x'));
  store.hall(5);
  const larder = store.room(7, 7);
  c.key(...larder.tile(4, 0)).mob('orc', ...larder.tile(3, 2), { range: 4 }).gold(...larder.tile(6, -3), 20);
  c.revive(...larder.tile(1, 0));
  const gate1 = d.hall(6);
  gate(c, gate1, 3);
  d.stairs(5, 2.5);
  d.turn('+x');
  const lip = d.ledge(12, { width: 2 });
  c.mob('goblin', ...lip.tile(5, 0), { range: 4, path: [lip.tile(2, 0), lip.tile(10, 0)] });
  d.bridge(6);
  // The pens: rats loose, a goblin minding them.
  const pens = d.room(9, 9);
  for (const [a, b] of [[3, -2], [3, 2], [6, -2], [6, 2]]) c.pillar(...pens.tile(a, b), 0.6);
  c.mob('rat', ...pens.tile(2, -3), { range: 6 }).mob('rat', ...pens.tile(4, 3), { range: 6 }).mob('rat', ...pens.tile(7, -1), { range: 6 });
  c.mob('goblin', ...pens.tile(5, 0), { range: 5 });
  c.gold(...pens.tile(8, 4), 15);
  d.hall(3);
  d.turn('+z');
  d.ramp(8, 3);
  const tunnel = d.hall(10);
  c.spike(...across(tunnel, 3, { period: 2 }));
  c.spike(...across(tunnel, 7, { period: 2, phase: 1 }));
  // The chieftain's hall. The second key is in his strongroom, round the back.
  const chief = d.room(11, 11);
  c.mob('orc', ...chief.tile(5, 0), { range: 6 }).mob('orc', ...chief.tile(8, -3), { range: 6 });
  c.mob('goblin', ...chief.tile(3, 3), { range: 6 }).mob('goblin', ...chief.tile(7, 4), { range: 6 });
  c.chest(...chief.tile(9, 5), 80);
  const strong = d.fork().jump(pick(chief.tile(5, -6), '+x'));
  const sw = strong.hall(6);
  c.spike(...across(sw, 3, { period: 2.4, phase: 0.6 }));
  const vault = strong.room(5, 7);
  c.key(...vault.tile(3, 0)).mob('goblin', ...vault.tile(2, 2), { range: 4 }).mob('goblin', ...vault.tile(2, -2), { range: 4 });
  c.gold(...vault.tile(4, 3), 25);
  d.hall(4);
  d.turn('+x');
  d.hall(4);
  const gate2 = d.hall(6);
  gate(c, gate2, 2);
  d.stairs(4, 2);
  d.turn('+z');
  const gauntlet = d.hall(12);
  c.spike(...across(gauntlet, 2, { period: 1.9 }));
  c.spike(...across(gauntlet, 5, { period: 1.9, phase: 0.6 }));
  c.spike(...across(gauntlet, 8, { period: 1.9, phase: 1.2 }));
  c.mob('goblin', ...gauntlet.tile(10, 0), { range: 3 });
  const den = d.room(9, 9);
  c.mob('orc', ...den.tile(4, 0), { range: 5 }).mob('rat', ...den.tile(2, 3), { range: 5 }).mob('rat', ...den.tile(6, -3), { range: 5 });
  c.potion(...den.tile(7, 4)).gold(...den.tile(1, -4), 15);
  d.hall(3);
  // The burrows: a tunnel a tile wide, twisting, with goblins in it.
  const b1 = d.hall(6, { width: 1 });
  c.mob('goblin', ...b1.tile(4, 0), { range: 3 });
  d.turn('+x', { width: 1 });
  const b2 = d.hall(5, { width: 1 });
  c.gold(...b2.tile(2, 0), 10);
  d.turn('+z', { width: 1 });
  d.stairs(4, 2, { width: 1 });
  d.turn('-x', { width: 1 });
  const b3 = d.hall(4, { width: 1 });
  c.mob('rat', ...b3.tile(2, 0), { range: 3 });
  d.turn('+z', { width: 1 });
  d.hall(3, { width: 1 });
  // The fungus cavern: slimes in the damp.
  const cavern = d.room(11, 11);
  for (const [a, b] of [[3, -3], [3, 3], [7, -3], [7, 3]]) c.pillar(...cavern.tile(a, b), 0.6);
  c.mob('slime', ...cavern.tile(1, -4), { path: loop(cavern, 1, 0, 6) }).mob('slime', ...cavern.tile(6, 4), { path: loop(cavern, 1, 5, 11).reverse() });
  c.mob('goblin', ...cavern.tile(5, 0), { range: 5 });
  c.potion(...cavern.tile(9, -5)).chest(...cavern.tile(10, 5), 50);
  d.hall(3);
  d.turn('+x');
  const brink = d.ledge(12, { width: 2 });
  c.mob('goblin', ...brink.tile(8, 1), { range: 4 });
  d.bridge(5);
  const last = d.room(7, 7);
  c.mob('goblin', ...last.tile(3, -2), { range: 4 }).mob('goblin', ...last.tile(4, 2), { range: 4 });
  d.stairs(3, 1.5);
  d.hall(3);
  d.exit(3);
  return c;
}

const QUARRY = {
  tiles: ['#a99d89', '#968a76', '#7a6a52', '#857a68'], walls: ['#7d725f', '#6c6250', '#584c3a', '#6a5f4e'],
  ambient: [0.5, 0.46, 0.4], trap: '#4a3a2a', lift: '#9a8e78',
};

function quarry() {
  const c = new Dungeon({ name: 'The Quarry', depth: 7, cols: 100, rows: 106, palette: QUARRY, intro: 'They cut stone here, until some of the stone broke loose and came rolling after them.' });
  c.room(2, 4, 5, 5, 80, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 80, heading: '+x' });
  d.hall(5);
  // The cutting: blocks of stone stood about, and one of them is not a block.
  const cutting = d.room(9, 9);
  for (const [a, b] of [[2, -2], [6, 2]]) c.pillar(...cutting.tile(a, b), 1.2);
  c.mob('rock', ...cutting.tile(5, -1), { range: 5 }).mob('goblin', ...cutting.tile(3, 2), { range: 5 });
  c.gold(...cutting.tile(7, -3), 15);
  d.ramp(6, 2);
  d.hall(2);
  // Over the old workings on a platform.
  d.ferry(9, { period: 6 });
  const yard = d.room(7, 7);
  c.mob('rock', ...yard.tile(4, 0), { range: 4 }).potion(...yard.tile(5, 2));
  d.turn('+z');
  d.hall(4);
  // The presses: stone blocks dropping, out of step.
  const press = d.hall(10);
  c.crusher(...across(press, 3, { period: 2.4 }));
  c.crusher(...across(press, 7, { period: 2.4, phase: 1.2 }));
  d.stairs(5, 2.5);
  // The pit face: boulders and the goblins who dig round them.
  const face = d.room(11, 11);
  for (const [a, b] of [[3, -3], [7, 3]]) c.pillar(...face.tile(a, b), 1.2);
  c.mob('rock', ...face.tile(4, -2), { range: 6 }).mob('rock', ...face.tile(8, 3), { range: 6 });
  c.mob('goblin', ...face.tile(6, 0), { range: 6 }).mob('goblin', ...face.tile(2, 3), { range: 6 });
  c.mob('bat', ...face.tile(5, 0), { path: loop(face, 2) });
  c.chest(...face.tile(9, -4), 70);
  // The key is in the foreman's hut, over the dark.
  const side = d.fork().jump(pick(face.tile(5, -6), '+x'));
  side.hall(3);
  side.bridge(6);
  const hut = side.room(5, 7);
  c.key(...hut.tile(3, 0)).mob('rock', ...hut.tile(2, 2), { range: 3 }).gold(...hut.tile(4, -2), 25);
  c.revive(...hut.tile(1, -2));
  d.hall(3);
  const barred = d.hall(6);
  gate(c, barred, 3);
  d.turn('+x');
  const ledge = d.ledge(12, { width: 2 });
  c.mob('goblin', ...ledge.tile(4, 0), { range: 4 }).mob('goblin', ...ledge.tile(9, 1), { range: 4 });
  // Down the shaft on the cage.
  d.shaft(4, { period: 7 });
  d.hall(3);
  const sorting = d.room(9, 9);
  c.mob('rock', ...sorting.tile(3, -2), { range: 5 }).mob('rock', ...sorting.tile(6, 2), { range: 5 }).mob('rat', ...sorting.tile(4, 3), { range: 5 });
  c.potion(...sorting.tile(7, -3));
  d.turn('+z');
  // The spoil chute.
  d.chute(10, 3);
  const spoil = d.room(9, 9);
  c.mob('rock', ...spoil.tile(3, 2), { range: 5 }).mob('rock', ...spoil.tile(6, -2), { range: 5 }).mob('goblin', ...spoil.tile(4, 0), { range: 5 });
  c.gold(...spoil.tile(7, 3), 20);
  d.hall(3);
  d.turn('-x');
  const span = d.bridge(8);
  c.mob('bat', ...span.tile(3, 0), { path: [span.tile(1, 2), span.tile(6, -2)] });
  const store = d.room(7, 7);
  c.mob('goblin', ...store.tile(3, 0), { range: 4 }).mob('bat', ...store.tile(4, 2), { path: [store.tile(1, -2), store.tile(5, 2)] });
  d.stairs(4, 2);
  d.turn('+z');
  // The gauntlet: presses and spikes.
  const gauntlet = d.hall(10);
  c.crusher(...across(gauntlet, 2, { period: 2.2 }));
  c.spike(...across(gauntlet, 5, { period: 2 }));
  c.crusher(...across(gauntlet, 8, { period: 2.2, phase: 1.1 }));
  // The great quarry floor.
  const floor = d.room(11, 11);
  for (const [a, b] of [[2, -3], [5, 3], [8, -2]]) c.pillar(...floor.tile(a, b), 1.4);
  c.mob('rock', ...floor.tile(3, 1), { range: 6 }).mob('rock', ...floor.tile(6, -2), { range: 6 }).mob('rock', ...floor.tile(9, 2), { range: 6 });
  c.chest(...floor.tile(9, -4), 80).potion(...floor.tile(1, 4));
  d.hall(3);
  d.exit(3);
  return c;
}

const HATCHERY = {
  tiles: ['#b09468', '#9a8058', '#7a5a38', '#8a7254'], walls: ['#7a6244', '#6a5438', '#54402a', '#634e36'],
  ambient: [0.54, 0.42, 0.3], trap: '#5a3a1a', lift: '#a08660',
};

function hatchery() {
  const c = new Dungeon({ name: 'The Hatchery', depth: 8, cols: 100, rows: 108, palette: HATCHERY, intro: 'Warm, and quiet, and something down here is about to hatch.' });
  c.room(2, 4, 5, 5, 72, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 72, heading: '+x' });
  d.hall(5);
  // The nursery: the little things it keeps.
  const nursery = d.room(9, 9);
  c.mob('slime', ...nursery.tile(1, -3), { path: loop(nursery, 1) });
  c.mob('rat', ...nursery.tile(4, 2), { range: 5 }).mob('rat', ...nursery.tile(6, -2), { range: 5 });
  c.gold(...nursery.tile(7, 3), 15);
  d.stairs(4, 2);
  const warmway = d.hall(8);
  c.spike(...across(warmway, 3, { period: 2.2 }));
  c.spike(...across(warmway, 6, { period: 2.2, phase: 1.1 }));
  const warm = d.room(7, 7);
  c.mob('goblin', ...warm.tile(2, 2), { range: 4 }).mob('goblin', ...warm.tile(5, -2), { range: 4 });
  d.turn('+z');
  d.hall(4);
  d.ferry(9, { period: 6 });
  // The brood hall.
  const brood = d.room(9, 9);
  for (const [a, b] of [[2, -2], [6, 2]]) c.pillar(...brood.tile(a, b), 0.8);
  c.mob('slime', ...brood.tile(1, -3), { path: loop(brood, 1, 0, 5) });
  c.mob('slime', ...brood.tile(5, 3), { path: loop(brood, 1, 4, 9).reverse() });
  c.mob('rock', ...brood.tile(4, 0), { range: 4 });
  c.potion(...brood.tile(7, -3));
  // The key: through the side of the brood hall, over the dark.
  const side = d.fork().jump(pick(brood.tile(4, -5), '+x'));
  side.hall(3);
  const reach = side.bridge(7);
  c.mob('bat', ...reach.tile(3, 0), { path: [reach.tile(1, 2), reach.tile(6, -2)] });
  const keep = side.room(5, 7);
  c.key(...keep.tile(3, 0)).mob('rat', ...keep.tile(1, -2), { range: 3 }).mob('rat', ...keep.tile(4, 2), { range: 3 });
  c.revive(...keep.tile(3, -2));
  c.gold(...keep.tile(2, 2), 25);
  d.hall(3);
  const barred = d.hall(6);
  gate(c, barred, 3);
  d.turn('+x');
  const ledge = d.ledge(12, { width: 2 });
  c.mob('goblin', ...ledge.tile(4, 0), { range: 4 }).mob('goblin', ...ledge.tile(9, 1), { range: 4 });
  d.stairs(5, 2.5);
  // The shell yard: old shells, and stones that move.
  const yard = d.room(9, 9);
  c.mob('rock', ...yard.tile(3, -2), { range: 5 }).mob('rock', ...yard.tile(6, 2), { range: 5 });
  c.mob('bat', ...yard.tile(4, 0), { path: loop(yard, 2) });
  c.chest(...yard.tile(7, -3), 70);
  d.turn('+z');
  const press = d.hall(10);
  c.crusher(...across(press, 3, { period: 2.4 }));
  c.crusher(...across(press, 7, { period: 2.4, phase: 1.2 }));
  d.chute(8, 3);
  // The straw warren.
  const straw = d.room(9, 9);
  c.mob('slime', ...straw.tile(1, -3), { path: loop(straw, 1) });
  c.mob('goblin', ...straw.tile(4, 2), { range: 5 }).mob('rat', ...straw.tile(6, -2), { range: 5 });
  c.gold(...straw.tile(7, 3), 20);
  d.hall(3);
  d.turn('-x');
  const span = d.bridge(10);
  c.mob('bat', ...span.tile(3, 0), { path: [span.tile(1, 2), span.tile(6, -2)] });
  c.mob('bat', ...span.tile(8, 0), { path: [span.tile(6, -2), span.tile(9, 2)] });
  const ante = d.room(7, 7);
  c.mob('goblin', ...ante.tile(3, 0), { range: 4 });
  c.potion(...ante.tile(1, 2)).potion(...ante.tile(5, -2));
  c.revive(...ante.tile(3, 2));
  d.turn('+z');
  d.stairs(5, 2.5);
  d.hall(4);
  // The nest: straw and gold heaped round the walls, and Eggdreessen in the middle of the way out.
  const nest = d.room(15, 13);
  for (const [a, b] of [[3, -4], [3, 4], [8, -4], [8, 4]]) c.pillar(...nest.tile(a, b), 0.8);
  for (const [a, b] of [[1, -5], [2, 5], [6, -6], [7, 6], [11, -5], [12, 5]]) c.gold(...nest.tile(a, b), 25);
  c.chest(...nest.tile(13, -5), 110).chest(...nest.tile(13, 5), 110);
  c.mob('egg', ...nest.tile(11, 0), { range: 3, facing: Math.PI });
  d.hall(3);
  d.exit(3);
  return c;
}

const IRON = {
  tiles: ['#7e828a', '#6c7078', '#5e4a3a', '#62666e'], walls: ['#565a62', '#4a4e56', '#42342a', '#4e525a'],
  ambient: [0.42, 0.42, 0.48], trap: '#5a2a1a', lift: '#80848c',
};

function ironHalls() {
  const c = new Dungeon({ name: 'The Iron Halls', depth: 9, cols: 84, rows: 104, palette: IRON, intro: "The orcs' fortress. Two gates, two keys, and everything that guards them." });
  c.room(2, 4, 5, 5, 90, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 90, heading: '+x' });
  d.hall(4);
  // The gatehouse.
  const gatehouse = d.room(9, 9);
  c.mob('orc', ...gatehouse.tile(3, -2), { range: 5 }).mob('orc', ...gatehouse.tile(6, 2), { range: 5 }).mob('goblin', ...gatehouse.tile(4, 3), { range: 5 });
  const press = d.hall(10);
  c.crusher(...across(press, 3, { period: 2.3 }));
  c.crusher(...across(press, 7, { period: 2.3, phase: 1.15 }));
  d.stairs(4, 2);
  const guard = d.room(7, 7);
  c.mob('skeleton', ...guard.tile(2, -2), { range: 4 }).mob('skeleton', ...guard.tile(5, 2), { range: 4 });
  c.potion(...guard.tile(5, -2));
  d.turn('+z');
  d.hall(4);
  // The armoury.
  const armoury = d.room(11, 11);
  for (const [a, b] of [[3, -3], [3, 3], [7, -3], [7, 3]]) c.pillar(...armoury.tile(a, b), 0.8);
  c.mob('orc', ...armoury.tile(4, -1), { range: 6 }).mob('orc', ...armoury.tile(8, 2), { range: 6 });
  c.mob('goblin', ...armoury.tile(2, 3), { range: 6 }).mob('goblin', ...armoury.tile(6, -4), { range: 6 });
  c.chest(...armoury.tile(9, -4), 80);
  // The first key, across a gap on a platform.
  const side1 = d.fork().jump(pick(armoury.tile(5, -6), '+x'));
  side1.hall(3);
  side1.ferry(9, { period: 6 });
  const store = side1.room(5, 7);
  c.key(...store.tile(3, 0)).mob('orc', ...store.tile(2, 2), { range: 3 });
  c.revive(...store.tile(1, -2));
  d.hall(3);
  const barred1 = d.hall(6);
  gate(c, barred1, 3);
  d.turn('+x');
  const ledge = d.ledge(12, { width: 2 });
  c.mob('goblin', ...ledge.tile(4, 0), { range: 4 }).mob('goblin', ...ledge.tile(9, 1), { range: 4 });
  d.shaft(4, { period: 7 });
  d.hall(3);
  // The yard, where they break stone.
  const yard = d.room(9, 9);
  c.mob('rock', ...yard.tile(3, -2), { range: 5 }).mob('rock', ...yard.tile(6, 2), { range: 5 }).mob('orc', ...yard.tile(4, 0), { range: 5 });
  // The second key, off the yard's near side.
  const side2 = d.fork().jump(pick(yard.tile(4, 5), '+z'));
  side2.hall(2);
  side2.bridge(4);
  const cell = side2.room(5, 5);
  c.key(...cell.tile(3, 0)).mob('skeleton', ...cell.tile(2, 1), { range: 3 }).gold(...cell.tile(4, -1), 25);
  d.turn('+z');
  const barred2 = d.hall(6);
  gate(c, barred2, 3);
  d.chute(10, 3);
  // The throne hall.
  const throne = d.room(11, 11);
  for (const [a, b] of [[3, -3], [3, 3], [7, -3], [7, 3]]) c.pillar(...throne.tile(a, b), 0.8);
  c.mob('orc', ...throne.tile(3, 0), { range: 6 }).mob('orc', ...throne.tile(6, -3), { range: 6 }).mob('orc', ...throne.tile(8, 3), { range: 6 });
  c.mob('skeleton', ...throne.tile(5, 2), { range: 6 });
  c.chest(...throne.tile(9, -4), 100).potion(...throne.tile(1, 4));
  d.hall(3);
  d.turn('-x');
  const span = d.bridge(8);
  c.mob('bat', ...span.tile(3, 0), { path: [span.tile(1, 2), span.tile(6, -2)] });
  const barracks = d.room(7, 7);
  c.mob('goblin', ...barracks.tile(2, 2), { range: 4 }).mob('goblin', ...barracks.tile(5, -2), { range: 4 });
  c.potion(...barracks.tile(5, 2));
  d.turn('+z');
  const gauntlet = d.hall(10);
  c.crusher(...across(gauntlet, 2, { period: 2.2 }));
  c.spike(...across(gauntlet, 5, { period: 2 }));
  c.crusher(...across(gauntlet, 8, { period: 2.2, phase: 1.1 }));
  d.ramp(6, 2.5);
  const last = d.room(9, 9);
  c.mob('orc', ...last.tile(4, -2), { range: 5 }).mob('rock', ...last.tile(5, 2), { range: 5 });
  c.gold(...last.tile(7, 3), 30);
  d.hall(3);
  d.exit(3);
  return c;
}

const FORGE = {
  tiles: ['#6a6460', '#5a5450', '#4a3a30', '#3e3a38'], walls: ['#4a4442', '#3e3936', '#33281f', '#34302e'],
  ambient: [0.5, 0.36, 0.3], trap: '#4a2418', lift: '#6e6662',
};

/** A room that is a lake of lava `below` the floor, with only the tiles `keep` returns (along, across) left standing. */
function lavaRoom(c, d, length, width, keep, { below = 0.6 } = {}) {
  const h = d.h;
  const room = d.room(length, width);
  c.lava(room.x, room.z, room.w, room.d, h - below);
  for (let a = 0; a < length; a++) {
    for (let b = room.lo; b < room.lo + width; b++) if (keep(a, b)) c.flat(...room.tile(a, b), 1, 1, h);
  }
  return room;
}

function forge() {
  const c = new Dungeon({ name: 'The Forge', depth: 10, cols: 155, rows: 123, palette: FORGE, intro: 'Rivers of fire, and the hammers of the deep. Stay on the stone.' });
  c.room(2, 4, 5, 5, 80, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 80, heading: '+x' });
  d.hall(5);
  // The first river: a stone path wanders across it.
  const river = lavaRoom(c, d, 11, 7, (a, b) => a < 2 || a > 8 || (a < 5 ? b === -1 : a === 5 ? b >= -1 && b <= 1 : b === 1));
  c.mob('skeleton', ...river.tile(9, 0), { range: 4 });
  d.hall(4);
  // The hammers.
  const hammers = d.hall(10);
  c.crusher(...across(hammers, 2, { period: 2.4 }));
  c.crusher(...across(hammers, 5, { period: 2.4, phase: 0.8 }));
  c.crusher(...across(hammers, 8, { period: 2.4, phase: 1.6 }));
  const anvil = d.room(9, 9);
  c.mob('orc', ...anvil.tile(4, 0), { range: 5 }).mob('skeleton', ...anvil.tile(6, 3), { range: 5 });
  c.gold(...anvil.tile(7, -3), 20).potion(...anvil.tile(1, 4));
  d.turn('+z');
  d.stairs(5, 2.5);
  // Over the fire on a platform.
  d.hall(3);
  const pool = d.ferry(8, { period: 6.5 });
  c.lava(pool.x - 3, pool.z, pool.w + 6, pool.d, d.h - 1, { fill: true });
  const islet = d.room(7, 7);
  c.mob('wraith', ...islet.tile(1, 0), { path: loop(islet, 1) });
  d.hall(3);
  d.turn('+x');
  // A bridge a tile wide over a river of lava.
  const flow = d.hall(2, { walls: 'z0' });
  c.lava(flow.x + 2, flow.z - 4, 9, 9, d.h - 1.2, { fill: true });
  const span = d.bridge(9);
  c.mob('wraith', ...span.tile(4, 0), { path: [span.tile(1, -2), span.tile(7, 2)] });
  const smithy = d.room(9, 9);
  c.mob('orc', ...smithy.tile(3, -2), { range: 5 }).mob('orc', ...smithy.tile(6, 2), { range: 5 });
  c.chest(...smithy.tile(8, -4), 80);
  d.hall(3);
  d.turn('+z');
  d.ramp(8, 3);
  // The great furnace: lava all round and a cross of stone through it.
  const furnace = lavaRoom(c, d, 13, 13, (a, b) => a < 2 || a > 10 || b === 0 || (a === 6 && Math.abs(b) <= 5) || (Math.abs(b) === 5 && a >= 4 && a <= 8));
  c.mob('wraith', ...furnace.tile(4, 5), { path: [furnace.tile(4, 5), furnace.tile(8, 5), furnace.tile(8, -5), furnace.tile(4, -5)] });
  c.mob('orc', ...furnace.tile(6, 0), { range: 4 });
  c.potion(...furnace.tile(6, -5)).gold(...furnace.tile(6, 5), 30);
  d.hall(4);
  const press = d.hall(8, { width: 1 });
  c.crusher(...across(press, 2, { period: 2.2 }));
  c.crusher(...across(press, 5, { period: 2.2, phase: 1.1 }));
  d.hall(3);
  d.turn('+x');
  const cooling = d.ledge(12, { width: 2 });
  c.mob('skeleton', ...cooling.tile(6, 0), { range: 4 }).gold(...cooling.tile(10, 1), 15);
  d.ferry(8, { period: 6 });
  const foundry = d.room(9, 9);
  c.mob('orc', ...foundry.tile(3, 0), { range: 5 }).mob('wraith', ...foundry.tile(1, -3), { path: loop(foundry, 1) });
  c.mob('skeleton', ...foundry.tile(6, 3), { range: 5 });
  d.hall(3);
  d.turn('+z');
  // The slag run: a channel down through the fire.
  const slag = d.chute(10, 3, { width: 3 });
  c.lava(slag.x - 3, slag.z, 9, slag.d, d.h - 0.8, { fill: true });
  const landing = d.room(7, 7);
  c.mob('orc', ...landing.tile(4, 0), { range: 4 }).potion(...landing.tile(1, -3), 10);
  c.revive(...landing.tile(1, 3));
  d.hall(3);
  d.turn('+x');
  // Stepping stones: a path a tile wide, winding through the lava.
  const path = new Set(['2,0', '3,0', '3,-1', '3,-2', '4,-2', '5,-2', '5,-1', '5,0', '5,1', '5,2', '6,2', '7,2', '7,1', '7,0', '8,0', '9,0', '10,0']);
  const stones = lavaRoom(c, d, 13, 5, (a, b) => a < 2 || a > 10 || path.has(`${a},${b}`));
  c.mob('wraith', ...stones.tile(5, 0), { path: [stones.tile(2, -2), stones.tile(10, -2), stones.tile(10, 2), stones.tile(2, 2)] });
  d.hall(3);
  // The bellows: crushers over a bridge.
  const bellows = d.bridge(9, { width: 3 });
  c.lava(bellows.x, bellows.z - 3, bellows.w, 9, d.h - 1.2, { fill: true });
  c.crusher(...across(bellows, 3, { period: 2.5 }));
  c.crusher(...across(bellows, 6, { period: 2.5, phase: 1.25 }));
  const hearth = d.room(9, 9);
  c.mob('orc', ...hearth.tile(3, -2), { range: 5 }).mob('skeleton', ...hearth.tile(6, 3), { range: 5 });
  c.gold(...hearth.tile(8, -4), 30).potion(...hearth.tile(1, 4), 10);
  d.hall(3);
  d.turn('+z');
  d.stairs(5, 2.5);
  // The last river, and the way down beyond it.
  const lastRiver = lavaRoom(c, d, 9, 7, (a, b) => a < 2 || a > 6
    || (a === 2 && b <= 0) || (a === 3 && b === -2) || a === 4 || (a === 5 && b === 2) || (a === 6 && b >= 0));
  c.mob('skeleton', ...lastRiver.tile(7, 0), { range: 3 });
  d.hall(4);
  d.exit(3);
  return c;
}

const WELL = {
  tiles: ['#7a8296', '#687084', '#4e4a5e', '#5e667a'], walls: ['#525a6e', '#464e62', '#3a3448', '#4c5468'],
  ambient: [0.34, 0.4, 0.58], trap: '#2a3a5a', lift: '#7a8298',
};

function well() {
  const c = new Dungeon({ name: 'The Spirit Well', depth: 11, cols: 82, rows: 98, palette: WELL, intro: 'A well that goes down further than wells go. The dead drift up it.' });
  c.room(2, 4, 5, 5, 110, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 110, heading: '+x' });
  d.hall(5);
  // The shrine.
  const shrine = d.room(9, 9);
  for (const [a, b] of [[2, -2], [2, 2], [6, -2], [6, 2]]) c.pillar(...shrine.tile(a, b), 0.8);
  c.mob('wraith', ...shrine.tile(1, -3), { path: loop(shrine, 1) });
  c.mob('skeleton', ...shrine.tile(4, 0), { range: 5 }).mob('skeleton', ...shrine.tile(7, 2), { range: 5 });
  const span1 = d.bridge(8);
  c.mob('bat', ...span1.tile(3, 0), { path: [span1.tile(1, 2), span1.tile(6, -2)] });
  const landing = d.room(7, 7);
  c.mob('skeleton', ...landing.tile(3, 0), { range: 4 }).potion(...landing.tile(5, 2));
  // Down the well on a platform.
  d.shaft(5, { period: 7 });
  d.hall(3);
  d.turn('+z');
  const bones = d.hall(10);
  c.spike(...across(bones, 3, { period: 2.2 }));
  c.spike(...across(bones, 7, { period: 2.2, phase: 1.1 }));
  // The hall of echoes.
  const echoes = d.room(11, 11);
  for (const [a, b] of [[3, -3], [3, 3], [7, -3], [7, 3]]) c.pillar(...echoes.tile(a, b), 0.8);
  c.mob('wraith', ...echoes.tile(1, -4), { path: loop(echoes, 1, 0, 6) });
  c.mob('wraith', ...echoes.tile(6, 4), { path: loop(echoes, 1, 5, 11).reverse() });
  c.mob('skeleton', ...echoes.tile(5, 0), { range: 6 }).mob('skeleton', ...echoes.tile(8, -2), { range: 6 });
  c.chest(...echoes.tile(9, 4), 90);
  // The key, kept across the dark.
  const side = d.fork().jump(pick(echoes.tile(5, -6), '+x'));
  side.hall(3);
  const reach = side.bridge(7);
  c.mob('bat', ...reach.tile(3, 0), { path: [reach.tile(1, 2), reach.tile(6, -2)] });
  const reliquary = side.room(5, 7);
  c.key(...reliquary.tile(3, 0)).mob('wraith', ...reliquary.tile(1, -2), { path: loop(reliquary, 1) });
  c.revive(...reliquary.tile(2, 2));
  d.hall(3);
  const barred = d.hall(6);
  gate(c, barred, 3);
  d.turn('+x');
  const ledge = d.ledge(12, { width: 2 });
  c.mob('skeleton', ...ledge.tile(4, 0), { range: 4 }).mob('skeleton', ...ledge.tile(9, 1), { range: 4 });
  d.bridge(6);
  const head = d.room(7, 7);
  c.mob('wraith', ...head.tile(3, 0), { path: loop(head, 1) }).mob('bat', ...head.tile(4, 2), { path: [head.tile(1, -2), head.tile(5, 2)] });
  d.turn('+z');
  // Further down the well.
  d.shaft(5, { period: 7 });
  d.hall(3);
  const chapel = d.room(9, 9);
  c.mob('wraith', ...chapel.tile(1, -3), { path: loop(chapel, 1) });
  c.mob('skeleton', ...chapel.tile(4, 2), { range: 5 }).mob('skeleton', ...chapel.tile(6, -2), { range: 5 });
  c.potion(...chapel.tile(7, 3));
  d.hall(3);
  d.turn('-x');
  const span2 = d.bridge(10);
  c.mob('bat', ...span2.tile(3, 0), { path: [span2.tile(1, 2), span2.tile(6, -2)] });
  c.mob('bat', ...span2.tile(8, 0), { path: [span2.tile(6, -2), span2.tile(9, 2)] });
  const niche = d.room(7, 7);
  c.mob('skeleton', ...niche.tile(3, 0), { range: 4 });
  c.revive(...niche.tile(5, 2)).gold(...niche.tile(1, -2), 20);
  d.turn('+z');
  const press = d.hall(10);
  c.crusher(...across(press, 3, { period: 2.3 }));
  c.crusher(...across(press, 7, { period: 2.3, phase: 1.15 }));
  d.stairs(5, 2.5);
  // The last vigil.
  const vigil = d.room(9, 9);
  for (const [a, b] of [[2, -2], [2, 2], [6, -2], [6, 2]]) c.pillar(...vigil.tile(a, b), 0.8);
  c.mob('wraith', ...vigil.tile(1, -3), { path: loop(vigil, 1) }).mob('wraith', ...vigil.tile(4, 0), { path: [vigil.tile(4, -1), vigil.tile(4, 1)] });
  c.mob('skeleton', ...vigil.tile(5, 1), { range: 5 }).mob('skeleton', ...vigil.tile(7, -3), { range: 5 });
  c.chest(...vigil.tile(7, 4), 110);
  d.hall(3);
  d.exit(3);
  return c;
}

const LAIR = {
  tiles: ['#8a6a5a', '#74584a', '#5a4030', '#4e3a32'], walls: ['#5e463a', '#4e3a30', '#3e2c22', '#46342c'],
  ambient: [0.46, 0.34, 0.32], trap: '#4a2016', lift: '#7a6050',
};

function lair() {
  const c = new Dungeon({ name: "The Dragon's Lair", depth: 12, cols: 83, rows: 130, palette: LAIR, intro: 'At the bottom of everything, something large is asleep on the gold.' });
  c.room(2, 4, 5, 5, 96, { torches: 3 });
  c.start = { x: 4, z: 6 };
  const d = digger(c, { x: 7, z: 6, h: 96, heading: '+x' });
  d.hall(6);
  const hall1 = d.room(9, 9);
  c.mob('skeleton', ...hall1.tile(3, -2), { range: 5 }).mob('skeleton', ...hall1.tile(6, 2), { range: 5 }).mob('wraith', ...hall1.tile(1, 0), { path: loop(hall1, 1) });
  d.turn('+z');
  const crush = d.hall(9);
  c.crusher(...across(crush, 3, { period: 2.3 }));
  c.crusher(...across(crush, 6, { period: 2.3, phase: 1.15 }));
  d.stairs(5, 2.5);
  const barracks = d.room(11, 9);
  c.mob('orc', ...barracks.tile(3, -2), { range: 6 }).mob('orc', ...barracks.tile(7, 2), { range: 6 }).mob('goblin', ...barracks.tile(5, -3), { range: 6 });
  c.potion(...barracks.tile(9, 4));
  // The key is down a side way, over the dark.
  const side = d.fork().jump(pick(barracks.tile(5, -5), '+x'));
  side.hall(3);
  const sideSpan = side.bridge(7);
  c.mob('bat', ...sideSpan.tile(3, 0), { path: [sideSpan.tile(1, 2), sideSpan.tile(6, -2)] });
  const keep = side.room(7, 7);
  c.key(...keep.tile(4, 0)).mob('skeleton', ...keep.tile(2, 2), { range: 4 }).mob('skeleton', ...keep.tile(5, -2), { range: 4 });
  c.potion(...keep.tile(1, -3), 10);
  c.revive(...keep.tile(1, 3));
  c.gold(...keep.tile(6, 3), 30);
  const bar = d.hall(6);
  gate(c, bar, 3);
  d.turn('+x');
  d.ferry(9, { period: 7 });
  const ledge = d.ledge(12, { width: 2 });
  c.mob('goblin', ...ledge.tile(4, 0), { range: 4 }).mob('goblin', ...ledge.tile(9, 1), { range: 4 });
  d.bridge(6);
  // The burning way.
  const burn = lavaRoom(c, d, 11, 9, (a, b) => a < 2 || a > 8 || (a % 4 < 2 ? b === -2 : b === 2) || (a % 2 === 1 && Math.abs(b) <= 2 && a !== 1));
  c.mob('wraith', ...burn.tile(5, 0), { path: [burn.tile(3, -2), burn.tile(3, 2), burn.tile(7, 2), burn.tile(7, -2)] });
  d.hall(3);
  d.turn('+z');
  d.shaft(5, { period: 7 });
  d.hall(4);
  const gauntlet = d.hall(12);
  c.spike(...across(gauntlet, 2, { period: 2 }));
  c.crusher(...across(gauntlet, 5, { period: 2.4 }));
  c.spike(...across(gauntlet, 8, { period: 2, phase: 1 }));
  const well = d.room(7, 7);
  c.mob('skeleton', ...well.tile(3, -2), { range: 4 }).potion(...well.tile(5, 2), 10);
  d.hall(2);
  d.turn('-x');
  // The bone bridge: long, a tile wide, bats about it.
  const bones = d.bridge(14);
  c.mob('bat', ...bones.tile(3, 0), { path: [bones.tile(2, -2), bones.tile(7, 2)] });
  c.mob('bat', ...bones.tile(10, 0), { path: [bones.tile(8, 2), bones.tile(13, -2)] });
  const nest = d.room(7, 7);
  c.mob('goblin', ...nest.tile(3, 2), { range: 4 }).mob('goblin', ...nest.tile(4, -2), { range: 4 });
  c.gold(...nest.tile(5, 3), 20);
  d.hall(2);
  d.turn('+z');
  d.stairs(5, 2.5);
  const crypt = d.room(9, 9);
  for (const [a, b] of [[2, -2], [2, 2], [6, -2], [6, 2]]) c.pillar(...crypt.tile(a, b), 0.8);
  c.mob('wraith', ...crypt.tile(1, -3), { path: loop(crypt, 1) }).mob('orc', ...crypt.tile(4, 0), { range: 5 }).mob('skeleton', ...crypt.tile(7, 3), { range: 5 });
  c.chest(...crypt.tile(8, -4), 90);
  d.hall(3);
  d.turn('+x');
  d.stairs(5, 2.5);
  const flow = d.hall(2, { walls: 'z0' });
  c.lava(flow.x + 2, flow.z - 4, 10, 9, d.h - 1.2, { fill: true });
  const span = d.bridge(10);
  c.mob('bat', ...span.tile(3, 0), { path: [span.tile(1, -2), span.tile(8, 2)] });
  c.mob('wraith', ...span.tile(7, 0), { path: [span.tile(4, 3), span.tile(9, -3)] });
  const ante = d.room(9, 9);
  c.mob('orc', ...ante.tile(3, -2), { range: 5 }).mob('orc', ...ante.tile(6, 2), { range: 5 });
  c.potion(...ante.tile(1, 4)).potion(...ante.tile(8, -4));
  c.revive(...ante.tile(8, 4));
  d.hall(3);
  d.turn('+z');
  d.ferry(9, { period: 7 });
  d.hall(4);
  // The lair: the hoard heaped round the walls, and the dragon across the way out.
  const lairRoom = d.room(15, 13);
  for (const [a, b] of [[3, -4], [3, 4], [8, -4], [8, 4]]) c.pillar(...lairRoom.tile(a, b), 0.8);
  for (const [a, b] of [[1, -5], [2, 5], [6, -6], [7, 6], [11, -5], [12, 5]]) c.gold(...lairRoom.tile(a, b), 25);
  c.chest(...lairRoom.tile(13, -5), 120).chest(...lairRoom.tile(13, 5), 120);
  c.mob('dragon', ...lairRoom.tile(14, 0), { range: 3, facing: Math.PI });
  d.hall(3);
  d.exit(3);
  return c;
}

export const LEVELS = [crypt, catacombs, pits, chasm, grotto, warrens, quarry, hatchery, ironHalls, forge, well, lair];

export function loadLevel(index) {
  return LEVELS[index]();
}
