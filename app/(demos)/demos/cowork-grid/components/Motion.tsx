"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/features/showroom/effects";

/**
 * Chuyển động toàn trang (transform/opacity/biến CSS):
 * (1) [data-cg-cells]: grid reveal, các ô con [data-cg-cell] hiện theo đường chéo từ trên trái; ô [data-cg-accent] sáng cam rồi tắt (biến --cg-flash),
 * (2) [data-cg-rise]: khối lướt lên khi vào khung, (3) [data-cg-rule]: đường kẻ vẽ dần (data-in).
 * Gắn data-cg-js lên gốc để CSS chỉ ẩn phần chờ reveal khi JS đã chạy. Reduced-motion: không làm gì, nội dung hiện đủ.
 */
export function Motion() {
  useEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>("[data-cg-root]");
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.setAttribute("data-cg-js", "1");
      const triggers: ScrollTrigger[] = [];
      gsap.utils.toArray<HTMLElement>("[data-cg-cells]").forEach((box) => {
        const cells = Array.from(box.querySelectorAll<HTMLElement>("[data-cg-cell]"));
        if (!cells.length) return;
        const b = box.getBoundingClientRect();
        const order = cells
          .map((c) => { const r = c.getBoundingClientRect(); return { c, k: (r.left - b.left) / 320 + (r.top - b.top) / 220 }; })
          .sort((a, z) => a.k - z.k)
          .map((x) => x.c);
        gsap.set(cells, { opacity: 0, y: 14 });
        triggers.push(ScrollTrigger.create({
          trigger: box, start: "top 86%", once: true,
          onEnter: () => {
            box.setAttribute("data-in", "1");
            gsap.to(order, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.07, clearProps: "transform" });
            const acc = box.querySelector<HTMLElement>("[data-cg-accent]");
            if (acc) gsap.fromTo(acc, { "--cg-flash": 1 }, { "--cg-flash": 0, duration: 0.9, delay: 0.08 * order.length * 0.7, ease: "power2.out" });
          },
        }));
      });
      // (1b) [data-cg-tiles]: ảnh được che bằng lưới 4x3 ô, các ô tan theo đường chéo khi vào khung (CSS transition, trễ theo --d)
      gsap.utils.toArray<HTMLElement>("[data-cg-tiles]").forEach((el) => {
        triggers.push(ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => el.setAttribute("data-in", "1") }));
      });
      const rise = gsap.utils.toArray<HTMLElement>("[data-cg-rise]");
      gsap.set(rise, { opacity: 0, y: 28 });
      ScrollTrigger.batch(rise, {
        start: "top 92%", once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, overwrite: true, clearProps: "transform" }),
      });
      gsap.utils.toArray<HTMLElement>("[data-cg-rule]").forEach((el) => {
        triggers.push(ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => el.setAttribute("data-in", "1") }));
      });
      return () => { triggers.forEach((t) => t.kill()); root.removeAttribute("data-cg-js"); };
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { window.clearTimeout(t); window.removeEventListener("load", onLoad); mm.revert(); };
  }, []);
  return null;
}
