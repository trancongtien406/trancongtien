"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import type { Book } from "./Catalog";

export function PreOrder({ books }: { books: Book[] }) {
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const total = books[idx].price * qty;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/\s/g, "");
    if (name.length < 2) return setErr("Vui lòng nhập họ tên.");
    if (!/^(0|\+84)\d{8,10}$/.test(phone)) return setErr("Số điện thoại chưa đúng định dạng.");
    setErr("");
    setDone(name);
  }

  if (done) {
    return (
      <div className={styles.done} role="status">
        <p className={styles.mono}>Đã ghi nhận (mô phỏng)</p>
        <p className={styles.doneT}>Cảm ơn {done}. {qty} cuốn “{books[idx].title}” đã được giữ.</p>
        <p>Tạm tính {total.toLocaleString("vi-VN")}đ. Không có đơn hàng thật nào được tạo.</p>
        <button type="button" className={styles.btnLine} onClick={() => setDone(null)}>Đặt lại</button>
      </div>
    );
  }
  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <label className={styles.field}><span>Cuốn sách</span>
        <select value={idx} onChange={(e) => setIdx(Number(e.target.value))}>{books.map((b, i) => <option key={b.title} value={i}>{b.title}</option>)}</select>
      </label>
      <div className={styles.fRow}>
        <div className={styles.field}><span id="ck-qty">Số lượng</span>
          <div className={styles.stepper} role="group" aria-labelledby="ck-qty">
            <button type="button" aria-label="Giảm một cuốn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <output aria-live="polite">{qty}</output>
            <button type="button" aria-label="Tăng một cuốn" onClick={() => setQty((q) => Math.min(9, q + 1))}>+</button>
          </div>
        </div>
        <p className={styles.sum}><span>Tạm tính</span><b>{total.toLocaleString("vi-VN")}đ</b></p>
      </div>
      <div className={styles.fRow}>
        <label className={styles.field}><span>Họ tên</span><input name="name" autoComplete="name" /></label>
        <label className={styles.field}><span>Số điện thoại</span><input name="phone" inputMode="tel" autoComplete="tel" /></label>
      </div>
      {err ? <p className={styles.err} role="alert">{err}</p> : null}
      <button type="submit" className={styles.btn}>Đặt trước</button>
    </form>
  );
}
