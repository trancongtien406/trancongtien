"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import {
  BUDGETS, CONCERNS, FLAGS, MAX_CONCERNS, SKINS, TIMES,
  recommend, summarize, toggleConcern, toggleFlag, validate,
  type Routine, type RoutineErrors, type RoutineInput, type Step,
} from "../lib/routine";
import { Halo } from "./Halo";
import styles from "../brand.module.css";

const EMPTY: RoutineInput = { skin: "", concerns: [], minutes: 0, budget: "", flags: [] };

function StepList({ title, icon, steps, minutes }: { title: string; icon: "sun" | "moon"; steps: Step[]; minutes: number }) {
  return (
    <section className={styles.routineCol} aria-label={title}>
      <header>
        <span className={styles.routineIcon} aria-hidden="true">
          {icon === "sun"
            ? <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            : <svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>}
        </span>
        <h4>{title}</h4>
        <span className={styles.chip}>khoảng {minutes}&nbsp;phút</span>
      </header>
      <ol>
        {steps.map((s, n) => (
          <li key={s.id} data-stagger="" data-tier={s.tier}>
            <span className={styles.stepNode} aria-hidden="true">{n + 1}</span>
            <div className={styles.stepBody}>
              <p className={styles.stepName}>{s.name}<em>{s.tier === "need" ? "Bước nền" : "Có thể thêm"}</em></p>
              <p>{s.how}</p>
              <p className={styles.stepGroup}><b>Nhóm thành phần:</b> {s.group}</p>
              {s.caution ? <p className={styles.stepCaution}>{s.caution}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Builder() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [v, setV] = useState<RoutineInput>(EMPTY);
  const [errs, setErrs] = useState<RoutineErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "result">("idle");
  const [res, setRes] = useState<Routine | null>(null);
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const form = useRef<HTMLFormElement>(null);
  const out = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const timer = useRef<number | null>(null);
  const href = buildConsultHref("da-xanh");

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (status !== "result" || !out.current || prefersReducedMotion()) return;
    const items = out.current.querySelectorAll("[data-stagger]");
    const t = gsap.fromTo(items, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", clearProps: "transform,opacity" });
    return () => { t.kill(); };
  }, [status, res]);

  const touch = () => { if (status === "result") { setStatus("idle"); setRes(null); setCopied(""); } };
  const setKey = <K extends keyof RoutineInput>(k: K, val: RoutineInput[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrs((e) => { const n = { ...e }; delete n[k as keyof RoutineErrors]; return n; });
    touch();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er = validate(v);
    setErrs(er);
    if (Object.keys(er).length) {
      setStatus("idle"); setRes(null);
      const first = (["skin", "concerns", "minutes", "budget"] as const).find((k) => er[k]);
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`[data-group="${first}"] input`)?.focus());
      return;
    }
    setStatus("loading"); setCopied("");
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setRes(recommend(v));
      setStatus("result");
      requestAnimationFrame(() => {
        head.current?.focus({ preventScroll: true });
        if (window.matchMedia("(max-width: 1023px)").matches) out.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      });
    }, prefersReducedMotion() ? 0 : 420);
  };

  const reset = () => {
    setV(EMPTY); setErrs({}); setRes(null); setStatus("idle"); setCopied("");
    requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[data-group="skin"] input')?.focus());
  };

  const copy = async () => {
    if (!res) return;
    try {
      await navigator.clipboard.writeText(summarize(v, res));
      setCopied("ok");
    } catch { setCopied("fail"); }
  };

  const eid = (k: string) => `${uid}-${k}-err`;
  const group = (k: keyof RoutineErrors) => ({ "data-group": k, "aria-describedby": errs[k] ? eid(k) : undefined });
  const atMax = v.concerns.length >= MAX_CONCERNS;

  return (
    <section id="routine" className={styles.builder} aria-labelledby="builder-title">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker} data-bf="">Chăm da tại nhà</p>
          <h2 id="builder-title" className={styles.h2}>Skin Routine Builder</h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Mô tả làn da theo cảm nhận của bạn, nhận gợi ý quy trình sáng và tối từng bước cùng nhóm thành phần chung. Không chẩn đoán, không kê đơn, và mọi thứ chỉ chạy trong trình duyệt của bạn.</p>
        </header>

        <div className={`${styles.glass} ${styles.builderPanel}`} data-bf="">
          <form ref={form} className={styles.builderForm} onSubmit={submit} noValidate aria-label="Mô tả làn da của bạn">
            <fieldset {...group("skin")} aria-invalid={errs.skin ? true : undefined}>
              <legend>1. Loại da bạn tự cảm nhận</legend>
              <div className={styles.pills}>
                {SKINS.map((s) => (
                  <label key={s.value} className={styles.pill2}>
                    <input type="radio" name={`${uid}-skin`} checked={v.skin === s.value} onChange={() => setKey("skin", s.value)} />
                    <span><b>{s.label}</b><small>{s.hint}</small></span>
                  </label>
                ))}
              </div>
              {errs.skin ? <p className={styles.err} id={eid("skin")} role="alert">{errs.skin}</p> : null}
            </fieldset>

            <fieldset {...group("concerns")} aria-invalid={errs.concerns ? true : undefined}>
              <legend>2. Mối quan tâm <span>(chọn tối đa {MAX_CONCERNS})</span></legend>
              <div className={styles.pills}>
                {CONCERNS.map((c) => {
                  const on = v.concerns.includes(c.value);
                  return (
                    <label key={c.value} className={styles.pill2} data-disabled={!on && atMax ? "1" : "0"}>
                      <input type="checkbox" checked={on} disabled={!on && atMax} onChange={() => setKey("concerns", toggleConcern(v.concerns, c.value))} />
                      <span><b>{c.label}</b></span>
                    </label>
                  );
                })}
              </div>
              {errs.concerns ? <p className={styles.err} id={eid("concerns")} role="alert">{errs.concerns}</p> : null}
            </fieldset>

            <div className={styles.formRow}>
              <fieldset {...group("minutes")} aria-invalid={errs.minutes ? true : undefined}>
                <legend>3. Thời gian mỗi lần</legend>
                <div className={`${styles.pills} ${styles.pills3}`}>
                  {TIMES.map((t) => (
                    <label key={t.value} className={styles.pill2}>
                      <input type="radio" name={`${uid}-min`} checked={v.minutes === t.value} onChange={() => setKey("minutes", t.value)} />
                      <span><b>{t.label}</b><small>{t.hint}</small></span>
                    </label>
                  ))}
                </div>
                {errs.minutes ? <p className={styles.err} id={eid("minutes")} role="alert">{errs.minutes}</p> : null}
              </fieldset>
              <fieldset {...group("budget")} aria-invalid={errs.budget ? true : undefined}>
                <legend>4. Ngân sách</legend>
                <div className={`${styles.pills} ${styles.pills3}`}>
                  {BUDGETS.map((b) => (
                    <label key={b.value} className={styles.pill2}>
                      <input type="radio" name={`${uid}-bud`} checked={v.budget === b.value} onChange={() => setKey("budget", b.value)} />
                      <span><b>{b.label}</b><small>{b.hint}</small></span>
                    </label>
                  ))}
                </div>
                {errs.budget ? <p className={styles.err} id={eid("budget")} role="alert">{errs.budget}</p> : null}
              </fieldset>
            </div>

            <fieldset data-group="flags" className={styles.flagsSet}>
              <legend>5. Nếu có điều nào dưới đây, hãy chọn <span>(không bắt buộc)</span></legend>
              <div className={styles.pills}>
                {FLAGS.map((f) => (
                  <label key={f.value} className={`${styles.pill2} ${styles.pillWarn}`}>
                    <input type="checkbox" checked={v.flags.includes(f.value)} onChange={() => setKey("flags", toggleFlag(v.flags, f.value))} />
                    <span><b>{f.label}</b></span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className={styles.formNote}>Da nhạy cảm hoặc đang điều trị nên hỏi bác sĩ da liễu trước khi thêm hoạt chất mới. Công cụ này không thay thế tư vấn y tế.</p>
            <div className={styles.formActions}>
              <button type="submit" className={`${styles.btn} ${styles.btnInk}`}>Tạo routine của tôi</button>
              <button type="button" className={`${styles.btn} ${styles.btnGlass}`} onClick={reset}>Làm lại</button>
            </div>
          </form>

          <div ref={out} className={styles.builderOut} data-state={status}>
            {status === "idle" && (
              <div className={styles.outEmpty}>
                <Halo className={styles.outHalo}>
                  <div className={styles.outPhoto}><svg viewBox="0 0 24 34" width="54" height="76" aria-hidden="true"><defs><linearGradient id="dx-out" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b9a7ff" /><stop offset="1" stopColor="#7fd6e6" /></linearGradient></defs><path d="M12 1C9 9 2 15 2 22c0 6 4.5 10 10 10s10-4 10-10C22 15 15 9 12 1z" fill="url(#dx-out)" stroke="#fff" strokeWidth="1" /></svg></div>
                </Halo>
                <h3>Routine của bạn sẽ hiện ở đây</h3>
                <p>Chọn loại da, mối quan tâm, thời gian và ngân sách ở bên trái, rồi bấm “Tạo routine của tôi”.</p>
              </div>
            )}
            {status === "loading" && (
              <div className={styles.outLoading} role="status" aria-live="polite">
                <span className={styles.srOnly}>Đang tạo routine</span>
                <i /><i /><i /><i />
              </div>
            )}
            {status === "result" && res && (
              <div className={styles.outResult}>
                <header className={styles.outHead}>
                  <Halo className={styles.outHaloSm}><svg viewBox="0 0 24 34" width="16" height="23" aria-hidden="true"><path d="M12 1C9 9 2 15 2 22c0 6 4.5 10 10 10s10-4 10-10C22 15 15 9 12 1z" fill="#8f78ff" /></svg></Halo>
                  <div>
                    <h3 ref={head} tabIndex={-1}>Routine gợi ý cho bạn</h3>
                    <p>{res.mode === "basic" ? "Bản gọn, ưu tiên sự an toàn" : res.mode === "full" ? "Bản đầy đủ, có thời gian cho từng lớp" : "Bản vừa phải"}</p>
                  </div>
                </header>
                {res.notices.map((n) => <p key={n} className={styles.notice} role="note">{n}</p>)}
                <div className={styles.routineCols}>
                  <StepList title="Buổi sáng" icon="sun" steps={res.am} minutes={res.amMinutes} />
                  <StepList title="Buổi tối" icon="moon" steps={res.pm} minutes={res.pmMinutes} />
                </div>
                {res.weekly.length > 0 && (
                  <section className={styles.weekly} aria-label="Bước thêm theo tuần" data-stagger="">
                    <h4>Thêm theo tuần (không bắt buộc)</h4>
                    <ul>
                      {res.weekly.map((s) => (
                        <li key={s.id}><b>{s.name}.</b> {s.how} <span className={styles.stepGroup}>Nhóm: {s.group}.</span>{s.caution ? <span className={styles.stepCaution}> {s.caution}</span> : null}</li>
                      ))}
                    </ul>
                  </section>
                )}
                <div className={styles.learnRow} data-stagger="">
                  <div><h4>Nhóm thành phần nên tìm hiểu</h4><ul className={styles.chips}>{res.learn.map((l) => <li key={l}>{l}</li>)}</ul></div>
                  <div><h4>Cần thận trọng</h4><ul className={styles.careList}>{res.careful.map((c) => <li key={c}>{c}</li>)}</ul></div>
                </div>
                <p className={styles.budgetNote} data-stagger="">{res.budgetNote}</p>
                <p className={styles.safety} data-stagger="" role="note">
                  Đây là gợi ý chung theo mô tả của bạn, không phải chẩn đoán hay đơn thuốc, và không đảm bảo kết quả. {res.doctor ? "Với tình trạng bạn đã chọn, hãy hỏi bác sĩ da liễu trước khi thêm hoạt chất hoặc sản phẩm mới." : "Nếu da có dấu hiệu bất thường, hãy gặp bác sĩ da liễu."}
                </p>
                <div className={styles.outActions} data-stagger="">
                  <a className={`${styles.btn} ${styles.btnInk}`} href={href}>Trao đổi cùng NÉA về routine này</a>
                  <button type="button" className={`${styles.btn} ${styles.btnGlass}`} onClick={copy}>Sao chép tóm tắt</button>
                  <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={reset}>Làm lại</button>
                </div>
                <p className={styles.copyState} role="status" aria-live="polite">
                  {copied === "ok" ? "Đã sao chép bản tóm tắt." : copied === "fail" ? "Không sao chép được. Bạn có thể mở bản chữ bên dưới và chọn để sao chép." : ""}
                </p>
                <details className={styles.plain}>
                  <summary>Xem bản tóm tắt dạng chữ</summary>
                  <pre>{summarize(v, res)}</pre>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
