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
    await p.evaluate(() => document.querySelector('[data-tool=level-test] form button[type="submit"]').click());
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
  for (const n of ["FlipCards", "ChatBubbles", "ScrollScrubText", "SVGPathDraw", "TiltCard", "SlotText", "ProgramFilter", "RoadmapCards", "OpeningCalendar", "PlanCompare", "Counter"]) ok(fx.includes(n), `effect present: ${n}`);
  for (const n of ["VelocityMarquee", "MagneticButton", "ClipReveal", "ParallaxLayer", "ScrollProgress", "SplitReveal"]) ok(!fx.includes(n), `mass effect removed: ${n}`);

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

  // Hero: trung tâm cụ thể
  const h1 = await p.innerText("h1");
  ok(/Trung tâm ngoại ngữ/i.test(h1) && /Mở Lời/.test(h1), `h1 names the center: ${h1.replace(/\n/g, " | ")}`);
  const heroTxt = await p.innerText("section[aria-labelledby=hero-title]");
  ok(/Hải Châu/.test(heroTxt) && /IELTS/.test(heroTxt) && /JLPT/.test(heroTxt) && /TOPIK|tiếng Hàn/i.test(heroTxt), "hero says what/where/for whom");
  ok(/Tối đa 12/.test(heroTxt) && /Tại trung tâm/.test(heroTxt) && /2\.400\.000/.test(heroTxt), "hero has 3 concrete facts (class size, format, price from)");
  const heroCta = p.locator('section[aria-labelledby=hero-title] a:has-text("Đăng ký học thử miễn phí")');
  ok((await heroCta.count()) === 1, "hero CTA: Đăng ký học thử miễn phí");
  const hcHref = await p.locator('section[aria-labelledby=hero-title] a:has-text("Nhận tư vấn lộ trình")').getAttribute("href");
  ok(/^\/lien-he/.test(hcHref || ""), `hero consult CTA -> ${hcHref}`);
  const slotWords = await p.locator("h1 [data-fx=SlotText] [data-fx-item]").evaluateAll((e) => e.map((x) => x.textContent));
  ok(slotWords.length === 4, `hero slot has 4 topics (${slotWords.join("|")})`);
  const slotAct = () => p.evaluate(() => [...document.querySelectorAll("h1 [data-fx=SlotText] [data-fx-item]")].find((e) => getComputedStyle(e).opacity === "1")?.textContent);
  const seenSlot = new Set(); for (let i = 0; i < 9; i++) { seenSlot.add(await slotAct()); await p.waitForTimeout(700); }
  ok(seenSlot.size >= 2, `hero topic slot cycles (${[...seenSlot].join(" | ")})`);
  const secs = await p.evaluate(() => [...document.querySelectorAll("main > section")].map((e) => e.id).filter(Boolean));
  for (const id of ["gioi-thieu", "chuong-trinh", "lo-trinh", "doi-ngu", "khai-giang", "hoc-phi", "co-so", "quy-trinh", "kiem-tra", "hoi-dap", "dang-ky"]) ok(secs.includes(id), `section present: #${id}`);
  const secTxt = await p.innerText("main");
  ok(/Tiếng Anh thiếu nhi/.test(secTxt) && /THCS/.test(secTxt) && /người đi làm/i.test(secTxt) && /N5/.test(secTxt) && /TOPIK/.test(secTxt) && /IELTS/.test(secTxt), "programs cover kids/teens/working adults, IELTS, JLPT, TOPIK");
  ok(/hoàn 100% học phí/.test(secTxt) && /giảm 5%/.test(secTxt) && /Học thử 1 buổi miễn phí/.test(secTxt), "tuition page has offers + refund policy");
  ok(!/(tỉ lệ đỗ|tỷ lệ đỗ|đạt band|band \d(\.\d)? trở lên|cam kết đầu ra|học viên đạt)/i.test(secTxt), "no claimed scores/pass rates");

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

