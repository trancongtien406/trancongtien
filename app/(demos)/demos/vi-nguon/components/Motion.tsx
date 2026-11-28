"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const root = document.querySelector<HTMLElement>("[data-vn-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const splits: SplitText[] = [];
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (id.length === 0) return;
      const t = id === "top" ? null : document.getElementById(id);
      if (id !== "top" && !t) return;
      e.preventDefault();
      window.scrollTo({ top: t ? t.getBoundingClientRect().top + window.scrollY - 12 : 0, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    };
    root.addEventListener("click", onClick);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // đoạn văn sáng dần theo từ
        const light = (sel: string, start: string, end: string) => {
          const el = root.querySelector<HTMLElement>(sel); if (!el) return;
          const sp = new SplitText(el, { type: "words" }); splits.push(sp);
          gsap.fromTo(sp.words, { opacity: 0.18 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start, end, scrub: true } });
        };
        light("[data-words]", "top 80%", "bottom 55%");
        light("[data-words2]", "top 85%", "bottom 60%");
        // bento: từ mờ nhoè vào rõ
        gsap.from("[data-bento]", { autoAlpha: 0, scale: 0.9, y: 60, filter: "blur(14px)", duration: 1.2, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "#san-pham-noi-bat", start: "top 55%", once: true } });
        ScrollTrigger.batch("[data-reveal]", { start: "top 90%", once: true, onEnter: (els) => gsap.from(els, { y: 32, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }) });
        gsap.from("[data-dash]", { autoAlpha: 0, y: 40, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#hieu-suat", start: "top 50%", once: true } });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => { window.clearTimeout(t); root.removeEventListener("click", onClick); mm.revert(); ctx.revert(); splits.forEach((sp) => sp.revert()); };
  }, []);
  return null;
}
