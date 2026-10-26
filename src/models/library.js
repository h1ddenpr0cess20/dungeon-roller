import { createBakeLibrary } from 'madness-engine/models/bake';
import { CAST } from './cast/index.js';
import { PROPS } from './props/index.js';

/** Everything sculpted, by name: the creatures and the props. */
export const SCULPTED = { ...CAST, ...PROPS };

export const { isBaked, readyAll, ready, preload } = createBakeLibrary({
  sculpted: SCULPTED,
  spawn: () => new Worker(new URL('./bake.worker.js', import.meta.url), { type: 'module' }),
  jobs: () => [...Object.keys(PROPS).map((n) => [n, 1]), ...Object.keys(CAST).map((n) => [n, 0.5])],
  label: "dungeon-roller",
});
