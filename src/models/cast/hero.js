import { coat, grainy, ramp } from '../skins.js';
import { body, bones, hair, head, joints, moveHumanoid, skinTone } from './humanoid.js';

/**
 * The Hero: the one up front. A blue tunic trimmed in gold, a leather belt,
 * a red cape, swept brown hair, and a longsword held high.
 */

const skin = skinTone('#eab48e');
const tunic = coat({ over: '#3566b8', under: '#244a8c', vary: 0.1, freq: 12, grain: 0.05, edge: [-0.6, 0.6] });
const leather = coat({ over: '#6b4428', under: '#4e301c', vary: 0.15, freq: 18, grain: 0.08 });
const trousers = coat({ over: '#5b4a3a', under: '#463829', vary: 0.1, freq: 14, grain: 0.05 });
const boots = coat({ over: '#4a2e1c', under: '#2e1c10', vary: 0.12, freq: 18, grain: 0.06 });
const cape = ramp(1, 0.18, 0.5, '#6e1414', '#b0262a', grainy('#ffffff', 0.06, 30));
const hairColor = coat({ over: '#7a4a24', under: '#4a2a14', vary: 0.18, freq: 20, grain: 0.1, gfreq: 140 });
const steel = grainy('#c9d0d8', 0.05, 80);
const gold = grainy('#e0b04a', 0.06, 60);

const J = joints();
const hand = J.handR;
/** Along the sword, from the hand: `t` tiles forward of the grip. */
const along = (t, dy = 0) => [hand[0], hand[1] + dy, hand[2] + t];

