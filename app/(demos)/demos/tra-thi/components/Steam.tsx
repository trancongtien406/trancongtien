"use client";

import { useEffect, useRef } from "react";

/**
 * Hơi nước canvas 2D: tối đa 26 hạt mềm (sprite radial) bốc lên từ miệng ấm, lắc ngang theo sin,
 * nở dần rồi tan. DPR <= 2, dừng khi tab ẩn / ra khỏi khung nhìn, reduced-motion = một khung tĩnh.
 * ox, oy: vị trí phát (% theo khung), spread: bề rộng phát (px).
 */
export function Steam({ ox = 50, oy = 60, spread = 26, count = 26, className }: { ox?: number; oy?: number; spread?: number; count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const N = coarse ? Math.min(count, 14) : count;
    let W = 0, H = 0, dpr = 1;
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 96;
    const sc = sprite.getContext("2d")!;
    const g = sc.createRadialGradient(48, 48, 0, 48, 48, 48);
    g.addColorStop(0, "rgba(231,224,210,0.55)");
    g.addColorStop(0.5, "rgba(231,224,210,0.16)");
    g.addColorStop(1, "rgba(231,224,210,0)");
    sc.fillStyle = g; sc.fillRect(0, 0, 96, 96);
    type P = { x: number; y: number; r: number; vy: number; ph: number; fq: number; amp: number; life: number; age: number };
    const ps: P[] = [];
    const spawn = (p?: P): P => {
      const n = p ?? ({} as P);
      n.x = (ox / 100) * W + (Math.random() - 0.5) * spread;
      n.y = (oy / 100) * H;
      n.r = 10 + Math.random() * 10;
      n.vy = 22 + Math.random() * 26;
      n.ph = Math.random() * 6.28; n.fq = 0.6 + Math.random() * 0.9; n.amp = 10 + Math.random() * 22;
      n.life = 3.2 + Math.random() * 2.6; n.age = 0;
      return n;
    };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < N; i++) { const p = spawn(); p.age = Math.random() * p.life; ps.push(p); }
    const draw = (dt: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        p.age += dt;
        if (p.age > p.life) spawn(p);
        const t = p.age / p.life;
        const y = p.y - p.age * p.vy * (1 + t * 0.4);
        const x = p.x + Math.sin(p.ph + p.age * p.fq) * p.amp * t;
        const r = p.r + t * 70;
        ctx.globalAlpha = Math.sin(Math.min(1, t) * Math.PI) * 0.85;
        ctx.drawImage(sprite, x - r, y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
    };
    if (reduce) { draw(0.1); for (let i = 0; i < 40; i++) draw(0.1); return; }
    let raf = 0, last = 0, vis = true, inView = true;
    const loop = (t: number) => {
      raf = 0;
      if (!vis || !inView) return;
      const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && vis && inView) { last = 0; raf = requestAnimationFrame(loop); } };
    const io = new IntersectionObserver((e) => { inView = e[0].isIntersecting; kick(); }, { threshold: 0 });
    io.observe(cv);
    const onVis = () => { vis = !document.hidden; kick(); };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(cv);
    kick();
    return () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [ox, oy, spread, count]);
  return <canvas ref={ref} className={className} aria-hidden="true" data-fx="Steam" />;
}
