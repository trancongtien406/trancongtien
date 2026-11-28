"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Hiện dần [data-vc-in] khi vào khung nhìn và đếm số [data-vc-count]. Trạng thái ẩn chỉ đặt trong effect. */
export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-vc-in]", {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power3.out", overwrite: true }),
      });
      gsap.set("[data-vc-in]", { autoAlpha: 0, y: 34 });
      gsap.utils.toArray<HTMLElement>("[data-vc-count]").forEach((el) => {
        const to = +el.dataset.vcCount!; const o = { v: 0 };
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); } }) });
      });
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);
  return null;
}
