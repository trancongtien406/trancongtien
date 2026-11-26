import { CONTACT } from "../data/content";
import styles from "../brand.module.css";

export function Closing() {
  return (
    <section id="closing" className={`${styles.section} ${styles.linen} ${styles.closing}`} aria-labelledby="closing-title">
      <div className={styles.container}>
        <div className={styles.closingArch} data-reveal>
          <h2 id="closing-title" className={styles.h2}>
            Còn lịch trống hôm nay, <em>bạn muốn đến giờ nào?</em>
          </h2>
          <p>Mở cửa 9:00 – 20:00 mỗi ngày tại {CONTACT.area}. Đặt trước ít nhất 1 giờ.</p>
          <a href="#appointment" className={`${styles.btn} ${styles.btnPrimary}`}>
            Chọn giờ đặt lịch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
