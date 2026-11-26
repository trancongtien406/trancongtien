"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "The Diagonal Cut": ảnh hero mở bằng tấm lime quét ngang, tiêu đề vào từng dòng, đường kẻ mở theo trục.
 * Hero 1.5s. Chỉ transform/opacity. Ngoài reduced-motion mới có hiệu ứng: nếu reduce, mọi nội dung hiện đủ ngay.
 * Hai moment cuộn: contact sheet của Lookbook và tấm phủ đen quét chéo ở phần kết.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector("[data-nl-root]");
    if (!root) return;
    const q = (s: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const clear = { clearProps: "transform,opacity" };
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-nl="issue"]'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 }, 0)
        .fromTo(q('[data-nl="cover"]'), { scaleX: 1 }, { scaleX: 0, duration: 0.8, ease: "power4.inOut" }, 0.08)
        .fromTo(q('[data-nl="h1a"]'), { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.55 }, 0.24)
        .fromTo(q('[data-nl="h1b"]'), { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.55 }, 0.34)
        .fromTo(q('[data-nl="eyebrow"],[data-nl="slogan"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.7)
        .fromTo(q('[data-nl="desc"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.86)
        .fromTo(q('[data-nl="cta"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, 0.89)
        .set(q('[data-nl="issue"],[data-nl="cover"],[data-nl="h1a"],[data-nl="h1b"],[data-nl="eyebrow"],[data-nl="slogan"],[data-nl="desc"],[data-nl="cta"]'), clear);

      q("[data-nl-rule]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      q("[data-nl-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", ...clear, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // scroll moment 1: Lookbook contact sheet
      const lb = root.querySelector<HTMLElement>("[data-nl-lookbook]");
      if (lb) {
        const cards = q('[data-nl="lb-card"]', lb);
        gsap.fromTo(cards, { opacity: 0.001, clipPath: "polygon(0 0, 0 0, -14% 100%, -14% 100%)" }, { opacity: 1, clipPath: "polygon(0 0, 114% 0, 100% 100%, -14% 100%)", duration: 0.7, stagger: 0.08, ease: "power3.inOut", clearProps: "clipPath,opacity", scrollTrigger: { trigger: lb.querySelector('[data-nl="lb-layout"]'), start: "top 82%", once: true } });
      }
      // scroll moment 2: closing diagonal takeover
      const fin = root.querySelector<HTMLElement>("[data-nl-final]");
      if (fin) {
        const t = gsap.timeline({ scrollTrigger: { trigger: fin, start: "top 70%", once: true } });
        t.fromTo(q('[data-nl="wipe"]', fin), { scaleX: 1 }, { scaleX: 0, duration: 0.8, ease: "power4.inOut" }, 0)
          .fromTo(q('[data-nl="f-eyebrow"]', fin), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.45)
          .fromTo(q('[data-nl="f-h"]', fin), { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7 }, 0.55)
          .fromTo(q('[data-nl="f-cta"]', fin), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, 1.0)
          .set(q('[data-nl="wipe"],[data-nl="f-eyebrow"],[data-nl="f-h"],[data-nl="f-cta"]', fin), clear);
      }
    });
    return () => { mm.revert(); };
  }, []);
  return null;
}
