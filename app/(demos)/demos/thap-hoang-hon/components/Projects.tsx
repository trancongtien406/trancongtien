"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import s from "../brand.module.css";
import { FILTERS, PROJECTS } from "../data";

export function Projects() {
  const [f, setF] = useState<string>("all");
  const list = PROJECTS.filter((p) => f === "all" || p.c === f);
  const [sel, setSel] = useState<string>(PROJECTS[0].t);
  const cur = list.find((p) => p.t === sel) ?? list[0];
  return (
    <section id="cong-trinh" className={s.proj} aria-labelledby="pj-h">
      <div className={s.secHead}>
        <p className={s.mono}><i className={s.dash} />Công trình tiêu biểu</p>
        <h2 id="pj-h">Hai mươi hai năm, <em>sáu cái tên để nhớ.</em></h2>
      </div>
      <div className={s.filters} role="group" aria-label="Lọc theo loại công trình">
        {FILTERS.map((x) => (<button key={x.k} type="button" aria-pressed={f === x.k} className={f === x.k ? s.fOn : ""} onClick={() => { setF(x.k); const first = PROJECTS.find((p) => x.k === "all" || p.c === x.k); if (first) setSel(first.t); }}>{x.l}</button>))}
      </div>
      <div className={s.projGrid}>
        <ul className={s.projList}>
          {list.map((p) => (
            <li key={p.t}>
              <button type="button" aria-pressed={cur.t === p.t} className={cur.t === p.t ? s.projOn : ""} onClick={() => setSel(p.t)} onPointerEnter={() => setSel(p.t)}>
                <span>{p.t}</span><i>{p.y}</i>
              </button>
            </li>
          ))}
        </ul>
        {cur && (
          <article className={s.projCard} key={cur.t} aria-live="polite">
            <div className={s.projImg}><img src={`/images/demos/thap-hoang-hon/${cur.img}.webp`} style={{ objectPosition: cur.pos }} width={1600} height={900} alt={`${cur.t}, ảnh minh hoạ`} loading="lazy" decoding="async" /></div>
            <div className={s.projBody}>
              <p className={s.mono}>{cur.loc} · {cur.y}</p>
              <h3>{cur.t}</h3>
              <p>{cur.d}</p>
              <ul className={s.chips}>{cur.m.map((m) => (<li key={m}>{m}</li>))}</ul>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
