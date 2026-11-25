"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildPlan, formatLabel, mmss, totalSeconds, type Seg, type Wod } from "../lib/wod";
import { shake } from "./Shake";
import styles from "../brand.module.css";

type Status = "idle" | "running" | "paused" | "done";

const KIND_LABEL: Record<Seg["kind"], string> = { prep: "CHUẨN BỊ", work: "LÀM", rest: "NGHỈ", emom: "LÀM" };

/**
 * Đồng hồ tabata/EMOM chạy thật. Thời gian tính theo mốc kết thúc (performance.now), không cộng dồn từng nhịp,
 * nên đúng khi tab bị ẩn hoặc trình duyệt trễ nhịp. Âm báo mặc định tắt và chỉ bật sau thao tác của người dùng.
 */
export function Timer({ wod, ack, onNeedAck }: { wod: Wod; ack: boolean; onNeedAck: () => void }) {
  const segs = useMemo(() => buildPlan(wod), [wod]);
  const total = useMemo(() => totalSeconds(segs), [segs]);
  const [status, setStatus] = useState<Status>("idle");
  const [idx, setIdx] = useState(0);
  const [sec, setSec] = useState(segs[0].seconds);
  const [sound, setSound] = useState(false);
  const [announce, setAnnounce] = useState("");

  const R = useRef({ idx: 0, end: 0, left: segs[0].seconds * 1000, running: false, timer: 0 as number, sec: segs[0].seconds, elapsedBefore: 0 });
  const root = useRef<HTMLDivElement>(null);
  const startBtn = useRef<HTMLButtonElement>(null);
  const barSeg = useRef<HTMLSpanElement>(null);
  const barAll = useRef<HTMLSpanElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const soundRef = useRef(false);
  const wake = useRef<{ release: () => Promise<void> } | null>(null);

  useEffect(() => { soundRef.current = sound; }, [sound]);

  const beep = useCallback((freq = 880, ms = 110) => {
    if (!soundRef.current) return;
    try {
      const ctx = audio.current;
      if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = freq; o.type = "square"; g.gain.value = 0.04;
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + ms / 1000);
    } catch { /* âm báo là tuỳ chọn */ }
  }, []);

  const describe = useCallback((i: number) => {
    const s = segs[i];
    const m = wod.moves[s.moveIdx];
    if (s.kind === "prep") return `Chuẩn bị, ${s.seconds} giây. Động tác đầu tiên: ${m.move.name}.`;
    if (s.kind === "rest") return `Nghỉ ${s.seconds} giây. Tiếp theo: ${m.move.name}.`;
    if (s.kind === "emom") return `Phút ${s.round}: ${m.move.name}, ${m.text}.`;
    return `Hiệp ${s.round}: ${m.move.name}, làm ${s.seconds} giây.`;
  }, [segs, wod]);

  const paintBars = useCallback((leftMs: number) => {
    const s = segs[R.current.idx];
    const segFrac = 1 - leftMs / (s.seconds * 1000);
    if (barSeg.current) barSeg.current.style.transform = `scaleX(${Math.min(1, Math.max(0, segFrac))})`;
    let done = 0;
    for (let k = 0; k < R.current.idx; k++) if (segs[k].kind !== "prep") done += segs[k].seconds;
    if (s.kind !== "prep") done += s.seconds * segFrac;
    if (barAll.current) barAll.current.style.transform = `scaleX(${Math.min(1, done / total)})`;
  }, [segs, total]);

  const stop = useCallback(() => {
    window.clearInterval(R.current.timer);
    R.current.running = false;
    wake.current?.release().catch(() => {});
    wake.current = null;
  }, []);

  const tick = useCallback(() => {
    const r = R.current;
    if (!r.running) return;
    const now = performance.now();
    let rem = r.end - now;
    let moved = false;
    while (rem <= 0 && r.idx < segs.length - 1) {
      r.idx += 1;
      r.end += segs[r.idx].seconds * 1000;
      rem = r.end - now;
      moved = true;
    }
    if (rem <= 0) {
      r.left = 0; stop(); paintBars(0);
      setIdx(r.idx); setSec(0); setStatus("done");
      setAnnounce("Đã kết thúc cấu trúc bài tập. Hạ nhịp, đi bộ chậm và uống nước.");
      beep(660, 400);
      return;
    }
    r.left = rem;
    paintBars(rem);
    const s = Math.ceil(rem / 1000);
    if (moved) {
      setIdx(r.idx); setSec(s); r.sec = s;
      setAnnounce(describe(r.idx));
      beep(segs[r.idx].kind === "rest" ? 520 : 880, 200);
    } else if (s !== r.sec) {
      r.sec = s; setSec(s);
      if (s <= 3 && segs[r.idx].kind !== "emom") beep(700, 70);
    }
  }, [segs, stop, paintBars, describe, beep]);

  const run = useCallback(() => {
    const r = R.current;
    r.end = performance.now() + r.left;
    r.running = true;
    window.clearInterval(r.timer);
    r.timer = window.setInterval(tick, 100);
  }, [tick]);

  // đổi bài (wod mới) thì về trạng thái đầu
  useEffect(() => {
    stop();
    R.current = { idx: 0, end: 0, left: segs[0].seconds * 1000, running: false, timer: 0, sec: segs[0].seconds, elapsedBefore: 0 };
    setIdx(0); setSec(segs[0].seconds); setStatus("idle"); setAnnounce("");
    if (barSeg.current) barSeg.current.style.transform = "scaleX(0)";
    if (barAll.current) barAll.current.style.transform = "scaleX(0)";
    return stop;
  }, [segs, stop]);

  // cảnh báo khi rời trang đang tập
  useEffect(() => {
    if (status !== "running") return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [status]);

  const start = () => {
    if (!ack) { onNeedAck(); return; }
    shake(startBtn.current);
    try {
      type Nav = Navigator & { wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> } };
      (navigator as Nav).wakeLock?.request("screen").then((l) => { wake.current = l; }).catch(() => {});
    } catch { /* không bắt buộc */ }
    if (status === "done") { R.current.idx = 0; R.current.left = segs[0].seconds * 1000; setIdx(0); }
    setStatus("running");
    setAnnounce(describe(R.current.idx));
    beep(880, 150);
    run();
  };
  const pause = () => {
    const r = R.current;
    r.left = Math.max(0, r.end - performance.now());
    stop(); setStatus("paused"); setAnnounce("Đã tạm dừng.");
  };
  const resume = () => { setStatus("running"); setAnnounce("Tiếp tục."); run(); };
  const reset = () => {
    stop();
    R.current = { idx: 0, end: 0, left: segs[0].seconds * 1000, running: false, timer: 0, sec: segs[0].seconds, elapsedBefore: 0 };
    setIdx(0); setSec(segs[0].seconds); setStatus("idle"); setAnnounce("Đã đặt lại bộ đếm.");
    paintBars(segs[0].seconds * 1000);
    if (barAll.current) barAll.current.style.transform = "scaleX(0)";
  };
  const skip = () => {
    const r = R.current;
    if (r.idx >= segs.length - 1) return;
    r.idx += 1;
    r.left = segs[r.idx].seconds * 1000;
    r.end = performance.now() + r.left;
    r.sec = segs[r.idx].seconds;
    setIdx(r.idx); setSec(r.sec); paintBars(r.left);
    setAnnounce(describe(r.idx));
  };
  const toggleSound = () => {
    if (!sound) {
      try {
        const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audio.current = audio.current ?? new AC();
        audio.current.resume?.().catch(() => {});
      } catch { /* trình duyệt không hỗ trợ */ }
    }
    setSound((v) => !v);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest("button,input,select,textarea,a,summary")) return;
    if (e.key === " ") { e.preventDefault(); if (status === "running") pause(); else if (status === "paused") resume(); else start(); }
    else if (e.key.toLowerCase() === "r") reset();
  };

  const seg = segs[Math.min(idx, segs.length - 1)];
  const m = wod.moves[seg.moveIdx];
  const nextSeg = segs[Math.min(idx + 1, segs.length - 1)];
  const nextMove = wod.moves[nextSeg.moveIdx];
  const kind = status === "done" ? "done" : seg.kind;
  const rounds = wod.format === "tabata" ? wod.params.time * 2 : wod.params.time;

  return (
    <div ref={root} className={styles.timer} data-kind={kind} data-status={status} tabIndex={0} role="group" aria-label={`Đồng hồ tập: ${formatLabel(wod.format, wod.params.time)}`} onKeyDown={onKey}>
      <div className={styles.tmHead}>
        <span className={styles.tmBadge}>{wod.format === "tabata" ? "TABATA 20/10" : "EMOM 60s"}</span>
        <span className={styles.tmRound}>{status === "done" ? "XONG" : seg.kind === "prep" ? "SẴN SÀNG" : `${wod.format === "tabata" ? "HIỆP" : "PHÚT"} ${String(seg.round).padStart(2, "0")}/${String(rounds).padStart(2, "0")}`}</span>
        <button type="button" className={styles.tmSound} aria-pressed={sound} onClick={toggleSound}>Âm báo: {sound ? "bật" : "tắt"}</button>
      </div>
      <p className={styles.tmPhase} aria-hidden="true">{status === "done" ? "XONG" : KIND_LABEL[seg.kind]}</p>
      <p className={styles.tmClock} role="timer" aria-live="off" aria-label={`Còn ${sec} giây`} data-testid="clock">{mmss(sec)}</p>
      <div className={styles.tmBar} aria-hidden="true"><span ref={barSeg} /></div>
      <div className={styles.tmMove}>
        {status === "done" ? (
          <p><strong>Đã kết thúc cấu trúc bài tập.</strong> Hạ nhịp, đi bộ chậm vài phút và uống nước.</p>
        ) : (
          <>
            <p className={styles.tmMoveName} data-testid="move">{seg.kind === "rest" ? `Tiếp theo: ${m.move.name}` : m.move.name}</p>
            <p className={styles.tmMoveSub}>{wod.format === "emom" && seg.kind !== "prep" ? `${m.text}. Xong sớm thì nghỉ đến hết phút.` : seg.kind === "prep" ? `Động tác đầu: ${m.move.name}` : m.move.cue}</p>
            {seg.kind !== "prep" && idx < segs.length - 1 && wod.format === "emom" ? <p className={styles.tmNext}>Phút sau: {nextMove.move.name}</p> : null}
          </>
        )}
      </div>
      <div className={styles.tmAll}><span>Tổng {mmss(total)}</span><div className={styles.tmBar} aria-hidden="true"><span ref={barAll} /></div></div>
      <div className={styles.tmBtns}>
        {status === "running" ? (
          <button type="button" className={`${styles.btn} ${styles.btnInk} ${styles.btnLg}`} onClick={pause}>Tạm dừng</button>
        ) : (
          <button ref={startBtn} type="button" className={`${styles.btn} ${styles.btnAcid} ${styles.btnLg}`} onClick={status === "paused" ? resume : start}>
            {status === "paused" ? "Tiếp tục" : status === "done" ? "Tập lại" : "Bắt đầu"}
          </button>
        )}
        <button type="button" className={`${styles.btn} ${styles.btnGhostInk} ${styles.btnLg}`} onClick={skip} disabled={status === "idle" || status === "done"}>Bỏ qua</button>
        <button type="button" className={`${styles.btn} ${styles.btnGhostInk} ${styles.btnLg}`} onClick={reset}>Đặt lại</button>
      </div>
      <p className={styles.srOnly} role="status" aria-live="polite">{announce}</p>
      <p className={styles.tmKeys}>Phím tắt khi đang chọn khung đồng hồ: Space bắt đầu hoặc tạm dừng, R đặt lại.</p>
    </div>
  );
}
