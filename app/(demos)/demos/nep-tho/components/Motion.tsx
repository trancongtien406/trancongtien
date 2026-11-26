"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ngôn ngữ chuyển động "phồng-xẹp" (hít vào / thở ra): khối nở ra từ tâm bằng clip-path viên thuốc + scale,
 * chữ "thở ra" từ mờ nhoè sang nét. KHÔNG trượt lên (fade-up) ở bất kỳ đâu.
 * Hero: viên ảnh phồng từ giữa, ảnh nhỏ nở tròn, dấu hiệu xoay vào rồi "thở" nhẹ khi còn trong khung.
 * Cuộn: khối nở từ tâm; cột ngày của lịch mở dần theo chiều dọc; các bước tập thử nở lần lượt.
 * Chỉ transform/opacity/clip-path/filter. reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector("[data-nt-root]");
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const clear = { clearProps: "transform,opacity,clipPath,filter" };
      const heroSel = '[data-nt="eyebrow"],[data-nt="h1a"],[data-nt="h1b"],[data-nt="h1c"],[data-nt="desc"],[data-nt="cta"],[data-nt="facts"],[data-nt="hero-pill"],[data-nt="hero-small"]';
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(q('[data-nt="hero-pill"]'), { clipPath: "inset(36% 24% round 999px)", scale: 0.9, opacity: 0 }, { clipPath: "inset(0% 0% round 999px)", scale: 1, opacity: 1, duration: 1.15 }, 0)
        .fromTo(q('[data-nt="eyebrow"]'), { opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.6 }, 0.05)
        .fromTo(q('[data-nt="h1a"],[data-nt="h1b"],[data-nt="h1c"]'), { opacity: 0, filter: "blur(12px)", scale: 1.06 }, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.9, stagger: 0.12 }, 0.12)
        .fromTo(q('[data-nt="hero-small"]'), { clipPath: "circle(0% at 50% 50%)", scale: 0.7, opacity: 0 }, { clipPath: "circle(75% at 50% 50%)", scale: 1, opacity: 1, duration: 1 }, 0.4)
        .fromTo(q('[data-nt="hero-stamp"]'), { scale: 0, rotate: -120, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(1.6)" }, 0.55)
        .fromTo(q('[data-nt="desc"]'), { opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.7 }, 0.55)
        .fromTo(q('[data-nt="cta"]'), { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.7 }, 0.7)
        .fromTo(q('[data-nt="facts"] li'), { opacity: 0, scaleX: 0.6, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.7, stagger: 0.1 }, 0.85)
        .set(q(heroSel + ',[data-nt="facts"] li'), clear);

      // "thở" nhẹ của dấu hiệu khi hero còn trong khung
      const stamp = q('[data-nt="hero-stamp"]')[0];
      if (stamp) {
        const breath = gsap.to(stamp, { scale: 1.08, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true });
        ScrollTrigger.create({ trigger: stamp, start: "top bottom", end: "bottom top", onToggle: (self) => { if (self.isActive && tl.progress() === 1) breath.play(); else breath.pause(); } });
        tl.eventCallback("onComplete", () => { breath.play(); });
      }

      q("[data-nt-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.94, clipPath: "inset(10% 6% round 44px)" }, { opacity: 1, scale: 1, clipPath: "inset(0% 0% round 0px)", duration: 0.9, ease: "expo.out", ...clear, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // lịch tuần: cột ngày mở dần theo chiều dọc
      const tt = root.querySelector<HTMLElement>('[data-nt="tt"]');
      if (tt) {
        const cols = Array.from(tt.querySelectorAll<HTMLElement>("[data-nt-day]"));
        gsap.fromTo(cols, { opacity: 0, scaleY: 0.82, transformOrigin: "50% 0%" }, { opacity: 1, scaleY: 1, duration: 0.8, stagger: 0.07, ease: "expo.out", ...clear, scrollTrigger: { trigger: tt, start: "top 70%", once: true } });
      }
      // các bước tập thử nở lần lượt
      const steps = root.querySelector<HTMLElement>("ol");
      if (steps) {
        gsap.fromTo(steps.querySelectorAll("li > span"), { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.8, stagger: 0.14, ease: "back.out(1.7)", clearProps: "transform", scrollTrigger: { trigger: steps, start: "top 80%", once: true } });
      }
    });
    return () => { mm.revert(); };
  }, []);
  return null;
}
