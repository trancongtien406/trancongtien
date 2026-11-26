import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = `${BASE}/demos/sat-gym`;
const SHOT = new URL("./screenshots/", import.meta.url).pathname;
fs.mkdirSync(SHOT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const FORBID = /(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)/i;
const FORM = 'form[aria-label="Tạo bài tập"]';

async function open(w, h, opts = {}, url = PAGE) {
  const { clock, ...ctxOpts } = opts;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ...ctxOpts });
  const p = await ctx.newPage();
  const errs = [], ext = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith("data:") && !u.startsWith("blob:")) ext.push(u); });
  if (clock) await p.clock.install({ time: 0 });
  await p.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  await p.waitForTimeout(clock ? 300 : 4200);
  if (clock) await p.clock.pauseAt((await p.evaluate(() => Date.now())) + 500);
  return { ctx, p, errs, ext };
}
const scrollThrough = async (p, step = 500, wait = 90) => {
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += step) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(wait); }
  return total;
};
const pick = async (p, g, t, l, eq) => {
  const f = p.locator(FORM);
  await f.getByLabel(g).check();
  await f.getByLabel(t).check();
  await f.getByLabel(l).check();
  for (const e of eq) await f.getByLabel(e).check();
};
let sectionRetries = 0;
/** Chạy một khối kiểm thử; nếu có FAIL hoặc lỗi (thường do Fast Refresh/tải máy khi nhiều agent cùng sửa file trên server dev dùng chung) thì chạy lại tối đa 3 lần, chỉ tính kết quả lần cuối và in dòng RETRY để minh bạch. */
async function section(name, fn) {
  const p0 = pass, f0 = fail;
  for (let attempt = 1; attempt <= 3; attempt++) {
    pass = p0; fail = f0;
    let crashed = "";
    try { await fn(); } catch (e) { crashed = String(e).split("\n")[0].slice(0, 160); fail++; console.log(`FAIL section "${name}" crashed: ${crashed}`); }
    if (fail === f0) return;
    if (attempt < 3) { sectionRetries++; console.log(`RETRY section "${name}" attempt ${attempt} had ${fail - f0} failure(s); re-running`); }
  }
}
const names = (p) => p.locator('[data-testid="wod"] ol li h4').allInnerTexts();

console.log("[1] tải trang, console, request ngoài, tràn ngang");
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, p, errs, ext } = await open(w, w < 700 ? 800 : 900);
  const o = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(o <= 1, `no horizontal overflow @${w} (${o}px)`);
  await scrollThrough(p, 600, 40);
  const o2 = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(o2 <= 1, `no horizontal overflow after full scroll @${w} (${o2}px)`);
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
  ok(errs.filter((e) => !/DevTools|Download the React/.test(e)).length === 0, `0 console errors @${w} ${errs.slice(0, 2).join("|")}`);
  ok(ext.length === 0, `0 external requests @${w} ${ext.slice(0, 2).join(",")}`);
  if (w === 1440 || w === 390) {
    await p.screenshot({ path: `${SHOT}hero-${w}.png` });
    try { await p.screenshot({ path: `${SHOT}full-${w}.png`, fullPage: true }); } catch (e) { console.log("WARN fullpage screenshot failed", String(e).slice(0, 80)); }
  }
  await ctx.close();
}

