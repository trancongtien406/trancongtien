"use client";

import { useState } from "react";
import styles from "../brand.module.css";

export function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);
  const [err, setErr] = useState("");
  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const name = String(f.get("name") || "").trim();
        const mail = String(f.get("mail") || "").trim();
        if (!name || !/^\S+@\S+\.\S+$/.test(mail)) { setErr("Vui lòng nhập tên và email hợp lệ."); return; }
        setErr(""); setSent(name);
      }}
    >
      <label className={styles.field}>Tên của bạn<input name="name" autoComplete="name" required /></label>
      <label className={styles.field}>Email<input name="mail" type="email" autoComplete="email" required /></label>
      <label className={styles.field}>Bạn cần gì
        <select name="need" defaultValue="Nhận diện thương hiệu">
          <option>Nhận diện thương hiệu</option><option>Website &amp; trải nghiệm số</option><option>Chiến dịch nội dung</option><option>Chưa rõ, cần tư vấn</option>
        </select>
      </label>
      <label className={styles.field}>Ý tưởng ngắn<textarea name="msg" /></label>
      <div aria-live="polite">
        {err && <p className={styles.err} role="alert">{err}</p>}
        {sent && <p className={styles.ok}>Cảm ơn {sent}. Đây là biểu mẫu mô phỏng chạy trên trình duyệt: không có dữ liệu nào được gửi đi.</p>}
      </div>
      <span className={styles.magnet} data-magnet style={{ justifySelf: "start" }}>
        <span className={styles.magInner}><button type="submit" className={`${styles.btn} ${styles.btnDark}`}>Gửi ý tưởng</button></span>
      </span>
    </form>
  );
}
