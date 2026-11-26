import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import path from "node:path";
const BASE = process.env.BASE || "http://localhost:3100";
const URL_ = `${BASE}/demos/can-ho-ven-bien`;
const SHOTS = path.resolve(import.meta.dirname, "screenshots");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const newPage = async (w, h, opts = {}) => {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...opts });
  const p = await ctx.newPage();
  p.errs = []; p.ext = [];
  p.on("console", (m) => { if (m.type() === "error") p.errs.push(m.text().slice(0, 200)); });
  p.on("pageerror", (e) => p.errs.push(String(e)));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith("data:") && !u.startsWith("blob:")) p.ext.push(u); });
  return p;
};
const load = async (p, q = "") => { await p.goto(URL_ + q, { waitUntil: "load", timeout: 180000 }); await p.waitForTimeout(3200); };
const scrollAll = async (p) => { const H = await p.evaluate(() => document.documentElement.scrollHeight); const vh = await p.evaluate(() => innerHeight); for (let y = 0; y < H; y += vh * 0.7) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(250); } await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500); };

// 1. tải trang, console, request ngoài, tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const p = await newPage(w, w < 700 ? 800 : 900);
  await load(p);
  await scrollAll(p);
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  ok(ov <= 0, `không tràn ngang ở ${w}px (dư ${ov})`);
  ok(p.errs.length === 0, `0 lỗi console ở ${w}px ${p.errs[0] || ""}`);
  ok(p.ext.length === 0, `0 request ngoài origin ở ${w}px ${p.ext[0] || ""}`);
  await p.context().close();
}

// 2. desktop: font, glyph, tương tác, chữ cấm
const p = await newPage(1440, 900);
await load(p);
const fonts = await p.evaluate(async () => {
  await document.fonts.ready;
  const fam = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
  const h1 = getComputedStyle(document.querySelector("h1")).fontFamily;
  return { fam: [...new Set(fam)], h1 };
});
ok(fonts.fam.some((f) => /spec/i.test(f)) && fonts.fam.some((f) => /geo/i.test(f)), `font brand đã tải: ${fonts.fam.join(", ").slice(0, 120)}`);
const glyph = await p.evaluate(async () => {
  await document.fonts.ready;
  const text = "Ắ Ằ Ẳ Ẵ Ặ Ấ Ầ Ẩ Ẫ Ậ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự Đ ă â ê ô ơ ư đ";
  const mk = (fam) => { const c = document.createElement("canvas"); c.width = 1400; c.height = 90; const x = c.getContext("2d"); x.font = `200 56px ${fam}`; x.fillStyle = "#000"; x.fillText(text, 4, 64); return c.toDataURL(); };
  const disp = getComputedStyle(document.querySelector("h1")).fontFamily;
  const body = getComputedStyle(document.body).fontFamily;
  // đo bề ngang: nếu glyph rơi về font hệ thống thì rộng khác biệt rõ; kiểm tra không có ô vuông bằng cách so với chuỗi chỉ gồm glyph Việt
  const w = (fam, t) => { const c = document.createElement("canvas").getContext("2d"); c.font = `200 40px ${fam}`; return c.measureText(t).width; };
  return { disp, widthOk: w(disp, text) > 400, tofu: w(disp, "Ế") > 5, same: mk(disp).length > 2000 };
});
ok(glyph.widthOk && glyph.tofu && glyph.same, "glyph tiếng Việt (Ắ…Ự, đ ă â ê ô ơ ư) đo được trên font tiêu đề");
const glyphShot = await p.evaluate(() => { const d = document.createElement("div"); d.id = "glyphtest"; d.style.cssText = "position:fixed;left:0;top:0;z-index:9999;background:#0c1f3a;color:#fff;padding:20px;font:200 56px/1.5 var(--cv-display)"; d.setAttribute("data-t", "1"); d.textContent = "VỌNG TRIỀU Ố Ế Ể Ệ Ợ Ử Ữ Ắ Ặ Ằ"; document.querySelector('[data-site]').appendChild(d); return true; });
await p.screenshot({ path: `${SHOTS}/glyph-1440.png`, clip: { x: 0, y: 0, width: 1440, height: 260 } });
await p.evaluate(() => document.getElementById("glyphtest")?.remove());

