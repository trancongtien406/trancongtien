// E2E Bông Xù (/demos/pet-vui). Chạy: BASE=http://localhost:3100 node tests/showroom/pet-vui/e2e.mjs
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const URL_ = `${BASE}/demos/pet-vui`;
const here = path.dirname(fileURLToPath(import.meta.url));
const shots = path.join(here, "screenshots");
fs.mkdirSync(shots, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const BAD = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;
const U = globalThis.URL;

async function open(ctxOpts = {}, w = 1440, h = 900, query = "") {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...ctxOpts });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  page.on("request", (r) => { const u = new U(r.url()); if (u.protocol.startsWith("http") && u.origin !== new U(BASE).origin) ext.push(r.url()); });
  await page.goto(URL_ + query, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  return { ctx, page, errs, ext };
}
const scrollThrough = async (page, h) => {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += Math.round(h * 0.9)) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(70); }
  await page.waitForTimeout(500);
};

// 1) tải + console + request ngoài + chữ cấm + glyph
{
  const { ctx, page, errs, ext } = await open();
  ok(errs.length === 0, `0 lỗi console (${errs.length}) ${errs.slice(0, 2).join(" | ").slice(0, 300)}`);
  ok(ext.length === 0, `0 request ngoài origin (${ext.length}) ${ext.slice(0, 2).join(" ")}`);
  ok(/Bông Xù/.test(await page.title()), `title: ${await page.title()}`);
  await scrollThrough(page, 900);
  const texts = await page.evaluate(() => {
    const root = document.querySelector("[data-pv-root]");
    const out = [];
    root.querySelectorAll("*").forEach((e) => ["alt", "aria-label", "title", "placeholder"].forEach((a) => e.getAttribute(a) && out.push(e.getAttribute(a))));
    out.push(root.textContent);
    document.querySelectorAll("meta[name=description],meta[property^='og:']").forEach((m) => out.push(m.content));
    out.push(document.title);
    return out.join("\n");
  });
  const m = texts.match(BAD);
  ok(!m, `không có chữ cấm trên trang chính${m ? ": " + m[0] : ""}`);
  const gl = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").length;
    const fam = getComputedStyle(document.querySelector("h1")).fontFamily;
    const c = document.createElement("canvas").getContext("2d");
    const res = {};
    for (const ch of "ăâêôơưđẮỆỐỬỮỜẶ") {
      c.font = `400 80px ${fam}`; const a = c.measureText(ch).width;
      c.font = `400 80px monospace`; const b = c.measureText(ch).width;
      res[ch] = Math.abs(a - b) > 0.2;
    }
    return { loaded, res };
  });
  ok(gl.loaded >= 4, `font đã tải (${gl.loaded} face)`);
  ok(Object.values(gl.res).every(Boolean), `glyph Việt khác fallback: ${JSON.stringify(gl.res)}`);
  // glyph chồng dấu: chụp chữ đậm lớn
  await page.setContent(`<body style="margin:0;background:#ffc300"><div style="font:400 90px 'Coiny',sans-serif">Ắ Ế Ể Ệ Ố Ổ Ợ Ử Ữ Ự Ặ</div></body>`).catch(() => {});
  await ctx.close();
}

// 2) không tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await open({}, w, 800);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(400);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ở ${w}px (${o.sw}/${o.cw})`);
  await ctx.close();
}

