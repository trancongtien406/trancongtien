"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/features/showroom/effects";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Chuyển động toàn trang (chỉ transform/opacity/filter):
 * (1) [data-dx="rise"]: khối nâng lên theo lô khi vào khung,
 * (2) [data-dx="focus"]: ảnh mờ rồi nét (blur-to-sharp) kèm phóng nhẹ khi vào khung, blur nhỏ hơn trên màn hình hẹp,
 * (3) [data-dx-streak]: vệt sáng chạy ngang ảnh, tiến độ gắn với cuộn của chính khung ảnh (scrub).
 * Reduced-motion: không làm gì, nội dung hiện đủ. Trạng thái ẩn chỉ đặt bằng JS (no-JS vẫn đọc được).
 */
export function Motion() {
  useIso(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const small = window.matchMedia("(max-width: 760px)").matches;
      const rise = gsap.utils.toArray<HTMLElement>('[data-dx="rise"]');
      gsap.set(rise, { opacity: 0, y: 36 });
      ScrollTrigger.batch(rise, {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: true, clearProps: "transform,opacity" }),
      });
      gsap.utils.toArray<HTMLElement>('[data-dx="focus"]').forEach((el) => {
        gsap.fromTo(
          el,
          { filter: `blur(${small ? 8 : 18}px)`, scale: 1.07, opacity: 0.35 },
          { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", clearProps: "filter,transform,opacity", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-dx-streak]").forEach((el) => {
        const frame = el.parentElement as HTMLElement;
        gsap.fromTo(
          el,
          { xPercent: -160, opacity: 0 },
          {
            keyframes: { xPercent: [-160, 120, 520], opacity: [0, 0.85, 0], easeEach: "none" },
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 95%", end: "bottom 5%", scrub: 0.6 },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { window.clearTimeout(t); window.removeEventListener("load", onLoad); };
  }, []);
  return null;
}
