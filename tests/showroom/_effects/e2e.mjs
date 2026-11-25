// E2E thư viện hiệu ứng: BASE=http://localhost:3100 node tests/showroom/_effects/e2e.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/mac/mern/works/hancitywebsite/node_modules/playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const URL_ = `${BASE}/demos/lab-effects`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

let pass = 0, fail = 0;
const fails = [];
const check = (name, ok, detail = "") => {
  if (ok) pass++; else { fail++; fails.push(`${name} ${detail}`); }
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : "  -> " + detail}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ALL = ["SplitReveal", "TextScramble", "ClipReveal", "ParallaxLayer", "PinnedHorizontalScroll", "StickyChapters", "ScrollScrubText",
  "VelocityMarquee", "Counter", "Odometer", "SlotText", "MagneticButton", "TiltCard", "CursorSpotlight", "ShineSweep", "ImageHoverDistort",
  "StackingCards", "DraggableGallery", "CanvasParticles", "AudioWaveVisualizer", "SVGPathDraw", "BlobMorph", "GrainOverlay", "ScrollProgress"];

const SPY = () => {
  const L = new Map(); let n = 0; const ids = new WeakMap();
  const id = (f) => { if (!ids.has(f)) ids.set(f, ++n); return ids.get(f); };
  const lbl = (t) => (t === window ? "win" : t === document ? "doc" : t === document.documentElement ? "html" : null);
  const oa = EventTarget.prototype.addEventListener, orm = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, o) {
    const l = lbl(this);
    if (l && fn) L.set(`${l}|${type}|${id(fn.handleEvent || fn)}|${typeof o === "object" ? !!o.capture : !!o}`, 1);
    return oa.call(this, type, fn, o);
  };
  EventTarget.prototype.removeEventListener = function (type, fn, o) {
    const l = lbl(this);
    if (l && fn) L.delete(`${l}|${type}|${id(fn.handleEvent || fn)}|${typeof o === "object" ? !!o.capture : !!o}`);
    return orm.call(this, type, fn, o);
  };
  const P = new Set(); const raf = window.requestAnimationFrame.bind(window), caf = window.cancelAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => { const i = raf((t) => { P.delete(i); cb(t); }); P.add(i); return i; };
  window.cancelAnimationFrame = (i) => { P.delete(i); caf(i); };
  window.__spy = () => ({ listeners: L.size, byType: [...L.keys()].map((k) => k.split("|").slice(0, 2).join(":")).sort(), raf: P.size });
};

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });

async function open(opts, { spy = false } = {}) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error" || (m.type() === "warning" && /hydrat|did not match/i.test(m.text()))) errs.push(`[${m.type()}] ${m.text().slice(0, 300)}`); });
  page.on("pageerror", (e) => errs.push(`[pageerror] ${e.message}`));
  const ext = [];
  page.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith("data:") && !u.startsWith("blob:")) ext.push(u); });
  if (spy) await page.addInitScript(SPY);
  await page.goto(URL_, { waitUntil: "load", timeout: 170000 });
  await page.waitForFunction(() => document.querySelectorAll("[data-fx-ready]").length >= 15, null, { timeout: 60000 }).catch(() => {});
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  await sleep(800);
  return { ctx, page, errs, ext };
}
const scrollThrough = async (page) => {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 380) { await page.evaluate((v) => window.scrollTo(0, v), y); await sleep(70); }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await sleep(500);
};
const noHOverflow = (page) => page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, bw: document.body.scrollWidth }));

