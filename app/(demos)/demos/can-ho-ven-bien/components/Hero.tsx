import { ClipReveal, Counter, MagneticButton, ParallaxLayer, SVGPathDraw, SplitWords } from "@/features/showroom/effects";
import { HERO_STATS } from "../data/content";
import { Photo } from "./Photo";
import { SeaLines, Skyline } from "./Art";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} data-cv="hero" aria-label="Vọng Triều, căn hộ ven biển Đà Nẵng">
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroGlow} />
        <ParallaxLayer className={`${styles.layer} ${styles.layerFar}`} distance={26}><Skyline seed={7} base={220} minH={50} maxH={170} className={styles.layerSvg} /></ParallaxLayer>
        <ParallaxLayer className={`${styles.layer} ${styles.layerMid}`} distance={52}><Skyline seed={23} base={200} minH={70} maxH={190} minW={34} maxW={84} className={styles.layerSvg} /></ParallaxLayer>
        <ParallaxLayer className={`${styles.layer} ${styles.layerSea}`} distance={84}><SeaLines className={styles.layerSvg} /></ParallaxLayer>
      </div>

      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroCopy} data-cv="hero-copy">
          <p className={styles.sheet} data-cv="hero-eyebrow"><span>Vọng Triều</span><i aria-hidden="true" />Căn hộ ven biển Đà Nẵng</p>
          <SplitWords as="h1" className={styles.h1} trigger="load" delay={0.35} stagger={0.07} duration={1}>
            Biển mở ra trước khi bạn kịp mở cửa.
          </SplitWords>
          <p className={styles.lead} data-cv="hero-lead">
            Một toà tháp ba mươi sáu tầng quay mặt về phía bình minh. Từng căn hộ được vẽ theo hướng nhìn: phòng khách sát ban công, phòng ngủ lùi về yên tĩnh, ánh sáng đi ngang qua mỗi buổi trong ngày.
          </p>
          <div className={styles.heroCta} data-cv="hero-cta">
            <MagneticButton><a className={`${styles.btn} ${styles.btnCopper}`} href="#mat-bang" data-cursor="Mở">Khám phá mặt bằng</a></MagneticButton>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#mat-tien">Xem mặt tiền theo giờ</a>
          </div>
        </div>

        <div className={styles.heroFigure} data-cv="hero-figure">
          <div className={styles.heroFrame}>
          <ClipReveal className={styles.heroClip} from="bottom" duration={1.5} innerScale={1.12}>
            <div className={styles.heroPhoto} data-cv="hero-photo">
              <Photo file="thap-hoang-hon" alt="Toà tháp cong ánh đồng lúc hoàng hôn nhìn từ dưới lên, các ban công kính xếp tầng" sizes="(max-width: 900px) 88vw, 40vw" priority pos="50% 40%" />
              <span className={styles.heroShade} aria-hidden="true" />
            </div>
          </ClipReveal>
          <SVGPathDraw className={styles.heroDim} viewBox="0 0 100 100" preserveAspectRatio="none" duration={1.6} stagger={0.12} aria-hidden="true" focusable="false">
            <path d="M-4 0V100" vectorEffect="non-scaling-stroke" />
            <path d="M-8 6H0M-8 38H0M-8 70H0M-8 100H0" vectorEffect="non-scaling-stroke" />
            <path d="M0 0H100M100 0V100" vectorEffect="non-scaling-stroke" opacity=".35" />
          </SVGPathDraw>
          <ul className={styles.heroTicks} aria-hidden="true">
            <li style={{ top: "6%" }}>T36</li><li style={{ top: "38%" }}>T24</li><li style={{ top: "70%" }}>T12</li><li style={{ top: "99%" }}>T01</li>
          </ul>
          </div>
          <p className={styles.figCap}>Mặt tiền hướng Đông, lúc ánh nắng cuối ngày đi dọc các ban công.</p>
        </div>
      </div>

      <dl className={`${styles.wrap} ${styles.heroStats}`} data-cv="hero-stats">
        {HERO_STATS.map((s) => (
          <div key={s.label}><dt><Counter value={s.value} suffix={s.suffix} duration={1.6} trigger="load" className={styles.statNum} /></dt><dd>{s.label}</dd></div>
        ))}
        <div className={styles.scrollCue}><span aria-hidden="true" /><em>Cuộn để vào từng chương</em></div>
      </dl>
    </section>
  );
}
