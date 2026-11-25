"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MagneticButton } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { CHECKLIST, IMG, SLUG } from "../data/content";
import { AGES, LEVELS, SESSIONS, SLOTS, buildPlan, planSummary, vnd, type Age, type Level, type Sessions, type Slot } from "../lib/planner";
import { Divider } from "./Art";
import styles from "../brand.module.css";

const KEY = "rs-checklist-v1";

function Group<T extends string | number>({ name, legend, value, onChange, options, error, errorId, cols }: {
  name: string; legend: string; value: T | null; onChange: (v: T) => void; error: boolean; errorId: string; cols?: number;
  options: { v: T; label: string; hint?: string }[];
}) {
  const legendId = `${name}-lg`;
  return (
    <div className={styles.group} role="radiogroup" aria-labelledby={legendId} aria-invalid={error || undefined} aria-describedby={error ? errorId : undefined}>
      <p className={styles.groupLegend} id={legendId}>{legend}</p>
      <div className={styles.opts} data-cols={cols} style={cols ? { ["--cols" as string]: cols } : undefined}>
        {options.map((o) => (
          <label key={String(o.v)} className={styles.opt}>
            <input type="radio" name={name} value={String(o.v)} checked={value === o.v} onChange={() => onChange(o.v)} />
            <span className={styles.optBox}><b>{o.label}</b>{o.hint ? <small>{o.hint}</small> : null}</span>
          </label>
        ))}
      </div>
      {error ? <p className={styles.err} id={errorId} role="alert">Hãy chọn một mục.</p> : null}
    </div>
  );
}