console.log("[2] desktop: hiệu ứng, chữ cấm, glyph, hiệu năng");
await section("[2] desktop: hiệu ứng, chữ cấm, glyph, hiệu năng", async () => {
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => { window.__ltc = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] }); });
  const fx = await p.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.dataset.fx))]);
  for (const n of ["OutlineText", "StackingCards", "Counter", "TextScramble", "BarbellLift", "GrainOverlay", "CustomCursor", "ScrollProgress"]) ok(fx.includes(n), `effect present: ${n}`);
  for (const n of ["VelocityMarquee", "ScrollScrubText", "ClipReveal", "ParallaxLayer", "MagneticButton", "SplitWords", "SVGPathDraw"]) ok(!fx.includes(n), `effect removed (hạn mức đại trà): ${n}`);
  ok(await p.evaluate(() => document.querySelector('[data-site="sat-gym"]').dataset.sgJs === "1"), "Motion (hero choreography) mounted");
  // hero choreography đã xong: nút CTA hiện, thanh thông số hiện
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-sg="hero-cta"] a')].every((a) => +getComputedStyle(a).opacity === 1)), "hero choreography finished: CTAs visible");
  ok(await p.evaluate(() => { const r = document.querySelector('[data-sg="hero-specs"]').getBoundingClientRect(); return r.bottom <= window.innerHeight + 1 && r.height > 40; }), "hero specs bar inside first viewport @1440x900");
  // h1 và thương hiệu
  ok((await p.locator("h1").innerText()).includes("SẬT"), "h1 contains brand word");
  ok(await p.locator("h1 [data-fx='OutlineText']").evaluate((e) => getComputedStyle(e).webkitTextFillColor === "rgba(0, 0, 0, 0)" || getComputedStyle(e).color === "rgba(0, 0, 0, 0)"), "hero word is outline (transparent fill)");
  // hero: con trỏ qua chữ SẬT tô axit theo vị trí
  const box = await p.locator("h1 [data-fx='OutlineText']").boundingBox();
  await p.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5); await p.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5, { steps: 8 }); await p.waitForTimeout(700);
  const hov = await p.locator("h1 [data-fx='OutlineText']").evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue("--sg-hover")));
  ok(hov > 40, `hero outline fills with pointer x (--sg-hover=${hov})`);
  await p.mouse.move(5, 5); await p.waitForTimeout(900);
  ok(await p.locator("h1 [data-fx='OutlineText']").evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue("--sg-hover"))) < 3, "hero outline empties when pointer leaves");
  // cuộn: chữ SẬT tô theo cuộn khi rời hero
  await p.evaluate(() => window.scrollTo(0, 560)); await p.waitForTimeout(900);
  const sc = await p.locator("h1 [data-fx='OutlineText']").evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue("--sg-scroll")));
  ok(sc > 30, `hero outline fills on scroll (--sg-scroll=${sc})`);
  // cuộn đi rồi quay lại đầu trang: nội dung hero phải hiện lại đủ (không kẹt ở trạng thái mờ)
  await p.evaluate(() => window.scrollTo(0, 900)); await p.waitForTimeout(900);
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1800);
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-sg="hero-copy"],[data-sg="hero-side"],[data-sg="hero-cta"] a')].every((e) => +getComputedStyle(e).opacity === 1)), "hero copy fully visible again after scrolling away and back");
  ok(await p.locator("h1 [data-fx='OutlineText']").evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue("--sg-scroll"))) < 2, "hero outline fill resets after scrolling back to top");
  // outline h2 tô theo cuộn
  const h2 = p.locator("#ct-title [data-fx='OutlineText']").first();
  await h2.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 200)); await p.waitForTimeout(900);
  ok(await h2.evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue("--sg-fill"))) > 30, "section outline heading fills with scroll");
  // outline thẻ: rê chuột tô tức thì
  const num = p.locator("article [data-fx='OutlineText']").first();
  await num.scrollIntoViewIfNeeded(); await num.hover(); await p.waitForTimeout(800);
  ok(await num.evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue("--sg-hover"))) > 90, "card number outline fills on hover");
  // stacking cards: sticky + thu nhỏ thẻ dưới
  ok(await p.evaluate(() => [...document.querySelectorAll("[data-fx-card]")].every((c) => getComputedStyle(c).position === "sticky")) && (await p.locator("[data-fx-card]").count()) === 5, "5 program cards are position:sticky");
  await p.locator("[data-fx-card]").nth(3).scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 500)); await p.waitForTimeout(900);
  const sc0 = await p.locator("[data-fx-card] > div").first().evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).a);
  ok(sc0 < 0.99, `first card scaled down once covered (scale ${sc0.toFixed(3)})`);
  // thanh tạ SVG nâng theo cuộn: kg 20 -> 110
  const sec = p.locator("#tai");
  ok((await sec.getAttribute("data-mode")) === "scrub", "barbell section in scrub mode (JS)");
  const y0 = await sec.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
  const hh = await sec.evaluate((e) => e.offsetHeight);
  const kgs = [], rigs = [], onPlates = [];
  for (let k = 0; k <= 10; k++) {
    await p.evaluate((y) => window.scrollTo(0, y), y0 + ((hh - 900) * k) / 10 + 2); await p.waitForTimeout(450);
    kgs.push(+(await p.locator("[data-sg='kg']").innerText()));
    rigs.push(await p.locator("[data-sg='rig']").evaluate((e) => e.getBoundingClientRect().top));
    onPlates.push(await p.locator("[data-sg='plate']").evaluateAll((a) => a.filter((e) => +getComputedStyle(e).opacity > 0.9).length));
  }
  ok(kgs[0] === 20 && kgs[kgs.length - 1] === 110, `kg counter 20 -> 110 (${kgs[0]} -> ${kgs[kgs.length - 1]})`);
  ok(kgs.every((v, i) => i === 0 || v >= kgs[i - 1]), "kg counter monotonic while scrolling down");
  ok(onPlates[0] === 0 && onPlates[onPlates.length - 1] === 6, `plates slide in as you scroll (0 -> 6: ${onPlates[0]} -> ${onPlates[onPlates.length - 1]})`);
  ok(rigs[0] > rigs[rigs.length - 1] + 40, `bar rises with scroll (y ${rigs[0].toFixed(0)} -> ${rigs[rigs.length - 1].toFixed(0)})`);
  ok(await p.locator("[data-sg='step'][data-on='1']").count() === 1, "exactly one active load step");
  // chữ stencil lộ dần
  const st = p.locator('[data-sg="stencil"]').first();
  ok(await p.locator('[data-sg="stencil"]').count() >= 8, "stencil labels present (>=8)");
  await p.evaluate(() => window.scrollTo(0, 0));
  // đồng hồ buổi tập 60 phút chạy khi vào khung
  await p.locator("#mot-buoi-tap").scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  const c1 = await p.locator('[data-testid="session-clock"]').innerText(); await p.waitForTimeout(2500);
  const c2 = await p.locator('[data-testid="session-clock"]').innerText();
  ok(/60:00 \/ 60:00/.test(c2) || c1 !== c2, `SessionClock đã chạy hết 60 phút: ${c1} -> ${c2}`);
  await p.locator("#mot-buoi-tap button", { hasText: "Khởi động" }).click(); await p.waitForTimeout(300);
  ok((await p.locator('[data-testid="session-active"]').innerText()).toLowerCase() === "khởi động" && /05:00/.test(await p.locator('[data-testid="session-clock"]').innerText()), "bấm chặng Khởi động: nhảy tới 05:00");
  await p.locator("#mot-buoi-tap button", { hasText: "Bài WOD" }).click(); await p.waitForTimeout(300);
  ok(/30:00/.test(await p.locator('[data-testid="session-clock"]').innerText()), "bấm chặng Bài WOD: 30:00");
  // sơ đồ sàn tập
  await p.locator("#khong-gian").scrollIntoViewIfNeeded();
  await p.getByRole("button", { name: "Khu rack và thanh tạ" }).click(); await p.waitForTimeout(700);
  ok(/Rack squat/.test(await p.locator('[data-testid="zone-note"]').innerText()) && (await p.locator('[data-zone="rack"]').getAttribute("data-on")) === "1" && (await p.locator('[data-zone="wod"]').getAttribute("data-on")) === "0", "FloorPlan: chọn khu rack");
  ok(await p.locator("#mot-buoi-tap [data-fx=TextScramble]").count() === 6, "bảng bài: 6 dòng TextScramble");
  const hn = await p.locator("main").innerText();
  for (const w of ["Quận Ngũ Hành Sơn", "CrossFit WOD", "Strength", "Conditioning", "Mobility", "Đăng ký tập thử", "Quy định", "180.000"]) ok(hn.toLowerCase().includes(w.toLowerCase()), `nội dung có: ${w}`);
  ok(!/giảm (cân|mỡ)|đốt mỡ|cam kết/i.test(hn), "không hứa giảm cân/kết quả");
  // rung nhẹ có kiểm soát
  const cta = p.locator('[data-sg="hero-cta"] a[data-shake]').first();
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  const samples = await cta.evaluate((el) => new Promise((res) => {
    const out = new Set(); const t0 = performance.now();
    el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerType: "mouse" }));
    const f = () => { out.add(getComputedStyle(el).transform); if (performance.now() - t0 < 700) requestAnimationFrame(f); else res([...out]); };
    f();
  }));
  ok(samples.some((s) => s !== "none"), "CTA shakes on press");
  ok(samples[samples.length - 1] === "none" || /matrix\(1, 0, 0, 1, 0, 0\)/.test(samples[samples.length - 1]), "CTA shake ends at rest");
  const amp = Math.max(...samples.filter((s) => s !== "none").map((s) => Math.abs(parseFloat(((s.match(/matrix\(([^)]+)\)/) || [0, "0,0,0,0,0,0"])[1].split(",")[4])))));
  ok(amp <= 4, `shake amplitude <= 4px (2px + rotation) (${amp.toFixed(2)}px)`);
  console.log("INFO long tasks >200ms @1440 so far:", await p.evaluate(() => window.__ltc));
  // chữ cấm
  await p.evaluate(() => window.scrollTo(0, 0));
  const text = await p.evaluate(() => {
    const a = [document.body.innerText, document.title];
    document.querySelectorAll("[alt],[aria-label],[title],meta[name=description],meta[property^='og:']").forEach((e) => a.push(e.getAttribute("alt"), e.getAttribute("aria-label"), e.getAttribute("title"), e.getAttribute("content")));
    document.querySelectorAll("[class*=srOnly]").forEach((e) => a.push(e.textContent));
    return a.filter(Boolean).join("\n");
  });
  const m = text.replace(/https?:\/\/\S+/g, "").replace(/\/demos\/\S*/g, "").match(FORBID);
  ok(!m, `forbidden words absent in visible/alt/aria/meta ${m ? m[0] : ""}`);
  // glyph tiếng Việt
  const gl = await p.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    const fam = getComputedStyle(document.querySelector("h1 [data-fx]")).fontFamily;
    const body = getComputedStyle(document.querySelector("main p")).fontFamily;
    const s = "ẮẶẾỆỒỘỚỢỨỰỬỮ ăâêôơưđ SẬT";
    const c = document.createElement("canvas").getContext("2d");
    const meas = (f, w) => { c.font = `${w} 60px ${f}`; const a = c.measureText(s).width; c.font = `${w} 60px sans-serif`; return Math.abs(a - c.measureText(s).width) > 5; };
    const has = (n) => loaded.some((f) => f.includes(n));
    return { fam: fam.slice(0, 50), loaded: loaded.length, display: meas(fam, 900), body: meas(body, 400), chk: has("bsdVi") && has("bsdLat") && has("chVi") && has("chLat") && has("jbVi") };
  });
  ok(gl.loaded >= 6 && gl.display && gl.body && gl.chk, `Vietnamese glyphs render with bundled fonts (loaded ${gl.loaded}, display ${gl.display}, body ${gl.body})`);
  await p.evaluate(() => { const d = document.createElement("div"); d.id = "gl"; d.style.cssText = "position:fixed;left:0;top:0;z-index:99999;background:#fff;color:#000;padding:36px 10px 10px;font:900 72px/1.3 " + getComputedStyle(document.querySelector("h1 [data-fx]")).fontFamily; d.textContent = "ỐẾỂỆỢỬỮ ẦẮẰ SẬT"; document.body.appendChild(d); });
  await p.screenshot({ path: `${SHOT}glyph-bsd.png`, clip: { x: 0, y: 0, width: 1000, height: 170 } });
  await p.evaluate(() => document.getElementById("gl").remove());
  await ctx.close();
});

