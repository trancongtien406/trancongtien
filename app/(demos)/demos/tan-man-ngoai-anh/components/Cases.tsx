"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";
import { CASES, JEWELS, PROJECTS } from "./data";
import { Scene } from "./Scene";

/** Thẻ dự án: cột chữ + khung cuộn riêng (thẻ xanh sage, ảnh lưới) + danh sách chọn dự án, như trạng thái "Christofle" của trang gốc. */
export function Cases() {
  const [i, setI] = useState(2);
  useEffect(() => {
    const h = (e: Event) => setI((e as CustomEvent<number>).detail);
    window.addEventListener("tm:case", h);
    return () => window.removeEventListener("tm:case", h);
  }, []);
  const c = CASES[i];
  return (
    <section className={s.cases} id="du-an" aria-labelledby="tm-cases">
      <div className={s.secHead}><span>{"{02}"}</span><h2 id="tm-cases">Dự án chọn lọc</h2></div>
      <div className={s.caseGrid}>
        <div className={s.caseText}>
          <h3 className={s.caseName}>{c ? c.title : "Bạc Thanh"}</h3>
          {c ? (
            <>
              <p>{c.text}</p>
              <p className={s.fine}>{c.credit}</p>
              <p className={s.meta}>{c.meta}</p>
            </>
          ) : (
            <>
              <p>Một website khái niệm cho phép người dùng tự tuỳ chỉnh món trang sức lấy cảm hứng từ thương hiệu đồ bạc Bạc Thanh. Dự án hình dung một nền tảng số, nơi khách ghép từng món rồi xem trước sản phẩm cuối cùng cho riêng mình.</p>
              <p>Hình ảnh là ảnh chụp tĩnh vật bằng bạc và đá, dàn dựng cho trang giới thiệu. Đây là dự án minh hoạ, không phải thương hiệu thật.</p>
              <p className={s.meta}>Đà Nẵng, 2025. Website. Làm hình ảnh.</p>
            </>
          )}
        </div>
        <div className={s.caseScroll} tabIndex={0} aria-label="Nội dung dự án, cuộn được" key={i}>
          {c ? (
            <div className={s.shots}>
              {c.shots.map((x, k) => (
                <figure key={x.k + k} className={k % 3 === 0 ? s.shotWide : undefined}><div className={s.shot}><Scene kind={x.k} alt={x.cap} /></div><figcaption>{x.cap}</figcaption></figure>
              ))}
            </div>
          ) : (
            <>
              <div className={s.caseRow}>{JEWELS.map((j) => <div key={j.name} className={s.jewel}><Scene kind={j.kind} alt={j.name} /></div>)}</div>
              <div className={s.how}>
                <h3>VẬY NÓ HOẠT ĐỘNG THẾ NÀO<br />Tại đây bạn chọn món trang sức từ phần đế.</h3>
                <p className={s.howP}>Từng bước một, bạn sẽ thiết kế đúng thứ mình muốn: chọn mẫu, chọn chất liệu, chọn đá, chọn cỡ.</p>
                <span className={s.cont}>TIẾP TỤC</span>
              </div>
              <div className={s.how}>
                <div className={s.howGrid}>{JEWELS.map((j) => <div key={j.name} className={s.cell}><div className={s.jewel}><Scene kind={j.kind} alt={j.name} /></div><span>{j.name}</span></div>)}</div>
              </div>
              <div className={s.how}>
                <h3>MÀU KIM LOẠI · MÀU ĐÁ · KÍCH CỠ</h3>
                <div className={s.howGrid3}>{["Bạc sáng", "Bạc cổ", "Mạ vàng hồng"].map((m, k) => <div key={m} className={s.cell}><div className={s.jewel}><Scene kind={JEWELS[k % 3].kind} alt={m} /></div><span>{m}</span></div>)}</div>
                <div className={s.howGrid3}>{["Hồng ngọc", "Lam ngọc", "Lục bảo"].map((m, k) => <div key={m} className={s.cell}><div className={s.jewel}><Scene kind={JEWELS[(k + 1) % 4].kind} alt={m} /></div><span>{m}</span></div>)}</div>
              </div>
              <div className={s.how}>
                <h3>THẾ LÀ XONG<br />Mỗi món có thể đổi chất liệu, độ bóng và khắc tên.</h3>
              </div>
            </>
          )}
        </div>
        <ul className={s.caseList} aria-label="Chọn dự án">
          {PROJECTS.map((x, k) => (
            <li key={x.n}>
              <button type="button" aria-pressed={i === k} onClick={() => setI(k)}><span className={i === k ? s.serif : undefined}>{x.title}</span><b>{`{${x.n}}`}</b><small>{x.type}</small></button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
