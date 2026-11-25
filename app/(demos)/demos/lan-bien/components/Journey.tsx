import { MagneticButton, SVGPathDraw, SplitWords } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { JOURNEY, SCHEDULE_STATES } from "../data/content";
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
            <p className={styles.journeyCaption}>Cù Lao Chàm, Sơn Trà, biển miền Trung, tuỳ chương trình và điều kiện tổ chức.</p>
          </div>
          <div className={styles.journeyBody}>
            <p className={styles.kicker}>Hành trình một ngày</p>
            <h2 id="journey-title" className={styles.h2}><SplitWords as="span">Một ngày, một hành trình xanh.</SplitWords></h2>
            <p className={styles.lede}>Từ lúc chuẩn bị trên bờ đến khi trở lại mặt biển, mỗi bước đều có vai trò riêng. Chúng tôi chọn hoạt động theo thời tiết, môi trường biển và khả năng của người tham gia.</p>
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
            <ul className={styles.states} aria-label="Cách xếp lịch">
              {SCHEDULE_STATES.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <MagneticButton>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={buildConsultHref("lan-bien")}>Trao đổi về lịch trải nghiệm</a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
