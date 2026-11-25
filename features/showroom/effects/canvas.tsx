"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { clamp, markReady, observeInView, on, prefersReducedMotion, useFx } from "./core";

type Draw = (c: CanvasRenderingContext2D, w: number, h: number, t: number, dt: number) => void;

/**
 * Bộ chạy canvas dùng chung: DPR kẹp ≤ maxDpr, ResizeObserver, tạm dừng khi tab ẩn hoặc ra ngoài khung nhìn,
 * reduced-motion = vẽ đúng một khung tĩnh. Trả về hàm dọn (gỡ mọi listener/observer/rAF).
 */
function runCanvas(canvas: HTMLCanvasElement, opts: { maxDpr: number; init: (w: number, h: number) => void; draw: Draw }): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const reduced = prefersReducedMotion();
  let w = 0, h = 0, raf = 0, inView = true, last = 0, time = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, opts.maxDpr);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.max(1, Math.round(w * dpr)); canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    opts.init(w, h);
    if (reduced || !raf) frame(performance.now(), true);
  };
  function frame(now: number, once = false) {
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now; time += dt;
    ctx!.clearRect(0, 0, w, h);
    opts.draw(ctx!, w, h, time, dt);
    raf = 0;
    if (!once && !reduced && inView && !document.hidden) raf = requestAnimationFrame((n) => frame(n));
  }
  const sync = () => {
    if (reduced) return;
    if (inView && !document.hidden) { if (!raf) { last = 0; raf = requestAnimationFrame((n) => frame(n)); } }
    else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  const offs = [observeInView(canvas, (v) => { inView = v; sync(); }, { rootMargin: "50px" }), on(document, "visibilitychange", sync)];
  sync();
  return () => { offs.forEach((f) => f()); ro.disconnect(); if (raf) cancelAnimationFrame(raf); raf = 0; };
}

/* ------------------------------------------------------------------ 19. CanvasParticles */

export type CanvasParticlesProps = {
  mode?: "particles" | "bubbles" | "sparks";
  /** tối đa 60 */
  count?: number;
  /** CSS color; bỏ trống = màu chữ hiện tại (currentColor) của canvas */
  color?: string;
  /** hệ số tốc độ */
  speed?: number;
  maxDpr?: number;
  className?: string;
  style?: CSSProperties;
};

type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; ph: number };

export function CanvasParticles({ mode = "particles", count = 40, color, speed = 1, maxDpr = 2, className, style }: CanvasParticlesProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const n = clamp(Math.floor(count), 1, 60);
  useFx(ref, (cv) => {
    const ps: P[] = [];
    let col = color ?? "#888";
    const spawn = (p: P, w: number, h: number, initial: boolean) => {
      if (mode === "sparks") {
        p.x = w * (0.35 + Math.random() * 0.3); p.y = h * (0.9 + Math.random() * 0.1);
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.1, v = (80 + Math.random() * 200) * speed;
        p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v; p.r = 0.8 + Math.random() * 1.6; p.max = 0.8 + Math.random() * 1.2;
        p.life = initial ? Math.random() * p.max : 0;
      } else if (mode === "bubbles") {
        p.r = 4 + Math.random() * 14; p.x = Math.random() * w; p.y = initial ? Math.random() * h : h + p.r;
        p.vx = 0; p.vy = -(20 + Math.random() * 40) * speed * (1 - p.r / 40); p.ph = Math.random() * 6.28; p.life = 0; p.max = 1;
      } else {
        p.x = Math.random() * w; p.y = Math.random() * h; p.r = 0.8 + Math.random() * 2;
        p.vx = (Math.random() - 0.5) * 24 * speed; p.vy = (Math.random() - 0.5) * 24 * speed; p.ph = Math.random() * 6.28; p.life = 0; p.max = 1;
      }
    };
    const stop = runCanvas(cv, {
      maxDpr,
      init: (w, h) => {
        col = color ?? getComputedStyle(cv).color;
        ps.length = 0;
        for (let i = 0; i < n; i++) { const p = { x: 0, y: 0, vx: 0, vy: 0, r: 1, life: 0, max: 1, ph: 0 }; spawn(p, w, h, true); ps.push(p); }
      },
      draw: (c, w, h, t, dt) => {
        c.fillStyle = col; c.strokeStyle = col;
        for (const p of ps) {
          if (mode === "sparks") {
            p.life += dt; p.vy += 220 * dt * speed; p.x += p.vx * dt; p.y += p.vy * dt;
            if (p.life >= p.max || p.y > h + 20) spawn(p, w, h, false);
            c.globalAlpha = clamp(1 - p.life / p.max, 0, 1);
            c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
          } else if (mode === "bubbles") {
            p.y += p.vy * dt; p.x += Math.sin(t * 1.2 + p.ph) * 12 * dt;
            if (p.y < -p.r) spawn(p, w, h, false);
            c.globalAlpha = 0.5; c.lineWidth = 1.2;
            c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.stroke();
            c.globalAlpha = 0.25; c.beginPath(); c.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.2, 0, 6.283); c.fill();
          } else {
            p.x += p.vx * dt; p.y += p.vy * dt;
            if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
            if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
            c.globalAlpha = 0.35 + 0.35 * Math.sin(t * 1.5 + p.ph);
            c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
          }
        }
        c.globalAlpha = 1;
      },
    });
    markReady(cv, prefersReducedMotion() ? "static" : "1");
    return stop;
  }, [mode, n, color, speed, maxDpr]);
  return (
    <canvas
      ref={ref} aria-hidden="true" className={className} data-fx="CanvasParticles"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", ...style }}
    />
  );
}

