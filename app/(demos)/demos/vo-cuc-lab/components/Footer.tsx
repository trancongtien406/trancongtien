"use client";
import { useEffect, useState } from "react";
import styles from "../brand.module.css";

const COLS: [string, [string, string][]][] = [
  ["Dịch vụ", [["Thiết kế sản phẩm", "#vc-services"], ["Phát triển phần mềm", "#vc-services"], ["Chiến lược GTM", "#vc-services"], ["Ứng dụng y tế", "#vc-services"], ["Phát triển AI", "#vc-services"], ["Phát triển IoT", "#vc-services"]]],
  ["Atom", [["Atom Doanh nghiệp", "#vc-atom"], ["Atom Tác tử", "#vc-atom"], ["Atom Ý Định", "#vc-atom"], ["Atom So Sánh", "#vc-atom"], ["Atom Bản Đồ", "#vc-atom"], ["Atom Đội Đỏ", "#vc-atom"]]],
  ["Công ty", [["Về chúng tôi", "#vc-company"], ["Quy trình", "#vc-process"], ["Đội ngũ", "#vc-team"], ["Hình thức hợp tác", "#vc-pricing"]]],
  ["Tài nguyên", [["Công trình", "#vc-work"], ["Góc nhìn", "#vc-insights"], ["Câu hỏi thường gặp", "#vc-faq"], ["Liên hệ", "#vc-contact"]]],
];

export function Footer() {
  const [now, setNow] = useState("");
  const [mail, setMail] = useState("");
  const [sub, setSub] = useState<"idle" | "bad" | "ok">("idle");
  useEffect(() => {
    const f = () => setNow(new Date().toLocaleTimeString("en-US", { hour12: true, timeZone: "Asia/Ho_Chi_Minh" }));
    f(); const id = setInterval(f, 1000); return () => clearInterval(id);
  }, []);
  const [t, ap] = now ? [now.slice(0, -3), now.slice(-2)] : ["--:--:--", ""];
  const sendMail = (e: React.FormEvent) => { e.preventDefault(); setSub(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) ? "ok" : "bad"); };
  return (
    <>
      <section className={styles.cta} aria-labelledby="vc-h-cta">
        <div className={styles.ctaIn}>
          <div className={styles.fog} aria-hidden="true" />
          <h2 id="vc-h-cta">Chúng tôi biến ý tưởng táo bạo<br /><b>thành hiện thực số.</b></h2>
          <a className={styles.btnGlass} href="#vc-contact">Cùng làm việc <span aria-hidden="true">→</span></a>
        </div>
      </section>
      <footer className={styles.foot}>
        <div className={styles.footL}>
          <a className={styles.mailBig} href="mailto:xinchao@vocuclab.example">xinchao@vocuclab.example</a>
          <a className={styles.ln2l} href="#vc-top">LinkedIn ↗</a>
          <p>Trụ sở tại Đà Nẵng <span>Phục vụ khách hàng toàn cầu</span></p>
          <p className={styles.clock} role="timer" aria-label="Giờ hiện tại tại Việt Nam">{t}<small>{ap}</small></p>
          <form className={styles.news} onSubmit={sendMail} noValidate>
            <label htmlFor="vc-news">Nhận bản tin hằng tháng</label>
            <span><input id="vc-news" type="email" value={mail} onChange={(e) => { setMail(e.target.value); setSub("idle"); }} placeholder="email@congty.vn" autoComplete="email" aria-invalid={sub === "bad"} /><button type="submit">Đăng ký</button></span>
            <em role="status">{sub === "bad" ? "Email chưa hợp lệ." : sub === "ok" ? "Đã đăng ký (minh hoạ, chưa gửi dữ liệu)." : ""}</em>
          </form>
        </div>
        <nav className={styles.footCols} aria-label="Chân trang">
          {COLS.map(([h, ls]) => (<div key={h}><b>{h}</b><ul>{ls.map(([l, href]) => <li key={l}><a href={href}>{l}</a></li>)}</ul></div>))}
        </nav>
        <p className={styles.legal}>© 2026 Vô Cực Lab. Thương hiệu, khách hàng, đội ngũ và số liệu trên trang chỉ để minh hoạ.</p>
      </footer>
    </>
  );
}
