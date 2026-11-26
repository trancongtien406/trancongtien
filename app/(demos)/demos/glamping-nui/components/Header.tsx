"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";

const NAV = [
  { href: "#luu-tru", label: "Lều và giá" },
  { href: "#hoat-dong", label: "Hoạt động" },
  { href: "#lua-trai", label: "Ăn uống" },
  { href: "#lich-trinh", label: "Lịch 2N1Đ" },
  { href: "#quy-dinh", label: "Quy định" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className={styles.header} data-solid={solid || open ? "true" : "false"}>
      <div className={`${styles.wrap} ${styles.headerRow}`}>
        <a className={styles.logoLink} href="#top" aria-label="Rừng Thức, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/glamping-nui/identity/logo-horizontal.svg" alt="Rừng Thức" width={168} height={60} translate="no" />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính" data-open={open ? "true" : "false"} id="gl-nav">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className={styles.headerTools}>
          <a className={`${styles.btn} ${styles.btnFire} ${styles.btnSm}`} href="#lap-ke-hoach">Đặt lều</a>
          <button ref={btn} type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="gl-nav" onClick={() => setOpen((v) => !v)}>
            <span className={styles.menuIcon} aria-hidden="true" />
            <span className={styles.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
