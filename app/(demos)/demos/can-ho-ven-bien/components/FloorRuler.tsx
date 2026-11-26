"use client";

import { useEffect, useRef } from "react";
import styles from "../brand.module.css";

/**
 * Thước tầng: đọc trang tới đâu thì "lên tầng" tới đó. Cuộn từ đầu tới cuối trang, mốc đồng đi từ T01 (dưới) lên T36 (trên).
 * Cập nhật bằng ref + rAF (không render lại React). Reduced-motion vẫn cập nhật vì là thông tin, không phải chuyển động.
 */
export function FloorRuler() {
  const mark = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const upd = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (mark.current) mark.current.style.bottom = `${(p * 100).toFixed(2)}%`;
      const f = 1 + Math.round(p * 35);
      if (label.current) label.current.textContent = `T${String(f).padStart(2, "0")}`;
      root.current?.setAttribute("aria-valuenow", String(f));
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
    return () => { window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={root} className={styles.ruler} role="progressbar" aria-label="Vị trí đọc trang, tính theo tầng của toà tháp" aria-valuemin={1} aria-valuemax={36} aria-valuenow={1}>
      <div className={styles.rulerTrack} aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => <i key={i} />)}
        <div className={styles.rulerMark} ref={mark}><span ref={label}>T01</span></div>
      </div>
    </div>
  );
}