export default {
  name: 'hero',
  cell: 0.007,
  cells: { eyes: 0.0024, irises: 0.0016, pupils: 0.0012, brows: 0.003, hair: 0.0055, blade: 0.003, hilt: 0.0035, cape: 0.0075, trim: 0.004 },
  bones: [...bones(), ['cape', 'chest', [0, 0.5, -0.07]], ['capeLow', 'cape', [0, 0.32, -0.1]]],
  materials: {
    cloth: { roughness: 0.82, sheen: 0.6, sheenColor: '#a8c0ff', sheenRoughness: 0.5 },
    skin: { roughness: 0.55, sheen: 0.3, sheenColor: '#ffd8c8', sheenRoughness: 0.6 },
    leather: { roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.45 },
    hair: { roughness: 0.45, sheen: 1, sheenColor: '#d09060', sheenRoughness: 0.35 },
    eye: { roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.02 },
    steel: { roughness: 0.22, metalness: 0.9 },
    gold: { roughness: 0.3, metalness: 1 },
    cape: { roughness: 0.85, sheen: 0.8, sheenColor: '#ff8080', sheenRoughness: 0.5, side: 'double' },
  },
  sculpt(s) {
    body(s, {
      look: { skin, torso: tunic, sleeve: tunic, cuff: leather, hand: leather, legs: trousers, boot: boots },
      mats: { cuff: 'leather', hand: 'leather', boot: 'leather' },
    });
    // The tunic's skirt, flaring over the hips, and its gold hem.
    s.limb([0, 0.35, 0.002], [0, 0.255, 0.004], 0.076, 0.094, { color: tunic, mat: 'cloth', bone: 'hips', k: 0.03 });
    s.part('trim', () => {
      s.torus([0, 0.258, 0.004], 0.093, 0.0065, { color: gold, mat: 'gold', bone: 'hips', k: 0.004 });
      s.torus([0, 0.505, 0.012], 0.05, 0.006, { color: gold, mat: 'gold', bone: 'chest', k: 0.004, rot: [0.25, 0, 0] });
    });
    // Belt and buckle.
    s.torus([0, 0.338, 0.002], 0.077, 0.0115, { color: leather, mat: 'leather', bone: 'hips', k: 0.006 });
    s.part('trim', () => s.box([0, 0.338, 0.088], [0.016, 0.013, 0.006], 0.003, { color: gold, mat: 'gold', bone: 'hips', k: 0.002 }));
    // Boot cuffs.
    for (const m of [1, -1]) s.torus([m * 0.06, 0.125, 0.004], 0.034, 0.009, { color: boots, mat: 'leather', bone: m > 0 ? 'shinL' : 'shinR', k: 0.008 });

    head(s, { skin, brow: '#5a3218', eyeColor: '#3a5a8a', mood: 1 });
    // Swept brown hair: a cap, a fringe swept to one side, locks behind.
    hair(s, {
      color: hairColor,
      cap: [0.112, 0.104, 0.112],
      locks: [
        // A fringe swept up and over to the right.
        [[0.04, 0.765, 0.07], [-0.05, 0.79, 0.125], 0.034],
        [[0.0, 0.77, 0.06], [-0.1, 0.75, 0.1], 0.03],
        [[0.07, 0.75, 0.05], [0.115, 0.72, 0.075], 0.026],
        // Spikes up and back off the crown.
        [[0.0, 0.8, 0.02], [0.02, 0.87, -0.03], 0.034],
        [[-0.05, 0.79, 0.0], [-0.09, 0.84, -0.06], 0.03],
        [[0.05, 0.79, 0.0], [0.1, 0.83, -0.05], 0.03],
        [[0.0, 0.78, -0.06], [0.0, 0.8, -0.15], 0.036],
        [[0.07, 0.74, -0.06], [0.12, 0.72, -0.12], 0.03],
        [[-0.07, 0.74, -0.06], [-0.12, 0.72, -0.12], 0.03],
        [[0.04, 0.7, -0.09], [0.06, 0.62, -0.12], 0.03],
        [[-0.04, 0.7, -0.09], [-0.06, 0.62, -0.12], 0.03],
        // Over the ears.
        [[0.09, 0.73, 0.02], [0.115, 0.66, 0.02], 0.024],
        [[-0.09, 0.73, 0.02], [-0.115, 0.66, 0.02], 0.024],
      ],
    });

    // The cape, hung from a gold clasp on each shoulder.
    s.part('cape', () => {
      s.flake([0, 0.5, -0.07], [0, 0.17, -0.13], [0, 0.15, -1], 0.105, 0.135, 0.11, { color: cape, mat: 'cape', bone: 'cape', k: 0.01 });
      s.flake([0, 0.33, -0.1], [0, 0.17, -0.135], [0, 0.1, -1], 0.12, 0.14, 0.1, { color: cape, mat: 'cape', bone: 'capeLow', k: 0.03 });
    });
    for (const m of [1, -1]) s.part('trim', () => s.sphere([m * 0.075, 0.5, -0.045], 0.014, { color: gold, mat: 'gold', bone: 'chest', k: 0 }));

    // The longsword: a steel blade, a gold cross-guard and pommel, a leather grip.
    s.part('blade', () => {
      // Flat to the front when it is raised, so the blade shows its breadth.
      s.flake(along(0.04), along(0.42), [0, 1, 0], 0.021, 0.003, 0.24, { color: steel, mat: 'steel', bone: 'handR', k: 0 });
      // The fuller: a groove down the middle of each face.
      s.flake(along(0.05), along(0.3), [0, 1, 0], 0.005, 0.003, 1, { op: 'sub', k: 0.002 });
    });
    s.part('hilt', () => {
      s.box(along(0.034), [0.05, 0.01, 0.009], 0.0045, { color: gold, mat: 'gold', bone: 'handR', k: 0 });
      s.limb(along(-0.035), along(0.03), 0.0095, 0.0095, { color: leather, mat: 'leather', bone: 'handR', k: 0 });
      s.sphere(along(-0.044), 0.0135, { color: gold, mat: 'gold', bone: 'handR', k: 0.003 });
    });
  },
  animate(k, state) {
    moveHumanoid(k, state, { attack: 'slash' });
    // The cape trails and flutters.
    const T = state.time + state.seed;
    const go = state.clip === 'walk' ? 1 : state.clip === 'attack' ? 0.6 : 0.2;
    k.turn('cape', -0.12 * go + Math.sin(T * 2) * 0.03, 0, Math.sin(T * 1.3) * 0.03);
    k.turn('capeLow', -0.15 * go + Math.sin(T * 3.1 + 1) * 0.06 * (0.4 + go), 0, Math.sin(T * 2.3) * 0.04);
  },
};
