"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const NAV = [
  { href: "#services", label: "Dịch vụ" },
  { href: "#care-navigator", label: "Định hướng chăm sóc" },
  { href: "#about", label: "Về Miền Cười" },
  { href: "#pricing", label: "Chi phí" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.headerRow}`}>
        <a className={styles.logoLink} href="#top" aria-label="Miền Cười, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/mien-cuoi/identity/logo-horizontal.svg" alt="" width={216} height={55} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính" data-open={open ? "1" : "0"} id="mc-nav">
          <ul>
            {NAV.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>))}
            <li className={styles.navCtaItem}><a className={`${styles.btn} ${styles.btnPrimary}`} href="#appointment" onClick={() => setOpen(false)}>Xem trước lịch hẹn</a></li>
          </ul>
        </nav>
        <button type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="mc-nav" onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "Menu"}
        </button>
      </div>
    </header>
  );
}
