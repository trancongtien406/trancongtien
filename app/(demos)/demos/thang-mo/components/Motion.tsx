"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "Lật từng trang": hero mở như bìa album (tấm phủ giấy kéo lên, tiêu đề trồi từng dòng, ảnh phụ xoay nhẹ vào chỗ),
 * các khối còn lại đặt xuống như đặt ảnh lên bàn (xoay nhẹ + mờ dần, không trượt).
 * Chỉ transform/opacity. reduced-motion: không hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector("[data-tm-root]");
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.setAttribute("data-tm-armed", "1");
      const clear = { clearProps: "transform,opacity" };
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-tm="meta"]'), { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0)
        .fromTo(q('[data-tm="photo"]'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.12)
        .fromTo(q('[data-tm="cover"]'), { scaleY: 1 }, { scaleY: 0, duration: 1, ease: "power2.inOut", transformOrigin: "50% 0%" }, 0.12)
        .fromTo(q('[data-tm="h1"]'), { yPercent: 105 }, { yPercent: 0, duration: 0.8, stagger: 0.14 }, 0.28)
        .fromTo(q('[data-tm="inset"]'), { opacity: 0, y: 16, rotate: -4 }, { opacity: 1, y: 0, rotate: -2, duration: 0.65 }, 0.8)
        .fromTo(q('[data-tm="body"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.05)
        .fromTo(q('[data-tm="caption"]'), { opacity: 0 }, { opacity: 1, duration: 0.45 }, 1.35)
        .set(q('[data-tm="cover"]'), { display: "none" })
        .set(q('[data-tm="meta"],[data-tm="photo"],[data-tm="h1"],[data-tm="body"],[data-tm="caption"]'), clear)
        .set(q('[data-tm="inset"]'), { clearProps: "opacity,y" });

      // ngôn ngữ chuyển động: "đặt ảnh xuống bàn". Khối vào bằng xoay rất nhẹ + mờ dần (không trượt lên); ảnh in rơi xuống rồi nằm yên.
      q("[data-tm-reveal]").forEach((el, i) => {
        const rot = el.classList.toString().includes("print") || el.querySelector("figure") ? (i % 2 ? 1.6 : -1.6) : (i % 2 ? 0.5 : -0.5);
        gsap.fromTo(el, { opacity: 0, rotate: rot, transformOrigin: "50% 0%" }, { opacity: 1, rotate: 0, duration: 0.9, ease: "power3.out", ...clear, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      // đường kẻ "gáy sách" của bảng giá vẽ ra khi vào khung
      q("[data-tm-rule]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.9, ease: "power2.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      return () => { root.removeAttribute("data-tm-armed"); };
    });
    return () => { mm.revert(); };
  }, []);
  return null;
}
