import styles from "../brand.module.css";
import { Photo } from "./Photo";

const split = (t: string) => t.split("").map((c, i) => <span key={i} className={`${styles.ch} rn-ch`} aria-hidden="true">{c}</span>);

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="rn-hero-h" id="top">
      <div className={`${styles.wrap} ${styles.metaRow} ${styles.heroIn}`} data-rn="meta">
        <span className={styles.label}>COFFEE CULTURE / VOL.01</span>
        <span className={styles.label}>RANG &amp; PHA — VN</span>
        <span className={styles.label}>Nhiệt từ hạt tới ly</span>
      </div>
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <h1 id="rn-hero-h" className={`${styles.display} ${styles.heroTitle}`} translate="no">
            <span className={styles.srOnly}>Rót Nhiệt. Đánh thức vị giác.</span>
            <span className={styles.heroLine} aria-hidden="true">{split("RÓT")}</span>
            <span className={styles.heroLine} aria-hidden="true">{split("NHIỆT.")}</span>
          </h1>
          <p className={`${styles.display} ${styles.sub} ${styles.heroIn}`} data-rn="sub">Đánh thức vị giác.</p>
          <p className={`${styles.heroDesc} ${styles.heroIn}`} data-rn="desc">Cà phê rang có cá tính. Pha theo gu. Thưởng thức theo cách của bạn.</p>
          <div className={`${styles.ctaRow} ${styles.heroIn}`} data-rn="cta">
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#menu">Khám phá menu</a>
            <a className={`${styles.btn} ${styles.btnSecondary}`} href="#tim-gu">Tìm gu cà phê của bạn</a>
          </div>
        </div>
        <figure className={`${styles.heroFrameCol} ${styles.heroIn}`} data-rn="frame">
          <div className={styles.posterFrame}>
            <svg className={styles.stamp} data-rn="stamp" viewBox="0 0 132 132" role="img" aria-label="Tem: Good beans. Good heat.">
              <circle cx="66" cy="66" r="62" fill="#1d1d1b" stroke="#f8f5ed" strokeWidth="3" />
              <path id="rn-stamp-arc" d="M66 66m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" fill="none" />
              <text fill="#f8f5ed" fontFamily="var(--rn-body)" fontWeight="700" fontSize="12.5"><textPath href="#rn-stamp-arc" textLength="284" lengthAdjust="spacing">GOOD BEANS. GOOD HEAT. </textPath></text>
              <path d="M52 76H80V84Q80 94 66 94Q52 94 52 84Z" fill="#f8f5ed" /><path d="M56 70L60 56L64 64L68 50L72 62L76 70Z" fill="#e33c29" />
            </svg>
            <div className={styles.posterPhoto}>
              <Photo name="espresso-chiet-xuat" alt="Dòng espresso chảy từ tay cầm pha vào ly, cận cảnh" sizes="(max-width: 900px) 90vw, 40vw" priority position="45% 45%" size={1200} />
            </div>
            <figcaption className={`${styles.posterCap} ${styles.label}`}><span>FIG.01 — THE DAILY HEAT</span><span>01 / 12</span></figcaption>
          </div>
        </figure>
      </div>
      <div className={styles.bottomStrip}><p className={styles.label}>Rang thật. Vị thật. Nhiệt thật.</p></div>
    </section>
  );
}
