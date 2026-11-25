"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { clamp, gsap, hasFinePointer, markReady, observeInView, on, prefersReducedMotion, safeId, useFx } from "./core";

type Common = { as?: ElementType; className?: string; style?: CSSProperties };
const fineOk = () => hasFinePointer() && !prefersReducedMotion();

/* ------------------------------------------------------------------ 10. MagneticButton */

export type MagneticButtonProps = Common & {
  children: ReactNode;
  /** 0..1: bao nhiêu phần khoảng cách con trỏ-tâm thì nút dịch theo */
  strength?: number;
  /** px dịch tối đa */
  max?: number;
};

/** Phần tử ngoài giữ nguyên vùng bấm; chỉ lớp trong dịch chuyển. Đặt <a>/<button> thật làm con. */
export function MagneticButton({ children, as, className, style, strength = 0.3, max = 14 }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;
  useFx(ref, (el) => {
    if (!fineOk()) { markReady(el, "static"); return; }
    const inner = el.firstElementChild as HTMLElement;
    const qx = gsap.quickTo(inner, "x", { duration: 0.45, ease: "power3.out" });
    const qy = gsap.quickTo(inner, "y", { duration: 0.45, ease: "power3.out" });
    const offs = [
      on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        qx(clamp((e.clientX - (r.left + r.width / 2)) * strength, -max, max));
        qy(clamp((e.clientY - (r.top + r.height / 2)) * strength, -max, max));
      }),
      on(el, "pointerleave", () => { qx(0); qy(0); }),
    ];
    markReady(el);
    return () => { offs.forEach((f) => f()); gsap.set(inner, { clearProps: "transform" }); };
  }, [strength, max]);
  return (
    <Tag ref={ref} className={className} style={{ display: "inline-block", ...style }} data-fx="MagneticButton">
      <span style={{ display: "inline-block", willChange: "transform" }}>{children}</span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ 11. CustomCursor */

export type CustomCursorProps = {
  size?: number;
  /** hệ số phóng to trên phần tử khớp selector */
  hoverScale?: number;
  selector?: string;
  /** ẩn con trỏ hệ thống (trừ input/textarea/select/contenteditable) */
  hideNative?: boolean;
  zIndex?: number;
  className?: string;
  labelClassName?: string;
  style?: CSSProperties;
};

const TEXT_TARGET = "input,textarea,select,[contenteditable=''],[contenteditable='true']";

export function CustomCursor({ size = 14, hoverScale = 3.2, selector = "[data-cursor]", hideNative = false, zIndex = 10000, className, labelClassName, style }: CustomCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!fineOk()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
  }, []);
  useFx(ref, (el) => {
    const dot = el.querySelector<HTMLElement>("[data-fx-dot]")!;
    const label = el.querySelector<HTMLElement>("[data-fx-label]")!;
    gsap.set(el, { x: -100, y: -100, opacity: 0 });
    const qx = gsap.quickTo(el, "x", { duration: 0.22, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.22, ease: "power3.out" });
    let shown = false, textMode = false;
    const vis = (v: boolean) => gsap.to(el, { opacity: v ? 1 : 0, duration: 0.2, overwrite: "auto" });
    let styleEl: HTMLStyleElement | null = null;
    if (hideNative) {
      styleEl = document.createElement("style");
      styleEl.textContent = `html[data-fx-cursor] *:not(${TEXT_TARGET.split(",").join("):not(")}){cursor:none!important}`;
      document.head.appendChild(styleEl);
      document.documentElement.setAttribute("data-fx-cursor", "");
    }
    const offs = [
      on(document, "pointermove", (e) => {
        if (e.pointerType === "touch") return;
        qx(e.clientX); qy(e.clientY);
        if (!shown) { shown = true; gsap.set(el, { x: e.clientX, y: e.clientY }); if (!textMode) vis(true); }
      }),
      on(document, "pointerover", (e) => {
        const t = e.target as Element | null;
        textMode = !!t?.closest(TEXT_TARGET);
        if (textMode) { vis(false); return; }
        if (shown) vis(true);
        const hit = t?.closest<HTMLElement>(selector);
        const txt = hit ? (hit.dataset.cursor ?? "") : "";
        const text = txt && txt !== "true" ? txt : "";
        label.textContent = text;
        gsap.to(dot, { scale: hit ? (text ? hoverScale * 1.6 : hoverScale) : 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        gsap.to(label, { opacity: text ? 1 : 0, duration: 0.2, overwrite: "auto" });
      }),
      on(document.documentElement, "pointerleave", () => vis(false)),
      on(document.documentElement, "pointerenter", () => { if (shown && !textMode) vis(true); }),
      on(window, "blur", () => vis(false)),
    ];
    markReady(el);
    return () => {
      offs.forEach((f) => f());
      styleEl?.remove();
      document.documentElement.removeAttribute("data-fx-cursor");
    };
  }, [enabled, selector, hoverScale, hideNative]);
  if (!enabled) return null;
  return (
    <div
      ref={ref} aria-hidden="true" data-fx="CustomCursor" className={className}
      style={{ position: "fixed", left: 0, top: 0, width: 0, height: 0, pointerEvents: "none", zIndex, ...style }}
    >
      <div data-fx-dot="" style={{ position: "absolute", width: size, height: size, left: -size / 2, top: -size / 2, borderRadius: "50%", background: "var(--fx-cursor-color, currentColor)", willChange: "transform" }} />
      <span data-fx-label="" className={labelClassName} style={{ position: "absolute", left: 0, top: 0, transform: "translate(-50%,-50%)", opacity: 0, fontSize: 11, whiteSpace: "nowrap" }} />
    </div>
  );
}

/* ------------------------------------------------------------------ 13. TiltCard */

export type TiltCardProps = Common & {
  children: ReactNode;
  /** độ nghiêng tối đa (deg) */
  max?: number;
  glare?: boolean;
  glareColor?: string;
  scale?: number;
  perspective?: number;
};

export function TiltCard({ children, as, className, style, max = 10, glare = true, glareColor = "rgba(255,255,255,0.35)", scale = 1.02, perspective = 900 }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;
  useFx(ref, (el) => {
    if (!fineOk()) { markReady(el, "static"); return; }
    const g = el.querySelector<HTMLElement>("[data-fx-glare]");
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3.out" });
    gsap.set(el, { transformPerspective: perspective, transformStyle: "preserve-3d" });
    const offs = [
      on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = clamp((e.clientX - r.left) / r.width, 0, 1), py = clamp((e.clientY - r.top) / r.height, 0, 1);
        ry((px - 0.5) * 2 * max); rx(-(py - 0.5) * 2 * max);
        if (g) { g.style.setProperty("--fx-gx", `${px * 100}%`); g.style.setProperty("--fx-gy", `${py * 100}%`); g.style.opacity = "1"; }
      }),
      on(el, "pointerenter", () => { gsap.to(el, { scale, duration: 0.35, ease: "power3.out", overwrite: "auto" }); }),
      on(el, "pointerleave", () => {
        rx(0); ry(0);
        gsap.to(el, { scale: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        if (g) g.style.opacity = "0";
      }),
    ];
    markReady(el);
    return () => { offs.forEach((f) => f()); gsap.set(el, { clearProps: "transform,transformPerspective,transformStyle" }); };
  }, [max, scale, perspective]);
  return (
    <Tag ref={ref} className={className} style={{ position: "relative", willChange: "transform", ...style }} data-fx="TiltCard">
      {children}
      {glare && (
        <span
          aria-hidden="true" data-fx-glare=""
          style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: 0, transition: "opacity 0.3s", background: `radial-gradient(circle at var(--fx-gx,50%) var(--fx-gy,50%), ${glareColor}, transparent 55%)` }}
        />
      )}
    </Tag>
  );
}

