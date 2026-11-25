import { PALETTES, type FlowerKind, type PaletteId, type SizeId } from "../data/flowers";

type Item = { kind: FlowerKind; stems: number };
type Props = { items: Item[]; palette: PaletteId; size: SizeId; seed?: string; className?: string; title?: string };

const HEAD_R: Record<FlowerKind, number> = { peony: 46, hydrangea: 38, sunflower: 38, rose: 31, ranunculus: 32, gerbera: 32, tulip: 30, carnation: 28, daisy: 16, baby: 11 };
const FILLER: FlowerKind[] = ["daisy", "baby"];
const SCALE: Record<SizeId, number> = { nho: 0.78, vua: 0.92, lon: 1.04 };
const PAPER: Record<PaletteId, { paper: string; fold: string; ribbon: string }> = {
  "cam-do": { paper: "#f3eddf", fold: "#e4dac3", ribbon: "#e5532d" },
  "hong-sen": { paper: "#52745a", fold: "#436149", ribbon: "#f3eddf" },
  "trang-kem": { paper: "#e5532d", fold: "#c8441f", ribbon: "#f3eddf" },
  "nhieu-mau": { paper: "#f3eddf", fold: "#e4dac3", ribbon: "#df8fa9" },
};

function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DARK = "#4a2412";

function Head({ kind, r, c, rot }: { kind: FlowerKind; r: number; c: [string, string, string]; rot: number }) {
  const [a, b, d] = c;
  switch (kind) {
    case "rose":
      return (
        <g transform={`rotate(${rot})`}>
          <circle r={r} fill={a} />
          <circle r={r * 0.74} fill={b} />
          <circle r={r * 0.5} fill={a} />
          <path d={`M0 ${-r * 0.3} C${r * 0.35} ${-r * 0.3} ${r * 0.35} ${r * 0.25} 0 ${r * 0.25} C${-r * 0.2} ${r * 0.25} ${-r * 0.2} 0 0 0`} fill="none" stroke={d} strokeWidth={2} />
          <circle r={r} fill="none" stroke={d} strokeOpacity={0.35} strokeWidth={1.5} />
        </g>
      );
    case "ranunculus":
      return (
        <g transform={`rotate(${rot})`}>
          {[1, 0.82, 0.64, 0.46, 0.3].map((k, i) => <circle key={i} r={r * k} fill={i % 2 ? b : a} stroke={d} strokeOpacity={0.4} strokeWidth={1.2} />)}
          <circle r={r * 0.1} fill={DARK} />
        </g>
      );
    case "peony":
      return (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: 8 }).map((_, i) => <ellipse key={`o${i}`} cx={0} cy={-r * 0.55} rx={r * 0.42} ry={r * 0.52} fill={a} stroke={d} strokeOpacity={0.35} strokeWidth={1.2} transform={`rotate(${i * 45})`} />)}
          {Array.from({ length: 6 }).map((_, i) => <ellipse key={`m${i}`} cx={0} cy={-r * 0.34} rx={r * 0.3} ry={r * 0.36} fill={b} stroke={d} strokeOpacity={0.3} strokeWidth={1} transform={`rotate(${i * 60 + 20})`} />)}
          <circle r={r * 0.2} fill={a} />
          <circle r={r * 0.08} fill={d} />
        </g>
      );
    case "tulip":
      return (
        <g transform={`rotate(${rot * 0.2})`}>
          <path d={`M${-r} ${-r * 0.4} C${-r * 0.8} ${-r * 1.2} ${-r * 0.3} ${-r * 0.8} 0 ${-r * 1.3} C${r * 0.3} ${-r * 0.8} ${r * 0.8} ${-r * 1.2} ${r} ${-r * 0.4} C${r * 1.1} ${r * 0.5} ${r * 0.4} ${r} 0 ${r} C${-r * 0.4} ${r} ${-r * 1.1} ${r * 0.5} ${-r} ${-r * 0.4}Z`} fill={a} stroke={d} strokeOpacity={0.4} strokeWidth={1.4} />
          <path d={`M0 ${-r * 1.3} C${-r * 0.3} ${-r * 0.2} ${-r * 0.3} ${r * 0.5} 0 ${r} C${r * 0.3} ${r * 0.5} ${r * 0.3} ${-r * 0.2} 0 ${-r * 1.3}Z`} fill={b} />
        </g>
      );
    case "carnation":
      return (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: 11 }).map((_, i) => <circle key={i} cx={Math.cos((i / 11) * 6.283) * r * 0.78} cy={Math.sin((i / 11) * 6.283) * r * 0.78} r={r * 0.34} fill={a} stroke={d} strokeOpacity={0.35} strokeWidth={1} />)}
          <circle r={r * 0.72} fill={b} />
          <circle r={r * 0.4} fill={a} />
          <circle r={r * 0.16} fill={d} fillOpacity={0.6} />
        </g>
      );
    case "sunflower":
      return (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: 16 }).map((_, i) => <ellipse key={i} cx={0} cy={-r * 0.78} rx={r * 0.17} ry={r * 0.3} fill={i % 2 ? "#f2b632" : "#f7c948"} transform={`rotate(${i * 22.5})`} />)}
          <circle r={r * 0.46} fill="#5a3318" />
          <circle r={r * 0.3} fill={DARK} />
        </g>
      );
    case "daisy":
      return (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: 8 }).map((_, i) => <ellipse key={i} cx={0} cy={-r * 0.62} rx={r * 0.24} ry={r * 0.44} fill="#fbf6ea" stroke="#d9cdb0" strokeWidth={0.8} transform={`rotate(${i * 45})`} />)}
          <circle r={r * 0.28} fill="#f2b632" />
        </g>
      );
    case "baby":
      return (
        <g>
          {[[0, 0], [-r * 0.9, -r * 0.5], [r * 0.9, -r * 0.4], [-r * 0.3, r * 0.9], [r * 0.5, r * 0.7], [-r * 1.2, r * 0.4], [r * 1.3, r * 0.3]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={r * 0.5} fill="#fbf6ea" stroke="#d9cdb0" strokeWidth={0.8} />)}
        </g>
      );
    case "hydrangea":
      return (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: 13 }).map((_, i) => {
            const ang = i * 2.399;
            const rr = r * 0.78 * Math.sqrt((i + 0.5) / 13);
            return (
              <g key={i} transform={`translate(${Math.cos(ang) * rr} ${Math.sin(ang) * rr})`}>
                {[0, 90, 180, 270].map((q) => <ellipse key={q} cx={0} cy={-r * 0.14} rx={r * 0.12} ry={r * 0.17} fill={i % 3 ? a : b} transform={`rotate(${q})`} />)}
              </g>
            );
          })}
        </g>
      );
    default:
      return (
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: 14 }).map((_, i) => <ellipse key={i} cx={0} cy={-r * 0.66} rx={r * 0.12} ry={r * 0.36} fill={i % 2 ? a : b} transform={`rotate(${i * (360 / 14)})`} />)}
          <circle r={r * 0.3} fill={DARK} />
        </g>
      );
  }
}

