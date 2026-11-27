"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Phần phụ trợ: hero vào cảnh, reveal, bộ đếm, và nghiêng 3D (CSS 3D + quickTo) với vệt sáng phản chiếu cho thẻ trang sức. */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-tt-root]");
    if (!root) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(q("[data-hero]"), { opacity: 0, y: 26, duration: 1.1, ease: "power3.out", stagger: 0.12, delay: 0.1 });
        q("[data-rv]").forEach((el) => gsap.from(el, { opacity: 0, y: 34, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          gsap.to(o, { v: end, duration: 1.5, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
        gsap.from(q("[data-tilt]"), { opacity: 0, y: 50, duration: 1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: q("[data-tilt]")[0], start: "top 88%", once: true } });
      }, root);
      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      const cleanups: (() => void)[] = [];
      q("[data-tilt]").forEach((card) => {
        gsap.set(card, { transformPerspective: 900 });
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          ry((x - 0.5) * 18);
          rx(-(y - 0.5) * 18);
          card.style.setProperty("--gx", `${x * 100}%`);
          card.style.setProperty("--gy", `${y * 100}%`);
          card.style.setProperty("--go", "1");
        };
        const leave = () => { rx(0); ry(0); card.style.setProperty("--go", "0"); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); gsap.killTweensOf(card); });
      });
      return () => cleanups.forEach((c) => c());
    });

    return () => mm.revert();
  }, []);
  return null;
}
