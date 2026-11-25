"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/features/showroom/effects";

const PATH = "M-60 196 C 150 70, 300 60, 440 150 S 690 236, 840 150 S 1130 40, 1500 150";
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Ván lướt trượt theo đường sóng: vị trí = đoạn mở màn (gsap) + tiến độ cuộn qua hero, đọc bằng getPointAtLength;
 * góc xoay theo tiếp tuyến. Nhóm ván được bù tỉ lệ để không méo khi svg co giãn (preserveAspectRatio none).
 */
export function Ride() {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const board = useRef<SVGGElement>(null);

  useIsoLayoutEffect(() => {
    const s = svg.current, p = path.current, b = board.current;
    if (!s || !p || !b) return;
    const len = p.getTotalLength();
    const hero = s.closest<HTMLElement>('[data-rs="hero"]');
    let intro = prefersReducedMotion() ? 0.34 : 0;
    let raf = 0;
    const place = () => {
      raf = 0;
      const w = s.clientWidth || 1, h = s.clientHeight || 1;
      const sx = w / 1440, sy = h / 260;
      const hh = hero ? hero.offsetHeight : 900;
      const hp = prefersReducedMotion() ? 0 : clamp(window.scrollY / (hh * 0.95), 0, 1);
      const t = clamp(intro + hp * 0.62, 0, 0.985);
      const a = p.getPointAtLength(t * len);
      const c = p.getPointAtLength(clamp(t * len + 4, 0, len));
      const d = p.getPointAtLength(clamp(t * len - 4, 0, len));
      const ang = (Math.atan2((c.y - d.y) * sy, (c.x - d.x) * sx) * 180) / Math.PI;
      const size = clamp(w * 0.085, 70, 130) / 130; // 130 = bề rộng ván trong hệ toạ độ cục bộ
      b.setAttribute("transform", `translate(${a.x.toFixed(1)} ${(a.y - 6 / sy).toFixed(1)}) scale(${(1 / sx).toFixed(4)} ${(1 / sy).toFixed(4)}) rotate(${ang.toFixed(1)}) scale(${size.toFixed(3)})`);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(place); };
    place();
    let tw: gsap.core.Tween | null = null;
    if (!prefersReducedMotion()) {
      const o = { v: 0 };
      tw = gsap.to(o, { v: 0.26, duration: 2.8, delay: 0.9, ease: "power3.out", onUpdate: () => { intro = o.v; kick(); } });
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", kick, { passive: true });
    }
    return () => {
      tw?.kill();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg ref={svg} viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true" data-rs="ride" style={{ position: "absolute", left: 0, right: 0, bottom: "clamp(70px, 9vw, 150px)", width: "100%", height: "clamp(150px, 18vw, 260px)", overflow: "visible", pointerEvents: "none", zIndex: 4 }}>
      <path ref={path} d={PATH} fill="none" stroke="var(--rs-brown)" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 16" opacity="0.55" vectorEffect="non-scaling-stroke" />
      <g ref={board}>
        <g transform="translate(-65 -14)">
          <ellipse cx="14" cy="36" rx="22" ry="6" fill="var(--rs-teal)" opacity="0.55" />
          <path d="M0 15 C 22 -2, 96 -2, 130 15 C 96 32, 22 32, 0 15Z" fill="var(--rs-orange)" stroke="var(--rs-brown)" strokeWidth="4" strokeLinejoin="round" />
          <path d="M10 15 L120 15" stroke="var(--rs-brown)" strokeWidth="3" />
          <path d="M26 7 L26 23 M44 5 L44 25" stroke="var(--rs-sun)" strokeWidth="5" strokeLinecap="round" />
          <path d="M-6 15 q-8 -6 -14 -2 M-6 15 q-8 6 -14 2" stroke="var(--rs-brown)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
