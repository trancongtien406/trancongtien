// E2E Chấm Chanh (/demos/nail-pop). Chạy: BASE=http://localhost:3100 node tests/showroom/nail-pop/e2e.mjs
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const URL_ = `${BASE}/demos/nail-pop`;
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
  try {
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(h * 0.9)) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(70); }
  } catch { await page.waitForLoadState("networkidle").catch(() => {}); } // dev server có thể tải lại trang khi file khác đổi
  await page.waitForTimeout(500);
};
const pageText = (page) => page.evaluate(() => {
  const root = document.querySelector("[data-np-root]");
  const out = [];
  root.querySelectorAll("*").forEach((e) => ["alt", "aria-label", "title", "placeholder"].forEach((a) => e.getAttribute(a) && out.push(e.getAttribute(a))));
  out.push(root.textContent);
  document.querySelectorAll("meta[name=description],meta[property^='og:']").forEach((m) => out.push(m.content));
  out.push(document.title);
  return out.join("\n");
});

// 1) tải, console, request ngoài, chữ cấm, glyph
{
  const { ctx, page, errs, ext } = await open();
  ok(errs.length === 0, `0 lỗi console (${errs.length}) ${errs.slice(0, 2).join(" | ").slice(0, 300)}`);
  ok(ext.length === 0, `0 request ngoài origin (${ext.length}) ${ext.slice(0, 2).join(" ")}`);
  ok(/Chấm Chanh/.test(await page.title()), `title: ${await page.title()}`);
  await scrollThrough(page, 900);
  const m = (await pageText(page)).match(BAD);
  ok(!m, `không có chữ cấm trên trang chính${m ? ": " + m[0] : ""}`);
  const gl = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").length;
    const res = {};
    const c = document.createElement("canvas").getContext("2d");
    for (const [sel, wt] of [["h1", 900], ["p", 400]]) {
      const fam = getComputedStyle(document.querySelector(sel)).fontFamily;
      for (const ch of "ăâêôơưđẮỆỐỬỮỜẶ") {
        c.font = `${wt} 80px ${fam}`; const a = c.measureText(ch).width;
        c.font = `${wt} 80px monospace`; const b = c.measureText(ch).width;
        res[sel + ch] = Math.abs(a - b) > 0.2;
      }
    }
    return { loaded, res };
  });
  ok(gl.loaded >= 3, `font đã tải (${gl.loaded} face)`);
  ok(Object.values(gl.res).every(Boolean), `glyph Việt khác fallback (tiêu đề + nội dung): ${Object.entries(gl.res).filter(([, v]) => !v).map(([k]) => k).join("") || "tất cả khác"}`);
  await page.setContent(`<body style="margin:0;background:#fff"><div style="font:900 90px 'Epilogue',Arial Black">Ắ Ế Ể Ệ Ố Ổ Ợ Ử Ữ Ự Ặ</div></body>`).catch(() => {});
  await ctx.close();
  // chụp glyph bằng font thật của trang
  const g = await open();
  await g.page.evaluate(() => { const h = document.querySelector("h1"); const d = document.createElement("div"); d.id = "glyphtest"; d.setAttribute("style", `position:fixed;left:0;top:0;z-index:9999;background:#fff;padding:10px;font:900 90px/1.3 ${getComputedStyle(h).fontFamily}`); d.textContent = "Ắ Ế Ể Ệ Ố Ổ Ợ Ử Ữ Ự Ặ"; document.body.appendChild(d); });
  await g.page.locator("#glyphtest").screenshot({ path: path.join(shots, "glyph-heading.png") });
  await g.ctx.close();
}

