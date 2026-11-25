"use client";

import { useId, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, markReady, observeInView, prefersReducedMotion, safeId, useFxLayout } from "@/features/showroom/effects";
import { MASK_PATHS, type MaskShape } from "./Shapes";

type Props = {
  shape?: MaskShape;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** "load": nở ngay khi tải trang; "view": nở khi vào khung nhìn */
  trigger?: "load" | "view";
  delay?: number;
  /** vẽ viền nét mảnh theo hình cánh hoa, nở cùng ảnh */
  outline?: boolean;
  outlineClassName?: string;
};

/**
 * Hiệu ứng ký hiệu: ảnh được cắt bằng mặt nạ cánh hoa/lá (SVG clipPath objectBoundingBox).
 * Khi reveal, hình mặt nạ nở từ nụ (scale nhỏ) tới vượt nhẹ rồi về đúng khung, ảnh bên trong co từ 1.3 về 1.
 * SSR/no-JS/reduced-motion: hình mặt nạ nguyên vẹn, ảnh hiện đủ.
 */
export function PetalMask({ shape = "flower", children, className, style, trigger = "view", delay = 0, outline = false, outlineClassName }: Props) {
  const id = "nrm" + safeId(useId());
  const root = useRef<HTMLDivElement>(null);
  const d = MASK_PATHS[shape];

  useFxLayout(root, (el) => {
    const path = el.querySelector<SVGPathElement>("[data-pm-path]");
    const ring = el.querySelector<SVGPathElement>("[data-pm-ring]");
    const inner = el.querySelector<HTMLElement>("[data-pm-inner]");
    if (!path || prefersReducedMotion()) { markReady(el, "static"); return; }
    const state = { s: 0.04, r: 0.04 };
    const apply = () => {
      path.setAttribute("transform", `translate(.5 .5) scale(${state.s}) translate(-.5 -.5)`);
      ring?.setAttribute("transform", `translate(.5 .5) scale(${state.r}) translate(-.5 -.5)`);
    };
    apply();
    if (inner) gsap.set(inner, { scale: 1.3 });
    el.style.visibility = "visible";
    let tl: gsap.core.Timeline | null = null;
    const play = () => {
      tl = gsap.timeline({ delay });
      tl.to(state, { s: 1.08, r: 1.08, duration: 1.0, ease: "power3.out", onUpdate: apply })
        .to(state, { s: 1, r: 1, duration: 0.5, ease: "power2.inOut", onUpdate: apply }, ">-0.05");
      if (inner) tl.to(inner, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
    };
    const off = trigger === "load" ? (play(), () => {}) : observeInView(el, (v) => v && play(), { once: true, rootMargin: "0px 0px -8% 0px" });
    markReady(el);
    return () => { off(); tl?.kill(); path.removeAttribute("transform"); ring?.removeAttribute("transform"); if (inner) gsap.set(inner, { clearProps: "transform" }); };
  }, [shape, trigger, delay]);

  return (
    <div ref={root} className={className} style={style} data-fx="PetalMask">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox"><path data-pm-path="" d={d} /></clipPath>
        </defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, clipPath: `url(#${id})`, WebkitClipPath: `url(#${id})` }}>
        <div data-pm-inner="" style={{ position: "absolute", inset: 0 }}>{children}</div>
      </div>
      {outline ? (
        <svg viewBox="0 0 1 1" preserveAspectRatio="none" className={outlineClassName} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden="true" focusable="false">
          <path data-pm-ring="" d={d} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      ) : null}
    </div>
  );
}
