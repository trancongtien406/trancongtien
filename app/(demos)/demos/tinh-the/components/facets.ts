/** Sinh các mặt cắt của một viên đá tám cạnh nhìn từ trên xuống. Thuần hàm, kết quả ổn định giữa server và client. */
export type Facet = { points: string; nx: number; ny: number; nz: number; seed: number; ring: "table" | "star" | "kite" | "girdle" };

const R = 92;
const rad = (d: number) => (d * Math.PI) / 180;
const P = (r: number, deg: number): [number, number] => [Math.cos(rad(deg - 90)) * r, Math.sin(rad(deg - 90)) * r];
const f2 = (n: number) => Math.round(n * 100) / 100;

function make(pts: [number, number][], z: number, ring: Facet["ring"], seed: number): Facet {
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const k = 1.15 - z;
  const nx = (cx / R) * k;
  const ny = (cy / R) * k;
  const len = Math.hypot(nx, ny, z) || 1;
  return { points: pts.map((p) => `${f2(p[0])},${f2(p[1])}`).join(" "), nx: f2(nx / len), ny: f2(ny / len), nz: f2(z / len), seed, ring };
}

export const FACETS: Facet[] = (() => {
  const out: Facet[] = [];
  const T = (k: number) => P(R * 0.4, (((k % 8) + 8) % 8) * 45);
  const M = (k: number) => P(R * 0.68, (((k % 8) + 8) % 8) * 45 + 22.5);
  const G = (k: number) => P(R, (((k % 8) + 8) % 8) * 45);
  out.push(make([0, 1, 2, 3, 4, 5, 6, 7].map(T), 1, "table", 0));
  for (let k = 0; k < 8; k++) out.push(make([T(k), T(k + 1), M(k)], 0.85, "star", (k * 7) % 11));
  for (let k = 0; k < 8; k++) out.push(make([T(k), M(k - 1), G(k), M(k)], 0.6, "kite", (k * 5 + 3) % 11));
  for (let k = 0; k < 8; k++) out.push(make([G(k), M(k), G(k + 1)], 0.35, "girdle", (k * 3 + 1) % 11));
  return out;
})();
