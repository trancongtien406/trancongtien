"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-ta-root]");
    if (!root) return;
    const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(q("[data-hero-in]"), { xPercent: -8, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "power4.out" });
      gsap.fromTo(q("[data-slash]"), { xPercent: 120 }, { xPercent: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.1 });
      gsap.to("[data-hero-word]", { xPercent: 12, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
      q<HTMLElement>("[data-rise]").forEach((el) => gsap.fromTo(el, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
      q<HTMLElement>("[data-rows]").forEach((w) => gsap.fromTo(Array.from(w.children), { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: w, start: "top 85%", once: true } }));
      q<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count); const dec = Number(el.dataset.dec ?? 0); const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true }, onUpdate: () => { el.textContent = o.v.toLocaleString("vi-VN", { minimumFractionDigits: dec, maximumFractionDigits: dec }); } });
      });
    });
    return () => mm.revert();
  }, []);
  return null;
}
