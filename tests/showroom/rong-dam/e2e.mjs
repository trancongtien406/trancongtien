// E2E Rong Dặm (LP-03, VI/EN). Chạy: node tests/showroom/rong-dam/e2e.mjs
// Dev server chung: http://localhost:3100 (không dùng 127.0.0.1 vì HMR/hydration bị chặn).
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const VI = `${BASE}/demos/rong-dam`;
const EN = `${BASE}/demos/rong-dam/en`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), "screenshots");
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra = "") {
  if (cond) { pass++; console.log("  PASS", name); } else { fail++; failures.push(name + " " + extra); console.log("  FAIL", name, extra); }
}

// Chính sách nhãn (AGENT-RULES mục 11): không còn nhãn "Demo"/"minh hoạ"/"giả định"/"mô phỏng" ở bất kỳ chỗ nào người dùng thấy.
const BANNED = /\bdemo\b|minh ho[aạ]|minh hoạ|giả định|mô phỏng|dữ liệu mẫu|không phải doanh nghiệp|thương hiệu minh|illustrative|illustrated|fictional|sample data|sample (plan|itinerary|price)|demonstration|mock/i;
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
const noBanned = async (page, label, root) => { const h = await bannedHits(page, root); ok(h.length === 0, `không còn nhãn cấm: ${label}`, h.slice(0, 3).join(" || ")); };
const norm = (s) => (s || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });

async function newPage(opts = {}, init) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  if (init) await ctx.addInitScript(init);
  const page = await ctx.newPage();
  page.errors = []; page.external = [];
  page.on("console", (m) => { if (m.type() === "error" && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on("pageerror", (e) => page.errors.push("pageerror: " + e.message));
  page.on("request", (r) => { const u = new URL(r.url()); if (!["http:", "https:"].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); });
  return { ctx, page };
}
const load = async (page, url = VI) => { await page.goto(url, { waitUntil: "networkidle", timeout: 120000 }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2300); };
async function slowScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); }
    await new Promise((r) => setTimeout(r, 700)); window.scrollTo(0, 0);
    await Promise.race([Promise.all([...document.images].map((i) => { i.loading = "eager"; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })), new Promise((r) => setTimeout(r, 15000))]);
  });
  await page.waitForTimeout(900);
}
const total = (page) => page.locator('[data-testid="total"]').innerText().then(norm);

