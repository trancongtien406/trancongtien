"use client";

import { useRef, useState } from "react";
import styles from "../brand.module.css";
import { CLASSES, DAYS, LEVEL_LABEL, availability, sessionsForWeek, type StudioClass } from "../data/classes";

type Q = { key: "goal" | "exp" | "time" | "note"; q: string; hint: string; opts: [string, string][] };
const QS: Q[] = [
  { key: "goal", q: "Bạn muốn trải nghiệm điều gì?", hint: "Chọn một hướng gần nhất với điều bạn đang tò mò.", opts: [["pilates", "Làm quen với Pilates"], ["yoga", "Khám phá Yoga"], ["gentle", "Chuyển động nhẹ nhàng"], ["dynamic", "Thử chuỗi tập năng động"]] },
  { key: "exp", q: "Bạn đã có kinh nghiệm tập luyện chưa?", hint: "Không có đáp án đúng hay sai.", opts: [["new", "Chưa từng tập"], ["some", "Đã tập một vài buổi"], ["familiar", "Đã quen với hình thức tập mình chọn"]] },
  { key: "time", q: "Bạn thường có thời gian vào lúc nào?", hint: "Lịch tuần có các khung 06:30, 09:00, 12:15, 18:00 và 19:15.", opts: [["early", "Sáng sớm (06:00–08:00)"], ["morning", "Buổi sáng (08:00–11:00)"], ["midday", "Giữa ngày (11:00–14:00)"], ["evening", "Buổi tối (17:00–21:00)"], ["flex", "Linh hoạt"]] },
  { key: "note", q: "Bạn có điều gì cần lưu ý trước khi tập không?", hint: "Không cần mô tả chi tiết. Công cụ không lưu và không đánh giá tình trạng sức khoẻ.", opts: [["none", "Không có lưu ý đặc biệt"], ["pain", "Đang có đau hoặc chấn thương, kể cả nhẹ"], ["limits", "Có giới hạn vận động hoặc đang được theo dõi sức khoẻ"], ["unsure", "Chưa chắc chắn"], ["skip", "Không muốn trả lời"]] },
];
type A = Partial<Record<Q["key"], string>>;

const SLOT_OF: Record<string, string[]> = { early: ["06:30"], morning: ["09:00"], midday: ["12:15"], evening: ["18:00", "19:15"] };

const GOAL: Record<string, Record<string, number>> = {
  CL01: { pilates: 6, yoga: 0, gentle: 2, dynamic: 2 }, CL02: { pilates: 6, yoga: 0, gentle: 0, dynamic: 6 }, CL03: { pilates: 4, yoga: 1, gentle: 3, dynamic: 4 },
  CL04: { pilates: 0, yoga: 6, gentle: 0, dynamic: 6 }, CL05: { pilates: 0, yoga: 6, gentle: 3, dynamic: 2 }, CL06: { pilates: 0, yoga: 4, gentle: 6, dynamic: 0 },
};
const EXP: Record<string, Record<string, number>> = { beginner: { new: 4, some: 2, familiar: 0 }, every: { new: 2, some: 3, familiar: 2 }, experienced: { familiar: 3 } };

