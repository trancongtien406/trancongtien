"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chuyển động theo cuộn + con trỏ của Mộc Vang.
 *  - Ánh nến theo con trỏ (dark spotlight): vầng sáng ấm đi theo con trỏ trên nền tối (chỉ pointer fine, tắt khi reduced).
 *  - Moment cuộn 1: đường rượu rót vẽ dần (stroke-dashoffset), ly dâng đầy theo tiến độ, bốn bước sáng lần lượt.
 *  - Moment cuộn 2: khung tranh hero trôi chậm hơn nội dung + đèn rọi mờ dần khi rời hero.
 *  - Reveal nhẹ một lần cho thẻ/dòng khi vào khung.
 * Reduced-motion: không đăng ký gì; ly đầy 70% và đường rượu đã vẽ đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const q = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      q('[data-rv="rv"]').forEach((el, i) => {
        gsap.from(el, { y: 24, opacity: 0, duration: 0.8, delay: (i % 3) * 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      const pour = document.querySelector<HTMLElement>('[data-rv="pour"]');
      if (pour) {
        const fill = pour.querySelector<SVGRectElement>('[data-rv="fill"]');
        const sheen = pour.querySelector<SVGRectElement>('[data-rv="sheen"]');
        const stream = pour.querySelector<SVGPathElement>('[data-rv="stream"]');
        const glow = pour.querySelector<SVGPathElement>('[data-rv="streamglow"]');
        const level = pour.querySelector<HTMLElement>('[data-rv="level"]');
        const steps = Array.from(pour.querySelectorAll<HTMLElement>('[data-rv="step"]'));
        const TOP = 330, H = 170;
        const apply = (p: number) => {
          const draw = Math.min(1, p / 0.28);
          const retract = Math.max(0, (p - 0.86) / 0.14);
          const off = draw < 1 ? 1 - draw : -retract;
          stream?.style.setProperty("stroke-dashoffset", String(off));
          glow?.style.setProperty("stroke-dashoffset", String(off));
          const f = Math.min(1, Math.max(0, (p - 0.18) / 0.68));
          const y = TOP + H * (1 - f);
          fill?.setAttribute("y", String(y));
          sheen?.setAttribute("y", String(y));
          if (level) level.textContent = String(Math.round(f * 100));
          const on = Math.min(steps.length - 1, Math.floor(p * steps.length));
          steps.forEach((el, k) => el.toggleAttribute("data-on", k === on));
        };
        pour.setAttribute("data-live", "1");
        apply(0);
        ScrollTrigger.create({ trigger: pour, start: "top 55%", end: "bottom 70%", scrub: 0.4, onUpdate: (self) => apply(self.progress) });
      }

      const hero = document.getElementById("top");
      const frame = hero?.querySelector<HTMLElement>('[class*="heroArt"]');
      const cone = hero?.querySelector<HTMLElement>('[class*="cone"]');
      if (hero && frame) {
        gsap.to(frame, { yPercent: -7, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        if (cone) gsap.to(cone, { opacity: 0.2, ease: "none", scrollTrigger: { trigger: hero, start: "30% top", end: "bottom top", scrub: true } });
      }
    });

    // vầng ánh nến theo con trỏ
    const spot = document.querySelector<HTMLElement>('[data-rv="spot"]');
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    if (spot && fine.matches && !reduced.matches) {
      let raf = 0, x = 0, y = 0;
      const apply = () => { raf = 0; spot.style.setProperty("--x", `${x}px`); spot.style.setProperty("--y", `${y}px`); };
      const move = (e: PointerEvent) => {
        x = e.clientX; y = e.clientY;
        spot.dataset.on = "1";
        if (!raf) raf = requestAnimationFrame(apply);
      };
      const leave = () => { delete spot.dataset.on; };
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      cleanup = () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        if (raf) cancelAnimationFrame(raf);
      };
    }
    return () => { cleanup(); mm.revert(); document.querySelector('[data-rv="pour"]')?.removeAttribute("data-live"); };
  }, []);
  return null;
}
