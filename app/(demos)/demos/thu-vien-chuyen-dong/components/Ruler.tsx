"use client";
import { useEffect, useRef } from "react";
import styles from "../brand.module.css";

/** Thước vạch ở mép phải: đoạn vạch đậm trượt theo tiến độ cuộn trang. */
export function Ruler() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const upd = () => {
      raf = 0;
      const d = document.documentElement;
      const p = d.scrollTop / Math.max(1, d.scrollHeight - window.innerHeight);
      if (el.current) el.current.style.transform = `translateY(${p * (window.innerHeight - el.current.offsetHeight)}px)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return <div className={styles.ruler} aria-hidden="true"><div ref={el} className={styles.rulerThumb} /></div>;
}
