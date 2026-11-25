"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/features/showroom/effects";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Chuyển động toàn trang (chỉ transform/opacity):
 * (1) --vx-v: vận tốc cuộn 0..1 đặt lên gốc trang, nuôi SpeedLines và vệt chữ "tốc độ" (làm dịu khi dừng),
 * (2) [data-vx="rise"]: khối lướt lên theo lô khi vào khung, hơi nghiêng như vào cua,
 * (3) [data-vx="slash"]: tiêu đề section cắt chéo từ trái vào.
 * Reduced-motion: không làm gì, nội dung hiện đủ. Trạng thái ẩn chỉ đặt bằng JS (no-JS vẫn đọc được).
 */
export function Motion() {
  useIso(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>("[data-vx-root]");
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rise = gsap.utils.toArray<HTMLElement>('[data-vx="rise"]');
      gsap.set(rise, { opacity: 0, y: 44, skewY: 2.5 });
      ScrollTrigger.batch(rise, {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power3.out", stagger: 0.08, overwrite: true, clearProps: "transform" }),
      });
      const slash = gsap.utils.toArray<HTMLElement>('[data-vx="slash"]');
      slash.forEach((el) => {
        gsap.fromTo(el, { x: -70, skewX: -18, opacity: 0 }, { x: 0, skewX: 0, opacity: 1, duration: 0.8, ease: "power4.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      let timer = 0;
      if (root) {
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 2600, 1);
            gsap.to(root, { "--vx-v": v, duration: 0.18, overwrite: true });
            window.clearTimeout(timer);
            timer = window.setTimeout(() => gsap.to(root, { "--vx-v": 0, duration: 0.9, ease: "power2.out", overwrite: true }), 90);
          },
        });
        return () => { st.kill(); window.clearTimeout(timer); gsap.set(root, { "--vx-v": 0 }); };
      }
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
