"use client";
import { useEffect, useState } from "react";
import styles from "../brand.module.css";

const LINKS: [string, string][] = [["Dự án", "#vc-work"], ["Công ty", "#vc-company"], ["Dịch vụ", "#vc-services"], ["Atom AI", "#vc-atom"], ["Liên hệ", "#vc-contact"]];

export function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className={styles.nav}>
      <a href="#vc-top" className={styles.logo} aria-label="Vô Cực Lab, về đầu trang"><svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M10 6C8 2 2 1 2 6s6 4 8 0 8-5 8 0-6 5-8 0Z" /></svg>VÔ CỰC LAB</a>
      <nav aria-label="Chính" className={styles.navLinks}>{LINKS.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
      <a className={styles.navCta} href="#vc-contact">Bắt đầu dự án <i aria-hidden="true">↗</i></a>
      <button type="button" className={styles.burger} aria-expanded={open} aria-controls="vc-menu" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen(!open)}><span /><span /></button>
      <div id="vc-menu" className={`${styles.menu} ${open ? styles.menuOn : ""}`} hidden={!open}>
        {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a href="#vc-contact" className={styles.btnP} onClick={() => setOpen(false)}>Bắt đầu dự án</a>
      </div>
    </header>
  );
}
