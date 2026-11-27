"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Hiệu ứng cho Não Thức. Trạng thái ban đầu chỉ đặt trong effect; reduced-motion = trạng thái cuối. */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-nao-root]");
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element>(s: string, scope: ParentNode = root) => gsap.utils.toArray<T>(s, scope);

      /* ---- Bản đồ não: ghim + vẽ đường dẫn truyền theo cuộn ---- */
      const stage = root.querySelector<HTMLElement>("[data-brain]");
      if (stage) {
        stage.setAttribute("data-live", "1");
        const paths = q<SVGPathElement>("[data-path]", stage);
        const nodes = q<SVGGElement>("[data-node]", stage);
        const steps = q<HTMLElement>("[data-step]", stage);
        const bar = stage.querySelector<HTMLElement>("[data-progress]");
        const idx = stage.querySelector<HTMLElement>("[data-index]");
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(nodes, { opacity: 0.22, scale: 0.7 });
        gsap.set(steps, { autoAlpha: 0, y: 26 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: stage, start: "top top", end: () => `+=${window.innerHeight * 4.2}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: (self) => { if (idx) idx.textContent = String(Math.round(self.progress * (steps.length - 1)) + 1).padStart(2, "0"); } },
        });
        steps.forEach((step, i) => {
          const at = i * 1.2;
          if (i > 0) tl.to(paths[i - 1], { strokeDashoffset: 0, duration: 0.9 }, at - 0.7);
          tl.to(nodes[i], { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, at - 0.15);
          tl.to(step, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, at - 0.1);
          if (i < steps.length - 1) tl.to(step, { autoAlpha: 0, y: -26, duration: 0.3, ease: "power2.in" }, at + 0.85);
        });
        if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: tl.duration() }, 0);
      }

      /* ---- Hiện dần các khối ---- */
      q<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.fromTo(el, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      q<HTMLElement>("[data-stagger]").forEach((wrap) => {
        gsap.fromTo(Array.from(wrap.children), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: wrap, start: "top 85%", once: true } });
      });

      /* ---- Hero: tiêu đề tách dòng + mạng nơ-ron nhấp nháy ---- */
      const lines = q<HTMLElement>("[data-hero-line]");
      gsap.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "power4.out", delay: 0.1 });
      q<SVGCircleElement>("[data-twinkle]").forEach((c, i) => {
        gsap.to(c, { opacity: 0.2, duration: 1.2 + (i % 5) * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i % 7) * 0.2 });
      });
      gsap.to("[data-hero-net]", { yPercent: -14, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });

      /* ---- Đếm số ---- */
      q<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const o = { v: 0 };
        el.textContent = "0";
        gsap.to(o, { v: end, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("vi-VN"); } });
      });

      /* ---- Đường quy trình ---- */
      const line = root.querySelector<HTMLElement>("[data-line]");
      if (line) gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "0 50%", scrollTrigger: { trigger: line, start: "top 85%", end: "bottom 45%", scrub: true } });

      return () => stage?.removeAttribute("data-live");
    });

    return () => mm.revert();
  }, []);
  return null;
}
