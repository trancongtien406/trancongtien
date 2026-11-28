"use client";

import { useRef, useState } from "react";
import s from "../brand.module.css";
import { STORIES } from "../data";

export function Trusted() {
  const tr = useRef<HTMLUListElement>(null);
  const [p, setP] = useState(0);
  const scroll = (dir: number) => { const el = tr.current; if (!el) return; const card = el.querySelector("li"); el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 16), behavior: "smooth" }); };
  return (
    <section id="khach-hang" className={s.trusted} aria-labelledby="tr-h">
      <div className={s.trHead}>
        <h2 id="tr-h" className={s.h2l}><em>Được tin dùng bởi</em> <br />đội ngũ tài chính tăng trưởng cao</h2>
        <a className={s.btnDark} href="#khach-hang">Câu chuyện khách hàng</a>
      </div>
      <ul className={s.cards} ref={tr} tabIndex={0} aria-label="Lời khách hàng, cuộn ngang" onScroll={(e) => { const el = e.currentTarget; setP(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)); }}>
        {STORIES.map((x) => (
          <li key={x.c}>
            <p className={s.co}><span aria-hidden="true">{x.c[0]}</span>{x.c}</p>
            <blockquote>“{x.q}”</blockquote>
            <p className={s.who}><b>{x.n}</b><span>{x.o}</span></p>
          </li>
        ))}
      </ul>
      <div className={s.trCtl}>
        <div className={s.prog} aria-hidden="true"><i style={{ width: `${25 + p * 35}%`, left: `${p * 40}%` }} /></div>
        <div><button type="button" aria-label="Lời trước" onClick={() => scroll(-1)}>←</button><button type="button" aria-label="Lời tiếp theo" onClick={() => scroll(1)}>→</button></div>
      </div>
      <p className={s.note}>Tên khách hàng và lời đánh giá là nội dung minh hoạ.</p>
    </section>
  );
}
