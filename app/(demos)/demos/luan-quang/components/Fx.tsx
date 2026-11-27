"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Fx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-lq-root]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-rv]", root);
      gsap.set(items, { y: 44, opacity: 0 });
      ScrollTrigger.batch(items, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.1 }) });
      gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
        const to = Number(el.dataset.count), o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true }, onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("vi-VN")) });
      });
      /* kim giây trôi ở các đồng hồ phẳng */
      gsap.utils.toArray<SVGGElement>("[data-sec]", root).forEach((el) => {
        if (el.closest("[data-layer]")) return;
        gsap.to(el, { rotation: 360, svgOrigin: "230 230", duration: 60, ease: "none", repeat: -1 });
      });
      const heroW = root.querySelector<HTMLElement>("[data-tilt]");
      if (heroW && fine) {
        const rx = gsap.quickTo(heroW, "rotationX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(heroW, "rotationY", { duration: 0.8, ease: "power3" });
        gsap.set(heroW, { transformPerspective: 1000 });
        const mv = (e: PointerEvent) => { rx(-(e.clientY / innerHeight - 0.5) * 22); ry((e.clientX / innerWidth - 0.5) * 26); };
        window.addEventListener("pointermove", mv);
        return () => window.removeEventListener("pointermove", mv);
      }
    }, root);
    return () => ctx.revert();
  }, []);
  return null;
}
