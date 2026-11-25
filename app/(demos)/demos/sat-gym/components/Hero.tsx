import { Counter, GrainOverlay } from "@/features/showroom/effects";
import { OutlineText } from "./OutlineText";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} data-sg="hero" aria-labelledby="hero-title">
      <div className={styles.heroMedia} data-sg="hero-media">
        <div className={styles.heroParallax} data-sg="hero-par">
          <Photo file="xuong-be-tong" alt="Nhà tập công nghiệp rộng với cột thép, xà và dây thừng treo trong ánh sáng sương" sizes="100vw" priority pos="50% 42%" className={styles.heroPhoto} />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.halftone} aria-hidden="true" />
        <GrainOverlay opacity={0.16} blendMode="overlay" />
      </div>
      <div className={styles.heroLines} aria-hidden="true" data-sg="hero-lines"><i /><i /><i /><i /></div>
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <p className={styles.stencil} data-sg="hero-eyebrow">
          <span>Đà Nẵng</span><span>Strength &amp; Conditioning Club</span>
        </p>
        <h1 id="hero-title" className={styles.heroTitle}>
          <span translate="no"><OutlineText as="span" mode="static" noHover hook="hero-word" className={styles.heroWord}>SẬT</OutlineText></span>
          <span className={styles.srOnly}> Gym, phòng tập sức mạnh và thể lực tại Đà Nẵng</span>
        </h1>
        <div className={styles.heroSide} data-sg="hero-side">
          <p className={styles.heroTag} data-sg="hero-copy">Rèn thân.<br />Lì tâm.</p>
          <p className={styles.heroLead} data-sg="hero-copy">
            Phòng tập sức mạnh và thể lực bằng bê tông, thép và dây thừng. Bạn chọn mức tạ, chúng tôi lo kỹ thuật và nhịp tập.
          </p>
          <div className={styles.heroCtas} data-sg="hero-cta">
            <a className={`${styles.btn} ${styles.btnAcid} ${styles.btnLg}`} href="#chon-bai" data-shake data-cursor="Tập">Chọn bài tập hôm nay</a>
            <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`} href="#lich-lop" data-cursor="Xem">Xem lịch lớp tuần</a>
          </div>
        </div>
      </div>
      <dl className={styles.heroSpecs} data-sg="hero-specs" aria-label="Cấu trúc một block tabata">
        <div><dt>Giây làm</dt><dd><Counter value={20} duration={1.2} trigger="load" /></dd></div>
        <div><dt>Giây nghỉ</dt><dd><Counter value={10} duration={1} trigger="load" /></dd></div>
        <div><dt>Hiệp một block</dt><dd><Counter value={8} duration={0.9} trigger="load" /></dd></div>
        <div className={styles.specNote}><dt>Tabata</dt><dd>4 phút, làm hết sức trong tầm kiểm soát.</dd></div>
      </dl>
    </section>
  );
}
