import { GrainOverlay, ShineSweep } from "@/features/showroom/effects";
import { HERO_PRESET, IMGS } from "../data/content";
import { Photo } from "./Photo";
import { PresetButton } from "./PresetButton";
import { CHEAPEST } from "./Sections";
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
            Tiệm kim hoàn · Quận Hải Châu, Đà Nẵng
          </p>
          <h1 id="hero-title" className={styles.h1}>
            <span className={styles.line}><span className={styles.lineIn} data-kn="hero-line">Nhẫn cưới, trang sức vàng</span></span>
            <span className={styles.line}><span className={styles.lineIn} data-kn="hero-line"><Shimmer loop className={styles.h1Accent}>chế tác theo ý bạn.</Shimmer></span></span>
          </h1>
          <p className={styles.lede} data-kn="hero-copy">
            Tiệm kim hoàn cho cặp đôi chuẩn bị cưới, người tìm quà và người muốn làm lại món vàng cũ: nhẫn cưới, nhẫn đính hôn, dây chuyền, bông tai, lắc, vòng. Làm sẵn hoặc đặt theo ý, báo giá từng khoản.
          </p>
          <div className={styles.ctaRow} data-kn="hero-copy">
            <ShineSweep trigger="loop" every={4.5} duration={1.1} color="rgba(255,244,200,0.7)" className={styles.btnWrap}>
              <a className={styles.btnGold} href="#lien-he" data-cursor="">Đặt làm trang sức</a>
            </ShineSweep>
            <a className={styles.btnLine} href="#danh-muc" data-cursor="">Xem danh mục</a>
          </div>
          <ul className={styles.facts} data-kn="hero-copy" aria-label="Thông tin nhanh về tiệm">
            <li><b className={styles.factN}>10K – 24K</b><span>tuổi vàng, giải thích rõ</span></li>
            <li><b className={styles.factN}>9:00 – 20:00</b><span>mở cửa mỗi ngày</span></li>
            <li><b className={styles.factN}>{CHEAPEST}</b><span>nhẫn trơn vàng 10K</span></li>
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
            <span>Nhẫn đính hôn Trăng Non</span>
            <PresetButton preset={HERO_PRESET} className={styles.capLink} cursor="Chọn">Ước tính giá mẫu này</PresetButton>
          </figcaption>
        </figure>
      </div>
      <a className={styles.cue} href="#gioi-thieu" aria-label="Cuộn xuống phần giới thiệu"><span>Cuộn</span><i aria-hidden="true" /></a>
    </section>
  );
}
