"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-ma-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tc = root.querySelector<HTMLElement>("[data-tc]");
    const ctx = gsap.context(() => {
      // Timecode theo vị trí cuộn (24 fps trên tổng 1 giờ 42 phút minh hoạ).
      ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => {
          if (!tc) return;
          const f = Math.floor(self.progress * 6120 * 24);
          const p = (n: number) => String(n).padStart(2, "0");
          tc.textContent = `${p(Math.floor(f / 86400))}:${p(Math.floor(f / 1440) % 60)}:${p(Math.floor(f / 24) % 60)}:${p(f % 24)}`;
        },
      });
      if (reduce) return;
      gsap.from("[data-hero-line]", { yPercent: 115, duration: 1.3, ease: "power4.out", stagger: 0.12, delay: 0.2 });
      gsap.from("[data-hero-in]", { autoAlpha: 0, y: 20, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.7 });
      gsap.from("[data-bar]", { scaleY: 3.2, duration: 1.4, ease: "power3.inOut", transformOrigin: (i: number) => (i ? "50% 100%" : "50% 0%") });
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.from(el, { autoAlpha: 0, y: 40, duration: 1, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((p) => {
        gsap.fromTo(p.querySelectorAll("span"), { opacity: 0.16 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 45%", scrub: 0.5 } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const o = { v: 0 }, to = Number(el.dataset.count);
        gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.to("[data-hero-canvas]", { yPercent: 14, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { window.clearTimeout(t); ctx.revert(); };
  }, []);
  return null;
}
