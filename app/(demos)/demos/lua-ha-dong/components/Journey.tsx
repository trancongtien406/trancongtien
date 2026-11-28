"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { prefersReduced, setupGsap } from "./lib";

const STEPS = [
  ["CAO CẤP", "Tuyển chọn tơ tằm"],
  ["GIẶT MÃI VẪN BỀN", "Màu giữ nguyên sắc"],
  ["ĐÃ ĐI KHẮP NƠI", "Giao từ Bắc vào Nam"],
  ["MỘT MÉT, MỘT CAM KẾT", "Bảo hành màu 12 tháng"],
] as const;

function wave(w: number, cy: number, amp: number, wl: number, ph: number) {
  const f = (n: number) => n.toFixed(1);
  let d = `M0 ${f(cy + Math.sin(ph) * amp)}`;
  const step = wl / 4;
  for (let x = 0; x < w; x += step) {
    const y1 = cy + Math.sin(ph + ((x + step / 3) / wl) * Math.PI * 2) * amp;
    const y2 = cy + Math.sin(ph + ((x + (2 * step) / 3) / wl) * Math.PI * 2) * amp;
    const y3 = cy + Math.sin(ph + ((x + step) / wl) * Math.PI * 2) * amp;
    d += ` C${f(x + step / 3)} ${f(y1)} ${f(x + (2 * step) / 3)} ${f(y2)} ${f(x + step)} ${f(y3)}`;
  }
  return d;
}

export function Journey() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pa = useRef<SVGPathElement>(null);
  const pb = useRef<SVGPathElement>(null);
  const [dim, setDim] = useState({ w: 4 * 1440, h: 900 });

  useLayoutEffect(() => {
    const m = () => setDim({ w: window.innerWidth * 4, h: window.innerHeight });
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  useEffect(() => {
    const s = sec.current;
    const tr = track.current;
    if (!s || !tr) return;
    if (prefersReduced()) {
      s.dataset.rm = "1";
      return;
    }
    setupGsap();
    const panels = Array.from(tr.querySelectorAll<HTMLElement>(`.${styles.step}`));
    const ctx = gsap.context(() => {
      const vw = () => window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true,
          onUpdate: () => {
            panels.forEach((p) => {
              const r = p.getBoundingClientRect();
              const off = Math.min(1, Math.abs(r.left + r.width / 2 - vw() / 2) / (vw() * 0.7));
              p.style.opacity = String(1 - off * 0.15);
            });
          },
        },
      });
      tl.to(tr, { x: () => -(tr.scrollWidth - vw()), ease: "none", duration: 1 }, 0);
      tl.to(`.${styles.blobA}`, { motionPath: { path: pa.current!, align: pa.current!, alignOrigin: [0.5, 0.5] }, ease: "none", duration: 1 }, 0);
      tl.to(`.${styles.blobB}`, { motionPath: { path: pb.current!, align: pb.current!, alignOrigin: [0.5, 0.5], start: 1, end: 0 }, ease: "none", duration: 1 }, 0);
    }, s);
    return () => ctx.revert();
  }, [dim.w, dim.h]);

  const { w, h } = dim;
  return (
    <section ref={sec} className={styles.jSec} aria-labelledby="j-h">
      <div className={styles.jStage}>
        <h2 id="j-h" className={styles.srOnly}>Bốn bước làm nên tấm lụa</h2>
        <div ref={track} className={styles.jTrack} style={{ width: `${w}px` }}>
          <svg className={styles.jSvg} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <path ref={pa} d={wave(w, h * 0.17, h * 0.11, 420, 0.6)} className={styles.dash} />
            <path ref={pb} d={wave(w, h * 0.83, h * 0.11, 360, 2.4)} className={styles.dash} />
            <g className={styles.blobA}><Splat /></g>
            <g className={styles.blobB}><Splat /></g>
          </svg>
          {STEPS.map(([t, d], i) => (
            <div key={t} className={styles.step} style={{ left: `${i * (100 / 4)}%` }}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Splat() {
  return (
    <g fill="#f6f4ea">
      <circle r="9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} cx="0" cy="-12" rx="2.6" ry="5" transform={`rotate(${a + 12})`} />
      ))}
    </g>
  );
}
