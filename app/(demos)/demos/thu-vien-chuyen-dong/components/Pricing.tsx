"use client";
import { useState } from "react";
import styles from "../brand.module.css";

const PLANS = [
  { k: "Khách", t: "Dùng thử ngay", f: ["Tệp của riêng bạn", "Chạy ngay trên trình duyệt", "Dự án lưu trên máy", "Xuất tối đa 720p MP4, 10 lần mỗi tháng"], cta: "Mở Thư Viện →", href: "#tm-top", price: [0, 0] },
  { k: "Miễn phí", t: "Lưu tác phẩm của bạn", f: ["Truy cập trên nhiều thiết bị", "1 GB lưu trữ tệp", "Xuất tối đa 720p MP4, 10 lần mỗi tháng"], cta: "Tạo tài khoản miễn phí →", href: "#tm-try", price: [0, 0] },
  { k: "Pro", t: "Gỡ mọi giới hạn", f: ["Xuất không giới hạn", "Tới 4K, MP4 và WebM", "Ứng dụng AI (MCP)", "Ưu tiên hàng đợi dựng"], cta: "Lên Pro →", href: "#tm-try", price: [229000, 153000], pro: true },
];
const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="tm-pricing" className={styles.pricing} aria-labelledby="tm-h-pr">
      <h2 id="tm-h-pr" className={styles.h2c}>Dùng thử toàn bộ trình chỉnh sửa<br />trước khi chúng tôi hỏi email của bạn</h2>
      <p className={styles.prSub}>Không cần thẻ. Làm ra thứ gì đó trước đã.<br />Cần gì thì quyết định sau.</p>
      <div className={styles.billing} role="group" aria-label="Chu kỳ thanh toán">
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>Theo tháng</button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>Theo năm <b>−33%</b></button>
      </div>
      <ul className={styles.plans}>
        {PLANS.map((p) => (
          <li key={p.k} className={p.pro ? styles.planPro : ""}>
            <small>{p.k}</small>
            <h3>{p.t}</h3>
            <p className={styles.price} aria-live="polite">{p.price[0] === 0 ? <b>0đ</b> : <><b>{vnd(p.price[yearly ? 1 : 0])}</b><span>/ tháng{yearly ? ", trả theo năm" : ""}</span></>}</p>
            <ul>{p.f.map((x) => <li key={x}>{x}</li>)}</ul>
            <a className={p.pro ? styles.dark : styles.light} href={p.href}>{p.cta}</a>
          </li>
        ))}
      </ul>
      <p className={styles.prNote}>Giá minh hoạ cho bản demo, đã gồm thuế khi có. Thanh toán do đơn vị trung gian xử lý. <a href="#tm-faq">Hoàn tiền đầy đủ trong 14 ngày</a> kể từ lần thanh toán đầu tiên.</p>
    </section>
  );
}