/* ------------------------------------------------------------------ 14. CursorSpotlight */

export type CursorSpotlightProps = Common & {
  children?: ReactNode;
  radius?: number;
  color?: string;
};

export function CursorSpotlight({ children, as, className, style, radius = 260, color = "rgba(255,255,255,0.18)" }: CursorSpotlightProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;
  useFx(ref, (el) => {
    if (!fineOk()) { markReady(el, "static"); return; }
    const spot = el.querySelector<HTMLElement>("[data-fx-spot]")!;
    let raf = 0, x = 0, y = 0;
    const apply = () => { raf = 0; spot.style.setProperty("--fx-x", `${x}px`); spot.style.setProperty("--fx-y", `${y}px`); };
    const offs = [
      on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        x = e.clientX - r.left; y = e.clientY - r.top;
        spot.style.opacity = "1";
        if (!raf) raf = requestAnimationFrame(apply);
      }),
      on(el, "pointerleave", () => { spot.style.opacity = "0"; }),
    ];
    markReady(el);
    return () => { offs.forEach((f) => f()); if (raf) cancelAnimationFrame(raf); };
  }, [radius]);
  return (
    <Tag ref={ref} className={className} style={{ position: "relative", ...style }} data-fx="CursorSpotlight">
      {children}
      <span
        aria-hidden="true" data-fx-spot=""
        style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: 0, transition: "opacity 0.3s", background: `radial-gradient(circle ${radius}px at var(--fx-x,50%) var(--fx-y,50%), ${color}, transparent 70%)` }}
      />
    </Tag>
  );
}

/* ------------------------------------------------------------------ 15. ShineSweep */

