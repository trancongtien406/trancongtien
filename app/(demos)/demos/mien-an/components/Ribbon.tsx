import Link from "next/link";
import styles from "../brand.module.css";

export function Ribbon() {
  return (
    <div className={styles.ribbon}>
      <div className={`${styles.container} ${styles.ribbonIn}`}>
        <span>
          <b>Miên An</b> — Spa &amp; wellness · Nhẹ nhàng, có chủ đích
        </span>
        <Link href="/">Về portfolio</Link>
      </div>
    </div>
  );
}
