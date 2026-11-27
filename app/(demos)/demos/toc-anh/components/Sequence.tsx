"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { CAR_BODY, CAR_GLASS, WHEELS } from "./car";

let FONT = "sans-serif";
const FRAMES = 120;
const ORANGE = "#ff4d00";
const SILVER = "#c0c0c0";

const chapters = [
  { range: [0, 29], k: "01", t: "Khởi động", d: "Cabin yên tĩnh, đèn pha sáng dần. Động cơ nằm giữa, im lặng trước khi bắt đầu." },
  { range: [30, 59], k: "02", t: "Tăng tốc", d: "Mũi xe nhấc nhẹ, vạch đường kéo dài thành vệt. Kim đồng hồ rời vạch đầu tiên." },
  { range: [60, 94], k: "03", t: "Tốc độ đỉnh", d: "Thế giới thu thành những vệt sáng. Chỉ còn bạn, mặt đường và tiếng gió." },
  { range: [95, 119], k: "04", t: "Về đích", d: "Phanh ổn định, đèn hậu bừng cam. Ghi nhận một vòng, sẵn sàng cho vòng tiếp theo." },
] as const;

const sm = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const speedAt = (f: number) => { const t = f / (FRAMES - 1); return sm(0.04, 0.62, t) * (t > 0.8 ? 1 - sm(0.8, 1, t) * 0.75 : 1); };
const hash = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

const DIST: number[] = [];
for (let f = 0, d = 0; f < FRAMES; f++) { d += 2 + speedAt(f) * 46; DIST.push(d); }

const BUILDINGS = Array.from({ length: 42 }, (_, i) => ({ w: 36 + hash(i) * 80, h: 50 + hash(i + 50) * 170, lit: hash(i + 99) }));
const BPERIOD = BUILDINGS.reduce((s, b) => s + b.w + 6, 0);