/* ===================== 1. Desktop 1440 ===================== */
console.log("\n== Desktop 1440 ==");
{
  const { ctx, page, errs, ext } = await open({ viewport: { width: 1440, height: 900 } });
  const ready = await page.evaluate((all) => Object.fromEntries(all.map((n) => [n, !!document.querySelector(`[data-fx="${n}"][data-fx-ready]`)])), ALL);
  ALL.forEach((n) => check(`khởi chạy ${n}`, n === "Odometer" ? ready.Odometer : ready[n], JSON.stringify(ready[n])));
  check("khởi chạy CustomCursor", !!(await page.$('[data-fx="CustomCursor"][data-fx-ready]')));
  check("html có data-fx-cursor khi hideNative", await page.evaluate(() => document.documentElement.hasAttribute("data-fx-cursor")));

  const ov = await noHOverflow(page); check("không tràn ngang 1440", ov.sw <= ov.iw && ov.bw <= ov.iw, JSON.stringify(ov));
  await page.screenshot({ path: `${SHOTS}/lab-1440-top.png` });

  // --- cuộn qua toàn trang để mọi reveal chạy
  await scrollThrough(page);
  await sleep(1800);
  const fin = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const heroWords = [...document.querySelectorAll('[data-fx="SplitReveal"] [data-fx-w] > span')];
    const clip = [...document.querySelectorAll('[data-fx="ClipReveal"]')].map((e) => getComputedStyle(e).clipPath);
    const strips = [...document.querySelectorAll("[data-fx-strip]")];
    const colH = strips[0]?.parentElement.getBoundingClientRect().height;
    const stripOk = strips.every((s) => Math.abs(s.getBoundingClientRect().top - s.parentElement.getBoundingClientRect().top + Number(s.dataset.d) * colH) < 1.5);
    const dash = q('[data-fx="SVGPathDraw"] path').getAttribute("pathLength") && getComputedStyle(q('[data-fx="SVGPathDraw"] path')).strokeDashoffset;
    return {
      splitDone: heroWords.every((w) => getComputedStyle(w).transform === "none"),
      splitCount: heroWords.length,
      clip, stripOk, nStrips: strips.length,
      counter: q('[data-fx="Counter"] [data-fx-view]').textContent,
      scramble: q('[data-fx="TextScramble"] [data-fx-view]').textContent,
      scrub: [...document.querySelectorAll('[data-fx="ScrollScrubText"] [data-fx-w]')].map((w) => getComputedStyle(w).opacity).every((o) => Number(o) >= 0.99),
      dash,
      progress: Number(q('[data-fx="ScrollProgress"]').getAttribute("data-progress")),
      ariaNow: q('[data-fx="ScrollProgress"]').getAttribute("aria-valuenow"),
    };
  });
  check("SplitReveal chạy xong, từ về vị trí cuối", fin.splitDone && fin.splitCount > 20, JSON.stringify([fin.splitDone, fin.splitCount]));
  check("TextScramble kết thúc đúng chữ NFC", fin.scramble === "Giải mã từng từ một cách gọn gàng", fin.scramble);
  check("ClipReveal xong (clip-path none)", fin.clip.every((c) => c === "none"), fin.clip.join(" | "));
  check("Counter đếm xong 12.840", /12\.840/.test(fin.counter), fin.counter);
  check("Odometer cột chữ số đúng vị trí", fin.stripOk && fin.nStrips >= 11, `${fin.stripOk} ${fin.nStrips}`);
  check("ScrollScrubText sáng hết ở cuối trang", fin.scrub);
  check("SVGPathDraw (view) vẽ xong, dashoffset 0", Number.parseFloat(fin.dash) === 0 || fin.dash === "0px", String(fin.dash));
  check("ScrollProgress ~100% cuối trang", fin.progress > 0.97 && fin.ariaNow === "100" || Number(fin.ariaNow) >= 97, `${fin.progress} ${fin.ariaNow}`);
  await page.screenshot({ path: `${SHOTS}/lab-1440-end.png` });

  // --- đo dòng SplitLines: có ≥2 dòng khác nhau
  const lines = await page.evaluate(() => new Set([...document.querySelectorAll('#split [data-fx-w]')].map((w) => w.offsetTop)).size);
  check("SplitLines thấy ≥2 dòng", lines >= 2, String(lines));

  // --- Pinned: cuộn tới, track dịch ngang
  await page.evaluate(() => { const sp = document.querySelector("#pinned .pin-spacer") || document.getElementById("pinned"); window.scrollTo(0, sp.getBoundingClientRect().top + window.scrollY); }); await sleep(600);
  const pin0 = await page.evaluate(() => ({ mode: document.querySelector('[data-fx="PinnedHorizontalScroll"]').dataset.fxMode, x: new DOMMatrix(getComputedStyle(document.querySelector("[data-fx-track]")).transform).m41 }));
  await page.mouse.wheel(0, 700); await sleep(600);
  const pin1 = await page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('[data-fx="PinnedHorizontalScroll"] [data-fx-track]')).transform).m41);
  check("PinnedHorizontalScroll: chế độ pinned trên desktop", pin0.mode === "pinned", pin0.mode);
  check("PinnedHorizontalScroll: cuộn dọc → track dịch ngang", pin1 < pin0.x - 50, `${pin0.x} -> ${pin1}`);
  // focus panel cuối bằng bàn phím
  await page.evaluate(() => { const sp = document.querySelector('#pinned .pin-spacer'); window.scrollTo(0, sp.getBoundingClientRect().top + window.scrollY); }); await sleep(400);
  await page.focus('#pinned a >> nth=3').catch(() => {});
  await sleep(500);
  const pin2 = await page.evaluate(() => ({ vpScroll: document.querySelector("#pinned [data-fx-viewport]").scrollLeft, x: new DOMMatrix(getComputedStyle(document.querySelector('#pinned [data-fx-track]')).transform).m41 }));
  check("Pinned: focus panel cuối không làm viewport cuộn ngang, track dịch tới", pin2.vpScroll === 0 && pin2.x < -500, JSON.stringify(pin2));

  // --- StickyChapters đổi chương
  await page.evaluate(() => document.getElementById("chapters").scrollIntoView()); await sleep(400);
  const a0 = await page.evaluate(() => document.querySelector('[data-fx="StickyChapters"]').dataset.active);
  await page.evaluate(() => { const c = document.querySelectorAll("[data-fx-chapter]")[2]; window.scrollTo(0, c.getBoundingClientRect().top + window.scrollY - 100); }); await sleep(1200);
  const a1 = await page.evaluate(() => ({ a: document.querySelector('[data-fx="StickyChapters"]').dataset.active, op: [...document.querySelectorAll("[data-fx-visual]")].map((v) => Number(getComputedStyle(v).opacity).toFixed(1)).join(",") }));
  check("StickyChapters đổi hình theo chương", a0 === "0" && a1.a === "2" && a1.op === "0.0,0.0,1.0", `${a0} ${JSON.stringify(a1)}`);

  // --- Marquee velocity: chuyển động, boost khi cuộn nhanh, dừng khi bấm nút
  await page.evaluate(() => document.getElementById("marquee").scrollIntoView()); await sleep(500);
  const tx = () => page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('[data-fx="VelocityMarquee"] [data-fx-track]')).transform).m41);
  const m0 = await tx(); await sleep(600); const m1 = await tx();
  check("VelocityMarquee chạy", Math.abs(m1 - m0) > 10, `${m0} -> ${m1}`);
  const base = Math.abs(m1 - m0) / 0.6;
  let maxSpeed = 0, last = await tx(), lt = Date.now();
  for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, i % 2 ? 380 : -380); await sleep(40); const n = await tx(), t = Date.now(); let d = Math.abs(n - last); maxSpeed = Math.max(maxSpeed, d / ((t - lt) / 1000)); last = n; lt = t; }
  check("VelocityMarquee tăng tốc khi cuộn nhanh", maxSpeed > base * 1.4, `base=${base.toFixed(0)} max=${maxSpeed.toFixed(0)}`);
  await page.evaluate(() => document.getElementById("marquee").scrollIntoView()); await sleep(1500);
  await page.click('[data-fx="VelocityMarquee"] button'); await page.mouse.move(5, 5); await sleep(500);
  const p0 = await tx(); await sleep(500); const p1 = await tx();
  check("VelocityMarquee dừng được bằng nút (aria-pressed)", Math.abs(p1 - p0) < 0.5 && (await page.getAttribute('[data-fx="VelocityMarquee"] button', "aria-pressed")) === "true", `${p0} ${p1}`);
  await page.click('[data-fx="VelocityMarquee"] button');

  // --- Counter / Ticker / Slot
  await page.evaluate(() => document.getElementById("counter").scrollIntoView()); await sleep(600);
  const before = await page.evaluate(() => document.querySelectorAll('[data-fx="Counter"]')[1].textContent);
  await page.click('[data-testid="ticker-btn"]'); await sleep(1300);
  const after = await page.evaluate(() => document.querySelectorAll('[data-fx="Counter"]')[1].querySelector("[data-fx-view]").textContent);
  check("NumberTicker tween tới giá trị mới", /2\.530/.test(after), `${before} -> ${after}`);
  const s0 = await page.evaluate(() => getComputedStyle(document.querySelectorAll('[data-fx="SlotText"]')[0].querySelectorAll("[data-fx-item]")[0]).opacity);
  await page.click('[data-testid="slot-btn"]'); await sleep(900);
  const s1 = await page.evaluate(() => [...document.querySelectorAll('[data-fx="SlotText"]')[0].querySelectorAll("[data-fx-item]")].map((i) => Number(getComputedStyle(i).opacity).toFixed(1)).join(","));
  check("SlotText đổi chữ", s0 === "1" && s1 === "0.0,1.0,0.0", `${s0} ${s1}`);
  await page.evaluate(() => document.getElementById("counter").scrollIntoView()); await sleep(2600);
  const auto = await page.evaluate(() => [...document.querySelectorAll('[data-fx="SlotText"]')[1].querySelectorAll("[data-fx-item]")].map((i) => Number(getComputedStyle(i).opacity).toFixed(1)).join(","));
  check("SlotText tự đổi theo interval", auto !== "1.0,0.0,0.0", auto);

  // --- Pointer effects
  await page.evaluate(() => document.getElementById("pointer").scrollIntoView()); await sleep(500);
  const tilt = await page.locator('[data-fx="TiltCard"]').boundingBox();
  await page.mouse.move(tilt.x + 5, tilt.y + 5); await page.mouse.move(tilt.x + tilt.width - 10, tilt.y + 20, { steps: 6 }); await sleep(600);
  const tm = await page.evaluate(() => getComputedStyle(document.querySelector('[data-fx="TiltCard"]')).transform);
  const glare = await page.evaluate(() => getComputedStyle(document.querySelector("[data-fx-glare]")).opacity);
  check("TiltCard nghiêng 3D + glare khi hover", tm.startsWith("matrix3d") && glare === "1", `${tm.slice(0, 40)} glare=${glare}`);
  await page.mouse.move(5, 300); await sleep(900);
  const tm2 = await page.evaluate(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector('[data-fx="TiltCard"]')).transform); return Math.abs(m.m12) + Math.abs(m.m13); });
  check("TiltCard trở về khi rời", tm2 < 0.02, String(tm2));
  const mag = await page.locator('[data-fx="MagneticButton"]').boundingBox();
  await page.mouse.move(mag.x + mag.width - 4, mag.y + mag.height / 2, { steps: 5 }); await sleep(700);
  const mt = await page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('[data-fx="MagneticButton"] > span')).transform).m41);
  const mhit = await page.locator('[data-fx="MagneticButton"]').boundingBox();
  check("MagneticButton dịch theo con trỏ, vùng bấm ngoài giữ nguyên", mt > 1 && Math.abs(mhit.x - mag.x) < 0.5 && Math.abs(mhit.width - mag.width) < 0.5, `dx=${mt} ${JSON.stringify(mhit)}`);
  await page.mouse.move(5, 300); await sleep(700);
  const sp = await page.locator('[data-fx="CursorSpotlight"]').boundingBox();
  await page.mouse.move(sp.x + 50, sp.y + 60, { steps: 4 }); await sleep(300);
  const spv = await page.evaluate(() => { const s = document.querySelector("[data-fx-spot]"); return [s.style.getPropertyValue("--fx-x"), getComputedStyle(s).opacity]; });
  check("CursorSpotlight cập nhật vị trí", spv[0] === "50px" && spv[1] === "1", JSON.stringify(spv));
  const sh = await page.locator('[data-fx="ShineSweep"]').first().boundingBox();
  await page.mouse.move(sh.x + 10, sh.y + 10); await sleep(350);
  const shx = await page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector("[data-fx-shine]")).transform).m41);
  check("ShineSweep chạy khi hover", shx > -sh.width * 0.9, String(shx));

  // --- Cursor
  const cu = await page.locator("[data-cursor]").first().boundingBox();
  await page.mouse.move(cu.x + cu.width / 2, cu.y + cu.height / 2, { steps: 6 }); await sleep(700);
  const c1 = await page.evaluate(() => { const d = document.querySelector("[data-fx-dot]"); const el = document.querySelector('[data-fx="CustomCursor"]'); const r = d.getBoundingClientRect(); return { cx: r.x + r.width / 2, cy: r.y + r.height / 2, w: r.width, op: getComputedStyle(el).opacity, label: document.querySelector("[data-fx-label]").textContent }; });
  check("CustomCursor bám con trỏ", Math.abs(c1.cx - (cu.x + cu.width / 2)) < 6 && Math.abs(c1.cy - (cu.y + cu.height / 2)) < 6, JSON.stringify(c1));
  check("CustomCursor phóng to + nhãn trên [data-cursor]", c1.w > 30 && c1.label.length > 0, JSON.stringify(c1));
  const inp = await page.locator("#pointer input").boundingBox();
  await page.mouse.move(inp.x + 20, inp.y + 10, { steps: 5 }); await sleep(500);
  const c2 = await page.evaluate(() => ({ op: getComputedStyle(document.querySelector('[data-fx="CustomCursor"]')).opacity, cur: getComputedStyle(document.querySelector("#pointer input")).cursor }));
  check("CustomCursor ẩn + con trỏ hệ thống giữ nguyên trong input", Number(c2.op) < 0.05 && c2.cur !== "none", JSON.stringify(c2));

  // --- ImageHoverDistort
  await page.evaluate(() => document.getElementById("distort").scrollIntoView()); await sleep(500);
  const im = await page.locator('[data-fx="ImageHoverDistort"]').boundingBox();
  await page.mouse.move(im.x + 20, im.y + 20); await page.mouse.move(im.x + im.width - 20, im.y + im.height - 20, { steps: 8 }); await sleep(100);
  const dist = await page.evaluate(() => ({ f: document.querySelector('[data-fx="ImageHoverDistort"]').style.filter, s: Number(document.querySelector("feDisplacementMap").getAttribute("scale")) }));
  check("ImageHoverDistort bật filter + scale>0 khi hover", /url\(/.test(dist.f) && dist.s > 1, JSON.stringify(dist));
  await page.screenshot({ path: `${SHOTS}/lab-1440-distort.png` });
  await page.mouse.move(5, 5); await sleep(1800);
  check("ImageHoverDistort gỡ filter khi nghỉ", (await page.evaluate(() => document.querySelector('[data-fx="ImageHoverDistort"]').style.filter)) === "");

  // --- StackingCards: thẻ đầu thu nhỏ khi thẻ sau chồng lên
  await page.evaluate(() => document.getElementById("stack").scrollIntoView()); await sleep(300);
  await page.evaluate(() => window.scrollBy(0, 700)); await sleep(700);
  const sc = await page.evaluate(() => [...document.querySelectorAll("[data-fx-card] > div")].map((d) => new DOMMatrix(getComputedStyle(d).transform).a.toFixed(3)));
  check("StackingCards: thẻ dưới thu nhỏ dần", Number(sc[0]) < 1 && Number(sc[0]) < Number(sc[sc.length - 1]), sc.join(","));

  // --- DraggableGallery: nút, phím, kéo
  await page.evaluate(() => document.getElementById("gallery").scrollIntoView()); await sleep(500);
  const vp = '#gallery [data-fx-viewport]';
  const sl = () => page.evaluate((s) => document.querySelector(s).scrollLeft, vp);
  const g0 = await sl();
  check("Gallery: nút Trước disabled ở đầu", await page.evaluate(() => document.querySelector("[data-fx-prev]").disabled));
  await page.click("[data-fx-next]"); await sleep(900); const g1 = await sl();
  check("Gallery: nút Sau cuộn", g1 > g0 + 100, `${g0}->${g1}`);
  await page.focus(vp); await page.keyboard.press("ArrowRight"); await sleep(900); const g2 = await sl();
  check("Gallery: phím → cuộn", g2 > g1 + 100, `${g1}->${g2}`);
  await page.keyboard.press("ArrowLeft"); await sleep(900); const g3 = await sl();
  check("Gallery: phím ← cuộn ngược", g3 < g2 - 100, `${g2}->${g3}`);
  const gb = await page.locator(vp).boundingBox();
  await page.mouse.move(gb.x + 600, gb.y + 80); await page.mouse.down(); await page.mouse.move(gb.x + 300, gb.y + 80, { steps: 5 }); await page.mouse.up(); const g4a = await sl(); await sleep(900); const g4 = await sl();
  check("Gallery: kéo chuột cuộn + quán tính", g4a > g3 + 200 && g4 > g4a + 5, `${g3} -> ${g4a} -> ${g4}`);
  check("Gallery: nút có aria-label", !!(await page.getAttribute("[data-fx-next]", "aria-label")));

  // --- Canvas: vẽ thật, dừng khi ra ngoài khung
  await page.evaluate(() => document.getElementById("canvas").scrollIntoView()); await sleep(700);
  const painted = await page.evaluate(() => [...document.querySelectorAll("canvas")].map((c) => { const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 16) if (d[i]) n++; return n; }));
  check("Canvas particles/bubbles/sparks/wave đã vẽ pixel", painted.length === 4 && painted.every((n) => n > 20), painted.join(","));
  const caps = await page.evaluate(() => { const c = document.querySelector('[data-fx="CanvasParticles"]'); return [c.width / c.clientWidth]; });
  check("Canvas DPR ≤ 2", caps[0] <= 2.001, String(caps));
  await page.screenshot({ path: `${SHOTS}/lab-1440-canvas.png` });
  const snap = (sel) => page.evaluate((s) => { const u = document.querySelector(s).toDataURL(); let h = 5381; for (let i = 0; i < u.length; i++) h = ((h << 5) + h + u.charCodeAt(i)) | 0; return h; }, sel);
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
  const o1 = await snap('[data-fx="AudioWaveVisualizer"]'); await sleep(500); const o2 = await snap('[data-fx="AudioWaveVisualizer"]');
  check("Canvas dừng vẽ khi ra ngoài khung nhìn", o1 === o2, `${o1} vs ${o2}`);
  await page.evaluate(() => document.getElementById("canvas").scrollIntoView()); await sleep(300);
  const v1 = await snap('[data-fx="AudioWaveVisualizer"]'); await sleep(300); const v2 = await snap('[data-fx="AudioWaveVisualizer"]');
  check("Canvas chạy lại khi vào khung", v1 !== v2);

  // --- BlobMorph: path đổi theo thời gian
  await page.evaluate(() => document.getElementById("svg").scrollIntoView()); await sleep(500);
  const b1 = await page.evaluate(() => document.querySelector('[data-fx="BlobMorph"] path').getAttribute("d")); await sleep(900);
  const b2 = await page.evaluate(() => document.querySelector('[data-fx="BlobMorph"] path').getAttribute("d"));
  check("BlobMorph biến hình", b1 !== b2 && b1.length > 50);

  // --- Curtain
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(300);
  const t0 = Date.now(); await page.click('[data-testid="curtain-play"]');
  const shown = await page.waitForSelector('[data-fx="CurtainReveal"]', { timeout: 3000 }).then(() => true).catch(() => false);
  await page.waitForSelector('[data-fx="CurtainReveal"]', { state: "detached", timeout: 3000 }).catch(() => {});
  const dt = Date.now() - t0;
  check("CurtainReveal hiện rồi tự gỡ ≤1.7s (gồm độ trễ test)", shown && dt < 1700, `${dt}ms`);
  await page.click('[data-testid="curtain-play"]'); await sleep(250); await page.keyboard.press("Escape"); await sleep(350);
  check("CurtainReveal bỏ qua được bằng phím", !(await page.$('[data-fx="CurtainReveal"]')));
  check("Nội dung vẫn tồn tại dưới Curtain (không chặn no-JS: overlay chỉ mount bằng JS)", true);

  // --- leak: ảnh chụp từng đoạn
  const secs = await page.$$eval("[data-lab]", (els) => els.map((e) => e.id));
  for (const id of secs) { await page.evaluate((i) => document.getElementById(i).scrollIntoView(), id); await sleep(450); await page.screenshot({ path: `${SHOTS}/sec-1440-${id}.png` }); }
  const ov2 = await noHOverflow(page); check("không tràn ngang 1440 sau tương tác", ov2.sw <= ov2.iw, JSON.stringify(ov2));
  check("0 lỗi console / hydration (desktop)", errs.length === 0, errs.slice(0, 4).join(" || "));
  check("không request ra ngoài origin", ext.length === 0, ext.slice(0, 3).join(","));
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
  await page.screenshot({ path: `${SHOTS}/lab-1440-full.png`, fullPage: true });
  await ctx.close();
}

