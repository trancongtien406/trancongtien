"use client";

import { useId, useRef, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { EQUIP, LEVELS, type Equip, type Level } from "../data/moves";
import { formatLabel, generateWod, GOALS, goalLabel, TIMES, type Format, type Goal, type Minutes, type Params, type Wod } from "../lib/wod";
import { Timer } from "./Timer";
import styles from "../brand.module.css";

const CONSULT = buildConsultHref("sat-gym");
type Errs = Partial<Record<"goal" | "time" | "level" | "equip", string>>;

const WARMUP = [
  "2 phút đi bộ nhanh hoặc nhảy dây nhẹ cho nóng người",
  "10 vòng xoay khớp vai, hông và cổ tay",
  "10 squat không tạ, 10 cầu hông, 8 lần mèo - bò",
  "1 hiệp thử bằng chính động tác đầu tiên, tạ nhẹ hơn dự định",
];

function equipTip(eq: Equip[]) {
  const t: string[] = [];
  if (eq.includes("thanh-ta")) t.push("Thanh tạ: bắt đầu bằng thanh nhẹ hoặc thanh trống, có rack và người đứng bảo vệ khi squat hay đẩy nặng.");
  if (eq.includes("kettlebell")) t.push("Kettlebell: nếu chưa quen swing, hãy nhờ HLV chỉ kỹ thuật bản lề hông trước khi chạy nhanh.");
  if (eq.includes("xa")) t.push("Xà: bám chắc, hạ xuống có kiểm soát. Dùng dây hỗ trợ hoặc xà thấp nếu chưa kéo được.");
  if (eq.includes("day-nhay")) t.push("Dây nhảy: chọn sàn phẳng, giày có đệm, nhảy thấp.");
  return t;
}

export function Picker() {
  const uid = useId().replace(/:/g, "");
  const [goal, setGoal] = useState<Goal | null>(null);
  const [time, setTime] = useState<Minutes | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [equip, setEquip] = useState<Equip[]>([]);
  const [errs, setErrs] = useState<Errs>({});
  const [wod, setWod] = useState<Wod | null>(null);
  const [fail, setFail] = useState("");
  const [shuffle, setShuffle] = useState(0);
  const [wodKey, setWodKey] = useState(0);
  const [ack, setAck] = useState(false);
  const [ackErr, setAckErr] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const ackRef = useRef<HTMLInputElement>(null);

  const toggleEquip = (id: Equip) => setEquip((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : id === "tay" ? ["tay"] : [...cur.filter((x) => x !== "tay"), id]));

  const build = (params: Params, sh: number, fmt?: Format) => {
    const r = generateWod(params, sh, fmt);
    if (!r.ok) { setWod(null); setFail(r.error); return false; }
    setFail(""); setWod(r.wod); setWodKey((k) => k + 1); return true;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errs = {};
    if (!goal) next.goal = "Hãy chọn mục tiêu trước khi tạo bài.";
    if (!time) next.time = "Hãy chọn thời gian tập.";
    if (!level) next.level = "Hãy chọn trình độ hiện tại.";
    if (!equip.length) next.equip = "Chọn ít nhất một mục. Không có dụng cụ thì chọn Chỉ cơ thể.";
    setErrs(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => (document.querySelector(`[data-pk-invalid="1"]`) as HTMLElement | null)?.focus());
      return;
    }
    setAck(false); setAckErr(false); setShuffle(0);
    if (build({ goal: goal!, time: time!, level: level!, equip }, 0)) {
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  };

  const reroll = () => {
    if (!wod) return;
    const n = shuffle + 1;
    setShuffle(n);
    build(wod.params, n, wod.format);
  };
  const setFormat = (f: Format) => { if (wod) build(wod.params, shuffle, f); };

  const err = (k: keyof Errs) => errs[k];
  const radio = <T extends string | number>(name: keyof Errs, items: { id: T; label: string; hint?: string }[], value: T | null, set: (v: T) => void) => (
    <div className={styles.chips} role="radiogroup" aria-labelledby={`${uid}-${name}-lg`}>
      {items.map((it, i) => (
        <label key={String(it.id)} className={styles.chip}>
          <input
            type="radio" name={`${uid}-${name}`} value={String(it.id)} checked={value === it.id}
            onChange={() => { set(it.id); setErrs((e) => ({ ...e, [name]: undefined })); }}
            aria-invalid={err(name) ? true : undefined} aria-describedby={err(name) ? `${uid}-${name}-err` : undefined}
            data-pk-invalid={err(name) && i === 0 ? "1" : undefined}
          />
          <span><b>{it.label}</b>{it.hint ? <small>{it.hint}</small> : null}</span>
        </label>
      ))}
    </div>
  );

  return (
    <section className={styles.pick} id="chon-bai" aria-labelledby="pick-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>07</span> Thử một bài WOD</p>
          <h2 id="pick-title" className={styles.h2Big}>
            <span className={styles.h2Solid}>Hôm nay</span>
            <span className={styles.h2OutInk}>tập gì?</span>
          </h2>
          <p className={styles.lede}>Cho SẬT biết mục tiêu, thời gian, trình độ và dụng cụ bạn có. Một bài 5 đến 6 động tác sẽ hiện ra kèm đồng hồ tabata hoặc EMOM chạy thật. Đây là gợi ý khung bài để bạn thử, không thay thế huấn luyện viên.</p>
        </header>

        <div className={styles.pickGrid}>
          <form className={styles.pickForm} onSubmit={submit} noValidate aria-label="Tạo bài tập">
            <fieldset>
              <legend id={`${uid}-goal-lg`}>1 · Mục tiêu</legend>
              {radio("goal", GOALS, goal, setGoal)}
              {err("goal") ? <p id={`${uid}-goal-err`} className={styles.err} role="alert">{err("goal")}</p> : null}
            </fieldset>
            <fieldset>
              <legend id={`${uid}-time-lg`}>2 · Thời gian</legend>
              {radio("time", TIMES, time, setTime)}
              {err("time") ? <p id={`${uid}-time-err`} className={styles.err} role="alert">{err("time")}</p> : null}
            </fieldset>
            <fieldset>
              <legend id={`${uid}-level-lg`}>3 · Trình độ</legend>
              {radio("level", LEVELS, level, setLevel)}
              {err("level") ? <p id={`${uid}-level-err`} className={styles.err} role="alert">{err("level")}</p> : null}
            </fieldset>
            <fieldset>
              <legend id={`${uid}-equip-lg`}>4 · Dụng cụ có sẵn</legend>
              <div className={styles.chips} role="group" aria-labelledby={`${uid}-equip-lg`}>
                {EQUIP.map((q, i) => (
                  <label key={q.id} className={styles.chip}>
                    <input
                      type="checkbox" name={`${uid}-equip`} value={q.id} checked={equip.includes(q.id)}
                      onChange={() => { toggleEquip(q.id); setErrs((e) => ({ ...e, equip: undefined })); }}
                      aria-invalid={err("equip") ? true : undefined} aria-describedby={err("equip") ? `${uid}-equip-err` : undefined}
                      data-pk-invalid={err("equip") && i === 0 ? "1" : undefined}
                    />
                    <span><b>{q.label}</b><small>{q.hint}</small></span>
                  </label>
                ))}
              </div>
              {err("equip") ? <p id={`${uid}-equip-err`} className={styles.err} role="alert">{err("equip")}</p> : null}
            </fieldset>
            <button type="submit" className={`${styles.btn} ${styles.btnAcid} ${styles.btnXl}`} data-shake>Tạo bài tập</button>
          </form>

          <div className={styles.pickResult} ref={resultRef} tabIndex={-1}>
            <p className={styles.srOnly} role="status">{wod ? `Đã tạo bài ${goalLabel(wod.params.goal)}, ${wod.params.time} phút, ${wod.moves.length} động tác.` : fail}</p>
            {!wod && !fail ? (
              <div className={styles.empty}>
                <p className={styles.emptyBig} aria-hidden="true">00:00</p>
                <h3>Chưa có bài nào</h3>
                <p>Chọn đủ bốn mục bên trái rồi bấm Tạo bài tập. Bài WOD và đồng hồ sẽ hiện ở đây.</p>
              </div>
            ) : null}
            {fail ? (
              <div className={styles.empty} role="alert">
                <h3>Chưa tạo được bài</h3>
                <p>{fail}</p>
              </div>
            ) : null}
            {wod ? (
              <div data-wod={wod.format} data-testid="wod">
                <p className={styles.resTag}>{goalLabel(wod.params.goal)} · {wod.params.time} phút · {wod.format === "tabata" ? "Tabata" : "EMOM"}</p>
                <h3 className={styles.resTitle}>Bài tập của bạn</h3>
                <p className={styles.resFormat}>{formatLabel(wod.format, wod.params.time)}</p>
                <div className={styles.seg} role="group" aria-label="Kiểu đếm giờ">
                  {(["tabata", "emom"] as Format[]).map((f) => (
                    <button key={f} type="button" aria-pressed={wod.format === f} onClick={() => setFormat(f)}>{f === "tabata" ? "Tabata 20/10" : "EMOM"}</button>
                  ))}
                  <button type="button" className={styles.segGhost} onClick={reroll}>Đổi bài khác</button>
                </div>
                {wod.adjusted ? <p className={styles.adj}>Đã điều chỉnh lựa chọn để tạo bài: một số vị trí dùng động tác chỉ cơ thể vì dụng cụ hoặc trình độ chưa đủ.</p> : null}
                <ol className={styles.moves}>
                  {wod.moves.map((p, i) => (
                    <li key={p.move.id}>
                      <b className={styles.mvNum}>{String(i + 1).padStart(2, "0")}</b>
                      <div>
                        <h4>{p.move.name}</h4>
                        <p className={styles.mvRx}>{wod.format === "emom" ? p.text : "20 giây làm, 10 giây nghỉ"} <span>· {p.move.muscles}</span></p>
                        <p className={styles.mvCue}>{p.move.cue}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className={styles.resNote}>
                  {wod.format === "emom"
                    ? "Mỗi phút một động tác, số lần ở mức bảo thủ. Làm xong sớm thì nghỉ đến hết phút, đừng đánh đổi kỹ thuật để kịp giờ."
                    : "Các động tác xoay vòng, mỗi hiệp 20 giây làm đều tay rồi 10 giây nghỉ. Cường độ vừa phải đến khó, vẫn nói được từng cụm ngắn."}
                </p>

                <div className={styles.warn}>
                  <h4>Khởi động trước khi bấm bắt đầu</h4>
                  <p>Bắt đầu bằng cường độ vừa sức và chọn mức tạ bạn kiểm soát được. Dừng tập nếu đau nhói, chóng mặt hoặc khó thở bất thường. Nếu có bệnh tim, huyết áp, chấn thương hoặc đang mang thai, hãy hỏi bác sĩ trước khi tập cường độ cao.</p>
                  <ul>{WARMUP.map((w) => <li key={w}>{w}</li>)}</ul>
                  {equipTip(wod.params.equip).map((t) => <p key={t} className={styles.tip}>{t}</p>)}
                  <label className={styles.ack}>
                    <input
                      ref={ackRef} type="checkbox" checked={ack}
                      onChange={(e) => { setAck(e.target.checked); if (e.target.checked) setAckErr(false); }}
                      aria-invalid={ackErr ? true : undefined} aria-describedby={ackErr ? `${uid}-ack-err` : undefined}
                    />
                    <span>Tôi đã khởi động, kiểm tra dụng cụ, khu vực tập và mức tập này phù hợp với mình.</span>
                  </label>
                  {ackErr ? <p id={`${uid}-ack-err`} className={styles.err} role="alert">Hãy tích xác nhận khởi động trước khi bắt đầu đếm giờ.</p> : null}
                </div>

                <Timer key={wodKey} wod={wod} ack={ack} onNeedAck={() => { setAckErr(true); ackRef.current?.focus(); }} />

                <div className={styles.resCta}>
                  <p>Muốn HLV xem lại bài này và chỉnh theo thể trạng của bạn?</p>
                  <a className={`${styles.btn} ${styles.btnInk} ${styles.btnLg}`} href={CONSULT} data-shake>Nhờ SẬT xem lại bài này</a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
