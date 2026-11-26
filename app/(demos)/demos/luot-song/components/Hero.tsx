import { ParallaxLayer } from "@/features/showroom/effects";
import { HERO_FACTS } from "../data/content";
import { Photo } from "./Photo";
import { Ride } from "./Ride";
import { Sticker, Sun, WaveStack } from "./Art";
import styles from "../brand.module.css";

/** Mỗi từ là một span riêng; Motion đẩy từng từ vào bờ như sóng (trượt ngang + nghiêng), không dùng thư viện. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i, a) => (
        <span key={i} className={styles.heroWordBox}>
          <span className={styles.heroWord} data-rs="hero-word">{w}</span>
          {i < a.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} data-rs="hero" aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-rs="eyebrow">
            <span>Trường dạy lướt sóng</span><span aria-hidden="true" className={styles.eyebrowDot} /><span>Quận Sơn Trà, Đà Nẵng</span>
          </p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.heroLine}><Words text="Học lướt sóng" /></span>
            <span className={`${styles.heroLine} ${styles.heroScript}`}><Words text="từ buổi đầu tiên." /></span>
          </h1>
          <p className={styles.heroLead} data-rs="hero-lead">
            Ráng Sóng dạy người chưa từng đứng trên ván, trẻ em từ 6 tuổi và người đã lướt muốn chỉnh kỹ thuật. Mỗi buổi khoảng 2 giờ trên biển Sơn Trà, nhóm nhỏ, ván và đồ bảo hộ chuẩn bị sẵn.
          </p>
          <div className={styles.heroCtas}>
            <span data-rs="hero-cta"><a className={`${styles.btn} ${styles.btnBrown}`} href="#dat-lich">Đặt buổi trải nghiệm</a></span>
            <span data-rs="hero-cta"><a className={`${styles.btn} ${styles.btnGhost}`} href="#khoa-hoc">Xem khoá học và giá</a></span>
          </div>
          <ul className={styles.facts} data-rs="hero-cta">
            {HERO_FACTS.map((f) => (
              <li key={f.k}><small>{f.k}</small><b>{f.v}</b></li>
            ))}
          </ul>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.heroSun} data-rs="sun-rise"><Sun /></div>
          <div className={styles.arch} data-rs="arch">
            <div className={styles.archInner}>
              <ParallaxLayer distance={50} className={styles.archPlx}>
                <div className={styles.archPhoto}>
                  <Photo file="song-hoang-hon" alt="Con sóng vỡ dưới bầu trời vàng cam lúc hoàng hôn" sizes="(max-width: 900px) 80vw, 40vw" priority pos="42% 50%" />
                </div>
              </ParallaxLayer>
            </div>
          </div>
          <div className={styles.heroSticker} data-rs="hero-sticker"><Sticker uid="hero" size={170} /></div>
        </div>
      </div>
      <Ride />
      <WaveStack />
      <a className={styles.heroHint} href="#khoa-hoc" data-rs="hero-hint" aria-label="Cuộn xuống phần khoá học"><span aria-hidden="true">↓</span></a>
    </section>
  );
}
