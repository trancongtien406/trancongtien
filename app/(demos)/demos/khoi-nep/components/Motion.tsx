"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chữ ký chuyển động: "bản vẽ được kéo ra".
 *  - Hero: ảnh lắng xuống (scale), chữ masthead trượt lên từng ký tự sau lớp che, đường kẻ vẽ từ trái.
 *  - Cuộn 1: mọi đường kẻ [data-rule] được kéo ra theo chiều ngang.
 *  - Cuộn 2: ảnh [data-veil] mở ra như tấm che giấy kéo lên (scaleY của lớp che).
 * Chỉ animate transform/opacity. reduced-motion: không chạy gì, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.registerPlugin(ScrollTrigger);
      const veils: HTMLElement[] = [];
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero-img]", { scale: 1.06, duration: 1.8, ease: "power2.out" }, 0)
          .from("[data-mast] [data-chin]", { yPercent: 115, duration: 0.9, stagger: 0.05 }, 0.1)
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "0 50%", duration: 0.9 }, 0.4)
          .from("[data-hero-line]", { y: 22, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.8);

        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "0 50%",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        // Cuộn 3 (nhẹ): bảng vật liệu "lắp ráp" — ô gỗ trượt 16px theo X, đá/vải 12px theo Y, bảng màu lần lượt.
        const mood = document.querySelector<HTMLElement>("[data-testid=moodboard]");
        if (mood) {
          const tiles = Array.from(mood.children) as HTMLElement[];
          const pal = document.querySelectorAll("[aria-label='Bảng màu'] li");
          const st = { trigger: mood, start: "top 85%", once: true };
          gsap.from(tiles[0], { x: -16, opacity: 0, duration: 0.45, ease: "power2.out", scrollTrigger: st });
          gsap.from(tiles.slice(1), { y: 12, opacity: 0, duration: 0.45, stagger: 0.07, ease: "power2.out", scrollTrigger: st });
          gsap.from(pal, { opacity: 0, x: -8, duration: 0.4, stagger: 0.07, delay: 0.2, ease: "power2.out", scrollTrigger: st });
        }

        gsap.utils.toArray<HTMLElement>("[data-veil]").forEach((fig) => {
          const veil = document.createElement("span");
          veil.setAttribute("aria-hidden", "true");
          veil.className = "kn-veil";
          veil.style.cssText = "position:absolute;inset:0;background:#EDEAE2;z-index:2;transform-origin:50% 0;pointer-events:none";
          fig.appendChild(veil);
          veils.push(veil);
          gsap.to(veil, {
            scaleY: 0,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: fig, start: "top 88%", once: true },
            onComplete: () => veil.remove(),
          });
        });
      });
      return () => {
        ctx.revert();
        veils.forEach((v) => v.remove());
      };
    });
    return () => mm.revert();
  }, []);
  return null;
}