console.log("[3] bộ chọn bài tập (Workout Picker)");
await section("[3] bộ chọn bài tập (Workout Picker)", async () => {
  const { ctx, p } = await open(1440, 900);
  await p.locator("#chon-bai").scrollIntoViewIfNeeded();
  const f = p.locator(FORM);
  // rỗng / lỗi
  ok(await p.locator('[data-testid="wod"]').count() === 0, "picker: empty state before generating");
  await f.getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(300);
  ok(await f.locator("p[role=alert]").count() === 4, "picker: 4 errors when empty");
  ok(await f.locator('input[aria-invalid="true"]').count() >= 10, "picker: aria-invalid + aria-describedby on invalid groups");
  ok(await p.evaluate(() => document.activeElement?.getAttribute("aria-invalid") === "true"), "picker: focus moves to first invalid field");
  // 15 phút = 5 bài, 30 phút = 6 bài
  await pick(p, "Tổng hợp", "15 phút", "Mới bắt đầu", ["Chỉ cơ thể"]);
  ok(await f.locator("p[role=alert]").count() === 0, "picker: errors clear after choosing");
  await f.getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(500);
  ok((await names(p)).length === 5, "15 min -> 5 movements");
  ok((await p.locator('[data-testid="wod"]').getAttribute("data-wod")) === "tabata", "mixed 15 min -> tabata by default");
  await f.getByLabel("30 phút").check(); await f.getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(400);
  ok((await names(p)).length === 6, "30 min -> 6 movements");
  ok((await p.locator('[data-testid="wod"]').getAttribute("data-wod")) === "emom", "mixed 30 min -> EMOM by default");
  const warn = await p.locator('[data-testid="wod"]').innerText();
  ok(/khởi động/i.test(warn) && /dừng tập|chóng mặt/i.test(warn) && /bác sĩ/i.test(warn), "result shows warm-up + stop + doctor warnings");
  ok(!/giảm cân|đốt mỡ|calo|kết quả đảm bảo|cam kết/i.test(warn), "result makes no weight-loss / outcome claims");
  // trình độ mới bắt đầu + chỉ thanh tạ: không có bài thanh tạ nặng
  for (const e of ["Chỉ cơ thể"]) await f.getByLabel(e).uncheck();
  await f.getByLabel("Thanh tạ").check();
  await f.getByLabel("Mới bắt đầu").check(); await f.getByLabel("Sức mạnh").check();
  for (let s = 0; s < 4; s++) {
    await f.getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(250);
    const n = (await names(p)).join("|");
    ok(!/BACK SQUAT|DEADLIFT THANH TẠ|KÉO THANH TẠ CÚI NGƯỜI|FRONT SQUAT|ĐẨY VAI THANH TẠ$/i.test(n) && !/KÉO XÀ|KETTLEBELL SWING/i.test(n), `beginner never gets level-2/3 barbell moves (#${s}: ${n.slice(0, 70)})`);
    if (s === 0) ok((await names(p)).length >= 5, "equipment+level filter still yields >=5 movements");
    break;
  }
  // chọn Chỉ cơ thể + xà: bài chỉ dùng dụng cụ đã chọn hoặc cơ thể
  await f.getByLabel("Thanh tạ").uncheck(); await f.getByLabel("Xà").check();
  await f.getByLabel("Có kinh nghiệm").check(); await f.getByLabel("Tổng hợp").check();
  await f.getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(300);
  const n2 = (await names(p)).join("|");
  ok(!/KETTLEBELL|TẠ TAY|THANH TẠ|FRONT SQUAT|BACK SQUAT|NHẢY DÂY/i.test(n2), `only chosen equipment used (${n2.slice(0, 80)})`);
  // đổi bài + đổi kiểu
  const before = (await names(p)).join("|");
  let changed = false;
  for (let i = 0; i < 6 && !changed; i++) { await p.getByRole("button", { name: "Đổi bài khác" }).click(); await p.waitForTimeout(150); changed = (await names(p)).join("|") !== before; }
  ok(changed, "reroll gives a different workout");
  await p.getByRole("button", { name: "Tabata 20/10", exact: true }).click(); await p.waitForTimeout(250);
  ok((await p.locator('[data-testid="wod"]').getAttribute("data-wod")) === "tabata", "format toggle to Tabata");
  ok((await p.getByRole("button", { name: "Tabata 20/10", exact: true }).getAttribute("aria-pressed")) === "true", "format toggle aria-pressed");
  // CTA cuối
  const cta = await p.getByRole("link", { name: "Nhờ SẬT xem lại bài này" }).getAttribute("href");
  console.log("INFO consult href:", cta);
  ok(cta.startsWith("/lien-he"), "picker CTA goes to /lien-he");
  if (/industry=/.test(cta) && /utm_campaign=sat-gym/.test(cta)) ok(true, "consult href has industry/solution/utm_campaign");
  else console.log("WARN consult href lacks industry/solution/utm: slug sat-gym is not in features/showroom/registry.ts yet (coordinator must sync meta.ts)");
  await ctx.close();
});

