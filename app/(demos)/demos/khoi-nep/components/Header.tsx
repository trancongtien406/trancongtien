"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import s from "../brand.module.css";

const ID = "/images/demos/khoi-nep/identity";

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a className={s.skip} href="#main">
        Bỏ qua, tới nội dung chính
      </a>
      <header className={s.header} id="top">
        <div className={`${s.wrap} ${s.headRow}`}>
          <a href="#top" className={s.logoLink} aria-label="Khối Nếp — về đầu trang">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ID}/logo-horizontal.svg`} width={200} height={48} alt="" />
          </a>
          <nav className={s.nav} aria-label="Điều hướng chính">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className={s.headCta} href="#budget">
            Dự toán ngân sách <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={btn}
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="kn-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Đóng" : "Menu"}
          </button>
        </div>
        <div id="kn-menu" className={s.menuPanel} hidden={!open}>
          <ul className={s.wrap}>
            {[...NAV, { href: "#board", label: "Tạo bảng vật liệu" }, { href: "#budget", label: "Dự toán ngân sách" }].map((n) => (
              <li key={n.href + n.label}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
