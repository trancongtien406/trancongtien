"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

export function Reserve() {
  const [slot, setSlot] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [done, setDone] = useState<null | { name: string; date: string }>(null);
  const [err, setErr] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/\s/g, "");
    const date = String(f.get("date") || "");
    if (name.length < 2) return setErr("Vui lòng nhập họ tên.");
    if (!/^(0|\+84)\d{8,10}$/.test(phone)) return setErr("Số điện thoại chưa đúng định dạng.");
    if (!date) return setErr("Vui lòng chọn ngày.");
    setErr("");
    setDone({ name, date });
  }

  if (done) {
    return (
      <div className={styles.formDone} role="status">
        <p className={styles.eyebrow}>Đã giữ chỗ (mô phỏng)</p>
        <p className={styles.doneTitle}>Hẹn gặp {done.name} lúc {slot}</p>
        <p>
          Bàn {guests} người, ngày {new Date(done.date).toLocaleDateString("vi-VN")}. Đây là bản mô phỏng chạy trên trình duyệt, không có đơn thật nào được gửi đi.
        </p>
        <button type="button" className={styles.btnGhost} onClick={() => setDone(null)}>Đặt lại</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.fRow}>
        <label className={styles.field}>
          <span>Họ tên</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span>Số điện thoại</span>
          <input name="phone" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" required />
        </label>
      </div>
      <div className={styles.fRow}>
        <label className={styles.field}>
          <span>Ngày</span>
          <input name="date" type="date" required />
        </label>
        <div className={styles.field}>
          <span id="vt-guests">Số khách</span>
          <div className={styles.stepper} role="group" aria-labelledby="vt-guests">
            <button type="button" aria-label="Giảm một khách" onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</button>
            <output aria-live="polite">{guests}</output>
            <button type="button" aria-label="Tăng một khách" onClick={() => setGuests((g) => Math.min(10, g + 1))}>+</button>
          </div>
        </div>
      </div>
      <fieldset className={styles.slots}>
        <legend>Giờ vào bàn</legend>
        {SLOTS.map((s) => (
          <label key={s} className={styles.slot}>
            <input type="radio" name="slot" value={s} checked={slot === s} onChange={() => setSlot(s)} />
            <span>{s}</span>
          </label>
        ))}
      </fieldset>
      <label className={styles.field}>
        <span>Ghi chú (dị ứng, dịp đặc biệt)</span>
        <textarea name="note" rows={3} />
      </label>
      {err ? <p className={styles.err} role="alert">{err}</p> : null}
      <button type="submit" className={styles.btn}>Giữ chỗ</button>
    </form>
  );
}
