import styles from "../brand.module.css";

export function HeatStrip() {
  const t = "ĐẬM ✳ THƠM ✳ RANG ✳ RÓT ✳ ".repeat(4);
  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={`${styles.stripTrack} ${styles.display}`} data-rn-track>
        <span>{t}</span>
      </div>
    </div>
  );
}
