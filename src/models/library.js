import { createBakeLibrary } from 'madness-engine/models/bake';
import { CAST } from './cast/index.js';
import { PROPS } from './props/index.js';

/** Everything sculpted, by name: the creatures and the props. */
export const SCULPTED = { ...CAST, ...PROPS };

/** The models a player can meet anywhere: the props (small, and everywhere), then the monsters at the detail the board wants. */
export const startupJobs = () => [...Object.keys(PROPS).map((n) => [n, 1]), ...Object.keys(CAST).map((n) => [n, 0.5])];

export const { isBaked, readyAll, ready, preload } = createBakeLibrary({
  sculpted: SCULPTED,
  spawn: () => new Worker(new URL('./bake.worker.js', import.meta.url), { type: 'module' }),
  jobs: startupJobs,
  label: "dungeon-roller",
});
