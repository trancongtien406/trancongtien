export type Star = { x: number; y: number; r: number; o: number; tw: boolean; d: number };

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sao cố định theo seed (SSR và client trùng nhau). */
export function makeStars(n: number, seed: number, maxY = 100): Star[] {
  const r = rng(seed);
  return Array.from({ length: n }, () => ({
    x: Math.round(r() * 1000) / 10,
    y: Math.round(r() * maxY * 10) / 10,
    r: Math.round((0.5 + r() * 1.2) * 10) / 10,
    o: Math.round((0.25 + r() * 0.6) * 100) / 100,
    tw: r() < 0.3,
    d: Math.round(r() * 60) / 10,
  }));
}
