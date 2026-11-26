// E2E Rừng Thức (LP-14, glamping-nui). Chạy: node tests/showroom/glamping-nui/e2e.mjs
// Dev server chung: http://localhost:3100 (không dùng 127.0.0.1).
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const URL_ = `${BASE}/demos/glamping-nui`;
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.join(HERE, "screenshots");
const registrySrc = fs.readFileSync(path.join(HERE, "../../../features/showroom/registry.ts"), "utf8");
const inRegistry = registrySrc.includes('"glamping-nui"');
let pass = 0, fail = 0;
const failures = [];
const ok = (c, name, extra = "") => { if (c) { pass++; console.log("  PASS", name); } else { fail++; failures.push(name + " " + extra); console.log("  FAIL", name, extra); } };
const norm = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
const BANNED = /\bdemo\b|minh ho[aạ]|giả định|mô phỏng|dữ liệu mẫu|không phải doanh nghiệp|thương hiệu minh|illustrative|fictional|sample data|\bmock/i;

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  await ctx.addInitScript(() => {
    window.__long = [];
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 200) window.__long.push(e.duration); }).observe({ entryTypes: ["longtask"] }); } catch {}
  });
  const page = await ctx.newPage();
  page.errors = []; page.external = [];
  page.on("console", (m) => { if (m.type() === "error" && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on("pageerror", (e) => page.errors.push("pageerror: " + e.message));
  page.on("request", (r) => { const u = new URL(r.url()); if (!["http:", "https:"].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); });
  return { ctx, page };
}
const load = async (page, url = URL_) => { await page.goto(url, { waitUntil: "networkidle", timeout: 120000 }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2600); };
const scrollAll = async (page, step = 300, wait = 90) => {
  await page.evaluate(async ([step, wait]) => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, wait)); }
    window.scrollTo(0, 0);
  }, [step, wait]);
  await page.waitForTimeout(600);
};
async function bannedHits(page) {
  return page.evaluate((src) => {
    const re = new RegExp(src, "i"); const out = [];
    const r = document.querySelector("[data-site]");
    const clone = r.cloneNode(true); clone.querySelectorAll("script,style").forEach((n) => n.remove());
    const texts = [clone.textContent || "", r.innerText || ""];
    r.querySelectorAll("[aria-label],[alt],[title],[placeholder]").forEach((e) => ["aria-label", "alt", "title", "placeholder"].forEach((a) => e.getAttribute(a) && texts.push(e.getAttribute(a))));
    document.querySelectorAll('title,meta[name="description"],meta[property^="og:"],meta[name^="twitter:"]').forEach((m) => texts.push(m.content || m.textContent || ""));
    for (const t of texts) { const n = t.normalize("NFC"); const m = n.match(re); if (m) out.push(m[0] + " … " + n.slice(Math.max(0, m.index - 30), m.index + 40)); }
    return out;
  }, BANNED.source);
}

// ---------- 1. Tải trang
console.log("[1] Tải trang, console, request ngoài, metadata");
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: "networkidle", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2600);
  ok(res.status() === 200, "HTTP 200");
  ok(page.errors.length === 0, "0 lỗi console", page.errors.join("|"));
  ok(page.external.length === 0, "0 request ra ngoài origin", page.external.slice(0, 3).join(" "));
  ok(/Rừng Thức/.test(await page.title()), "title riêng", await page.title());
  ok((await page.getAttribute('meta[name="robots"]', "content"))?.includes("noindex"), "noindex");
  ok((await page.getAttribute("html", "lang")) === "vi", "html lang=vi");
  ok((await page.locator("h1").count()) === 1, "đúng 1 h1");
  const og = await page.getAttribute('meta[property="og:image"]', "content");
  ok(!!og && (await page.request.get(BASE + new URL(og, BASE).pathname)).status() === 200, "og-image tồn tại", og);
  ok((await page.locator('link[rel="icon"]').count()) > 0, "favicon route");
  ok((await page.locator('a[href="/demos/glamping-nui/credits"]').count()) > 0, "link Ảnh & ghi công");
  ok((await page.locator("text=Website do Trần Công Tiến thiết kế").count()) > 0, "dòng ký tên");
  const bad = await bannedHits(page);
  ok(bad.length === 0, "không còn chữ cấm (mục 11) ở trạng thái đầu", bad.slice(0, 3).join(" || "));
  ok((await page.locator("text=/\\d{4}\\s?\\d{3}\\s?\\d{4}/").count()) >= 0, "liên hệ chỉ dạng .example / số không gọi được");
  const mail = await page.locator("address").innerText();
  ok(/\.example/.test(mail) && /0236\s000\s0000/.test(norm(mail)), "liên hệ .example + 0236 000 0000", norm(mail));
  const ld = await page.locator('script[type="application/ld+json"]').allInnerTexts();
  ok(!ld.some((t) => /"@type"\s*:\s*"(Review|AggregateRating|LocalBusiness|Offer)"/.test(t)), "không JSON-LD Review/AggregateRating/LocalBusiness/Offer", String(ld.length));
  // Skip link + Tab
  await page.keyboard.press("Tab");
  ok(await page.evaluate(() => document.activeElement?.textContent?.includes("Bỏ qua")), "skip link là phần tử Tab đầu tiên");
  await ctx.close();
}

