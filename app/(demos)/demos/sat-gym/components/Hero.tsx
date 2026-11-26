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
          <span>Quận Ngũ Hành Sơn, Đà Nẵng</span><span>Box CrossFit &amp; Strength</span>
        </p>
        <h1 id="hero-title" className={styles.heroTitle}>
          <span translate="no"><OutlineText as="span" mode="static" noHover hook="hero-word" className={styles.heroWord}>SẬT</OutlineText></span>
          <span className={styles.srOnly}> Gym: box CrossFit và strength ở Quận Ngũ Hành Sơn, Đà Nẵng</span>
        </h1>
        <div className={styles.heroSide} data-sg="hero-side">
          <p className={styles.heroTag} data-sg="hero-copy">Rèn thân.<br />Lì tâm.</p>
          <p className={styles.heroLead} data-sg="hero-copy">
            Lớp CrossFit, strength, conditioning và mobility 45 đến 60 phút cho người đi làm và người mới bắt đầu. Bạn chọn mức tạ, huấn luyện viên lo kỹ thuật và nhịp tập.
          </p>
          <div className={styles.heroCtas} data-sg="hero-cta">
            <a className={`${styles.btn} ${styles.btnAcid} ${styles.btnLg}`} href="#tap-thu" data-shake data-cursor="Tập">Đăng ký tập thử</a>
            <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`} href="#lich-lop" data-cursor="Xem">Xem lịch lớp tuần</a>
          </div>
        </div>
      </div>
      <dl className={styles.heroSpecs} data-sg="hero-specs" aria-label="Thông tin nhanh về SẬT Gym">
        <div><dt>Buổi tập thử</dt><dd><Counter value={180000} duration={1.4} trigger="load" suffix=" ₫" /></dd></div>
        <div><dt>Sĩ số mỗi lớp</dt><dd>≤ <Counter value={14} duration={1} trigger="load" /></dd></div>
        <div><dt>Giờ lớp mỗi ngày</dt><dd>06:00 – 20:00</dd></div>
        <div className={styles.specNote}><dt>Lớp học</dt><dd>CrossFit WOD, strength, conditioning, mobility và lớp làm quen cho người mới.</dd></div>
      </dl>
    </section>
  );
}
