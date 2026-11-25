import type { CoachId } from "../data/schedule";
import styles from "../brand.module.css";

/** Nhân vật HLV vector, không có khuôn mặt thật: khối hình học và dụng cụ riêng cho từng vai. */
export function Coach({ id, size = 96 }: { id: CoachId; size?: number }) {
  const common = { viewBox: "0 0 120 140", width: size, height: size * (140 / 120), "aria-hidden": true, focusable: false as const, className: styles.coachSvg };
  if (id === "cot")
    return (
      <svg {...common}>
        <rect x="6" y="14" width="108" height="8" className={styles.cB} />
        <rect x="2" y="2" width="12" height="32" className={styles.cD} /><rect x="106" y="2" width="12" height="32" className={styles.cD} />
        <path d="M24 22 L38 62 M96 22 L82 62" className={styles.cLine} />
        <rect x="42" y="36" width="36" height="34" className={styles.cA} />
        <rect x="34" y="66" width="52" height="42" className={styles.cC} />
        <rect x="40" y="108" width="16" height="30" className={styles.cD} /><rect x="64" y="108" width="16" height="30" className={styles.cD} />
        <rect x="46" y="48" width="28" height="6" className={styles.cD} />
      </svg>
    );
  if (id === "phan")
    return (
      <svg {...common}>
        <circle cx="22" cy="58" r="16" className={styles.cPuff} /><circle cx="98" cy="58" r="16" className={styles.cPuff} /><circle cx="12" cy="74" r="9" className={styles.cPuff} /><circle cx="108" cy="74" r="9" className={styles.cPuff} />
        <circle cx="60" cy="30" r="18" className={styles.cA} />
        <rect x="42" y="26" width="36" height="7" className={styles.cD} />
        <path d="M42 52 H78 L84 108 H36 Z" className={styles.cB} />
        <path d="M42 56 L24 76 M78 56 L96 76" className={styles.cLineInk} />
        <rect x="40" y="108" width="15" height="30" className={styles.cD} /><rect x="65" y="108" width="15" height="30" className={styles.cD} />
      </svg>
    );
  if (id === "xa")
    return (
      <svg {...common}>
        <rect x="4" y="6" width="112" height="8" className={styles.cB} />
        <path d="M42 14 L46 52 M78 14 L74 52" className={styles.cLine} />
        <circle cx="60" cy="40" r="15" className={styles.cA} />
        <rect x="46" y="32" width="28" height="6" className={styles.cD} />
        <rect x="40" y="56" width="40" height="40" className={styles.cC} />
        <rect x="42" y="96" width="14" height="38" className={styles.cD} /><rect x="64" y="96" width="14" height="38" className={styles.cD} />
        <rect x="38" y="48" width="44" height="6" className={styles.cB} />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M92 6 C112 40 112 80 78 104 C56 120 40 112 40 96" fill="none" className={styles.cRope} />
      <circle cx="52" cy="26" r="16" className={styles.cA} />
      <path d="M36 22 H68 V28 H36 Z" className={styles.cD} />
      <path d="M36 46 H70 L74 96 H34 Z" className={styles.cC} />
      <path d="M72 52 L92 36 M36 54 L24 86" className={styles.cLine} />
      <rect x="32" y="96" width="16" height="40" className={styles.cD} /><rect x="56" y="96" width="16" height="40" className={styles.cD} />
      <rect x="34" y="60" width="38" height="6" className={styles.cB} />
    </svg>
  );
}
