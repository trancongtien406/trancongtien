"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const KINDS = [
  { id: "sang", t: "Buổi sáng", d: "10 phút · 06:30" },
  { id: "ngu", t: "Trước giấc ngủ", d: "20 phút · 21:00" },
  { id: "nhom", t: "Nhóm sáu người", d: "45 phút · cuối tuần" },
];

export function Booking() {
  const [kind, setKind] = useState("sang");
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    if (name.length < 2) return setErr("Bạn cho chúng tôi biết tên nhé.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Email chưa đúng định dạng.");
    setErr("");
    setDone(name);
  }

  if (done) {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneOrb} aria-hidden="true" />
        <p className={styles.doneT}>Một khoảng lặng đã được giữ cho {done}.</p>
        <p>Đây là mô phỏng chạy trên trình duyệt. Không có email hay lịch thật nào được tạo.</p>
        <button type="button" className={styles.btnGhost} onClick={() => setDone(null)}>Đặt lại</button>
      </div>
    );
  }
  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <fieldset className={styles.kinds}>
        <legend>Bạn muốn khoảng lặng nào?</legend>
        {KINDS.map((k) => (
          <label key={k.id}>
            <input type="radio" name="kind" checked={kind === k.id} onChange={() => setKind(k.id)} />
            <span><b>{k.t}</b><small>{k.d}</small></span>
          </label>
        ))}
      </fieldset>
      <div className={styles.fRow}>
        <label className={styles.field}><span>Tên</span><input name="name" autoComplete="name" /></label>
        <label className={styles.field}><span>Email</span><input name="email" type="email" autoComplete="email" /></label>
      </div>
      <label className={styles.field}><span>Điều bạn muốn nhẹ đi (không bắt buộc)</span><textarea name="note" rows={3} /></label>
      {err ? <p className={styles.err} role="alert">{err}</p> : null}
      <button type="submit" className={styles.btn}>Giữ khoảng lặng</button>
    </form>
  );
}
