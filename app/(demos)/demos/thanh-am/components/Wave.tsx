"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { synth, type Shape } from "./audio";

export type WaveParams = { shape: Shape; cycles: number; amp: number };

const N = 150, W = 1200;
const shapeFn = (s: Shape, p: number) => {
  const t = p / (Math.PI * 2) - Math.floor(p / (Math.PI * 2));
  if (s === "square") return t < 0.5 ? 1 : -1;
  if (s === "triangle") return 1 - 4 * Math.abs(t - 0.5);
  if (s === "sawtooth") return 2 * t - 1;
  return Math.sin(p);
};

/**
 * Hiệu ứng chủ đạo: nhiều đường sóng SVG, cập nhật mỗi khung hình bằng gsap.ticker.
 * Biên độ phình lên quanh con trỏ (gaussian + vận tốc); khi có âm mẫu thì lớp chính vẽ đúng dạng sóng đọc từ AnalyserNode.
 */
export function Wave({ height = 320, layers = 5, params, hoverRef, className, label }: { height?: number; layers?: number; params?: { current: WaveParams }; hoverRef?: { current: boolean }; className?: string; label?: string }) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current!;
    const paths = Array.from(el.querySelectorAll("path"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const H = height;
    let visible = false;
    const st = { px: 0.5, py: 0, tpx: 0.5, inf: 0, e: 0.35, lastX: 0, lastT: 0, vel: 0 };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; draw(performance.now() / 1000); });
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dy = Math.abs(e.clientY - (r.top + r.height / 2));
      st.inf = Math.max(0, 1 - dy / (r.height * 1.3 + 80));
      st.tpx = (e.clientX - r.left) / r.width;
      const now = performance.now();
      st.vel = Math.min(1, Math.abs(e.clientX - st.lastX) / Math.max(8, now - st.lastT) / 2.2);
      st.lastX = e.clientX; st.lastT = now;
    };

    function draw(t: number) {
      const p = params?.current;
      const hov = hoverRef?.current ? 1 : 0;
      const target = (reduce ? 0.55 : 0.28 + st.inf * 0.55 + st.vel * 0.5 + hov * 0.5);
      st.e += (target - st.e) * 0.08;
      st.px += (st.tpx - st.px) * 0.12;
      st.vel *= 0.94; st.inf *= 0.985;
      const live = p && synth.playing() ? synth.read() : null;
      for (let k = 0; k < paths.length; k++) {
        const amp = (H * 0.3) * (1 - k * 0.17) * (0.35 + st.e);
        let d = "";
        for (let i = 0; i <= N; i++) {
          const x = i / N;
          const win = Math.pow(Math.sin(Math.PI * x), 0.9);
          const g = Math.exp(-Math.pow((x - st.px) / 0.14, 2));
          let y: number;
          if (k === 0 && p) {
            const ph = x * p.cycles * Math.PI * 2 + (reduce ? 0 : t * 3);
            y = live ? live[Math.floor(x * 600)] * 1.6 : shapeFn(p.shape, ph) * p.amp;
            y *= win * (0.7 + g * 0.5);
          } else {
            const f1 = 5 + k * 2.3, f2 = 2 + k * 0.9;
            y = Math.sin(x * f1 * Math.PI * 2 + t * (1.1 + k * 0.35)) * Math.sin(x * f2 * Math.PI * 2 - t * (0.6 + k * 0.2)) * win;
            y += Math.sin(x * 22 * Math.PI * 2 + t * 4 + k) * g * (0.25 + st.e * 0.5);
          }
          d += `${i ? "L" : "M"}${(x * W).toFixed(1)} ${(H / 2 - y * amp).toFixed(1)}`;
        }
        paths[k].setAttribute("d", d);
      }
    }
    if (reduce) { draw(1.3); return () => io.disconnect(); }
    const tick = (time: number) => { if (visible) draw(time); };
    gsap.ticker.add(tick);
    window.addEventListener("pointermove", onMove);
    return () => { gsap.ticker.remove(tick); window.removeEventListener("pointermove", onMove); io.disconnect(); };
  }, [height, layers, params, hoverRef]);

  return (
    <svg ref={svg} className={className} viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      {Array.from({ length: layers }).map((_, k) => (
        <path key={k} fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" stroke={k === 0 ? "#ff6b9d" : "#c4b5fd"} strokeWidth={k === 0 ? 3.2 : 1.4} strokeOpacity={k === 0 ? 1 : 0.62 - k * 0.1} />
      ))}
    </svg>
  );
}