// 2b. Chương trình, lộ trình, lịch khai giảng, học phí, đăng ký
{
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => document.querySelector("#chuong-trinh").scrollIntoView());
  await p.waitForTimeout(500);
  const cards = () => p.locator("#chuong-trinh [data-pid]").count();
  ok((await cards()) === 11, `11 programs listed (${await cards()})`);
  await p.click('#chuong-trinh [aria-label="Lọc theo ngôn ngữ"] button:has-text("IELTS")'); await p.waitForTimeout(700);
  ok((await cards()) === 2, "filter IELTS -> 2 programs");
  await p.click('#chuong-trinh [aria-label="Lọc theo đối tượng"] button:has-text("Thiếu nhi")'); await p.waitForTimeout(500);
  ok((await cards()) === 0 && (await p.locator('#chuong-trinh button:has-text("Xoá bộ lọc")').count()) === 1, "IELTS + Thiếu nhi -> empty state with reset");
  await p.click('#chuong-trinh button:has-text("Xoá bộ lọc")'); await p.waitForTimeout(700);
  ok((await cards()) === 11, "reset shows all programs");
  await p.click('#chuong-trinh [aria-label="Lọc theo đối tượng"] button:has-text("Thiếu nhi")'); await p.waitForTimeout(700);
  ok((await cards()) === 1 && /Tiếng Anh thiếu nhi/.test(await p.innerText("#chuong-trinh [data-pid]")), "audience Thiếu nhi -> 1 program");
  const ptxt = await p.innerText("#chuong-trinh [data-pid]");
  ok(/Tối đa 10/.test(ptxt) && /60 phút/.test(ptxt) && /Giáo trình/.test(ptxt) && /₫/.test(ptxt), "program card lists size, duration, material, price");
  await p.screenshot({ path: `${SHOT}programs.png` });
  await p.click('#chuong-trinh [aria-label="Lọc theo đối tượng"] button:has-text("Mọi đối tượng")');
  await p.click('#chuong-trinh [aria-label="Lọc theo ngôn ngữ"] button:has-text("Tiếng Nhật")'); await p.waitForTimeout(600);
  ok((await cards()) === 3, "filter JLPT -> N5, N4, N3");

  // Lộ trình
  await p.evaluate(() => document.querySelector("#lo-trinh").scrollIntoView());
  await p.waitForTimeout(900);
  ok((await p.locator("#lo-trinh [data-fx=RoadmapCards] ol > li").count()) === 5, "roadmap: 5 steps for English");
  const total0 = await p.innerText("#lo-trinh [aria-label='Phần còn lại của lộ trình']");
  await p.click('#lo-trinh button:has-text("Bắt đầu từ chặng này") >> nth=1'); await p.waitForTimeout(1200);
  const total1 = await p.innerText("#lo-trinh [aria-label='Phần còn lại của lộ trình']");
  ok(total0 !== total1 && /Cấp 3/.test(total1), "roadmap: choosing a start step recalculates remaining courses/cost");
  await p.click('#lo-trinh [aria-label="Chọn lộ trình"] button:has-text("Tiếng Nhật")'); await p.waitForTimeout(900);
  ok((await p.locator("#lo-trinh [data-fx=RoadmapCards] ol > li").count()) === 3, "roadmap: switching to Japanese -> 3 steps");
  ok(/N3/.test(await p.innerText("#lo-trinh")), "roadmap: JLPT steps shown");
  await p.screenshot({ path: `${SHOT}roadmap.png` });
  // chương trình -> lộ trình
  await p.evaluate(() => document.querySelector("#chuong-trinh").scrollIntoView());
  await p.click('#chuong-trinh [aria-label="Lọc theo ngôn ngữ"] button:has-text("Tiếng Hàn")'); await p.waitForTimeout(500);
  await p.locator('#chuong-trinh a:has-text("Xem lộ trình")').first().click(); await p.waitForTimeout(500);
  ok(await p.locator('#lo-trinh [aria-label="Chọn lộ trình"] button[aria-pressed="true"]').innerText() === "Tiếng Hàn TOPIK", "program 'Xem lộ trình' selects matching roadmap");

  // Lịch khai giảng
  await p.evaluate(() => document.querySelector("#khai-giang").scrollIntoView());
  await p.waitForTimeout(700);
  const dates = await p.locator("#khai-giang [data-fx=OpeningCalendar] ol > li button").evaluateAll((els) => els.map((e) => e.textContent));
  ok(dates.length === 14, `opening calendar lists 14 classes (${dates.length})`);
  ok(/^5Th12/.test(dates[0]) || /^05Th12/.test(dates[0]) || /5Th12/.test(dates[0]), `calendar sorted by start date (first: ${dates[0].slice(0, 40)})`);
  await p.locator("#khai-giang [data-fx=OpeningCalendar] ol > li button").nth(5).click(); await p.waitForTimeout(900);
  const det = await p.innerText('[data-tool=schedule] [class*=detail]');
  ok(/Khai giảng/.test(det) && /Sĩ số tối đa/.test(det), "selecting an opening shows start date + class size");
  const seatN = await p.locator("[data-fx=SeatMap] circle").count();
  ok(seatN >= 8 && seatN <= 12, `seat map draws ${seatN} seats`);
  await p.screenshot({ path: `${SHOT}schedule-open.png` });

  // Học phí
  await p.evaluate(() => document.querySelector("#hoc-phi").scrollIntoView());
  await p.waitForTimeout(900);
  ok((await p.locator("#hoc-phi [data-pack]").count()) === 3, "pricing compares 3 packs");
  const priceOf = (i) => p.evaluate((i) => +document.querySelectorAll("#hoc-phi [data-pack]")[i].querySelector("[data-fx=Counter] span[style], [data-fx=Counter] span:last-child").textContent.replace(/\D/g, ""), i);
  const g0 = await priceOf(0), g1 = await priceOf(1), g2 = await priceOf(2);
  ok(g0 === 2400000 && g1 > g0 && g2 > g1, `plans price ascending: ${g0} < ${g1} < ${g2}`);
  await p.selectOption("#plan-prog", "ielts-i"); await p.waitForTimeout(1300);
  ok((await priceOf(0)) === 4800000, "choose IELTS Intensive -> group price 4.800.000");
  await p.click('#hoc-phi [role=radio]:has-text("Nhóm 3 người")'); await p.waitForTimeout(1300);
  ok((await priceOf(0)) === 4416000, `group discount 8% applied (${await priceOf(0)})`);
  ok(/hoàn 100%/.test(await p.innerText("#hoc-phi")), "refund policy visible");
  await p.screenshot({ path: `${SHOT}pricing.png` });

  // Đăng ký
  await p.evaluate(() => document.querySelector("#dang-ky").scrollIntoView());
  await p.click('#dang-ky button[type=submit]'); await p.waitForTimeout(200);
  ok((await p.locator("#dang-ky [role=alert]").count()) === 4, "register: 4 field errors when empty");
  ok((await p.locator('#dang-ky [aria-invalid="true"]').count()) >= 4, "register: aria-invalid on options");
  await p.evaluate(() => ["rg-who-kid", "rg-int-en", "rg-when-toi", "rg-mode-tai"].forEach((id) => document.getElementById(id).click()));
  await p.click('#dang-ky button[type=submit]'); await p.waitForTimeout(300);
  const regTxt = await p.innerText("#dang-ky [aria-live=polite]");
  ok(/tóm tắt đăng ký/i.test(regTxt) && /Tiếng Anh giao tiếp/.test(regTxt), "register: summary produced");
  const regHref = await p.getAttribute('#dang-ky a:has-text("Gửi cho tư vấn viên")', "href");
  ok(/^\/lien-he/.test(regHref), `register: final CTA -> ${regHref}`);
  ok((await p.evaluate(() => [...document.querySelectorAll("[data-fx]")].some((e) => e.dataset.fx === "ShineSweep"))), "effect present: ShineSweep");
  ok(!(await p.locator("#dang-ky input[type=text],#dang-ky input[type=tel],#dang-ky input[type=email]").count()), "register: collects no name/phone/email");
  await p.screenshot({ path: `${SHOT}register.png` });
  await ctx.close();
}

