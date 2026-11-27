"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-lt-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from("[data-hero-in]", { y: 46, autoAlpha: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, clearProps: "transform" });
      gsap.to("[data-wheel]", { rotation: 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to("[data-wheel-r]", { rotation: -360, duration: 64, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: p.closest("svg"), start: "top 75%", end: "bottom 50%", scrub: 0.6 } });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { window.clearTimeout(t); ctx.revert(); };
  }, []);
  return null;
}
