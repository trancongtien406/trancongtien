"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/features/showroom/effects";
import { ConfettiBurst, burstAt } from "./Sprinkles";

/**
 * Chuyển động toàn trang:
 * (1) menu "bật" lên theo lô khi cuộn tới (batch + back.out),
 * (2) tiêu đề section lật nhẹ vào,
 * (3) bấm nút có data-confetti thì bung confetti rồi mới đi tiếp (không chặn điều hướng).
 * Reduced-motion: không có chuyển động, nội dung giữ nguyên.
 */
export function Motion() {
  useEffect(() => {
    registerGsap();
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-confetti]");
      if (a) burstAt(a, 70);
    };
    document.addEventListener("click", click);
    if (prefersReducedMotion()) return () => document.removeEventListener("click", click);
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-mk="pop"]', {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 46, scale: 0.9, rotate: () => gsap.utils.random(-4, 4), opacity: 0 }, { y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)", stagger: 0.07, overwrite: true }),
      });
      gsap.utils.toArray<HTMLElement>("[data-mk-h]").forEach((el) => {
        gsap.from(el, { y: 36, rotate: -2, opacity: 0, duration: 0.8, ease: "back.out(1.6)", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    });
    return () => { ctx.revert(); document.removeEventListener("click", click); };
  }, []);
  return <ConfettiBurst />;
}
