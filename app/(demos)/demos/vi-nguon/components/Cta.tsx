"use client";

import { useState } from "react";
import s from "../brand.module.css";

export function Cta() {
  const [e, setE] = useState({ n: "", m: "" });
  const [err, setErr] = useState<{ n?: string; m?: string }>({});
  const [ok, setOk] = useState(false);
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const x: { n?: string; m?: string } = {};
    if (e.n.trim().length < 2) x.n = "Nhập họ tên của bạn.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.m)) x.m = "Email chưa hợp lệ.";
    setErr(x); setOk(Object.keys(x).length === 0);
  };
  return (
    <section id="dang-ky" className={s.cta} aria-labelledby="ct-h">
      <h2 id="ct-h" className={s.h2c}>Sẵn sàng định hình tương lai <br /><em>ngân hàng số?</em></h2>
      {ok ? (
        <p className={s.ctaOk} role="status">Cảm ơn {e.n.trim()}! Chúng tôi sẽ gửi thư xác nhận tới {e.m}. (Biểu mẫu minh hoạ, không gửi dữ liệu đi đâu.)</p>
      ) : (
        <form className={s.ctaForm} onSubmit={submit} noValidate aria-label="Đăng ký dùng thử">
          <label><span className={s.srOnly}>Họ và tên</span><input value={e.n} onChange={(v) => setE({ ...e, n: v.target.value })} placeholder="Họ và tên" autoComplete="name" aria-invalid={!!err.n} /><small role="alert">{err.n}</small></label>
          <label><span className={s.srOnly}>Email</span><input value={e.m} onChange={(v) => setE({ ...e, m: v.target.value })} placeholder="Email công việc" autoComplete="email" inputMode="email" aria-invalid={!!err.m} /><small role="alert">{err.m}</small></label>
          <button type="submit" className={s.btnWhite}>Dùng thử miễn phí hôm nay</button>
        </form>
      )}
    </section>
  );
}
