"use client";

import { useState } from "react";
import s from "../brand.module.css";

type Err = Partial<Record<"name" | "contact" | "type" | "msg" | "ok", string>>;

export function Contact() {
  const [err, setErr] = useState<Err>({});
  const [done, setDone] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const contact = String(f.get("contact") ?? "").trim();
    const type = String(f.get("type") ?? "");
    const msg = String(f.get("msg") ?? "").trim();
    const n: Err = {};
    if (name.length < 2) n.name = "Vui lòng nhập họ tên (ít nhất 2 ký tự).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !/^(0|\+84)\d{8,10}$/.test(contact.replace(/[\s.]/g, ""))) n.contact = "Nhập email hợp lệ hoặc số điện thoại Việt Nam.";
    if (!type) n.type = "Chọn loại công trình.";
    if (msg.length < 10) n.msg = "Mô tả mảnh đất hoặc mục tiêu, ít nhất 10 ký tự.";
    if (!f.get("ok")) n.ok = "Bạn cần đồng ý để chúng tôi liên hệ lại.";
    setErr(n);
    if (Object.keys(n).length) {
      const first = (e.currentTarget.querySelector("[aria-invalid='true']") as HTMLElement | null);
      requestAnimationFrame(() => first?.focus());
      return;
    }
    setDone(name);
    e.currentTarget.reset();
  };

  return (
    <section id="lien-he" className={s.contact} aria-labelledby="ct-h">
      <div className={s.contactTop}>
        <div className={s.contactText}>
          <p className={s.mono}><i className={s.dash} />Đang xếp lịch khởi công 2027</p>
          <h2 id="ct-h">Bạn có một mảnh đất? <em>Hãy nói về thứ sẽ đứng trên nó.</em></h2>
          <p>Mỗi năm chúng tôi nhận sáu đến tám công trình, để dự án nào cũng có đội ngũ cấp cao từ lần khảo sát đầu tiên tới chiếc chìa khoá cuối cùng.</p>
          <div className={s.ctas}>
            <a className={s.gold} href="#th-form">Bắt đầu dự án <span aria-hidden="true">↗</span></a>
            <a className={s.pillGhost} href="#th-form">Hồ sơ năng lực <span className={s.tag}>PDF</span></a>
          </div>
          <p className={s.mono} style={{ opacity: 0.7, marginTop: 22 }}>Hoặc gọi văn phòng — 028 7300 0142 · Thứ Hai–Sáu, 7 giờ – 18 giờ</p>
        </div>
        <svg className={s.bigStar} viewBox="-100 -100 200 200" aria-hidden="true" data-bigstar>
          <circle r="88" fill="none" stroke="#e8c27a" strokeOpacity=".3" strokeDasharray="2 6" data-ringspin />
          <circle r="62" fill="none" stroke="#e8c27a" strokeOpacity=".18" />
          <path d="M0-92L8-8 92 0 8 8 0 92-8 8-92 0-8-8z" fill="url(#th-sg)" />
          <path d="M0-56L5-5 56 0 5 5 0 56-5 5-56 0-5-5z" fill="#fff5da" transform="rotate(45)" opacity=".7" />
          <defs><radialGradient id="th-sg"><stop offset="0" stopColor="#fffbe8" /><stop offset="1" stopColor="#e8c27a" /></radialGradient></defs>
        </svg>
      </div>

      <form id="th-form" className={s.form} onSubmit={submit} noValidate aria-label="Biểu mẫu gửi thông tin dự án">
        {done ? (
          <div className={s.success} role="status">
            <b>Cảm ơn {done}.</b>
            <p>Chúng tôi đã ghi nhận thông tin. Một giám đốc dự án sẽ phản hồi trong hai ngày làm việc. (Đây là biểu mẫu minh hoạ, dữ liệu không được gửi đi đâu.)</p>
            <button type="button" className={s.pillGhost} onClick={() => setDone(null)}>Gửi thêm một dự án</button>
          </div>
        ) : (
          <>
            <div className={s.row}>
              <label>Họ và tên<input name="name" autoComplete="name" aria-invalid={!!err.name} aria-describedby="e-name" placeholder="Nguyễn Văn A" /><small id="e-name" role="alert">{err.name}</small></label>
              <label>Email hoặc số điện thoại<input name="contact" autoComplete="email" aria-invalid={!!err.contact} aria-describedby="e-contact" placeholder="ban@congty.vn" /><small id="e-contact" role="alert">{err.contact}</small></label>
            </div>
            <div className={s.row}>
              <label>Loại công trình
                <select name="type" defaultValue="" aria-invalid={!!err.type} aria-describedby="e-type">
                  <option value="" disabled>Chọn…</option><option>Nhà ở cao tầng</option><option>Công trình công cộng</option><option>Gia cố kháng chấn</option><option>Mặt dựng & vỏ bao che</option><option>Khác</option>
                </select><small id="e-type" role="alert">{err.type}</small>
              </label>
              <label>Quy mô dự kiến
                <select name="size" defaultValue="3-10"><option value="3-10">3.000 – 10.000 m²</option><option value="10-30">10.000 – 30.000 m²</option><option value="30+">Trên 30.000 m²</option></select>
              </label>
            </div>
            <label>Mảnh đất và mục tiêu của bạn<textarea name="msg" rows={5} aria-invalid={!!err.msg} aria-describedby="e-msg" placeholder="Vị trí, diện tích, thời điểm dự kiến khởi công…" /><small id="e-msg" role="alert">{err.msg}</small></label>
            <label className={s.check}><input type="checkbox" name="ok" aria-invalid={!!err.ok} aria-describedby="e-ok" /><span>Tôi đồng ý để Tháp Hoàng Hôn liên hệ lại về dự án này.</span></label>
            <small id="e-ok" role="alert" className={s.err}>{err.ok}</small>
            <button type="submit" className={s.gold}>Gửi thông tin dự án <span aria-hidden="true">↗</span></button>
          </>
        )}
      </form>
    </section>
  );
}
