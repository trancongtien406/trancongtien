"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Vệt ô vuông pixel xanh mint: theo con trỏ (desktop) và bật thành cụm ở mép màn hình khi cuộn nhanh.
 * Dùng pool 48 ô cố định, chỉ animate transform/opacity. Reduced-motion: không chạy.
 */
export function Pixels() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cells = Array.from(el.children) as HTMLElement[];
    let i = 0, lastX = -999, lastY = -999, lastScroll = window.scrollY, lastCluster = 0;
    const pop = (x: number, y: number, size: number, hold = 0.12) => {
      const c = cells[i++ % cells.length];
      gsap.killTweensOf(c);
      gsap.set(c, { x, y, width: size, height: size, opacity: 1, scale: 1 });
      gsap.to(c, { opacity: 0, scale: 0.6, delay: hold, duration: 0.5, ease: "steps(4)" });
    };
    const snap = (v: number, g = 14) => Math.round(v / g) * g;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 26) return;
      lastX = e.clientX; lastY = e.clientY;
      pop(snap(e.clientX + (Math.random() - 0.5) * 40), snap(e.clientY + (Math.random() - 0.5) * 40), [14, 14, 28, 42][Math.floor(Math.random() * 4)]);
    };
    const onScroll = () => {
      const now = performance.now(), dy = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      if (dy < 40 || now - lastCluster < 140) return;
      lastCluster = now;
      const left = Math.random() < 0.5;
      const bx = left ? snap(Math.random() * window.innerWidth * 0.12) : snap(window.innerWidth * (0.88 + Math.random() * 0.1));
      const by = snap(window.innerHeight * (0.2 + Math.random() * 0.6));
      for (let k = 0; k < 4; k++) pop(bx + snap((Math.random() - 0.5) * 80), by + snap((Math.random() - 0.5) * 80), [14, 28, 28, 42][Math.floor(Math.random() * 4)], 0.1 + k * 0.05);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(cells);
    };
  }, []);
  return (
    <div ref={host} aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 40, overflow: "hidden" }}>
      {Array.from({ length: 48 }).map((_, k) => (
        <i key={k} style={{ position: "absolute", left: 0, top: 0, opacity: 0, background: "#86f59a", willChange: "transform, opacity" }} />
      ))}
    </div>
  );
}
