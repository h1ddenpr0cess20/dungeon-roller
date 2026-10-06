import { createBattleScreen, resolveBattle } from './battle.js';
import { DIE_SCALE, dieModel, reachBelow, showNumber } from './die.js';
import { createDelve, HARM, putBack, showing, STEP, stepDelve, toGround } from './delve.js';
import { createEffects } from './effects.js';
import { LEVELS } from './levels.js';
import { createParty, heal, hurt, rest, seeded, wiped } from './party.js';
import { turn } from './physics.js';
import { createDungeonMeshes, createExit, createTorches } from './scenery.js';

/**
 * The game: the levels one after another, down and down, with one party.
 * The party's hit points carry from level to level — a rest at each stair
 * gets half of them back — and so does the gold. Run into a monster and the
 * number on top of the die is the roll the party fights with (`battle.js`).
 * Fall off, burn or get squashed and the party is hurt and the die put back
 * on the last safe floor it crossed; lose all four heroes and it's over.
 */

/** Gold for every level cleared, by how deep it was. */
export const CLEAR_BONUS = 100;

const BANNERS = {
  fell: 'INTO THE DARK!',
  burnt: 'SCORCHED!',
  crushed: 'SQUASHED!',
  spiked: 'SPIKED!',
  thud: 'THUD!',
};

/** How close the camera comes for the title, and how fast it circles; and how close for a fight. */
const TITLE_ZOOM = 0.38;
const TITLE_TURN = 0.18;
const FIGHT_ZOOM = 0.45;

