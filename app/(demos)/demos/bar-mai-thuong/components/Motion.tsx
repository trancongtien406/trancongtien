"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chuyển động theo cuộn + con trỏ của Tầng Mây.
 *  - Spotlight: vệt sáng hồng/cyan đi theo con trỏ trên nền tối (chỉ pointer fine, tắt khi reduced).
 *  - Moment cuộn 1: ly rót đầy theo tiến độ cuộn (mực ly, dòng rót, lát cam, bước 01-03).
 *  - Moment cuộn 2: skyline trượt chậm hơn nội dung hero + đèn quét lệch pha theo cuộn.
 *  - Reveal nhẹ cho thẻ/dòng khi vào khung (một lần).
 * Reduced-motion: không đăng ký gì, nội dung hiện đủ, ly đầy sẵn.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const q = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // reveal
      q('[data-tm="rv"]').forEach((el, i) => {
        gsap.from(el, { y: 28, opacity: 0, duration: 0.7, delay: (i % 3) * 0.06, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // moment 1: ly rót
      const pour = document.querySelector<HTMLElement>('[data-tm="pour"]');
      if (pour) {
        const liquid = pour.querySelector<SVGGElement>('[data-tm="liquid"]');
        const stream = pour.querySelector<SVGRectElement>('[data-tm="stream"]');
        const garnish = pour.querySelector<SVGGElement>('[data-tm="garnish"]');
        const level = pour.querySelector<HTMLElement>('[data-tm="level"]');
        const steps = Array.from(pour.querySelectorAll<HTMLElement>('[data-tm="step"]'));
        const EMPTY = 130;
        const apply = (p: number) => {
          gsap.set(liquid, { y: EMPTY * (1 - p) });
          const surface = 58 + EMPTY * (1 - p);
          stream?.setAttribute("height", String(Math.max(0, surface + 40)));
          gsap.set(stream, { opacity: p > 0.02 && p < 0.97 ? 1 : 0 });
          gsap.set(garnish, { opacity: p > 0.82 ? 1 : 0, scale: p > 0.82 ? 1 : 0.6, transformOrigin: "206px 46px" });
          if (level) level.textContent = String(Math.round(p * 100));
          const on = Math.min(2, Math.floor(p * 3));
          steps.forEach((el, k) => el.toggleAttribute("data-on", k === on && p > 0.01));
        };
        pour.setAttribute("data-live", "1");
        apply(0);
        ScrollTrigger.create({ trigger: pour, start: "top 60%", end: "bottom bottom", scrub: 0.4, onUpdate: (self) => apply(self.progress) });
      }

      // moment 2: skyline + đèn quét theo cuộn
      const hero = document.getElementById("top");
      const sky = document.querySelector<HTMLElement>('[data-tm="sky"]');
      if (hero && sky) {
        gsap.to(sky, { yPercent: 14, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(hero.querySelectorAll('[class*="beam"]'), { opacity: 0.25, ease: "none", scrollTrigger: { trigger: hero, start: "20% top", end: "bottom top", scrub: true } });
      }
    });

    // spotlight theo con trỏ
    const spot = document.querySelector<HTMLElement>('[data-tm="spot"]');
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    if (spot && fine.matches && !reduced.matches) {
      let raf = 0, x = 0, y = 0;
      const apply = () => { raf = 0; spot.style.setProperty("--x", `${x}px`); spot.style.setProperty("--y", `${y}px`); };
      const move = (e: PointerEvent) => {
        x = e.clientX; y = e.clientY;
        spot.style.opacity = "1";
        if (!raf) raf = requestAnimationFrame(apply);
      };
      const leave = () => { spot.style.opacity = "0"; };
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      cleanup = () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        if (raf) cancelAnimationFrame(raf);
      };
    }
    return () => { cleanup(); mm.revert(); document.querySelector('[data-tm="pour"]')?.removeAttribute("data-live"); };
  }, []);
  return null;
}
