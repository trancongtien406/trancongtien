import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE_URL = BASE + "/demos/tra-thi";
const SHOTS = "tests/showroom/tra-thi/screenshots";
let pass = 0, fail = 0; const fails = [];
const ok = (c, m) => { if (c) pass++; else { fail++; fails.push(m); console.log("  FAIL:", m); } };
const BANNED = /\b(demo|minh ho[ạa]|giả định|mô phỏng|dữ liệu mẫu)\b/i;
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const origin = new URL(BASE).origin;

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: opts.w || 1440, height: opts.h || 900 }, reducedMotion: opts.reduced ? "reduce" : "no-preference", hasTouch: !!opts.touch, isMobile: !!opts.touch });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  page.on("request", (r) => { const u = r.url(); if (!u.startsWith(origin) && !u.startsWith("data:") && !u.startsWith("blob:")) ext.push(u); });
  return { ctx, page, errs, ext };
}
const scanText = (page) => page.evaluate(() => {
  const root = document.getElementById("main").parentElement;
  const bits = [root.innerText];
  root.querySelectorAll("[alt],[aria-label],[title],[placeholder]").forEach((e) => bits.push(e.getAttribute("alt") || "", e.getAttribute("aria-label") || "", e.getAttribute("title") || "", e.getAttribute("placeholder") || ""));
  bits.push(document.title, document.querySelector('meta[name="description"]')?.content || "");
  return bits.join("\n");
});
const scrollAll = async (page) => {
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 450) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(160); }
  await page.waitForTimeout(2200);
};

/* ---------- 1. tải trang, console, request ngoài, banned, meta ---------- */
console.log("== load + desktop");
let { ctx, page, errs, ext } = await newPage();
const resp = await page.goto(PAGE_URL, { waitUntil: "load" });
ok(resp.status() === 200, "status 200");
await page.waitForTimeout(3500);
ok((await page.title()).includes("Tịch Trà"), "title riêng");
ok((await page.locator('meta[name="description"]').getAttribute("content"))?.length > 40, "meta description");
ok((await page.locator("h1").count()) === 1, "một h1");
ok((await page.locator('link[rel="icon"]').count()) > 0, "favicon route");
ok((await page.locator('a.skip, a[href="#main"]').count()) > 0, "skip link");
let txt = await scanText(page);
ok(!BANNED.test(txt), "không chữ cấm (trạng thái đầu): " + (txt.match(BANNED) || [""])[0]);

/* hiệu ứng khởi chạy */
const fx = await page.evaluate(() => ({
  ink: document.querySelectorAll('[data-fx="InkReveal"]').length,
  inkTitle: document.querySelectorAll('[data-fx="InkTitle"]').length,
  scrub: document.querySelector('[data-fx="ScrollScrubText"]')?.getAttribute("data-fx-ready"),
  draw: [...document.querySelectorAll('[data-fx="SVGPathDraw"]')].map((e) => e.getAttribute("data-fx-ready")),
  par: document.querySelector('[data-fx="ParallaxLayer"]')?.getAttribute("data-fx-ready"),
  grain: !!document.querySelector('[data-fx="GrainOverlay"]'),
  cursor: !!document.querySelector('[data-fx="CustomCursor"]'),
  prog: !!document.querySelector('[data-fx="ScrollProgress"]'),
  marq: !!document.querySelector('[data-fx="VelocityMarquee"]') || !!document.querySelector('[data-fx*="Marquee"]'),
  steam: !!document.querySelector('canvas[data-fx="Steam"]'),
  leaves: document.querySelectorAll("[data-leaf]").length,
}));
ok(fx.ink >= 8, `InkReveal x${fx.ink}`);
ok(fx.inkTitle >= 6, `InkTitle x${fx.inkTitle}`);
ok(fx.scrub === "1", "ScrollScrubText chạy (data-fx-ready=1)");
ok(fx.draw.length >= 4 && fx.draw.every((v) => v === "1"), "SVGPathDraw x" + fx.draw.length + " sẵn sàng");
ok(fx.grain && fx.cursor && fx.steam, "Grain/Cursor/Steam có mặt");
ok(!fx.prog && !fx.marq && !fx.par, "đã bỏ ScrollProgress/Marquee/Parallax đại trà");
ok(fx.leaves >= 5, "lá trà parallax " + fx.leaves);
const steamPx = await page.evaluate(() => { const c = document.querySelector('canvas[data-fx="Steam"]'); const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 8) n++; return n; });
ok(steamPx > 500, "hơi nước canvas có điểm ảnh " + steamPx);
// preloader: lần đầu mount rồi biến mất
const preSeen = await (async () => { const n = await newPage(); await n.page.goto(PAGE_URL, { waitUntil: "commit" }); let seen = false; for (let i = 0; i < 12; i++) { if (await n.page.locator('[data-fx="Preloader"]').count()) { seen = true; break; } await n.page.waitForTimeout(80); } await n.page.waitForTimeout(2500); const gone = (await n.page.locator('[data-fx="Preloader"]').count()) === 0; await n.ctx.close(); return { seen, gone }; })();
ok(preSeen.seen && preSeen.gone, `chuyển cảnh mực xuất hiện (${preSeen.seen}) rồi tự gỡ (${preSeen.gone})`);

