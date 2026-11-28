"use client";

import { useState } from "react";
import s from "../brand.module.css";

type Errs = Partial<Record<"name" | "email" | "phone", string>>;

export function Book() {
  const [errs, setErrs] = useState<Errs>({});
  const [done, setDone] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    const er: Errs = {};
    if (name.length < 2) er.name = "Vui lòng nhập họ tên.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) er.email = "Email chưa hợp lệ.";
    if (phone && !/^(\+?84|0)[0-9\s.-]{8,12}$/.test(phone)) er.phone = "Số điện thoại chưa hợp lệ.";
    setErrs(er);
    if (Object.keys(er).length) {
      (e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(er)[0]}"]`))?.focus();
      return;
    }
    setDone(name);
    e.currentTarget.reset();
  };

  return (
    <section id="dat-lich" className={`${s.sec} ${s.book}`} aria-labelledby="dl-h">
      <p className={s.label}><b>[09]</b> — Xem riêng</p>
      <h2 id="dl-h" className={s.disp}>Đặt một buổi <em>xem riêng.</em></h2>
      <div className={s.bookGrid}>
        <div>
          <p className={s.bookIntro}>Chúng tôi đón bạn ở căn hộ mẫu, dẫn đi qua mặt bằng, vật liệu hoàn thiện và tình trạng căn còn lại. Phản hồi trong một ngày làm việc.</p>
          <dl className={s.info}>
            <div><dt>Căn mẫu</dt><dd>12 Quốc Hương, Thảo Điền (minh hoạ)</dd></div>
            <div><dt>Điện thoại</dt><dd>0900 000 142 (minh hoạ)</dd></div>
            <div><dt>Email</dt><dd>datlich@nhaphoanhsang.example</dd></div>
            <div><dt>Giờ mở cửa</dt><dd>T2 - T7 10:00 - 18:00, CN theo hẹn</dd></div>
          </dl>
        </div>
        <form className={s.form} onSubmit={submit} noValidate aria-label="Đặt lịch xem nhà">
          {done ? (
            <div className={s.done} role="status">
              <h3>Cảm ơn {done}.</h3>
              <p>Chúng tôi đã ghi nhận yêu cầu và sẽ liên hệ trong một ngày làm việc để chốt giờ xem. Đây là trang minh hoạ, dữ liệu chỉ nằm trên trình duyệt của bạn và không được gửi đi đâu.</p>
              <p style={{ marginTop: 16 }}><button type="button" className={s.pillG} onClick={() => setDone(null)}>Gửi yêu cầu khác</button></p>
            </div>
          ) : (<>
            <div className={s.fld}><label htmlFor="b-name">Họ và tên</label><input id="b-name" name="name" autoComplete="name" aria-invalid={!!errs.name} aria-describedby="e-name" /><p id="e-name" className={s.err}>{errs.name}</p></div>
            <div className={s.fld}><label htmlFor="b-email">Email</label><input id="b-email" name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} aria-describedby="e-email" /><p id="e-email" className={s.err}>{errs.email}</p></div>
            <div className={s.fld}><label htmlFor="b-phone">Điện thoại (không bắt buộc)</label><input id="b-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errs.phone} aria-describedby="e-phone" /><p id="e-phone" className={s.err}>{errs.phone}</p></div>
            <div className={s.fld}><label htmlFor="b-int">Tôi quan tâm tới</label>
              <select id="b-int" name="interest" defaultValue="Căn hộ Hiên Nắng"><option>Căn hộ Hiên Nắng</option><option>Căn hộ Góc</option><option>Penthouse</option><option>Chưa quyết định</option></select></div>
            <div className={`${s.fld} ${s.wide}`}><label htmlFor="b-msg">Lời nhắn (không bắt buộc)</label><textarea id="b-msg" name="message" /></div>
            <p className={s.note}>Chúng tôi chỉ dùng thông tin để trả lời bạn, theo chính sách bảo mật. Không gửi bản tin, không chia sẻ cho bên thứ ba.</p>
            <button type="submit" className={s.submit}>Gửi yêu cầu xem nhà</button>
          </>)}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const [ok, setOk] = useState(false);
  return (
    <footer className={s.foot}>
      <div className={s.footTop}>
        <nav className={s.footNav} aria-label="Chân trang">
          <a href="#du-an">Dự án</a><a href="#kien-truc">Kiến trúc</a><a href="#can-ho">Căn hộ</a><a href="#vi-tri">Vị trí</a><a href="#dat-lich">Đặt lịch xem</a>
        </nav>
        <a className={s.footNav} href="#top" style={{ fontFamily: "var(--np-monoF)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Về đầu trang ↑</a>
      </div>
      <div className={s.footMid}>
        <div>
          <h4>Nhận tin mở bán</h4>
          <p>Một email mỗi quý về tiến độ và các căn còn lại.</p>
          {ok ? <p role="status" style={{ marginTop: 12, color: "var(--np-gold2)" }}>Đã ghi nhận (minh hoạ, không gửi đi đâu).</p> : (
            <form className={s.news} onSubmit={(e) => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("e") || ""); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) setOk(true); }}>
              <label className={s.srOnly} htmlFor="f-mail">Email</label>
              <input id="f-mail" name="e" type="email" placeholder="Email của bạn" autoComplete="email" />
              <button type="submit">Đăng ký</button>
            </form>
          )}
        </div>
        <div><h4>Liên hệ</h4><a href="#dat-lich">12 Quốc Hương, Thảo Điền</a><a href="#dat-lich">datlich@nhaphoanhsang.example</a><a href="#dat-lich">0900 000 142</a></div>
        <div><h4>Mạng xã hội</h4><a href="#top">Instagram (minh hoạ)</a><a href="#top">YouTube (minh hoạ)</a><a href="#top">Zalo (minh hoạ)</a></div>
      </div>
      <p className={s.disc}>Hình ảnh là ảnh minh hoạ lấy từ Pexels và chỉ dùng để trình diễn thiết kế. Trang này là bản demo, không phải dự án hay doanh nghiệp thật; diện tích, giá, tiến độ và tiện ích đều là số liệu giả định.</p>
      <div className={s.copy}><span>© 2026 Nhà Phố Ánh Sáng (demo)</span><a href="#top">Chính sách bảo mật</a></div>
      <p className={s.wm} data-wm aria-hidden="true">{"SÁNG".split("").map((c, i) => (<i key={i}>{c}</i>))}</p>
    </footer>
  );
}
