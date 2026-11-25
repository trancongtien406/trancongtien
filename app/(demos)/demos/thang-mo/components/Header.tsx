"use client";

import { useEffect, useState } from "react";
import styles from "../brand.module.css";

const NAV = [
  { href: "#albums", label: "Album" },
  { href: "#packages", label: "Gói chụp" },
  { href: "#moodboard", label: "Moodboard" },
  { href: "#journey", label: "Quy trình" },
];

export function Header({ consultHref }: { consultHref: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className={styles.header} id="top">
      <div className={styles.headerBar}>
        <span className={styles.demoTag}>Wedding Studio</span>
        <span className={styles.volTag} aria-hidden="true">Vol. 01</span>
      </div>
      <div className={`${styles.wrap} ${styles.headerRow}`}>
        <nav className={styles.navL} aria-label="Điều hướng chính">
          <ul>{NAV.slice(0, 2).map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <a className={styles.logoLink} href="#top" aria-label="Tháng Mơ, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/thang-mo/identity/logo-horizontal.svg" alt="" width={190} height={65} />
        </a>
        <nav className={styles.navR} aria-label="Điều hướng phụ">
          <ul>
            {NAV.slice(2).map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
            <li><a className={styles.navCta} href={consultHref}>Tư vấn</a></li>
          </ul>
        </nav>
        <button type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="tm-sheet" onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "Menu"}
        </button>
      </div>
      <div id="tm-sheet" className={styles.sheet} hidden={!open}>
        <ul>
          {NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>)}
          <li><a href={consultHref}>Nhận tư vấn →</a></li>
        </ul>
      </div>
    </header>
  );
}
