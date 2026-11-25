// E2E Gương Phẩm (/demos/detail-xe). Chạy: BASE=http://localhost:3100 node tests/showroom/detail-xe/e2e.mjs
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = `${BASE}/demos/detail-xe`;
const here = path.dirname(fileURLToPath(import.meta.url));
const shots = path.join(here, "screenshots");
fs.mkdirSync(shots, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const BAD = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;
const U = globalThis.URL;

async function open(ctxOpts = {}, w = 1440, h = 900, query = "", wait = 2800, url = PAGE) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...ctxOpts });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  page.on("request", (r) => { const u = new U(r.url()); if (u.protocol.startsWith("http") && u.origin !== new U(BASE).origin) ext.push(r.url()); });
  await page.goto(url + query, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
  return { ctx, page, errs, ext };
}
const visibleText = (page) => page.evaluate(() => {
  const root = document.querySelector("main")?.parentElement;
  const out = [];
  root.querySelectorAll("*").forEach((e) => ["alt", "aria-label", "title", "placeholder", "aria-valuetext"].forEach((a) => e.getAttribute(a) && out.push(e.getAttribute(a))));
  out.push(root.innerText);
  document.querySelectorAll("meta[name=description],meta[property^='og:']").forEach((m) => out.push(m.content));
  out.push(document.title);
  return out.join("\n");
});
const vnd = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
const scrollToId = (page, id, off = 0) => page.evaluate(([id, off]) => { const el = document.getElementById(id); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + off); }, [id, off]);

// 1) tải, console, request ngoài, chữ cấm, glyph, metadata
{
  const { ctx, page, errs, ext } = await open();
  ok(errs.length === 0, `0 lỗi console (${errs.length}) ${errs.slice(0, 2).join(" | ")}`);
  ok(ext.length === 0, `0 request ngoài origin (${ext.length}) ${ext.slice(0, 2).join(" ")}`);
  const title = await page.title();
  ok(/Gương Phẩm/.test(title) && !BAD.test(title), `title: ${title}`);
  const robots = await page.evaluate(() => document.querySelector("meta[name=robots]")?.content || "");
  ok(/noindex/.test(robots), `robots: ${robots}`);
  const m = (await visibleText(page)).match(BAD);
  ok(!m, `không có chữ cấm trên trang chính${m ? ": " + m[0] : ""}`);
  const gl = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + f.weight);
    const out = {};
    for (const [label, sel] of [["h1", "h1"], ["h2", "h2"], ["body", "p[class*=lead]"]]) {
      const el = document.querySelector(sel);
      const cs = getComputedStyle(el);
      const c = document.createElement("canvas").getContext("2d");
      const res = {};
      for (const ch of "ăâêôơưđẮỆỐỬỮỜẶỌẨẴ") {
        c.font = `${cs.fontWeight} 80px ${cs.fontFamily}`; const a = c.measureText(ch).width;
        c.font = `${cs.fontWeight} 80px monospace`; const b = c.measureText(ch).width;
        c.font = `${cs.fontWeight} 80px serif`; const b2 = c.measureText(ch).width;
        res[ch] = Math.abs(a - b) > 0.5 || Math.abs(a - b2) > 0.5;
      }
      out[label] = res;
    }
    return { loaded: loaded.length, out };
  });
  ok(gl.loaded >= 4, `font đã tải (${gl.loaded} face loaded)`);
  for (const [k, v] of Object.entries(gl.out)) ok(Object.values(v).every(Boolean), `glyph Việt (${k}) khác fallback ${Object.entries(v).filter(([, x]) => !x).map(([c]) => c).join("")}`);
  // đo hình: dòng chữ Ế Ệ Ử Ẫ đậm cỡ lớn có bề cao dấu hợp lý (không bị cắt)
  const clipped = await page.evaluate(() => {
    const h = document.querySelector("h1");
    return [...h.querySelectorAll("*")].some((n) => getComputedStyle(n).overflow === "hidden" && n.scrollHeight > n.clientHeight + 1);
  });
  ok(!clipped, "tiêu đề hero không cắt dấu (scrollHeight <= clientHeight)");
  const hero = await page.evaluate(() => { const i = document.querySelector("img[class*=heroImg]"); return i && i.complete && i.naturalWidth > 1000; });
  ok(hero, "ảnh hero (LCP, priority) đã tải");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(shots, "desktop-hero.png") });
  await ctx.close();
}

