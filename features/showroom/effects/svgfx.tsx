"use client";

import { useId, useRef, type CSSProperties, type SVGProps } from "react";
import { gsap, markReady, observeInView, prefersReducedMotion, safeId, useFx } from "./core";

/* ------------------------------------------------------------------ 22. BlobMorph */

function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sinh path blob khép kín (Catmull-Rom → Bezier). Mọi blob cùng số điểm = cùng cấu trúc, nên nội suy được. */
export function blobPath(seed: number, points = 8, size = 200, jitter = 0.28): string {
  const rnd = mulberry32(seed * 9973 + 17);
  const c = size / 2, base = size * 0.34;
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2, r = base * (1 + (rnd() - 0.5) * 2 * jitter);
    return [c + Math.cos(a) * r, c + Math.sin(a) * r] as const;
  });
  const f = (n: number) => n.toFixed(2);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points], p1 = pts[i], p2 = pts[(i + 1) % points], p3 = pts[(i + 2) % points];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + "Z";
}

const NUM = /(-?\d*\.?\d+)/;
const lerpPath = (a: string[], b: string[], t: number) => a.map((tok, i) => (i % 2 ? String(+tok + (+b[i] - +tok) * t) : tok)).join("");

export type BlobMorphProps = Omit<SVGProps<SVGSVGElement>, "ref" | "children"> & {
  /** path tuỳ ý (cùng cấu trúc lệnh/số lượng số). Bỏ trống = tự sinh `count` blob */
  paths?: string[];
  count?: number;
  /** số điểm điều khiển của mỗi blob sinh tự động */
  nodes?: number;
  seed?: number;
  /** giây mỗi lần biến hình */
  duration?: number;
  pathClassName?: string;
};

export function BlobMorph({ paths, count = 4, nodes = 8, seed = 1, duration = 3.2, pathClassName, viewBox = "0 0 200 200", ...rest }: BlobMorphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const list = paths ?? Array.from({ length: count }, (_, i) => blobPath(seed + i * 7, nodes));
  useFx(svgRef as unknown as React.RefObject<HTMLElement>, (el) => {
    const path = (el as unknown as SVGSVGElement).querySelector("path")!;
    if (prefersReducedMotion() || list.length < 2) { markReady(el, "static"); return; }
    const toks = list.map((d) => d.split(NUM));
    const ease = gsap.parseEase("sine.inOut");
    const st = { t: 0 };
    const tl = gsap.timeline({ repeat: -1, paused: true });
    tl.to(st, {
      t: list.length, duration: duration * list.length, ease: "none",
      onUpdate: () => {
        const i = Math.floor(st.t) % list.length, f = st.t - Math.floor(st.t);
        path.setAttribute("d", lerpPath(toks[i], toks[(i + 1) % list.length], ease(f)));
      },
    });
    const off = observeInView(el as unknown as Element, (v) => (v ? tl.play() : tl.pause()), { rootMargin: "50px" });
    markReady(el);
    return () => { off(); tl.kill(); path.setAttribute("d", list[0]); };
  }, [list.join("|"), duration]);
  return (
    <svg ref={svgRef} viewBox={viewBox} aria-hidden="true" data-fx="BlobMorph" {...rest}>
      <path d={list[0]} fill="currentColor" className={pathClassName} />
    </svg>
  );
}

/* ------------------------------------------------------------------ 23. GrainOverlay */

export type GrainOverlayProps = {
  opacity?: number;
  /** kích thước ô nhiễu (px) */
  size?: number;
  baseFrequency?: number;
  blendMode?: CSSProperties["mixBlendMode"];
  /** nhấp nháy bằng CSS steps (chỉ transform, tắt khi reduced) */
  animated?: boolean;
  /** phủ cả viewport thay vì khối cha */
  fixed?: boolean;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
};

export function GrainOverlay({ opacity = 0.08, size = 180, baseFrequency = 0.8, blendMode = "normal", animated = false, fixed = false, zIndex = 1, className, style }: GrainOverlayProps) {
  const cls = `fxgr${safeId(useId())}`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='n' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return (
    <div
      aria-hidden="true" data-fx="GrainOverlay" data-fx-ready="1" className={`${cls} ${className ?? ""}`}
      style={{ position: fixed ? "fixed" : "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex, mixBlendMode: blendMode, ...style }}
    >
      <style>{`
        .${cls}>i{position:absolute;inset:${animated ? "-50%" : "0"};background-image:${url};background-size:${size}px ${size}px;opacity:${opacity}${animated ? `;animation:${cls}-j 0.9s steps(1) infinite` : ""}}
        @keyframes ${cls}-j{0%{transform:translate(0,0)}20%{transform:translate(-4%,3%)}40%{transform:translate(3%,-5%)}60%{transform:translate(-5%,-2%)}80%{transform:translate(4%,4%)}}
        @media (prefers-reduced-motion:reduce){.${cls}>i{animation:none}}
      `}</style>
      <i />
    </div>
  );
}
