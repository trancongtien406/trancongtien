"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";
import { LENGTHS, SERVICES, vnd, formatDuration, type HairLength } from "../data/builder";
import { EventLink } from "./EventLink";

/** Bảng giá theo độ dài tóc: chọn Ngắn/Vừa/Dài, lưỡi cắt chéo trượt tới đúng cột. */
export function PriceTable() {
  const id = useId();
  const [len, setLen] = useState<HairLength>("medium");
  const idx = LENGTHS.findIndex((l) => l.id === len);
  return (
    <div className={styles.pt} data-nl="price-table" style={{ ["--pt-i" as string]: idx }}>
      <fieldset className={styles.ptSeg}>
        <legend>Độ dài tóc</legend>
        <div>
          {LENGTHS.map((l) => (
            <label key={l.id} className={styles.opt}>
              <input type="radio" name={`${id}-len`} checked={len === l.id} onChange={() => setLen(l.id)} />
              <span className={styles.optBox}><span className={styles.optTitle}>{l.label}</span><span className={styles.optSub}>{l.hint}</span></span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.ptWrap}>
        <span className={styles.ptBlade} aria-hidden="true" />
        <table className={styles.ptTable}>
          <caption className={styles.srOnly}>Bảng giá và thời gian từng dịch vụ theo độ dài tóc</caption>
          <thead>
            <tr><th scope="col">Dịch vụ</th>{LENGTHS.map((l, i) => <th scope="col" key={l.id} data-on={i === idx ? "1" : "0"}>{l.label}</th>)}<th scope="col" className={styles.ptAct}><span className={styles.srOnly}>Thêm vào đặt lịch</span></th></tr>
          </thead>
          <tbody>
            {SERVICES.map((s) => (
              <tr key={s.id} data-nl="price-row">
                <th scope="row"><span className={styles.ptTag}>{s.tag}</span><span className={styles.ptName}>{s.name}</span><span className={styles.ptDesc}>{s.desc}</span></th>
                {s.prices.map((p, i) => (
                  <td key={i} data-on={i === idx ? "1" : "0"}><b>{vnd(p)}</b><small>{formatDuration(s.minutes[i])}</small></td>
                ))}
                <td className={styles.ptAct}><EventLink className={`${styles.btn} ${styles.btnGhost}`} href="#builder" event="nl:add" detail={{ id: s.id }}>Thêm</EventLink></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.note}>Giá tham khảo cho stylist cơ bản, đã gồm gội và sấy. Stylist cấp cao phụ thu 15% hoặc 30%. Tóc rất dày, rất dài hoặc cần xử lý nền tóc được báo thêm khi tư vấn.</p>
    </div>
  );
}
