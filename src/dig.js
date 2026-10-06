/**
 * Digging a dungeon out a piece at a time, the way you'd describe it: a hall
 * so long, a flight of stairs down, a room, turn, a bridge over the dark...
 * A cursor keeps track of where the next piece starts — a tile, a heading
 * and a floor height — so the pieces always meet, however long the level.
 *
 * Headings are '+x', '-x', '+z' and '-z'. Across a heading, positive is the
 * heading turned a quarter from x toward z: across +x is +z, across +z is −x.
 *
 * Each piece returns a `Piece`: its tiles as a rectangle, and `tile(along,
 * across)` / `rect(along, length, across, width)` to put things in it by
 * where they are in the piece rather than on the grid.
 */

const HEADINGS = { '+x': [1, 0], '-x': [-1, 0], '+z': [0, 1], '-z': [0, -1] };

/** The sides of a rectangle, as `enclose` names them, by the direction they face. */
const SIDE = { '+x': 'x1', '-x': 'x0', '+z': 'z1', '-z': 'z0' };
const OPPOSITE = { '+x': '-x', '-x': '+x', '+z': '-z', '-z': '+z' };

class Piece {
  constructor(at, heading, length, width, h) {
    this.x0 = at[0]; this.z0 = at[1];
    this.heading = heading;
    this.length = length;
    this.width = width;
    this.h = h;
    const [dx, dz] = HEADINGS[heading];
    this.dir = [dx, dz];
    this.across = [-dz, dx];
    this.lo = -Math.floor((width - 1) / 2);
    const [x, z, w, d] = this.rect(0, length, this.lo, width);
    Object.assign(this, { x, z, w, d });
  }

  /** The tile `along` the piece and `across` it from its middle line, as [x, z]. */
  tile(along, across = 0) {
    return [this.x0 + this.dir[0] * along + this.across[0] * across, this.z0 + this.dir[1] * along + this.across[1] * across];
  }

  /** The tiles `along`…`along + length` and `across`…`across + width`, as [x, z, w, d] on the grid. */
  rect(along, length, across, width) {
    const a = this.tile(along, across), b = this.tile(along + length - 1, across + width - 1);
    return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.abs(a[0] - b[0]) + 1, Math.abs(a[1] - b[1]) + 1];
  }

  /** The tiles right across the piece, from `along` for `length`. */
  span(along, length = 1) {
    return this.rect(along, length, this.lo, this.width);
  }

  /** The sides of the piece's rectangle that run along it. */
  get flanks() {
    return this.dir[0] ? 'z0 z1' : 'x0 x1';
  }

  /** The side it was entered by and the side it is left by. */
  get ends() {
    return [SIDE[OPPOSITE[this.heading]], SIDE[this.heading]];
  }
}

