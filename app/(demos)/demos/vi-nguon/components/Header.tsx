"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";
import { NAV } from "../data";
import { Logo } from "./Logo";

export function Header() {
  const [mode, setMode] = useState<"top" | "show" | "hide">("top");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY; const past = y > window.innerHeight * 0.8;
      setMode(!past ? "top" : y < last ? "show" : "hide");
      if (y > last + 4) setOpen(false);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={s.header} data-mode={mode}>
      <div className={s.navPill}>
        <a className={s.brandLink} href="#top" aria-label="Ví Nguồn, về đầu trang"><Logo /><span>Ví Nguồn</span></a>
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => (<a key={n.href} href={n.href}>{n.label}{"caret" in n && <i aria-hidden="true" />}</a>))}
        </nav>
        <div className={s.navAct}>
          <a className={s.login} href="#dang-ky">Đăng nhập</a>
          <a className={s.signup} href="#dang-ky">Đăng ký</a>
          <button type="button" className={s.burger} aria-expanded={open} aria-controls="vn-menu" onClick={() => setOpen((v) => !v)}><span className={s.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span><i aria-hidden="true" /><i aria-hidden="true" /></button>
        </div>
      </div>
      <div id="vn-menu" className={s.menu} hidden={!open}>
        {NAV.map((n) => (<a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>))}
        <a href="#dang-ky" onClick={() => setOpen(false)}>Đăng nhập</a>
      </div>
    </header>
  );
}
