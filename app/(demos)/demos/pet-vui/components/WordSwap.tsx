"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/features/showroom/effects";
import s from "../brand.module.css";

/** Đổi từ kiểu "đóng dấu": từ mới nảy to rồi lún xuống như con dấu. Dừng khi tab ẩn; reduced-motion giữ từ đầu. */
export function WordSwap({ words, interval = 2400 }: { words: readonly string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => { if (!document.hidden) setI((v) => (v + 1) % words.length); }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className={s.swap} data-fx="WordSwap">
      <span className={s.srOnly}>{words.join(", ")}</span>
      <span key={i} className={s.swapWord} aria-hidden="true">{words[i]}</span>
    </span>
  );
}