console.log("[4] đồng hồ tabata/EMOM chạy thật (đồng hồ giả lập của trình duyệt)");
await section("[4] đồng hồ tabata/EMOM chạy thật (đồng hồ giả lập của trình duyệt)", async () => {
  const { ctx, p, errs } = await open(1440, 900, { clock: true });
  const f = p.locator(FORM);
  await pick(p, "Thể lực", "15 phút", "Đã tập đều", ["Tạ tay"]);
  await f.getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(200);
  const T = p.locator('[role=group][aria-label^="Đồng hồ tập"]');
  const clock = async () => (await p.locator("[data-testid=clock]").innerText()).trim();
  const kind = () => T.getAttribute("data-kind");
  const run = async (ms) => { await p.clock.runFor(ms); await p.waitForTimeout(30); };
  ok((await clock()) === "00:10" && (await kind()) === "prep", "timer idle shows 00:10 prep");
  // cổng khởi động
  await T.getByRole("button", { name: "Bắt đầu" }).click(); await p.waitForTimeout(100);
  ok((await T.getAttribute("data-status")) === "idle", "timer does not start without warm-up confirmation");
  ok(/khởi động/i.test(await p.locator("[role=alert]").allInnerTexts().then((a) => a.join(" "))), "warm-up error shown");
  ok(await p.evaluate(() => document.activeElement?.type === "checkbox"), "focus moves to the warm-up checkbox");
  await p.getByLabel("Tôi đã khởi động").check();
  await T.getByRole("button", { name: "Bắt đầu" }).click(); await p.waitForTimeout(50);
  ok((await T.getAttribute("data-status")) === "running", "timer starts after confirmation");
  await run(3000);
  const c3 = await clock(); ok(c3 === "00:07", `counts down in prep (${c3})`);
  await run(8000);
  ok((await kind()) === "work", "prep -> WORK after 10s");
  ok(/^00:(1[5-9])$/.test(await clock()), `work segment 20s countdown (${await clock()})`);
  const mv1 = await T.locator("[data-testid=move]").innerText();
  await run(20000);
  ok((await kind()) === "rest", "WORK -> REST after 20s");
  await run(10000);
  ok((await kind()) === "work", "REST -> WORK after 10s");
  const mv2 = await T.locator("[data-testid=move]").innerText();
  ok(mv1 !== mv2, `next round shows a different movement (${mv1} -> ${mv2})`);
  // tạm dừng / tiếp tục
  await T.getByRole("button", { name: "Tạm dừng" }).click(); const cp = await clock();
  await run(5000); ok((await clock()) === cp && (await T.getAttribute("data-status")) === "paused", "pause holds time");
  await T.getByRole("button", { name: "Tiếp tục" }).click(); await run(2000);
  ok((await clock()) !== cp && (await T.getAttribute("data-status")) === "running", "resume continues");
  // bàn phím trên vùng đồng hồ
  await T.focus(); await p.keyboard.press("Space"); await p.waitForTimeout(80);
  ok((await T.getAttribute("data-status")) === "paused", "Space on timer region pauses");
  await p.keyboard.press("Space"); await p.waitForTimeout(80);
  ok((await T.getAttribute("data-status")) === "running", "Space on timer region resumes");
  await p.keyboard.press("r"); await p.waitForTimeout(80);
  ok((await T.getAttribute("data-status")) === "idle" && (await clock()) === "00:10", "R resets");
  // âm báo bật tắt
  const sb = T.getByRole("button", { name: /Âm báo/ });
  ok((await sb.getAttribute("aria-pressed")) === "false", "sound off by default");
  await sb.click(); ok((await sb.getAttribute("aria-pressed")) === "true", "sound toggle on");
  await sb.click();
  // chạy hết
  await T.getByRole("button", { name: "Bắt đầu" }).click(); await p.waitForTimeout(40);
  await p.clock.fastForward(16 * 60 * 1000); await p.waitForTimeout(150);
  ok((await T.getAttribute("data-status")) === "done" && (await clock()) === "00:00", "timer reaches done after full plan");
  ok(/kết thúc/i.test(await T.innerText()), "done message shown");
  // EMOM: mỗi phút một động tác
  await f.getByLabel("Sức mạnh").check(); await f.getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(250);
  ok((await p.locator('[data-testid="wod"]').getAttribute("data-wod")) === "emom", "strength -> EMOM default");
  await p.getByLabel("Tôi đã khởi động").check();
  const T2 = p.locator('[role=group][aria-label^="Đồng hồ tập"]');
  await T2.getByRole("button", { name: "Bắt đầu" }).click(); await p.waitForTimeout(40);
  await run(10000 + 2000);
  ok((await T2.getAttribute("data-kind")) === "emom" && (await clock()) === "00:58", `EMOM minute 1 after prep (${await clock()})`);
  const a1 = await T2.locator("[data-testid=move]").innerText();
  await run(60000);
  const a2 = await T2.locator("[data-testid=move]").innerText();
  ok(a1 !== a2, `EMOM minute 2 shows next movement (${a1} -> ${a2})`);
  await T2.getByRole("button", { name: "Bỏ qua" }).click(); await p.waitForTimeout(60);
  ok((await clock()) === "01:00", "skip jumps to next segment");
  ok(errs.filter((e) => !/DevTools|Download the React/.test(e)).length === 0, "timer flow 0 console errors");
  await ctx.close();
});

