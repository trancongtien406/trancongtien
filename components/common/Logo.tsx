import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showText?: boolean;
  size?: number;
};

/** Brand mark: abstract T with coral→violet gradient on neumorphic squircle. */
export function LogoMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const id = `t-grad-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={id} x1="8" y1="8" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4D6D" />
          <stop offset="0.55" stopColor="#E879F9" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect width="40" height="40" rx="11" fill="#0B1B33" />
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="10"
        fill="#12233F"
        stroke="#1E3A5F"
        strokeWidth="1"
      />
      {/* Top bar of T */}
      <rect
        x="9"
        y="10"
        width="18"
        height="5.5"
        rx="2.75"
        fill={`url(#${id})`}
        filter={`url(#${id}-shadow)`}
      />
      {/* Accent capsule top-right */}
      <rect
        x="25.5"
        y="8.5"
        width="6"
        height="3.2"
        rx="1.6"
        fill="#FBCFE8"
        opacity="0.95"
      />
      {/* Stem */}
      <path
        d="M17.2 16.2c0-.9.7-1.6 1.6-1.6h2.4c.9 0 1.6.7 1.6 1.6v11.2c0 1.4-1.1 2.5-2.5 2.5h-.6c-1.4 0-2.5-1.1-2.5-2.5V16.2z"
        fill={`url(#${id})`}
      />
      {/* Tip accent */}
      <ellipse cx="20" cy="31.2" rx="2.2" ry="1.4" fill="#C4B5FD" />
    </svg>
  );
}

export function Logo({
  className,
  variant = "light",
  showText = true,
  size = 40,
}: LogoProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showText ? (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[13px] font-bold tracking-[0.04em]",
              isDark ? "text-white" : "text-ink",
            )}
          >
            TRAN CONG TIEN
          </span>
          <span
            className={cn(
              "mt-0.5 text-[10px] font-medium tracking-wide",
              isDark ? "text-slate-400" : "text-ink-subtle",
            )}
          >
            Full-stack Developer & AI Agent
          </span>
        </div>
      ) : null}
    </div>
  );
}
