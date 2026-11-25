"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SplitWords, gsap, prefersReducedMotion } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { ACTIVITIES, TENTS } from "../data/content";
import { vnd } from "../lib/format";
import { MAX_PEOPLE, buildPlan, summaryText, type ActivityId, type PlanInput } from "../lib/planner";
import { PICK_EVENT, type PickDetail } from "./Pick";

const INITIAL: PlanInput = { nights: 1, tent: "moc", people: 2, activities: [], extraTents: false };

export function Planner({ consultHref }: { consultHref: string }) {
  const [input, setInput] = useState<PlanInput>(INITIAL);
  const [peopleText, setPeopleText] = useState("2");
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const totalRef = useRef<HTMLParagraphElement>(null);
  const firstRun = useRef(true);

  const peopleNum = /^\d+$/.test(peopleText.trim()) ? Number(peopleText) : NaN;
  const plan = useMemo(() => buildPlan({ ...input, people: peopleNum }), [input, peopleNum]);
  const peopleIssue = plan.issues.find((i) => i.field === "people");
  const tentIssue = plan.issues.find((i) => i.field === "tent");
  const over = plan.tent && peopleNum > plan.tent.cap && peopleNum <= MAX_PEOPLE;

  // Nhận lựa chọn nhanh từ mục Lều / Hoạt động / Lửa trại.
  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent<PickDetail>).detail;
      setInput((s) => ({
        ...s,
        tent: d.tent ?? s.tent,
        activities: d.activity && !s.activities.includes(d.activity) ? [...s.activities, d.activity] : s.activities,
      }));
    };
    window.addEventListener(PICK_EVENT, h);
    return () => window.removeEventListener(PICK_EVENT, h);
  }, []);

  // Vi tương tác: tổng chi phí nảy nhẹ khi đổi.
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (!totalRef.current || prefersReducedMotion() || !plan.total) return;
    gsap.fromTo(totalRef.current, { y: 8, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: true });
  }, [plan.total]);

  const setPeople = (n: number) => { const v = Math.min(MAX_PEOPLE, Math.max(1, n)); setPeopleText(String(v)); };
  const toggle = (id: ActivityId) => setInput((s) => ({ ...s, activities: s.activities.includes(id) ? s.activities.filter((x) => x !== id) : [...s.activities, id] }));

  const copy = async () => {
    const text = summaryText({ ...input, people: peopleNum }, plan, vnd);
    try { await navigator.clipboard.writeText(text); setCopied("ok"); } catch { setCopied("fail"); }
    window.setTimeout(() => setCopied(""), 3000);
  };

  const onTentKey = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const idx = TENTS.findIndex((t) => t.id === input.tent);
    const next = (idx + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + TENTS.length) % TENTS.length;
    setInput((s) => ({ ...s, tent: TENTS[next].id }));
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-tent-radio="${TENTS[next].id}"]`)?.focus());
  };

  return (
    <section id="lap-ke-hoach" className={`${styles.section} ${styles.planner}`} aria-labelledby="plan-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.eyebrow}>Lên kế hoạch</p>
          <h2 id="plan-title" className={styles.h2}>
            <SplitWords as="span">Chuyến đi của bạn, theo cách riêng.</SplitWords>
          </h2>
          <p className={styles.lead}>Chọn số đêm, loại lều và những hoạt động bạn muốn. Rừng Thức sẽ giúp bạn hình dung lịch trình từng ngày và chi phí tham khảo.</p>
        </header>

        <div className={styles.planGrid}>
          <form className={styles.planForm} onSubmit={(e) => e.preventDefault()} noValidate aria-label="Thông tin chuyến đi">
            <fieldset className={styles.fs}>
              <legend>Số đêm</legend>
              <div className={styles.seg} role="radiogroup" aria-label="Số đêm">
                {([1, 2, 3] as const).map((n) => (
                  <label key={n} className={styles.segItem}>
                    <input type="radio" name="nights" value={n} checked={input.nights === n} onChange={() => setInput((s) => ({ ...s, nights: n }))} />
                    <span>{n}&nbsp;đêm</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fs} aria-describedby={tentIssue ? "err-tent" : undefined}>
              <legend>Loại lều</legend>
              <div className={styles.tentPick} role="radiogroup" aria-label="Loại lều" onKeyDown={onTentKey}>
                {TENTS.map((t) => (
                  <label key={t.id} className={styles.tentOpt}>
                    <input type="radio" name="tent" value={t.id} data-tent-radio={t.id} checked={input.tent === t.id} onChange={() => setInput((s) => ({ ...s, tent: t.id }))} tabIndex={input.tent === t.id ? 0 : -1} />
                    <span className={styles.tentOptBody}>
                      <b>{t.name}</b>
                      <small>{t.cap}&nbsp;người · {vnd(t.price)}/đêm</small>
                    </span>
                  </label>
                ))}
              </div>
              {tentIssue && <p id="err-tent" className={styles.err} role="alert">{tentIssue.message}</p>}
            </fieldset>

            <div className={styles.fs}>
              <label className={styles.legendLike} htmlFor="gl-people">Số người</label>
              <div className={styles.stepper}>
                <button type="button" aria-label="Giảm số người" onClick={() => setPeople((Number.isFinite(peopleNum) ? peopleNum : 2) - 1)} disabled={peopleNum <= 1}>−</button>
                <input
                  id="gl-people" inputMode="numeric" autoComplete="off" value={peopleText}
                  onChange={(e) => setPeopleText(e.target.value.replace(/[^\d]/g, "").slice(0, 2))}
                  aria-invalid={peopleIssue ? true : undefined} aria-describedby={peopleIssue ? "err-people" : "hint-people"}
                  onKeyDown={(e) => { if (e.key === "ArrowUp") { e.preventDefault(); setPeople((Number.isFinite(peopleNum) ? peopleNum : 0) + 1); } if (e.key === "ArrowDown") { e.preventDefault(); setPeople((Number.isFinite(peopleNum) ? peopleNum : 2) - 1); } if (e.key === "Enter") e.preventDefault(); }}
                />
                <button type="button" aria-label="Tăng số người" onClick={() => setPeople((Number.isFinite(peopleNum) ? peopleNum : 0) + 1)} disabled={peopleNum >= MAX_PEOPLE}>+</button>
              </div>
              {peopleIssue ? <p id="err-people" className={styles.err} role="alert">{peopleIssue.message}</p> : <p id="hint-people" className={styles.hint}>Từ 1 đến {MAX_PEOPLE} người.</p>}
              {over && (
                <label className={styles.check}>
                  <input type="checkbox" checked={input.extraTents} onChange={(e) => setInput((s) => ({ ...s, extraTents: e.target.checked }))} />
                  <span>Số người vượt sức chứa {plan.tent!.cap} người của {plan.tent!.name}. Ghép thêm lều cho đủ chỗ (tính thêm giá lều).</span>
                </label>
              )}
            </div>

            <fieldset className={styles.fs}>
              <legend>Hoạt động thêm</legend>
              <div className={styles.checks}>
                {ACTIVITIES.map((a) => (
                  <label key={a.id} className={styles.chk}>
                    <input type="checkbox" checked={input.activities.includes(a.id)} onChange={() => toggle(a.id)} />
                    <span><b>{a.name}</b><small>{vnd(a.price)}/người</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          <div className={styles.planOut}>
            {plan.issues.length > 0 ? (
              <div className={styles.planEmpty} data-testid="plan-empty">
                <h3 className={styles.h3}>Chưa có lịch trình</h3>
                <p>Hoàn thiện thông tin bên trái để xem lịch trình từng ngày và chi phí tham khảo.</p>
                <ul>{plan.issues.map((i) => <li key={i.message}>{i.message}</li>)}</ul>
              </div>
            ) : (
              <>
                <div className={styles.totalCard}>
                  <p className={styles.totalLabel}>Tổng chi phí tham khảo</p>
                  <p ref={totalRef} className={styles.total} data-testid="total" aria-live="polite" aria-atomic="true">{vnd(plan.total)}</p>
                  <dl className={styles.lines}>
                    {plan.lines.map((l) => (<div key={l.label}><dt>{l.label}</dt><dd>{vnd(l.amount)}</dd></div>))}
                  </dl>
                  <p className={styles.fine}>Chưa gồm thuế, phí phát sinh hoặc khoản chưa có giá xác nhận. Giá xác nhận có thể thay đổi theo thời điểm.</p>
                </div>
                {plan.warnings.map((w) => <p key={w} className={styles.note} data-testid="plan-warning">{w}</p>)}
                <ol className={styles.days} data-testid="itinerary">
                  {plan.days.map((d) => (
                    <li key={d.title} className={styles.day}>
                      <h3>{d.title}</h3>
                      <ul>
                        {d.slots.map((s) => (
                          <li key={s.time + s.title} data-act={s.activity ?? undefined}>
                            <time>{s.time}</time>
                            <span><b>{s.title}</b>{s.note ? <small>{s.note}</small> : null}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
                <div className={styles.planActs}>
                  <a className={`${styles.btn} ${styles.btnFire}`} href={consultHref} data-testid="consult-plan">Trao đổi chuyến đi này</a>
                  <button type="button" className={`${styles.btn} ${styles.btnLine}`} onClick={copy}>Sao chép tóm tắt</button>
                </div>
                <p className={styles.hint} role="status">
                  {copied === "ok" ? "Đã sao chép tóm tắt chuyến đi." : copied === "fail" ? "Chưa sao chép được. Bạn có thể chọn và sao chép thủ công." : "Bản tóm tắt chỉ nằm trên trình duyệt của bạn. Nút trên dẫn tới biểu mẫu tư vấn của website."}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
