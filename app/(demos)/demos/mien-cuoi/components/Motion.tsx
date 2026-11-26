"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ngôn ngữ chuyển động của Miền Cười: "quét kẻ" theo trục ngang như thước đo y khoa.
 * Đường kẻ mở ra, khối nội dung được quét lộ theo hướng trái sang phải (clip-path), tấm phủ ảnh hero kéo mở.
 * Không fade-up, không trượt dọc. reduced-motion: không chạy, nội dung hiện đủ. Chỉ clip-path/transform.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector("[data-mc-root]");
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const wipe = (el: Element | Element[] | NodeListOf<Element>, vars: gsap.TweenVars = {}) =>
        gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.inOut", clearProps: "clipPath", ...vars });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-mc="rule"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out", transformOrigin: "left center", clearProps: "transform" }, 0)
        .add(wipe(q('[data-mc="eyebrow"]'), { duration: 0.45 }), 0.1)
        .add(wipe(q('[data-mc="h1a"]'), { duration: 0.7 }), 0.18)
        .add(wipe(q('[data-mc="h1b"]'), { duration: 0.7 }), 0.32)
        .fromTo(q('[data-mc="cover"]'), { scaleX: 1 }, { scaleX: 0, duration: 0.8, ease: "power3.inOut", transformOrigin: "right center" }, 0.22)
        .add(wipe(q('[data-mc="desc"]'), { duration: 0.6 }), 0.6)
        .add(wipe(q('[data-mc="cta"],[data-mc="facts"],[data-mc="caption"]'), { duration: 0.6, stagger: 0.1 }), 0.78);

      q("[data-mc-reveal]").forEach((el) => {
        wipe(el, { scrollTrigger: { trigger: el, start: "top 90%", once: true }, duration: 0.8 });
      });
      q('[data-mc="divider"]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.out", transformOrigin: "left center", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      for (const sel of ["#care-navigator", "#appointment"]) {
        const sec = root.querySelector<HTMLElement>(sel);
        if (!sec) continue;
        const parts = sec.querySelectorAll('[data-mc="intro"],[data-mc="nav-panel"],[data-mc="sched-form"],[data-mc="sched-preview"]');
        gsap.fromTo(parts, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power3.inOut", stagger: 0.12, clearProps: "clipPath", scrollTrigger: { trigger: sec, start: "top 75%", once: true } });
      }
    });
    return () => { mm.revert(); };
  }, []);
  return null;
}
