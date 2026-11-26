"use client";

import { useEffect, useRef, useState } from "react";
import { DIALOGUES, LANGS, type Lang } from "../data/content";
import styles from "../brand.module.css";

export function Dialogue() {
  const [lang, setLang] = useState<Lang>("en");
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [gloss, setGloss] = useState<Record<number, boolean>>({});
  const [allGloss, setAllGloss] = useState(false);
  const started = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const d = DIALOGUES[lang];
  const total = d.lines.length;
  const done = shown >= total;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // bắt đầu khi vào khung nhìn lần đầu
  useEffect(() => {
    const el = box.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting) && !started.current) { started.current = true; setPlaying(true); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced) { setShown(total); setTyping(false); return; }
    if (!playing || done) { if (done) setTyping(false); return; }
    const t = window.setTimeout(
      () => { if (!typing) setTyping(true); else { setShown((s) => s + 1); setTyping(false); } },
      typing ? 650 : shown === 0 ? 300 : 900,
    );
    return () => window.clearTimeout(t);
  }, [playing, typing, shown, done, reduced, total]);

  // cuộn trong khung chat (không cuộn trang) nếu người dùng đang ở gần cuối
  useEffect(() => {
    const el = log.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 120) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [shown, typing, reduced]);

  const pick = (l: Lang) => { setLang(l); setShown(reduced ? DIALOGUES[l].lines.length : 0); setTyping(false); setGloss({}); setPlaying(!reduced); started.current = true; };
  const replay = () => { setShown(0); setTyping(false); setPlaying(true); };
  const status = done ? "Hội thoại đã hiện đủ." : typing ? `${d.lines[shown].who === "a" ? d.a : d.b} đang gõ` : playing ? "Đang chạy" : "Đã tạm dừng";

  return (
    <section id="hoi-thoai" className={`${styles.panel} ${styles.panelPink}`} aria-labelledby="dlg-title" ref={box}>
      <div className={styles.dlgGrid}>
        <div className={styles.dlgCopy}>
          <p className={styles.kicker}>Phương pháp: nói theo tình huống</p>
          <h2 id="dlg-title" className={styles.h2}>Một đoạn hội thoại mẫu của lớp giao tiếp.</h2>
          <p className={styles.lede}>Mỗi bài trong lớp giao tiếp bắt đầu từ một đoạn hội thoại ngắn như thế này, rồi học viên tự đóng vai nói lại. Bấm vào bong bóng để xem nghĩa tiếng Việt.</p>
          <div className={`${styles.segment} ${styles.segOnPink}`} role="group" aria-label="Chọn ngôn ngữ hội thoại">
            {LANGS.map((l) => <button key={l.id} type="button" className={styles.segBtn} aria-pressed={lang === l.id} onClick={() => pick(l.id)}>{l.name}</button>)}
          </div>
          <div className={styles.dlgBtns}>
            {!reduced && (
              <button type="button" className={`${styles.btn} ${styles.btnNavy} ${styles.btnSm}`} aria-pressed={playing && !done} onClick={() => (done ? replay() : setPlaying((p) => !p))}>
                {done ? "Phát lại" : playing ? "Tạm dừng" : "Tiếp tục"}
              </button>
            )}
            <button type="button" className={`${styles.btn} ${styles.btnWhite} ${styles.btnSm}`} aria-pressed={allGloss} onClick={() => setAllGloss((v) => !v)}>
              {allGloss ? "Ẩn nghĩa tiếng Việt" : "Hiện nghĩa tiếng Việt"}
            </button>
          </div>
          <p className={styles.srOnly} role="status">{status}</p>
        </div>
        <div className={styles.phone} data-fx="ChatBubbles" data-fx-ready="1">
          <div className={styles.phoneTop}>
            <span className={styles.avatar} aria-hidden="true">{d.b[0]}</span>
            <div><b>{d.b}</b><small>{d.title}</small></div>
          </div>
          <div ref={log} className={styles.chatLog} role="log" aria-live="polite" aria-relevant="additions" aria-label={`Hội thoại ${d.title}`} tabIndex={0}>
            {d.lines.slice(0, shown).map((l, i) => {
              const open = allGloss || gloss[i];
              return (
                <button
                  key={`${lang}-${i}`} type="button"
                  className={`${styles.bubble} ${l.who === "a" ? styles.bubbleA : styles.bubbleB}`}
                  aria-expanded={open ? true : false} onClick={() => setGloss((g) => ({ ...g, [i]: !g[i] }))}
                  lang={lang}
                >
                  <small>{l.who === "a" ? d.a : d.b}</small>
                  <span className={lang === "ja" ? styles.ja : lang === "ko" ? styles.ko : ""}>{l.text}</span>
                  {open && <em lang="vi">{l.vi}</em>}
                </button>
              );
            })}
            {typing && !reduced && (
              <div className={`${styles.bubble} ${styles.typing} ${d.lines[shown].who === "a" ? styles.bubbleA : styles.bubbleB}`} aria-hidden="true"><i /><i /><i /></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
