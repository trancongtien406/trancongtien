"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { FilmCanvas } from "./FilmCanvas";

/** Màn mở điện ảnh: clip-path inset theo cuộn, khe hẹp -> 2.39:1 -> toàn khung. */
export function Curtain() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const box = (v: number, hz: number) => `inset(${v}px ${hz}px ${v}px ${hz}px)`;
      const slit = () => box(innerHeight * 0.4, innerWidth * 0.3);
      const wide = () => box(Math.max(0, (innerHeight - innerWidth / 2.39) / 2), 0);
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: el, start: "top top", end: "+=260%", pin: true, scrub: 0.9, anticipatePin: 1, invalidateOnRefresh: true } });
      tl.fromTo("[data-screen]", { clipPath: slit }, { clipPath: wide, duration: 1.2 })
        .fromTo("[data-screen-in]", { scale: 1.35 }, { scale: 1.12, duration: 1.2, ease: "none" }, 0)
        .to("[data-pre]", { autoAlpha: 0, y: -30, duration: 0.5 }, 0.2)
        .to("[data-screen]", { clipPath: box(0, 0), duration: 1 }, 1.5)
        .to("[data-screen-in]", { scale: 1, duration: 1, ease: "none" }, 1.5)
        .fromTo("[data-card]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 2.1)
        .to("[data-hud]", { autoAlpha: 0, duration: 0.4 }, 1.5)
        .to({}, { duration: 0.6 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.curtain} id="man-mo" aria-labelledby="mm-h">
      <h2 id="mm-h" className={styles.srOnly}>Màn mở điện ảnh: trường đoạn Ánh sáng cuối ngày</h2>
      <div className={styles.cHud} data-hud aria-hidden="true">
        <span>2.39 : 1</span><span>24 FPS</span><span>REC ●</span><span>ISO 800</span>
      </div>
      <p className={styles.cPre} data-pre>Mở màn<span aria-hidden="true"> ↓</span></p>
      <div className={styles.screen} data-screen>
        <div className={styles.screenIn} data-screen-in><FilmCanvas variant="neon" className={styles.fill} /></div>
        <div className={styles.cCard} data-card>
          <p className={styles.cLabel}>Trường đoạn 01</p>
          <p className={styles.cTitle}>Ánh sáng cuối ngày</p>
          <p className={styles.cSub}>Phim ngắn minh hoạ · 12 phút · tiếng Việt</p>
        </div>
      </div>
    </section>
  );
}
