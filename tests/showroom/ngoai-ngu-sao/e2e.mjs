import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = `${BASE}/demos/ngoai-ngu-sao`;
const SHOT = new URL("./screenshots/", import.meta.url).pathname;
let pass = 0, fail = 0, warn = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const note = (m) => { warn++; console.log("NOTE", m); };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const FORBID = /(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)/i;
const ANS = { en: [1, 1, 0, 1, 2, 1, 1, 0, 1, 2], ja: [0, 2, 0, 1, 2, 1, 2, 1, 2, 3], ko: [1, 0, 1, 2, 1, 2, 2, 3, 0, 1] };
const PREFIX = { en: "en", ja: "ja", ko: "ko" };

async function open(w, h, opts = {}, url = PAGE) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ...opts });
  const p = await ctx.newPage();
  const errs = [], ext = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith("data:") && !u.startsWith("blob:")) ext.push(u); });
  await p.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  await p.waitForTimeout(1800);
  return { ctx, p, errs, ext };
}
const visibleText = (p) => p.evaluate(() => {
  const t = [document.title, ...[...document.querySelectorAll("meta[name=description],meta[property^='og:'],meta[name^='twitter:']")].filter((m) => !/image|url/.test(m.getAttribute("property") || m.name || "")).map((m) => m.content)];
  t.push(document.body.innerText);
  document.querySelectorAll("[alt],[aria-label],[title],[placeholder]").forEach((e) => t.push(e.getAttribute("alt"), e.getAttribute("aria-label"), e.getAttribute("title"), e.getAttribute("placeholder")));
  document.querySelectorAll(".srOnly,[class*=srOnly]").forEach((e) => t.push(e.textContent));
  return t.filter(Boolean).join("\n");
});
async function answerAll(p, lang, mode) {
  for (let i = 0; i < 10; i++) {
    const tier = Math.floor(i / 2) + 1;
    let pick = ANS[lang][i];
    if (mode === "wrong" || (mode === "mid" && tier > 3)) pick = (pick + 1) % 4;
    await p.evaluate((id) => document.getElementById(id).click(), `${PREFIX[lang]}${i + 1}-${pick}`);
    await p.evaluate(() => document.querySelector('form button[type="submit"]').click());
    await p.waitForTimeout(60);
  }
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
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 450) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(90); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
    await p.screenshot({ path: `${SHOT}full-${w}.png`, fullPage: true });
  }
  await ctx.close();
}