// ---------- 1. Tải trang, console, request ngoài, metadata, lang, hreflang
console.log("[1] Tải trang VI và EN, console, request ngoài, metadata, lang, hreflang");
for (const [lang, url] of [["vi", VI], ["en", EN]]) {
  const { ctx, page } = await newPage();
  const res = await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  ok(res.status() === 200, `${lang}: HTTP 200`, String(res.status()));
  await page.waitForTimeout(2200);
  ok(page.errors.length === 0, `${lang}: 0 lỗi console`, page.errors.join(" | "));
  ok(page.external.length === 0, `${lang}: không request ra ngoài origin`, page.external.join(" | "));
  const title = await page.title();
  ok(lang === "vi" ? /Rong Dặm/.test(title) : /Rong Dam/.test(title), `${lang}: title riêng`, title);
  ok(await page.locator("meta[name=robots][content*=noindex]").count() > 0, `${lang}: robots noindex`);
  ok(await page.locator('link[rel=icon][href*="rong-dam/identity/favicon"]').count() > 0, `${lang}: favicon theo route`);
  ok(await page.locator("h1").count() === 1, `${lang}: đúng 1 h1`);
  const hl = await page.evaluate(() => [...document.querySelectorAll("link[rel=alternate][hreflang]")].map((l) => l.getAttribute("hreflang") + "=" + l.getAttribute("href")));
  ok(hl.some((x) => x.startsWith("vi-VN=")) && hl.some((x) => x.startsWith("en=")) && hl.some((x) => x.startsWith("x-default=")), `${lang}: hreflang vi-VN/en/x-default`, hl.join(","));
  ok(hl.some((x) => x.startsWith("en=") && /\/demos\/rong-dam\/en$/.test(x)) && hl.some((x) => x.startsWith("vi-VN=") && /\/demos\/rong-dam$/.test(x)), `${lang}: hreflang trỏ đúng hai URL`, hl.join(","));
  ok(await page.locator(`link[rel=canonical][href$="${lang === "vi" ? "/demos/rong-dam" : "/demos/rong-dam/en"}"]`).count() === 1, `${lang}: canonical tự tham chiếu`);
  if (lang === "en") {
    ok(await page.locator('div[lang="en"]').count() >= 1, "en: có wrapper lang=en");
    ok((await page.evaluate(() => document.documentElement.lang)) === "en", "en: <html lang> được đặt thành en khi chạy");
    const bodyLang = await page.evaluate(() => document.querySelector("h1").closest("[lang]").getAttribute("lang"));
    ok(bodyLang === "en", "en: h1 nằm trong lang=en", bodyLang);
  } else {
    const l = await page.evaluate(() => document.querySelector("h1").closest("[lang]").getAttribute("lang"));
    ok(l === "vi", "vi: h1 nằm trong lang=vi", l);
  }
  const sw = await page.locator("[data-lang-switch]").first();
  ok(await sw.count() === 1 && (await sw.getAttribute("hreflang")) === (lang === "vi" ? "en" : "vi-VN"), `${lang}: nút đổi ngôn ngữ có hreflang`);
  ok((await page.locator('a:has-text("Credits"), a:has-text("credits"), a[href="/demos/rong-dam/credits"]').count()) > 0, `${lang}: link credits`);
  await noBanned(page, `${lang}: trang chủ (toàn bộ văn bản, alt, aria-label, meta, JSON-LD)`);
  ok((await page.locator("footer").innerText()).includes("Trần Công Tiến"), `${lang}: footer có dòng ký tên người thiết kế`);
  ok(await page.locator("text=/Ảnh minh hoạ|Illustrative/").count() === 0, `${lang}: không có chip ảnh minh hoạ`);
  await ctx.close();
}

// ---------- 2. Tràn ngang
console.log("[2] Không tràn ngang 320/390/768/1024/1440 (VI và EN)");
for (const [lang, url] of [["vi", VI], ["en", EN]]) {
  for (const w of [320, 390, 768, 1024, 1440]) {
    const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } });
    await load(page, url);
    const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    ok(m.sw <= m.cw, `${lang} w=${w} scrollWidth<=clientWidth`, `${m.sw}>${m.cw}`);
    await ctx.close();
  }
}

// ---------- 3. Font
console.log("[3] Font Bricolage Grotesque + Lexend, glyph tiếng Việt thật");
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(async () => {
    const h1 = getComputedStyle(document.querySelector("h1")).fontFamily;
    const body = getComputedStyle(document.querySelector("main p")).fontFamily;
    const faces = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + "|" + f.unicodeRange.slice(0, 20));
    const c = document.createElement("canvas").getContext("2d");
    const probe = (fam, w, ch) => { c.font = `${w} 100px ${fam}`; return c.measureText(ch).width; };
    const chars = "ĂÂÊÔƠƯĐăâêôơưđẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ".split("");
    const out = {};
    for (const [name, fam, w] of [["head", h1, 800], ["body", body, 400]]) {
      let bad = [];
      for (const ch of chars) {
        const own = probe(fam, w, ch);
        const fb = probe("Arial", w, ch);
        const base = probe(fam, w, ch.normalize("NFD")[0]);
        // glyph dựng sẵn: độ rộng ~ chữ cái gốc (không cộng dấu rời) và khác Arial
        if (Math.abs(own - fb) < 0.01 || own > base * 1.25 + 4) bad.push(ch);
      }
      out[name] = bad;
    }
    return { h1, body, faces, out };
  });
  ok(/--rd-fb|Bricolage|__.*Font/i.test(r.h1) || r.h1.length > 10, "heading dùng font local", r.h1);
  ok(r.faces.length >= 4, "face font đã load (>=4 subset)", String(r.faces.length));
  ok(r.faces.some((f) => /^brVi\|/.test(f)) && r.faces.some((f) => /^lxVi\|/.test(f)), "subset vietnamese của heading và body đã tải thật", r.faces.join(";"));
  ok(r.out.head.length === 0, "glyph Việt đậm (heading) không fallback/tách dấu", r.out.head.join(""));
  ok(r.out.body.length === 0, "glyph Việt (body) không fallback/tách dấu", r.out.body.join(""));
  await page.setContent(`<body style="margin:0;background:#f5f0e3"></body>`);
  await ctx.close();
}

