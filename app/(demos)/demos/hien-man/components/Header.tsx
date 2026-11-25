"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import styles from "../brand.module.css";

const ID = "/images/demos/hien-man/identity";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 64);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const els = [btn.current, ...Array.from(panel.current.querySelectorAll<HTMLElement>("a"))].filter(Boolean) as HTMLElement[];
        const i = els.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); els[els.length - 1].focus(); }
        else if (!e.shiftKey && i === els.length - 1) { e.preventDefault(); els[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={styles.header} data-solid={solid || open} data-open={open}>
      <div className={styles.headerRow}>
        <a className={styles.logoLink} href="#top" aria-label="Hiên Mặn Villa, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logoLight} src={`${ID}/logo-horizontal-reversed.svg`} alt="" width={360} height={96} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logoDark} src={`${ID}/logo-horizontal.svg`} alt="" width={360} height={96} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a className={styles.headCta} href="#lich-gia">Xem lịch & giá</a>
        <button ref={btn} type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="hm-menu" onClick={() => setOpen((o) => !o)}>
          <span className={styles.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      <div id="hm-menu" ref={panel} className={styles.menuPanel} hidden={!open}>
        {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
        <a href="#lich-gia" className={styles.menuCta} onClick={() => setOpen(false)}>Xem lịch & giá</a>
        <p>Hiên Mặn Villa · Sơn Trà, Đà Nẵng</p>
      </div>
    </header>
  );
}
