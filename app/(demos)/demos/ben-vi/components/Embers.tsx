"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; ph: number };

/**
 * Hơi nóng bếp lửa (chữ ký Bến Vị): tàn lửa bay lên từ đáy khung, lắc theo gió nhẹ, tắt dần; kèm quầng nóng ở đáy.
 * Canvas tự dừng khi ngoài khung hoặc tab ẩn; reduced-motion chỉ vẽ một khung tĩnh. Ít hạt hơn trên màn hình nhỏ.
 */
export function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const host = cv.parentElement as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = false, last = 0;
    const parts: P[] = [];
    const count = () => (window.innerWidth < 700 ? 22 : 46);
    const spawn = (initial: boolean): P => {
      const max = 3 + Math.random() * 4;
      return { x: Math.random() * w, y: initial ? h * (0.45 + Math.random() * 0.55) : h + 8, vx: (Math.random() - 0.5) * 14, vy: -(26 + Math.random() * 46), r: 0.8 + Math.random() * 2.2, life: initial ? Math.random() * max : 0, max, ph: Math.random() * 6.28 };
    };
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = host.clientWidth; h = host.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      while (parts.length < count()) parts.push(spawn(true));
      parts.length = Math.min(parts.length, count());
    };
    const glow = () => {
      const g = ctx.createLinearGradient(0, h, 0, h * 0.35);
      g.addColorStop(0, "rgba(229,104,59,0.34)");
      g.addColorStop(0.5, "rgba(226,186,121,0.08)");
      g.addColorStop(1, "rgba(226,186,121,0)");
      ctx.fillStyle = g; ctx.fillRect(0, h * 0.35, w, h * 0.65);
    };
    const draw = (dt: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      glow();
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.life += dt; p.x += (p.vx + Math.sin(t * 1.3 + p.ph) * 12) * dt; p.y += p.vy * dt;
        if (p.life > p.max || p.y < -10) { parts[i] = spawn(false); continue; }
        const k = 1 - p.life / p.max;
        const a = Math.max(0, k) * (0.55 + 0.45 * Math.sin(t * 9 + p.ph));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${240 - (1 - k) * 40},${150 + k * 60},${70 + k * 40},${a.toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r * (0.5 + k * 0.7), 0, 6.283);
        ctx.fill();
      }
    };
    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      draw(dt, now / 1000);
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf && visible && !document.hidden && !reduce) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    resize();
    if (reduce) draw(0, 0);
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) start(); }, { threshold: 0 });
    io.observe(host);
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0, 0); });
    ro.observe(host);
    const vis = () => start();
    document.addEventListener("visibilitychange", vis);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
