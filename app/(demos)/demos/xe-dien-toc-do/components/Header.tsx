"use client";

import { useEffect, useRef } from "react";
import s from "../brand.module.css";
import { useBuild } from "../Store";

export function Header() {
  const { openDrawer } = useBuild();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => { el.dataset.solid = window.scrollY > window.innerHeight * 0.6 ? "1" : "0"; };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header ref={ref} className={s.header} data-solid="0">
      <a href="#top" className={s.logo} aria-label="Vĩ Tốc EV V4 Mưa Rào, về đầu trang"><b>V4</b><span>MƯA RÀO</span></a>
      <nav className={s.nav} aria-label="Điều hướng chính">
        <a href="#hieu-nang">Hiệu năng</a><a href="#ky-thuat">Kỹ thuật</a><a href="#cau-hinh">Cấu hình</a><a href="#so-huu">Sở hữu</a>
      </nav>
      <button type="button" className={s.pill} onClick={openDrawer}>Đặt chỗ</button>
    </header>
  );
}

/** Nút phát lại intro cố định, và thanh tóm tắt cấu hình (hiện từ phần cấu hình tới hết phần sở hữu). */
export function Floaters() {
  const { total, code, openDrawer } = useBuild();
  const rep = useRef<HTMLButtonElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY, h = window.innerHeight;
      if (rep.current) rep.current.dataset.show = y > h * 0.7 ? "1" : "0";
      const cfg = document.getElementById("cau-hinh"), own = document.getElementById("so-huu");
      if (bar.current && cfg && own) {
        const a = cfg.getBoundingClientRect(), b = own.getBoundingClientRect();
        bar.current.dataset.show = a.top < h * 0.4 && b.top > h * 0.3 && window.innerWidth > 0 ? "1" : "0";
      }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  const m = (v: number) => `${(v / 1000).toFixed(3).replace(".", ",")} tỷ`;
  return (
    <>
      <button ref={rep} type="button" className={s.replay} data-show="0" onClick={() => window.dispatchEvent(new Event("vt-replay"))} aria-label="Phát lại intro">↻ Phát lại intro</button>
      <div ref={bar} className={s.bar} data-show="0">
        <div className={s.barL}><small>Bản dựng của bạn</small><b>{m(total)}</b><em>MÃ {code}</em></div>
        <div className={s.barR}>
          <a className={s.ghost} href="#lai-thu">Đặt lái thử</a>
          <button type="button" className={s.gold} onClick={openDrawer}>Giữ suất <i aria-hidden="true">→</i></button>
        </div>
      </div>
    </>
  );
}
