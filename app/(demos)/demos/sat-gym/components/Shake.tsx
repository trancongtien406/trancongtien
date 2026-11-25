"use client";

import { useEffect } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/features/showroom/effects";

const last = new WeakMap<Element, number>();

/** Rung nhẹ có kiểm soát: biên độ ±2px (±1px trên cảm ứng), 3 nhịp, 0.2 giây, tối đa 1 lần mỗi 350ms trên mỗi nút. */
export function shake(el: Element | null) {
  if (!el || prefersReducedMotion()) return;
  const now = performance.now();
  if (now - (last.get(el) ?? -1e9) < 350) return;
  last.set(el, now);
  const a = hasFinePointer() ? 2 : 1;
  gsap.killTweensOf(el, "x,rotation");
  gsap.fromTo(
    el,
    { x: 0, rotation: 0 },
    { keyframes: [{ x: -a, rotation: -0.4 }, { x: a, rotation: 0.4 }, { x: -a / 2, rotation: -0.2 }, { x: 0, rotation: 0 }], duration: 0.2, ease: "power1.inOut", onComplete: () => { gsap.set(el, { clearProps: "x,rotation" }); } },
  );
}

/** Lắng nghe uỷ quyền mọi phần tử có data-shake trong trang (nhấn chuột, chạm, Enter hoặc Space). */
export function ShakeProvider() {
  useEffect(() => {
    const hit = (t: EventTarget | null) => (t as Element | null)?.closest?.("[data-shake]:not([aria-disabled='true'])") ?? null;
    const down = (e: PointerEvent) => { if (e.button === 0 || e.pointerType === "touch") shake(hit(e.target)); };
    const key = (e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) shake(hit(e.target)); };
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", down); document.removeEventListener("keydown", key); };
  }, []);
  return null;
}
