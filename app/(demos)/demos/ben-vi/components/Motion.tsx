"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chữ ký chuyển động "ra món": đĩa tròn xoay nhẹ rồi hạ xuống bàn, chữ trồi lên theo từng dòng,
 * vòng chữ quanh đĩa quay chậm. Cuộn: (1) chồng đĩa nổi bật xoay theo cuộn, (2) ảnh bàn tiệc mở dần.
 * Chỉ transform/opacity. Tôn trọng prefers-reduced-motion: không hiệu ứng, nội dung hiện đủ.
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
      tl.from(q('[data-bv="hl"]'), { yPercent: 110, duration: 0.9, stagger: 0.14 }, 0.1)
        .from(q('[data-bv="plate"]'), { scale: 0.82, rotate: -14, opacity: 0, duration: 1.3, ease: "power4.out" }, 0.05)
        .from(q('[data-bv="ring"]'), { opacity: 0, scale: 0.9, duration: 1.2 }, 0.3)
        .from(q('[data-bv="fade"]'), { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.5)
        .from(q('[data-bv="chip"]'), { y: 16, opacity: 0, duration: 0.6, stagger: 0.18 }, 1.2);
      gsap.to(q('[data-bv="ring"]'), { rotate: 360, duration: 80, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

      q('[data-bv="reveal"]').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      q('[data-bv="rule"]').forEach((el) => {
        gsap.from(el, { scaleX: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      // moment 1: chồng đĩa xoay theo cuộn
      const stack = document.querySelector<HTMLElement>('[data-bv="sigstack"]');
      if (stack) gsap.fromTo(stack, { rotate: -8 }, { rotate: 8, ease: "none", scrollTrigger: { trigger: stack.closest("section"), start: "top bottom", end: "bottom top", scrub: 0.8 } });
      // moment 2: ảnh bàn tiệc mở dần (scale ảnh)
      q('[data-bv="tile"]').forEach((el, i) => {
        const img = el.querySelector("img");
        if (img) gsap.from(img, { scale: 1.25, opacity: 0.2, duration: 1.1, delay: (i % 2) * 0.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
    });
    return () => { mm.revert(); root.removeAttribute("data-bv-js"); };
  }, []);
  return null;
}
