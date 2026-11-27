import type { ReactNode } from "react";

/** Các lớp linh kiện đồng hồ, mỗi lớp là một SVG 460x460 tâm (230,230), xếp chồng khớp tâm. */
const cos = (a: number) => Math.round(Math.cos(a) * 1000) / 1000;
const sin = (a: number) => Math.round(Math.sin(a) * 1000) / 1000;
const C = 230;
const GOLD = "#b99860", INK = "#101820", IVORY = "#e7e3dc";

function gearPath(cx: number, cy: number, r: number, n: number, h: number) {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, w = (Math.PI * 2) / n;
    const p = [[a, r], [a + w * 0.18, r + h], [a + w * 0.5, r + h], [a + w * 0.68, r]];
    for (const [t, rr] of p) pts.push(`${(cx + cos(t) * rr).toFixed(1)} ${(cy + sin(t) * rr).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

function Svg({ children, id }: { children: ReactNode; id: string }) {
  return <svg viewBox="0 0 460 460" width="100%" height="100%" role="presentation" focusable="false" data-part={id} style={{ display: "block", overflow: "visible" }}>{children}</svg>;
}

export function CaseBack() {
  return (
    <Svg id="back">
      <defs><radialGradient id="lqBack" cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#3a4753" /><stop offset="1" stopColor="#151f28" /></radialGradient>
        <path id="lqArc" d={`M${C - 138} ${C} A138 138 0 1 1 ${C + 138} ${C} A138 138 0 1 1 ${C - 138} ${C}`} /></defs>
      <circle cx={C} cy={C} r="176" fill="url(#lqBack)" stroke={GOLD} strokeWidth="3" />
      <circle cx={C} cy={C} r="152" fill="none" stroke={GOLD} strokeOpacity=".5" />
      {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * 6.2832; return <circle key={i} cx={C + cos(a) * 164} cy={C + sin(a) * 164} r="5" fill="#10161d" stroke={GOLD} />; })}
      <text style={{ fontFamily: "var(--lq-display)" }} fontSize="13" letterSpacing="5" fill={GOLD}><textPath href="#lqArc" startOffset="2%">LUÂN QUANG · CƠ KHÍ TỰ LÊN CÓT · BẢN MINH HOẠ · 1926 ·</textPath></text>
      <circle cx={C} cy={C} r="96" fill="#0c1218" stroke={GOLD} strokeWidth="2" />
      <circle cx={C} cy={C} r="86" fill="none" stroke="#fff" strokeOpacity=".1" />
    </Svg>
  );
}

export function Movement() {
  const gears: [number, number, number, number, number, string][] = [
    [C - 58, C - 40, 54, 16, 9, GOLD], [C + 62, C - 20, 38, 12, 8, "#8d98a3"], [C + 10, C + 66, 46, 14, 8, GOLD], [C - 84, C + 54, 28, 10, 7, "#8d98a3"], [C + 78, C + 74, 22, 9, 6, GOLD],
  ];
  return (
    <Svg id="move">
      <defs><pattern id="lqPerlage" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="7" fill="none" stroke="#fff" strokeOpacity=".08" /></pattern></defs>
      <circle cx={C} cy={C} r="168" fill="#26313c" stroke="#10161d" strokeWidth="2" /><circle cx={C} cy={C} r="168" fill="url(#lqPerlage)" />
      <path d={`M${C - 120} ${C - 40} Q${C} ${C - 160} ${C + 120} ${C - 30} Q${C + 40} ${C + 20} ${C - 120} ${C - 40}Z`} fill="#10161d" opacity=".35" />
      {gears.map(([x, y, r, n, h, col], i) => (
        <g key={i} data-gear data-cx={x} data-cy={y} data-dir={i % 2 ? -1 : 1}>
          <path d={gearPath(x, y, r, n, h)} fill={col} stroke="#10161d" strokeWidth="1.2" />
          <circle cx={x} cy={y} r={r * 0.62} fill="#26313c" />
          {[0, 1, 2, 3, 4].map((k) => { const a = (k / 5) * 6.2832; return <line key={k} x1={x} y1={y} x2={x + cos(a) * r * 0.6} y2={y + sin(a) * r * 0.6} stroke={col} strokeWidth="4" />; })}
          <circle cx={x} cy={y} r="5" fill="#c43b4a" stroke="#fff" strokeOpacity=".5" />
        </g>
      ))}
      <rect x={C - 20} y={C + 96} width="64" height="22" rx="10" fill="#8d98a3" stroke="#10161d" /><circle cx={C - 8} cy={C + 107} r="4" fill="#c43b4a" /><circle cx={C + 30} cy={C + 107} r="4" fill="#c43b4a" />
    </Svg>
  );
}

export function Balance() {
  const sp: string[] = [];
  for (let t = 0; t < 6.2832 * 4.2; t += 0.15) { const r = 6 + t * 3.1; sp.push(`${(C + cos(t) * r).toFixed(1)} ${(C + sin(t) * r).toFixed(1)}`); }
  return (
    <Svg id="bal">
      <g transform={`translate(0 0)`}>
        <path d={`M${sp.join("L")}`} fill="none" stroke="#c7d2db" strokeWidth="1.2" />
        <g data-balance data-cx={C} data-cy={C}>
          <circle cx={C} cy={C} r="58" fill="none" stroke={GOLD} strokeWidth="7" />
          {[0, 1, 2].map((k) => { const a = (k / 3) * 6.2832; return <line key={k} x1={C} y1={C} x2={C + cos(a) * 58} y2={C + sin(a) * 58} stroke={GOLD} strokeWidth="4" />; })}
          {Array.from({ length: 12 }).map((_, k) => { const a = (k / 12) * 6.2832; return <circle key={k} cx={C + cos(a) * 58} cy={C + sin(a) * 58} r="3.6" fill="#8a6f3f" />; })}
          <circle cx={C} cy={C} r="7" fill="#c43b4a" stroke="#fff" strokeOpacity=".6" />
        </g>
      </g>
    </Svg>
  );
}

export function Dial({ face = IVORY, ink = INK, accent = GOLD }: { face?: string; ink?: string; accent?: string }) {
  return (
    <Svg id="dial">
      <defs><radialGradient id={`lqDial${face.slice(1)}`} cx=".35" cy=".3" r=".9"><stop offset="0" stopColor={face} /><stop offset="1" stopColor={face} stopOpacity=".86" /></radialGradient></defs>
      <circle cx={C} cy={C} r="168" fill={`url(#lqDial${face.slice(1)})`} stroke={accent} strokeWidth="2" />
      {Array.from({ length: 60 }).map((_, i) => { const a = (i / 60) * 6.2832 - 1.5708, big = i % 5 === 0; return <line key={i} x1={C + cos(a) * (big ? 134 : 146)} y1={C + sin(a) * (big ? 134 : 146)} x2={C + cos(a) * 156} y2={C + sin(a) * 156} stroke={ink} strokeWidth={big ? 3.4 : 1} />; })}
      {[["XII", 0, -112], ["III", 112, 6], ["VI", 0, 122], ["IX", -112, 6]].map(([t, x, y]) => (<text key={t as string} x={C + (x as number)} y={C + (y as number)} textAnchor="middle" style={{ fontFamily: "var(--lq-display)" }} fontWeight="600" fontSize="20" fill={ink}>{t}</text>))}
      <text x={C} y={C - 56} textAnchor="middle" style={{ fontFamily: "var(--lq-display)" }} fontSize="14" letterSpacing="5" fontWeight="600" fill={ink}>LUÂN QUANG</text>
      <text x={C} y={C - 40} textAnchor="middle" fontSize="8" letterSpacing="3" fill={ink} opacity=".7" style={{ fontFamily: "var(--lq-body)" }}>CƠ KHÍ TỰ LÊN CÓT</text>
      <circle cx={C} cy={C + 62} r="32" fill="none" stroke={ink} strokeOpacity=".5" />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * 6.2832; return <line key={i} x1={C + cos(a) * 26} y1={C + 62 + sin(a) * 26} x2={C + cos(a) * 31} y2={C + 62 + sin(a) * 31} stroke={ink} strokeOpacity=".6" />; })}
    </Svg>
  );
}

