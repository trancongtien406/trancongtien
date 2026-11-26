"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { buildConsultHref } from "@/features/showroom/consultation";
import { prefersReducedMotion } from "@/features/showroom/effects";
import { AUDIENCES, PROGRAMS, TRACKS, type Audience, type Program, type Track } from "../data/center";
import { SLUG } from "../data/content";
import styles from "../brand.module.css";

const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const trackName = (t: Track) => TRACKS.find((x) => x.id === t)!.label;
const audName = (a: Audience) => AUDIENCES.find((x) => x.id === a)!;

function Card({ p }: { p: Program }) {
  const total = p.sessions * p.minutes / 60;
  return (
    <article className={styles.prog} data-pid={p.id} data-track={p.track}>
      <div className={styles.progTags}>
        <span className={styles.progTag} data-t={p.track}>{trackName(p.track)}</span>
        <span className={styles.progTagSoft}>{audName(p.audience).label}</span>
      </div>
      <h3 className={styles.h4}>{p.name}</h3>
      <p className={styles.progFor}>{p.forWho}</p>
      <p className={styles.progSum}>{p.summary}</p>
      <dl className={styles.progFacts}>
        <div><dt>Thời lượng</dt><dd>{p.courses} khoá, mỗi khoá {p.sessions} buổi</dd></div>
        <div><dt>Mỗi buổi</dt><dd>{p.minutes} phút, {p.perWeek}</dd></div>
        <div><dt>Sĩ số</dt><dd>Tối đa {p.size} học viên</dd></div>
        <div><dt>Giáo trình</dt><dd>{p.material}</dd></div>
      </dl>
      <div className={styles.progFoot}>
        <p className={styles.progPrice}><small>Từ</small> {money.format(p.price)}<small> / khoá {p.sessions} buổi</small></p>
        <p className={styles.progHours}>{p.sessions * p.courses} buổi, khoảng {Math.round(total * p.courses)} giờ học cả chặng</p>
        <div className={styles.progBtns}>
          <a className={`${styles.btn} ${styles.btnNavy} ${styles.btnSm}`} href={buildConsultHref(SLUG)}>Đăng ký học thử</a>
          <a className={`${styles.btn} ${styles.btnGhostN} ${styles.btnSm}`} href="#lo-trinh" onClick={() => window.dispatchEvent(new CustomEvent("ns:road", { detail: p.track }))}>Xem lộ trình</a>
        </div>
      </div>
    </article>
  );
}

export function Programs() {
  const [track, setTrack] = useState<Track | "all">("all");
  const [aud, setAud] = useState<Audience | "all">("all");
  const grid = useRef<HTMLDivElement>(null);
  const rects = useRef(new Map<string, { x: number; y: number }>());
  const first = useRef(true);
  const list = useMemo(() => PROGRAMS.filter((p) => (track === "all" || p.track === track) && (aud === "all" || p.audience === aud)), [track, aud]);

  // FLIP: thẻ còn lại trượt về vị trí mới, thẻ mới hiện dần
  useLayoutEffect(() => {
    const el = grid.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    el.setAttribute("data-fx", "ProgramFilter");
    el.setAttribute("data-fx-ready", reduced ? "static" : "1");
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-pid]"));
    const now = new Map<string, { x: number; y: number }>();
    const ctx = gsap.context(() => {
      items.forEach((it) => {
        const id = it.dataset.pid!;
        const r = it.getBoundingClientRect();
        const pos = { x: r.left + window.scrollX, y: r.top + window.scrollY };
        now.set(id, pos);
        if (reduced || first.current) return;
        const prev = rects.current.get(id);
        if (prev) {
          const dx = prev.x - pos.x, dy = prev.y - pos.y;
          if (Math.abs(dx) > 1 || Math.abs(dy) > 1) gsap.fromTo(it, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.55, ease: "power3.out", clearProps: "transform" });
        } else gsap.fromTo(it, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.5)", clearProps: "opacity,transform" });
      });
    }, el);
    rects.current = now;
    first.current = false;
    return () => ctx.revert();
  }, [track, aud]);

  const reset = () => { setTrack("all"); setAud("all"); };

  return (
    <section id="chuong-trinh" className={`${styles.panel} ${styles.panelWhite}`} aria-labelledby="prog-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Chương trình học</p>
        <h2 id="prog-title" className={styles.h2}>Chọn theo ngôn ngữ và theo người học.</h2>
        <p className={styles.lede}>Mỗi chương trình ghi rõ số buổi, thời lượng, sĩ số và giáo trình. Học phí tính theo khoá, đã gồm giáo trình điện tử.</p>
      </div>
      <div className={styles.progFilters}>
        <div className={styles.filterGroup} role="group" aria-label="Lọc theo ngôn ngữ">
          {TRACKS.map((t) => <button key={t.id} type="button" className={styles.fBtn} aria-pressed={track === t.id} onClick={() => setTrack(t.id)}>{t.label}</button>)}
        </div>
        <div className={styles.filterGroup} role="group" aria-label="Lọc theo đối tượng">
          {AUDIENCES.map((a) => <button key={a.id} type="button" className={styles.fBtn} aria-pressed={aud === a.id} onClick={() => setAud(a.id)}>{a.label}{a.sub && <small> {a.sub}</small>}</button>)}
        </div>
      </div>
      <p className={styles.count} role="status">{list.length ? `Có ${list.length} chương trình phù hợp.` : "Chưa có chương trình khớp bộ lọc."}</p>
      <div ref={grid} className={styles.progGrid}>
        {list.map((p) => <Card key={p.id} p={p} />)}
      </div>
      {list.length === 0 && (
        <div className={styles.empty}>
          <p>Hiện chưa có chương trình ở tổ hợp này (ví dụ IELTS chưa mở cho thiếu nhi). Bạn có thể nhờ tư vấn để được gợi ý lớp gần nhất.</p>
          <div className={styles.progBtns}>
            <button type="button" className={`${styles.btn} ${styles.btnNavy} ${styles.btnSm}`} onClick={reset}>Xoá bộ lọc</button>
            <a className={`${styles.btn} ${styles.btnGhostN} ${styles.btnSm}`} href={buildConsultHref(SLUG)}>Nhờ tư vấn</a>
          </div>
        </div>
      )}
    </section>
  );
}
