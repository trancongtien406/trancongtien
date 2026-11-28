"use client";
import { useEffect, useRef, useState } from "react";

type Mode = "video" | "invert";
type P = { x: number; y: number; r: number; age: number };

/**
 * Lớp lộ dưới blob: video chất lỏng ngũ sắc thật (Pexels, xem CREDITS.md), có ảnh tĩnh dự phòng,
 * cuối cùng là gradient. Vẽ vào canvas nhỏ rồi phóng to trong blob.
 */
function makeArt(reduced: boolean) {
  const W = 640, H = 360;
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const c = cv.getContext("2d")!;
  const base = "/images/demos/blob-mat-na/";
  const img = new Image(); img.src = base + "liquid-poster.webp";
  const vid = document.createElement("video");
  vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = "auto"; vid.src = base + "liquid.mp4";
  if (!reduced) void vid.play().catch(() => {});
  const cover = (src: CanvasImageSource, sw: number, sh: number) => {
    const k = Math.max(W / sw, H / sh); const dw = sw * k, dh = sh * k;
    c.drawImage(src, (W - dw) / 2, (H - dh) / 2, dw, dh);
  };
  const draw = (time: number) => {
    void time;
    c.filter = "saturate(1.5) contrast(1.2) brightness(.85)";
    if (!reduced && vid.readyState >= 2) cover(vid, vid.videoWidth, vid.videoHeight);
    else if (img.complete && img.naturalWidth) cover(img, img.naturalWidth, img.naturalHeight);
    else { c.filter = "none"; c.fillStyle = "#2a3d9a"; c.fillRect(0, 0, W, H); }
    c.filter = "none";
  };
  const dispose = () => { vid.pause(); vid.removeAttribute("src"); vid.load(); };
  const setPlaying = (on: boolean) => { if (reduced) return; if (on) void vid.play().catch(() => {}); else vid.pause(); };
  return { cv, draw, dispose, setPlaying };
}

