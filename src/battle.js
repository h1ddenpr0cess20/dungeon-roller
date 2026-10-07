import { HEROES } from './party.js';

/**
 * The battle. Roll into a monster and the number on top of the die is the
 * party's roll; that one number, against the monster's DC, decides the
 * fight.
 *
 *   20               critical: the party wins untouched, and the gold is doubled
 *   the DC or better a clean win: half the monster's power at the DC, and a
 *                    point less for every point over, down to nothing
 *   under the DC     a hard fight: the party wins, but takes half the
 *                    monster's power, and more the further under
 *   1                fumble: the monster gets in twice as hard
 *
 * The party always wins the fight itself: losing is only ever running out
 * of hit points. The game only needs `damage` and `gold` back. (A full
 * turn-based system is kept aside in docs/battle-system.md.)
 */

export function resolveBattle({ roll, monster }) {
  const { dc, power, gold } = monster;
  if (roll >= 20) return { roll, dc, grade: 'critical', damage: 0, gold: gold * 2 };
  if (roll <= 1) return { roll, dc, grade: 'fumble', damage: power * 2, gold };
  if (roll >= dc) return { roll, dc, grade: 'success', damage: Math.max(0, Math.ceil(power / 2) - (roll - dc)), gold };
  return { roll, dc, grade: 'struggle', damage: Math.ceil(power / 2) + Math.ceil((dc - roll) / 3), gold };
}

export const GRADES = Object.freeze({
  critical: { title: 'CRITICAL!', line: 'A natural 20. The party cuts it down without a scratch.' },
  success: { title: 'VICTORY', line: 'Over the DC: a clean fight.' },
  struggle: { title: 'HARD-WON', line: 'Under the DC: the party wins, but it hurts.' },
  fumble: { title: 'FUMBLE!', line: 'A natural 1. It gets in twice before it goes down.' },
});

/**
 * The battle screen: the monster, the roll against its DC, and
 * what the fight cost each hero. `show` resolves when the player carries on.
 */
export function createBattleScreen(root) {
  const el = document.createElement('section');
  el.id = 'battle';
  el.hidden = true;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Battle');
  el.innerHTML = `
    <div class="card">
      <h2 class="foe"></h2>
      <div class="clash">
        <div class="roll"><span class="d20"></span><span class="label">your roll</span></div>
        <div class="vs">vs</div>
        <div class="dc"><span class="value"></span><span class="label">DC</span></div>
      </div>
      <p class="grade"></p>
      <p class="line"></p>
      <ul class="heroes"></ul>
      <p class="loot"></p>
      <button type="button" class="go">CONTINUE</button>
    </div>`;
  root.appendChild(el);
  const $ = (s) => el.querySelector(s);
  let done = null;

  const finish = () => {
    if (!done) return;
    el.hidden = true;
    const d = done;
    done = null;
    d();
  };
  $('.go').addEventListener('click', (e) => { e.stopPropagation(); finish(); });
  el.addEventListener('pointerdown', (e) => e.stopPropagation());

  return {
    get open() { return done !== null; },

    /** `before` and `after` are each hero's hit points either side of the fight. */
    show({ monster, result, before, after }) {
      const grade = GRADES[result.grade];
      $('.foe').textContent = monster.name + (monster.boss ? ' — the boss' : '');
      $('.d20').textContent = String(result.roll);
      $('.d20').dataset.grade = result.grade;
      $('.dc .value').textContent = String(result.dc);
      $('.grade').textContent = grade.title;
      $('.grade').dataset.grade = result.grade;
      $('.line').textContent = grade.line;
      $('.heroes').replaceChildren(...HEROES.map((h, i) => {
        const li = document.createElement('li');
        const lost = before[i] - after[i];
        li.innerHTML = `<b style="color:${h.colour}">${h.name}</b>`
          + `<span class="bar"><i style="width:${(100 * Math.max(0, after[i])) / h.hp}%"></i></span>`
          + `<span class="hp">${Math.max(0, after[i])}/${h.hp}</span>`
          + `<span class="lost">${lost > 0 ? `−${lost}` : ''}${after[i] <= 0 && before[i] > 0 ? ' DOWN' : ''}</span>`;
        if (after[i] <= 0) li.classList.add('down');
        return li;
      }));
      $('.loot').textContent = `+${result.gold} gold`;
      el.hidden = false;
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
      return new Promise((resolve) => {
        done = resolve;
        $('.go').focus({ preventScroll: true });
      });
    },

    /** Carry on: Enter, Space, a tap or the pad's A, passed in by the game. */
    proceed: finish,
  };
}
