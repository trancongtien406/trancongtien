"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ngôn ngữ chuyển động của Hiên Mặn: "cửa kính trượt" — mọi thứ mở ra theo chiều ngang.
 * Hero: hai tấm kính trượt ra hai bên, chữ lộ dần từ trái sang phải. Các khối nội dung lộ ra bằng một lát cắt ngang
 * (clip-path) đi từ trái sang phải thay vì trồi lên. Không đụng cuộn trang, không parallax chữ.
 * Mặc định mọi thứ hiện đủ (SSR); chỉ khi JS chạy mới đặt trạng thái ẩn ban đầu ngay trước khi vẽ rồi phát.
 */
const WIPE_HIDDEN = "inset(-12% 100% -12% 0)";
const WIPE_SHOWN = "inset(-12% 0% -12% 0)";

export function Motion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-site='hien-man']");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    let seen = false;
    try { seen = sessionStorage.getItem("hm-curtain") === "1"; } catch { /* bỏ qua */ }
    const wait = seen ? 0 : 0.95;

    const ctx = gsap.context(() => {
      // ---------- Hero: kính trượt ra hai bên, chữ lộ từ trái sang phải, thanh đặt phòng mở theo.
      const glass = q("[data-hm='glass'] i");
      gsap.set("[data-hm='glass']", { display: "block" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: wait });
      tl.fromTo("[data-hm='hero-media']", { scale: 1.1 }, { scale: 1, duration: 2.2, ease: "power2.out" }, 0)
        .fromTo(glass, { xPercent: 0 }, { xPercent: (i) => (i === 0 ? -101 : 101), duration: 1.1, ease: "power3.inOut", stagger: 0 }, 0)
        .fromTo("[data-hm='hero-line']", { clipPath: WIPE_HIDDEN, xPercent: -5 }, { clipPath: WIPE_SHOWN, xPercent: 0, duration: 1.15, stagger: 0.16 }, 0.55)
        .fromTo("[data-hm='hero-fade']", { autoAlpha: 0, x: -26 }, { autoAlpha: 1, x: 0, duration: 0.85, stagger: 0.09 }, 0.95)
        .fromTo("#dat-nhanh", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "power2.inOut" }, 1.35)
        .set("[data-hm='glass']", { display: "none" })
        .set("[data-hm='hero-line'], [data-hm='hero-fade'], #dat-nhanh", { clearProps: "clipPath,transform,opacity,visibility" });

      // ---------- Mọi khối "rise": lát cắt ngang lộ ra từ trái sang phải khi vào khung.
      const rise = q("[data-hm='rise']");
      gsap.set(rise, { clipPath: WIPE_HIDDEN, x: -16 });
      ScrollTrigger.batch(rise, {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { clipPath: WIPE_SHOWN, x: 0, duration: 1.0, stagger: 0.09, ease: "power2.inOut", overwrite: true, onComplete: () => { gsap.set(els, { clearProps: "clipPath,transform" }); } }),
      });

      // ---------- Tấm "Giới thiệu" trượt từ trái vào cùng lát cắt.
      const plate = q("[data-hm='story-plate']")[0];
      if (plate) gsap.fromTo(plate, { clipPath: "inset(0 100% 0 0)", x: -70 }, { clipPath: "inset(0 0% 0 0)", x: 0, duration: 1.2, ease: "power3.inOut", clearProps: "clipPath,transform", scrollTrigger: { trigger: plate, start: "top 85%", once: true } });

      // ---------- Cảnh đổi giờ: đồng hồ lớn trượt vào từ trái khi vào khung.
      const tod = q("[data-hm='tod']")[0];
      if (tod) gsap.fromTo(tod.querySelector("[class*='todBody']"), { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.0, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: tod, start: "top 60%", once: true } });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); ctx.revert(); };
  }, []);

  return null;
}
