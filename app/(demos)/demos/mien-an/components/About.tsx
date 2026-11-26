import { AUDIENCE, PRINCIPLES } from "../data/content";
import { Symbol } from "./Icons";
import styles from "../brand.module.css";

export function About() {
  return (
    <section id="about" className={`${styles.section} ${styles.philo}`} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.philoIn} data-reveal>
          <Symbol className={styles.philoMark} />
          <p className={styles.eyebrow}>Giới thiệu</p>
          <h2 id="about-title" className={styles.h2}>
            Spa nhỏ ở Hải Châu, <em>mỗi lần một khách.</em>
          </h2>
          <p className={styles.lead}>
            Miên An làm massage thư giãn và chăm sóc da mặt tại Quận Hải Châu, Đà Nẵng. Cơ sở chỉ có hai phòng trị liệu nên bạn không bị ghép phòng, không bị giục giờ, và kỹ thuật viên ở cùng bạn từ lúc nằm xuống đến lúc nghỉ.
          </p>
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
        <div className={styles.audience} data-reveal>
          <p className={styles.eyebrow}>Dành cho</p>
          <ul>
            {AUDIENCE.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
