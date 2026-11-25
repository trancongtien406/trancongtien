"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#FF5E86", "#4FC79A", "#FFC933", "#8E6BFF", "#FFFFFF", "#FF9B54", "#46251A"];

type P = { x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; c: string; w: number; h: number; burst: boolean; life: number; dot: boolean };

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function draw(ctx: CanvasRenderingContext2D, p: P) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.burst ? Math.max(0, Math.min(1, p.life / 40)) : 1;
  ctx.fillStyle = p.c;
  if (p.dot) {
    ctx.beginPath();
    ctx.arc(0, 0, p.h * 0.9, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const r = p.h / 2;
    ctx.beginPath();
    ctx.moveTo(-p.w / 2 + r, -r);
    ctx.lineTo(p.w / 2 - r, -r);
    ctx.arc(p.w / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(-p.w / 2 + r, r);
    ctx.arc(-p.w / 2 + r, 0, r, Math.PI / 2, (Math.PI * 3) / 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Cốm (sprinkles) rơi chậm trong khối cha `position:relative`. Con trỏ đẩy cốm ra xa,
 * bấm/chạm vào vùng cha thì bung thêm một đợt. Dừng khi ngoài khung hoặc tab ẩn.
 * Reduced-motion: vẽ một khung tĩnh. Cảm ứng: ít hạt hơn.
 */
export function SprinkleRain({ count = 46, className }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const n = coarse ? Math.round(count * 0.55) : count;
    let w = 0, h = 0, dpr = 1;
    const ps: P[] = [];
    const mk = (initial: boolean): P => {
      const dot = Math.random() < 0.22;
      return { x: Math.random() * w, y: initial ? Math.random() * h : -20, vx: (Math.random() - 0.5) * 0.3, vy: 0.35 + Math.random() * 0.7, r: 0, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.04, c: COLORS[Math.floor(Math.random() * COLORS.length)], w: 14 + Math.random() * 8, h: 5 + Math.random() * 2, burst: false, life: 0, dot };
    };
    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < n; i++) ps.push(mk(true));
    if (reduced()) {
      ps.forEach((p) => draw(ctx, p));
      return;
    }
    let mx = -999, my = -999, raf = 0, visible = true, running = false;
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / 110) * 2.2;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f * 0.6;
        }
        p.vx *= p.burst ? 0.985 : 0.96;
        p.vy = p.burst ? p.vy + 0.16 : p.vy + (0.55 - p.vy) * 0.04;
        p.x += p.vx + Math.sin((p.y + i * 40) / 60) * 0.25 * (p.burst ? 0 : 1);
        p.y += p.vy; p.rot += p.vr;
        if (p.burst) { p.life -= 1; if (p.life <= 0 || p.y > h + 20) { ps.splice(i, 1); continue; } }
        else if (p.y > h + 20) Object.assign(p, mk(false));
        if (p.x < -30) p.x = w + 20; else if (p.x > w + 30) p.x = -20;
        draw(ctx, p);
      }
      raf = visible && !document.hidden ? requestAnimationFrame(step) : 0;
      if (!raf) running = false;
    };
    const start = () => { if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(step); } };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 });
    io.observe(host);
    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const onLeave = () => { mx = my = -999; };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button,input,select,textarea,[data-sticker]")) return;
      const r = host.getBoundingClientRect();
      const bx = e.clientX - r.left, by = e.clientY - r.top;
      for (let i = 0; i < 26; i++) {
        const a = Math.random() * Math.PI * 2, s = 2 + Math.random() * 5;
        const p = mk(false);
        Object.assign(p, { x: bx, y: by, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, burst: true, life: 90 + Math.random() * 50 });
        ps.push(p);
      }
      start();
    };
    const onVis = () => start();
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(host);
    start();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count]);
  return <canvas ref={ref} className={className} aria-hidden="true" data-fx="SprinkleRain" />;
}

/**
 * Canvas toàn màn hình (pointer-events:none), nghe sự kiện `mk-burst` {x,y,n} để bung confetti.
 * Dùng cho nút "Thả confetti", hoàn tất Cake Builder, CTA cuối trang.
 */
export function ConfettiBurst() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    let w = 0, h = 0, raf = 0;
    const ps: P[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.vx *= 0.985; p.vy += 0.2; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 1;
        if (p.life <= 0 || p.y > h + 30) { ps.splice(i, 1); continue; }
        draw(ctx, p);
      }
      raf = ps.length ? requestAnimationFrame(step) : 0;
      if (!raf) ctx.clearRect(0, 0, w, h);
    };
    const onBurst = (e: Event) => {
      if (reduced()) return;
      const d = (e as CustomEvent<{ x: number; y: number; n?: number }>).detail;
      const n = Math.min(d.n ?? 60, 90);
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4, s = 5 + Math.random() * 9;
        ps.push({ x: d.x, y: d.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 0, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: COLORS[Math.floor(Math.random() * COLORS.length)], w: 12 + Math.random() * 8, h: 5 + Math.random() * 2.5, burst: true, life: 80 + Math.random() * 60, dot: Math.random() < 0.25 });
      }
      if (!raf) raf = requestAnimationFrame(step);
    };
    window.addEventListener("mk-burst", onBurst);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mk-burst", onBurst); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" data-fx="ConfettiBurst" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 60 }} />;
}

export function burstAt(el: Element | null, n = 70) {
  const r = el?.getBoundingClientRect();
  const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
  const y = r ? r.top + r.height / 2 : window.innerHeight / 2;
  window.dispatchEvent(new CustomEvent("mk-burst", { detail: { x, y, n } }));
}
