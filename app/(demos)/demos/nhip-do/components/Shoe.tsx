/** Giày chạy bộ vẽ bằng SVG, phối màu theo props. Hình minh hoạ cách điệu, không phải sản phẩm thật. */
export function Shoe({ upper, accent, sole = "#202020", label }: { upper: string; accent: string; sole?: string; label?: string }) {
  return (
    <svg viewBox="0 0 620 330" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <ellipse cx="320" cy="304" rx="270" ry="12" fill="#202020" opacity=".12" />
      {/* đế giữa */}
      <path d="M26 236 C20 270 62 292 120 292 L486 292 C560 292 604 268 596 232 L590 218 L40 218 Z" fill="#f4f4f0" stroke={sole} strokeWidth="5" strokeLinejoin="round" />
      <path d="M44 262 L580 262" stroke={sole} strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" opacity=".5" />
      <path d="M26 236 C20 270 62 292 120 292 L180 292 L150 236 Z" fill={accent} opacity=".95" />
      {/* thân giày */}
      <path d="M62 220 C56 160 92 116 150 104 L208 96 C228 64 278 62 304 92 L368 126 C426 138 488 158 534 196 C566 210 596 210 590 222 L62 220 Z" fill={upper} stroke={sole} strokeWidth="5" strokeLinejoin="round" />
      {/* cổ giày + lưỡi gà */}
      <path d="M150 104 C168 120 196 124 212 100" fill="none" stroke={sole} strokeWidth="5" strokeLinecap="round" />
      <path d="M232 84 C252 72 284 80 296 100 L340 124" fill="none" stroke={sole} strokeWidth="4" strokeLinecap="round" />
      {/* dây */}
      {[0, 1, 2, 3, 4].map((k) => (
        <line key={k} x1={262 + k * 26} y1={104 + k * 10} x2={288 + k * 26} y2={92 + k * 10 + 12} stroke="#f4f4f0" strokeWidth="7" strokeLinecap="round" />
      ))}
      {/* vệt tốc độ */}
      <path d="M118 214 C170 190 262 168 360 170 C430 172 470 184 520 206" fill="none" stroke={accent} strokeWidth="16" strokeLinecap="round" />
      <path d="M150 188 C200 170 270 156 330 158" fill="none" stroke="#f4f4f0" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      {/* gót */}
      <path d="M62 220 C56 176 70 140 98 124 L104 132 C86 152 82 190 92 220 Z" fill={accent} />
    </svg>
  );
}
