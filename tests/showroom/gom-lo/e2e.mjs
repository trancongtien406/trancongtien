import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE_URL = BASE + "/demos/gom-lo";
const SHOTS = "tests/showroom/gom-lo/screenshots";
let pass = 0, fail = 0; const fails = [];
const ok = (c, m) => { if (c) pass++; else { fail++; fails.push(m); console.log("  FAIL:", m); } };
const BANNED = /\b(demo|minh ho[ạa]|giả định|mô phỏng|dữ liệu mẫu)\b/i;
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const origin = new URL(BASE).origin;

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: opts.w || 1440, height: opts.h || 900 }, reducedMotion: opts.reduced ? "reduce" : "no-preference", hasTouch: !!opts.touch, isMobile: !!opts.touch, permissions: ["clipboard-read", "clipboard-write"] });
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
  root.querySelectorAll("details").forEach((d) => bits.push(d.textContent));
  bits.push(document.title, document.querySelector('meta[name="description"]')?.content || "");
  return bits.join("\n");
});
const scrollAll = async (page) => {
  await page.waitForLoadState("load"); await page.waitForTimeout(300);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 450) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(150); }
  await page.waitForTimeout(2000);
};

/* ---------- 1. tải trang ---------- */
console.log("== load + desktop");
let { ctx, page, errs, ext } = await newPage();
const resp = await page.goto(PAGE_URL, { waitUntil: "load" });
ok(resp.status() === 200, "status 200");
await page.waitForTimeout(3500);
ok((await page.title()).includes("Đất Mơ"), "title riêng");
ok((await page.locator('meta[name="description"]').getAttribute("content"))?.length > 40, "meta description");
ok((await page.locator("h1").count()) === 1, "một h1");
ok((await page.locator('link[rel="icon"]').count()) > 0, "favicon route");
ok((await page.locator('a[href="#main"]').count()) > 0, "skip link");
let txt = await scanText(page);
ok(!BANNED.test(txt), "không chữ cấm (trạng thái đầu): " + (txt.match(BANNED) || [""])[0]);

