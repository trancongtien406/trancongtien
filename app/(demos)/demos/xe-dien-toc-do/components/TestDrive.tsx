"use client";

import { useState } from "react";
import s from "../brand.module.css";

type E = Partial<Record<"name" | "phone" | "date", string>>;

export function TestDrive() {
  const [errs, setErrs] = useState<E>({});
  const [done, setDone] = useState<string | null>(null);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    const date = String(f.get("date") || "");
    const er: E = {};
    if (name.length < 2) er.name = "Vui lòng nhập họ tên.";
    if (!/^(\+?84|0)[0-9\s.-]{8,12}$/.test(phone)) er.phone = "Số điện thoại chưa hợp lệ.";
    if (!date) er.date = "Chọn ngày lái thử.";
    setErrs(er);
    if (Object.keys(er).length) { e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(er)[0]}"]`)?.focus(); return; }
    setDone(`${name} · ${String(f.get("city"))} · ${date}`);
  };
  return (
    <section id="lai-thu" className={`${s.sec} ${s.td}`} aria-labelledby="td-h">
      <div className={s.tdGrid}>
        <div>
          <p className={s.kick}><b>10</b><i />Lái thử</p>
          <h2 id="td-h" className={s.h2s}>Đặt một buổi <span style={{ color: "var(--vt-gold)" }}>lái thử ướt.</span></h2>
          <p className={s.lead}>Chúng tôi đón bạn ở xưởng thử, chạy 45 phút trên đường đua phun nước và đường phố thật. Mỗi buổi tối đa hai khách, có kỹ sư đi cùng.</p>
          <dl className={s.info}>
            <div><dt>Địa điểm</dt><dd>Xưởng thử Vĩ Tốc, Hoà Lạc, Hà Nội (minh hoạ)</dd></div>
            <div><dt>Giờ</dt><dd>Thứ 3 - Chủ nhật, 9:00 - 17:00</dd></div>
            <div><dt>Điện thoại</dt><dd>0900 000 055 (minh hoạ)</dd></div>
          </dl>
        </div>
        <form className={s.form} onSubmit={submit} noValidate aria-label="Đặt lịch lái thử">
          {done ? (
            <div className={s.done} role="status"><h3>Đã ghi nhận lịch lái thử</h3><p>{done}. Kỹ sư sẽ gọi xác nhận trong vòng một ngày làm việc. Đây là trang minh hoạ, dữ liệu không được gửi đi đâu.</p><button type="button" className={s.ghost} onClick={() => setDone(null)}>Đặt lịch khác</button></div>
          ) : (<>
            <div className={s.fld}><label htmlFor="t-name">Họ và tên</label><input id="t-name" name="name" autoComplete="name" aria-invalid={!!errs.name} aria-describedby="t-e1" /><p id="t-e1" className={s.err}>{errs.name}</p></div>
            <div className={s.fld}><label htmlFor="t-phone">Điện thoại</label><input id="t-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errs.phone} aria-describedby="t-e2" /><p id="t-e2" className={s.err}>{errs.phone}</p></div>
            <div className={s.fld}><label htmlFor="t-city">Thành phố</label><select id="t-city" name="city" defaultValue="Hà Nội"><option>Hà Nội</option><option>Đà Nẵng</option><option>TP. Hồ Chí Minh</option></select></div>
            <div className={s.fld}><label htmlFor="t-date">Ngày muốn lái</label><input id="t-date" name="date" type="date" aria-invalid={!!errs.date} aria-describedby="t-e3" /><p id="t-e3" className={s.err}>{errs.date}</p></div>
            <p className={s.note2}>Bằng việc gửi, bạn đồng ý để chúng tôi liên hệ về buổi lái thử. Không gửi bản tin, không chia sẻ cho bên thứ ba.</p>
            <button type="submit" className={s.gold}>Gửi yêu cầu lái thử <i aria-hidden="true">→</i></button>
          </>)}
        </form>
      </div>
    </section>
  );
}
