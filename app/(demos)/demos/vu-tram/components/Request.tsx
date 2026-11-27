"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";

export function Request() {
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const uid = useId();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!String(f.get("org") || "").trim()) return setMsg({ ok: false, t: "Vui lòng nhập tên tổ chức." });
    if (!/.+@.+\..+/.test(String(f.get("email") || ""))) return setMsg({ ok: false, t: "Email chưa hợp lệ." });
    setMsg({ ok: true, t: `Đã ghi nhận yêu cầu nhiệm vụ "${f.get("mission")}" ngay trên trình duyệt. Đây là bản minh hoạ, chưa có dữ liệu nào được gửi đi.` });
    e.currentTarget.reset();
  }
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor={`${uid}o`}>Tổ chức<input id={`${uid}o`} name="org" autoComplete="organization" /></label>
      <label htmlFor={`${uid}e`}>Email<input id={`${uid}e`} name="email" type="email" autoComplete="email" /></label>
      <label htmlFor={`${uid}m`}>Nhiệm vụ
        <select id={`${uid}m`} name="mission"><option>Giám sát nông nghiệp</option><option>Cảnh báo thiên tai</option><option>Quan sát hạ tầng và đô thị</option></select>
      </label>
      <label htmlFor={`${uid}c`}>Tần suất cập nhật
        <select id={`${uid}c`} name="cad"><option>Hằng ngày</option><option>Mỗi 3 ngày</option><option>Hằng tuần</option></select>
      </label>
      <button type="submit" className={styles.btn}>Gửi yêu cầu nhiệm vụ</button>
      <p role="status" aria-live="polite" className={msg?.ok ? styles.ok : styles.err}>{msg?.t}</p>
    </form>
  );
}
