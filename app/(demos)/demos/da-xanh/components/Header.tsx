"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import styles from "../brand.module.css";

const ID = "/images/demos/da-xanh/identity";

export function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = () => setStuck(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
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
      <div className={styles.headerPill}>
        <a className={styles.logoLink} href="#main" aria-label="NÉA Skin Studio, về đầu trang" data-dx="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ID}/logo-horizontal.svg`} alt="NÉA Skin Studio" width={150} height={51} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a className={`${styles.btn} ${styles.btnInk} ${styles.btnSm} ${styles.headerCta}`} href="#routine">Thử Routine Builder</a>
        <button
          ref={btn} type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="dx-menu"
          aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className={styles.menuIcon}><i /><i /></span>
        </button>
      </div>
      <div ref={menu} id="dx-menu" className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.href} style={{ ["--i" as string]: i }}><a href={n.href} onClick={close}>{n.label}</a></li>
          ))}
        </ul>
        <a className={`${styles.btn} ${styles.btnInk}`} href="#routine" onClick={close}>Thử Routine Builder</a>
      </div>
    </header>
  );
}
