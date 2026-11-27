"use client";

import { useMemo, useState } from "react";
import styles from "../brand.module.css";

const TOURS = [
  { id: "thu", name: "Lặn thử Discover", price: 1200000, note: "1 buổi · không cần chứng chỉ" },
  { id: "ow", name: "Khoá Open Water", price: 7800000, note: "3 ngày · cấp chứng chỉ mẫu" },
  { id: "dem", name: "Lặn đêm rạn san hô", price: 1900000, note: "Cần đã từng lặn" },
] as const;
const fmt = (n: number) => `${n.toLocaleString("vi-VN")} ₫`;

export function Booking() {
  const [tour, setTour] = useState<(typeof TOURS)[number]["id"]>("thu");
  const [n, setN] = useState(2);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const t = TOURS.find((x) => x.id === tour)!;
  const total = useMemo(() => t.price * n * (n >= 4 ? 0.9 : 1), [t, n]);
  return (
    <form className={styles.form} noValidate onSubmit={(e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const name = String(f.get("name") || "").trim();
      const tel = String(f.get("tel") || "").replace(/\s/g, "");
      if (!name || !/^(0|\+84)\d{8,10}$/.test(tel)) { setErr("Vui lòng nhập tên và số điện thoại hợp lệ."); setMsg(""); return; }
      setErr(""); setMsg(`Đã giữ chỗ tạm cho ${name}: ${t.name}, ${n} khách. Đây là mô phỏng trên trình duyệt, chưa có đặt chỗ thật nào.`);
    }}>
      <fieldset className={styles.tours}><legend>Chọn chuyến</legend>
        {TOURS.map((x) => (
          <label key={x.id} className={tour === x.id ? styles.tourOn : ""}>
            <input type="radio" name="tour" value={x.id} checked={tour === x.id} onChange={() => setTour(x.id)} />
            <strong>{x.name}</strong><span>{x.note}</span><em>{fmt(x.price)} / khách</em>
          </label>
        ))}
      </fieldset>
      <div className={styles.row2}>
        <div className={styles.stepper} role="group" aria-label="Số khách">
          <span>Số khách</span>
          <button type="button" aria-label="Giảm số khách" onClick={() => setN((v) => Math.max(1, v - 1))}>−</button>
          <output aria-live="polite">{n}</output>
          <button type="button" aria-label="Tăng số khách" onClick={() => setN((v) => Math.min(12, v + 1))}>+</button>
        </div>
        <label className={styles.fld}>Ngày lặn<input type="date" name="date" /></label>
      </div>
      <label className={styles.fld}>Họ tên<input name="name" autoComplete="name" /></label>
      <label className={styles.fld}>Điện thoại<input name="tel" type="tel" inputMode="tel" autoComplete="tel" /></label>
      <p className={styles.total}>Tạm tính (minh hoạ): <b>{fmt(total)}</b>{n >= 4 && <small> · giảm 10% nhóm từ 4 khách</small>}</p>
      <div aria-live="polite">{err && <p className={styles.err} role="alert">{err}</p>}{msg && <p className={styles.ok}>{msg}</p>}</div>
      <button type="submit" className={styles.btn}>Giữ chỗ chuyến lặn</button>
    </form>
  );
}
