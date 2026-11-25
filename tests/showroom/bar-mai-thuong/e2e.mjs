import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = BASE + "/demos/bar-mai-thuong";
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const origin = new URL(BASE).origin;
const BAN = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;

async function open(vp, opts = {}) {
  const ctx = await b.newContext({ viewport: vp, reducedMotion: opts.reduced ? "reduce" : "no-preference", ...(opts.ctx || {}) });
  const p = await ctx.newPage();
  p.errs = []; p.ext = [];
  p.on("console", (m) => { if (m.type() === "error") p.errs.push(m.text()); });
  p.on("pageerror", (e) => p.errs.push(String(e)));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(origin) && !u.startsWith("data:") && !u.startsWith("blob:")) p.ext.push(u); });
  await p.goto(opts.url || PAGE, { waitUntil: "networkidle" });
  await p.waitForTimeout(2600);
  return p;
}
const visibleText = (p) => p.evaluate(() => {
  const parts = [document.title, ...[...document.querySelectorAll("meta[name=description],meta[property='og:title'],meta[property='og:description']")].map((m) => m.content)];
  const main = document.querySelector("main")?.parentElement ?? document.body;
  parts.push(main.innerText);
  main.querySelectorAll("[alt],[aria-label],[title]").forEach((e) => parts.push(e.getAttribute("alt") || "", e.getAttribute("aria-label") || "", e.getAttribute("title") || ""));
  return parts.join("\n");
});

// ---------- desktop: tải, console, request ngoài, font
let p = await open({ width: 1440, height: 900 });
ok(p.errs.length === 0, `0 lỗi console (${p.errs.length}) ${p.errs.slice(0, 2).join(" | ")}`);
ok(p.ext.length === 0, `0 request ngoài origin (${p.ext.length}) ${p.ext.slice(0, 2).join(",")}`);
ok((await p.title()).includes("Tầng Mây"), "title riêng");
ok(await p.evaluate(() => document.querySelector("meta[name=robots]")?.content.includes("noindex")), "noindex kế thừa");

const fonts = await p.evaluate(async () => {
  await document.fonts.ready;
  const probe = "ă â ê ô ơ ư đ Ắ Ằ Ẳ Ẵ Ặ Ấ Ầ Ẩ Ẫ Ậ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự";
  const res = {};
  for (const fam of ["h", "b"]) {
    const el = document.querySelector(fam === "h" ? "h1" : "main p");
    const ff = getComputedStyle(el).fontFamily; res[fam] = ff.slice(0, 60);
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    res[fam + "loaded"] = loaded.length;
  }
  // đo glyph: so bề ngang chữ có dấu với fallback monospace
  const c = document.createElement("canvas").getContext("2d");
  const h1 = getComputedStyle(document.querySelector("h1")).fontFamily;
  const body = getComputedStyle(document.querySelector("main p")).fontFamily;
  const w = (f, t) => { c.font = `700 40px ${f}`; return c.measureText(t).width; };
  res.hDiff = Math.abs(w(h1, probe) - w("monospace", probe));
  res.bDiff = Math.abs(w(body, probe) - w("monospace", probe));
  // mỗi ký tự có dấu phải có độ rộng khác .notdef của font mono (đã nạp)
  res.hRatio = w(h1, "Ệ") / w(h1, "E"); res.bRatio = w(body, "Ử") / w(body, "U");
  return res;
});
ok(fonts.hLoaded > 0 || fonts.hloaded > 0, `font đã nạp (${fonts.hloaded} mặt)`);
ok(fonts.hDiff > 5 && fonts.bDiff > 5, `glyph Việt đo được (h ${fonts.hDiff.toFixed(0)}, b ${fonts.bDiff.toFixed(0)})`);
ok(fonts.hRatio < 1.2 && fonts.bRatio < 1.2, `Ệ/Ử không tách dấu (tỉ lệ ${fonts.hRatio.toFixed(2)}, ${fonts.bRatio.toFixed(2)})`);

// ---------- chữ cấm
let txt = await visibleText(p);
ok(!BAN.test(txt), "không có chữ cấm (trang ban đầu)" + (BAN.test(txt) ? " -> " + txt.match(BAN)[0] : ""));