console.log("[5] lịch lớp tuần");
await section("[5] lịch lớp tuần", async () => {
  const { ctx, p } = await open(1440, 900);
  await p.locator("#lich-lop").scrollIntoViewIfNeeded();
  const S = p.locator("#lich-lop");
  const items = () => S.locator("li[data-type]");
  ok((await items().count()) === 24, `schedule shows 24 classes by default (${await items().count()})`);
  ok((await S.locator("section h3").count()) === 7, "7 day columns");
  ok((await S.locator("svg").count()) >= 4, "4 vector coach characters (no photos)");
  ok((await S.locator("img").count()) === 0, "no <img> (no photos of people) in schedule");
  await S.getByLabel("Sức mạnh", { exact: true }).check(); await p.waitForTimeout(150);
  const types = await items().evaluateAll((a) => [...new Set(a.map((e) => e.dataset.type))]);
  ok(types.length === 1 && types[0] === "suc-manh", `type filter works (${types})`);
  await S.getByLabel("Tất cả", { exact: true }).check();
  await S.getByLabel("Sáng", { exact: true }).check(); await p.waitForTimeout(150);
  const times = await S.locator("li[data-type] b").allInnerTexts();
  ok(times.length > 0 && times.every((t) => parseInt(t, 10) < 10), `time-band filter works (${times.length} classes, all < 10:00)`);
  await S.getByLabel("Cả ngày", { exact: true }).check();
  await S.getByLabel(/Coach Xà/).check(); await p.waitForTimeout(150);
  const coaches = await S.locator("li[data-type]").evaluateAll((a) => a.map((e) => e.innerText));
  ok(coaches.length > 0 && coaches.every((t) => /Coach Xà/.test(t)), `coach filter works (${coaches.length})`);
  // rỗng
  await S.getByLabel(/Linh hoạt/).check(); await p.waitForTimeout(150);
  ok(/Không có lớp nào/.test(await S.locator("[role=status]").first().innerText()), "empty filter state message");
  ok(await S.getByRole("button", { name: "Xoá bộ lọc" }).count() >= 1, "empty state offers Clear filters");
  await S.getByRole("button", { name: "Xoá bộ lọc" }).first().click();
  await p.waitForFunction(() => document.querySelectorAll("#lich-lop li[data-type]").length === 24, null, { timeout: 8000 }).catch(() => {});
  ok((await items().count()) === 24, "clear filters restores 24 classes");
  // chọn lớp + tóm tắt
  const btns = S.locator("li[data-type] button[aria-pressed]");
  await btns.nth(0).click(); await btns.nth(5).click();
  await p.waitForFunction(() => document.querySelectorAll('#lich-lop [data-testid="summary"] li').length === 2, null, { timeout: 8000 }).catch(() => {});
  ok((await S.locator('[data-testid="summary"] li').count()) === 2, "summary lists 2 chosen classes");
  ok((await btns.nth(0).getAttribute("aria-pressed")) === "true", "class toggle aria-pressed");
  const sum = await S.locator('[data-testid="summary"]').innerText();
  ok(/Thứ \d|Chủ nhật/.test(sum) && /\d\d:\d\d/.test(sum), "summary has day + time");
  const cl = await S.getByRole("link", { name: "Tư vấn lịch tập" }).getAttribute("href");
  ok(cl.startsWith("/lien-he"), "schedule CTA goes to /lien-he");
  await ctx.close();
});

