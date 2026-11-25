export function AssistantBotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden>
      <defs>
        <linearGradient id="bot-face" x1="12" y1="10" x2="44" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B8A" />
          <stop offset="0.55" stopColor="#E879F9" />
          <stop offset="1" stopColor="#8B7CFF" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="28" fill="url(#bot-face)" />
      <rect x="14" y="16" width="28" height="24" rx="10" fill="#fff" />
      <rect x="26.2" y="8" width="3.6" height="8" rx="1.8" fill="#fff" />
      <circle cx="28" cy="8" r="2.6" fill="#FDE68A" className="origin-center animate-bot-antenna" />
      <g className="origin-center animate-bot-blink" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="21.5" cy="27" r="2.4" fill="#1E293B" />
        <circle cx="34.5" cy="27" r="2.4" fill="#1E293B" />
      </g>
      <path
        d="M22 33.5c1.6 1.6 3.4 2.4 6 2.4s4.4-.8 6-2.4"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M24 40h8l-4 5z" fill="#fff" />
    </svg>
  );
}
