"use client";

import { useEffect, useRef } from "react";
import styles from "../brand.module.css";

/**
 * Máy xay theo cuộn: tiến độ cuộn qua phần "Từ hạt đến ly" ghi vào biến --p (0..1).
 * Lưỡi xay quay, hạt tụt xuống phễu, bột rơi từng giọt, cốc đầy dần. Chỉ transform/opacity, tắt khi ngoài khung nhìn.
 * reduced-motion: cố định ở trạng thái đầy.
 */
export function Grinder({ targetId }: { targetId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const sec = document.getElementById(targetId);
    if (!el || !sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--p", "1"); return; }
    let raf = 0;
    let on = false;
    const update = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.35 - r.top) / Math.max(1, r.height - vh * 0.3)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver((es) => {
      const v = es[0].isIntersecting;
      if (v && !on) { on = true; window.addEventListener("scroll", onScroll, { passive: true }); update(); }
      else if (!v && on) { on = false; window.removeEventListener("scroll", onScroll); }
    }, { rootMargin: "100px" });
    io.observe(sec);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [targetId]);
  return (
    <div ref={ref} className={styles.grinder} data-testid="grinder" style={{ ["--p" as string]: 0 }} aria-hidden="true">
      <svg viewBox="0 0 220 360">
        <path d="M30 14h160l-34 92h-92z" className={styles.gHopper} />
        <g className={styles.gBeans}>
          <ellipse cx="78" cy="40" rx="11" ry="7" /><ellipse cx="108" cy="34" rx="11" ry="7" /><ellipse cx="138" cy="42" rx="11" ry="7" />
          <ellipse cx="92" cy="62" rx="11" ry="7" /><ellipse cx="124" cy="64" rx="11" ry="7" /><ellipse cx="108" cy="84" rx="11" ry="7" />
        </g>
        <rect x="70" y="106" width="80" height="62" className={styles.gBody} />
        <g className={styles.gBurr}>
          <circle cx="110" cy="137" r="22" />
          <path d="M110 115v44M88 137h44M94 121l32 32M126 121l-32 32" />
        </g>
        <path d="M96 168h28v22H96z" className={styles.gBody} />
        <g className={styles.gDrops}>
          <circle cx="110" cy="206" r="4" /><circle cx="110" cy="206" r="4" /><circle cx="110" cy="206" r="4" />
        </g>
        <path d="M54 246h112l-14 92a12 12 0 0 1-12 10H80a12 12 0 0 1-12-10z" className={styles.gCup} />
        <clipPath id="rn-g-cup"><path d="M54 246h112l-14 92a12 12 0 0 1-12 10H80a12 12 0 0 1-12-10z" /></clipPath>
        <g clipPath="url(#rn-g-cup)"><rect x="40" y="248" width="140" height="100" className={styles.gFill} /></g>
      </svg>
      <div className={styles.gMeter}><i /></div>
    </div>
  );
}
