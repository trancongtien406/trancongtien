"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const NAV = [
  { href: "#lop-tap", label: "Lớp tập" },
  { href: "#lich-tap", label: "Lịch tập" },
  { href: "#khong-gian", label: "Không gian" },
  { href: "#goi-tap", label: "Gói tập" },
  { href: "#quy-dinh", label: "Quy định" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.headerPill}>
        <a className={styles.logoLink} href="#top" aria-label="Nếp Thở, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/nep-tho/identity/logo-horizontal.svg" alt="" width={132} height={40} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính" data-open={open ? "1" : "0"} id="nt-nav">
          <ul>
            {NAV.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>))}
            <li className={styles.navCtaItem}><a className={`${styles.btn} ${styles.btnAccent}`} href="#tap-thu" onClick={() => setOpen(false)}>Đăng ký tập thử</a></li>
          </ul>
        </nav>
        <button type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="nt-nav" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}>
          <span aria-hidden="true" className={styles.burger} data-open={open ? "1" : "0"} />
        </button>
      </div>
    </header>
  );
}
