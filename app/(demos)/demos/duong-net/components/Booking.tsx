"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const SLOTS = ["07:00", "09:30", "14:00", "16:30"];

export function Booking() {
  const [slot, setSlot] = useState("09:30");
  const [done, setDone] = useState("");
  const [err, setErr] = useState("");
  return (
    <form className={styles.book} noValidate onSubmit={(e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const name = String(f.get("name") || "").trim();
      const tel = String(f.get("tel") || "").replace(/\s/g, "");
      if (!name || !/^(0|\+84)\d{8,10}$/.test(tel)) { setErr("Nhập tên và số điện thoại hợp lệ (ví dụ 0905 000 000)."); setDone(""); return; }
      setErr(""); setDone(`${name} đã giữ chỗ lúc ${slot}, ngày ${String(f.get("date") || "chưa chọn")}, gói ${String(f.get("kind"))}.`);
    }}>
      <label className={styles.fld}>Thể loại<select name="kind" defaultValue="Chân dung"><option>Chân dung</option><option>Cưới &amp; gia đình</option><option>Thương hiệu &amp; sản phẩm</option><option>Kiến trúc &amp; nội thất</option></select></label>
      <label className={styles.fld}>Ngày chụp<input type="date" name="date" /></label>
      <fieldset className={styles.slots}><legend>Khung giờ</legend>
        {SLOTS.map((s) => (<label key={s} className={slot === s ? styles.slotOn : ""}><input type="radio" name="slot" value={s} checked={slot === s} onChange={() => setSlot(s)} />{s}</label>))}
      </fieldset>
      <label className={styles.fld}>Họ tên<input name="name" autoComplete="name" /></label>
      <label className={styles.fld}>Điện thoại<input name="tel" type="tel" autoComplete="tel" inputMode="tel" /></label>
      <div aria-live="polite">
        {err && <p className={styles.err} role="alert">{err}</p>}
        {done && <p className={styles.okMsg}>{done} Đây là mô phỏng chạy trên trình duyệt, chưa có lịch thật nào được tạo.</p>}
      </div>
      <button type="submit" className={styles.cta}>Giữ chỗ buổi chụp</button>
    </form>
  );
}
