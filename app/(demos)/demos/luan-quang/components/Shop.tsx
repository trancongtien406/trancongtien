"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { Watch } from "./Watch";

const MODELS = [
  { id: "ng", name: "Nguyên", note: "Mặt ngà, vỏ vàng đồng", price: 48900000, face: "#e7e3dc", ink: "#101820", tone: "#b99860" },
  { id: "da", name: "Dạ", note: "Mặt xanh đen, kim vàng", price: 52500000, face: "#1a2733", ink: "#e7e3dc", tone: "#b99860" },
  { id: "th", name: "Thép Sáng", note: "Mặt bạc, vỏ thép chải", price: 39800000, face: "#cdd3d8", ink: "#101820", tone: "#9aa4ad" },
] as const;
const fmt = (n: number) => `${n.toLocaleString("vi-VN")} ₫`;

export function Shop() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const lines = MODELS.filter((m) => cart[m.id]);
  const count = lines.reduce((a, m) => a + cart[m.id], 0);
  const total = lines.reduce((a, m) => a + cart[m.id] * m.price, 0);
  const add = (id: string, d: number) => setCart((c) => { const v = Math.max(0, (c[id] || 0) + d); const n = { ...c }; if (v) n[id] = v; else delete n[id]; return n; });
  return (
    <>
      <ul className={styles.models}>
        {MODELS.map((m, i) => (
          <li key={m.id} className={styles.model} data-rv>
            <Watch label={`Đồng hồ Luân Quang ${m.name}`} face={m.face} ink={m.ink} tone={m.tone} hms={[10 + i, 8 + i * 7, 20]} />
            <h3>Luân Quang {m.name}</h3><p>{m.note}</p>
            <p className={styles.price}>{fmt(m.price)}</p>
            <button type="button" className={styles.btn} onClick={() => add(m.id, 1)} aria-label={`Thêm Luân Quang ${m.name} vào giỏ`}>Thêm vào giỏ</button>
          </li>
        ))}
      </ul>
      <div className={styles.cart} aria-live="polite">
        <h3>Giỏ hàng mô phỏng · {count} sản phẩm</h3>
        {lines.length === 0 ? <p className={styles.mute}>Chưa có sản phẩm. Chọn một mẫu ở trên để thêm vào giỏ.</p> : (
          <ul>{lines.map((m) => (<li key={m.id}><span>Luân Quang {m.name}</span>
            <span className={styles.qty}><button type="button" aria-label={`Giảm ${m.name}`} onClick={() => add(m.id, -1)}>−</button><output>{cart[m.id]}</output><button type="button" aria-label={`Tăng ${m.name}`} onClick={() => add(m.id, 1)}>+</button></span>
            <b>{fmt(m.price * cart[m.id])}</b></li>))}</ul>
        )}
        <p className={styles.sum}>Tổng cộng <b>{fmt(total)}</b></p>
        <form noValidate className={styles.order} onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget); const name = String(f.get("name") || "").trim(); const tel = String(f.get("tel") || "").replace(/\s/g, "");
          if (!count) { setErr("Giỏ hàng đang trống."); setMsg(""); return; }
          if (!name || !/^(0|\+84)\d{8,10}$/.test(tel)) { setErr("Nhập tên và số điện thoại hợp lệ."); setMsg(""); return; }
          setErr(""); setMsg(`Cảm ơn ${name}. Đơn mô phỏng ${count} sản phẩm, tổng ${fmt(total)}. Không có đơn hàng thật nào được tạo.`);
        }}>
          <label>Họ tên<input name="name" autoComplete="name" /></label>
          <label>Điện thoại<input name="tel" type="tel" inputMode="tel" autoComplete="tel" /></label>
          <button type="submit" className={styles.btn}>Đặt hàng (mô phỏng)</button>
        </form>
        {err && <p className={styles.err} role="alert">{err}</p>}{msg && <p className={styles.ok}>{msg}</p>}
      </div>
    </>
  );
}
