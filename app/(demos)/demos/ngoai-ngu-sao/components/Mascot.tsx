import type { Mascot as MascotT } from "../data/content";

const NAVY = "#0b1f66";

/** Nhân vật vector dẫn lớp, vẽ tay bằng hình cơ bản (trang trí, không thay cho người thật). */
export function Mascot({ id, size = 120, className }: { id: MascotT["id"]; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: "0 0 120 120", "aria-hidden": true, focusable: false, className } as const;
  if (id === "cu") {
    return (
      <svg {...common}>
        <path d="M30 34 L38 12 L52 28 Z M90 34 L82 12 L68 28 Z" fill="#e6a800" />
        <ellipse cx="60" cy="68" rx="40" ry="44" fill="#ffc83d" />
        <ellipse cx="60" cy="82" rx="24" ry="26" fill="#fff3c9" />
        <path d="M46 88 q14 10 28 0 M44 98 q16 10 32 0" stroke="#e6a800" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="44" cy="56" r="15" fill="#fff" /><circle cx="76" cy="56" r="15" fill="#fff" />
        <circle cx="46" cy="57" r="7" fill={NAVY} /><circle cx="74" cy="57" r="7" fill={NAVY} />
        <circle cx="48.5" cy="54.5" r="2.4" fill="#fff" /><circle cx="76.5" cy="54.5" r="2.4" fill="#fff" />
        <path d="M54 66 L66 66 L60 78 Z" fill="#ff5d8f" />
        <path d="M60 14 l3.2 6.6 7.2 1 -5.2 5 1.3 7.2 -6.5 -3.5 -6.5 3.5 1.3 -7.2 -5.2 -5 7.2 -1 Z" fill="#1d4ed8" transform="translate(0 -2) scale(1)" />
        <path d="M22 70 q-8 14 2 28 M98 70 q8 14 -2 28" stroke="#e6a800" strokeWidth="8" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "meo") {
    return (
      <svg {...common}>
        <path d="M24 52 L26 16 L52 34 Z M96 52 L94 16 L68 34 Z" fill="#ff5d8f" />
        <path d="M30 44 L31 26 L44 36 Z M90 44 L89 26 L76 36 Z" fill="#ffd1df" />
        <ellipse cx="60" cy="70" rx="42" ry="38" fill="#ff8db0" />
        <path d="M40 62 q6 -7 12 0 M68 62 q6 -7 12 0" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="74" rx="5" ry="3.6" fill={NAVY} />
        <path d="M60 78 q-6 8 -12 3 M60 78 q6 8 12 3" stroke={NAVY} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M24 72 h-14 M24 80 l-13 5 M96 72 h14 M96 80 l13 5" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="34" cy="76" r="6" fill="#ff5d8f" /><circle cx="86" cy="76" r="6" fill="#ff5d8f" />
        <g transform="translate(92 22)"><circle r="3.4" fill="#ffc83d" />{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-8" rx="4.4" ry="6.4" fill="#fff" transform={`rotate(${a})`} />)}<circle r="3.2" fill="#ffc83d" /></g>
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="26" cy="34" r="15" fill="#5f86ff" /><circle cx="94" cy="34" r="15" fill="#5f86ff" />
      <circle cx="26" cy="34" r="7" fill="#c9d8ff" /><circle cx="94" cy="34" r="7" fill="#c9d8ff" />
      <ellipse cx="60" cy="68" rx="44" ry="42" fill="#5f86ff" />
      <ellipse cx="60" cy="80" rx="22" ry="17" fill="#eaf0ff" />
      <circle cx="43" cy="60" r="5.5" fill={NAVY} /><circle cx="77" cy="60" r="5.5" fill={NAVY} />
      <circle cx="44.8" cy="58.2" r="1.8" fill="#fff" /><circle cx="78.8" cy="58.2" r="1.8" fill="#fff" />
      <ellipse cx="60" cy="74" rx="6.5" ry="4.6" fill={NAVY} />
      <path d="M60 79 v4 M52 86 q8 6 16 0" stroke={NAVY} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="33" cy="76" r="6" fill="#ff5d8f" opacity=".8" /><circle cx="87" cy="76" r="6" fill="#ff5d8f" opacity=".8" />
      <path d="M48 108 l12 -8 12 8 -12 8 Z" fill="#ffc83d" />
    </svg>
  );
}