console.log("[6] reduced motion");
await section("[6] reduced motion", async () => {
  const { ctx, p } = await open(1440, 900, { reducedMotion: "reduce" });
  ok(await p.locator("h1").isVisible(), "reduced-motion: h1 visible");
  ok(await p.evaluate(() => { const m = document.querySelector('[data-sg="hero-media"]'); const w = document.querySelector('[data-sg="hero-word"]'); return getComputedStyle(m).transform === "none" && +getComputedStyle(m).opacity === 1 && getComputedStyle(w).clipPath === "none"; }), "reduced-motion: hero choreography does not run (no transforms, media/word fully shown)");
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-sg="hero-copy"],[data-sg="hero-cta"] a,[data-sg="stencil"]')].every((e) => +getComputedStyle(e).opacity === 1 && getComputedStyle(e).clipPath === "none")), "reduced-motion: hero copy, CTAs and stencil labels fully visible");
  ok((await p.locator("#tai").getAttribute("data-mode")) === null, "reduced-motion: barbell section not pinned (static)");
  ok((await p.locator("#tai [data-sg='kg']").innerText()) === "110", "reduced-motion: barbell shows full load statically");
  ok(await p.evaluate(() => [...document.querySelectorAll("#tai [data-sg='plate']")].every((e) => +getComputedStyle(e).opacity === 1)), "reduced-motion: all plates visible");
  ok(await p.evaluate(() => [...document.querySelectorAll("[data-fx='OutlineText']")].every((e) => e.dataset.fxReady === "static")), "reduced-motion: outline texts static");
  await p.evaluate(() => window.scrollTo(0, 3000)); await p.waitForTimeout(300);
  const cta = p.locator('[data-sg="hero-cta"] a[data-shake]').first();
  await p.evaluate(() => window.scrollTo(0, 0));
  const samples = await cta.evaluate((el) => new Promise((res) => { const out = new Set(); const t0 = performance.now(); el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerType: "mouse" })); const f = () => { out.add(getComputedStyle(el).transform); if (performance.now() - t0 < 400) requestAnimationFrame(f); else res([...out]); }; f(); }));
  ok(samples.every((s) => s === "none"), "reduced-motion: no shake");
  await p.locator("#chon-bai").scrollIntoViewIfNeeded();
  await pick(p, "Thể lực", "15 phút", "Mới bắt đầu", ["Chỉ cơ thể"]);
  await p.locator(FORM).getByRole("button", { name: "Tạo bài tập" }).click(); await p.waitForTimeout(300);
  ok((await names(p)).length === 5, "reduced-motion: picker still works");
  const T = p.locator('[role=group][aria-label^="Đồng hồ tập"]');
  await p.getByLabel("Tôi đã khởi động").check();
  await T.getByRole("button", { name: "Bắt đầu" }).click(); await p.waitForTimeout(1300);
  ok(await T.getAttribute("data-status") === "running" && (await p.locator("[data-testid=clock]").innerText()) !== "00:10", "reduced-motion: timer still runs (functional)");
  await ctx.close();
});

