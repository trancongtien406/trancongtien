"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Fade nhẹ cho [data-gl="fade"] (hero phát sau tiêu đề, phần còn lại khi vào khung). Chỉ transform/opacity; reduced-motion: không làm gì. */
export function Motion() {
  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-gl="fade"]'));
      const hero = els.filter((e) => e.closest("#top"));
      const rest = els.filter((e) => !e.closest("#top"));
      gsap.set(els, { opacity: 0, y: 18 });
      gsap.to(hero, { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.7, ease: "power3.out", clearProps: "transform,opacity" });
      rest.forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
    });
    return () => mm.revert();
  }, []);
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