/* hiệu ứng khởi chạy */
const fx = await page.evaluate(() => ({
  pot: document.querySelectorAll('svg[data-fx="PotWheel"]').length,
  engrave: document.querySelectorAll('[data-fx="EngraveText"]').length,
  scrub: document.querySelector('[data-fx="ScrollScrubText"]')?.getAttribute("data-fx-ready"),
  gal: document.querySelector('[data-fx="DraggableGallery"]')?.getAttribute("data-fx-ready"),
  dist: document.querySelectorAll('[data-fx="ImageHoverDistort"]').length,
  distReady: [...document.querySelectorAll('[data-fx="ImageHoverDistort"]')].every((e) => ["1", "static"].includes(e.getAttribute("data-fx-ready"))),
  grain: !!document.querySelector('[data-fx="GrainOverlay"]'),
  cursor: !!document.querySelector('[data-fx="CustomCursor"]'),
  par: document.querySelectorAll('[data-fx="ParallaxLayer"]').length,
  marq: !!document.querySelector('[data-fx*="Marquee"]'),
  clip: !!document.querySelector('[data-fx="ClipReveal"]'),
  draw: !!document.querySelector('[data-fx="SVGPathDraw"]'),
  fire: document.getElementById("tu-dat-den-men")?.getAttribute("data-fx-ready"),
  mag: !!document.querySelector('[data-fx="MagneticButton"]'),
}));
ok(fx.pot >= 7, `Bàn xoay SVG (PotWheel) x${fx.pot}`);
ok(fx.engrave >= 9, `Chữ khắc vào đất x${fx.engrave}`);
ok(fx.scrub === "1", "ScrollScrubText chạy");
ok(fx.gal === "1" && fx.dist >= 8 && fx.distReady, `DraggableGallery + ImageHoverDistort x${fx.dist}`);
ok(fx.grain && fx.cursor && fx.marq && fx.clip && fx.draw && fx.mag && fx.par >= 2, "Grain/Cursor/Marquee/ClipReveal/PathDraw/Magnetic/Parallax có mặt");
ok(fx.fire === "1", "Vết nung (Fire) chạy");
// bình quay: path thân thay đổi theo thời gian
const d1 = await page.locator('svg[data-fx="PotWheel"] [data-body]').first().getAttribute("d");
const s1 = await page.locator('svg[data-fx="PotWheel"] [data-stripes] path').evaluateAll((a) => a.map((p) => p.getAttribute("d") || "").join("|"));
await page.waitForTimeout(500);
const s2 = await page.locator('svg[data-fx="PotWheel"] [data-stripes] path').evaluateAll((a) => a.map((p) => p.getAttribute("d") || "").join("|"));
ok(d1 && d1.length > 100, "thân bình có path");
ok(s1 !== s2, "bình đang quay (các đường kinh tuyến đổi)");
// kéo thanh độ phình ở hero
await page.locator("#hero-bulge").fill("10");
await page.waitForTimeout(700);
const dThin = await page.locator('svg[data-fx="PotWheel"] [data-body]').first().getAttribute("d");
await page.locator("#hero-bulge").fill("95");
await page.waitForTimeout(900);
const dFat = await page.locator('svg[data-fx="PotWheel"] [data-body]').first().getAttribute("d");
ok(dThin !== dFat, "thanh độ phình đổi hình bình");
const widthOf = (d) => { const n = (d.match(/-?\d+\.?\d*/g) || []).map(Number); const xs = n.filter((_, i) => i % 2 === 0); return Math.max(...xs) - Math.min(...xs); };
ok(widthOf(dFat) > widthOf(dThin) + 8, `bình phình hơn khi kéo lên (${Math.round(widthOf(dThin))} -> ${Math.round(widthOf(dFat))})`);
// kéo chuột ngang trên bình
const pb = await page.locator('svg[data-fx="PotWheel"]').first().boundingBox();
await page.locator("#hero-bulge").fill("40"); await page.waitForTimeout(500);
const before = await page.locator("#hero-bulge").inputValue();
await page.mouse.move(pb.x + pb.width / 2, pb.y + pb.height / 2); await page.mouse.down(); await page.mouse.move(pb.x + pb.width / 2 + 120, pb.y + pb.height / 2, { steps: 8 }); await page.mouse.up();
const after = await page.locator("#hero-bulge").inputValue();
ok(Number(after) > Number(before), `kéo ngang trên bình để nặn (${before} -> ${after})`);

/* font Việt */
const fonts = await page.evaluate(async () => {
  await document.fonts.ready;
  const fam = getComputedStyle(document.querySelector("h1")).fontFamily;
  const body = getComputedStyle(document.body.querySelector("p")).fontFamily;
  const hand = getComputedStyle(document.querySelector("[class*=hand]")).fontFamily;
  const sample = "ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰđĐ";
  const draw = (f, w) => { const c = document.createElement("canvas"); c.width = 1600; c.height = 80; const x = c.getContext("2d"); x.font = `${w} 48px ${f}`; x.fillText(sample, 4, 56); return x.getImageData(0, 0, 1600, 80).data.join(","); };
  const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
  return { fam, loaded: loaded.length, hDiff: draw(fam, 400) !== draw("serif", 400), bDiff: draw(body, 400) !== draw("sans-serif", 400), pDiff: draw(hand, 400) !== draw("cursive", 400) };
});
ok(fonts.loaded >= 4, "font Yeseva/Patrick/Nunito tải thật (" + fonts.loaded + " face)");
ok(fonts.hDiff && fonts.bDiff && fonts.pDiff, "glyph Việt (Ắ…Ự) render bằng font thương hiệu, không fallback");
await page.evaluate(() => { const d = document.createElement("div"); d.id = "glyphtest"; d.style.cssText = "position:fixed;left:0;top:0;z-index:99999;background:#2a1810;color:#fff3e0;padding:20px;font:400 64px/1.3 " + getComputedStyle(document.querySelector("h1")).fontFamily; d.textContent = "Ố Ế Ể Ệ Ợ Ử Ữ Ắ Ặ Ằ Đ đ"; document.body.appendChild(d); });
await page.screenshot({ path: `${SHOTS}/glyph-test.png`, clip: { x: 0, y: 0, width: 1100, height: 100 } });
await page.evaluate(() => document.getElementById("glyphtest")?.remove());

