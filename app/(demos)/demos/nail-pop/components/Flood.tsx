"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import s from "../brand.module.css";

/**
 * Color-flood: màu loang từ điểm con trỏ phủ đầy thẻ, thu về điểm con trỏ rời đi.
 * Chuột/bút: hover. Cảm ứng: chạm bật/tắt (loang từ điểm chạm). Bàn phím: focus trong thẻ loang từ tâm.
 * Chỉ animate transform của lớp loang; màu chữ đổi qua biến CSS.
 */
export function Flood({ children, color, on, className = "" }: { children: ReactNode; color: string; on: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-fx", "ColorFlood");
    el.setAttribute("data-fx-ready", window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "static" : "1");
    const pos = (e: { clientX: number; clientY: number } | null) => {
      const r = el.getBoundingClientRect();
      const x = e ? e.clientX - r.left : r.width / 2;
      const y = e ? e.clientY - r.top : r.height / 2;
      el.style.setProperty("--fx", `${x}px`);
      el.style.setProperty("--fy", `${y}px`);
    };
    const set = (v: boolean) => el.setAttribute("data-on", v ? "1" : "0");
    const enter = (e: PointerEvent) => { if (e.pointerType === "touch") return; pos(e); set(true); };
    const leave = (e: PointerEvent) => { if (e.pointerType === "touch") return; pos(e); set(false); };
    const tap = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      if ((e.target as HTMLElement).closest("a,button")) return;
      pos(e); set(el.getAttribute("data-on") !== "1");
    };
    const fin = () => { pos(null); set(true); };
    const fout = (e: FocusEvent) => { if (!el.contains(e.relatedTarget as Node)) { pos(null); set(false); } };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerup", tap);
    el.addEventListener("focusin", fin);
    el.addEventListener("focusout", fout);
    return () => {
      el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerup", tap); el.removeEventListener("focusin", fin); el.removeEventListener("focusout", fout);
    };
  }, []);

  return (
    <article ref={ref} className={`${s.flood} ${className}`} data-on="0" style={{ "--flood": color, "--on": on } as CSSProperties}>
      <span className={s.floodDisc} aria-hidden="true" />
      <div className={s.floodBody}>{children}</div>
    </article>
  );
}