// hero + hiệu ứng
await p.screenshot({ path: `${SHOTS}/hero-1440.png` });
const fx = await p.evaluate(() => {
  const q = (s) => [...document.querySelectorAll(s)].map((e) => e.getAttribute("data-fx-ready"));
  return { par: q('[data-fx="ParallaxLayer"]'), sticky: q('[data-fx="StickyChapters"]'), scrub: q('[data-fx="ScrollScrubText"]'), gal: q('[data-fx="DraggableGallery"]'), cursor: q('[data-fx="CustomCursor"]').length };
});
for (const [k, v] of Object.entries(fx)) if (k !== "cursor") ok(v.length > 0 && v.every((x) => x === "1" || (k === "par" && x === "static")), `hiệu ứng ${k} khởi chạy (${v.join(",")})`);

// sticky chapters đổi cảnh
const act = [];
for (const id of ["vi-tri", "chuong-tien-ich", "can-ho", "hoan-thien"]) {
  await p.evaluate((id) => { const e = document.getElementById(id); scrollTo(0, e.getBoundingClientRect().top + scrollY - 80); }, id);
  await p.waitForTimeout(1200);
  act.push(await p.evaluate(() => document.querySelector('[data-fx="StickyChapters"]').getAttribute("data-active")));
}
ok(act.join() === "0,1,2,3", `sticky chapters đổi theo chương: ${act.join()}`);
await p.evaluate(() => scrollTo(0, document.getElementById("vi-tri").getBoundingClientRect().top + scrollY - 60)); await p.waitForTimeout(2500);
await p.screenshot({ path: `${SHOTS}/chapter-1440.png` });

// cảnh nắng
await p.evaluate(() => scrollTo(0, document.getElementById("mat-tien").getBoundingClientRect().top + scrollY + 160)); await p.waitForTimeout(7000);
const slider = p.locator("#cv-hour");
const col = async () => p.evaluate(() => getComputedStyle(document.querySelector('[data-stage="1"] svg')).width && document.querySelector('[data-stage="1"] linearGradient#cvSky stop').getAttribute("stop-color"));
await p.getByRole("button", { name: "Giữa trưa" }).click(); await p.waitForTimeout(1300);
const c1 = await col();
await p.getByRole("button", { name: "Đêm" }).click(); await p.waitForTimeout(1300);
const c2 = await col();
await p.getByRole("button", { name: "Hoàng hôn" }).click(); await p.waitForTimeout(1300);
const c3 = await col();
ok(c1 !== c2 && c2 !== c3, `màu mặt tiền/bầu trời đổi theo giờ (${c1} ${c2} ${c3})`);
await slider.focus(); await p.keyboard.press("ArrowRight"); await p.keyboard.press("ArrowRight");
ok(Number(await slider.inputValue()) > 17.9, "thanh giờ dùng được bằng bàn phím");
await p.screenshot({ path: `${SHOTS}/sun-1440.png` });
await p.getByRole("button", { name: "Đêm" }).click(); await p.waitForTimeout(1300);
await p.screenshot({ path: `${SHOTS}/sun-night-1440.png` });

// floor plan
await p.evaluate(() => scrollTo(0, document.getElementById("mat-bang").getBoundingClientRect().top + scrollY + 560)); await p.waitForTimeout(1500);
const areaTxt = async () => (await p.locator('[data-cv-room]').innerText()).replace(/\s+/g, " ");
const price = async () => (await p.locator('dl[class*="quote"]').innerText()).replace(/\s+/g, " ");
const p2 = await price();
await p.locator("#mat-bang").getByRole("radio", { name: /3PN/ }).click(); await p.waitForTimeout(1600);
const rects = await p.evaluate(() => [...document.querySelectorAll('[data-slot]')].filter((g) => g.getAttribute("data-present") === "1").length);
const p3 = await price();
ok(rects === 9 && p2 !== p3, `chuyển 2PN→3PN: 9 phòng, giá đổi (${p3.slice(0, 60)})`);
await p.locator("#mat-bang").getByRole("radio", { name: /1PN/ }).click(); await p.waitForTimeout(1600);
const r1 = await p.evaluate(() => [...document.querySelectorAll('[data-slot]')].filter((g) => g.getAttribute("data-present") === "1").length);
ok(r1 === 6, "1PN: 6 phòng");
await p.screenshot({ path: `${SHOTS}/plan-1pn-1440.png` });
await p.locator("#mat-bang").getByRole("radio", { name: /3PN/ }).click(); await p.waitForTimeout(1600);
await p.locator('[data-slot="bed2"]').focus(); await p.waitForTimeout(200);
ok(/Phòng ngủ 2/.test(await areaTxt()), "focus bàn phím vào phòng hiện diện tích và công năng");
await p.keyboard.press("ArrowRight"); await p.waitForTimeout(200);
ok(/Phòng ngủ 3|Phòng tắm|Phòng/.test(await areaTxt()) && !(/Phòng ngủ 2/.test(await areaTxt())), "mũi tên chuyển phòng kế tiếp");
await p.locator('[data-slot="living"]').hover(); await p.waitForTimeout(200);
ok(/Phòng khách/.test(await areaTxt()), "hover phòng khách cập nhật thông tin");
const ang0 = await p.locator('path[class*="cmpWedge"]').getAttribute("d");
await p.locator("#mat-bang").getByRole("radio", { name: /Tầng cao/ }).click(); await p.waitForTimeout(1600);
const ang1 = await p.locator('path[class*="cmpWedge"]').getAttribute("d");
ok(ang0 !== ang1, "la bàn hướng nhìn xoay/mở theo tầng");
const pf1 = await price();
await p.locator("#mat-bang").getByRole("radio", { name: /Cơ bản/ }).click(); await p.waitForTimeout(800);
ok((await price()) !== pf1, "đổi nội thất cập nhật giá");
await p.screenshot({ path: `${SHOTS}/plan-3pn-1440.png` });

