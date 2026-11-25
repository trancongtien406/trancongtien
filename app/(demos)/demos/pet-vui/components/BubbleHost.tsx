"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/features/showroom/effects";
import s from "../brand.module.css";

type B = { x: number; y: number; r: number; vy: number; ph: number; w: number; age: number; life: number };

/**
 * Bọt xà phòng canvas: khi rê chuột / focus bàn phím / chạm vào khối, bong bóng nổi lên từ đáy khối, lắc nhẹ rồi vỡ.
 * Chỉ chạy rAF khi còn bong bóng; tối đa 16 bong bóng; DPR tối đa 2; reduced-motion thì dùng bọt tĩnh bằng CSS.
 */
export function BubbleHost({ children, className, color = "#ffffff" }: { children: ReactNode; className?: string; color?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const h = host.current, c = cv.current;
    if (!h || !c || prefersReducedMotion()) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = 0, ht = 0, dpr = 1, raf = 0, last = 0, active = false, spawnAcc = 0, px = 0.5;
    const list: B[] = [];
    const size = () => {
      const r = h.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; ht = r.height;
      c.width = Math.round(w * dpr); c.height = Math.round(ht * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(size);
    ro.observe(h);
    size();
    const spawn = (n = 1) => {
      for (let i = 0; i < n && list.length < 16; i++) {
        const r = 6 + Math.random() * 14;
        list.push({ x: (px + (Math.random() - 0.5) * 0.5) * w, y: ht - 10 - Math.random() * 20, r, vy: 45 + Math.random() * 55, ph: Math.random() * 6.28, w: 8 + Math.random() * 10, age: 0, life: 1.6 + Math.random() * 0.9 });
      }
    };
    const draw = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      if (active) { spawnAcc += dt; while (spawnAcc > 0.11) { spawn(); spawnAcc -= 0.11; } }
      ctx.clearRect(0, 0, w, ht);
      for (let i = list.length - 1; i >= 0; i--) {
        const b = list[i];
        b.age += dt; b.y -= b.vy * dt; b.ph += dt * 3;
        const k = b.age / b.life;
        if (k >= 1) { list.splice(i, 1); continue; }
        const x = b.x + Math.sin(b.ph) * b.w;
        const pop = k > 0.85 ? (k - 0.85) / 0.15 : 0;
        ctx.globalAlpha = 1 - pop * 0.9;
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#14121a";
        ctx.fillStyle = color;
        const rr = b.r * (1 + pop * 0.5);
        ctx.beginPath(); ctx.arc(x, b.y, rr, 0, 6.2832);
        if (!pop) { ctx.globalAlpha = 0.28; ctx.fill(); ctx.globalAlpha = 1; }
        ctx.stroke();
        if (!pop) { ctx.beginPath(); ctx.lineWidth = 2.5; ctx.strokeStyle = "#ffffff"; ctx.arc(x, b.y, rr * 0.62, 3.6, 4.6); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      if (active || list.length) raf = requestAnimationFrame(draw);
      else { raf = 0; ctx.clearRect(0, 0, w, ht); }
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(draw); } };
    const enter = (e: PointerEvent) => { if (e.pointerType === "touch") { px = 0.2 + Math.random() * 0.6; spawn(6); start(); return; } active = true; start(); };
    const leave = () => { active = false; };
    const move = (e: PointerEvent) => { const r = h.getBoundingClientRect(); px = (e.clientX - r.left) / Math.max(1, r.width); };
    const fin = () => { px = 0.5; active = true; start(); };
    const fout = () => { active = false; };
    const fine = hasFinePointer();
    h.addEventListener("pointerenter", enter);
    h.addEventListener("pointerleave", leave);
    if (fine) h.addEventListener("pointermove", move, { passive: true });
    h.addEventListener("focusin", fin);
    h.addEventListener("focusout", fout);
    const vis = () => { if (document.hidden) { active = false; list.length = 0; } };
    document.addEventListener("visibilitychange", vis);
    return () => {
      ro.disconnect(); cancelAnimationFrame(raf);
      h.removeEventListener("pointerenter", enter); h.removeEventListener("pointerleave", leave);
      h.removeEventListener("pointermove", move); h.removeEventListener("focusin", fin); h.removeEventListener("focusout", fout);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [color]);

  return (
    <div ref={host} className={`${s.bubbleHost} ${className ?? ""}`} data-fx="BubbleCanvas">
      {children}
      <canvas ref={cv} className={s.bubbleCanvas} aria-hidden="true" />
      <span className={s.bubblesStatic} aria-hidden="true"><i /><i /><i /></span>
    </div>
  );
}
