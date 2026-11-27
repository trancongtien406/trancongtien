"use client";

import { useEffect, useRef } from "react";
import styles from "../brand.module.css";

/** Trường chấm canvas 2D: chấm bị đẩy ra và phình lên quanh con trỏ (lò xo), chỉ vẽ khi trong khung nhìn. */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = 30;
    type D = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };
    let dots: D[] = [];
    let w = 0, h = 0, dpr = 1;
    const mouse = { x: -999, y: -999 };
    let raf = 0, visible = true;
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let x = gap / 2; x < w; x += gap) for (let y = gap / 2; y < h; y += gap) dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
      draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0) { const f = (1 - dist / 150) * 4; d.vx += (dx / dist) * f; d.vy += (dy / dist) * f; }
        d.vx += (d.ox - d.x) * 0.06; d.vy += (d.oy - d.y) * 0.06;
        d.vx *= 0.86; d.vy *= 0.86; d.x += d.vx; d.y += d.vy;
        const near = Math.max(0, 1 - dist / 170);
        ctx.fillStyle = near > 0.02 ? "#e8ff47" : "rgba(255,255,255,.35)";
        ctx.beginPath(); ctx.arc(d.x, d.y, 1.6 + near * 5, 0, 6.2832); ctx.fill();
      }
    };
    const loop = () => { draw(); if (visible) raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = mouse.y = -999; };
    size();
    const ro = new ResizeObserver(size); ro.observe(cv);
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      cv.addEventListener("pointermove", move); cv.addEventListener("pointerleave", leave);
      io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(loop); });
      io.observe(cv);
    }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io?.disconnect(); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerleave", leave); };
  }, []);
  return <canvas ref={ref} className={styles.dotCanvas} role="img" aria-label="Trường chấm tương tác: di chuột để đẩy các chấm ra" />;
}
