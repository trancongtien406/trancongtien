"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { Shoe } from "./Shoe";

export type Model = { id: string; no: string; name: string; use: string; price: number; weight: string; drop: string; upper: string; accent: string; note: string };

const SIZES = [39, 40, 41, 42, 43, 44, 45];
const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

export function Shop({ models }: { models: Model[] }) {
  const [sizes, setSizes] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<{ id: string; size: number }[]>([]);
  const [msg, setMsg] = useState("");

  const total = cart.reduce((s, c) => s + (models.find((m) => m.id === c.id)?.price ?? 0), 0);

  function add(m: Model) {
    const size = sizes[m.id];
    if (!size) {
      setMsg(`Chọn cỡ cho ${m.name} trước khi thêm vào giỏ.`);
      return;
    }
    setCart((c) => [...c, { id: m.id, size }]);
    setMsg(`Đã thêm ${m.name}, cỡ ${size}.`);
  }

  return (
    <div>
      <div className={styles.cartBar} role="region" aria-label="Giỏ hàng mô phỏng">
        <p><b>{cart.length}</b> đôi trong giỏ · <b>{fmt(total)}</b></p>
        <p className={styles.cartMsg} role="status" aria-live="polite">{msg || "Giỏ hàng mô phỏng, không có thanh toán thật."}</p>
        <button type="button" className={styles.btnLine} onClick={() => { setCart([]); setMsg("Đã làm trống giỏ."); }} disabled={!cart.length}>Làm trống</button>
      </div>
      <ul className={styles.products}>
        {models.map((m) => (
          <li key={m.id} className={styles.product} data-rv>
            <div className={styles.pTop}><span>{m.no}</span><span>{m.use}</span></div>
            <div className={styles.pShoe} style={{ ["--pc" as string]: m.accent }}><Shoe upper={m.upper} accent={m.accent} label={`Minh hoạ giày ${m.name}`} /></div>
            <h3 className={styles.pName}>{m.name}</h3>
            <p className={styles.pNote}>{m.note}</p>
            <dl className={styles.pSpec}>
              <div><dt>Nặng</dt><dd>{m.weight}</dd></div>
              <div><dt>Độ dốc</dt><dd>{m.drop}</dd></div>
              <div><dt>Giá</dt><dd>{fmt(m.price)}</dd></div>
            </dl>
            <fieldset className={styles.sizes}>
              <legend>Cỡ giày (EU)</legend>
              {SIZES.map((s) => (
                <label key={s}>
                  <input type="radio" name={`size-${m.id}`} value={s} checked={sizes[m.id] === s} onChange={() => setSizes((z) => ({ ...z, [m.id]: s }))} />
                  <span>{s}</span>
                </label>
              ))}
            </fieldset>
            <button type="button" className={styles.btn} onClick={() => add(m)}>Thêm vào giỏ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
