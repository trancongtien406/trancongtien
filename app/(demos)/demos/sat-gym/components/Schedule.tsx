"use client";

import { useId, useMemo, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { BANDS, bandOf, CLASS_TYPES, CLASSES, COACHES, DAYS, endTime, type Band, type ClassItem, type ClassType, type CoachId } from "../data/schedule";
import { Coach } from "./Coach";
import styles from "../brand.module.css";

const CONSULT = buildConsultHref("sat-gym");
const typeOf = (t: ClassType) => CLASS_TYPES.find((x) => x.id === t)!;
const coachOf = (c: CoachId) => COACHES.find((x) => x.id === c)!;
const summaryLine = (c: ClassItem) => `${DAYS[c.day]} ${c.start}-${endTime(c.start, c.minutes)}, ${typeOf(c.type).label}, ${coachOf(c.coach).nick}`;

export function Schedule() {
  const uid = useId().replace(/:/g, "");
  const [type, setType] = useState<ClassType | "all">("all");
  const [band, setBand] = useState<Band | "all">("all");
  const [coach, setCoach] = useState<CoachId | "all">("all");
  const [picked, setPicked] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  const list = useMemo(
    () => CLASSES.filter((c) => (type === "all" || c.type === type) && (band === "all" || bandOf(c.start) === band) && (coach === "all" || c.coach === coach)),
    [type, band, coach],
  );
  const byDay = DAYS.map((d, i) => ({ d, i, items: list.filter((c) => c.day === i).sort((a, b) => a.start.localeCompare(b.start)) }));
  const chosen = CLASSES.filter((c) => picked.includes(c.id)).sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
  const filtered = type !== "all" || band !== "all" || coach !== "all";
  const reset = () => { setType("all"); setBand("all"); setCoach("all"); };
  const toggle = (id: string) => { setCopied(""); setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])); };

  const copy = async () => {
    const text = `Lớp mình quan tâm tại SẬT Gym:\n${chosen.map((c) => `- ${summaryLine(c)}`).join("\n")}`;
    try { await navigator.clipboard.writeText(text); setCopied("Đã sao chép tóm tắt vào bộ nhớ tạm."); }
    catch { setCopied("Trình duyệt không cho sao chép. Hãy chọn và chép tay phần tóm tắt bên trên."); }
  };

  return (
    <section className={styles.sched} id="lich-lop" aria-labelledby="lich-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>06</span> Lịch lớp tuần</p>
          <h2 id="lich-title" className={styles.h2Big}>
            <OutlineSolid />
          </h2>
          <p className={styles.lede}>Lọc theo loại lớp, khung giờ và huấn luyện viên. Bấm Chọn lớp để gom những lớp bạn quan tâm, rồi gửi cho SẬT để được tư vấn. Khung giờ có thể điều chỉnh theo từng tuần và được xác nhận khi trao đổi.</p>
        </header>

        <div className={styles.coaches} role="radiogroup" aria-label="Huấn luyện viên">
          <label className={`${styles.coachCard} ${styles.coachAll}`}>
            <input type="radio" name={`${uid}-coach`} checked={coach === "all"} onChange={() => setCoach("all")} />
            <span><b>Tất cả HLV</b><small>Mọi lớp trong tuần</small></span>
          </label>
          {COACHES.map((c) => (
            <label key={c.id} className={styles.coachCard}>
              <input type="radio" name={`${uid}-coach`} checked={coach === c.id} onChange={() => setCoach(c.id)} aria-label={`${c.nick}, ${c.role}`} />
              <span>
                <Coach id={c.id} size={64} />
                <b>{c.nick}</b><small>{c.role}</small>
              </span>
            </label>
          ))}
        </div>

        <div className={styles.filters}>
          <fieldset>
            <legend>Loại lớp</legend>
            <div className={styles.pills} role="radiogroup" aria-label="Loại lớp">
              {[{ id: "all" as const, label: "Tất cả" }, ...CLASS_TYPES].map((t) => (
                <label key={t.id} className={styles.pill}>
                  <input type="radio" name={`${uid}-type`} checked={type === t.id} onChange={() => setType(t.id)} /><span>{t.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Khung giờ</legend>
            <div className={styles.pills} role="radiogroup" aria-label="Khung giờ">
              {[{ id: "all" as const, label: "Cả ngày", range: "" }, ...BANDS].map((b) => (
                <label key={b.id} className={styles.pill}>
                  <input type="radio" name={`${uid}-band`} checked={band === b.id} onChange={() => setBand(b.id)} /><span>{b.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <p className={styles.count} role="status">
          {list.length ? `Hiển thị ${list.length} lớp trong tuần${filtered ? " theo bộ lọc" : ""}.` : "Không có lớp nào khớp bộ lọc."}
          {filtered ? <button type="button" className={styles.linkBtn} onClick={reset}>Xoá bộ lọc</button> : null}
        </p>

        {list.length === 0 ? (
          <div className={styles.emptyRow}>
            <h3>Chưa có lớp khớp</h3>
            <p>Thử bỏ bớt một bộ lọc, hoặc gửi yêu cầu để được tư vấn khung giờ phù hợp.</p>
            <button type="button" className={`${styles.btn} ${styles.btnAcid} ${styles.btnLg}`} onClick={reset}>Xoá bộ lọc</button>
          </div>
        ) : (
          <div className={styles.week}>
            {byDay.filter((d) => d.items.length).map(({ d, i, items }) => (
              <section key={d} className={styles.day} aria-labelledby={`${uid}-d${i}`}>
                <h3 id={`${uid}-d${i}`}>{d}</h3>
                <ul>
                  {items.map((c) => {
                    const on = picked.includes(c.id);
                    const t = typeOf(c.type), co = coachOf(c.coach);
                    return (
                      <li key={c.id} className={styles.cls} data-type={c.type} data-on={on ? "1" : "0"}>
                        <p className={styles.clsTime}><b>{c.start}</b><span>{endTime(c.start, c.minutes)}</span></p>
                        <p className={styles.clsType}>{t.short}</p>
                        <p className={styles.clsMeta}>{co.nick} · {c.minutes} phút<br />{c.level}</p>
                        <button type="button" className={styles.clsBtn} aria-pressed={on} onClick={() => toggle(c.id)} aria-label={`${on ? "Bỏ chọn" : "Chọn"} lớp ${t.label} ${d} ${c.start}`}>
                          {on ? "Đã chọn" : "Chọn lớp"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}

        <div className={styles.summary} aria-live="polite">
          <h3>Tóm tắt lớp bạn quan tâm</h3>
          {chosen.length === 0 ? (
            <p className={styles.sumEmpty}>Chưa chọn lớp nào. Bấm Chọn lớp ở bất kỳ thẻ nào để gom vào đây.</p>
          ) : (
            <ul className={styles.sumList} data-testid="summary">
              {chosen.map((c) => (
                <li key={c.id}>
                  <span>{summaryLine(c)}</span>
                  <button type="button" onClick={() => toggle(c.id)} aria-label={`Bỏ ${summaryLine(c)}`}>Bỏ</button>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.sumBtns}>
            <a className={`${styles.btn} ${styles.btnAcid} ${styles.btnLg}`} href={CONSULT} data-shake>Tư vấn lịch tập</a>
            <button type="button" className={`${styles.btn} ${styles.btnGhostInk} ${styles.btnLg}`} onClick={copy} disabled={!chosen.length}>Sao chép tóm tắt</button>
          </div>
          {copied ? <p className={styles.small} role="status">{copied}</p> : null}
          <p className={styles.small}>Tóm tắt chỉ nằm trong trình duyệt của bạn. Nhận tư vấn là bước gửi thông tin thật tới SẬT, nơi xác nhận lịch và chỗ.</p>
        </div>
      </div>
    </section>
  );
}

function OutlineSolid() {
  return (
    <>
      <span className={styles.h2Solid}>Cùng tập.</span>
      <span className={styles.h2OutInk}>Khác mức độ.</span>
    </>
  );
}