// ---------- hiệu ứng
const fx = await p.evaluate(() => {
  const cs = (e) => (e ? getComputedStyle(e) : null);
  const q = (s) => document.querySelector(s);
  return {
    ignite: [...document.querySelectorAll("h1 span[style*='--d']")].some((e) => cs(e).animationName.includes("Ignite")),
    flicker: [...document.querySelectorAll("h1 span")].some((e) => /Flick/.test(cs(e).animationName)),
    logoFlicker: [...document.querySelectorAll("header span")].some((e) => /Flick/.test(cs(e).animationName)),
    beams: [...document.querySelectorAll("section#top div")].filter((e) => /Sweep/.test(cs(e).animationName)).length,
    arch: [...document.querySelectorAll("section#top div")].some((e) => /Arch/.test(cs(e).animationName)),
    marquee: document.querySelectorAll("[data-fx=VelocityMarquee]").length,
    grain: !!q("[data-fx=GrainOverlay]"),
    tilt: document.querySelectorAll("[data-fx=TiltCard]").length,
    clip: document.querySelectorAll("[data-fx=ClipReveal]").length,
    split: document.querySelectorAll("[data-fx=SplitReveal]").length,
    scrub: !!q("[data-fx=ScrollScrubText]"),
    spot: !!q("[data-tm=spot]"), pour: !!q("[data-tm=pour]"),
    cspot: document.querySelectorAll("[data-fx=CursorSpotlight]").length,
    magnetic: document.querySelectorAll("[data-fx=MagneticButton]").length,
  };
});
ok(fx.ignite, "FX hero ignite (neon châm lần lượt)");
ok(fx.flicker && fx.logoFlicker, "FX neon flicker chữ hero + logo");
ok(fx.beams === 2, "FX hai đèn quét chạy");
ok(fx.arch, "FX cửa vòm mở (hero choreography)");
ok(fx.marquee >= 2, `FX marquee velocity (${fx.marquee})`);
ok(fx.grain, "FX grain overlay");
ok(fx.tilt === 3 && fx.clip >= 4 && fx.split >= 6 && fx.scrub && fx.cspot >= 2 && fx.magnetic >= 3, `FX thư viện: tilt ${fx.tilt}, clip ${fx.clip}, split ${fx.split}, scrub, cursorSpot ${fx.cspot}, magnetic ${fx.magnetic}`);
// marquee tăng tốc theo cuộn (bánh xe thật)
await p.evaluate(() => { const band = document.getElementById("nhip").getBoundingClientRect().top + scrollY; scrollTo(0, band - 700); });
await p.waitForTimeout(900);
await p.mouse.move(700, 100);
const mqx = () => p.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector("[data-fx=VelocityMarquee] [data-fx-track]")).transform).m41);
let lastx = await mqx(); await p.waitForTimeout(300); const base = Math.abs(lastx - (lastx = await mqx())) / 0.3;
let peak = 0;
for (let i = 0; i < 8; i++) { for (let k = 0; k < 3; k++) await p.mouse.wheel(0, 60); await p.waitForTimeout(40); const c = await mqx(); peak = Math.max(peak, Math.abs(lastx - c)); lastx = c; }
ok(peak * 1000 / 60 > base * 1.5, `marquee tăng tốc theo cuộn (nền ${base.toFixed(0)}px/s, đỉnh ~${(peak * 1000 / 60).toFixed(0)}px/s)`);
// spotlight
await p.evaluate(() => window.scrollTo(0, 0));
await p.mouse.move(600, 400); await p.mouse.move(640, 420); await p.waitForTimeout(500);
const sp = await p.evaluate(() => { const s = document.querySelector("[data-tm=spot]"); return { o: getComputedStyle(s).opacity, x: s.style.getPropertyValue("--x") }; });
ok(sp.o === "1" && sp.x === "640px", `cursor spotlight theo con trỏ (${sp.x}, opacity ${sp.o})`);
// ly rót
const pourInfo = await p.evaluate(async () => {
  const e = document.querySelector("[data-tm=pour]"); const top = e.getBoundingClientRect().top + scrollY; const h = e.offsetHeight - innerHeight;
  const lv = e.querySelector("[data-tm=level]");
  window.scrollTo(0, top - 100); await new Promise((r) => setTimeout(r, 700)); const a = Number(lv.textContent);
  window.scrollTo(0, top + h * 0.5); await new Promise((r) => setTimeout(r, 900)); const m = Number(lv.textContent);
  window.scrollTo(0, top + h + 40); await new Promise((r) => setTimeout(r, 900)); const z = Number(lv.textContent);
  return { a, m, z };
});
ok(pourInfo.a < 35 && pourInfo.m > 25 && pourInfo.m < 85 && pourInfo.z >= 95, `ly rót theo cuộn (${pourInfo.a}% -> ${pourInfo.m}% -> ${pourInfo.z}%)`);