/* ===================== 2. Rò rỉ listener / rAF ===================== */
console.log("\n== Rò rỉ sau unmount ==");
{
  const { ctx, page, errs } = await open({ viewport: { width: 1440, height: 900 } }, { spy: true });
  await page.mouse.move(300, 300); await page.mouse.move(400, 360, { steps: 4 });
  await page.evaluate(() => document.getElementById("marquee").scrollIntoView()); await sleep(1200);
  await page.evaluate(() => document.getElementById("canvas").scrollIntoView()); await sleep(1200);
  const on1 = await page.evaluate(() => window.__spy());
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('[data-testid="leak-toggle"]'); await sleep(1800);
  const off1 = await page.evaluate(() => window.__spy());
  await page.click('[data-testid="leak-toggle"]'); await sleep(1200);
  await page.mouse.move(350, 330, { steps: 3 }); await sleep(600);
  const on2 = await page.evaluate(() => window.__spy());
  await page.click('[data-testid="leak-toggle"]'); await sleep(1800);
  const off2 = await page.evaluate(() => window.__spy());
  console.log("  on1", on1.listeners, on1.raf, "| off1", off1.listeners, off1.raf, "| on2", on2.listeners, on2.raf, "| off2", off2.listeners, off2.raf);
  const gone = on1.byType.filter((t) => !off1.byType.includes(t));
  console.log("  listener biến mất khi gỡ:", gone.join(", "));
  check("gỡ cursor/canvas/marquee giảm listener toàn cục", off1.listeners < on1.listeners, `${on1.listeners} -> ${off1.listeners}`);
  check("mount/unmount 2 lần không tích listener", off2.listeners === off1.listeners, `${off1.listeners} vs ${off2.listeners}`);
  check("không rAF treo sau unmount (không tăng quá 1 giữa 2 lần)", off2.raf <= off1.raf + 1, `${off1.raf} vs ${off2.raf}`);
  check("rAF đang chờ sau unmount ≤ 3 (chỉ hạ tầng React/Next/gsap)", off2.raf <= 3, String(off2.raf));
  check("0 lỗi console khi mount/unmount", errs.length === 0, errs.slice(0, 3).join(" || "));
  await ctx.close();
}