// ---------- 4. Trip Finder
console.log("[4] Trip Finder (VI): lỗi, kết quả, xếp hạng, trạng thái cũ, rỗng, đặt lại");
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.evaluate(() => localStorage.clear());
  await load(page);
  await page.locator('[data-testid="finder-submit"]').click();
  ok(await page.getByText("Chọn khoảng thời gian bạn có nhé.").isVisible(), "lỗi thiếu thời gian hiện cạnh ô");
  ok(await page.getByText("Bạn sẽ đi cùng ai?").first().isVisible() && await page.locator("#rd-err-who").isVisible(), "lỗi thiếu người đồng hành");
  ok(await page.locator('[data-testid="finder-result"]').count() === 0, "không có kết quả khi form lỗi");
  await page.locator("#rd-budget-num").fill("100");
  ok(await page.locator("#rd-budget-num").getAttribute("aria-invalid") === "true", "ngân sách 100 -> aria-invalid");
  ok(await page.getByText("Nhập ngân sách từ 300.000 đ đến 6.000.000 đ.").isVisible(), "thông báo lỗi ngân sách");
  await page.locator("#rd-budget-num").fill("1500000");
  await page.getByLabel("1 ngày", { exact: true }).check();
  await page.getByLabel("Văn hoá", { exact: true }).check();
  await page.getByLabel("Cặp đôi", { exact: true }).check();
  await page.locator('[data-testid="finder-submit"]').click();
  await page.waitForSelector('[data-testid="finder-result"]');
  const ids = await page.locator('[data-testid="finder-result"]').evaluateAll((els) => els.map((e) => e.getAttribute("data-tour")));
  ok(ids.length >= 1 && ids.length <= 3, "1-3 kết quả", ids.join(","));
  ok(!ids.includes("RD-06"), "1 ngày không gợi ý combo 3N2Đ", ids.join(","));
  ok(!ids.includes("RD-01"), "RD-01 (1.600.000) vượt ngân sách 1.500.000 bị loại (tính cả vé)", ids.join(","));
  ok(ids[0] === "RD-05" || ids[0] === "RD-03" || ids[0] === "RD-02" || ids[0] === "RD-04", "kết quả đầu hợp lệ", ids[0]);
  ok((await page.locator('[data-testid="finder-result"]').first().innerText()).includes("Đã tính vé tham quan dự kiến"), "ghi chú đã tính vé");
  await noBanned(page, "Trip Finder sau khi có kết quả");
  ok(!/\d+\s?%\s*phù hợp/i.test(await page.locator('[data-testid="finder-results"]').innerText()), "không hiển thị % phù hợp");
  // đổi form sau submit -> kết quả cũ
  await page.getByLabel("Gia đình", { exact: true }).check();
  ok(await page.locator('[data-testid="finder-stale"]').isVisible(), "đổi lựa chọn -> cảnh báo kết quả cũ");
  // rỗng
  await page.getByLabel("3 ngày trở lên", { exact: true }).check();
  await page.locator("#rd-budget-num").fill("300000");
  await page.locator('[data-testid="finder-submit"]').click();
  await page.waitForSelector('[data-testid="finder-empty"]');
  ok(await page.locator('[data-testid="finder-empty"]').isVisible(), "trạng thái rỗng");
  ok(/ngân sách/.test(await page.locator('[data-testid="finder-empty"]').innerText()), "gợi ý tăng ngân sách");
  ok(await page.getByLabel("3 ngày trở lên", { exact: true }).isChecked(), "không tự đổi lựa chọn khi rỗng");
  // 3 ngày + ngân sách lớn -> RD-06
  await page.locator("#rd-budget-num").fill("6000000");
  await page.locator('[data-testid="finder-submit"]').click();
  await page.waitForSelector('[data-testid="finder-result"]');
  const ids3 = await page.locator('[data-testid="finder-result"]').evaluateAll((els) => els.map((e) => e.getAttribute("data-tour")));
  ok(ids3.includes("RD-06"), "3 ngày+ có RD-06", ids3.join(","));
  // chọn kết quả -> explorer
  await page.locator('[data-testid="finder-result"][data-tour="RD-06"] button').click();
  await page.waitForTimeout(900);
  ok((await page.locator('[data-testid="tour-tab"][data-tour="RD-06"]').getAttribute("aria-pressed")) === "true", "bấm Khám phá lịch trình -> chọn tour trong Explorer");
  ok(await page.evaluate(() => document.activeElement?.id === "rd-explorer"), "focus chuyển tới tiêu đề Explorer");
  // đặt lại
  await page.locator("#trip-finder").getByRole("button", { name: "Đặt lại" }).click();
  ok(await page.locator('[data-testid="finder-result"]').count() === 0, "đặt lại xoá kết quả");
  await ctx.close();
}