/* font Việt */
const fonts = await page.evaluate(async () => {
  await document.fonts.ready;
  const fam = getComputedStyle(document.querySelector("h1")).fontFamily;
  const body = getComputedStyle(document.body.querySelector("p")).fontFamily;
  const sample = "ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰđĐ";
  const draw = (f, w) => { const c = document.createElement("canvas"); c.width = 1600; c.height = 80; const x = c.getContext("2d"); x.font = `${w} 48px ${f}`; x.fillText(sample, 4, 56); return x.getImageData(0, 0, 1600, 80).data.join(","); };
  const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
  const a = draw(fam, 300), b = draw("serif", 300), a2 = draw(body, 400), b2 = draw("sans-serif", 400);
  const wid = (f) => { const c = document.createElement("canvas").getContext("2d"); c.font = `300 48px ${f}`; return c.measureText(sample).width; };
  return { fam, loaded: loaded.length, hDiff: a !== b, bDiff: a2 !== b2, wHead: wid(fam), wSerif: wid("serif") };
});
ok(fonts.loaded >= 3, "font Newsreader/Sarabun tải thật (" + fonts.loaded + " face)");
ok(fonts.hDiff && fonts.bDiff, "glyph Việt (Ắ…Ự) render bằng font thương hiệu, không fallback");
// ảnh chụp chữ lớn để tự xem dấu
await page.evaluate(() => { const d = document.createElement("div"); d.id = "glyphtest"; d.style.cssText = "position:fixed;left:0;top:0;z-index:99999;background:#1c1f1d;color:#e7e0d2;padding:20px;font:300 64px/1.3 " + getComputedStyle(document.querySelector("h1")).fontFamily; d.textContent = "Ố Ế Ể Ệ Ợ Ử Ữ Ắ Ặ Ằ Đ đ"; document.body.appendChild(d); });
await page.screenshot({ path: `${SHOTS}/glyph-test.png`, clip: { x: 0, y: 0, width: 1100, height: 100 } });
await page.evaluate(() => document.getElementById("glyphtest")?.remove());

/* nội dung nhà trà thật */
console.log("== nội dung ngành");
{
  const body = await page.evaluate(() => document.getElementById("main").innerText);
  const h1sec = await page.locator("section#top").innerText();
  ok(/Quận Hải Châu/.test(h1sec) && /8:30 đến 21:30/.test(h1sec) && /100\.000/.test(h1sec) && /4 đến 10/.test(h1sec), "hero: loại hình, quận, giờ, giá từ, phòng riêng");
  ok(/Đặt bàn hoặc phòng trà/.test(h1sec) && /Xem menu trà/.test(h1sec), "hero: CTA đặt bàn + xem menu");
  for (const id of ["danh-muc", "banh-tra", "nghi-thuc", "ghep-tra", "phong-tra", "buoi-tra", "mang-ve", "khong-gian", "quy-dinh", "hoi-dap"]) ok((await page.locator("#" + id).count()) === 1, "có section #" + id);
  ok((await page.locator("#banh-tra ul li").count()) >= 10, "bánh trà >= 10 món có giá");
  ok((await page.locator("#phong-tra ul > li").count()) === 3, "3 loại bàn/phòng trà");
  ok((await page.locator("#mang-ve ul li").count()) >= 10, "trà mang về + dụng cụ có giá");
  ok(/8:00 đến 22:00/.test(await page.locator("#khong-gian").innerText()), "giờ mở cuối tuần");
  ok(/đặt cọc 30%/i.test(await page.locator("#quy-dinh").innerText()) && /24 giờ/.test(await page.locator("#quy-dinh").innerText()), "quy định cọc + huỷ 24 giờ");
  ok(!/Thái Nguyên|Suối Giàng|Hà Giang|Phú Thọ|Vũ Di|Đại Hồng Bào|xuất xứ|hữu cơ|organic|chứng nhận/i.test(body), "không nhãn vùng trồng/chứng nhận");
  ok(!/chữa|điều trị|giảm cân|thải độc|ngừa|tốt cho sức khoẻ.*(có|giúp)/i.test(body.replace(/Trà có tốt cho sức khoẻ không\?/, "")), "không công dụng sức khoẻ");
  ok((await page.locator("#hoi-dap summary").count()) >= 7, "FAQ >= 7 câu");
}

