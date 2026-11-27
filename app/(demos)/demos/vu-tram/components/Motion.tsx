"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-vt-root]");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-in]", { autoAlpha: 0, y: 30, duration: 1, ease: "power3.out", stagger: 0.1, clearProps: "transform" });
      gsap.to("[data-ring]", { rotation: 360, duration: 120, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to("[data-stars]", { yPercent: -8, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.from(el, { autoAlpha: 0, y: 30, duration: 0.9, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const o = { v: 0 }, to = Number(el.dataset.count);
        gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("vi-VN"); }, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-pipe]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: "0 50%", ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 55%", scrub: 0.6 } });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { window.clearTimeout(t); ctx.revert(); };
  }, []);
  return null;
}
