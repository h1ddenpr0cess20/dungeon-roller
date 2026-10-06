/**
 * A turntable for the models (models.html): one or a row of them on a
 * stone floor under dungeon light, to look at while sculpting. Not part of
 * the game. ?m=rat,orc&clip=walk&yaw=0.6&pitch=0.3&dist=1.4&time=0
 * (time fixed for a still; no time and it plays).
 */

import * as GFX from '../vendor/gfx/index.js';
import { createRenderer, paintVault } from '../stage.js';
import { createModel } from './model.js';
import { CAST } from './cast/index.js';

const params = new URLSearchParams(location.search);
const host = document.getElementById('view');
const renderer = await createRenderer(params.get('renderer') ?? 'webgl');
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = GFX.PCFShadowMap;
host.appendChild(renderer.domElement);

const scene = new GFX.Scene();
const camera = new GFX.PerspectiveCamera(30, 1, 0.05, 100);
scene.add(new GFX.HemisphereLight(0x8a96c0, 0x1a1210, 0.55));
const key = new GFX.DirectionalLight(0xc8d2ff, 0.9);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0003;
key.shadow.normalBias = 0.01;
Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 100 });
key.shadow.camera.updateProjectionMatrix();
key.position.set(-6, 20, 12);
scene.add(key, key.target);
const lantern = new GFX.PointLight(0xffd9a0, 9, 7.5, 1.6);
lantern.position.set(1.2, 1.6, 1.8);
scene.add(lantern);
const torch = new GFX.PointLight(0xff9a4a, 5, 6, 1.7);
torch.position.set(-1.8, 1.1, -0.8);
scene.add(torch);
const room = paintVault();
const texture = new GFX.Texture(room);
texture.mapping = GFX.EquirectangularReflectionMapping;
texture.colorSpace = GFX.SRGBColorSpace;
texture.needsUpdate = true;
const pmrem = new GFX.PMREMGenerator(renderer);
scene.environment = pmrem.fromEquirectangular(texture).texture;

const floor = new GFX.Mesh(new GFX.CircleGeometry(6, 64), new GFX.MeshStandardMaterial({ color: new GFX.Color('#3a3530'), roughness: 0.9 }));
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);
scene.background = null;

let models = [];
const state = { clip: params.get('clip') ?? 'idle', t: 0, yaw: Number(params.get('yaw') ?? 0.6), pitch: Number(params.get('pitch') ?? 0.32), dist: Number(params.get('dist') ?? 1), time: params.has('time') ? Number(params.get('time')) : null, playing: !params.has('time') };

function place(names, cell) {
  for (const m of models) scene.remove(m.group);
  models = names.map((name) => createModel(GFX, CAST[name], { cell }));
  let x = 0;
  const widths = models.map((m) => m.mesh.geometry.boundingSphere.radius / 1.5);
  const total = widths.reduce((s, w) => s + w * 2.2, 0);
  x = -total / 2;
  models.forEach((m, i) => {
    m.group.position.x = x + widths[i] * 1.1;
    x += widths[i] * 2.2;
    scene.add(m.group);
  });
  state.radius = Math.max(total / 2, ...widths);
  state.height = Math.max(...models.map((m) => m.mesh.geometry.boundingSphere.center.y));
}

const bar = document.getElementById('bar');
for (const clip of ['idle', 'walk', 'attack', 'hit', 'cast', 'ko', 'win']) {
  const b = document.createElement('button');
  b.textContent = clip;
  b.onclick = () => { state.clip = clip; state.t = 0; };
  bar.append(b);
}

let clock = 0;
function frame(dt) {
  clock += dt;
  state.t += dt;
  const time = state.time ?? clock;
  models.forEach((m, i) => m.pose({ clip: state.clip, t: state.playing ? state.t % 1.6 : state.t, time, seed: i * 1.7, speed: 1 }));
  const w = host.clientWidth || 1, h = host.clientHeight || 1;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  const r = state.radius * 3.2 * state.dist;
  camera.position.set(Math.sin(state.yaw) * Math.cos(state.pitch) * r, state.height + Math.sin(state.pitch) * r, Math.cos(state.yaw) * Math.cos(state.pitch) * r);
  camera.lookAt(new GFX.Vector3(0, state.height * 0.9, 0));
  camera.updateMatrixWorld();
  renderer.render(scene, camera);
}

place((params.get('m') ?? 'rat').split(','), params.has('cell') ? Number(params.get('cell')) : undefined);
let last = performance.now();
function loop(now) {
  frame(Math.min(0.05, (now - last) / 1000));
  last = now;
  if (state.playing) requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

globalThis.viewer = {
  state,
  place,
  /** Renders one still: `set` some of the state, then draw. */
  still(next = {}) {
    Object.assign(state, next, { playing: false });
    if (next.models) place(next.models, next.cell);
    frame(0);
    return true;
  },
};
