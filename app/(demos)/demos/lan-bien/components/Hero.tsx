import { Counter, SplitWords } from "@/features/showroom/effects";
import { HERO_FACTS } from "../data/content";
import { Photo } from "./Photo";
import { WaterImage } from "./WaterImage";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} data-lb="hero" aria-labelledby="hero-title">
      <div className={styles.heroMedia} data-lb="hero-media">
        <div className={styles.heroParallax} data-lb="hero-parallax">
          <WaterImage className={styles.heroWater} hover={7} scrollPeak={9} fx="water-hero" host="section">
            <Photo file="mat-nuoc" alt="Vòng bong bóng khí nhìn từ dưới nước hướng lên mặt biển đầy nắng" sizes="100vw" priority pos="50% 38%" />
          </WaterImage>
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
      </div>
      <div className={styles.heroInner} data-lb="hero-copy">
        <p className={styles.heroEyebrow} data-lb="eyebrow">
          <span>Trung tâm lặn biển &amp; thể thao nước</span><span aria-hidden="true">·</span><span>Quận Sơn Trà, Đà Nẵng</span>
        </p>
        <h1 id="hero-title" className={styles.heroTitle}>
          <SplitWords as="span" className={styles.heroLine} trigger="load" delay={1.2} duration={1.1} stagger={0.12}>Học lặn, ngắm san hô</SplitWords>
          <SplitWords as="span" className={`${styles.heroLine} ${styles.heroLineAccent}`} trigger="load" delay={1.55} duration={1.1} stagger={0.12}>ngay từ biển Đà Nẵng.</SplitWords>
        </h1>
        <p className={styles.heroLead} data-lb="hero-lead">
          Lặn thử cho người chưa từng lặn, khoá Open Water và nâng cao, tour lặn ngắm san hô ở Sơn Trà và Cù Lao Chàm, cho thuê trang thiết bị. Nhóm nhỏ, có hướng dẫn viên đi cùng từ bờ đến lúc lên bờ.
        </p>
        <div className={styles.heroCtas}>
          <span data-lb="hero-cta"><a className={`${styles.btn} ${styles.btnCoral}`} href="#dat-cho" data-cursor="Đặt chỗ">Đặt chỗ lặn</a></span>
          <span data-lb="hero-cta"><a className={`${styles.btn} ${styles.btnGhost}`} href="#khoa-hoc">Xem khoá học và giá</a></span>
        </div>
        <dl className={styles.heroFacts} data-lb="hero-cta">
          {HERO_FACTS.map((f, i) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{i === 0 ? <><Counter value={1450000} duration={1.8} className={styles.factNum} />&nbsp;₫</> : f.v}</dd>
              <small>{f.note}</small>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.heroDepth} data-lb="hero-depth" aria-hidden="true">
        <span>00</span><small>m</small><em>Mặt biển</em>
      </div>
      <a className={styles.heroHint} href="#chuong" data-lb="hero-hint" aria-label="Cuộn xuống để xem các tour lặn">
        <span className={styles.hintLine} aria-hidden="true" /><span>Cuộn để xuống nước</span>
      </a>
    </section>
  );
}