export function BlobHero({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("video");
  const modeRef = useRef<Mode>("video");
  modeRef.current = mode;

  useEffect(() => {
    const el = wrap.current, cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0;
    const resize = () => { w = el.clientWidth; h = el.clientHeight; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(el);
    const art = makeArt(reduced);
    const trail: P[] = [];
        const head = { x: w * 0.62, y: h * 0.55 };
    const target = { x: head.x, y: head.y };
    let last = { x: head.x, y: head.y }, speed = 0, inside = false, lastMove = 0, visible = true, raf = 0;
    const baseR = () => Math.max(54, Math.min(w, h) * 0.17);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = e.clientX - r.left; target.y = e.clientY - r.top; inside = true; lastMove = performance.now();
    };
    const onLeave = () => { inside = false; };
    el.addEventListener("pointermove", onMove); el.addEventListener("pointerdown", onMove); el.addEventListener("pointerleave", onLeave);
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; art.setPlaying(visible); }, { threshold: 0 });
    io.observe(el);

    // Mặt nạ độ phân giải thấp (1/4): vẽ chuỗi tròn -> làm mờ -> ngưỡng alpha (hiệu ứng gooey) -> phóng to mượt.
    const K = 0.5;
    const small = document.createElement("canvas"); const sctx = small.getContext("2d", { willReadFrequently: true })!;
    const blur = document.createElement("canvas"); const bctx = blur.getContext("2d", { willReadFrequently: true })!;
    const render = (t: number) => {
      const sw = Math.max(2, Math.round(w * K)), sh = Math.max(2, Math.round(h * K));
      if (small.width !== sw || small.height !== sh) { small.width = blur.width = sw; small.height = blur.height = sh; }
      sctx.setTransform(K, 0, 0, K, 0, 0); sctx.clearRect(0, 0, w, h);
      const R = baseR();
      const pts = trail;
      sctx.fillStyle = "#000";
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const r = p.r * (1 + 0.1 * Math.sin(t * 0.004 + i * 1.7));
        if (r < 1) continue;
        sctx.beginPath(); sctx.arc(p.x, p.y, r, 0, Math.PI * 2); sctx.fill();
      }
      // giọt rơi ở đuôi: tách khỏi blob, được gooey kéo dính lại khi gần
      const tail = pts[pts.length - 1];
      if (tail && speed > 2) {
        for (let j = 0; j < 2; j++) { const dr = R * (0.14 - j * 0.04), ox = Math.sin(t * 0.003 + j * 2) * R * 0.6; sctx.beginPath(); sctx.arc(tail.x - speed * (4 + j * 3) + ox, tail.y + R * (0.8 + j * 0.5), dr, 0, 6.283); sctx.fill(); }
      }
      bctx.setTransform(1, 0, 0, 1, 0, 0); bctx.clearRect(0, 0, sw, sh);
      bctx.filter = `blur(${Math.max(2, R * K * 0.28)}px)`; bctx.drawImage(small, 0, 0); bctx.filter = "none";
      const id = bctx.getImageData(0, 0, sw, sh); const d = id.data;
      for (let i = 3; i < d.length; i += 4) { const a = (d[i] / 255 - 0.46) / 0.035; d[i] = a <= 0 ? 0 : a >= 1 ? 255 : Math.round(a * a * (3 - 2 * a) * 255); }
      bctx.putImageData(id, 0, 0);
      // nền (video / đảo màu) rồi cắt theo mặt nạ
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = "source-over"; ctx.clearRect(0, 0, cv.width, cv.height);
      if (modeRef.current === "video") { art.draw(t / 1000); ctx.imageSmoothingEnabled = true; ctx.drawImage(art.cv, 0, 0, cv.width, cv.height); }
      else { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height); }
      ctx.globalCompositeOperation = "destination-in"; ctx.imageSmoothingQuality = "high"; ctx.drawImage(blur, 0, 0, cv.width, cv.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const R = baseR();
      if (!inside && t - lastMove > 1800) { // tự trôi khi không có con trỏ (cảm ứng / đứng yên)
        target.x = w * (0.5 + 0.3 * Math.sin(t * 0.0006)); target.y = h * (0.52 + 0.18 * Math.sin(t * 0.0009 + 1));
      }
      head.x += (target.x - head.x) * 0.16; head.y += (target.y - head.y) * 0.16;
      speed = speed * 0.85 + Math.hypot(head.x - last.x, head.y - last.y) * 0.15; last = { x: head.x, y: head.y };
      const sz = R * (1 + Math.min(speed, 30) * 0.012);
      const LIFE = 70;
      for (const p of trail) p.age++;
      const lead = trail.find((p) => p.age === 0);
      if (lead) { lead.x = head.x; lead.y = head.y; lead.r = sz; }
      const ref = trail[0];
      if (!ref || Math.hypot(ref.x - head.x, ref.y - head.y) > R * 0.28) trail.unshift({ x: head.x, y: head.y, r: sz, age: 0 });
      else { ref.age = 0; ref.x = head.x; ref.y = head.y; }
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        if (p.age > LIFE) { trail.splice(i, 1); continue; }
        const rest = !inside && t - lastMove > 1800 ? 0.85 : 1;
        p.r = sz * rest * Math.pow(Math.max(0, 1 - p.age / LIFE), 1.1);
      }
      render(t);
    };

    if (reduced) {
      for (let i = 0; i < 8; i++) trail.push({ x: w * (0.5 + i * 0.02), y: h * 0.52 + i * 3, r: baseR() * (1 - i / 10), age: i });
      render(0);
    } else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); art.dispose();
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerdown", onMove); el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} data-mn-hero data-mode={mode} style={{ position: "relative", minHeight: "100svh", isolation: "isolate", overflow: "hidden", touchAction: "pan-y" }}>
      {/* lớp 1: nền + nội dung chữ nhỏ (children đặt trước canvas) */}
      <canvas ref={canvas} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} />
      {children}
      <div role="group" aria-label="Chế độ blob" data-mn-toggle style={{ position: "absolute", zIndex: 6, right: "var(--mn-pad)", bottom: "var(--mn-pad)" }}>
        <button type="button" aria-pressed={mode === "video"} onClick={() => setMode("video")}>Lộ video</button>
        <button type="button" aria-pressed={mode === "invert"} onClick={() => setMode("invert")}>Đảo màu</button>
      </div>
    </div>
  );
}
