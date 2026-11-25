// E2E Ô Lưới (/demos/cowork-grid). Chạy: BASE=http://localhost:3100 node tests/showroom/cowork-grid/e2e.mjs
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const URLP = `${BASE}/demos/cowork-grid`;
const here = path.dirname(fileURLToPath(import.meta.url));
const shots = path.join(here, "screenshots");
fs.mkdirSync(shots, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const BAD = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;
const URL_ = globalThis.URL;

async function open(ctxOpts = {}, w = 1440, h = 900, query = "", wait = 2400) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...ctxOpts });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  page.on("request", (r) => { const u = new URL_(r.url()); if (u.protocol.startsWith("http") && u.origin !== new URL_(BASE).origin) ext.push(r.url()); });
  await page.goto(URLP + query, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
  return { ctx, page, errs, ext };
}
const visibleText = (page) => page.evaluate(() => {
  const root = document.querySelector("[data-cg-root]");
  const out = [];
  root.querySelectorAll("*").forEach((e) => ["alt", "aria-label", "title", "placeholder"].forEach((a) => e.getAttribute(a) && out.push(e.getAttribute(a))));
  out.push(root.innerText);
  root.querySelectorAll(".srOnly,[class*=srOnly]").forEach((e) => out.push(e.textContent));
  document.querySelectorAll("meta[name=description],meta[property^='og:']").forEach((m) => out.push(m.content));
  out.push(document.title);
  return out.join("\n");
});
const num = (t) => Number(String(t).replace(/\D/g, ""));
const scrollAll = async (page, h) => {
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += h * 0.7) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(220); }
};

// 1) tải + console + request ngoài + chữ cấm + glyph
{
  const { ctx, page, errs, ext } = await open();
  ok(errs.length === 0, `0 lỗi console (${errs.length}) ${errs.slice(0, 2).join(" | ")}`);
  ok(ext.length === 0, `0 request ngoài origin (${ext.length}) ${ext.slice(0, 2).join(" ")}`);
  const title = await page.title();
  ok(/Ô Lưới/.test(title) && !BAD.test(title), `title: ${title}`);
  const m = (await visibleText(page)).match(BAD);
  ok(!m, `không có chữ cấm trên trang chính${m ? ": " + m[0] : ""}`);
  const gl = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    const out = {};
    for (const [label, sel, wt] of [["h1", "h1", 700], ["h2", "h2", 700], ["body", "p", 400], ["mono", "[class*=specN]", 700]]) {
      const el = document.querySelector(sel); if (!el) { out[label] = null; continue; }
      const fam = getComputedStyle(el).fontFamily;
      const c = document.createElement("canvas").getContext("2d");
      const res = {};
      for (const ch of "ăâêôơưđẮỆỐỬỮỜẶỌ") {
        c.font = `${wt} 80px ${fam}`; const a = c.measureText(ch).width;
        c.font = `${wt} 80px monospace`; const b = c.measureText(ch).width;
        c.font = `${wt} 80px serif`; const b2 = c.measureText(ch).width;
        res[ch] = Math.abs(a - b) > 0.5 || Math.abs(a - b2) > 0.5;
      }
      out[label] = { res, fam: fam.slice(0, 40) };
    }
    return { loaded: loaded.length, out };
  });
  ok(gl.loaded >= 6, `font đã tải (${gl.loaded} face loaded)`);
  for (const [k, v] of Object.entries(gl.out)) ok(v && Object.values(v.res).every(Boolean) && /^b|^m/.test(v.fam), `glyph Việt (${k}) khác fallback, font: ${v?.fam}`);
  // ảnh chụp chữ đậm cỡ lớn để tự xem dấu chồng
  await page.evaluate(() => {
    const h = document.querySelector("h2");
    h.textContent = "ỐẾỂỆỢỬỮ ĐƯỜNG LƯỚI ắằẳẵặ ếềểễệ ốồổỗộ ớờởỡợ ứừửữự";
    h.style.cssText = "font-size:84px;line-height:1.15;max-width:1300px;position:relative;z-index:5;background:#0b0b0c";
    h.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(shots, "glyph-stack.png") });
  await ctx.close();
}