export function createGame({ stage, hud, input, audio, storage }) {
  const { GFX, scene, view } = stage;
  const effects = createEffects(GFX, scene);
  const model = dieModel(GFX);
  const dieMesh = model.group;
  dieMesh.scale.setScalar(DIE_SCALE);
  dieMesh.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  scene.add(dieMesh);
  const battle = createBattleScreen(document.body);

  let delve = null;
  let group = null;
  let decor = [];
  let state = 'title';  // title · ready · play · lost · battle · clear · over · won
  let paused = false;
  let timer = 0;
  let accumulator = 0;
  let lostHow = null;
  let party = createParty();
  let gold = 0;
  let random = seeded(Date.now() >>> 0);
  let playZoom = 1;
  let saved = storage.load();
  let shown = 0;
  /** The die's squash on landing: a spring, as Nat's is. */
  const squash = { p: 0, v: 0 };
  const titleQ = [0, 0, 0, 1];

  function setLevel(index) {
    if (group) scene.remove(group);
    delve = createDelve(GFX, index, delve ? { ball: delve.ball, die: delve.die } : {});
    group = new GFX.Group();
    const dungeon = createDungeonMeshes(GFX, delve.built);
    const torches = createTorches(GFX, delve.level);
    const exit = createExit(GFX, delve.level, { last: index === LEVELS.length - 1 });
    group.add(dungeon.group, torches.group, delve.actors.group);
    if (exit) group.add(exit.group);
    decor = [dungeon, torches, exit].filter(Boolean);
    stage.setTorches(torches.flames);
    scene.add(group);
    effects.setDungeon(delve.level);
    accumulator = 0;
    dieMesh.visible = true;
    const b = delve.ball;
    stage.target.set(b.x, b.y, b.z);
    hud.map(delve);
    warmUp();
  }

  /**
   * Draws the whole level once, nothing left out for being off screen, so
   * every shader it needs is compiled now (behind the level's banner) and
   * not with a stall the first time some monster comes into view.
   */
  function warmUp() {
    const off = [];
    group.traverse((o) => {
      if ((o.isMesh || o.isSprite) && o.frustumCulled) {
        o.frustumCulled = false;
        off.push(o);
      }
    });
    try {
      stage.look();
      stage.render();
    } finally {
      for (const o of off) o.frustumCulled = true;
    }
  }

  function enter(next) {
    state = next;
    timer = 0;
  }

  function showTitle() {
    if (state !== 'title') playZoom = view.aim.zoom;
    setLevel(0);
    enter('title');
    paused = false;
    hud.paused(false);
    view.aim.zoom = TITLE_ZOOM;
    audio.stopMusic();
    hud.title(saved);
  }

  function startRun(index) {
    party = createParty();
    gold = 0;
    random = seeded(Date.now() >>> 0);
    beginLevel(index);
  }

  function beginLevel(index) {
    setLevel(index);
    shown = 0;
    saved = storage.reached(index);
    if (state === 'title') view.aim.zoom = playZoom;
    enter('ready');
    hud.play();
    hud.banner(`DEPTH ${delve.level.depth}\n${delve.level.name.toUpperCase()}`, 'big', delve.level.intro);
    hud.level(delve.level);
    hud.gold(gold);
    hud.keys(0);
    hud.party(party);
    audio.wake();
    audio.descend();
    audio.startMusic(delve.level.depth);
  }

  function harm(how) {
    const took = hurt(party, HARM[how], random);
    hud.party(party, took);
    audio.hurt();
    return took;
  }

  function lose(how) {
    const b = delve.ball;
    lostHow = how;
    enter('lost');
    harm(how);
    hud.banner(`${BANNERS[how]}\n−${HARM[how]} HP`);
    if (how === 'burnt') { effects.embers(b.x, b.y, b.z); audio.sizzle(); dieMesh.visible = false; }
    else if (how === 'crushed') { effects.dust(b.x, b.y - b.r, b.z); audio.slam(); dieMesh.visible = false; }
    else audio.fall();
  }

  function fight(mob, roll) {
    const b = delve.ball;
    b.vx = b.vy = b.vz = 0;
    showNumber(delve.die, model, roll);
    enter('battle');
    playZoom = view.aim.zoom;
    view.aim.zoom = FIGHT_ZOOM;
    const result = resolveBattle({ roll, monster: mob.stats });
    const before = party.heroes.map((h) => h.hp);
    const took = hurt(party, result.damage, random);
    const after = party.heroes.map((h) => h.hp);
    gold += result.gold;
    audio.stopMusic();
    audio.battle(result.grade);
    hud.banner(null);
    battle.show({ monster: mob.stats, result, before, after }).then(() => {
      delve.actors.defeat(mob);
      effects.poof(mob.x, mob.y, mob.z, mob.stats.boss ? 2.5 : 1);
      effects.coins(mob.x, mob.y, mob.z, Math.min(30, 6 + result.gold / 4));
      audio.coin();
      hud.party(party, took);
      hud.gold(gold);
      view.aim.zoom = playZoom;
      if (wiped(party)) return gameOver();
      enter('play');
      audio.startMusic(delve.level.depth);
    });
  }

  function finish() {
    const b = delve.ball;
    const last = delve.index === LEVELS.length - 1;
    enter(last ? 'won' : 'clear');
    const bonus = CLEAR_BONUS * delve.level.depth;
    gold += bonus;
    hud.gold(gold);
    effects.coins(b.x, b.y, b.z, 24);
    audio.stopMusic();
    audio.goal();
    if (last) {
      hud.banner(`THE PARTY ESCAPES!\n${gold} GOLD`, 'big');
      saved = storage.record(gold);
    } else {
      rest(party);
      hud.party(party);
      hud.banner(`DEPTH ${delve.level.depth} CLEARED\n+${bonus} GOLD`, 'big', 'The party rests on the stairs.');
    }
  }

  function gameOver() {
    enter('over');
    hud.banner(`THE PARTY HAS FALLEN\n${gold} GOLD`, 'big');
    audio.stopMusic();
    audio.over();
    saved = storage.record(gold);
  }

  function physics(push) {
    const live = state === 'play';
    // Burnt or squashed, the die stays where it is; off an edge, it keeps falling.
    const moving = dieMesh.visible && !(state === 'lost' && lostHow !== 'fell');
    const out = stepDelve(delve, push, STEP, { live, moving });
    const b = delve.ball;
    if (out.impact > 2.5) {
      audio.clatter(out.impact);
      squash.v += Math.min(6, out.impact * 0.5);
    }
    if (out.fight) { fight(out.fight, out.roll); return; }
    if (out.hurt) {
      harm(out.hurt);
      hud.banner(`${BANNERS[out.hurt]}\n−${HARM[out.hurt]} HP`);
      if (out.hurt === 'spiked') { effects.sparks(b.x, b.y - b.r, b.z); audio.spikes(); }
      else effects.dust(b.x, b.y - b.r, b.z);
      if (wiped(party)) return gameOver();
    }
    for (const p of out.picked) {
      if (p.kind === 'gold' || p.kind === 'chest') {
        gold += p.amount;
        hud.gold(gold);
        effects.coins(p.x, p.y, p.z, p.kind === 'chest' ? 22 : 8);
        audio.coin();
        if (p.kind === 'chest') hud.banner(`TREASURE!\n+${p.amount} GOLD`);
      } else if (p.kind === 'potion') {
        const got = heal(party, p.amount);
        hud.party(party, got.map((g) => -g));
        effects.sparkle(p.x, p.y, p.z, '#ff5a7a');
        audio.potion();
        hud.banner(`HEALING POTION\n+${p.amount} HP EACH`);
      } else if (p.kind === 'key') {
        hud.keys(delve.keys);
        effects.sparkle(p.x, p.y, p.z, '#ffd23a');
        audio.key();
        hud.banner('A KEY!');
      }
    }
    if (out.door === 'opened') { hud.keys(delve.keys); audio.gate(); hud.banner('THE GATE LIFTS'); }
    if (out.door === 'locked') { audio.locked(); hud.banner('LOCKED\nfind the key'); }
    if (out.outcome === 'exit') finish();
    else if (out.outcome) lose(out.outcome);
  }

  function update(dt, presses) {
    // Read every frame, paused or not: the gamepad's buttons come in through it too.
    const stick = input.stick();

    const look = input.view(dt);
    view.turn(look.turn, look.tilt);
    view.zoomBy(look.zoom);
    if (state === 'title') view.aim.yaw += TITLE_TURN * dt;
    else if (state !== 'battle') playZoom = view.aim.zoom;
    view.step(dt);
    stage.time += dt;

    for (const p of presses) {
      if (p === 'mute') hud.muted(audio.toggleMute());
      if (p === 'home') {
        view.reset();
        if (state === 'title') view.aim.zoom = TITLE_ZOOM;
      }
      if (state === 'battle' && (p === 'start' || p === 'tap') && timer > 0.4) battle.proceed();
      if (p === 'pause' && (state === 'play' || state === 'ready' || state === 'lost')) {
        paused = !paused;
        hud.paused(paused);
        if (paused) audio.stopMusic(); else audio.startMusic(delve.level.depth);
      }
      if ((p === 'start' || p === 'tap') && (state === 'over' || state === 'won') && timer > 1.2) showTitle();
      else if (p === 'start' && state === 'title') startRun(0);
    }
    if (paused) {
      audio.rolling(0, false);
      return;
    }

    timer += dt;
    if (state !== 'battle') {
      const push = state === 'play' ? toGround(stick, view.yaw) : [0, 0];
      accumulator = Math.min(accumulator + dt, STEP * 12);
      while (accumulator >= STEP && state !== 'battle') {
        accumulator -= STEP;
        physics(state === 'play' ? push : [0, 0]);
      }
    }

    const b = delve.ball;
    switch (state) {
      case 'ready':
        if (timer > 1.6) {
          enter('play');
          hud.banner(null);
        }
        break;
      case 'play':
        if (timer > 1.6 && hud.bannerShown) hud.banner(null);
        break;
      case 'lost':
        if (timer > 1.7) {
          putBack(delve);
          dieMesh.visible = true;
          hud.banner(null);
          if (wiped(party)) gameOver(); else enter('play');
        }
        break;
      case 'clear':
        if (timer > 3.5) beginLevel(delve.index + 1);
        break;
      case 'over':
      case 'won':
        if (timer > 10) showTitle();
        break;
    }

    // The die: where it is, which way up, and squashed a little when it lands.
    squash.v += (-squash.p * 185 - squash.v * 11) * dt;
    squash.p += squash.v * dt;
    // On the title it turns slowly in the air over the first room, as Nat idles.
    if (state === 'title') turn(titleQ, [0.3, 0.55, 0.12], dt);
    const q = state === 'title' ? titleQ : delve.die.q;
    model.body.quaternion.set(q[0], q[1], q[2], q[3]);
    const s = squash.p * 0.04;
    model.body.scale.set(1 + s * 0.45, 1 - s * 0.8, 1 + s * 0.45);
    dieMesh.position.set(b.x, b.y - b.r + reachBelow(model, q) * (1 - s * 0.8), b.z);
    if (state === 'title') dieMesh.position.y = b.y + 0.25 + Math.sin(stage.time * 1.3) * 0.06;
    // The 20 shines when it is on top; on a fumble the 1 burns red, as Nat's does.
    const top = showing(delve);
    for (const f of model.glyphs) {
      if (f.number !== 20 && f.number !== 1) continue;
      const up = f.number === top ? 1 : 0;
      if (f.number === 20) f.mesh.material.color.setRGB(1, 1 - up * 0.06, 1 - up * 0.28).multiplyScalar(1 + up * 1.9);
      else f.mesh.material.color.setRGB(1, 1 - up * 0.5, 1 - up * 0.6).multiplyScalar(1 + up * 0.8);
    }
    if (top !== shown && state !== 'title') { shown = top; hud.roll(top); }

    delve.actors.sync(dt, stage.time, { focus: delve.ball });
    for (const d of decor) d.update(stage.time);
    effects.update(dt);
    audio.rolling(state === 'play' && b.grounded ? Math.hypot(b.vx, b.vz) : 0, b.grounded);
    hud.tick(dt, delve);
    stage.die.set(b.x, b.y, b.z);

    // The camera: after the die, but not down into the dark after it.
    const target = stage.target;
    if (debug.look) {
      target.set(...debug.look.at);
      view.zoom = view.aim.zoom = debug.look.zoom;
      return;
    }
    const ty = Math.max(b.y, delve.level.lowest - 1);
    const k = 1 - Math.exp(-(state === 'title' ? 2 : 5) * dt);
    target.x += (b.x - target.x) * k;
    target.y += (ty - target.y) * k;
    target.z += (b.z - target.z) * k;
  }

  /** For tests and the console: the level, the party, and a camera override (`look`). */
  const debug = {
    stage, look: null,
    get delve() { return delve; },
    get ball() { return delve.ball; },
    get party() { return party; },
    get state() { return state; },
    /** Straight to level `index`, for looking round. */
    level(index) { startRun(index); },
  };

  showTitle();

  return {
    update,
    startRun,
    get state() { return state; },
    get paused() { return paused; },
    /** Where the die is on the screen, in CSS pixels, for the pointer controls. */
    dieOnScreen(rect) {
      const b = delve.ball;
      const v = new GFX.Vector3(b.x, b.y, b.z).project(stage.camera);
      return { x: rect.left + (v.x + 1) / 2 * rect.width, y: rect.top + (1 - v.y) / 2 * rect.height };
    },
    debug,
  };
}
