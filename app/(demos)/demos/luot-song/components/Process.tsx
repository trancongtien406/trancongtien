import { ClipReveal, SVGPathDraw } from "@/features/showroom/effects";
import { STEPS } from "../data/content";
import { Divider } from "./Art";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Process() {
  return (
    <section id="buoi-hoc" className={styles.process} aria-labelledby="bh-title">
      <Divider fill="var(--rs-sand)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerDark} data-rs="reveal">Một buổi, bốn bước</p>
        <h2 id="bh-title" className={styles.h2} data-rs="reveal">An toàn trước.<br /><span className={styles.script}>Niềm vui theo sau.</span></h2>
        <div className={styles.stepsWrap}>
          <SVGPathDraw mode="scroll" start="top 75%" end="bottom 55%" viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.stepsLine} aria-hidden="true">
            <path d="M0 70 C 100 10, 200 10, 300 70 S 500 130, 600 70 S 800 10, 900 70 S 1100 130, 1200 70" stroke="var(--rs-brown)" strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </SVGPathDraw>
          <ol className={styles.steps}>
            {STEPS.map((s) => (
              <li key={s.n} className={styles.step}>
                <ClipReveal variant="inset" from="bottom" className={styles.stepArch} innerScale={1.1}>
                  <div className={styles.stepArchFrame}><Photo file={s.file} alt={s.alt} sizes="(max-width: 900px) 70vw, 24vw" w={1200} pos={s.file === "boi-sap" ? "40% 50%" : "50% 50%"} /></div>
                </ClipReveal>
                <span className={styles.stepNo} aria-hidden="true">{s.n}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepText}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
