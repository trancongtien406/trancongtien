"use client";

import { gsap, hasFinePointer, registerGsap, ScrollTrigger, useIsoLayoutEffect } from "@/features/showroom/effects";

/**
 * Chuyển động chung của trang (GSAP, một matchMedia, dọn sạch khi unmount).
 * 1) Hero choreography ~2,4s (bắt đầu sau khi nắp hộp mở xong ~0,8s): mặt trăng (ảnh) nở theo hình tròn, quỹ đạo vàng được vẽ, chữ lên theo dòng, nút và thông số trồi lên.
 * 2) Moment cuộn: (a) ảnh hero trôi chậm và mờ dần khi rời hero; (b) sản phẩm trồi lên từ lớp: clip lộ từ đáy + zoom nhẹ rồi trôi parallax chậm;
 *    (c) đường kẻ vàng dọc phần chế tác vẽ dần theo cuộn và thắp từng nút; (d) khối nội dung nổi lên theo lô.
 * Reduced-motion: không chạy gì, nội dung hiện đủ. Trạng thái ẩn ban đầu chỉ được đặt sau khi JS chạy.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>('[data-site="kim-hoan"]');
    if (!root) return;
    root.setAttribute("data-kn-js", "1");
    const mm = gsap.matchMedia();
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const one = (sel: string) => root.querySelector<HTMLElement>(sel);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = !!one('[data-kn="intro"]');
      const tl = gsap.timeline({ delay: intro ? 0.78 : 0.1, defaults: { ease: "power3.out" } });
      const lines = q('[data-kn="hero-line"]');
      const moonImg = one('[data-kn="hero-img"]');
      const orbit = one('[data-kn="orbit"]');
      const dot = one('[data-kn="orbit-dot"]');
      const eyebrow = one('[data-kn="hero-eyebrow"]');
      const copy = q('[data-kn="hero-copy"]');
      const cap = one("figcaption");
      gsap.set(lines, { yPercent: 118 });
      if (eyebrow) gsap.set(eyebrow, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(copy, { y: 26, opacity: 0 });
      if (cap) gsap.set(cap, { opacity: 0, y: 14 });
      if (moonImg) gsap.set(moonImg, { clipPath: "circle(0% at 50% 58%)", scale: 1.06 });
      if (orbit) gsap.set(orbit, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 1 });
      if (dot) gsap.set(dot, { opacity: 0 });

      if (moonImg) tl.to(moonImg, { clipPath: "circle(88% at 50% 58%)", scale: 1, duration: 1.5, ease: "power3.inOut", clearProps: "clipPath,transform" }, 0);
      if (orbit) tl.to(orbit, { strokeDashoffset: 0, duration: 1.9, ease: "power2.inOut" }, 0.15);
      if (dot) tl.to(dot, { opacity: 1, duration: 0.6 }, 1.5);
      if (eyebrow) tl.to(eyebrow, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.inOut" }, 0.2);
      tl.to(lines, { yPercent: 0, duration: 1, stagger: 0.14 }, 0.35)
        .to(copy, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.95);
      if (cap) tl.to(cap, { opacity: 1, y: 0, duration: 0.7 }, 1.5);

      // moment cuộn (a): hero rời đi chậm
      const hero = one('[data-kn="hero"]');
      const par = one('[data-kn="hero-par"]');
      if (hero && par) {
        gsap.to(par, { yPercent: 9, scale: 1.06, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
        gsap.to(q('[data-kn="hero-copy"]'), { y: -30, opacity: 0.25, ease: "none", immediateRender: false, scrollTrigger: { trigger: hero, start: "55% top", end: "bottom top", scrub: 0.6 } });
      }

      // moment cuộn (b): "mở tủ kính": hai cánh kính tách ra từ giữa, ảnh lùi về vị trí
      q('[data-kn="pr"]').forEach((el) => {
        const clip = el.querySelector<HTMLElement>('[data-kn="pr-clip"]');
        const img = el.querySelector<HTMLElement>('[data-kn="pr-img"]');
        if (!clip || !img) return;
        gsap.set(clip, { clipPath: "inset(0% 50% 0% 50%)" });
        gsap.set(img, { scale: 1.14, filter: "brightness(0.35)" });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(clip, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", onComplete: () => { gsap.set(clip, { clearProps: "clipPath" }); } });
            gsap.to(img, { scale: 1, filter: "brightness(1)", duration: 1.6, ease: "power2.out", clearProps: "filter" });
          },
        });
      });

      // tiêu đề: dải ánh kim quét từ trái sang phải
      q('[data-kn="wipe"]').forEach((el) => {
        gsap.set(el, { clipPath: "inset(0% 100% 0% 0%)", filter: "brightness(2.2)" });
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", filter: "brightness(1)", duration: 1.15, ease: "power2.inOut", clearProps: "clipPath,filter" }),
        });
      });

      // thanh hàm lượng vàng theo tuổi K: kéo dài từ trái
      q('[data-kn="bar"]').forEach((el) => {
        gsap.set(el, { scaleX: 0 });
        ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.5, ease: "power3.out" }) });
      });

      // moment cuộn (c): đường kẻ vàng chế tác
      const track = one('[data-kn="goldline"]');
      if (track) {
        const host = track.closest("ol") as HTMLElement;
        gsap.fromTo(track, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: host, start: "top 70%", end: "bottom 60%", scrub: 0.5 } });
        q('[data-kn="step"]').forEach((st) => {
          const node = st.querySelector<HTMLElement>('[data-kn="node"]');
          if (!node) return;
          ScrollTrigger.create({ trigger: st, start: "top 62%", onEnter: () => node.setAttribute("data-on", "1"), onLeaveBack: () => node.setAttribute("data-on", "0") });
        });
      }

      // (d) khối "lên đèn tủ kính": sáng dần từ tối, không trượt
      const rv = q('[data-kn="rise"], [data-kn="lit"]');
      gsap.set(rv, { opacity: 0, filter: "brightness(0.3)" });
      ScrollTrigger.batch(rv, {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, filter: "brightness(1)", duration: 1.1, ease: "sine.out", stagger: 0.08, overwrite: true, clearProps: "filter" }),
      });

      // con trỏ: dịch nhẹ ảnh hero ngược chiều con trỏ (chỉ pointer fine)
      let off = () => {};
      if (hero && moonImg && hasFinePointer()) {
        const inner = one('[data-kn="hero-par"]');
        const mx = inner ? gsap.quickTo(inner, "x", { duration: 0.9, ease: "power3.out" }) : null;
        const my = inner ? gsap.quickTo(inner, "rotation", { duration: 0.9, ease: "power3.out" }) : null;
        const mv = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          mx?.(nx * -14);
          my?.(nx * 0.8);
        };
        hero.addEventListener("pointermove", mv, { passive: true });
        off = () => hero.removeEventListener("pointermove", mv);
      }

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      return () => {
        off();
        tl.kill();
      };
    });
    return () => mm.revert();
  }, []);
  return null;
}