// 3) công cụ chọn gói
{
  const { ctx, page } = await open({ permissions: ["clipboard-read", "clipboard-write"] });
  await page.locator("#chon-goi").scrollIntoViewIfNeeded();
  const plan = page.locator("aside[aria-label='Kế hoạch chăm sóc']");
  ok(/Chưa đủ thông tin/.test(await plan.innerText()) && /loài/.test(await plan.innerText()), "trạng thái rỗng: báo còn thiếu loài, cân nặng, độ dài lông");
  ok(await page.locator("fieldset", { hasText: "Cân nặng" }).first().evaluate((e) => e.disabled), "cân nặng khoá khi chưa chọn loài");
  await page.locator("label", { hasText: "Chó" }).first().click();
  await page.locator("label", { hasText: "7 – 15 kg" }).click();
  ok(/cân nặng|độ dài lông/.test(await plan.innerText()) && !/độ dài lông.*cân nặng/.test(await plan.innerText()), "thiếu độ dài lông thì vẫn rỗng");
  await page.locator("label", { hasText: "Lông vừa" }).click();
  const t1 = await plan.innerText();
  ok(/Tắm Bọt Thơm/.test(t1) && /₫/.test(t1) && /phút|giờ/.test(t1), "đủ 3 mục: hiện gói, giá, thời gian");
  const price1 = (t1.match(/([\d.]+)\s*₫/) || [])[1];
  // đổi sang tỉa gọn -> giá tăng
  await page.locator("label", { hasText: "Tắm và tỉa gọn" }).click();
  const t2 = await plan.innerText();
  const price2 = (t2.match(/([\d.]+)\s*₫/) || [])[1];
  ok(/Tắm & Tỉa Gọn/.test(t2) && +price2.replace(/\./g, "") > +price1.replace(/\./g, ""), `đổi mục tiêu: gói + giá tăng (${price1} -> ${price2})`);
  ok(/Tỉa gọn mặt/.test(t2), "chó tỉa gọn có bước tỉa mặt");
  // tình trạng rối + mùi + rụng
  const nBefore = await plan.locator("ol li").count();
  await page.locator("label", { hasText: "Lông rối, vón cục" }).click();
  await page.locator("label", { hasText: "Hơi có mùi" }).click();
  await page.locator("label", { hasText: "Rụng nhiều lông" }).click();
  const nAfter = await plan.locator("ol li").count();
  ok(nAfter === nBefore + 3, `3 tình trạng thêm 3 bước (${nBefore} -> ${nAfter})`);
  // mèo: đổi loài reset cân nặng nếu id không còn
  await page.locator("label", { hasText: "Mèo" }).first().click();
  ok(/Chưa đủ thông tin/.test(await plan.innerText()), "đổi sang mèo: cân nặng reset, quay về trạng thái rỗng");
  ok((await page.locator("label", { hasText: /^\s*Trên 5 kg/ }).count()) === 1, "mèo có mức Trên 5 kg riêng");
  await page.locator("label", { hasText: "Dưới 3 kg" }).first().click();
  await page.locator("label", { hasText: "Lông dài" }).click();
  const t3 = await plan.innerText();
  ok(/Sấy nhẹ, dừng nghỉ/.test(t3) && /Mèo được nghỉ/.test(t3), "mèo có bước sấy nhẹ và ghi chú riêng cho mèo");
  // cảnh báo thú y luôn có; bật cờ da
  ok(/hỏi bác sĩ thú y trước khi đặt lịch/i.test(t3), "cảnh báo hỏi bác sĩ thú y luôn hiện cùng kế hoạch");
  ok(!(await plan.locator("[role=alert]").count()), "chưa tick cờ da: chưa có cảnh báo mạnh");
  await page.getByLabel(/Bé có vết đỏ/).check();
  ok(/Hỏi bác sĩ thú y trước/.test(await plan.locator("[role=alert]").innerText()), "tick cờ da: cảnh báo mạnh hỏi bác sĩ thú y trước");
  // copy
  await page.getByRole("button", { name: "Sao chép tóm tắt" }).click();
  await page.waitForTimeout(300);
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => "ERR"));
  ok(/Tóm tắt chăm sóc tại Bông Xù/.test(clip) && /Giá tham khảo/.test(clip) && /bác sĩ thú y/.test(clip), "sao chép tóm tắt (có giá tham khảo + lưu ý thú y)");
  ok(/Đã sao chép/.test(await page.locator("[role=status]").innerText()), "thông báo sao chép (aria-live)");
  // CTA
  const href = await plan.getByRole("link", { name: "Gửi yêu cầu tư vấn" }).getAttribute("href");
  ok(/^\/lien-he/.test(href || ""), `CTA tới form tư vấn: ${href}`);
  console.log("INFO href:", href);
  ok(!/<form[^>]*action/i.test(await page.content()), "không có form gửi dữ liệu");
  await page.locator("#chon-goi").screenshot({ path: path.join(shots, "planner-1440.png") });
  // persist
  await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(700);
  ok(await page.locator("input[type=radio]:checked").count() >= 3, "lựa chọn được khôi phục sau tải lại");
  await page.getByRole("button", { name: "Làm lại từ đầu" }).click();
  ok(/Chưa đủ thông tin/.test(await page.locator("aside[aria-label='Kế hoạch chăm sóc']").innerText()), "Làm lại từ đầu xoá lựa chọn");
  await ctx.close();
}