/* ===================== 3. Reduced motion ===================== */
console.log("\n== prefers-reduced-motion ==");
{
  const { ctx, page, errs } = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await sleep(500);
  const r = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const strips = [...document.querySelectorAll("[data-fx-strip]")];
    const colH = strips[0].parentElement.getBoundingClientRect().height;
    return {
      split: [...document.querySelectorAll('[data-fx="SplitReveal"] [data-fx-w] > span')].every((w) => getComputedStyle(w).transform === "none"),
      clip: [...document.querySelectorAll('[data-fx="ClipReveal"]')].every((e) => getComputedStyle(e).clipPath === "none"),
      scrub: [...document.querySelectorAll('[data-fx="ScrollScrubText"] [data-fx-w]')].every((w) => getComputedStyle(w).opacity === "1"),
      counter: q('[data-fx="Counter"] [data-fx-view]').textContent,
      strips: strips.every((s) => Math.abs(s.getBoundingClientRect().top - s.parentElement.getBoundingClientRect().top + Number(s.dataset.d) * colH) < 1.5),
      scramble: q('[data-fx="TextScramble"] [data-fx-view]').textContent,
      dash: getComputedStyle(q('[data-fx="SVGPathDraw"] path')).strokeDasharray,
      cursor: !!q('[data-fx="CustomCursor"]'),
      mq: { transform: getComputedStyle(q('[data-fx="VelocityMarquee"] [data-fx-track]')).transform, wrap: getComputedStyle(q('[data-fx="VelocityMarquee"] [data-fx-track]')).flexWrap, dup: getComputedStyle(document.querySelectorAll('[data-fx="VelocityMarquee"] [data-fx-group]')[1]).display },
      pinMode: q('[data-fx="PinnedHorizontalScroll"]').dataset.fxMode,
      canvasState: q('[data-fx="CanvasParticles"]').getAttribute("data-fx-ready"),
      slot: [...document.querySelectorAll('[data-fx="SlotText"]')[0].querySelectorAll("[data-fx-item]")].map((i) => getComputedStyle(i).opacity).join(","),
      mag: getComputedStyle(q('[data-fx="MagneticButton"] > span')).transform,
      chapters: [...document.querySelectorAll("[data-fx-visual]")].map((v) => getComputedStyle(v).opacity).join(","),
    };
  });
  check("reduced: SplitReveal hiện đủ", r.split);
  check("reduced: ClipReveal hiện đủ", r.clip);
  check("reduced: ScrollScrubText sáng đủ", r.scrub);
  check("reduced: Counter hiện số cuối", /12\.840/.test(r.counter), r.counter);
  check("reduced: Odometer ở số cuối", r.strips);
  check("reduced: TextScramble hiện chữ cuối", r.scramble === "Giải mã từng từ một cách gọn gàng", r.scramble);
  check("reduced: SVGPathDraw không đặt dash", r.dash === "none" || r.dash === "", r.dash);
  check("reduced: CustomCursor không render", !r.cursor);
  check("reduced: Marquee tĩnh, xuống dòng, bỏ bản sao", r.mq.transform === "none" && r.mq.wrap === "wrap" && r.mq.dup === "none", JSON.stringify(r.mq));
  check("reduced: Pinned = cuộn ngang tự nhiên", r.pinMode === "native", r.pinMode);
  check("reduced: canvas chỉ vẽ tĩnh", r.canvasState === "static", r.canvasState);
  check("reduced: SlotText hiện từ đầu", r.slot === "1,0,0", r.slot);
  check("reduced: Magnetic không transform", r.mag === "none", r.mag);
  check("reduced: StickyChapters hiện hình đầu", r.chapters.startsWith("1,0"), r.chapters);
  await page.click('[data-testid="curtain-play"]'); await sleep(400);
  check("reduced: Curtain không hiện", !(await page.$('[data-fx="CurtainReveal"]')));
  const t = await page.evaluate(() => { const c = document.querySelector('[data-fx="CanvasParticles"]'); return c.toDataURL().length; }); await sleep(400);
  check("reduced: canvas không animate", t === (await page.evaluate(() => document.querySelector('[data-fx="CanvasParticles"]').toDataURL().length)));
  const ov = await noHOverflow(page); check("reduced: không tràn ngang", ov.sw <= ov.iw, JSON.stringify(ov));
  await page.screenshot({ path: `${SHOTS}/lab-1440-reduced.png`, fullPage: true });
  check("reduced: 0 lỗi console", errs.length === 0, errs.slice(0, 3).join(" || "));
  await ctx.close();
}

