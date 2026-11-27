"use client";

import { useEffect, useRef } from "react";

type Variant = "dusk" | "neon";

/** Cảnh phim vẽ procedural bằng canvas 2D (thay video). Chỉ chạy rAF khi trong khung và tab hiện; reduced-motion vẽ một khung tĩnh. */
export function FilmCanvas({ variant, className }: { variant: Variant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const t0 = performance.now();
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const dust = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: rnd(0.6, 2), s: rnd(0.004, 0.02), p: Math.random() * 6 }));
    const bokeh = Array.from({ length: 34 }, () => ({ x: Math.random(), y: Math.random(), r: rnd(0.02, 0.09), s: rnd(0.01, 0.04), a: rnd(0.12, 0.5), c: Math.random() < 0.6 ? "217,181,109" : Math.random() < 0.5 ? "255,236,200" : "232,232,232" }));
    const wins = Array.from({ length: 160 }, () => ({ x: Math.random(), y: rnd(0.55, 0.95), on: Math.random(), f: rnd(0.2, 1.2) }));

    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.max(2, Math.round(r.width * dpr));
      h = Math.max(2, Math.round(r.height * dpr));
      cv.width = w; cv.height = h;
      draw(reduce ? 4 : (performance.now() - t0) / 1000);
    };

    const ridge = (t: number, k: number, amp: number, base: number, speed: number, seed: number) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) {
        const u = x / w + t * speed;
        const y = base - (Math.sin(u * 5 + seed) * 0.5 + Math.sin(u * 11 + seed * 2) * 0.28 + Math.sin(u * 23 + seed * 3) * 0.12) * amp * h * k;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
    };

    function draw(t: number) {
      ctx!.globalCompositeOperation = "source-over";
      if (variant === "dusk") {
        const g = ctx!.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "#050505"); g.addColorStop(0.35, "#1a120b"); g.addColorStop(0.62, "#6b4a26"); g.addColorStop(0.72, "#d9b56d"); g.addColorStop(1, "#2a1c10");
        ctx!.fillStyle = g; ctx!.fillRect(0, 0, w, h);
        const sx = w * (0.58 + Math.sin(t * 0.07) * 0.06), sy = h * 0.66;
        const sg = ctx!.createRadialGradient(sx, sy, 0, sx, sy, h * 0.7);
        sg.addColorStop(0, "rgba(255,240,200,.95)"); sg.addColorStop(0.08, "rgba(255,220,150,.6)"); sg.addColorStop(0.4, "rgba(217,181,109,.18)"); sg.addColorStop(1, "rgba(217,181,109,0)");
        ctx!.globalCompositeOperation = "lighter"; ctx!.fillStyle = sg; ctx!.fillRect(0, 0, w, h);
        ctx!.fillStyle = "rgba(255,230,170,.35)"; ctx!.fillRect(0, sy - 1.5, w, 3); // anamorphic streak
        ctx!.fillStyle = "rgba(255,230,170,.12)"; ctx!.fillRect(w * 0.1, sy - 8, w * 0.8, 16);
        ctx!.globalCompositeOperation = "source-over";
        const cols = ["#5a3d20", "#2d1f12", "#120c07", "#050505"];
        cols.forEach((c, i) => {
          ridge(t, i, 0.16 + i * 0.03, h * (0.74 + i * 0.07), 0.006 + i * 0.006, i * 1.7);
          ctx!.fillStyle = c; ctx!.fill();
        });
        const hz = ctx!.createLinearGradient(0, h * 0.62, 0, h * 0.9);
        hz.addColorStop(0, "rgba(217,181,109,0)"); hz.addColorStop(0.5, "rgba(217,181,109,.16)"); hz.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = hz; ctx!.fillRect(0, h * 0.62, w, h * 0.3);
      } else {
        ctx!.fillStyle = "#070707"; ctx!.fillRect(0, 0, w, h);
        const bg = ctx!.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, "#0a0a0a"); bg.addColorStop(0.6, "#1b1409"); bg.addColorStop(1, "#050505");
        ctx!.fillStyle = bg; ctx!.fillRect(0, 0, w, h);
        // đường phố mờ: các toà nhà + cửa sổ nhấp nháy
        let x = 0, i = 0;
        ctx!.fillStyle = "#0e0b07";
        while (x < w) { const bw = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * 90 + 50; const bh = (0.25 + (((Math.sin(i * 78.233) * 12345.678) % 1 + 1) % 1) * 0.35) * h; ctx!.fillRect(x, h - bh, bw * (w / 1400 + 0.4), bh); x += bw * (w / 1400 + 0.4) + 6; i++; }
        wins.forEach((p) => {
          const on = Math.sin(t * p.f + p.on * 40) > -0.3;
          if (on) { ctx!.fillStyle = `rgba(217,181,109,${0.25 + p.on * 0.35})`; ctx!.fillRect(p.x * w, p.y * h, 3 + w / 400, 5 + w / 300); }
        });
        ctx!.globalCompositeOperation = "lighter";
        bokeh.forEach((b) => {
          const bx = ((b.x + t * b.s * 0.3) % 1.2 - 0.1) * w;
          const by = (((b.y - t * b.s * 0.2) % 1) + 1) % 1 * h;
          const r = b.r * Math.min(w, h);
          const gg = ctx!.createRadialGradient(bx, by, 0, bx, by, r);
          gg.addColorStop(0, `rgba(${b.c},${b.a})`); gg.addColorStop(0.8, `rgba(${b.c},${b.a * 0.55})`); gg.addColorStop(1, `rgba(${b.c},0)`);
          ctx!.fillStyle = gg; ctx!.beginPath(); ctx!.arc(bx, by, r, 0, 6.2832); ctx!.fill();
        });
        const ay = h * (0.5 + Math.sin(t * 0.3) * 0.03);
        ctx!.fillStyle = "rgba(255,236,190,.22)"; ctx!.fillRect(0, ay - 1, w, 2);
        ctx!.globalCompositeOperation = "source-over";
      }
      // hạt bụi
      ctx!.fillStyle = "rgba(255,240,210,.5)";
      dust.forEach((d) => {
        const dx = ((d.x + t * d.s * 0.4) % 1) * w, dy = (((d.y - t * d.s) % 1) + 1) % 1 * h;
        ctx!.globalAlpha = 0.25 + 0.35 * Math.sin(t + d.p) ** 2;
        ctx!.beginPath(); ctx!.arc(dx, dy, d.r * (w / 900 + 0.5), 0, 6.2832); ctx!.fill();
      });
      ctx!.globalAlpha = 1;
      const vg = ctx!.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
      vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,.72)");
      ctx!.fillStyle = vg; ctx!.fillRect(0, 0, w, h);
    }

    const loop = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw((performance.now() - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && visible && !reduce) raf = requestAnimationFrame(loop); };
    const ro = new ResizeObserver(resize); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { threshold: 0 });
    io.observe(cv);
    const vis = () => kick();
    document.addEventListener("visibilitychange", vis);
    resize(); kick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, [variant]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