export function Hands({ ink = INK, accent = GOLD, hms = [10, 9, 30] as [number, number, number] }: { ink?: string; accent?: string; hms?: [number, number, number] }) {
  const [h, m, s] = hms;
  const ha = ((h % 12) + m / 60) * 30, ma = (m + s / 60) * 6;
  return (
    <Svg id="hands">
      <g transform={`rotate(${ha} ${C} ${C})`}><path d={`M${C - 6} ${C + 14} L${C - 9} ${C - 20} L${C} ${C - 92} L${C + 9} ${C - 20} L${C + 6} ${C + 14}Z`} fill={ink} stroke={accent} strokeWidth="1.5" /></g>
      <g transform={`rotate(${ma} ${C} ${C})`}><path d={`M${C - 4.5} ${C + 16} L${C - 6} ${C - 20} L${C} ${C - 132} L${C + 6} ${C - 20} L${C + 4.5} ${C + 16}Z`} fill={ink} stroke={accent} strokeWidth="1.5" /></g>
      <g data-sec data-cx={C} data-cy={C} style={{ transformOrigin: `${C}px ${C}px` }}><g transform={`rotate(${s * 6} ${C} ${C})`}><line x1={C} y1={C + 28} x2={C} y2={C - 142} stroke="#c43b4a" strokeWidth="1.6" /><circle cx={C} cy={C - 112} r="4.5" fill="none" stroke="#c43b4a" strokeWidth="1.6" /></g></g>
      <circle cx={C} cy={C} r="9" fill={accent} stroke={ink} strokeWidth="2" /><circle cx={C} cy={C} r="3" fill={ink} />
    </Svg>
  );
}

