import styles from "../brand.module.css";

export function Closing() {
  return (
    <section id="closing" className={`${styles.section} ${styles.linen} ${styles.closing}`} aria-labelledby="closing-title">
      <div className={styles.container}>
        <div className={styles.closingArch} data-reveal>
          <h2 id="closing-title" className={styles.h2}>
            Hôm nay, hãy dành một chút thời gian <em>cho mình.</em>
          </h2>
          <p>Không cần một dịp đặc biệt để bắt đầu chăm sóc bản thân.</p>
          <a href="#ritual-finder" className={`${styles.btn} ${styles.btnPrimary}`}>
            Tìm nghi thức của bạn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
