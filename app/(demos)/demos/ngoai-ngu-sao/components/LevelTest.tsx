"use client";

import { useEffect, useRef, useState } from "react";
import { CLASSES, DAYS, LANGS, LEVELS, SLOTS, type Lang, type Slot } from "../data/content";
import { MAX_SCORE, QUESTIONS, scoreTest, suggestLevelForClass, type TestResult } from "../lib/levelTest";
import { useClasses } from "./ClassContext";
import styles from "../brand.module.css";

const langName = (l: Lang) => LANGS.find((x) => x.id === l)!.name;
const cls = (l: Lang) => (l === "ja" ? styles.ja : l === "ko" ? styles.ko : "");
const slotOf = (s: Slot) => SLOTS.find((x) => x.id === s)!;
const dayText = (days: number[]) => days.map((d) => DAYS.find((x) => x.n === d)!.short).join(" · ");

/* ------------------------------------------------------------ Level Test */
function LevelTest() {
  const { setFilters, setSelected } = useClasses();
  const onResult = (lang: Lang, r: TestResult) => {
    const lv = suggestLevelForClass(lang, r.level, CLASSES.filter((c) => c.lang === lang).map((c) => c.level));
    setFilters({ lang, level: lv, slot: "all" });
    setSelected(CLASSES.find((c) => c.lang === lang && c.level === lv)?.id ?? null);
  };
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
          <h3 className={styles.h3}>10 câu, khoảng 3 phút</h3>
          <p>Chọn ngôn ngữ rồi trả lời 10 câu trắc nghiệm. Kết quả chỉ để gợi ý lớp tại Mở Lời, không quy đổi sang chứng chỉ quốc tế. Bài đầy đủ làm tại trung tâm khi bạn đến học thử.</p>
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
            <a className={`${styles.btn} ${styles.btnNavy}`} href="#lich-lop">Xem thời khoá biểu lớp phù hợp</a>
            <button type="button" className={`${styles.btn} ${styles.btnGhostN}`} onClick={retry}>Làm lại bài</button>
          </div>
        </div>
      )}
    </div>
  );
}


export function QuickTest() {
  return (
    <section id="kiem-tra" className={`${styles.panel} ${styles.panelBlueDeep}`} aria-labelledby="qt-title">
      <div className={styles.panelHead}>
        <p className={`${styles.kicker} ${styles.kickerY}`}>Bước 1 khi đăng ký</p>
        <h2 id="qt-title" className={`${styles.h2} ${styles.onDark}`}>Kiểm tra đầu vào nhanh</h2>
        <p className={`${styles.lede} ${styles.onDarkSoft}`}>Làm thử để biết nên bắt đầu từ cấp nào. Xong bài, thời khoá biểu ở phần Lịch khai giảng sẽ tự lọc lớp đúng cấp của bạn.</p>
      </div>
      <LevelTest />
    </section>
  );
}
