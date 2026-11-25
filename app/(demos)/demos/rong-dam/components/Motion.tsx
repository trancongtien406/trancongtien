"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chữ ký chuyển động: "dán ảnh vào sổ tay". Dòng tiêu đề trượt lên từ khe cắt, ảnh polaroid rơi xuống
 * và xoay về góc nghiêng, dấu bưu điện đóng xuống, nét đứt hoạ tiết hiện dần (tấm giấy phủ trượt đi).
 * Moment cuộn 1: thẻ hộ chiếu và vé tour nghiêng rồi ngay lại khi vào khung nhìn.
 * Moment cuộn 2: các ghim bản đồ nảy lên lần lượt khi Itinerary Explorer vào khung nhìn.
 * Chỉ transform và opacity. prefers-reduced-motion: không có hiệu ứng, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(q('[data-rd="h1-line"]'), { yPercent: 105, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.05)
        .from(q('[data-rd="cl"]'), { y: -70, opacity: 0, rotate: (i) => (i % 2 ? 10 : -12), duration: 0.7, stagger: 0.14, ease: "back.out(1.3)" }, 0.25)
        .from(q('[data-rd="stamp"]'), { scale: 1.9, opacity: 0, rotate: -35, duration: 0.45, ease: "back.out(1.6)" }, 1.0)
        .from(q('[data-rd="hero-fade"]'), { y: 22, opacity: 0, duration: 0.55, stagger: 0.1 }, 0.55)
        .to(q('[data-rd="doodle-cover"]'), { x: 440, duration: 1.1, ease: "power2.inOut" }, 0.9);

      q('[data-rd="rhythm"],[data-rd="ticket"],[data-rd="note"]').forEach((el) => {
        gsap.from(el, { y: 36, rotate: 3, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
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