// ---------- 5. Itinerary Explorer + giá
console.log("[5] Itinerary Explorer: lịch trình, bản đồ, giá");
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.evaluate(() => localStorage.clear());
  await load(page);
  await page.locator('[data-testid="tour-tab"][data-tour="RD-01"]').click();
  ok((await page.locator('[data-testid="timeline"] li').count()) === 8, "RD-01: 8 mốc giờ");
  ok(await page.locator('[data-testid="route-map"]').isVisible(), "bản đồ SVG hiển thị");
  await page.locator('[data-stop="1-3"]').click();
  ok((await page.locator('[data-stop="1-3"]').getAttribute("aria-pressed")) === "true", "chọn điểm dừng -> aria-pressed");
  ok(await page.locator('[data-testid="route-map"] [data-place="banahills"][data-active="true"]').count() === 1, "điểm Bà Nà nổi bật trên bản đồ");
  ok(/Cầu Vàng/.test(await page.locator('[data-testid="selected-stop"]').innerText()), "khung điểm dừng đang xem");
  await page.locator('[data-testid="route-map"] [data-place="danang"] circle').last().click();
  ok(await page.locator('[data-testid="route-map"] [data-place="danang"][data-active="true"]').count() === 1, "bấm ghim trên bản đồ -> chọn điểm dừng");
  // giá RD-01: 2 NL, 0 TE = 1.300.000 + 1.900.000
  ok((await total(page)) === "3.200.000 ₫", "RD-01 2NL: tổng 3.200.000", await total(page));
  await page.getByLabel("Thêm trẻ em").click();
  ok((await page.locator('[data-testid="svc"]').innerText().then(norm)) === "1.750.000 ₫", "RD-01 2NL+1TE dịch vụ 1.750.000");
  ok((await page.locator('[data-testid="adm"]').innerText().then(norm)) === "2.650.000 ₫", "vé tách riêng 2.650.000");
  ok((await total(page)) === "4.400.000 ₫", "tổng 4.400.000", await total(page));
  await page.locator('[data-testid="toggle-adm"]').uncheck();
  ok((await total(page)) === "1.750.000 ₫", "bỏ tính vé -> 1.750.000", await total(page));
  ok(/4\.400\.000/.test(await page.locator('[data-testid="calculator"]').innerText()), "vẫn hiển thị tổng nếu tính đủ vé");
  await page.locator('[data-testid="toggle-adm"]').check();
  // giới hạn
  await page.getByLabel("Giảm người lớn").click();
  ok(await page.getByLabel("Giảm người lớn").isDisabled(), "tối thiểu 1 người lớn (nút trừ khoá)");
  while (!(await page.getByLabel("Thêm người lớn").isDisabled())) await page.getByLabel("Thêm người lớn").click();
  ok((await page.locator('[data-testid="adults"]').innerText()) === "11" && await page.getByLabel("Thêm trẻ em").isDisabled(), "tổng 12 khách -> khoá nút cộng");
  while (!(await page.getByLabel("Giảm người lớn").isDisabled())) await page.getByLabel("Giảm người lớn").click();
  while (!(await page.getByLabel("Giảm trẻ em").isDisabled())) await page.getByLabel("Giảm trẻ em").click();
  await page.getByLabel("Thêm người lớn").click();
  await page.getByLabel("Thêm trẻ em").click();
  // RD-06 combo
  await page.locator('[data-testid="tour-tab"][data-tour="RD-06"]').click();
  ok((await page.locator('[data-testid="adults"]').innerText()) === "2" && (await page.locator('[data-testid="children"]').innerText()) === "1", "đổi tour giữ số khách");
  ok((await page.locator("[data-day]").count()) === 3, "RD-06: 3 tab ngày");
  await page.locator('[data-day="day-2"]').click();
  ok((await page.locator('[data-testid="timeline"] li').count()) === 7 && /Mỹ Sơn/.test(await page.locator('[data-testid="timeline"]').innerText()), "ngày 2: lịch trình Mỹ Sơn / Hội An");
  ok((await total(page)) === "11.755.000 ₫", "RD-06 2NL+1TE = 11.755.000", await total(page));
  await page.locator('[data-testid="rooms"]').waitFor();
  await page.getByLabel("Phụ thu phòng riêng +").click();
  ok((await total(page)) === "12.355.000 ₫", "RD-06 + 1 phòng riêng = 12.355.000", await total(page));
  await page.locator('[data-testid="tour-tab"][data-tour="RD-02"]').click();
  ok(await page.locator('[data-testid="rooms"]').count() === 0, "tour trong ngày không có phụ thu phòng");
  ok((await total(page)) === "1.780.000 ₫", "RD-02 2NL+1TE = 1.780.000 (dịch vụ 1.320.000 + vé 460.000)", await total(page));
  // mỗi tour có giờ khởi hành khác thời lượng
  const meta = await page.locator('[data-testid="tour-card"]').evaluateAll((els) => els.map((e) => e.innerText.replace(/\s+/g, " ")));
  ok(meta.length === 6, "6 thẻ tour", String(meta.length));
  ok(meta.every((m) => /Khởi hành/i.test(m) && /Thời lượng/i.test(m) && /Điểm đón/i.test(m) && /Vé \(tách riêng\)/i.test(m)), "mỗi thẻ có giờ khởi hành, thời lượng, điểm đón, vé tách riêng");
  const body = await page.locator("body").innerText();
  ok(/xác nhận lại với đơn vị vận hành/i.test(body), "ghi chú xác nhận lại với đơn vị vận hành");
  ok(/giá tham khảo/i.test(body), "ghi rõ giá tham khảo");
  await noBanned(page, "danh sách tour + công cụ tính giá");
  ok(!/\b(Review|AggregateRating)\b/.test(await page.content()), "không có Review/AggregateRating");
  await ctx.close();
}

