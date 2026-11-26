"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/features/showroom/effects";

/**
 * Chuyển động cuộn toàn trang (một lần ở gốc):
 * - Lá nhiều tầng: phần tử [data-leaf] trượt/xoay lệch nhịp nhau theo cuộn (data-y, data-x, data-r),
 *   scrub 0.8; trên điện thoại chỉ 40% biên độ.
 * - Huy hiệu chữ chạy theo vòng [data-spin] xoay theo tiến độ cuộn trang.
 * - Thẻ [data-rise] mọc từ đáy lên (clip-path) theo lô khi vào khung.
 * Reduced-motion: không chạy gì, nội dung giữ nguyên.
 */
export function Motion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const small = window.innerWidth < 760;
    const k = small ? 0.4 : 1;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-leaf]").forEach((el) => {
        const scope = el.closest<HTMLElement>("[data-leaf-scope]") ?? el.parentElement!;
        gsap.fromTo(
          el,
          { y: 0, x: 0, rotate: 0 },
          {
            y: parseFloat(el.dataset.y ?? "0") * k,
            x: parseFloat(el.dataset.x ?? "0") * k,
            rotate: parseFloat(el.dataset.r ?? "0") * k,
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
        gsap.to(el, { rotate: 360, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      });
      // thẻ [data-rise] "mọc từ cuống": mở từ đáy lên, cùng ngôn ngữ nở của BloomText
      gsap.set("[data-rise]", { clipPath: "inset(100% 0 0 0)", y: 28, opacity: 0.2 });
      ScrollTrigger.batch("[data-rise]", {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { clipPath: "inset(-8% -8% -8% -8%)", y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true, clearProps: "clipPath,transform,opacity" }),
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
