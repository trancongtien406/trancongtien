"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/features/showroom/effects";
import s from "../brand.module.css";

const PAW = (
  <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" focusable="false">
    <g fill="#14121a" stroke="#fff" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
      <path d="M50 52c-14 0-26 12-24 24 2 10 12 9 24 9s22 1 24-9c2-12-10-24-24-24z" />
      <ellipse cx="24" cy="44" rx="9" ry="12" transform="rotate(-20 24 44)" />
      <ellipse cx="40" cy="28" rx="9" ry="13" transform="rotate(-6 40 28)" />
      <ellipse cx="60" cy="28" rx="9" ry="13" transform="rotate(6 60 28)" />
      <ellipse cx="76" cy="44" rx="9" ry="12" transform="rotate(20 76 44)" />
    </g>
  </svg>
);

/**
 * Con trỏ chân thú: dấu chân đi theo con trỏ (quickTo), phóng khi rê lên nút/liên kết, đóng dấu khi bấm,
 * và để lại vài dấu chân mờ dần khi di chuyển (tối đa 7 cái, mỗi 120px). Chỉ pointer fine, tắt khi reduced-motion,
 * tự trả con trỏ hệ thống trong ô nhập chữ.
 */
export function PawCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current, tr = trail.current;
    if (!el || !tr || !hasFinePointer() || prefersReducedMotion()) return;
    const root = el.closest<HTMLElement>("[data-pv-root]");
    if (!root) return;
    root.dataset.paw = "on";
    gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100, scale: 0.9 });
    const qx = gsap.quickTo(el, "x", { duration: 0.14, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.14, ease: "power3.out" });
    let lx = 0, ly = 0, acc = 0, side = 1, seen = false, onText = false;
    const isText = (t: EventTarget | null) => !!(t as HTMLElement | null)?.closest?.("input:not([type=radio]):not([type=checkbox]), textarea, select");
    const print = (x: number, y: number, ang: number) => {
      if (tr.childElementCount >= 7) tr.firstElementChild?.remove();
      const p = document.createElement("div");
      p.className = s.pawPrint;
      p.innerHTML = `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><g fill="#14121a"><path d="M50 52c-14 0-26 12-24 24 2 10 12 9 24 9s22 1 24-9c2-12-10-24-24-24z"/><ellipse cx="24" cy="44" rx="9" ry="12" transform="rotate(-20 24 44)"/><ellipse cx="40" cy="28" rx="9" ry="13" transform="rotate(-6 40 28)"/><ellipse cx="60" cy="28" rx="9" ry="13" transform="rotate(6 60 28)"/><ellipse cx="76" cy="44" rx="9" ry="12" transform="rotate(20 76 44)"/></g></svg>`;
      tr.appendChild(p);
      gsap.fromTo(p, { x, y, rotation: ang, scale: 0.6, opacity: 0.4, xPercent: -50, yPercent: -50 }, { scale: 1, opacity: 0, duration: 1, ease: "power1.out", onComplete: () => p.remove() });
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const t = isText(e.target);
      if (t !== onText) { onText = t; gsap.to(el, { opacity: t ? 0 : 1, duration: 0.12 }); }
      if (!seen) { seen = true; gsap.set(el, { x: e.clientX, y: e.clientY }); lx = e.clientX; ly = e.clientY; gsap.to(el, { opacity: 1, duration: 0.2 }); }
      qx(e.clientX); qy(e.clientY);
      const d = Math.hypot(e.clientX - lx, e.clientY - ly);
      acc += d;
      if (acc > 120 && !onText) {
        const ang = (Math.atan2(e.clientY - ly, e.clientX - lx) * 180) / Math.PI + 90;
        const nx = Math.cos((ang * Math.PI) / 180) * 9 * side, ny = Math.sin((ang * Math.PI) / 180) * 9 * side;
        print(e.clientX + nx, e.clientY + ny, ang);
        side *= -1; acc = 0;
      }
      lx = e.clientX; ly = e.clientY;
      const hot = !!(e.target as HTMLElement).closest?.("a, button, summary, label, [data-paw], [role=button]");
      gsap.to(el, { scale: hot ? 1.4 : 0.9, rotation: hot ? -14 : 0, duration: 0.16, ease: "power2.out", overwrite: "auto" });
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      gsap.timeline().to(el, { scale: 0.7, duration: 0.07 }).to(el, { scale: 1.1, duration: 0.14, ease: "power2.out" });
      if (!onText) print(e.clientX, e.clientY, 0);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.15 });
    const enter = () => { if (seen && !onText) gsap.to(el, { opacity: 1, duration: 0.15 }); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      delete root.dataset.paw;
      gsap.killTweensOf(el);
      tr.replaceChildren();
    };
  }, []);

  return (
    <>
      <div ref={trail} className={s.pawTrail} aria-hidden="true" />
      <div ref={dot} className={s.pawCursor} aria-hidden="true" style={{ opacity: 0 }}>{PAW}</div>
    </>
  );
}
