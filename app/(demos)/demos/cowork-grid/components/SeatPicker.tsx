"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MagneticButton, NumberTicker, TextScramble } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { SeatMap, seatAria } from "./SeatMap";
import {
  BLOCKS, KINDS, clampInt, highlightSeats, pick, summaryText, vnd, type Block,
} from "../lib/picker";
import {
  DAY_LABELS, DAY_NAMES, HOURS_MAX, HOURS_MIN, SEATS, SEAT_BY_ID, STATE_LABEL, countsFor, nextChange, stateOf, vnNow,
  type SeatKind,
} from "../lib/seatmap";

const pad = (n: number) => String(n).padStart(2, "0");
const KIND_NAME: Record<SeatKind, string> = { hot: "Hot desk", fixed: "Bàn cố định", meeting: "Phòng họp", private: "Phòng riêng" };

export function SeatPicker() {
  const [peopleStr, setPeopleStr] = useState("3");
  const [days, setDays] = useState(5);
  const [kind, setKind] = useState<SeatKind>("fixed");
  const [block, setBlock] = useState<Block>("full");
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(10);
  const [live, setLive] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [cell, setCell] = useState<string | null>(null);
  const [copied, setCopied] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);

  const peopleNum = Number(peopleStr);
  const peopleValid = peopleStr.trim() !== "" && Number.isInteger(peopleNum) && peopleNum >= 1 && peopleNum <= 20;
  const people = peopleValid ? peopleNum : clampInt(peopleNum || 1, 1, 20);

  // đồng bộ giờ thực (UTC+7) sau khi hydrate, cập nhật mỗi 30 giây khi ở chế độ "giờ thực"
  useEffect(() => {
    if (!live) return;
    const sync = () => {
      const n = vnNow();
      setDay(n.day);
      setHour(Math.min(HOURS_MAX, Math.max(HOURS_MIN, n.hour)));
    };
    sync();
    const t = window.setInterval(sync, 30000);
    return () => window.clearInterval(t);
  }, [live]);

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setHour((h) => (h >= HOURS_MAX ? HOURS_MIN : h + 1)), 1100);
    return () => window.clearInterval(t);
  }, [playing]);

  const input = useMemo(() => ({ people, days, kind, block }), [people, days, kind, block]);
  const result = useMemo(() => pick(input), [input]);
  const rec = result.recommended;
  const hl = useMemo(() => highlightSeats(input, rec.kind, day), [input, rec.kind, day]);
  const hlSet = useMemo(() => new Set(hl.ids), [hl.ids]);

  const manual = useCallback(() => { setLive(false); setPlaying(false); }, []);
  const onActive = useCallback((id: string | null, pin?: boolean) => {
    if (pin && id) { setPinned(id); setActive(id); return; }
    setActive(id ?? pinned);
  }, [pinned]);

  const nowLive = () => { setPlaying(false); setLive(true); };
  const chooseBlock = (b: Block) => {
    setBlock(b);
    const mh = BLOCKS.find((x) => x.id === b)?.mapHour ?? 10;
    manual();
    setHour(mh);
  };

  /** tìm khung giờ trong ngày đang xem đủ chỗ */
  const findSlot = () => {
    for (const b of BLOCKS) {
      const h = highlightSeats({ ...input, block: b.id }, rec.kind, day);
      if (h.shortage === 0 && h.ids.length > 0) { chooseBlock(b.id); return; }
    }
    for (let d = 0; d < 7; d++) {
      const dd = (day + d + 1) % 7;
      const h = highlightSeats(input, rec.kind, dd);
      if (h.shortage === 0 && h.ids.length > 0) { manual(); setDay(dd); return; }
    }
  };

  const counts = useMemo(() => {
    const z = (["A", "B", "C", "D"] as const).map((id) => ({ id, ...countsFor(id, day, hour) }));
    const free = z.filter((c) => c.id === "A" || c.id === "B").reduce((n, c) => n + c.free, 0);
    const total = z.filter((c) => c.id === "A" || c.id === "B").reduce((n, c) => n + c.total, 0);
    return { z, free, total };
  }, [day, hour]);

  const shown = active ? SEAT_BY_ID[active] : null;
  const shownState = shown ? stateOf(shown, day, hour) : null;
  const change = shown ? nextChange(shown, day, hour) : null;

  const summary = summaryText(result, DAY_NAMES[day], hl.ids);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied("Đã sao chép tóm tắt vào bộ nhớ tạm.");
    } catch {
      setCopied("Không sao chép được. Hãy chọn đoạn tóm tắt bên cạnh và sao chép thủ công.");
    }
    window.setTimeout(() => setCopied(""), 4000);
  };

  const consult = buildConsultHref("cowork-grid");
  const needMsg = hl.shortage > 0;

  return (
    <div className={s.picker} id="picker">
      <div className={s.pickGrid}>
        {/* ---------------- cột điều khiển */}
        <form className={s.pickForm} onSubmit={(e) => e.preventDefault()} aria-label="Chọn chỗ và gói" noValidate>
          <p className={s.pickTag}><TextScramble charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/+">[ INPUT ] NHU CẦU CỦA BẠN</TextScramble></p>

          <div className={s.field}>
            <label htmlFor="cg-people">Số người</label>
            <div className={s.stepper}>
              <button type="button" aria-label="Giảm số người" onClick={() => setPeopleStr(String(clampInt(people - 1, 1, 20)))}>−</button>
              <input
                id="cg-people" inputMode="numeric" autoComplete="off" value={peopleStr}
                onChange={(e) => setPeopleStr(e.target.value.replace(/[^\d]/g, "").slice(0, 2))}
                onBlur={() => { if (!peopleValid) setPeopleStr(String(people)); }}
                aria-invalid={!peopleValid} aria-describedby="cg-people-err"
              />
              <button type="button" aria-label="Tăng số người" onClick={() => setPeopleStr(String(clampInt(people + 1, 1, 20)))}>+</button>
            </div>
            <p id="cg-people-err" className={s.fieldErr} role={peopleValid ? undefined : "alert"}>
              {peopleValid ? "" : "Nhập số người từ 1 đến 20."}
            </p>
          </div>

          <fieldset className={s.field}>
            <legend>Số ngày mỗi tuần</legend>
            <div className={s.segRow} role="radiogroup" aria-label="Số ngày mỗi tuần">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <button key={d} type="button" role="radio" aria-checked={days === d} data-on={days === d ? "1" : undefined} onClick={() => setDays(d)}>{d}</button>
              ))}
            </div>
          </fieldset>

          <fieldset className={s.field}>
            <legend>Loại chỗ</legend>
            <div className={s.kindGrid} role="radiogroup" aria-label="Loại chỗ">
              {KINDS.map((k) => (
                <button key={k.id} type="button" role="radio" aria-checked={kind === k.id} data-on={kind === k.id ? "1" : undefined} onClick={() => setKind(k.id)}>
                  <b>{k.label}</b>
                  <span>{k.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className={s.field}>
            <legend>Giờ cần</legend>
            <div className={s.blockGrid} role="radiogroup" aria-label="Khung giờ cần">
              {BLOCKS.map((b) => (
                <button key={b.id} type="button" role="radio" aria-checked={block === b.id} data-on={block === b.id ? "1" : undefined} onClick={() => chooseBlock(b.id)}>
                  <b>{b.label}</b>
                  <span>{b.range}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </form>

        {/* ---------------- sơ đồ */}
        <div className={s.pickMap}>
          <div className={s.mapHead}>
            <p className={s.pickTag}><TextScramble charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/+">[ MAP ] SƠ ĐỒ CHỖ NGỒI</TextScramble></p>
            <p className={s.mapNote}>Mật độ thường gặp theo ngày và giờ{live ? ", đang theo giờ hiện tại" : ""}.</p>
          </div>

          <div className={s.mapControls}>
            <div className={s.dayRow} role="radiogroup" aria-label="Ngày trong tuần">
              {DAY_LABELS.map((d, i) => (
                <button key={d} type="button" role="radio" aria-checked={day === i} aria-label={DAY_NAMES[i]} data-on={day === i ? "1" : undefined} onClick={() => { manual(); setDay(i); }}>{d}</button>
              ))}
            </div>
            <div className={s.hourRow}>
              <label htmlFor="cg-hour">Giờ</label>
              <input
                id="cg-hour" type="range" min={HOURS_MIN} max={HOURS_MAX} step={1} value={hour}
                aria-valuetext={`${pad(hour)}:00`} onChange={(e) => { manual(); setHour(Number(e.target.value)); }}
              />
              <output className={s.hourOut} htmlFor="cg-hour">{pad(hour)}:00</output>
            </div>
            <div className={s.mapBtns}>
              <button type="button" className={s.ghostBtn} aria-pressed={playing} onClick={() => { setLive(false); setPlaying((p) => !p); }}>{playing ? "Dừng tua giờ" : "Tua giờ trong ngày"}</button>
              <button type="button" className={s.ghostBtn} disabled={live} onClick={nowLive}>Về giờ hiện tại</button>
            </div>
          </div>

          <div className={s.mapFrame}>
            <SeatMap day={day} hour={hour} highlight={hlSet} active={active} onActive={onActive} onCursor={setCell} />
            <p className={s.cellTag} aria-hidden="true">{cell ? `TOẠ ĐỘ ${cell}` : "TOẠ ĐỘ --"}</p>
          </div>

          <ul className={s.legend} aria-label="Chú giải">
            <li><i data-k="free" />Trống</li>
            <li><i data-k="busy" />Đang dùng</li>
            <li><i data-k="held" />Đã giữ chỗ</li>
            <li><i data-k="hl" />Chỗ đề xuất</li>
          </ul>

          <div className={s.mapInfo}>
            <div className={s.mapStat} aria-live="polite">
              <span className={s.mapStatLabel}>{DAY_NAMES[day]} · {pad(hour)}:00 · khu A và B còn trống</span>
              <span className={s.mapStatNum}><NumberTicker value={counts.free} className={s.num} /><i> / {counts.total}</i></span>
              <span className={s.zoneBars} aria-hidden="true">
                {counts.z.map((c) => (
                  <span key={c.id} title={`${c.id}`}>
                    <em>{c.id}</em>
                    <span><i style={{ width: `${(c.free / c.total) * 100}%` }} /></span>
                  </span>
                ))}
              </span>
            </div>
            <div className={s.seatCard} aria-live="polite">
              {shown && shownState ? (
                <>
                  <p className={s.seatId}>{shown.id} <span>· {KIND_NAME[shown.kind]}{shown.cap > 1 ? ` · ${shown.cap} chỗ` : ""}</span></p>
                  <p className={s.seatState} data-k={shownState}>{STATE_LABEL[shownState]}</p>
                  <p className={s.seatMeta}>
                    {change ? `Đổi trạng thái lúc ${pad(change)}:00. ` : "Giữ nguyên tới hết ngày. "}{shown.note}.
                  </p>
                  <span className={s.srOnly}>{seatAria(shown, shownState)}</span>
                </>
              ) : (
                <p className={s.seatMeta}>Rê chuột vào một chỗ hoặc dùng phím mũi tên khi sơ đồ đang được chọn để xem trạng thái, tên chỗ và giờ đổi trạng thái.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- kết quả */}
      <div className={s.result} aria-live="polite">
        {result.error && <p className={s.resErr} role="alert">{result.error}</p>}
        <div className={s.resTop}>
          <section className={s.recCard} aria-labelledby="cg-rec-h" key={rec.id}>
            <p className={s.pickTag}>[ OUTPUT ] GỢI Ý PHÙ HỢP</p>
            <h3 id="cg-rec-h">{rec.name}</h3>
            <p className={s.recPrice}>
              <NumberTicker value={rec.monthly} className={s.recNum} suffix=" đ" />
              <span>mỗi tháng · giá tham khảo</span>
            </p>
            <p className={s.recPer}>Khoảng {vnd(rec.perPerson)} mỗi người mỗi tháng</p>
            <p className={s.recWhy}>{result.reason}</p>
            <p className={s.recSeats}>
              {hl.ids.length > 0 ? (
                <>Chỗ đề xuất lúc {DAY_NAMES[day].toLowerCase()}: <b>{hl.ids.join(", ")}</b></>
              ) : (
                <>Chưa có chỗ trống liền kề cho khung giờ này.</>
              )}
            </p>
            {needMsg && (
              <div className={s.notice} role="status">
                <p>
                  {hl.ids.length > 0
                    ? `Khung giờ này mới còn ${hl.ids.length} trong ${people} chỗ cần thiết.`
                    : `Khung giờ này không còn ${KIND_NAME[rec.kind].toLowerCase()} phù hợp.`}
                </p>
                <button type="button" className={s.ghostBtn} onClick={findSlot}>Tìm khung giờ còn đủ chỗ</button>
              </div>
            )}
          </section>

          <div className={s.compare} role="list" aria-label="So sánh ba gói">
            {result.plans.map((p) => {
              const diff = p.monthly - rec.monthly;
              const isRec = p.id === rec.id;
              return (
                <article key={p.id} role="listitem" className={s.cmpCard} data-rec={isRec ? "1" : undefined}>
                  <p className={s.cmpTag}>{isRec ? "GỢI Ý" : diff < 0 ? "RẺ HƠN" : "NHIỀU HƠN"}</p>
                  <h4>{p.name}</h4>
                  <p className={s.cmpPrice}>{vnd(p.monthly)}<span> mỗi tháng</span></p>
                  <p className={s.cmpDiff}>{isRec ? "Mức chuẩn để so sánh" : `${diff < 0 ? "Thấp hơn" : "Cao hơn"} ${vnd(Math.abs(diff))}`}</p>
                  <p className={s.cmpDetail}>{p.detail}</p>
                  <ul>
                    {p.pros.map((x) => <li key={x} data-k="p">{x}</li>)}
                    {p.cons.map((x) => <li key={x} data-k="c">{x}</li>)}
                    {!p.ok && <li data-k="c">Không đủ sức chứa cho {people} người</li>}
                    {p.consult && <li data-k="c">Cần tư vấn bố trí</li>}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>

        <div className={s.summary}>
          <div>
            <p className={s.pickTag}>[ EXPORT ] TÓM TẮT LỰA CHỌN</p>
            <pre className={s.sumPre}>{summary}</pre>
          </div>
          <div className={s.sumActions}>
            <p className={s.sumNote}>Bản tóm tắt chỉ tạo trên trình duyệt của bạn. Gửi cho đội tư vấn qua biểu mẫu để hẹn ghé xem.</p>
            <MagneticButton strength={0.25} max={8}>
              <a className={`${s.btn} ${s.btnOrange}`} href={consult}>Đặt lịch tham quan với lựa chọn này</a>
            </MagneticButton>
            <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={copy}>Sao chép tóm tắt</button>
            <p ref={statusRef} className={s.copied} role="status">{copied}</p>
          </div>
        </div>
      </div>
      {/* dữ liệu số ghế cho kiểm thử */}
      <span hidden data-seat-total={SEATS.length} />
    </div>
  );
}
