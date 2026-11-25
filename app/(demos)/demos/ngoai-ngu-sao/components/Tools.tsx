"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { MagneticButton } from "@/features/showroom/effects";
import { CLASSES, DAYS, LANGS, LEVELS, PRICES, SLOTS, SLUG, type ClassItem, type Lang, type Slot } from "../data/content";
import { MAX_SCORE, QUESTIONS, scoreTest, suggestLevelForClass, type TestResult } from "../lib/levelTest";
import { Mascot } from "./Mascot";
import { MASCOTS } from "../data/content";
import styles from "../brand.module.css";

const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const langName = (l: Lang) => LANGS.find((x) => x.id === l)!.name;
const cls = (l: Lang) => (l === "ja" ? styles.ja : l === "ko" ? styles.ko : "");
const priceOf = (lang: Lang, level: number) => PRICES.find((p) => p.lang === lang)!.rows[level <= 2 ? 0 : level <= 4 ? 1 : 2].price;
const slotOf = (s: Slot) => SLOTS.find((x) => x.id === s)!;
const dayText = (days: number[]) => days.map((d) => DAYS.find((x) => x.n === d)!.short).join(" · ");

type Filters = { lang: Lang | "all"; level: number; slot: Slot | "all" };

/* ------------------------------------------------------------ Level Test */
function LevelTest({ onResult }: { onResult: (lang: Lang, r: TestResult) => void }) {
  const [lang, setLang] = useState<Lang>("en");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qi, setQi] = useState(0);
  const [err, setErr] = useState("");
  const [result, setResult] = useState<TestResult | null>(null);
  const head = useRef<HTMLLegendElement>(null);
  const moved = useRef(false);
  const qs = QUESTIONS[lang];
  const q = qs[qi];
  const answered = Object.keys(answers).length;

  useEffect(() => { if (moved.current) head.current?.focus(); }, [qi]);

  const pickLang = (l: Lang) => { setLang(l); setAnswers({}); setQi(0); setErr(""); setResult(null); moved.current = false; };
  const next = () => {
    if (answers[q.id] === undefined) { setErr("Hãy chọn một đáp án để tiếp tục."); return; }
    setErr(""); moved.current = true;
    if (qi < qs.length - 1) { setQi(qi + 1); return; }
    const missing = qs.findIndex((x) => answers[x.id] === undefined);
    if (missing >= 0) { setQi(missing); setErr(`Bạn còn câu ${missing + 1} chưa chọn.`); return; }
    const r = scoreTest(lang, answers);
    setResult(r); onResult(lang, r);
  };
  const retry = () => { setAnswers({}); setQi(0); setErr(""); setResult(null); moved.current = false; };

  const info = result ? LEVELS[result.level - 1] : null;
  const roadmap = result ? LEVELS.filter((l) => l.n >= result.level).slice(0, 3) : [];
  const classLevel = result ? suggestLevelForClass(lang, result.level, CLASSES.filter((c) => c.lang === lang).map((c) => c.level)) : 0;
  const suggested = result ? CLASSES.filter((c) => c.lang === lang && c.level === classLevel) : [];

  return (
    <div className={styles.toolCard} data-tool="level-test">
      <div className={styles.ltIntro}>
        <div className={styles.toolHead}>
          <h3 className={styles.h3}>Bài kiểm tra cấp độ nhanh</h3>
          <p>10 câu trắc nghiệm, khoảng 3 phút. Kết quả chỉ để xếp lớp tại Mở Lời, không quy đổi sang chứng chỉ quốc tế.</p>
        </div>
        <div className={styles.segment} role="group" aria-label="Chọn ngôn ngữ làm bài">
          {LANGS.map((l) => <button key={l.id} type="button" className={styles.segBtn} aria-pressed={lang === l.id} onClick={() => pickLang(l.id)}>{l.name}</button>)}
        </div>
      </div>

      {!result && (
        <form className={styles.quiz} onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
          <div className={styles.quizTop}>
            <span aria-live="polite">Câu {qi + 1}/{qs.length}</span>
            <span>Đã trả lời {answered}/{qs.length}</span>
          </div>
          <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={qs.length} aria-valuenow={answered} aria-label="Tiến độ bài kiểm tra"><i style={{ transform: `scaleX(${answered / qs.length})` }} /></div>
          <fieldset className={styles.fieldset} aria-describedby={err ? "lt-err" : undefined}>
            <legend ref={head} tabIndex={-1} className={`${styles.legend} ${cls(lang)}`}>{q.prompt}</legend>
            <div className={styles.opts}>
              {q.options.map((o, i) => {
                const id = `${q.id}-${i}`;
                return (
                  <div key={id} className={styles.opt}>
                    <input id={id} type="radio" name={q.id} checked={answers[q.id] === i} onChange={() => { setAnswers((a) => ({ ...a, [q.id]: i })); setErr(""); }} />
                    <label htmlFor={id} className={cls(lang)}><span className={styles.optKey} aria-hidden="true">{"ABCD"[i]}</span>{o}</label>
                  </div>
                );
              })}
            </div>
          </fieldset>
          {err && <p id="lt-err" className={styles.err} role="alert">{err}</p>}
          <div className={styles.quizNav}>
            <button type="button" className={`${styles.btn} ${styles.btnGhostN} ${styles.btnSm}`} disabled={qi === 0} onClick={() => { moved.current = true; setErr(""); setQi(qi - 1); }}>Câu trước</button>
            <button type="submit" className={`${styles.btn} ${styles.btnNavy}`}>{qi < qs.length - 1 ? "Câu tiếp" : "Xem kết quả"}</button>
          </div>
        </form>
      )}

      {result && info && (
        <div className={styles.result} data-level={result.level} tabIndex={-1} role="region" aria-label="Kết quả bài kiểm tra">
          <div className={styles.resultTop}>
            <span className={styles.resultNum} aria-hidden="true">{result.level}</span>
            <div>
              <p className={styles.levelTag}>Cấp gợi ý · {langName(lang)}</p>
              <h4 className={styles.h3}>Cấp {result.level} · {info.name}</h4>
              <p>Đúng {result.correct}/{result.total} câu, {result.score}/{MAX_SCORE} điểm (câu khó có điểm cao hơn).</p>
            </div>
          </div>
          <p className={styles.resultGoal}>{info.goal}</p>
          <p className={styles.note}>Đây là cấp xếp lớp nội bộ của Mở Lời để gợi ý điểm bắt đầu, không phải chứng nhận trình độ hay quy đổi sang chứng chỉ quốc tế.</p>
          <h5 className={styles.h5}>Lộ trình gợi ý</h5>
          <ol className={styles.road}>
            {roadmap.map((l, i) => <li key={l.n}><b>Cấp {l.n} · {l.name}</b><span>{i === 0 ? "Bắt đầu từ đây" : l.weeks}</span></li>)}
          </ol>
          <h5 className={styles.h5}>Lớp phù hợp</h5>
          {suggested.length ? (
            <ul className={styles.sugg}>{suggested.map((c) => <li key={c.id}><b>{c.title}</b> · {dayText(c.days)} · {slotOf(c.slot).time}</li>)}</ul>
          ) : <p>Chưa có lớp đúng cấp này, hãy để lại nhu cầu khi tư vấn.</p>}
          <div className={styles.resultBtns}>
            <a className={`${styles.btn} ${styles.btnNavy}`} href="#lich-lop">Xem lịch lớp phù hợp</a>
            <button type="button" className={`${styles.btn} ${styles.btnGhostN}`} onClick={retry}>Làm lại bài</button>
          </div>
        </div>
      )}
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

function Schedule({ filters, setFilters, selected, setSelected }: { filters: Filters; setFilters: (f: Filters) => void; selected: string | null; setSelected: (id: string | null) => void }) {
  const [copied, setCopied] = useState("");
  const list = useMemo(
    () => CLASSES.filter((c) => (filters.lang === "all" || c.lang === filters.lang) && (!filters.level || c.level === filters.level) && (filters.slot === "all" || c.slot === filters.slot)),
    [filters],
  );
  const active = list.find((c) => c.id === selected) ?? null;
  const reset = () => { setFilters({ lang: "all", level: 0, slot: "all" }); setSelected(null); };
  const mascot = active ? MASCOTS.find((m) => m.id === active.mascot)! : null;
  const summary = active
    ? `${langName(active.lang)} · Cấp ${active.level} (${LEVELS[active.level - 1].name}) · Lớp ${active.title} · ${dayText(active.days)} lúc ${slotOf(active.slot).time} · Học phí tham khảo ${money.format(priceOf(active.lang, active.level))} / khoá 24 buổi`
    : "";

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied("Đã chép tóm tắt."); }
    catch { setCopied("Chưa chép được, bạn hãy bôi đen đoạn trên và sao chép thủ công."); }
  };

  return (
    <div className={styles.toolCard} data-tool="schedule" id="lich-lop">
      <div className={styles.toolHead}>
        <h3 className={styles.h3}>Lịch lớp trong tuần</h3>
        <p>Lọc theo ngôn ngữ, cấp độ và khung giờ, rồi chọn một lớp. Lịch mang tính tham khảo, trung tâm xác nhận khi tư vấn.</p>
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
            <dl className={styles.facts}>
              <div><dt>Ngày học</dt><dd>{dayText(active.days)}</dd></div>
              <div><dt>Giờ học</dt><dd>{slotOf(active.slot).time}</dd></div>
              <div><dt>Học phí tham khảo</dt><dd>{money.format(priceOf(active.lang, active.level))}<small> / 24 buổi</small></dd></div>
            </dl>
            <div className={styles.summary}>
              <h5 className={styles.h5}>Tóm tắt lựa chọn</h5>
              <p className={styles.summaryText}>{summary}</p>
              <div className={styles.resultBtns}>
                <MagneticButton><a className={`${styles.btn} ${styles.btnYellow}`} href={buildConsultHref(SLUG)}>Nhờ tư vấn xếp lớp này</a></MagneticButton>
                <button type="button" className={`${styles.btn} ${styles.btnGhostN}`} onClick={copy}>Chép tóm tắt</button>
              </div>
              <p className={styles.copied} role="status">{copied}</p>
            </div>
          </>
        ) : (
          <div className={styles.detailEmpty}>
            <p>{list.length ? "Chọn một lớp trong lịch để xem chi tiết và tạo tóm tắt." : "Chưa có lớp để chọn."}</p>
            <MagneticButton><a className={`${styles.btn} ${styles.btnYellow}`} href={buildConsultHref(SLUG)}>Chưa chọn được, nhờ tư vấn</a></MagneticButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Gộp */
export function Tools() {
  const [filters, setFilters] = useState<Filters>({ lang: "all", level: 0, slot: "all" });
  const [selected, setSelected] = useState<string | null>(null);

  const onResult = (lang: Lang, r: TestResult) => {
    const lv = suggestLevelForClass(lang, r.level, CLASSES.filter((c) => c.lang === lang).map((c) => c.level));
    setFilters({ lang, level: lv, slot: "all" });
    setSelected(CLASSES.find((c) => c.lang === lang && c.level === lv)?.id ?? null);
  };

  return (
    <section id="cong-cu" className={`${styles.panel} ${styles.panelBlueDeep}`} aria-labelledby="tools-title">
      <div className={styles.panelHead}>
        <p className={`${styles.kicker} ${styles.kickerY}`}>Công cụ chọn lớp</p>
        <h2 id="tools-title" className={`${styles.h2} ${styles.onDark}`}>Biết mình ở cấp nào, rồi chọn lớp vừa lịch.</h2>
      </div>
      <div className={styles.toolsGrid}>
        <LevelTest onResult={onResult} />
        <Schedule filters={filters} setFilters={(f) => { setFilters(f); }} selected={selected} setSelected={setSelected} />
      </div>
    </section>
  );
}
