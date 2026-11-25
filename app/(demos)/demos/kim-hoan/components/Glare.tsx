"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/features/showroom/effects";
import styles from "../brand.module.css";

/**
 * Cursor glare: vệt sáng vàng đi theo con trỏ trên bề mặt tối (nền toả mềm + viền sáng lên gần con trỏ).
 * Chỉ chạy với pointer fine; CSS vars --gx/--gy cập nhật bằng rAF. Touch/reduced-motion: không gắn gì.
 */
export function Glare({ children, className, as, style, strength }: { children: ReactNode; className?: string; as?: ElementType; style?: CSSProperties; strength?: "soft" | "strong" }) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) {
      el?.setAttribute("data-fx-ready", "static");
      return;
    }
    let raf = 0;
    let px = 0;
    let py = 0;
    const paint = () => {
      raf = 0;
      el.style.setProperty("--gx", `${px}px`);
      el.style.setProperty("--gy", `${py}px`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const enter = (e: PointerEvent) => {
      move(e);
      el.setAttribute("data-glare", "1");
    };
    const leave = () => el.setAttribute("data-glare", "0");
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    el.setAttribute("data-fx-ready", "1");
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <Tag ref={ref} className={`${styles.glare} ${strength === "strong" ? styles.glareStrong : ""} ${className ?? ""}`} style={style} data-fx="GoldGlare" data-glare="0">
      {children}
    </Tag>
  );
}
