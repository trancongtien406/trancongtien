"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COPY } from "../data/copy";
import { CANCEL_POLICY, PLACES, TOURS, getTour, type Lang } from "../data/tours";
import { pick, vnd } from "../lib/format";
import { MAX_GUESTS, calculateTripPrice } from "../lib/pricing";
import styles from "../brand.module.css";
import { RouteMap, fmtMin, stopAt, toMin } from "./RouteMap";
import { useTrip } from "./TripProvider";

const SAVED_KEY = "rd-saved-v1";
type Saved = { tourId: string; adults: number; children: number; singleRooms: number; includeAdmission: boolean; total: number; savedAt: string; lang: Lang };

export function Explorer({ consultHref }: { consultHref: string }) {
  const { lang, state, patch, selectTour } = useTrip();
  const t = COPY[lang].explorer;
  const tour = getTour(state.tourId);
  const day = tour.days.find((d) => d.id === state.dayId) ?? tour.days[0];
  const stop = day.stops.find((s) => s.id === state.stopId) ?? null;
  const hasRooms = tour.pricing.singleRoomSupplement > 0;

  const price = calculateTripPrice(tour, { adults: state.adults, children: state.children, singleRooms: state.singleRooms, includeAdmission: state.includeAdmission });
  const totalGuests = state.adults + state.children;

  const [status, setStatus] = useState<{ kind: "ok" | "bad"; msg: string } | null>(null);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [fallbackText, setFallbackText] = useState<string | null>(null);

  // Đồng hồ hành trình: thanh giờ điều khiển xe chạy trên bản đồ
  const startMin = toMin(day.stops[0].time);
  const endMin = toMin(day.stops[day.stops.length - 1].time);
  const [clock, setClock] = useState(startMin);
  const [playing, setPlaying] = useState(false);
  const lastStop = useRef<string | null>(null);
  const clockRef = useRef(startMin);
  useEffect(() => { const m = toMin(day.stops[0].time); clockRef.current = m; setClock(m); setPlaying(false); lastStop.current = null; }, [tour.id, day.id, day.stops]);
  const clockStop = stopAt(day.stops, clock);
  const syncStop = (m: number) => {
    const sid = stopAt(day.stops, m).id;
    if (sid !== lastStop.current) { lastStop.current = sid; patch({ stopId: sid }); }
  };
  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // reduced-motion: nhảy từng điểm dừng, không chạy liên tục
      const id = window.setInterval(() => {
        const nx = day.stops.map((s) => toMin(s.time)).find((x) => x > clockRef.current);
        if (nx === undefined) { setPlaying(false); return; }
        clockRef.current = nx; setClock(nx); syncStop(nx);
      }, 1400);
      return () => window.clearInterval(id);
    }
    let raf = 0;
    let last = performance.now();
    const perMs = (endMin - startMin) / 14000; // cả ngày chạy trong khoảng 14 giây
    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const nx = Math.min(endMin, clockRef.current + dt * perMs);
      clockRef.current = nx;
      setClock(nx);
      syncStop(nx);
      if (nx >= endMin) { setPlaying(false); return; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, day.id, tour.id]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_KEY);
      if (raw) setSaved(JSON.parse(raw) as Saved);
    } catch { /* bỏ qua */ }
  }, []);
  useEffect(() => { setStatus(null); setFallbackText(null); }, [lang, state.tourId]);

  const planText = useMemo(() => {
    if (!price.ok) return "";
    const v = price.value;
    const lines = [
      `${pick(tour.name, lang)} (${tour.id})`,
      `${t.depart}: ${tour.departure} · ${t.duration}: ${pick(tour.durationLabel, lang)}`,
      `${t.adults}: ${state.adults} · ${t.children}: ${state.children}${hasRooms ? ` · ${t.room}: ${state.singleRooms}` : ""}`,
      `${t.svc}: ${vnd(v.serviceSubtotal)}`,
      `${t.adm}: ${vnd(v.admissionSubtotal)}`,
      ...(hasRooms ? [`${t.room}: ${vnd(v.roomSupplement)}`] : []),
      `${t.total}: ${vnd(v.grandTotal)}`,
      t.disclaimer,
    ];
    return lines.join("\n");
  }, [price, tour, lang, t, state.adults, state.children, state.singleRooms, hasRooms]);

  function save() {
    if (!price.ok) return setStatus({ kind: "bad", msg: t.invalid });
    const rec: Saved = { tourId: tour.id, adults: state.adults, children: state.children, singleRooms: state.singleRooms, includeAdmission: state.includeAdmission, total: price.value.grandTotal, savedAt: new Date().toISOString(), lang };
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(rec));
      setSaved(rec);
      setStatus({ kind: "ok", msg: t.saved });
    } catch {
      setStatus({ kind: "bad", msg: t.saveFail });
    }
  }
  async function copy() {
    if (!price.ok) return setStatus({ kind: "bad", msg: t.invalid });
    try {
      await navigator.clipboard.writeText(planText);
      setFallbackText(null);
      setStatus({ kind: "ok", msg: t.copied });
    } catch {
      setFallbackText(planText);
      setStatus({ kind: "bad", msg: t.copyFail });
    }
  }
  function viewSaved() {
    if (!saved) return;
    selectTour(saved.tourId as never);
    patch({ tourId: saved.tourId as never, adults: saved.adults, children: saved.children, singleRooms: saved.singleRooms, includeAdmission: saved.includeAdmission });
    setStatus({ kind: "ok", msg: `${t.savedHeading}: ${pick(getTour(saved.tourId).name, lang)}` });
  }

  const setAdults = (n: number) => patch({ adults: n, singleRooms: Math.min(state.singleRooms, n) });
  const cancel = CANCEL_POLICY[tour.cancel];
  const roomErr = price.ok ? null : price.error;

  return (
    <section id="itinerary" className={`${styles.section} ${styles.explorerSec}`} aria-labelledby="rd-explorer">
      <div className={styles.wrap}>
        <div className={styles.explorerHead}>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
            <h2 id="rd-explorer" className={styles.h2} tabIndex={-1} data-focus-target>{t.title}</h2>
          </div>
          <p className={styles.lead}>{t.lead}</p>
        </div>

        <div role="group" aria-label={t.choose}>
          <div className={styles.tabs}>
            {TOURS.map((x) => (
              <button key={x.id} type="button" className={styles.tab} aria-pressed={x.id === tour.id} data-testid="tour-tab" data-tour={x.id} onClick={() => selectTour(x.id)}>
                <b>{x.id}</b>
                <span>{pick(x.name, lang)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.exGrid}>
          <div>
            <h3 className={styles.h3} style={{ marginBottom: 12 }} data-testid="explorer-tour-name">{pick(tour.name, lang)}</h3>
            <p style={{ marginBottom: 16, maxWidth: "58ch" }}>{pick(tour.summary, lang)}</p>
            <dl className={styles.metaBar}>
              <div><dt>{t.depart}</dt><dd>{tour.departure}</dd></div>
              <div><dt>{t.duration}</dt><dd>{pick(tour.durationLabel, lang)}</dd></div>
              <div className={styles.wide}><dt>{t.pickup}</dt><dd>{pick(tour.pickup, lang)}</dd></div>
              <div className={styles.wide}><dt>{t.effort}</dt><dd>{pick(tour.effort, lang)}</dd></div>
            </dl>

            {tour.days.length > 1 && (
              <div className={styles.dayTabs} role="group" aria-label={t.day}>
                {tour.days.map((d, i) => (
                  <button key={d.id} type="button" className={styles.dayTab} aria-pressed={d.id === day.id} data-day={d.id}
                    onClick={() => patch({ dayId: d.id, stopId: null })}>
                    {t.day} {i + 1} · {pick(d.title, lang)}
                  </button>
                ))}
              </div>
            )}

            <h4 className={styles.label} style={{ marginBottom: 10 }}>{t.stops}</h4>
            <ol className={styles.timeline} data-testid="timeline">
              {day.stops.map((s) => (
                <li key={s.id}>
                  <button type="button" className={styles.stopBtn} aria-pressed={s.id === stop?.id} data-stop={s.id}
                    onClick={() => { if (s.id !== stop?.id) { clockRef.current = toMin(s.time); setClock(clockRef.current); setPlaying(false); lastStop.current = s.id; } patch({ stopId: s.id === stop?.id ? null : s.id }); }}>
                    <span className={styles.stopTime}>{s.time}</span>
                    <span>{pick(s.label, lang)}</span>
                    <span className={styles.stopWhere}>{PLACES[s.place].name[lang]}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.mapCol}>
            <div className={styles.mapHead}>
              <h4 className={styles.h3} style={{ fontSize: "1.2rem" }}>{t.mapTitle}</h4>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} style={{ minHeight: 44, padding: "6px 16px", boxShadow: "3px 3px 0 var(--rd-forest)" }}
                aria-pressed={state.showMap} onClick={() => patch({ showMap: !state.showMap })}>
                {state.showMap ? t.mapHide : t.mapShow}
              </button>
            </div>
            {state.showMap && (
              <div className={styles.mapBox}>
                <RouteMap lang={lang} stops={day.stops} selectedId={stop?.id ?? null} onSelect={(id) => { const st = day.stops.find((x) => x.id === id); if (st) { clockRef.current = toMin(st.time); setClock(clockRef.current); lastStop.current = id; } patch({ stopId: id }); }} clock={clock} />
              </div>
            )}
            {state.showMap && (
              <div className={styles.clockBar} data-testid="journey-clock">
                <button type="button" className={styles.clockPlay} aria-pressed={playing} onClick={() => { if (!playing && clock >= endMin) { clockRef.current = startMin; setClock(startMin); lastStop.current = null; } setPlaying((p) => !p); }} data-testid="clock-play">
                  <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
                  <span className={styles.sr}>{playing ? t.clockPause : t.clockPlay}</span>
                </button>
                <label className={styles.clockLabel}>
                  <span className={styles.label}>{t.clockLabel}</span>
                  <input type="range" min={startMin} max={endMin} step={5} value={Math.round(clock / 5) * 5}
                    aria-valuetext={`${fmtMin(clock)} · ${pick(clockStop.label, lang)}`} data-testid="clock-range"
                    onChange={(e) => { const m = Number(e.target.value); setPlaying(false); clockRef.current = m; setClock(m); syncStop(m); }} />
                </label>
                <output className={styles.clockOut} aria-hidden="true">{fmtMin(clock)}</output>
              </div>
            )}
            <div className={styles.mapSel} aria-live="polite" data-testid="selected-stop">
              {stop ? (
                <>
                  <b>{stop.time}</b>
                  <span>
                    <span className={styles.label} style={{ display: "block" }}>{t.selected} · {PLACES[stop.place].name[lang]}</span>
                    {pick(stop.label, lang)}
                  </span>
                </>
              ) : (
                <span className={styles.small}>{t.selected}: {lang === "vi" ? "chọn một giờ trong lịch trình hoặc chạm vào điểm trên bản đồ" : "pick a time in the itinerary or tap a pin on the map"}</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.panels}>
          <div className={styles.panel}>
            <h3>{t.inc}</h3>
            <ul className={styles.tick}>{tour.included.map((x) => <li key={x.vi}>{pick(x, lang)}</li>)}</ul>
          </div>
          <div className={styles.panel}>
            <h3>{t.exc}</h3>
            <ul className={styles.cross}>{tour.excluded.map((x) => <li key={x.vi}>{pick(x, lang)}</li>)}</ul>
          </div>
          <div className={styles.panel}>
            <h3>{t.cancel}</h3>
            <p className={styles.small} style={{ marginBottom: 6 }}>{pick(cancel.title, lang)}</p>
            {cancel.rows.map((r) => (
              <div key={r.when.vi} className={styles.cancelRow}>
                <span>{pick(r.when, lang)}</span>
                <b>{r.refund}</b>
              </div>
            ))}
            <p className={styles.small} style={{ marginTop: 8 }}>{t.refund}</p>
          </div>
        </div>

        <div className={styles.calc} data-testid="calculator">
          <div className={styles.calcTop}>
            <div className={styles.calcL}>
              <h3 className={styles.h3}>{t.calcTitle}</h3>
              <p className={styles.small}>{t.calcWho}</p>
              <div>
                <div className={styles.stepRow}>
                  <div>
                    <strong id="rd-adults-l">{t.adults}</strong>
                    <p className={styles.small}>{t.adultsHint} · {vnd(tour.pricing.adultBase)}</p>
                  </div>
                  <div className={styles.stepper}>
                    <button type="button" className={styles.stepBtn} aria-label={t.subAdult} disabled={state.adults <= 1} onClick={() => setAdults(state.adults - 1)}>−</button>
                    <output className={styles.stepVal} aria-labelledby="rd-adults-l" data-testid="adults">{state.adults}</output>
                    <button type="button" className={styles.stepBtn} aria-label={t.addAdult} disabled={totalGuests >= MAX_GUESTS} onClick={() => setAdults(state.adults + 1)}>+</button>
                  </div>
                </div>
                <div className={styles.stepRow}>
                  <div>
                    <strong id="rd-children-l">{t.children}</strong>
                    <p className={styles.small}>{t.childrenHint} · {vnd(tour.pricing.childBase)}</p>
                  </div>
                  <div className={styles.stepper}>
                    <button type="button" className={styles.stepBtn} aria-label={t.subChild} disabled={state.children <= 0} onClick={() => patch({ children: state.children - 1 })}>−</button>
                    <output className={styles.stepVal} aria-labelledby="rd-children-l" data-testid="children">{state.children}</output>
                    <button type="button" className={styles.stepBtn} aria-label={t.addChild} disabled={totalGuests >= MAX_GUESTS} onClick={() => patch({ children: state.children + 1 })}>+</button>
                  </div>
                </div>
                {hasRooms && (
                  <div className={styles.stepRow}>
                    <div>
                      <strong id="rd-rooms-l">{t.roomCount}</strong>
                      <p className={styles.small}>{t.roomNote}</p>
                    </div>
                    <div className={styles.stepper}>
                      <button type="button" className={styles.stepBtn} aria-label={`${t.room} −`} disabled={state.singleRooms <= 0} onClick={() => patch({ singleRooms: state.singleRooms - 1 })}>−</button>
                      <output className={styles.stepVal} aria-labelledby="rd-rooms-l" data-testid="rooms">{state.singleRooms}</output>
                      <button type="button" className={styles.stepBtn} aria-label={`${t.room} +`} disabled={state.singleRooms >= state.adults} onClick={() => patch({ singleRooms: state.singleRooms + 1 })}>+</button>
                    </div>
                  </div>
                )}
              </div>
              <p className={styles.small}>
                {totalGuests >= MAX_GUESTS ? t.maxGuests : state.adults <= 1 ? t.minAdult : `${totalGuests} ${t.guestsWord}`} · {t.under5}
              </p>
              <label className={styles.check}>
                <input type="checkbox" checked={state.includeAdmission} onChange={(e) => patch({ includeAdmission: e.target.checked })} data-testid="toggle-adm" />
                <span>{t.toggleAdm}</span>
              </label>
            </div>

            <div className={styles.calcR}>
              <h3 className={styles.h3} style={{ fontSize: "1.25rem" }}>{t.breakdown}</h3>
              {price.ok ? (
                <>
                  <dl className={styles.bd}>
                    <div className={styles.bdRow}><dt>{t.svc}</dt><dd data-testid="svc">{vnd(price.value.serviceSubtotal)}</dd></div>
                    <div className={styles.bdRow}><dt>{t.adm}</dt><dd data-testid="adm">{vnd(price.value.admissionSubtotal)}</dd></div>
                    {hasRooms && <div className={styles.bdRow}><dt>{t.room}</dt><dd data-testid="room">{vnd(price.value.roomSupplement)}</dd></div>}
                  </dl>
                  <div className={styles.totalBox} aria-live="polite">
                    <span className={styles.label}>{state.includeAdmission ? t.total : t.totalSvc}</span>
                    <span className={styles.big} data-testid="total">{vnd(price.value.displayedTotal)}</span>
                    {!state.includeAdmission && <span className={styles.small} style={{ color: "#d6dccb" }}>{t.totalAll}: {vnd(price.value.grandTotal)}</span>}
                  </div>
                </>
              ) : (
                <p className={styles.err} role="alert">{t.invalid} ({roomErr})</p>
              )}
              <div className={styles.formActions}>
                <button type="button" className={`${styles.btn} ${styles.btnRed}`} onClick={save} data-testid="save-plan">{t.save}</button>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={copy} data-testid="copy-plan">{t.copy}</button>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={viewSaved} disabled={!saved} data-testid="view-saved">{t.viewSaved}</button>
              </div>
              <p role="status" className={`${styles.status} ${status?.kind === "ok" ? styles.statusOk : status ? styles.statusBad : ""}`} data-testid="plan-status">{status?.msg ?? ""}</p>
              {fallbackText && <textarea className={styles.copyArea} readOnly value={fallbackText} aria-label={t.copy} onFocus={(e) => e.currentTarget.select()} />}
              {saved ? (
                <p className={styles.savedBox}>
                  <strong>{t.savedHeading}:</strong> {pick(getTour(saved.tourId).name, lang)} · {saved.adults}+{saved.children} {t.guestsWord} · {vnd(saved.total)}
                </p>
              ) : (
                <p className={styles.small}>{t.noSaved}</p>
              )}
              <a className={`${styles.btn} ${styles.btnYellow}`} href={consultHref} data-cta="consult">{t.consult} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className={styles.calcNotes}>
            <p><b>{t.disclaimer}</b></p>
            <p>{t.ageNote} {t.timeNote}</p>
            <p>{t.notBooking} {t.noPayment}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
