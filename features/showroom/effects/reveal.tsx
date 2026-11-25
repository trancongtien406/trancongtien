"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode, type SVGProps } from "react";
import { clamp, gsap, markReady, observeInView, on, prefersReducedMotion, useFx, useFxLayout } from "./core";

type Common = { as?: ElementType; className?: string; style?: CSSProperties };

/* ------------------------------------------------------------------ 3. ClipReveal */

export type ClipRevealProps = Common & {
  children: ReactNode;
  variant?: "inset" | "circle" | "polygon";
  /** cạnh mà hình lộ ra từ đó (inset/polygon) hoặc "center" */
  from?: "bottom" | "top" | "left" | "right" | "center";
  /** tâm vòng tròn (circle) */
  origin?: string;
  duration?: number;
  delay?: number;
  /** phần tử con đầu tiên (thường <img>) phóng từ scale này về 1; 1 = tắt */
  innerScale?: number;
  rootMargin?: string;
};

const CLIP = {
  inset: {
    bottom: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
    top: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
    left: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
    right: ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"],
    center: ["inset(50% 50% 50% 50%)", "inset(0% 0% 0% 0%)"],
  },
  polygon: {
    bottom: ["polygon(0% 100%,100% 100%,100% 100%,0% 100%)", "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"],
    top: ["polygon(0% 0%,100% 0%,100% 0%,0% 0%)", "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"],
    left: ["polygon(0% 0%,0% 0%,0% 100%,0% 100%)", "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"],
    right: ["polygon(100% 0%,100% 0%,100% 100%,100% 100%)", "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"],
    center: ["polygon(50% 50%,50% 50%,50% 50%,50% 50%)", "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"],
  },
} as const;

export function ClipReveal({
  children, as, className, style, variant = "inset", from = "bottom", origin = "50% 50%", duration = 1.1, delay = 0, innerScale = 1.15, rootMargin,
}: ClipRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;
  useFxLayout(ref, (host) => {
    if (prefersReducedMotion()) { markReady(host, "static"); return; }
    // Quan sát phần tử ngoài (không bị clip): IntersectionObserver coi vùng đã clip-path là không giao với khung nhìn.
    const el = host.firstElementChild as HTMLElement;
    const [a, b] =
      variant === "circle" ? [`circle(0% at ${origin})`, `circle(150% at ${origin})`] : CLIP[variant][from];
    const inner = innerScale !== 1 ? (el.firstElementChild as HTMLElement | null) : null;
    gsap.set(el, { clipPath: a });
    if (inner) gsap.set(inner, { scale: innerScale });
    const off = observeInView(host, (v) => {
      if (!v) return;
      gsap.to(el, { clipPath: b, duration, delay, ease: "power3.inOut", onComplete: () => { gsap.set(el, { clearProps: "clipPath" }); } });
      if (inner) gsap.to(inner, { scale: 1, duration: duration * 1.25, delay, ease: "power2.out", onComplete: () => { gsap.set(inner, { clearProps: "transform" }); } });
    }, { once: true, rootMargin });
    markReady(host);
    return off;
  }, [variant, from, origin, duration, delay, innerScale, rootMargin]);
  return (
    <Tag ref={ref} className={className} style={style} data-fx="ClipReveal">
      <div data-fx-clip="" style={{ display: "block", height: "100%" }}>{children}</div>
    </Tag>
  );
}

/* ------------------------------------------------------------------ 16. CurtainReveal */

export type CurtainRevealProps = {
  /** nội dung giữa màn (logo, chữ...) */
  children?: ReactNode;
  panels?: number;
  /** thời gian chữ hiện trước khi rèm kéo (giây) */
  hold?: number;
  /** tổng tối đa (giây). Tự co để không vượt quá. Mặc định 1.1, trần cứng 1.2 */
  total?: number;
  /** key sessionStorage: chỉ chạy lần đầu trong phiên. Bỏ trống = chạy mỗi lần mount */
  oncePerSession?: string;
  className?: string;
  panelClassName?: string;
  /** màu nền rèm khi không có className (CSS color) */
  color?: string;
  onDone?: () => void;
};

