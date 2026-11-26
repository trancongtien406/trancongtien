import Link from "next/link";
import styles from "../brand.module.css";

export function Ribbon() {
  return (
    <div className={styles.ribbon}>
      <div className={`${styles.container} ${styles.ribbonIn}`}>
        <span>
          <b>Miên An</b> — Spa &amp; massage trị liệu · Quận Hải Châu, Đà Nẵng · 9:00–20:00
        </span>
        <Link href="/">Về portfolio</Link>
      </div>
    </div>
  );
}