function render(ctx: CanvasRenderingContext2D, W: number, H: number, f: number) {
  const t = f / (FRAMES - 1);
  const sp = speedAt(f);
  const dist = DIST[f];
  const u = H / 900; // đơn vị theo chiều cao
  const gy = H * 0.8; // mặt đất dưới bánh xe
  const hz = H * 0.62; // đường chân trời

  // trời hoàng hôn -> đêm
  const sky = ctx.createLinearGradient(0, 0, 0, hz + 40);
  sky.addColorStop(0, "#050505");
  sky.addColorStop(0.55, `rgb(${Math.round(24 - 12 * t)},${Math.round(14 - 6 * t)},${Math.round(14 - 4 * t)})`);
  sky.addColorStop(1, `rgb(${Math.round(190 - 120 * t)},${Math.round(60 - 30 * t)},${Math.round(20 - 10 * t)})`);
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  const sunA = 0.85 - 0.6 * t;
  const sun = ctx.createRadialGradient(W * 0.72, hz, 0, W * 0.72, hz, H * 0.5);
  sun.addColorStop(0, `rgba(255,120,40,${sunA})`); sun.addColorStop(0.35, `rgba(255,77,0,${sunA * 0.35})`); sun.addColorStop(1, "rgba(255,77,0,0)");
  ctx.fillStyle = sun; ctx.fillRect(0, 0, W, H);

  // đường chân trời xa: toà nhà (parallax chậm)
  const off = (dist * 0.1 * u) % (BPERIOD * u);
  ctx.fillStyle = "#0b0b0c";
  let x = -off; let i = 0;
  while (x < W + 200 * u) {
    const b = BUILDINGS[i % BUILDINGS.length]; const bw = b.w * u; const bh = b.h * u;
    ctx.fillStyle = "#0a0a0b"; ctx.fillRect(x, hz - bh, bw, bh + 4);
    if (b.lit > 0.45) {
      ctx.fillStyle = `rgba(255,150,70,${0.15 + 0.45 * t * b.lit})`;
      for (let wy = hz - bh + 10 * u; wy < hz - 8 * u; wy += 16 * u) for (let wx = x + 6 * u; wx < x + bw - 8 * u; wx += 12 * u) if (hash(i * 31 + wx * 0.1 + wy) > 0.55) ctx.fillRect(wx, wy, 4 * u, 6 * u);
    }
    x += bw + 6 * u; i++;
  }
  ctx.fillStyle = "#080808"; ctx.fillRect(0, hz, W, H - hz);

  // cột đèn đường (parallax vừa)
  const lampGap = 520 * u; const lo = (dist * 0.55 * u) % lampGap;
  for (let lx = -lo; lx < W + lampGap; lx += lampGap) {
    ctx.strokeStyle = "#1c1c1c"; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.moveTo(lx, gy - 6 * u); ctx.lineTo(lx, hz - 150 * u); ctx.lineTo(lx + 46 * u, hz - 160 * u); ctx.stroke();
    const g = ctx.createRadialGradient(lx + 50 * u, hz - 156 * u, 0, lx + 50 * u, hz - 156 * u, 150 * u);
    g.addColorStop(0, `rgba(255,150,70,${0.18 + 0.5 * t})`); g.addColorStop(1, "rgba(255,150,70,0)");
    ctx.fillStyle = g; ctx.fillRect(lx - 120 * u, hz - 320 * u, 340 * u, 320 * u);
  }

  // mặt đường
  const road = ctx.createLinearGradient(0, hz + 30 * u, 0, H);
  road.addColorStop(0, "#161616"); road.addColorStop(1, "#050505");
  ctx.fillStyle = road; ctx.fillRect(0, hz + 30 * u, W, H);
  // viền vỉa hè (cam / bạc) chạy nhanh
  const seg = 80 * u; const co = (dist * 1.0 * u) % (seg * 2);
  for (let cx = -co; cx < W + seg; cx += seg * 2) {
    ctx.fillStyle = ORANGE; ctx.fillRect(cx, hz + 30 * u, seg, 9 * u);
    ctx.fillStyle = SILVER; ctx.fillRect(cx + seg, hz + 30 * u, seg, 9 * u);
  }
  // vạch kẻ đường
  const dash = 140 * u; const dOff = (dist * 1.0 * u) % (dash * 2);
  ctx.fillStyle = "rgba(192,192,192,.55)";
  for (let dx = -dOff; dx < W + dash; dx += dash * 2) ctx.fillRect(dx, H * 0.91, dash, 6 * u);

  // vệt tốc độ
  ctx.lineCap = "round";
  for (let k = 0; k < 26; k++) {
    const yy = hz - 140 * u + hash(k) * (H - hz + 120 * u);
    const len = (30 + hash(k + 7) * 260) * u * (0.2 + sp * 1.4);
    const xx = (((hash(k + 13) * W * 1.4 - dist * (1.2 + hash(k + 3)) * u * 0.9) % (W * 1.4)) + W * 1.4) % (W * 1.4) - W * 0.2;
    ctx.strokeStyle = k % 5 === 0 ? `rgba(255,77,0,${0.12 + sp * 0.45})` : `rgba(192,192,192,${0.04 + sp * 0.22})`;
    ctx.lineWidth = (1 + hash(k + 21) * 2) * u * 1.4;
    ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + len, yy); ctx.stroke();
  }

  // ---- xe ----
  const carW = W < 700 ? W * 0.86 : Math.min(W * 0.58, H * 1.15);
  const s = carW / 100; const cxp = W / 2 - carW / 2; const cyp = gy;
  const bounce = Math.sin(f * 0.9) * 0.18 * sp;
  const pitch = -0.014 * sp * (f / FRAMES > 0.8 ? -1.6 : 1);
  // bóng đổ
  const sh = ctx.createRadialGradient(W / 2, gy + 2, 0, W / 2, gy + 2, carW * 0.55);
  sh.addColorStop(0, "rgba(0,0,0,.85)"); sh.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save(); ctx.translate(0, gy + 4 * u); ctx.scale(1, 0.1); ctx.translate(0, -(gy + 4 * u)); ctx.fillStyle = sh; ctx.fillRect(W / 2 - carW * 0.6, gy - carW * 0.2, carW * 1.2, carW * 0.5); ctx.restore();

  // chùm đèn pha
  const beam = sm(0.12, 0.45, t);
  ctx.save(); ctx.translate(cxp, cyp); ctx.scale(s, s);
  if (beam > 0.01) {
    const bg = ctx.createLinearGradient(98, 0, 98 + 160, 0);
    bg.addColorStop(0, `rgba(255,240,220,${0.55 * beam})`); bg.addColorStop(1, "rgba(255,240,220,0)");
    ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(96, -22); ctx.lineTo(98 + 170, -48); ctx.lineTo(98 + 170, 2); ctx.lineTo(96, -17); ctx.closePath(); ctx.fill();
  }
  ctx.translate(0, bounce); ctx.translate(22, 0); ctx.rotate(pitch); ctx.translate(-22, 0);

  // thân xe
  const body = new Path2D(CAR_BODY);
  const bgx = ctx.createLinearGradient(0, -46, 0, -12);
  bgx.addColorStop(0, "#4a4a4d"); bgx.addColorStop(0.35, "#1b1b1d"); bgx.addColorStop(1, "#090909");
  ctx.fillStyle = bgx; ctx.fill(body);
  ctx.lineWidth = 0.5; ctx.strokeStyle = SILVER; ctx.stroke(body);
  // cánh gió sau
  ctx.fillStyle = "#101010"; ctx.fillRect(2, -33.2, 9, 1.2); ctx.fillRect(5, -32.2, 1, 3.5);
  // kính
  const glass = ctx.createLinearGradient(30, -42, 76, -32);
  glass.addColorStop(0, "#07090c"); glass.addColorStop(0.5, "#15202c"); glass.addColorStop(1, "#05070a");
  ctx.fillStyle = glass; ctx.fill(new Path2D(CAR_GLASS));
  // vệt phản chiếu chạy theo khung hình
  ctx.save(); ctx.clip(new Path2D(CAR_GLASS));
  const rx = 20 + t * 70; ctx.fillStyle = `rgba(255,255,255,${0.1 + 0.1 * Math.sin(t * 20)})`;
  ctx.beginPath(); ctx.moveTo(rx, -45); ctx.lineTo(rx + 7, -45); ctx.lineTo(rx - 3, -30); ctx.lineTo(rx - 10, -30); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.strokeStyle = "#0a0a0a"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(54, -41); ctx.lineTo(54, -31.5); ctx.stroke();
  // đường cam thân + gầm
  ctx.strokeStyle = ORANGE; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(8, -26.3); ctx.lineTo(20, -30); ctx.lineTo(80, -30.2); ctx.lineTo(93, -26.6); ctx.stroke();
  ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(31, -13.6); ctx.lineTo(69, -13.6); ctx.stroke();
  ctx.strokeStyle = "rgba(0,0,0,.7)"; ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(40, -30); ctx.lineTo(40, -15); ctx.moveTo(66, -30); ctx.lineTo(66, -15); ctx.stroke();
  // hốc bánh
  ctx.fillStyle = "#030303";
  for (const wx of WHEELS) { ctx.beginPath(); ctx.arc(wx, -11, 13.2, Math.PI, 0); ctx.lineTo(wx + 13.2, -4); ctx.lineTo(wx - 13.2, -4); ctx.fill(); }
  // đèn pha + đèn hậu
  ctx.fillStyle = `rgba(255,248,235,${0.25 + 0.75 * beam})`; ctx.shadowColor = "#fff2d9"; ctx.shadowBlur = 8 * beam; ctx.beginPath(); ctx.moveTo(88, -26.4); ctx.lineTo(96, -24.6); ctx.lineTo(97.5, -22.6); ctx.lineTo(90, -23.6); ctx.closePath(); ctx.fill();
  const brake = sm(0.84, 0.92, t);
  ctx.fillStyle = ORANGE; ctx.shadowColor = ORANGE; ctx.shadowBlur = 5 + 14 * (0.3 + brake); ctx.globalAlpha = 0.65 + 0.35 * brake; ctx.fillRect(2.3, -23.6, 1.4, 6); ctx.globalAlpha = 1; ctx.shadowBlur = 0;

  // bánh xe
  const rot = dist * 0.09;
  for (const wx of WHEELS) {
    ctx.save(); ctx.translate(wx, -11);
    ctx.fillStyle = "#050505"; ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill();
    ctx.strokeStyle = "#1c1c1c"; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.arc(0, 0, 10.4, 0, 7); ctx.stroke();
    ctx.rotate(rot);
    const blur = sm(0.2, 0.8, sp);
    ctx.fillStyle = "#26262a"; ctx.beginPath(); ctx.arc(0, 0, 7.6, 0, 7); ctx.fill();
    ctx.strokeStyle = SILVER; ctx.lineWidth = 0.7; ctx.globalAlpha = 1 - blur * 0.8; ctx.beginPath(); ctx.arc(0, 0, 7.6, 0, 7); ctx.stroke();
    for (let k = 0; k < 5; k++) { ctx.rotate((Math.PI * 2) / 5); ctx.strokeStyle = SILVER; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(1.6, 0); ctx.lineTo(7.2, 0); ctx.stroke(); }
    ctx.globalAlpha = 1;
    if (blur > 0.05) { const cg = ctx.createRadialGradient(0, 0, 1, 0, 0, 8); cg.addColorStop(0, `rgba(192,192,192,${0.5 * blur})`); cg.addColorStop(1, `rgba(60,60,64,${0.7 * blur})`); ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(0, 0, 7.4, 0, 7); ctx.fill(); }
    ctx.fillStyle = ORANGE; ctx.beginPath(); ctx.arc(0, 0, 1.5, 0, 7); ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // ---- đồng hồ tốc độ ----
  const R = Math.min(W, H) * (W < 700 ? 0.11 : 0.1); const gx = W - R - Math.max(16, W * 0.03); const gyy = H - R - Math.max(16, H * 0.05) - H * 0.02;
  const a0 = Math.PI * 0.75; const sweep = Math.PI * 1.5;
  ctx.lineWidth = Math.max(2, R * 0.07); ctx.strokeStyle = "rgba(192,192,192,.28)"; ctx.beginPath(); ctx.arc(gx, gyy, R, a0, a0 + sweep); ctx.stroke();
  ctx.strokeStyle = ORANGE; ctx.beginPath(); ctx.arc(gx, gyy, R, a0, a0 + sweep * sp); ctx.stroke();
  ctx.lineWidth = 1; ctx.strokeStyle = SILVER;
  for (let k = 0; k <= 10; k++) { const a = a0 + (sweep * k) / 10; ctx.beginPath(); ctx.moveTo(gx + Math.cos(a) * (R - R * 0.2), gyy + Math.sin(a) * (R - R * 0.2)); ctx.lineTo(gx + Math.cos(a) * (R - R * 0.08), gyy + Math.sin(a) * (R - R * 0.08)); ctx.stroke(); }
  ctx.fillStyle = SILVER; ctx.textAlign = "center"; ctx.font = `700 ${Math.round(R * 0.5)}px ${FONT}`; ctx.fillText(String(Math.round(sp * 312)), gx, gyy + R * 0.12);
  ctx.font = `500 ${Math.round(R * 0.16)}px ${FONT}`; ctx.fillStyle = ORANGE; ctx.fillText("KM/H", gx, gyy + R * 0.42);

  // viền phim + tối góc
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.0);
  vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,.65)");
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  const bar = H * 0.09 * (1 - sm(0, 0.06, t));
  ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, bar); ctx.fillRect(0, H - bar, W, bar);
}

