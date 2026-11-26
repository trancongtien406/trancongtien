"use client";

import { useMemo, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { NumberTicker } from "@/features/showroom/effects";
import { CLASSES, DAYS, LANGS, LEVELS, PRICES, SLOTS, SLUG, MASCOTS, type ClassItem, type Lang, type Slot } from "../data/content";
import { useClasses, type Filters } from "./ClassContext";
import { Mascot } from "./Mascot";
import styles from "../brand.module.css";

const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const langName = (l: Lang) => LANGS.find((x) => x.id === l)!.name;
const priceOf = (lang: Lang, level: number) => PRICES.find((p) => p.lang === lang)!.rows[level <= 2 ? 0 : level <= 4 ? 1 : 2].price;
const slotOf = (s: Slot) => SLOTS.find((x) => x.id === s)!;
const dayText = (days: number[]) => days.map((d) => DAYS.find((x) => x.n === d)!.short).join(" · ");
const parse = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const fmtDate = (iso: string) => { const d = parse(iso); return `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`; };
const DOW = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const dowLong = (iso: string) => DOW[parse(iso).getUTCDay()];

/** Sơ đồ chỗ ngồi quanh bàn: mỗi ghế bật dần, chốt bằng bộ đếm sĩ số tối đa. */
function SeatMap({ n }: { n: number }) {
  const cx = 110, cy = 62, rx = 84, ry = 48;
  return (
    <figure className={styles.seatFig} data-fx="SeatMap" data-fx-ready="1">
      <svg viewBox="0 0 220 124" className={styles.seatSvg} role="img" aria-label={`Sơ đồ lớp: ${n} chỗ ngồi quanh bàn`}>
        <ellipse cx={cx} cy={cy} rx={52} ry={22} className={styles.seatTable} />
        <text x={cx} y={cy + 4} textAnchor="middle" className={styles.seatTeacher}>Giáo viên</text>
        {Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={cx + rx * Math.cos(a)} cy={cy + ry * Math.sin(a)} r={8.5} className={styles.seat} style={{ animationDelay: `${i * 55}ms` }} />;
        })}
      </svg>
      <figcaption>
        Sĩ số tối đa <b><NumberTicker value={n} className={styles.seatNum} /></b> học viên. Số chỗ còn trống xác nhận khi tư vấn.
      </figcaption>
    </figure>
  );
}

