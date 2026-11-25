"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addDays, addMonths, compareISO, daysInMonth, formatShort, formatVN, makeISO, monthIndex, type ISODate, weekdayMon0, weekdayName } from "../lib/dates";
import { dayStatus, DEMO_TODAY, LAST_BOOKABLE } from "../lib/availability";
import { nightRate, holidayName } from "../lib/pricing";
import { canCheckout } from "../lib/selection";
import { useStay } from "./Provider";
import { useMedia } from "./useMedia";
import styles from "../brand.module.css";

const MONTH_NAMES = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
const WD = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const T0 = { y: Number(DEMO_TODAY.slice(0, 4)), m: Number(DEMO_TODAY.slice(5, 7)) };
const T1 = { y: Number(LAST_BOOKABLE.slice(0, 4)), m: Number(LAST_BOOKABLE.slice(5, 7)) };
const MIN_IDX = monthIndex(T0.y, T0.m);
const MAX_IDX = monthIndex(T1.y, T1.m);

function statusText(s: ReturnType<typeof dayStatus>): string {
  switch (s) {
    case "open": return "còn phòng";
    case "few": return "sắp kín, còn ít phòng";
    case "full": return "đã kín";
    case "past": return "đã qua";
    default: return "chưa mở đặt";
  }
}

export function Calendar() {
  const { room, checkIn, checkOut, clickDay, clear, notice, dismiss } = useStay();
  const wide = useMedia("(min-width: 960px)");
  const count = wide ? 2 : 1;
  const [view, setView] = useState({ y: T0.y, m: T0.m });
  const [focusDay, setFocusDay] = useState<ISODate>(DEMO_TODAY);
  const [hover, setHover] = useState<ISODate | null>(null);
  const wantFocus = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const startIdx = Math.min(monthIndex(view.y, view.m), MAX_IDX - (count - 1));
  const months = useMemo(() => Array.from({ length: count }, (_, i) => addMonths(Math.floor(startIdx / 12), (startIdx % 12) + 1, i)), [count, startIdx]);
  const visibleFirst = makeISO(months[0].year, months[0].month, 1);
  const visibleLast = makeISO(months[count - 1].year, months[count - 1].month, daysInMonth(months[count - 1].year, months[count - 1].month));

  // Ô được phép nhận tab: focusDay nếu đang hiển thị, ngược lại ngày đầu tiên của tháng đầu.
  const tabDay = compareISO(focusDay, visibleFirst) >= 0 && compareISO(focusDay, visibleLast) <= 0 ? focusDay : compareISO(DEMO_TODAY, visibleFirst) > 0 ? DEMO_TODAY : visibleFirst;

  const shift = useCallback((delta: number) => {
    const next = monthIndex(view.y, view.m) + delta;
    const clamped = Math.max(MIN_IDX, Math.min(MAX_IDX - (count - 1), next));
    setView({ y: Math.floor(clamped / 12), m: (clamped % 12) + 1 });
  }, [view, count]);

  const moveFocus = useCallback((iso: ISODate) => {
    if (compareISO(iso, DEMO_TODAY) < 0 || compareISO(iso, LAST_BOOKABLE) > 0) return;
    setFocusDay(iso);
    const idx = monthIndex(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)));
    if (idx < startIdx) setView({ y: Math.floor(idx / 12), m: (idx % 12) + 1 });
    else if (idx > startIdx + count - 1) { const s = idx - (count - 1); setView({ y: Math.floor(s / 12), m: (s % 12) + 1 }); }
    wantFocus.current = true;
  }, [startIdx, count]);

  useEffect(() => {
    if (!wantFocus.current) return;
    wantFocus.current = false;
    rootRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`)?.focus();
  }, [focusDay, view, count]);

  function onKey(e: React.KeyboardEvent, iso: ISODate) {
    let next: ISODate | null = null;
    switch (e.key) {
      case "ArrowLeft": next = addDays(iso, -1); break;
      case "ArrowRight": next = addDays(iso, 1); break;
      case "ArrowUp": next = addDays(iso, -7); break;
      case "ArrowDown": next = addDays(iso, 7); break;
      case "Home": next = addDays(iso, -weekdayMon0(iso)); break;
      case "End": next = addDays(iso, 6 - weekdayMon0(iso)); break;
      case "PageUp": { const p = addMonths(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), e.shiftKey ? -12 : -1); next = makeISO(p.year, p.month, Math.min(Number(iso.slice(8, 10)), daysInMonth(p.year, p.month))); break; }
      case "PageDown": { const p = addMonths(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), e.shiftKey ? 12 : 1); next = makeISO(p.year, p.month, Math.min(Number(iso.slice(8, 10)), daysInMonth(p.year, p.month))); break; }
      case "Escape": if (checkIn) { e.preventDefault(); clear(); } return;
      default: return;
    }
    e.preventDefault();
    if (next) {
      if (compareISO(next, DEMO_TODAY) < 0) next = DEMO_TODAY;
      if (compareISO(next, LAST_BOOKABLE) > 0) next = LAST_BOOKABLE;
      moveFocus(next);
    }
  }

  const previewEnd = checkIn && !checkOut ? hover : null;
  const atMin = monthIndex(months[0].year, months[0].month) <= MIN_IDX;
  const atMax = monthIndex(months[count - 1].year, months[count - 1].month) >= MAX_IDX;

  return (
    <div className={styles.cal} ref={rootRef}>
      <div className={styles.calHead}>
        <button type="button" className={styles.calNav} onClick={() => shift(-1)} disabled={atMin} aria-label="Tháng trước">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <p className={styles.calRange} aria-live="polite">
          {checkIn ? <><b>{formatShort(checkIn)}</b><span aria-hidden="true"> → </span><b>{checkOut ? formatShort(checkOut) : "chọn ngày trả"}</b></> : <span>Chọn ngày nhận phòng</span>}
        </p>
        <button type="button" className={styles.calNav} onClick={() => shift(1)} disabled={atMax} aria-label="Tháng sau">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div className={styles.calMonths} data-count={count}>
        {months.map(({ year, month }) => {
          const lead = weekdayMon0(makeISO(year, month, 1));
          const dim = daysInMonth(year, month);
          return (
            <div key={`${year}-${month}`} className={styles.calMonth}>
              <h3 className={styles.calTitle} id={`cal-${year}-${month}`}>{MONTH_NAMES[month - 1]} {year}</h3>
              <div role="grid" aria-labelledby={`cal-${year}-${month}`} className={styles.calGrid}>
                <div role="row" className={styles.calRow}>
                  {WD.map((w) => <span key={w} role="columnheader" className={styles.calWd}>{w}</span>)}
                </div>
                <div className={styles.calDays}>
                  {Array.from({ length: lead }, (_, i) => <span key={`b${i}`} role="gridcell" aria-hidden="true" />)}
                  {Array.from({ length: dim }, (_, i) => {
                    const iso = makeISO(year, month, i + 1);
                    const st = dayStatus(room, iso);
                    const isStart = iso === checkIn;
                    const isEnd = iso === checkOut;
                    const end = checkOut ?? previewEnd;
                    const inRange = !!checkIn && !!end && compareISO(iso, checkIn) > 0 && compareISO(iso, end) < 0;
                    const coOK = canCheckout(room, checkIn && !checkOut ? checkIn : null, iso);
                    const dead = st === "past" || st === "out-of-range";
                    const full = st === "full" && !coOK;
                    const hol = holidayName(iso);
                    const rate = dead ? null : nightRate(room, iso);
                    const label = `${weekdayName(iso)}, ${formatVN(iso)}, ${st === "full" && coOK ? "đã kín nhưng có thể chọn làm ngày trả phòng" : statusText(st)}${hol ? `, ${hol}` : ""}${isStart ? ", ngày nhận phòng" : ""}${isEnd ? ", ngày trả phòng" : ""}${iso === DEMO_TODAY ? ", hôm nay" : ""}`;
                    const cls = [
                      styles.day,
                      st === "few" ? styles.dayFew : "",
                      full || (st === "full" && !coOK) ? styles.dayFull : "",
                      dead ? styles.dayDead : "",
                      inRange ? styles.dayIn : "",
                      isStart ? styles.dayStart : "",
                      isEnd ? styles.dayEnd : "",
                      checkIn && (isEnd || (previewEnd && iso === previewEnd)) ? styles.dayTail : "",
                      hol ? styles.dayHol : "",
                      iso === DEMO_TODAY ? styles.dayToday : "",
                    ].join(" ");
                    return (
                      <span role="gridcell" key={iso} className={styles.dayCell}>
                        <button
                          type="button"
                          className={cls}
                          data-day={iso}
                          data-status={st}
                          tabIndex={iso === tabDay ? 0 : -1}
                          disabled={dead}
                          aria-disabled={st === "full" && !coOK ? true : undefined}
                          aria-pressed={isStart || isEnd}
                          aria-label={label}
                          onClick={() => { setFocusDay(iso); clickDay(iso); }}
                          onKeyDown={(e) => onKey(e, iso)}
                          onFocus={() => setFocusDay(iso)}
                          onMouseEnter={() => setHover(iso)}
                          onMouseLeave={() => setHover(null)}
                        >
                          <span className={styles.dayNum}>{i + 1}</span>
                          {rate !== null && st !== "full" ? <span className={styles.dayRate} aria-hidden="true">{(rate / 1_000_000).toFixed(1).replace(".", ",")}tr</span> : null}
                          {st === "full" && !coOK ? <span className={styles.dayRate} aria-hidden="true">kín</span> : null}
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ul className={styles.legend} aria-label="Chú giải">
        <li><i className={`${styles.sw} ${styles.swOpen}`} />Còn phòng</li>
        <li><i className={`${styles.sw} ${styles.swFew}`} />Sắp kín</li>
        <li><i className={`${styles.sw} ${styles.swFull}`} />Đã kín</li>
        <li><i className={`${styles.sw} ${styles.swSel}`} />Ngày chọn</li>
        <li><i className={`${styles.sw} ${styles.swHol}`} />Dịp lễ, Tết</li>
      </ul>
      <p className={styles.calHelp}>Dùng phím mũi tên để di chuyển, Enter để chọn, PageUp/PageDown đổi tháng, Esc để bỏ chọn. Số trên mỗi ô là giá đêm (triệu đồng) của loại phòng đang chọn.</p>

      <div className={styles.noticeSlot} role="status" aria-live="polite">
        {notice ? (
          <p className={styles.notice}>
            <span>{notice}</span>
            <button type="button" onClick={dismiss}>Đã hiểu</button>
          </p>
        ) : null}
      </div>
    </div>
  );
}
