"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Sticky Culinary Stack: mỗi tầng là một thẻ position:sticky; khi thẻ kế tiếp trượt lên,
 * thẻ trước thu nhỏ, lùi sâu và tối dần (scrub theo cuộn). Phần còn lại: chữ trượt qua mặt nạ,
 * đĩa xoay theo cuộn, số đếm.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-vt-root]");
    if (!root) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // hero
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(q('[data-hero="line"]'), { yPercent: 115, duration: 1.1, stagger: 0.12 }, 0.1)
          .from(q('[data-hero="in"]'), { opacity: 0, y: 18, duration: 0.8, stagger: 0.1 }, 0.5)
          .from(q('[data-hero="plate"]'), { opacity: 0, scale: 0.86, rotate: -18, duration: 1.4, ease: "power2.out" }, 0.2);
        gsap.to(q('[data-hero="plate"]'), {
          rotate: 70, yPercent: 8, ease: "none",
          scrollTrigger: { trigger: q("section")[0], start: "top top", end: "bottom top", scrub: true },
        });

        // manifesto: từng từ trượt lên khi vào khung
        q("[data-wi]").forEach((el) => {
          gsap.set(el, { yPercent: 118 });
        });
        const intro = q("h2").find((h) => h.querySelector("[data-wi]"));
        if (intro) {
          gsap.to(intro.querySelectorAll("[data-wi]"), {
            yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.035,
            scrollTrigger: { trigger: intro, start: "top 82%", once: true },
          });
        }

        // reveal chung
        q("[data-rv]").forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 36, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // counters
        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          gsap.to(o, {
            v: end, duration: 1.6, ease: "power2.out",
            onUpdate: () => { el.textContent = String(Math.round(o.v)); },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // chồng tầng (desktop và mobile đều dùng; sticky là CSS)
        const layers = q("[data-layer]");
        layers.forEach((layer, i) => {
          const next = layers[i + 1];
          const inner = layer.querySelector<HTMLElement>("[data-layer-in]");
          const shade = layer.querySelector<HTMLElement>("[data-shade]");
          const art = layer.querySelector<HTMLElement>("[data-art]");
          if (art) {
            gsap.fromTo(art, { rotate: -14, scale: 0.9 }, {
              rotate: 10, scale: 1, ease: "none",
              scrollTrigger: { trigger: layer, start: "top bottom", end: next ? "bottom top" : "bottom bottom", scrub: true },
            });
          }
          if (!next || !inner) return;
          const st = { trigger: next, start: "top bottom", end: "top top", scrub: true } as const;
          gsap.to(inner, { scale: 0.88, yPercent: -3, ease: "none", scrollTrigger: st });
          if (shade) gsap.to(shade, { opacity: 0.72, ease: "none", scrollTrigger: st });
        });
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);
  return null;
}
