"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TOURS, type Lang } from "../data/tours";
import { OPS } from "../data/ops";
import { pick } from "../lib/format";
import styles from "../brand.module.css";
import { useTrip } from "./TripProvider";
import { goToExplorer } from "./nav";

const GLYPHS = "ABCDEFGHJKLMNOPRSTUVXYZ0123456789";
const nowVN = () => {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Ho_Chi_Minh", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(new Date());
  const g = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0) % 24;
  return g("hour") * 3600 + g("minute") * 60 + g("second");
};
const toSec = (hhmm: string) => Number(hhmm.slice(0, 2)) * 3600 + Number(hhmm.slice(3, 5)) * 60;

/** Một ô chữ của bảng lật: đổi ký tự ngẫu nhiên vài nhịp rồi dừng ở ký tự thật. */
function Flap({ ch, play, delay }: { ch: string; play: boolean; delay: number }) {
  const [shown, setShown] = useState(ch);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (ch === " ") { setShown(" "); return; }
    if (!play) { setShown(ch); return; }
    let n = 0;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        n++;
        if (n >= 6) { window.clearInterval(id); setShown(ch); setTick((t) => t + 1); return; }
        setShown(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        setTick((t) => t + 1);
      }, 60);
    }, delay);
    return () => { window.clearTimeout(start); window.clearInterval(id); };
  }, [ch, play, delay]);
  return <span key={tick} className={styles.flap} data-flap={tick ? "1" : "0"}>{shown}</span>;
}

function FlapText({ text, play, base = 0 }: { text: string; play: boolean; base?: number }) {
  return (
    <span className={styles.flapRow} aria-hidden="true">
      {Array.from(text).map((c, i) => <Flap key={i} ch={c === " " ? " " : c.toUpperCase()} play={play} delay={base + i * 28} />)}
    </span>
  );
}

export function DepartureBoard({ lang }: { lang: Lang }) {
  const t = OPS[lang].board;
  const { selectTour } = useTrip();
  const rows = useMemo(() => [...TOURS].sort((a, b) => toSec(a.departure) - toSec(b.departure)), []);
  const boardRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [sec, setSec] = useState<number | null>(null);

  // bảng lật chạy một lần khi vào khung nhìn (reduced-motion: hiện luôn chữ cuối)
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setPlay(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // đồng hồ đếm ngược: 1 nhịp/giây, tạm dừng khi tab ẩn hoặc ngoài khung nhìn
  useEffect(() => {
    const el = boardRef.current;
    let visible = true;
    const tick = () => { if (visible && !document.hidden) setSec(nowVN()); };
    tick();
    const id = window.setInterval(tick, 1000);
    const io = el ? new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) tick(); }, { threshold: 0 }) : null;
    if (el && io) io.observe(el);
    return () => { window.clearInterval(id); io?.disconnect(); };
  }, []);

  const next = useMemo(() => {
    if (sec === null) return null;
    const upcoming = rows.filter((r) => toSec(r.departure) > sec);
    const tour = upcoming[0] ?? rows[0];
    const target = toSec(tour.departure) + (upcoming[0] ? 0 : 86400);
    const left = target - sec;
    return { tour, left, tomorrow: !upcoming[0] };
  }, [rows, sec]);

  const parts = next ? [Math.floor(next.left / 3600), Math.floor((next.left % 3600) / 60), next.left % 60] : [0, 0, 0];
  const units = [t.hh, t.mm, t.ss];

  return (
    <section id="lich" className={`${styles.section} ${styles.boardSec} ${styles.onDark}`} aria-labelledby="rd-board">
      <div className={styles.wrap}>
        <div className={styles.boardHead}>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
            <h2 id="rd-board" className={styles.h2}>{t.title}</h2>
            <p className={styles.lead} style={{ marginTop: 14 }}>{t.lead}</p>
          </div>
          <div className={styles.countdown} data-testid="countdown" aria-live="off">
            <span className={styles.label}>{t.next}</span>
            <div className={styles.cdDigits} role="timer" aria-label={next ? `${String(parts[0]).padStart(2, "0")}:${String(parts[1]).padStart(2, "0")}:${String(parts[2]).padStart(2, "0")}` : undefined}>
              {parts.map((v, i) => (
                <div key={i} className={styles.cdCell}>
                  <span className={styles.cdNum} key={`${i}-${v}`} data-changed={i === 2 ? "1" : "0"}>{next ? String(v).padStart(2, "0") : "--"}</span>
                  <span className={styles.cdUnit}>{units[i]}</span>
                </div>
              ))}
            </div>
            <p className={styles.cdTrip}>
              {next ? (
                <>
                  <b>{next.tour.id}</b> {pick(next.tour.name, lang)} · {next.tour.departure} · {next.tomorrow ? t.tomorrow : t.today}
                </>
              ) : " "}
            </p>
            <span className={styles.small} style={{ color: "#d6dccb" }}>{t.nextNote}</span>
          </div>
        </div>

        <div ref={boardRef} className={styles.board} role="table" aria-label={t.title}>
          <div className={`${styles.boardRow} ${styles.boardHeadRow}`} role="row">
            <span role="columnheader">{t.colTime}</span>
            <span role="columnheader">{t.colCode}</span>
            <span role="columnheader">{t.colTrip}</span>
            <span role="columnheader" className={styles.hideSm}>{t.colPickup}</span>
            <span role="columnheader" className={styles.hideSm}>{t.colLen}</span>
            <span role="columnheader" aria-label={t.seeTrip} />
          </div>
          {rows.map((r, ri) => (
            <div key={r.id} className={styles.boardRow} role="row" data-testid="board-row" data-tour={r.id}>
              <span role="cell" className={styles.boardTime}>
                <FlapText text={r.departure} play={play} base={ri * 90} />
                <span className={styles.sr}>{r.departure}</span>
              </span>
              <span role="cell" className={styles.boardCode}>
                <FlapText text={r.id} play={play} base={ri * 90 + 120} />
                <span className={styles.sr}>{r.id}</span>
              </span>
              <span role="cell" className={styles.boardTrip}>
                <span className={styles.boardName}>{pick(r.name, lang)}</span>
                <span className={styles.boardDaily}>{t.daily}</span>
              </span>
              <span role="cell" className={`${styles.boardMeta} ${styles.hideSm}`}>{pick(r.pickup, lang)}</span>
              <span role="cell" className={`${styles.boardMeta} ${styles.hideSm}`}>{pick(r.durationLabel, lang)}</span>
              <span role="cell" className={styles.boardGo}>
                <button type="button" className={styles.boardBtn} onClick={() => { selectTour(r.id); goToExplorer(); }} aria-label={`${t.seeTrip}: ${pick(r.name, lang)}`}>
                  <span aria-hidden="true">→</span>
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
