"use client";

import { useState } from "react";
import styles from "../brand.module.css";

export function Trial({ models }: { models: string[] }) {
  const [state, setState] = useState<"idle" | "ok">("idle");
  const [err, setErr] = useState("");
  const [who, setWho] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    if (name.length < 2) return setErr("Vui lòng nhập tên của bạn.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Email chưa đúng định dạng.");
    setErr("");
    setWho(name);
    setState("ok");
  }

  if (state === "ok") {
    return (
      <div className={styles.trialDone} role="status">
        <p className={styles.trialBig}>Vào nhịp, {who}.</p>
        <p>Đăng ký chạy thử đã được mô phỏng thành công. Không có email nào được gửi đi.</p>
        <button type="button" className={styles.btnLine} onClick={() => setState("idle")}>Đăng ký lại</button>
      </div>
    );
  }
  return (
    <form className={styles.trialForm} onSubmit={submit} noValidate>
      <label className={styles.f}><span>Tên</span><input name="name" autoComplete="name" /></label>
      <label className={styles.f}><span>Email</span><input name="email" type="email" autoComplete="email" /></label>
      <label className={styles.f}><span>Dòng muốn thử</span>
        <select name="model">{models.map((m) => <option key={m}>{m}</option>)}</select>
      </label>
      <label className={styles.f}><span>Cỡ giày (EU)</span>
        <select name="size" defaultValue="42">{[39, 40, 41, 42, 43, 44, 45].map((s) => <option key={s}>{s}</option>)}</select>
      </label>
      {err ? <p className={styles.err} role="alert">{err}</p> : null}
      <button type="submit" className={styles.btn}>Đăng ký chạy thử</button>
    </form>
  );
}
