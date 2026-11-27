/** Bìa sách minh hoạ, vẽ bằng SVG hình học theo từng đề tài. Màu: giấy, mực, đỏ son. */
const INK = "#232323";
const RED = "#b63729";
const PAPER = "#f3ebdd";

export function Cover({ i, title, tone }: { i: number; title: string; tone?: "paper" | "ink" | "red" }) {
  const t = tone ?? (["paper", "ink", "red", "paper", "ink", "red"] as const)[i % 6];
  const bg = t === "paper" ? "#e9dfcc" : t === "ink" ? INK : RED;
  const fg = t === "paper" ? INK : PAPER;
  const ac = t === "red" ? INK : RED;
  return (
    <svg viewBox="0 0 300 420" role="img" aria-label={`Bìa sách minh hoạ: ${title}`} focusable="false">
      <rect width="300" height="420" fill={bg} />
      <rect x="14" y="14" width="272" height="392" fill="none" stroke={fg} strokeOpacity=".5" strokeWidth="1" />
      {i === 0 && (<g fill="none" stroke={fg} strokeWidth="14" strokeLinecap="round"><path d="M70 250 C110 120 170 110 160 200 C150 290 210 280 240 140" /><path d="M90 300 C140 250 190 330 236 270" stroke={ac} strokeWidth="9" /></g>)}
      {i === 1 && (<g fill="none" stroke={fg} strokeWidth="2">{[0, 1, 2, 3, 4, 5, 6].map((k) => <path key={k} d={`M${50 + k * 8} 300 V${200 - k * 14} L${96 + k * 8} ${150 - k * 14} V300`} />)}<rect x="170" y="150" width="70" height="150" fill={ac} stroke="none" /><path d="M40 300 H260" strokeWidth="3" /></g>)}
      {i === 2 && (<g>{[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={90 + k * 28} cy={190 + (k % 2) * 30} rx={60 - k * 6} ry={60 - k * 6} fill={k % 2 ? ac : fg} fillOpacity={0.35 + k * 0.1} />)}</g>)}
      {i === 3 && (<g>{Array.from({ length: 9 }).map((_, k) => <ellipse key={k} cx="150" cy="150" rx="14" ry="78" fill={k % 3 === 0 ? ac : fg} fillOpacity={k % 3 === 0 ? 1 : 0.75} transform={`rotate(${k * 40} 150 230)`} />)}<line x1="150" y1="230" x2="150" y2="330" stroke={fg} strokeWidth="3" /></g>)}
      {i === 4 && (<g stroke={fg} strokeWidth="3">{Array.from({ length: 26 }).map((_, k) => <line key={k} x1={40 + k * 9} y1={120 + ((k * 37) % 40)} x2={40 + k * 9} y2={300 - ((k * 53) % 70)} />)}<rect x="110" y="170" width="80" height="90" fill={ac} stroke="none" /></g>)}
      {i === 5 && (<g fill="none" stroke={fg} strokeWidth="3"><path d="M50 300 V190 L150 110 L250 190 V300 Z" /><path d="M120 300 V230 H180 V300" stroke={ac} strokeWidth="6" /><path d="M60 330 Q150 300 240 330" /></g>)}
      <text x="30" y="58" fontFamily="Georgia, serif" fontSize="22" fontStyle="italic" fill={fg}>{title.length > 17 ? title.slice(0, 16) + "…" : title}</text>
      <text x="30" y="392" fontFamily="monospace" fontSize="10" letterSpacing="2" fill={fg} fillOpacity=".8">CHỮ KHẮC · {String(i + 1).padStart(2, "0")}</text>
    </svg>
  );
}
