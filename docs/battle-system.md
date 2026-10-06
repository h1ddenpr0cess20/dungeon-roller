# The full battle system (shelved)

**Status:** shelved. The game uses the one-roll mock battle in `src/battle.js`.
The full system described here is a port of capitol-quest's turn-based
battle rules. It was built and tested, then taken out so the mock could be
improved first. The whole port is kept in
[`battle-port/integration.patch`](battle-port/integration.patch), so it can be
brought back later without rewriting it.

- [What it is](#what-it-is)
- [Bringing it back](#bringing-it-back)
- [What still has to be done](#what-still-has-to-be-done)
- [How it fits into the game](#how-it-fits-into-the-game)
- [The rules](#the-rules)
- [Tests and balance](#tests-and-balance)

## What it is

When the die runs into a monster, a real fight starts instead of the mock's
single roll:

- The party is the **Hero, Warrior, Mage and Healer**. Each hero has a level,
  XP, HP, MP and a LIMIT gauge, and all of them carry over from fight to fight
  and from floor to floor. The party also shares one bag of items.
- The monster brings its pack, 1 to 3 monsters depending on the kind and how
  deep the party is.
- Turns work as they do in capitol-quest. Each hero picks **Attack, Skill,
  Item, Defend, Analyze or Disengage**. Then every monster carries out the
  *intent* it showed at the top of the round.
- **Weakness and BREAK:** a monster hit by its weakness twice is BROKEN. It
  loses its next move and takes extra damage for 2 rounds.
- The **LIMIT** gauge fills as heroes deal and take hits. A full gauge unlocks
  a free limit skill.
- **Statuses** (ATK/DEF/MAG up or down, VULN, REGEN, MP+) wear off round by round.
- **Auto-battle** can play any hero, in one of four modes: Manual, Balanced,
  Aggressive or Conserve. Fights can run at 1×, 2× or 3× speed.
- **The die still matters.** capitol-quest has no dice. Here the number on top
  when the die hit the monster sets up how the fight opens (see
  [Openings](#the-roll-openings)).

## Bringing it back

The patch applies cleanly on top of `2f1c12d` ("Stop the die sliding…"):

```sh
git apply docs/battle-port/integration.patch
npm test          # 91 tests pass with the patch applied (checked on 2f1c12d)
npx eslint .      # clean, apart from src/battle/screen.js; see below
```

**Do this before it will build or run in a browser:**
`src/battle/screen.js` still imports `canvasOf`, `flashOf` and `portrait`
from `src/sprites/`. Those were the code-painted 2D sprites, which were
rejected and deleted, so the patch does not bring them back. Replace those
imports and calls before shipping. See
[What still has to be done](#what-still-has-to-be-done). The engine, the
data, the party and every other part of the patch are complete and tested
headless.

If the patch stops applying as the game changes, these are the pieces and
what each one does:

| File | Change |
| --- | --- |
| `src/battle/data.js` | **New.** Heroes, skills, limits, monsters' fighting stats and AI, packs, items, XP curve, the roll openings. |
| `src/battle/engine.js` | **New.** `class Battle`: the whole fight with nothing drawn, plus `autoResolve(battle)` for tests and the autopilot. |
| `src/battle/screen.js` | **New.** capitol-quest's battle screen on a 1280×720 canvas over the dungeon: backdrop, units, party panel, command menu, skills, items, targets, analyze, opening card, victory/defeat panels, keyboard and pointer. |
| `src/battle.js` | **Deleted** (the mock). |
| `src/party.js` | Rewritten: levels, XP (`grantXP`), MP, LIMIT, the bag (`loot`), `snapshot`/`restore` (for Retry), seeded `hurt` weighted toward the front line. |
| `src/game.js` | `fight(mob, roll)` becomes an async loop around `new Battle(...)` and `screen.show(...)`. It handles retry (lose ¼ of the gold, restore the party), fallen (game over), fled (the monster calms down for 3 s and the die is pushed away) and won (gold, level-up banner). Pickups go into the bag. |
| `src/hud.js` | Party panel shows LV, HP and MP bars, HP numbers, and the bag. |
| `src/storage.js` | Saves `settings: { autoMode 0–3, battleSpeed 1–3 }`. |
| `src/audio.js` | `encounter()` sting, `sfx(name)` blips (hit, victory, defeat, move, confirm, cancel, magic, heal, error), and `battleMusic(on)`, capitol-quest's battle loop. |
| `src/actors.js` | `m.calm`: a monster the party just ran from won't chase or start a fight until it counts down. |
| `src/delve.js` | `HARM` ×4 (fell 24, burnt 40, crushed 36, spiked 20, thud 12), because the new party has about 340 HP between them, not about 40. |
| `src/main.js` | Skips rendering the dungeon while the battle canvas covers the view (`game.covered`). |
| `src/styles.css` | `#party` grid, `#battle` shell and canvas; `#roll` moved up above the party panel. |
| tests | `test/battle.test.js` (engine), `test/party.test.js`, `test/storage.test.js`, `test/levels.test.js` (one party through all six levels), `test/helpers/autopilot.js` (fights with `autoResolve`). |

## What still has to be done

1. **Draw the units in 3D, with the sculpted models.** The 2D sprites are
   not coming back. The 3D models in `src/models/` (SDF sculpts, skinned on
   the CPU) are meant for this:
   - Render the fight as a 3D scene with the same renderer as the dungeon
     (`stage.renderer`), using its own `Scene` and camera. Put a floor in the
     level's palette. Line the heroes up on the left and the monsters on the
     right, in the slots `screen.js` already uses (`PARTY_POS`, `ENEMY_POS`),
     converted to world positions.
   - Pose each model every frame with `model.pose({ clip, t, time, seed })`.
     Map each unit's state to a clip:
     - heroes (`heroPose(h)` in screen.js): `idle`, `attack`, `cast`, `hit`,
       `ko`, `win`
     - monsters: `idle`, `attack` while acting, `hit` while `hitTimer > 0`,
       `ko` at 0 HP
   - Keep the HUD (`drawPartyPanel`, `drawCommands`, `drawResult`,
     `drawTop`, `drawOpening`, floaters) on the 2D canvas, but clear it
     transparent over the 3D view instead of painting a backdrop. Use
     `camera.project` to place floaters and target markers over the 3D units.
   - In `screen.js`, these calls need replacing: `sprite(...)`,
     `heightOf(...)`, `canvasOf(...)` in `drawUnits`, and the two
     `portrait(...)` calls (party panel and victory panel). Portraits can be
     small offscreen renders of each hero model, or just the hero's accent
     colour and initial.
2. **Hero models.** The Hero, Warrior, Mage and Healer still have to be
   sculpted. Only the rat is started (`src/models/cast/rat.js`).
3. **Touch.** The screen has pointer buttons for every command, but it has
   only been tried with a mouse.
4. **Balance.** It is tuned so the autopilot gets through all six levels
   with one party (see below). The fights have not been tuned by hand.
5. **README.** Rewrite the "Battles" section. It currently describes the mock.

## How it fits into the game

The contract between the game and a fight is small:

```js
const battle = new Battle({
  party,                       // party.js; changed in place
  foes: encounter(kind, depth),
  level: foeLevel(depth),
  roll, dc: MONSTERS[kind].dc, // the die against the monster it hit
  settings, random, label,
});
const done = await screen.show(battle, { palette, gold });
// done.how: 'won' | 'fled' | 'retry' | 'fallen'
// done.result: { won, xp, gold, gains, rounds, breaks } when won
```

- `Battle.update(dt)` advances it. `Battle.input(key)`, `commitMenu`,
  `chooseSkill`, `chooseItem`, `confirmTarget`, `analyze` and `disengage`
  take the player's choices.
- `battle.events` is how the engine tells the screen what to show. It is a
  list of `{ type: 'floater' | 'fx' | 'shake' | 'sfx', ... }`, and the screen
  drains it every frame.
- Anything that knows the rules can drive a fight. The screen is one such
  driver; `autoResolve` (used by the tests) is another.

## The rules

### The heroes

| Hero | HP | MP | ATK | DEF | MAG | Basic attack |
| --- | --- | --- | --- | --- | --- | --- |
| Hero (vanguard) | 90 | 24 | 14 | 7 | 7 | Slash (physical) |
| Warrior (bulwark) | 96 | 18 | 15 | 9 | 4 | Axe (physical) |
| Mage (arcanist) | 76 | 34 | 7 | 4 | 15 | Magic Missile (magic) |
| Healer (cleric) | 80 | 34 | 9 | 5 | 13 | Smite (hybrid) |

- **Growth:** +6 HP and +2 MP per level. Fighters get ATK +1 per level plus
  +1 every two levels; casters get the same for MAG. DEF = base + level/2.
  A level-up refills HP and MP.
- **XP to the next level:** `120 + (lvl − 1) × 60`.
- **Skills** unlock at levels 1, 2, 4, 7 and 11, one at each, in this order:
  - Hero: Valor Strike, Rally, Cross Slash, Finishing Blow, Banner.
    Limit: Braveheart.
  - Warrior: Crushing Blow, Shield Wall, Whirlwind, Hamstring, Hold the
    Line. Limit: Berserk.
  - Mage: Fire Bolt, Frost Shard, Chain Lightning, Arcane Surge, Meteor.
    Limit: Starfall.
  - Healer: Mend, Prayer, Judgement, Revive, Purify. Limit: Miracle.

  Costs, powers and effects are in `data.js`.
- **MP:** a basic attack gives back 2 MP; Defend gives back 4.

### The monsters

These are base stats at level 1:

| Monster | HP | ATK | DEF | MAG | Weak to | AI | Pack (from depth 3) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Giant Rat | 70 | 13 | 4 | 4 | physical | gnaw: drain every 3rd round | rat ×2 (×3) |
| Cave Bat | 62 | 12 | 4 | 6 | hybrid | bite: drain every 2nd | bat ×2 (×3) |
| Skeleton | 108 | 16 | 8 | 6 | hybrid | shield: guard every 3rd | skeleton ×2 (+bat) |
| Goblin | 92 | 15 | 5 | 6 | physical | stab: lowers MAG every 3rd | goblin ×2 (×3) |
| Ooze | 120 | 11 | 9 | 15 | magic | acid: spit / lowers DEF | ooze + rat (ooze ×2) |
| Orc Brute | 158 | 21 | 11 | 5 | magic | brute: brace / smash ×1.3 | orc + goblin (+goblin) |
| Wraith | 128 | 12 | 6 | 21 | hybrid | wail: party-wide every 3rd | wraith + skeleton (+skeleton) |
| Red Dragon | 260 (×2.1) | 24 | 14 | 23 | magic | fire breath every 3rd, fury under 40% | alone; boss, no running |

- **Monster level** is `1 + (depth − 1) × 2`. The dragon fights at the
  party's average level if that is higher.
- **Scaling per level:**
  - HP × `(0.82 + 0.095 (L−1)) × 1.25`
  - ATK and MAG × `(0.85 + 0.09 (L−1)) × 1.12`
  - DEF × `0.9 + 0.06 (L−1)`
- **Who monsters target:** weighted toward the front line (Hero 3,
  Warrior 4, Mage 2, Healer 2). A hero who is defending is ×1.5 as likely
  to be picked.

### Damage

- **Physical:** `ATK × power − DEF × 0.52 + (−2…3)`
  - crit chance `luck/250` (+ the skill's bonus), crit ×1.55
  - VULN ×1.22, guarding ×0.5
- **Magic:** `MAG × power − DEF × 0.26 + (−2…3)`
  - VULN ×1.22, guarding ×0.62
- **Hybrid:** `(ATK × 0.45 + MAG × 0.72) × power − DEF × 0.34 + (−2…3)`
  - crit chance `luck/300`, crit ×1.5
- **Status multipliers:** ATK/MAG up ×1.25, DEF up ×1.3, any down ×0.76.
- **Weakness:** a hit of the monster's weak type does ×1.16 and adds a
  break point. Two break points cause BREAK: the monster loses its next move
  and is VULN for 2 rounds. A monster recovering from a break can't be
  broken again straight away.
- **LIMIT:** +10 when a hero is hit, +8 to +10 for each hit the hero
  lands, +6 after a win, +50 on a natural 20.

### The roll (openings)

| Roll | Opening | Effect |
| --- | --- | --- |
| 20 | CRITICAL ROLL | Every enemy starts BROKEN (loses its first move); party LIMIT +50; gold ×2 |
| ≥ DC | ADVANTAGE | Party moves first with ATK up for 2 rounds |
| < DC | SURPRISED | Monsters move first |
| 1 | FUMBLE | Monsters move first; party DEF down for 2 rounds |

### Items, loot, rewards

- **Items:** Potion (+40 HP), Hi-Potion (+90), Ether (+20 MP), Phoenix Down
  (revive, or +60 HP).
- **Start:** 3 Potions, 1 Ether, 1 Phoenix Down.
- **Loot in the dungeon:** a potion on the floor goes into the bag. A chest
  holds gold plus a Hi-Potion, Ether or Phoenix Down, depending on where it
  stands.
- **XP for a win:**
  - normal fight: `20 + level × 8 + pack size × 6`
  - boss: `140 + level × 24`
- **Gold:** the sum of the pack's `MONSTERS[kind].gold`.
- **After a win:** every hero still standing gets back 12% HP and 10% MP.
- **Stairs:** a rest at each stair gives back 50% HP and MP and revives the
  fallen.

### Running and losing

- **Disengage** works 72% of the time, and never against the boss. The
  monster the party ran from stays calm for 3 seconds.
- **When the whole party falls:**
  - **Retry** replays the fight from the start. It costs ¼ of the gold, and
    the party is put back as it was before the fight.
  - **Give up** ends the delve.

### Controls (the screen)

- Arrows or WASD move through the menus. Enter, Space or E chooses.
  Escape goes back.
- 1–6 pick a command directly.
- **B** cycles auto-battle mode, **V** changes the speed.
- Every command is also a clickable button.

## Tests and balance

- `test/battle.test.js` covers:
  - each roll opening
  - attacking through the menus with keys
  - skill costs and unlocks, and the limit skill
  - BREAK
  - defending
  - auto-battle winning a fair fight and paying XP and gold
  - the dragon: a levelled party beats it, a fresh party doesn't
  - running away, and that the dragon can't be run from
- `test/party.test.js` covers levelling, harm spread across the party,
  rests, the bag, and `snapshot`/`restore` (what Retry uses).
- `test/levels.test.js` drives one party through all six levels in order,
  the way a player would. The autopilot rolls the die along a planned path
  and fights every monster it touches with `autoResolve`. It rests at each
  stair and loots everything.
- **Last run before shelving:**
  - every fight was won, in 2–8 rounds
  - the dragon took about 13 rounds
  - the party came out of the six levels at about levels 3, 5, 6, 9, 11 and 13