export type ShineSweepProps = Common & {
  children: ReactNode;
  trigger?: "hover" | "view" | "loop";
  color?: string;
  duration?: number;
  /** giây nghỉ giữa hai lần quét (loop) */
  every?: number;
};

export function ShineSweep({ children, as, className, style, trigger = "hover", color = "rgba(255,255,255,0.55)", duration = 0.9, every = 3.5 }: ShineSweepProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;
  useFx(ref, (el) => {
    const shine = el.querySelector<HTMLElement>("[data-fx-shine]")!;
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    gsap.set(shine, { x: 0, xPercent: -160, skewX: -20 });
    const sweep = () => gsap.fromTo(shine, { xPercent: -160 }, { xPercent: 260, duration, ease: "power2.inOut", overwrite: "auto" });
    const offs: Array<() => void> = [];
    let tl: gsap.core.Timeline | null = null;
    if (trigger === "hover") { if (hasFinePointer()) offs.push(on(el, "pointerenter", sweep)); }
    else if (trigger === "view") offs.push(observeInView(el, (v) => v && sweep(), { once: true }));
    else {
      tl = gsap.timeline({ repeat: -1, repeatDelay: every, paused: true });
      tl.fromTo(shine, { xPercent: -160 }, { xPercent: 260, duration, ease: "power2.inOut" });
      offs.push(observeInView(el, (v) => (v ? tl?.play() : tl?.pause()), { rootMargin: "0px" }));
    }
    markReady(el);
    return () => { offs.forEach((f) => f()); tl?.kill(); gsap.killTweensOf(shine); };
  }, [trigger, duration, every]);
  return (
    <Tag ref={ref} className={className} style={{ position: "relative", overflow: "hidden", ...style }} data-fx="ShineSweep">
      {children}
      <span
        aria-hidden="true" data-fx-shine=""
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "45%", pointerEvents: "none", transform: "translateX(-160%) skewX(-20deg)", background: `linear-gradient(90deg, transparent, ${color}, transparent)`, willChange: "transform" }}
      />
    </Tag>
  );
}

/* ------------------------------------------------------------------ 12. ImageHoverDistort */

export type ImageHoverDistortProps = Common & {
  children: ReactNode;
  /** độ méo tối đa (displacement scale) */
  strength?: number;
  frequency?: number;
};

/** Méo ảnh bằng SVG filter feDisplacementMap theo vận tốc con trỏ. Filter chỉ gắn khi đang hover (không tốn khi nghỉ). */
export function ImageHoverDistort({ children, as, className, style, strength = 38, frequency = 0.012 }: ImageHoverDistortProps) {
  const ref = useRef<HTMLElement>(null);
  const id = `fxdist${safeId(useId())}`;
  const Tag = (as ?? "div") as ElementType;
  useFx(ref, (el) => {
    if (!fineOk()) { markReady(el, "static"); return; }
    const disp = el.querySelector<SVGFEDisplacementMapElement>("feDisplacementMap")!;
    const turb = el.querySelector<SVGFETurbulenceElement>("feTurbulence")!;
    let target = 0, cur = 0, hover = false, ticking = false, lx = 0, ly = 0, lt = 0;
    const tick = (time: number) => {
      cur += (target - cur) * 0.14;
      target *= 0.9;
      disp.setAttribute("scale", cur.toFixed(2));
      const f = frequency * (1 + Math.sin(time * 0.8) * 0.15);
      turb.setAttribute("baseFrequency", `${f.toFixed(5)} ${(f * 1.4).toFixed(5)}`);
      if (!hover && cur < 0.6) { el.style.filter = ""; gsap.ticker.remove(tick); ticking = false; }
    };
    const start = () => { if (!ticking) { el.style.filter = `url(#${id})`; gsap.ticker.add(tick); ticking = true; } };
    const offs = [
      on(el, "pointerenter", (e) => { hover = true; lx = e.clientX; ly = e.clientY; lt = performance.now(); target = strength * 0.5; start(); }),
      on(el, "pointermove", (e) => {
        const n = performance.now(), dt = Math.max(8, n - lt);
        const v = Math.hypot(e.clientX - lx, e.clientY - ly) / dt; // px/ms
        target = clamp(Math.max(target, v * strength * 0.8), 0, strength);
        lx = e.clientX; ly = e.clientY; lt = n;
      }),
      on(el, "pointerleave", () => { hover = false; target = 0; }),
    ];
    markReady(el);
    return () => { offs.forEach((f) => f()); if (ticking) gsap.ticker.remove(tick); el.style.filter = ""; };
  }, [strength, frequency, id]);
  return (
    <Tag ref={ref} className={className} style={style} data-fx="ImageHoverDistort">
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={`${frequency} ${frequency * 1.4}`} numOctaves={1} seed={3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {children}
    </Tag>
  );
}


