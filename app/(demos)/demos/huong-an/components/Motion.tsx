"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Hiện dần có làm mờ (blur) cho mọi phần tử [data-rv] + vào trang cho hero. Trạng thái ẩn chỉ đặt trong effect. */
export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector<HTMLElement>("[data-ha-root]");
    if (!root) return;
    const ctx = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .from("[data-hero-line]", { yPercent: 110, duration: 1.4, stagger: 0.14 })
        .from("[data-hero-fade]", { autoAlpha: 0, y: 18, filter: "blur(12px)", duration: 1.2, stagger: 0.12, clearProps: "filter,transform" }, "-=0.9");
      gsap.to("[data-hero-blob]", { yPercent: (i) => -12 - i * 10, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 36,
          filter: "blur(14px)",
          duration: 1.2,
          ease: "power3.out",
          clearProps: "filter,transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);
  return null;
}