/** Gợi ý xác định (không AI): điểm mục tiêu + kinh nghiệm + giờ. Chỉ chạy khi note === "none". Tối đa 2 lớp. */
export function recommend(a: A) {
  const sessions = sessionsForWeek(0).filter((s) => s.left > 0);
  const slots = SLOT_OF[a.time || ""];
  const rows = CLASSES.map((c) => {
    const g = GOAL[c.id][a.goal || ""] ?? 0;
    const e = EXP[c.level][a.exp || ""];
    if (g === 0 || e === undefined) return null; // loại lớp lệch hướng hoặc lớp nâng cao khi chưa quen
    const mine = sessions.filter((s) => s.classId === c.id);
    const inSlot = slots ? mine.filter((s) => slots.includes(s.time)) : mine;
    const t = inSlot.length ? 3 : 0;
    const list = (inSlot.length ? inSlot : mine).sort((x, y) => x.day - y.day || x.time.localeCompare(y.time)).slice(0, 2);
    const why: string[] = [];
    if (a.goal === "pilates" && c.category !== "yoga") why.push("Phù hợp với sở thích khám phá Pilates của bạn.");
    if (a.goal === "yoga" && c.category === "yoga") why.push("Thuộc hình thức vận động bạn muốn tìm hiểu.");
    if (a.goal === "gentle" && c.id === "CL06") why.push("Có nhịp độ chậm hơn trong mô tả lớp.");
    if (a.goal === "dynamic" && /Flow/.test(c.name)) why.push("Có chuỗi chuyển động chủ động hơn.");
    if (a.exp === "new" && c.level === "beginner") why.push("Được giới thiệu trong nhóm lớp nhập môn.");
    if (inSlot.length && slots) why.push("Có buổi tập trong khung giờ bạn ưu tiên.");
    if (!inSlot.length && slots) why.push("Chưa có buổi còn chỗ đúng khung giờ này, đây là các buổi gần nhất.");
    return { c, score: g + e + t, slotOk: inSlot.length > 0, why: why.slice(0, 2), list };
  }).filter(Boolean) as { c: StudioClass; score: number; slotOk: boolean; why: string[]; list: { id: string; day: number; time: string; left: number }[] }[];
  const near = (r: { list: { day: number; time: string }[] }) => (r.list[0] ? r.list[0].day * 100 + Number(r.list[0].time.slice(0, 2)) : 999);
  return rows.sort((x, y) => y.score - x.score || Number(y.slotOk) - Number(x.slotOk) || near(x) - near(y) || x.c.id.localeCompare(y.c.id)).slice(0, 2);
}