/** Bó hoa vẽ bằng SVG: các đầu hoa xếp xoắn ốc hạt giống trong một vòm elip, cuống gom về một điểm, giấy gói và nơ. */
export function BouquetSvg({ items, palette, size, seed = "nr", className, title }: Props) {
  const rnd = rng(seed + palette + size + items.map((i) => i.kind + i.stems).join());
  const pal = PALETTES.find((p) => p.id === palette)!;
  const paper = PAPER[palette];
  const sc = SCALE[size];
  const heads: { kind: FlowerKind }[] = [];
  items.forEach((it) => { for (let i = 0; i < it.stems; i++) heads.push({ kind: it.kind }); });
  heads.sort((p, q) => (FILLER.includes(p.kind) ? 1 : 0) - (FILLER.includes(q.kind) ? 1 : 0) || HEAD_R[q.kind] - HEAD_R[p.kind]);
  const n = Math.max(heads.length, 1);
  const cx = 200, cy = 170, Rx = 112 * sc, Ry = 92 * sc;
  const placed = heads.map((h, i) => {
    const frac = Math.sqrt((i + 0.45) / n);
    const ang = i * 2.39996 + 0.6;
    const x = cx + Math.cos(ang) * Rx * frac;
    const y = cy + Math.sin(ang) * Ry * frac * 0.95;
    const r = HEAD_R[h.kind] * sc * (0.88 + rnd() * 0.22);
    const colorSet = palette === "nhieu-mau" ? PALETTES[i % 3].swatch : pal.swatch;
    return { ...h, x, y, r, rot: Math.round(rnd() * 360), c: [colorSet[0], colorSet[1], colorSet[2]] as [string, string, string] };
  });
  const leaves = Array.from({ length: 9 }).map((_, i) => {
    const a = (-160 + i * 17.5) * (Math.PI / 180);
    const x = cx + Math.cos(a) * (Rx + 24 * sc);
    const y = cy + Math.sin(a) * (Ry + 10 * sc) + 6;
    return { x, y, rot: (a * 180) / Math.PI + 90 + (rnd() - 0.5) * 20, l: (46 + rnd() * 16) * sc, g: i % 2 ? "#3d6b4a" : "#52745a" };
  });

  return (
    <svg viewBox="0 0 400 470" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false">
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <path d={`M0 ${-l.l} C${l.l * 0.42} ${-l.l * 0.4} ${l.l * 0.38} ${l.l * 0.4} 0 ${l.l * 0.5} C${-l.l * 0.38} ${l.l * 0.4} ${-l.l * 0.42} ${-l.l * 0.4} 0 ${-l.l}Z`} fill={l.g} />
          <path d={`M0 ${-l.l * 0.9} L0 ${l.l * 0.4}`} stroke="#0a2c20" strokeOpacity={0.35} strokeWidth={1.5} />
        </g>
      ))}
      {placed.map((p, i) => (
        <path key={`s${i}`} d={`M${p.x} ${p.y} Q${(p.x + 200) / 2} ${(p.y + 340) / 2 + 10} 200 336`} stroke="#3d6b4a" strokeWidth={3} fill="none" strokeLinecap="round" />
      ))}
      <path d="M88 244 Q200 196 312 244 L224 450 Q200 458 176 450Z" fill={paper.paper} />
      <path d="M132 270 Q200 252 268 270 L212 452 Q200 456 188 452Z" fill={paper.fold} />
      <path d="M88 244 Q200 196 312 244" fill="none" stroke="#000" strokeOpacity={0.12} strokeWidth={2} />
      {[...placed].reverse().map((p, i) => (
        <g key={`h${i}`} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
          <Head kind={p.kind} r={p.r} c={p.c} rot={p.rot} />
        </g>
      ))}
      <path d="M176 332 Q200 342 224 332 L227 350 Q200 360 173 350Z" fill={paper.ribbon} />
      <path d="M200 342 C184 326 164 332 170 348 C176 356 192 352 200 342 C208 352 224 356 230 348 C236 332 216 326 200 342Z" fill={paper.ribbon} stroke="#000" strokeOpacity={0.15} strokeWidth={1.2} />
      <circle cx="200" cy="343" r="5" fill={paper.ribbon} stroke="#000" strokeOpacity={0.2} strokeWidth={1.2} />
    </svg>
  );
}
