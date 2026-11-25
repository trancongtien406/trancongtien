"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useIsoLayoutEffect } from "@/features/showroom/effects";

/** Chữ cong theo đường sóng bằng textPath: startOffset chạy theo cuộn, cả đường nhấp nhô nhẹ bằng CSS. */
export function TextWave({ text, className }: { text: string; className?: string }) {
  const tp = useRef<SVGTextPathElement>(null);
  const root = useRef<SVGSVGElement>(null);
  useIsoLayoutEffect(() => {
    registerGsap();
    const el = tp.current, r = root.current;
    if (!el || !r || prefersReducedMotion()) return;
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: -40, ease: "none",
      scrollTrigger: { trigger: r, start: "top bottom", end: "bottom top", scrub: 0.5 },
      onUpdate: () => el.setAttribute("startOffset", `${o.v.toFixed(2)}%`),
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); ScrollTrigger.refresh(); };
  }, []);
  return (
    <svg ref={root} className={className} viewBox="0 0 1440 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-rs="textwave">
      <defs><path id="rs-wavetext" d="M-400 110 q 150 -90 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0 t 300 0" /></defs>
      <g className="rs-wavebob">
        <text><textPath ref={tp} href="#rs-wavetext" startOffset="0%">{text}</textPath></text>
      </g>
    </svg>
  );
}
