import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = `${BASE}/demos/kim-hoan`;
const SHOT = new URL("./screenshots/", import.meta.url).pathname;
fs.mkdirSync(SHOT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const FORBID = /(\bdemo\b|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)/i;

async function open(w, h, opts = {}, url = PAGE, wait = 4200) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ...opts });
  const p = await ctx.newPage();
  const errs = [], ext = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith("data:") && !u.startsWith("blob:")) ext.push(u); });
  await p.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  await p.waitForTimeout(wait);
  return { ctx, p, errs, ext };
}
const scrollThrough = async (p, step = 500, wait = 90) => {
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += step) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(wait); }
};
async function section(name, fn) {
  const p0 = pass, f0 = fail;
  for (let a = 1; a <= 3; a++) {
    pass = p0; fail = f0;
    try { await fn(); } catch (e) { fail++; console.log(`FAIL section "${name}" crashed: ${String(e).split("\n")[0].slice(0, 160)}`); }
    if (fail === f0) return;
    if (a < 3) console.log(`RETRY section "${name}" attempt ${a}`);
  }
}

console.log("[1] tải trang, console, request ngoài, tràn ngang");
for (const w of [320, 390, 768, 1024, 1440]) {
  await section(`[1] ${w}`, async () => {
    const { ctx, p, errs, ext } = await open(w, w < 700 ? 800 : 900);
    ok((await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 1, `no horizontal overflow @${w}`);
    await scrollThrough(p, 600, 40);
    ok((await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 1, `no horizontal overflow after full scroll @${w}`);
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
    ok(errs.filter((e) => !/DevTools|Download the React/.test(e)).length === 0, `0 console errors @${w} ${errs.slice(0, 2).join("|")}`);
    ok(ext.length === 0, `0 external requests @${w} ${ext.slice(0, 2).join(",")}`);
    if (w === 1440 || w === 390) {
      await p.screenshot({ path: `${SHOT}hero-${w}.png` });
      try { await p.screenshot({ path: `${SHOT}full-${w}.png`, fullPage: true, timeout: 90000 }); } catch { console.log("WARN fullpage shot failed"); }
    }
    await ctx.close();
  });
}

console.log("[2] intro mở nắp hộp ≤1.2s");
await section("intro", async () => {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(PAGE, { waitUntil: "domcontentloaded", timeout: 120000 });
  await p.waitForSelector('[data-kn="intro"]', { timeout: 20000 }).catch(() => {});
  const t0 = Date.now();
  const present = await p.locator('[data-kn="intro"]').count();
  ok(present === 1, "intro overlay present at load");
  await p.waitForFunction(() => !document.querySelector('[data-kn="intro"]') || getComputedStyle(document.querySelector('[data-kn="intro"]')).visibility === "hidden", null, { timeout: 4000 });
  const dt = Date.now() - t0;
  ok(dt <= 1500, `intro finished within budget (${dt}ms from first sight, CSS 1.15s)`);
  // skip bằng click
  const p2 = await ctx.newPage();
  await p2.goto(PAGE, { waitUntil: "domcontentloaded", timeout: 120000 });
  await p2.waitForSelector('[data-kn="intro"]', { timeout: 20000 }).catch(() => {});
  await p2.mouse.click(200, 200);
  await p2.waitForTimeout(150);
  ok((await p2.locator('[data-kn="intro"]').count()) === 0, "click skips intro");
  await ctx.close();
});

console.log("[3] desktop: hiệu ứng, chữ cấm, glyph, hiệu năng");
await section("desktop", async () => {
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => { window.__ltc = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] }); });
  const fx = await p.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.dataset.fx))]);
  for (const n of ["SplitReveal", "ScrollScrubText", "VelocityMarquee", "Counter", "ParallaxLayer", "SVGPathDraw", "GrainOverlay", "ShineSweep", "ScrollProgress", "CustomCursor", "GoldGlare", "GoldShimmer", "GemSparkle", "Ring3D"]) ok(fx.includes(n), `effect present: ${n}`);
  ok(await p.evaluate(() => document.querySelector('[data-site="kim-hoan"]').dataset.knJs === "1"), "Motion mounted");
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-kn="hero-line"]')].every((e) => new DOMMatrix(getComputedStyle(e).transform).m42 === 0)), "hero lines revealed");
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-kn="hero-copy"]')].every((e) => +getComputedStyle(e).opacity === 1)), "hero copy visible after choreography");
  ok((await p.locator("h1").innerText()).replace(/\s+/g, " ").includes("Vẻ đẹp lưu dấu thời gian"), "h1 text");
  // shimmer
  ok(await p.evaluate(() => document.querySelector("h1 [data-fx=GoldShimmer]").dataset.run === "1"), "hero shimmer running");
  ok(await p.evaluate(() => getComputedStyle(document.querySelector("h1 [data-fx=GoldShimmer]")).animationName.includes("shine")), "shimmer animation applied");
  // glare trên thẻ sản phẩm
  const card = p.locator('[data-fx=GoldGlare]').nth(1);
  await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(1600);
  const bb = await card.boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.3, bb.y + bb.height * 0.4); await p.mouse.move(bb.x + bb.width * 0.7, bb.y + bb.height * 0.6, { steps: 6 }); await p.waitForTimeout(500);
  const gl = await card.evaluate((e) => ({ on: e.dataset.glare, gx: e.style.getPropertyValue("--gx"), op: getComputedStyle(e, "::after").opacity }));
  ok(gl.on === "1" && parseFloat(gl.gx) > bb.width * 0.5 && +gl.op > 0.9, `cursor glare follows pointer (${JSON.stringify(gl)})`);
  await p.mouse.move(5, 5); await p.waitForTimeout(600);
  ok((await card.evaluate((e) => e.dataset.glare)) === "0", "glare off when pointer leaves");
  // product reveal: clip mở + parallax
  await p.locator('[data-kn="pr"]').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(2600);
  ok(await p.evaluate(() => { const c = document.querySelector('[data-kn="pr-clip"]'); const cp = getComputedStyle(c).clipPath; return cp === "none" || /inset\(0/.test(cp); }), "product clip revealed");
  const y1 = await p.locator('[data-kn="pr-img"]').first().evaluate((e) => getComputedStyle(e).transform);
  await p.evaluate(() => window.scrollBy(0, 260)); await p.waitForTimeout(1200);
  const y2 = await p.locator('[data-kn="pr-img"]').first().evaluate((e) => getComputedStyle(e).transform);
  ok(y1 !== y2, "product image parallax moves with scroll");
  // đường kẻ vàng + nút
  await p.locator("#che-tac").scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 700)); await p.waitForTimeout(1200);
  const sc = await p.locator('[data-kn="goldline"]').evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).d);
  ok(sc > 0.05 && sc <= 1, `gold line draws with scroll (scaleY ${sc.toFixed(2)})`);
  ok((await p.locator('[data-kn="node"][data-on="1"]').count()) >= 1, "process node lit");
  // ring 3D
  const ring = p.locator("[data-fx=Ring3D]");
  await ring.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  ok((await ring.locator("i").count()) === 40, "ring has 40 slices");
  const r1 = await ring.locator("[class*=rSpin]").evaluate((e) => getComputedStyle(e).transform); await p.waitForTimeout(700);
  const r2 = await ring.locator("[class*=rSpin]").evaluate((e) => getComputedStyle(e).transform);
  ok(r1 !== r2, "ring rotates");
  const rb = await ring.boundingBox(); await p.mouse.move(rb.x + rb.width * 0.5, rb.y + rb.height * 0.5); await p.waitForTimeout(300);
  const ps = await ring.locator("[class*=rSpin]").evaluate((e) => getComputedStyle(e).animationPlayState);
  ok(ps === "paused", "ring pauses on hover");
  await p.mouse.move(5, 5);
  // sparkle canvas vẽ
  ok(await p.evaluate(() => { const c = document.querySelector("canvas[data-fx=GemSparkle]"); const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) return true; return false; }), "sparkle canvas has painted pixels");
  // marquee
  const mq = p.locator("[data-fx=VelocityMarquee]").first();
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(900);
  const tr = () => mq.locator("[data-fx-track]").evaluate((e) => getComputedStyle(e).transform);
  const t1 = await tr(); await p.waitForTimeout(500); ok(t1 !== (await tr()), "marquee moves");
  const mb = mq.getByRole("button"); await mb.first().click(); await p.waitForTimeout(150); const a = await tr(); await p.waitForTimeout(400); ok(a === (await tr()), "marquee pause button works"); await mb.first().click();
  // chữ cấm + glyph + font
  const text = await p.evaluate(() => document.body.innerText + " " + [...document.querySelectorAll("[alt],[aria-label],[title]")].map((e) => (e.getAttribute("alt") || "") + " " + (e.getAttribute("aria-label") || "") + " " + (e.getAttribute("title") || "")).join(" ") + " " + document.title + " " + (document.querySelector('meta[name=description]')?.content || ""));
  const m = text.match(FORBID);
  ok(!m, `no forbidden label words ${m ? m[0] : ""}`);
  ok((await p.title()).startsWith("Kim Nguyệt"), "title own");
  const gl2 = await p.evaluate(async () => {
    await document.fonts.ready;
    const h = getComputedStyle(document.querySelector("h1")).fontFamily;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    const chars = "ăâêôơưđ ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ";
    const bad = [...chars.replace(/ /g, "")].filter((c) => !document.fonts.check(`400 40px ${h}`, c));
    // đo glyph: dấu không tách rời: chiều rộng "Ệ" bằng font hiển thị ≈ chiều rộng chữ "E" (không cộng dấu tách)
    const cv = document.createElement("canvas").getContext("2d");
    cv.font = `400 80px ${h}`; const wE = cv.measureText("E").width, wEc = cv.measureText("Ệ").width, wEd = cv.measureText("Ế").width;
    return { h: h.slice(0, 60), nLoaded: loaded.length, bad, wE, wEc, wEd };
  });
  ok(gl2.nLoaded >= 4 && gl2.bad.length === 0, `Vietnamese fonts loaded & cover chars (loaded ${gl2.nLoaded}, bad ${gl2.bad.join("")})`);
  ok(Math.abs(gl2.wEc - gl2.wE) < gl2.wE * 0.15 && Math.abs(gl2.wEd - gl2.wE) < gl2.wE * 0.15, `stacked diacritics Ệ/Ế same advance as E (${gl2.wE.toFixed(1)}/${gl2.wEc.toFixed(1)}/${gl2.wEd.toFixed(1)})`);
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  await p.locator("h1").screenshot({ path: `${SHOT}glyph-h1-1440.png` });
  await p.evaluate(() => { const d = document.createElement("div"); d.id = "glyphtest"; d.style.cssText = "position:fixed;left:20px;top:100px;z-index:999;background:#0a0a0a;padding:20px;font:400 72px/1.3 var(--kn-fd-vi),var(--kn-fd-lat),serif;color:#d9b647"; d.textContent = "ỆẾỔỨỮỢẮẲ ƯỚ Đà Nẵng"; document.querySelector('[data-site="kim-hoan"]').appendChild(d); });
  await p.locator("#glyphtest").screenshot({ path: `${SHOT}glyph-stacked-1440.png` });
  await p.evaluate(() => document.getElementById("glyphtest").remove());
  // long tasks khi cuộn toàn trang
  await scrollThrough(p, 450, 70);
  const lt = await p.evaluate(() => window.__ltc);
  console.log(`INFO long tasks >200ms while scrolling @1440: ${lt}`);
  ok(lt <= 6, `long tasks (>200ms) while scrolling @1440 = ${lt}`);
  await ctx.close();
});

