/** Hình học chiếc bình: 9 bán kính theo chiều cao, nội suy Catmull-Rom thành đường cong bezier. */
export type Shape = "bau" | "cao" | "coc" | "bat" | "lo";
export const K = 9;
export const VB = { w: 200, h: 280, cx: 100, base: 238, H: 196, tilt: 0.17 };

export const SHAPES: { id: Shape; name: string; code: string; r: number[]; h: number; note: string }[] = [
  { id: "bau", name: "Bình bầu", code: "BAU", r: [27, 19, 21, 37, 54, 61, 56, 43, 35], h: 1, note: "Thân tròn, cổ thon" },
  { id: "cao", name: "Bình cao", code: "CAO", r: [21, 16, 15, 23, 34, 42, 40, 34, 30], h: 1.04, note: "Dáng dài, cắm cành khô" },
  { id: "lo", name: "Lọ cổ cao", code: "LO", r: [14, 12, 12, 15, 30, 46, 49, 39, 31], h: 1, note: "Bụng thấp, cổ vút" },
  { id: "coc", name: "Cốc", code: "COC", r: [47, 46, 45, 44, 43, 42, 40, 38, 36], h: 0.52, note: "Cầm vừa tay" },
  { id: "bat", name: "Bát", code: "BAT", r: [80, 74, 66, 58, 50, 42, 36, 31, 29], h: 0.4, note: "Loe rộng, lòng sâu" },
];

export const LUMP_R = [20, 34, 46, 56, 62, 66, 66, 62, 58];

export function shapeRadii(shape: Shape, bulge: number, neck: number): number[] {
  const s = SHAPES.find((x) => x.id === shape) ?? SHAPES[0];
  return s.r.map((r, i) => {
    const t = i / (K - 1);
    const bump = Math.exp(-(((t - 0.6) / 0.22) ** 2));
    let v = r + (bulge - 0.5) * 36 * bump;
    if (i <= 2) v *= 0.72 + 0.56 * neck; // cổ: mở / thắt
    return Math.max(8, v);
  });
}

export function shapeYs(shape: Shape): number[] {
  const s = SHAPES.find((x) => x.id === shape) ?? SHAPES[0];
  return Array.from({ length: K }, (_, i) => VB.base - s.h * VB.H * (1 - i / (K - 1)));
}
export const lumpYs = (): number[] => Array.from({ length: K }, (_, i) => VB.base - 92 * (1 - i / (K - 1)));

type P = [number, number];
const f = (n: number) => n.toFixed(1);

/** Đường cong mượt qua các điểm (Catmull-Rom -> cubic). Không có "M": nối tiếp được. */
function curve(pts: P[], moveTo = true): string {
  let d = moveTo ? `M${f(pts[0][0])} ${f(pts[0][1])}` : "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Đường kinh tuyến tại góc θ (cos>0 là mặt trước): x = cx + r·sinθ, y lệch theo độ nghiêng. */
export function meridian(r: number[], y: number[], theta: number): string {
  const sn = Math.sin(theta), cs = Math.cos(theta);
  return curve(r.map((ri, i): P => [VB.cx + ri * sn, y[i] + ri * VB.tilt * cs]));
}

/** Thân bình khép kín (phải xuống đáy, trái lên miệng). */
export function bodyPath(r: number[], y: number[]): string {
  const right = r.map((ri, i): P => [VB.cx + ri, y[i]]);
  const left = r.map((ri, i): P => [VB.cx - ri, y[i]]).reverse();
  const last = right[right.length - 1], first = left[0];
  return `${curve(right)}L${f(first[0])} ${f(last[1])}${curve(left, false)}Z`;
}

export const lerpArr = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);

export type Glaze = { id: string; name: string; code: string; base: string; lite: string; dark: string };
export const GLAZES: Glaze[] = [
  { id: "ngoc", name: "Xanh ngọc", code: "NG", base: "#2f7f7a", lite: "#5fc2b8", dark: "#1b4f4c" },
  { id: "sua", name: "Trắng sữa", code: "TS", base: "#e6d6bb", lite: "#fff4de", dark: "#b99d78" },
  { id: "tro", name: "Nâu tro", code: "NT", base: "#7a5338", lite: "#a67850", dark: "#4a2f1e" },
  { id: "do", name: "Đỏ đất", code: "DD", base: "#b4532a", lite: "#e07a45", dark: "#7c3317" },
  { id: "den", name: "Đen nhám", code: "DN", base: "#2e211b", lite: "#5a463b", dark: "#150e0b" },
];

export type Pattern = "tron" | "van" | "cham" | "song" | "soc";
export const PATTERNS: { id: Pattern; name: string; code: string }[] = [
  { id: "tron", name: "Trơn", code: "TR" },
  { id: "van", name: "Vân vòng", code: "VV" },
  { id: "cham", name: "Chấm", code: "CH" },
  { id: "song", name: "Sóng", code: "SG" },
  { id: "soc", name: "Sọc", code: "SC" },
];
