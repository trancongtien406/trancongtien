"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "Lật từng trang": hero mở như bìa album (tấm phủ giấy kéo lên, tiêu đề trồi từng dòng, ảnh phụ xoay nhẹ vào chỗ),
 * moment 1: ảnh album đặt xuống như đặt ảnh lên bàn (y + xoay nhẹ, stagger), moment 2: ba ảnh photo essay trôi dọc khác tốc độ (chỉ ảnh, chỉ desktop).
 * Chỉ transform/opacity. reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector("[data-tm-root]");
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.setAttribute("data-tm-armed", "1");
      const clear = { clearProps: "transform,opacity" };
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-tm="meta"]'), { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0)
        .fromTo(q('[data-tm="photo"]'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.12)
        .fromTo(q('[data-tm="cover"]'), { scaleY: 1 }, { scaleY: 0, duration: 1, ease: "power2.inOut", transformOrigin: "50% 0%" }, 0.12)
        .fromTo(q('[data-tm="h1"]'), { yPercent: 105 }, { yPercent: 0, duration: 0.8, stagger: 0.14 }, 0.28)
        .fromTo(q('[data-tm="inset"]'), { opacity: 0, y: 16, rotate: -4 }, { opacity: 1, y: 0, rotate: -2, duration: 0.65 }, 0.8)
        .fromTo(q('[data-tm="body"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.05)
        .fromTo(q('[data-tm="caption"]'), { opacity: 0 }, { opacity: 1, duration: 0.45 }, 1.35)
        .set(q('[data-tm="cover"]'), { display: "none" })
        .set(q('[data-tm="meta"],[data-tm="photo"],[data-tm="h1"],[data-tm="body"],[data-tm="caption"]'), clear)
        .set(q('[data-tm="inset"]'), { clearProps: "opacity,y" });

      q("[data-tm-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", ...clear, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      // moment 1: những trang ảnh mở ra
      const items = q("[data-tm-album]");
      items.forEach((el, i) => {
        const rot = i % 2 === 0 ? -2.5 : 2.5;
        gsap.fromTo(el, { opacity: 0, y: 32, rotate: rot }, { opacity: 1, y: 0, rotate: 0, duration: 0.85, delay: (i % 2) * 0.12, ease: "power3.out", ...clear, scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });

      // moment 2: ba ảnh photo essay trôi dọc nhẹ (chỉ desktop)
      const mq = gsap.matchMedia();
      mq.add("(min-width: 1024px)", () => {
        const disp: [number, number][] = [[18, -12], [28, -20], [12, -8]];
        q("[data-tm-essay]").forEach((el, i) => {
          const [a, b] = disp[i] ?? [12, -8];
          gsap.fromTo(el, { y: a }, { y: b, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        });
      });
      return () => { mq.revert(); root.removeAttribute("data-tm-armed"); };
    });
    return () => { mm.revert(); };
  }, []);
  return null;
}
