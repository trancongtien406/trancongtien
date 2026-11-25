/** Dấu vân tay nặn đất: các vòng cung lệch tâm, vẽ tay, dùng làm họa tiết. Tĩnh, không script. */
const RINGS = [
  "M50 14C72 12 88 30 87 52C86 74 68 88 48 86C27 84 13 67 15 47C17 28 33 15 50 14",
  "M50 22C67 21 80 34 79 51C78 68 64 79 48 78C32 77 21 64 23 48C25 33 37 23 50 22",
  "M50 30C62 29 72 38 71 50C70 62 60 71 48 70C37 69 29 60 31 49C33 38 41 30 50 30",
  "M50 38C57 37 63 43 62 50C61 57 55 63 48 62C42 61 38 55 39 49C41 43 45 38 50 38",
  "M50 45C53 45 56 47 55 50C55 53 52 55 49 55C46 54 45 51 46 49C47 47 48 45 50 45",
];
export function Fingerprint({ className, strokeWidth = 1.6, opacity = 1 }: { className?: string; strokeWidth?: number; opacity?: number }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true" focusable="false" style={{ opacity }}>
      {RINGS.map((d, i) => <path key={i} d={d} strokeDasharray={i % 2 ? "none" : "46 6 22 5"} />)}
      <path d="M20 62C28 80 50 90 70 84" opacity=".6" />
      <path d="M80 36C76 22 62 12 48 13" opacity=".6" />
    </svg>
  );
}
