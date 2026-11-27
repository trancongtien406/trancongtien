"use client";

import { useMemo, useState } from "react";
import styles from "../brand.module.css";
import { Art } from "./Art";

export const products = [
  { id: "le", kind: "pear", name: "Lê tai nung", unit: "1 kg", price: 95000, note: "Giòn, ngọt thanh, theo mùa thu hoạch." },
  { id: "mam", kind: "sprout", name: "Rau mầm hỗn hợp", unit: "khay 200 g", price: 38000, note: "Cắt sáng, giao trong ngày, còn rễ." },
  { id: "mat", kind: "honey", name: "Mật ong hoa rừng", unit: "chai 330 ml", price: 185000, note: "Lọc thô, không gia nhiệt." },
  { id: "gao", kind: "rice", name: "Gạo lứt đỏ", unit: "túi 1 kg", price: 56000, note: "Xay vừa đủ, hút chân không." },
  { id: "tra", kind: "tea", name: "Trà lá ổi sao", unit: "hộp 100 g", price: 72000, note: "Sao củi nhỏ lửa, vị mộc." },
  { id: "gio", kind: "box", name: "Giỏ Mộc theo tuần", unit: "giỏ 4 món", price: 289000, note: "Người trồng chọn theo mùa." },
] as const;

const vnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";

export function Shop() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const lines = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] })), [cart]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const setQty = (id: string, d: number) => setCart((c) => { const q = Math.max(0, (c[id] ?? 0) + d); const n = { ...c }; if (q) n[id] = q; else delete n[id]; return n; });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const addr = String(f.get("addr") ?? "").trim();
    const next: Record<string, string> = {};
    if (!count) next.cart = "Giỏ đang trống, hãy thêm ít nhất một sản phẩm.";
    if (name.length < 2) next.name = "Vui lòng nhập họ tên.";
    if (!/^(0|\+84)\d{9}$/.test(phone)) next.phone = "Số điện thoại chưa đúng.";
    if (addr.length < 6) next.addr = "Vui lòng nhập địa chỉ giao hàng.";
    setErr(next);
    if (!Object.keys(next).length) setDone(`Cảm ơn ${name}! Đơn mô phỏng ${count} món, tạm tính ${vnd(total)}. Không có dữ liệu nào được gửi đi.`);
  }

  return (
    <>
      <ul className={styles.products} id="san-pham">
        {products.map((p) => (
          <li key={p.id} className={styles.product} data-rise>
            <div className={styles.productArt}><Art kind={p.kind} alt={`Tranh minh hoạ ${p.name}`} /></div>
            <h3>{p.name}</h3>
            <p className={styles.productNote}>{p.note}</p>
            <div className={styles.productRow}>
              <span><b>{vnd(p.price)}</b> <small>/ {p.unit}</small></span>
              <button type="button" className={styles.add} onClick={() => setQty(p.id, 1)} aria-label={`Thêm ${p.name} vào giỏ`}>+</button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.order} id="dat-hang">
        <div className={styles.cart} aria-live="polite">
          <h3>Giỏ của bạn <span>({count})</span></h3>
          {lines.length === 0 ? <p className={styles.muted}>Chưa có món nào. Bấm dấu cộng ở các sản phẩm phía trên.</p> : (
            <ul>
              {lines.map((l) => (
                <li key={l.id}>
                  <span>{l.name}</span>
                  <span className={styles.qty}>
                    <button type="button" onClick={() => setQty(l.id, -1)} aria-label={`Giảm ${l.name}`}>−</button>
                    <output>{l.qty}</output>
                    <button type="button" onClick={() => setQty(l.id, 1)} aria-label={`Tăng ${l.name}`}>+</button>
                  </span>
                  <b>{vnd(l.price * l.qty)}</b>
                </li>
              ))}
            </ul>
          )}
          <p className={styles.total}>Tạm tính <b>{vnd(total)}</b></p>
          {err.cart && <p className={styles.err} role="alert">{err.cart}</p>}
        </div>

        {done ? (
          <div className={styles.done} role="status"><h3>Đã nhận đơn mô phỏng</h3><p>{done}</p>
            <button type="button" className={styles.btnOutline} onClick={() => { setDone(null); setCart({}); }}>Tạo đơn mới</button></div>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
            <div className={styles.field}><label htmlFor="lm-name">Họ và tên</label><input id="lm-name" name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className={styles.err}>{err.name}</span>}</div>
            <div className={styles.field}><label htmlFor="lm-phone">Số điện thoại</label><input id="lm-phone" name="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <span className={styles.err}>{err.phone}</span>}</div>
            <div className={styles.field}><label htmlFor="lm-addr">Địa chỉ giao hàng</label><input id="lm-addr" name="addr" autoComplete="street-address" aria-invalid={!!err.addr} />{err.addr && <span className={styles.err}>{err.addr}</span>}</div>
            <button type="submit" className={styles.btn}>Đặt hàng mô phỏng</button>
            <p className={styles.fine}>Biểu mẫu chạy trên trình duyệt, không lưu hay gửi thông tin.</p>
          </form>
        )}
      </div>
    </>
  );
}
