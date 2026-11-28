"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { LAYERS, LayerImg } from "./Art";
import { Glitch } from "./Glitch";

export function StackScroll() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const labels = useRef<(HTMLLIElement | null)[]>([]);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = stage.current;
    const section = sec.current;
    if (!s || !section) return;
    const L = layers.current.filter(Boolean) as HTMLDivElement[];
    const B = labels.current.filter(Boolean) as HTMLLIElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    s.dataset.js = "1";
    const H = () => s.clientHeight;
    const hs = () => L.map((l) => l.offsetHeight);
    const total = () => hs().reduce((x, y) => x + y, 0);
    const gap = () => L[0].offsetWidth * 0.1;
    const cum = (i: number) => hs().slice(0, i).reduce((x, y) => x + y, 0);
    const compactY = (i: number) => (H() - total()) / 2 + cum(i) - i * 3 + H() * 0.03;
    const spreadY = (i: number) => (H() - total() - 5 * gap()) / 2 + cum(i) + i * gap() + H() * 0.03;
    const midY = (i: number) => spreadY(i) + hs()[i] / 2;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (reduced) {
        L.forEach((l, i) => gsap.set(l, { y: spreadY(i), x: (i % 2 ? 1 : -1) * 6 }));
        B.forEach((b, i) => gsap.set(b, { y: midY(i), opacity: 1 }));
        gsap.set(s, { "--bg": "#fbf9f3", "--fg": "#14110d" });
        gsap.set(t1.current, { opacity: 0 });
        gsap.set(t2.current, { opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true } });
      L.forEach((l, i) => {
        tl.fromTo(l, { y: () => compactY(i), x: 0, rotate: 0 }, { y: () => spreadY(i), x: (i % 2 ? 1 : -1) * 8, rotate: (i % 2 ? 1 : -1) * 1.6, ease: "power2.inOut", duration: 1 }, 0.4 + i * 0.02);
      });
      B.forEach((b, i) => {
        tl.fromTo(b, { y: () => midY(i), opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 1.0 + i * 0.07);
      });
      tl.fromTo(t1.current, { opacity: 1, y: 0 }, { opacity: 0, y: -24, duration: 0.3 }, 0.5);
      tl.to(s, { "--bg": "#fbf9f3", "--fg": "#14110d", duration: 0.6, ease: "none" }, 0.55);
      tl.fromTo(t2.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, onStart: () => t2.current?.querySelector("h2")?.dispatchEvent(new Event("glitch")) }, 0.95);
      tl.to({}, { duration: 0.8 }, 1.5);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className={styles.stackSec} aria-labelledby="stack-h">
      <div ref={stage} className={styles.stackStage}>
        <div ref={t1} className={styles.stackT1}>
          <span className={styles.kicker}>Bánh Mì Tầng</span>
          <h2 id="stack-h" className={styles.stackLine}>ÉP NÓNG TẠI CHỖ</h2>
          <p>Mỗi ổ được ép sát chảo gang, xém cạnh rồi mới xếp tầng. Cuộn xuống để xem từng lớp.</p>
        </div>
        <div ref={t2} className={styles.stackT2}>
          <Glitch as="h2" text="MÓN KÝ HIỆU." className={styles.stackBig} trigger="manual" />
          <p>Sáu lớp, sáu vị, không lớp nào đứng ngoài. Đây là Tầng Đôi, món bán chạy nhất tuần.</p>
        </div>
        <div className={styles.stackArt} aria-hidden="true">
          {LAYERS.map(({ key }, i) => (
            <div key={key} ref={(n) => { layers.current[i] = n; }} className={styles.layer} style={{ ["--i" as string]: i, zIndex: LAYERS.length - i }}>
              <LayerImg i={i} />
            </div>
          ))}
        </div>
        <ol className={styles.labels}>
          {LAYERS.map((l, i) => (
            <li key={l.key} ref={(n) => { labels.current[i] = n; }} className={styles.label} style={{ ["--i" as string]: i }}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <span>
                {l.name}
                <small>{l.note}</small>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
