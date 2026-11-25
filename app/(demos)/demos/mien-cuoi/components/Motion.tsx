"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "Precision Reveal": đường kẻ mở theo trục, khối thông tin vào theo thứ tự, ảnh hero mở bằng tấm phủ.
 * Hero <= 1.2s. Không tách chữ theo ký tự. Chỉ transform/opacity. reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector("[data-mc-root]");
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const clear = { clearProps: "transform,opacity" };
      const heroSel = '[data-mc="rule"],[data-mc="eyebrow"],[data-mc="h1a"],[data-mc="h1b"],[data-mc="desc"],[data-mc="cta"],[data-mc="caption"],[data-mc="cover"]';
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-mc="rule"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out", transformOrigin: "left center" }, 0)
        .fromTo(q('[data-mc="eyebrow"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, 0.1)
        .fromTo(q('[data-mc="h1a"]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, 0.18)
        .fromTo(q('[data-mc="h1b"]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, 0.27)
        .fromTo(q('[data-mc="cover"]'), { scaleX: 1 }, { scaleX: 0, duration: 0.75, ease: "power3.inOut", transformOrigin: "right center" }, 0.22)
        .fromTo(q('[data-mc="desc"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.55)
        .fromTo(q('[data-mc="cta"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, 0.7)
        .fromTo(q('[data-mc="caption"]'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9)
        .set(q(heroSel), clear);

      q("[data-mc-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", ...clear, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      // scroll moment 1: Care Navigator
      const nav = root.querySelector<HTMLElement>("#care-navigator");
      if (nav) {
        const all = '[data-mc="divider"],[data-mc="intro"],[data-mc="nav-panel"],[role="radio"]';
        const t = gsap.timeline({ scrollTrigger: { trigger: nav, start: "top 75%", once: true } });
        t.fromTo(nav.querySelectorAll('[data-mc="divider"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, transformOrigin: "left center", ease: "power2.out" }, 0)
          .fromTo(nav.querySelectorAll('[data-mc="intro"]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.1)
          .fromTo(nav.querySelectorAll('[data-mc="nav-panel"]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.2)
          .fromTo(nav.querySelectorAll('[role="radio"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.035, ease: "power2.out" }, 0.35)
          .set(nav.querySelectorAll(all), clear);
      }
      // scroll moment 2: Appointment Scheduler (Schedule Assembly)
      const sch = root.querySelector<HTMLElement>("#appointment");
      if (sch) {
        const all = '[data-mc="divider"],[data-mc="sched-form"],[data-mc="sched-preview"]';
        const t = gsap.timeline({ scrollTrigger: { trigger: sch, start: "top 75%", once: true } });
        t.fromTo(sch.querySelectorAll('[data-mc="divider"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.55, transformOrigin: "left center", ease: "power2.out" }, 0)
          .fromTo(sch.querySelectorAll('[data-mc="sched-form"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.1)
          .fromTo(sch.querySelectorAll('[data-mc="sched-preview"]'), { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 0.2)
          .set(sch.querySelectorAll(all), clear);
      }
    });
    return () => { mm.revert(); };
  }, []);
  return null;
}
