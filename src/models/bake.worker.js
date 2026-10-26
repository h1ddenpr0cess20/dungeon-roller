import { serveBakes } from 'madness-engine/models/bake';
import { CAST } from './cast/index.js';
import { PROPS } from './props/index.js';

serveBakes({ ...CAST, ...PROPS });
