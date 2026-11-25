"use client";

import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/features/showroom/effects";

type Petal = { x: number; y: number; z: number; s: number; vy: number; rot: number; vr: number; a: number; c: number; sway: number; ph: number };

const COLORS = ["223,143,169", "229,83,45", "243,237,223", "242,184,200"];

/**
 * Cánh hoa rơi trên canvas toàn trang. Rơi chậm khi đứng yên, gió thổi ngang theo vận tốc cuộn
 * (cuộn xuống: sang phải, cuộn lên: sang trái, có làm mượt). 38 cánh trên desktop, 14 trên điện thoại.
 * Dừng khi tab ẩn; không dựng khi reduced-motion.
 */
export function PetalRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [off, setOff] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) setOff(true);
  }, []);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || prefersReducedMotion()) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const mobile = !hasFinePointer() || window.innerWidth < 760;
    const count = mobile ? 14 : 38;
    let w = 0, h = 0, dpr = 1;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const make = (initial: boolean): Petal => ({
      x: rnd(0, w || 1000), y: initial ? rnd(-100, h || 800) : rnd(-60, -10), z: rnd(0, 1), s: rnd(5, 17),
      vy: rnd(0.25, 1.0), rot: rnd(0, 6.28), vr: rnd(0.003, 0.018) * (Math.random() < 0.5 ? -1 : 1), a: rnd(0.25, 0.7),
      c: Math.floor(rnd(0, COLORS.length)), sway: rnd(0.2, 0.9), ph: rnd(0, 6.28),
    });
    let petals: Petal[] = [];
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!petals.length) petals = Array.from({ length: count }, () => make(true));
    };
    resize();
    let lastY = window.scrollY, vel = 0, wind = 0, raf = 0, last = performance.now(), run = true;
    const onScroll = () => {
      const y = window.scrollY;
      vel = y - lastY; lastY = y;
    };
    const draw = (p: Petal) => {
      const r = p.s;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.a * (0.55 + p.z * 0.45);
      ctx.fillStyle = `rgb(${COLORS[p.c]})`;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.95, -r * 0.55, r * 0.8, r * 0.7, 0, r);
      ctx.bezierCurveTo(-r * 0.8, r * 0.7, -r * 0.95, -r * 0.55, 0, -r);
      ctx.fill();
      ctx.restore();
    };
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((t - last) / 16.67, 3);
      last = t;
      const target = Math.max(-6, Math.min(6, vel * 0.09));
      vel *= 0.86;
      wind += (target - wind) * 0.06 * dt;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.ph += 0.01 * dt;
        p.y += (p.vy + Math.abs(wind) * 0.35 * (0.4 + p.z)) * dt * (0.5 + p.z * 0.6);
        p.x += (0.28 + Math.sin(p.ph) * p.sway * 0.5 + wind * (0.5 + p.z)) * dt;
        p.rot += (p.vr + wind * 0.004) * dt;
        if (p.y - p.s > h || p.x - p.s > w + 40 || p.x + p.s < -60) {
          Object.assign(p, make(false));
          if (wind > 0.5) p.x = rnd(-60, w * 0.6);
          else if (wind < -0.5) p.x = rnd(w * 0.4, w + 40);
        }
        draw(p);
      }
    };
    const start = () => { if (!raf && run) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const onVis = () => (document.hidden ? stop() : start());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    start();
    cv.dataset.ready = "1";
    return () => {
      run = false; stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [off]);

  if (off) return null;
  return <canvas ref={ref} aria-hidden="true" data-fx="PetalRain" style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none" }} />;
}
