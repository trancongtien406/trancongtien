"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "Nhịp thở": các viên thuốc nở ra rồi lắng xuống (scale + opacity), nhịp 0.9-1.1s, easing mềm.
 * Hero: ảnh viên thuốc nở từ 0.96, ảnh nhỏ và con dấu trôi vào lệch nhịp, chữ lên theo cụm.
 * Cuộn 1: cột ngày của lịch tuần nở lần lượt. Cuộn 2: các viên gói tập và bước đầu tiên nối nhau.
 * Không animation lặp vô hạn. Chỉ transform/opacity. reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector("[data-nt-root]");
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const clear = { clearProps: "transform,opacity" };
      const heroSel = '[data-nt="eyebrow"],[data-nt="h1a"],[data-nt="h1b"],[data-nt="h1c"],[data-nt="desc"],[data-nt="cta"],[data-nt="micro"],[data-nt="hero-pill"],[data-nt="hero-small"],[data-nt="hero-stamp"],[data-nt="hero-cap"]';
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-nt="hero-pill"]'), { scale: 0.96, y: 18, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }, 0)
        .fromTo(q('[data-nt="eyebrow"]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, 0.05)
        .fromTo(q('[data-nt="h1a"],[data-nt="h1b"],[data-nt="h1c"]'), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.15)
        .fromTo(q('[data-nt="hero-small"]'), { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.83, ease: "power3.out" }, 0.5)
        .fromTo(q('[data-nt="hero-stamp"]'), { scale: 0.9, rotate: -12, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 0.65)
        .fromTo(q('[data-nt="desc"]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(q('[data-nt="cta"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.75)
        .fromTo(q('[data-nt="micro"],[data-nt="hero-cap"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 0.95)
        .set(q(heroSel), clear);
      q("[data-nt-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", ...clear, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // cuộn 1: lịch tuần, từng cột ngày nở lần lượt
      const tt = root.querySelector<HTMLElement>('[data-nt="tt"]');
      if (tt) {
        const cols = Array.from(tt.querySelectorAll<HTMLElement>("[data-nt-day]"));
        gsap.fromTo(cols, { opacity: 0, y: 28, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", ...clear, scrollTrigger: { trigger: tt, start: "top 70%", once: true } });
      }
      // cuộn 2: vòng bước đầu tiên nở theo thứ tự
      const steps = root.querySelector<HTMLElement>("ol");
      if (steps) {
        gsap.fromTo(steps.querySelectorAll("li"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", ...clear, scrollTrigger: { trigger: steps, start: "top 80%", once: true } });
        gsap.fromTo(steps.querySelectorAll("li > span"), { scale: 0.5 }, { scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: steps, start: "top 80%", once: true } });
      }
    });
    return () => { mm.revert(); };
  }, []);
  return null;
}
