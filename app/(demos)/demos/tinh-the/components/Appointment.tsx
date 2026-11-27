"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const PIECES = ["Nhẫn", "Mặt dây", "Bông tai", "Vòng tay", "Chế tác theo yêu cầu"];

export function Appointment() {
  const [done, setDone] = useState<{ name: string; piece: string } | null>(null);
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/\s/g, "");
    const date = String(f.get("date") || "");
    if (name.length < 2) return setErr("Vui lòng nhập họ tên.");
    if (!/^(0|\+84)\d{8,10}$/.test(phone)) return setErr("Số điện thoại chưa đúng định dạng.");
    if (!date) return setErr("Vui lòng chọn ngày xem.");
    setErr("");
    setDone({ name, piece: String(f.get("piece") || PIECES[0]) });
  }

  if (done) {
    return (
      <div className={styles.done} role="status">
        <p className={styles.eyebrow}>Đã giữ lịch (mô phỏng)</p>
        <p className={styles.doneT}>Hẹn gặp {done.name}.</p>
        <p>Phòng xem riêng cho “{done.piece}” đã được giữ trong bản mô phỏng này. Không có lịch hẹn thật nào được tạo.</p>
        <button type="button" className={styles.btnGhost} onClick={() => setDone(null)}>Đặt lại</button>
      </div>
    );
  }
  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <label className={styles.field}><span>Bạn muốn xem</span>
        <select name="piece">{PIECES.map((p) => <option key={p}>{p}</option>)}</select>
      </label>
      <div className={styles.fRow}>
        <label className={styles.field}><span>Họ tên</span><input name="name" autoComplete="name" /></label>
        <label className={styles.field}><span>Số điện thoại</span><input name="phone" inputMode="tel" autoComplete="tel" /></label>
      </div>
      <label className={styles.field}><span>Ngày xem</span><input name="date" type="date" /></label>
      {err ? <p className={styles.err} role="alert">{err}</p> : null}
      <button type="submit" className={styles.btn}>Giữ phòng xem</button>
    </form>
  );
}