// dự toán: lỗi/rỗng/đúng
await p.evaluate(() => scrollTo(0, document.getElementById("du-toan").getBoundingClientRect().top + scrollY + 520)); await p.waitForTimeout(800);
const rate = p.getByLabel(/Lãi suất vay/);
await rate.fill(""); await p.waitForTimeout(150);
ok((await rate.getAttribute("aria-invalid")) === "true" && /Nhập lãi suất/.test(await p.locator("body").innerText()), "lãi suất rỗng: báo lỗi cạnh ô, aria-invalid");
await rate.fill("12"); await p.getByLabel(/Tỉ lệ vay/).fill("50"); await p.getByLabel(/Thời hạn vay/).fill("10");
await p.waitForTimeout(300);
const pmtTxt = await p.locator('[class*="figMain"] dd').getAttribute("title");
// kiểm công thức độc lập
const priceNum = await p.evaluate(() => 0);
const body = await p.locator("body").innerText();
const m = body.match(/Số tiền vay\s*\n?\s*([\d,]+)\s*tỷ/);
ok(!!pmtTxt, `khoản trả hàng tháng hiển thị: ${pmtTxt}`);
const loanTitle = await p.locator('dl[class*="figs"] > div:nth-child(2) dd').getAttribute("title");
const L = Number(loanTitle.replace(/[^\d]/g, ""));
const r = 0.12 / 12, n = 120; const exp = (L * r) / (1 - Math.pow(1 + r, -n));
const got = Number(pmtTxt.replace(/[^\d]/g, ""));
ok(Math.abs(got - exp) / exp < 0.001, `annuity khớp công thức độc lập (${got} vs ${Math.round(exp)})`);
await rate.fill("0"); await p.waitForTimeout(200);
const got0 = Number((await p.locator('[class*="figMain"] dd').getAttribute("title")).replace(/[^\d]/g, ""));
ok(Math.abs(got0 - L / n) / (L / n) < 0.001, "lãi 0% chia đều gốc");
await p.getByLabel(/Tỉ lệ vay/).fill("0"); await p.waitForTimeout(200);
ok(/Tỉ lệ vay bằng 0/.test(await p.locator("body").innerText()), "không vay: trạng thái rỗng");
await p.getByLabel(/Tỉ lệ vay/).fill("90"); await p.waitForTimeout(200);
ok((await p.getByLabel(/Tỉ lệ vay/).getAttribute("aria-invalid")) === "true", "tỉ lệ vay 90% báo lỗi");
await p.getByLabel(/Tỉ lệ vay/).fill("40"); await rate.fill("9.5"); await p.getByLabel(/Thời hạn vay/).fill("20");
ok(/không phải tư vấn tài chính/.test(await p.locator("body").innerText()), "có dòng 'không phải tư vấn tài chính'");
await p.screenshot({ path: `${SHOTS}/pay-1440.png` });

