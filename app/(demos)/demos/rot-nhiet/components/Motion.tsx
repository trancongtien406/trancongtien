"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chữ ký chuyển động: "áp phích được dán lên tường" - chữ rơi vào nhịp, tem đóng dấu,
 * dải đỏ trượt theo cuộn, manifesto sáng dần từng từ. Chỉ transform/opacity.
 * Tôn trọng prefers-reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.setAttribute("data-rn-js", "1");
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      const one = (sel: string) => q(sel);
      tl.fromTo(one('[data-rn="meta"]'), { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4 }, 0)
        .fromTo(one(".rn-ch"), { yPercent: 70, rotate: 5, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.06 }, 0.1)
        .fromTo(one('[data-rn="frame"]'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.35)
        .fromTo(one('[data-rn="sub"]'), { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.9)
        .fromTo(one('[data-rn="stamp"]'), { scale: 1.8, rotate: -40, opacity: 0 }, { scale: 1, rotate: -8, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 1.0)
        .fromTo(one('[data-rn="desc"],[data-rn="cta"]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, 1.05);

      // scroll moment 1: dải nhiệt trượt ngang theo cuộn
      const track = document.querySelector<HTMLElement>("[data-rn-track]");
      if (track) {
        gsap.fromTo(track, { x: 0 }, { x: () => -(track.scrollWidth - window.innerWidth) * 0.6, ease: "none", scrollTrigger: { trigger: track.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      }
      // reveal section heads / cards
      q("[data-rn-reveal]").forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      // scroll moment 2: manifesto sáng dần theo từng từ
      const words = q("[data-rn-word]");
      if (words.length) {
        gsap.fromTo(words, { opacity: 0.18 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: words[0].closest("section"), start: "top 60%", end: "center 40%", scrub: 0.5 } });
      }
      return () => { /* matchMedia tự revert */ };
    });
    return () => { mm.revert(); document.documentElement.removeAttribute("data-rn-js"); };
  }, []);
  return null;
}
