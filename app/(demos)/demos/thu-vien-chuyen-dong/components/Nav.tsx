"use client";
import { useEffect, useState } from "react";
import styles from "../brand.module.css";
import { Mark } from "./Poster";

const LINKS: [string, string][] = [["Kiểu chuyển động", "#tm-top"], ["Tính năng", "#tm-features"], ["Mẫu", "#tm-presets"], ["Trợ lý AI", "#tm-mcp"], ["Giá", "#tm-pricing"], ["Hỏi đáp", "#tm-faq"]];

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
      <a href="#tm-top" className={styles.logo} aria-label="Thư Viện Chuyển Động, về đầu trang"><Mark size={22} /><span>Thư Viện Chuyển Động</span></a>
      <nav aria-label="Chính" className={styles.navLinks}>{LINKS.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
      <a className={styles.navCta} href="#tm-try">Dùng thử</a>
      <button type="button" className={styles.burger} aria-expanded={open} aria-controls="tm-menu" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen(!open)}><span /><span /></button>
      <div id="tm-menu" className={styles.menu} hidden={!open}>
        {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a href="#tm-try" className={styles.dark} onClick={() => setOpen(false)}>Dùng thử miễn phí</a>
      </div>
    </header>
  );
}