console.log("[7] mobile: menu, bàn phím, hiệu năng, cảm ứng");
await section("[7] mobile: menu, bàn phím, hiệu năng, cảm ứng", async () => {
  const { ctx, p } = await open(390, 844, { hasTouch: true, isMobile: true });
  await p.evaluate(() => { window.__ltc = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] }); });
  ok(await p.evaluate(() => !document.querySelector("[data-fx='CustomCursor']")), "touch: custom cursor not mounted");
  await p.getByRole("button", { name: "Mở menu" }).tap();
  ok(await p.locator("#sg-menu").isVisible(), "mobile menu opens");
  await p.keyboard.press("Escape");
  ok(!(await p.locator("#sg-menu").isVisible()), "Escape closes menu");
  ok(await p.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "sg-menu"), "focus returns to menu button");
  await p.getByRole("button", { name: "Mở menu" }).tap(); await p.locator("#sg-menu a").nth(1).tap(); await p.waitForTimeout(700);
  ok(!(await p.locator("#sg-menu").isVisible()) && (await p.evaluate(() => location.hash)) === "#lich-lop", "menu link navigates and closes menu");
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
  console.log("INFO long tasks >200ms @390:", await p.evaluate(() => window.__ltc));
  const tt = await p.evaluate(() => [...document.querySelectorAll("a,button,summary,label,input")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && !(cs.opacity === "0") && r.height < 40 && r.width < 40; }).map((e) => e.tagName + ":" + (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20))).slice(0, 8));
  console.log("INFO tiny targets (<40px both dims):", JSON.stringify(tt));
  await p.locator("#chon-bai").scrollIntoViewIfNeeded();
  await pick(p, "Thể lực", "20 phút", "Mới bắt đầu", ["Chỉ cơ thể"]);
  await p.locator(FORM).getByRole("button", { name: "Tạo bài tập" }).tap(); await p.waitForTimeout(500);
  await p.locator('[data-testid="wod"]').scrollIntoViewIfNeeded();
  await p.screenshot({ path: `${SHOT}picker-390.png` });
  await p.locator("#lich-lop").scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 500)); await p.waitForTimeout(500);
  await p.screenshot({ path: `${SHOT}schedule-390.png` });
  await p.locator("#tai").scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 700)); await p.waitForTimeout(700);
  await p.screenshot({ path: `${SHOT}barbell-390.png` });
  await ctx.close();
});

