"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";

const fmt = new Intl.NumberFormat("vi-VN");

export function Calculator() {
  const [bill, setBill] = useState(30);
  const [storage, setStorage] = useState(true);
  const id = useId();
  // Công thức minh hoạ: giả định 1 kWp ~ 120 kWh/tháng, giá 2.200 ₫/kWh (chỉ để dựng giao diện).
  const kwh = (bill * 1_000_000) / 2200;
  const kwp = Math.max(5, Math.round((kwh * 0.6) / 120));
  const saving = Math.round(bill * (storage ? 0.46 : 0.34) * 10) / 10;
  const capex = Math.round(kwp * (storage ? 19 : 13.5));
  const payback = Math.round((capex / (saving * 12)) * 10) / 10;

  return (
    <div className={styles.calc}>
      <div className={styles.calcIn}>
        <label htmlFor={id} className={styles.rangeLbl}>Tiền điện mỗi tháng <strong>{bill} triệu ₫</strong></label>
        <input id={id} type="range" min={5} max={200} step={5} value={bill} onChange={(e) => setBill(+e.target.value)} className={styles.range} style={{ ["--p" as string]: `${((bill - 5) / 195) * 100}%` }} />
        <label className={styles.check}>
          <input type="checkbox" checked={storage} onChange={(e) => setStorage(e.target.checked)} />
          <span>Kèm pin lưu trữ</span>
        </label>
      </div>
      <dl className={styles.calcOut} aria-live="polite">
        <div><dt>Công suất gợi ý</dt><dd>{kwp} <small>kWp</small></dd></div>
        <div><dt>Tiết kiệm ước tính</dt><dd>{fmt.format(saving)} <small>triệu/tháng</small></dd></div>
        <div><dt>Vốn ước tính</dt><dd>{fmt.format(capex)} <small>triệu ₫</small></dd></div>
        <div><dt>Hoàn vốn</dt><dd>{fmt.format(payback)} <small>năm</small></dd></div>
      </dl>
      <p className={styles.fnote}>Công thức giả định, chỉ để minh hoạ giao diện tính toán, không dùng để ra quyết định đầu tư.</p>
    </div>
  );
}
