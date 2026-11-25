"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";
import { NAV } from "../data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className={styles.header} id="top">
      <div className={`${styles.wrap} ${styles.headerRow}`}>
        <a className={styles.logoLink} href="#top" aria-label="Nét Lệch Hair Studio, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/net-lech/identity/logo-reversed.svg" alt="" width={150} height={44} />
        </a>
        <p className={styles.issueLine} aria-hidden="true"><span>Issue 010</span><i /><span>The Difference Issue</span></p>
        <nav className={styles.nav} aria-label="Điều hướng chính" id="nl-nav" data-open={open ? "1" : "0"}>
          <ul>
            {NAV.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>))}
            <li><a className={`${styles.btn} ${styles.btnLime}`} href="#builder" onClick={() => setOpen(false)}>Dựng dịch vụ</a></li>
          </ul>
        </nav>
        <button ref={btn} type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="nl-nav" onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "Menu"}
        </button>
      </div>
    </header>
  );
}
