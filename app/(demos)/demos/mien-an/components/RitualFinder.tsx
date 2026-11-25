"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { DURATIONS, GOALS, RITUALS } from "../data/rituals";
import type { Pressure, RitualFinderAnswers, RitualGoal } from "../data/types";
import { formatVnd } from "../lib/format";
import { recommendRituals } from "../lib/recommend";
import { Check, Symbol } from "./Icons";
import { useMienAn } from "./Provider";
import styles from "../brand.module.css";

type Step = 0 | 1 | 2 | 3 | 4; // 0 giới thiệu, 1-3 câu hỏi, 4 kết quả
const EMPTY: RitualFinderAnswers = { goal: null, maxDuration: null, pressure: "any", avoidHotStone: false, unscented: false };

export function RitualFinder() {
  const { choose, openDetail } = useMienAn();
  const [step, setStep] = useState<Step>(0);
  const [a, setA] = useState<RitualFinderAnswers>(EMPTY);
  const [err, setErr] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  const results = useMemo(() => recommendRituals(RITUALS, a), [a]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
  }, [step]);

  const next = () => {
    if (step === 1 && !a.goal) return setErr("Hãy chọn một mong muốn để Miên An có thể gợi ý nghi thức phù hợp.");
    if (step === 2 && !a.maxDuration) return setErr("Hãy chọn khoảng thời gian bạn có thể dành cho nghi thức.");
    setErr(null);
    setStep((s) => (s + 1) as Step);
  };
  const back = () => {
    setErr(null);
    setStep((s) => (Math.max(1, s - 1)) as Step);
  };
  const reset = () => {
    setA(EMPTY);
    setErr(null);
    setChosen(null);
    setStep(0);
  };
  const scroll = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };
  const pick = (id: string) => {
    setChosen(id);
    choose(id, { pressure: a.pressure === "any" ? null : a.pressure, scent: a.unscented ? "unscented" : null });
  };

  const titles: Record<number, string> = {
    0: "Tìm nghi thức của bạn",
    1: "Hôm nay, bạn muốn dành thời gian cho điều gì?",
    2: "Bạn có thể dành bao lâu cho mình?",
    3: "Bạn thích được chăm sóc theo cách nào?",
    4: results.length ? "Gợi ý dành cho bạn" : "Chưa có nghi thức phù hợp",
  };

  return (
    <section id="ritual-finder" className={`${styles.section} ${styles.dark} ${styles.onDark} ${styles.finder}`} aria-labelledby="finder-title">
      <Symbol className={styles.finderArch} />
      <div className={styles.container}>
        <div className={styles.finderGrid}>
          <div className={styles.finderIntro} data-reveal>
            <p className={styles.eyebrow}>Find your ritual</p>
            <h2 id="finder-title" className={styles.h2}>
              Cơ thể bạn đang <em>cần điều gì?</em>
            </h2>
            <p className={styles.lead}>Không cần biết trước tên liệu trình. Hãy chia sẻ một vài mong muốn, Miên An sẽ gợi ý một nghi thức phù hợp với khoảng thời gian và sở thích của bạn.</p>
            <p className={styles.finderNote}>Công cụ gợi ý chạy ngay trên trình duyệt của bạn, không thay thế tư vấn sức khoẻ hoặc chuyên môn.</p>
          </div>
          <div className={styles.finderPanelWrap} data-reveal>
            <div className={styles.panel}>
              <div className={styles.panelTop}>
                <span>Ritual Finder</span>
                {step >= 1 && step <= 3 ? (
                  <span className={styles.progress} aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                      <i key={n} className={n <= step ? styles.on : ""} />
                    ))}
                  </span>
                ) : (
                  <span className={styles.badge}>Gợi ý</span>
                )}
              </div>
              <p style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }} aria-live="polite" role="status">
                {step >= 1 && step <= 3 ? `Bước ${step} trên 3` : step === 4 ? `${results.length} gợi ý` : ""}
              </p>

              <div key={step} className={step === 4 ? styles.resAnim : styles.stepAnim} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 ref={heading} tabIndex={-1} className={styles.panelTitle}>
                  {titles[step]}
                </h3>

                {step === 0 && (
                  <>
                    <ul className={styles.idleList}>
                      <li><span>01</span>Chọn mong muốn hôm nay.</li>
                      <li><span>02</span>Cho biết khoảng thời gian bạn có.</li>
                      <li><span>03</span>Chọn mức áp lực và sở thích hương liệu.</li>
                    </ul>
                    <div className={styles.panelActions}>
                      <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setStep(1)}>
                        Bắt đầu tìm nghi thức
                      </button>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <fieldset className={`${styles.fieldset} ${err ? styles.fieldInvalid : ""}`} aria-describedby={err ? "f-err" : undefined}>
                      <legend className={styles.legend}>Chọn một mong muốn</legend>
                      <div className={`${styles.options} ${styles.two}`}>
                        {GOALS.map((g) => (
                          <label key={g.value} className={styles.opt}>
                            <input type="radio" name="goal" value={g.value} checked={a.goal === g.value} aria-invalid={!!err} onChange={() => { setA({ ...a, goal: g.value as RitualGoal }); setErr(null); }} />
                            <span className={styles.optBox}>
                              <span className={styles.tick}><Check /></span>
                              <span className={styles.txt}>{g.label}<small>{g.hint}</small></span>
                            </span>
                          </label>
                        ))}
                      </div>
                      {err && <p id="f-err" className={styles.error} role="alert">{err}</p>}
                    </fieldset>
                    <div className={styles.panelActions}>
                      <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={next}>Tiếp tục</button>
                      <button type="button" className={styles.textBtn} onClick={reset}>Bắt đầu lại</button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <fieldset className={`${styles.fieldset} ${err ? styles.fieldInvalid : ""}`} aria-describedby={err ? "f-err" : undefined}>
                      <legend className={styles.legend}>Thời gian tối đa</legend>
                      <div className={`${styles.options} ${styles.two}`}>
                        {DURATIONS.map((d) => (
                          <label key={d} className={styles.opt}>
                            <input type="radio" name="dur" value={d} checked={a.maxDuration === d} aria-invalid={!!err} onChange={() => { setA({ ...a, maxDuration: d }); setErr(null); }} />
                            <span className={styles.optBox}>
                              <span className={styles.tick}><Check /></span>
                              <span className={styles.txt}>Tối đa {d}&nbsp;phút</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      {err && <p id="f-err" className={styles.error} role="alert">{err}</p>}
                    </fieldset>
                    <div className={styles.panelActions}>
                      <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={next}>Tiếp tục</button>
                      <button type="button" className={styles.textBtn} onClick={back}>Quay lại</button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <fieldset className={styles.fieldset}>
                      <legend className={styles.legend}>Mức áp lực</legend>
                      <div className={`${styles.options} ${styles.row}`}>
                        {([["any", "Chưa quyết định"], ["light", "Nhẹ"], ["medium", "Vừa"]] as [Pressure | "any", string][]).map(([v, l]) => (
                          <label key={v} className={styles.opt}>
                            <input type="radio" name="pressure" value={v} checked={a.pressure === v} onChange={() => setA({ ...a, pressure: v })} />
                            <span className={`${styles.optBox} ${styles.compact}`}><span className={styles.tick}><Check /></span><span className={styles.txt}>{l}</span></span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                      <legend className={styles.legend}>Sở thích khác</legend>
                      <div className={`${styles.options} ${styles.row}`}>
                        <label className={styles.opt}>
                          <input type="checkbox" checked={a.avoidHotStone} onChange={(e) => setA({ ...a, avoidHotStone: e.target.checked })} />
                          <span className={`${styles.optBox} ${styles.compact}`}><span className={`${styles.tick} ${styles.checkBox}`}><Check /></span><span className={styles.txt}>Không dùng đá ấm</span></span>
                        </label>
                        <label className={styles.opt}>
                          <input type="checkbox" checked={a.unscented} onChange={(e) => setA({ ...a, unscented: e.target.checked })} />
                          <span className={`${styles.optBox} ${styles.compact}`}><span className={`${styles.tick} ${styles.checkBox}`}><Check /></span><span className={styles.txt}>Không hương liệu</span></span>
                        </label>
                      </div>
                    </fieldset>
                    <div className={styles.panelActions}>
                      <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={next}>Xem gợi ý</button>
                      <button type="button" className={styles.textBtn} onClick={back}>Quay lại</button>
                    </div>
                  </>
                )}

                {step === 4 && results.length > 0 && (
                  <>
                    <div className={styles.results}>
                      {results.slice(0, 1).map(({ ritual: r }) => (
                        <article key={r.id} className={styles.resMain} data-testid="finder-main">
                          <div className={styles.resImg}>
                            <Image src={`${r.image}-600.webp`} alt={r.imageAlt} fill sizes="(min-width: 640px) 180px, 90vw" />
                          </div>
                          <div className={styles.resBody}>
                            <span className={styles.tagMain}>Gợi ý chính</span>
                            <h4 className={styles.h3}>{r.name}</h4>
                            <p className={styles.resMeta}>{r.subtitle} · {r.durationMinutes}&nbsp;phút · {formatVnd(r.priceVnd)}</p>
                            <p>{r.description}</p>
                            <div className={styles.resRow}>
                              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => pick(r.id)}>Chọn nghi thức này</button>
                              <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => openDetail(r.id)}>Xem chi tiết</button>
                            </div>
                            {chosen === r.id && <p className={styles.chosenNote} role="status">Đã chuyển sang phần xem trước lịch hẹn.</p>}
                          </div>
                        </article>
                      ))}
                      {results.length > 1 && (
                        <div className={styles.resSec}>
                          <p className={styles.legend} style={{ marginBottom: 0 }}>Lựa chọn phụ</p>
                          {results.slice(1).map(({ ritual: r }) => (
                            <div key={r.id} className={styles.resMini} data-testid="finder-alt">
                              <div>
                                <h4>{r.name}</h4>
                                <p className={styles.resMeta}>{r.durationMinutes}&nbsp;phút · {formatVnd(r.priceVnd)}</p>
                              </div>
                              <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} style={{ minHeight: 46 }} onClick={() => pick(r.id)}>Chọn nghi thức này</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={styles.panelActions}>
                      <button type="button" className={styles.textBtn} onClick={() => setStep(3)}>Điều chỉnh lựa chọn</button>
                      <button type="button" className={styles.textBtn} onClick={reset}>Bắt đầu lại</button>
                    </div>
                  </>
                )}

                {step === 4 && results.length === 0 && (
                  <>
                    <div className={styles.empty} role="status" data-testid="finder-empty">
                      <p>Chưa tìm thấy nghi thức phù hợp với tất cả lựa chọn của bạn. Hãy thử dành thêm thời gian hoặc điều chỉnh sở thích chăm sóc.</p>
                      <div className={styles.resRow}>
                        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setStep(3)}>Điều chỉnh lựa chọn</button>
                        <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => scroll("rituals")}>Xem tất cả liệu trình</button>
                      </div>
                    </div>
                    <div className={styles.panelActions}>
                      <button type="button" className={styles.textBtn} onClick={reset}>Bắt đầu lại</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
