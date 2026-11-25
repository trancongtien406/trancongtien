/** Biểu tượng trăng khuyết ôm viên đá. Gradient id riêng theo `uid` để nhiều bản trên một trang không đụng nhau. */
export function Mark({ uid = "m", className }: { uid?: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1dd8a" />
          <stop offset=".45" stopColor="#c9a227" />
          <stop offset="1" stopColor="#8a6d12" />
        </linearGradient>
      </defs>
      <path d="M61.15 20.11 A44 44 0 1 0 96.92 84.51 A37 37 0 1 1 61.15 20.11Z" fill={`url(#${uid}-g)`} />
      <path d="M80 51 L91.05 61.4 L80 77.65 L68.95 61.4Z" fill="#0a0a0a" stroke={`url(#${uid}-g)`} strokeWidth="3" strokeLinejoin="round" />
      <path d="M68.95 61.4 H91.05" stroke={`url(#${uid}-g)`} strokeWidth="2.4" />
      <path d="M75.06 61.4 L80 51 L84.94 61.4 L80 77.65Z" fill="none" stroke={`url(#${uid}-g)`} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M100 13 Q100 22 109 22 Q100 22 100 31 Q100 22 91 22 Q100 22 100 13Z" fill={`url(#${uid}-g)`} />
    </svg>
  );
}
