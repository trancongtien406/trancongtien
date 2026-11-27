"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Reveal bằng opacity/clip-path (không để lại transform, vì ảnh fixed của Flip cần tổ tiên không có transform) + dải phim trượt theo cuộn. */
export function Fx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-dn-root]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, clipPath: "inset(-10% -10% -10% -10%)", duration: 1.1, ease: "power3.out", clearProps: "clipPath,opacity", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-strip]").forEach((el) => {
        const dir = Number(el.dataset.strip);
        gsap.fromTo(el, { xPercent: dir > 0 ? 0 : -22 }, { xPercent: dir > 0 ? -22 : 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", ease: "power2.out", duration: 1.4, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return null;
}