// ---------- 6. Lưu / sao chép kế hoạch, lỗi storage
console.log("[6] Lưu và sao chép kế hoạch, storage lỗi");
{
  const { ctx, page } = await newPage();
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  await load(page);
  await page.evaluate(() => localStorage.clear());
  await load(page);
  await page.locator('[data-testid="tour-tab"][data-tour="RD-03"]').click();
  await page.locator('[data-testid="save-plan"]').click();
  ok(/Đã lưu kế hoạch trên thiết bị này/.test(await page.locator('[data-testid="plan-status"]').innerText()), "lưu thành công hiện thông báo");
  await noBanned(page, "sau khi lưu kế hoạch");
  ok(await page.evaluate(() => !!localStorage.getItem("rd-saved-v1")), "đã ghi localStorage");
  ok(!/booking|CCCD|hộ chiếu/i.test(await page.evaluate(() => localStorage.getItem("rd-saved-v1"))), "kế hoạch lưu không có dữ liệu cá nhân");
  await page.locator('[data-testid="copy-plan"]').click();
  await page.waitForTimeout(400);
  const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => "");
  ok(/RD-03/.test(clip) && /Giá tham khảo/.test(clip), "sao chép đúng nội dung", clip.slice(0, 60));
  await ctx.close();
  const b = await newPage({}, () => { Storage.prototype.setItem = function () { throw new Error("quota"); }; });
  await load(b.page);
  await b.page.locator('[data-testid="save-plan"]').click();
  const msg = await b.page.locator('[data-testid="plan-status"]').innerText();
  ok(/Không thể lưu kế hoạch/.test(msg) && !/Đã lưu/.test(msg), "storage lỗi -> không báo thành công", msg);
  ok(b.page.errors.length === 0, "storage lỗi không làm vỡ trang", b.page.errors.join("|"));
  await b.ctx.close();
}

