"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { Drop, FactorySketch } from "./Art";
import { prefersReduced, setupGsap } from "./lib";

const P1 = "Lụa Hà Đông bắt rễ từ tấm vải: từng sợi tơ, từng nhịp dệt, từng giọt mực được pha ngay trong xưởng.";
const P2 = "Màu không chỉ là một phần của sản phẩm. Màu là nơi chúng tôi đến từ.";

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={styles.w}>{w}{" "}</span>
      ))}
    </>
  );
}

export function Ink() {
  const sec = useRef<HTMLElement>(null);
  const drop = useRef<HTMLDivElement>(null);
  const sketch = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const s = sec.current;
    if (!s) return;
    if (prefersReduced()) {
      s.dataset.rm = "1";
      return;
    }
    setupGsap();
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(`.${styles.w}`, s);
      const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(words, { opacity: 0.1 }, { opacity: 1, stagger: 0.08, duration: 0.3, ease: "none" }, 0);
      tl.fromTo(drop.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.6);
      tl.fromTo(cap.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.4);
      tl.fromTo(sketch.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1.5);
      tl.to({}, { duration: 0.5 }, 2.6);
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="xuong" data-drop className={styles.inkSec} aria-labelledby="ink-h">
      <div className={styles.inkStage}>
        <h2 id="ink-h" className={styles.inkText}>
          <Words text={P1} />
        </h2>
        <div ref={drop} className={styles.inkDrop}><Drop size={30} color="#2f3b28" /></div>
        <p className={styles.inkText}>
          <Words text={P2} />
        </p>
        <p ref={cap} className={styles.inkCap}>Xưởng pha mực nội bộ</p>
        <div ref={sketch} className={styles.sketch} aria-hidden="true"><FactorySketch /></div>
      </div>
    </section>
  );
}