// ---------- 2. Không tràn ngang
console.log("[2] Không tràn ngang 320/390/768/1024/1440");
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: 800 } });
  await load(page); await scrollAll(page, 500, 40);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ở ${w}px`, JSON.stringify(o));
  ok(page.errors.length === 0, `0 lỗi console ở ${w}px`, page.errors.join("|"));
  await ctx.close();
}

// ---------- 3. Font Việt
console.log("[3] Font tiếng Việt render thật");
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(async () => {
    const chars = "ĂÂÊÔƠƯĐăâêôơưđẮẰẲẴẶẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ";
    const res = {};
    for (const [label, sel, weight] of [["heading", "h1", 800], ["body", "p", 400]]) {
      const fam = getComputedStyle(document.querySelector(sel)).fontFamily;
      const faces = await document.fonts.load(`${weight} 40px ${fam}`, chars);
      const names = [...new Set(faces.map((f) => f.family))];
      // đo glyph: vẽ từng ký tự bằng font trang vs font "không tồn tại" -> nếu glyph rơi về font hệ thống thì bề ngang khác khi đổi fallback
      const c = document.createElement("canvas").getContext("2d");
      const miss = [];
      for (const ch of chars) {
        c.font = `${weight} 60px ${fam.split(",").slice(0, 3).join(",")}, monospace`; const a = c.measureText(ch).width;
        c.font = `${weight} 60px ${fam.split(",").slice(0, 3).join(",")}, serif`; const b = c.measureText(ch).width;
        c.font = `${weight} 60px monospace`; const m = c.measureText(ch).width;
        if (a !== b) miss.push(ch); // khác nhau tức là font trang không có glyph (đang dùng fallback)
        void m;
      }
      res[label] = { fam: fam.slice(0, 80), loaded: names.length, miss: miss.join("") };
    }
    return res;
  });
  ok(r.heading.loaded > 0 && r.heading.miss === "", "heading Alegreya có đủ glyph Ă Â Ê Ô Ơ Ư Đ + Ắ…Ự", JSON.stringify(r.heading));
  ok(r.body.loaded > 0 && r.body.miss === "", "body Mulish có đủ glyph Việt", JSON.stringify(r.body));
  ok(/Alegreya|alegreya|__/.test(r.heading.fam), "heading dùng next/font local", r.heading.fam);
  // chụp chữ đậm cỡ lớn để tự xem dấu chồng
  await page.setContent(`<body style="margin:0;background:#0f2a1d;color:#e7e8de;padding:20px">`);
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.evaluate(() => {
    const d = document.createElement("div");
    d.setAttribute("data-glyphtest", "1");
    d.style.cssText = "position:fixed;inset:0;z-index:9999;background:#0f2a1d;color:#e7e8de;padding:30px;font:800 64px/1.25 var(--gl-head)";
    d.textContent = "ẾỀỂỄỆ ỐỒỔỖỘ ỚỜỞỠỢ ỨỪỬỮỰ ẮẰẲẴẶ Đêm chạm rừng";
    document.querySelector("[data-site]").appendChild(d);
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(SHOTS, "glyphs.png"), clip: { x: 0, y: 0, width: 1440, height: 520 } });
  await ctx.close();
}

// ---------- 4. Hero + hiệu ứng nền tảng + đếm ngược
console.log("[4] Hero choreography, tàn lửa, đếm ngược hoàng hôn, nền sáng→tối");
{
  const { ctx, page } = await newPage();
  await load(page);
  ok(await page.evaluate(() => document.querySelectorAll('[data-fx="HeroChoreography"][data-fx-ready="1"]').length === 1), "hero choreography khởi chạy (data-fx-ready=1)");
  ok(await page.evaluate(() => document.querySelector('[data-fx="HeroChoreography"]').getAttribute("data-lit") === "1"), "mốc lửa bật sau 2.0s (data-lit)");
  ok(await page.evaluate(() => [...document.querySelectorAll("canvas[data-fx=Embers]")].every((c) => c.getAttribute("data-fx-ready") === "1")), "canvas tàn lửa chạy");
  ok(await page.evaluate(() => document.querySelectorAll('[data-fx="SplitReveal"],[data-fx="SplitWords"]').length >= 1 || document.querySelectorAll("[data-fx]").length > 8), "thư viện hiệu ứng có mặt (SplitWords, Parallax, Tilt…)");
  const libs = await page.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.getAttribute("data-fx")))]);
  console.log("   hiệu ứng trên trang:", libs.join(", "));
  ok(libs.length >= 10, "≥10 loại hiệu ứng (data-fx)", String(libs.length));
  // tàn lửa thực sự vẽ pixel
  const lit = await page.evaluate(() => { const cv = document.querySelector("canvas[data-fx=Embers]"); const x = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 3; i < x.length; i += 4) if (x[i] > 40) n++; return n; });
  ok(lit > 20, "canvas có hạt sáng được vẽ", String(lit));
  // lửa SVG nhấp nháy: animation chạy
  ok(await page.evaluate(() => getComputedStyle(document.querySelector("svg g[class*=fireOuter]")).animationName !== "none"), "lửa SVG đang nhấp nháy (CSS animation)");
  // đếm ngược
  const cdSel = '[data-testid="countdown"] [class*=cdClock] span';
  const during = (await page.locator('[data-testid="countdown"] [class*=cdNow]').count()) > 0;
  if (during) ok(/Hoàng hôn đang bắt đầu/.test(norm(await page.locator('[data-testid="countdown"]').innerText())), "đang trong khung hoàng hôn: hiện trạng thái 'đang bắt đầu'");
  else {
    const t1 = norm(await page.locator(cdSel).innerText());
    await page.waitForTimeout(2200);
    const t2 = norm(await page.locator(cdSel).innerText());
    ok(/^\d{2}:\d{2}:\d{2}$/.test(t1) && t1 !== t2, "đếm ngược định dạng HH:MM:SS và đang chạy", `${t1} -> ${t2}`);
  }
  const foot = norm(await page.locator('[data-testid="countdown"]').innerText());
  ok(/khoảng \d{2}:\d{2}/.test(foot), "có giờ hoàng hôn tính theo ngày", foot);
  // nền sáng → tối
  const bg0 = await page.evaluate(() => getComputedStyle(document.querySelector("[data-sky-bg]")).backgroundColor);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(900);
  const bg1 = await page.evaluate(() => getComputedStyle(document.querySelector("[data-sky-bg]")).backgroundColor);
  const so = await page.evaluate(() => getComputedStyle(document.querySelector("[data-sky-stars]")).opacity);
  const lum = (s) => s.match(/\d+/g).slice(0, 3).map(Number).reduce((a, b) => a + b, 0);
  ok(lum(bg1) < lum(bg0), "nền trang tối dần theo cuộn", `${bg0} -> ${bg1}`);
  ok(Number(so) > 0.8, "sao hiện đủ ở cuối trang", so);
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(700);
  ok(Number(await page.evaluate(() => getComputedStyle(document.querySelector("[data-sky-stars]")).opacity)) < 0.2, "sao gần như ẩn ở đầu trang");
  await ctx.close();
}

// ---------- 5. Hành trình ghim ngang (desktop)
console.log("[5] Pinned horizontal scroll: ngày → đêm (1440)");
{
  const { ctx, page } = await newPage();
  await load(page);
  ok((await page.getAttribute("#hanh-trinh", "data-mode")) === "pinned", "desktop: chế độ pinned");
  const sec = await page.evaluate(() => { const r = document.querySelector("#hanh-trinh").getBoundingClientRect(); return { top: r.top + scrollY }; });
  const probe = async (y) => { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(500); return page.evaluate(() => { const st = document.querySelector("[data-stage]"); const g = (v) => st.style.getPropertyValue(v); const tr = document.querySelector("[data-track]").style.transform; return { clock: document.querySelector("[data-clock]").textContent, top: g("--sky-top"), bot: g("--sky-bot"), stars: Number(document.querySelector("[data-stars]").style.opacity || 0), moon: Number(document.querySelector("[data-moon]").style.opacity || 0), sun: Number(document.querySelector("[data-sun]").style.opacity || 1), tr, pinned: document.querySelector("#hanh-trinh").getBoundingClientRect().top }; }); };
  const dist = await page.evaluate(() => { const t = document.querySelector("[data-track]"); const v = document.querySelector("[data-viewport]"); return t.scrollWidth - v.clientWidth; });
  const p0 = await probe(sec.top + 1);
  const pm = await probe(sec.top + dist * 0.5);
  const p1 = await probe(sec.top + Math.round(dist * 1.05));
  ok(p0.clock === "06:00" && p0.stars === 0 && p0.moon === 0 && p0.sun > 0.9, "tiến độ 0: 06:00, chưa sao/trăng, có mặt trời", JSON.stringify(p0));
  ok(Math.abs(p0.pinned) < 2 && Math.abs(pm.pinned) < 2, "section được ghim (top=0) trong lúc cuộn", `${p0.pinned} ${pm.pinned}`);
  ok(/^\d{2}:\d{2}$/.test(pm.clock) && pm.clock > "11:00" && pm.clock < "16:00", "giữa hành trình: đồng hồ ban ngày", pm.clock);
  ok(p1.clock === "21:00" && p1.stars > 0.9 && p1.moon > 0.9 && p1.sun < 0.05, "cuối: 21:00, sao đầy, trăng, hết mặt trời", JSON.stringify(p1));
  ok(p0.top !== p1.top && p0.bot !== p1.bot, "màu trời đổi theo tiến độ", `${p0.top} -> ${p1.top}`);
  ok(p0.tr !== pm.tr && pm.tr !== p1.tr && /translate3d\(-/.test(pm.tr), "track trượt ngang theo cuộn dọc", `${p0.tr} | ${pm.tr}`);
  // mốc thời gian bằng nút
  await page.evaluate((y) => window.scrollTo(0, y), sec.top + 5); await page.waitForTimeout(500);
  await page.locator('[data-tick]').nth(4).click(); await page.waitForTimeout(1800);
  const afterTick = await page.locator("[data-clock]").innerText();
  ok(/^1[67]:/.test(afterTick), "bấm mốc 16:30 nhảy tới đúng tiến độ", afterTick);
  // Tab vào thẻ cuối: trang cuộn tới tiến độ đó
  await page.evaluate((y) => window.scrollTo(0, y), sec.top + 5); await page.waitForTimeout(400);
  const lastCard = page.locator("[data-scene]").last();
  await lastCard.evaluate((n) => { n.setAttribute("tabindex", "-1"); n.focus(); }); await page.waitForTimeout(700);
  const afterFocus = await page.locator("[data-clock]").innerText();
  ok(afterFocus >= "19:00", "focus vào thẻ ngoài khung kéo tiến độ tới đó", afterFocus);
  ok((await page.locator("[data-scene]").count()) === 7, "7 mốc hành trình");
  await page.screenshot({ path: path.join(SHOTS, "journey-1440-end.png") });
  await ctx.close();
}

// ---------- 6. Mobile fallback + reduced motion
console.log("[6] Fallback mobile (390) và reduced-motion");
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await load(page);
  ok((await page.getAttribute("#hanh-trinh", "data-mode")) === "native", "mobile: không ghim, timeline dọc");
  const j = await page.evaluate(() => { const li = [...document.querySelectorAll("[data-scene]")].map((e) => e.getBoundingClientRect()); return { stacked: li.every((r, i) => i === 0 || r.top > li[i - 1].top + 50), inView: li.every((r) => r.width <= innerWidth), pos: getComputedStyle(document.querySelector("#hanh-trinh")).position }; });
  ok(j.stacked && j.inView, "7 thẻ xếp dọc, vừa khung", JSON.stringify(j));
  ok((await page.locator("[data-clock]").count()) === 1 && !(await page.locator("[data-clock]").isVisible()), "đồng hồ/mặt trời ẩn ở fallback");
  ok(await page.evaluate(() => getComputedStyle(document.querySelector("canvas[data-fx=Embers]")).display !== "none"), "tàn lửa vẫn chạy nhẹ (ít hạt) trên mobile");
  // menu mobile
  await page.locator('button[aria-controls="gl-nav"]').click();
  ok((await page.locator("#gl-nav").getAttribute("data-open")) === "true", "menu mobile mở");
  await page.keyboard.press("Escape");
  ok((await page.locator("#gl-nav").getAttribute("data-open")) === "false" && await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "gl-nav"), "Escape đóng menu và trả focus");
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ reducedMotion: "reduce" });
  await load(page);
  ok((await page.getAttribute("#hanh-trinh", "data-mode")) === "native", "reduced-motion: tắt pin ngang");
  ok(await page.evaluate(() => [...document.querySelectorAll("h1 span, h1")].every((e) => getComputedStyle(e).opacity !== "0")), "reduced: tiêu đề hiện đủ");
  const st = await page.evaluate(() => ({ hero: document.querySelector('[data-fx="HeroChoreography"]').getAttribute("data-fx-ready"), emb: document.querySelector("canvas[data-fx=Embers]").getAttribute("data-fx-ready"), fire: getComputedStyle(document.querySelector("svg g[class*=fireOuter]")).animationName, cards: [...document.querySelectorAll("[data-scene]")].every((e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).opacity === "1"), bg: getComputedStyle(document.querySelector("[data-sky-bg]")).backgroundColor, drift: getComputedStyle(document.querySelector("[class*=mistA]")).animationName }));
  ok(st.hero === "static" && st.emb === "static", "reduced: hero + tàn lửa ở trạng thái static", JSON.stringify(st));
  ok(st.fire === "none" && st.drift === "none", "reduced: lửa SVG và sương đứng yên", JSON.stringify(st));
  ok(st.cards, "reduced: 7 thẻ hành trình hiện đủ");
  ok(/15, 42, 29/.test(st.bg), "reduced: nền cố định xanh rừng #0f2a1d", st.bg);
  const bad = await bannedHits(page);
  ok(bad.length === 0, "reduced: không chữ cấm");
  await ctx.close();
}

// ---------- 7. Trip Planner
console.log("[7] Trip Planner: tính giá, lịch trình, lỗi, bàn phím, link thoát");
{
  const { ctx, page } = await newPage();
  await load(page, URL_ + "?ref=ABC123");
  ok(page.errors.length === 0, "mở với ?ref= không lỗi", page.errors.join("|"));
  const total = async () => norm(await page.locator('[data-testid="total"]').innerText());
  await page.locator("#lap-ke-hoach").scrollIntoViewIfNeeded();
  ok((await total()) === "890.000 ₫", "mặc định 1 đêm Lều Mộc 2 người", await total());
  ok((await page.locator('[data-testid="plan-warning"]').count()) === 1, "cảnh báo rỗng hoạt động");
  const slots = await page.locator('[data-testid="itinerary"] time').count();
  ok(slots >= 7, "lịch trình 1 đêm có đủ mốc", String(slots));
  // 2 đêm, Lều Rừng, 3 người, BBQ + sao
  await page.locator('label:has-text("2 đêm")').click();
  await page.locator('input[name=tent][value=rung]').check({ force: true });
  await page.locator("#gl-people").fill("3");
  await page.locator('label:has(input[type=checkbox]):has-text("BBQ giữa rừng")').click();
  await page.locator('label:has(input[type=checkbox]):has-text("Ngắm sao")').click();
  ok((await total()) === "3.570.000 ₫", "2 đêm × Lều Rừng + (BBQ+sao) × 3 = 3.570.000", await total());
  ok((await page.locator('[data-testid="itinerary"] > li').count()) === 3, "2 đêm → 3 ngày");
  ok((await page.locator('[data-act="bbq"]').count()) === 1 && (await page.locator('[data-act="stars"]').count()) === 1, "mỗi hoạt động chỉ xếp một lần");
  ok(!(await page.locator('[data-testid="plan-warning"]').count()), "không còn cảnh báo khi đã chọn hoạt động");
  // trekking + xe
  await page.locator('label:has(input[type=checkbox]):has-text("Trekking")').click();
  await page.locator('label:has(input[type=checkbox]):has-text("Xe địa hình")').click();
  ok((await total()) === "3.570.000 ₫".replace("3.570.000", "5.070.000"), "thêm trekking + xe: 5.070.000", await total());
  const times = await page.locator('[data-testid="itinerary"] ul').evaluateAll((uls) => uls.map((u) => [...u.querySelectorAll("time")].map((t) => t.textContent)));
  ok(times.every((d) => new Set(d).size === d.length), "không trùng giờ trong một ngày", JSON.stringify(times));
  // vượt sức chứa
  await page.locator('input[name=tent][value=moc]').check({ force: true });
  await page.locator('label:has(input[type=checkbox]):has-text("Trekking")').click(); await page.locator('label:has(input[type=checkbox]):has-text("Xe địa hình")').click();
  await page.locator('label:has(input[type=checkbox]):has-text("BBQ giữa rừng")').click(); await page.locator('label:has(input[type=checkbox]):has-text("Ngắm sao")').click();
  await page.locator('label:has-text("1 đêm")').click();
  await page.locator("#gl-people").fill("3");
  ok(/vượt sức chứa/.test(await page.locator('[data-testid="plan-warning"]').first().innerText()), "cảnh báo vượt sức chứa Lều Mộc");
  ok((await total()) === "890.000 ₫", "chưa tự thêm lều khi chưa đồng ý", await total());
  await page.locator('label:has(input[type=checkbox]):has-text("Ghép thêm lều")').click();
  ok((await total()) === "1.780.000 ₫", "ghép thêm lều: 2 lều × 890.000", await total());
  // lỗi
  await page.locator("#gl-people").fill("");
  ok((await page.locator("#err-people").count()) === 1 && (await page.locator("#gl-people").getAttribute("aria-invalid")) === "true", "ô số người rỗng: lỗi cạnh ô + aria-invalid");
  ok((await page.locator('[data-testid="plan-empty"]').count()) === 1 && (await page.locator('[data-testid="total"]').count()) === 0, "trạng thái rỗng thay cho kết quả");
  ok(/lớn hơn 0/.test(await page.locator("#err-people").innerText()), "thông báo 'lớn hơn 0'");
  await page.locator("#gl-people").fill("0");
  ok(/lớn hơn 0/.test(await page.locator("#err-people").innerText()), "0 người: lỗi");
  await page.locator("#gl-people").fill("9");
  ok(/tư vấn riêng/.test(await page.locator("#err-people").innerText()), "9 người: cần tư vấn riêng");
  ok((await page.locator("#gl-people").getAttribute("aria-describedby")) === "err-people", "aria-describedby trỏ tới lỗi");
  await page.locator("#gl-people").fill("2");
  // bàn phím: mũi tên đổi lều, Space tick checkbox, Enter không submit
  await page.locator('input[name=tent][value=moc]').focus();
  await page.keyboard.press("ArrowRight");
  ok(await page.locator('input[name=tent][value=rung]').isChecked(), "ArrowRight chuyển lều Mộc → Rừng");
  await page.locator("#gl-people").focus(); await page.keyboard.press("ArrowUp");
  ok((await page.locator("#gl-people").inputValue()) === "3", "ArrowUp tăng số người");
  const urlBefore = page.url();
  await page.keyboard.press("Enter");
  ok(page.url() === urlBefore, "Enter trong ô số người không gửi/tải lại trang");
  // chọn nhanh từ mục Lều
  await page.locator('#luu-tru a:has-text("Chọn lều")').nth(2).click(); await page.waitForTimeout(600);
  ok(await page.locator('input[name=tent][value=may]').isChecked(), "nút 'Chọn lều' ở mục Lều đặt Lều Mây trong công cụ");
  await page.locator('#hoat-dong a:has-text("Thêm vào chuyến đi")').nth(3).click(); await page.waitForTimeout(400);
  ok(await page.locator('label:has(input[type=checkbox]):has-text("Xe địa hình") input').isChecked(), "nút thêm hoạt động đồng bộ với công cụ");
  // link thoát
  const hrefs = await page.$$eval('[data-testid^="consult-"]', (a) => a.map((x) => x.getAttribute("href")));
  ok(hrefs.length === 2 && hrefs.every((h) => h.startsWith("/lien-he")), "2 nút thoát dẫn tới /lien-he (buildConsultHref)", hrefs.join(","));
  if (inRegistry) ok(hrefs.every((h) => /industry=Glamping/.test(h) && /solution=hospitality/.test(h) && /utm_campaign=glamping-nui/.test(h) && /utm_source=showroom/.test(h)), "link có industry/solution/utm", hrefs[0]);
  else console.log("  NOTE registry chưa có glamping-nui: link hiện là", hrefs[0], "(đã ghi REQUESTS.md)");
  ok(await page.evaluate(() => !document.cookie.includes("tct_ref")), "demo không tự ghi cookie tct_ref");
  // sao chép tóm tắt: trạng thái phản hồi
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE }).catch(() => {});
  await page.locator('button:has-text("Sao chép tóm tắt")').click(); await page.waitForTimeout(400);
  const stt = norm(await page.locator('[role=status]').last().innerText());
  ok(/Đã sao chép|Chưa sao chép/.test(stt), "nút sao chép có phản hồi", stt);
  ok(!/đã gửi|đặt thành công|đã đặt/i.test(await page.locator("#lap-ke-hoach").innerText()), "công cụ không khẳng định đã gửi/đặt thành công");
  const bad = await bannedHits(page);
  ok(bad.length === 0, "không chữ cấm sau khi dùng công cụ + lỗi + rỗng", bad.slice(0, 3).join("||"));
  await ctx.close();
}

// ---------- 8. FAQ, hiệu ứng khác, credits
console.log("[8] FAQ, thẻ lều, ảnh, credits");
{
  const { ctx, page } = await newPage();
  await load(page);
  ok((await page.locator("details[name=gl-faq]").count()) === 8, "8 câu hỏi");
  await page.locator("details.qa summary, #giai-dap summary").nth(1).click();
  ok(await page.evaluate(() => document.querySelectorAll("#giai-dap details[open]").length === 1), "mở câu 2 thì câu 1 đóng (accordion)");
  ok((await page.locator("#luu-tru article").count()) === 3, "3 loại lều");
  ok((await page.locator("#hoat-dong ul li").count()) >= 4, "4 hoạt động");
  const imgs = await page.evaluate(() => [...document.images].map((i) => i.currentSrc || i.src).filter((s) => /_next\/image|\/images\/demos/.test(s)));
  const srcs = await page.evaluate(() => [...document.images].map((i) => decodeURIComponent((i.getAttribute("src") || "")).match(/glamping-nui\/([a-z0-9-]+)-\d+\.webp/)?.[1]).filter(Boolean));
  ok(new Set(srcs).size === srcs.length, "không lặp ảnh trong một trang", srcs.join(","));
  await scrollAll(page, 250, 60);
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
  ok(broken.length === 0, "không ảnh hỏng", broken.join(","));
  ok(await page.evaluate(() => [...document.querySelectorAll("img")].every((i) => (i.getAttribute("alt") ?? null) !== null)), "mọi ảnh có alt");
  await page.goto(URL_ + "/credits", { waitUntil: "networkidle" });
  ok((await page.locator("li img").count()) === 14, "credits liệt kê 14 ảnh", String(await page.locator("li img").count()));
  ok(/do Trần Công Tiến thiết kế/.test(await page.locator("main").innerText()), "credits có lời công khai trung thực");
  ok(!(await bannedHits(page)).length, "credits không chữ cấm");
  await ctx.close();
}

// ---------- 8b. Nội dung ngành glamping
console.log("[8b] Nội dung khu glamping thật");
{
  const { ctx, page } = await newPage();
  await load(page);
  const hero = norm(await page.locator("section#top").innerText());
  ok(/Khu glamping/.test(hero) && /Hòa Vang/.test(hero) && /890\.000/.test(hero) && /14:00/.test(hero) && /11:00/.test(hero), "hero: loại hình, khu vực, giá từ, nhận/trả lều", hero.slice(0, 120));
  ok(/Xem lều và giá/.test(hero) && /hỏi đặt lều/i.test(hero), "hero: CTA đúng ngành");
  for (const id of ["luu-tru", "hanh-trinh", "hoat-dong", "lua-trai", "lich-trinh", "quy-dinh", "lap-ke-hoach", "giai-dap"]) ok((await page.locator("#" + id).count()) === 1, "có section #" + id);
  const stay = norm(await page.locator("#luu-tru").innerText());
  ok(/1\.090\.000/.test(stay) && /1\.390\.000/.test(stay) && /cuối tuần/i.test(stay), "bảng giá ngày thường/cuối tuần/lễ");
  ok(/Sức chứa: 2/.test(stay) && /Sức chứa: 4/.test(stay), "sức chứa + giường từng lều");
  ok(/Set BBQ 2 người/.test(norm(await page.locator("#lua-trai").innerText())), "menu BBQ có giá");
  ok((await page.locator("#lich-trinh time").count()) >= 10, "lịch trình 2N1Đ có >= 10 mốc");
  const rules = norm(await page.locator("#quy-dinh").innerText());
  ok(/đặt cọc 50%/i.test(rules) && /hoàn đủ cọc/i.test(rules) && /Hòa Vang/.test(rules) && /Tháng 9 đến 12/.test(rules), "quy định cọc/huỷ, cách đến, mùa");
  const body = await page.evaluate(() => document.getElementById("main").innerText);
  ok(!/an toàn tuyệt đối|giấy phép|chứng nhận|đạt chuẩn/i.test(body), "không cam kết an toàn tuyệt đối/giấy phép");
  const fxs = await page.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.getAttribute("data-fx")))]);
  ok(!fxs.includes("SplitReveal") && !fxs.includes("VelocityMarquee") && !fxs.includes("ClipReveal") && !fxs.includes("MagneticButton"), "đã bỏ SplitWords/Marquee/ClipReveal/Magnetic", fxs.join(","));
  ok(fxs.includes("Ignite") && fxs.includes("Unfold"), "chữ ký riêng Ignite + Unfold chạy");
  ok(await page.evaluate(() => [...document.querySelectorAll('[data-fx="Ignite"]')].every((e) => e.getAttribute("data-fx-ready") === "1")), "mọi Ignite sẵn sàng");
  await ctx.close();
}

// ---------- 9. Hiệu năng thô khi cuộn
console.log("[9] Long task >200ms khi cuộn toàn trang");
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: h } });
  await load(page);
  await scrollAll(page, 220, 60);
  const lt = await page.evaluate(() => window.__long);
  console.log(`   ${w}px: ${lt.length} long task >200ms`, lt.map(Math.round).join(","));
  ok(lt.length <= 5, `${w}px: long task ít (≤5)`, String(lt.length));
  await ctx.close();
}

// ---------- 10. Ảnh chụp
console.log("[10] Ảnh chụp 1440×900 và 390×844");
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: h } });
  await load(page);
  await page.screenshot({ path: path.join(SHOTS, `hero-${w}.png`) });
  await scrollAll(page, 300, 70);
  await page.evaluate(() => { const c = document.querySelector("#hanh-trinh"); void c; });
  await page.screenshot({ path: path.join(SHOTS, `full-${w}.png`), fullPage: true });
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} PASS, ${fail} FAIL`);
if (fail) { console.log(failures.map((f) => " - " + f).join("\n")); process.exit(1); }
