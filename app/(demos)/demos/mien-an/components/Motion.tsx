"use client";

import { useEffect } from "react";

/**
 * Ngôn ngữ chuyển động của Miên An: "thở".
 * - Khối nội dung nở ra từ 0.97 → 1 rất chậm (sine), như hít vào; không trượt lên-xuống.
 * - Chữ hero rõ dần từ mờ (blur → nét) thay vì trượt qua mặt nạ.
 * - Ảnh liệu trình, không gian mở ra theo vòng tròn từ tâm như gợn nước.
 * Chỉ là progressive enhancement: nội dung vẫn đủ khi JS lỗi hoặc reduced-motion.
 */
export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-ma-root]");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        root.dataset.motion = "on";
        const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, root);

        // Hero: chữ rõ dần như sương tan, rồi mô tả và CTA nở ra.
        const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });
        tl.from('[data-hero="eyebrow"]', { opacity: 0, duration: 0.9 }, 0.1)
          .from("[data-hero-line]", { opacity: 0, filter: "blur(14px)", scale: 0.97, transformOrigin: "0% 60%", duration: 1.5, stagger: 0.28 }, 0.2)
          .from('[data-hero="desc"]', { opacity: 0, scale: 0.98, duration: 1.2 }, 1.0)
          .from('[data-hero="cta"]', { opacity: 0, scale: 0.97, duration: 1.1 }, 1.25)
          .from('[data-hero="caption"]', { opacity: 0, duration: 1 }, 1.6);
        tl.eventCallback("onComplete", () => { gsap.set("[data-hero], [data-hero-line]", { clearProps: "opacity,filter,transform,scale" }); });

        // Khối nội dung "hít vào": nở nhẹ + hiện dần, một lần.
        q("[data-reveal]").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, scale: 0.968 }, { opacity: 1, scale: 1, duration: 1.4, ease: "sine.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        });

        // Ảnh: mở vòng tròn từ tâm như gợn nước.
        q('[data-ripple]').forEach((el) => {
          gsap.fromTo(el, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(78% at 50% 50%)", duration: 1.6, ease: "power2.inOut", clearProps: "clipPath", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });
      }, root);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
      delete root.dataset.motion;
    };
  }, []);
  return null;
}