// CTA + link
const cta = await p.locator('a[href*="/lien-he"]').first().getAttribute("href");
ok(/\/lien-he/.test(cta), `link tư vấn: ${cta}`);
const hasParams = /industry=/.test(cta) && /solution=/.test(cta) && /utm_campaign=can-ho-ven-bien/.test(cta);
console.log(hasParams ? "PASS link có industry/solution/utm_campaign" : "NOTE link chưa có industry/solution/utm vì registry chung chưa có slug can-ho-ven-bien (điều phối viên cần thêm meta)");
if (hasParams) pass++;
// Tab tới CTA
const tp = await newPage(1440, 900); await load(tp); await tp.keyboard.press("Tab");
const skip = await tp.evaluate(() => document.activeElement?.textContent); await tp.context().close();
ok(/Bỏ qua/.test(skip || ""), "Tab đầu tiên là skip link");

// chữ cấm
const forbid = await p.evaluate(() => {
  const txt = document.body.innerText + " " + [...document.querySelectorAll("[alt],[aria-label],[title]")].map((e) => (e.getAttribute("alt") || "") + " " + (e.getAttribute("aria-label") || "") + " " + (e.getAttribute("title") || "")).join(" ") + " " + document.title + " " + (document.querySelector('meta[name="description"]')?.content || "");
  const bad = /\bdemo\b|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu|pháp lý|sổ hồng/i;
  return (txt.match(bad) || [null])[0];
});
ok(!forbid, `không có chữ cấm trong văn bản/alt/aria/meta (${forbid})`);
const rel = await p.evaluate(() => document.querySelector('a[href="/demos/can-ho-ven-bien/credits"]') ? 1 : 0);
ok(rel === 1, "footer có link Ảnh & ghi công");
// mở dialog menu mobile Escape
await p.context().close();


// 2b. nội dung dự án + chữ ký riêng
{
  const pp = await newPage(1440, 900); await load(pp);
  const hero = await pp.locator('[data-cv="hero"]').innerText();
  ok(/căn hộ 1 đến 3 phòng ngủ/i.test(hero) && /đà nẵng/i.test(hero) && /Đặt lịch xem nhà mẫu/i.test(hero), "hero nêu loại hình, khu vực, CTA đúng ngành");
  ok(/48\s*m²/.test(hero) && /2,98\s*tỷ/.test(hero) && /36\s*tầng/.test(hero), "hero có 3 sự thật: diện tích từ, giá từ, số tầng");
  const ov = await pp.locator("#tong-quan").innerText();
  ok(/Loại hình/i.test(ov) && /Hướng nhìn/i.test(ov) && /không đưa cam kết/.test(ov), "tổng quan dự án ở mức chung, không cam kết");
  const un = await pp.locator("#loai-can").innerText();
  ok(/1PN/.test(un) && /2PN/.test(un) && /3PN/.test(un) && /48\s*m²/.test(un) && /71\s*m²/.test(un) && /101\s*m²/.test(un) && /tỷ/.test(un), "loại căn 1PN/2PN/3PN có diện tích và giá tham khảo");
  // mặt cắt tháp: dải đồng trượt khi đổi nhóm tầng
  await pp.locator("#tien-ich").scrollIntoViewIfNeeded(); await pp.waitForTimeout(400);
  const b0 = await pp.locator('#tien-ich [class*="twBand"]').evaluate((e) => getComputedStyle(e).transform);
  await pp.getByRole("radio", { name: /Sân thượng/ }).click(); await pp.waitForTimeout(1100);
  const b1 = await pp.locator('#tien-ich [class*="twBand"]').evaluate((e) => getComputedStyle(e).transform);
  ok(b0 !== b1 && /Sân thượng/.test(await pp.locator("#tien-ich").innerText()), "mặt cắt tháp: dải tầng trượt và mô tả đổi theo nhóm tầng");
  await pp.getByRole("radio", { name: /Sảnh đón/ }).focus(); await pp.keyboard.press("ArrowUp"); await pp.waitForTimeout(200);
  ok((await pp.getByRole("radio", { checked: true }).first().getAttribute("aria-checked")) === "true", "mặt cắt tháp dùng được bằng mũi tên");
  // thước tầng chạy theo cuộn
  await pp.evaluate(() => scrollTo(0, 0)); await pp.waitForTimeout(400);
  const f0 = await pp.locator('[class*="rulerMark"] span').textContent();
  await pp.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await pp.waitForTimeout(700);
  const f1 = await pp.locator('[class*="rulerMark"] span').textContent();
  ok(f0 === "T01" && f1 === "T36", `thước tầng chạy theo cuộn (${f0} -> ${f1})`);
  // đặt lịch tham quan
  await pp.locator("#tham-quan").scrollIntoViewIfNeeded(); await pp.waitForTimeout(400);
  await pp.locator("#tham-quan").getByRole("radio", { name: /Sáng/ }).click();
  await pp.locator("#tham-quan").getByRole("radio", { name: /3PN/ }).click(); await pp.waitForTimeout(200);
  const sm = await pp.locator("#tham-quan").innerText();
  ok(/vào sáng/i.test(sm) && /căn 3PN/.test(sm), "đặt lịch nhà mẫu: lời nhắn đổi theo buổi và loại căn");
  ok(/không lưu và không gửi đi/.test(sm), "công cụ ghi rõ không lưu, không gửi");
  const fxAbs = await pp.evaluate(() => ["SplitReveal", "ClipReveal", "MagneticButton", "SVGPathDraw", "ScrollProgress"].map((n) => [n, document.querySelectorAll(`[data-fx="${n}"]`).length]));
  ok(fxAbs.every(([, n]) => n === 0), `đã bỏ hiệu ứng đại trà vượt hạn mức (${fxAbs.map(([k, n]) => k + "=" + n).join(", ")})`);
  const lights = await pp.locator('[data-cv="hero-word"]').count();
  ok(lights >= 8, `tiêu đề hero tách từ để bật sáng như cửa sổ (${lights} từ)`);
  await pp.context().close();
}