// 2) hiệu ứng: khởi chạy + trạng thái
{
  const { ctx, page } = await open();
  const fx = await page.evaluate(() => Object.fromEntries([...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.dataset.fx))].map((n) => [n, [...document.querySelectorAll(`[data-fx="${n}"]`)].map((e) => e.dataset.fxReady)])));
  const names = Object.keys(fx);
  ok(names.length >= 6, `thư viện hiệu ứng có mặt (${names.join(", ")})`);
  ok(Object.values(fx).flat().every((v) => v === "1" || v === "static" || v === "css" || v === undefined), "data-fx-ready hợp lệ");
  // scroll-scrub
  await scrollToId(page, "quy-trinh", 0); await page.waitForTimeout(600);
  const p0 = await page.evaluate(() => parseFloat(document.getElementById("quy-trinh").style.getPropertyValue("--p") || "1"));
  await page.evaluate(() => { const el = document.getElementById("quy-trinh"); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * 0.5); });
  await page.waitForTimeout(1500);
  const p1 = await page.evaluate(() => parseFloat(document.getElementById("quy-trinh").style.getPropertyValue("--p")));
  const hrs = await page.evaluate(() => document.querySelector("[data-sc=hours]").textContent);
  const stg = await page.evaluate(() => document.querySelectorAll('[data-on="1"]').length);
  ok(p0 < 0.15 && p1 > 0.35 && p1 < 0.65, `scroll-scrub bụi -> sạch: p đầu=${p0.toFixed(2)}, giữa=${p1.toFixed(2)}`);
  ok(/^\d,\d$/.test(hrs) && stg >= 1, `đồng hồ giờ làm chạy theo cuộn (${hrs} giờ), giai đoạn active=${stg}`);
  await page.evaluate(() => { const el = document.getElementById("quy-trinh"); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + el.offsetHeight); });
  await page.waitForTimeout(1500);
  const p2 = await page.evaluate(() => parseFloat(document.getElementById("quy-trinh").style.getPropertyValue("--p")));
  ok(p2 > 0.95, `scrub kết thúc ở trạng thái sạch (p=${p2.toFixed(2)})`);
  // light streak scrub (slider lớp phủ)
  await scrollToId(page, "lop-phu", 0); await page.waitForTimeout(900);
  const sx = await page.evaluate(() => { const e = document.querySelector("#lop-phu [data-dx-streak]"); return e ? getComputedStyle(e).transform + "|" + getComputedStyle(e).opacity : null; });
  ok(!!sx && sx !== "none", `light streak gắn cuộn (${sx})`);
  // slider: phím + kéo
  const handle = page.getByRole("slider");
  await handle.focus();
  const v0 = Number(await handle.getAttribute("aria-valuenow"));
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  const v1 = Number(await handle.getAttribute("aria-valuenow"));
  ok(v1 === Math.min(100, v0 + 10) || v1 > v0, `slider lớp phủ bằng phím: ${v0} -> ${v1}`);
  await page.keyboard.press("Home");
  ok(Number(await handle.getAttribute("aria-valuenow")) === 0, "slider Home = 0");
  await page.keyboard.press("End");
  ok(Number(await handle.getAttribute("aria-valuenow")) === 100, "slider End = 100");
  const box = await page.locator("[class*=slider]").first().boundingBox();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.mouse.down(); await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5, { steps: 6 }); await page.mouse.up();
  const v2 = Number(await handle.getAttribute("aria-valuenow"));
  ok(v2 > 15 && v2 < 35, `slider kéo chuột về 25% (=${Math.round(v2)})`);
  // thẻ gói: ánh sáng theo con trỏ
  await scrollToId(page, "goi", 300); await page.waitForTimeout(1200);
  const card = page.locator("article[data-lit]").first();
  const cb = await card.boundingBox();
  await page.mouse.move(cb.x + 80, cb.y + 120, { steps: 4 });
  await page.waitForTimeout(250);
  const lit = await card.evaluate((e) => [e.dataset.lit, e.style.getPropertyValue("--mx"), e.style.getPropertyValue("--my")].join("|"));
  ok(/^1\|[\d.]+px\|[\d.]+px$/.test(lit), `ánh sáng phản chiếu theo con trỏ trên thẻ gói (${lit})`);
  await page.mouse.move(5, 5);
  await page.waitForTimeout(200);
  ok((await card.evaluate((e) => e.dataset.lit)) === "0", "rời thẻ thì tắt ánh sáng");
  // counter hero
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(400);
  const spec = await page.evaluate(() => [...document.querySelectorAll("[class*=specCell] dd")].map((e) => (e.querySelector("[data-fx-view]")?.textContent || "").trim()));
  ok(spec[0] === "5" && /350\.000/.test(spec[3]), `counter hero về số cuối (${spec.join(" | ")})`);
  await ctx.close();
}

