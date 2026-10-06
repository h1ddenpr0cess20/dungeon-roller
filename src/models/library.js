import { CAST } from './cast/index.js';
import { adopt } from './model.js';

/**
 * The models, baked in the background as the page starts: a few workers
 * share out the work, and each mesh is handed over as it is done. Until
 * then whoever wants one waits (`ready`) or carries on without it.
 */

const done = new Map();
const waiting = new Map();
const key = (name, detail) => `${name}@${detail}`;

/** Whether `name` at `detail` is ready to use. */
export const isBaked = (name, detail) => done.has(key(name, detail));

/** Resolves once `name` at `detail` is baked. */
export function ready(name, detail) {
  const k = key(name, detail);
  if (done.has(k)) return Promise.resolve();
  if (!waiting.has(k)) {
    let resolve;
    const p = new Promise((r) => { resolve = r; });
    waiting.set(k, { p, resolve });
  }
  return waiting.get(k).p;
}

/** Starts baking `jobs` ([name, detail] pairs), first come first served across the workers. */
export function preload(jobs = Object.keys(CAST).map((n) => [n, 0.5])) {
  if (typeof Worker === 'undefined') return;
  const queue = jobs.filter(([n, d]) => CAST[n] && !done.has(key(n, d)));
  const count = Math.max(1, Math.min(queue.length, (navigator.hardwareConcurrency || 4) - 1, 4));
  for (let i = 0; i < count; i++) {
    const worker = new Worker(new URL('./bake.worker.js', import.meta.url), { type: 'module' });
    const next = () => {
      const job = queue.shift();
      if (!job) { worker.terminate(); return; }
      worker.postMessage({ name: job[0], detail: job[1] });
    };
    worker.onmessage = ({ data: { name, detail, data } }) => {
      adopt(CAST[name], detail, data);
      const k = key(name, detail);
      done.set(k, true);
      waiting.get(k)?.resolve();
      next();
    };
    worker.onerror = (e) => console.error('dungeon-roller: a model would not bake', e);
    next();
  }
}
