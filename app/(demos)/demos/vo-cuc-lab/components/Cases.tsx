"use client";
import { useState } from "react";
import styles from "../brand.module.css";

const CASES = [
  { n: "Phòng khám Số", img: 4, alt: "Máy tính bảng hiển thị biểu đồ thống kê, ảnh minh hoạ", tags: ["Thiết kế web", "Thiết kế UI", "Phát triển", "GTM"], hue: 160 },
  { n: "Sinh Thái AI", img: 6, alt: "Mã nguồn trang web trên màn hình, ảnh minh hoạ", tags: ["Thiết kế web", "Nền tảng AI"], hue: 200 },
  { n: "Cura Việt", img: 2, alt: "Laptop hiển thị bảng điều khiển dữ liệu, ảnh minh hoạ", tags: ["Thiết kế web", "Phát triển"], hue: 140 },
  { n: "Quỹ An Toàn Mạng", img: 1, alt: "Màn hình hiển thị nhiều mẫu thiết kế web, ảnh minh hoạ", tags: ["Thiết kế UI", "Phát triển", "GTM"], hue: 260 },
  { n: "Học Mở", img: 3, alt: "Bản phác thảo wireframe giao diện trên sổ tay, ảnh minh hoạ", tags: ["Thiết kế web", "Ứng dụng di động"], hue: 30 },
  { n: "Giọng Xanh", img: 5, alt: "Nhóm làm việc tại văn phòng sáng, ảnh minh hoạ", tags: ["Thiết kế web", "Phát triển", "Sản phẩm"], hue: 120 },
  { n: "Nhịp Điệu 3", img: 7, alt: "Nhóm họp bàn dự án với tài liệu, ảnh minh hoạ", tags: ["Thiết kế UI", "Phát triển", "Sản phẩm"], hue: 320 },
];

export function Cases() {
  const [on, setOn] = useState(1);
  const c = CASES[on];
  return (
    <section id="vc-work" className={styles.cases} aria-labelledby="vc-h-cases">
      <div className={styles.casesHead}>
        <h2 id="vc-h-cases">Công trình tiêu biểu</h2>
        <p>Kết quả đã kiểm chứng, tác động đo được, những thay đổi chúng tôi đã bàn giao.</p>
      </div>
      <div className={styles.casesBody}>
        <ul className={styles.rows}>
          {CASES.map((x, i) => (
            <li key={x.n}>
              <a href="#vc-contact" className={i === on ? styles.rowOn : ""} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
                <span className={styles.rn}>{String(i + 1).padStart(2, "0")}</span>
                <b>{x.n}</b>
                <span className={styles.tags}>{x.tags.map((t) => <i key={t}>{t}</i>)}</span>
                <span className={styles.rArrow} aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.preview} style={{ ["--h" as string]: c.hue }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={on} className={styles.mock} src={`/images/demos/vo-cuc-lab/case-${c.img}.webp`} alt={c.alt} width={800} height={600} />
          <span className={styles.mockCap}>{c.n}</span>
        </div>
      </div>
    </section>
  );
}