// ---------- 7. Giữ trạng thái khi chuyển VI/EN
console.log("[7] Giữ trạng thái chọn khi chuyển VI <-> EN");
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.evaluate(() => localStorage.clear());
  await load(page);
  await page.getByLabel("1 ngày", { exact: true }).check();
  await page.getByLabel("Ẩm thực", { exact: true }).check();
  await page.getByLabel("Bạn bè", { exact: true }).check();
  await page.locator('[data-testid="finder-submit"]').click();
  await page.waitForSelector('[data-testid="finder-result"]');
  await page.locator('[data-testid="tour-tab"][data-tour="RD-05"]').click();
  await page.getByLabel("Thêm người lớn").click();
  await page.getByLabel("Thêm trẻ em").click();
  await page.locator('[data-stop="5-4"]').click();
  await page.locator('[data-lang-switch="en"]').click();
  await page.waitForURL(/\/demos\/rong-dam\/en$/);
  await page.waitForSelector('[data-testid="calculator"]');
  await page.waitForTimeout(1800);
  ok((await page.locator('[data-testid="tour-tab"][data-tour="RD-05"]').getAttribute("aria-pressed")) === "true", "EN: tour RD-05 vẫn được chọn");
  ok(/Hue: A Day in the Imperial City/.test(await page.locator('[data-testid="explorer-tour-name"]').innerText()), "EN: tên tour bằng tiếng Anh");
  ok((await page.locator('[data-testid="adults"]').innerText()) === "3" && (await page.locator('[data-testid="children"]').innerText()) === "1", "EN: số khách 3 NL + 1 TE giữ nguyên");
  ok((await page.locator('[data-stop="5-4"]').getAttribute("aria-pressed")) === "true", "EN: điểm dừng đang chọn giữ nguyên");
  ok((await total(page)).endsWith("₫"), "EN: vẫn tính bằng VND", await total(page));
  ok(await page.getByLabel("One day", { exact: true }).isChecked() && await page.getByLabel("Local food", { exact: true }).isChecked() && await page.getByLabel("With friends", { exact: true }).isChecked(), "EN: lựa chọn Trip Finder giữ nguyên");
  ok(await page.locator('[data-testid="finder-result"]').count() >= 1, "EN: kết quả Trip Finder vẫn còn");
  ok(/Hue/i.test(await page.locator('[data-testid="selected-stop"]').innerText()) && /Visit Thien Mu Pagoda/.test(await page.locator('[data-testid="selected-stop"]').innerText()), "EN: nhãn điểm dừng dịch tự nhiên");
  const enText = await page.locator("main").innerText();
  ok(!/Bạn |Chọn |Tìm |Lịch trình|tham khảo/.test(enText.replace(/Rong Dặm/g, "")), "EN: không lẫn chữ tiếng Việt ở nội dung chính", (enText.match(/.{20}(Bạn |Chọn |Tìm |Lịch trình|tham khảo).{20}/) || [""])[0]);
  await page.locator('[data-lang-switch="vi"]').click();
  await page.waitForURL(/\/demos\/rong-dam$/);
  await page.waitForSelector('[data-testid="calculator"]');
  await page.waitForTimeout(1800);
  ok((await page.locator('[data-testid="adults"]').innerText()) === "3" && (await page.locator('[data-testid="tour-tab"][data-tour="RD-05"]').getAttribute("aria-pressed")) === "true", "VI: quay lại vẫn giữ trạng thái");
  ok(await page.evaluate(() => document.documentElement.lang) === "vi", "VI: html lang trả về vi");
  await ctx.close();
}