// 2. desktop: hiệu ứng, font, kinetic, flip, dialogue
{
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => { window.__lt = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__lt++; })).observe({ entryTypes: ["longtask"] }); });
  const fx = await p.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.dataset.fx))]);
  console.log("fx:", fx.join(","));
  for (const n of ["KineticGreeting", "FlipCards", "ChatBubbles", "ScrollScrubText", "VelocityMarquee", "SVGPathDraw", "MagneticButton", "TiltCard", "ClipReveal", "ParallaxLayer", "ShineSweep", "Counter"]) ok(fx.includes(n), `effect present: ${n}`);

  // font Việt thật
  const g = await p.evaluate(async () => {
    await document.fonts.ready;
    const fam = getComputedStyle(document.querySelector("h2")).fontFamily;
    const body = getComputedStyle(document.querySelector("main")).fontFamily;
    const c = document.createElement("canvas").getContext("2d");
    const w = (f, t) => { c.font = f; return c.measureText(t).width; };
    const bad = [];
    for (const ch of "ăâêôơưđĂÂÊÔƠƯĐẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ") {
      const H = w(`800 60px ${fam}`, ch), base = w(`800 60px ${fam}`, "E");
      const asEcirc = w(`800 60px ${fam}`, "Ê");
      // dạng tách dấu sẽ rộng hơn E + một dấu rời; precomposed thì xấp xỉ chữ gốc
      if (H > Math.max(base, asEcirc) * 1.6 || H < 8) bad.push(ch);
    }
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/["']/g, "") + f.weight);
    const hasJa = document.fonts.check('700 40px nsjp', "こんにちは"), hasKo = document.fonts.check('700 40px nskr', "안녕하세요");
    return { fam, body, bad, loadedN: loaded.length, hasJa, hasKo, jaW: w("700 40px nsjp, serif", "こ") , jaFallback: w("700 40px serif", "こ") };
  });
  ok(g.bad.length === 0, `Vietnamese glyph metrics ok (${g.bad.join("") || "none bad"})`);
  ok(g.loadedN >= 3, `font faces loaded (${g.loadedN})`);
  ok(/Baloo|baloo|__/i.test(g.fam), `heading font family resolved: ${g.fam.slice(0, 60)}`);
  // chữ Nhật/Hàn dùng font tự host (khác nhau khi so với font hệ thống nhỏ)
  const cjk = await p.evaluate(async () => {
    await document.fonts.load('700 40px nsjp', "こんにちは안"); await document.fonts.load('700 40px nskr', "안녕하세요");
    const f = [...document.fonts].filter((x) => /nsjp|nskr/.test(x.family) && x.status === "loaded").length;
    return f;
  });
  ok(cjk >= 2, `Japanese/Korean subset fonts loaded (${cjk})`);

  // Kinetic
  const act = () => p.evaluate(() => [...document.querySelectorAll('[class*=kWord]')].filter((e) => e.dataset.on === "1").map((e) => e.lang).join(","));
  const seen = new Set();
  for (let i = 0; i < 16; i++) { seen.add(await act()); await p.waitForTimeout(500); }
  ok(["vi", "en", "ja", "ko"].every((l) => [...seen].some((s) => s.includes(l))), `kinetic cycles all 4 languages (${[...seen].join("|")})`);
  await p.click('button[class*=kPause]');
  ok(await p.getAttribute('button[class*=kPause]', "aria-pressed") === "true", "kinetic pause button aria-pressed");
  await p.mouse.move(5, 500);
  const before = await act(); await p.waitForTimeout(3500);
  ok((await act()) === before, "kinetic stays on same word while paused");
  ok(await p.evaluate(() => document.querySelector('[data-fx=KineticGreeting]').getAttribute("aria-live")) === "off", "kinetic aria-live=off");
  await p.click('button[class*=kPause]');
  await p.click('button[class*=kDot] >> nth=2');
  await p.waitForTimeout(900);
  ok((await act()).includes("ja"), "kinetic dot jumps to Japanese");
  await p.screenshot({ path: `${SHOT}kinetic-ja.png`, clip: { x: 0, y: 100, width: 800, height: 520 } });

  // Marquee control
  await p.evaluate(() => document.querySelector('[data-fx=VelocityMarquee]').scrollIntoView({ block: "center" }));
  ok(await p.evaluate(() => !!document.querySelector('[data-fx=VelocityMarquee] button')), "marquee has pause control");

  // Flip cards
  await p.evaluate(() => document.querySelector("#the-tu").scrollIntoView());
  await p.waitForTimeout(700);
  const flips = p.locator('button[class*=flip]:not([class*=flipInner])');
  ok((await flips.count()) === 4, "4 flip cards");
  await flips.nth(0).click();
  ok(await flips.nth(0).getAttribute("aria-pressed") === "true", "flip via click");
  await flips.nth(1).focus(); await p.keyboard.press("Enter");
  ok(await flips.nth(1).getAttribute("aria-pressed") === "true", "flip via Enter");
  await flips.nth(2).focus(); await p.keyboard.press("Space");
  ok(await flips.nth(2).getAttribute("aria-pressed") === "true", "flip via Space");
  const rot = await p.evaluate(() => getComputedStyle(document.querySelector('button[class*=flip][data-on="1"] [class*=flipInner]')).transform);
  ok(/matrix3d|matrix/.test(rot) && rot !== "none", `flip uses 3D transform (${rot.slice(0, 30)})`);
  await p.screenshot({ path: `${SHOT}vocab-flipped.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await p.keyboard.press("Escape");
  ok(await flips.nth(0).getAttribute("aria-pressed") === "false", "Escape resets flip cards");
  await p.click('#the-tu button:has-text("Tiếng Nhật")'); await p.waitForTimeout(300);
  ok((await p.innerText("#the-tu ul")).includes("ありがとう"), "vocab switches to Japanese");
  await p.click('#the-tu button:has-text("Tiếng Hàn")'); await p.waitForTimeout(300);
  ok((await p.innerText("#the-tu ul")).includes("고마워요"), "vocab switches to Korean");
  await p.click('#the-tu button:has-text("Lật tất cả")'); await p.waitForTimeout(200);
  ok((await p.innerText("#the-tu [role=status]")).includes("4/4"), "flip all counter 4/4");

  // Dialogue
  await p.evaluate(() => document.querySelector("#hoi-thoai").scrollIntoView({ block: "center" }));
  await p.waitForTimeout(500);
  const nb = () => p.locator('#hoi-thoai [role=log] button').count();
  await p.waitForTimeout(2200);
  const n1 = await nb(); ok(n1 >= 1, `dialogue bubbles appear sequentially (${n1})`);
  await p.waitForTimeout(3200);
  const n2 = await nb(); ok(n2 > n1, `dialogue progresses (${n1} -> ${n2})`);
  ok(await p.getAttribute('#hoi-thoai [role=log]', "aria-live") === "polite", "dialogue log aria-live=polite");
  await p.click('#hoi-thoai button:has-text("Tạm dừng")'); const n3 = await nb(); await p.waitForTimeout(2600);
  ok((await nb()) === n3, "dialogue pauses");
  await p.click('#hoi-thoai button:has-text("Tiếp tục")'); await p.waitForTimeout(8000);
  ok((await nb()) === 6, "dialogue completes 6 bubbles");
  await p.click('#hoi-thoai [role=log] button >> nth=0');
  ok(await p.locator('#hoi-thoai [role=log] em').count() === 1, "bubble click reveals Vietnamese gloss");
  await p.click('#hoi-thoai button:has-text("Phát lại")'); await p.waitForTimeout(400);
  ok((await nb()) <= 1, "dialogue replay restarts");
  await p.click('#hoi-thoai button:has-text("Tiếng Nhật")'); await p.waitForTimeout(6500);
  ok((await p.innerText('#hoi-thoai [role=log]')).includes("はじめまして"), "dialogue Japanese runs");
  await p.screenshot({ path: `${SHOT}dialogue.png` });

  // Scrub text: tiến độ sáng dần
  const sumOp = () => p.evaluate(() => [...document.querySelectorAll('[data-fx=ScrollScrubText] span')].reduce((x, s) => x + +getComputedStyle(s).opacity, 0));
  const top = await p.evaluate(() => document.querySelector('[data-fx=ScrollScrubText]').getBoundingClientRect().top + scrollY);
  await p.evaluate((t) => scrollTo(0, t - 850), top); await p.waitForTimeout(700);
  const s1 = await sumOp();
  await p.evaluate((t) => scrollTo(0, t - 300), top); await p.waitForTimeout(900);
  const s2 = await sumOp();
  const nw = await p.locator('[data-fx=ScrollScrubText] span').count();
  ok(nw > 10 && s2 > s1 + 2, `scrub text brightens on scroll (${s1.toFixed(1)} -> ${s2.toFixed(1)} / ${nw} words)`);

  // Long tasks while scrolling
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 350) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(70); }
  console.log("LONGTASKS>200ms @1440:", await p.evaluate(() => window.__lt));
  await ctx.close();
}

// 3. Level test + lịch + tóm tắt + link tư vấn
{
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => document.querySelector("#cong-cu").scrollIntoView());
  await p.waitForTimeout(400);
  // lỗi: bấm Câu tiếp khi chưa chọn
  await p.evaluate(() => document.querySelector('form button[type="submit"]').click());
  ok(await p.locator("#lt-err").count() === 1, "error shown when no answer selected");
  ok(await p.getAttribute("fieldset", "aria-describedby") === "lt-err", "error linked via aria-describedby");
  ok((await p.innerText('[data-tool=level-test] [class*=quizTop]')).includes("Câu 1/10"), "still on Q1 after error");
  await p.evaluate(() => document.getElementById("en1-1").click()); await p.focus("#en1-1"); await p.keyboard.press("Enter"); await p.waitForTimeout(100);
  ok((await p.innerText('[data-tool=level-test] [class*=quizTop]')).includes("Câu 2/10"), "Enter on radio submits and advances");
  // Quay lại Câu trước
  await p.click('button:has-text("Câu trước")');
  ok((await p.innerText('[data-tool=level-test] [class*=quizTop]')).includes("Câu 1/10"), "back to Q1");
  const results = {};
  for (const lang of ["en", "ja", "ko"]) {
    const name = { en: "Tiếng Anh", ja: "Tiếng Nhật", ko: "Tiếng Hàn" }[lang];
    await p.click(`[data-tool=level-test] button:has-text("${name}")`); await p.waitForTimeout(150);
    ok((await p.innerText('[data-tool=level-test] [class*=quizTop]')).includes("Câu 1/10"), `${lang}: language change resets quiz`);
    await answerAll(p, lang, "right");
    let lv = await p.getAttribute('[data-tool=level-test] [class*=result]', "data-level");
    ok(lv === "5", `${lang}: all correct -> level 5 (got ${lv})`);
    ok((await p.innerText('[data-tool=level-test] [class*=result]')).includes("30/30"), `${lang}: score 30/30`);
    await p.click('button:has-text("Làm lại bài")');
    await answerAll(p, lang, "wrong");
    lv = await p.getAttribute('[data-tool=level-test] [class*=result]', "data-level");
    ok(lv === "1", `${lang}: all wrong -> level 1 (got ${lv})`);
    await p.click('button:has-text("Làm lại bài")');
    await answerAll(p, lang, "mid");
    lv = await p.getAttribute('[data-tool=level-test] [class*=result]', "data-level");
    ok(lv === "3", `${lang}: tiers 1-3 correct -> level 3 (got ${lv})`);
    results[lang] = await p.innerText('[data-tool=level-test] [class*=result]');
    if (lang === "ja") await p.screenshot({ path: `${SHOT}result-ja.png` });
    await p.click('button:has-text("Làm lại bài")');
  }
  ok(/không phải chứng nhận|không quy đổi/.test(results.en) && !/IELTS|TOEIC|JLPT|TOPIK|CEFR/i.test(results.en + results.ja + results.ko), "result disclaims certificates, no exam names");
  // kết quả -> lọc lịch
  await p.click('[data-tool=level-test] button:has-text("Tiếng Hàn")');
  await answerAll(p, "ko", "mid");
  const fl = await p.evaluate(() => [...document.querySelectorAll('[data-tool=schedule] [aria-pressed="true"]')].map((e) => e.textContent.trim()).join("|"));
  ok(/Tiếng Hàn/.test(fl) && /Cấp 3/.test(fl), `schedule filtered by result (${fl})`);
  ok((await p.locator('[data-tool=schedule] table button').count()) >= 1, "schedule shows matching class chips");
  ok((await p.innerText('[data-tool=schedule] [class*=detail]')).includes("Hanguk Talk"), "suggested class preselected, detail visible");
  // lọc thủ công
  await p.click('[data-tool=schedule] [aria-label="Lọc theo cấp độ"] button:has-text("Cấp 5")');
  await p.click('[data-tool=schedule] [aria-label="Lọc theo ngôn ngữ"] button:has-text("Tiếng Nhật")');
  await p.waitForTimeout(200);
  ok((await p.innerText('[data-tool=schedule] [role=status]')).includes("Không có lớp nào"), "empty state for no match (JA cấp 5)");
  ok(await p.getByRole("button", { name: "Xoá bộ lọc" }).count() === 1, "empty state has reset action");
  await p.getByRole("button", { name: "Xoá bộ lọc" }).click(); await p.waitForTimeout(150);
  ok((await p.innerText('[data-tool=schedule] [role=status]')).includes("14 lớp"), "reset shows all 14 classes");
  await p.click('[data-tool=schedule] [aria-label="Lọc theo ngôn ngữ"] button:has-text("Tiếng Anh")');
  await p.click('[data-tool=schedule] [aria-label="Lọc theo khung giờ"] button:has-text("Tối")');
  const cnt = await p.locator('[data-tool=schedule] table td button').count();
  ok(cnt === 4 + 0, `EN + Tối: chips in table = 4 (got ${cnt})`);
  await p.locator('[data-tool=schedule] table td button').first().click();
  const detail = await p.innerText('[data-tool=schedule] [class*=detail]');
  ok(/Tóm tắt lựa chọn/i.test(detail) && /Học phí tham khảo/i.test(detail) && /₫/.test(detail), "summary + price shown");
  ok(!/IELTS|TOEIC|JLPT|TOPIK/.test(detail), "no exam claims in summary");
  const href = await p.getAttribute('[data-tool=schedule] a:has-text("Nhờ tư vấn")', "href");
  ok(href.startsWith("/lien-he"), `final CTA goes to consult form (${href})`);
  if (/industry=/.test(href)) ok(/solution=education/.test(href) && /utm_campaign=ngoai-ngu-sao/.test(href) && /utm_source=showroom/.test(href), "consult href has industry/solution/utm_campaign");
  else note("consult href lacks industry/solution/utm: registry chưa có ngoai-ngu-sao (cần chạy scripts/showroom-registry-sync.mjs)");
  await p.screenshot({ path: `${SHOT}schedule.png` });
  // chép tóm tắt: không lỗi, có thông báo
  await p.click('button:has-text("Chép tóm tắt")'); await p.waitForTimeout(300);
  ok((await p.innerText('[data-tool=schedule] [class*=copied]')).length > 5, "copy summary gives status message");

  // chữ cấm ở nhiều trạng thái
  const txt = await visibleText(p);
  const m = txt.match(FORBID);
  ok(!m, `no forbidden label words on page${m ? " -> " + m[0] : ""}`);
  await ctx.close();
}

// 4. ngôn ngữ: chữ cấm ở trạng thái khác + credits
{
  const { ctx, p } = await open(1440, 900);
  await p.click('#the-tu button:has-text("Lật tất cả")');
  await p.evaluate(() => document.querySelector("#hoi-thoai").scrollIntoView());
  await p.click('#hoi-thoai button:has-text("Hiện nghĩa tiếng Việt")'); await p.waitForTimeout(8000);
  const txt = await visibleText(p);
  ok(!FORBID.test(txt), "no forbidden words (flipped + gloss states)");
  await p.goto(`${PAGE}/credits`, { waitUntil: "networkidle" });
  const ct = await p.innerText("body");
  ok(/Pexels/.test(ct) && /Baloo 2/.test(ct) && /Trần Công Tiến/.test(ct), "credits page lists images, fonts, honest statement");
  ok(await p.locator("main img").count() === 11, "credits shows 11 images");
  await ctx.close();
}

// 5. reduced motion
{
  const { ctx, p } = await open(1440, 900, { reducedMotion: "reduce" });
  ok(await p.locator('button[class*=kPause]').count() === 0, "reduced: kinetic pause hidden (static)");
  const a = await p.evaluate(() => [...document.querySelectorAll('[class*=kWord]')].filter((e) => e.dataset.on === "1").map((e) => e.lang).join(","));
  await p.waitForTimeout(3500);
  const a2 = await p.evaluate(() => [...document.querySelectorAll('[class*=kWord]')].filter((e) => e.dataset.on === "1").map((e) => e.lang).join(","));
  ok(a === a2 && a === "vi", `reduced: kinetic static on first word (${a})`);
  await p.evaluate(() => document.querySelector("#hoi-thoai").scrollIntoView());
  await p.waitForTimeout(300);
  ok(await p.locator('#hoi-thoai [role=log] button').count() === 6, "reduced: dialogue shows all 6 bubbles at once");
  ok(await p.locator('#hoi-thoai button:has-text("Tạm dừng")').count() === 0, "reduced: no dialogue play control");
  const op = await p.evaluate(() => { const w = [...document.querySelectorAll('[data-fx=ScrollScrubText] span')]; return Math.min(...w.map((s) => +getComputedStyle(s).opacity)); });
  ok(op >= 0.99, `reduced: scrub text fully visible (min opacity ${op})`);
  const hid = await p.evaluate(() => [...document.querySelectorAll("h1,h2,[data-fx=SplitReveal] *")].filter((e) => getComputedStyle(e).opacity === "0" || getComputedStyle(e).visibility === "hidden").length);
  ok(hid === 0, `reduced: headings visible (${hid} hidden)`);
  await p.evaluate(() => document.querySelector("#the-tu").scrollIntoView());
  await p.locator('button[class*=flip]:not([class*=flipInner])').first().click();
  ok(await p.locator('button[class*=flip]:not([class*=flipInner])').first().getAttribute("aria-pressed") === "true", "reduced: flip still works");
  const tr = await p.evaluate(() => getComputedStyle(document.querySelector('[class*=flipInner]')).transitionDuration);
  ok(/^0s/.test(tr), `reduced: flip transition disabled (${tr})`);
  await ctx.close();
}

// 6. bàn phím, menu mobile, ref cookie, hiệu năng mobile
{
  const { ctx, p } = await open(1440, 900, {}, `${PAGE}?ref=abc123`);
  const ck = (await ctx.cookies()).find((c) => c.name === "tct_ref");
  note(`tct_ref cookie ${ck ? "set" : "not set"} (proxy chỉ đặt khi mã ref thuộc đối tác đã duyệt trong DB; trang demo không đọc/ghi cookie này)`);
  ok(await p.evaluate(() => document.querySelector('a[href^="/lien-he"]') !== null && !document.cookie.includes("tct_ref=x")), "page opened with ?ref= works and consult links stay first-party (/lien-he)");
  let reached = false;
  for (let i = 0; i < 12 && !reached; i++) { await p.keyboard.press("Tab"); reached = await p.evaluate(() => /Kiểm tra cấp độ/.test(document.activeElement?.textContent || "") && document.activeElement.tagName === "A"); }
  ok(reached, "Tab reaches primary CTA");
  ok(await p.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2; }), "focus ring visible on CTA");
  ok(await p.evaluate(() => [...document.querySelectorAll("a[href^='#']")].some((a) => a.className.includes("skip"))), "skip link present");
  await ctx.close();
}
{
  const { ctx, p } = await open(390, 844, { hasTouch: true, isMobile: true });
  await p.evaluate(() => { window.__lt = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__lt++; })).observe({ entryTypes: ["longtask"] }); });
  await p.click('button[aria-controls="ns-menu"]'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !document.getElementById("ns-menu").hidden), "mobile menu opens");
  ok(await p.evaluate(() => document.getElementById("ns-menu").contains(document.activeElement)), "menu moves focus inside");
  await p.keyboard.press("Escape"); await p.waitForTimeout(150);
  ok(await p.evaluate(() => document.getElementById("ns-menu").hidden && document.activeElement === document.querySelector('button[aria-controls="ns-menu"]')), "Escape closes menu and returns focus");
  const small = await p.evaluate(() => [...document.querySelectorAll("a,button,summary,label")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && (r.height < 43.5 || r.width < 43.5) && !e.closest("[aria-hidden=true]") && !e.matches('[class*=skip]'); }).map((e) => `${e.tagName}.${(e.className + "").slice(0, 18)}:${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`));
  ok(small.length === 0, `touch targets >=44px @390 (${small.slice(0, 6).join(", ")})`);
  const fs = await p.evaluate(() => { const i = [...document.querySelectorAll("input,textarea,select")]; return i.every((e) => parseFloat(getComputedStyle(e).fontSize) >= 16); });
  ok(fs, "form inputs font >=16px");
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 350) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(70); }
  console.log("LONGTASKS>200ms @390:", await p.evaluate(() => window.__lt));
  await ctx.close();
}
await b.close();
console.log(`\nRESULT pass=${pass} fail=${fail} notes=${warn}`);
process.exit(fail ? 1 : 0);
