"use client";

import { useState } from "react";
import s from "../brand.module.css";
import { FOOT, NAV } from "../data";

export function Footer() {
  const [em, setEm] = useState("");
  const [st, setSt] = useState<"idle" | "bad" | "ok">("idle");
  return (
    <footer className={s.footer}>
      <div className={s.footTop}>
        <form onSubmit={(e) => { e.preventDefault(); setSt(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? "ok" : "bad"); }} noValidate className={s.news} aria-label="Đăng ký bản tin">
          <b>Bản tin công trường</b>
          <p>Mỗi quý một thư, kể về một công trình đang dựng. Không quảng cáo.</p>
          <div><input type="email" value={em} onChange={(e) => { setEm(e.target.value); setSt("idle"); }} placeholder="email@cua-ban.vn" aria-label="Email nhận bản tin" aria-invalid={st === "bad"} /><button type="submit" className={s.gold}>Đăng ký</button></div>
          <small role="status">{st === "bad" ? "Email chưa hợp lệ." : st === "ok" ? "Đã đăng ký (minh hoạ). Hẹn gặp bạn vào quý sau." : ""}</small>
        </form>
        <div className={s.footCols}>
          <div><b>Văn phòng</b>{FOOT.office.map((l) => (<p key={l}>{l}</p>))}<p>028 7300 0142</p><p>chao@thaphoanghon.example</p></div>
          <div><b>Khám phá</b>{NAV.map((n) => (<a key={n.href} href={n.href}>{n.label}</a>))}</div>
          <div><b>Theo dõi</b><a href="#nhat-ky">Nhật ký công trường</a><a href="#doi-ngu">Tuyển dụng</a><a href="#hoi-dap">Hỏi đáp</a><a href="#top">Về đầu trang ↑</a></div>
        </div>
      </div>
      <p className={s.wordmark} aria-hidden="true">Hoàng Hôn</p>
      <p className={s.fine}>Trang minh hoạ cho một doanh nghiệp giả định. Ảnh từ Pexels (xem CREDITS), số liệu, tên công trình và lời đánh giá chỉ mang tính minh hoạ. © 2026 Tháp Hoàng Hôn.</p>
    </footer>
  );
}
