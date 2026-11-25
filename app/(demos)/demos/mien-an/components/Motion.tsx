"use client";

import { useEffect } from "react";

/** GSAP: chỉ là progressive enhancement. Nội dung vẫn đủ khi JS lỗi hoặc reduced-motion. */
export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-ma-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const c = gsap.context(() => {
        root.dataset.motion = "on";
        const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, root);

        // Hero choreography ~2s (xếp chồng thời gian)
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from('[data-hero="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 }, 0.15)
          .from("[data-hero-line]", { yPercent: 105, duration: 0.95, stagger: 0.14 }, 0.3)
          .from('[data-hero="art"]', { opacity: 0, duration: 1.2, ease: "power2.out" }, 0.18)
          .from('[data-hero="art"] img', { scale: 1.06, duration: 1.45, ease: "power2.out" }, 0.18)
          .from('[data-hero="desc"]', { opacity: 0, y: 14, duration: 0.65 }, 1.0)
          .from('[data-hero="cta"]', { opacity: 0, y: 10, duration: 0.65 }, 1.18)
          .from('[data-hero="caption"]', { opacity: 0, duration: 0.5 }, 1.5);
        // tránh ẩn vĩnh viễn nếu from() không áp dụng (đặt lại sau khi xong)
        tl.eventCallback("onComplete", () => { gsap.set('[data-hero], [data-hero-line]', { clearProps: "all" }); });

        // Reveal một lần cho các khối
        q("[data-reveal]").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        // Moment 1: The Unfolding Story
        const story = root.querySelector("[data-story]");
        if (story) {
          gsap.from(q("[data-story-text]"), { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: story, start: "top 75%", once: true } });
          gsap.from("[data-story-detail]", { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: "power2.out", scrollTrigger: { trigger: story, start: "top 60%", once: true } });
          const mm = gsap.matchMedia();
          mm.add("(min-width: 1024px)", () => {
            gsap.fromTo("[data-story-img] img", { yPercent: 0 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: story, start: "top 85%", end: "bottom 20%", scrub: 0.6 } });
          });
        }

        // Moment 2: The Sanctuary Reveal
        const san = root.querySelector("#sanctuary");
        if (san) {
          const figs = q("#sanctuary [data-san]");
          gsap.from(figs, { opacity: 0, y: 24, duration: 0.85, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: san.querySelector("[data-san]"), start: "top 80%", once: true } });
          gsap.from("#sanctuary [data-san-btn]:first-of-type", { clipPath: "inset(100% 0 0 0)", duration: 0.85, ease: "power3.out", clearProps: "clipPath", scrollTrigger: { trigger: san.querySelector("[data-san]"), start: "top 80%", once: true } });
        }
      }, root);
      ctx = c;
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
      delete root.dataset.motion;
    };
  }, []);
  return null;
}
