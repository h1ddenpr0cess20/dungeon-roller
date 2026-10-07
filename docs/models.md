# The models: sculpted in code

Every creature in the game, and everything lying about to be picked up, is
sculpted in JavaScript and rendered by our own engine (`src/vendor/gfx`). No
meshes or textures are downloaded, and nothing in the 3D world is a 2D
sprite. A model is a definition file in `src/models/cast/` (creatures) or
`src/models/props/` (the chest, the gold heap, the potion, the revive flask
and the key). The game turns it into a mesh, a *bake*, when the page starts,
and a level doesn't begin until everything in it has baked.

| File | What it does |
| --- | --- |
| `src/models/sdf.js` | The sculpting kit (`Sculpt`): signed distance shapes, smooth union, carving, parts, paint, fur and scale patterns. `build` turns a sculpt into a mesh. |
| `src/models/skins.js` | Colour helpers for shapes: `coat`, `pelt`, `ramp`, `bands`, `grainy`, `grime`. |
| `src/models/rig.js` | Bones (`Skeleton`) and CPU skinning (`skin`). |
| `src/models/model.js` | `bake(def, { detail })` turns a definition into a mesh. `createModel(GFX, def, { detail })` makes a posable copy for a scene; `createStatic(GFX, def)` a still one (a prop) that shares its geometry with every other copy. |
| `src/models/library.js` | Bakes everything in Web Workers as the page loads (`preload`, `ready`, `readyAll`, `isBaked`). |
| `src/models/cast/*.js` | One definition per creature, listed in `cast/index.js`. |
| `src/models/props/*.js` | One definition per pickup, listed in `props/index.js`: one bone, no animation, baked at detail 1. |
| `models.html` | A turntable for looking at models while sculpting (dev server only). |
| `scripts/bake.js` | Vertex and triangle counts and bake times: `node scripts/bake.js [name] [detail]`. |

## How a model is made

1. **Shapes.** Each shape is an exact signed distance function:
   - `sphere`, `ellipsoid`, `limb` (a capsule that tapers from one radius to
     another), `chain` (a run of limbs), `box` (with rounded corners),
     `torus` (or just an arc of one), `cone`, `flake` (a flattened limb: a
     blade, a petal, a fin).
   - Each new shape is smooth-unioned into the shapes before it, with a
     blend radius `k`, the way clay is pressed together. `op: 'sub'`
     carves a shape out instead; `op: 'inter'` keeps only where shapes
     overlap.
2. **Mesh.** `build` meshes the field with surface nets on a grid of step
   `cell`.
   - It samples a coarse grid first and refines only near the surface.
   - Every vertex is then pulled onto the true surface (two Newton
     steps).
   - Each vertex gets a normal from the field's gradient, a colour (a blend
     of the nearest shapes' colours plus any paint), and ambient occlusion
     worked out from the field and baked into the colour.
   - Each vertex also gets up to four bone weights, from how close each
     shape (and so its bone) is.
3. **Parts.** `s.part('eyes', () => …)` puts shapes in a part of their own,
   meshed separately and not melted into the rest. Use parts for anything
   that should stay crisp against what it sits on: eyes, teeth, claws,
   armour, weapons.
   - A part can have a finer grid of its own. In the definition, set
     `cells: { eyes: 0.0024 }`.
   - **Anything thinner than about two grid steps must go in a finer
     part**, or it comes out jagged (ear rims, teeth, irises).
4. **Materials.** Each shape names a material (`mat`) from the
   definition's `materials` table. The table holds physical material
   settings:
   - roughness, metalness, sheen (fur), clearcoat (wet or glossy),
     emissive (glow), transmission (jelly)
   - colour comes from the vertex colours, not the material

   Each triangle takes the material most of its corners have. A boundary
   between two materials inside one part follows the triangles and can
   look jagged. Where that boundary shows (an iris on an eyeball, say),
   use separate parts instead.
5. **Colour.**
   - A shape's `color` is either a hex string or `(p, n) => [r, g, b]`
     (linear RGB).
   - `s.paint(inside, color, soft)` paints over everything inside a
     distance function, without changing the shape: masks, bellies,
     stripes.
   - The `skins.js` helpers give a believable surface quickly:
     - `pelt` is fur: darker on top, lighter underneath, blotchy noise, and
       strands
     - `ramp` grades a colour along an axis
     - `bands` makes rings, like a tail's
     - `grainy` and `grime` are for stone, bone and metal
