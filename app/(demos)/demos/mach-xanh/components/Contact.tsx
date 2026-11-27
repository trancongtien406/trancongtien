"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";

export function Contact() {
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const uid = useId();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const phone = String(f.get("phone") || "").replace(/\s/g, "");
    if (!String(f.get("company") || "").trim()) return setMsg({ ok: false, t: "Vui lòng nhập tên cơ sở." });
    if (!/^(0|\+84)\d{8,10}$/.test(phone)) return setMsg({ ok: false, t: "Số điện thoại chưa đúng định dạng." });
    setMsg({ ok: true, t: `Đã ghi nhận lịch khảo sát ${f.get("slot")} trên trình duyệt. Đây là bản minh hoạ, chưa có dữ liệu nào được gửi đi.` });
    e.currentTarget.reset();
  }
  return (
    <form className={styles.cform} onSubmit={onSubmit} noValidate>
      <label htmlFor={`${uid}a`}>Tên cơ sở<input id={`${uid}a`} name="company" autoComplete="organization" /></label>
      <label htmlFor={`${uid}b`}>Số điện thoại<input id={`${uid}b`} name="phone" inputMode="tel" autoComplete="tel" /></label>
      <label htmlFor={`${uid}c`}>Loại mái / diện tích
        <select id={`${uid}c`} name="roof"><option>Mái tôn dưới 500 m²</option><option>Mái tôn 500 đến 2.000 m²</option><option>Mái bê tông</option><option>Chưa rõ</option></select>
      </label>
      <label htmlFor={`${uid}d`}>Khung giờ khảo sát
        <select id={`${uid}d`} name="slot"><option>sáng thứ Ba</option><option>chiều thứ Tư</option><option>sáng thứ Sáu</option></select>
      </label>
      <button type="submit" className={styles.btn}>Đặt lịch khảo sát (minh hoạ)</button>
      <p role="status" aria-live="polite" className={msg?.ok ? styles.ok : styles.err}>{msg?.t}</p>
    </form>
  );
}
