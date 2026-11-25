import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = `${BASE}/demos/da-xanh`;
const SHOT = new URL("./screenshots/", import.meta.url).pathname;
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const FORBID = /(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)/i;
const IGNORE_ERR = /DevTools|Download the React/;

async function open(w, h, opts = {}, url = PAGE) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ...opts });
  const p = await ctx.newPage();
  const errs = [], ext = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith("data:") && !u.startsWith("blob:")) ext.push(u); });
  await p.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  await p.waitForTimeout(3600);
  return { ctx, p, errs, ext };
}
const visibleText = (p) => p.evaluate(() => {
  const root = document.querySelector('[data-site="da-xanh"]');
  const attrs = [...root.querySelectorAll("[alt],[aria-label],[title],[placeholder]")].map((e) => [e.getAttribute("alt"), e.getAttribute("aria-label"), e.getAttribute("title"), e.getAttribute("placeholder")].filter(Boolean).join(" "));
  const meta = [document.title, document.querySelector('meta[name="description"]')?.content || "", document.querySelector('meta[property="og:title"]')?.content || "", document.querySelector('meta[property="og:description"]')?.content || ""];
  return root.innerText + "\n" + attrs.join("\n") + "\n" + meta.join("\n");
});

// 1. tải trang, console, request ngoài, tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, p, errs, ext } = await open(w, w < 700 ? 800 : 900);
  const o = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(o <= 1, `no horizontal overflow @${w} (${o}px)`);
  ok(errs.filter((e) => !IGNORE_ERR.test(e)).length === 0, `0 console errors @${w} ${errs.slice(0, 2).join("|")}`);
  ok(ext.length === 0, `0 external requests @${w} ${ext.slice(0, 2).join(",")}`);
  ok(await p.evaluate(() => document.documentElement.lang === "vi"), `html lang=vi @${w}`);
  if (w === 1440 || w === 390) {
    await p.screenshot({ path: `${SHOT}hero-${w}.png` });
    const total = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(140); }
    await p.waitForTimeout(1500);
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
    await p.screenshot({ path: `${SHOT}full-${w}.png`, fullPage: true });
  }
  await ctx.close();
}