// 3) Package Builder
{
  const { ctx, page, errs } = await open();
  await scrollToId(page, "chon-goi", 200); await page.waitForTimeout(800);
  const empty = await page.getByText("Chưa có hạng mục nào").isVisible();
  ok(empty, "trạng thái rỗng khi chưa chọn nhu cầu");
  const hrefEmpty = await page.locator("[class*=resBtns] a").count();
  ok(hrefEmpty === 0, "không có nút chuyển đổi khi chưa có gói");
  // 3.1 sedan + rửa chi tiết
  await page.getByLabel("Rửa chi tiết").check();
  await page.waitForTimeout(900);
  let txt = await page.locator("[class*=result]").first().innerText();
  ok(/Gói rửa chi tiết/i.test(txt) && txt.includes(vnd(350000)) && txt.includes(vnd(420000)), "sedan + rửa chi tiết: 350.000 ₫ đến 420.000 ₫");
  ok(/2,5 giờ/.test(txt) || /2,5/.test(txt), "giờ làm 2,5 (2 + 0,5 kiểm tra)");
  // 3.2 SUV + sơn xoáy + ceramic
  await page.getByLabel("SUV / Crossover").check();
  await page.getByLabel("Xoáy mờ, xỉn nhẹ").check();
  await page.getByLabel("Phủ ceramic").check();
  await page.getByLabel("Rửa chi tiết").uncheck();
  await page.waitForTimeout(1600);
  txt = await page.locator("[class*=result]").first().innerText();
  const corr = Math.round(2500000 * 1.25 * 1.3 / 10000) * 10000, coat = Math.round(4500000 * 1.25 / 10000) * 10000;
  ok(txt.includes(vnd(corr)) && txt.includes(vnd(coat)) && /Gồm sẵn/.test(txt), `SUV + xoáy + ceramic: hiệu chỉnh ${vnd(corr)}, phủ ${vnd(coat)}, rửa gồm sẵn`);
  ok(/không phải áo giáp/.test(txt) && /Giá tham khảo/.test(txt), "ghi chú trung thực (ceramic không chống xước, giá tham khảo)");
  const exact = await page.locator("[class*=resKpis] dd").allInnerTexts();
  ok(/^15,5/.test(exact[0]) && /^15/.test(exact[1]), `KPI giờ/bước: ${exact.join(" | ")}`);
  // 3.3 xe điện + khoang máy
  await page.getByLabel("Xe điện").check();
  await page.getByLabel("Khoang máy").check();
  await page.waitForTimeout(800);
  txt = await page.locator("[class*=result]").first().innerText();
  ok(/khoang kỹ thuật/i.test(txt) && /không xịt nước/i.test(txt), "xe điện: đổi thành khoang kỹ thuật, làm sạch khô");
  // 3.4 xoá hết
  for (const l of ["Phủ ceramic", "Khoang máy"]) await page.getByLabel(l).uncheck();
  await page.waitForTimeout(500);
  ok(await page.getByText("Chưa có hạng mục nào").isVisible(), "bỏ chọn hết quay lại trạng thái rỗng");
  // 3.5 chọn từ thẻ gói
  await scrollToId(page, "goi", 300);
  await page.locator("article[data-lit]").nth(1).getByRole("link", { name: "Chọn gói này" }).click();
  await page.waitForTimeout(1200);
  ok(await page.getByLabel("Đánh bóng sơn").isChecked(), "nút 'Chọn gói này' chọn sẵn hạng mục trong bộ chọn");
  txt = await page.locator("[class*=result]").first().innerText();
  ok(/Gói hiệu chỉnh sơn/i.test(txt), "gói gợi ý cập nhật theo thẻ đã chọn");
  // 3.6 chữ cấm ở mọi trạng thái, link thoát, sao chép
  const href = await page.locator("[class*=resBtns] a").getAttribute("href");
  ok(href.startsWith("/lien-he"), `link thoát: ${href}`);
  if (/industry=/.test(href)) ok(/industry=/.test(href) && /solution=/.test(href) && /utm_campaign=detail-xe/.test(href), "link thoát có industry/solution/utm_campaign");
  else console.log("NOTE registry chưa có detail-xe nên link thoát chưa có tham số (điều phối viên chạy showroom-registry-sync)");
  await ctx.grantPermissions?.(["clipboard-read", "clipboard-write"]).catch(() => {});
  await page.getByRole("button", { name: "Sao chép tóm tắt" }).click();
  await page.waitForTimeout(500);
  const status = await page.locator("[role=status]").innerText();
  ok(/Đã sao chép|không cho sao chép/.test(status), `phản hồi sao chép: ${status}`);
  const bad = (await visibleText(page)).match(BAD);
  ok(!bad, `không chữ cấm khi có kết quả${bad ? ": " + bad[0] : ""}`);
  // 3.7 lưu lựa chọn khi tải lại
  await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(1500);
  ok(await page.getByLabel("Đánh bóng sơn").isChecked() && await page.getByLabel("Xe điện").isChecked(), "lựa chọn được nhớ sau khi tải lại (localStorage)");
  ok(errs.length === 0, `0 lỗi console trong luồng builder (${errs.length}) ${errs[0] || ""}`);
  await ctx.close();
}

