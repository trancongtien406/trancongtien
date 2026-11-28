"use client";
import { useEffect, useRef } from "react";

/**
 * Tia sét plasma canvas 2D: hai tia từ hai mép chạy vào, vặn xoắn rồi khép thành hình mắt, sau đó mờ đi.
 * Gọi onDone khi xong để hiện chữ. Dừng render khi ngoài khung nhìn.
 */
export function Plasma({ onDone, skip }: { onDone: () => void; skip: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (skip) { doneRef.current(); return; }
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const DUR = 3.6;
    let raf = 0, start = 0, finished = false, visible = true;
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    const rnd = (n: number) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };
    const noise = (x: number, t: number) => Math.sin(x * 9 + t * 7) * 0.5 + Math.sin(x * 23 - t * 11) * 0.3 + Math.sin(x * 51 + t * 17) * 0.2;

    /** y của tia số k (0..1 phía trên, 2..3 phía dưới) tại u in [0,1] */
    const pt = (u: number, k: number, t: number, conv: number) => {
      const cx = w / 2, cy = h * 0.5;
      const x = w * (0.04 + 0.92 * u);
      const lens = Math.sin(Math.PI * u) * h * 0.2;
      const dir = k < 2 ? -1 : 1;
      const wob = (1 - conv) * (Math.sin(u * 5 + t * 1.6 + k) * h * 0.22);
      const jit = noise(u + k * 0.37, t) * (h * 0.018) * (0.4 + 0.6 * Math.sin(Math.PI * u));
      const cross = (1 - conv) * Math.sin(u * 3.2 + k) * h * 0.08;
      return [x, cy + dir * lens * conv + wob * (k % 2 ? -1 : 1) + jit + cross, cx] as const;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!start) start = now;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      const grow = Math.min(1, t / 1.5);
      const conv = Math.min(1, Math.max(0, (t - 0.8) / 1.7));
      const fade = t > 2.7 ? Math.max(0, 1 - (t - 2.7) / 0.9) : 1;
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < 4; k++) {
        const fromRight = k % 2 === 1;
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          const N = 90;
          const reach = grow * (1 + 0.02);
          let hx = 0, hy = 0;
          for (let i = 0; i <= N; i++) {
            const u = i / N; if (u > reach) break;
            const uu = fromRight ? 1 - u : u;
            const [x, y] = pt(uu, k, t + layer * 0.07, conv);
            const jy = (rnd(i + k * 7 + layer * 3 + Math.floor(t * 24)) - 0.5) * (layer === 0 ? 5 : 2.2);
            if (i === 0) ctx.moveTo(x, y + jy); else ctx.lineTo(x, y + jy);
            hx = x; hy = y;
          }
          ctx.lineJoin = "round"; ctx.lineCap = "round";
          const a = fade * (layer === 0 ? 0.28 : layer === 1 ? 0.7 : 1);
          ctx.strokeStyle = layer === 2 ? `rgba(235,252,255,${a})` : `rgba(70,200,255,${a})`;
          ctx.lineWidth = layer === 0 ? 9 : layer === 1 ? 3.2 : 1.3;
          ctx.shadowColor = "rgba(60,190,255,.9)"; ctx.shadowBlur = layer === 0 ? 26 : 12;
          ctx.stroke();
          if (layer === 2 && grow < 1) {
            ctx.beginPath(); ctx.arc(hx, hy, 5, 0, 6.3); ctx.fillStyle = `rgba(255,255,255,${fade})`; ctx.shadowBlur = 30; ctx.fill();
          }
        }
      }
      // nhánh phụ tách ra từ tia chính, nhấp nháy theo thời gian
      const tick = Math.floor(t * 12);
      for (let b = 0; b < 14; b++) {
        const k = b % 4, u0 = rnd(b * 5.3 + tick * 0.31) * grow * 0.96 + 0.02;
        const dirn = rnd(b * 2.1 + Math.floor(tick / 2)) > 0.5 ? 1 : -1;
        const [bx, by] = pt(k % 2 ? 1 - u0 : u0, k, t, conv);
        ctx.beginPath(); ctx.moveTo(bx, by);
        let x = bx, y = by;
        const len = 5 + Math.floor(rnd(b + tick) * 9);
        for (let i = 0; i < len; i++) { x += (rnd(b * 7 + i + tick) - 0.3) * 16 * dirn; y += (rnd(b * 3 + i * 1.7 + tick) - 0.5) * 22 * (1 + conv); ctx.lineTo(x, y); }
        const ba = fade * (0.35 + 0.5 * rnd(b + tick));
        ctx.strokeStyle = `rgba(150,225,255,${ba})`; ctx.lineWidth = 1; ctx.shadowColor = "rgba(60,190,255,.9)"; ctx.shadowBlur = 10; ctx.stroke();
      }
      // bloom: chồng bản mờ của chính khung hình lên chính nó
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.9; ctx.filter = "blur(14px)"; ctx.drawImage(cv, 0, 0, w, h); ctx.filter = "blur(4px)"; ctx.globalAlpha = 0.6; ctx.drawImage(cv, 0, 0, w, h);
      ctx.filter = "none"; ctx.globalAlpha = 1;
      for (let i = 0; i < 36; i++) { // tia lửa nhỏ
        const k = i % 4, u = rnd(i * 3.1 + Math.floor(t * 8)) * grow;
        const [x, y] = pt(k % 2 ? 1 - u : u, k, t, conv);
        ctx.fillStyle = `rgba(160,230,255,${fade * 0.6 * rnd(i + t)})`;
        ctx.fillRect(x + (rnd(i * 9 + t) - 0.5) * 30, y + (rnd(i * 5 + t) - 0.5) * 30, 1.6, 1.6);
      }
      if (t > 2.3 && !finished) { finished = true; doneRef.current(); }
      if (t > DUR) { cancelAnimationFrame(raf); ctx.clearRect(0, 0, w, h); }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, [skip]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }} aria-hidden="true" />;
}
