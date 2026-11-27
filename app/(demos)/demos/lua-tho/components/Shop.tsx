"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";
import { Vessel } from "./Vessel";
import { WARES } from "./Showcase";

const PRICES = [690, 180, 150, 360, 420, 980, 240, 320];
const fmt = new Intl.NumberFormat("vi-VN");

export function Shop() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [done, setDone] = useState("");
  const [err, setErr] = useState("");
  const uid = useId();
  const items = Object.entries(cart).filter(([, q]) => q > 0);
  const count = items.reduce((a, [, q]) => a + q, 0);
  const total = items.reduce((a, [i, q]) => a + PRICES[+i] * q, 0);
  const add = (i: number, d: number) => { setDone(""); setCart((c) => ({ ...c, [i]: Math.max(0, (c[i] || 0) + d) })); };

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!count) return setErr("Giỏ đang trống, hãy thêm ít nhất một món.");
    if (!String(f.get("name") || "").trim() || !String(f.get("addr") || "").trim()) return setErr("Vui lòng nhập tên và địa chỉ nhận.");
    setErr("");
    setDone(`Đã ghi nhận ${count} món (${fmt.format(total)}.000 ₫) vào mẻ nung kế tiếp. Đây là bản minh hoạ, chưa có đơn nào được gửi đi.`);
    setCart({});
    e.currentTarget.reset();
  }

  return (
    <div>
      <ul className={styles.shopGrid}>
        {WARES.map((v, i) => {
          const q = cart[i] || 0;
          return (
            <li key={v.n} className={styles.card} data-rv>
              <div className={styles.cardArt}><Vessel kind={v.kind} base={v.base} glaze={v.glaze} dip={v.dip} id={`p${i}`} label={`Minh hoạ ${v.n}`} /></div>
              <h3>{v.n}</h3>
              <p className={styles.cardGlaze}>{v.glazeName}</p>
              <p className={styles.price}>{fmt.format(PRICES[i])}.000 ₫ <small>giá minh hoạ</small></p>
              {q === 0 ? (
                <button type="button" className={styles.btnLine} onClick={() => add(i, 1)}>Thêm vào giỏ</button>
              ) : (
                <div className={styles.qty} role="group" aria-label={`Số lượng ${v.n}`}>
                  <button type="button" onClick={() => add(i, -1)} aria-label={`Bớt một ${v.n}`}>−</button>
                  <output aria-live="polite">{q}</output>
                  <button type="button" onClick={() => add(i, 1)} aria-label={`Thêm một ${v.n}`}>+</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <form className={styles.order} onSubmit={submit} noValidate>
        <div>
          <h3>Giỏ đặt mẻ nung</h3>
          <p className={styles.orderSum}>{count} món · <strong>{fmt.format(total)}.000 ₫</strong></p>
          <p className={styles.fnote}>Gốm làm theo mẻ, thường 3 đến 4 tuần mới giao (ví dụ minh hoạ).</p>
        </div>
        <label htmlFor={`${uid}n`}>Họ và tên<input id={`${uid}n`} name="name" autoComplete="name" /></label>
        <label htmlFor={`${uid}a`}>Địa chỉ nhận<input id={`${uid}a`} name="addr" autoComplete="street-address" /></label>
        <button type="submit" className={styles.btn}>Đặt theo mẻ nung</button>
        <p role="status" aria-live="polite" className={done ? styles.ok : styles.err}>{err || done}</p>
      </form>
    </div>
  );
}
