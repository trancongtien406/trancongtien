"use client";

import { useState } from "react";
import s from "../brand.module.css";
import { PLANS } from "../data";

const vnd = (n: number) => (n === 0 ? "Miễn phí" : n < 0 ? "Liên hệ" : `₫${n.toLocaleString("vi-VN")}`);

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="bang-gia" className={s.pricing} aria-labelledby="pc-h">
      <div className={`${s.secHead} ${s.center}`}>
        <p className={s.tagSm}>Bảng giá</p>
        <h2 id="pc-h" className={s.h2c}>Giá rõ ràng, <em>không phí ẩn.</em></h2>
        <div className={s.toggle} role="group" aria-label="Chu kỳ thanh toán">
          <button type="button" aria-pressed={!yearly} className={!yearly ? s.tOn : ""} onClick={() => setYearly(false)}>Hằng tháng</button>
          <button type="button" aria-pressed={yearly} className={yearly ? s.tOn : ""} onClick={() => setYearly(true)}>Hằng năm <em>−20%</em></button>
        </div>
      </div>
      <ul className={s.planGrid}>
        {PLANS.map((p) => (
          <li key={p.t} className={p.hot ? s.planHot : ""} data-reveal>
            {p.hot && <span className={s.badge}>Phổ biến</span>}
            <h3>{p.t}</h3><p className={s.pd}>{p.d}</p>
            <p className={s.price}><b>{vnd(yearly ? p.y : p.m)}</b>{p.m > 0 && <small>/người/tháng</small>}</p>
            <ul>{p.f.map((f) => (<li key={f}>{f}</li>))}</ul>
            <a className={p.hot ? s.btnBlue : s.btnLine} href="#dang-ky">{p.m < 0 ? "Liên hệ tư vấn" : "Bắt đầu"}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
