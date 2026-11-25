import { JOURNEY } from "../data/content";
import styles from "../brand.module.css";

export function Journey() {
  return (
    <section id="journey" className={styles.section} aria-labelledby="journey-title">
      <div className={styles.container}>
        <div className={styles.journeyHead} data-reveal>
          <p className={styles.eyebrow}>Your wellness journey</p>
          <h2 id="journey-title" className={styles.h2}>
            Mỗi lần ghé thăm, <em>một khoảng nghỉ.</em>
          </h2>
          <p className={styles.lead}>Hành trình trải nghiệm được hình dung tại Miên An.</p>
        </div>
        <ol className={styles.steps}>
          {JOURNEY.map((s, i) => (
            <li key={s.title} className={styles.step} data-reveal>
              <span className={`${styles.stepMark} ${styles.num}`} aria-hidden="true">{i + 1}</span>
              <h3 className={styles.h3}>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.journeyCta}>
          <a href="#appointment" className={`${styles.btn} ${styles.btnPrimary}`}>
            Thử chọn lịch trải nghiệm
          </a>
        </div>
      </div>
    </section>
  );
}
