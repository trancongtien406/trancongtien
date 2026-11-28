"use client";
import { useState } from "react";
import styles from "../brand.module.css";

type F = { name: string; email: string; company: string; service: string; budget: string; msg: string };
const EMPTY: F = { name: "", email: "", company: "", service: "", budget: "", msg: "" };

export function Contact() {
  const [f, setF] = useState<F>(EMPTY);
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: undefined }); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: typeof err = {};
    if (f.name.trim().length < 2) x.name = "Vui lòng nhập họ tên.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) x.email = "Email chưa hợp lệ.";
    if (!f.service) x.service = "Hãy chọn một dịch vụ.";
    if (f.msg.trim().length < 15) x.msg = "Mô tả ngắn gọn bài toán của bạn (ít nhất 15 ký tự).";
    setErr(x);
    if (Object.keys(x).length === 0) setDone(true);
  };
  return (
    <section id="vc-contact" className={styles.sec} aria-labelledby="vc-h-contact">
      <div className={styles.contactGrid}>
        <div data-vc-in>
          <p className={styles.eyebrow}>Liên hệ</p>
          <h2 id="vc-h-contact" className={styles.h2big}>Kể cho chúng tôi nghe bài toán của bạn</h2>
          <p className={styles.prose2}>Gửi vài dòng về điều bạn muốn giải quyết. Một kỹ sư sản phẩm sẽ phản hồi trong vòng một ngày làm việc và đề xuất buổi khám phá miễn phí 45 phút.</p>
          <ul className={styles.contactList}>
            <li><small>Email</small><a href="mailto:xinchao@vocuclab.example">xinchao@vocuclab.example</a></li>
            <li><small>Điện thoại</small><a href="tel:+84236000000">0236 000 0000</a></li>
            <li><small>Văn phòng</small><span>Tầng 9, toà nhà minh hoạ, Hải Châu, Đà Nẵng</span></li>
          </ul>
        </div>
        {done ? (
          <div className={styles.success} role="status" data-vc-in>
            <h3>Đã nhận thông tin của bạn</h3>
            <p>Cảm ơn {f.name.trim()}. Chúng tôi sẽ phản hồi qua {f.email} trong vòng một ngày làm việc. Đây là biểu mẫu minh hoạ nên chưa có dữ liệu nào được gửi đi.</p>
            <button type="button" className={styles.btnG} onClick={() => { setF(EMPTY); setDone(false); }}>Gửi yêu cầu khác</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate data-vc-in>
            <label>Họ và tên<input value={f.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "e-name" : undefined} />{err.name && <em id="e-name" role="alert">{err.name}</em>}</label>
            <label>Email công việc<input type="email" value={f.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err.email} aria-describedby={err.email ? "e-email" : undefined} />{err.email && <em id="e-email" role="alert">{err.email}</em>}</label>
            <label>Công ty<input value={f.company} onChange={set("company")} autoComplete="organization" /></label>
            <label>Dịch vụ quan tâm
              <select value={f.service} onChange={set("service")} aria-invalid={!!err.service} aria-describedby={err.service ? "e-sv" : undefined}>
                <option value="">Chọn dịch vụ</option>
                {["Thiết kế sản phẩm", "Phát triển phần mềm", "Chiến lược ra thị trường", "Ứng dụng y tế", "Phát triển AI", "Phát triển IoT", "Bộ sản phẩm Atom"].map((s) => <option key={s}>{s}</option>)}
              </select>{err.service && <em id="e-sv" role="alert">{err.service}</em>}
            </label>
            <label>Ngân sách dự kiến
              <select value={f.budget} onChange={set("budget")}><option value="">Chưa xác định</option><option>Dưới 200 triệu</option><option>200 – 700 triệu</option><option>Trên 700 triệu</option></select>
            </label>
            <label className={styles.full}>Bài toán của bạn<textarea rows={5} value={f.msg} onChange={set("msg")} aria-invalid={!!err.msg} aria-describedby={err.msg ? "e-msg" : undefined} />{err.msg && <em id="e-msg" role="alert">{err.msg}</em>}</label>
            <button type="submit" className={`${styles.btnP} ${styles.full}`}>Gửi yêu cầu <span aria-hidden="true">→</span></button>
          </form>
        )}
      </div>
    </section>
  );
}
