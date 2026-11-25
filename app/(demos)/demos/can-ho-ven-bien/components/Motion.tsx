"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";

/**
 * Chuyển động chung của trang.
 * 1) Hero choreography ~2,8 giây: nhãn bản vẽ, mô tả, nút, các vạch chiều cao, số liệu, chú thích (tiêu đề do SplitWords, ảnh do ClipReveal, đường kích thước do SVGPathDraw).
 * 2) Moment cuộn: ảnh hero trôi chậm + phóng nhẹ, chữ hero mờ dần; các lớp SVG của cảnh mặt tiền chạy lệch tốc độ (parallax nhiều lớp).
 * 3) Khối `data-cv="reveal"` nổi lên theo lô; mọi trạng thái ẩn chỉ đặt sau khi JS chạy.
 * Reduced-motion: không chạy gì, nội dung hiện đủ.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>('[data-site="can-ho-ven-bien"]');
    if (!root) return;
    root.setAttribute("data-cv-js", "1");
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
      tl.from(q('[data-cv="hero-eyebrow"]'), { y: 14, opacity: 0, duration: 0.8 }, 0.1)
        .from(q('[data-cv="hero-lead"]'), { y: 18, opacity: 0, duration: 0.9 }, 1.1)
        .from(q('[data-cv="hero-cta"] > *'), { y: 18, opacity: 0, duration: 0.8, stagger: 0.12 }, 1.4)
        .from(q('[class*="heroTicks"] li'), { opacity: 0, x: -10, duration: 0.7, stagger: 0.12 }, 0.9)
        .from(q('[data-cv="hero-stats"] > div'), { y: 16, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.9)
        .from(q('[class*="figCap"]'), { opacity: 0, duration: 0.9 }, 2.2);
      const early = () => { if (window.scrollY > 80 && tl.time() < 2.6) tl.timeScale(5); };
      window.addEventListener("scroll", early, { passive: true });

      const hero = q('[data-cv="hero"]')[0];
      const photo = q('[data-cv="hero-photo"]')[0];
      if (hero && photo) {
        gsap.to(photo, { yPercent: 7, scale: 1.07, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
        gsap.to(q('[data-cv="hero-copy"]'), { yPercent: -8, opacity: 0.2, ease: "none", scrollTrigger: { trigger: hero, start: "40% top", end: "bottom top", scrub: 0.6 } });
      }
      // parallax nhiều lớp của cảnh mặt tiền: mỗi lớp lệch tốc độ khác nhau
      const stage = q('[data-stage="1"]')[0];
      if (stage) {
        q("[data-cv-par]").forEach((g) => {
          const k = Number(g.getAttribute("data-cv-par")) || 0.3;
          gsap.fromTo(g, { y: -50 * k }, { y: 50 * k, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: true } });
        });
      }

      ScrollTrigger.batch(q('[data-cv="reveal"]'), {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.1, overwrite: true }),
      });
      gsap.set(q('[data-cv="reveal"]'), { opacity: 0 });
      return () => { window.removeEventListener("scroll", early); };
    });
    return () => { mm.revert(); root.removeAttribute("data-cv-js"); };
  }, []);

  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    const t = window.setTimeout(r, 900);
    window.addEventListener("load", r);
    document.fonts?.ready.then(r).catch(() => {});
    return () => { clearTimeout(t); window.removeEventListener("load", r); };
  }, []);
  return null;
}