/* ===================== 4. Mobile 390 ===================== */
console.log("\n== Mobile 390 (touch) ==");
{
  const { ctx, page, errs } = await open({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const ov = await noHOverflow(page); check("không tràn ngang 390", ov.sw <= ov.iw && ov.bw <= ov.iw, JSON.stringify(ov));
  check("mobile: không có CustomCursor", !(await page.$('[data-fx="CustomCursor"]')));
  check("mobile: Pinned dùng cuộn ngang tự nhiên", (await page.getAttribute('[data-fx="PinnedHorizontalScroll"]', "data-fx-mode")) === "native");
  await page.screenshot({ path: `${SHOTS}/lab-390-top.png` });
  await scrollThrough(page); await sleep(1200);
  const ov2 = await noHOverflow(page); check("không tràn ngang 390 sau khi cuộn hết", ov2.sw <= ov2.iw && ov2.bw <= ov2.iw, JSON.stringify(ov2));
  const px = await page.evaluate(() => getComputedStyle(document.querySelector('[data-fx="ParallaxLayer"]')).transform);
  check("mobile: Parallax tắt", px === "none" || new DOMMatrix(px).m42 === 0, px);
  const mt = await page.evaluate(() => getComputedStyle(document.querySelector('[data-fx="MagneticButton"] > span')).transform);
  check("mobile: Magnetic/Tilt không nghiêng", mt === "none");
  const sw = await page.evaluate(() => { const v = document.querySelector("#pinned [data-fx-viewport]"); return [v.scrollWidth, v.clientWidth, getComputedStyle(v).overflowX]; });
  check("mobile: viewport Pinned cuộn ngang được", sw[0] > sw[1] && sw[2] === "auto", sw.join(","));
  const chap = await page.evaluate(() => { const c = document.querySelector("[data-fx-col]"); return [Math.round(c.getBoundingClientRect().height), getComputedStyle(c).position]; });
  check("mobile: StickyChapters cột hình dính, cao ~42svh", chap[1] === "sticky" && Math.abs(chap[0] - 0.42 * 844) < 10, chap.join(","));
  for (const id of ["split", "chapters", "marquee", "counter", "pointer", "gallery", "canvas", "svg"]) { await page.evaluate((i) => document.getElementById(i).scrollIntoView(), id); await sleep(500); await page.screenshot({ path: `${SHOTS}/sec-390-${id}.png` }); }
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
  await page.screenshot({ path: `${SHOTS}/lab-390-full.png`, fullPage: true });
  check("mobile: 0 lỗi console", errs.length === 0, errs.slice(0, 3).join(" || "));
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) console.log("FAIL:\n" + fails.map((f) => " - " + f).join("\n"));
process.exit(fail ? 1 : 0);