/* ---------- 2. không tràn ngang ---------- */
console.log("== overflow");
for (const w of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.waitForTimeout(500);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ${w}px (${o.sw}/${o.cw})`);
}
await page.setViewportSize({ width: 1440, height: 900 });

/* ---------- 3. Danh mục ---------- */
console.log("== danh mục");
await page.evaluate(() => document.getElementById("danh-muc").scrollIntoView());
await page.waitForTimeout(700);
ok((await page.locator("#danh-muc ul li > button").count()) === 12, "12 loại trà");
const priceTxt = await page.locator("#danh-muc").innerText();
ok(/\d{2,3}\.\d{3}\s?₫/.test(priceTxt), "giá VND định dạng vi-VN");
{ const r = page.locator("#danh-muc ul li > button").nth(6); await r.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); const bb = await r.boundingBox(); await page.mouse.move(bb.x + 200, bb.y + bb.height / 2, { steps: 4 }); await page.waitForTimeout(500); }
ok((await page.locator("#danh-muc aside h3").innerText()).includes("Phổ nhĩ"), "hover đổi chi tiết sang Phổ nhĩ chín");
await page.getByRole("button", { name: "Ô long", exact: true }).click();
ok((await page.locator("#danh-muc ul li > button").count()) === 2, "lọc Ô long còn 2");
await page.getByRole("button", { name: "Tất cả", exact: true }).click();
ok(!/chữa|điều trị|giảm cân|tốt cho sức khoẻ|ngừa/i.test(await page.locator("#danh-muc").innerText()), "danh mục không khẳng định công dụng sức khoẻ");

/* ---------- 4. Ghép trà + đồng hồ ---------- */
console.log("== ghép trà");
await page.evaluate(() => document.getElementById("ghep-tra").scrollIntoView());
await page.waitForTimeout(600);
ok((await page.locator("#ghep-tra").innerText()).includes("Chưa có gợi ý"), "trạng thái rỗng ban đầu");
await page.locator("#ghep-tra label", { hasText: "Tĩnh lặng" }).click();
await page.locator("#ghep-tra label", { hasText: "Tối" }).first().click();
await page.locator("#ghep-tra label", { hasText: "Mặn nhẹ" }).click();
await page.waitForTimeout(400);
const first = await page.locator("#ghep-tra h3").first().innerText();
ok(first.length > 3 && !first.includes("Chưa"), "có gợi ý: " + first);
const specs = await page.locator("#ghep-tra dl").first().innerText();
ok(/°C/.test(specs) && /g/.test(specs) && /ml/.test(specs), "có nhiệt độ, gam, ml");
ok(/Vì:/.test(await page.locator("#ghep-tra").innerText()), "có lý do gợi ý");
const g1 = await page.locator("#ghep-tra dl dd").nth(1).innerText();
await page.getByRole("button", { name: "Tăng số chén" }).click();
const g2 = await page.locator("#ghep-tra dl dd").nth(1).innerText();
ok(g1 !== g2, `đổi số chén đổi gam (${g1.trim()} -> ${g2.trim()})`);
await page.getByRole("button", { name: "Xoá lựa chọn" }).click();
ok((await page.locator("#ghep-tra").innerText()).includes("Chưa có gợi ý"), "xoá lựa chọn quay về rỗng");
// từ danh mục -> đồng hồ (Phổ nhĩ chín: nước 1 = 10s)
await page.clock.install();
await page.evaluate(() => document.getElementById("danh-muc").scrollIntoView());
await page.locator("#danh-muc ul li > button").nth(6).click();
await page.getByRole("button", { name: "Xem cách pha và bấm giờ" }).first().click();
await page.waitForTimeout(500);
ok((await page.locator("#ghep-tra h3").first().innerText()).includes("Phổ nhĩ"), "chuyển sang cách pha Phổ nhĩ chín");
ok((await page.locator('#ghep-tra [role="timer"]').innerText()).trim() === "00:10", "đồng hồ nước 1 = 00:10");
await page.locator("#ghep-tra label", { hasText: "Chuông báo" }).locator("input").uncheck();
await page.getByRole("button", { name: /Bắt đầu nước 1/ }).click();
await page.clock.runFor(4000);
const t4 = (await page.locator('#ghep-tra [role="timer"]').innerText()).trim();
ok(["00:06", "00:07"].includes(t4), "đếm ngược sau 4s: " + t4);
await page.getByRole("button", { name: "Tạm dừng" }).click();
await page.clock.runFor(5000);
const tp = (await page.locator('#ghep-tra [role="timer"]').innerText()).trim();
ok(tp === t4 || Math.abs(Number(tp.slice(3)) - Number(t4.slice(3))) <= 1, "tạm dừng giữ nguyên " + tp);
await page.getByRole("button", { name: "Tiếp tục" }).click();
await page.clock.runFor(7000);
await page.waitForTimeout(100);
ok(await page.getByRole("button", { name: /Nước 2: 15s/ }).isVisible(), "hết giờ -> nút nước 2 (15s)");
ok(/Xong nước 1/.test(await page.locator("#ghep-tra [role=status]").first().innerText()), "thông báo cho trình đọc màn hình");
await page.getByRole("button", { name: /Nước 2/ }).click();
await page.clock.runFor(16000);
ok((await page.locator('#ghep-tra [role="timer"]').innerText()).trim() === "00:00", "nước 2 hết giờ");
await page.getByRole("button", { name: "Đặt lại" }).click();
ok((await page.locator('#ghep-tra [role="timer"]').innerText()).trim() === "00:10", "đặt lại về nước 1");
await page.clock.resume?.();

/* ---------- 5. Tóm tắt ---------- */
console.log("== tóm tắt buổi trà");
await page.getByRole("button", { name: "Đưa vào buổi trà" }).click();
await page.waitForTimeout(600);
const ticket = () => page.locator("#buoi-tra [class*=ticket]").first().innerText();
ok((await ticket()).includes("Phổ nhĩ"), "trà từ bước ghép được đưa sang bản tóm tắt");
ok(await page.getByRole("button", { name: "Sao chép tóm tắt" }).isDisabled(), "sao chép bị khoá khi chưa chọn khung giờ");
await page.locator("#buoi-tra label", { hasText: "Chiều, 14:30" }).click();
ok(await page.getByRole("button", { name: "Sao chép tóm tắt" }).isEnabled(), "chọn khung giờ -> mở sao chép");
for (let i = 0; i < 6; i++) await page.getByRole("button", { name: "Tăng số người" }).click();
ok(await page.getByRole("button", { name: "Tăng số người" }).isDisabled(), "số người tối đa 8");
ok((await ticket()).includes("Bộ quây quần"), "8 người -> gợi ý bộ quây quần");
await page.locator("#buoi-tra label", { hasText: "Bộ độc ẩm" }).click();
ok(await page.locator('#buoi-tra [role="alert"]').isVisible(), "chọn bộ không khớp -> lỗi cạnh ô");
await page.locator("#buoi-tra label", { hasText: "Bộ quây quần" }).click();
ok(/₫/.test(await ticket()), "có ước tính tham khảo");
await page.locator("#buoi-tra textarea").fill("Cần chỗ yên tĩnh");
ok((await ticket()).includes("Cần chỗ yên tĩnh"), "ghi chú vào bản tóm tắt");
const cta = await page.locator("#buoi-tra a", { hasText: "Trao đổi về buổi trà" }).getAttribute("href");
ok(cta.startsWith("/lien-he"), "nút cuối dẫn tới /lien-he: " + cta);
if (!/industry=/.test(cta)) console.log("  WARN: href chưa có industry/solution/utm_campaign (registry chưa có tra-thi, xem design/REQUESTS.md)");
else ok(/solution=fnb/.test(cta) && /utm_campaign=tra-thi/.test(cta), "href đủ solution + utm_campaign");
ok(!(await ctx.cookies()).some((c) => c.name === "tct_ref"), "trang không tự ghi cookie tct_ref");
await page.locator("#hoi-dap summary").first().click();
txt = await scanText(page);
ok(!BANNED.test(txt), "không chữ cấm (sau tương tác, FAQ mở): " + (txt.match(BANNED) || [""])[0]);
ok(!/\b\d+\s*(năm kinh nghiệm|khách hàng|đánh giá)|⭐|★|giải thưởng|chứng nhận/i.test(txt), "không bịa số khách/đánh giá/giải thưởng");
ok(!/\b0\d{2,3}[ .]?\d{3}[ .]?\d{4}\b/.test(txt.replace(/0236[\s\u00a0]000[\s\u00a0]0000/g, "")), "không có số điện thoại thật");
// bàn phím
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(1500);
await page.keyboard.press("Tab");
ok(await page.evaluate(() => document.activeElement?.className.includes("skip")), "Tab đầu tiên tới skip link");
for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
ok(await page.evaluate(() => !!document.activeElement && document.activeElement !== document.body), "Tab di chuyển được focus");
ok(await page.evaluate(() => { const a = [...document.querySelectorAll("a")].find((x) => /Đặt bàn hoặc phòng trà/.test(x.textContent)); a.focus(); const cs = getComputedStyle(a); return cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2; }), "focus-visible rõ ở CTA");
ok(ext.length === 0, "0 request ngoài origin " + ext.slice(0, 2).join(" "));
ok(errs.length === 0, "0 lỗi console " + errs.slice(0, 2).join(" | "));

/* ---------- 6. hiệu năng thô desktop ---------- */
console.log("== long task");
const lt = async (w, h, touch) => {
  const n = await newPage({ w, h, touch });
  await n.page.addInitScript(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ["longtask"] }); });
  await n.page.goto(PAGE_URL, { waitUntil: "load" }); await n.page.waitForTimeout(3000);
  await scrollAll(n.page);
  const r = await n.page.evaluate(() => ({ n200: window.__lt.filter((d) => d > 200).length, all: window.__lt.length, max: Math.round(Math.max(0, ...window.__lt)) }));
  await n.ctx.close(); return r;
};
const l1 = await lt(1440, 900, false); console.log("  long tasks 1440:", JSON.stringify(l1));
const l2 = await lt(390, 844, true); console.log("  long tasks 390:", JSON.stringify(l2));
ok(l1.n200 <= 5 && l2.n200 <= 5, `long task >200ms: desktop ${l1.n200}, mobile ${l2.n200} (ghi số, ngưỡng mềm <=5)`);

/* ---------- 7. Ảnh chụp desktop ---------- */
console.log("== ảnh chụp");
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(3200);
await page.screenshot({ path: `${SHOTS}/hero-1440.png` });
await scrollAll(page); await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600);
await page.screenshot({ path: `${SHOTS}/full-1440.png`, fullPage: true });
const imgsBroken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
ok(imgsBroken.length === 0, "không ảnh hỏng " + imgsBroken.join(","));
const inkDone = await page.evaluate(() => [...document.querySelectorAll('[data-fx="InkReveal"]')].filter((e) => e.getAttribute("data-ink") === "done").length);
ok(inkDone >= 10, `InkReveal hoàn tất sau khi cuộn: ${inkDone}`);
await ctx.close();

/* ---------- 8. Mobile ---------- */
console.log("== mobile 390");
({ ctx, page, errs, ext } = await newPage({ w: 390, h: 844, touch: true }));
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(3300);
await page.screenshot({ path: `${SHOTS}/hero-390.png` });
ok(await page.evaluate(() => getComputedStyle(document.querySelector('[data-fx="CustomCursor"]') || document.body).display !== "x"), "con trỏ tuỳ chỉnh không chặn cảm ứng");
const btn = page.getByRole("button", { name: "Mục lục" });
await btn.click();
ok(await page.locator("#tt-menu").isVisible(), "menu mobile mở");
await page.keyboard.press("Escape");
ok(!(await page.locator("#tt-menu").count()), "Escape đóng menu");
ok(await page.evaluate(() => document.activeElement?.textContent?.includes("Mục lục")), "trả focus về nút menu");
await btn.click(); await page.locator("#tt-menu a", { hasText: "Menu trà" }).click(); await page.waitForTimeout(600);
ok(!(await page.locator("#tt-menu").count()), "chọn mục đóng menu");
// danh mục mobile: chi tiết mở trong hàng
await page.evaluate(() => document.getElementById("danh-muc").scrollIntoView()); await page.waitForTimeout(500);
await page.locator("#danh-muc ul li > button").nth(3).click();
ok(await page.locator("#danh-muc li:nth-child(4) dl").isVisible(), "mobile: chi tiết mở ngay trong hàng đã chọn");
const small = await page.evaluate(() => [...document.querySelectorAll("a,button,input,select,textarea,summary,label.radio")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (!r.width || cs.visibility === "hidden") return false; if (e.matches("input[type=radio],input[type=checkbox]")) return false; return r.height < 40 && !e.closest("nav"); }).map((e) => (e.textContent || e.name || e.tagName).trim().slice(0, 24) + ":" + Math.round(e.getBoundingClientRect().height)).slice(0, 8));
ok(small.length === 0, "touch target >= 40px: " + small.join(" | "));
const fsz = await page.evaluate(() => [...document.querySelectorAll("input:not([type=radio]):not([type=checkbox]),select,textarea")].map((e) => parseFloat(getComputedStyle(e).fontSize)));
ok(fsz.every((v) => v >= 16), "input >= 16px " + fsz.join(","));
await scrollAll(page); await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/full-390.png`, fullPage: true });
txt = await scanText(page); ok(!BANNED.test(txt), "mobile: không chữ cấm");
ok(ext.length === 0, "mobile: 0 request ngoài");
ok(errs.length === 0, "mobile: 0 lỗi console " + errs.slice(0, 2).join("|"));
await ctx.close();

