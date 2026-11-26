"use client";

import { Photo } from "./Photo";
import { EV, emit, scrollToId } from "./events";
import { QUOTE_STEPS, SERVICES, WARRANTY } from "../data/content";
import s from "../brand.module.css";

export function Services() {
  return (
    <section id="services" className={`${s.section} ${s.services}`} aria-labelledby="services-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.svcGrid}>
          <div className={s.svcSide}>
            <p className={s.label}>02 / Dịch vụ</p>
            <h2 id="services-title" className={s.h2}>
              Thiết kế, thi công hoặc cả hai.
            </h2>
            <p className={s.secLead}>
              Chọn đúng phạm vi bạn cần: chỉ thiết kế để mang bản vẽ đi thi công nơi khác, chỉ thi công theo bản vẽ có sẵn, hoặc để một đội làm từ khảo sát đến bàn giao. Giá dưới đây là đơn giá tham khảo theo m² sàn.
            </p>
            <figure className={s.svcFig} data-veil>
              <Photo name="kitchen" sizes="(min-width: 1024px) 30vw, 100vw" position="40% 50%" alt="Bếp với tủ gỗ, mặt đá xám và bếp từ" />
            </figure>
          </div>
          <div>
            <ul className={s.svcList}>
              {SERVICES.map((v) => (
                <li key={v.n} className={s.svcRow}>
                  <span className={s.idx}>{v.n}</span>
                  <div className={s.svcMain}>
                    <h3 className={s.h3}>{v.name}</h3>
                    <p className={s.svcScope}>{v.desc}</p>
                    <p className={s.svcWho}>{v.who}</p>
                  </div>
                  <div className={s.svcPrice}>
                    <p className={s.priceLabel}>Giá tham khảo</p>
                    <p className={s.price}>{v.price}</p>
                    <button
                      type="button"
                      className={s.textBtn}
                      onClick={() => {
                        emit(EV.scope, { scope: v.scope });
                        scrollToId("budget");
                      }}
                    >
                      {v.cta} <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className={s.disclaimer}>
              Đơn giá chỉ mang tính tham khảo, không phải báo giá chính thức. Chi phí thực tế phụ thuộc khảo sát và phạm vi công việc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section id="packages" className={`${s.section} ${s.quote}`} aria-labelledby="quote-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.secHead}>
          <p className={s.label}>06 / Báo giá &amp; bảo hành</p>
          <h2 id="quote-title" className={s.h2}>Giá rõ từng hạng mục, bảo hành ghi trong hợp đồng.</h2>
          <p className={s.secLead}>Không có báo giá trọn gói mơ hồ: mỗi khoản đều gắn với bản vẽ và vật liệu đã duyệt.</p>
        </div>
        <div className={s.quoteGrid}>
          <ol className={s.quoteList}>
            {QUOTE_STEPS.map((q, i) => (
              <li key={q.t}><span className={s.idx}>{String(i + 1).padStart(2, "0")}</span><div><h3 className={s.h3}>{q.t}</h3><p>{q.d}</p></div></li>
            ))}
          </ol>
          <ul className={s.warrantyList} aria-label="Bảo hành">
            {WARRANTY.map((w) => (
              <li key={w.t}><h3 className={s.h3}>{w.t}</h3><p>{w.d}</p></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
