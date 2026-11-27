"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const fmt = new Intl.NumberFormat("vi-VN");

/** Reveal [data-rv], đếm số [data-count], vẽ đường quy trình [data-draw] theo cuộn. */
export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-mx-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from("[data-hero-in]", { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.1, clearProps: "transform" });
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.from(el, { y: 32, autoAlpha: 0, duration: 0.9, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.8, ease: "power2.out", onUpdate: () => { el.textContent = fmt.format(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: p.closest("[data-draw-scope]") || p, start: "top 70%", end: "bottom 60%", scrub: 0.6 } });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { window.clearTimeout(t); ctx.revert(); };
  }, []);
  return null;
}
