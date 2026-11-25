import { Photo } from "./Photo";
import { BookingBar } from "./BookingBar";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-h">
      <div className={styles.heroMedia} data-hm="hero-media">
        <Photo name="hero-ho-boi" alt="Biệt thự trắng và hồ bơi dài nhìn ra biển lúc sáng sớm" sizes="100vw" priority pos="50% 62%" />
      </div>
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroInner}>
        <p className={styles.eyebrowLight} data-hm="hero-fade">Sơn Trà · Đà Nẵng</p>
        <h1 id="hero-h" className={styles.heroTitle}>
          <span className={styles.line}><span data-hm="hero-line">Chậm lại,</span></span>
          <span className={styles.line}><span data-hm="hero-line">nghe biển thở.</span></span>
        </h1>
        <p className={styles.heroLead} data-hm="hero-fade">Một khoảng nghỉ nhỏ bên biển, dành cho những ngày không cần vội.</p>
        <a className={styles.heroLink} href="#ve-hien" data-hm="hero-fade">
          Khám phá Hiên Mặn
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 4v15m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
      <p className={styles.heroMeta} data-hm="hero-fade">07 phòng nghỉ · Kiến trúc mở · Nhịp sống chậm</p>
      <BookingBar />
    </section>
  );
}