export function Finder({ consultHref }: { consultHref: string }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<A>({});
  const [err, setErr] = useState(false);
  const [done, setDone] = useState(false);
  const head = useRef<HTMLHeadingElement>(null);
  const q = QS[step];

  const focusHead = () => requestAnimationFrame(() => head.current?.focus());
  const next = () => {
    if (!ans[q.key]) { setErr(true); return; }
    setErr(false);
    if (step === QS.length - 1) setDone(true); else setStep(step + 1);
    focusHead();
  };
  const back = () => { setErr(false); if (done) setDone(false); else setStep(Math.max(0, step - 1)); focusHead(); };
  const reset = () => { setAns({}); setStep(0); setDone(false); setErr(false); focusHead(); };
  const relax = () => { setAns((p) => ({ ...p, time: "flex" })); };

  const gate = ans.note !== "none"; // safety gate: có lưu ý hoặc không muốn trả lời => không xếp hạng lớp
  const res = done && !gate ? recommend(ans) : [];
  const skipped = ans.note === "skip";

  return (
    <div className={styles.fPanel} data-nt="finder" onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing && !done && (e.target as HTMLElement).tagName === "INPUT") { e.preventDefault(); next(); } }}>
      {!done ? (
        <div role="group" aria-labelledby="nt-f-q" aria-describedby={err ? "nt-f-err" : undefined}>
          <p className={styles.fStep} data-nt="f-step">Bước {step + 1} / {QS.length}</p>
          <div className={styles.fDots} aria-hidden="true">{QS.map((_, i) => <i key={i} data-on={i <= step} />)}</div>
          <h3 id="nt-f-q" className={styles.fQ} tabIndex={-1} ref={head}>{q.q}</h3>
          <p className={styles.fHint}>{q.hint}</p>
          <div className={styles.fOpts} role="radiogroup" aria-label={q.q}>
            {q.opts.map(([v, t]) => (
              <label key={v} className={styles.fOpt}>
                <input type="radio" name={`nt-${q.key}`} value={v} checked={ans[q.key] === v} onChange={() => { setAns((p) => ({ ...p, [q.key]: v })); setErr(false); }} />
                <span>{t}</span>
              </label>
            ))}
          </div>
          {err && <p id="nt-f-err" className={styles.fErr} role="alert">Hãy chọn một lựa chọn để tiếp tục.</p>}
          <div className={styles.fNav}>
            {step > 0 && <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={back}>Quay lại</button>}
            <button type="button" className={`${styles.btn} ${styles.btnAccent}`} onClick={next} data-nt="f-next">{step === QS.length - 1 ? "Xem gợi ý" : "Tiếp tục"}</button>
          </div>
        </div>
      ) : (
        <div data-nt="f-result" aria-live="polite">
          <p className={styles.fStep}>Gợi ý cho bạn</p>
          <h3 className={styles.fQ} tabIndex={-1} ref={head}>{gate ? (skipped ? "Bạn vẫn có thể xem toàn bộ lớp." : "Tìm hiểu thêm trước khi bắt đầu.") : "Hai lớp để bạn khám phá."}</h3>
          {gate ? (
            <div data-nt="f-gate">
              <p className={styles.fNotice} data-nt="f-medical">
                {skipped
                  ? "Công cụ sẽ không đưa ra gợi ý cá nhân trong trường hợp này. Bạn vẫn có thể khám phá danh mục lớp chung."
                  : "Bạn đã chọn một lưu ý về sức khoẻ hoặc chuyển động. Công cụ này không thay thế tư vấn y tế và sẽ không gợi ý lớp cụ thể: hãy hỏi bác sĩ hoặc chuyên viên y tế trước khi bắt đầu, và trao đổi với người hướng dẫn về giới hạn của bạn."}
              </p>
              <div className={styles.fNav}>
                <FinderLink id="all" label="Xem toàn bộ lịch" />
                <a className={`${styles.btn} ${styles.btnAccent}`} href={consultHref} data-nt="f-consult">Trao đổi với Nếp Thở</a>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={reset}>Làm lại</button>
              </div>
            </div>
          ) : res.length === 0 ? (
            <div data-nt="f-empty">
              <p className={styles.fHint} style={{ marginTop: 12 }}>Chưa có lớp khớp lựa chọn này trong lịch tuần. Bạn có thể thử khung giờ linh hoạt hoặc làm lại.</p>
              <div className={styles.fNav}>
                {ans.time !== "flex" && <button type="button" className={`${styles.btn} ${styles.btnAccent}`} onClick={() => setAns((p) => ({ ...p, time: "flex" }))}>Thử giờ linh hoạt</button>}
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={reset}>Làm lại</button>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.fHint}>Dựa trên sở thích, kinh nghiệm và khung giờ bạn đã chọn, đây là những lớp bạn có thể tìm hiểu thêm.</p>
              <ul className={styles.fRes}>
                {res.map((r) => (
                  <li key={r.c.id} className={styles.fCard} data-nt="f-card">
                    <h4 style={{ margin: 0 }} className={styles.h4}>{r.c.name}</h4>
                    <p>{LEVEL_LABEL[r.c.level]} · {r.c.minutes}&nbsp;phút · {r.list.map((s) => `${DAYS[s.day]} ${s.time} (${availability(s.left).label.toLowerCase()})`).join(", ")}</p>
                    <p className={styles.fWhy}>{r.why.join(" ")}</p>
                    <FinderLink id={r.c.id} label="Xem giờ tập phù hợp" />
                  </li>
                ))}
              </ul>
              <div className={styles.fNav}>
                <a className={`${styles.btn} ${styles.btnAccent}`} href={consultHref} data-nt="f-consult">Trao đổi về lớp phù hợp</a>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={reset}>Tìm lại từ đầu</button>
              </div>
              <p className={styles.fHint} style={{ marginTop: 16 }}>Gợi ý dựa trên lịch tuần hiện có, không phải đánh giá thể trạng.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function FinderLink({ id, label }: { id: string; label: string }) {
  return (
    <a className={`${styles.btn} ${styles.btnGhost}`} href="#lich-tap" data-nt="f-link" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("nt:filter", { detail: id === "all" ? {} : { classId: id } })); }}>{label}</a>
  );
}
