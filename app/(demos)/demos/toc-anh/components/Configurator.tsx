"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { CAR_BODY, CAR_GLASS, WHEELS } from "./car";

const colors = [
  { n: "Cam lửa", c: "#ff4d00" },
  { n: "Bạc thép", c: "#c0c0c0" },
  { n: "Đen than", c: "#2a2a2c" },
  { n: "Trắng ngọc", c: "#ece9e2" },
];
const models = ["Vệt R (cầu sau)", "Vệt S (hai cầu)", "Vệt GT (đường trường)"];

export function Configurator() {
  const [color, setColor] = useState(colors[0]);
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const model = String(f.get("model") ?? "");
    const date = String(f.get("date") ?? "");
    const n: Record<string, string> = {};
    if (name.length < 2) n.name = "Nhập họ tên.";
    if (!/^(0|\+84)\d{9}$/.test(phone)) n.phone = "Số điện thoại chưa đúng.";
    if (!date) n.date = "Chọn ngày lái thử.";
    setErr(n);
    if (!Object.keys(n).length) setDone(`${name}, lịch lái thử ${model}, màu ${color.n}, ngày ${new Date(date).toLocaleDateString("vi-VN")} đã được ghi nhận (mô phỏng, không gửi dữ liệu).`);
  }

  return (
    <div className={styles.config}>
      <div className={styles.preview}>
        <svg viewBox="-4 -52 108 60" role="img" aria-label={`Xe thể thao màu ${color.n}`}>
          <ellipse cx="50" cy="1.5" rx="52" ry="3" fill="rgba(0,0,0,.6)" />
          <path d={CAR_BODY} fill={color.c} stroke="#c0c0c0" strokeWidth=".4" />
          <path d={CAR_BODY} fill="url(#ta-shade)" />
          <path d={CAR_GLASS} fill="#0b0f14" />
          <path d="M54 -41V-31.5" stroke="#0a0a0a" strokeWidth="1.2" />
          {WHEELS.map((x) => (<g key={x}><circle cx={x} cy="-11" r="12.6" fill="#030303" /><circle cx={x} cy="-11" r="11" fill="#050505" /><circle cx={x} cy="-11" r="7.6" fill="#26262a" stroke="#c0c0c0" strokeWidth=".7" /><circle cx={x} cy="-11" r="1.5" fill="#ff4d00" /></g>))}
          <defs><linearGradient id="ta-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".22" /><stop offset=".5" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".6" /></linearGradient></defs>
        </svg>
        <fieldset className={styles.swatches}>
          <legend>Màu sơn: <b>{color.n}</b></legend>
          {colors.map((c) => (
            <label key={c.n}><input type="radio" name="color" checked={color.n === c.n} onChange={() => setColor(c)} /><span style={{ background: c.c }} /><em className={styles.srOnly}>{c.n}</em></label>
          ))}
        </fieldset>
      </div>
      {done ? (
        <div className={styles.done} role="status"><h3>Đã ghi nhận lịch lái thử</h3><p>{done}</p><button type="button" className={styles.btnGhost} onClick={() => setDone(null)}>Đặt lịch khác</button></div>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.field}><label htmlFor="ta-name">Họ và tên</label><input id="ta-name" name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className={styles.err}>{err.name}</span>}</div>
          <div className={styles.field}><label htmlFor="ta-phone">Số điện thoại</label><input id="ta-phone" name="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <span className={styles.err}>{err.phone}</span>}</div>
          <div className={styles.field}><label htmlFor="ta-model">Mẫu xe</label><select id="ta-model" name="model">{models.map((m) => <option key={m}>{m}</option>)}</select></div>
          <div className={styles.field}><label htmlFor="ta-date">Ngày lái thử</label><input id="ta-date" name="date" type="date" aria-invalid={!!err.date} />{err.date && <span className={styles.err}>{err.date}</span>}</div>
          <button type="submit" className={styles.btn}>Đặt lịch lái thử</button>
          <p className={styles.fine}>Biểu mẫu mô phỏng, chạy trên trình duyệt.</p>
        </form>
      )}
    </div>
  );
}