export function digger(dungeon, { x, z, h, heading = '+x' }) {
  const cur = { x, z, h, heading };
  const piece = (length, width, h = cur.h) => new Piece([cur.x, cur.z], cur.heading, length, width, h);
  const advance = (length) => {
    const [dx, dz] = HEADINGS[cur.heading];
    cur.x += dx * length;
    cur.z += dz * length;
  };
  const walls = (p, sides, opts) => dungeon.enclose(p.x, p.z, p.w, p.d, { sides, ...opts });

  const dig = {
    get at() { return { ...cur }; },
    get h() { return cur.h; },

    /** Straight on, `length` tiles at this height, walled along both sides. */
    hall(length, { width = 3, color = 0, walls: sides, torches = 6, back, front } = {}) {
      const p = piece(length, width);
      dungeon.flat(p.x, p.z, p.w, p.d, cur.h, { color });
      walls(p, sides ?? p.flanks, { torches, back, front });
      advance(length);
      return p;
    },

    /** A room `width` across and `length` deep, walled all round; whatever is dug next breaks through. */
    room(length, width, { color = 0, torches = 4, back, front, sides } = {}) {
      const p = piece(length, width);
      dungeon.flat(p.x, p.z, p.w, p.d, cur.h, { color });
      walls(p, sides ?? 'x0 z0 x1 z1', { torches, back, front });
      advance(length);
      return p;
    },

    /** A walk along the edge of the dark: wall on the far side only, if any. */
    ledge(length, { width = 2, color = 0, torches = 6, wall = true } = {}) {
      const p = piece(length, width);
      dungeon.flat(p.x, p.z, p.w, p.d, cur.h, { color });
      if (wall) {
        const back = p.flanks.split(' ')[0];
        walls(p, back, { torches });
      }
      advance(length);
      return p;
    },

    /** A bridge over the dark, nothing either side. */
    bridge(length, { width = 1, color = 2 } = {}) {
      const p = piece(length, width);
      dungeon.flat(p.x, p.z, p.w, p.d, cur.h, { color });
      advance(length);
      return p;
    },

    /** Down a flight of steps, a tile each, `drop` in all: the first step already a step down. */
    stairs(length, drop, { width = 3, color = 1, walls: sides, torches = 0 } = {}) {
      const p = piece(length, width);
      for (let k = 0; k < length; k++) {
        const [sx, sz, sw, sd] = p.span(k);
        dungeon.flat(sx, sz, sw, sd, cur.h - (drop * (k + 1)) / length, { color });
      }
      walls(p, sides ?? p.flanks, { torches });
      cur.h -= drop;
      advance(length);
      return p;
    },

    /** Down (or, with a negative `drop`, up) a ramp. */
    ramp(length, drop, { width = 3, color = 1, walls: sides, torches = 0 } = {}) {
      const p = piece(length, width);
      const axis = p.dir[0] ? 'x' : 'z';
      const forward = p.dir[0] + p.dir[1] > 0;
      const [from, to] = forward ? [cur.h, cur.h - drop] : [cur.h - drop, cur.h];
      dungeon.slope(p.x, p.z, p.w, p.d, from, to, axis, { color });
      walls(p, sides ?? p.flanks, { torches });
      cur.h -= drop;
      advance(length);
      return p;
    },

    /** A banked channel down, like a sewer or a mine chute; no walls, the banks keep the die in. */
    chute(length, drop, { width = 3, color = 1, bank = 0.9 } = {}) {
      const p = piece(length, width);
      const axis = p.dir[0] ? 'x' : 'z';
      const forward = p.dir[0] + p.dir[1] > 0;
      const [from, to] = forward ? [cur.h, cur.h - drop] : [cur.h - drop, cur.h];
      dungeon.chute(p.x, p.z, p.w, p.d, from, to, axis, { color, bank });
      cur.h -= drop;
      advance(length);
      return p;
    },

    /**
     * A corner, `width` square, turning to `heading`; walled on the two sides
     * that are neither the way in nor the way out.
     */
    turn(heading, { width = 3, color = 0, torches = 0 } = {}) {
      const p = piece(width, width);
      dungeon.flat(p.x, p.z, p.w, p.d, cur.h, { color });
      const shut = ['x0', 'z0', 'x1', 'z1'].filter((s) => s !== p.ends[0] && s !== SIDE[heading]);
      walls(p, shut.join(' '), { torches });
      // Out of the far side, lined up so a piece as wide carries straight on from it.
      const [hx, hz] = HEADINGS[heading];
      const [lx, lz] = [-hz, hx];
      const lo = -Math.floor((width - 1) / 2);
      const centre = (start, sign) => (sign > 0 ? start - lo : start + lo + width - 1);
      cur.heading = heading;
      if (hx) {
        cur.x = hx > 0 ? p.x + p.w : p.x - 1;
        cur.z = centre(p.z, lz);
      } else {
        cur.z = hz > 0 ? p.z + p.d : p.z - 1;
        cur.x = centre(p.x, lx);
      }
      return p;
    },

    /** Nothing for `length` tiles, cleared of anything dug there before: a gap to cross some other way. */
    gap(length, { width = 3 } = {}) {
      const p = piece(length, width);
      dungeon.gap(p.x, p.z, p.w, p.d);
      advance(length);
      return p;
    },

    /**
     * A platform `size` square that glides across a gap `length` long and
     * back, waiting at each end.
     */
    ferry(length, { size = 3, period = 6, phase = 0 } = {}) {
      const p = piece(length, size);
      dungeon.gap(p.x, p.z, p.w, p.d);
      const [x, z, w, d] = p.rect(0, size, p.lo, size);
      const travel = length - size;
      dungeon.lift(x, z, w, d, cur.h, { to: [p.dir[0] * travel, 0, p.dir[1] * travel], period, phase });
      advance(length);
      return p;
    },

    /**
     * Down a shaft on a platform `size` square: it waits here, level with
     * the floor, sinks `drop`, and waits at the bottom. The way on starts on
     * the far side of it, at the bottom.
     */
    shaft(drop, { size = 3, period = 7, phase = 0 } = {}) {
      const p = piece(size, size);
      dungeon.gap(p.x, p.z, p.w, p.d);
      dungeon.lift(p.x, p.z, p.w, p.d, cur.h, { to: [0, -drop, 0], period, phase });
      cur.h -= drop;
      advance(size);
      return p;
    },

    /** The stairs down to the next level, with walls round. */
    exit(length, width = 3) {
      const p = piece(length, width);
      dungeon.exit(p.x, p.z, p.w, p.d, cur.h);
      walls(p, 'x0 z0 x1 z1', { torches: 0 });
      advance(length);
      return p;
    },

    /** Picks the cursor up and puts it down somewhere else: for a second way round. */
    jump({ x = cur.x, z = cur.z, h = cur.h, heading = cur.heading } = {}) {
      Object.assign(cur, { x, z, h, heading });
      return dig;
    },

    /** A copy of the cursor as it is, to dig a branch from. */
    fork() {
      return digger(dungeon, { ...cur });
    },
  };
  return dig;
}

