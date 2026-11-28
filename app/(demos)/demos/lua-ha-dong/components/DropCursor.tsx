"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Drop } from "./Art";

/* Giọt mực đi theo con trỏ trên các khối nền trắng ngà (như trong video). Chỉ khi có chuột. */
export function DropCursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const d = el.current;
    if (!d || !window.matchMedia("(hover:hover) and (pointer:fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = gsap.quickTo(d, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(d, "y", { duration: 0.35, ease: "power3.out" });
    const on = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const inside = !!t?.closest("[data-drop]");
      d.style.opacity = inside ? "1" : "0";
      x(e.clientX + 8);
      y(e.clientY + 8);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);
  return (
    <div ref={el} aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, zIndex: 120, pointerEvents: "none", opacity: 0, transition: "opacity .25s" }}>
      <Drop size={20} color="#2f3b28" />
    </div>
  );
}
