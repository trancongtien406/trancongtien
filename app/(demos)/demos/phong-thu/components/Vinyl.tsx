"use client";

import { useEffect, useRef } from "react";
import s from "../brand.module.css";
import { reducedMotion } from "../lib/frame";

/** Đĩa than quay theo vị trí cuộn (không tự quay): góc = tiến độ cuộn của khối nhân 540 độ; cần gạt nghiêng dần. */
export function Vinyl() {
  const host = useRef<HTMLDivElement>(null);
  const disc = useRef<SVGGElement>(null);
  const arm = useRef<SVGGElement>(null);
  useEffect(() => {
    const el = host.current; if (!el || reducedMotion()) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect(); const vh = window.innerHeight;
      const p = Math.min(1.2, Math.max(-0.2, (vh - r.top) / (vh + r.height)));
      disc.current?.setAttribute("transform", `rotate(${(p * 540).toFixed(2)} 200 200)`);
      arm.current?.setAttribute("transform", `rotate(${(-6 + p * 14).toFixed(2)} 372 40)`);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={host} className={s.vinyl} data-pt="vinyl" data-cursor="Cuộn">
      <svg viewBox="0 0 420 420" role="img" aria-label="Đĩa than quay theo nhịp cuộn trang">
        <defs>
          <radialGradient id="pt-vg" cx="50%" cy="50%" r="50%"><stop offset="0.28" stopColor="#0c0516" /><stop offset="1" stopColor="#1d0e33" /></radialGradient>
          <path id="pt-lab" d="M 200 200 m -48 0 a 48 48 0 1 1 96 0 a 48 48 0 1 1 -96 0" />
        </defs>
        <g ref={disc} transform="rotate(0 200 200)">
          <circle cx="200" cy="200" r="190" fill="url(#pt-vg)" stroke="#3a2159" strokeWidth="2" />
          {Array.from({ length: 16 }, (_, i) => (<circle key={i} cx="200" cy="200" r={66 + i * 7.6} fill="none" stroke="#f6f0e4" strokeOpacity={i % 5 === 0 ? 0.2 : 0.07} strokeWidth={i % 5 === 0 ? 1.4 : 0.8} />))}
          <path d="M200 200 L200 12 A188 188 0 0 1 332 66 Z" fill="#f6f0e4" opacity="0.06" />
          <path d="M200 200 L200 388 A188 188 0 0 1 68 334 Z" fill="#f6f0e4" opacity="0.06" />
          <circle cx="200" cy="200" r="58" fill="#ff8a1f" />
          <circle cx="200" cy="200" r="58" fill="none" stroke="#1a0b2e" strokeWidth="1.5" strokeOpacity="0.4" />
          <text fontSize="9.5" style={{ fontFamily: "var(--pt-mono)" }} fill="#1a0b2e" letterSpacing="2.4" fontWeight="700">
            <textPath href="#pt-lab" startOffset="0">TẦN SỐ STUDIO · MASTER · SIDE A ·</textPath>
          </text>
          <circle cx="200" cy="200" r="5" fill="#1a0b2e" />
        </g>
        <g ref={arm} transform="rotate(-6 372 40)">
          <circle cx="372" cy="40" r="20" fill="#2c1550" stroke="#f6f0e4" strokeOpacity="0.4" />
          <path d="M372 40 L282 232" stroke="#f6f0e4" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
          <rect x="262" y="226" width="30" height="16" rx="3" transform="rotate(-25 277 234)" fill="#ff8a1f" />
        </g>
      </svg>
    </div>
  );
}
