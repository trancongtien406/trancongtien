"use client";

import { useEffect, useRef } from "react";
import styles from "../brand.module.css";

/** Bong bóng và "tuyết biển" bay lên: canvas 2D cố định, tự dừng khi tab ẩn. */
export function Bubbles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    type B = { x: number; y: number; r: number; v: number; ph: number };
    let bs: B[] = [];
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 700 ? 22 : 46;
      bs = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 1.5 + Math.random() * 6, v: 0.25 + Math.random() * 0.9, ph: Math.random() * 6.28 }));
      draw(0);
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const b of bs) {
        const x = b.x + Math.sin(t / 1400 + b.ph) * 12;
        ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, 6.2832);
        ctx.strokeStyle = `rgba(184,245,236,${0.1 + b.r / 24})`; ctx.lineWidth = 1; ctx.stroke();
        if (b.r > 4) { ctx.beginPath(); ctx.arc(x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.2, 0, 6.2832); ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.fill(); }
      }
    };
    const loop = (t: number) => { for (const b of bs) { b.y -= b.v; if (b.y < -10) { b.y = h + 10; b.x = Math.random() * w; } } draw(t); raf = requestAnimationFrame(loop); };
    size();
    addEventListener("resize", size);
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(loop); };
    document.addEventListener("visibilitychange", vis);
    vis();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return <canvas ref={ref} className={styles.bubbles} aria-hidden="true" />;
}
