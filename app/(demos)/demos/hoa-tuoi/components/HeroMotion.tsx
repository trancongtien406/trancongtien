"use client";

import { useLayoutEffect } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/features/showroom/effects";

/**
 * Hero choreography (khoảng 3 giây, theo thứ tự):
 *  0.0s nền + masthead hiện  |  0.3s ảnh nở bằng mặt nạ cánh hoa (PetalMask)  |  0.5s blob hình hoa phình ra
 *  0.7s lá trượt vào từ hai cạnh  |  1.0s tiêu đề mọc như nụ (BloomText)  |  1.6s đoạn mô tả  |  2.0s nút + huy hiệu quay.
 * Trạng thái ẩn chỉ đặt khi JS đã chạy; reduced-motion: không đặt gì, mọi thứ hiện sẵn.
 */
export function HeroMotion() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const root = document.getElementById("dau-trang");
    if (!root) return;
    const q = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const ctx = gsap.context(() => {
      const leaves = q<HTMLElement>("[data-h='leaf']");
      const fades = q<HTMLElement>("[data-h='fade']");
      const ctas = q<HTMLElement>("[data-h='cta']");
      const blob = q<HTMLElement>("[data-h='blob']");
      const ring = q<HTMLElement>("[data-h='ring']");
      gsap.set(leaves, { opacity: 0, xPercent: (i) => (i % 2 ? 40 : -40), yPercent: 10 });
      gsap.set(fades, { opacity: 0, y: 26 });
      gsap.set(ctas, { opacity: 0, y: 18 });
      gsap.set(blob, { opacity: 0, scale: 0.4 });
      gsap.set(ring, { opacity: 0, scale: 0.6 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(blob, { opacity: 1, scale: 1, duration: 1.4, ease: "expo.out" }, 0.5)
        .to(leaves, { opacity: 1, xPercent: 0, yPercent: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" }, 0.7)
        .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1.6)
        .to(ctas, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 2.0)
        .to(ring, { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)" }, 2.0);
    }, root);
    return () => ctx.revert();
  }, []);
  return null;
}
