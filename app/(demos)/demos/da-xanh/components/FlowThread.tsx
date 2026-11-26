"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";
import styles from "../brand.module.css";

/**
 * Sợi serum nối các bước của buổi chăm sóc: một vệt gradient chảy xuống theo cuộn (scaleY scrub)
 * và một giọt nhỏ chạy đầu vệt. Reduced-motion: vệt đầy sẵn, không giọt.
 */
export function FlowThread() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const bead = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const r = root.current, b = bar.current, d = bead.current;
    if (!r || !b || !d) return;
    if (prefersReducedMotion()) { gsap.set(b, { scaleY: 1 }); gsap.set(d, { opacity: 0 }); r.setAttribute("data-fx-ready", "static"); return; }
    registerGsap();
    const host = r.parentElement as HTMLElement;
    gsap.set(b, { scaleY: 0, transformOrigin: "50% 0%" });
    const st = ScrollTrigger.create({
      trigger: host, start: "top 72%", end: "bottom 62%", scrub: 0.4,
      onUpdate: (self) => { gsap.set(b, { scaleY: self.progress }); gsap.set(d, { top: `${self.progress * 100}%`, opacity: self.progress > 0.01 && self.progress < 0.995 ? 1 : 0 }); },
    });
    r.setAttribute("data-fx-ready", "1");
    return () => { st.kill(); };
  }, []);
  return (
    <div ref={root} className={styles.flowThread} aria-hidden="true" data-fx="FlowThread">
      <i className={styles.flowTrack} />
      <i ref={bar as React.RefObject<HTMLElement>} className={styles.flowBar} />
      <i ref={bead as React.RefObject<HTMLElement>} className={styles.flowBead} />
    </div>
  );
}