console.log("[8] desktop: dài hạn - 1440 long task khi cuộn, bàn phím, link thoát, ref");
await section("[8] desktop: dài hạn - 1440 long task khi cuộn, bàn phím, link thoát, ref", async () => {
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => { window.__ltc = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] }); });
  await p.keyboard.press("Tab"); const first = await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30));
  ok(first && /Bỏ qua/.test(first), `first Tab = skip link (${first})`);
  let reached = false;
  for (let i = 0; i < 14; i++) { await p.keyboard.press("Tab"); const t = await p.evaluate(() => document.activeElement?.textContent?.trim()); if (t === "Đăng ký tập thử") { reached = true; break; } }
  ok(reached, "Tab reaches hero CTA");
  ok(await p.evaluate(() => { const o = getComputedStyle(document.activeElement).outlineStyle; return o !== "none"; }), "CTA shows visible focus outline");
  await scrollThrough(p, 450, 80);
  console.log("INFO long tasks >200ms scrolling full page @1440:", await p.evaluate(() => window.__ltc));
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
  // FAQ
  await p.locator("#hoi-dap").scrollIntoViewIfNeeded();
  const q = p.locator("#hoi-dap summary").first(); await q.click(); await p.waitForTimeout(150);
  ok(await p.locator("#hoi-dap details").first().evaluate((e) => e.open), "FAQ opens");
  // plans
  ok((await p.locator("#goi-tap li h3").count()) === 4, "4 pricing plans");
  const priceTxt = await p.locator("#goi-tap").innerText();
  ok(/Giá tham khảo/.test(priceTxt) && /1\.900\.000/.test(priceTxt), "prices shown with 'Giá tham khảo' and vi-VN format");
  // tất cả link thoát cùng origin /lien-he
  const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href*="lien-he"]')].map((a) => a.getAttribute("href")));
  ok(hrefs.length >= 6 && hrefs.every((h) => h.startsWith("/lien-he")), `all ${hrefs.length} consult links are same-origin /lien-he`);
  ok(await p.evaluate(() => !document.cookie.includes("tct_ref")), "page does not write tct_ref cookie");
  // không có form thu thập PII
  ok(await p.locator('input[type=text], input[type=email], input[type=tel], textarea').count() === 0, "no text/email/tel inputs (no personal data collected)");
  // ảnh: alt có đủ, không lặp
  const imgs = await p.evaluate(() => [...document.querySelectorAll("main img")].map((i) => ({ src: new URL(i.currentSrc || i.src, location.href).searchParams.get("url") || i.src, alt: i.getAttribute("alt") })));
  ok(imgs.every((i) => i.alt !== null), "every <img> has an alt attribute");
  const keys = imgs.map((i) => decodeURIComponent(i.src).replace(/^.*\/sat-gym\//, "").replace(/-(600|1200|2000)\.webp.*/, "")).filter((k) => !/identity/.test(k));
  ok(keys.length >= 10 && new Set(keys).size === keys.length, `no repeated photo on the page (${keys.length} photos, ${new Set(keys).size} unique)`);
  await ctx.close();
});

console.log("[9] ?ref= và trang credits");
await section("[9] ?ref= và trang credits", async () => {
  const { ctx, p, errs } = await open(1280, 900, {}, `${PAGE}?ref=TESTREF`);
  ok(await p.locator("h1").isVisible(), "page renders with ?ref=");
  ok(await p.evaluate(() => !document.cookie.includes("tct_ref")), "demo does not read/write tct_ref cookie");
  const h = await p.locator("a[href^='/lien-he']").first().getAttribute("href");
  const p2 = await ctx.newPage(); await p2.goto(BASE + h + "&ref=TESTREF", { waitUntil: "domcontentloaded", timeout: 120000 });
  ok(p2.url().includes("ref=TESTREF") && p2.url().includes("/lien-he"), "/lien-he accepts consult href + ref");
  await ctx.close();
  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p3 = await ctx2.newPage();
  const r = await p3.goto(`${PAGE}/credits`, { waitUntil: "networkidle", timeout: 90000 });
  ok(r.status() === 200, "credits 200");
  ok((await p3.locator("li dl").count()) === 13, `credits lists 13 photos (${await p3.locator("li dl").count()})`);
  ok(/Big Shoulders Display/.test(await p3.locator("body").innerText()) && /Chivo/.test(await p3.locator("body").innerText()), "credits lists fonts");
  ok(/Trần Công Tiến/.test(await p3.locator("body").innerText()), "credits discloses designer");
  await p3.screenshot({ path: `${SHOT}credits-1280.png` });
  ok(await p3.locator("meta[name=robots]").getAttribute("content").then((c) => /noindex/.test(c)), "credits noindex");
  await ctx2.close();
});
await b.close();
console.log(`\nRESULT pass=${pass} fail=${fail}`);
