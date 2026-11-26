"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Chuyển động chung: phần tử [data-tt="fade"] nổi lên nhẹ (hero phát sau tiêu đề; phần còn lại khi vào khung),
 * ảnh hero trôi chậm theo cuộn. Chỉ transform/opacity. reduced-motion: không làm gì, nội dung hiện đủ.
 */
export function Motion() {
  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-tt="fade"]'));
      const hero = els.filter((e) => e.closest("#top"));
      const rest = els.filter((e) => !e.closest("#top"));
      gsap.set(els, { opacity: 0, filter: "blur(8px)" });
      gsap.to(hero, { opacity: 1, filter: "blur(0px)", duration: 1.4, stagger: 0.14, delay: 1.05, ease: "power2.out", clearProps: "filter" });
      rest.forEach((el) => gsap.to(el, { opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power2.out", clearProps: "filter", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
    });
    return () => mm.revert();
  }, []);
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
