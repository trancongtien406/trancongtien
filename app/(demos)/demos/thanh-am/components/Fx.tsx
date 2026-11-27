"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Reveal khi cuộn, đếm số, và ánh sáng hồng đi theo con trỏ ở hero (gsap.quickTo). */
export function Fx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-ta-root]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-rv]", root);
      gsap.set(items, { y: 40, opacity: 0 });
      ScrollTrigger.batch(items, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.09 }) });
      gsap.from("[data-hero-l]", { yPercent: 70, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, delay: 0.1 });
      gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
        const to = Number(el.dataset.count), o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true }, onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("vi-VN")) });
      });
      const glow = root.querySelector<HTMLElement>("[data-glow]");
      if (glow && fine) {
        const x = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power3" }), y = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power3" });
        const mv = (e: PointerEvent) => { const r = glow.parentElement!.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); };
        window.addEventListener("pointermove", mv);
        return () => window.removeEventListener("pointermove", mv);
      }
    }, root);
    return () => ctx.revert();
  }, []);
  return null;
}