export function CurtainReveal({ children, panels = 4, hold = 0.35, total = 1.1, oncePerSession, className, panelClassName, color = "#111", onDone }: CurtainRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const done = useRef(onDone);
  useEffect(() => { done.current = onDone; });

  useEffect(() => {
    let seen = false;
    if (oncePerSession) { try { seen = sessionStorage.getItem(oncePerSession) === "1"; } catch { /* riêng tư */ } }
    if (prefersReducedMotion() || seen) { done.current?.(); return; }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, [oncePerSession]);

  useFx(ref, (el) => {
    const ps = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-panel]"));
    const label = el.querySelector<HTMLElement>("[data-fx-label]");
    const T = Math.min(total, 1.2);
    const stag = 0.05, slide = Math.max(0.3, T - hold - stag * (ps.length - 1));
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (oncePerSession) { try { sessionStorage.setItem(oncePerSession, "1"); } catch { /* riêng tư */ } }
      setShow(false);
      done.current?.();
    };
    const tl = gsap.timeline({ onComplete: finish });
    if (label) tl.fromTo(label, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: hold * 0.6, ease: "power2.out" }, 0);
    tl.to({}, { duration: hold }, 0);
    if (label) tl.to(label, { opacity: 0, duration: 0.2 }, hold - 0.05);
    tl.to(ps, { yPercent: -100, duration: slide, ease: "power3.inOut", stagger: stag }, hold);
    const skip = () => { tl.progress(1); };
    const offs = [on(el, "click", skip), on(window, "keydown", skip)];
    const safety = window.setTimeout(finish, T * 1000 + 400);
    markReady(el);
    return () => { window.clearTimeout(safety); offs.forEach((f) => f()); tl.kill(); };
  }, [show, panels, hold, total, oncePerSession]);

  if (!show) return null;
  return (
    <div
      ref={ref} className={className} aria-hidden="true" data-fx="CurtainReveal"
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", cursor: "pointer" }}
    >
      {Array.from({ length: panels }, (_, i) => (
        <div key={i} data-fx-panel="" className={panelClassName} style={{ flex: 1, background: panelClassName ? undefined : color, willChange: "transform" }} />
      ))}
      <div data-fx-label="" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ 21. SVGPathDraw */

export type SVGPathDrawProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  mode?: "scroll" | "view";
  duration?: number;
  /** scroll: vùng cuộn tương ứng tiến độ */
  start?: string;
  end?: string;
  stagger?: number;
};

export function SVGPathDraw({ mode = "view", duration = 1.8, start = "top 80%", end = "bottom 35%", stagger = 0.15, children, ...rest }: SVGPathDrawProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  useFxLayout(svgRef as unknown as React.RefObject<HTMLElement>, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const shapes = Array.from(el.querySelectorAll<SVGGeometryElement>("path,line,polyline,polygon,circle,ellipse,rect"));
    shapes.forEach((s) => s.setAttribute("pathLength", "1"));
    gsap.set(shapes, { strokeDasharray: 1, strokeDashoffset: 1 });
    let off = () => {};
    if (mode === "scroll") {
      gsap.to(shapes, { strokeDashoffset: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start, end, scrub: true } });
    } else {
      off = observeInView(el as unknown as Element, (v) => v && gsap.to(shapes, { strokeDashoffset: 0, duration, stagger, ease: "power2.inOut" }), { once: true });
    }
    markReady(el);
    return off;
  }, [mode, duration, start, end, stagger]);
  return (
    <svg ref={svgRef} fill="none" stroke="currentColor" data-fx="SVGPathDraw" {...rest}>{children}</svg>
  );
}

/* ------------------------------------------------------------------ 24. ScrollProgress */

export type ScrollProgressProps = {
  variant?: "bar" | "ring";
  /** CSS selector của khối cần đo tiến độ; bỏ trống = cả trang */
  target?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  /** true: dùng vị trí mặc định (fixed). false: để consumer tự đặt vị trí */
  fixed?: boolean;
  label?: string;
};

export function ScrollProgress({ variant = "bar", target, size = 44, strokeWidth = 3, className, style, fixed = true, label = "Tiến độ cuộn trang" }: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const R = (size - strokeWidth) / 2, C = 2 * Math.PI * R;
  useFx(ref, (el) => {
    const bar = el.querySelector<HTMLElement>("[data-fx-bar]");
    const ring = el.querySelector<SVGCircleElement>("[data-fx-ring]");
    const tgt = target ? document.querySelector<HTMLElement>(target) : null;
    let raf = 0;
    const calc = () => {
      raf = 0;
      let p: number;
      if (tgt) {
        const r = tgt.getBoundingClientRect(), vh = window.innerHeight;
        p = r.height > vh ? -r.top / (r.height - vh) : (vh - r.top) / (r.height + vh);
      } else {
        const d = document.documentElement;
        p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
      }
      p = clamp(p, 0, 1);
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (ring) ring.style.strokeDashoffset = String(C * (1 - p));
      el.setAttribute("data-progress", p.toFixed(3));
      el.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    const offs = [on(window, "scroll", req, { passive: true }), on(window, "resize", req)];
    markReady(el);
    return () => { offs.forEach((f) => f()); if (raf) cancelAnimationFrame(raf); };
  }, [target, variant, C]);
  const base: CSSProperties = fixed
    ? variant === "bar"
      ? { position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9000 }
      : { position: "fixed", right: 16, bottom: 16, width: size, height: size, zIndex: 9000 }
    : {};
  return (
    <div ref={ref} className={className} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} data-fx="ScrollProgress" style={{ pointerEvents: "none", ...base, ...style }}>
      {variant === "bar" ? (
        <div data-fx-bar="" style={{ height: "100%", background: "currentColor", transformOrigin: "0 50%", transform: "scaleX(0)" }} />
      ) : (
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={strokeWidth} />
          <circle data-fx-ring="" cx={size / 2} cy={size / 2} r={R} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
        </svg>
      )}
    </div>
  );
}

