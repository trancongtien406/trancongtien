// E2E Miên An Wellness (/demos/mien-an). Chạy: node tests/showroom/mien-an/e2e.mjs
// BASE mặc định http://localhost:3100 (dev server dùng chung; 127.0.0.1 bị Next dev chặn hydrate, xem design/REQUESTS.md)
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.join(here, "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });
const BASE = process.env.BASE || "http://localhost:3100";
const URL_HOME = `${BASE}/demos/mien-an`;
const IGNORE = /WebSocket connection|webpack-hmr|Download the React DevTools/;

let pass = 0, fail = 0;
const results = [];
const ok = (name, cond, extra = "") => {
  (cond ? pass++ : fail++);
  results.push({ name, ok: !!cond, extra: String(extra) });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra && !cond ? "  -> " + extra : ""}`);
};


// Chính sách nhãn (AGENT-RULES mục 11): không còn nhãn "Demo"/"minh hoạ"/"giả định"/"mô phỏng" ở bất kỳ chỗ nào người dùng thấy.
const BANNED = /\bdemo\b|minh ho[aạ]|minh hoạ|giả định|mô phỏng|dữ liệu mẫu|không phải doanh nghiệp|thương hiệu minh|illustrative|fictional|sample data|mock/i;
async function bannedHits(page, root = "[data-site]") {
  return page.evaluate(({ root, src }) => {
    const re = new RegExp(src, "i");
    const out = [];
    const r = document.querySelector(root) || document.body;
    const clone = r.cloneNode(true);
    clone.querySelectorAll("script,style").forEach((n) => n.remove());
    const texts = [clone.textContent || "", r.innerText || ""];
    r.querySelectorAll("[aria-label],[alt],[title],[placeholder]").forEach((e) => ["aria-label", "alt", "title", "placeholder"].forEach((a) => e.getAttribute(a) && texts.push(e.getAttribute(a))));
    document.querySelectorAll('title,meta[name="description"],meta[property^="og:"],meta[name^="twitter:"]').forEach((m) => texts.push(m.content || m.textContent || ""));
    document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => texts.push(s.textContent || ""));
    for (const t of texts) { const n = t.normalize("NFC"); const m = n.match(re); if (m) out.push(m[0] + " … " + n.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, " ")); }
    return out;
  }, { root, src: BANNED.source });
}
const noBanned = async (page, label, root) => { const h = await bannedHits(page, root); ok(`không còn nhãn cấm: ${label}`, h.length === 0, h.slice(0, 3).join(" || ")); };

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  const errors = [], external = [], nonGet = [];
  page.on("console", (m) => { if (["error"].includes(m.type()) && !IGNORE.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("request", (r) => {
    const u = new globalThis.URL(r.url());
    if (!u.href.startsWith(BASE) && !u.protocol.startsWith("data") && !u.protocol.startsWith("blob")) external.push(r.url());
    if (r.method() !== "GET" && !/_next|__nextjs/.test(r.url())) nonGet.push(r.method() + " " + r.url());
  });
  return { ctx, page, errors, external, nonGet };
}
async function load(page, url = URL_HOME) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelectorAll('input[name="date"]').length > 0, null, { timeout: 30000 });
}
async function scrollAll(page) {
  const H = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 450) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(90); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
}
const shot = async (page, name, full = false, target = null) => {
  if (target) await page.locator(target).first().evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(550);
  await page.screenshot({ path: path.join(SHOTS, name), fullPage: full });
};

// ───────────────────────── 1. Tải trang, metadata, console, request ngoài
{
  const { ctx, page, errors, external, nonGet } = await newPage();
  const resp = await page.goto(URL_HOME + "?ref=TESTREF", { waitUntil: "load" });
  ok("home trả 200", resp.status() === 200, resp.status());
  await page.waitForFunction(() => document.querySelectorAll('input[name="date"]').length > 0, null, { timeout: 30000 });
  const meta = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content,
    robots: document.querySelector('meta[name="robots"]')?.content,
    lang: document.documentElement.lang,
    h1: document.querySelectorAll("h1").length,
    icons: [...document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"]')].map((l) => l.getAttribute("href")),
    og: document.querySelector('meta[property="og:image"]')?.content,
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].filter((s) => /Miên An/.test(s.textContent)).map((s) => JSON.parse(s.textContent)["@type"]),
    jsonldBad: [...document.querySelectorAll('script[type="application/ld+json"]')].filter((s) => /Miên An/.test(s.textContent)).some((s) => /Review|AggregateRating|LocalBusiness|Offer|DaySpa|address|telephone|openingHours/.test(s.textContent)),
    skip: !!document.querySelector('a[href="#main"]'),
    main: !!document.querySelector("main#main"),
    ribbon: document.body.innerText.includes("Spa & wellness"),
  }));
  ok("title riêng tiếng Việt", /Miên An/.test(meta.title), meta.title);
  ok("description riêng", /Miên An/.test(meta.desc || ""));
  ok("robots noindex,follow", /noindex/.test(meta.robots || "") && /follow/.test(meta.robots || ""), meta.robots);
  ok("html lang=vi", meta.lang === "vi");
  ok("đúng 1 h1", meta.h1 === 1, meta.h1);
  ok("favicon theo route (svg + png + apple)", meta.icons.some((h) => /mien-an.*favicon\.svg/.test(h)) && meta.icons.some((h) => /favicon-32\.png/.test(h)) && meta.icons.some((h) => /apple-touch-icon/.test(h)), meta.icons.join(","));
  ok("og:image riêng", /mien-an\/identity\/og-image\.webp/.test(meta.og || ""), meta.og);
  ok("JSON-LD chỉ WebPage (không Review/LocalBusiness)", meta.jsonld.length === 1 && meta.jsonld[0] === "WebPage" && !meta.jsonldBad, meta.jsonld.join());
  ok("skip link + main + ribbon thương hiệu", meta.skip && meta.main && meta.ribbon);
  for (const f of ["favicon.svg", "favicon-32.png", "apple-touch-icon.png", "og-image.webp", "logo-primary.svg", "logo-horizontal.svg", "symbol.svg", "logo-mono.svg", "logo-reversed.svg"]) {
    const r = await page.request.get(`${BASE}/images/demos/mien-an/identity/${f}`);
    ok(`identity/${f} tải được`, r.status() === 200);
  }
  const svg = await (await page.request.get(`${BASE}/images/demos/mien-an/identity/logo-primary.svg`)).text();
  ok("logo SVG không script/href ngoài/font ngoài", !/<script|href=|@import|font-family|<text/i.test(svg));
  await scrollAll(page);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
  ok("mọi ảnh tải thành công", broken.length === 0, broken.join(" "));
  const noAlt = await page.evaluate(() => [...document.images].filter((i) => i.alt === null).length);
  ok("mọi ảnh có thuộc tính alt", noAlt === 0);
  await noBanned(page, "trang chủ (toàn bộ văn bản, alt, aria-label, meta, JSON-LD)");
  ok("0 lỗi console", errors.length === 0, errors.join(" | "));
  ok("không request ra ngoài origin", external.length === 0, external.join(" "));
  ok("không request ghi (POST...) khi chỉ xem trang", nonGet.length === 0, nonGet.join(" "));
  // link thoát + ref
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href^="/lien-he"]')].map((a) => a.getAttribute("href")));
  ok("có link thoát /lien-he", hrefs.length >= 2, hrefs.length);
  ok("link thoát đúng industry/solution/utm", hrefs.every((h) => /industry=Spa/.test(h) && /solution=spa/.test(h) && /utm_source=showroom/.test(h) && /utm_campaign=mien-an/.test(h)), hrefs[0]);
  ok("demo không tự ghi/đọc cookie tct_ref và không nhét ref vào link", !(await page.evaluate(() => document.cookie.includes("tct_ref"))) && hrefs.every((h) => !/ref=/.test(h.replace("utm_source", ""))));
  await ctx.close();
}

// ───────────────────────── 2. Font tiếng Việt render thật
{
  const { ctx, page } = await newPage();
  await load(page);
  const f = await page.evaluate(async () => {
    const viH = "Chậm lại, để trở về với mình. Ắ Ằ Ẳ Ẵ Ặ Ấ Ầ Ẩ Ẫ Ậ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự ă â ê ô ơ ư đ";
    const out = {};
    for (const [fam, w, st] of [["MA Cormorant", 400, "normal"], ["MA Cormorant", 500, "normal"], ["MA Cormorant", 400, "italic"], ["MA Be Vietnam", 400, "normal"], ["MA Be Vietnam", 500, "normal"], ["MA Be Vietnam", 600, "normal"]]) {
      const faces = await document.fonts.load(`${st} ${w} 24px "${fam}"`, viH);
      out[`${fam} ${w} ${st}`] = faces.length;
    }
    const c = document.createElement("canvas").getContext("2d");
    const meas = (font, t) => { c.font = font; return c.measureText(t).width; };
    const t = "ăâêôơưđ ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ";
    out.serifDiff = Math.abs(meas('24px "MA Cormorant", monospace', t) - meas("24px monospace", t));
    out.sansDiff = Math.abs(meas('24px "MA Be Vietnam", monospace', t) - meas("24px monospace", t));
    const loaded = [...document.fonts].filter((x) => x.status === "loaded").map((x) => x.family + x.weight + x.style);
    out.loadedCount = loaded.length;
    const h1 = getComputedStyle(document.querySelector("h1")).fontFamily;
    const body = getComputedStyle(document.querySelector("main p")).fontFamily;
    out.h1 = h1; out.body = body;
    const hasVi = [...document.fonts].filter((x) => x.family.includes("MA ") && /1EA0/i.test(x.unicodeRange) && x.status === "loaded").length;
    out.viLoaded = hasVi;
    return out;
  });
  const faceOk = Object.entries(f).filter(([k]) => /^MA /.test(k)).every(([, v]) => v > 0);
  ok("6 kiểu font (Cormorant 400/500/italic, Be Vietnam 400/500/600) có face khớp chữ Việt", faceOk, JSON.stringify(f));
  ok("glyph Việt render bằng font thật (không fallback): Cormorant", f.serifDiff > 1, f.serifDiff);
  ok("glyph Việt render bằng font thật (không fallback): Be Vietnam", f.sansDiff > 1, f.sansDiff);
  ok("subset vietnamese đã load thật", f.viLoaded >= 2, f.viLoaded);
  ok("h1 dùng Cormorant, body dùng Be Vietnam", /MA Cormorant/.test(f.h1) && /MA Be Vietnam/.test(f.body), f.h1 + " / " + f.body);
  await ctx.close();
}

// ───────────────────────── 3. Không tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: w < 500 ? 740 : 900 } });
  await load(page);
  await scrollAll(page);
  const sw = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, bsw: document.body.scrollWidth }));
  ok(`không tràn ngang ở ${w}px`, sw.sw <= sw.cw && sw.bsw <= sw.cw, JSON.stringify(sw));
  const small = await page.evaluate(() => [...document.querySelectorAll("a,button,input,label.opt")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && e.tagName !== "INPUT" && (r.height < 43.5) && !e.closest("nav") && !/skip/.test(e.className) && e.textContent.trim().length > 0 && getComputedStyle(e).display !== "inline"; }).map((e) => (e.textContent || "").trim().slice(0, 24) + ":" + Math.round(e.getBoundingClientRect().height)));
  ok(`touch target >= 44px ở ${w}px (trừ liên kết nằm trong câu)`, small.length === 0, small.slice(0, 5).join(" | "));
  await ctx.close();
}

// ───────────────────────── 4. Reduced motion & không JS: nội dung vẫn hiện
{
  const { ctx, page } = await newPage({ reducedMotion: "reduce" });
  await load(page);
  await page.waitForTimeout(800);
  const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal],[data-hero],[data-hero-line],[data-story-text],[data-san],h1,h2")].filter((e) => { const cs = getComputedStyle(e); return parseFloat(cs.opacity) < 0.99 || cs.visibility === "hidden"; }).length);
  ok("reduced-motion: mọi khối hiện đủ ngay (opacity 1)", hidden === 0, hidden);
  const mo = await page.evaluate(() => document.querySelector("[data-ma-root]").dataset.motion);
  ok("reduced-motion: GSAP không chạy", mo === undefined, mo);
  await ctx.close();
  const nj = await newPage({ javaScriptEnabled: false });
  await nj.page.goto(URL_HOME, { waitUntil: "load" });
  const vis = await nj.page.evaluate(() => ({ h1: document.querySelector("h1")?.innerText.replace(/\s+/g, " "), op: getComputedStyle(document.querySelector("h1")).opacity, cards: document.querySelectorAll("#rituals li").length, faq: document.querySelectorAll("#faq h3").length }));
  ok("không JS: h1, 6 thẻ liệu trình, FAQ vẫn render từ server", /Chậm lại, để trở về với mình/.test(vis.h1) && vis.op === "1" && vis.cards === 6 && vis.faq === 8, JSON.stringify(vis));
  await nj.ctx.close();
}

// ───────────────────────── 5. Ritual Finder
{
  const { ctx, page, errors } = await newPage();
  await load(page);
  const finder = page.locator("#ritual-finder");
  await finder.scrollIntoViewIfNeeded();
  await finder.getByRole("button", { name: "Bắt đầu tìm nghi thức" }).click();
  await finder.getByRole("button", { name: "Tiếp tục" }).click();
  ok("Finder bước 1: lỗi thiếu mong muốn hiện cạnh ô (role=alert)", await finder.getByRole("alert").filter({ hasText: "Hãy chọn một mong muốn" }).count() === 1);
  ok("Finder bước 1: aria-invalid trên radio", (await finder.locator('input[name="goal"][aria-invalid="true"]').count()) > 0);
  await finder.getByLabel(/Thư giãn toàn thân/).check();
  await finder.getByRole("button", { name: "Tiếp tục" }).click();
  await finder.getByRole("button", { name: "Tiếp tục" }).click();
  ok("Finder bước 2: lỗi thiếu thời gian", await finder.getByRole("alert").filter({ hasText: "khoảng thời gian" }).count() === 1);
  await finder.getByLabel("Tối đa 60 phút").check();
  await finder.getByRole("button", { name: "Tiếp tục" }).click();
  await page.waitForTimeout(150);
  ok("Finder: sang bước mới thì focus chuyển vào tiêu đề bước", await page.evaluate(() => document.activeElement?.tagName === "H3"));
  await finder.getByRole("button", { name: "Xem gợi ý" }).click();
  const main = await finder.getByTestId("finder-main").innerText();
  ok("RF-01 relax/60/any → An Nhiên đứng đầu", /An Nhiên/.test(main), main.slice(0, 60));
  ok("Finder hiển thị tối đa 1 chính + 2 phụ", (await finder.getByTestId("finder-alt").count()) <= 2);
  await shot(page, "state-finder-result-1440.png", false, "#ritual-finder");
  // helper chạy nhanh các ca
  async function run(goalRe, dur, { pressure, noStone, unscented } = {}) {
    await finder.getByRole("button", { name: "Bắt đầu lại" }).first().click();
    await finder.getByRole("button", { name: "Bắt đầu tìm nghi thức" }).click();
    await finder.getByLabel(goalRe).check();
    await finder.getByRole("button", { name: "Tiếp tục" }).click();
    await finder.getByLabel(`Tối đa ${dur} phút`).check();
    await finder.getByRole("button", { name: "Tiếp tục" }).click();
    if (pressure) await finder.getByLabel(pressure, { exact: true }).check();
    if (noStone) await finder.getByLabel("Không dùng đá ấm").check();
    if (unscented) await finder.getByLabel("Không hương liệu").check();
    await finder.getByRole("button", { name: "Xem gợi ý" }).click();
    const empty = await finder.getByTestId("finder-empty").count();
    const mainTxt = empty ? "" : await finder.getByTestId("finder-main").innerText();
    return { empty: !!empty, mainTxt };
  }
  let r = await run(/Chăm sóc da mặt/, 60, { pressure: "Nhẹ" });
  ok("RF-02 face/60/nhẹ → Thanh Mộc", /Thanh Mộc/.test(r.mainTxt));
  r = await run(/Thả lỏng đầu/, 45, { pressure: "Vừa" });
  ok("RF-03 head/45/vừa → Tĩnh Tâm", /Tĩnh Tâm/.test(r.mainTxt));
  r = await run(/Chăm sóc bàn chân/, 45);
  ok("RF-04 feet/45 → Nhẹ Bước", /Nhẹ Bước/.test(r.mainTxt));
  r = await run(/Trải nghiệm chăm sóc toàn diện/, 120);
  ok("RF-05 full/120 → Dưỡng Nguyên", /Dưỡng Nguyên/.test(r.mainTxt));
  r = await run(/Trải nghiệm chăm sóc toàn diện/, 45);
  ok("RF-06 full/45 → rỗng", r.empty);
  const emptyTxt = await finder.getByTestId("finder-empty").innerText();
  ok("trạng thái rỗng có 3 hướng đi (điều chỉnh / xem tất cả / bắt đầu lại)", /Chưa tìm thấy nghi thức phù hợp/.test(emptyTxt) && (await finder.getByRole("button", { name: "Xem tất cả liệu trình" }).count()) === 1 && (await finder.getByRole("button", { name: "Bắt đầu lại" }).count()) >= 1);
  await shot(page, "state-finder-empty-1440.png", false, "#ritual-finder");
  r = await run(/Chăm sóc cơ thể với hơi ấm/, 90);
  ok("RF-07 body/90 → Mộc Nhiệt", /Mộc Nhiệt/.test(r.mainTxt));
  r = await run(/Chăm sóc cơ thể với hơi ấm/, 90, { noStone: true });
  ok("RF-08 body/90/tránh đá ấm → rỗng (không tự nới lỏng)", r.empty);
  r = await run(/Chăm sóc cơ thể với hơi ấm/, 120, { noStone: true });
  ok("RF-09 body/120/tránh đá ấm → Dưỡng Nguyên", /Dưỡng Nguyên/.test(r.mainTxt));
  r = await run(/Chăm sóc da mặt/, 45);
  ok("RF-10 face/45 → rỗng", r.empty);
  // chọn kết quả → Appointment
  r = await run(/Thư giãn toàn thân/, 60, { pressure: "Vừa", unscented: true });
  await finder.getByRole("button", { name: "Chọn nghi thức này" }).first().click();
  await page.waitForTimeout(500);
  const sel = await page.evaluate(() => ({ ritual: document.querySelector('input[name="ritual"]:checked')?.value, pressure: document.querySelector('input[name="pressure"]:checked')?.value, scent: document.querySelector('input[name="scent"]:checked')?.value }));
  ok("RF-14 chọn từ Finder điền sẵn nghi thức + áp lực + hương liệu", sel.ritual === "R01" && sel.pressure === "medium" && sel.scent === "unscented", JSON.stringify(sel));
  await noBanned(page, "Ritual Finder sau khi có gợi ý");
  ok("0 lỗi console trong luồng Finder", errors.length === 0, errors.join("|"));
  await ctx.close();
}

// ───────────────────────── 6. Appointment Preview
{
  const { ctx, page, errors, nonGet } = await newPage({ extraHTTPHeaders: {} });
  await load(page, URL_HOME + "?ref=ABC123");
  const ap = page.locator("#appointment");
  await ap.scrollIntoViewIfNeeded();
  await ap.getByRole("button", { name: "Tạo bản xem trước lịch hẹn" }).click();
  const al = await ap.getByRole("alert").allInnerTexts();
  ok("lỗi khi gửi trống: nghi thức, ngày, xác nhận (cạnh từng ô)", al.some((t) => /chọn nghi thức/.test(t)) && al.some((t) => /chọn một ngày/.test(t)) && al.some((t) => /xác nhận/.test(t)), al.join(" | "));
  ok("aria-invalid + aria-describedby trên ô lỗi", (await ap.locator('input[aria-invalid="true"]').count()) > 0 && (await ap.locator("fieldset[aria-describedby]").count()) >= 2);
  ok("focus chuyển tới ô lỗi đầu tiên", await page.evaluate(() => document.activeElement?.getAttribute("name") === "ritual"));
  await noBanned(page, "trạng thái lỗi biểu mẫu lịch hẹn");
  await shot(page, "state-booking-errors-1440.png", false, "#appointment");
  await ap.getByLabel(/An Nhiên/).check();
  // ngày offset 3: kín cả hai phòng
  await ap.locator('input[name="date"]').nth(3).check();
  ok("AP-06 ngày kín lịch (offset 3) hiện thông báo kín", (await ap.getByTestId("ap-full").innerText()).includes("kín lịch"));
  ok("ngày kín được đánh dấu 'Kín' ở ô chọn ngày", (await ap.locator("span", { hasText: /^Kín$/ }).count()) >= 1);
  await ap.scrollIntoViewIfNeeded();
  await shot(page, "state-booking-full-1440.png", false, "[data-field=date]");
  // ngày offset 1: có giờ
  await ap.locator('input[name="date"]').nth(1).check();
  const slots = await ap.locator('input[name="time"]').count();
  ok("ngày trống có khung giờ khả dụng", slots > 0, slots);
  const times = await ap.locator('input[name="time"]').evaluateAll((els) => els.map((e) => +e.value));
  ok("AP-09/10 offset 1: slot 09:00/09:30/10:00 bị loại do phòng bận; không có slot kết thúc sau 20:00", !times.some((t) => t < 10 * 60) && Math.max(...times) + 60 + 15 <= 20 * 60, times.join(","));
  ok("slot cách nhau 30 phút", times.every((t) => t % 30 === 0));
  // đổi nghi thức → xoá giờ đã chọn
  await ap.locator('input[name="time"]').first().check({ force: true });
  const firstTime = await ap.locator('input[name="time"]:checked').count();
  await ap.getByLabel(/Dưỡng Nguyên/).check();
  ok("AP-14 đổi nghi thức reset giờ đã chọn", firstTime === 1 && (await ap.locator('input[name="time"]:checked').count()) === 0);
  ok("Dưỡng Nguyên chỉ ROOM-02: 'Phòng An' bị vô hiệu khi chọn riêng", await ap.locator('input[name="resource"][value="ROOM-01"]').isDisabled());
  await ap.getByLabel(/An Nhiên/).check();
  // chọn lại ngày + giờ
  await ap.locator('input[name="date"]').nth(1).check();
  const t2 = await ap.locator('input[name="time"]').first().evaluate((e) => e.value);
  await ap.locator('input[name="time"]').first().check({ force: true });
  await ap.getByRole("button", { name: "Tạo bản xem trước lịch hẹn" }).click();
  ok("AP-16 chưa xác nhận → không tạo preview", (await ap.getByTestId("ap-success").count()) === 0 && (await ap.getByRole("alert").filter({ hasText: "xác nhận" }).count()) === 1);
  await ap.getByLabel("Tôi hiểu bản tóm tắt này chưa phải yêu cầu đã gửi.").check();
  await shot(page, "state-booking-filled-1440.png", false, "#appointment");
  await ap.getByRole("button", { name: "Tạo bản xem trước lịch hẹn" }).click();
  const succ = ap.getByTestId("ap-success");
  ok("AP-17 tạo preview thành công", (await succ.count()) === 1);
  const sTxt = await succ.innerText();
  ok("mã tóm tắt dạng MA-XXXXXXXX", /MA-[0-9A-F]{8}/.test(sTxt));
  ok("hiển thị giá 490.000 ₫ và 60 phút, đúng giờ đã chọn", /490\.000/.test(sTxt) && /60\s*phút/.test(sTxt) && sTxt.includes(`${String(Math.floor(t2 / 60)).padStart(2, "0")}:${String(t2 % 60).padStart(2, "0")}`), sTxt.slice(0, 300));
  ok("success không dùng 'Đặt lịch thành công' / 'sẽ liên hệ'", !/Đặt lịch thành công|sẽ liên hệ/i.test(sTxt) && /Chưa có yêu cầu nào được gửi/.test(sTxt));
  const cta = succ.getByTestId("ap-consult");
  const href = await cta.getAttribute("href");
  ok("CTA chính của preview → buildConsultHref('mien-an')", href === "/lien-he?industry=Spa&solution=spa&utm_source=showroom&utm_campaign=mien-an", href);
  await cta.focus();
  ok("CTA tư vấn focus được bằng bàn phím", await page.evaluate(() => document.activeElement?.getAttribute("data-testid") === "ap-consult"));
  await noBanned(page, "trạng thái tóm tắt lịch hẹn thành công");
  await shot(page, "state-booking-success-1440.png", false, "[data-testid=ap-success]");
  // chỉnh sửa giữ dữ liệu
  await succ.getByRole("button", { name: "Chỉnh sửa" }).click();
  ok("AP-18 Chỉnh sửa giữ nguyên draft", (await ap.locator('input[name="ritual"]:checked').getAttribute("value")) === "R01" && (await ap.locator('input[name="time"]:checked').count()) === 1);
  await ap.getByRole("button", { name: "Tạo bản xem trước lịch hẹn" }).click();
  await ap.getByRole("button", { name: "Tạo mới" }).click();
  ok("AP-19 Tạo mới reset draft", (await ap.locator('input[name="ritual"]:checked').count()) === 0 && (await ap.locator('input[name="date"]:checked').count()) === 0);
  ok("AP-21 không có request ghi dữ liệu nào, không localStorage cá nhân", nonGet.length === 0 && (await page.evaluate(() => localStorage.length)) === 0, nonGet.join());
  ok("0 lỗi console trong luồng đặt lịch", errors.length === 0, errors.join("|"));
  const cookies = await ctx.cookies();
  ok("demo không ghi cookie tct_ref khi mở với ?ref= (chỉ proxy được phép)", !cookies.some((c) => c.name === "tct_ref" && !/ABC123/.test(c.value)));
  await ctx.close();
}

// ───────────────────────── 7. Dialog, lightbox, menu, FAQ, bàn phím
{
  const { ctx, page } = await newPage();
  await load(page);
  const btn = page.getByRole("button", { name: "Xem nghi thức Mộc Nhiệt" });
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  const dlg = page.locator("dialog[open]");
  ok("dialog liệu trình mở, có tên, giá, trình tự, lưu ý", (await dlg.count()) === 1 && /Mộc Nhiệt/.test(await dlg.innerText()) && /790\.000/.test(await dlg.innerText()) && /Không gợi ý cho người nhạy cảm với nhiệt/.test(await dlg.innerText()));
  await noBanned(page, "dialog liệu trình");
  await shot(page, "state-dialog-1440.png");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  ok("Escape đóng dialog", (await page.locator("dialog[open]").count()) === 0);
  ok("đóng dialog trả focus về nút gọi", await page.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Xem nghi thức Mộc Nhiệt"));
  await btn.click();
  await page.getByRole("button", { name: "Chọn nghi thức này" }).click();
  await page.waitForFunction(() => document.querySelector("#appointment").getBoundingClientRect().top < 300, null, { timeout: 8000 }).catch(() => {});
  ok("'Chọn nghi thức này' đóng dialog và điền sẵn Appointment", (await page.locator("dialog[open]").count()) === 0 && (await page.locator('input[name="ritual"]:checked').getAttribute("value")) === "R02");
  ok("Mộc Nhiệt chỉ áp lực vừa: radio 'nhẹ' bị vô hiệu", await page.locator('input[name="pressure"][value="light"]').isDisabled());
  // lightbox
  const san = page.locator("#sanctuary");
  await san.scrollIntoViewIfNeeded();
  await san.locator("[data-san-btn]").first().click();
  await page.waitForTimeout(300);
  const cap1 = await page.locator("dialog[open] [aria-live]").innerText();
  await page.keyboard.press("ArrowRight");
  const cap2 = await page.locator("dialog[open] [aria-live]").innerText();
  ok("lightbox: mũi tên phải đổi ảnh + caption", cap1 !== cap2, cap1 + " -> " + cap2);
  await page.keyboard.press("ArrowLeft");
  ok("lightbox: mũi tên trái quay lại", (await page.locator("dialog[open] [aria-live]").innerText()) === cap1);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  ok("lightbox: Escape đóng và trả focus", (await page.locator("dialog[open]").count()) === 0 && (await page.evaluate(() => document.activeElement?.hasAttribute("data-san-btn"))));
  // FAQ
  const q = page.locator("#faq button[aria-expanded]");
  ok("FAQ: mục đầu mở mặc định", (await q.nth(0).getAttribute("aria-expanded")) === "true");
  await q.nth(1).click();
  ok("FAQ: chỉ mở một mục tại một thời điểm", (await q.nth(0).getAttribute("aria-expanded")) === "false" && (await q.nth(1).getAttribute("aria-expanded")) === "true");
  await q.nth(2).focus(); await page.keyboard.press("Enter");
  ok("FAQ: Enter mở mục", (await q.nth(2).getAttribute("aria-expanded")) === "true");
  await q.nth(3).focus(); await page.keyboard.press("Space");
  ok("FAQ: Space mở mục", (await q.nth(3).getAttribute("aria-expanded")) === "true");
  // Tab tới CTA
  await page.goto(URL_HOME, { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelectorAll('input[name="date"]').length > 0);
  const seq = [];
  for (let i = 0; i < 14; i++) { await page.keyboard.press("Tab"); seq.push(await page.evaluate(() => (document.activeElement?.textContent || "").trim().slice(0, 30))); }
  ok("Tab đi qua skip link và tới CTA 'Tìm nghi thức của bạn'", seq.some((s) => /Bỏ qua/.test(s)) && seq.some((s) => /Tìm nghi thức của bạn/.test(s)), seq.join(" | "));
  const fv = await page.evaluate(() => { const el = document.activeElement; const cs = getComputedStyle(el); return cs.outlineStyle + " " + cs.outlineWidth; });
  ok("focus-visible rõ (outline >= 2px)", /solid 2px|auto/.test(fv), fv);
  await ctx.close();

  const m = await newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await load(m.page);
  const menuBtn = m.page.getByRole("button", { name: /^Menu/ });
  await menuBtn.click();
  await m.page.waitForTimeout(350);
  ok("menu mobile mở (dialog modal)", (await m.page.locator("dialog[open]").count()) === 1);
  await noBanned(m.page, "menu mobile đang mở (390px)");
  await shot(m.page, "state-menu-390.png");
  await m.page.keyboard.press("Escape");
  await m.page.waitForTimeout(250);
  ok("Escape đóng menu và trả focus về nút Menu", (await m.page.locator("dialog[open]").count()) === 0 && (await m.page.evaluate(() => /^Menu/.test(document.activeElement?.textContent || ""))));
  await menuBtn.click();
  await m.page.locator("dialog[open] a", { hasText: "Liệu trình" }).click();
  await m.page.waitForFunction(() => Math.abs(document.querySelector("#rituals").getBoundingClientRect().top) < 140, null, { timeout: 8000 }).catch(() => {});
  ok("chọn mục menu: đóng menu và cuộn tới #rituals", (await m.page.locator("dialog[open]").count()) === 0 && (await m.page.evaluate(() => Math.abs(document.querySelector("#rituals").getBoundingClientRect().top) < 140)));
  await m.ctx.close();
}

// ───────────────────────── 8. Credits
{
  const { ctx, page, errors } = await newPage();
  const r = await page.goto(`${BASE}/demos/mien-an/credits`, { waitUntil: "load" });
  ok("credits trả 200", r.status() === 200);
  await scrollAll(page);
  const c = await page.evaluate(() => ({ robots: document.querySelector('meta[name="robots"]')?.content, cards: document.querySelectorAll("ul li dl").length, title: document.title, links: [...document.querySelectorAll("ul li dl a")].filter((a) => /pexels\.com/.test(a.href)).length, fonts: document.body.innerText.includes("Cormorant Garamond") && document.body.innerText.includes("Be Vietnam Pro"), broken: [...document.images].filter((i) => !i.complete || !i.naturalWidth).length }));
  ok("credits: noindex, 12 ảnh với tác giả/nguồn/giấy phép, có font", /noindex/.test(c.robots) && c.cards === 12 && c.links >= 36 && c.fonts, JSON.stringify(c));
  ok("credits: ảnh tải đủ, 0 lỗi console", c.broken === 0 && errors.length === 0, errors.join("|"));
  const cr = JSON.parse(fs.readFileSync("/Users/mac/mern/personal/trancongtien/public/images/demos/mien-an/credits.json", "utf8"));
  ok("credits.json đủ trường (file,title,author,license,sourceUrl,retrievedAt,sha256,alt,usage)", cr.images.every((i) => i.file && i.title && i.author && i.license && i.sourceUrl && i.retrievedAt && /^[0-9a-f]{64}$/.test(i.sha256) && i.alt && i.usage));
  await noBanned(page, "trang credits (không có chữ Demo/minh hoạ)");
  const ct = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
  ok("credits giữ lời công khai trung thực (do Trần Công Tiến thiết kế, ảnh stock có ghi công)", /do .*Trần Công Tiến.* thiết kế để giới thiệu phong cách thiết kế website/.test(ct) && /ảnh stock/.test(ct), ct.slice(-260));
  await shot(page, "credits-1440.png", true);
  await ctx.close();
}

// ───────────────────────── 9. Ảnh chụp 1440 / 390 / 320 (hero + full page)
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 });
  await load(page);
  await page.waitForTimeout(2500); // chờ hero choreography xong
  await scrollAll(page);
  await page.waitForTimeout(700);
  await shot(page, `hero-${tag}.png`);
  await shot(page, `full-${tag}.png`, true);
  if (w < 500) {
    await page.locator("#appointment").scrollIntoViewIfNeeded();
    await page.locator('#appointment input[name="ritual"]').first().check({ force: true });
    await page.locator('#appointment input[name="date"]').nth(1).check({ force: true });
    await page.locator("#appointment").scrollIntoViewIfNeeded();
    await shot(page, "state-booking-390.png");
    await page.locator("#ritual-finder").scrollIntoViewIfNeeded();
    await shot(page, "state-finder-390.png");
  }
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ viewport: { width: 320, height: 640 } });
  await load(page);
  await page.waitForTimeout(2500);
  await shot(page, "hero-320.png");
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(here, "results.json"), JSON.stringify({ base: BASE, pass, fail, at: new Date().toISOString(), results }, null, 2));
console.log(`\nTổng: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
