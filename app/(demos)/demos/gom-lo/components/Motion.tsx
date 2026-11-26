"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Ngôn ngữ chuyển động "đất nén rồi nở": khối [data-gl="fade"] hạ xuống như cục đất bị ấn (bẹp dưới, nở ngang) rồi bật về dáng cũ, đáy giữ nguyên. Chỉ transform/opacity; reduced-motion: không làm gì. */
export function Motion() {
  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-gl="fade"]'));
      const hero = els.filter((e) => e.closest("#top"));
      const rest = els.filter((e) => !e.closest("#top"));
      gsap.set(els, { opacity: 0, y: 10, scaleY: 0.9, scaleX: 1.03, transformOrigin: "50% 100%" });
      gsap.to(hero, { opacity: 1, y: 0, scaleY: 1, scaleX: 1, duration: 0.9, stagger: 0.14, delay: 0.7, ease: "back.out(1.7)", clearProps: "transform,opacity" });
      rest.forEach((el) => gsap.to(el, { opacity: 1, y: 0, scaleY: 1, scaleX: 1, duration: 0.85, ease: "back.out(1.7)", clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
    });
    return () => mm.revert();
  }, []);
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
