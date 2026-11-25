import { MagneticButton, SplitWords } from "@/features/showroom/effects";
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
          <span>Lặn biển &amp; thể thao nước</span><span aria-hidden="true">·</span><span>Cù Lao Chàm, Sơn Trà, biển miền Trung</span>
        </p>
        <h1 id="hero-title" className={styles.heroTitle}>
          <SplitWords as="span" className={styles.heroLine} trigger="load" delay={1.2} duration={1.1} stagger={0.12}>Chạm mặt biển.</SplitWords>
          <SplitWords as="span" className={`${styles.heroLine} ${styles.heroLineAccent}`} trigger="load" delay={1.55} duration={1.1} stagger={0.12}>Chạm một thế giới khác.</SplitWords>
        </h1>
        <p className={styles.heroLead} data-lb="hero-lead">
          Có những khu vườn không mọc trên đất liền, những đàn cá chuyển động như một dải lụa và những khoảng xanh khiến bạn muốn dừng lại thật lâu. Cùng Tầng Xanh xuống từng tầng nước, theo nhịp bạn thấy thoải mái.
        </p>
        <div className={styles.heroCtas}>
          <span data-lb="hero-cta"><MagneticButton><a className={`${styles.btn} ${styles.btnCoral}`} href="#chuong" data-cursor="Xuống">Khám phá 5 tầng đại dương</a></MagneticButton></span>
          <span data-lb="hero-cta"><a className={`${styles.btn} ${styles.btnGhost}`} href="#cong-cu">Tìm cấp độ phù hợp</a></span>
        </div>
      </div>
      <div className={styles.heroDepth} data-lb="hero-depth" aria-hidden="true">
        <span>00</span><small>m</small><em>Mặt biển</em>
      </div>
      <a className={styles.heroHint} href="#chuong" data-lb="hero-hint" aria-label="Cuộn xuống để bắt đầu lặn">
        <span className={styles.hintLine} aria-hidden="true" /><span>Cuộn để xuống nước</span>
      </a>
    </section>
  );
}