console.log("[4] công cụ cấu hình");
await section("tool", async () => {
  const { ctx, p } = await open(1440, 900);
  const href = await p.locator('[data-testid="consult"]').getAttribute("href");
  const u = new URL(href, BASE);
  ok(u.pathname === "/lien-he", `consult link goes to /lien-he (${href})`);
  const synced = u.searchParams.get("utm_campaign") === "kim-hoan" && !!u.searchParams.get("industry") && !!u.searchParams.get("solution");
  console.log(synced ? "INFO consult link has industry/solution/utm (registry synced)" : "WARN consult link lacks industry/solution/utm: registry.ts chưa đồng bộ LP-27 (xem design/REQUESTS.md)");
  await p.locator("#cau-hinh").scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  const price = async () => (await p.locator('[data-testid="result"] p[role=status]').first().innerText()).replace(/ /g, " ");
  ok(/12\.670\.000 ₫ đến 14\.620\.000 ₫/.test(await price()), `default quote 12.670.000–14.620.000 (${await price()})`);
  ok(/3,1 – 3,6 g/.test(await p.locator('[data-testid="weight"]').innerText()), "weight range shown");
  ok((await p.locator('[data-testid="breakdown"] > div').count()) === 4, "breakdown rows (metal, labor, stone, setting)");
  // đổi loại
  await p.getByLabel("Mặt dây", { exact: true }).check(); await p.waitForTimeout(600);
  ok((await p.locator("svg.kn-prev").getAttribute("data-type")) === "pendant", "preview switches to pendant");
  ok(!(await price()).includes("12.670.000"), "price changes with type");
  // chất liệu
  await p.locator('input[name=material][value=s925]').check(); await p.waitForTimeout(500);
  ok(await p.locator('input[id$="-gold"]').isDisabled(), "gold price input disabled for silver");
  ok((await p.locator("svg.kn-prev").getAttribute("data-material")) === "s925", "preview material silver");
  // lỗi đơn giá
  await p.locator('input[name=material][value=g14]').check();
  const inp = p.locator('input[id$="-gold"]');
  await inp.fill("0"); await p.waitForTimeout(300);
  ok((await inp.getAttribute("aria-invalid")) === "true", "invalid gold price flagged aria-invalid");
  ok((await p.locator('[data-testid="empty"]').count()) === 1, "empty state when price invalid");
  ok(await p.locator("button", { hasText: "Sao chép tóm tắt" }).isDisabled(), "copy disabled in empty state");
  await inp.fill("5000000"); await p.waitForTimeout(400);
  ok((await p.locator('[data-testid="empty"]').count()) === 0 && (await inp.getAttribute("aria-invalid")) === "false", "valid price restores result");
  const low = await price(); await inp.fill("3000000"); await p.waitForTimeout(400);
  ok((await price()) !== low, "price follows gold unit price");
  // preset từ thẻ sản phẩm
  await p.locator('#bo-suu-tap a:has-text("Cấu hình mẫu này")').first().click(); await p.waitForTimeout(1200);
  ok((await p.locator("svg.kn-prev").getAttribute("data-type")) === "ring" && (await p.locator('input[name=material][value=g18]').isChecked()), "preset from collection card sets ring 18K");
  ok(await p.evaluate(() => Math.abs(document.getElementById("cau-hinh").getBoundingClientRect().top) < 140), "preset scrolls to tool");
  // chọn đá không đá → hàng đá biến mất
  await p.locator('input[name=stone][value=none]').check(); await p.waitForTimeout(300);
  ok((await p.locator('[data-testid="breakdown"] > div').count()) === 2, "no stone: 2 breakdown rows");
  ok(/Đá: Không đá/.test(await p.locator('[data-testid="summary"]').innerText()), "summary text reflects config");
  // bàn phím: radio mũi tên
  await p.getByLabel("Nhẫn", { exact: true }).focus(); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(300);
  ok(await p.getByLabel("Mặt dây", { exact: true }).isChecked(), "arrow key moves radio selection");
  // sao chép (clipboard có thể bị chặn: chấp nhận cả hai trạng thái có thông báo)
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
  await p.locator("button", { hasText: "Sao chép tóm tắt" }).click(); await p.waitForTimeout(400);
  ok(/Đã sao chép|Không sao chép được/.test(await p.locator("section#cau-hinh [aria-live=polite]").first().innerText()), "copy gives status feedback");
  ok(!(await p.locator("#cau-hinh").innerText()).match(/đã gửi|gửi thành công|đặt thành công/i), "tool never claims submission");
  await p.locator("#cau-hinh").screenshot({ path: `${SHOT}tool-1440.png` });
  await ctx.close();
});