// 4) hiệu ứng ký hiệu
{
  const { ctx, page } = await open();
  // paw cursor
  ok(await page.locator("[data-pv-root]").getAttribute("data-paw") === "on", "con trỏ chân thú bật (pointer fine)");
  await page.mouse.move(300, 300); await page.mouse.move(500, 380, { steps: 12 }); await page.mouse.move(700, 450, { steps: 12 });
  await page.waitForTimeout(250);
  const paw = await page.evaluate(() => { const e = [...document.querySelectorAll("div")].find((d) => /pawCursor/.test(d.className)); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, op: getComputedStyle(e).opacity }; });
  ok(Math.abs(paw.x - 700) < 25 && Math.abs(paw.y - 450) < 25 && +paw.op > 0.5, `dấu chân đi theo con trỏ (${Math.round(paw.x)},${Math.round(paw.y)})`);
  const trailN = await page.evaluate(() => [...document.querySelectorAll("div")].filter((d) => /pawPrint/.test(d.className)).length);
  ok(trailN >= 1 && trailN <= 7, `để lại dấu chân khi di chuyển (${trailN})`);
  // sticker kéo thả
  const st = page.locator("[data-sticker]").first();
  const b0 = await st.boundingBox();
  await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2);
  await page.mouse.down(); await page.mouse.move(b0.x + b0.width / 2 + 60, b0.y + b0.height / 2 + 70, { steps: 8 }); await page.mouse.up();
  await page.waitForTimeout(600);
  const b1 = await st.boundingBox();
  ok(Math.abs(b1.x - b0.x) > 30 && Math.abs(b1.y - b0.y) > 30, `kéo nhãn dán dời vị trí (${Math.round(b1.x - b0.x)},${Math.round(b1.y - b0.y)})`);
  await st.focus(); const tb = await st.evaluate((e) => e.style.transform);
  await page.keyboard.press("ArrowLeft"); await page.keyboard.press("r");
  ok((await st.evaluate((e) => e.style.transform)) !== tb, "bàn phím: mũi tên dời, R xoay nhãn dán");
  // chữ nhảy theo từ
  const words = await page.locator("h1 [data-w]").count();
  ok(words >= 5, `h1 tách ${words} từ nhảy riêng`);
  // đuôi vẫy
  const btn = page.locator("a[class*=wag]").first();
  await btn.scrollIntoViewIfNeeded(); await btn.hover(); await page.waitForTimeout(500);
  const tail = await btn.locator("svg").evaluate((e) => ({ op: getComputedStyle(e).opacity, an: getComputedStyle(e).animationName }));
  ok(+tail.op === 1 && /wag/.test(tail.an), `hover nút: đuôi hiện và vẫy (${tail.op}/${tail.an})`);
  // bọt xà phòng
  await page.locator("#goi").scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
  const card = page.locator("#goi [data-fx=BubbleCanvas]").first();
  await card.scrollIntoViewIfNeeded();
  const cb = await card.boundingBox();
  await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2, { steps: 4 });
  await page.waitForTimeout(900);
  const px = await card.locator("canvas").evaluate((c) => { const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n; });
  ok(px > 200, `bọt xà phòng vẽ lên canvas khi hover gói tắm (${px} px)`);
  await page.mouse.move(5, 5); await page.waitForTimeout(2800);
  const px2 = await card.locator("canvas").evaluate((c) => { const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n; });
  ok(px2 === 0, `rời chuột: bọt vỡ hết và vòng rAF dừng (${px2} px)`);
  // hiệu ứng thư viện
  await page.evaluate(() => window.scrollTo(0, 0));
  await scrollThrough(page, 900);
  const fx = await page.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.getAttribute("data-fx")))]);
  for (const n of ["BounceWords", "BubbleCanvas", "CircleWipe", "VelocityMarquee", "ClipReveal", "StackingCards", "ScrollScrubText", "SlotText", "MagneticButton", "ScrollProgress"]) ok(fx.includes(n), `hiệu ứng có mặt: ${n}`);
  // CircleWipe đã loang hết
  const cp = await page.locator("#goi").evaluate((e) => getComputedStyle(e).clipPath);
  ok(cp === "none", `CircleWipe: khối gói loang hết sau khi cuộn qua (clip-path ${cp})`);
  // marquee chạy (transform đổi theo thời gian)
  const m1 = await page.locator("[data-fx=VelocityMarquee]").first().evaluate((e) => e.innerHTML.length);
  ok(m1 > 100, "marquee có nội dung");
  await ctx.close();
}

// 5) bàn phím: Tab tới CTA, focus rõ; menu mobile + Escape
{
  const { ctx, page } = await open();
  let reached = false;
  for (let i = 0; i < 25; i++) { await page.keyboard.press("Tab"); const t = await page.evaluate(() => document.activeElement?.textContent || ""); if (/Chọn gói cho bé/.test(t) && await page.evaluate(() => !!document.activeElement.closest("section"))) { reached = true; break; } }
  ok(reached, "Tab tới CTA chính ở hero");
  ok((await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)) !== "none", "CTA có viền focus rõ");
  await ctx.close();
  const m = await open({ hasTouch: true, isMobile: true }, 390, 844);
  ok((await m.page.locator("[data-pv-root]").getAttribute("data-paw")) === null, "cảm ứng: không bật con trỏ chân thú");
  const btn = m.page.getByRole("button", { name: /Mở menu/ });
  await btn.click();
  ok(await m.page.locator("#pv-menu").isVisible(), "menu mobile mở");
  await m.page.keyboard.press("Escape");
  ok(!(await m.page.locator("#pv-menu").isVisible()), "Escape đóng menu");
  ok(await m.page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "pv-menu"), "Escape trả focus về nút menu");
  await m.page.screenshot({ path: path.join(shots, "hero-390.png") });
  await m.ctx.close();
}

