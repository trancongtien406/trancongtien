"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ngôn ngữ chuyển động của Bến Vị: XOAY và MỞ VÒNG (như đĩa, bàn xoay, mở nắp cloche), không fade-up.
 * - Hero: đĩa xoay -14° rồi hạ xuống bàn, vòng chữ quay chậm.
 * - Khối nội dung vào bằng "mở vòng" (clip-path hình tròn nở từ mép trái), vạch vàng quét ngang.
 * - Cuộn: chồng đĩa nổi bật xoay theo cuộn.
 * Chỉ transform/opacity/clip-path. prefers-reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    root.setAttribute("data-bv-js", "1");
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(q('[data-bv="plate"]'), { scale: 0.82, rotate: -14, opacity: 0, duration: 1.3, ease: "power4.out" }, 0.05)
        .from(q('[data-bv="ring"]'), { opacity: 0, scale: 0.9, duration: 1.2 }, 0.3)
        .from(q('[data-bv="fade"]'), { y: 14, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.5)
        .from(q('[data-bv="chip"]'), { scale: 0.6, opacity: 0, duration: 0.6, ease: "back.out(1.6)" }, 1.2);
      gsap.to(q('[data-bv="ring"]'), { rotate: 360, duration: 80, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

      q('[data-bv="reveal"]').forEach((el) => {
        gsap.fromTo(el, { clipPath: "circle(0% at 0% 35%)" }, { clipPath: "circle(160% at 0% 35%)", duration: 1.15, ease: "power2.inOut", clearProps: "clipPath", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      q('[data-bv="rule"]').forEach((el) => {
        gsap.from(el, { scaleX: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      const stack = document.querySelector<HTMLElement>('[data-bv="sigstack"]');
      if (stack) gsap.fromTo(stack, { rotate: -8 }, { rotate: 8, ease: "none", scrollTrigger: { trigger: stack.closest("section"), start: "top bottom", end: "bottom top", scrub: 0.8 } });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => { window.removeEventListener("load", refresh); mm.revert(); root.removeAttribute("data-bv-js"); };
  }, []);
  return null;
}