// 2. desktop: hiệu ứng, chữ cấm, glyph, hiệu năng
{
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => {
    window.__ltc = 0;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] });
  });
  const fx = await p.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.dataset.fx))]);
  console.log("INFO fx:", fx.join(","));
  for (const n of ["SplitReveal", "CursorSpotlight", "TiltCard", "MagneticButton", "ScrollScrubText", "SVGPathDraw", "CanvasParticles", "VelocityMarquee", "ClipReveal", "ShineSweep", "MeshBackground", "SerumDrop", "HaloRing"]) ok(fx.includes(n), `effect present: ${n}`);
  ok(await p.evaluate(() => document.querySelector('[data-fx="SerumDrop"]').dataset.fxReady === "1"), "serum drop ready");
  ok(await p.evaluate(() => document.querySelector('[data-fx="CursorSpotlight"]').dataset.fxReady === "1"), "cursor spotlight ready (fine pointer)");

  // gradient mesh thật sự chuyển động (animation chạy) và dừng khi tab ẩn
  const anim = await p.evaluate(() => document.querySelectorAll('[data-fx="MeshBackground"] i').length && [...document.querySelectorAll('[data-fx="MeshBackground"] i')].every((e) => e.getAnimations().some((a) => a.playState === "running")));
  ok(anim, "mesh blobs: CSS animations running");
  const m1 = await p.evaluate(() => getComputedStyle(document.querySelector('[data-fx="MeshBackground"] i')).transform);
  await p.waitForTimeout(1500);
  const m2 = await p.evaluate(() => getComputedStyle(document.querySelector('[data-fx="MeshBackground"] i')).transform);
  ok(m1 !== m2, "mesh blob transform changes over time");
  await p.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, get: () => true }); document.dispatchEvent(new Event("visibilitychange")); });
  ok(await p.evaluate(() => document.querySelector('[data-fx="MeshBackground"]').dataset.paused === "1"), "mesh paused when tab hidden");
  await p.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, get: () => false }); document.dispatchEvent(new Event("visibilitychange")); });

  // halo xoay
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-fx="HaloRing"] span')].some((e) => e.getAnimations().some((a) => a.playState === "running"))), "halo ring animating");

  // depth parallax theo con trỏ
  const before = await p.evaluate(() => getComputedStyle(document.querySelector('[data-depth="1.8"]')).transform);
  await p.mouse.move(100, 100); await p.mouse.move(1300, 700, { steps: 8 }); await p.waitForTimeout(1300);
  const after = await p.evaluate(() => getComputedStyle(document.querySelector('[data-depth="1.8"]')).transform);
  ok(before !== after, `depth parallax follows pointer (${before} -> ${after})`);
  // cursor spotlight trên thẻ kính
  const card = p.locator('[data-fx="CursorSpotlight"]').first();
  const bb = await card.boundingBox();
  await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 4 }); await p.waitForTimeout(400);
  const spot = await card.evaluate((el) => { const s = el.querySelector("[data-fx-spot]"); return [s.style.opacity, s.style.getPropertyValue("--fx-x")]; });
  ok(spot[0] === "1" && /px/.test(spot[1]), `spotlight follows pointer (${spot.join(",")})`);
  await p.mouse.move(5, 5);

  // cuộn: giọt serum di chuyển, blur-fade, hiệu năng
  const dropY = async () => p.evaluate(() => new DOMMatrixReadOnly(getComputedStyle(document.querySelector('[data-fx="SerumDrop"] > div:nth-of-type(3)')).transform).m42);
  const d0 = await dropY();
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  const bf0 = await p.evaluate(() => [...document.querySelectorAll("[data-bfs]")].filter((e) => e.getAttribute("data-bfs") === "0").length);
  ok(bf0 > 5, `blur-fade: ${bf0} blocks start hidden (JS ran)`);
  const filt = await p.evaluate(() => { const e = document.querySelector('[data-bfs="0"]'); return getComputedStyle(e).filter; });
  ok(/blur\(1[0-9]/.test(filt), `blur-fade initial filter blur ~14px (${filt})`);
  let mid = 0;
  for (let y = 0; y < total; y += 600) {
    await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(120);
    if (y > total / 2 && !mid) { mid = await dropY(); }
  }
  await p.waitForTimeout(800);
  const dEnd = await dropY();
  ok(mid > d0 + 80 && dEnd > mid, `serum drop falls with scroll (${d0.toFixed(0)} -> ${mid.toFixed(0)} -> ${dEnd.toFixed(0)})`);
  const hidden = await p.evaluate(() => [...document.querySelectorAll("[data-bfs]")].filter((e) => e.getAttribute("data-bfs") === "0").length);
  ok(hidden === 0, `blur-fade: all blocks revealed after scrolling (${hidden} left)`);
  const lt = await p.evaluate(() => window.__ltc);
  console.log("INFO long tasks >200ms while scrolling @1440:", lt);
  ok(await p.evaluate(() => getComputedStyle(document.querySelector('[data-bfs="1"]')).filter === "none"), "blur-fade final filter none (keeps backdrop-filter working)");
  // scroll scrub text
  await p.evaluate(() => { const t = document.querySelector('[data-fx="ScrollScrubText"]'); window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - innerHeight * 0.62); }); await p.waitForTimeout(1200);
  const ops = await p.evaluate(() => [...document.querySelectorAll('[data-fx="ScrollScrubText"] [data-fx-w]')].map((e) => +getComputedStyle(e).opacity));
  ok(ops.length > 10 && Math.max(...ops) > Math.min(...ops), "scroll-scrub text: words at differing opacity");

  // chữ cấm ở trạng thái đầu
  const t0 = await visibleText(p);
  ok(!FORBID.test(t0), `no forbidden words (initial) ${(t0.match(FORBID) || [])[0] || ""}`);

  // glyph tiếng Việt
  const gl = await p.evaluate(async () => {
    await document.fonts.ready;
    const h = document.querySelector("h1");
    const fam = getComputedStyle(h).fontFamily, famB = getComputedStyle(document.querySelector("p")).fontFamily;
    const text = "ăâêôơưđĂÂÊÔƠƯĐẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ";
    const c = document.createElement("canvas").getContext("2d");
    const test = (family, w) => {
      let same = 0, n = 0;
      for (const ch of text) {
        c.font = `${w} 64px ${family}`; const a = c.measureText(ch).width;
        c.font = `${w} 64px monospace`; const m = c.measureText(ch).width;
        c.font = `${w} 64px serif`; const s = c.measureText(ch).width;
        n++; if (a === m || a === s) same++;
      }
      return { same, n };
    };
    const faces = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + ":" + f.weight);
    // đo precomposed vs decomposed: nếu font có glyph dựng sẵn thì độ rộng ổn định
    return { fam, famB, h: test(fam, 300), b: test(famB, 400), loaded: faces.length, check: document.fonts.check("300 40px " + fam, "Ế Ệ Ử Ữ") };
  });
  console.log("INFO glyph:", JSON.stringify(gl));
  ok(gl.h.same <= 2, `heading font renders Vietnamese glyphs (fallback-equal ${gl.h.same}/${gl.h.n})`);
  ok(gl.b.same <= 2, `body font renders Vietnamese glyphs (fallback-equal ${gl.b.same}/${gl.b.n})`);
  ok(gl.loaded >= 2, `font faces loaded (${gl.loaded})`);
  // ảnh chụp chữ đậm cỡ lớn để tự xem dấu chồng
  await p.evaluate(() => {
    const d = document.createElement("div"); d.id = "glyphtest";
    const h = getComputedStyle(document.querySelector("h1"));
    d.style.cssText = `position:fixed;left:0;top:0;z-index:99999;background:#fff;color:#111;padding:20px;font-family:${h.fontFamily};font-weight:300;font-size:90px;line-height:1.3;width:1400px`;
    d.innerHTML = "Ố Ế Ể Ệ Ợ Ử Ữ Ắ Ằ Ẳ Ẵ Ặ<br>NÉA đẹp ướt ưỡn ơ ê ô<br><b style='font-weight:700'>Ấ Ầ Ổ Ỗ Ộ Ờ Ở Ừ Ự Ứ</b>";
    document.body.appendChild(d);
  });
  await p.waitForTimeout(300);
  await p.locator("#glyphtest").screenshot({ path: `${SHOT}glyphs.png` });
  await p.evaluate(() => document.getElementById("glyphtest").remove());

  // Tab tới CTA chính
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  let focusedCta = false;
  for (let i = 0; i < 12; i++) { await p.keyboard.press("Tab"); if (await p.evaluate(() => document.activeElement?.textContent?.includes("Thử Skin Routine Builder"))) { focusedCta = true; break; } }
  ok(focusedCta, "Tab reaches hero CTA");
  ok(await p.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2; }), "focus ring visible on CTA");
  await ctx.close();
}

