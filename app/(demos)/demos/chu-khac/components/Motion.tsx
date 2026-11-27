"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Kinetic Typography: từ nằm trong mặt nạ overflow rồi trượt lên theo stagger; các dòng hero lệch ngang
 * ngược chiều nhau khi cuộn; tuyên ngôn sáng dần từng từ (scrub) trong khung sticky; dải chữ trượt ngang theo tiến độ cuộn.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-ck-root]");
    if (!root) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // hero: từ trượt lên qua mặt nạ
        const hero = q("section")[0];
        gsap.from(q("[data-wi]", hero), { yPercent: 115, duration: 1.1, ease: "power4.out", stagger: 0.09, delay: 0.1 });
        gsap.from(q("[data-rv0]"), { opacity: 0, y: 14, duration: 0.9, ease: "power2.out", stagger: 0.15, delay: 0.7 });
        q("[data-hl]").forEach((el) => {
          const d = Number(el.dataset.d) || 1;
          gsap.to(el, { x: () => d * window.innerWidth * 0.14, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true } });
        });

        // tuyên ngôn: sáng dần từng từ khi cuộn qua khung sticky
        const man = q("[data-manifesto]")[0];
        const words = q("[data-mw]", man);
        gsap.set(words, { opacity: 0.16 });
        const mt = gsap.timeline({ scrollTrigger: { trigger: man, start: "top top", end: "bottom bottom", scrub: 0.6 } });
        words.forEach((w, i) => {
          mt.to(w, { opacity: 1, ...(w.dataset.hi ? { color: "#b63729" } : {}), ease: "none", duration: 0.5 }, i * 0.5);
        });

        // dải chữ trượt ngang theo cuộn
        q("[data-kr]").forEach((el) => {
          gsap.fromTo(el, { xPercent: Number(el.dataset.from) }, { xPercent: Number(el.dataset.to), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4 } });
        });

        // tiêu đề: từng dòng trượt lên qua mặt nạ
        q("[data-lines]").forEach((h) => {
          gsap.from(q("[data-line]", h), { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: h, start: "top 85%", once: true } });
        });

        q("[data-rv]").forEach((el) => gsap.from(el, { opacity: 0, y: 36, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          gsap.to(o, { v: end, duration: 1.4, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return null;
}