6. **Fur and scales.** `locks: [size, height, axis, stretch]` on a shape
   raises its surface in overlapping locks, a Voronoi pattern stretched
   along `axis` (see `shingles` in sdf.js). The same pattern makes scales
   with a small stretch and fur with a long one. Use the same `shingles`
   call in the colour function to lighten the lock tips and darken the
   creases.
   - The rat's fur: `[0.022, 0.0045, 2, 3.2]`
   - Scales: about `[0.04, 0.008, 2, 1.3]`
   - Keep the face smooth.

## Eyes

These make or break a creature. The rat's recipe (`cast/rat.js`):

- **Eyeball:** a dark ball in part `eyes`, mat `eye` (glossy, slight glow).
- **Iris:** a flattened ellipsoid lens sitting on the ball, in part
  `irises`, mat `iris` (bright, emissive). Monsters in a dark dungeon read
  best with eyes that glow.
- **Pupil:** a thin slit lens just above the iris, in part `pupils`, mat
  `pupil` (black, very glossy).
- **Lens orientation:** turn each lens to face out along the eye's
  direction `d`, with `rot = [-asin(d.y), atan2(d.x, d.z), 0]`.
- **Socket:** carve one into the head (`op: 'sub'`), and add a heavy brow
  above it for a mean look.

## Bones and animation

- **Bones:** `bones: [[name, parent, pivot], …]` lists the skeleton, with
  parents before children.
- **Assigning shapes:** each shape gives its `bone`. Vertices near where
  two shapes melt together get weights from both, so joints bend
  smoothly.
- **Posing:** `animate(k, { clip, t, time, seed, speed })` poses the
  skeleton every frame. `k` is a `Skeleton`:
  - `k.turn(bone, x, y, z)`: rotation in radians about the bone's pivot,
    in its parent's frame
  - `k.move(bone, …)` and `k.scale(bone, …)`
- **Clips every model should have** (`t` is seconds since the clip
  started, `time` is the global clock):
  - `idle`: breathing, and something alive (a twitch, a look round)
  - `walk`: `speed` from 0 to 1
  - `attack`: wind-up, strike and recover in about 0.6 s; strike at about
    0.25–0.35 s
  - `hit`: a flinch, about 0.4 s
  - `ko`: falls over in about 0.5 s and holds the pose
- **Heroes** also need `cast` (a spell) and `win`.

## Conventions

- **Units are tiles.** y is up, the creature faces +z, and its feet stand
  on y = 0.
  - A flyer's origin is its middle: the game holds it in the air at
    `FLIGHT`.
  - `scale` in the definition stands it up bigger or smaller without
    re-sculpting.
- **Sizes on the board** (the collision radii are in `src/monsters.js`):
  - rat: about 0.6 long with the tail at scale 1.35
  - goblin: 0.6 tall
  - skeleton: 0.85 tall
  - orc: 0.9 tall and broad
  - bat: about 0.9 wingspan
  - wraith: 0.8 tall, floating
  - dragon: about 2.5 long and 1.4 high
  - props: the chest half a tile across, the potion and key about 0.35
    tall, the revive flask 0.5 (with their `scale`); they rest on y = 0
    and the game floats and turns the potions and the key
- **Detail.** Detail 1 is the close-up mesh. The board uses detail 0.5
  (`BOARD_DETAIL`): the grid steps doubled, about a quarter of the
  triangles.
- **Budget** (check with `node scripts/bake.js`):
  - at detail 1: under about 30k vertices and under about 2.5 s to bake in
    Node
  - at detail 0.5: under about 8k vertices
  - a prop, at detail 1: under 9k vertices (the tests hold every
    definition to its `budget`)
- **On the board**, only monsters within 15 tiles of the die are posed each
  frame. The rest keep their last pose.

## Style

- **Big, clear shapes first:** a readable silhouette, exaggerated
  features, a head that says what it is. Detail comes after.
- **Smooth forms over lumpy ones.** Bumpy noise on everything reads as
  mud. Use `locks` for fur and scales; keep `bump` small.
- **No narrow crevices.** Two surfaces almost touching bake into black
  slits of occlusion. Melt them together (bigger `k`), or move them apart.
- **Strong value contrast:** a dark back and a light belly, pink or bone
  extremities, bright eyes. The dungeon is dark, and only the lantern and
  torches light it.
- **Check it close and far.** Look at a close-up in `models.html`, then at
  the creature on the board at the game's camera distance.

## Looking at them

With the dev server running (`npm run dev`), open
`/models.html?m=rat&clip=walk`. Other parameters:

- `m=rat,orc`: several models in a row
- `yaw`, `pitch`, `dist`: the camera
- `time`: a still frame instead of the animation playing

The buttons along the top switch clips.