// 3. Liệu trình (radio, đổi nền, ảnh, giá)
{
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => document.querySelector("#lieu-trinh").scrollIntoView()); await p.waitForTimeout(1200);
  const names = await p.locator('#lieu-trinh input[type="radio"]').count();
  ok(names === 6, `6 treatment options (${names})`);
  const title0 = await p.locator("#lieu-trinh h3").first().innerText();
  await p.locator('#lieu-trinh input[type="radio"]').nth(0).focus();
  await p.keyboard.press("ArrowDown"); await p.waitForTimeout(900);
  const title1 = await p.locator("#lieu-trinh h3").first().innerText();
  ok(title0 !== title1, `ArrowDown switches treatment (${title0} -> ${title1})`);
  const price = await p.locator("#lieu-trinh strong").first().innerText();
  ok(/₫|đ/.test(price) && /\d\.\d{3}/.test(price), `price formatted vi-VN (${price})`);
  const on = await p.evaluate(() => [...document.querySelectorAll("#lieu-trinh [data-on]")].map((e) => e.dataset.on).join(""));
  ok(on === "010000", `image cross-fade state (${on})`);
  const tintOpacity = await p.evaluate(() => [...document.querySelectorAll("#lieu-trinh section > div:first-child i, #lieu-trinh > div:first-child i")].map((e) => e.style.opacity).join(""));
  ok(tintOpacity === "010000", `background tint layers (${tintOpacity})`);
  const href = await p.locator("#lieu-trinh a", { hasText: "Hỏi lịch" }).getAttribute("href");
  ok(/^\/lien-he/.test(href), `treatment CTA goes to consult form (${href})`);
  const tf = visibleTextCheck(await visibleText(p)); ok(tf, "no forbidden words in treatments");
  await p.screenshot({ path: `${SHOT}treatments-1440.png` });
  await ctx.close();
}
function visibleTextCheck(t) { return !FORBID.test(t); }

