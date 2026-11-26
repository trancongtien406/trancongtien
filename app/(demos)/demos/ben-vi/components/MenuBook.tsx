"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "../brand.module.css";
import { MENU_PAGES } from "../data/restaurant";

const TOTAL = MENU_PAGES.length + 1; // bìa + các trang

/**
 * Thực đơn lật trang (chữ ký Bến Vị): bìa + 3 trang giấy, lật quanh gáy bằng rotateY.
 * Khi chưa có JS các trang xếp dọc đọc được; trang đang ẩn được inert để trình đọc màn hình không đọc nhầm.
 */
export function MenuBook() {
  const [page, setPage] = useState(0);
  const prev = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;
    const sheets = Array.from(el.querySelectorAll<HTMLElement>("[data-sheet]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sheets.forEach((sh, i) => {
      const turned = i < page;
      const wasTurned = i < prev.current;
      sh.style.zIndex = String(turned ? i : TOTAL - i);
      if (turned) sh.setAttribute("inert", ""); else if (i === page) sh.removeAttribute("inert"); else sh.setAttribute("inert", "");
      sh.setAttribute("aria-hidden", i === page ? "false" : "true");
      const target = { rotateY: turned ? -112 : 0, opacity: turned ? 0 : 1, boxShadow: turned ? "none" : "0 12px 40px rgba(0,0,0,0.35)" };
      if (reduce || prev.current === page && wasTurned === turned) {
        gsap.set(sh, { ...target, transformOrigin: "0% 50%", transformPerspective: 1800 });
      } else if (wasTurned !== turned) {
        gsap.to(sh, { ...target, transformOrigin: "0% 50%", transformPerspective: 1800, duration: 0.95, ease: "power3.inOut", overwrite: true });
      }
    });
    prev.current = page;
    return () => { gsap.killTweensOf(sheets); };
  }, [page, ready]);

  const go = (d: number) => setPage((p) => Math.min(TOTAL - 1, Math.max(0, p + d)));
  const label = page === 0 ? "Bìa" : MENU_PAGES[page - 1].title;

  return (
    <section id="thuc-don" className={`${s.section} ${s.bookSec} ${s.noPrint}`} aria-labelledby="book-h">
      <div className={`${s.wrap} ${s.bookGrid}`}>
        <div className={s.bookText} data-bv="reveal">
          <span className={s.eyebrow}>Thực đơn</span>
          <h2 id="book-h" className={`${s.display} ${s.h2}`}>Lật từng trang, <span className={s.italic}>gọi từng nhóm</span></h2>
          <p className={s.lead}>Thực đơn chia ba nhóm: hải sản tươi sống tính theo cân, lẩu và nồi nóng, món ăn kèm. Giá là giá tham khảo, thay đổi theo ngày.</p>
          <div className={s.bookCtl}>
            <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={() => go(-1)} disabled={page === 0} aria-label="Trang trước">← Trang trước</button>
            <button type="button" className={`${s.btn} ${s.btnGold}`} onClick={() => go(1)} disabled={page === TOTAL - 1} aria-label="Trang sau">Trang sau →</button>
          </div>
          <p className={s.bookPos} role="status" aria-live="polite" data-testid="book-pos">Trang {page + 1} / {TOTAL} · {label}</p>
        </div>

        <div className={s.book} ref={root} data-ready={ready ? "1" : "0"}>
          <article data-sheet="" className={`${s.sheetPage} ${s.cover}`} aria-label="Bìa thực đơn" style={{ zIndex: TOTAL }}>
            <p className={s.coverK}>Nhà hàng hải sản ven biển</p>
            <h3 className={s.coverT} translate="no">Bến Vị</h3>
            <span className={s.coverRule} aria-hidden="true" />
            <p className={s.coverS}>Thực đơn<br />Hải sản tươi sống · Lẩu · Món ăn kèm</p>
            <p className={s.coverF}>Giá tham khảo, thay đổi theo ngày</p>
          </article>
          {MENU_PAGES.map((pg, i) => (
            <article key={pg.id} data-sheet="" className={s.sheetPage} aria-label={pg.title} style={{ zIndex: TOTAL - (i + 1) }}>
              <header><p className={s.pgK}>{pg.kicker}</p><h3>{pg.title}</h3></header>
              <ul>
                {pg.lines.map((l) => (
                  <li key={l.name}><div><b>{l.name}</b><small>{l.note}</small></div><span className={s.dots} aria-hidden="true" /><span className={s.pgPrice}>{l.price}</span></li>
                ))}
              </ul>
              <p className={s.pgFoot}>{pg.foot}</p>
              <span className={s.pgNo} aria-hidden="true">{i + 2}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
