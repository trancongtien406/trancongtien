"use client";

import { useState } from "react";
import s from "../brand.module.css";

type Errs = Partial<Record<"name" | "email" | "msg" | "ok", string>>;
const RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [errs, setErrs] = useState<Errs>({});
  const [done, setDone] = useState<string | null>(null);
  const [mail, setMail] = useState<"ok" | "bad" | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") ?? "").trim();
    const er: Errs = {};
    if (name.length < 2) er.name = "Cho tôi biết tên bạn nhé.";
    if (!RE.test(String(f.get("email") ?? "").trim())) er.email = "Email chưa đúng định dạng.";
    if (String(f.get("msg") ?? "").trim().length < 10) er.msg = "Hãy kể thêm một chút (ít nhất 10 ký tự).";
    if (!f.get("ok")) er.ok = "Bạn cần đồng ý để tôi trả lời qua email.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setDone(name);
    form.reset();
  };

  return (
    <section className={`${s.block} ${s.contact}`} id="lien-he" aria-labelledby="tm-ct">
      <div className={s.secHead}><span>{"{11}"}</span><h2 id="tm-ct">Nhắn tôi</h2></div>
      <div className={s.contactGrid}>
        <div>
          <p className={s.statement}>Kể tôi nghe bạn đang làm gì, hoặc <em>muốn làm gì</em>. Tôi trả lời trong vòng ba ngày.</p>
          <form className={s.news} onSubmit={(e) => { e.preventDefault(); setMail(RE.test(String(new FormData(e.currentTarget).get("nl") ?? "").trim()) ? "ok" : "bad"); }} noValidate aria-label="Đăng ký bản tin">
            <label htmlFor="tm-nl">Bản tin “Thứ Năm”: mỗi tháng một lá thư ngắn và vài bức ảnh</label>
            <div><input id="tm-nl" name="nl" type="email" placeholder="email@cuaban.vn" autoComplete="email" /><button type="submit">Đăng ký</button></div>
            <p role="status">{mail === "ok" ? "Cảm ơn bạn, thư đầu tiên sẽ tới vào thứ Năm. (Minh hoạ)" : mail === "bad" ? "Email chưa đúng định dạng." : ""}</p>
          </form>
        </div>
        <form className={s.form} onSubmit={submit} noValidate aria-label="Biểu mẫu liên hệ">
          {done ? (
            <div className={s.success} role="status"><b>Cảm ơn {done}, tôi nhận được rồi.</b><p>Tôi sẽ trả lời qua email trong ba ngày. (Biểu mẫu minh hoạ: chưa gửi dữ liệu đi đâu.)</p><button type="button" onClick={() => setDone(null)}>Gửi thêm lời nhắn</button></div>
          ) : (
            <>
              <label>Tên<input name="name" autoComplete="name" aria-invalid={!!errs.name} /><em role="alert">{errs.name}</em></label>
              <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} /><em role="alert">{errs.email}</em></label>
              <label>Bạn cần gì?
                <select name="kind" defaultValue="web"><option value="web">Thiết kế web</option><option value="brand">Nhận diện thương hiệu</option><option value="book">Thiết kế sách</option><option value="other">Việc khác</option></select>
              </label>
              <label>Lời nhắn<textarea name="msg" rows={4} aria-invalid={!!errs.msg} /><em role="alert">{errs.msg}</em></label>
              <label className={s.check}><input type="checkbox" name="ok" />Tôi đồng ý để bạn trả lời qua email.</label>
              <em role="alert">{errs.ok}</em>
              <button type="submit" className={s.send}>Gửi lời nhắn →</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
