"use client";

import { useEffect } from "react";
import styles from "../brand.module.css";
import { Roundel } from "./Art";

export function Header() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = document.documentElement;
    const prev = r.style.scrollBehavior;
    r.style.scrollBehavior = "smooth";
    return () => {
      r.style.scrollBehavior = prev;
    };
  }, []);
  return (
    <header className={styles.header}>
      <a className={styles.brandLink} href="#top" aria-label="Bánh Mì Tầng, về đầu trang">
        <Roundel size={30} />
        <span>BÁNH MÌ TẦNG</span>
      </a>
      <nav className={styles.nav} aria-label="Điều hướng chính">
        <a href="#thuc-don">Thực đơn</a>
        <a href="#cau-chuyen">Câu chuyện</a>
        <a href="#combo-gia">Combo</a>
        <a href="#cua-hang">Cửa hàng</a>
        <a href="#hoi-dap">Hỏi đáp</a>
        <a className={styles.cta} href="#dat-hang">Đặt ngay</a>
      </nav>
    </header>
  );
}
