"use client";

import { useEffect, useRef } from "react";
import s from "../brand.module.css";

/**
 * Vệt tốc độ: 22 vạch ngang chạy qua khung (CSS keyframes, chỉ transform/opacity).
 * Độ đậm và độ dài tăng theo --vx-v (vận tốc cuộn do Motion đặt). Chỉ chạy khi trong khung;
 * reduced-motion: vạch đứng yên, mờ. Trang trí, aria-hidden.
 */
const LINES = Array.from({ length: 22 }, (_, i) => {
  const r = (n: number) => ((i * 7919 + n * 104729) % 1000) / 1000;
  return { top: 4 + r(1) * 92, w: 18 + r(2) * 40, dur: 0.9 + r(3) * 1.3, delay: -r(4) * 2.2, thick: r(5) > 0.78 ? 3 : 1.5, y: r(6) > 0.5 };
});

export function SpeedLines({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => { el.dataset.run = e.isIntersecting ? "1" : "0"; }, { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${s.speed} ${className}`} data-fx="SpeedLines" data-run="1" aria-hidden="true">
      {LINES.map((l, i) => (
        <i key={i} style={{ top: `${l.top}%`, width: `${l.w}%`, height: l.thick, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }} />
      ))}
    </div>
  );
}
