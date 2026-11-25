import { COPY } from "../data/copy";
import type { Lang } from "../data/tours";
import styles from "../brand.module.css";
import { Photo } from "./Photo";

export function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang].hero;
  return (
    <section className={`${styles.hero}`} aria-labelledby="rd-h1" id="top">
      <div className={styles.wrap}>
        <div className={styles.issueLine}>
          <span className={styles.label}>{t.issue}</span>
          <span className={styles.label}>{t.eyebrow}</span>
          <span className={styles.label}>VI / EN</span>
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <h1 id="rd-h1" className={styles.h1}>
              <span className={styles.line} data-rd="h1-line">{t.h1a}</span>
              <span className={`${styles.line} ${styles.line2}`} data-rd="h1-line">{t.h1b}</span>
            </h1>
            <p className={styles.heroDesc} data-rd="hero-fade">{t.desc}</p>
            <div className={styles.ctaRow} data-rd="hero-fade">
              <a className={`${styles.btn} ${styles.btnRed}`} href="#trip-finder">
                {t.cta} <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.link} href="#tours">
                {t.cta2}
              </a>
            </div>
            <div className={styles.doodleWrap} aria-hidden="true">
              <svg viewBox="0 0 420 70" fill="none">
                <path d="M6 44 C40 8 70 70 110 36 S176 8 214 40 S290 66 330 28 S386 18 408 38" stroke="#b83e2b" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 11" />
                <path d="M392 22 L410 38 L388 48" stroke="#b83e2b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <rect data-rd="doodle-cover" x="-4" y="-4" width="430" height="80" fill="#f5f0e3" />
              </svg>
            </div>
            <p className={`${styles.heroFoot} ${styles.label}`} data-rd="hero-fade">
              <span>{t.coords}</span>
              <span>↓ {t.scroll}</span>
            </p>
          </div>

          <div className={styles.collage} role="group" aria-label={lang === "vi" ? "Ảnh cắt dán: Hội An, Bà Nà và đèn lồng" : "Collage: Hoi An, Ba Na and lanterns"}>
            <div className={`${styles.cl} ${styles.clBack}`} data-rd="cl" aria-hidden="true" />
            <figure className={`${styles.cl} ${styles.clMain}`} data-rd="cl">
              <div className={styles.ph}>
                <Photo name="hoi-an-song-den" priority size={1200} sizes="(max-width: 900px) 70vw, 36vw" position="50% 60%"
                  alt={lang === "vi" ? "Thuyền gắn đèn lồng bên bờ sông Hội An lúc chiều muộn" : "Lantern-decorated boats along the Hoi An riverbank at dusk"} />
              </div>
              <span className={styles.tape} style={{ left: "38%", top: "-12px", transform: "rotate(-4deg)" }} aria-hidden="true" />
            </figure>
            <figure className={`${styles.cl} ${styles.clBana}`} data-rd="cl">
              <div className={styles.ph}>
                <Photo name="ba-na-hoang-hon" size={1200} sizes="(max-width: 900px) 46vw, 24vw" position="55% 50%"
                  alt={lang === "vi" ? "Cầu Vàng ở Bà Nà lúc bình minh nhìn từ trên cao" : "Golden Bridge at Ba Na Hills at sunrise from above"} />
              </div>
              <span className={styles.tape} style={{ left: "-14px", top: "10px", transform: "rotate(-38deg)", width: 64 }} aria-hidden="true" />
            </figure>
            <figure className={`${styles.cl} ${styles.clLantern}`} data-rd="cl">
              <div className={styles.ph}>
                <Photo name="den-long-hoi-an" size={1200} sizes="(max-width: 900px) 34vw, 18vw" position="50% 38%"
                  alt={lang === "vi" ? "Đèn lồng lụa đỏ vàng xanh treo trên cây trước tường vàng" : "Red, yellow and blue silk lanterns hanging in a tree before a yellow wall"} />
              </div>
              <span className={styles.tape} style={{ right: "-12px", top: "8px", transform: "rotate(34deg)", width: 56 }} aria-hidden="true" />
            </figure>
            <div className={styles.postmark} data-rd="stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="3" strokeDasharray="1 0" />
                <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="2" />
                <defs>
                  <path id="rd-pm" d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" />
                </defs>
                <text fontSize="10.5" fontWeight="700" letterSpacing="2.2" fill="currentColor">
                  <textPath href="#rd-pm">{t.stamp.toUpperCase()} · {t.stamp.toUpperCase()}</textPath>
                </text>
                <text x="60" y="58" textAnchor="middle" fontSize="19" fontWeight="800" fill="currentColor">16°N</text>
                <text x="60" y="76" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="currentColor">108°E</text>
              </svg>
            </div>
            <p className={`${styles.sticker} ${styles.capSticker}`} data-rd="cl">{t.caption1}</p>
            <p className={`${styles.sticker} ${styles.stickerBlue} ${styles.capTag}`} data-rd="cl">{t.caption2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
