import { MagneticButton } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { SPECS } from "../data/shop";
import { Photo } from "./Photo";

const split = (t: string) => t.split("").map((c, i) => <span key={i} className={`${styles.ch} rn-ch`} aria-hidden="true">{c}</span>);

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="rn-hero-h" id="top">
      <div className={`${styles.wrap} ${styles.metaRow} ${styles.heroIn}`} data-rn="meta">
        <span className={styles.label}>QUÁN CÀ PHÊ RANG XAY</span>
        <span className={styles.label}>QUẬN SƠN TRÀ — ĐÀ NẴNG</span>
        <span className={styles.label}>UỐNG TẠI QUÁN · MUA HẠT MANG VỀ</span>
      </div>
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <h1 id="rn-hero-h" className={`${styles.display} ${styles.heroTitle}`} translate="no">
            <span className={styles.srOnly}>Rót Nhiệt, quán cà phê rang xay ở Quận Sơn Trà, Đà Nẵng.</span>
            <span className={styles.heroLine} aria-hidden="true">{split("RÓT")}</span>
            <span className={styles.heroLine} aria-hidden="true">{split("NHIỆT.")}</span>
          </h1>
          <p className={`${styles.display} ${styles.sub} ${styles.heroIn}`} data-rn="sub">Quán cà phê rang xay.</p>
          <p className={`${styles.heroDesc} ${styles.heroIn}`} data-rn="desc">Uống tại quán ở Quận Sơn Trà, mua hạt rang 250g mang về, hoặc đăng ký giá sỉ cho quán nhỏ và văn phòng. Rang theo mẻ, xay theo cách pha của bạn.</p>
          <div className={`${styles.ctaRow} ${styles.heroIn}`} data-rn="cta">
            <MagneticButton><a className={`${styles.btn} ${styles.btnPrimary}`} href="#menu">Xem menu</a></MagneticButton>
            <a className={`${styles.btn} ${styles.btnSecondary}`} href="#hat-ca-phe">Mua hạt mang về</a>
            <a className={`${styles.btn} ${styles.btnSecondary}`} href="#ban-buon">Đăng ký bán buôn</a>
          </div>
          <dl className={`${styles.specRow} ${styles.heroIn}`} data-rn="specs">
            {SPECS.map((x) => (
              <div key={x.k} className={styles.spec1}><dt>{x.k}</dt><dd>{x.v}</dd><dd className={styles.spec1s}>{x.s}</dd></div>
            ))}
          </dl>
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
            <figcaption className={`${styles.posterCap} ${styles.label}`}><span>Espresso đầu ngày tại quầy bar</span><span>Sơn Trà</span></figcaption>
          </div>
        </figure>
      </div>
      <div className={styles.bottomStrip}><p className={styles.label}>Rang thật. Vị thật. Nhiệt thật.</p></div>
    </section>
  );
}
