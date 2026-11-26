import { SVGPathDraw, SplitWords } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { JOURNEY } from "../data/content";
import { Photo } from "./Photo";
import { WaterImage } from "./WaterImage";
import styles from "../brand.module.css";

export function Journey() {
  return (
    <section id="hanh-trinh" className={styles.journey} aria-labelledby="journey-title">
      <div className={styles.wrap}>
        <div className={styles.journeyGrid}>
          <div className={styles.journeyMedia} data-lb="reveal">
            <WaterImage className={styles.journeyWater} hover={8} scrollPeak={12} fx="water-journey">
              <Photo file="tau-go" alt="Những chiếc thuyền gỗ neo giữa mặt biển xanh" sizes="(max-width: 900px) 92vw, 40vw" pos="50% 60%" w={1200} />
            </WaterImage>
            <p className={styles.journeyCaption}>Thuyền ra điểm lặn từ bến Sơn Trà. Tour đảo đi từ Cửa Đại, Hội An.</p>
          </div>
          <div className={styles.journeyBody}>
            <p className={styles.kicker}>Một ngày lặn</p>
            <h2 id="journey-title" className={styles.h2}><SplitWords as="span">Một ngày lặn diễn ra thế nào.</SplitWords></h2>
            <p className={styles.lede}>Mốc giờ dưới đây là lịch của một buổi lặn buổi sáng. Tour đảo và khoá học có thể bắt đầu sớm hơn, giờ chính xác ghi trong xác nhận đặt chỗ.</p>
            <ol className={styles.steps}>
              <SVGPathDraw className={styles.stepsLine} mode="scroll" start="top 70%" end="bottom 60%" viewBox="0 0 24 600" preserveAspectRatio="none" aria-hidden="true">
                <path d="M12 0 C22 50 2 100 12 150 S22 250 12 300 S2 400 12 450 S22 550 12 600" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
              </SVGPathDraw>
              {JOURNEY.map((s) => (
                <li key={s.n} className={styles.step} data-lb="reveal">
                  <span className={styles.stepDot} aria-hidden="true" />
                  <span className={styles.stepN}>{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <a className={`${styles.btn} ${styles.btnGhost}`} href={buildConsultHref("lan-bien")}>Hỏi về chuyến lặn của bạn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
