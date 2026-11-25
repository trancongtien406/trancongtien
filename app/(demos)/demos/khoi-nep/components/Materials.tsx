"use client";

import { useState } from "react";
import { Photo } from "./Photo";
import { EV, emit, scrollToId } from "./events";
import { MATERIALS } from "../data/materials";
import s from "../brand.module.css";

export function Materials() {
  const [msg, setMsg] = useState("");
  return (
    <section id="materials" className={`${s.section} ${s.materials}`} aria-labelledby="materials-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.secHead}>
          <p className={s.label}>05 / Thư viện vật liệu</p>
          <h2 id="materials-title" className={s.h2}>
            Vật liệu định hình cảm xúc.
          </h2>
          <p className={s.secLead}>
            Không gian được cảm nhận qua những bề mặt chúng ta chạm vào mỗi ngày. Từ sắc gỗ ấm đến vân đá tự nhiên và độ
            mềm của vải, mỗi chất liệu mang một ngôn ngữ riêng.
          </p>
        </div>
        <ul className={s.swatches}>
          {MATERIALS.map((m) => (
            <li key={m.id} className={s.swatch}>
              <div className={s.swatchImg}>
                <Photo name={m.photo} w={600} sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 46vw" alt={`Mẫu ${m.name}`} />
                {m.tint && <i className={s.tint} style={{ background: m.tint }} />}
              </div>
              <p className={s.swCode}>{m.code}</p>
              <h3 className={s.swName}>{m.name}</h3>
              <p className={s.swMeta}>
                <i className={s.dot} style={{ background: m.color }} aria-hidden="true" />
                {m.color} · {m.description}
              </p>
              <p className={s.swUse}>{m.uses}</p>
              <button
                type="button"
                className={s.textBtn}
                onClick={() => {
                  emit(EV.material, { id: m.id });
                  setMsg(`Đã chọn ${m.name} cho bảng của bạn.`);
                }}
              >
                Thêm vào bảng vật liệu
              </button>
            </li>
          ))}
        </ul>
        <div className={s.matFoot}>
          <p role="status" className={s.status}>
            {msg}
          </p>
          <button type="button" className={s.btnLine} onClick={() => scrollToId("board")}>
            Xem bảng vật liệu ↓
          </button>
        </div>
        <figure className={s.bathFig} data-veil>
          <Photo name="bath" sizes="100vw" position="50% 70%" alt="Chậu đá mài tròn đặt trên mặt gỗ sồi, trước tường đá xám" />
          <figcaption>Fig. 02 — Đá mài đặt trên gỗ sồi: hai bề mặt, một cảm giác chạm.</figcaption>
        </figure>
      </div>
    </section>
  );
}
