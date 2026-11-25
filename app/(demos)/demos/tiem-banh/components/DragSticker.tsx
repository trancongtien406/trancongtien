"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  /** vị trí ban đầu theo % của khối cha */
  left: number;
  top: number;
  rot?: number;
  width: number | string;
  rotatable?: boolean;
  className?: string;
  style?: CSSProperties;
};

let zTop = 5;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Nhãn dán kéo-thả, có tay nắm xoay (kéo tay nắm quanh tâm). Chuột, bút, cảm ứng (Pointer Events).
 * Bàn phím: mũi tên dời 12px, R / Shift+R xoay 12 độ. Giữ trong khối cha. Thả ra thì "dán" xuống (nảy nhẹ).
 */
export function DragSticker({ children, label, left, top, rot = 0, width, rotatable = false, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const st = useRef({ x: 0, y: 0, r: rot, init: false });

  const apply = () => {
    const el = ref.current;
    if (el) el.style.transform = `translate3d(${st.current.x}px, ${st.current.y}px, 0) rotate(${st.current.r}deg)`;
  };

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bounds = () => {
      const hr = host.getBoundingClientRect();
      return { w: hr.width, h: hr.height, ew: el.offsetWidth, eh: el.offsetHeight };
    };
    const place = () => {
      const b = bounds();
      if (!st.current.init) {
        st.current.x = (left / 100) * b.w - b.ew / 2;
        st.current.y = (top / 100) * b.h - b.eh / 2;
        st.current.init = true;
      }
      st.current.x = clamp(st.current.x, -b.ew * 0.2, b.w - b.ew * 0.8);
      st.current.y = clamp(st.current.y, -b.eh * 0.2, b.h - b.eh * 0.8);
      apply();
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(host);

    let mode: "" | "drag" | "rot" = "";
    let sx = 0, sy = 0, ox = 0, oy = 0, a0 = 0, r0 = 0;
    const center = () => { const r = el.getBoundingClientRect(); return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }; };
    const down = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      mode = t.closest("[data-rot]") ? "rot" : "drag";
      if (mode === "rot" && !rotatable) mode = "drag";
      el.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; ox = st.current.x; oy = st.current.y;
      const c = center(); a0 = Math.atan2(e.clientY - c.cy, e.clientX - c.cx); r0 = st.current.r;
      el.dataset.active = "1";
      zTop += 1; el.style.zIndex = String(zTop); // đưa lên trên cùng
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!mode) return;
      if (mode === "drag") {
        const b = bounds();
        st.current.x = clamp(ox + e.clientX - sx, -b.ew * 0.2, b.w - b.ew * 0.8);
        st.current.y = clamp(oy + e.clientY - sy, -b.eh * 0.2, b.h - b.eh * 0.8);
      } else {
        const c = center();
        st.current.r = r0 + ((Math.atan2(e.clientY - c.cy, e.clientX - c.cx) - a0) * 180) / Math.PI;
      }
      apply();
    };
    const up = (e: PointerEvent) => {
      if (!mode) return;
      mode = "";
      el.dataset.active = "";
      try { el.releasePointerCapture(e.pointerId); } catch { /* đã thả */ }
      if (!reduce) { el.classList.remove("mkStick"); void el.offsetWidth; el.classList.add("mkStick"); }
    };
    const key = (e: KeyboardEvent) => {
      const step = 12;
      const k = e.key;
      if (k === "ArrowLeft") st.current.x -= step;
      else if (k === "ArrowRight") st.current.x += step;
      else if (k === "ArrowUp") st.current.y -= step;
      else if (k === "ArrowDown") st.current.y += step;
      else if ((k === "r" || k === "R") && rotatable) st.current.r += e.shiftKey ? -12 : 12;
      else return;
      e.preventDefault();
      place();
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("keydown", key);
    return () => {
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("keydown", key);
    };
  }, [left, top, rotatable]);

  return (
    <div
      ref={ref}
      className={className}
      data-sticker=""
      role="group"
      tabIndex={0}
      aria-label={`${label}. Kéo để dời${rotatable ? ", kéo tay nắm tròn để xoay" : ""}. Bàn phím: mũi tên để dời${rotatable ? ", phím R để xoay" : ""}.`}
      style={{ position: "absolute", left: 0, top: 0, width, touchAction: "none", cursor: "grab", transform: `translate3d(0,0,0) rotate(${rot}deg)`, ...style }}
    >
      {children}
      {rotatable && <button type="button" data-rot="" tabIndex={-1} aria-hidden="true" className="mkRotHandle" style={{ touchAction: "none" }} />}
    </div>
  );
}
