import { MagneticButton, ParallaxLayer, SplitWords } from "@/features/showroom/effects";
import { Photo } from "./Photo";
import { Ride } from "./Ride";
import { Sticker, Sun, WaveStack } from "./Art";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} data-rs="hero" aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-rs="eyebrow">
            <span>Trường dạy lướt sóng</span><span aria-hidden="true" className={styles.eyebrowDot} /><span>Bãi biển Đà Nẵng</span>
          </p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <SplitWords as="span" className={styles.heroLine} trigger="load" delay={0.7} duration={1} stagger={0.1} padY="0.18em">Đừng chỉ ngắm biển.</SplitWords>
            <SplitWords as="span" className={`${styles.heroLine} ${styles.heroScript}`} trigger="load" delay={1.05} duration={1} stagger={0.12} padY="0.3em">Hãy cưỡi sóng!</SplitWords>
          </h1>
          <p className={styles.heroLead} data-rs="hero-lead">
            Học lướt sóng cùng huấn luyện viên, từ buổi đầu tiên đến lúc bạn tự đứng trên ván. Nhóm nhỏ, ván và đồ bảo hộ chuẩn bị sẵn, biển được đọc kỹ trước mỗi buổi.
          </p>
          <div className={styles.heroCtas}>
            <span data-rs="hero-cta"><MagneticButton><a className={`${styles.btn} ${styles.btnBrown}`} href="#lap-ke-hoach">Lên kế hoạch buổi học</a></MagneticButton></span>
            <span data-rs="hero-cta"><a className={`${styles.btn} ${styles.btnGhost}`} href="#khoa-hoc">Xem các khoá học</a></span>
          </div>
          <ul className={styles.chips} data-rs="hero-cta">
            <li>Nhóm nhỏ</li><li>Ván và đồ bảo hộ có sẵn</li><li>Từ 6 tuổi</li>
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
      <a className={styles.heroHint} href="#tuyen-ngon" data-rs="hero-hint" aria-label="Cuộn xuống nội dung chính"><span aria-hidden="true">↓</span></a>
    </section>
  );
}