// 4. Routine builder: lỗi, kết quả, cờ an toàn, link thoát
{
  const { ctx, p } = await open(1440, 900, {}, `${PAGE}?ref=abc123`);
  await p.evaluate(() => document.querySelector("#routine").scrollIntoView()); await p.waitForTimeout(1500);
  // trạng thái rỗng
  ok(await p.locator("#routine").getByText("Routine của bạn sẽ hiện ở đây").isVisible(), "builder empty state visible");
  // gửi trống
  await p.getByRole("button", { name: "Tạo routine của tôi" }).click(); await p.waitForTimeout(500);
  const errs = await p.locator("#routine [role=alert]").count();
  ok(errs === 4, `empty submit shows 4 inline errors (${errs})`);
  ok(await p.evaluate(() => document.activeElement?.closest("[data-group]")?.dataset.group === "skin"), "focus moves to first invalid group");
  ok(await p.evaluate(() => document.querySelector('[data-group="skin"]').getAttribute("aria-invalid") === "true" && !!document.querySelector('[data-group="skin"]').getAttribute("aria-describedby")), "aria-invalid + aria-describedby on invalid fieldset");
  // chọn: da hỗn hợp, 2 mối quan tâm, 10 phút, vừa phải
  await p.getByLabel(/Da hỗn hợp/).check();
  await p.getByLabel(/Da xỉn/).check(); await p.getByLabel(/Dầu nhờn/).check();
  await p.getByLabel(/Khoảng 10 phút/).check(); await p.getByLabel(/^Vừa phải\s*500/).check();
  ok((await p.locator("#routine [role=alert]").count()) === 0, "errors clear after fixing fields");
  await p.getByRole("button", { name: "Tạo routine của tôi" }).click();
  await p.waitForSelector("text=Routine gợi ý cho bạn", { timeout: 5000 });
  await p.waitForTimeout(1200);
  const am = await p.locator('section[aria-label="Buổi sáng"] li').allInnerTexts();
  const pm = await p.locator('section[aria-label="Buổi tối"] li').allInnerTexts();
  console.log("INFO AM steps:", am.map((x) => x.split("\n")[0]).join(" | "));
  console.log("INFO PM steps:", pm.map((x) => x.split("\n")[0]).join(" | "));
  ok(am.length >= 3 && am.some((x) => /Chống nắng/.test(x)), `AM routine has sunscreen (${am.length} steps)`);
  ok(pm.length >= 3, `PM routine has steps (${pm.length})`);
  ok(am.every((x) => /Nhóm thành phần/.test(x)), "each AM step lists an active-group");
  ok(await p.evaluate(() => document.activeElement?.tagName === "H3"), "focus moved to result heading");
  const safety = await p.locator("#routine").getByText(/không phải chẩn đoán/).first().innerText();
  ok(/bác sĩ da liễu/.test(safety), "result carries doctor/diagnosis disclaimer");
  const cta = await p.getByRole("link", { name: /Trao đổi cùng NÉA về routine này/ }).getAttribute("href");
  console.log("INFO consult href:", cta);
  ok(/^\/lien-he/.test(cta), "result CTA goes to consult form");
  if (/industry=/.test(cta) && /utm_campaign=da-xanh/.test(cta)) ok(true, "consult href has industry/solution/utm_campaign");
  else console.log("WARN consult href lacks industry/solution/utm: slug da-xanh is not in features/showroom/registry.ts yet (coordinator must add meta)");
  ok(await p.evaluate(() => /ref=abc123/.test(location.href)), "?ref kept in page URL (cookie handled by proxy)");
  // không có tên thương hiệu thật / thuốc
  const all = await p.locator("#routine").innerText();
  ok(!/(La Roche|CeraVe|Cetaphil|Vichy|The Ordinary|Paula|SK-II|Obagi|tretinoin 0|isotretinoin|clindamycin|kê đơn:)/i.test(all), "no real brand or drug names in output");
  ok(!/(chẩn đoán là|bạn bị|điều trị khỏi|cam kết|đảm bảo kết quả)/i.test(all.replace(/không (phải )?chẩn đoán|không đảm bảo kết quả|không cam kết/gi, "")), "no diagnosis/guarantee phrasing");
  // sao chép
  await p.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE }).catch(() => {});
  await p.getByRole("button", { name: "Sao chép tóm tắt" }).click(); await p.waitForTimeout(500);
  const cp = await p.locator("#routine [role=status]").allInnerTexts();
  ok(cp.join(" ").includes("Đã sao chép") || cp.join(" ").includes("Không sao chép được"), `copy feedback shown (${cp.join("|").trim()})`);
  const t1 = await visibleText(p); ok(!FORBID.test(t1), `no forbidden words (builder result) ${(t1.match(FORBID) || [])[0] || ""}`);
  await p.screenshot({ path: `${SHOT}builder-result-1440.png` });
  // đổi một lựa chọn: kết quả xoá
  await p.getByLabel(/Da khô/).check(); await p.waitForTimeout(400);
  ok(await p.locator("#routine").getByText("Routine của bạn sẽ hiện ở đây").isVisible(), "changing input resets result to empty state");
  // cờ an toàn
  await p.getByLabel(/Da khô/).check();
  await p.getByLabel(/Thiếu nước/).check(); await p.getByLabel(/Khoảng 5 phút/).check(); await p.getByLabel(/Tiết kiệm/).check();
  await p.getByLabel(/Đang điều trị da/).check();
  await p.getByRole("button", { name: "Tạo routine của tôi" }).click();
  await p.waitForSelector("text=Routine gợi ý cho bạn"); await p.waitForTimeout(1000);
  const note = await p.locator('#routine [role=note]').first().innerText();
  ok(/bác sĩ da liễu/.test(note), `safety flag shows doctor notice (${note.slice(0, 60)}...)`);
  const am2 = await p.locator('section[aria-label="Buổi sáng"] li').allInnerTexts();
  ok(!am2.some((x) => /Tinh chất|axit|AHA|Niacinamide|vitamin C/i.test(x)), "flagged: no serum/active steps");
  const learn = await p.locator("#routine").innerText();
  ok(!/Tẩy tế bào chết hoá học nồng độ thấp/.test(learn.split("Nhóm thành phần nên tìm hiểu")[1] || ""), "flagged: no exfoliant suggested");
  // da nhạy cảm + 15 phút
  await p.getByLabel(/Da nhạy cảm/).check(); await p.getByLabel(/Đang điều trị da/).uncheck(); await p.getByLabel(/15 phút/).check(); await p.getByLabel(/Thoải mái/).check();
  await p.getByRole("button", { name: "Tạo routine của tôi" }).click();
  await p.waitForSelector("text=Routine gợi ý cho bạn"); await p.waitForTimeout(800);
  ok(/hỏi bác sĩ da liễu/i.test(await p.locator("#routine").innerText()), "sensitive skin: doctor advice shown");
  // tối đa 3 mối quan tâm
  await p.getByRole("button", { name: "Làm lại" }).first().click(); await p.waitForTimeout(300);
  for (const n of [/Da xỉn/, /Thiếu nước/, /Dầu nhờn/]) await p.getByLabel(n).check();
  ok(await p.getByLabel(/Màu da chưa đều/).isDisabled(), "concerns capped at 3 (4th disabled)");
  await ctx.close();
}

