import Image from "next/image";
import { ClipReveal } from "@/features/showroom/effects";
import { HERO_FACTS } from "../data/content";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-hero="eyebrow">
            Spa &amp; massage trị liệu · Quận Hải Châu, Đà Nẵng
          </p>
          <h1 id="hero-title" className={styles.h1}>
            <span className={styles.h1Line}>
              <span className={styles.h1In} data-hero-line>Một buổi massage,</span>
            </span>{" "}
            <span className={styles.h1Line}>
              <span className={styles.h1In} data-hero-line>để cơ thể</span>
            </span>{" "}
            <span className={styles.h1Line}>
              <span className={styles.h1In} data-hero-line>
                <em>được nghỉ.</em>
              </span>
            </span>
          </h1>
          <p className={styles.heroDesc} data-hero="desc">
            Miên An là spa nhỏ với hai phòng trị liệu riêng: massage toàn thân, đá ấm, chăm sóc da mặt, ngâm chân. Dành cho người đi làm cần giãn vai cổ, khách du lịch cần một buổi nghỉ, hoặc hai người đặt chung giờ. Mỗi liệu trình 45–120 phút.
          </p>
          <div className={styles.ctaRow} data-hero="cta">
            <a href="#appointment" className={`${styles.btn} ${styles.btnPrimary}`}>
              Đặt lịch <span aria-hidden="true">↗</span>
            </a>
            <a href="#rituals" className={`${styles.btn} ${styles.btnSecondary}`}>
              Xem bảng giá liệu trình
            </a>
          </div>
          <ul className={styles.heroFacts} data-hero="desc" aria-label="Thông tin nhanh">
            {HERO_FACTS.map((f) => (
              <li key={f.k}>
                <span>{f.k}</span>
                <b className={styles.num}>{f.v}</b>
                <small>{f.s}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.heroArtWrap}>
          <div className={styles.heroArtInner}>
            <div className={styles.ripples} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.heroOutline} aria-hidden="true" />
            <ClipReveal variant="inset" from="bottom" innerScale={1.1} duration={1.5} className={styles.heroArch}>
              <Image
                src="/images/demos/mien-an/ma-hero-2000.webp"
                alt="Phòng trị liệu vòm cung trát vữa màu kem, giường massage tròn và ánh sáng ấm viền theo vòm"
                width={2000}
                height={2667}
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
              />
            </ClipReveal>
            <p className={styles.caption} data-hero="caption">
              Phòng An: giường massage, cửa vòm, ánh sáng ấm chỉnh được
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
