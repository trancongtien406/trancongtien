"use client";

import { useRef } from "react";
import { clamp, markReady, observeInView, on, prefersReducedMotion, useFx } from "@/features/showroom/effects";

type P = { x: number; y: number; vx: number; vy: number; r: number; age: number; max: number; c: number };
const COLORS = ["#ff7a1a", "#ffb15e", "#ffd08a"];

/**
 * Hạt tàn lửa canvas. Hạt tái sử dụng (pool cố định), 70 hạt desktop / 26 hạt mobile, DPR ≤ 1.5,
 * gió biến thiên chậm, một vòng rAF duy nhất, tự dừng khi ngoài khung hoặc tab ẩn. Reduced-motion: một khung tĩnh.
 * originX/originY: vị trí nguồn lửa theo tỉ lệ khung (0..1); spread: độ rộng nguồn theo tỉ lệ chiều rộng.
 */
export function Embers({ originX = 0.5, originY = 0.92, spread = 0.1, className, desktop = 70, mobile = 26, lift = 1 }: {
  originX?: number; originY?: number; spread?: number; className?: string; desktop?: number; mobile?: number; lift?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useFx(ref, (cv) => {
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = prefersReducedMotion();
    let w = 0, h = 0, raf = 0, last = 0, time = 0, inView = false, wind = 0;
    const pool: P[] = [];
    const spawn = (p: P, initial: boolean) => {
      p.max = 1.5 + Math.random() * 3;
      p.age = initial ? Math.random() * p.max : 0;
      p.x = w * (originX + (Math.random() - 0.5) * spread * 2);
      p.y = h * originY - Math.random() * h * 0.04;
      p.vx = (Math.random() - 0.4) * 36;
      p.vy = -(18 + Math.random() * 56) * lift;
      p.r = 1 + Math.random() * 2.5;
      p.c = Math.floor(Math.random() * COLORS.length);
      if (initial) { p.x += p.vx * p.age; p.y += p.vy * p.age; }
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.max(1, Math.round(w * dpr)); cv.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 768 ? mobile : desktop;
      pool.length = 0;
      for (let i = 0; i < n; i++) { const p = { x: 0, y: 0, vx: 0, vy: 0, r: 1, age: 0, max: 1, c: 0 }; spawn(p, true); pool.push(p); }
      draw(0);
    };
    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      wind = Math.sin(time * 0.35) * 14 + Math.sin(time * 0.13 + 1.7) * 8;
      for (const p of pool) {
        p.age += dt;
        if (p.age >= p.max) spawn(p, false);
        p.vx += (wind - p.vx) * 0.4 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        const a = Math.sin(Math.PI * (p.age / p.max)) * 0.85;
        ctx.globalAlpha = clamp(a, 0, 1);
        ctx.fillStyle = COLORS[p.c];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
    };
    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now; time += dt;
      draw(dt);
      raf = inView && !document.hidden ? requestAnimationFrame(frame) : 0;
    };
    const sync = () => {
      if (reduced) return;
      if (inView && !document.hidden) { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    const offs = [observeInView(cv, (v) => { inView = v; sync(); }, { rootMargin: "60px" }), on(document, "visibilitychange", sync)];
    markReady(cv, reduced ? "static" : "1");
    return () => { offs.forEach((f) => f()); ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [originX, originY, spread, desktop, mobile, lift]);
  return <canvas ref={ref} className={className} aria-hidden="true" data-fx="Embers" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