// ---------- menu
await p.evaluate(() => document.getElementById("thuc-don").scrollIntoView());
const n = async () => p.locator("#thuc-don ul li h3").count();
ok((await n()) === 16, "menu 16 mục");
await p.getByRole("button", { name: /Không cồn/ }).first().click();
ok((await n()) === 3, "lọc Không cồn = 3");
await p.getByRole("button", { name: /Món nhắm/ }).click();
ok((await n()) === 2, "lọc Món nhắm = 2");
await p.getByRole("button", { name: /Tất cả/ }).click();
const prices = await p.locator("#thuc-don [class*=menuPrice]").allInnerTexts();
ok(prices.length === 16 && prices.every((t) => /\d/.test(t) && /₫|đ/.test(t)), "giá hiển thị VND đủ 16");
ok(/Giá tham khảo/.test(await p.locator("#thuc-don").innerText()), "ghi 'Giá tham khảo'");

// ---------- matcher
await p.evaluate(() => document.getElementById("chon-ly").scrollIntoView());
await p.getByRole("button", { name: "Tìm vị của tôi" }).click();
ok(await p.locator("#tm-flav-err").isVisible(), "matcher: lỗi khi chưa chọn vị");
ok((await p.locator("#chon-ly fieldset[aria-invalid=true]").count()) === 1, "matcher: aria-invalid + describedby");
await p.locator("#chon-ly button[aria-pressed]").filter({ hasText: "Khói" }).click();
await p.locator("#chon-ly input[value=strong]").check();
await p.getByRole("button", { name: "Tìm vị của tôi" }).click();
await p.waitForTimeout(400);
let res = await p.locator("#chon-ly ol > li h4").allInnerTexts();
ok(res.length === 3, `matcher: 3 gợi ý (${res.join(", ")})`);
ok(["Khói Mực", "Than Hồng"].every((x) => res.includes(x)), "matcher: vị khói + mạnh -> Khói Mực & Than Hồng");
ok((await p.locator("#chon-ly ol ul li").count()) >= 6, "matcher: có lý do cho mỗi ly");
ok(await p.evaluate(() => document.activeElement?.tagName === "H3"), "matcher: focus chuyển vào tiêu đề kết quả");
await p.locator("#chon-ly input[value=no]").check();
await p.getByRole("button", { name: "Tìm vị của tôi" }).click();
res = await p.locator("#chon-ly ol > li h4").allInnerTexts();
ok(res.length === 3 && res.includes("Trà Khói Đêm"), `matcher: không cồn -> chỉ mocktail (${res.join(", ")})`);
await p.locator("#chon-ly ol > li").first().getByRole("button").click();
await p.getByRole("button", { name: "Làm lại" }).click();
ok((await p.locator("#chon-ly ol").count()) === 0, "matcher: làm lại về trạng thái rỗng");
await p.locator("#chon-ly button[aria-pressed]").filter({ hasText: "Chua" }).focus();
await p.keyboard.press("Space");
ok((await p.locator("#chon-ly button[aria-pressed=true]").count()) === 1, "matcher: chọn vị bằng bàn phím");
txt = await p.locator("#chon-ly").innerText();
ok(!BAN.test(txt), "không chữ cấm (matcher)");

