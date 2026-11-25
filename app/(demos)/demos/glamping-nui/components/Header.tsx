"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/features/showroom/effects";
import styles from "../brand.module.css";

const NAV = [
  { href: "#hanh-trinh", label: "Hành trình" },
  { href: "#luu-tru", label: "Lều" },
  { href: "#hoat-dong", label: "Hoạt động" },
  { href: "#lua-trai", label: "Lửa trại" },
  { href: "#lap-ke-hoach", label: "Lên kế hoạch" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className={styles.header} data-solid={solid || open ? "true" : "false"}>
      <div className={`${styles.wrap} ${styles.headerRow}`}>
        <a className={styles.logoLink} href="#top" aria-label="Rừng Thức, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/glamping-nui/identity/logo-horizontal.svg" alt="Rừng Thức" width={168} height={60} translate="no" />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính" data-open={open ? "true" : "false"} id="gl-nav">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className={styles.headerTools}>
          <MagneticButton max={6} strength={0.2}>
            <a className={`${styles.btn} ${styles.btnFire} ${styles.btnSm}`} href="#lap-ke-hoach">Lên lịch chuyến đi</a>
          </MagneticButton>
          <button ref={btn} type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="gl-nav" onClick={() => setOpen((v) => !v)}>
            <span className={styles.menuIcon} aria-hidden="true" />
            <span className={styles.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