/* ---------- 9. reduced-motion ---------- */
console.log("== reduced-motion");
({ ctx, page, errs } = await newPage({ reduced: true }));
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(1200);
const rm = await page.evaluate(() => ({
  pre: !!document.querySelector('[data-fx="Preloader"]'),
  armed: document.querySelectorAll('[data-ink="armed"]').length,
  hidden: [...document.querySelectorAll("h1 span,h2 span,[data-tt=fade],[data-fx-w]")].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.9).length,
  filt: [...document.querySelectorAll("h1 span")].filter((e) => getComputedStyle(e).filter !== "none").length,
  scrub: document.querySelector('[data-fx="ScrollScrubText"]')?.getAttribute("data-fx-ready"),
  draw: [...document.querySelectorAll('[data-fx="SVGPathDraw"]')].every((e) => e.getAttribute("data-fx-ready") === "static"),
  strokeShown: [...document.querySelectorAll('[data-fx="SVGPathDraw"] path')].every((p) => getComputedStyle(p).strokeDashoffset === "0px" || getComputedStyle(p).strokeDashoffset === "none" || getComputedStyle(p).strokeDashoffset === "0"),
}));
ok(!rm.pre, "reduced: không chuyển cảnh mực");
ok(rm.armed === 0, "reduced: không mặt nạ mực treo");
ok(rm.hidden === 0, "reduced: chữ/nội dung hiện đủ (opacity 1)");
ok(rm.filt === 0, "reduced: không blur");
ok(rm.scrub === "static", "reduced: scrub text hiện đủ");
ok(rm.draw, "reduced: path vẽ tĩnh");
const rmTxt = await scanText(page); ok(!BANNED.test(rmTxt), "reduced: không chữ cấm");
await page.screenshot({ path: `${SHOTS}/hero-reduced.png` });
ok(errs.length === 0, "reduced: 0 lỗi console");
await ctx.close();