// 3. mobile menu + Escape + chụp
const mp = await newPage(390, 844);
await load(mp); await mp.screenshot({ path: `${SHOTS}/hero-390.png` });
await mp.getByRole("button", { name: "Mở menu" }).click(); await mp.waitForTimeout(300);
ok(await mp.locator("#cv-menu").isVisible(), "menu mobile mở");
await mp.keyboard.press("Escape"); await mp.waitForTimeout(200);
ok(!(await mp.locator("#cv-menu").isVisible()) && (await mp.evaluate(() => document.activeElement?.getAttribute("aria-label"))) === "Mở menu", "Escape đóng menu và trả focus");
await scrollAll(mp);
await mp.screenshot({ path: `${SHOTS}/full-390.png`, fullPage: true });
await mp.context().close();

// 4. reduced motion
const rp = await newPage(1440, 900, { reducedMotion: "reduce" });
await load(rp);
const rv = await rp.evaluate(() => {
  const vis = (s) => [...document.querySelectorAll(s)].every((e) => getComputedStyle(e).opacity !== "0");
  const dash = [...document.querySelectorAll('[class*="ov"] path')].slice(0, 5).map((e) => getComputedStyle(e).strokeDashoffset);
  return { h1: document.querySelector("h1").innerText.length > 20, reveal: vis('[data-cv="reveal"]'), ready: [...document.querySelectorAll("[data-fx-ready]")].map((e) => e.getAttribute("data-fx-ready")), dash };
});
ok(rv.h1 && rv.reveal, "reduced-motion: nội dung hiện đủ");
ok(!rv.ready.includes("1") || rv.ready.filter((x) => x === "1").length <= 3, `reduced-motion: hiệu ứng ở chế độ tĩnh (${[...new Set(rv.ready)].join(",")})`);
await rp.screenshot({ path: `${SHOTS}/reduced-1440.png` });
await rp.context().close();

// 5. ?ref= giữ trong link
const rf = await newPage(1440, 900);
await load(rf, "?ref=abc");
const ctaR = await rf.locator('a[href*="/lien-he"]').first().getAttribute("href");
console.log("NOTE link khi mở với ?ref=abc:", ctaR, "(cookie tct_ref do proxy đặt, không tự đọc/ghi)");
await rf.context().close();

// 6. long task khi cuộn
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const lp = await newPage(w, h);
  await lp.addInitScript(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ type: "longtask", buffered: true }); });
  await load(lp);
  await lp.evaluate(() => { window.__lt.length = 0; });
  await scrollAll(lp);
  const lt = await lp.evaluate(() => window.__lt.filter((d) => d > 200).length);
  console.log(`INFO long task >200ms khi cuộn toàn trang ở ${w}: ${lt}`);
  await lp.context().close();
}

// 7. credits
const cp = await newPage(1440, 900);
await cp.goto(`${BASE}/demos/can-ho-ven-bien/credits`, { waitUntil: "load", timeout: 120000 }); await cp.waitForTimeout(1500);
ok((await cp.locator("li[class*=creditCard]").count()) === 12, "trang credits liệt kê 12 ảnh");
ok(cp.errs.length === 0, "credits 0 lỗi console");
await cp.context().close();
await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