// 4) ?ref giữ nguyên, bàn phím, FAQ
{
  const { ctx, page } = await open({}, 1440, 900, "?ref=abc123");
  const href = await page.locator("a[href^='/lien-he']").first().getAttribute("href");
  ok(!!href && href.startsWith("/lien-he"), `CTA hero trỏ tới form tư vấn (${href})`);
  ok(new U(page.url()).searchParams.get("ref") === "abc123", "URL vẫn giữ ?ref (cookie xử lý bởi proxy, trang không đọc/ghi)");
  await page.keyboard.press("Tab");
  ok(await page.evaluate(() => document.activeElement?.textContent?.includes("Bỏ qua")), "Tab đầu tiên là liên kết bỏ qua");
  let reached = false;
  for (let i = 0; i < 12; i++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => document.activeElement?.textContent?.includes("Chọn gói cho xe của bạn"))) { reached = true; break; } }
  ok(reached, "Tab tới CTA chính ở hero");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  ok(outline !== "none", "focus-visible rõ trên CTA");
  await scrollToId(page, "cau-hoi", 100);
  const d = page.locator("details").first();
  await d.locator("summary").click();
  ok(await d.evaluate((e) => e.open), "FAQ mở bằng bấm");
  await d.locator("summary").focus(); await page.keyboard.press("Enter");
  ok(!(await d.evaluate((e) => e.open)), "FAQ đóng bằng Enter");
  await ctx.close();
}

