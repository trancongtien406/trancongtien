"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { Fabric, type PALETTES } from "./Art";
import { prefersReduced, setupGsap } from "./lib";

const TILES: { v: keyof typeof PALETTES; x: string; y: string; w: string; r: number; k: number }[] = [
  { v: "cuc", x: "8%", y: "10%", w: "19vw", r: -4, k: 1.15 },
  { v: "mai", x: "62%", y: "6%", w: "12vw", r: 6, k: 0.8 },
  { v: "lam", x: "34%", y: "64%", w: "15vw", r: -7, k: 1.3 },
  { v: "sen", x: "78%", y: "58%", w: "16vw", r: 3, k: 0.95 },
  { v: "truc", x: "18%", y: "48%", w: "11vw", r: 8, k: 1.5 },
];

export function Signature() {
  const sec = useRef<HTMLElement>(null);
  const word = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const s = sec.current;
    const w = word.current;
    if (!s || !w) return;
    if (prefersReduced()) {
      s.dataset.rm = "1";
      return;
    }
    setupGsap();
    const ctx = gsap.context(() => {
      const dist = () => w.scrollWidth + window.innerWidth * 0.2;
      const st = { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true };
      gsap.fromTo(w, { x: () => window.innerWidth * 0.6 }, { x: () => -w.scrollWidth + window.innerWidth * 0.25, ease: "none", scrollTrigger: st });
      gsap.utils.toArray<HTMLElement>(`.${styles.tile}`, s).forEach((t, i) => {
        const k = TILES[i].k;
        gsap.fromTo(t, { x: () => window.innerWidth * 0.5 * k, rotate: 0 }, { x: () => -dist() * 0.5 * k, rotate: 0, ease: "none", scrollTrigger: st });
      });
      gsap.fromTo(`.${styles.sigBtn}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, scrollTrigger: { trigger: s, start: "75% bottom", end: "90% bottom", scrub: true } });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="dac-trung" className={styles.sigSec} aria-labelledby="sig-h">
      <div className={styles.sigStage}>
        <h2 id="sig-h" className={styles.srOnly}>Lụa đặc trưng</h2>
        <p ref={word} className={styles.sigWord} aria-hidden="true">LỤA ĐẶC TRƯNG</p>
        {TILES.map((t, i) => (
          <div key={i} className={styles.tile} style={{ left: t.x, top: t.y, width: t.w }} aria-hidden="true">
            <Fabric id={`t${i}`} variant={t.v} />
          </div>
        ))}
        <a className={styles.sigBtn} href="#bo-suu-tap">Khám phá bộ sưu tập</a>
      </div>
    </section>
  );
}
