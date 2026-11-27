"use client";

import { useEffect, useState } from "react";

/** Toạ độ vệ tinh minh hoạ nhích theo thời gian (không phải dữ liệu thật). */
export function LiveCoords({ className }: { className?: string }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setT((n) => n + 1), 900);
    return () => window.clearInterval(id);
  }, []);
  const lat = 16.05 + Math.sin(t / 7) * 12;
  const lon = 108.2 + t * 1.1;
  const f = (n: number) => n.toFixed(2).replace(".", ",");
  return <span className={className}>VĨ {f(lat)}° · KINH {f(((lon + 180) % 360) - 180)}°</span>;
}
