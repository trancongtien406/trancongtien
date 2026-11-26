"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { SplitWords, gsap, observeInView, prefersReducedMotion } from "@/features/showroom/effects";
import { CREW, GEAR, GEAR_NOTE, MONTHS, PACKAGES, SCHEDULE, SCHEDULE_NOTE, SEASON_NOTE } from "../data/content";
import styles from "../brand.module.css";

/**
 * Bảng lịch khởi hành kiểu bảng chuyến bay: đổi ngày thì từng ký tự giờ và tên chương trình lật xuống (rotateX).
 * Reduced-motion: đổi nội dung ngay, không lật.
 */
export function Schedule() {
  const [day, setDay] = useState(0);
  const board = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const href = buildConsultHref("lan-bien");
  const plan = SCHEDULE[day];

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = board.current;
    if (!el || prefersReducedMotion()) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-flap]");
    const t = gsap.fromTo(chars, { rotationX: -92, opacity: 0.2, transformOrigin: "50% 0%" }, {
      rotationX: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)", stagger: { each: 0.012, from: "start" }, clearProps: "transform,opacity",
    });
    return () => { t.kill(); };
  }, [day]);

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const k = e.key;
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(k)) return;
    e.preventDefault();
    const n = SCHEDULE.length;
    const next = k === "Home" ? 0 : k === "End" ? n - 1 : (day + (k === "ArrowRight" ? 1 : -1) + n) % n;
    setDay(next);
    requestAnimationFrame(() => document.getElementById(`lb-day-${next}`)?.focus());
  };

  return (
    <section id="lich-khoi-hanh" className={styles.schedule} aria-labelledby="schedule-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.kicker} data-lb="reveal">Lịch khởi hành và giờ tập trung</p>
          <h2 id="schedule-title" className={styles.h2}><SplitWords as="span">Tuần này tập trung lúc mấy giờ?</SplitWords></h2>
          <p className={styles.lede} data-lb="reveal">Chọn ngày để xem chương trình thường lệ, giờ tập trung và nơi đón. Khách đi tour đảo được xe đón tại cơ sở ở Sơn Trà.</p>
        </header>
        <div className={styles.board} data-fx="DepartureBoard" data-lb="reveal">
          <div className={styles.boardTabs} role="tablist" aria-label="Chọn ngày trong tuần" onKeyDown={onKey}>
            {SCHEDULE.map((d, i) => (
              <button key={d.day} id={`lb-day-${i}`} type="button" role="tab" aria-selected={i === day} aria-controls="lb-board-panel" tabIndex={i === day ? 0 : -1} className={styles.boardTab} onClick={() => setDay(i)}>
                <span aria-hidden="true">{d.short}</span><span className={styles.srOnly}>{d.day}</span>
              </button>
            ))}
          </div>
          <div ref={board} id="lb-board-panel" role="tabpanel" aria-labelledby={`lb-day-${day}`} className={styles.boardPanel}>
            <p className={styles.boardDay}>{plan.day}</p>
            <ul className={styles.boardRows}>
              {plan.rows.map((r) => (
                <li key={r.time + r.name}>
                  <b className={styles.boardTime} aria-label={`Tập trung lúc ${r.time}`}>{[...r.time].map((c, i) => <i key={i} data-flap="" aria-hidden="true">{c}</i>)}</b>
                  <span className={styles.boardName}>
                    <strong aria-label={r.name}>{r.name.split(" ").map((w, wi) => <Fragment key={wi}>{wi > 0 ? " " : null}<span className={styles.flapWord} aria-hidden="true">{[...w].map((c, j) => <i key={j} data-flap="">{c}</i>)}</span></Fragment>)}</strong>
                    <small>{r.place} · {r.note}</small>
                  </span>
                  <a className={styles.boardBtn} href={href}>Hỏi chỗ</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.fine} data-lb="reveal">{SCHEDULE_NOTE}</p>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="bang-gia" className={styles.pricing} aria-labelledby="pricing-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.kicker} data-lb="reveal">Giá theo gói</p>
          <h2 id="pricing-title" className={styles.h2}><SplitWords as="span">Giá gói, và những gì đã gồm.</SplitWords></h2>
          <p className={styles.lede} data-lb="reveal">Giá tham khảo theo người. Mỗi gói ghi rõ phần bao gồm và phần tính riêng để bạn không bất ngờ lúc thanh toán.</p>
        </header>
        <ul className={styles.pkgGrid}>
          {PACKAGES.map((p) => (
            <li key={p.name} className={styles.pkg} data-lb="reveal">
              <h3>{p.name}</h3>
              <p className={styles.pkgPrice}><b>{p.price}</b><small>/ {p.unit}</small></p>
              <div className={styles.pkgCols}>
                <div><h4>Bao gồm</h4><ul>{p.incl.map((t) => <li key={t} data-k="in">{t}</li>)}</ul></div>
                <div><h4>Không bao gồm</h4><ul>{p.excl.map((t) => <li key={t} data-k="out">{t}</li>)}</ul></div>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.gear} data-lb="reveal">
          <h3 className={styles.gearTitle}>Thuê trang thiết bị</h3>
          <table className={styles.gearTable}>
            <caption className={styles.srOnly}>Bảng giá thuê trang thiết bị lặn theo ngày</caption>
            <thead className={styles.srOnly}><tr><th scope="col">Thiết bị</th><th scope="col">Giá</th><th scope="col">Ghi chú</th></tr></thead>
            <tbody>
              {GEAR.map((g) => (
                <tr key={g.item}><th scope="row">{g.item}</th><td>{g.price}</td><td>{g.note}</td></tr>
              ))}
            </tbody>
          </table>
          <p className={styles.fine}>{GEAR_NOTE}</p>
        </div>
      </div>
    </section>
  );
}

/** Mùa biển theo tháng: hai cột cao thấp (độ êm của biển, độ trong của nước); vào khung thì các cột trồi lên. */
export function Seasons() {
  const [sel, setSel] = useState(3);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.setAttribute("data-in", "1"); return; }
    return observeInView(el, (v) => { if (v) el.setAttribute("data-in", "1"); }, { once: true, rootMargin: "0px 0px -15% 0px" });
  }, []);
  const m = MONTHS[sel];
  return (
    <section id="mua-bien" className={styles.seasons} aria-labelledby="seasons-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.kicker} data-lb="reveal">Mùa biển theo tháng</p>
          <h2 id="seasons-title" className={styles.h2}><SplitWords as="span">Nên đi lặn vào tháng nào?</SplitWords></h2>
          <p className={styles.lede} data-lb="reveal">Chọn một tháng để xem biển thường ra sao ở Sơn Trà và Cù Lao Chàm. Cột cao hơn nghĩa là điều kiện thường thuận lợi hơn.</p>
        </header>
        <div ref={ref} className={styles.tide} data-fx="SeasonTide" data-lb="reveal">
          <div className={styles.tideBars} role="group" aria-label="Chọn tháng">
            {MONTHS.map((mo, i) => (
              <button key={mo.m} type="button" className={styles.tideCol} aria-pressed={i === sel} onClick={() => setSel(i)} style={{ ["--c" as string]: mo.calm / 4, ["--v" as string]: mo.vis / 4, ["--i" as string]: i }}>
                <span className={styles.tideBarWrap} aria-hidden="true"><i className={styles.tideCalm} /><i className={styles.tideVis} /></span>
                <span className={styles.tideM}>{mo.m}</span>
                <span className={styles.srOnly}>{`Độ êm ${mo.calm} trên 4, độ trong ${mo.vis} trên 4`}</span>
              </button>
            ))}
          </div>
          <div className={styles.tideLegend} aria-hidden="true"><span><i data-k="calm" />Biển êm</span><span><i data-k="vis" />Nước trong</span></div>
          <p className={styles.tideNote} role="status" aria-live="polite"><b>Tháng {sel + 1}.</b> {m.note}</p>
        </div>
        <p className={styles.fine} data-lb="reveal">{SEASON_NOTE}</p>
      </div>
    </section>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  mask: <><rect x="6" y="14" width="36" height="20" rx="9" /><path d="M22 24h4M6 22H2M42 22h4" /></>,
  flag: <><path d="M14 6v36" /><path d="M14 8c8-4 12 4 20 0v16c-8 4-12-4-20 0" /></>,
  wheel: <><circle cx="24" cy="24" r="8" /><circle cx="24" cy="24" r="17" /><path d="M24 7v9M24 32v9M7 24h9M32 24h9" /></>,
  gauge: <><path d="M6 32a18 18 0 0 1 36 0" /><path d="M24 32l9-10" /><circle cx="24" cy="32" r="2" /></>,
  cal: <><rect x="8" y="10" width="32" height="30" rx="4" /><path d="M8 20h32M16 6v8M32 6v8" /></>,
};

export function Crew() {
  return (
    <section id="doi-ngu" className={styles.crew} aria-labelledby="crew-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.kicker} data-lb="reveal">Đội ngũ theo vai trò</p>
          <h2 id="crew-title" className={styles.h2}><SplitWords as="span">Ai làm gì trong một chuyến lặn.</SplitWords></h2>
        </header>
        <ul className={styles.crewGrid}>
          {CREW.map((c) => (
            <li key={c.role} className={styles.crewCard} data-lb="reveal">
              <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[c.icon]}</svg>
              <h3>{c.role}</h3>
              <p>{c.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
