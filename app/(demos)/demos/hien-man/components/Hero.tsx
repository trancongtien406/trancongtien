import { ParallaxLayer } from "@/features/showroom/effects";
import { Photo } from "./Photo";
import { BookingBar } from "./BookingBar";
import { HERO_FACTS } from "../data/content";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-h">
      <div className={styles.heroMedia} data-hm="hero-media">
        <ParallaxLayer distance={46} className={styles.heroLayer}>
          <Photo name="hero-ho-boi" alt="Biệt thự trắng và hồ bơi dài nhìn ra biển lúc sáng sớm" sizes="100vw" priority pos="50% 62%" />
        </ParallaxLayer>
      </div>
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.glass} data-hm="glass" aria-hidden="true"><i /><i /></div>
      <div className={styles.heroInner}>
        <p className={styles.eyebrowLight} data-hm="hero-fade">Villa nghỉ dưỡng · Sơn Trà, Đà Nẵng</p>
        <h1 id="hero-h" className={styles.heroTitle}>
          <span className={styles.line}><span data-hm="hero-line">Villa bảy phòng</span></span>
          <span className={styles.line}><span data-hm="hero-line">ven biển Sơn Trà.</span></span>
        </h1>
        <p className={styles.heroLead} data-hm="hero-fade">Cho gia đình và nhóm bạn từ 2 đến 16 khách: ở từng phòng hoặc bao trọn villa, có hồ bơi nhìn biển, bếp mở và đưa đón sân bay.</p>
        <p className={styles.heroFactsM} data-hm="hero-fade">Từ 2.040.000 ₫ / đêm · Nhận phòng 14:00 · 2–16 khách</p>
        <div className={styles.heroLinks} data-hm="hero-fade">
          <a className={styles.heroLink} href="#lich-gia">
            Xem phòng trống và giá
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 4v15m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a className={styles.heroLink2} href="#phong">Xem các loại phòng</a>
        </div>
      </div>
      <dl className={styles.heroMeta} data-hm="hero-fade" aria-label="Thông tin nhanh">
        {HERO_FACTS.map((f) => (
          <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd><small>{f.s}</small></div>
        ))}
      </dl>
      <BookingBar />
    </section>
  );
}
