"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/features/showroom/effects";
import s from "../brand.module.css";

/**
 * Đồng hồ tốc độ SVG cố định ở góc: kim quay theo tiến độ cuộn (-120° đến +120°), số km/h đọc theo kim,
 * cộng thêm nhịp rung nhẹ theo vận tốc cuộn. Trang trí (aria-hidden), ẩn khi reduced-motion hoặc màn hẹp.
 */
const TICKS = Array.from({ length: 13 }, (_, i) => i);
const polar = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [60 + r * Math.cos(a), 60 + r * Math.sin(a)] as const;
};

export function Speedometer() {
  const needle = useRef<SVGGElement>(null);
  const read = useRef<SVGTextElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const n = needle.current, t = read.current, w = wrap.current;
    if (!n || !t || !w) return;
    w.dataset.on = "1";
    const MAX = 240;
    const state = { p: 0, bump: 0 };
    const draw = () => {
      const a = -120 + 240 * Math.min(1, state.p + state.bump * 0.06);
      gsap.set(n, { rotation: a, svgOrigin: "60 60" });
      t.textContent = String(Math.round(Math.max(0, Math.min(1, state.p + state.bump * 0.06)) * MAX));
    };
    draw();
    const st = ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        gsap.to(state, { p: self.progress, duration: 0.5, ease: "power3.out", overwrite: "auto", onUpdate: draw });
        gsap.to(state, { bump: Math.min(Math.abs(self.getVelocity()) / 2400, 1), duration: 0.15, overwrite: "auto", onUpdate: draw, onComplete: () => { gsap.to(state, { bump: 0, duration: 0.7, onUpdate: draw }); } });
      },
    });
    return () => { st.kill(); gsap.killTweensOf(state); };
  }, []);
  return (
    <div ref={wrap} className={s.gauge} aria-hidden="true" data-fx="Speedometer">
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <circle cx="60" cy="60" r="56" fill="rgba(9,9,9,.82)" stroke="#ffd400" strokeWidth="3" />
        <path d={`M${polar(-120, 46)[0]} ${polar(-120, 46)[1]}A46 46 0 1 1 ${polar(120, 46)[0]} ${polar(120, 46)[1]}`} stroke="#2e2e2e" strokeWidth="5" fill="none" />
        {TICKS.map((i) => {
          const deg = -120 + i * 20;
          const [x1, y1] = polar(deg, i % 3 === 0 ? 38 : 42);
          const [x2, y2] = polar(deg, 48);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i >= 10 ? "#ffd400" : "#fff"} strokeWidth={i % 3 === 0 ? 2.4 : 1.2} />;
        })}
        <g ref={needle}>
          <polygon points="58,60 60,14 62,60" fill="#ffd400" />
          <circle cx="60" cy="60" r="5" fill="#fff" />
        </g>
        <text ref={read} x="60" y="92" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--vx-mono)" }}>0</text>
        <text x="60" y="104" textAnchor="middle" fontSize="7" fill="#ffd400" letterSpacing="1.5" style={{ fontFamily: "var(--vx-mono)" }}>KM/H</text>
      </svg>
    </div>
  );
}