// ---------- 8. Link thoát, ref, bàn phím, menu mobile
console.log("[8] Link thoát (industry/solution/utm), ref, bàn phím, menu mobile");
{
  const { ctx, page } = await newPage();
  await load(page, VI + "?ref=ABC123");
  // proxy.ts chỉ đặt tct_ref khi mã thuộc đối tác ĐÃ DUYỆT trong DB; demo không tự đọc/ghi cookie này.
  const cookies = await ctx.cookies();
  ok(page.errors.length === 0, "mở với ?ref= không lỗi", page.errors.join("|"));
  ok(await page.evaluate(() => !document.cookie.includes("tct_ref")) , "demo không tự ghi cookie tct_ref bằng JS", cookies.map((c) => c.name).join(","));
  ok((await page.locator("a[data-cta=consult]").first().getAttribute("href")).startsWith("/lien-he?"), "với ?ref= link tư vấn vẫn là đường dẫn cùng origin (cookie first-party tự đi theo)");
  for (const [lang, url] of [["vi", VI], ["en", EN]]) {
    await load(page, url);
    const hrefs = await page.locator("a[data-cta=consult]").evaluateAll((a) => a.map((x) => x.getAttribute("href")));
    ok(hrefs.length >= 2, `${lang}: có >=2 link tư vấn`, String(hrefs.length));
    ok(hrefs.every((h) => h.startsWith("/lien-he?") && /industry=Tour/.test(h) && /solution=hospitality/.test(h) && /utm_campaign=rong-dam/.test(h) && /utm_source=showroom/.test(h)), `${lang}: link tư vấn có industry/solution/utm`, hrefs[0]);
  }
  await load(page);
  ok(/Muốn website như thế này|Trần Công Tiến/.test(await page.locator("body").innerText()), "có link tư vấn và dòng ký tên");
  await page.keyboard.press("Tab");
  ok(await page.evaluate(() => document.activeElement?.textContent?.includes("Bỏ qua điều hướng")), "Tab đầu tiên là skip link");
  let reached = false;
  for (let i = 0; i < 25; i++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => /Tìm chuyến đi của mình|Lên đường thôi/.test(document.activeElement?.textContent || ""))) { reached = true; break; } }
  ok(reached, "Tab tới CTA chính");
  await ctx.close();
  const m = await newPage({ viewport: { width: 390, height: 844 } });
  await load(m.page);
  const btn = m.page.getByRole("button", { name: "Mở menu điều hướng" });
  await btn.click();
  ok(await m.page.locator("#rd-menu").isVisible(), "menu mobile mở");
  await noBanned(m.page, "menu mobile đang mở (390px)");
  await m.page.keyboard.press("Escape");
  ok(!(await m.page.locator("#rd-menu").count()), "Escape đóng menu");
  ok(await m.page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "rd-menu"), "trả focus về nút menu");
  const sz = await m.page.evaluate(() => [...document.querySelectorAll("button, a.btn, input[type=text], .chip input")].filter((e) => e.offsetParent).map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height), e.className.slice(0, 20)]; }).filter(([w, h]) => w < 44 || h < 44));
  ok(sz.length === 0, "touch target >=44px", JSON.stringify(sz.slice(0, 5)));
  const fs = await m.page.evaluate(() => [...document.querySelectorAll("input")].filter((i) => i.type !== "range" && i.type !== "radio" && i.type !== "checkbox").map((i) => parseFloat(getComputedStyle(i).fontSize)));
  ok(fs.every((x) => x >= 16), "input >=16px", fs.join(","));
  await m.ctx.close();
}

// ---------- 9. Reduced motion
console.log("[9] prefers-reduced-motion: nội dung hiện đủ");
{
  const { ctx, page } = await newPage({ reducedMotion: "reduce" });
  await load(page);
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll('[data-rd]')];
    return { n: els.length, hidden: els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99 && e.getAttribute("data-rd") !== "doodle-cover").length, cover: getComputedStyle(document.querySelector('[data-rd="doodle-cover"]')).transform };
  });
  ok(r.n > 10 && r.hidden === 0, "mọi phần tử data-rd hiện đủ, không hiệu ứng", JSON.stringify(r));
  ok(await page.locator('[data-testid="finder-form"]').isVisible() && await page.locator("#rd-h1").isVisible(), "tiêu đề và form hiện");
  await ctx.close();
}

