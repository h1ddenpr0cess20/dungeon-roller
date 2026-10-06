import { CAST } from './cast/index.js';
import { bake } from './model.js';

const ARRAYS = ['position', 'normal', 'color', 'skinIndex', 'skinWeight', 'index'];

/** Bakes models off the main thread: { name, detail } in, the mesh's arrays out (handed over, not copied). */
self.onmessage = ({ data: { name, detail } }) => {
  const data = { ...bake(CAST[name], { detail }) };
  for (const k of ARRAYS) data[k] = data[k].slice();
  self.postMessage({ name, detail, data }, ARRAYS.map((k) => data[k].buffer));
};
