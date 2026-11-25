"use client";

import { prefersReducedMotion, useIsoLayoutEffect } from "@/features/showroom/effects";

/**
 * Blur-fade khi vào khung nhìn: mọi phần tử có `data-bf` mờ + dịch nhẹ rồi nét dần.
 * Trạng thái ẩn chỉ được đặt sau khi JS chạy (no-JS và reduced-motion thấy nội dung đủ).
 * Có `data-bf-delay="0.1"` (giây) để so le. Khối đã ở trong khung lúc tải được hiện ngay.
 */
export function Reveals() {
  useIsoLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-site="da-xanh"]');
    if (!root || prefersReducedMotion()) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-bf]"));
    els.forEach((el) => {
      const d = el.getAttribute("data-bf-delay");
      if (d) el.style.setProperty("--bf-d", `${d}s`);
      el.setAttribute("data-bfs", "0");
    });
    root.setAttribute("data-dx-js", "1");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).setAttribute("data-bfs", "1");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // an toàn: nếu IO không chạy, hiện hết sau 8 giây
    const safety = window.setTimeout(() => els.forEach((el) => el.setAttribute("data-bfs", "1")), 8000);
    return () => {
      io.disconnect();
      clearTimeout(safety);
      els.forEach((el) => { el.removeAttribute("data-bfs"); el.style.removeProperty("--bf-d"); });
      root.removeAttribute("data-dx-js");
    };
  }, []);
  return null;
}
