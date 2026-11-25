import type { TreatKind } from "../data/menu";

const INK = "#46251A";
const W = 3.6;

type P = { kind: TreatKind; colors: [string, string, string]; className?: string };

/** Nhãn dán minh hoạ vẽ tay bằng SVG (không phải ảnh chụp). viewBox 0 0 120 120. */
export function Treat({ kind, colors, className }: P) {
  const [a, b, c] = colors;
  const st = { stroke: INK, strokeWidth: W, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  let body: React.ReactNode;
  switch (kind) {
    case "cake":
      body = (
        <g {...st}>
          <ellipse cx="60" cy="98" rx="46" ry="9" fill="#FFF3EC" />
          <path d="M26 56v36c0 6 16 10 34 10s34-4 34-10V56z" fill={a} />
          <path d="M26 74c10 5 22 6 34 6s24-1 34-6" fill="none" stroke={b} strokeWidth="6" />
          <ellipse cx="60" cy="56" rx="34" ry="11" fill={b} />
          <path d="M28 58c0 8 3 14 6 14s5-6 6-10c1 6 3 10 6 10s5-7 5-11c1 6 3 11 6 11s5-6 6-10c1 5 3 9 6 9s5-5 5-9c2 5 4 8 6 8s5-5 5-12" fill={b} />
          <circle cx="60" cy="38" r="9" fill={c} />
          <path d="M60 29c0-6 3-9 7-10" fill="none" />
        </g>
      );
      break;
    case "cupcake":
      body = (
        <g {...st}>
          <path d="M30 62h60l-8 38c-1 3-4 5-8 5H46c-4 0-7-2-8-5z" fill={a} />
          <path d="M44 66l3 36M60 66v38M76 66l-3 36" fill="none" strokeWidth="2.4" />
          <path d="M26 62c-2-12 8-18 18-16 0-12 10-20 22-14 6-6 20-2 20 10 8 2 10 12 6 20z" fill={b} />
          <circle cx="60" cy="24" r="7" fill={c} />
          <path d="M44 46c8 4 22 4 32 0" fill="none" strokeWidth="2.4" />
        </g>
      );
      break;
    case "tart":
      body = (
        <g {...st}>
          <path d="M18 66h84l-8 28c-1 4-4 6-8 6H34c-4 0-7-2-8-6z" fill={a} />
          <path d="M26 66c0-14 14-22 34-22s34 8 34 22z" fill={b} />
          <circle cx="46" cy="52" r="8" fill={c} />
          <circle cx="68" cy="50" r="8" fill={c} />
          <circle cx="82" cy="58" r="6" fill={c} />
          <path d="M40 78l2 14M60 78v16M80 78l-2 14" fill="none" strokeWidth="2.4" />
        </g>
      );
      break;
    case "slice":
      body = (
        <g {...st}>
          <path d="M14 92V58l86-18v52c0 4-3 6-6 6H20c-4 0-6-2-6-6z" fill={a} />
          <path d="M14 58l86-18v14L14 72z" fill={c} />
          <path d="M14 76l86-18" fill="none" strokeWidth="2.4" />
          <path d="M14 58l86-18-10-12-82 16z" fill={b} />
          <circle cx="40" cy="38" r="6" fill={a} />
        </g>
      );
      break;
    case "choux":
      body = (
        <g {...st}>
          <ellipse cx="60" cy="98" rx="42" ry="8" fill="#FFF3EC" />
          <path d="M22 92c-6-26 4-48 38-48s44 22 38 48z" fill={a} />
          <path d="M26 66c8 8 20 6 34 10s26 0 34-8c-2-14-14-24-34-24S28 52 26 66z" fill={b} />
          <circle cx="48" cy="56" r="3" fill={c} stroke="none" />
          <circle cx="68" cy="52" r="3" fill={c} stroke="none" />
          <circle cx="78" cy="64" r="3" fill={c} stroke="none" />
        </g>
      );
      break;
    case "cookie":
      body = (
        <g {...st}>
          <path d="M60 18c10-4 20 4 26 4 8 0 14 8 12 16 6 6 6 16 0 22 4 10-2 20-12 22-4 8-14 12-22 8-8 6-20 2-24-6-10 0-18-10-14-20-8-8-4-20 6-24 0-10 10-18 20-14z" fill={a} />
          <circle cx="46" cy="42" r="6" fill={b} />
          <circle cx="76" cy="38" r="6" fill={b} />
          <circle cx="60" cy="62" r="6" fill={b} />
          <circle cx="38" cy="72" r="5" fill={c} />
          <circle cx="82" cy="70" r="6" fill={c} />
          <circle cx="62" cy="86" r="5" fill={b} />
        </g>
      );
      break;
    case "macaron":
      body = (
        <g {...st}>
          <path d="M24 44c0-18 16-26 36-26s36 8 36 26z" fill={a} />
          <path d="M24 74c0 18 16 26 36 26s36-8 36-26z" fill={a} />
          <path d="M20 52c8 4 14-2 20 2s14 0 20 2 14-4 20 0 14-2 20-2v14c-8 4-14-2-20 0s-14 4-20 2-14-4-20 0-12 4-20 0z" fill="#FFF3EC" />
          <circle cx="46" cy="34" r="3" fill={c} stroke="none" />
          <circle cx="62" cy="30" r="3" fill={c} stroke="none" />
          <circle cx="76" cy="36" r="3" fill={c} stroke="none" />
        </g>
      );
      break;
    case "croissant":
      body = (
        <g {...st}>
          <path d="M10 74c4-22 22-40 50-40s46 18 50 40c-4 10-14 12-20 6-6 4-12 6-18 6h-24c-6 0-12-2-18-6-6 6-16 4-20-6z" fill={a} />
          <path d="M44 38c-2 14-2 30 2 48M60 34v52M76 38c2 14 2 30-2 48M28 50c4 10 6 20 6 30M92 50c-4 10-6 20-6 30" fill="none" strokeWidth="2.6" />
          <circle cx="60" cy="24" r="3" fill={c} stroke="none" />
        </g>
      );
      break;
    case "donut":
      body = (
        <g {...st}>
          <circle cx="60" cy="62" r="44" fill={a} />
          <path d="M20 58c2-22 20-34 40-34s38 12 40 34c2 8-4 14-8 10-4 8-10 6-12 0-4 8-12 8-14 0-4 8-12 8-14 0-2 6-8 8-12 0-4 4-10-2-10-10z" fill={b} />
          <circle cx="60" cy="62" r="13" fill="#FFF3EC" />
          <path d="M34 44l6 4M52 32l2 7M74 34l-3 7M88 46l-6 3M40 66l6-1M80 70l-6-2" stroke={c} strokeWidth="5" fill="none" />
        </g>
      );
      break;
    case "cup":
      body = (
        <g {...st}>
          <ellipse cx="60" cy="102" rx="38" ry="7" fill="#FFF3EC" />
          <path d="M28 40h56v34c0 14-10 24-28 24s-28-10-28-24z" fill={a} />
          <path d="M84 50h6c8 0 12 5 12 11s-4 11-12 11h-8" fill="none" />
          <ellipse cx="56" cy="40" rx="28" ry="7" fill={b} />
          <path d="M44 36c4-3 8 0 12-2s8 1 12-1" fill="none" stroke={a} strokeWidth="3" />
          <path d="M46 24c-3-5 3-8 0-13M62 24c-3-5 3-8 0-13" fill="none" stroke={c} strokeWidth="4" />
        </g>
      );
      break;
  }
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}
