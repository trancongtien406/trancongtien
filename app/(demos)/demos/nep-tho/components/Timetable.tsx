"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../brand.module.css";
import {
  CATEGORY_LABEL, CLASSES, DAYS, DAY_LONG, INSTRUCTORS, LEVEL_LABEL, WEEKS, availability, endTime, sessionsForWeek, vnd, weekDates,
  type Category, type InstructorId, type Level, type Session,
} from "../data/classes";

type Filters = { category: Category | "all"; level: Level | "all"; instructor: InstructorId | "all"; classId: string | "all" };
const ALL: Filters = { category: "all", level: "all", instructor: "all", classId: "all" };
export type FilterDetail = Partial<Filters> & { open?: string };

const cls = (id: string) => CLASSES.find((c) => c.id === id)!;
const inst = (id: string) => INSTRUCTORS.find((i) => i.id === id)!;

function Chips<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className={styles.filterGroup} role="group" aria-label={label}>
      <span className={styles.filterLabel} aria-hidden="true">{label}</span>
      <div className={styles.chipRow}>
        {options.map(([v, t]) => (
          <button key={v} type="button" className={styles.chip} aria-pressed={value === v} onClick={() => onChange(v)}>{t}</button>
        ))}
      </div>
    </div>
  );
}

export function Timetable({ consultHref }: { consultHref: string }) {
  const [week, setWeek] = useState(0);
  const [f, setF] = useState<Filters>(ALL);
  const [day, setDay] = useState(0);
  const [open, setOpen] = useState<Session | null>(null);
  const [done, setDone] = useState(false);
  const [live, setLive] = useState("");
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const all = useMemo(() => sessionsForWeek(week), [week]);
  const shown = useMemo(() => all.filter((s) => {
    const c = cls(s.classId);
    return (f.category === "all" || c.category === f.category) && (f.level === "all" || c.level === f.level) && (f.instructor === "all" || s.instructor === f.instructor) && (f.classId === "all" || c.id === f.classId);
  }), [all, f]);
  const dates = weekDates(week);

  const apply = useCallback((d: FilterDetail) => {
    const { open: o, ...rest } = d;
    setF({ ...ALL, ...rest });
    setWeek(0);
    if (o) { const s = sessionsForWeek(0).find((x) => x.id === o); if (s) { setDay(s.day); } }
    const el = document.getElementById("lich-tap");
    el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const h = (e: Event) => apply((e as CustomEvent<FilterDetail>).detail || {});
    window.addEventListener("nt:filter", h);
    return () => window.removeEventListener("nt:filter", h);
  }, [apply]);

  // thông báo số buổi cho trình đọc màn hình sau khi đổi bộ lọc/tuần
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setLive(`Tìm thấy ${shown.length} buổi tập trong tuần đang xem.`);
  }, [shown.length, f, week]);

  // dialog
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const openSession = (s: Session, el: HTMLElement) => { opener.current = el; setDone(false); setOpen(s); };
  const close = () => { setOpen(null); setDone(false); requestAnimationFrame(() => opener.current?.focus()); };

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((p) => ({ ...p, [k]: v, ...(k === "category" ? { classId: "all" } : {}) }));
  const dirty = f.category !== "all" || f.level !== "all" || f.instructor !== "all" || f.classId !== "all";
  const od = open ? cls(open.classId) : null;

  return (
    <div className={styles.tt} data-nt="tt">
      <div className={styles.ttTop}>
        <div className={styles.weekNav} role="group" aria-label="Chọn tuần">
          <button type="button" className={styles.navBtn} onClick={() => setWeek((w) => Math.max(0, w - 1))} disabled={week === 0} aria-label="Tuần trước">←</button>
          <p className={styles.weekLabel} data-nt="week-label">{dates[0].d}/{dates[0].m} – {dates[6].d}/{dates[6].m}/2026 <span>{week === 0 ? "Tuần này" : `Tuần +${week}`}</span></p>
          <button type="button" className={styles.navBtn} onClick={() => setWeek((w) => Math.min(WEEKS - 1, w + 1))} disabled={week === WEEKS - 1} aria-label="Tuần sau">→</button>
        </div>
        <p className={styles.ttBadge}>Lịch tuần · xem chi tiết từng lớp</p>
      </div>

      <div className={styles.filters}>
        <Chips label="Loại lớp" value={f.category} onChange={(v) => set("category", v)} options={[["all", "Tất cả"], ["reformer", "Reformer"], ["mat", "Mat Pilates"], ["yoga", "Yoga"]]} />
        <Chips label="Cấp độ" value={f.level} onChange={(v) => set("level", v)} options={[["all", "Tất cả"], ["beginner", "Nhập môn"], ["every", "Mọi cấp độ"], ["experienced", "Có kinh nghiệm"]]} />
        <Chips label="Huấn luyện viên" value={f.instructor} onChange={(v) => set("instructor", v)} options={[["all", "Tất cả"], ...INSTRUCTORS.map((i) => [i.id, i.name] as [InstructorId, string])]} />
      </div>

      <div className={styles.ttMeta}>
        <p data-nt="count"><b>{shown.length}</b> buổi tập trong tuần này{f.classId !== "all" && <> · lớp <b>{cls(f.classId).name}</b></>}</p>
        {dirty && <button type="button" className={styles.linkBtn} onClick={() => setF(ALL)}>Đặt lại bộ lọc</button>}
      </div>
      <p className={styles.srOnly} role="status" aria-live="polite">{live}</p>

      <div className={styles.dayTabs} role="tablist" aria-label="Chọn ngày">
        {DAYS.map((d, i) => (
          <button key={d} type="button" role="tab" id={`nt-tab-${i}`} aria-selected={day === i} aria-controls={`nt-day-${i}`} className={styles.dayTab} onClick={() => setDay(i)}>
            <span>{d}</span><b>{dates[i].d}</b>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className={styles.empty} data-nt="empty" role="status">
          <p className={styles.emptyTitle}>Chưa có buổi nào khớp bộ lọc này.</p>
          <p>Thử bỏ bớt một lựa chọn, hoặc xem toàn bộ lịch trong tuần.</p>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setF(ALL)}>Đặt lại bộ lọc</button>
        </div>
      ) : (
        <div className={styles.week}>
          {DAYS.map((d, i) => {
            const list = shown.filter((s) => s.day === i);
            return (
              <section key={d} id={`nt-day-${i}`} role="tabpanel" aria-labelledby={`nt-tab-${i}`} className={styles.dayCol} data-active={day === i} data-nt-day>
                <h3 className={styles.dayHead}><span>{d}</span><b>{dates[i].d}</b><i className={styles.srOnly}>{DAY_LONG[i]} ngày {dates[i].d}/{dates[i].m}</i></h3>
                {list.length === 0 ? <p className={styles.dayEmpty}>Không có buổi</p> : list.map((s) => {
                  const c = cls(s.classId); const a = availability(s.left);
                  return (
                    <button key={s.id} type="button" className={styles.tile} data-cat={c.category} data-status={a.status} data-nt-tile onClick={(e) => openSession(s, e.currentTarget)}
                      aria-label={`${DAY_LONG[s.day]} ${s.time}, ${c.name}, ${LEVEL_LABEL[c.level]}, huấn luyện viên ${inst(s.instructor).name}, ${a.label}`}>
                      <span className={styles.tileTime}>{s.time}<i>{c.minutes}&nbsp;phút</i></span>
                      <span className={styles.tileName}>{c.name}</span>
                      <span className={styles.tileMeta}>{LEVEL_LABEL[c.level]} · HLV {inst(s.instructor).name}</span>
                      <span className={styles.seat} data-status={a.status}><i aria-hidden="true" />{a.label}</span>
                    </button>
                  );
                })}
              </section>
            );
          })}
        </div>
      )}

      <dialog ref={dlg} className={styles.dialog} aria-labelledby="nt-dlg-title" onClose={() => { if (open) close(); }} onClick={(e) => { if (e.target === dlg.current) close(); }}>
        {open && od && (
          <div className={styles.dlgBody} data-nt="dialog">
            {!done ? (
              <>
                <p className={styles.eyebrow}>Chi tiết lớp tập</p>
                <h3 id="nt-dlg-title" className={styles.dlgTitle}>{od.name}</h3>
                <p className={styles.dlgSub}>{LEVEL_LABEL[od.level]} · {od.minutes}&nbsp;phút · {CATEGORY_LABEL[od.category]}</p>
                <ul className={styles.dlgList}>
                  <li><span>Thời gian</span><b>{DAY_LONG[open.day]}, {dates[open.day].d}/{dates[open.day].m}/2026 · {open.time} – {endTime(open.time, od.minutes)}</b></li>
                  <li><span>Huấn luyện viên</span><b>HLV {inst(open.instructor).name}</b></li>
                  <li><span>Chỗ còn lại</span><b>{availability(open.left).label} / {od.capacity}
                    <span className={styles.dots} aria-hidden="true">{Array.from({ length: od.capacity }, (_, k) => <i key={k} data-on={k < od.capacity - open.left} />)}</span></b></li>
                  <li><span>Giá lẻ tham khảo</span><b>{vnd(od.price)}</b></li>
                </ul>
                <p className={styles.dlgNote}>{od.desc} Số chỗ có thể thay đổi; để giữ chỗ, hãy trao đổi qua nút bên dưới. Trang này không thu thông tin cá nhân hay thanh toán.</p>
                <div className={styles.dlgActions}>
                  <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref} data-nt="consult-dialog">Trao đổi về lớp này</a>
                  {open.left === 0
                    ? <button type="button" className={`${styles.btn} ${styles.btnGhost}`} disabled>Lớp đã hết chỗ</button>
                    : <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setDone(true)} data-nt="finish">Lưu tóm tắt lớp</button>}
                  <button type="button" className={styles.linkBtn} onClick={close} data-nt="close">Đóng</button>
                </div>
              </>
            ) : (
              <>
                <p className={styles.eyebrow}>Tóm tắt lớp tập</p>
                <h3 id="nt-dlg-title" className={styles.dlgTitle}>Bạn đã chọn xong lớp tập.</h3>
                <p className={styles.dlgNote}>Lựa chọn này mới chỉ nằm trên trang này, chưa có đặt chỗ nào được tạo. Hãy trao đổi với Nếp Thở để giữ chỗ.</p>
                <div className={styles.dlgActions}>
                  <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={close} data-nt="back">Quay lại lịch tập</button>
                  <a className={`${styles.btn} ${styles.btnGhost}`} href={consultHref}>Trao đổi về lớp này</a>
                </div>
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