// 3. Level test + lịch + tóm tắt + link tư vấn
{
  const { ctx, p } = await open(1440, 900);
  await p.evaluate(() => document.querySelector("#kiem-tra").scrollIntoView());
  await p.waitForTimeout(400);
  // lỗi: bấm Câu tiếp khi chưa chọn
  await p.evaluate(() => document.querySelector('[data-tool=level-test] form button[type="submit"]').click());
  ok(await p.locator("#lt-err").count() === 1, "error shown when no answer selected");
  ok(await p.getAttribute("[data-tool=level-test] fieldset", "aria-describedby") === "lt-err", "error linked via aria-describedby");
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
  ok(await p.locator("h1 [data-fx=SlotText]").getAttribute("data-fx-ready") === "static", "reduced: hero slot static");
  const sl0 = await p.evaluate(() => [...document.querySelectorAll("h1 [data-fx=SlotText] [data-fx-item]")].map((e) => getComputedStyle(e).opacity).join());
  await p.waitForTimeout(3200);
  const sl1 = await p.evaluate(() => [...document.querySelectorAll("h1 [data-fx=SlotText] [data-fx-item]")].map((e) => getComputedStyle(e).opacity).join());
  ok(sl0 === sl1 && sl0.startsWith("1,"), `reduced: hero topic stays on first word (${sl0})`);
  ok(await p.locator("#chuong-trinh [data-pid]").count() === 11, "reduced: all programs visible");
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
  for (let i = 0; i < 12 && !reached; i++) { await p.keyboard.press("Tab"); reached = await p.evaluate(() => /Đăng ký học thử/.test(document.activeElement?.textContent || "") && document.activeElement.tagName === "A"); }
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