// 5. mobile: menu, Escape, touch target, form
{
  const { ctx, p, errs } = await open(390, 844, { hasTouch: true, isMobile: true });
  const btn = p.getByRole("button", { name: "Mở menu" });
  const bb = await btn.boundingBox();
  ok(bb.width >= 44 && bb.height >= 44, `menu button >= 44px (${bb.width}x${bb.height})`);
  await btn.click(); await p.waitForTimeout(400);
  ok(await p.locator("#dx-menu").isVisible(), "mobile menu opens");
  ok(!FORBID.test(await visibleText(p)), "no forbidden words (menu open)");
  await p.keyboard.press("Escape"); await p.waitForTimeout(300);
  ok(!(await p.locator("#dx-menu").isVisible()), "Escape closes menu");
  ok(await p.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Mở menu"), "focus returns to menu button");
  // mobile: không pointer parallax, spotlight tĩnh
  ok(await p.evaluate(() => document.querySelector('[data-fx="CursorSpotlight"]').dataset.fxReady === "static"), "mobile: spotlight static (no fine pointer)");
  // touch target của nhãn/nút chính
  const small = await p.evaluate(() => [...document.querySelectorAll('[data-site="da-xanh"] a, [data-site="da-xanh"] button, [data-site="da-xanh"] label')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 40 && !e.closest("nav[aria-label='Liên kết chân trang']"); }).map((e) => (e.textContent || "").trim().slice(0, 30) + ":" + Math.round(e.getBoundingClientRect().height)));
  console.log("INFO small targets (<40px):", small.slice(0, 8).join(" | ") || "none");
  ok(small.length === 0, `touch targets >= 40px (${small.length} small)`);
  // input >= 16px (radio/checkbox ẩn nên kiểm cỡ chữ label)
  const fs = await p.evaluate(() => Math.min(...[...document.querySelectorAll("#routine .builderForm b, #routine form b")].map((e) => parseFloat(getComputedStyle(e).fontSize))));
  ok(fs >= 14.5, `form label text >= 14.5px (${fs})`);
  await p.evaluate(() => { window.__ltc = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__ltc++; })).observe({ entryTypes: ["longtask"] }); });
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
  console.log("INFO long tasks >200ms while scrolling @390:", await p.evaluate(() => window.__ltc));
  ok(errs.filter((e) => !IGNORE_ERR.test(e)).length === 0, "mobile: 0 console errors " + errs.slice(0, 3).join(" | "));
  await ctx.close();
}

