"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Hiện dần các khối nội dung khi vào khung nhìn; poster rơi ở cuối trang. Trạng thái ẩn chỉ đặt trong effect. */
export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-tm-reveal]");
      gsap.set(els, { autoAlpha: 0, y: 40 });
      ScrollTrigger.batch(els, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power3.out", overwrite: true }) });
      gsap.utils.toArray<HTMLElement>("[data-tm-fall]").forEach((el, i) => {
        gsap.fromTo(el, { y: -180 - i * 18, rotation: (i % 2 ? 1 : -1) * 26 }, { y: 0, rotation: (i % 2 ? -1 : 1) * (8 + (i % 4) * 5), ease: "none", scrollTrigger: { trigger: "[data-tm-foot]", start: "top bottom", end: "top 20%", scrub: 0.8 } });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
