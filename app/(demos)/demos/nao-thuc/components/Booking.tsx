"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const topics = ["Đánh giá trí nhớ & tập trung", "Đo EEG / qEEG", "Neurofeedback", "Giấc ngủ & căng thẳng", "Chưa rõ, cần tư vấn"];

export function Booking() {
  const [done, setDone] = useState<null | { name: string; topic: string; date: string }>(null);
  const [err, setErr] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const topic = String(f.get("topic") ?? "");
    const date = String(f.get("date") ?? "");
    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Vui lòng nhập họ tên.";
    if (!/^(0|\+84)\d{9}$/.test(phone)) next.phone = "Số điện thoại chưa đúng (ví dụ 0901234567).";
    if (!date) next.date = "Chọn ngày muốn đến.";
    setErr(next);
    if (Object.keys(next).length === 0) setDone({ name, topic, date });
  }

  if (done) {
    return (
      <div className={styles.formDone} role="status">
        <p className={styles.eyebrow}>Mô phỏng thành công</p>
        <h3>Đã ghi nhận lịch cho {done.name}.</h3>
        <p>Chủ đề: {done.topic}. Ngày mong muốn: {new Date(done.date).toLocaleDateString("vi-VN")}. Đây là biểu mẫu minh hoạ, không có dữ liệu nào được gửi đi.</p>
        <button type="button" className={styles.btnGhost} onClick={() => setDone(null)}>Đặt lịch khác</button>
      </div>
    );
  }
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="nao-name">Họ và tên</label>
        <input id="nao-name" name="name" autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "nao-name-e" : undefined} />
        {err.name && <span id="nao-name-e" className={styles.err}>{err.name}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="nao-phone">Số điện thoại</label>
        <input id="nao-phone" name="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} aria-describedby={err.phone ? "nao-phone-e" : undefined} />
        {err.phone && <span id="nao-phone-e" className={styles.err}>{err.phone}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="nao-topic">Bạn quan tâm đến</label>
        <select id="nao-topic" name="topic" defaultValue={topics[0]}>
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="nao-date">Ngày mong muốn</label>
        <input id="nao-date" name="date" type="date" aria-invalid={!!err.date} aria-describedby={err.date ? "nao-date-e" : undefined} />
        {err.date && <span id="nao-date-e" className={styles.err}>{err.date}</span>}
      </div>
      <button type="submit" className={styles.btn}>Đặt lịch mô phỏng</button>
      <p className={styles.fine}>Biểu mẫu chạy hoàn toàn trên trình duyệt, không lưu hay gửi thông tin.</p>
    </form>
  );
}
