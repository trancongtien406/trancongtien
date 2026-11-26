import { ScrollScrubText } from "@/features/showroom/effects";
import { MANIFESTO, PILLARS } from "../data/content";
import { CENTER } from "../data/center";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function About() {
  return (
    <section id="gioi-thieu" className={`${styles.panel} ${styles.panelNavy}`} aria-labelledby="about-title">
      <div className={styles.maniGrid}>
        <div>
          <p className={`${styles.kicker} ${styles.kickerY}`}>Giới thiệu trung tâm và phương pháp</p>
          <h2 id="about-title" className={`${styles.h2} ${styles.onDark} ${styles.aboutH2}`}>Trung tâm nhỏ ở {CENTER.area.replace(", Đà Nẵng", "")}, dạy ba ngôn ngữ bằng cách nói trước.</h2>
          <p className={`${styles.aboutP}`}>
            <span translate="no">Mở Lời</span> dạy tiếng Anh, tiếng Nhật và tiếng Hàn cho học sinh từ 6 tuổi, sinh viên và người đi làm. Lớp luôn nhỏ, giáo trình rõ theo từng cấp, và mỗi khoá có bài kiểm tra cuối khoá cùng buổi nhận xét riêng với giáo viên.
          </p>
          <ScrollScrubText as="p" className={styles.mani} dim={0.18}>{MANIFESTO}</ScrollScrubText>
        </div>
        <div className={styles.maniPhotoWrap}>
          <div className={styles.maniPhoto}>
            <Photo file="but-mau" alt="Tay ghi chú vào vở lò xo cạnh những cây bút màu" sizes="(max-width: 900px) 80vw, 30vw" />
          </div>
        </div>
      </div>
      <ul className={styles.pillars}>
        {PILLARS.map((p, i) => (
          <li key={p.k} className={styles.pillar}>
            <span className={styles.pillarN} aria-hidden="true">{i + 1}</span>
            <h3>{p.k}</h3>
            <p>{p.v}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
