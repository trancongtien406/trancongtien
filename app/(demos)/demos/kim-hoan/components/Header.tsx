"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import { Mark } from "./Logo";
import styles from "../brand.module.css";

export function Header({ consultHref }: { consultHref: string }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setSolid(window.scrollY > 40);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const links = () => Array.from(panel.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    links()[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      } else if (e.key === "Tab") {
        const ls = [...links(), btn.current!].filter(Boolean);
        const first = ls[0];
        const last = ls[ls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header className={styles.header} data-solid={solid ? "1" : "0"} data-open={open ? "1" : "0"}>
      <div className={styles.headerIn}>
        <a href="#top" className={styles.brandLink} aria-label="Kim Nguyệt, về đầu trang">
          <Mark uid="hd" className={styles.brandMark} />
          <span className={styles.brandWord} translate="no">Kim Nguyệt</span>
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className={styles.headCta} href={consultHref} data-cursor="">Nhận tư vấn</a>
        <button
          ref={btn}
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="kn-menu"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>
      {open ? (
        <div id="kn-menu" ref={panel} className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
              </li>
            ))}
          </ul>
          <a className={styles.btnGold} href={consultHref} onClick={() => setOpen(false)}>Nhận tư vấn</a>
        </div>
      ) : null}
    </header>
  );
}