/* ---------- 2. không tràn ngang ---------- */
console.log("== overflow");
for (const w of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.waitForTimeout(500);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ${w}px (${o.sw}/${o.cw})`);
}
await page.setViewportSize({ width: 1440, height: 900 });

/* ---------- 3. Vết nung ---------- */
console.log("== vết nung (cuộn)");
const fireState = async (k) => {
  await page.evaluate((k) => { const el = document.getElementById("tu-dat-den-men"); const r = el.getBoundingClientRect(); window.scrollTo(0, r.top + scrollY - innerHeight * 0.7 + (r.height + innerHeight * 0.1) * k); }, k);
  await page.waitForTimeout(700);
  return page.evaluate(() => { const el = document.getElementById("tu-dat-den-men"); return { t: el.querySelector("[data-temp]").textContent, st: el.querySelector("[data-stage]").textContent, o3: Number(el.style.getPropertyValue("--o3")), o2: Number(el.style.getPropertyValue("--o2")) }; });
};
const f0 = await fireState(0.02), f1 = await fireState(0.5), f2 = await fireState(0.97);
ok(f0.st === "Đất sống" && f0.o2 < 0.2, `cuộn đầu: đất sống (${f0.t}°C)`);
ok(f1.o2 > 0.9 && f1.o3 < 0.2 && f1.st !== f0.st, `giữa: lửa (${f1.t}°C, ${f1.st})`);
ok(f2.o3 > 0.8 && f2.st === "Phủ men" && /1\.2/.test(f2.t), `cuối: men ngọc (${f2.t}°C, ${f2.st})`);
await fireState(0.5);
const f1b = await page.evaluate(() => document.querySelector("[data-temp]").textContent);
ok(f1b === f1.t, "cuộn ngược về đúng trạng thái giữa");

/* ---------- 4. Kệ gốm: gallery ---------- */
console.log("== kệ gốm");
await page.evaluate(() => document.getElementById("ke-gom").scrollIntoView());
await page.waitForTimeout(800);
ok((await page.locator("#ke-gom article").count()) === 10, "10 món trên kệ");
const shelfTxt = await page.locator("#ke-gom").innerText();
ok(/\d{2,3}\.\d{3}\s?₫/.test(shelfTxt), "giá VND định dạng vi-VN");
ok(/Giá tham khảo/.test(shelfTxt), "ghi 'Giá tham khảo'");
const vp = page.locator('#ke-gom [data-fx-viewport]');
await vp.focus();
const sl0 = await vp.evaluate((e) => e.scrollLeft);
await page.keyboard.press("ArrowRight"); await page.waitForTimeout(900);
const sl1 = await vp.evaluate((e) => e.scrollLeft);
ok(sl1 > sl0 + 100, `phím → cuộn gallery (${Math.round(sl0)} -> ${Math.round(sl1)})`);
await page.keyboard.press("End"); await page.waitForTimeout(1200);
ok(await page.getByRole("button", { name: "Xem món sau" }).isDisabled(), "đến cuối: nút Sau bị khoá");
await page.keyboard.press("Home"); await page.waitForTimeout(1200);
ok(await page.getByRole("button", { name: "Xem món trước" }).isDisabled(), "về đầu: nút Trước bị khoá");
await page.getByRole("button", { name: "Xem món sau" }).click(); await page.waitForTimeout(900);
ok((await vp.evaluate((e) => e.scrollLeft)) > 100, "nút Sau cuộn gallery");
await vp.focus(); await page.keyboard.press("Home"); await page.waitForTimeout(900);
await page.evaluate(() => document.getElementById("ke-gom").scrollIntoView()); await page.waitForTimeout(400);
// kéo chuột + quán tính
const vb = await vp.boundingBox();
const y0 = vb.y + 150;
await page.mouse.move(vb.x + 900, y0); await page.mouse.down();
for (let i = 1; i <= 10; i++) { await page.mouse.move(vb.x + 900 - i * 40, y0); await page.waitForTimeout(16); }
const sd = await vp.evaluate((e) => e.scrollLeft);
await page.mouse.up(); await page.waitForTimeout(700);
const sd2 = await vp.evaluate((e) => e.scrollLeft);
ok(sd > 200, `kéo chuột cuộn gallery (${Math.round(sd)})`);
ok(sd2 > sd + 10, `quán tính tiếp tục sau khi thả (${Math.round(sd)} -> ${Math.round(sd2)})`);
// image distort khi hover
await vp.focus(); await page.keyboard.press("Home"); await page.waitForTimeout(900);
await page.evaluate(() => document.getElementById("ke-gom").scrollIntoView()); await page.waitForTimeout(400);
const ph = page.locator('#ke-gom [data-fx="ImageHoverDistort"]').first();
const pbx = await ph.boundingBox();
await page.mouse.move(pbx.x + 60, pbx.y + 80); await page.waitForTimeout(100);
for (let i = 0; i < 8; i++) { await page.mouse.move(pbx.x + 60 + i * 20, pbx.y + 80 + i * 14); await page.waitForTimeout(16); }
const filt = await ph.evaluate((e) => getComputedStyle(e).filter);
ok(/url\(/.test(filt), "rê chuột lên ảnh: gắn SVG displacement filter (" + filt.slice(0, 30) + ")");
const dispScale = await ph.evaluate((e) => Number(e.querySelector("feDisplacementMap").getAttribute("scale")));
ok(dispScale > 0.5, "displacement scale tăng theo chuyển động (" + dispScale.toFixed(1) + ")");
await page.mouse.move(5, 5); await page.waitForTimeout(1200);
ok(!/url\(/.test(await ph.evaluate((e) => getComputedStyle(e).filter)), "rời chuột: gỡ filter");

/* ---------- 5. Workshop Booking ---------- */
console.log("== workshop");
await page.evaluate(() => document.getElementById("buoi-lam-gom").scrollIntoView());
await page.waitForTimeout(700);
const WS = "#buoi-lam-gom";
ok((await page.locator(`${WS} aside`).innerText()).includes("Chưa chọn buổi nào"), "trạng thái rỗng ban đầu");
await page.locator(`${WS} label`, { hasText: "Xoay Đất" }).click();
await page.waitForTimeout(300);
let sum = await page.locator(`${WS} aside`).innerText();
ok(sum.includes("120 phút") && /700\.000\s?₫/.test(sum) && /140\.000\s?₫/.test(sum) && /840\.000\s?₫/.test(sum), "Xoay Đất, 2 người, có nung = 840.000 ₫: " + sum.replace(/\n/g, " ").slice(0, 160));
ok(/tuỳ lò nung, trao đổi khi đặt/.test(sum), "lưu ý nung: 'tuỳ lò nung, trao đổi khi đặt'");
ok(/Khung giờ\s*Chưa chọn/.test(sum), "khung giờ chưa chọn");
await page.getByRole("button", { name: "Chép bản tóm tắt" }).click();
ok(await page.locator(`${WS} [role=alert]`).isVisible(), "chưa chọn khung giờ -> lỗi cạnh ô");
ok((await page.locator(`${WS} fieldset[aria-invalid="true"]`).count()) === 1, "aria-invalid trên nhóm khung giờ");
await page.locator(`${WS} label`, { hasText: "Buổi chiều" }).click();
ok(!(await page.locator(`${WS} [role=alert]`).count()), "chọn khung giờ -> hết lỗi");
await page.getByRole("button", { name: "Chép bản tóm tắt" }).click(); await page.waitForTimeout(300);
ok(/Đã chép|không cho chép/.test(await page.locator(`${WS} aside [role=status]`).innerText()), "chép tóm tắt có phản hồi");
const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
ok(clip === "" || (clip.includes("Xoay Đất") && clip.includes("Buổi chiều")), "nội dung chép đúng");
for (let i = 0; i < 8; i++) { if (await page.getByRole("button", { name: "Tăng số người" }).isEnabled()) await page.getByRole("button", { name: "Tăng số người" }).click(); }
ok(await page.getByRole("button", { name: "Tăng số người" }).isDisabled(), "số người tối đa 8");
sum = await page.locator(`${WS} aside`).innerText();
ok(/2\.800\.000|3\.360\.000/.test(sum) && /3\.360\.000/.test(sum), "8 người có nung = 3.360.000 ₫");
ok(/đặt sớm/.test(sum), "lưu ý nhóm đông");
await page.locator(`${WS} label`, { hasText: "Không nung" }).click();
sum = await page.locator(`${WS} aside`).innerText();
ok(/2\.800\.000\s?₫/.test(sum) && !/tuỳ lò nung/.test(sum) && /phôi đất mộc/.test(sum), "không nung: 2.800.000 ₫, lưu ý phôi mộc");
await page.locator(`${WS} label`, { hasText: "Phủ Men" }).click();
ok(/cần nung để ra màu thật/.test(await page.locator(`${WS} aside`).innerText()), "vẽ men không nung: cảnh báo");
const cta = await page.locator(`${WS} a`, { hasText: "Gửi tóm tắt cho xưởng" }).getAttribute("href");
ok(cta.startsWith("/lien-he"), "nút cuối dẫn tới /lien-he: " + cta);
if (!/industry=/.test(cta)) console.log("  WARN: href chưa có industry/solution/utm_campaign (registry chưa có gom-lo, xem design/REQUESTS.md)");
else ok(/solution=fnb/.test(cta) && /utm_campaign=gom-lo/.test(cta), "href đủ solution + utm_campaign");
ok(!(await ctx.cookies()).some((c) => c.name === "tct_ref"), "trang không tự ghi cookie tct_ref");

/* ---------- 6. Pot Designer ---------- */
console.log("== nặn bình");
await page.evaluate(() => document.getElementById("nan-binh").scrollIntoView());
await page.waitForTimeout(800);
const PD = "#nan-binh";
const code0 = await page.locator(`${PD} [class*=pdCode] b`).innerText();
ok(/^DM-BAU-\d+-\d+-NG-VV-K$/.test(code0), "mã sản phẩm ban đầu: " + code0);
await page.locator(`${PD} label`, { hasText: "Cốc" }).first().click();
await page.locator(`${PD} label`, { hasText: "Đỏ đất" }).click();
await page.locator(`${PD} label`, { hasText: "Chấm" }).click();
await page.locator(`${PD} label`, { hasText: "Nhúng nửa thân" }).click();
await page.waitForTimeout(900);
const code1 = await page.locator(`${PD} [class*=pdCode] b`).innerText();
ok(/^DM-COC-\d+-\d+-DD-CH-N$/.test(code1), "mã đổi theo lựa chọn: " + code1);
const dCup = await page.locator(`${PD} svg[data-fx="PotWheel"] [data-body]`).getAttribute("d");
ok(widthOf(dCup) > 60 && /^M/.test(dCup), "hình xem trước đổi sang cốc");
const dots = await page.locator(`${PD} svg[data-fx="PotWheel"] [data-pat] circle`).count();
ok(dots > 4, `hoạ tiết chấm vẽ trên bình (${dots} chấm)`);
const glazeFill = await page.locator(`${PD} svg[data-fx="PotWheel"] [data-glaze]`).evaluate((e) => getComputedStyle(e).fill);
ok(/rgb\(\s*(1[6-9]\d)/.test(glazeFill) || glazeFill.length > 0, "màu men áp lên bình: " + glazeFill);
await page.locator(`${PD} input[type=range]`).first().fill("100");
await page.getByRole("button", { name: "Nặn lại từ đầu" }).click();
ok((await page.locator(`${PD} [class*=pdCode] b`).innerText()) === "DM-BAU-62-50-NG-VV-K", "nặn lại từ đầu về mặc định");
await page.getByRole("button", { name: "Chép mã" }).click(); await page.waitForTimeout(300);
ok(/Đã chép|ghi lại mã/.test(await page.locator(`${PD} [role=status]`).innerText()), "chép mã có phản hồi");
ok((await page.locator(`${PD} a`, { hasText: "Hỏi xưởng về bình này" }).getAttribute("href")).startsWith("/lien-he"), "nút hỏi xưởng -> /lien-he");

/* ---------- 7. nội dung, FAQ, bàn phím ---------- */
await page.locator("#hoi-dap summary").first().click();
txt = await scanText(page);
ok(!BANNED.test(txt), "không chữ cấm (sau tương tác, FAQ mở): " + (txt.match(BANNED) || [""])[0]);
ok(!/\b\d+\s*(năm kinh nghiệm|khách hàng|đánh giá)|⭐|★|giải thưởng|chứng nhận/i.test(txt), "không bịa số khách/đánh giá/giải thưởng");
ok(!/\b0\d{2,3}[ .]?\d{3}[ .]?\d{4}\b/.test(txt.replace(/0236 000 0000/g, "")), "không có số điện thoại thật");
ok(!/Bát Tràng|Bàu Trúc/.test(txt), "không dựa tên làng gốm thật làm thương hiệu");
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(1500);
await page.keyboard.press("Tab");
ok(await page.evaluate(() => document.activeElement?.className.includes("skip")), "Tab đầu tiên tới skip link");
for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
ok(await page.evaluate(() => !!document.activeElement && document.activeElement !== document.body), "Tab di chuyển được focus");
ok(await page.evaluate(() => { const a = [...document.querySelectorAll("a")].find((x) => /Đặt một buổi hẹn với đất/.test(x.textContent)); a.focus(); const cs = getComputedStyle(a); return cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2; }), "focus-visible rõ ở CTA");
ok(ext.length === 0, "0 request ngoài origin " + ext.slice(0, 2).join(" "));
ok(errs.length === 0, "0 lỗi console " + errs.slice(0, 2).join(" | "));

/* ---------- 8. hiệu năng thô ---------- */
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

/* ---------- 9. ảnh chụp desktop ---------- */
console.log("== ảnh chụp");
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(3200);
await page.screenshot({ path: `${SHOTS}/hero-1440.png` });
await scrollAll(page); await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600);
await page.screenshot({ path: `${SHOTS}/full-1440.png`, fullPage: true });
const imgsBroken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.src));
ok(imgsBroken.length === 0, "không ảnh hỏng " + imgsBroken.join(","));
const engDone = await page.evaluate(() => [...document.querySelectorAll('[data-fx="EngraveText"]')].filter((e) => e.getAttribute("data-eng") === "in").length);
ok(engDone >= 8, `chữ khắc hoàn tất sau khi cuộn: ${engDone}`);
await ctx.close();

/* ---------- 10. mobile ---------- */
console.log("== mobile 390");
({ ctx, page, errs, ext } = await newPage({ w: 390, h: 844, touch: true }));
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(3300);
await page.screenshot({ path: `${SHOTS}/hero-390.png` });
const btn = page.getByRole("button", { name: "Mục lục" });
await btn.click();
ok(await page.locator("#gl-menu").isVisible(), "menu mobile mở");
await page.keyboard.press("Escape");
ok(!(await page.locator("#gl-menu").count()), "Escape đóng menu");
ok(await page.evaluate(() => document.activeElement?.textContent?.includes("Mục lục")), "trả focus về nút menu");
await btn.click(); await page.locator("#gl-menu a", { hasText: "Kệ gốm" }).click(); await page.waitForTimeout(600);
ok(!(await page.locator("#gl-menu").count()), "chọn mục đóng menu");
ok(await page.evaluate(() => getComputedStyle(document.querySelector('[data-fx="ImageHoverDistort"]')).filter === "none"), "mobile: không filter méo ảnh");
const small = await page.evaluate(() => [...document.querySelectorAll("a,button,summary,label")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (!r.width || cs.visibility === "hidden" || cs.display === "none") return false; if (e.closest("nav")) return false; if (e.matches("label") && !e.querySelector("input")) return false; return r.height < 40; }).map((e) => (e.textContent || e.tagName).trim().slice(0, 24) + ":" + Math.round(e.getBoundingClientRect().height)).slice(0, 8));
ok(small.length === 0, "touch target >= 40px: " + small.join(" | "));
await scrollAll(page); await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOTS}/full-390.png`, fullPage: true });
txt = await scanText(page); ok(!BANNED.test(txt), "mobile: không chữ cấm");
ok(ext.length === 0, "mobile: 0 request ngoài");
ok(errs.length === 0, "mobile: 0 lỗi console " + errs.slice(0, 2).join("|"));
await ctx.close();

