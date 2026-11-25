import { ScrollScrubText, SplitWords } from "@/features/showroom/effects";
import styles from "../brand.module.css";

export function Manifesto() {
  return (
    <section id="manifesto" className={`${styles.section} ${styles.manifesto}`} aria-labelledby="manifesto-title">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Về Rừng Thức</p>
        <h2 id="manifesto-title" className={styles.h2Big}>
          <SplitWords as="span" duration={1}>Có những nơi, ta đến không phải để đi đâu cả.</SplitWords>
        </h2>
        <div className={styles.manifestoBody}>
          <ScrollScrubText as="p" className={styles.scrub} dim={0.22}>
            Chỉ để chậm lại. Để nghe tiếng gió đi qua những tán cây. Để một buổi chiều trôi qua mà không cần nhìn đồng hồ. Để bữa tối ngon hơn bên ánh lửa, và câu chuyện dài hơn dưới bầu trời đêm.
          </ScrollScrubText>
          <p className={styles.manifestoNote}>
            <span translate="no">Rừng Thức</span> dành cho những khoảnh khắc như thế: gần thiên nhiên hơn, gần những người mình thương hơn và gần chính mình hơn.
          </p>
        </div>
      </div>
    </section>
  );
}
