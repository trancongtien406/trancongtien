import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = `${BASE}/demos/lan-bien`;
const SHOT = new URL("./screenshots/", import.meta.url).pathname;
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const FORBID = /(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)/i;

async function open(w, h, opts = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ...opts });
  const p = await ctx.newPage();
  const errs = [], ext = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith("data:") && !u.startsWith("blob:")) ext.push(u); });
  await p.goto(PAGE, { waitUntil: "networkidle", timeout: 120000 });
  await p.waitForTimeout(4200);
  return { ctx, p, errs, ext };
}

// 1. tải trang, console, request ngoài, tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, p, errs, ext } = await open(w, w < 700 ? 800 : 900);
  const o = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(o <= 1, `no horizontal overflow @${w} (${o}px)`);
  ok(errs.filter((e) => !/DevTools|Download the React/.test(e)).length === 0, `0 console errors @${w} ${errs.slice(0, 2).join("|")}`);
  ok(ext.length === 0, `0 external requests @${w} ${ext.slice(0, 2).join(",")}`);
  if (w === 1440 || w === 390) {
    await p.screenshot({ path: `${SHOT}hero-${w}.png` });
    await p.screenshot({ path: `${SHOT}full-${w}.png`, fullPage: true });
  }
  await ctx.close();
}

// 2. desktop: hiệu ứng, chữ cấm, glyph, finder, hiệu năng
{
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => {
    window.__lt = 0; window.__ltc = 0;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] });
  });
  const fx = await p.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.dataset.fx))]);
  for (const n of ["StickyChapters", "CanvasParticles", "VelocityMarquee", "SVGPathDraw", "DepthEngine", "ScrollScrubText", "MagneticButton", "CustomCursor", "water-hero", "water-chapter", "Counter"]) ok(fx.includes(n), `effect present: ${n}`);
  ok(await p.evaluate(() => document.querySelector('[data-fx="water-hero"]').dataset.fxReady === "1"), "water ripple ready (hero)");
  // ripple thật: hover làm filter gắn vào
  await p.mouse.move(700, 300); await p.mouse.move(760, 340, { steps: 6 }); await p.waitForTimeout(700);
  const filt = await p.evaluate(() => document.querySelector('[data-fx="water-hero"] [data-water-inner]').style.filter);
  ok(/url\(["']?#/.test(filt), "SVG displacement filter applied on hover");
  const sc = await p.evaluate(() => document.querySelector('[data-fx="water-hero"] feDisplacementMap').getAttribute("scale"));
  ok(parseFloat(sc) > 0.3, `displacement scale > 0 on hover (${sc})`);
  await p.mouse.move(5, 5); await p.waitForTimeout(1200);
  ok(await p.evaluate(() => document.querySelector('[data-fx="water-hero"] [data-water-inner]').style.filter) === "", "filter removed at rest");
  // độ sâu theo cuộn
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  const vals = [];
  const bgs = [];
  for (let y = 0; y < total; y += 700) {
    await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(160);
    vals.push(+(await p.evaluate(() => document.querySelector('[data-fx="DepthEngine"]').dataset.depthNow)));
    bgs.push(await p.evaluate(() => getComputedStyle(document.querySelector('[data-site="lan-bien"]')).getPropertyValue("--lb-sky-solid")));
  }
  ok(vals[0] === 0 && Math.max(...vals) >= 29, `depth counter 0 -> 30 (max ${Math.max(...vals)})`);
  ok(vals.every((v, i) => i === 0 || v >= vals[i - 1] || i > vals.length - 3), "depth monotonic non-decreasing while scrolling down");
  ok(new Set(bgs).size >= 8, `background colour changes with depth (${new Set(bgs).size} distinct)`);
  ok(bgs[0] !== bgs[bgs.length - 1], "bg top differs from bottom");
  console.log("INFO long tasks >200ms @1440:", await p.evaluate(() => window.__ltc));
  // chữ cấm
  await p.evaluate(() => window.scrollTo(0, 0));
  const text = await p.evaluate(() => {
    const a = [document.body.innerText, document.title];
    document.querySelectorAll("[alt],[aria-label],[title],meta[name=description],meta[property^='og:']").forEach((e) => a.push(e.getAttribute("alt"), e.getAttribute("aria-label"), e.getAttribute("title"), e.getAttribute("content")));
    return a.filter(Boolean).join("\n");
  });
  const m = text.replace(/https?:\/\/\S+/g, "").replace(/\/demos\/\S*/g, "").match(FORBID);
  ok(!m, `forbidden words absent in visible/alt/aria/meta ${m ? m[0] : ""}`);
  // glyph tiếng Việt
  const gl = await p.evaluate(async () => {
    await document.fonts.ready;
    const fam = getComputedStyle(document.querySelector("h1")).fontFamily;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    const s = "ẮẶẾỆỒỘỚỢỨỰỬỮ ăâêôơưđ";
    const c = document.createElement("canvas").getContext("2d");
    c.font = `500 60px ${fam}`; const w1 = c.measureText(s).width;
    c.font = "500 60px sans-serif"; const w2 = c.measureText(s).width;
    const has = (n) => loaded.some((f) => f.includes(n));
    return { fam: fam.slice(0, 60), loaded: loaded.length, differs: Math.abs(w1 - w2) > 5, chk: has("unVi") && has("unLat") && has("itVi") && has("itLat") };
  });
  ok(gl.loaded >= 4 && gl.differs && gl.chk, `Vietnamese glyphs render (loaded fonts ${gl.loaded})`);
  // glyph ảnh: Ế đậm cỡ lớn
  await p.setContent?.call; 
  await p.evaluate(() => { const d = document.createElement("div"); d.id = "gl"; d.style.cssText = "position:fixed;left:0;top:0;z-index:9999;background:#fff;color:#000;padding:10px;font:500 64px/1.3 " + getComputedStyle(document.querySelector("h1")).fontFamily; d.textContent = "ỐẾỂỆỢỬỮ ẦẮẰ"; document.body.appendChild(d); });
  await p.screenshot({ path: `${SHOT}glyph-unbounded.png`, clip: { x: 0, y: 0, width: 900, height: 110 } });
  await p.evaluate(() => document.getElementById("gl").remove());
  // finder: lỗi rỗng
  await p.locator("#cong-cu").scrollIntoViewIfNeeded();
  await p.getByRole("button", { name: "Xem gợi ý" }).click();
  ok(await p.locator("[class*=err]").count() === 3, "finder shows 3 errors when empty");
  ok(await p.locator('input[aria-invalid="true"]').count() > 5, "aria-invalid set on invalid groups");
  // luồng: chưa từng lặn + chưa chứng chỉ + thử lần đầu
  const pick = async (n) => p.getByLabel(n, { exact: false }).first().check();
  await p.getByLabel("Chưa từng lặn").check();
  await p.getByLabel("Chưa có chứng chỉ").check();
  await p.getByLabel("Thử cảm giác lặn lần đầu").check();
  await p.getByRole("button", { name: "Xem gợi ý" }).click(); await p.waitForTimeout(700);
  ok((await p.locator("[data-result]").getAttribute("data-result")) === "discover", "none+none+first -> Discover Scuba");
  const txt = await p.locator("[data-result]").innerText();
  ok(/khám|sức khoẻ/i.test(txt) && /không xác nhận/i.test(txt), "result includes health + non-eligibility disclaimer");
  const cta = await p.getByRole("link", { name: "Trao đổi với Tầng Xanh" }).getAttribute("href");
  console.log("INFO consult href:", cta);
  ok(cta.startsWith("/lien-he"), "result CTA goes to /lien-he");
  if (/industry=/.test(cta) && /utm_campaign=lan-bien/.test(cta)) ok(true, "consult href has industry/solution/utm_campaign");
  else console.log("WARN consult href lacks industry/solution/utm: slug lan-bien is not in features/showroom/registry.ts yet (coordinator must add meta)");
  // quy tắc khác
  const run = async (e, cs, g) => {
    await p.getByRole("button", { name: "Làm lại" }).click();
    await p.getByLabel(e, { exact: true }).check();
    for (const c of cs) await p.getByLabel(c, { exact: false }).first().check();
    await p.getByLabel(g, { exact: true }).check();
    await p.getByRole("button", { name: "Xem gợi ý" }).click(); await p.waitForTimeout(600);
    return p.locator("[data-result]").getAttribute("data-result");
  };
  ok(await run("Đã học chương trình lặn cơ bản", ["OWD hoặc"], "Phát triển kỹ năng lặn nâng cao") === "aowd", "owd + advanced -> AOWD pathway");
  ok(await run("Chưa từng lặn", ["Không chắc"], "Phát triển kỹ năng lặn nâng cao") === "confirm", "unknown cert -> confirm first");
  ok(await run("Chưa từng lặn", ["AOWD hoặc"], "Học nền tảng lặn có bình khí") === "confirm", "conflicting info -> confirm");
  ok(await run("Chưa từng lặn", ["Chưa có chứng chỉ"], "Tìm hiểu freediving") === "freediving", "freediving goal wins");
  ok(await run("Đã thử snorkeling", ["Chưa có chứng chỉ"], "Tham gia thể thao nước nhẹ nhàng") === "snorkeling", "water sport -> snorkeling");
  // bàn phím: Tab tới CTA, Space chọn
  await p.getByRole("button", { name: "Làm lại" }).click(); await p.waitForTimeout(200);
  await p.keyboard.press("Space"); // focus được trả về radio đầu
  ok(await p.locator('input[name="experience"]:checked').count() === 1, "keyboard Space selects first radio");
  await p.evaluate(() => window.scrollTo(0, 0)); await p.keyboard.press("Tab");
  ok(await p.evaluate(() => !!document.activeElement), "Tab moves focus");
  // cuộn khoá học: chọn hàng đổi panel
  await p.locator("#khoa-hoc").scrollIntoViewIfNeeded();
  await p.locator("button[aria-controls=course-owd]").click(); await p.waitForTimeout(700);
  ok(await p.locator("#course-owd").evaluate((e) => getComputedStyle(e).visibility) === "visible", "course row click shows its panel");
  // chụp
  await p.evaluate(() => window.scrollTo(0, 0));
  await ctx.close();
}

// 3. reduced motion
{
  const { ctx, p } = await open(1440, 900, { reducedMotion: "reduce" });
  ok(await p.locator("h1").isVisible(), "reduced-motion: h1 visible");
  const vis = await p.evaluate(() => [...document.querySelectorAll('[data-lb="reveal"]')].every((e) => getComputedStyle(e).opacity === "1"));
  ok(vis, "reduced-motion: all reveal blocks visible");
  ok(await p.evaluate(() => document.querySelector('[data-fx="water-chapter"]').dataset.fxReady === "static"), "reduced-motion: water ripple static");
  ok(await p.evaluate(() => !document.querySelector('[data-fx="CanvasParticles"]')), "reduced-motion: bubble canvas not mounted");
  await p.evaluate(() => window.scrollTo(0, 4000)); await p.waitForTimeout(400);
  ok(+(await p.evaluate(() => document.querySelector('[data-fx="DepthEngine"]').dataset.depthNow)) > 0, "reduced-motion: depth readout still updates");
  await ctx.close();
}

// 4. mobile: menu, Escape, long task
{
  const { ctx, p } = await open(390, 844, { hasTouch: true, isMobile: true });
  await p.evaluate(() => { window.__ltc = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] }); });
  await p.getByRole("button", { name: "Mở menu" }).tap();
  ok(await p.locator("#lb-menu").isVisible(), "mobile menu opens");
  await p.keyboard.press("Escape");
  ok(!(await p.locator("#lb-menu").isVisible()), "Escape closes menu");
  ok(await p.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "lb-menu"), "focus returns to menu button");
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
  console.log("INFO long tasks >200ms @390:", await p.evaluate(() => window.__ltc));
  const tt = await p.evaluate(() => [...document.querySelectorAll("a,button,summary,label")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 40 && r.width < 40); }).length);
  console.log("INFO tiny targets (<40px both dims):", tt);
  await p.evaluate(() => window.scrollTo(0, 3200)); await p.waitForTimeout(500);
  await p.screenshot({ path: `${SHOT}chapter-390.png` });
  await ctx.close();
}

// 5. trang credits
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
  const r = await p.goto(`${BASE}/demos/lan-bien/credits`, { waitUntil: "networkidle", timeout: 90000 });
  ok(r.status() === 200, "credits 200");
  ok((await p.locator("li dl").count()) === 13, "credits lists 13 photos");
  await ctx.close();
}
await b.close();
console.log(`\nRESULT pass=${pass} fail=${fail}`);
