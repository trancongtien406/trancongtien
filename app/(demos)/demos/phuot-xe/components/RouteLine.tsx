"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";

/**
 * Đường nhựa chạy dọc cung đường: vạch kẻ trắng nối các điểm dừng, lớp nhựa đen kéo xuống theo cuộn (scrub).
 * Reduced-motion: vạch hiện đủ. Trang trí (aria-hidden).
 */
export function RouteLine() {
  const ref = useRef<HTMLDivElement>(null);
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) return;
    const track = el.parentElement;
    const fill = el.querySelector<HTMLElement>("[data-fill]");
    if (!track || !fill) return;
    const tween = gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "50% 0%", scrollTrigger: { trigger: track, start: "top 70%", end: "bottom 45%", scrub: 0.4 } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div ref={ref} className={s.routeLine} aria-hidden="true" data-fx="RouteLine">
      <i className={s.routeFill} data-fill="" />
    </div>
  );
}
