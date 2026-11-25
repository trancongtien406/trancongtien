"use client";

import { useState } from "react";
import { formatShort } from "../lib/dates";
import { formatVND } from "../lib/pricing";
import { getRoom } from "../lib/rooms";
import { useStay } from "./Provider";
import styles from "../brand.module.css";

function goPlanner() {
  const el = document.getElementById("lich-gia");
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.setTimeout(() => {
    document.querySelector<HTMLElement>('#lich-gia button[data-day][tabindex="0"]')?.focus({ preventScroll: true });
  }, reduce ? 0 : 700);
}

export function BookingBar() {
  const s = useStay();
  const [err, setErr] = useState<string | null>(null);
  const max = s.room === "tron-villa" ? 16 : getRoom(s.room).maxGuests * s.qty;

  function submit() {
    if (!s.checkIn || !s.checkOut) { setErr("Chọn ngày nhận và trả phòng trên lịch."); goPlanner(); return; }
    if (!s.quote.ok) { setErr(s.quote.error.message); goPlanner(); return; }
    setErr(null);
    goPlanner();
  }

  return (
    <div className={styles.book} role="group" aria-label="Tìm khoảng nghỉ của bạn" id="dat-nhanh">
      <p className={styles.bookTitle}>Tìm khoảng nghỉ của bạn</p>
      <button type="button" className={styles.bookField} onClick={goPlanner}>
        <span className={styles.bookLabel}>Nhận phòng</span>
        <span className={styles.bookVal}>{s.checkIn ? formatShort(s.checkIn) : "Chọn ngày"}</span>
      </button>
      <button type="button" className={styles.bookField} onClick={goPlanner}>
        <span className={styles.bookLabel}>Trả phòng</span>
        <span className={styles.bookVal}>{s.checkOut ? formatShort(s.checkOut) : "Chọn ngày"}</span>
      </button>
      <div className={`${styles.bookField} ${styles.bookGuests}`}>
        <label className={styles.bookLabel} htmlFor="hm-guests">Số khách</label>
        <select id="hm-guests" className={styles.bookSelect} value={Math.min(Math.max(s.guests, 1), 16)} onChange={(e) => s.setGuests(Number(e.target.value))}>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} khách{n > max ? " (vượt sức chứa)" : ""}</option>)}
        </select>
      </div>
      <div className={styles.bookTotal} aria-live="polite">
        <span className={styles.bookLabel}>Tạm tính</span>
        <span className={styles.bookVal}>{s.quote.ok ? formatVND(s.quote.quote.total) : "—"}</span>
      </div>
      <button type="button" className={styles.bookBtn} onClick={submit}>Xem phòng trống</button>
      {err ? <p className={styles.bookErr} role="alert">{err}</p> : <p className={styles.bookNote}>Chọn ngày và số khách để xem tình trạng phòng. Bước này chưa phát sinh đặt phòng.</p>}
    </div>
  );
}
