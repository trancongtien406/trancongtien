"use client";

import { useState } from "react";
import s from "../brand.module.css";

const TABS = [
  { id: "canh", name: "Cảnh 3D", icon: "◈", title: "Tạo website 3D theo nhịp cuộn", text: "Dùng cảnh 3D ngay trong trình dựng web và cho chúng hoạt động theo cuộn. Bắt đầu từ mẫu có sẵn hoặc nhập cảnh của riêng bạn, không cần viết code.", points: ["Nhập cảnh 3D tuỳ chỉnh", "Điều khiển từng vật thể theo cuộn", "Chạy trên công nghệ hiển thị mới nhất"] },
  { id: "dong", name: "Dòng Chuyển Động", icon: "≋", title: "Chuyển động mượt chỉ với vài cú bấm", text: "Gắn hiệu ứng vào bất kỳ phần tử nào: trượt, mờ dần, xoay, ghim màn hình. Mọi thứ xem trước ngay khi chỉnh.", points: ["Thư viện hiệu ứng dựng sẵn", "Ghim và cuộn ngang tuỳ ý", "Tự tắt khi người dùng chọn giảm chuyển động"] },
  { id: "aura", name: "Bộ Hào Quang", icon: "✦", title: "Ánh sáng, hạt và chất liệu có sẵn", text: "Bộ hiệu ứng nền gồm ánh sáng, hạt, chất lỏng và kính, kết hợp với hai ứng dụng còn lại để trang trông đắt tiền hơn.", points: ["Nền chất lỏng và hạt", "Kính mờ và vệt sáng", "Màu sắc theo thương hiệu của bạn"] },
];

const PICS = [
  ["nhan-vat-3d", "Nhân vật hoạt hình 3D trên màn hình laptop, cảnh dựng bằng ứng dụng"],
  ["khoi-khoi", "Làn khói xanh uốn lượn trên nền tối, minh hoạ chuyển động mượt"],
  ["hao-quang", "Nền xanh thẫm có vệt sáng cong, minh hoạ hiệu ứng ánh sáng"],
];

export function Apps() {
  const [cur, setCur] = useState(0);
  const t = TABS[cur];
  return (
    <section className={s.apps} id="ung-dung" aria-labelledby="cc-apps">
      <p className={s.pillTag}><i aria-hidden="true" />Phòng ứng dụng</p>
      <h2 id="cc-apps" className={s.h2c}>Chúng tôi làm nó <span>chuyển động.</span></h2>
      <div className={s.appsCard}>
        <div className={s.tabs} role="tablist" aria-label="Ứng dụng">
          {TABS.map((x, i) => (
            <button key={x.id} role="tab" id={`cc-tab-${x.id}`} aria-selected={cur === i} aria-controls="cc-panel" className={s.tab} data-on={cur === i} onClick={() => setCur(i)}>
              <span aria-hidden="true">{x.icon}</span>{x.name}
            </button>
          ))}
        </div>
        <div className={s.panel} id="cc-panel" role="tabpanel" aria-labelledby={`cc-tab-${t.id}`} key={t.id}>
          <div className={s.panelText}>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
            <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <a className={s.btnSm} href="#cach-bat-dau">Tìm hiểu thêm</a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.char} src={`/images/demos/cat-canh-studio/${PICS[cur][0]}.webp`} alt={PICS[cur][1]} width={900} height={640} decoding="async" />
        </div>
      </div>
      <p className={s.note3} aria-hidden="true"><svg width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M6 4 C4 30 20 48 52 54 M52 54 l-9 -2 M52 54 l-6 -8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>Khám phá<br />phòng ứng dụng</p>
    </section>
  );
}