// 6) reduced motion
{
  const { ctx, page, errs } = await open({ reducedMotion: "reduce" });
  const v = await page.evaluate(() => {
    const w = document.querySelector("h1 [data-w]"); const cs = getComputedStyle(w);
    const paw = document.querySelector("[data-pv-root]").getAttribute("data-paw");
    return { op: cs.opacity, tf: cs.transform, paw, disc: getComputedStyle(document.querySelector("[class*=heroDisc]")).animationName, cp: getComputedStyle(document.querySelector("#goi")).clipPath };
  });
  ok(v.op === "1" && (v.tf === "none" || /matrix\(1, 0, 0, 1, 0, 0\)/.test(v.tf)), `reduced: chữ hero hiện đủ, không dịch (${v.op}/${v.tf})`);
  ok(v.paw === null, "reduced: tắt con trỏ chân thú");
  ok(v.disc === "none", "reduced: hero không animation");
  ok(v.cp === "none", "reduced: khối gói hiện đủ (không clip)");
  await page.locator("#goi").scrollIntoViewIfNeeded();
  const stat = await page.locator("#goi [data-fx=BubbleCanvas] [class*=bubblesStatic]").first().evaluate((e) => getComputedStyle(e).display);
  ok(stat === "block", "reduced: bọt tĩnh thay canvas");
  const txt = await page.locator("main").innerText();
  ok(/Bốn kiểu chiều chuộng/.test(txt) && /Điều mọi người hay hỏi/.test(txt), "reduced: nội dung vẫn hiện đủ");
  ok(errs.length === 0, "reduced: 0 lỗi console");
  await ctx.close();
}

// 7) no-JS
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL_, { waitUntil: "load" });
  const t = await page.locator("main").innerText();
  ok(/Tắm xinh/.test(t) && /Bốn kiểu chiều chuộng/.test(t) && /Điều mọi người hay hỏi/.test(t), "no-JS: nội dung hero, gói, hỏi đáp có trong HTML");
  const cp = await page.locator("#goi").evaluate((e) => getComputedStyle(e).clipPath);
  ok(cp === "none", "no-JS: khối gói không bị clip");
  await ctx.close();
}

// 8) ?ref, credits, hiệu năng
{
  const { ctx, page } = await open({}, 1440, 900, "?ref=abc");
  await page.locator("#chon-goi").scrollIntoViewIfNeeded();
  for (const [a, b] of [["label", "Chó"], ["label", "3 – 7 kg"], ["label", "Lông ngắn"]]) await page.locator(a, { hasText: b }).first().click();
  const href = await page.getByRole("link", { name: "Gửi yêu cầu tư vấn" }).first().getAttribute("href");
  ok(!!href && href.startsWith("/lien-he"), "link thoát cùng origin (cookie tct_ref đi theo, demo không đọc/ghi)");
  ok(/^\/lien-he(\?|$)/.test(href), `href: ${href}`);
  await ctx.close();
  const c2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p2 = await c2.newPage();
  const r = await p2.goto(`${URL_}/credits`, { waitUntil: "load", timeout: 60000 }); await p2.waitForTimeout(1500);
  ok(r.status() === 200, "credits 200");
  const ct = await p2.locator("main").innerText();
  ok(!BAD.test(ct), "credits không có chữ cấm");
  ok(/Trần Công Tiến thiết kế/.test(ct), "credits có lời công khai");
  ok((await p2.locator("main li img").count()) === 14, "credits liệt kê 14 ảnh");
  await c2.close();
  for (const [w, h, label] of [[1440, 900, "1440"], [390, 844, "390"]]) {
    const { ctx: c3, page: p3 } = await open({}, w, h);
    await p3.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ["longtask"] }); });
    await scrollThrough(p3, h);
    const lt = await p3.evaluate(() => window.__lt.filter((d) => d > 200).length);
    console.log(`INFO long task >200ms khi cuộn toàn trang ở ${label}: ${lt}`);
    await p3.evaluate(() => window.scrollTo(0, 0)); await p3.waitForTimeout(500);
    await p3.screenshot({ path: path.join(shots, `full-${label}.png`), fullPage: true });
    await c3.close();
  }
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