// 2) không tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await open({}, w, 800);
  await scrollThrough(page, 800);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ở ${w}px (${o.sw}/${o.cw})`);
  await ctx.close();
}

// 3) công cụ dựng móng
{
  const { ctx, page } = await open({ permissions: ["clipboard-read", "clipboard-write"] });
  const tool = page.locator("#builder-tool");
  await tool.scrollIntoViewIfNeeded();
  const plan = tool.locator("aside[aria-label='Bộ móng của bạn']");
  ok(/Chưa đủ thông tin/.test(await plan.innerText()) && /dáng móng/.test(await plan.innerText()) && /màu gốc/.test(await plan.innerText()), "trạng thái rỗng: báo còn thiếu dáng móng, màu gốc");
  ok((await plan.getByRole("link", { name: "Gửi yêu cầu tư vấn" }).count()) === 0, "chưa đủ thông tin: chưa có nút gửi tư vấn");
  await tool.locator("label", { hasText: "Coffin" }).click();
  ok(/màu gốc/.test(await plan.innerText()) && !/dáng móng/.test(await plan.innerText()), "thiếu màu gốc thì vẫn rỗng");
  // đổi màu SVG theo thời gian thực
  await tool.getByRole("radio", { name: "Hồng nóng" }).first().click();
  await page.waitForTimeout(500);
  const fillOf = () => plan.locator("[data-nail] path").nth(1).evaluate((e) => getComputedStyle(e.parentElement.querySelector("g rect")).fill);
  const f1 = await fillOf();
  ok(/255, 46, 147/.test(f1), `đủ thông tin: SVG móng đổi sang hồng nóng (${f1})`);
  await tool.getByRole("radio", { name: "Xanh cobalt" }).first().click();
  await page.waitForTimeout(500);
  const f2 = await fillOf();
  ok(/31, 59, 255/.test(f2), `đổi swatch: SVG đổi theo thời gian thực (${f2})`);
  const t1 = await plan.innerText();
  ok(/Khoảng/.test(t1) || /phút|giờ/.test(t1), "hiện thời gian ước tính");
  const priceOf = (t) => (t.match(/([\d.]+)\s*₫\s*–\s*([\d.]+)/) || []);
  const p1 = priceOf(t1);
  ok(p1.length === 3 && +p1[2].replace(/\./g, "") > +p1[1].replace(/\./g, ""), `giá tham khảo dạng khoảng (${p1[1]} – ${p1[2]})`);
  const n1 = await plan.locator("ol li").count();
  // hoạ tiết ombre: cần màu phụ, giá tăng
  await tool.locator("label", { hasText: /^\s*Ombre/ }).click();
  ok(await tool.getByRole("radiogroup", { name: "Màu phụ" }).isVisible(), "ombre: hiện chọn màu phụ");
  await tool.getByRole("radio", { name: "Vàng chanh" }).last().click();
  const t2 = await plan.innerText();
  ok(+priceOf(t2)[1].replace(/\./g, "") > +p1[1].replace(/\./g, ""), "ombre: giá tăng");
  ok(/ombre sang vàng chanh/i.test(t2), "ombre: có bước loang sang màu phụ");
  ok((await plan.locator("linearGradient[id$='o1'] stop").count()) === 2, "ombre: SVG có gradient hai màu");
  await tool.locator("label", { hasText: /^\s*Chrome/ }).click();
  ok(!(await tool.getByRole("radiogroup", { name: "Màu phụ" }).count()), "chrome: ẩn màu phụ");
  ok(/tráng gương/.test(await plan.innerText()), "chrome: có bước tán bột chrome");
  // độ dài dài + charm
  await tool.locator("label", { hasText: /^\s*Dài/ }).click();
  ok(/Đắp gel tạo độ dài/.test(await plan.innerText()), "độ dài dài: có bước đắp gel");
  await tool.locator("label", { hasText: "Ngôi sao" }).click();
  await tool.getByRole("button", { name: "Thêm một charm" }).click();
  const t3 = await plan.innerText();
  ok(/Đính 3 charm ngôi sao/.test(t3), "charm: 3 móng đính ngôi sao");
  ok((await plan.locator("svg [class*=charm]").count()) === 3, "SVG vẽ 3 charm");
  ok(/dị ứng hoá chất/i.test(t3), "ghi chú dị ứng hoá chất luôn hiện cùng kế hoạch");
  ok(!/vô trùng tuyệt đối|đảm bảo vô trùng/i.test(await page.locator("main").innerText().then((x) => x.replace(/không cam kết vô trùng tuyệt đối/gi, ""))), "không khẳng định vô trùng");
  // dáng móng đổi path
  const d1 = await plan.locator("[data-nail] path").nth(1).getAttribute("d");
  await tool.locator("label", { hasText: "Oval" }).click();
  const d2 = await plan.locator("[data-nail] path").nth(1).getAttribute("d");
  ok(d1 !== d2, "đổi dáng móng: SVG vẽ lại");
  // sao chép
  await plan.getByRole("button", { name: "Sao chép tóm tắt" }).click();
  await page.waitForTimeout(300);
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => "ERR"));
  ok(/Bộ móng tại Chấm Chanh/.test(clip) && /Giá tham khảo/.test(clip) && /dị ứng/.test(clip), "sao chép tóm tắt (giá tham khảo + lưu ý dị ứng)");
  ok(/Đã sao chép/.test(await plan.locator("[role=status]").innerText()), "thông báo sao chép (aria-live)");
  const href = await plan.getByRole("link", { name: "Gửi yêu cầu tư vấn" }).getAttribute("href");
  ok(/^\/lien-he/.test(href || ""), `CTA tới form tư vấn: ${href}`);
  console.log("INFO href:", href);
  ok(!/<form[^>]*action/i.test(await page.content()), "không có form gửi dữ liệu");
  await tool.screenshot({ path: path.join(shots, "builder-1440.png") });
  // lưu trạng thái
  await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(800);
  ok(await page.locator("#builder-tool input[type=radio]:checked").count() >= 3, "lựa chọn được khôi phục sau tải lại");
  await page.locator("#builder-tool").getByRole("button", { name: "Làm lại từ đầu" }).click();
  ok(/Chưa đủ thông tin/.test(await page.locator("#builder-tool aside").innerText()), "Làm lại từ đầu xoá lựa chọn");
  void n1;
  await ctx.close();
}

// 4) hiệu ứng ký hiệu
{
  const { ctx, page } = await open();
  // swatch hero đổi SVG
  const hero = page.locator("section[aria-labelledby=np-h1]");
  const nailFill = () => hero.locator("[data-nail] g rect").first().evaluate((e) => getComputedStyle(e).fill);
  const a = await nailFill();
  await hero.getByRole("radio", { name: "Xanh cobalt" }).click(); await page.waitForTimeout(500);
  const b = await nailFill();
  ok(a !== b && /31, 59, 255/.test(b), `swatch hero đổi màu móng SVG (${a} -> ${b})`);
  ok((await page.evaluate(() => getComputedStyle(document.querySelector("[data-np-root]")).getPropertyValue("--np-pick").trim())) === "#1f3bff", "màu chọn đồng bộ ra biến --np-pick (con trỏ/điểm nhấn)");
  await hero.getByRole("button", { name: "Trộn màu" }).click(); await page.waitForTimeout(500);
  const fills = await hero.locator("[data-nail] g rect").evaluateAll((els) => els.map((e) => getComputedStyle(e).fill));
  ok(new Set(fills).size >= 4, `Trộn màu: 5 móng nhiều màu (${new Set(fills).size} màu khác nhau)`);
  // slot text
  const w1 = await page.locator("[data-fx=SlotText] [data-fx-item]").evaluateAll((els) => els.map((e) => e.textContent));
  ok(w1.length === 4, `slot text có 4 từ (${w1.join("|")})`);
  const act = () => page.locator("[data-fx=SlotText] > span").first().textContent();
  const s1 = await act(); await page.waitForTimeout(3200); const s2 = await act();
  ok(s1 !== s2, `slot text tự đổi từ (${s1} -> ${s2})`);
  // sparkle + halftone
  const spark = await hero.locator("path[class*=sparkle]").first().evaluate((e) => getComputedStyle(e).animationName);
  ok(/npTwinkle|sparkle/i.test(spark), `móng SVG lấp lánh (animation: ${spark})`);
  const ht = await hero.locator("i[class*=dotsA]").evaluate((e) => getComputedStyle(e).animationName);
  ok(/npDrift/.test(ht), `halftone chuyển động (animation: ${ht})`);
  // color flood
  await page.locator("#dich-vu").scrollIntoViewIfNeeded();
  const card = page.locator("[data-fx=ColorFlood]").nth(1);
  await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
  const cb = await card.boundingBox();
  await page.mouse.move(cb.x + 20, cb.y + cb.height - 20);
  await page.mouse.move(cb.x + 40, cb.y + cb.height - 30, { steps: 4 });
  await page.waitForTimeout(150);
  const mid = await card.locator("[class*=floodDisc]").evaluate((e) => ({ t: getComputedStyle(e).transform, l: e.style.left, on: e.parentElement.getAttribute("data-on") }));
  const fx = await card.evaluate((e) => [e.style.getPropertyValue("--fx"), e.style.getPropertyValue("--fy")]);
  ok(mid.on === "1" && parseFloat(fx[0]) < 80 && parseFloat(fx[1]) > cb.height - 100, `color-flood loang từ điểm con trỏ (${fx.join(",")}) , data-on=${mid.on}`);
  await page.waitForTimeout(900);
  const cs = await card.evaluate((e) => ({ bg: getComputedStyle(e.querySelector("[class*=floodDisc]")).backgroundColor, tf: getComputedStyle(e.querySelector("[class*=floodDisc]")).transform, col: getComputedStyle(e.querySelector("[class*=floodBody]")).color }));
  ok(/230, 255, 0/.test(cs.bg) && /matrix\(1, 0, 0, 1/.test(cs.tf), `flood phủ đầy thẻ (màu ${cs.bg}, scale 1)`);
  await page.mouse.move(5, 5); await page.waitForTimeout(900);
  ok((await card.getAttribute("data-on")) === "0", "rời chuột: flood thu lại");
  // bàn phím: focus vào link trong thẻ
  await card.getByRole("link", { name: /Thử kiểu này/ }).focus(); await page.waitForTimeout(200);
  ok((await card.getAttribute("data-on")) === "1", "bàn phím: focus trong thẻ kích hoạt flood");
  // preset từ thẻ sang công cụ
  await card.getByRole("link", { name: /Thử kiểu này/ }).click(); await page.waitForTimeout(500);
  ok(await page.locator("#builder-tool label[data-on='1']", { hasText: "Ombre" }).count() === 1, "bấm Thử kiểu này: công cụ nhận hoạ tiết Ombre");
  // glitch
  await page.locator("#cam-hung").scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  const gi = page.locator("[data-fx=GlitchImage]").nth(1);
  await gi.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
  const had = await gi.evaluate((e) => e.getAttribute("data-glitch"));
  const gb = await gi.boundingBox(); await page.mouse.move(gb.x + 30, gb.y + 30); await page.waitForTimeout(120);
  const gh = await gi.evaluate((e) => ({ a: e.getAttribute("data-glitch"), an: getComputedStyle(e.querySelector("[class*=ghostA]")).animationName }));
  ok(gh.a === "1" && /npGlA/.test(gh.an), `glitch màu chạy khi hover/vào khung (lần đầu: ${had}, hover: ${gh.a}/${gh.an})`);
  await page.waitForTimeout(900);
  ok((await gi.getAttribute("data-glitch")) === null, "glitch tự dừng sau ~0.6s");
  // hiệu ứng thư viện
  await page.evaluate(() => window.scrollTo(0, 0)); await scrollThrough(page, 900);
  const fxn = await page.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.getAttribute("data-fx")))]);
  for (const n of ["SlotText", "VelocityMarquee", "ScrollScrubText", "ClipReveal", "MagneticButton", "ScrollProgress", "SVGPathDraw", "CustomCursor", "ColorFlood", "GlitchImage", "HeroChoreo"]) ok(fxn.includes(n), `hiệu ứng có mặt: ${n}`);
  const draw = await page.locator("[data-fx=SVGPathDraw] path").first().evaluate((e) => getComputedStyle(e).strokeDashoffset);
  ok(draw !== "1" && draw !== "1px", `đường quy trình vẽ theo cuộn (dashoffset ${draw})`);
  const cur = await page.locator("[data-fx=CustomCursor]").count();
  ok(cur === 1, "con trỏ tuỳ biến bật (pointer fine)");
  await ctx.close();
}

// 5) bàn phím + menu mobile
{
  const { ctx, page } = await open();
  let reached = false;
  for (let i = 0; i < 25; i++) { await page.keyboard.press("Tab"); const t = await page.evaluate(() => document.activeElement?.textContent || ""); if (/Dựng bộ móng của bạn/.test(t)) { reached = true; break; } }
  ok(reached, "Tab tới CTA chính ở hero");
  ok((await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)) !== "none", "CTA có viền focus rõ");
  await ctx.close();
  const m = await open({ hasTouch: true, isMobile: true }, 390, 844);
  ok((await m.page.locator("[data-fx=CustomCursor]").count()) === 0, "cảm ứng: không có con trỏ tuỳ biến");
  const btn = m.page.getByRole("button", { name: /Mở menu/ });
  await btn.click();
  ok(await m.page.locator("#np-menu").isVisible(), "menu mobile mở");
  await m.page.keyboard.press("Escape");
  ok(!(await m.page.locator("#np-menu").isVisible()), "Escape đóng menu");
  ok(await m.page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "np-menu"), "Escape trả focus về nút menu");
  // chạm thẻ: flood bật/tắt
  const card = m.page.locator("[data-fx=ColorFlood]").first();
  await card.scrollIntoViewIfNeeded();
  const cb = await card.boundingBox();
  await m.page.touchscreen.tap(cb.x + 60, cb.y + 80); await m.page.waitForTimeout(300);
  ok((await card.getAttribute("data-on")) === "1", "cảm ứng: chạm thẻ bật flood");
  await m.page.touchscreen.tap(cb.x + 60, cb.y + 80); await m.page.waitForTimeout(300);
  ok((await card.getAttribute("data-on")) === "0", "cảm ứng: chạm lần nữa tắt flood");
  // touch target swatch
  await m.page.evaluate(() => window.scrollTo(0, 0));
  const sw = await m.page.locator("section[aria-labelledby=np-h1] [role=radio]").first().boundingBox();
  ok(sw.width >= 44 && sw.height >= 44, `swatch cảm ứng ≥44px (${sw.width}x${sw.height})`);
  await m.page.screenshot({ path: path.join(shots, "hero-390.png") });
  await m.ctx.close();
}

// 6) reduced motion
{
  const { ctx, page, errs } = await open({ reducedMotion: "reduce" });
  const v = await page.evaluate(() => {
    const nail = document.querySelector("[data-nail]"); const cs = getComputedStyle(nail);
    return {
      tf: cs.transform, cur: document.querySelectorAll("[data-fx=CustomCursor]").length,
      dots: getComputedStyle(document.querySelector("[class*=dotsA]")).animationName,
      spark: getComputedStyle(document.querySelector("path[class*=sparkle]")).opacity,
      hero: document.querySelector("[data-fx=HeroChoreo]").getAttribute("data-fx-ready"),
      slot: document.querySelector("[data-fx=SlotText]").getAttribute("data-fx-ready"),
    };
  });
  ok(v.tf === "none" || /matrix\(1, 0, 0, 1, 0, 0\)/.test(v.tf), `reduced: móng hero hiện đủ, không dịch (${v.tf})`);
  ok(v.cur === 0, "reduced: tắt con trỏ tuỳ biến");
  ok(v.dots === "none", "reduced: halftone đứng yên");
  ok(v.spark === "1", "reduced: lấp lánh tĩnh, hiện đủ");
  ok(v.hero === "static" && v.slot === "static", `reduced: hero + slot ở chế độ tĩnh (${v.hero}/${v.slot})`);
  await page.locator("#dich-vu").scrollIntoViewIfNeeded();
  const fl = await page.locator("[data-fx=ColorFlood] [class*=floodDisc]").first().evaluate((e) => getComputedStyle(e).transitionDuration);
  ok(/^0s$/.test(fl), `reduced: flood không chuyển (transition ${fl})`);
  const txt = await page.locator("main").innerText();
  ok(/Sáu kiểu làm/i.test(txt) && /Điều mọi người hay hỏi/i.test(txt) && /Dựng bộ móng/i.test(txt), "reduced: nội dung vẫn hiện đủ");
  ok(errs.length === 0, "reduced: 0 lỗi console");
  await ctx.close();
}

// 7) no-JS
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL_, { waitUntil: "load" });
  const t = await page.locator("main").innerText();
  ok(/Móng/i.test(t) && /Sáu kiểu làm/i.test(t) && /Điều mọi người hay hỏi/i.test(t) && /Bốn bước/i.test(t), "no-JS: nội dung hero, dịch vụ, quy trình, hỏi đáp có trong HTML");
  ok((await page.locator("article[class*=flood]").first().evaluate((e) => getComputedStyle(e.querySelector("[class*=floodBody]")).opacity)) === "1", "no-JS: thẻ dịch vụ hiện rõ");
  await ctx.close();
}

// 8) ?ref, credits, metadata, hiệu năng
{
  const { ctx, page } = await open({}, 1440, 900, "?ref=abc");
  const t = page.locator("#builder-tool");
  await t.scrollIntoViewIfNeeded();
  await t.locator("label", { hasText: "Vuông" }).first().click();
  await t.getByRole("radio", { name: "Hồng nóng" }).first().click();
  const href = await page.getByRole("link", { name: "Gửi yêu cầu tư vấn" }).first().getAttribute("href");
  ok(!!href && href.startsWith("/lien-he"), "link thoát cùng origin (cookie tct_ref đi theo, trang không đọc/ghi)");
  const full = /industry=/.test(href) && /solution=/.test(href) && /utm_campaign=nail-pop/.test(href);
  if (full) ok(true, `href đủ industry/solution/utm_campaign: ${href}`); else console.log(`INFO href chưa có tham số (registry chưa có nail-pop, cần điều phối viên chạy sync): ${href}`);
  const metaOk = await page.evaluate(() => [document.querySelector("meta[name=description]")?.content.length > 40, !!document.querySelector("link[rel=icon]")]);
  ok(metaOk[0] && metaOk[1], "có meta description và favicon");
  const robots = await page.evaluate(() => document.querySelector("meta[name=robots]")?.content);
  ok(/noindex/.test(robots || ""), `robots: ${robots}`);
  const ld = await page.evaluate(() => [...document.querySelectorAll("script[type='application/ld+json']")].map((s) => s.textContent).join(" "));
  ok(!/Review|AggregateRating|LocalBusiness|Offer/.test(ld.replace(/"@type":"(Person|Organization|WebSite)"/g, "")), "JSON-LD không có Review/Rating/LocalBusiness/Offer");
  await ctx.close();
  const c2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p2 = await c2.newPage();
  const r = await p2.goto(`${URL_}/credits`, { waitUntil: "load", timeout: 60000 }); await p2.waitForTimeout(1500);
  ok(r.status() === 200, "credits 200");
  const ct = await p2.locator("main").innerText();
  ok(!BAD.test(ct), "credits không có chữ cấm");
  ok(/Trần Công Tiến thiết kế/.test(ct), "credits có lời công khai");
  ok((await p2.locator("main li img").count()) === 8, "credits liệt kê 8 ảnh");
  await c2.close();
  for (const [w, h, label] of [[1440, 900, "1440"], [390, 844, "390"]]) {
    const { ctx: c3, page: p3 } = await open({}, w, h);
    await p3.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ["longtask"] }); });
    await scrollThrough(p3, h);
    const lt = await p3.evaluate(() => window.__lt.filter((d) => d > 200).length);
    console.log(`INFO long task >200ms khi cuộn toàn trang ở ${label}: ${lt}`);
    await p3.evaluate(() => window.scrollTo(0, 0)); await p3.waitForTimeout(500);
    await p3.screenshot({ path: path.join(shots, `hero-${label}.png`) });
    await p3.screenshot({ path: path.join(shots, `full-${label}.png`), fullPage: true });
    await c3.close();
  }
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
