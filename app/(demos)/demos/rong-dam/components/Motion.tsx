"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ngôn ngữ chuyển động của Rong Dặm: "đóng dấu và lật vé".
 * Hero: tiêu đề đóng dấu xuống, ảnh polaroid dán vào sổ, bưu điện đóng sau cùng, các số liệu lật lên như bảng giờ.
 * Cuộn: thẻ điểm đến / vai trò / bước đặt tour lật ra từ mép trên (rotateX), vé tour chạy vào từ cạnh như xe đến bến,
 * ghi chú dọc đường nghiêng rồi ngay lại. Bản đồ: ghim nảy lên khi vào khung nhìn.
 * Chỉ transform và opacity. prefers-reduced-motion: không có hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
      const tl = gsap.timeline();
      tl.from(q('[data-rd="h1-line"]'), { scale: 1.22, opacity: 0, rotate: -1.6, transformOrigin: "0% 60%", duration: 0.34, stagger: 0.16, ease: "power4.in" }, 0.05)
        .to(q('[data-rd="h1-line"]'), { y: 3, duration: 0.06, yoyo: true, repeat: 1, stagger: 0.16, ease: "none" }, 0.4)
        .from(q('[data-rd="cl"]'), { y: -70, opacity: 0, rotate: (i) => (i % 2 ? 10 : -12), duration: 0.7, stagger: 0.14, ease: "back.out(1.3)" }, 0.25)
        .from(q('[data-rd="stamp"]'), { scale: 1.9, opacity: 0, rotate: -35, duration: 0.45, ease: "back.out(1.6)" }, 1.0)
        .from(q('dl[data-rd="hero-fade"] > div'), { rotateX: -85, opacity: 0, transformOrigin: "50% 0%", transformPerspective: 700, duration: 0.55, stagger: 0.12, ease: "power3.out" }, 0.7)
        .from(q('p[data-rd="hero-fade"], div[data-rd="hero-fade"]'), { opacity: 0, duration: 0.5, stagger: 0.08 }, 0.55);

      // lật ra từ mép trên, như tấm bảng giờ
      q('[data-rd="rhythm"],[data-rd="role"],[data-rd="step"]').forEach((el) => {
        gsap.from(el, { rotateX: -70, opacity: 0, transformOrigin: "50% 0%", transformPerspective: 800, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      // vé tour chạy vào từ cạnh, hơi nghiêng như xe tới bến
      q('[data-rd="ticket"]').forEach((el, i) => {
        gsap.from(el, { x: i % 2 ? 90 : -90, skewX: i % 2 ? -7 : 7, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      q('[data-rd="note"]').forEach((el) => {
        gsap.from(el, { rotate: 3, opacity: 0, y: 24, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      const ex = document.getElementById("itinerary");
      if (ex) {
        ScrollTrigger.create({
          trigger: ex,
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.from(q('[data-place] > g > circle:nth-of-type(2), [data-place] > g > circle:nth-of-type(1)'), { scale: 0, transformOrigin: "center", opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" });
          },
        });
      }
    });
    return () => mm.revert();
  }, []);
  return null;
}
