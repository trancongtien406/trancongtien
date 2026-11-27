"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const looks = ["Look 01 · Áo khoác dáng dài", "Look 02 · Đầm xẻ vạt", "Look 03 · Suit oversize", "Look 04 · Áo choàng", "Look 05 · Jumpsuit đỏ", "Look 06 · Chân váy xếp ly"];
const sizes = ["XS", "S", "M", "L", "XL"];

export function Fitting() {
  const [size, setSize] = useState("M");
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const date = String(f.get("date") ?? "");
    const look = String(f.get("look") ?? "");
    const n: Record<string, string> = {};
    if (name.length < 2) n.name = "Nhập họ tên.";
    if (!/^(0|\+84)\d{9}$/.test(phone)) n.phone = "Số điện thoại chưa đúng.";
    if (!date) n.date = "Chọn ngày.";
    setErr(n);
    if (!Object.keys(n).length) setDone(`${name}, lịch thử "${look}" cỡ ${size} ngày ${new Date(date).toLocaleDateString("vi-VN")} đã được ghi nhận (mô phỏng, không gửi dữ liệu).`);
  }

  if (done) return (<div className={styles.done} role="status"><h3>Hẹn thử đồ đã ghi nhận</h3><p>{done}</p><button type="button" className={styles.btnLine} onClick={() => setDone(null)}>Đặt lịch khác</button></div>);
  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.field}><label htmlFor="pd-name">Họ và tên</label><input id="pd-name" name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className={styles.err}>{err.name}</span>}</div>
      <div className={styles.field}><label htmlFor="pd-phone">Số điện thoại</label><input id="pd-phone" name="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <span className={styles.err}>{err.phone}</span>}</div>
      <div className={styles.field}><label htmlFor="pd-look">Thiết kế muốn thử</label><select id="pd-look" name="look">{looks.map((l) => <option key={l}>{l}</option>)}</select></div>
      <fieldset className={styles.sizes}><legend>Cỡ</legend>
        {sizes.map((s) => (<label key={s} className={size === s ? styles.sizeOn : ""}><input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} /><span>{s}</span></label>))}
      </fieldset>
      <div className={styles.field}><label htmlFor="pd-date">Ngày hẹn</label><input id="pd-date" name="date" type="date" aria-invalid={!!err.date} />{err.date && <span className={styles.err}>{err.date}</span>}</div>
      <button type="submit" className={styles.btn}>Đặt lịch thử đồ</button>
      <p className={styles.fine}>Biểu mẫu mô phỏng, chạy trên trình duyệt.</p>
    </form>
  );
}
