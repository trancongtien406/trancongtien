"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, observeInView, prefersReducedMotion, registerGsap, useFx } from "@/features/showroom/effects";
import styles from "../brand.module.css";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** scroll: tô theo cuộn (scrub). view: tô một lần khi vào khung. hover: chỉ tô khi rê/focus. static: không động */
  mode?: "scroll" | "view" | "hover" | "static";
  /** hướng tô: x trái sang phải, y dưới lên trên */
  dir?: "x" | "y";
  start?: string;
  end?: string;
  /** gắn data-sg để Motion tìm */
  hook?: string;
  /** không tô khi rê chuột (hero tự điều khiển) */
  noHover?: boolean;
  "aria-hidden"?: boolean | "true";
};

/**
 * Chữ rỗng viền khổng lồ. Biến --sg-fill (tween bởi gsap) và --sg-hover (CSS) cùng quyết định phần chữ được tô axit.
 * Không JS / reduced-motion: vẫn là chữ rỗng viền đọc được, rê chuột vẫn tô tức thì.
 */
export function OutlineText({ children, as, className = "", style, mode = "scroll", dir = "x", hook, noHover, "aria-hidden": ariaHidden, start = "top 88%", end = "top 38%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;
  useFx(ref, (el) => {
    registerGsap();
    if (mode === "static" || mode === "hover" || prefersReducedMotion()) { el.setAttribute("data-fx-ready", "static"); return; }
    let off = () => {};
    let tl: gsap.core.Tween | null = null;
    if (mode === "scroll") {
      tl = gsap.fromTo(el, { "--sg-fill": "0%" }, { "--sg-fill": "100%", ease: "none", scrollTrigger: { trigger: el, start, end, scrub: 0.6 } });
    } else {
      off = observeInView(el, (v) => { if (v) gsap.to(el, { "--sg-fill": "100%", duration: 1, ease: "power2.inOut" }); }, { once: true });
    }
    el.setAttribute("data-fx-ready", "1");
    return () => { off(); tl?.scrollTrigger?.kill(); tl?.kill(); gsap.set(el, { clearProps: "--sg-fill" }); };
  }, [mode, start, end]);
  return (
    <Tag ref={ref} className={`${styles.outline} ${dir === "y" ? styles.outlineUp : ""} ${noHover ? "" : styles.outlineHover} ${className}`} style={style} data-fx="OutlineText" data-sg={hook} aria-hidden={ariaHidden}>
      {children}
    </Tag>
  );
}
