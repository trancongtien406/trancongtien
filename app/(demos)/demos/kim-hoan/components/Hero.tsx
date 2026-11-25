import { Counter, GrainOverlay, ShineSweep } from "@/features/showroom/effects";
import { HERO_PRESET, IMGS } from "../data/content";
import { Photo } from "./Photo";
import { PresetButton } from "./PresetButton";
import { Shimmer } from "./Shimmer";
import { Sparkle } from "./Sparkle";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top" data-kn="hero" aria-labelledby="hero-title">
      <GrainOverlay opacity={0.07} size={160} blendMode="screen" zIndex={0} />
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-kn="hero-eyebrow">
            <span className={styles.eyebrowRule} aria-hidden="true" />
            Trang sức vàng · Đà Nẵng
          </p>
          <h1 id="hero-title" className={styles.h1}>
            <span className={styles.line}><span className={styles.lineIn} data-kn="hero-line">Vẻ đẹp lưu dấu</span></span>
            <span className={styles.line}><span className={styles.lineIn} data-kn="hero-line"><Shimmer loop className={styles.h1Accent}>thời gian.</Shimmer></span></span>
          </h1>
          <p className={styles.lede} data-kn="hero-copy">
            Nhẫn, mặt dây, bông tai và lắc tay chế tác từ vàng 10K, 14K, 18K, vàng trắng và bạc. Chọn chất liệu, đá, kích cỡ rồi xem ngay khoảng giá tham khảo, tính ra từng khoản.
          </p>
          <div className={styles.ctaRow} data-kn="hero-copy">
            <ShineSweep trigger="loop" every={4.5} duration={1.1} color="rgba(255,244,200,0.7)" className={styles.btnWrap}>
              <a className={styles.btnGold} href="#cau-hinh" data-cursor="">Thiết kế trang sức của bạn</a>
            </ShineSweep>
            <a className={styles.btnLine} href="#bo-suu-tap" data-cursor="">Xem bộ sưu tập</a>
          </div>
          <ul className={styles.facts} data-kn="hero-copy" aria-label="Lựa chọn trong công cụ thiết kế">
            <li><Counter value={4} className={styles.factN} /><span>dòng trang sức</span></li>
            <li><Counter value={6} className={styles.factN} /><span>chất liệu</span></li>
            <li><Counter value={3} className={styles.factN} /><span>lựa chọn đá</span></li>
          </ul>
        </div>
        <figure className={styles.moon} data-kn="hero-moon">
          <div className={styles.moonStage}>
          <svg className={styles.orbit} viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <ellipse data-kn="orbit" cx="200" cy="250" rx="199" ry="249" pathLength={1} fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className={styles.orbitDot} aria-hidden="true" data-kn="orbit-dot"><i /></span>
          <div className={styles.moonImg} data-kn="hero-img">
            <div className={styles.moonPar} data-kn="hero-par">
              <Photo img={IMGS.hero} priority sizes="(max-width: 900px) 80vw, 42vw" />
            </div>
            <Sparkle className={styles.sparkle} />
          </div>
          </div>
          <figcaption className={styles.moonCap}>
            <span>Nhẫn Trăng Non</span>
            <PresetButton preset={HERO_PRESET} className={styles.capLink} cursor="Chọn">Cấu hình mẫu này</PresetButton>
          </figcaption>
        </figure>
      </div>
      <a className={styles.cue} href="#gioi-thieu" aria-label="Cuộn xuống phần giới thiệu"><span>Cuộn</span><i aria-hidden="true" /></a>
    </section>
  );
}
