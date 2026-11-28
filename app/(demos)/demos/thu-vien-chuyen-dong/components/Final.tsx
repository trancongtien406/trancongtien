"use client";
import { useState } from "react";
import styles from "../brand.module.css";
import { Mark, Poster } from "./Poster";

export function Final() {
  const [mail, setMail] = useState("");
  const [st, setSt] = useState<"idle" | "bad" | "ok">("idle");
  const send = (e: React.FormEvent) => { e.preventDefault(); setSt(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) ? "ok" : "bad"); };
  return (
    <>
      <section id="tm-try" data-tm-foot className={styles.final} aria-labelledby="tm-h-final">
        <div className={styles.fall} aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={i} data-tm-fall style={{ left: `${4 + i * 11}%`, top: `${(i % 3) * 16}%` }}><Poster v={i * 3 + 1} /></div>)}
        </div>
        <h2 id="tm-h-final">Đưa tác phẩm vào.<br />Xem nó đi đâu <em>(chuyển động)</em>.</h2>
        <p>Không cần đăng ký. Không cần cấu hình gì trước.</p>
        <div className={styles.cta}><a href="#tm-top" className={styles.dark}>Mở Thư Viện →</a><a href="#tm-presets" className={styles.light}>Xem các mẫu</a></div>
        <form className={styles.news} onSubmit={send} noValidate>
          <label htmlFor="tm-mail">Hoặc nhận bản tin cập nhật mỗi tháng</label>
          <span><input id="tm-mail" type="email" value={mail} onChange={(e) => { setMail(e.target.value); setSt("idle"); }} placeholder="email@cua-ban.vn" autoComplete="email" aria-invalid={st === "bad"} /><button type="submit">Đăng ký</button></span>
          <em role="status">{st === "bad" ? "Email chưa hợp lệ." : st === "ok" ? "Đã đăng ký (minh hoạ, chưa gửi dữ liệu)." : ""}</em>
        </form>
      </section>
      <footer className={styles.footer}>
        <div className={styles.fTop}>
          <div><b>Sẵn sàng chuyển động<br />trước cả bạn</b><a href="mailto:ho-tro@thuvienchuyendong.example">ho-tro@thuvienchuyendong.example</a></div>
          <nav aria-label="Chân trang">
            <ul><li><small>Sản phẩm</small></li><li><a href="#tm-presets">Thư viện</a></li><li><a href="#tm-how">Cách hoạt động</a></li><li><a href="#tm-mcp">MCP</a></li><li><a href="#tm-pricing">Giá</a></li><li><a href="#tm-faq">Liên hệ</a></li></ul>
            <ul><li><small>Mạng xã hội</small></li><li><a href="#tm-top">X / Twitter</a></li><li><a href="#tm-top">Instagram</a></li><li><a href="#tm-top">Zalo</a></li></ul>
            <ul><li><small>Pháp lý</small></li><li><a href="#tm-pricing">Điều khoản</a></li><li><a href="#tm-pricing">Quyền riêng tư</a></li><li><a href="#tm-pricing">Cookie</a></li><li><a href="#tm-pricing">Hoàn tiền</a></li><li><a href="#tm-pricing">Giấy phép mẫu</a></li><li><a href="#tm-pricing">Sử dụng hợp lệ</a></li></ul>
          </nav>
        </div>
        <div className={styles.fBrand}><span className={styles.fIcon}><Mark size={78} /></span><span aria-hidden="true">thư viện</span></div>
        <p className={styles.fBot}><small>© 2026 Thư Viện Chuyển Động</small><small>Cuộn tiếp để mở trình chỉnh sửa ↓</small><small>Thương hiệu và sản phẩm chỉ để minh hoạ</small></p>
      </footer>
    </>
  );
}
