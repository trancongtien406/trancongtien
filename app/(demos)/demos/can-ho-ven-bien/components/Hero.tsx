import { Counter, ParallaxLayer } from "@/features/showroom/effects";
import { innerArea, quote } from "../data/plans";
import { Photo } from "./Photo";
import { SeaLines, Skyline } from "./Art";
import styles from "../brand.module.css";

const MIN_PRICE = quote({ unit: "1pn", tier: "thap", facing: "dong-bac", furnish: "co-ban" }).total / 1e9;
const MIN_AREA = Math.round(innerArea("1pn"));
const MAX_AREA = Math.round(innerArea("3pn"));

/** Mỗi từ là một span; Motion bật sáng từng từ theo thứ tự ngẫu nhiên như đèn cửa sổ của toà tháp lúc chạng vạng. */
function Lights({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i, a) => (
        <span key={i} className={styles.lightBox}>
          <span className={styles.light} data-cv="hero-word">{w}</span>
          {i < a.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className={styles.hero} data-cv="hero" aria-label="Vọng Triều, căn hộ ven biển Đà Nẵng">
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroGlow} />
        <ParallaxLayer className={`${styles.layer} ${styles.layerFar}`} distance={26}><Skyline seed={7} base={220} minH={50} maxH={170} className={styles.layerSvg} /></ParallaxLayer>
        <ParallaxLayer className={`${styles.layer} ${styles.layerMid}`} distance={52}><Skyline seed={23} base={200} minH={70} maxH={190} minW={34} maxW={84} className={styles.layerSvg} /></ParallaxLayer>
        <ParallaxLayer className={`${styles.layer} ${styles.layerSea}`} distance={84}><SeaLines className={styles.layerSvg} /></ParallaxLayer>
      </div>

      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroCopy} data-cv="hero-copy">
          <p className={styles.sheet} data-cv="hero-eyebrow"><span>Vọng Triều</span><i aria-hidden="true" />Căn hộ ven biển · Đà Nẵng</p>
          <h1 className={styles.h1}><Lights text="Căn hộ 1 đến 3 phòng ngủ, mở cửa ra biển Đà Nẵng." /></h1>
          <p className={styles.lead} data-cv="hero-lead">
            Vọng Triều là dự án căn hộ ven biển một tháp 36 tầng ở dải bờ phía Đông Đà Nẵng, dành cho gia đình trẻ, người mua để ở và người nghỉ dưỡng dài ngày. Xem mặt bằng, hướng nhìn theo tầng và cách chia khoản thanh toán ngay trên trang.
          </p>
          <div className={styles.heroCta} data-cv="hero-cta">
            <a className={`${styles.btn} ${styles.btnCopper}`} href="#tham-quan" data-cursor="Đặt lịch">Đặt lịch xem nhà mẫu</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#mat-bang">Xem mặt bằng căn hộ</a>
          </div>
        </div>

        <div className={styles.heroFigure} data-cv="hero-figure">
          <div className={styles.heroFrame}>
            <div className={styles.heroClip} data-cv="hero-clip">
              <div className={styles.heroPhoto} data-cv="hero-photo">
                <Photo file="thap-hoang-hon" alt="Toà tháp cong ánh đồng lúc hoàng hôn nhìn từ dưới lên, các ban công kính xếp tầng" sizes="(max-width: 900px) 88vw, 40vw" priority pos="50% 40%" />
                <span className={styles.heroShade} aria-hidden="true" />
              </div>
            </div>
            <svg className={styles.heroDim} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path pathLength={1} d="M-4 0V100" vectorEffect="non-scaling-stroke" />
              <path pathLength={1} d="M-8 6H0M-8 38H0M-8 70H0M-8 100H0" vectorEffect="non-scaling-stroke" />
              <path pathLength={1} d="M0 0H100M100 0V100" vectorEffect="non-scaling-stroke" opacity=".35" />
            </svg>
            <ul className={styles.heroTicks} aria-hidden="true">
              <li style={{ top: "6%" }}>T36</li><li style={{ top: "38%" }}>T24</li><li style={{ top: "70%" }}>T12</li><li style={{ top: "99%" }}>T01</li>
            </ul>
          </div>
          <p className={styles.figCap}>Mặt tiền hướng Đông, lúc ánh nắng cuối ngày đi dọc các ban công.</p>
        </div>
      </div>

      <dl className={`${styles.wrap} ${styles.heroStats}`} data-cv="hero-stats">
        <div><dt><Counter value={MIN_AREA} suffix=" m²" duration={1.6} trigger="load" className={styles.statNum} /></dt><dd>diện tích sử dụng từ căn 1PN, tới {MAX_AREA}&nbsp;m² ở căn 3PN</dd></div>
        <div><dt><Counter value={Number(MIN_PRICE.toFixed(2))} decimals={2} suffix=" tỷ" duration={1.6} trigger="load" className={styles.statNum} /></dt><dd>giá tham khảo từ, căn 1PN tầng thấp, nội thất cơ bản</dd></div>
        <div><dt><Counter value={36} suffix=" tầng" duration={1.6} trigger="load" className={styles.statNum} /></dt><dd>một tháp, ba hướng nhìn ra biển và đô thị</dd></div>
        <div className={styles.scrollCue}><span aria-hidden="true" /><em>Cuộn để xem dự án</em></div>
      </dl>
    </section>
  );
}
