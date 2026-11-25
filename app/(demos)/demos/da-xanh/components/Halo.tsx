import type { ReactNode } from "react";
import styles from "../brand.module.css";

/**
 * Vòng sáng quanh sản phẩm: vành chuyển sắc xoay chậm + hai vòng mảnh nhịp thở + quầng sáng.
 * Chỉ CSS (transform/opacity). Cha cần kích thước; con (ảnh sản phẩm) nằm ở giữa.
 */
export function Halo({ children, className = "", tone = "mix" }: { children?: ReactNode; className?: string; tone?: "mix" | "soft" }) {
  return (
    <div className={`${styles.halo} ${tone === "soft" ? styles.haloSoft : ""} ${className}`} data-fx="HaloRing">
      <span className={styles.haloGlow} aria-hidden="true" />
      <span className={styles.haloSpin} aria-hidden="true" />
      <span className={`${styles.haloRing} ${styles.haloRing1}`} aria-hidden="true" />
      <span className={`${styles.haloRing} ${styles.haloRing2}`} aria-hidden="true" />
      <div className={styles.haloCore}>{children}</div>
    </div>
  );
}
