"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import styles from "../brand.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLElement>("a,button")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); return; }
      if (e.key !== "Tab" || !menu.current) return;
      const f = Array.from(menu.current.querySelectorAll<HTMLElement>("a,button")).concat(btn.current ? [btn.current] : []);
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", key); };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <header className={styles.header}>
      <div className={styles.headerPill}>
        <a className={styles.logoLink} href="#main" aria-label="Mở Lời, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/ngoai-ngu-sao/identity/logo-horizontal.svg" alt="Mở Lời" width={150} height={40} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className={styles.headerCta}>
          <a className={`${styles.btn} ${styles.btnYellow} ${styles.btnSm}`} href="#dang-ky">Đăng ký học thử</a>
        </div>
        <button
          ref={btn} type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="ns-menu"
          aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className={styles.menuIcon}><i /><i /><i /></span>
        </button>
      </div>
      <div ref={menu} id="ns-menu" className={styles.menuSheet} data-open={open ? "1" : "0"} hidden={!open} role="dialog" aria-label="Menu">
        <ul>
          {NAV.map((n) => <li key={n.href}><a href={n.href} onClick={close}>{n.label}</a></li>)}
        </ul>
        <a className={`${styles.btn} ${styles.btnYellow}`} href="#dang-ky" onClick={close}>Đăng ký học thử</a>
      </div>
    </header>
  );
}