/* ------------------------------------------------------------------ 20. AudioWaveVisualizer */

export type AudioWaveVisualizerProps = {
  bars?: number;
  /** đang "phát": biên độ cao; false: lặng dần */
  playing?: boolean;
  color?: string;
  mode?: "bars" | "line";
  height?: number;
  maxDpr?: number;
  className?: string;
  style?: CSSProperties;
};

/** Sóng âm giả lập (tổng các hàm sin + nhiễu mượt), không dùng micro, không dùng Web Audio. */
export function AudioWaveVisualizer({ bars = 48, playing = true, color, mode = "bars", height = 64, maxDpr = 2, className, style }: AudioWaveVisualizerProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const playRef = useRef(playing);
  useEffect(() => { playRef.current = playing; }, [playing]);
  useFx(ref, (cv) => {
    let col = color ?? "#888", amp = playRef.current ? 1 : 0.08;
    const phases = Array.from({ length: bars }, (_, i) => ({ a: (i * 1.7) % 6.28, b: (i * 0.53) % 6.28, f: 1.4 + ((i * 37) % 11) / 5 }));
    const stop = runCanvas(cv, {
      maxDpr,
      init: () => { col = color ?? getComputedStyle(cv).color; },
      draw: (c, w, h, t, dt) => {
        amp += ((playRef.current ? 1 : 0.08) - amp) * Math.min(1, dt * 5);
        c.fillStyle = col; c.strokeStyle = col; c.lineWidth = 2; c.lineCap = "round";
        const gap = w / bars, bw = Math.max(2, gap * 0.55);
        const val = (i: number) => {
          const p = phases[i], env = 0.55 + 0.45 * Math.sin((i / bars) * Math.PI);
          const v = 0.5 + 0.28 * Math.sin(t * p.f + p.a) + 0.22 * Math.sin(t * p.f * 2.3 + p.b);
          return clamp(v * env * amp, 0.04, 1);
        };
        if (mode === "line") {
          c.beginPath();
          for (let i = 0; i < bars; i++) { const x = i * gap + gap / 2, y = h / 2 + (val(i) - 0.5) * h * 0.9 * (i % 2 ? 1 : -1); if (i) c.lineTo(x, y); else c.moveTo(x, y); }
          c.stroke();
        } else {
          for (let i = 0; i < bars; i++) {
            const bh = Math.max(3, val(i) * h);
            c.beginPath(); c.roundRect(i * gap + (gap - bw) / 2, (h - bh) / 2, bw, bh, bw / 2); c.fill();
          }
        }
      },
    });
    markReady(cv, prefersReducedMotion() ? "static" : "1");
    return stop;
  }, [bars, color, mode, maxDpr]);
  return (
    <canvas
      ref={ref} aria-hidden="true" className={className} data-fx="AudioWaveVisualizer"
      style={{ display: "block", width: "100%", height, ...style }}
    />
  );
}
