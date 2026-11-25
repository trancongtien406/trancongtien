"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../brand.module.css";
import { ALBUMS, IMG, type Album, type AlbumPage } from "../data/content";

const BASE = "/images/demos/thang-mo";

function AlbumImg({ id, sizes, position = "50% 50%" }: { id: string; sizes: string; position?: string }) {
  const [bad, setBad] = useState(false);
  const im = IMG[id];
  if (!im || bad) return <div className={styles.imgFallback} role="img" aria-label="Ảnh tham khảo chưa hiển thị được"><span>Ảnh tham khảo chưa hiển thị được.</span></div>;
  return (
    <>
      <Image src={`${BASE}/${im.file}-1200.webp`} alt={im.alt} fill sizes={sizes} style={{ objectFit: "cover", objectPosition: position }} onError={() => setBad(true)} draggable={false} />
    </>
  );
}

function PageView({ page, album, side }: { page: AlbumPage; album: Album; side: "solo" | "left" | "right" }) {
  const n = album.pages.indexOf(page) + 1;
  const sz = "(max-width: 1023px) 92vw, 40vw";
  let body: React.ReactNode;
  if (page.layout === "cover") {
    body = (
      <>
        <div className={styles.albFrame} style={{ flex: 1 }}><AlbumImg id={page.imageIds[0]} sizes={sz} /></div>
        <div className={styles.albCoverText}>
          <p className={styles.albKicker}>Tháng Mơ / {album.code}</p>
          <p className={styles.albTitle}>{page.heading}</p>
        </div>
      </>
    );
  } else if (page.layout === "full-photo" || page.layout === "closing") {
    body = (
      <>
        <div className={styles.albFrame} style={{ flex: 1 }}><AlbumImg id={page.imageIds[0]} sizes={sz} /></div>
        <p className={styles.albCaption}>{page.caption}</p>
      </>
    );
  } else {
    body = (
      <>
        <p className={styles.albTitle}>{page.heading}</p>
        <div className={styles.albDuo}>
          {page.imageIds.map((id) => <div key={id} className={styles.albFrame}><AlbumImg id={id} sizes="(max-width: 1023px) 45vw, 20vw" /></div>)}
        </div>
        <p className={styles.albCaption}>{page.caption}</p>
      </>
    );
  }
  return (
    <div className={`${styles.albPage} ${side === "left" ? styles.albLeft : ""} ${side === "right" ? styles.albRight : ""}`} data-tm-page={n}>
      {body}
      <span className={styles.albFolio} aria-hidden="true">{String(n).padStart(2, "0")}</span>
    </div>
  );
}