export function Planner() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [level, setLevel] = useState<Level | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [sessions, setSessions] = useState<Sessions | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [shown, setShown] = useState(false);
  const [errs, setErrs] = useState({ level: false, age: false, sessions: false, slot: false });
  const [done, setDone] = useState<boolean[]>(() => CHECKLIST.map(() => false));
  const [copied, setCopied] = useState("");
  const head = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const a = JSON.parse(raw); if (Array.isArray(a) && a.length === CHECKLIST.length) setDone(a.map(Boolean)); }
    } catch { /* bỏ qua */ }
  }, []);
  const toggle = (i: number) => setDone((d) => {
    const n = d.map((x, k) => (k === i ? !x : x));
    try { localStorage.setItem(KEY, JSON.stringify(n)); } catch { /* bỏ qua */ }
    return n;
  });
  const resetChecklist = () => { const n = CHECKLIST.map(() => false); setDone(n); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch { /* bỏ qua */ } };

  const complete = level && age && sessions && slot;
  const plan = useMemo(() => (shown && complete ? buildPlan(level, age, sessions, slot) : null), [shown, complete, level, age, sessions, slot]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er = { level: !level, age: !age, sessions: !sessions, slot: !slot };
    setErrs(er);
    if (Object.values(er).some(Boolean)) { setShown(false); return; }
    setShown(true);
    requestAnimationFrame(() => head.current?.focus({ preventScroll: false }));
  };
  const reset = () => { setLevel(null); setAge(null); setSessions(null); setSlot(null); setShown(false); setErrs({ level: false, age: false, sessions: false, slot: false }); setCopied(""); };

  const copy = async () => {
    if (!plan) return;
    try { await navigator.clipboard.writeText(planSummary(plan)); setCopied("Đã chép bản tóm tắt vào bộ nhớ tạm."); }
    catch { setCopied("Trình duyệt chưa cho chép tự động. Hãy chọn và chép phần tóm tắt bên trên."); }
  };

  const count = done.filter(Boolean).length;
  const extra = age === "nhi" ? "Phụ huynh ở bờ trong tầm nhìn (lớp Sóng Nhí)." : age === "teen" ? "Giấy xác nhận của phụ huynh (13 đến 17 tuổi)." : null;
  const total = CHECKLIST.length;

  return (
    <section id="lap-ke-hoach" className={styles.planner} aria-labelledby="lp-title">
      <Divider fill="var(--rs-orange)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerLight} data-rs="reveal">Lesson Planner</p>
        <h2 id="lp-title" className={`${styles.h2} ${styles.h2Light}`} data-rs="reveal">Một kế hoạch <span className={styles.scriptSun}>vừa vặn với bạn</span></h2>
        <p className={`${styles.lede} ${styles.ledeLight}`} data-rs="reveal">Chọn trình độ, độ tuổi, số buổi và khung giờ để nhận khoá gợi ý, thứ tự bài học, giá tham khảo và danh sách đồ mang theo.</p>

        <div className={styles.plannerGrid}>
          <form className={styles.plannerForm} onSubmit={submit} noValidate aria-label="Chọn thông tin buổi học">
            <Group name={`${uid}-level`} legend="1. Trình độ hiện tại" value={level} onChange={setLevel} options={LEVELS.map((l) => ({ v: l.v, label: l.label, hint: l.hint }))} error={errs.level && !level} errorId={`${uid}-e1`} cols={1} />
            <Group name={`${uid}-age`} legend="2. Nhóm tuổi" value={age} onChange={setAge} options={AGES.map((a) => ({ v: a.v, label: a.label }))} error={errs.age && !age} errorId={`${uid}-e2`} cols={2} />
            <Group name={`${uid}-ses`} legend="3. Số buổi" value={sessions} onChange={(v) => setSessions(v as Sessions)} options={SESSIONS.map((n) => ({ v: n, label: `${n} buổi` }))} error={errs.sessions && !sessions} errorId={`${uid}-e3`} cols={4} />
            <Group name={`${uid}-slot`} legend="4. Khung giờ mong muốn" value={slot} onChange={setSlot} options={SLOTS.map((s) => ({ v: s.v, label: s.label, hint: s.time }))} error={errs.slot && !slot} errorId={`${uid}-e4`} cols={1} />
            <div className={styles.formActions}>
              <MagneticButton><button type="submit" className={`${styles.btn} ${styles.btnBrown}`}>Xem khoá gợi ý</button></MagneticButton>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={reset}>Chọn lại</button>
            </div>
          </form>

          <div className={styles.plannerOut} aria-live="polite">
            {!plan ? (
              <div className={styles.empty}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/ra-bien-600.webp`} alt="Hai người cầm ván chạy xuống sóng, chụp từ xa" width={600} height={750} loading="lazy" />
                <div>
                  <h3 className={styles.emptyTitle}>Chọn đủ bốn mục rồi bấm xem</h3>
                  <p>Khoá gợi ý, thứ tự bài học và giá tham khảo sẽ hiện ở đây. Bạn có thể đổi lựa chọn bất cứ lúc nào, kết quả cập nhật theo.</p>
                </div>
              </div>
            ) : (
              <div className={styles.result}>
               <div className={styles.resMain}>
                <p className={styles.resKicker}>Khoá gợi ý · {plan.levelLabel} · {plan.ageLabel} tuổi · {plan.sessions} buổi</p>
                <h3 className={styles.resTitle} ref={head} tabIndex={-1}>{plan.courseName}</h3>
                <p className={styles.resGoal}>{plan.goal}</p>
                <p className={styles.resPrice}><small>Giá tham khảo</small><b>{vnd(plan.price)}</b><small>mỗi người</small></p>
                <p className={styles.fineDark}>{plan.priceNote} Phần bao gồm ván, đồ bảo hộ, ảnh, bảo hiểm và di chuyển được xác nhận khi trao đổi lịch.</p>

                <p className={styles.noteLine}>{plan.ageNote}</p>
                <p className={styles.noteLine}>{plan.slotNote}</p>
                <p className={styles.noteLine}>Mỗi buổi đều mở đầu bằng việc huấn luyện viên đọc biển và nhắc lại quy tắc an toàn.</p>
                <div className={styles.resActions}>
                  <MagneticButton><a className={`${styles.btn} ${styles.btnOrange}`} href={buildConsultHref(SLUG)} data-rs-consult>Trao đổi lịch với huấn luyện viên</a></MagneticButton>
                  <button type="button" className={`${styles.btn} ${styles.btnGhostDark}`} onClick={copy}>Chép bản tóm tắt</button>
                </div>
                {copied ? <p className={styles.copied} role="status">{copied}</p> : null}
               </div>
               <div className={styles.resSide}>
                <h4 className={styles.resH} style={{ marginTop: 0 }}>Thứ tự bài học</h4>
                <ol className={styles.lessons}>
                  {plan.sessionList.map((s) => (
                    <li key={s.title}>
                      <span className={styles.lessonTag}>{s.title}</span>
                      <ul>
                        {s.modules.map((m) => <li key={m.key}><b>{m.name}</b> {m.text}</li>)}
                      </ul>
                    </li>
                  ))}
                </ol>
               </div>
               <div className={styles.resCheck}>
                <h4 className={styles.resH}>Mang gì đi biển</h4>
                <div className={styles.progressRow}>
                  <span>{count}/{total} đã chuẩn bị</span>
                  <span className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={count} aria-label="Tiến độ chuẩn bị đồ"><i style={{ width: `${(count / total) * 100}%` }} /></span>
                </div>
                <ul className={styles.checks}>
                  {CHECKLIST.map((c, i) => (
                    <li key={c}><label><input type="checkbox" checked={done[i]} onChange={() => toggle(i)} /><span>{c}</span></label></li>
                  ))}
                  {extra ? <li className={styles.checkExtra}>{extra}</li> : null}
                </ul>
                <p className={styles.fineDark}>Ván lướt, dây leash và thiết bị bảo hộ do trường cung cấp theo gói học đã xác nhận.</p>
                <button type="button" className={styles.linkBtn} onClick={resetChecklist}>Đặt lại danh sách</button>
               </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