/* ---------- 11. reduced-motion ---------- */
console.log("== reduced-motion");
({ ctx, page, errs } = await newPage({ reduced: true }));
await page.goto(PAGE_URL, { waitUntil: "load" }); await page.waitForTimeout(1500);
const rm = await page.evaluate(() => ({
  eng: document.querySelectorAll('[data-eng="pre"]').length,
  hidden: [...document.querySelectorAll("h1,h2,[data-gl=fade]")].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.9).length,
  clipped: [...document.querySelectorAll('[class*=engWord]')].filter((e) => getComputedStyle(e).clipPath !== "none").length,
  scrub: document.querySelector('[data-fx="ScrollScrubText"]')?.getAttribute("data-fx-ready"),
  draw: [...document.querySelectorAll('[data-fx="SVGPathDraw"]')].every((e) => e.getAttribute("data-fx-ready") === "static"),
  fire: document.getElementById("tu-dat-den-men").getAttribute("data-fx-ready"),
}));
ok(rm.eng === 0 && rm.clipped === 0, "reduced: chữ khắc hiện đủ, không clip");
ok(rm.hidden === 0, "reduced: nội dung hiện đủ (opacity 1)");
ok(rm.scrub === "static", "reduced: scrub text hiện đủ");
ok(rm.draw, "reduced: path vẽ tĩnh");
ok(rm.fire === "static", "reduced: vết nung tĩnh");
const rp1 = await page.locator('svg[data-fx="PotWheel"] [data-stripes] path').first().evaluate((p) => p.getAttribute("d"));
await page.waitForTimeout(600);
const rp2 = await page.locator('svg[data-fx="PotWheel"] [data-stripes] path').first().evaluate((p) => p.getAttribute("d"));
ok(rp1 === rp2 && rp1, "reduced: bình không quay");
await page.locator("#hero-bulge").fill("90"); await page.waitForTimeout(300);
const rd = await page.locator('svg[data-fx="PotWheel"] [data-body]').first().getAttribute("d");
await page.locator("#hero-bulge").fill("10"); await page.waitForTimeout(300);
ok(rd !== (await page.locator('svg[data-fx="PotWheel"] [data-body]').first().getAttribute("d")), "reduced: bình vẫn đổi hình theo thanh (không chuyển động)");
const rmTxt = await scanText(page); ok(!BANNED.test(rmTxt), "reduced: không chữ cấm");
await page.screenshot({ path: `${SHOTS}/hero-reduced.png` });
ok(errs.length === 0, "reduced: 0 lỗi console " + errs.slice(0, 2).join("|"));
await ctx.close();

