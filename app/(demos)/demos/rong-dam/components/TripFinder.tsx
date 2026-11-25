"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COPY } from "../data/copy";
import { pick, vnd } from "../lib/format";
import { BUDGET_MAX, BUDGET_MIN, BUDGET_STEP, MAX_INTERESTS, findTrips, validateFinder, type DurationOption, type FinderErrors } from "../lib/finder";
import type { Companion, Interest } from "../data/tours";
import styles from "../brand.module.css";
import { useTrip } from "./TripProvider";
import { goToExplorer } from "./nav";

const DURS: DurationOption[] = ["half-day", "one-day", "two-days", "three-plus"];
const INTS: Interest[] = ["nature", "culture", "food", "photography", "relaxation"];
const COMPS: Companion[] = ["solo", "couple", "family", "friends"];

export function TripFinder() {
  const { lang, state, setFinder, patch, selectTour, reset } = useTrip();
  const t = COPY[lang].finder;
  const f = state.finder;
  const [errors, setErrors] = useState<FinderErrors>({});
  const [budgetText, setBudgetText] = useState(String(f.maxBudget));
  const resRef = useRef<HTMLHeadingElement>(null);
  const didSubmit = useRef(false);

  useEffect(() => {
    // đồng bộ ô số khi trạng thái đổi từ ngoài (khôi phục, đặt lại, kéo thanh trượt)
    setBudgetText(String(f.maxBudget));
  }, [f.maxBudget]);

  const submitted = state.submitted;
  const results = useMemo(() => (submitted ? findTrips(submitted) : []), [submitted]);
  const stale = !!submitted && JSON.stringify(submitted) !== JSON.stringify(f);

  useEffect(() => {
    if (didSubmit.current && submitted) {
      resRef.current?.focus();
      didSubmit.current = false;
    }
  }, [submitted]);

  const emptyHint = useMemo(() => {
    if (!submitted || results.length) return "";
    const wide = findTrips({ ...submitted, maxBudget: BUDGET_MAX });
    return wide.length ? t.emptyBudget : t.emptyTime;
  }, [submitted, results.length, t.emptyBudget, t.emptyTime]);

  function run() {
    const e = validateFinder(f);
    setErrors(e);
    if (Object.keys(e).length) return;
    didSubmit.current = true;
    patch({ submitted: { ...f, interests: [...f.interests] } });
  }

  function onBudgetText(v: string) {
    const digits = v.replace(/[^\d]/g, "");
    setBudgetText(digits);
    const n = Number(digits);
    if (digits && Number.isInteger(n) && n >= BUDGET_MIN && n <= BUDGET_MAX) {
      setFinder({ maxBudget: n });
      setErrors((e) => ({ ...e, budget: undefined }));
    } else {
      setErrors((e) => ({ ...e, budget: true }));
    }
  }

  function toggleInterest(i: Interest) {
    const has = f.interests.includes(i);
    if (!has && f.interests.length >= MAX_INTERESTS) return;
    setFinder({ interests: has ? f.interests.filter((x) => x !== i) : [...f.interests, i] });
  }

  return (
    <section id="trip-finder" className={`${styles.section} ${styles.finderSec}`} aria-labelledby="rd-finder">
      <div className={`${styles.wrap} ${styles.finderGrid}`}>
        <div className={styles.finderIntro}>
          <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
          <h2 id="rd-finder" className={styles.h2}>{t.title}</h2>
          <p className={styles.lead}>{t.lead}</p>
          <span className={`${styles.sticker} ${styles.stickerWhite}`}>{lang === "vi" ? "Chạy ngay trên máy bạn" : "Runs right on your device"}</span>
        </div>

        <div>
          <form
            className={styles.form}
            noValidate
            data-testid="finder-form"
            onSubmit={(e) => {
              e.preventDefault();
              run();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.nativeEvent.isComposing) e.preventDefault();
            }}
          >
            <fieldset className={styles.field} aria-describedby={errors.duration ? "rd-err-dur" : undefined}>
              <legend className={styles.legend}>{t.qTime}</legend>
              <div className={styles.chips}>
                {DURS.map((d) => (
                  <label key={d} className={styles.chip}>
                    <input type="radio" name="rd-duration" value={d} checked={f.duration === d}
                      onChange={() => { setFinder({ duration: d }); setErrors((e) => ({ ...e, duration: undefined })); }} />
                    <span>{t.durations[d]}</span>
                  </label>
                ))}
              </div>
              {errors.duration && <p id="rd-err-dur" className={styles.err} role="alert">{t.errDuration}</p>}
            </fieldset>

            <div className={styles.field}>
              <label className={styles.legend} htmlFor="rd-budget-num" style={{ display: "block" }}>{t.qBudget}</label>
              <div className={styles.budgetRow}>
                <input type="range" className={styles.range} min={BUDGET_MIN} max={BUDGET_MAX} step={BUDGET_STEP}
                  value={f.maxBudget} aria-label={t.qBudget} aria-valuetext={vnd(f.maxBudget)}
                  onChange={(e) => { setFinder({ maxBudget: Number(e.target.value) }); setErrors((x) => ({ ...x, budget: undefined })); }} />
                <div className={styles.numWrap}>
                  <input id="rd-budget-num" className={styles.num} inputMode="numeric" autoComplete="off" value={budgetText}
                    aria-label={t.budgetNum} aria-invalid={errors.budget ? true : undefined} aria-describedby={errors.budget ? "rd-err-bud rd-bud-note" : "rd-bud-note"}
                    onChange={(e) => onBudgetText(e.target.value)} />
                  <span aria-hidden="true" style={{ fontWeight: 700 }}>₫</span>
                </div>
              </div>
              <p id="rd-bud-note" className={`${styles.small}`} style={{ marginTop: 6 }}>
                <strong>{vnd(f.maxBudget)}</strong> · {t.budgetNote}
              </p>
              {errors.budget && <p id="rd-err-bud" className={styles.err} role="alert">{t.errBudget}</p>}
            </div>

            <fieldset className={styles.field}>
              <legend className={styles.legend}>
                {t.qInterest} <span className={styles.hint}>({t.qInterestHint})</span>
              </legend>
              <div className={styles.chips}>
                {INTS.map((i) => (
                  <label key={i} className={styles.chip}>
                    <input type="checkbox" name="rd-interest" value={i} checked={f.interests.includes(i)} onChange={() => toggleInterest(i)} />
                    <span>{t.interests[i]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.field} aria-describedby={errors.companion ? "rd-err-who" : undefined}>
              <legend className={styles.legend}>{t.qWho}</legend>
              <div className={styles.chips}>
                {COMPS.map((c) => (
                  <label key={c} className={styles.chip}>
                    <input type="radio" name="rd-companion" value={c} checked={f.companion === c}
                      onChange={() => { setFinder({ companion: c }); setErrors((e) => ({ ...e, companion: undefined })); }} />
                    <span>{t.companions[c]}</span>
                  </label>
                ))}
              </div>
              {errors.companion && <p id="rd-err-who" className={styles.err} role="alert">{t.errCompanion}</p>}
            </fieldset>

            <div className={styles.formActions}>
              <button type="submit" className={`${styles.btn} ${styles.btnRed}`} data-testid="finder-submit">{t.submit}</button>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => { reset(); setErrors({}); }}>{t.reset}</button>
            </div>
          </form>

          <div className={styles.results} aria-live="polite" data-testid="finder-results" style={{ marginTop: 28 }}>
            {submitted && (
              <>
                <div className={styles.resHead}>
                  <h3 className={styles.h3} tabIndex={-1} ref={resRef}>{results.length ? t.resTitle : t.emptyTitle}</h3>
                  {results.length > 0 && <span className={styles.small}>{t.resSub}</span>}
                </div>
                {stale && (
                  <p className={styles.stale} role="status" data-testid="finder-stale">
                    <span>{t.stale}</span>
                    <button type="button" className={`${styles.btn} ${styles.btnGhost}`} style={{ minHeight: 44, padding: "8px 16px" }} onClick={run}>{t.rerun}</button>
                  </p>
                )}
                {results.length === 0 ? (
                  <div className={styles.empty} data-testid="finder-empty">
                    <p><strong>{t.emptyBody}</strong></p>
                    <p style={{ marginTop: 6 }}>{emptyHint}</p>
                    <p className={styles.small} style={{ marginTop: 6 }}>{t.emptyAction}</p>
                  </div>
                ) : (
                  <ol className={styles.resList}>
                    {results.map((m, idx) => (
                      <li key={m.id} className={styles.res} data-testid="finder-result" data-tour={m.id}>
                        <span className={styles.resNo} aria-hidden="true">0{idx + 1}</span>
                        <div style={{ display: "grid", gap: 8 }}>
                          <p className={styles.h3} style={{ fontSize: "1.3rem" }}>
                            {pick(m.tour.name, lang)}
                            {idx === 0 && <span className={styles.sticker} style={{ marginLeft: 10, verticalAlign: "middle" }}>{t.best}</span>}
                          </p>
                          <ul className={styles.reasons}>
                            {m.reasons.map((r) => (
                              <li key={r}>{r === "companion" ? t.reasons[submitted.companion!] : t.reasons[r]}</li>
                            ))}
                          </ul>
                          <p className={styles.small}>
                            {t.admIncluded} · {t.left}: {vnd(m.remaining)}
                          </p>
                        </div>
                        <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
                          <p className={styles.price}>{vnd(m.cost)}</p>
                          <button type="button" className={`${styles.btn} ${styles.btnYellow}`} onClick={() => { selectTour(m.id); goToExplorer(); }}>
                            {t.explore}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