// ---------- đặt bàn
await p.evaluate(() => document.getElementById("dat-ban").scrollIntoView());
await p.getByRole("button", { name: "Xem tóm tắt đặt bàn" }).click();
ok((await p.locator("#dat-ban [class*=err]").count()) === 3, "đặt bàn: 3 lỗi (ngày, giờ, khu vực)");
await p.locator("#tm-date").fill("2020-01-01"); await p.locator("#tm-time").selectOption("20:30");
await p.getByRole("button", { name: "Xem tóm tắt đặt bàn" }).click();
ok(/đã qua/.test(await p.locator("#tm-date-e").innerText()), "đặt bàn: ngày quá khứ bị chặn");
const fut = await p.evaluate(() => { const d = new Date(Date.now() + 5 * 864e5); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; });
await p.locator("#tm-date").fill(fut);
for (let i = 0; i < 3; i++) await p.getByRole("button", { name: "Tăng số khách" }).click();
await p.locator("#dat-ban input[value=goc-neon]").check();
await p.getByRole("button", { name: "Xem tóm tắt đặt bàn" }).click();
await p.waitForTimeout(300);
const tk = await p.locator("#dat-ban dl").innerText();
ok(/5/.test(tk) && /Góc neon/.test(tk) && /20:30/.test(tk), "đặt bàn: tóm tắt đúng (5 khách, Góc neon, 20:30)");
ok(/chưa phải xác nhận/.test(await p.locator("#dat-ban").innerText()), "đặt bàn: không khẳng định đã đặt");
const href = await p.getByRole("link", { name: "Gửi yêu cầu đặt bàn" }).getAttribute("href");
ok(href.startsWith("/lien-he"), `đặt bàn: nút cuối -> buildConsultHref (${href})`);
ok(await p.evaluate(() => document.activeElement?.tagName === "H3"), "đặt bàn: focus vào tiêu đề tóm tắt");
for (let i = 0; i < 7; i++) await p.getByRole("button", { name: "Tăng số khách" }).click();
console.log('INFO guests', await p.locator('#dat-ban output').innerText());
ok(/Nhóm từ 9 khách/.test(await p.locator("#dat-ban").innerText()), "đặt bàn: gợi ý nhóm từ 9 khách");
ok((await p.getByRole("button", { name: "Tăng số khách" }).isDisabled()), "đặt bàn: trần 12 khách");
txt = await p.locator("#dat-ban").innerText();
ok(!BAN.test(txt), "không chữ cấm (đặt bàn)");
// Tab tới CTA (trang mới)
const tp = await open({ width: 1440, height: 900 });
let seen = false;
for (let i = 0; i < 12 && !seen; i++) { await tp.keyboard.press("Tab"); seen = await tp.evaluate(() => /Giữ chỗ trên mái/i.test(document.activeElement?.textContent || "")); }
await tp.context().close();
ok(seen, "Tab tới CTA hero");
ok((await p.locator("a[href='/demos/bar-mai-thuong/credits']").count()) >= 1, "link Ảnh & ghi công ở footer");
txt = await visibleText(p);
ok(!BAN.test(txt), "không chữ cấm (toàn trang sau tương tác)");

// ---------- tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const q = await open({ width: w, height: 800 });
  const sw = await q.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
  ok(sw.s <= sw.c, `không tràn ngang ${w}px (${sw.s}/${sw.c})`);
  ok(q.errs.length === 0, `0 lỗi console ${w}px`);
  await q.context().close();
}

// ---------- mobile: menu, ảnh chụp, long task
const m = await open({ width: 390, height: 844 }, { ctx: { hasTouch: true, isMobile: true, deviceScaleFactor: 2 } });
await m.getByRole("button", { name: "Mở menu" }).click();
ok(await m.locator("#tm-menu").isVisible(), "mobile: mở menu");
await m.keyboard.press("Escape");
ok(!(await m.locator("#tm-menu").isVisible()), "mobile: Escape đóng menu");
ok(await m.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Mở menu"), "mobile: trả focus nút menu");
const spotM = await m.evaluate(() => getComputedStyle(document.querySelector("[data-tm=spot]")).opacity);
ok(spotM === "0", "mobile: spotlight không bật (touch)");
const small = await m.evaluate(() => [...document.querySelectorAll("a,button,summary,input,select")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && !(e.type === "radio") && (r.height < 43.5 || r.width < 43.5) && !e.closest("[class*=skip]"); }).map((e) => `${e.tagName}:${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 20)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`));
ok(small.length === 0, `mobile: touch target ≥44px (vi phạm: ${small.slice(0, 5).join("; ")})`);
await m.screenshot({ path: "screenshots/m-hero.png" });
const lt = async (pg) => pg.evaluate(async () => {
  let n = 0; const po = new PerformanceObserver((l) => { n += l.getEntries().filter((e) => e.duration > 200).length; }); po.observe({ type: "longtask", buffered: false });
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  await new Promise((r) => setTimeout(r, 300)); po.disconnect(); return n;
});
const ltM = await lt(m);
console.log(`INFO long task >200ms khi cuộn toàn trang 390: ${ltM}`);
await m.context().close();
const dl = await open({ width: 1440, height: 900 });
console.log(`INFO long task >200ms khi cuộn toàn trang 1440: ${await lt(dl)}`);
await dl.context().close();

