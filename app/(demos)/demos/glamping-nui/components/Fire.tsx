import styles from "../brand.module.css";

/** Lửa trại SVG: ba lớp lửa + lõi sáng + than + củi; mỗi nhóm một nhịp transform/opacity riêng (CSS). */
export function Fire({ className, label }: { className?: string; label?: string }) {
  return (
    <svg
      className={`${styles.fire} ${className ?? ""}`}
      viewBox="0 0 200 240"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <radialGradient id="gl-fire-glow" cx="50%" cy="62%" r="50%">
          <stop offset="0" stopColor="#ff7a1a" stopOpacity=".55" />
          <stop offset=".55" stopColor="#ff7a1a" stopOpacity=".16" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gl-fire-outer" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d95c22" />
          <stop offset="1" stopColor="#ff7a1a" />
        </linearGradient>
      </defs>
      <ellipse className={styles.fireGlow} cx="100" cy="150" rx="98" ry="92" fill="url(#gl-fire-glow)" />
      <g className={styles.fireOuter}>
        <path d="M100 14 C104 52 146 78 146 138 C146 186 126 212 100 212 C74 212 54 186 54 138 C54 104 78 90 84 58 C92 70 96 62 100 14 Z" fill="url(#gl-fire-outer)" />
      </g>
      <g className={styles.fireMid}>
        <path d="M100 70 C104 96 130 108 130 150 C130 184 116 204 100 204 C84 204 70 184 70 150 C70 126 88 118 92 96 C96 104 98 92 100 70 Z" fill="#ff9a3c" />
      </g>
      <g className={styles.fireInner}>
        <path d="M100 124 C103 140 116 148 116 170 C116 190 108 202 100 202 C92 202 84 190 84 170 C84 154 94 150 97 138 C99 142 100 132 100 124 Z" fill="#ffd08a" />
      </g>
      <g className={styles.fireEmbers} fill="#ffb15e">
        <circle cx="70" cy="64" r="2.4" />
        <circle cx="132" cy="48" r="2" />
        <circle cx="112" cy="26" r="1.6" />
        <circle cx="84" cy="30" r="1.4" />
      </g>
      <rect x="38" y="205" width="124" height="17" rx="8.5" fill="#3a2418" transform="rotate(-7 100 213)" />
      <rect x="38" y="205" width="124" height="17" rx="8.5" fill="#4a2e1d" transform="rotate(7 100 213)" />
    </svg>
  );
}
