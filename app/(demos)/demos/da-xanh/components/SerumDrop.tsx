"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";
import styles from "../brand.module.css";

/**
 * Giọt serum rơi theo tiến độ cuộn: hình thành ở đầu trang (đầu pipet), rơi dọc rail bên phải,
 * giãn theo vận tốc cuộn, để lại vệt mờ và nở gợn nước khi tới cuối trang.
 * Reduced-motion: giọt đứng yên ở đầu rail. Ẩn khi trang ngắn hơn 1.4 màn hình.
 */
export function SerumDrop() {
  const rail = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const pip = useRef<HTMLDivElement>(null);
  const ripple = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    registerGsap();
    const r = rail.current, d = drop.current, t = trail.current, p = pip.current, rp = ripple.current;
    if (!r || !d || !t || !p || !rp) return;
    if (prefersReducedMotion()) { gsap.set(d, { y: 0, scale: 0.7 }); r.setAttribute("data-fx-ready", "static"); return; }
    let h = r.clientHeight - 30;
    const qy = gsap.quickTo(d, "y", { duration: 0.45, ease: "power3.out" });
    const qsy = gsap.quickTo(d, "scaleY", { duration: 0.3, ease: "power2.out" });
    const qsx = gsap.quickTo(d, "scaleX", { duration: 0.3, ease: "power2.out" });
    const qt = gsap.quickTo(t, "scaleY", { duration: 0.45, ease: "power3.out" });
    let ended = false;
    const st = ScrollTrigger.create({
      trigger: document.documentElement, start: 0, end: "max", invalidateOnRefresh: true,
      onRefresh: () => { h = Math.max(120, r.clientHeight - 30); },
      onUpdate: (self) => {
        const pr = self.progress;
        const form = Math.min(1, pr / 0.035); // giọt hình thành trong 3.5% cuộn đầu
        const v = Math.min(0.7, Math.abs(self.getVelocity()) / 2600);
        qy(pr * h);
        const grow = 0.5 + 0.5 * form;
        qsy(grow * (1 + v)); qsx(grow * (1 - v * 0.3));
        qt(pr);
        gsap.set(p, { opacity: Math.max(0, 1 - pr * 18) });
        if (pr > 0.985 && !ended) { ended = true; gsap.fromTo(rp, { scale: 0.2, opacity: 0.9 }, { scale: 3.2, opacity: 0, duration: 1.1, ease: "power2.out" }); }
        if (pr < 0.95) ended = false;
      },
    });
    gsap.set(d, { scale: 0.5, y: 0, transformOrigin: "50% 0%" });
    r.setAttribute("data-fx-ready", "1");
    return () => { st.kill(); gsap.killTweensOf([d, t, p, rp]); };
  }, []);

  return (
    <div ref={rail} className={styles.rail} aria-hidden="true" data-fx="SerumDrop">
      <div ref={pip} className={styles.pipette}>
        <svg viewBox="0 0 20 34" width="20" height="34"><path d="M7 0h6v12l-1.2 4v8l-1.8 6-1.8-6v-8L7 12z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
      </div>
      <div ref={trail} className={styles.trail} />
      <div ref={drop} className={styles.drop}>
        <svg viewBox="0 0 24 34" width="22" height="31">
          <defs>
            <linearGradient id="dx-drop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#b9a7ff" /><stop offset="1" stopColor="#7fd6e6" />
            </linearGradient>
          </defs>
          <path d="M12 1C9 9 2 15 2 22c0 6 4.5 10 10 10s10-4 10-10C22 15 15 9 12 1z" fill="url(#dx-drop)" stroke="rgba(255,255,255,.9)" strokeWidth="1.2" />
          <path d="M7 21c0 3 2 5 4.5 5.4" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span ref={ripple} className={styles.ripple} />
      </div>
    </div>
  );
}