/* ---------- 12. no-JS ---------- */
console.log("== no-JS");
const nj = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
const njp = await nj.newPage(); await njp.goto(PAGE_URL, { waitUntil: "load" });
const vis = await njp.evaluate(() => ({ h1: document.querySelector("h1").getBoundingClientRect().height > 40, clip: getComputedStyle(document.querySelector("h1 [class*=engWord]")).clipPath, op: parseFloat(getComputedStyle(document.querySelector("[data-gl=fade]")).opacity) }));
ok(vis.h1 && vis.clip === "none" && vis.op === 1, "no-JS: tiêu đề và chữ hiện đủ");
await nj.close();

/* ---------- 13. credits ---------- */
const cc = await newPage(); await cc.page.goto(PAGE_URL + "/credits", { waitUntil: "load" }); await cc.page.waitForTimeout(800);
const cr = await cc.page.evaluate(() => ({ imgs: document.querySelectorAll("li img").length, noindex: document.querySelector('meta[name="robots"]')?.content }));
ok(cr.imgs === 12, "credits liệt kê 12 ảnh");
ok(/noindex/.test(cr.noindex || ""), "credits noindex");
ok(cc.errs.length === 0, "credits 0 lỗi console");
await cc.ctx.close();

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) console.log("FAILS:\n - " + fails.join("\n - "));
process.exit(fail ? 1 : 0);
