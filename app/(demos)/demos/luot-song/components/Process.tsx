"use client";

import { useRef } from "react";
import { ScrollTrigger, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";
import { STEPS } from "../data/content";
import { Divider } from "./Art";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const TOTAL = 120;

/**
 * Đồng hồ buổi học: cuộn qua bốn bước thì phao đồng hồ chạy dọc đường sóng từ phút 0 tới phút 120,
 * bước tương ứng nổi lên. Cập nhật bằng ref (không render lại React theo từng khung).
 */
export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const out = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    registerGsap();
    const r = root.current, m = mark.current, o = out.current;
    if (!r || !m || !o) return;
    const cards = Array.from(r.querySelectorAll<HTMLElement>("[data-step]"));
    const set = (p: number) => {
      m.style.left = `${(p * 100).toFixed(2)}%`;
      o.textContent = String(Math.round(p * TOTAL));
      const idx = Math.min(cards.length - 1, Math.floor(p * cards.length * 0.999));
      cards.forEach((c, i) => c.setAttribute("data-on", i === idx ? "1" : "0"));
    };
    if (prefersReducedMotion()) { set(1); cards.forEach((c) => c.removeAttribute("data-on")); return; }
    set(0);
    const st = ScrollTrigger.create({ trigger: r, start: "top 62%", end: "bottom 78%", scrub: 0.4, onUpdate: (s) => set(s.progress) });
    return () => { st.kill(); };
  }, []);

  return (
    <section id="buoi-hoc" className={styles.process} aria-labelledby="bh-title">
      <Divider fill="var(--rs-sand)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerDark} data-rs="reveal">Một buổi học khoảng 2 giờ</p>
        <h2 id="bh-title" className={styles.h2} data-rs="reveal">An toàn trước.<br /><span className={styles.script}>Xuống nước sau.</span></h2>
        <p className={styles.lede} data-rs="reveal">Mọi buổi, từ buổi trải nghiệm đến buổi thứ mười, đều đi theo bốn bước này. Cuộn xuống để chạy đồng hồ của buổi học.</p>
        <div className={styles.stepsWrap} ref={root}>
          <div className={styles.clock} aria-hidden="true">
            <div className={styles.clockLine} />
            <div className={styles.clockMark} ref={mark}>
              <b><span ref={out}>120</span></b><small>phút</small>
            </div>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((s) => (
              <li key={s.n} className={styles.step} data-step>
                <div className={styles.stepArch}>
                  <div className={styles.stepArchFrame}><Photo file={s.file} alt={s.alt} sizes="(max-width: 900px) 70vw, 24vw" w={1200} pos={s.file === "boi-sap" ? "40% 50%" : "50% 50%"} /></div>
                </div>
                <span className={styles.stepNo} aria-hidden="true">{s.n}</span>
                <p className={styles.stepMin}>{s.min}</p>
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
