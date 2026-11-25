"use client";

import { useId, useState } from "react";
import { addDays, formatShort, formatVN } from "../lib/dates";
import { maxStayFrom, nextOpenNight } from "../lib/availability";
import { computeQuote, formatVND, SEASON_LABEL } from "../lib/pricing";
import { getRoom, ROOMS } from "../lib/rooms";
import { buildConsultHref } from "@/features/showroom/consultation";
import { useStay } from "./Provider";
import styles from "../brand.module.css";

const FROM: Record<string, string> = { "bien-go": "2.040.000", "hien-sang": "2.640.000", "suite-ho-boi": "3.910.000", "tron-villa": "16.830.000" };
const NAMES: Record<string, string> = { "bien-go": "Hiên Biển", "hien-sang": "Hiên Bình Minh", "suite-ho-boi": "Suite Hồ Bơi", "tron-villa": "Bao trọn villa" };

function Stepper({ label, value, min, max, onChange, id, disabled, hint }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; id: string; disabled?: boolean; hint?: string }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>{label}</label>
      <div className={styles.stepper}>
        <button type="button" aria-label={`Giảm ${label.toLowerCase()}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={disabled || value <= min}>−</button>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={Number.isFinite(value) ? String(value) : ""}
          disabled={disabled}
          aria-describedby={hint ? `${id}-h` : undefined}
          onChange={(e) => { const n = parseInt(e.target.value.replace(/\D/g, ""), 10); onChange(Number.isNaN(n) ? 0 : n); }}
        />
        <button type="button" aria-label={`Tăng ${label.toLowerCase()}`} onClick={() => onChange(Math.min(max + 20, value + 1))} disabled={disabled}>+</button>
      </div>
      {hint ? <span id={`${id}-h`} className={styles.fieldHint}>{hint}</span> : null}
    </div>
  );
}

export function Calculator() {
  const s = useStay();
  const uid = useId();
  const type = getRoom(s.room);
  const q = s.quote;
  const [msg, setMsg] = useState("");
  const capacity = (s.room === "tron-villa" ? 1 : s.qty) * type.maxGuests;
  const guestErr = !(Number.isInteger(s.guests) && s.guests >= 1 && s.guests <= capacity);

  return (
    <div className={styles.calc}>
      <fieldset className={styles.roomPick}>
        <legend className={styles.fieldLabel}>Loại phòng</legend>
        {ROOMS.map((r) => (
          <label key={r.id} className={styles.roomOpt} data-on={s.room === r.id}>
            <input type="radio" name={`${uid}-room`} value={r.id} checked={s.room === r.id} onChange={() => s.setRoom(r.id)} />
            <span className={styles.roomOptName}>{NAMES[r.id]}</span>
            <span className={styles.roomOptPrice}>từ {FROM[r.id]}&nbsp;₫</span>
          </label>
        ))}
      </fieldset>

      <div className={styles.fieldRow}>
        <Stepper id={`${uid}-qty`} label="Số phòng" value={s.room === "tron-villa" ? 1 : s.qty} min={1} max={type.units} onChange={(n) => s.setQty(Math.min(type.units, Math.max(1, n)))} disabled={s.room === "tron-villa"} hint={s.room === "tron-villa" ? "Bao trọn dùng cả 7 phòng" : `Tối đa ${type.units}`} />
        <div className={styles.field}>
          <Stepper id={`${uid}-g`} label="Số khách" value={s.guests} min={1} max={capacity} onChange={s.setGuests} hint={`Gồm ${s.room === "tron-villa" ? type.baseGuests : type.baseGuests * s.qty} khách, tối đa ${capacity}`} />
          {guestErr ? <p className={styles.fieldErr} role="alert">Số khách phải từ 1 đến {capacity}.</p> : null}
        </div>
      </div>

      <div className={styles.dateSum}>
        <div><span className={styles.fieldLabel}>Nhận phòng</span><b>{s.checkIn ? formatShort(s.checkIn) : "Chưa chọn"}</b></div>
        <div><span className={styles.fieldLabel}>Trả phòng</span><b>{s.checkOut ? formatShort(s.checkOut) : "Chưa chọn"}</b></div>
        <button type="button" className={styles.linkBtn} onClick={s.clear} disabled={!s.checkIn}>Xoá ngày</button>
      </div>

      <div className={styles.result} aria-live="polite" aria-atomic="false">
        {q.ok ? (
          <>
            <p className={styles.totalLabel}>Tạm tính {q.quote.nights} đêm · {formatVN(q.quote.checkIn)} → {formatVN(q.quote.checkOut)}</p>
            <p className={styles.total}>{formatVND(q.quote.total)}</p>
            <p className={styles.totalSub}>Trung bình {formatVND(q.quote.perNight)} / đêm, đã gồm phí và giảm giá. Giá tham khảo.</p>

            <div className={styles.tableWrap} role="region" aria-label="Chi tiết từng đêm" tabIndex={0}>
              <table className={styles.nightTable}>
                <caption className={styles.srOnly}>Giá từng đêm</caption>
                <thead><tr><th scope="col">Đêm</th><th scope="col">Mùa</th><th scope="col">Giá</th></tr></thead>
                <tbody>
                  {q.quote.lines.map((l) => (
                    <tr key={l.date}>
                      <th scope="row">{formatShort(l.date)}</th>
                      <td>{l.holiday ?? SEASON_LABEL[l.season]}{l.weekend ? " · cuối tuần" : ""}</td>
                      <td className={styles.num}>{formatVND(l.rate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className={styles.sumList}>
              <div><dt>Tiền phòng ({q.quote.nights} đêm{q.quote.qty > 1 ? ` × ${q.quote.qty} phòng` : ""})</dt><dd>{formatVND(q.quote.roomSubtotal)}</dd></div>
              {q.quote.discount > 0 ? <div className={styles.sumGood}><dt>Giảm giá ở dài ngày ({q.quote.discountPct}%)</dt><dd>−{formatVND(q.quote.discount)}</dd></div> : null}
              {q.quote.extraTotal > 0 ? <div><dt>Phụ thu {q.quote.extraGuests} khách thêm</dt><dd>{formatVND(q.quote.extraTotal)}</dd></div> : null}
              <div><dt>Phí dịch vụ 5%</dt><dd>{formatVND(q.quote.service)}</dd></div>
              <div><dt>Phí vệ sinh (một lần)</dt><dd>{formatVND(q.quote.cleaning)}</dd></div>
              <div className={styles.sumTotal}><dt>Tổng</dt><dd>{formatVND(q.quote.total)}</dd></div>
            </dl>
          </>
        ) : (
          <div className={styles.empty} data-code={q.error.code}>
            <p className={styles.emptyTitle}>{q.error.code === "no-dates" ? "Chưa có ngày để tính" : "Chưa thể tính giá"}</p>
            <p>{q.error.message}</p>
            {q.error.code === "blocked" && s.checkIn ? (() => {
              const first = q.error.nights?.[0];
              const up = maxStayFrom(s.room, s.checkIn);
              const next = first ? nextOpenNight(s.room, addDays(first, 1)) : null;
              const alts = s.checkOut ? ROOMS.filter((r) => r.id !== s.room && computeQuote({ room: r.id, checkIn: s.checkIn, checkOut: s.checkOut, guests: s.guests, qty: Math.min(s.qty, r.units) }).ok) : [];
              return (
                <ul className={styles.emptyList}>
                  {first ? <li>Đêm kín đầu tiên: <b>{formatVN(first)}</b>.</li> : null}
                  {up >= 1 ? <li>Từ {formatVN(s.checkIn)} bạn ở được tối đa <b>{up} đêm</b> liên tiếp.</li> : null}
                  {next ? <li>Ngày trống kế tiếp: <b>{formatVN(next)}</b>.</li> : null}
                  {alts.length ? <li className={styles.altRooms}>Loại phòng khác còn trống cho khoảng này: {alts.map((r) => <button key={r.id} type="button" className={styles.btnSmall} onClick={() => s.setRoom(r.id)}>Đổi sang {NAMES[r.id]}</button>)}</li> : null}
                </ul>
              );
            })() : null}
            {q.error.code === "min-nights" && s.checkIn && q.error.minNights ? (
              <button type="button" className={styles.btnSmall} onClick={() => s.setRange(s.checkIn as string, addDays(s.checkIn as string, q.error.minNights as number))}>
                Kéo dài thành {q.error.minNights} đêm
              </button>
            ) : null}
          </div>
        )}
      </div>

      <div className={styles.planBtns}>
        <button type="button" className={styles.btnLine} disabled={!q.ok} onClick={() => setMsg(s.savePlan() ? "Kế hoạch đã được lưu trên thiết bị này." : "Không lưu được: trình duyệt đang chặn lưu trữ.")}>Lưu kế hoạch</button>
        <button type="button" className={styles.btnLine} disabled={!q.ok} onClick={async () => {
          if (!q.ok) return;
          const t = `${NAMES[q.quote.room]} · ${formatVN(q.quote.checkIn)} → ${formatVN(q.quote.checkOut)} · ${q.quote.nights} đêm · ${q.quote.guests} khách · tạm tính ${formatVND(q.quote.total)} (giá tham khảo, Hiên Mặn Villa)`;
          try { await navigator.clipboard.writeText(t); setMsg("Đã sao chép tóm tắt kế hoạch."); } catch { setMsg("Không sao chép được. Hãy chọn và chép thủ công."); }
        }}>Sao chép tóm tắt</button>
        {s.hasSaved ? <button type="button" className={styles.linkBtn} onClick={() => { s.forgetPlan(); setMsg("Đã xoá kế hoạch đã lưu."); }}>Xoá kế hoạch đã lưu</button> : null}
      </div>
      <p className={styles.planMsg} role="status">{msg}</p>

      <a className={styles.btnPrimary} href={buildConsultHref("hien-man")}>Nhận tư vấn website cho villa của bạn</a>
      <p className={styles.legal}>Công cụ chỉ tính tạm trong trang, không giữ phòng và không gửi dữ liệu đi đâu. Nút trên đưa bạn tới form tư vấn của website chính.</p>
    </div>
  );
}
