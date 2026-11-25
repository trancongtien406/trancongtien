"use client";

import { useEffect, useRef } from "react";
import styles from "../brand.module.css";

/**
 * Nền gradient mesh chuyển động chậm (CSS thuần, chỉ animate transform) + trôi nhẹ theo tiến độ cuộn.
 * Tự dừng khi tab ẩn (data-paused). Reduced-motion: CSS tắt animation, giữ nền tĩnh.
 */
export function Mesh() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const vis = () => el.setAttribute("data-paused", document.hidden ? "1" : "0");
    vis();
    document.addEventListener("visibilitychange", vis);
    let raf = 0;
    const tick = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--dx-p", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", vis);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className={styles.mesh} aria-hidden="true" data-fx="MeshBackground" data-paused="0">
      <div className={styles.meshDrift}>
        <i className={`${styles.blob} ${styles.b1}`} />
        <i className={`${styles.blob} ${styles.b2}`} />
        <i className={`${styles.blob} ${styles.b3}`} />
        <i className={`${styles.blob} ${styles.b4}`} />
        <i className={`${styles.blob} ${styles.b5}`} />
      </div>
      <div className={styles.meshVeil} />
    </div>
  );
}
