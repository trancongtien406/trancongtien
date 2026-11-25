"use client";

import { Photo } from "./Photo";
import { EV, emit, scrollToId } from "./events";
import { SERVICES } from "../data/content";
import s from "../brand.module.css";

export function Services() {
  return (
    <section id="services" className={`${s.section} ${s.services}`} aria-labelledby="services-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.svcGrid}>
          <div className={s.svcSide}>
            <p className={s.label}>03 / Dịch vụ</p>
            <h2 id="services-title" className={s.h2}>
              Từ bản vẽ đến không gian sống.
            </h2>
            <p className={s.secLead}>
              Ba phạm vi dịch vụ phù hợp với từng giai đoạn của một công trình, từ định hình ý tưởng đến hoàn thiện không gian.
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