export function ImmersiveAlbum() {
  const [albumId, setAlbumId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [spread, setSpread] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const dir = useRef<1 | -1>(1);
  const first = useRef(true);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const album = albumId ? ALBUMS.find((a) => a.id === albumId) ?? null : null;
  const open = albumId !== null;
  const steps: number[][] = spread ? [[0], [1, 2], [3]] : [[0], [1], [2], [3]];
  const total = album ? album.pages.length : 0;
  const stepIdx = Math.max(0, steps.findIndex((s) => s.includes(page)));
  const cur = steps[stepIdx];
  const atStart = stepIdx === 0;
  const atEnd = stepIdx === steps.length - 1;

  // chế độ spread theo viewport; giữ trang logic khi resize
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 600px)");
    const f = () => setSpread(mq.matches);
    f(); mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const close = useCallback(() => {
    setAlbumId(null);
    const t = triggerRef.current;
    requestAnimationFrame(() => { if (t && document.contains(t)) t.focus(); });
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent).detail as { id: string; trigger?: HTMLElement };
      triggerRef.current = d.trigger ?? (document.activeElement as HTMLElement | null);
      first.current = true; animating.current = false; dir.current = 1;
      setPage(0); setAlbumId(d.id);
    };
    window.addEventListener("tm:album", onOpen);
    return () => window.removeEventListener("tm:album", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const go = useCallback((delta: number) => {
    if (animating.current) return;
    const ni = Math.min(steps.length - 1, Math.max(0, stepIdx + delta));
    if (ni === stepIdx) return;
    dir.current = delta > 0 ? 1 : -1;
    animating.current = true;
    setPage(steps[ni][0]);
    window.setTimeout(() => { animating.current = false; }, 700); // chặn kẹt khoá
  }, [steps, stepIdx]);

  const jump = useCallback((to: "start" | "end") => {
    if (animating.current) return;
    const ni = to === "start" ? 0 : steps.length - 1;
    if (ni === stepIdx) return;
    dir.current = ni > stepIdx ? 1 : -1;
    animating.current = true;
    setPage(steps[ni][0]);
    window.setTimeout(() => { animating.current = false; }, 700);
  }, [steps, stepIdx]);

  // chuyển trang: lật nhẹ trên desktop, trượt + mờ trên mobile, tức thì khi reduced-motion
  useEffect(() => {
    if (!open || !stageRef.current) return;
    if (first.current) { first.current = false; return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { animating.current = false; return; }
    const d = dir.current;
    const el = stageRef.current;
    const tw = spread
      ? gsap.fromTo(el, { opacity: 0, x: d * 28, rotateY: d * -9, transformPerspective: 1200, transformOrigin: d > 0 ? "left center" : "right center" }, { opacity: 1, x: 0, rotateY: 0, duration: 0.48, ease: "power2.out", clearProps: "transform,opacity", onComplete: () => { animating.current = false; } })
      : gsap.fromTo(el, { opacity: 0, x: d * 16 }, { opacity: 1, x: 0, duration: 0.28, ease: "power2.out", clearProps: "transform,opacity", onComplete: () => { animating.current = false; } });
    return () => { tw.kill(); gsap.set(el, { clearProps: "transform,opacity" }); };
  }, [page, albumId, open, spread]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); return; }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); return; }
    if (e.key === "Home") { e.preventDefault(); jump("start"); return; }
    if (e.key === "End") { e.preventDefault(); jump("end"); return; }
    if (e.key === "Tab" && dialogRef.current) {
      const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]"));
      if (!f.length) { e.preventDefault(); return; }
      const a = document.activeElement;
      if (e.shiftKey && (a === f[0] || a === dialogRef.current)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && a === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };

  const useStyle = () => {
    if (!album) return;
    const style = album.style;
    close();
    window.setTimeout(() => window.dispatchEvent(new CustomEvent("tm:style", { detail: { style } })), 30);
  };

  if (!open) return null;
  const label = cur.length === 2 ? `${String(cur[0] + 1).padStart(2, "0")} — ${String(cur[1] + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}` : `${String(cur[0] + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const idx = album ? ALBUMS.indexOf(album) + 1 : 0;

  return (
    <div
      ref={dialogRef} className={styles.albumDlg} role="dialog" aria-modal="true" aria-labelledby="tm-alb-title" tabIndex={-1} onKeyDown={onKey}
      onPointerDown={(e) => { touch.current = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={(e) => {
        const t = touch.current; touch.current = null; if (!t) return;
        const dx = e.clientX - t.x, dy = e.clientY - t.y;
        if (Math.abs(dx) >= 50 && Math.abs(dx) >= 1.5 * Math.abs(dy)) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className={styles.albTop}>
        <div>
          <p className={styles.albKickerTop}>Tháng Mơ / Album {String(idx).padStart(2, "0")}</p>
          <h2 id="tm-alb-title" className={styles.albDlgTitle}>{album ? album.title : "Album cảm hứng"}</h2>
        </div>
        <button type="button" className={styles.albClose} onClick={close} aria-label="Đóng album">Đóng <span aria-hidden="true">×</span></button>
      </div>

      {!album || total === 0 ? (
        <div className={styles.albEmpty} role="status"><p>{album ? "Album này chưa có nội dung tham khảo." : "Không tìm thấy album cảm hứng này."}</p></div>
      ) : (
        <div className={styles.albStageWrap}>
          <div ref={stageRef} className={`${styles.albStage} ${cur.length === 2 ? styles.albSpread : ""}`} data-tm-spread={cur.length === 2 ? "1" : "0"}>
            {cur.length === 2 ? (
              <>
                <PageView page={album.pages[cur[0]]} album={album} side="left" />
                <PageView page={album.pages[cur[1]]} album={album} side="right" />
              </>
            ) : (
              <PageView page={album.pages[cur[0]]} album={album} side="solo" />
            )}
          </div>
        </div>
      )}

      <div className={styles.albBar}>
        <button type="button" className={styles.albNav} onClick={() => go(-1)} disabled={atStart} aria-label="Trang trước">← <span>Trước</span></button>
        <div className={styles.albMid}>
          <p className={styles.albCount} aria-live="polite" data-tm="album-count">{label}</p>
          <p className={styles.albNote}>Album cảm hứng</p>
        </div>
        {atEnd && album ? (
          <button type="button" className={`${styles.albNav} ${styles.albUse}`} onClick={useStyle}>Dùng phong cách này</button>
        ) : null}
        <button type="button" className={styles.albNav} onClick={() => go(1)} disabled={atEnd} aria-label="Trang sau"><span>Sau</span> →</button>
      </div>
    </div>
  );
}
