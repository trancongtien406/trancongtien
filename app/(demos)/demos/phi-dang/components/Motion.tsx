"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-pd-root]");
    if (!root) return;
    const q = <T extends Element>(s: string, scope: ParentNode = root) => gsap.utils.toArray<T>(s, scope);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* Hero: chữ trượt lên theo ký tự, tách đôi khi cuộn */
      gsap.fromTo(q("[data-ch]"), { yPercent: 120, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 1.1, ease: "power4.out", stagger: 0.055, delay: 0.1 });
      gsap.to("[data-hero-a]", { xPercent: -14, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-hero-b]", { xPercent: 14, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-hero-red]", { yPercent: 60, scale: 1.3, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });

      /* Tuyên ngôn: từng từ sáng dần */
      const words = q<HTMLElement>("[data-w]");
      if (words.length) gsap.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: "[data-manifesto]", start: "top 70%", end: "bottom 70%", scrub: true } });

      /* Khối hiện dần */
      q<HTMLElement>("[data-rise]").forEach((el) => gsap.fromTo(el, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
      q<HTMLElement>("[data-rows]").forEach((w) => gsap.fromTo(Array.from(w.children), { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: w, start: "top 85%", once: true } }));
      q<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count); const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true }, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("vi-VN"); } });
      });
    });

    /* ---- Sàn diễn: ghim + cuộn ngang (chỉ desktop, không reduced) ---- */
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const sec = root.querySelector<HTMLElement>("[data-runway]");
      const track = root.querySelector<HTMLElement>("[data-track]");
      if (!sec || !track) return;
      sec.setAttribute("data-live", "1");
      const panels = q<HTMLElement>("[data-panel]", track);
      const counter = sec.querySelector<HTMLElement>("[data-look]");
      const bar = sec.querySelector<HTMLElement>("[data-bar]");
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const skew = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power3" });
      const tween = gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: sec, start: "top top", end: () => `+=${dist() + window.innerHeight * 0.4}`, pin: true, scrub: 0.7, invalidateOnRefresh: true,
          onUpdate: (self) => {
            skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -450));
            if (counter) counter.textContent = String(Math.min(panels.length, Math.floor(self.progress * panels.length) + 1)).padStart(2, "0");
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      panels.forEach((p) => {
        const big = p.querySelector("[data-big]");
        const fig = p.querySelector("[data-fig]");
        if (big) gsap.fromTo(big, { xPercent: 22 }, { xPercent: -22, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        if (fig) gsap.fromTo(fig, { yPercent: 8, scale: 0.9 }, { yPercent: -4, scale: 1.04, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
      return () => sec.removeAttribute("data-live");
    });

    return () => mm.revert();
  }, []);
  return null;
}
