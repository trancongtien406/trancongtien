"use client";

import { useState } from "react";
import s from "../brand.module.css";

const PLANS = [
  { n: "Khởi Đầu", m: 0, y: 0, d: "Để thử một trang đầu tiên.", f: ["1 website thử nghiệm", "10 hiệu ứng dựng sẵn", "Cộng đồng hỗ trợ"], cta: "Bắt đầu miễn phí" },
  { n: "Chuyên Nghiệp", m: 390000, y: 3900000, d: "Cho freelancer và thương hiệu nhỏ.", f: ["5 website xuất bản", "Cả ba ứng dụng", "Cảnh 3D tuỳ chỉnh", "Hỗ trợ trong 1 ngày"], cta: "Dùng thử 14 ngày", hot: true },
  { n: "Studio", m: 990000, y: 9900000, d: "Cho agency làm cho nhiều khách.", f: ["Không giới hạn website", "Dùng cho dự án khách hàng", "Thư viện mẫu độc quyền", "Tư vấn trực tiếp hằng tháng"], cta: "Nói chuyện với chúng tôi" },
];
const fmt = (n: number) => (n === 0 ? "0đ" : n.toLocaleString("vi-VN") + "đ");

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section className={s.sec} id="bang-gia" aria-labelledby="cc-price">
      <div className={s.wrap}>
        <p className={s.pillTag}><i aria-hidden="true" />Bảng giá</p>
        <h2 id="cc-price" className={s.h2}>Chọn gói, <span>bắt đầu bay.</span></h2>
        <div className={s.billing} role="group" aria-label="Chu kỳ thanh toán">
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>Theo tháng</button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>Theo năm <em>tiết kiệm 17%</em></button>
        </div>
        <ul className={s.priceGrid}>
          {PLANS.map((p) => (
            <li key={p.n} data-hot={!!p.hot}>
              <h3>{p.n}</h3>
              <p className={s.pdesc}>{p.d}</p>
              <p className={s.price}><b>{fmt(yearly ? p.y : p.m)}</b><span>{p.m === 0 ? "" : yearly ? "/năm" : "/tháng"}</span></p>
              <ul>{p.f.map((x) => <li key={x}>{x}</li>)}</ul>
              <a className={p.hot ? s.navBtn : s.btnGhost} href="#lien-he">{p.cta}</a>
            </li>
          ))}
        </ul>
        <p className={s.fineLine}>Giá minh hoạ cho trang thiết kế.</p>
      </div>
    </section>
  );
}
