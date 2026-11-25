"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/features/showroom/effects";

type P = { x: number; y: number; r: number; period: number; phase: number; cross: boolean; max: number };

/** mulberry32: hạt giống cố định để vị trí lấp lánh giống nhau giữa các lần tải (không lệch SSR/CSR vì chỉ vẽ trong canvas). */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Đá lấp lánh bằng canvas: ≤34 hạt (desktop), ≤12 (mobile), hạt 1–2px, chu kỳ 2–5s, một số có tia chữ thập nhỏ.
 * rAF chỉ chạy khi canvas trong khung nhìn và tab hiện; DPR ≤ 2; reduced-motion: một khung tĩnh.
 */
export function Sparkle({ className, seed = 7, desktop = 34, mobile = 12, color = "243,222,140" }: { className?: string; seed?: number; desktop?: number; mobile?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = prefersReducedMotion();
    const small = window.matchMedia("(max-width: 767px)").matches;
    const n = small ? mobile : desktop;
    const rand = rng(seed);
    const pts: P[] = Array.from({ length: n }, (_, i) => ({
      x: rand(),
      y: rand(),
      r: 1 + rand(),
      period: 2 + rand() * 3,
      phase: rand() * 5,
      cross: i % 5 === 0,
      max: 0.45 + rand() * 0.35,
    }));
    let w = 0;
    let h = 0;
    let dpr = 1;
    const fit = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const k = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(((t / 1000 + p.phase) / p.period) * Math.PI * 2);
        const a = 0.15 + (p.max - 0.15) * k * k;
        const x = p.x * w;
        const y = p.y * h;
        ctx.fillStyle = `rgba(${color},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r * (0.7 + 0.5 * k), 0, Math.PI * 2);
        ctx.fill();
        if (p.cross && k > 0.55) {
          const L = 5 + 6 * k;
          ctx.strokeStyle = `rgba(${color},${(a * 0.8).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x - L, y);
          ctx.lineTo(x + L, y);
          ctx.moveTo(x, y - L);
          ctx.lineTo(x, y + L);
          ctx.stroke();
        }
      }
    };
    fit();
    if (reduced) {
      draw(0);
      return;
    }
    let raf = 0;
    let visible = false;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const should = visible && !document.hidden;
      if (should && !raf) raf = requestAnimationFrame(loop);
      else if (!should && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver((es) => {
      visible = es.some((e) => e.isIntersecting);
      sync();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      fit();
      if (!raf) draw(performance.now());
    });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [seed, desktop, mobile, color]);
  return <canvas ref={ref} className={className} aria-hidden="true" data-fx="GemSparkle" />;
}
