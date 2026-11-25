/** Hình học lá và cánh hoa dùng chung trong trang Nở Rừng (không có hook, dùng được ở Server Component). */

export type MaskShape = "flower" | "petal" | "leaf" | "tulip";

const f2 = (n: number) => n.toFixed(3);

/** Hoa 6 cánh bo tròn, toạ độ 0..1 (clipPathUnits=objectBoundingBox). */
function flowerMask(): string {
  const pts: string[] = [];
  const N = 180;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = 0.27 + 0.23 * Math.pow(Math.abs(Math.cos(3 * a)), 0.75);
    pts.push(`${f2(0.5 + Math.cos(a) * r)} ${f2(0.5 + Math.sin(a) * r)}`);
  }
  return `M${pts.join("L")}Z`;
}

export const MASK_PATHS: Record<MaskShape, string> = {
  flower: flowerMask(),
  petal: "M0.5 1 C0.1 0.86 0 0.42 0.2 0.14 C0.33 -0.03 0.45 0.05 0.5 0.2 C0.55 0.05 0.67 -0.03 0.8 0.14 C1 0.42 0.9 0.86 0.5 1Z",
  leaf: "M0.5 0 C0.97 0.2 1.02 0.72 0.5 1 C-0.02 0.72 0.03 0.2 0.5 0Z",
  tulip: "M0.06 0.22 C0.18 0.1 0.34 0.12 0.5 0 C0.66 0.12 0.82 0.1 0.94 0.22 C1.02 0.68 0.8 1 0.5 1 C0.2 1 -0.02 0.68 0.06 0.22Z",
};

/* ---------- Blob hình hoa (cùng cấu trúc node để nội suy) ---------- */

function blobFlower(lobes: number, amp: number, base: number, rot = 0, points = 24, size = 200): string {
  const c = size / 2;
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2 + rot;
    const r = size * base * (1 + amp * Math.cos(lobes * a));
    return [c + Math.cos(a) * r, c + Math.sin(a) * r] as const;
  });
  const f = (n: number) => n.toFixed(2);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points], p1 = pts[i], p2 = pts[(i + 1) % points], p3 = pts[(i + 2) % points];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + "Z";
}

/** Ba trạng thái: nụ -> hoa hé -> hoa nở (BlobMorph nội suy theo thứ tự rồi quay lại). */
export const BLOOM_PATHS = [
  blobFlower(5, 0.05, 0.27, 0),
  blobFlower(6, 0.15, 0.31, 0.2),
  blobFlower(6, 0.3, 0.33, 0.52),
  blobFlower(5, 0.16, 0.3, 0.8),
];

/* ---------- Lá vẽ bằng SVG ---------- */

type LeafProps = { kind?: "lance" | "fern" | "round"; className?: string; style?: React.CSSProperties };

function fernPairs() {
  const out: { y: number; ang: number; l: number; side: 1 | -1 }[] = [];
  for (let i = 0; i < 11; i++) {
    const y = 380 - i * 31;
    const l = 70 - i * 4.2;
    const ang = 52 - i * 1.4;
    out.push({ y, ang, l, side: 1 }, { y, ang, l, side: -1 });
  }
  return out;
}
const FERN = fernPairs();

export function Leaf({ kind = "lance", className, style }: LeafProps) {
  if (kind === "fern") {
    return (
      <svg viewBox="0 0 120 400" className={className} style={style} aria-hidden="true" focusable="false">
        <path d="M60 400 C58 300 62 160 60 20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        {FERN.map((p, i) => (
          <ellipse key={i} cx={60 + (p.side * p.l) / 2} cy={p.y} rx={p.l / 2} ry={Math.max(5, p.l / 6.5)} fill="currentColor" transform={`rotate(${-p.side * p.ang} 60 ${p.y})`} opacity={0.94} />
        ))}
        <ellipse cx="60" cy="14" rx="5" ry="16" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "round") {
    return (
      <svg viewBox="0 0 160 220" className={className} style={style} aria-hidden="true" focusable="false">
        <path d="M80 6 C150 40 162 130 80 214 C-2 130 10 40 80 6Z" fill="currentColor" />
        <path d="M80 18 L80 206 M80 70 L40 44 M80 70 L120 44 M80 112 L30 82 M80 112 L130 82 M80 154 L42 126 M80 154 L118 126" stroke="#000" strokeOpacity="0.22" strokeWidth="2" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 400" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M60 0 C112 96 118 270 60 400 C2 270 8 96 60 0Z" fill="currentColor" />
      <path d="M60 14 L60 392" stroke="#000" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M60 90 L24 58 M60 90 L96 58 M60 150 L18 112 M60 150 L102 112 M60 214 L16 172 M60 214 L104 172 M60 280 L22 236 M60 280 L98 236" stroke="#000" strokeOpacity="0.18" strokeWidth="2" fill="none" />
    </svg>
  );
}

/** Ký hiệu cánh hoa 5 cánh nhỏ, dùng làm dấu ngăn trong dải chữ và danh sách. */
export function Bloom5({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      {[0, 72, 144, 216, 288].map((r) => (
        <path key={r} d="M20 19C15 14 16 6 20 1C24 6 25 14 20 19Z" fill="currentColor" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="3" fill="#06190f" />
    </svg>
  );
}
