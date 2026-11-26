"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import { Close } from "./Icons";
import styles from "../brand.module.css";

const LOGO = "/images/demos/mien-an/identity/logo-horizontal.svg";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
      d.querySelector<HTMLElement>("a,button")?.focus();
    }
    if (!open && d.open) d.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
    btn.current?.focus();
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={`${styles.container} ${styles.headerIn}`}>
        <a href="#home" className={styles.logoLink} aria-label="Miên An Wellness — về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="" width={320} height={100} />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#appointment" className={`${styles.btn} ${styles.btnPrimary} ${styles.headerCta}`}>
          Đặt lịch
        </a>
        <button ref={btn} type="button" className={styles.menuBtn} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
          Menu <span className={styles.menuBars} aria-hidden="true" />
        </button>
      </div>
      <dialog
        ref={dlg}
        className={`${styles.menu} ${styles.menuAnim}`}
        aria-label="Menu"
        onClose={() => {
          setOpen(false);
          document.documentElement.style.overflow = "";
          btn.current?.focus();
        }}
        onCancel={() => setOpen(false)}
      >
        <div className={styles.menuIn}>
          <div className={styles.menuTop}>
            <span className={styles.eyebrow}>Miên An</span>
            <button type="button" className={styles.menuBtn} onClick={close}>
              Đóng <Close />
            </button>
          </div>
          <nav aria-label="Menu di động" className={styles.menuList}>
            {NAV.map((n, i) => (
              <a key={n.href} href={n.href} onClick={close}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </a>
            ))}
          </nav>
          <div className={styles.menuCta}>
            <a href="#appointment" className={`${styles.btn} ${styles.btnPrimary}`} onClick={close}>
              Đặt lịch
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