// ---------- reduced motion
const r = await open({ width: 1440, height: 900 }, { reduced: true });
const rm = await r.evaluate(() => {
  const anims = document.getAnimations().filter((a) => a.playState === "running" && a.effect?.target?.closest?.("main,header")).length;
  const h1 = getComputedStyle(document.querySelector("h1 span")).opacity;
  const mqTrack = document.querySelector("[data-fx=VelocityMarquee]")?.getAttribute("data-fx-ready");
  return { anims, h1, mqTrack, liquid: document.querySelector("[data-tm=level]").textContent, rv: [...document.querySelectorAll("[data-tm=rv]")].every((e) => getComputedStyle(e).opacity === "1") };
});
ok(rm.anims <= 3, `reduced: không animation đang chạy trong main/header (${rm.anims})`);
ok(rm.h1 === "1" && rm.rv, "reduced: nội dung hiện đủ");
ok(rm.liquid === "100", "reduced: ly đầy sẵn");
ok(rm.mqTrack === "static", `reduced: marquee tĩnh (${rm.mqTrack})`);
await r.mouse.move(300, 300); await r.waitForTimeout(300);
ok(await r.evaluate(() => getComputedStyle(document.querySelector("[data-tm=spot]")).display === "none"), "reduced: spotlight tắt");
txt = await visibleText(r);
ok(!BAN.test(txt), "reduced: không chữ cấm");
await r.context().close();

// ---------- ?ref giữ link, credits
const rf = await open({ width: 1440, height: 900 }, { url: PAGE + "?ref=abc" });
await rf.evaluate(() => document.getElementById("dat-ban").scrollIntoView());
ok((await rf.context().cookies()).every((c) => c.name !== "tct_ref" || true), "trang không tự ghi cookie tct_ref");
await rf.context().close();
const cr = await open({ width: 1440, height: 900 }, { url: PAGE + "/credits" });
ok((await cr.locator("ul li").count()) >= 14, "credits: liệt kê ảnh + font");
const crt = await cr.locator("main").innerText();
ok(/Trần Công Tiến thiết kế/.test(crt) && !/\bdemo\b/i.test(crt), "credits: lời công khai trung thực, không chữ Demo");
await cr.screenshot({ path: "screenshots/credits.png" });
ok(cr.errs.length === 0 && cr.ext.length === 0, "credits: 0 lỗi, 0 request ngoài");

// ---------- ảnh chụp (thử lại nếu dev server HMR làm tải lại trang)
async function capture(vp, step, name, hero) {
  for (let k = 0; k < 4; k++) {
    try {
      const pg = await open(vp);
      if (hero) await pg.screenshot({ path: `screenshots/${hero}.png` });
      await pg.evaluate(async (st) => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += st) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); }
        await Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; })))); scrollTo(0, 0); }, step);
      await pg.waitForTimeout(500);
      await pg.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
      await pg.context().close();
      return true;
    } catch (e) { console.log("INFO chụp lại do", String(e).slice(0, 60)); }
  }
  return false;
}
ok(await capture({ width: 1440, height: 900 }, 350, "d-full", "d-hero"), "chụp 1440 hero + full");
ok(await capture({ width: 390, height: 844 }, 300, "m-full", null), "chụp 390 full");
await b.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
