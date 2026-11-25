import { PRINCIPLES } from "../data/content";
import { Symbol } from "./Icons";
import styles from "../brand.module.css";

export function Philosophy() {
  return (
    <section id="philosophy" className={`${styles.section} ${styles.philo}`} aria-labelledby="philo-title">
      <div className={styles.container}>
        <div className={styles.philoIn} data-reveal>
          <Symbol className={styles.philoMark} />
          <p className={styles.eyebrow}>Triết lý Miên An</p>
          <h2 id="philo-title" className={styles.h2}>
            Đôi khi, <em>ít hơn</em> lại là đủ.
          </h2>
          <p className={styles.lead}>Ít tiếng ồn hơn. Ít vội vàng hơn. Nhiều thời gian hơn để lắng nghe những điều cơ thể đang cần.</p>
        </div>
        <ol className={styles.principles}>
          {PRINCIPLES.map((p) => (
            <li key={p.n} className={styles.principle} data-reveal>
              <span className={`${styles.pn} ${styles.num}`}>{p.n}</span>
              <h3 className={styles.h3}>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
