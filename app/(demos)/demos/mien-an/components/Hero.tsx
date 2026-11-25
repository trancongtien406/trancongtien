import Image from "next/image";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section id="home" className={`${styles.hero}`} aria-labelledby="hero-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-hero="eyebrow">
            Boutique wellness · Nghi thức chăm sóc
          </p>
          <h1 id="hero-title" className={styles.h1}>
            <span className={styles.h1Line}>
              <span className={styles.h1In} data-hero-line>Chậm lại,</span>
            </span>{" "}
            <span className={styles.h1Line}>
              <span className={styles.h1In} data-hero-line>để trở về</span>
            </span>{" "}
            <span className={styles.h1Line}>
              <span className={styles.h1In} data-hero-line>
                <em>với mình.</em>
              </span>
            </span>
          </h1>
          <p className={styles.heroDesc} data-hero="desc">
            Giữa những ngày nhiều vội vàng, Miên An dành cho bạn một khoảng lặng. Nơi hương thơm dịu nhẹ, những chuyển động chậm rãi và sự chăm sóc có chủ đích cùng hiện diện.
          </p>
          <div className={styles.ctaRow} data-hero="cta">
            <a href="#ritual-finder" className={`${styles.btn} ${styles.btnPrimary}`}>
              Tìm nghi thức của bạn <span aria-hidden="true">↗</span>
            </a>
            <a href="#rituals" className={`${styles.btn} ${styles.btnSecondary}`}>
              Khám phá liệu trình
            </a>
          </div>
          <div className={styles.scrollHint} data-hero="desc" aria-hidden="true">
            <i /> Cuộn để khám phá
          </div>
        </div>
        <div className={styles.heroArtWrap}>
          <div className={styles.heroArtInner}>
            <div className={styles.heroOutline} aria-hidden="true" />
            <div className={styles.heroArch} data-hero="art">
              <Image
                src="/images/demos/mien-an/ma-hero-2000.webp"
                alt="Phòng trị liệu vòm cung trát vữa màu kem, giường massage tròn và ánh sáng ấm viền theo vòm"
                width={2000}
                height={2667}
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
              />
            </div>
            <p className={styles.caption} data-hero="caption">
              01 — Một khoảng thời gian dành riêng cho bạn
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
