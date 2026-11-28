"use client";
import { useState } from "react";
import styles from "../brand.module.css";

const PLANS = [
  { n: "Khởi động", sub: "Kiểm chứng ý tưởng bằng mẫu thử chạy thật", p: [180, 55], u: ["triệu đồng / dự án", "triệu đồng / tháng"], f: ["Khám phá và thiết kế 2 tuần", "Mẫu thử với dữ liệu thật", "Tối đa 1 luồng người dùng", "Báo cáo kết quả và khuyến nghị"], hot: false },
  { n: "Tăng tốc", sub: "Xây sản phẩm đầu tiên sẵn sàng cho người dùng", p: [650, 160], u: ["triệu đồng / dự án", "triệu đồng / tháng"], f: ["Đội 4 đến 6 người chuyên trách", "Thiết kế, phát triển và kiểm thử", "Tích hợp hệ thống hiện có", "Giám sát và hỗ trợ 90 ngày"], hot: true },
  { n: "Doanh nghiệp", sub: "Đồng hành dài hạn, nhiều sản phẩm song song", p: [0, 0], u: ["Thoả thuận riêng", "Thoả thuận riêng"], f: ["Đội chuyên trách theo quý", "Kiểm thử đội đỏ và tuân thủ", "Triển khai tại hạ tầng của bạn", "Quản lý dự án và SLA"], hot: false },
];

export function Packages() {
  const [mode, setMode] = useState(0);
  return (
    <section id="vc-pricing" className={styles.sec} aria-labelledby="vc-h-pk">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Hình thức hợp tác</p>
        <h2 id="vc-h-pk" className={styles.h2big}>Chọn cách làm việc phù hợp với giai đoạn của bạn</h2>
      </div>
      <div className={styles.toggle} role="group" aria-label="Cách tính chi phí" data-vc-in>
        <button type="button" aria-pressed={mode === 0} onClick={() => setMode(0)}>Theo dự án</button>
        <button type="button" aria-pressed={mode === 1} onClick={() => setMode(1)}>Theo tháng</button>
      </div>
      <ul className={styles.plans}>
        {PLANS.map((x) => (
          <li key={x.n} className={x.hot ? styles.planHot : ""} data-vc-in>
            {x.hot && <span className={styles.badge}>Phổ biến nhất</span>}
            <h3>{x.n}</h3>
            <p className={styles.planSub}>{x.sub}</p>
            <p className={styles.price}>{x.p[mode] ? <>từ <b>{x.p[mode]}</b></> : <b>Liên hệ</b>}<small>{x.u[mode]}</small></p>
            <ul>{x.f.map((f) => <li key={f}>{f}</li>)}</ul>
            <a className={x.hot ? styles.btnP : styles.btnG} href="#vc-contact">Nhận báo giá</a>
          </li>
        ))}
      </ul>
      <p className={styles.note}>Mức giá tham khảo, minh hoạ cho bản demo. Báo giá chính thức sau buổi khám phá.</p>
    </section>
  );
}
