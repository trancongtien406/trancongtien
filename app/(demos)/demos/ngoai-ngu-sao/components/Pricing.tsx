"use client";

import { useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { NumberTicker } from "@/features/showroom/effects";
import { OFFERS, PACKS, PROGRAMS, REFUND, TRACKS } from "../data/center";
import { SLUG } from "../data/content";
import styles from "../brand.module.css";

const DISC = [
  { id: "none", label: "Không ưu đãi", pct: 0 },
  { id: "early", label: "Đăng ký sớm", pct: 5 },
  { id: "full", label: "Đóng trọn lộ trình", pct: 5 },
  { id: "group", label: "Nhóm 3 người", pct: 8 },
] as const;

const round = (n: number) => Math.round(n / 1000) * 1000;

export function Pricing() {
  const [pid, setPid] = useState("en-work-1");
  const [disc, setDisc] = useState<(typeof DISC)[number]["id"]>("none");
  const prog = PROGRAMS.find((p) => p.id === pid)!;
  const pct = DISC.find((d) => d.id === disc)!.pct;
  const full = disc === "full" && prog.courses < 2;

  return (
    <section id="hoc-phi" className={`${styles.panel} ${styles.panelWhite}`} aria-labelledby="price-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Học phí và gói học</p>
        <h2 id="price-title" className={styles.h2}>So sánh ba gói học cho cùng một chương trình.</h2>
        <p className={styles.lede}>Chọn chương trình và ưu đãi, bảng sẽ tính lại học phí một khoá. Giá tham khảo, đã gồm giáo trình điện tử và thẻ từ vựng; tư vấn viên xác nhận khi đăng ký.</p>
      </div>

      <div className={styles.planControls}>
        <div className={styles.field}>
          <label htmlFor="plan-prog">Chương trình</label>
          <select id="plan-prog" className={styles.select} value={pid} onChange={(e) => setPid(e.target.value)}>
            {TRACKS.filter((t) => t.id !== "all").map((t) => (
              <optgroup key={t.id} label={t.label}>
                {PROGRAMS.filter((p) => p.track === t.id).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <span id="plan-disc-l" className={styles.fieldL}>Ưu đãi áp dụng (không cộng dồn)</span>
          <div className={styles.filterGroup} role="radiogroup" aria-labelledby="plan-disc-l">
            {DISC.map((d) => (
              <button key={d.id} type="button" role="radio" aria-checked={disc === d.id} className={styles.fBtn} onClick={() => setDisc(d.id)}>
                {d.label}{d.pct ? <small> -{d.pct}%</small> : null}
              </button>
            ))}
          </div>
        </div>
      </div>
      {full && <p className={styles.note} role="status">Chương trình này chỉ có một khoá nên ưu đãi đóng trọn lộ trình chưa áp dụng. Hãy chọn ưu đãi khác hoặc chương trình có từ hai khoá.</p>}

      <div className={styles.plans} data-fx="PlanCompare" data-fx-ready="1">
        {PACKS.map((k) => {
          const price = round(prog.price * k.mult * (1 - (full ? 0 : pct) / 100));
          return (
            <article key={k.id} className={styles.plan} data-pack={k.id}>
              <h3 className={styles.h3}>{k.name}</h3>
              <p className={styles.planSize}>{k.size}</p>
              <p className={styles.dim}>{k.note}</p>
              <p className={styles.planPrice}><NumberTicker value={price} suffix={" ₫"} /><small> / khoá {prog.sessions} buổi</small></p>
              <p className={styles.planPer}>khoảng <NumberTicker value={round(price / prog.sessions)} suffix={" ₫"} /> mỗi buổi {prog.minutes} phút</p>
              <ul className={styles.planRows}>
                {k.rows.map((r) => <li key={r}>{r}</li>)}
                <li>Học thử 1 buổi miễn phí</li>
              </ul>
              <a className={`${styles.btn} ${k.id === "nhom" ? styles.btnNavy : styles.btnGhostN}`} href={buildConsultHref(SLUG)}>Đăng ký học thử gói này</a>
            </article>
          );
        })}
      </div>

      <div className={styles.policyGrid}>
        <div>
          <h3 className={styles.h4}>Ưu đãi</h3>
          <ul className={styles.offers}>
            {OFFERS.map((o) => <li key={o.t}><b>{o.t}</b><span>{o.d}</span></li>)}
          </ul>
        </div>
        <div>
          <h3 className={styles.h4}>Chính sách hoàn học phí</h3>
          <ol className={styles.refund}>
            {REFUND.map((r) => <li key={r}>{r}</li>)}
          </ol>
          <p className={styles.note}>Sách in và phí thi bên ngoài (nếu có) tính riêng. Ưu đãi không áp dụng đồng thời với nhau, lấy mức cao nhất.</p>
        </div>
      </div>
    </section>
  );
}