/** Lịch khai giảng: thẻ ngày, bấm để chọn lớp trong thời khoá biểu. */
function Openings() {
  const { filters, setFilters, selected, setSelected } = useClasses();
  const sorted = useMemo(() => [...CLASSES].sort((a, b) => a.start.localeCompare(b.start)), []);
  const pick = (c: ClassItem) => {
    const inList = (filters.lang === "all" || c.lang === filters.lang) && (!filters.level || c.level === filters.level) && (filters.slot === "all" || c.slot === filters.slot);
    if (!inList) setFilters({ lang: "all", level: 0, slot: "all" });
    setSelected(c.id);
    document.getElementById("lich-lop")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  return (
    <div className={styles.openings} data-fx="OpeningCalendar" data-fx-ready="1">
      <div className={styles.toolHead}>
        <h3 className={styles.h3}>Các lớp sắp khai giảng</h3>
        <p>Xếp theo ngày khai giảng, từ gần đến xa. Bấm một thẻ để xem lớp đó trong thời khoá biểu bên dưới.</p>
      </div>
      <ol className={styles.openList}>
        {sorted.map((c, i) => (
          <li key={c.id} style={{ ["--i" as string]: i }}>
            <button type="button" className={styles.openCard} data-lang={c.lang} aria-pressed={selected === c.id} onClick={() => pick(c)}>
              <span className={styles.openDate}>
                <b>{parse(c.start).getUTCDate()}</b>
                <small>Th{parse(c.start).getUTCMonth() + 1}</small>
              </span>
              <span className={styles.openBody}>
                <span className={styles.openTitle}>{c.title}</span>
                <span className={styles.openMeta}>{langName(c.lang)} · Cấp {c.level} · {dowLong(c.start)}</span>
                <span className={styles.openMeta}>{dayText(c.days)} · {slotOf(c.slot).time}</span>
              </span>
              <span className={styles.openSeats}>{c.seats} chỗ</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------ Lịch lớp */
function Chip({ c, on, onPick }: { c: ClassItem; on: boolean; onPick: (id: string) => void }) {
  return (
    <button type="button" className={styles.chipBtn} data-lang={c.lang} aria-pressed={on} onClick={() => onPick(c.id)}>
      <span className={styles.chipLang}>{LANGS.find((l) => l.id === c.lang)!.tag}</span>
      <span className={styles.chipTitle}>{c.title}</span>
      <span className={styles.chipLv}>Cấp {c.level}</span>
    </button>
  );
}

function Timetable() {
  const { filters, setFilters, selected, setSelected } = useClasses();
  const [copied, setCopied] = useState("");
  const list = useMemo(
    () => CLASSES.filter((c) => (filters.lang === "all" || c.lang === filters.lang) && (!filters.level || c.level === filters.level) && (filters.slot === "all" || c.slot === filters.slot)),
    [filters],
  );
  const active = list.find((c) => c.id === selected) ?? null;
  const reset = () => { setFilters({ lang: "all", level: 0, slot: "all" }); setSelected(null); };
  const mascot = active ? MASCOTS.find((m) => m.id === active.mascot)! : null;
  const summary = active
    ? `${langName(active.lang)} · Cấp ${active.level} (${LEVELS[active.level - 1].name}) · Lớp ${active.title} · ${dayText(active.days)} lúc ${slotOf(active.slot).time} · Khai giảng ${fmtDate(active.start)} · Sĩ số tối đa ${active.seats} · Học phí tham khảo ${money.format(priceOf(active.lang, active.level))} / khoá 24 buổi`
    : "";

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied("Đã chép tóm tắt."); }
    catch { setCopied("Chưa chép được, bạn hãy bôi đen đoạn trên và sao chép thủ công."); }
  };

  return (
    <div className={styles.toolCard} data-tool="schedule" id="lich-lop">
      <div className={styles.toolHead}>
        <h3 className={styles.h3}>Thời khoá biểu các lớp</h3>
        <p>Lọc theo ngôn ngữ, cấp độ và khung giờ, rồi chọn một lớp để xem ngày khai giảng, sĩ số và học phí. Tư vấn viên xác nhận lịch cuối cùng khi bạn đăng ký.</p>
      </div>
      <div className={styles.filters}>
        <div className={styles.filterGroup} role="group" aria-label="Lọc theo ngôn ngữ">
          {[{ id: "all", name: "Tất cả" }, ...LANGS].map((l) => (
            <button key={l.id} type="button" className={styles.fBtn} aria-pressed={filters.lang === l.id} onClick={() => setFilters({ ...filters, lang: l.id as Filters["lang"] })}>{l.name}</button>
          ))}
        </div>
        <div className={styles.filterGroup} role="group" aria-label="Lọc theo cấp độ">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" className={styles.fBtn} aria-pressed={filters.level === n} onClick={() => setFilters({ ...filters, level: n })}>{n === 0 ? "Mọi cấp" : `Cấp ${n}`}</button>
          ))}
        </div>
        <div className={styles.filterGroup} role="group" aria-label="Lọc theo khung giờ">
          {[{ id: "all", label: "Mọi giờ", time: "" }, ...SLOTS].map((s) => (
            <button key={s.id} type="button" className={styles.fBtn} aria-pressed={filters.slot === s.id} onClick={() => setFilters({ ...filters, slot: s.id as Filters["slot"] })}>{s.label}{s.time && <small> {s.time}</small>}</button>
          ))}
        </div>
      </div>
      <p className={styles.count} role="status">{list.length ? `Có ${list.length} lớp phù hợp.` : "Không có lớp nào khớp bộ lọc."}</p>

      {list.length === 0 ? (
        <div className={styles.empty}>
          <p>Chưa có lớp nào ở tổ hợp này. Thử nới cấp độ hoặc khung giờ, hoặc để lại nhu cầu khi tư vấn để trung tâm sắp lớp.</p>
          <button type="button" className={`${styles.btn} ${styles.btnNavy} ${styles.btnSm}`} onClick={reset}>Xoá bộ lọc</button>
        </div>
      ) : (
        <>
          <table className={styles.week}>
            <caption className={styles.srOnly}>Lịch lớp theo ngày và khung giờ</caption>
            <thead><tr><td />{DAYS.map((d) => <th key={d.n} scope="col">{d.short}<small>{d.long}</small></th>)}</tr></thead>
            <tbody>
              {SLOTS.map((s) => (
                <tr key={s.id}>
                  <th scope="row">{s.label}<small>{s.time}</small></th>
                  {DAYS.map((d) => (
                    <td key={d.n}>
                      {list.filter((c) => c.slot === s.id && c.days.includes(d.n)).map((c) => <Chip key={c.id} c={c} on={active?.id === c.id} onPick={setSelected} />)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.weekList}>
            {DAYS.map((d) => {
              const items = list.filter((c) => c.days.includes(d.n));
              if (!items.length) return null;
              return (
                <section key={d.n} className={styles.dayBlock} aria-label={d.long}>
                  <h4>{d.long}</h4>
                  {SLOTS.map((s) => {
                    const its = items.filter((c) => c.slot === s.id);
                    return its.length ? (
                      <div key={s.id} className={styles.slotRow}><span>{s.label} · {s.time}</span><div>{its.map((c) => <Chip key={c.id} c={c} on={active?.id === c.id} onPick={setSelected} />)}</div></div>
                    ) : null;
                  })}
                </section>
              );
            })}
          </div>
        </>
      )}

      <div className={styles.detail} aria-live="polite">
        {active && mascot ? (
          <>
            <div className={styles.detailTop}>
              <Mascot id={mascot.id} size={84} />
              <div>
                <p className={styles.levelTag}>{langName(active.lang)} · Cấp {active.level}</p>
                <h4 className={styles.h3}>{active.title}</h4>
                <p>{active.focus}</p>
                <p className={styles.dim}>{mascot.name} · {mascot.role}</p>
              </div>
            </div>
            <SeatMap key={active.id} n={active.seats} />
            <dl className={styles.facts}>
              <div><dt>Ngày học</dt><dd>{dayText(active.days)}</dd></div>
              <div><dt>Giờ học</dt><dd>{slotOf(active.slot).time}</dd></div>
              <div><dt>Khai giảng</dt><dd>{fmtDate(active.start)}</dd></div>
              <div><dt>Học phí tham khảo</dt><dd>{money.format(priceOf(active.lang, active.level))}<small> / 24 buổi</small></dd></div>
            </dl>
            <div className={styles.summary}>
              <h5 className={styles.h5}>Tóm tắt lựa chọn</h5>
              <p className={styles.summaryText}>{summary}</p>
              <div className={styles.resultBtns}>
                <a className={`${styles.btn} ${styles.btnYellow}`} href={buildConsultHref(SLUG)}>Nhờ tư vấn xếp lớp này</a>
                <button type="button" className={`${styles.btn} ${styles.btnGhostN}`} onClick={copy}>Chép tóm tắt</button>
              </div>
              <p className={styles.copied} role="status">{copied}</p>
            </div>
          </>
        ) : (
          <div className={styles.detailEmpty}>
            <p>{list.length ? "Chọn một lớp trong lịch để xem chi tiết và tạo tóm tắt." : "Chưa có lớp để chọn."}</p>
            <a className={`${styles.btn} ${styles.btnYellow}`} href={buildConsultHref(SLUG)}>Chưa chọn được, nhờ tư vấn</a>
          </div>
        )}
      </div>
    </div>
  );
}


export function Schedule() {
  return (
    <section id="khai-giang" className={`${styles.panel} ${styles.panelMist}`} aria-labelledby="sch-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Lịch khai giảng và thời khoá biểu</p>
        <h2 id="sch-title" className={styles.h2}>Lớp mới khai giảng từ tháng 12, học thử trước khi đóng phí.</h2>
        <p className={styles.lede}>Lớp học Thứ Hai đến Thứ Bảy, mỗi buổi 90 phút, ba khung giờ sáng, chiều, tối. Chọn một lớp để xem sĩ số và học phí.</p>
      </div>
      <div className={styles.schedStack}>
        <Openings />
        <Timetable />
      </div>
    </section>
  );
}