// 2) không tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await open({}, w, 800, "", 1600);
  await scrollAll(page, 800);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ở ${w}px (scrollWidth ${o.sw} / ${o.cw})`);
  await ctx.close();
}

// 3) sơ đồ chỗ ngồi
{
  const { ctx, page } = await open({ permissions: ["clipboard-read", "clipboard-write"] });
  await page.locator("#so-do").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const opts = page.locator("[role=option]");
  ok((await opts.count()) === 62, `sơ đồ có 62 ô (${await opts.count()})`);
  const labels = await opts.evaluateAll((els) => els.map((e) => e.getAttribute("aria-label")));
  ok(labels.every((l) => /(Trống|Đang dùng|Đã giữ chỗ)$/.test(l)), "mọi ô có nhãn chữ cho trạng thái (không chỉ màu)");
  const stateSig = () => opts.evaluateAll((els) => els.map((e) => e.getAttribute("data-state")).join(""));
  const sigA = await stateSig();
  // đổi ngày/giờ -> trạng thái đổi
  await page.getByRole("radio", { name: "Chủ nhật" }).click();
  await page.waitForTimeout(300);
  const sigSun = await stateSig();
  ok(sigA !== sigSun, "đổi sang Chủ nhật thì trạng thái ghế đổi");
  await page.getByRole("radio", { name: "Thứ ba" }).click();
  const slider = page.getByLabel("Giờ", { exact: true });
  await slider.fill("10"); await page.waitForTimeout(250);
  const s10 = await stateSig();
  await slider.fill("20"); await page.waitForTimeout(250);
  const s20 = await stateSig();
  ok(s10 !== s20, "kéo giờ 10:00 -> 20:00: trạng thái đổi");
  ok((await page.locator("output").first().innerText()).trim() === "20:00", "hiển thị giờ 20:00");
  const busy10 = (s) => (s.match(/busy/g) || []).length;
  ok(true, `INFO: số ô đang dùng lúc 10:00 = ${busy10(s10)}, lúc 20:00 = ${busy10(s20)}`);
  // hover xem chi tiết
  await slider.fill("10"); await page.waitForTimeout(250);
  const seat = page.locator("#cg-seat-A-07");
  await seat.hover();
  await page.waitForTimeout(200);
  ok(/A-07/.test(await page.locator("[class*=seatCard]").innerText()), "hover A-07 hiện thẻ chi tiết");
  ok(/(Trống|Đang dùng|Đã giữ chỗ)/.test(await page.locator("[class*=seatCard]").innerText()), "thẻ chi tiết ghi trạng thái bằng chữ");
  // bàn phím
  await page.mouse.move(5, 5);
  await page.locator("svg[role=listbox]").focus();
  await page.keyboard.press("Home");
  const a0 = await page.locator("svg[role=listbox]").getAttribute("aria-activedescendant");
  await page.keyboard.press("ArrowRight");
  const a1 = await page.locator("svg[role=listbox]").getAttribute("aria-activedescendant");
  await page.keyboard.press("ArrowDown");
  const a2 = await page.locator("svg[role=listbox]").getAttribute("aria-activedescendant");
  ok(a0 === "cg-seat-A-01" && a1 && a1 !== a0 && a2 && a2 !== a1, `bàn phím: Home/→/↓ di chuyển (${a0} ${a1} ${a2})`);
  // crosshair + toạ độ trong sơ đồ
  const box = await page.locator("svg[role=listbox]").boundingBox();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.4);
  await page.waitForTimeout(150);
  ok(/TOẠ ĐỘ [A-V]\d+/.test(await page.locator("[class*=cellTag]").innerText()), "con trỏ trên sơ đồ hiện toạ độ ô");
  // tua giờ
  const hBefore = await page.locator("output").first().innerText();
  await page.getByRole("button", { name: "Tua giờ trong ngày" }).click();
  await page.waitForTimeout(2600);
  const hAfter = await page.locator("output").first().innerText();
  ok(hBefore !== hAfter, `tua giờ chạy (${hBefore} -> ${hAfter})`);
  await page.getByRole("button", { name: "Dừng tua giờ" }).click();
  await page.getByRole("button", { name: "Về giờ hiện tại" }).click();
  await page.waitForTimeout(300);
  ok(/đang theo giờ hiện tại/.test(await page.locator("[class*=mapNote]").innerText()), "về giờ hiện tại: bật chế độ giờ thực");
  await page.locator("#picker").scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(shots, "picker-1440.png"), fullPage: false });
  await ctx.close();
}

// 4) Seat & Plan Picker
{
  const { ctx, page } = await open({ permissions: ["clipboard-read", "clipboard-write"] });
  await page.locator("#picker").scrollIntoViewIfNeeded();
  const rec = () => page.locator("#cg-rec-h").innerText();
  const price = async () => num(await page.locator("[class*=recNum] [data-fx-view]").first().innerText());
  await page.waitForTimeout(1300);
  ok(/Bàn cố định/.test(await rec()), "mặc định: Bàn cố định");
  ok((await price()) === 3 * 2790000, `3 người x 2.790.000 = ${await price()}`);
  // số người
  const ppl = page.locator("#cg-people");
  await ppl.fill("0");
  ok((await ppl.getAttribute("aria-invalid")) === "true", "số người 0 -> aria-invalid");
  ok(/từ 1 đến 20/.test(await page.locator("#cg-people-err").innerText()), "thông báo lỗi cạnh ô số người");
  await ppl.fill("25");
  ok((await ppl.getAttribute("aria-invalid")) === "true", "số người 25 -> aria-invalid");
  await ppl.fill("");
  ok((await ppl.getAttribute("aria-invalid")) === "true", "để trống -> aria-invalid");
  await ppl.fill("abc");
  ok((await ppl.inputValue()) === "", "chữ cái bị loại khỏi ô số");
  await ppl.fill("2"); await page.waitForTimeout(1100);
  ok((await price()) === 2 * 2790000, "2 người: 5.580.000");
  await page.getByRole("button", { name: "Tăng số người" }).click();
  await page.getByRole("button", { name: "Giảm số người" }).click();
  ok((await ppl.inputValue()) === "2", "tăng/giảm số người");
  // loại hot + 1 ngày
  await page.getByRole("radio", { name: /^Hot desk/ }).click();
  await page.getByRole("radio", { name: "1", exact: true }).click();
  await page.waitForTimeout(900);
  ok(/Hot desk lẻ/.test(await rec()), `hot 1 ngày: gói lẻ (${await rec()})`);
  await page.getByRole("radio", { name: "7", exact: true }).click();
  await page.waitForTimeout(900);
  ok(/không giới hạn/.test(await rec()), `hot 7 ngày: không giới hạn (${await rec()})`);
  // so sánh 3 gói
  ok((await page.locator("[aria-label='So sánh ba gói'] article").count()) === 3, "so sánh đúng 3 gói");
  ok((await page.locator("[aria-label='So sánh ba gói'] article[data-rec]").count()) === 1, "một gói được đánh dấu gợi ý");
  // tô sáng ghế
  await page.locator("#cg-people").fill("4");
  await page.getByRole("radio", { name: /^Cả ngày/ }).click();
  await page.waitForTimeout(500);
  const hl = await page.locator("[role=option][data-hl]").count();
  ok(hl >= 1 && hl <= 4, `sơ đồ tô sáng ${hl} chỗ cho 4 người (hot)`);
  // phòng họp > 10 người -> lỗi
  await page.locator("#cg-people").fill("12");
  await page.getByRole("radio", { name: /^Phòng họp/ }).click();
  await page.waitForTimeout(500);
  ok(/tối đa 10 người/.test(await page.locator("[role=alert]").first().innerText()), "phòng họp 12 người: báo lỗi sức chứa");
  // phòng riêng 6 người -> tô sáng phòng
  await page.locator("#cg-people").fill("6");
  await page.getByRole("radio", { name: /^Phòng riêng/ }).click();
  await page.waitForTimeout(500);
  ok(/Phòng riêng 6 chỗ/.test(await rec()), `6 người: ${await rec()}`);
  // trạng thái thiếu chỗ + nút tìm giờ
  await page.locator("#cg-people").fill("20");
  await page.getByRole("radio", { name: /^Hot desk/ }).click();
  await page.waitForTimeout(500);
  const notice = page.locator("[class*=notice]");
  ok((await notice.count()) === 1, "20 người hot desk: có thông báo thiếu chỗ");
  await page.screenshot({ path: path.join(shots, "picker-shortage.png") });
  await page.getByRole("button", { name: /Tìm khung giờ còn đủ chỗ/ }).click();
  await page.waitForTimeout(500);
  ok(true, `INFO: sau khi tìm giờ, thông báo thiếu chỗ còn ${await notice.count()}`);
  // tóm tắt + sao chép + CTA
  await page.locator("#cg-people").fill("3");
  await page.getByRole("radio", { name: /^Bàn cố định/ }).click();
  await page.waitForTimeout(700);
  const sum = await page.locator("pre").innerText();
  ok(/Số người: 3/.test(sum) && /Gói gợi ý: Bàn cố định/.test(sum) && /8\.370\.000/.test(sum), "tóm tắt đúng nội dung");
  await page.getByRole("button", { name: "Sao chép tóm tắt" }).click();
  await page.waitForTimeout(300);
  ok(/Đã sao chép/.test(await page.locator("[class*=copied]").innerText()), "sao chép báo trạng thái");
  ok((await page.evaluate(() => navigator.clipboard.readText())) === sum, "nội dung clipboard khớp tóm tắt");
  const cta = await page.getByRole("link", { name: /Đặt lịch tham quan với lựa chọn này/ }).getAttribute("href");
  const q = new URL_(cta, BASE);
  ok(q.pathname === "/lien-he", `CTA tới /lien-he (${cta})`);
  ok(q.searchParams.get("industry") === "Coworking" && q.searchParams.get("solution") === "sme-ops" && q.searchParams.get("utm_campaign") === "cowork-grid", `CTA có industry/solution/utm_campaign (${q.search})`);
  ok(!/Gửi thành công|đã đặt/i.test(await page.locator("#picker").innerText()), "công cụ không khẳng định đã gửi/đặt");
  const m = (await visibleText(page)).match(BAD);
  ok(!m, `không chữ cấm sau khi dùng công cụ${m ? ": " + m[0] : ""}`);
  // Tab tới CTA
  await page.getByRole("link", { name: /Đặt lịch tham quan với lựa chọn này/ }).focus();
  ok(await page.evaluate(() => /Đặt lịch tham quan với/.test(document.activeElement?.textContent || "")), "Tab/focus tới CTA");
  await ctx.close();
}

// 5) menu mobile + Escape
{
  const { ctx, page, errs } = await open({}, 390, 844, "", 1800);
  await page.getByRole("button", { name: /Menu/ }).click();
  ok(await page.locator("#cg-menu").isVisible(), "mobile: menu mở");
  await page.keyboard.press("Escape");
  ok(!(await page.locator("#cg-menu").count()), "Escape đóng menu");
  ok(await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "cg-menu"), "Escape trả focus về nút Menu");
  ok(errs.length === 0, "mobile: 0 lỗi console");
  await ctx.close();
}

// 6) reduced-motion
{
  const { ctx, page, errs } = await open({ reducedMotion: "reduce" });
  const st = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const cells = [...document.querySelectorAll("[data-hcell]")].map((e) => getComputedStyle(e).opacity);
    const line = q("[data-hline] > span");
    return {
      cells: cells.every((o) => o === "0"), // ô che ảnh không che
      tf: getComputedStyle(line).transform, op: getComputedStyle(line).opacity,
      scramble: q("[data-fx=TextScramble]")?.getAttribute("data-fx-ready"),
      mq: q("[data-fx=VelocityMarquee]")?.getAttribute("data-fx-ready"),
      cnt: q("[data-fx=Counter]")?.getAttribute("data-fx-ready"),
      js: document.querySelector("[data-cg-root]").hasAttribute("data-cg-js"),
    };
  });
  ok(st.cells, "reduced: các ô che ảnh hero không che");
  ok(st.op === "1" && (st.tf === "none" || st.tf === "matrix(1, 0, 0, 1, 0, 0)"), `reduced: tiêu đề hiện đủ (${st.op}/${st.tf})`);
  ok(st.scramble === "static", `reduced: scramble ở trạng thái cuối (${st.scramble})`);
  ok(st.mq === "static", `reduced: marquee tĩnh (${st.mq})`);
  ok(st.cnt === "static", `reduced: counter trạng thái cuối (${st.cnt})`);
  ok(!st.js, "reduced: Motion không bật data-cg-js (không ẩn gì)");
  const txt = await page.locator("main").innerText();
  ok(/Bốn khu, bốn toạ độ/.test(txt) && /Giá tham khảo/.test(txt) && /Câu hỏi thường gặp/.test(txt), "reduced: nội dung vẫn hiện đủ");
  const hid = await page.evaluate(() => [...document.querySelectorAll("[data-cg-cell],[data-cg-rise]")].filter((e) => getComputedStyle(e).opacity !== "1").length);
  ok(hid === 0, `reduced: không phần tử nào bị ẩn chờ reveal (${hid})`);
  ok(errs.length === 0, "reduced: 0 lỗi console");
  await ctx.close();
}

// 7) hiệu ứng khởi chạy (không reduced)
{
  const { ctx, page } = await open();
  const r = await page.evaluate(() => {
    const names = ["TextScramble", "SplitReveal", "ScrollScrubText", "ClipReveal", "Counter", "VelocityMarquee", "SVGPathDraw", "MagneticButton", "ScrollProgress"];
    const o = {};
    names.forEach((n) => { const e = document.querySelector(`[data-fx=${n}]`); o[n] = e ? e.getAttribute("data-fx-ready") : "missing"; });
    o.crosshair = !!document.querySelector("[class*=xh]");
    o.heroCellsOpen = [...document.querySelectorAll("[data-hcell]")].every((e) => Number(getComputedStyle(e).opacity) < 0.05);
    o.needle = !!document.querySelector("[class*=wdNeedle]");
    o.clock = /\d\d:\d\d:\d\d/.test(document.querySelector("header").innerText);
    return o;
  });
  for (const [k, v] of Object.entries(r)) ok(v && v !== "missing", `hiệu ứng ${k}: ${v}`);
  // crosshair thật
  await page.mouse.move(700, 400); await page.waitForTimeout(200);
  const xh = await page.evaluate(() => { const e = document.querySelector("[class*=xh]"); return { on: e.dataset.on, t: e.querySelector("b").textContent }; });
  ok(xh.on === "1" && /^[A-Z]\d+ · X\d+ Y\d+$/.test(xh.t), `crosshair bám con trỏ: ${xh.t}`);
  await page.mouse.move(500, 300); await page.waitForTimeout(120);
  const xh2 = await page.evaluate(() => document.querySelector("[class*=xh] b").textContent);
  ok(xh2 !== xh.t, "toạ độ crosshair đổi khi di chuột");
  await page.locator("#cg-people").scrollIntoViewIfNeeded();
  const box = await page.locator("#cg-people").boundingBox();
  await page.mouse.move(box.x + 10, box.y + 10); await page.waitForTimeout(150);
  ok((await page.evaluate(() => document.querySelector("[class*=xh]").dataset.on)) === "", "crosshair ẩn khi vào ô nhập liệu");
  // đồng hồ chạy
  const c1 = await page.locator("header time").innerText();
  await page.waitForTimeout(1500);
  const c2 = await page.locator("header time").innerText();
  ok(c1 !== c2, `đồng hồ header chạy (${c1} -> ${c2})`);
  await ctx.close();
}

// 8) ?ref, credits
{
  const { ctx, page } = await open({}, 1440, 900, "?ref=abc");
  const href = await page.getByRole("link", { name: "Đặt lịch tham quan" }).first().getAttribute("href");
  ok(!!href && href.startsWith("/lien-he"), "link thoát cùng origin (cookie tct_ref đi theo, trang không đọc/ghi)");
  await ctx.close();
  const c2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p2 = await c2.newPage();
  const r = await p2.goto(`${URLP}/credits`, { waitUntil: "networkidle" });
  ok(r.status() === 200, "credits 200");
  const ct = await p2.locator("main").innerText();
  ok(/Pexels/.test(ct) && /Bai Jamjuree/.test(ct) && /Space Mono/.test(ct), "credits liệt kê ảnh và font");
  ok(!BAD.test(ct), "credits không chứa chữ cấm");
  ok(/Trần Công Tiến thiết kế/.test(ct), "credits có lời công khai trung thực");
  ok((await p2.locator("[class*=creditCard]").count()) === 11, "credits: 11 ảnh");
  await c2.close();
}

// 9) hiệu năng thô + ảnh chụp
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.addInitScript(() => { window.__lt = 0; try { new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.duration > 200) window.__lt++; })).observe({ entryTypes: ["longtask"] }); } catch {} });
  await page.goto(URLP, { waitUntil: "networkidle" });
  await page.waitForTimeout(2800);
  await page.screenshot({ path: path.join(shots, `hero-${w}.png`) });
  await scrollAll(page, h);
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(shots, `full-${w}.png`), fullPage: true });
  console.log(`INFO long task >200ms khi cuộn toàn trang ${w}: ${await page.evaluate(() => window.__lt)}`);
  await ctx.close();
}

console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
await browser.close();
process.exit(fail ? 1 : 0);
