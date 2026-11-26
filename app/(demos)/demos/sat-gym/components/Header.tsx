"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import styles from "../brand.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on_ = () => setStuck(window.scrollY > 40);
    on_();
    window.addEventListener("scroll", on_, { passive: true });
    return () => window.removeEventListener("scroll", on_);
  }, []);

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
    <header className={styles.header} data-stuck={stuck ? "1" : "0"} data-open={open ? "1" : "0"}>
      <div className={styles.headerRow}>
        <a className={styles.logoLink} href="#main" aria-label="SẬT Gym, về đầu trang" data-sg="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/sat-gym/identity/logo-reversed.svg" alt="SẬT Gym" width={170} height={48} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => <a key={n.href} href={n.href} data-cursor="Tới">{n.label}</a>)}
        </nav>
        <a className={`${styles.btn} ${styles.btnAcid} ${styles.btnSm} ${styles.headerCta}`} href="#tap-thu" data-shake data-cursor="Tập">Tập thử</a>
        <button
          ref={btn} type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="sg-menu"
          aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className={styles.menuIcon}><i /><i /><i /></span>
        </button>
      </div>
      <div id="sg-menu" ref={menu} className={styles.menuPanel} hidden={!open}>
        <nav aria-label="Điều hướng di động">
          {NAV.map((n, i) => (
            <a key={n.href} href={n.href} onClick={close}><small>{String(i + 1).padStart(2, "0")}</small>{n.label}</a>
          ))}
        </nav>
        <a className={`${styles.btn} ${styles.btnAcid} ${styles.btnLg}`} href="#tap-thu" onClick={close} data-shake>Đăng ký tập thử</a>
      </div>
    </header>
  );
}
