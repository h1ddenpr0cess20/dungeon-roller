import { LEVELS } from './levels.js';
import { HEROES } from './party.js';

/**
 * Everything on screen that isn't the 3D view: the level, the gold and the
 * keys along the top; the party down the side with their hit points, and
 * the number on top of the die beside them; a map of what has been seen;
 * the big messages in the middle; the title screen.
 */

const NAMES = LEVELS.map((level) => level().name);

export function createHud(root, { onStart }) {
  const $ = (id) => root.querySelector(`#${id}`);
  const top = $('top');
  const levelEl = $('level');
  const goldEl = $('gold');
  const keysEl = $('keys');
  const bannerEl = $('banner');
  const titleEl = $('title');
  const levelsEl = $('levels');
  const bestEl = $('best');
  const pauseEl = $('pause');
  const muteEl = $('mute');
  const partyEl = $('party');
  const revivesEl = $('revives');
  const rollEl = $('roll');
  const mapEl = $('map');
  const ctx = mapEl.getContext('2d');
  let shown = false;
  let mapEvery = 0;
  let mapScale = 2;

  muteEl.addEventListener('click', (e) => {
    e.stopPropagation();
    muteEl.dispatchEvent(new CustomEvent('mute', { bubbles: true }));
  });

  const rows = HEROES.map((h) => {
    const li = document.createElement('li');
    li.innerHTML = `<b style="--hero:${h.colour}">${h.mark}</b><span class="name">${h.name}</span>`
      + '<span class="bar"><i></i></span><span class="hp"></span><span class="hit"></span>';
    partyEl.appendChild(li);
    return { li, bar: li.querySelector('i'), hp: li.querySelector('.hp'), hit: li.querySelector('.hit') };
  });

  /** The map: every tile seen so far, the die, the monsters near it and the stairs once found. */
  function drawMap(delve) {
    const { level, explored, ball } = delve;
    const s = mapScale;
    ctx.clearRect(0, 0, mapEl.width, mapEl.height);
    for (let z = 0; z < level.rows; z++) {
      for (let x = 0; x < level.cols; x++) {
        if (!explored[z * level.cols + x]) continue;
        const c = level.cell(x, z);
        if (!c) continue;
        ctx.fillStyle = c.kind === 'wall' ? '#4a443e' : c.kind === 'lava' ? '#ff6a1a' : c.kind === 'exit' ? '#6fd0ff'
          : c.trap ? '#8a5a40' : c.door ? '#b0b4bd' : '#a9a397';
        ctx.fillRect(x * s, z * s, s, s);
      }
    }
    for (const m of delve.actors.mobs) {
      if (m.dead || m.gone) continue;
      if (Math.hypot(m.x - ball.x, m.z - ball.z) > 9) continue;
      ctx.fillStyle = '#ff4a3a';
      ctx.fillRect(m.x * s - s, m.z * s - s, s * 2, s * 2);
    }
    for (const p of delve.actors.pickups) {
      if (p.taken || !explored[Math.floor(p.z) * level.cols + Math.floor(p.x)]) continue;
      ctx.fillStyle = p.kind === 'key' ? '#ffe680' : p.kind === 'potion' ? '#ff6a8a' : p.kind === 'revive' ? '#fff4c0' : '#ffcf4a';
      ctx.fillRect(p.x * s - s / 2, p.z * s - s / 2, s, s);
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x * s, ball.z * s, s * 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  return {
    get bannerShown() { return shown; },

    title(saved) {
      titleEl.hidden = false;
      top.hidden = true;
      partyEl.hidden = true;
      rollEl.hidden = true;
      mapEl.hidden = true;
      bannerEl.hidden = true;
      shown = false;
      levelsEl.replaceChildren(...LEVELS.map((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'depth';
        b.disabled = i > saved.reached;
        b.innerHTML = `<span>${i + 1}</span>${NAMES[i]}`;
        b.title = b.disabled ? 'Reach this depth to start from it' : `Start from ${NAMES[i]}`;
        b.addEventListener('click', (e) => { e.stopPropagation(); onStart(i); });
        b.addEventListener('pointerdown', (e) => e.stopPropagation());
        return b;
      }));
      bestEl.textContent = saved.best > 0
        ? `best ${saved.best} gold${saved.last != null ? ` · last ${saved.last}` : ''}`
        : '';
    },

    play() {
      titleEl.hidden = true;
      top.hidden = false;
      partyEl.hidden = false;
      rollEl.hidden = false;
      mapEl.hidden = false;
    },

    level(level) {
      levelEl.innerHTML = `<span class="label">depth ${level.depth}</span>${level.name}`;
    },

    gold(n) { goldEl.textContent = String(n); },

    keys(n) {
      keysEl.textContent = n > 0 ? '⚷'.repeat(n) : '';
      keysEl.parentElement.classList.toggle('none', n === 0);
    },

    /** How many revive potions the party carries. */
    revives(n) {
      revivesEl.textContent = n > 0 ? '✚'.repeat(n) : '';
      revivesEl.parentElement.classList.toggle('none', n === 0);
    },

    /** The party's hit points; `took`, if given, flashes what each hero just lost (or, negative, gained). */
    party(party, took = null) {
      party.heroes.forEach((h, i) => {
        const r = rows[i];
        r.bar.style.width = `${(100 * Math.max(0, h.hp)) / h.max}%`;
        r.bar.classList.toggle('low', h.hp > 0 && h.hp <= h.max * 0.3);
        r.hp.textContent = `${Math.max(0, h.hp)}/${h.max}`;
        r.li.classList.toggle('down', h.hp <= 0);
        const t = took?.[i] ?? 0;
        if (t !== 0) {
          r.hit.textContent = t > 0 ? `−${t}` : `+${-t}`;
          r.hit.className = `hit ${t > 0 ? 'hurt' : 'healed'}`;
          void r.hit.offsetWidth;
          r.hit.classList.add('show');
        }
      });
    },

    /** The number on top of the die. */
    roll(n) {
      rollEl.querySelector('.n').textContent = String(n);
      rollEl.dataset.high = n === 20 ? 'crit' : n === 1 ? 'fumble' : n >= 15 ? 'high' : n <= 5 ? 'low' : '';
    },

    /** A new level: a map canvas to fit it. */
    map(delve) {
      const { cols, rows: depth } = delve.level;
      mapScale = Math.max(1, Math.floor(Math.min(180 / cols, 180 / depth)));
      mapEl.width = cols * mapScale;
      mapEl.height = depth * mapScale;
      mapEvery = 0;
    },

    /** Once a frame: the map, now and then. */
    tick(dt, delve) {
      mapEvery -= dt;
      if (mapEvery > 0 || mapEl.hidden) return;
      mapEvery = 0.15;
      drawMap(delve);
    },

    banner(text, size = 'normal', sub = '') {
      shown = text != null;
      bannerEl.hidden = !shown;
      if (!shown) return;
      bannerEl.textContent = text;
      if (sub) {
        const small = document.createElement('small');
        small.textContent = sub;
        bannerEl.appendChild(small);
      }
      bannerEl.className = size;
      // Restart the pop-in.
      void bannerEl.offsetWidth;
      bannerEl.classList.add('pop');
    },

    paused(on) { pauseEl.hidden = !on; },

    muted(on) {
      muteEl.setAttribute('aria-pressed', String(on));
      muteEl.textContent = on ? 'sound off' : 'sound on';
    },
  };
}
