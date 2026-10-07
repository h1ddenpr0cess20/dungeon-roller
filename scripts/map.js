/**
 * A level as text, for laying one out: `node scripts/map.js 3` (levels count
 * from 1), and `--heights` for the floor heights instead of what is where.
 *
 *   .  floor     #  wall      ~  lava      E  the stairs down    S  start
 *   ^  spikes    X  crusher   |  door      k  key    $  gold or a chest
 *   +  potion    !  revive potion           m  monster (walking)
 *   o  monster (crawling or flying)
 *   L  lift (where it starts)
 */

import { MONSTERS } from '../src/monsters.js';
import { LEVELS, loadLevel } from '../src/levels.js';

const args = process.argv.slice(2);
const heights = args.includes('--heights');
const n = Number(args.find((a) => /^\d+$/.test(a)) ?? 1);
if (!(n >= 1 && n <= LEVELS.length)) {
  console.error(`levels are 1 to ${LEVELS.length}`);
  process.exit(1);
}
const level = loadLevel(n - 1);
const grid = Array.from({ length: level.rows }, () => Array(level.cols).fill(' '));
for (let z = 0; z < level.rows; z++) {
  for (let x = 0; x < level.cols; x++) {
    const c = level.cell(x, z);
    if (!c) continue;
    if (heights) {
      grid[z][x] = c.kind === 'wall' ? '#' : String(Math.round(Math.max(...c.h)) % 10);
      continue;
    }
    grid[z][x] = { wall: '#', lava: '~', exit: 'E' }[c.kind] ?? (c.trap ? '^' : c.crush ? 'X' : c.door ? '|' : '.');
  }
}
if (!heights) {
  for (const l of level.lifts) grid[l.z][l.x] = 'L';
  for (const p of level.pickups) grid[Math.floor(p.z)][Math.floor(p.x)] = { key: 'k', potion: '+', revive: '!' }[p.kind] ?? '$';
  for (const m of level.mobs) grid[Math.floor(m.z)][Math.floor(m.x)] = MONSTERS[m.kind].move === 'walk' ? 'm' : 'o';
}
grid[level.start.z][level.start.x] = 'S';
console.log(`${level.name} — ${level.cols}×${level.rows}, ${level.mobs.length} monsters`);
const ruler = Array.from({ length: level.cols }, (_, x) => (x % 10 === 0 ? String((x / 10) % 10) : ' ')).join('');
console.log(`     ${ruler}`);
grid.forEach((row, z) => console.log(`${String(z).padStart(4)} ${row.join('').replace(/\s+$/, '')}`));