// 6. reduced motion
{
  const { ctx, p } = await open(1440, 900, { reducedMotion: "reduce" });
  ok(await p.locator("h1").isVisible(), "reduced-motion: h1 visible");
  ok(await p.evaluate(() => document.querySelectorAll("[data-bfs]").length === 0), "reduced-motion: no hidden blur-fade blocks");
  const vis = await p.evaluate(() => [...document.querySelectorAll("[data-bf]")].every((e) => +getComputedStyle(e).opacity === 1 && getComputedStyle(e).filter === "none"));
  ok(vis, "reduced-motion: all reveal blocks fully visible");
  ok(await p.evaluate(() => document.querySelector('[data-fx="SerumDrop"]').dataset.fxReady === "static"), "reduced-motion: serum drop static");
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-fx="MeshBackground"] i')].every((e) => getComputedStyle(e).animationName === "none")), "reduced-motion: mesh static");
  ok(await p.evaluate(() => [...document.querySelectorAll('[data-fx="HaloRing"] span')].every((e) => getComputedStyle(e).animationName === "none")), "reduced-motion: halo static");
  ok(await p.evaluate(() => !document.querySelector('[data-fx="CanvasParticles"]') || document.querySelector('[data-fx="CanvasParticles"]').dataset.fxReady === "static"), "reduced-motion: bubbles static or absent");
  ok(await p.evaluate(() => [...document.querySelectorAll("[data-fx-w]")].every((e) => +getComputedStyle(e).opacity === 1)), "reduced-motion: scrub text fully lit");
  const o = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(o <= 1, "reduced-motion: no overflow");
  await ctx.close();
}

// 7. credits
{
  const { ctx, p, errs } = await open(1280, 900, {}, `${PAGE}/credits`);
  const t = await p.evaluate(() => document.body.innerText);
  ok(/Ảnh & ghi công/.test(t) && /Pexels/.test(t) && /Raleway/.test(t) && /Commissioner/.test(t), "credits page lists photos and fonts");
  ok(!/\bDemo\b/.test(t.replace(/Thiết kế bởi[^\n]*/g, "")), "credits page has no 'Demo' wording in its own content");
  ok(await p.locator("main img").count() === 10, `credits shows 10 photos (${await p.locator("main img").count()})`);
  ok(errs.filter((e) => !IGNORE_ERR.test(e)).length === 0, "credits: 0 console errors");
  const nonoindex = await p.evaluate(() => document.querySelector('meta[name="robots"]')?.content);
  ok(/noindex/.test(nonoindex || ""), `credits noindex (${nonoindex})`);
  await ctx.close();
}

// 8. noindex + meta trang chính
{
  const { ctx, p } = await open(1280, 900);
  ok(/noindex/.test(await p.evaluate(() => document.querySelector('meta[name="robots"]')?.content || "")), "main page noindex");
  ok(/NÉA/.test(await p.title()), `title: ${await p.title()}`);
  ok(await p.evaluate(() => !!document.querySelector('link[rel="icon"][href*="da-xanh"]')), "favicon link set");
  ok(await p.evaluate(() => !document.querySelector('script[type="application/ld+json"][data-site="da-xanh"]')), "no extra review/rating JSON-LD from page");
  await ctx.close();
}

await b.close();
console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
