"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import s from "../brand.module.css";
import { SMART_LIST } from "../data";

const ICON: Record<string, React.ReactNode> = {
  data: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  bank: <path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  speed: <path d="M4 16a8 8 0 1116 0M12 16l4-5" fill="none" stroke="currentColor" strokeWidth="1.6" />,
};

export function Smarter() {
  const [k, setK] = useState<(typeof SMART_LIST)[number]["k"]>("bank");
  const cur = SMART_LIST.find((x) => x.k === k)!;
  return (
    <section id="san-pham-noi-bat" className={s.smarter} aria-labelledby="sm-h">
      <div className={s.center}>
        <h2 id="sm-h" className={s.h2c}>Ngân hàng <em>thông minh hơn</em><br /><em>Khoảnh khắc</em> bắt đầu từ đây</h2>
        <p className={s.lead}>Nền tảng tài chính của chúng tôi tự động hoá quy trình, tăng cường bảo mật và giúp bạn ra quyết định tốt hơn.</p>
      </div>
      <div className={s.bento}>
        <div className={`${s.bc} ${s.bYou}`} data-bento aria-hidden="true"><i /><span>Bạn</span></div>
        <div className={`${s.bc} ${s.bList}`} data-bento>
          <h3>Công nghệ <em>tài chính</em> thông minh hơn</h3>
          <ul>
            {SMART_LIST.map((x) => (
              <li key={x.k}><button type="button" aria-pressed={k === x.k} className={k === x.k ? s.liOn : ""} onClick={() => setK(x.k)}>
                <span className={s.ico}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">{ICON[x.k]}</svg></span>{x.t}
              </button></li>
            ))}
          </ul>
        </div>
        <div className={`${s.bc} ${s.bMain}`} data-bento>
          <p className={s.mini}>Khoảnh khắc</p>
          <div className={s.gbar}><i style={{ width: k === "data" ? "92%" : k === "bank" ? "64%" : "78%" }} /><span>Tăng trưởng số</span></div>
          <p className={s.mini}>Dữ liệu số</p>
          <div className={s.gbar2}><span>Bảo mật <br />& Đổi mới</span></div>
          <div className={s.bMainTxt} key={k} aria-live="polite"><h3>{cur.head}</h3><p>{cur.body}</p></div>
        </div>
        <div className={`${s.bc} ${s.bOps}`} data-bento>
          <h3>Vận hành ngân hàng <em>thông minh hơn</em></h3>
          <svg viewBox="0 0 240 150" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (<g key={i} transform={`translate(${30 + (i % 3) * 56 + (i > 2 ? 28 : 0)} ${22 + Math.floor(i / 3) * 44})`}><path d="M0 14l30-14 30 14-30 14z" fill={i === 1 ? "#4a86f0" : "#dbe9ff"} stroke="#9ec0f5" /><path d="M0 14v8l30 14v-8zM60 14v8L30 36v-8z" fill="#b9d3fb" /></g>))}
          </svg>
        </div>
        <div className={`${s.bc} ${s.bPhoto}`} data-bento><img src="/images/demos/vi-nguon/phone.webp" width={480} height={600} alt="Người dùng cầm điện thoại, ảnh minh hoạ" loading="lazy" decoding="async" /></div>
      </div>
      <div className={s.bentoNote}>
        <hr />
        <p data-words2>Chúng tôi tiếp tục nới rộng ranh giới của tài chính số. <em>Mỗi giải pháp chúng tôi tạo ra</em> đưa ngành tiến gần hơn tới một tương lai tài chính kết nối, an toàn và bền vững.</p>
      </div>
    </section>
  );
}
