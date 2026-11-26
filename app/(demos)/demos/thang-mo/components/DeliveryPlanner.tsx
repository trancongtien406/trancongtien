"use client";

import { useEffect, useId, useState } from "react";
import styles from "../brand.module.css";
import { PACKAGES, type PackageId } from "../data/content";

const fmt = (d: Date) => new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
const add = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Lịch giao ảnh: từ ngày chụp dự kiến + gói, ước tính ngày nhận ảnh chỉnh sửa và album. Không gửi dữ liệu. */
export function DeliveryPlanner() {
  const id = useId();
  const [pkg, setPkg] = useState<PackageId>("TM-P02");
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  useEffect(() => { setToday(iso(new Date())); }, []);
  const p = PACKAGES.find((x) => x.id === pkg) ?? PACKAGES[1];
  const err = date && today && date < today ? "Ngày chụp dự kiến không được ở quá khứ." : "";
  const valid = !!date && !err;
  const base = valid ? new Date(`${date}T00:00:00`) : null;
  const [lo, hi] = p.deliveryDays;
  const hasAlbum = !/Không bao gồm/.test(p.album);
  const pick = base ? add(base, 7) : null;
  const edit = base ? [add(base, lo), add(base, hi)] : null;
  const alb = base && hasAlbum ? [add(base, lo + 10), add(base, hi + 19)] : null;
  const span = hasAlbum ? hi + 19 : hi;
  const pct = (n: number) => `${Math.min(100, (n / span) * 100)}%`;
  return (
    <div className={styles.dp} data-tm="planner">
      <div className={styles.dpForm}>
        <div className={styles.dpField}>
          <label htmlFor={`${id}-p`}>Gói chụp</label>
          <select id={`${id}-p`} value={pkg} onChange={(e) => setPkg(e.target.value as PackageId)}>
            {PACKAGES.map((x) => <option key={x.id} value={x.id}>{x.kind}: {x.name}</option>)}
          </select>
        </div>
        <div className={styles.dpField}>
          <label htmlFor={`${id}-d`}>Ngày chụp dự kiến</label>
          <input id={`${id}-d`} type="date" min={today || undefined} value={date} onChange={(e) => setDate(e.target.value)} aria-invalid={err ? true : undefined} aria-describedby={err ? `${id}-e` : undefined} />
          {err && <p id={`${id}-e`} className={styles.fieldErr} role="alert">{err}</p>}
        </div>
      </div>
      <div className={styles.dpOut} aria-live="polite">
        {!valid ? (
          <p className={styles.small} data-tm="planner-empty">Chọn ngày chụp dự kiến để xem các mốc: chọn ảnh, nhận ảnh chỉnh sửa{hasAlbum ? " và nhận album in" : ""}.</p>
        ) : (
          <>
            <div className={styles.dpBar} aria-hidden="true">
              <span className={styles.dpTrack} />
              <span className={styles.dpSpan} style={{ left: pct(lo), width: `calc(${pct(hi)} - ${pct(lo)})` }} />
              {alb && <span className={`${styles.dpSpan} ${styles.dpSpanAlb}`} style={{ left: pct(lo + 10), width: `calc(${pct(hi + 19)} - ${pct(lo + 10)})` }} />}
              <i style={{ left: "0%" }} /><i style={{ left: pct(7) }} />
            </div>
            <ol className={styles.dpList} data-tm="planner-out">
              <li><b>{fmt(base!)}</b><span>Ngày chụp</span></li>
              <li><b>Trước {fmt(pick!)}</b><span>Hai bạn chọn xong ảnh (trong 7 ngày)</span></li>
              <li><b>{fmt(edit![0])} đến {fmt(edit![1])}</b><span>Nhận ảnh chỉnh sửa qua link ({lo}–{hi} ngày)</span></li>
              {alb && <li><b>{fmt(alb[0])} đến {fmt(alb[1])}</b><span>Nhận album in, gồm duyệt layout và in</span></li>}
            </ol>
            <p className={styles.helper}>Ước tính theo ngày dương lịch, chưa tính dịp lễ. Chỉ chạy trên trình duyệt, không đặt lịch thật.</p>
          </>
        )}
      </div>
    </div>
  );
}
