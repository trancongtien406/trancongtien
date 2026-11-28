"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import s from "../brand.module.css";

const TRACK = "M170 410 C 70 330 100 170 300 150 C 470 130 600 200 800 160 C 930 138 985 280 880 385 C 790 470 640 420 540 470 C 430 520 260 505 170 410 Z";

export function Intro() {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hp = el.querySelector<HTMLElement>("[data-hp]");
    const ctx = gsap.context(() => {
      const trail = el.querySelector<SVGPathElement>("[data-trail]");
      const len = trail ? trail.getTotalLength() : 0;
      const o = { v: 0 };
      const setHp = () => { if (hp) hp.textContent = String(Math.round(300 + o.v * 223)); };
      if (reduce) {
        gsap.set("[data-car]", { motionPath: { path: "[data-trail]", align: "[data-trail]", alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.9, end: 0.9 } });
        o.v = 1; setHp(); return;
      }
      const t = gsap.timeline({ defaults: { ease: "power3.out" } });
      t.set("[data-trail]", { strokeDasharray: len, strokeDashoffset: len });
      t.set("[data-edge]", { strokeDasharray: len, strokeDashoffset: len });
      t.from("[data-bigv4]", { yPercent: 24, autoAlpha: 0, duration: 1.1 }, 0.1);
      t.from("[data-sub]", { autoAlpha: 0, letterSpacing: "1.3em", duration: 1.5 }, 0.5);
      t.from("[data-ibar] > *", { autoAlpha: 0, y: 14, stagger: 0.1, duration: 0.8 }, 0.9);
      t.to(["[data-trail]", "[data-edge]"], { strokeDashoffset: 0, duration: 5, ease: "power1.inOut" }, 0.4);
      t.fromTo("[data-car]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.4);
      t.to("[data-car]", { duration: 5, ease: "power1.inOut", motionPath: { path: "[data-trail]", align: "[data-trail]", alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.9 } }, 0.4);
      t.to(o, { v: 1, duration: 5, ease: "power2.inOut", onUpdate: setHp }, 0.4);
      tl.current = t;
    }, el);
    const replay = () => { window.scrollTo({ top: 0, behavior: "smooth" }); window.setTimeout(() => tl.current?.restart(), 450); };
    window.addEventListener("vt-replay", replay);
    return () => { window.removeEventListener("vt-replay", replay); ctx.revert(); };
  }, []);

  const skip = () => { tl.current?.progress(1); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section ref={root} id="top" className={s.intro} aria-label="Mở đầu: V4 Mưa Rào">
      <svg className={s.introSvg} viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="vt-asp" cx=".42" cy=".5" r=".85"><stop offset="0" stopColor="#5b4e41" /><stop offset=".55" stopColor="#3a322b" /><stop offset="1" stopColor="#1d1a1c" /></radialGradient>
          <radialGradient id="vt-blue" cx=".85" cy=".1" r=".6"><stop offset="0" stopColor="#2a62c4" stopOpacity=".75" /><stop offset="1" stopColor="#2a62c4" stopOpacity="0" /></radialGradient>
          <filter id="vt-grit" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 .9  0 0 0 0 .8  0 0 0 0 .65  0 0 0 .55 -.18" /></filter>
          <filter id="vt-sand" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".02 .03" numOctaves="3" seed="9" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="40" /><feGaussianBlur stdDeviation="1.2" /></filter>
          <linearGradient id="vt-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a3e6b" /><stop offset="1" stopColor="#060a16" /></linearGradient>
        </defs>
        <rect width="1000" height="560" fill="url(#vt-asp)" />
        <rect width="1000" height="560" filter="url(#vt-grit)" opacity=".5" />
        <g filter="url(#vt-sand)" fill="#b8a07a" opacity=".5">
          <ellipse cx="760" cy="300" rx="40" ry="26" /><ellipse cx="300" cy="140" rx="26" ry="14" /><ellipse cx="120" cy="250" rx="18" ry="10" /><ellipse cx="880" cy="430" rx="22" ry="16" /><ellipse cx="560" cy="470" rx="30" ry="12" />
        </g>
        <rect width="1000" height="560" fill="url(#vt-blue)" />
        <path data-edge d={TRACK} fill="none" stroke="#9db6e6" strokeOpacity=".16" strokeWidth="26" strokeLinecap="round" />
        <path data-trail d={TRACK} fill="none" stroke="#0b0e18" strokeOpacity=".92" strokeWidth="11" strokeLinecap="round" />
        <path data-edge d={TRACK} fill="none" stroke="#05060b" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" transform="translate(0 7)" />
        <g data-car><g transform="scale(1.5)">
          <path d="M-44 0C-44 -13-30 -18-10 -18L24 -17C38 -16 44 -8 44 0C44 8 38 16 24 17L-10 18C-30 18-44 13-44 0Z" fill="url(#vt-body)" stroke="#9db6e6" strokeWidth="1" />
          <path d="M-14 -12L12 -11L18 0L12 11L-14 12Z" fill="#14264f" stroke="#2f5bd8" strokeWidth=".8" />
          <rect x="37" y="-11" width="5" height="5" rx="1.5" fill="#fff" /><rect x="37" y="6" width="5" height="5" rx="1.5" fill="#fff" />
          <rect x="-44" y="-12" width="3" height="5" rx="1" fill="#ff4b4b" /><rect x="-44" y="7" width="3" height="5" rx="1" fill="#ff4b4b" />
        </g></g>
      </svg>
      <div className={s.introCopy}>
        <h1 className={s.introTitle} aria-label="V4 Mưa Rào"><span className={s.big} data-bigv4 aria-hidden="true">V4</span><span className={s.mon} data-sub aria-hidden="true">MƯA RÀO</span></h1>
      </div>
      <div className={s.introBar} data-ibar>
        <p className={s.hp}><b data-hp>523</b><small>MÃ LỰC</small></p>
        <p className={s.edition}>Phiên bản Mưa Rào · 01/50</p>
        <button type="button" className={s.skipBtn} onClick={skip}>Bỏ qua intro</button>
      </div>
    </section>
  );
}