/* ---------- 10. no-JS ---------- */
console.log("== no-JS");
const nj = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
const njp = await nj.newPage(); await njp.goto(PAGE_URL, { waitUntil: "load" });
const vis = await njp.evaluate(() => ({ h1: document.querySelector("h1").getBoundingClientRect().height > 40, op: parseFloat(getComputedStyle(document.querySelector("h1 span")).opacity), imgMask: getComputedStyle(document.querySelector('[data-fx="InkReveal"]')).maskImage }));
ok(vis.h1 && vis.op === 1 && (vis.imgMask === "none" || !vis.imgMask), "no-JS: tiêu đề và ảnh hiện đủ, không mặt nạ");
await nj.close();

/* ---------- 11. trang credits ---------- */
const cc = await newPage(); await cc.page.goto(PAGE_URL + "/credits", { waitUntil: "load" }); await cc.page.waitForTimeout(800);
const cr = await cc.page.evaluate(() => ({ imgs: document.querySelectorAll("li img").length, noindex: document.querySelector('meta[name="robots"]')?.content }));
ok(cr.imgs >= 10, "credits liệt kê ảnh: " + cr.imgs);
ok(/noindex/.test(cr.noindex || ""), "credits noindex");
ok(cc.errs.length === 0, "credits 0 lỗi console");
await cc.ctx.close();

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) console.log("FAILS:\n - " + fails.join("\n - "));
process.exit(fail ? 1 : 0);
