"use client";

import { useEffect, useMemo, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { NumberTicker, SVGPathDraw } from "@/features/showroom/effects";
import { ROADS, type Track } from "../data/center";
import { SLUG } from "../data/content";
import styles from "../brand.module.css";

const RISE = 26;
/** Đường bậc thang đi qua tâm các nút (khung 1000 x H, H cao đúng bằng độ chênh của các thẻ). */
function stairPath(n: number) {
  const H = (n - 1) * RISE + 48;
  const pts = Array.from({ length: n }, (_, i) => ({ x: ((i + 0.5) / n) * 1000, y: (n - 1 - i) * RISE + 24 }));
  let d = `M 0 ${pts[0].y + 10} L ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < n; i++) {
    const a = pts[i - 1], b = pts[i], mx = (a.x + b.x) / 2;
    d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
  }
  d += ` L 1000 ${pts[n - 1].y - 8}`;
  return { d, H };
}

export function Roadmap() {
  const [id, setId] = useState<Track>("en");
  const [here, setHere] = useState(0);
  const road = ROADS.find((r) => r.id === id)!;
  const { d, H } = useMemo(() => stairPath(road.steps.length), [road.steps.length]);

  useEffect(() => {
    const on = (e: Event) => {
      const t = (e as CustomEvent<Track>).detail;
      if (ROADS.some((r) => r.id === t)) { setId(t); setHere(0); }
    };
    window.addEventListener("ns:road", on);
    return () => window.removeEventListener("ns:road", on);
  }, []);

  const left = road.steps.slice(here);
  const courses = left.reduce((s, x) => s + x.courses, 0);
  const sessions = left.reduce((s, x) => s + x.sessions, 0);
  const cost = left.reduce((s, x) => s + x.courses * x.price, 0);
  const months = Math.max(1, Math.round(sessions / road.perWeek / 4.3));

  return (
    <section id="lo-trinh" className={`${styles.panel} ${styles.panelYellow}`} aria-labelledby="road-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Lộ trình lên cấp</p>
        <h2 id="road-title" className={styles.h2}>Biết trước mình sẽ đi qua những chặng nào.</h2>
        <p className={styles.lede}>{road.lead}</p>
      </div>
      <div className={styles.filterGroup} role="group" aria-label="Chọn lộ trình">
        {ROADS.map((r) => <button key={r.id} type="button" className={`${styles.fBtn} ${styles.fBtnOnY}`} aria-pressed={id === r.id} onClick={() => { setId(r.id); setHere(0); }}>{r.label}</button>)}
      </div>

      <div className={styles.stairs} data-fx="RoadmapCards" data-fx-ready="1" data-n={road.steps.length}>
        <SVGPathDraw key={id} mode="view" duration={1.1} viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" className={styles.stairSvg} style={{ height: H }} aria-hidden="true" focusable="false">
          <path d={d} stroke="#0b1f66" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
        </SVGPathDraw>
        <ol className={styles.steps} key={`s-${id}`}>
          {road.steps.map((s, i) => (
            <li key={s.code} className={styles.step2} data-state={i < here ? "done" : i === here ? "here" : "next"} style={{ ["--i" as string]: i, ["--rise" as string]: `${(road.steps.length - 1 - i) * RISE}px` }}>
              <span className={styles.stepDot} aria-hidden="true">{i < here ? "✓" : i + 1}</span>
              <article className={styles.stepCard}>
                <p className={styles.levelTag}>{s.code}</p>
                <h3 className={styles.h4}>{s.name}</h3>
                <p className={styles.levelGoal}>{s.goal}</p>
                <dl className={styles.stepFacts}>
                  <div><dt>Thời lượng</dt><dd>{s.courses} khoá, {s.sessions} buổi</dd></div>
                  <div><dt>Vào lớp khi</dt><dd>{s.entry}</dd></div>
                  <div><dt>Lên cấp khi</dt><dd>{s.exit}</dd></div>
                </dl>
                <button type="button" className={`${styles.btn} ${i === here ? styles.btnNavy : styles.btnGhostN} ${styles.btnSm}`} aria-pressed={i === here} onClick={() => setHere(i)}>
                  {i === here ? "Bạn bắt đầu từ đây" : "Bắt đầu từ chặng này"}
                </button>
              </article>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.roadSum} role="group" aria-label="Phần còn lại của lộ trình">
        <p className={styles.roadSumLead}>Từ <b>{road.steps[here].code} · {road.steps[here].name}</b> đến hết lộ trình còn:</p>
        <dl className={styles.roadNums}>
          <div><dt>Số khoá</dt><dd><NumberTicker value={courses} /></dd></div>
          <div><dt>Số buổi</dt><dd><NumberTicker value={sessions} /></dd></div>
          <div><dt>Thời gian</dt><dd>~<NumberTicker value={months} /> tháng</dd></div>
          <div><dt>Học phí tham khảo</dt><dd><NumberTicker value={cost} suffix={" ₫"} /></dd></div>
        </dl>
        <p className={styles.note}>Tính theo lớp nhóm, {road.perWeek} buổi mỗi tuần, chưa gồm ưu đãi. Bạn có thể vào giữa lộ trình sau bài kiểm tra đầu vào.</p>
        <a className={`${styles.btn} ${styles.btnNavy}`} href={buildConsultHref(SLUG)}>Nhận tư vấn lộ trình này</a>
      </div>
    </section>
  );
}
