/** Trang sức minh hoạ bằng SVG: vàng champagne với đá xanh băng. */
export function Piece({ kind, id }: { kind: "ring" | "pendant" | "earring" | "bangle"; id: string }) {
  const g = `${id}-g`;
  const s = `${id}-s`;
  return (
    <svg viewBox="0 0 320 320" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6e6d0" /><stop offset=".45" stopColor="#e4c9aa" /><stop offset="1" stopColor="#a8825c" /></linearGradient>
        <linearGradient id={s} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#eaf6fd" /><stop offset=".5" stopColor="#b9d9eb" /><stop offset="1" stopColor="#5f8fb0" /></linearGradient>
      </defs>
      {kind === "ring" && (
        <g>
          <ellipse cx="160" cy="200" rx="86" ry="86" fill="none" stroke={`url(#${g})`} strokeWidth="16" />
          <polygon points="160,60 200,92 188,132 132,132 120,92" fill={`url(#${s})`} stroke="#eaf6fd" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M160 60 L160 132 M120 92 L188 132 M200 92 L132 132" stroke="#fff" strokeOpacity=".55" strokeWidth="1" />
          <path d="M132 134 L188 134 L176 152 L144 152 Z" fill={`url(#${g})`} />
        </g>
      )}
      {kind === "pendant" && (
        <g>
          <path d="M40 40 Q160 150 280 40" fill="none" stroke={`url(#${g})`} strokeWidth="4" strokeDasharray="1 7" strokeLinecap="round" />
          <circle cx="160" cy="106" r="9" fill="none" stroke={`url(#${g})`} strokeWidth="5" />
          <path d="M160 128 L206 190 L160 270 L114 190 Z" fill={`url(#${s})`} stroke="#eaf6fd" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M160 128 L160 270 M114 190 L206 190 M160 128 L138 190 L160 270 L182 190 Z" stroke="#fff" strokeOpacity=".5" strokeWidth="1" fill="none" />
          <path d="M160 128 L206 190 L114 190 Z" fill="#fff" fillOpacity=".18" />
        </g>
      )}
      {kind === "earring" && (
        <g>
          {[100, 220].map((x) => (
            <g key={x}>
              <path d={`M${x} 40 q-14 14 0 30`} fill="none" stroke={`url(#${g})`} strokeWidth="5" strokeLinecap="round" />
              <circle cx={x} cy="86" r="14" fill={`url(#${g})`} />
              <path d={`M${x} 104 L${x + 24} 150 L${x} 232 L${x - 24} 150 Z`} fill={`url(#${s})`} stroke="#eaf6fd" strokeWidth="1.5" strokeLinejoin="round" />
              <path d={`M${x} 104 L${x} 232 M${x - 24} 150 L${x + 24} 150`} stroke="#fff" strokeOpacity=".5" />
            </g>
          ))}
        </g>
      )}
      {kind === "bangle" && (
        <g>
          <ellipse cx="160" cy="170" rx="112" ry="70" fill="none" stroke={`url(#${g})`} strokeWidth="18" />
          <ellipse cx="160" cy="170" rx="112" ry="70" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeDasharray="2 30" strokeLinecap="round" />
          {[-60, -20, 20, 60].map((dx) => (
            <circle key={dx} cx={160 + dx} cy={238 - Math.abs(dx) * 0.18} r="9" fill={`url(#${s})`} stroke="#eaf6fd" />
          ))}
        </g>
      )}
    </svg>
  );
}