export function Crystal() {
  return (
    <Svg id="glass">
      <defs><linearGradient id="lqShine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".45" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs>
      <circle cx={C} cy={C} r="172" fill="#cfe6ee" fillOpacity=".08" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      <path d={`M${C - 120} ${C - 80} A150 150 0 0 1 ${C + 40} ${C - 146} L${C - 20} ${C - 20}Z`} fill="url(#lqShine)" />
      <path d={`M${C + 110} ${C + 100} A150 150 0 0 1 ${C + 30} ${C + 150}`} stroke="#fff" strokeOpacity=".5" strokeWidth="3" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function CaseRing({ tone = GOLD }: { tone?: string }) {
  return (
    <Svg id="case">
      <defs><linearGradient id={`lqCase${tone.slice(1)}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f0dcae" /><stop offset=".5" stopColor={tone} /><stop offset="1" stopColor="#6b5430" /></linearGradient></defs>
      <rect x={C - 34} y="10" width="68" height="60" rx="14" fill={`url(#lqCase${tone.slice(1)})`} /><rect x={C - 34} y="390" width="68" height="60" rx="14" fill={`url(#lqCase${tone.slice(1)})`} />
      <rect x="400" y={C - 14} width="40" height="28" rx="6" fill={`url(#lqCase${tone.slice(1)})`} />{[0, 1, 2, 3, 4].map((i) => (<line key={i} x1={408 + i * 6} y1={C - 12} x2={408 + i * 6} y2={C + 12} stroke="#6b5430" strokeWidth="1.6" />))}
      <path d={`M${C} ${C - 196} a196 196 0 1 0 .01 0Z M${C} ${C - 168} a168 168 0 1 1 -.01 0Z`} fillRule="evenodd" fill={`url(#lqCase${tone.slice(1)})`} />
      {Array.from({ length: 120 }).map((_, i) => { const a = (i / 120) * 6.2832; return <line key={i} x1={C + cos(a) * 184} y1={C + sin(a) * 184} x2={C + cos(a) * 195} y2={C + sin(a) * 195} stroke="#6b5430" strokeOpacity=".55" strokeWidth="1.4" />; })}
    </Svg>
  );
}

export const LAYERS = [
  { key: "back", name: "Đáy máy", desc: "Đáy thép chạm khắc, có cửa kính để nhìn bộ máy. Tám vít giữ kín nước ở 50 mét (số liệu minh hoạ).", C: CaseBack },
  { key: "move", name: "Bộ máy & bánh răng", desc: "Cầu máy hoàn thiện perlage, bánh răng mạ vàng và ruby định vị. Mỗi bánh răng truyền lực chính xác xuống bánh kế tiếp.", C: Movement },
  { key: "bal", name: "Bánh xe cân bằng", desc: "Trái tim của đồng hồ: bánh cân bằng cùng dây tóc dao động 4 lần mỗi giây, chia thời gian thành từng nhịp đều.", C: Balance },
  { key: "dial", name: "Mặt số", desc: "Mặt số đúc hai tầng, vạch phút in nổi, số La Mã và tiểu mặt giây ở vị trí sáu giờ.", C: Dial },
  { key: "hands", name: "Kim", desc: "Kim giờ, kim phút và kim giây nhuộm xanh, viền vàng. Kim giây trôi liên tục theo nhịp cơ.", C: Hands },
  { key: "glass", name: "Kính sapphire", desc: "Kính phẳng chống xước phủ chống loá hai mặt (mô tả minh hoạ), lộ rõ mặt số ở mọi góc nhìn.", C: Crystal },
  { key: "case", name: "Vỏ & núm lên cót", desc: "Vỏ vàng đồng đánh bóng và chải xước xen kẽ, núm vặn có khía để lên cót và chỉnh giờ.", C: CaseRing },
] as const;
