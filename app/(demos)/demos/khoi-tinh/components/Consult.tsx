"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const types = [
  { n: "Nhà phố", lo: 7, hi: 10 },
  { n: "Biệt thự", lo: 9, hi: 14 },
  { n: "Căn hộ (nội thất)", lo: 4, hi: 7 },
  { n: "Không gian thương mại", lo: 6, hi: 9 },
];

export function Consult() {
  const [type, setType] = useState(types[0]);
  const [area, setArea] = useState(120);
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const fmt = (n: number) => n.toLocaleString("vi-VN", { maximumFractionDigits: 0 });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const n: Record<string, string> = {};
    if (name.length < 2) n.name = "Vui lòng nhập họ tên.";
    if (!/^(0|\+84)\d{9}$/.test(phone)) n.phone = "Số điện thoại chưa đúng.";
    setErr(n);
    if (!Object.keys(n).length) setDone(`Cảm ơn ${name}. Yêu cầu ${type.n.toLowerCase()} ${area} m² đã được ghi nhận (mô phỏng, không gửi dữ liệu).`);
  }

  return (
    <div className={styles.consult}>
      <div className={styles.estimate}>
        <p className={styles.eyebrow}>Ước tính sơ bộ (minh hoạ)</p>
        <p className={styles.range} aria-live="polite">{fmt(area * type.lo)} – {fmt(area * type.hi)} <small>triệu đồng</small></p>
        <p className={styles.fine}>Công thức giả định: diện tích × đơn giá mẫu. Không phải báo giá thật.</p>
        <fieldset className={styles.types}>
          <legend>Loại công trình</legend>
          {types.map((t) => (
            <label key={t.n} className={type.n === t.n ? styles.on : ""}><input type="radio" name="type" checked={type.n === t.n} onChange={() => setType(t)} /><span>{t.n}</span></label>
          ))}
        </fieldset>
        <div className={styles.slider}>
          <label htmlFor="kt-area">Diện tích sàn: <b>{area} m²</b></label>
          <input id="kt-area" type="range" min={40} max={600} step={5} value={area} onChange={(e) => setArea(Number(e.target.value))} />
        </div>
      </div>
      {done ? (
        <div className={styles.done} role="status"><h3>Đã ghi nhận</h3><p>{done}</p><button type="button" className={styles.btnLine} onClick={() => setDone(null)}>Gửi yêu cầu khác</button></div>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.field}><label htmlFor="kt-name">Họ và tên</label><input id="kt-name" name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className={styles.err}>{err.name}</span>}</div>
          <div className={styles.field}><label htmlFor="kt-phone">Số điện thoại</label><input id="kt-phone" name="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <span className={styles.err}>{err.phone}</span>}</div>
          <div className={styles.field}><label htmlFor="kt-note">Mô tả ngắn (không bắt buộc)</label><textarea id="kt-note" name="note" rows={3} /></div>
          <button type="submit" className={styles.btn}>Gửi yêu cầu tư vấn</button>
          <p className={styles.fine}>Biểu mẫu mô phỏng, chạy trên trình duyệt.</p>
        </form>
      )}
    </div>
  );
}
