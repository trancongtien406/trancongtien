import { VelocityMarquee } from "@/features/showroom/effects";
import styles from "../brand.module.css";

const ITEMS = ["MỞ CỬA 06:30–21:30", "HẠT 250G TỪ 165.000 ₫", "XAY THEO CÁCH PHA", "LY TỪ 29.000 ₫", "BÁN BUÔN TỪ 5 KG", "QUẬN SƠN TRÀ"];

/** Dải chữ chạy theo vận tốc cuộn: chứa thông tin dùng được (giờ mở, giá hạt, bán buôn). */
export function HeatStrip() {
  return (
    <div className={styles.strip} role="region" aria-label="Thông tin nhanh về quán">
      <VelocityMarquee mode="velocity" speed={60} boost={1.4} gap="0.9em" pauseOnHover className={`${styles.stripTrack} ${styles.display}`}>
        {ITEMS.map((t) => <span key={t} className={styles.stripItem}>{t} <i aria-hidden="true">✳</i></span>)}
      </VelocityMarquee>
    </div>
  );
}
