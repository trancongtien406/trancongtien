"use client";

import { useState } from "react";
import s from "../brand.module.css";

type Errs = Partial<Record<"name" | "email" | "msg" | "ok", string>>;

export function Contact() {
  const [errs, setErrs] = useState<Errs>({});
  const [done, setDone] = useState<string | null>(null);
  const [mail, setMail] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const msg = String(f.get("msg") ?? "").trim();
    const er: Errs = {};
    if (name.length < 2) er.name = "Vui lòng cho biết tên của bạn.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) er.email = "Email chưa đúng định dạng.";
    if (msg.length < 10) er.msg = "Hãy mô tả ngắn gọn dự án (tối thiểu 10 ký tự).";
    if (!f.get("ok")) er.ok = "Bạn cần đồng ý để chúng tôi liên hệ lại.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setDone(name);
    e.currentTarget.reset();
  };

  const news = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = String(new FormData(e.currentTarget).get("nl") ?? "").trim();
    setMail(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "ok" : "bad");
  };

  return (
    <section className={s.sec} id="lien-he" aria-labelledby="cc-contact">
      <div className={`${s.wrap} ${s.contactGrid}`}>
        <div>
          <p className={s.pillTag}><i aria-hidden="true" />Liên hệ</p>
          <h2 id="cc-contact" className={s.h2}>Kể cho chúng tôi nghe <span>ý tưởng của bạn.</span></h2>
          <p className={s.lead}>Mô tả dự án, chúng tôi trả lời trong một ngày làm việc kèm gợi ý hiệu ứng phù hợp và báo giá sơ bộ.</p>
          <form className={s.news} onSubmit={news} noValidate aria-label="Đăng ký bản tin">
            <label htmlFor="cc-nl">Nhận bản tin mỗi tháng</label>
            <div><input id="cc-nl" name="nl" type="email" placeholder="email@cuaban.vn" autoComplete="email" aria-describedby="cc-nl-s" /><button type="submit">Đăng ký</button></div>
            <p id="cc-nl-s" role="status">{mail === "ok" ? "Cảm ơn bạn, hẹn gặp trong bản tin tới. (Minh hoạ)" : mail === "bad" ? "Email chưa đúng định dạng." : ""}</p>
          </form>
        </div>
        <form className={s.form} onSubmit={submit} noValidate aria-label="Biểu mẫu liên hệ">
          {done ? (
            <div className={s.success} role="status"><b>Đã nhận được rồi, {done}!</b><p>Chúng tôi sẽ phản hồi qua email trong một ngày làm việc. (Biểu mẫu minh hoạ: chưa gửi dữ liệu đi đâu.)</p><button type="button" className={s.btnGhost} onClick={() => setDone(null)}>Gửi thêm một yêu cầu</button></div>
          ) : (
            <>
              <label>Họ và tên<input name="name" autoComplete="name" aria-invalid={!!errs.name} aria-describedby="e-name" /><em id="e-name" role="alert">{errs.name}</em></label>
              <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} aria-describedby="e-email" /><em id="e-email" role="alert">{errs.email}</em></label>
              <label>Loại dự án
                <select name="kind" defaultValue="landing"><option value="landing">Trang giới thiệu</option><option value="shop">Trang sản phẩm 3D</option><option value="campaign">Trang chiến dịch</option><option value="app">Tự dùng ứng dụng</option></select>
              </label>
              <label>Mô tả dự án<textarea name="msg" rows={4} aria-invalid={!!errs.msg} aria-describedby="e-msg" /><em id="e-msg" role="alert">{errs.msg}</em></label>
              <label className={s.check}><input type="checkbox" name="ok" />Tôi đồng ý để Cất Cánh Studio liên hệ lại.</label>
              <em role="alert" className={s.errLine}>{errs.ok}</em>
              <button type="submit" className={s.navBtn}>Gửi yêu cầu</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
