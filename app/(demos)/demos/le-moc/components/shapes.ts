export type Pt = [number, number];

/** Quả lê, toạ độ quanh gốc (0,0). 16 điểm để nội suy được với blob. */
export const PEAR: Pt[] = [
  [0, -380], [50, -350], [80, -240], [140, -110], [215, -10], [255, 110], [220, 250], [110, 340],
  [0, 360], [-110, 340], [-220, 250], [-255, 110], [-215, -10], [-140, -110], [-80, -240], [-50, -350],
];

function ring(r: (i: number) => number): Pt[] {
  return Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const rr = r(i);
    return [Math.cos(a) * rr, Math.sin(a) * rr] as Pt;
  });
}
export const BLOB_A = ring((i) => 300 + 60 * Math.sin(i * 1.7) + 38 * Math.cos(i * 2.9));
export const BLOB_B = ring((i) => 300 + 62 * Math.cos(i * 1.3 + 1) + 40 * Math.sin(i * 3.3));
export const FULL = ring(() => 1500);

const f = (n: number) => Math.round(n * 10) / 10;

/** Đường cong Catmull-Rom khép kín chuyển sang bezier. */
export function toPath(p: Pt[], cx = 0, cy = 0): string {
  const n = p.length;
  const g = (i: number) => p[(i + n) % n];
  let d = `M${f(g(0)[0] + cx)} ${f(g(0)[1] + cy)}`;
  for (let i = 0; i < n; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    const c1x = p1[0] + (p2[0] - p0[0]) / 6 + cx, c1y = p1[1] + (p2[1] - p0[1]) / 6 + cy;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6 + cx, c2y = p2[1] - (p3[1] - p1[1]) / 6 + cy;
    d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0] + cx)} ${f(p2[1] + cy)}`;
  }
  return d + "Z";
}

export function lerpPts(a: Pt[], b: Pt[], t: number): Pt[] {
  return a.map((p, i) => [p[0] + (b[i][0] - p[0]) * t, p[1] + (b[i][1] - p[1]) * t] as Pt);
}
