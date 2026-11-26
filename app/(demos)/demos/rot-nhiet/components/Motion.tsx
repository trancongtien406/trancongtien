"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ngôn ngữ chuyển động của Rót Nhiệt: "rót". Chữ H1 rơi từ trên xuống như giọt, đáy chạm là nảy nhẹ;
 * khung ảnh được rót đầy từ trên (clip-path), các khối cuộn tới được rót xuống từ mép trên như dòng cà phê.
 * Không có fade-up kiểu chung: mọi reveal là một đường rót từ trên xuống.
 * Chỉ transform/opacity/clip-path. Tôn trọng prefers-reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.setAttribute("data-rn-js", "1");
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
      const tl = gsap.timeline();
      tl.fromTo(q('[data-rn="meta"]'), { clipPath: "inset(0 0 100% 0)", opacity: 1 }, { clipPath: "inset(0 0 0% 0)", duration: 0.45, ease: "power2.out", clearProps: "clipPath" }, 0)
        // giọt rơi: từ trên xuống, chạm đáy thì nén lại rồi bật về
        .fromTo(q(".rn-ch"), { yPercent: -130, scaleY: 1.35, opacity: 0 }, { yPercent: 0, scaleY: 1, opacity: 1, duration: 0.62, stagger: 0.07, ease: "bounce.out" }, 0.1)
        .fromTo(q('[data-rn="frame"]'), { clipPath: "inset(0 0 100% 0)", opacity: 1 }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.inOut", clearProps: "clipPath" }, 0.3)
        .fromTo(q('[data-rn="sub"]'), { clipPath: "inset(0 0 100% 0)", opacity: 1 }, { clipPath: "inset(0 0 0% 0)", duration: 0.45, ease: "power2.out", clearProps: "clipPath" }, 0.95)
        .fromTo(q('[data-rn="stamp"]'), { scale: 1.8, rotate: -40, opacity: 0 }, { scale: 1, rotate: -8, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 1.1)
        .fromTo(q('[data-rn="desc"],[data-rn="cta"],[data-rn="specs"]'), { clipPath: "inset(0 0 100% 0)", opacity: 1 }, { clipPath: "inset(0 0 0% 0)", duration: 0.55, stagger: 0.12, ease: "power2.out", clearProps: "clipPath" }, 1.05);

      // mọi khối reveal: rót xuống từ mép trên
      q("[data-rn-reveal]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power2.inOut", clearProps: "clipPath", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      // ảnh trong menu/hạt: lớp ảnh co từ lớn về vừa khi khung được rót
      q("[data-rn-reveal] img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: img, start: "top 92%", once: true } });
      });
      return () => { /* matchMedia tự revert */ };
    });
    return () => { mm.revert(); document.documentElement.removeAttribute("data-rn-js"); };
  }, []);
  return null;
}
