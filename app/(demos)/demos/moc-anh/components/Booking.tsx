"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";

export function Booking() {
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const uid = useId();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!String(f.get("name") || "").trim()) return setMsg({ ok: false, t: "Vui lòng nhập tên của bạn." });
    if (!/.+@.+\..+/.test(String(f.get("email") || ""))) return setMsg({ ok: false, t: "Email chưa hợp lệ." });
    setMsg({ ok: true, t: `Đã ghi nhận yêu cầu "${f.get("type")}" ngay trên trình duyệt. Đây là bản minh hoạ, chưa có dữ liệu nào được gửi đi.` });
    e.currentTarget.reset();
  }
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor={`${uid}n`}>Tên<input id={`${uid}n`} name="name" autoComplete="name" /></label>
      <label htmlFor={`${uid}e`}>Email<input id={`${uid}e`} name="email" type="email" autoComplete="email" /></label>
      <label htmlFor={`${uid}t`}>Loại dự án
        <select id={`${uid}t`} name="type"><option>Phim quảng cáo</option><option>Phim ngắn</option><option>Video âm nhạc</option><option>Phim doanh nghiệp</option></select>
      </label>
      <label htmlFor={`${uid}b`}>Ngân sách dự kiến
        <select id={`${uid}b`} name="budget"><option>Dưới 100 triệu</option><option>100 đến 300 triệu</option><option>Trên 300 triệu</option><option>Chưa chốt</option></select>
      </label>
      <button type="submit" className={styles.btn}>Đặt lịch trao đổi</button>
      <p role="status" aria-live="polite" className={msg?.ok ? styles.ok : styles.err}>{msg?.t}</p>
    </form>
  );
}
