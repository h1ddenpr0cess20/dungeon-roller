/**
 * The rock monster: Rock's boulder (github.com/h1ddenpr0cess20/rock, its
 * `boulder`), several tons of granite, brought down into the dungeon to
 * stomp about. The stone is Rock's own — an icosphere pushed out by layers
 * of noise, sliced flat by a dozen cutting planes, its base ground level,
 * faceted, coloured grain by grain — with a face cut into it: two deep
 * sockets under a heavy brow with a glow of molten orange in each, and moss
 * where water runs off its top.
 *
 * `createBoulder` gives { group, pose(state) } like the other creatures.
 */

// Rock's noise (geometry.js), as it is.
const hash = (x, y, z) => {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
};
const noise = (x, y, z) => {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const L = (a, b, t) => a + (b - a) * t;
  return L(
    L(L(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), L(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
    L(L(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), L(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v),
    w) * 2 - 1;
};

/** Rock's cutting planes: the flats that make it look broken from a bigger stone. */
function cuttingPlanes(seed) {
  const planes = [];
  for (let i = 0; i < 13; i++) {
    const a = i * 2.399963 + seed, y = 1 - (2 * (i + 0.5)) / 13, r = Math.sqrt(Math.max(0, 1 - y * y));
    const n = [Math.cos(a) * r, y * 0.75, Math.sin(a) * r], l = Math.hypot(...n);
    planes.push({ n: n.map((v) => v / l), d: 0.74 + hash(i, i * 3, 7 + seed) * 0.2 });
  }
  return planes;
}

const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/** Where the eyes look out from, on the unit stone. */
const EYES = [1, -1].map((m) => {
  const d = [m * 0.36, 0.2, 0.91], l = Math.hypot(...d);
  return d.map((v) => v / l);
});

const geometries = new Map();

/** The stone, faceted and coloured; made once per detail and shared. */
function stone(GFX, detail) {
  if (geometries.has(detail)) return geometries.get(detail);
  const geometry = new GFX.IcosahedronGeometry(1, detail >= 1 ? 5 : 3).toNonIndexed();
  const planes = cuttingPlanes(0);
  const p = geometry.attributes.position.array;
  const colors = new Float32Array(p.length);
  const base = new GFX.Color('#8a8278'), dark = new GFX.Color('#453f39'), pale = new GFX.Color('#b8b0a2');
  const moss = new GFX.Color('#4f6a2a'), mossDark = new GFX.Color('#2c3d18'), soot = new GFX.Color('#1e1a17');
  const tc = new GFX.Color();
  const v = [0, 0, 0];
  for (let i = 0; i < p.length; i += 3) {
    const l = Math.hypot(p[i], p[i + 1], p[i + 2]);
    const u = [p[i] / l, p[i + 1] / l, p[i + 2] / l];
    const d = 1
      + noise(u[0] * 2.1 + 11, u[1] * 2.1, u[2] * 2.1) * 0.19
      + noise(u[0] * 4.7, u[1] * 4.7 + 5, u[2] * 4.7) * 0.085
      + noise(u[0] * 11, u[1] * 11, u[2] * 11 + 3) * 0.03;
    v[0] = u[0] * d; v[1] = u[1] * d; v[2] = u[2] * d;
    for (const pl of planes) {
      const t = v[0] * pl.n[0] + v[1] * pl.n[1] + v[2] * pl.n[2];
      if (t > pl.d) for (let k = 0; k < 3; k++) v[k] -= pl.n[k] * (t - pl.d) * 0.92;
    }
    // The face: two sockets cut in, and a brow standing out over them.
    let socket = 0, brow = 0;
    for (const e of EYES) {
      const c = u[0] * e[0] + u[1] * e[1] + u[2] * e[2];
      socket = Math.max(socket, smooth(0.955, 0.99, c));
      const above = [e[0] * 0.92, e[1] + 0.28, e[2] * 0.95];
      const al = Math.hypot(...above);
      brow = Math.max(brow, smooth(0.96, 0.99, (u[0] * above[0] + u[1] * above[1] + u[2] * above[2]) / al));
    }
    const dent = 1 - socket * 0.2 + brow * 0.07;
    v[0] *= dent; v[1] *= dent; v[2] *= dent;
    if (v[1] < -0.87) v[1] = -0.87 + (v[1] + 0.87) * 0.18;
    p[i] = v[0]; p[i + 1] = v[1] * 0.94; p[i + 2] = v[2];

    const m = noise(v[0] * 6, v[1] * 6, v[2] * 6) * 0.5 + 0.5;
    const grit = hash(Math.round(v[0] * 90), Math.round(v[1] * 90), Math.round(v[2] * 90));
    tc.copy(base).lerp(dark, Math.pow(m, 1.6) * 0.75).lerp(pale, grit > 0.93 ? 0.6 : 0);
    // Moss where the rain would sit, and soot in the sockets.
    const wet = smooth(0.35, 0.75, u[1] + noise(u[0] * 3, u[1] * 3 + 9, u[2] * 3) * 0.35);
    if (wet > 0) tc.lerp(grit > 0.5 ? moss : mossDark, wet * 0.85);
    if (socket > 0) tc.lerp(soot, socket * 0.9);
    colors[i] = tc.r; colors[i + 1] = tc.g; colors[i + 2] = tc.b;
  }
  geometry.setAttribute('color', new GFX.BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  geometries.set(detail, geometry);
  return geometry;
}

/** A spring, as Rock moves on: pulled to `to`, damped. */
function spring(s, k, c, dt, to = 0) {
  s.v += (to - s.p) * k * dt - s.v * c * dt;
  s.p += s.v * dt;
}

/** A rock monster `size` tiles across. */
export function createBoulder(GFX, { size = 0.8, detail = 1, seed = 0 } = {}) {
  const R = size / 2;
  const group = new GFX.Group();
  group.name = 'rock';
  const body = new GFX.Group();
  group.add(body);
  const holder = new GFX.Group();
  holder.scale.setScalar(R);
  holder.position.y = 0.87 * 0.94 * R;
  body.add(holder);

  const material = new GFX.MeshStandardMaterial({ name: 'granite', vertexColors: true, roughness: 0.92, metalness: 0.06, flatShading: true });
  const mesh = new GFX.Mesh(stone(GFX, detail), material);
  mesh.name = 'rock-body';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  holder.add(mesh);

  // Eyes: a molten glow down in each socket, slanted to a scowl.
  const glow = new GFX.MeshStandardMaterial({ name: 'rock-eye', color: new GFX.Color('#ffb070'), emissive: new GFX.Color('#ff6a10'), emissiveIntensity: 3 });
  const eyes = EYES.map((e, i) => {
    const m = i === 0 ? 1 : -1;
    const eye = new GFX.Mesh(new GFX.SphereGeometry(0.1, 14, 10), glow);
    eye.position.set(e[0] * 0.84, e[1] * 0.84 * 0.94, e[2] * 0.84);
    eye.scale.set(1.15, 0.55, 0.6);
    eye.rotation.set(0, m * 0.36, m * -0.35);
    eye.castShadow = false;
    holder.add(eye);
    return eye;
  });

  const sq = { p: 0, v: 0 }, tz = { p: 0, v: 0 }, tx = { p: 0, v: 0 }, ty = { p: 0, v: 0 };
  let last = null, fidget = 2 + hash(seed, 1, 2) * 2, hopped = 0;

  return {
    group,
    body,
    /** Stomps, sways and squashes it for `state` ({ clip, t, time, seed, speed }). */
    pose({ clip = 'idle', t = 0, time = 0, seed: s = seed, speed = 1 }) {
      const dt = last === null ? 0 : Math.min(0.05, Math.max(0, time - last));
      last = time;
      const T = time + s;
      let lift = 0, lean = 0, roll = 0;
      if (clip === 'walk') {
        // A stomp at a time: up, tipped forward, down with a thud.
        const f = (T * 2.4 * Math.max(0.5, speed)) % 1, n = Math.floor(T * 2.4 * Math.max(0.5, speed));
        lift = Math.sin(Math.PI * Math.min(1, f / 0.55)) * 0.18 * (f < 0.55 ? 1 : 0);
        lean = 0.12 * Math.sin(Math.PI * Math.min(1, f / 0.55)) * (f < 0.55 ? 1 : 0);
        if (n !== hopped && f > 0.55) { hopped = n; sq.v += 3.2; tz.v += (hash(n, s, 3) - 0.5) * 2.4; }
      } else if (clip === 'attack') {
        // A leap, and the whole weight of it brought down.
        const up = Math.min(1, t / 0.25), down = Math.max(0, Math.min(1, (t - 0.25) / 0.08));
        lift = Math.sin(up * Math.PI * 0.5) * 0.5 * (1 - down);
        lean = 0.35 * up * (1 - down) - 0.1 * down;
        if (t > 0.33 && hopped !== -1) { hopped = -1; sq.v += 8; }
        if (t < 0.05) hopped = 0;
      } else if (clip === 'hit') {
        const h = Math.sin(Math.min(1, t / 0.4) * Math.PI);
        lean = -0.3 * h;
        roll = Math.sin(t * 50) * 0.04 * h;
      } else if (clip === 'ko') {
        // Over onto its side, and the light goes out of its eyes.
        const f = Math.min(1, t / 0.5);
        roll = f * f * 1.35;
        lift = -0.08 * f;
      } else if (clip === 'idle') {
        fidget -= dt;
        if (fidget <= 0) {
          const r = hash(Math.floor(T), s, 5);
          if (r < 0.4) sq.v += 2.4;
          else if (r < 0.72) ty.v += (r < 0.56 ? -1 : 1) * 2.6;
          else { tz.v += (r - 0.86) * 10; tx.v += 1.6; }
          fidget = 2.4 + hash(s, Math.floor(T), 9) * 4;
        }
      }
      spring(sq, 190, 11, dt);
      spring(tz, 70, 6.5, dt, Math.sin(T * 1.05 * 2) * 0.055 + roll);
      spring(tx, 70, 6.5, dt, lean);
      spring(ty, 40, 5, dt, 0);
      const breathe = Math.sin(T * 1.25) * 0.008;
      // Tipped over its edge, it is lifted so it lies on its side, not through the floor.
      body.position.set(0, lift * R * 2 + 1.3 * R * (1 - Math.cos(tz.p)) + 0.5 * R * (1 - Math.cos(tx.p)), 0);
      body.rotation.set(tx.p, ty.p, tz.p);
      const k = sq.p * 0.09 + breathe;
      holder.scale.set(R * (1 + k * 0.55), R * (1 - k), R * (1 + k * 0.55));
      glow.emissiveIntensity = clip === 'ko' ? Math.max(0, 3 * (1 - t / 0.6)) : 3 + Math.sin(T * 3) * 0.6;
      for (const e of eyes) e.visible = glow.emissiveIntensity > 0.05;
    },
  };
}
