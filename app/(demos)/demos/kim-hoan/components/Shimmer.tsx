"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import styles from "../brand.module.css";

/**
 * Chữ vàng ánh kim: dải sáng champagne quét qua chữ. `loop` = lặp chậm (nghỉ dài giữa hai lần quét) và chỉ chạy khi trong khung nhìn;
 * mặc định chạy một lần khi chữ vào khung. Reduced-motion: vàng tĩnh (CSS).
 */
export function Shimmer({ children, loop = false, as, className }: { children: ReactNode; loop?: boolean; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) {
            el.setAttribute("data-run", "1");
            if (!loop) io.disconnect();
          } else if (loop) el.setAttribute("data-run", "0");
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loop]);
  return (
    <Tag ref={ref} className={`${styles.shimmer} ${loop ? styles.shimmerLoop : ""} ${className ?? ""}`} data-fx="GoldShimmer" data-run="0">
      {children}
    </Tag>
  );
}
