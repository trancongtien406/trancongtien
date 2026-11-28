"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { Poster } from "./Poster";

gsap.registerPlugin(ScrollTrigger);

const A = "Đi đường tắt.";
const B = "Bỏ dòng thời gian trống.";

export function Shortcut() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-tm-fan]");
      const chars = gsap.utils.toArray<HTMLElement>("[data-tm-ch]");
      gsap.set(cards, { x: 0, rotation: 0, y: 0 });
      gsap.set(chars, { autoAlpha: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=" + window.innerHeight * 1.1, pin: true, scrub: 0.6, anticipatePin: 1 } });
      tl.to(cards, { x: (i) => (i - 3.5) * 22, rotation: (i) => (i - 3.5) * 4.2, y: (i) => Math.abs(i - 3.5) * 3, duration: 1, ease: "power2.out", stagger: 0.04 }, 0)
        .to(chars, { autoAlpha: 1, duration: 0.05, stagger: 0.04 }, 0.2)
        .to({}, { duration: 0.5 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className={styles.short} aria-labelledby="tm-h-short">
      <div className={styles.fan} aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => <div key={i} data-tm-fan className={styles.fanCard}><Poster v={7 - i} /></div>)}
      </div>
      <h2 id="tm-h-short" className={styles.shortH}>
        <span className={styles.srOnly}>{A} {B}</span>
        <span aria-hidden="true">{[...A].map((c, i) => <span key={i} data-tm-ch className={i > 3 && i < 11 ? styles.tint : ""}>{c}</span>)}</span>
        <span aria-hidden="true" className={`${styles.dim} ${styles.blk}`}>{[...B].map((c, i) => <span key={i} data-tm-ch>{c}</span>)}</span>
      </h2>
    </section>
  );
}