// 5) reduced-motion
{
  const { ctx, page, errs } = await open({ reducedMotion: "reduce" });
  const hv = await page.evaluate(() => { const h = document.querySelector("h1"); const r = h.getBoundingClientRect(); return [getComputedStyle(h).opacity, r.height > 40, [...h.querySelectorAll("*")].every((e) => getComputedStyle(e).opacity !== "0")]; });
  ok(hv[0] === "1" && hv[1] && hv[2], "reduced-motion: tiêu đề hero hiện đủ");
  const still = await page.evaluate(() => document.getElementById("quy-trinh").className.includes("scrubStatic"));
  ok(still, "reduced-motion: phần scrub bỏ ghim, giữ trạng thái sạch");
  const p = await page.evaluate(() => getComputedStyle(document.getElementById("quy-trinh")).getPropertyValue("--p").trim());
  ok(p === "1" || p === "", `reduced-motion: --p = ${p || "mặc định 1"}`);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-dx="rise"]')].filter((e) => getComputedStyle(e).opacity === "0").length);
  ok(hidden === 0, "reduced-motion: không khối nào bị ẩn chờ reveal");
  const stages = await page.evaluate(() => [...document.querySelectorAll("[class*=stage] p")].every((e) => getComputedStyle(e).display !== "none"));
  ok(stages, "reduced-motion: cả bốn giai đoạn hiện mô tả");
  ok(errs.length === 0, `reduced-motion: 0 lỗi console (${errs.length})`);
  await ctx.close();
}

// 6) không tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await open({}, w, 900, "", 1800);
  const sw = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, over: [...document.querySelectorAll("main *")].filter((e) => { if (e.getBoundingClientRect().right <= innerWidth + 1) return false; for (let n = e.parentElement; n && n.tagName !== "MAIN"; n = n.parentElement) { const o = getComputedStyle(n).overflowX; if (o === "hidden" || o === "auto" || o === "clip" || o === "scroll") return false; } return true; }).length }));
  ok(sw.sw <= sw.cw + 1, `không tràn ngang ở ${w}px (scrollWidth ${sw.sw} / ${sw.cw}; phần tử vượt: ${sw.over})`);
  await ctx.close();
}

// 7) ảnh + hiệu năng cuộn + chụp ảnh
for (const [w, h, tag] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
  const { ctx, page, errs, ext } = await open({}, w, h, "", 3200);
  await page.evaluate(() => { window.__lt = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 200) window.__lt++; }).observe({ entryTypes: ["longtask"] }); });
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += Math.round(h * 0.7)) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(110); }
  await page.waitForTimeout(800);
  const lt = await page.evaluate(() => window.__lt);
  console.log(`INFO ${tag}: chiều cao trang ${H}px, long task >200ms khi cuộn: ${lt}`);
  ok(errs.length === 0 && ext.length === 0, `${tag}: cuộn toàn trang không lỗi, không request ngoài`);
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc));
  ok(broken.length === 0, `${tag}: không ảnh hỏng (${broken.length})`);
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(shots, `${tag}-hero.png`) });
  await page.screenshot({ path: path.join(shots, `${tag}-full.png`), fullPage: true });
  await ctx.close();
}

// 8) trang credits
{
  const { ctx, page, errs } = await open({}, 1440, 900, "", 1200, `${BASE}/demos/detail-xe/credits`);
  const n = await page.locator("[class*=creditCard]").count();
  ok(n === 12, `credits liệt kê ${n} ảnh`);
  const t = await page.locator("main").innerText();
  ok(!BAD.test(t) && /Trần Công Tiến/.test(t), "credits: có lời công khai, không chữ cấm");
  ok(errs.length === 0, `credits: 0 lỗi console (${errs.length})`);
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
