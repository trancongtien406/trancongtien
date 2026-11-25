import s from "../brand.module.css";

/** Ngọn nến SVG: hai lớp lửa nhấp nháy lệch pha (CSS), quầng sáng thở. Không có JS. */
export function Candle({ className, delay = 0, small }: { className?: string; delay?: number; small?: boolean }) {
  const id = `c${Math.round(delay * 10)}${small ? "s" : "l"}`;
  return (
    <svg className={`${s.candle} ${className ?? ""}`} viewBox="0 0 120 260" aria-hidden="true" focusable="false" style={{ "--cd": `${delay}s` } as React.CSSProperties}>
      <defs>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffb866" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#d9822b" stopOpacity="0.18" />
          <stop offset="1" stopColor="#d9822b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fl`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffd9a0" />
          <stop offset="0.45" stopColor="#ffb347" />
          <stop offset="1" stopColor="#ff8a2a" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${id}-wax`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9b79a" />
          <stop offset="0.4" stopColor="#f1e5cf" />
          <stop offset="1" stopColor="#9c8a6c" />
        </linearGradient>
      </defs>
      <circle className={s.candleHalo} cx="60" cy="62" r="58" fill={`url(#${id}-halo)`} />
      <g className={s.flameOuter}>
        <path d="M60 22C73 44 80 58 60 82 40 58 47 44 60 22z" fill={`url(#${id}-fl)`} opacity="0.85" />
      </g>
      <g className={s.flameInner}>
        <path d="M60 46c7 11 9 18 0 30-9-12-7-19 0-30z" fill="#fff3d6" opacity="0.95" />
      </g>
      <path d="M60 82v10" stroke="#3a1a10" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="40" y="92" width="40" height="150" rx="5" fill={`url(#${id}-wax)`} />
      <path d="M40 98c8 7 14-3 22 4s12-2 18 3v-9H40z" fill="#fff6e4" opacity="0.8" />
      <ellipse cx="60" cy="246" rx="40" ry="6" fill="#c08a4a" opacity="0.9" />
    </svg>
  );
}
