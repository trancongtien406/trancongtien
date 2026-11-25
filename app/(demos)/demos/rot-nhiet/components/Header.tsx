"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { useTray } from "./TrayProvider";

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#tim-gu", label: "Tìm gu" },
  { href: "#hat-ca-phe", label: "Hạt cà phê" },
  { href: "#rang-pha", label: "Rang & pha" },
  { href: "#cau-chuyen", label: "Câu chuyện" },
  { href: "#faq", label: "Hỏi đáp" },
];
const LOGO = "/images/demos/rot-nhiet/identity/logo-horizontal.svg";

export function Header({ consultHref }: { consultHref: string }) {
  const { count, openTray } = useTray();
  const [nav, setNav] = useState(false);
  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.headerRow}`}>
        <a className={styles.logoLink} href="#top" aria-label="Rót Nhiệt Coffee, về đầu trang" translate="no">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Rót Nhiệt Coffee Roasters" width={462} height={104} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {LINKS.map((l) => <a key={l.href} className={styles.navLink} href={l.href}>{l.label}</a>)}
        </nav>
        <div className={styles.headerActions}>
          <a className={`${styles.btn} ${styles.btnPrimary} ${styles.consultLink}`} href={consultHref}>Làm web như thế này</a>
          <button type="button" className={styles.trayBtn} onClick={openTray} aria-haspopup="dialog">
            Khay<span className={styles.trayCount} aria-label={`${count} ly trong khay`}>{count}</span>
          </button>
          <button type="button" className={styles.menuBtn} aria-expanded={nav} aria-controls="rn-mobile-nav" aria-label={nav ? "Đóng điều hướng" : "Mở điều hướng"} onClick={() => setNav((v) => !v)}>
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav id="rn-mobile-nav" className={styles.mobileNav} data-open={nav} aria-label="Điều hướng di động">
        {LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setNav(false)} tabIndex={nav ? 0 : -1}>{l.label}</a>)}
        <a href={consultHref} tabIndex={nav ? 0 : -1}>Làm web như thế này</a>
      </nav>
    </header>
  );
}
