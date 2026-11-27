"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";

const SCENTS = [
  { id: "no7", n: "No.7 Đêm nhài", d: "Hoa nhài, trà đen, tuyết tùng" },
  { id: "no3", n: "No.3 Mưa cam", d: "Cam đắng, tiêu hồng, xạ hương" },
  { id: "no9", n: "No.9 Tro trầm", d: "Trầm, khói nhẹ, da thuộc" },
  { id: "no5", n: "No.5 Giấy cũ", d: "Hạnh nhân, vani, mực in" },
  { id: "no1", n: "No.1 Sương vườn", d: "Lá xanh, hồng trắng, rêu" },
  { id: "no8", n: "No.8 Hổ phách", d: "Hổ phách, nhựa thơm, gỗ ấm" },
];
const MAX = 3;

export function Sampler() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const uid = useId();

  const toggle = (id: string) => {
    setSent(false);
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX ? p : [...p, id]));
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (picked.length < MAX) return setErr(`Hãy chọn đủ ${MAX} hương để ghép bộ thử mẫu.`);
    if (!String(f.get("name") || "").trim() || !/.+@.+\..+/.test(String(f.get("email") || ""))) return setErr("Vui lòng nhập tên và email hợp lệ.");
    setErr("");
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <fieldset className={styles.scents}>
        <legend>Chọn {MAX} hương cho bộ thử mẫu ({picked.length}/{MAX})</legend>
        <div className={styles.scentGrid}>
          {SCENTS.map((s) => {
            const on = picked.includes(s.id);
            return (
              <button type="button" key={s.id} aria-pressed={on} disabled={!on && picked.length >= MAX} onClick={() => toggle(s.id)} className={styles.scent}>
                <span className={styles.scentName}>{s.n}</span>
                <span className={styles.scentDesc}>{s.d}</span>
                <span className={styles.scentMark} aria-hidden="true">{on ? "✓" : "+"}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className={styles.fields}>
        <label htmlFor={`${uid}n`}>Họ và tên<input id={`${uid}n`} name="name" autoComplete="name" /></label>
        <label htmlFor={`${uid}e`}>Email<input id={`${uid}e`} name="email" type="email" autoComplete="email" /></label>
      </div>
      <button type="submit" className={styles.btn}>Đặt bộ thử mẫu (minh hoạ)</button>
      <p role="status" className={err ? styles.err : styles.ok} aria-live="polite">
        {err || (sent ? "Đã ghi nhận trên trình duyệt của bạn. Đây là trang minh hoạ, chưa có đơn nào được gửi đi." : "")}
      </p>
    </form>
  );
}