// ---------- 10. Credits + ảnh
console.log("[10] Credits, ảnh không lặp, ảnh load");
{
  const { ctx, page } = await newPage();
  const res = await page.goto(`${VI}/credits`, { waitUntil: "networkidle", timeout: 120000 });
  ok(res.status() === 200, "credits 200");
  ok(await page.locator("meta[name=robots][content*=noindex]").count() > 0, "credits noindex");
  ok((await page.locator("li[class*=creditCard]").count()) === 12, "credits liệt kê 12 ảnh", String(await page.locator("li[class*=creditCard]").count()));
  ok(/Bricolage Grotesque/.test(await page.locator("body").innerText()) && /Lexend/.test(await page.locator("body").innerText()), "credits liệt kê font");
  await noBanned(page, "trang credits (không có chữ Demo/minh hoạ)");
  const ct = norm(await page.locator("main").innerText());
  ok(/do .*Trần Công Tiến.* thiết kế để giới thiệu phong cách thiết kế website/.test(ct) && /ảnh stock/.test(ct), "credits giữ lời công khai trung thực", ct.slice(-200));
  ok(await page.locator("a[href^='https://unsplash.com/photos/'], a[href^='https://www.pexels.com/photo/']").count() >= 12, "credits có link nguồn");
  await ctx.close();
  const p2 = await newPage();
  await load(p2.page);
  await slowScroll(p2.page);
  const imgs = await p2.page.evaluate(() => [...document.querySelectorAll("main img")].map((i) => ({ src: decodeURIComponent(new URL(i.currentSrc || i.src).searchParams.get("url") || i.src), w: i.naturalWidth })));
  const names = imgs.map((i) => (i.src.match(/rong-dam\/([a-z-]+?)-\d+\.webp/) || [])[1]).filter(Boolean);
  ok(imgs.every((i) => i.w > 0), "mọi ảnh tải được", JSON.stringify(imgs.filter((i) => !i.w)));
  ok(new Set(names).size === names.length, "không lặp ảnh trong trang", names.join(","));
  ok(names.length >= 11, "trang dùng >=11 ảnh", String(names.length));
  await p2.ctx.close();
}

// ---------- 11. Ảnh chụp
console.log("[11] Ảnh chụp 1440x900 và 390x844 (VI, EN)");
for (const [lang, url] of [["vi", VI], ["en", EN]]) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, page } = await newPage({ viewport: { width: w, height: h } });
    await load(page, url);
    await page.screenshot({ path: path.join(SHOTS, `${lang}-${w}-hero.png`) });
    await slowScroll(page);
    await page.screenshot({ path: path.join(SHOTS, `${lang}-${w}-full.png`), fullPage: true });
    // trạng thái tương tác
    await page.getByLabel(lang === "vi" ? "1 ngày" : "One day", { exact: true }).check();
    await page.getByLabel(lang === "vi" ? "Văn hoá" : "Culture & heritage", { exact: true }).check();
    await page.getByLabel(lang === "vi" ? "Cặp đôi" : "As a couple", { exact: true }).check();
    await page.locator('[data-testid="finder-submit"]').click();
    await page.waitForSelector('[data-testid="finder-result"]');
    await page.addStyleTag({ content: "header[class*=header]{position:relative!important}" });
    await page.locator("#trip-finder").screenshot({ path: path.join(SHOTS, `${lang}-${w}-finder.png`) });
    await page.locator('[data-testid="tour-tab"][data-tour="RD-06"]').click();
    await page.locator('[data-stop="6-1-3"]').click();
    await page.locator("#itinerary").screenshot({ path: path.join(SHOTS, `${lang}-${w}-explorer.png`) });
    ok(true, `chụp ${lang} ${w}`);
    await ctx.close();
  }
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) { console.log("Thất bại:\n- " + failures.join("\n- ")); process.exit(1); }
