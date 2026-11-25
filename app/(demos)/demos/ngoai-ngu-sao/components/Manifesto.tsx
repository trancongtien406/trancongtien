import { ClipReveal, ParallaxLayer, ScrollScrubText } from "@/features/showroom/effects";
import { MANIFESTO, PILLARS } from "../data/content";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Manifesto() {
  return (
    <section id="phuong-phap" className={`${styles.panel} ${styles.panelNavy}`} aria-labelledby="mani-title">
      <div className={styles.maniGrid}>
        <div>
          <p className={`${styles.kicker} ${styles.kickerY}`}>Cam kết phương pháp</p>
          <h2 id="mani-title" className={styles.srOnly}>Cam kết phương pháp của Mở Lời</h2>
          <ScrollScrubText as="p" className={styles.mani} dim={0.18}>{MANIFESTO}</ScrollScrubText>
        </div>
        <ClipReveal variant="circle" from="center" className={styles.maniPhotoWrap}>
          <div className={styles.maniPhoto}>
            <ParallaxLayer distance={36} className={styles.maniPar}>
              <Photo file="but-mau" alt="Tay ghi chú vào vở lò xo cạnh những cây bút màu" sizes="(max-width: 900px) 80vw, 30vw" />
            </ParallaxLayer>
          </div>
        </ClipReveal>
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