export function Sequence() {
  const secRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = secRef.current; const canvas = canvasRef.current;
    if (!sec || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const speedEl = sec.querySelector<HTMLElement>("[data-speed]");
    const frameEl = sec.querySelector<HTMLElement>("[data-frame]");
    const gearEl = sec.querySelector<HTMLElement>("[data-gear]");
    const bar = sec.querySelector<HTMLElement>("[data-rpm]");
    const caps = Array.from(sec.querySelectorAll<HTMLElement>("[data-cap]"));
    let cur = 0; let W = 0; let H = 0;

    const paint = (f: number) => {
      cur = f;
      render(ctx, W, H, f);
      const sp = speedAt(f);
      if (speedEl) speedEl.textContent = String(Math.round(sp * 312));
      if (frameEl) frameEl.textContent = `${String(f + 1).padStart(3, "0")} / ${FRAMES}`;
      if (gearEl) gearEl.textContent = String(Math.min(6, 1 + Math.floor(sp * 6)));
      if (bar) bar.style.transform = `scaleX(${(0.12 + 0.88 * sp).toFixed(3)})`;
      const act = chapters.findIndex((c) => f >= c.range[0] && f <= c.range[1]);
      caps.forEach((c, i) => c.toggleAttribute("data-on", i === act));
    };
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(cur);
    };
    const fv = getComputedStyle(canvas).getPropertyValue("--ta-fh").trim();
    if (fv) FONT = `${fv}, sans-serif`;
    document.fonts?.ready.then(() => paint(cur));
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    fit();

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      sec.setAttribute("data-live", "1");
      const proxy = { f: 0 };
      paint(0);
      gsap.to(proxy, {
        f: FRAMES - 1, ease: "none",
        scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${window.innerHeight * 5}`, pin: true, scrub: 0.4, invalidateOnRefresh: true },
        onUpdate: () => { const f = Math.round(proxy.f); if (f !== cur) paint(f); },
      });
      return () => sec.removeAttribute("data-live");
    });
    mm.add("(prefers-reduced-motion: reduce)", () => { paint(84); });

    return () => { ro.disconnect(); mm.revert(); };
  }, []);

  return (
    <section ref={secRef} className={styles.seq} id="chuoi-khung-hinh" aria-labelledby="seq-h">
      <h2 id="seq-h" className={styles.srOnly}>Chuỗi khung hình: xe tăng tốc từ vạch xuất phát đến tốc độ đỉnh</h2>
      <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label="Hoạt ảnh vẽ bằng canvas: một chiếc xe thể thao tăng tốc, đèn pha sáng dần và đồng hồ tốc độ tăng theo thanh cuộn" />
      <div className={styles.hud} aria-hidden="true">
        <p>KHUNG <b data-frame>085 / 120</b></p>
        <p>SỐ <b data-gear>5</b></p>
        <p>TỐC ĐỘ <b data-speed>0</b> KM/H</p>
        <div className={styles.rpm}><i data-rpm /></div>
      </div>
      <div className={styles.caps}>
        {chapters.map((c) => (
          <article key={c.k} className={styles.cap} data-cap>
            <p className={styles.capK}>{c.k} / 04</p>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
