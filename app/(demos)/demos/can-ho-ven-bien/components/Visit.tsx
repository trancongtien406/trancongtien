"use client";

import { useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { ShineSweep } from "@/features/showroom/effects";
import { SLUG, VISIT_SLOTS, VISIT_STEPS } from "../data/content";
import { UNITS } from "../data/plans";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const TOWER_FLOORS = Array.from({ length: 35 }, (_, i) => 88 + (i + 1) * 12.2);

/** Đặt lịch tham quan nhà mẫu: chọn buổi và loại căn để tạo câu tóm tắt gửi đội tư vấn. Không thu họ tên hay số điện thoại. */
export function Visit() {
  const [slot, setSlot] = useState<string>("cuoi-tuan");
  const [unit, setUnit] = useState<string>("2pn");
  const [copied, setCopied] = useState("");
  const s = VISIT_SLOTS.find((x) => x.id === slot)!;
  const u = unit === "chua" ? null : UNITS.find((x) => x.id === unit)!;
  const summary = `Tôi muốn xem nhà mẫu Vọng Triều vào ${s.label.toLowerCase()} (${s.sub.toLowerCase()}), quan tâm ${u ? `căn ${u.label}` : "chưa chọn loại căn"}.`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied("Đã sao chép lời nhắn."); }
    catch { setCopied("Trình duyệt không cho sao chép. Bạn có thể chọn và chép lời nhắn bên trên."); }
    window.setTimeout(() => setCopied(""), 4000);
  };
  return (
    <section id="tham-quan" className={styles.final} aria-labelledby="cv-fin-h">
      <div className={styles.finalBg} aria-hidden="true">
        <Photo file="thap-chieu-muon" alt="" sizes="100vw" pos="50% 40%" />
        <span />
      </div>
      <svg className={styles.finalTower} viewBox="0 0 520 600" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M150 540V110l24-34h72l24 34v430" strokeWidth="1.8" strokeLinejoin="round" />
        {TOWER_FLOORS.map((y, i) => <path key={i} d={`M150 ${y.toFixed(1)}H${i % 3 === 0 ? 270 : 262}`} opacity={i % 3 === 0 ? 1 : 0.45} />)}
        <path d="M70 540V330h60M300 540V380h80v160" strokeLinejoin="round" />
        <path d="M30 540h470" />
      </svg>
      <div className={`${styles.wrap} ${styles.finalGrid}`}>
        <div data-cv="reveal">
          <p className={styles.sheet}><span>09</span><i aria-hidden="true" />Bản vẽ A-09 · Đặt lịch tham quan nhà mẫu</p>
          <h2 id="cv-fin-h" className={styles.h2Big}>Hẹn một buổi để nhìn biển từ chính căn bạn chọn.</h2>
          <p className={styles.lede}>Nhà mẫu mở theo lịch hẹn. Chọn buổi và loại căn, sao chép lời nhắn rồi gửi qua form tư vấn; đội tư vấn xác nhận giờ và hướng dẫn đường tới.</p>

          <div className={styles.vsPick}>
            <div role="radiogroup" aria-label="Buổi xem nhà mẫu" className={styles.vsRow}>
              {VISIT_SLOTS.map((x) => (
                <button key={x.id} type="button" role="radio" aria-checked={slot === x.id} className={styles.vsBtn} onClick={() => setSlot(x.id)}><b>{x.label}</b><small>{x.sub}</small></button>
              ))}
            </div>
            <div role="radiogroup" aria-label="Loại căn quan tâm" className={styles.vsRow}>
              {UNITS.map((x) => (
                <button key={x.id} type="button" role="radio" aria-checked={unit === x.id} className={styles.vsBtn} onClick={() => setUnit(x.id)}><b>{x.label}</b><small>{x.name.replace("Căn ", "")}</small></button>
              ))}
              <button type="button" role="radio" aria-checked={unit === "chua"} className={styles.vsBtn} onClick={() => setUnit("chua")}><b>Chưa chắc</b><small>Cần tư vấn</small></button>
            </div>
            <p className={styles.summary} aria-live="polite">{summary}</p>
            <p className={styles.copied} role="status">{copied}</p>
          </div>

          <ol className={styles.vsSteps}>
            {VISIT_STEPS.map((v, i) => (<li key={v.t}><span aria-hidden="true">{i + 1}</span><div><b>{v.t}</b><small>{v.d}</small></div></li>))}
          </ol>

          <div className={styles.finalCta}>
            <ShineSweep trigger="loop" every={4.5} color="rgba(255,236,210,.5)">
              <a className={`${styles.btn} ${styles.btnCopper} ${styles.btnLg}`} href={buildConsultHref(SLUG)} data-cursor="Đi tới">Gửi lịch xem nhà mẫu</a>
            </ShineSweep>
            <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={copy}>Sao chép lời nhắn</button>
          </div>
          <p className={styles.fine}>Công cụ chỉ tạo lời nhắn trong trình duyệt của bạn, không lưu và không gửi đi. Thông tin chỉ được gửi khi bạn tự điền form tư vấn.</p>
        </div>
      </div>
    </section>
  );
}