console.log("[5] mobile: menu, công cụ, touch");
await section("mobile", async () => {
  const { ctx, p } = await open(390, 844, { hasTouch: true, isMobile: true });
  ok((await p.locator("[data-fx=CustomCursor]").count()) === 0, "custom cursor not mounted on touch");
  const gl = await p.evaluate(() => [...document.querySelectorAll("[data-fx=GoldGlare]")].every((e) => e.dataset.fxReady === "static"));
  ok(gl, "glare disabled on touch");
  await p.getByRole("button", { name: "Mở menu" }).click(); await p.waitForTimeout(300);
  ok((await p.getByRole("dialog").count()) === 1, "menu dialog opens");
  await p.keyboard.press("Escape"); await p.waitForTimeout(200);
  ok((await p.getByRole("dialog").count()) === 0 && (await p.evaluate(() => document.activeElement?.getAttribute("aria-label"))) === "Mở menu", "Escape closes menu and returns focus");
  const sizes = await p.evaluate(() => [...document.querySelectorAll("a,button,summary,label.chip")].filter((e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden").map((e) => { const r = e.getBoundingClientRect(); return [r.height, e.textContent.trim().slice(0, 20)]; }).filter(([h]) => h < 43));
  ok(sizes.length === 0, `touch targets >=44px (${JSON.stringify(sizes.slice(0, 4))})`);
  await ctx.close();
});

console.log("[6] reduced motion");
await section("reduced", async () => {
  const { ctx, p } = await open(1440, 900, { reducedMotion: "reduce" }, PAGE, 1500);
  ok((await p.locator('[data-kn="intro"]').evaluate((e) => getComputedStyle(e).display).catch(() => "none")) === "none", "intro hidden under reduced motion");
  await scrollThrough(p, 500, 40); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
  const hidden = await p.evaluate(() => [...document.querySelectorAll('h1, h2, [data-kn="rise"], [data-kn="pr-clip"], [data-kn="hero-copy"], [data-fx=ScrollScrubText] span')].filter((e) => { const s = getComputedStyle(e); return +s.opacity < 0.95 || (s.clipPath !== "none" && /inset\(\s*100/.test(s.clipPath)); }).map((e) => e.tagName + ":" + (e.textContent || "").slice(0, 20)));
  ok(hidden.length === 0, `all content visible under reduced motion (${hidden.slice(0, 3).join("|")})`);
  ok(await p.evaluate(() => getComputedStyle(document.querySelector("[class*=rSpin]")).animationName === "none"), "ring static under reduced motion");
  ok(await p.evaluate(() => getComputedStyle(document.querySelector("h1 [data-fx=GoldShimmer]")).animationName === "none"), "shimmer static under reduced motion");
  await ctx.close();
});

console.log("[7] không JS: nội dung vẫn đọc được");
await section("nojs", async () => {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(PAGE, { waitUntil: "load", timeout: 120000 }); await p.waitForTimeout(1800);
  ok(await p.locator("h1").isVisible() && (await p.locator("h1").innerText()).includes("Vẻ đẹp"), "no-JS: hero heading visible");
  ok(await p.evaluate(() => { const i = document.querySelector('[data-kn="intro"]'); return !i || getComputedStyle(i).visibility === "hidden"; }), "no-JS: intro overlay self-removes via CSS");
  ok((await p.locator("#cau-hinh").innerText()).includes("Thiết kế trang sức"), "no-JS: tool section text present");
  await ctx.close();
});

console.log("[8] credits");
await section("credits", async () => {
  const { ctx, p, errs } = await open(1024, 800, {}, `${PAGE}/credits`, 1500);
  ok((await p.locator("li dl").count()) === 12, "credits lists 12 images");
  ok(/Pexels/.test(await p.locator("main").innerText()) && /Libre Bodoni/.test(await p.locator("main").innerText()), "credits lists license + fonts");
  ok(errs.length === 0, "credits 0 console errors");
  await ctx.close();
});

console.log(`RESULT pass=${pass} fail=${fail}`);
await b.close();
process.exit(fail ? 1 : 0);
