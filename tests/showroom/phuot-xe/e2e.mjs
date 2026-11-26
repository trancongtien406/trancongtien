// E2E Vọt (/demos/phuot-xe). Chạy: BASE=http://localhost:3100 node tests/showroom/phuot-xe/e2e.mjs
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const URL = `${BASE}/demos/phuot-xe`;
const here = path.dirname(fileURLToPath(import.meta.url));
const shots = path.join(here, "screenshots");
fs.mkdirSync(shots, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const BAD = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;
const URL_ = globalThis.URL;

async function open(ctxOpts = {}, w = 1440, h = 900, query = "", wait = 2600) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...ctxOpts });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  page.on("request", (r) => { const u = new URL_(r.url()); if (u.protocol.startsWith("http") && u.origin !== new URL_(BASE).origin) ext.push(r.url()); });
  await page.goto(URL + query, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
  return { ctx, page, errs, ext };
}
const visibleText = (page) => page.evaluate(() => {
  const root = document.querySelector("main")?.parentElement;
  const out = [];
  root.querySelectorAll("*").forEach((e) => ["alt", "aria-label", "title", "placeholder"].forEach((a) => e.getAttribute(a) && out.push(e.getAttribute(a))));
  out.push(root.innerText);
  document.querySelectorAll("meta[name=description],meta[property^='og:']").forEach((m) => out.push(m.content));
  out.push(document.title);
  return out.join("\n");
});
const money = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
const sumText = (page) => page.locator("aside[aria-label='Phiếu giá thuê xe'] [class*=rcSum] > span").first().evaluate((e) => e.firstElementChild?.textContent || e.textContent);

// 1) tải + console + request ngoài + chữ cấm + glyph
{
  const { ctx, page, errs, ext } = await open();
  ok(errs.length === 0, `0 lỗi console (${errs.length}) ${errs.slice(0, 2).join(" | ")}`);
  ok(ext.length === 0, `0 request ngoài origin (${ext.length}) ${ext.slice(0, 2).join(" ")}`);
  const title = await page.title();
  ok(/Vọt/.test(title) && !BAD.test(title), `title: ${title}`);
  const m = (await visibleText(page)).match(BAD);
  ok(!m, `không có chữ cấm trên trang chính${m ? ": " + m[0] : ""}`);
  const gl = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    const out = {};
    for (const [label, sel, wt, st] of [["h1", "h1", 900, "italic"], ["h2", "h2[class*=h2]", 800, "italic"], ["body", "p[class*=lead]", 400, "normal"]]) {
      const el = document.querySelector(sel); if (!el) { out[label] = null; continue; }
      const fam = getComputedStyle(el).fontFamily;
      const c = document.createElement("canvas").getContext("2d");
      const res = {};
      for (const ch of "ăâêôơưđẮỆỐỬỮỜẶỌ") {
        c.font = `${st} ${wt} 80px ${fam}`; const a = c.measureText(ch).width;
        c.font = `${st} ${wt} 80px monospace`; const b = c.measureText(ch).width;
        c.font = `${st} ${wt} 80px serif`; const b2 = c.measureText(ch).width;
        res[ch] = Math.abs(a - b) > 0.5 || Math.abs(a - b2) > 0.5;
      }
      out[label] = res;
    }
    return { loaded: loaded.length, out };
  });
  ok(gl.loaded >= 4, `font đã tải (${gl.loaded} face loaded)`);
  for (const [k, v] of Object.entries(gl.out)) ok(v && Object.values(v).every(Boolean), `glyph Việt (${k}) khác fallback${v ? " " + Object.entries(v).filter(([, x]) => !x).map(([c]) => c).join("") : ""}`);
  await ctx.close();
}
{
  const { ctx, page } = await open();
  // đổi chữ tiêu đề section thành chuỗi dấu chồng để TỰ XEM ảnh chụp chữ đậm cỡ lớn
  await page.evaluate(() => {
    const h = document.querySelector("h2[class*=h2]");
    h.textContent = "ỐẾỂỆỢỬỮ ĐƯỜNG VỌT ắằẳẵặ ếềểễệ ốồổỗộ ớờởỡợ ứừửữự";
    h.style.cssText = "font-size:84px;line-height:1.15;max-width:1300px";
    h.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(shots, "glyph-stack.png") });
  await ctx.close();
}

// 2) không tràn ngang 320..1440
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await open({}, w, 800, "", 1800);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ở ${w}px (scrollWidth ${o.sw} / ${o.cw})`);
  await ctx.close();
}

// 3) công cụ chọn xe + tính giá
{
  const { ctx, page } = await open({ permissions: ["clipboard-read", "clipboard-write"] });
  const receipt = page.locator("aside[aria-label='Phiếu giá thuê xe']");
  await page.locator("#doi-xe").scrollIntoViewIfNeeded();
  // lọc
  ok(await page.locator("#doi-xe article").count() === 8, "đội xe: 8 mẫu");
  await page.getByRole("button", { name: /^Xe số/ }).click();
  ok(await page.locator("#doi-xe article").count() === 2, "lọc Xe số còn 2 mẫu");
  await page.getByRole("button", { name: /^Côn tay/ }).click();
  ok(await page.locator("#doi-xe article").count() === 3, "lọc Côn tay còn 3 mẫu");
  await page.getByRole("button", { name: /^Tất cả/ }).click();
  ok(await page.locator("#doi-xe article").count() === 8, "Tất cả: 8 mẫu");
  // trạng thái rỗng
  ok(/Chọn một mẫu xe/.test(await receipt.innerText()), "chưa chọn xe: phiếu giá báo rỗng");
  // chọn bằng bàn phím
  const btn = page.locator("#doi-xe article").first().getByRole("button");
  await btn.focus(); await page.keyboard.press("Enter");
  ok((await btn.getAttribute("aria-pressed")) === "true", "bàn phím: Enter chọn xe (aria-pressed)");
  ok(/Số 110 Gọn/.test(await receipt.innerText()), "phiếu giá hiện tên xe vừa chọn");
  // 3 ngày * 130.000
  const rows = await receipt.locator("tbody tr").allInnerTexts();
  ok(rows.length === 3 && /3 ngày × 130\.000/.test(rows[0]), `3 ngày: dòng tiền xe đúng (${rows[0].replace(/\s+/g, " ")})`);
  ok((await sumText(page)).replace(/\D/g, "") === "390000", "3 ngày: tổng 390.000");
  // 6 ngày: bị chặn trần giá tuần
  const days = page.getByLabel("Số ngày thuê");
  await days.fill("6");
  ok((await sumText(page)).replace(/\D/g, "") === "750000", "6 ngày lẻ: tổng bằng giá tuần 750.000");
  ok(/giá một tuần/.test(await receipt.innerText()), "6 ngày: có ghi chú trần giá tuần");
  // 10 ngày = 1 tuần + 3 ngày lẻ
  await days.fill("10");
  ok((await sumText(page)).replace(/\D/g, "") === String(750000 + 390000), "10 ngày: 1 tuần + 3 ngày lẻ");
  // 14 ngày: tiết kiệm
  await days.fill("14");
  ok((await sumText(page)).replace(/\D/g, "") === "1500000", "14 ngày: 2 tuần 1.500.000");
  ok(/Tiết kiệm/.test(await receipt.innerText()), "hiện khoản tiết kiệm so với thuê lẻ");
  // lỗi
  for (const bad of ["0", "31", "", "abc"]) {
    await days.fill(bad);
    ok((await days.getAttribute("aria-invalid")) === "true", `số ngày "${bad}" -> aria-invalid`);
  }
  ok(/1 đến 30/.test(await page.locator("[id$='-days-msg']").innerText()), "thông báo lỗi cạnh ô số ngày");
  ok(/số nguyên từ 1 đến 30/.test(await receipt.innerText()), "phiếu giá báo lỗi số ngày");
  // + / -
  await days.fill("3");
  await page.getByRole("button", { name: "Tăng một ngày" }).click();
  ok((await days.inputValue()) === "4", "nút + tăng 1 ngày");
  await page.getByRole("button", { name: "Giảm một ngày" }).click();
  ok((await days.inputValue()) === "3", "nút − giảm 1 ngày");
  // giao nhận + phụ kiện + bảo hiểm
  await page.locator("label", { hasText: "Giao và nhận lại tận nơi" }).click();
  await page.locator("label", { hasText: "Mũ bảo hiểm thứ hai" }).click();
  await page.locator("label", { hasText: "Áo mưa bộ" }).click();
  await page.locator("label", { hasText: "Yên tâm" }).first().click();
  const expected = 390000 + 90000 + 3 * 15000 + 20000 + 3 * 30000;
  ok((await sumText(page)).replace(/\D/g, "") === String(expected), `tổng với giao nhận + phụ kiện + bảo hiểm = ${money(expected)}`);
  const rows2 = await receipt.locator("tbody tr").count();
  ok(rows2 === 5, `bảng giá có ${rows2} dòng (tiền xe, giao nhận, 2 phụ kiện, bảo hiểm)`);
  ok((await receipt.innerText()).includes(money(2000000).replace(/\s/g, " ").trim()) || /2\.000\.000/.test(await receipt.innerText()), "phiếu giá ghi tiền cọc 2.000.000");
  // checklist
  const chk = page.locator("fieldset", { hasText: "Điều kiện thuê xe" });
  ok(/0\/6/.test(await chk.innerText()), "checklist 0/6");
  await chk.locator("label").nth(0).click(); await chk.locator("label").nth(2).click();
  ok(/2\/6/.test(await chk.innerText()), "tích 2 mục: 2/6");
  ok(/Tiền cọc 2\.000\.000/.test(await chk.innerText()), "checklist ghi tiền cọc theo xe đã chọn");
  ok(/tự kiểm tra quy định hiện hành/.test(await chk.innerText()), "checklist GPLX: khách tự kiểm tra quy định hiện hành");
  // đổi xe -> cọc đổi
  await page.locator("#doi-xe article", { hasText: "Phượt 250 Adventure" }).getByRole("button").click();
  ok(/8\.000\.000/.test(await chk.innerText()), "đổi sang xe 250: cọc 8.000.000");
  // copy
  await receipt.getByRole("button", { name: "Sao chép bản tóm tắt" }).click();
  await page.waitForTimeout(300);
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => "ERR"));
  ok(/Phượt 250 Adventure/.test(clip) && /Giá tham khảo/.test(clip), "sao chép bản tóm tắt vào clipboard");
  // CTA
  const href = await receipt.getByRole("link", { name: /Đặt xe/ }).getAttribute("href");
  ok(/^\/lien-he/.test(href || ""), `CTA cuối tới form tư vấn: ${href}`);
  if (/industry=/.test(href)) ok(/solution=/.test(href) && /utm_campaign=phuot-xe/.test(href), "href có industry/solution/utm_campaign");
  else console.log("INFO href chưa có industry/solution/utm: registry chưa có phuot-xe (xem design/REQUESTS.md)");
  const txt = (await visibleText(page)).match(BAD);
  ok(!txt, "không có chữ cấm sau khi dùng công cụ");
  await page.locator("#tinh-gia").screenshot({ path: path.join(shots, "tool-1440.png") });
  await ctx.close();
}

// 4) hiệu ứng ký hiệu chạy thật
{
  const { ctx, page } = await open();
  const fx = await page.evaluate(() => [...new Set([...document.querySelectorAll("[data-fx]")].map((e) => e.getAttribute("data-fx")))]);
  for (const n of ["VelocityMarquee", "Odometer", "Counter", "MagneticButton", "SpeedLines", "Speedometer", "RoadDivider", "TiltCard", "ShineSweep", "RouteLine"]) ok(fx.includes(n), `hiệu ứng có mặt: ${n}`);
  for (const n of ["SVGPathDraw", "ClipReveal", "ScrollScrubText", "ScrollProgress", "ParallaxLayer"]) ok(!fx.includes(n), `hiệu ứng đại trà đã bỏ: ${n}`);
  // nội dung đề tài: cửa hàng cho thuê xe ở Đà Nẵng
  const h1t = (await page.locator("h1").innerText()).replace(/\s+/g, " ");
  ok(/THUÊ XE/i.test(h1t), `h1 nêu loại hình (${h1t})`);
  const kick = await page.locator("p[class*=kicker]").first().innerText();
  ok(/Cho thuê xe/i.test(kick) && /Hải Châu/i.test(kick) && /Đà Nẵng/i.test(kick), "hero: loại hình + khu vực");
  ok(await page.locator("section[class*=hero] dl > div").count() === 4, "hero có 4 sự thật cụ thể");
  const heroDl = await page.locator("section[class*=hero] dl").innerText();
  ok(/130\.000|130/.test(heroDl) && /07:00/.test(heroDl) && /50\.000/.test(heroDl), "hero: giá từ, giờ nhận trả, giá giao xe");
  for (const id of ["cua-hang", "doi-xe", "tinh-gia", "cung-duong", "giao-nhan", "dieu-kien", "bao-hiem", "quy-trinh", "hoi-dap", "dat-xe"]) ok(await page.locator("#" + id).count() === 1, `section #${id}`);
  ok(await page.locator("#giao-nhan li").count() >= 10, "giao nhận + phụ kiện liệt kê");
  ok(await page.locator("#dieu-kien dt").count() >= 7, "điều kiện thuê >= 7 mục");
  ok(await page.locator("#bao-hiem li").count() >= 7, "bảo hiểm 3 gói + 4 bước sự cố");
  ok(await page.locator("#hoi-dap details").count() >= 8, "FAQ >= 8 mục");
  ok(await page.locator("#hoi-dap [lang=en]").count() >= 1, "FAQ khách nước ngoài (tiếng Anh)");
  ok(!/được công nhận|hợp pháp|đảm bảo hợp lệ/i.test(await page.locator("#hoi-dap").innerText()), "FAQ không khẳng định pháp lý GPLX");
  // odometer hero chạy tới giá trị cuối
  const odo = await page.locator("#top [data-fx=Odometer]").first().evaluate((e) => ({ r: e.getAttribute("data-fx-ready"), t: e.firstElementChild.textContent }));
  ok(odo.t === "8" && odo.r === "1", `odometer hero chạy (${odo.t}, ready=${odo.r})`);
  const cnt = await page.locator("#top [data-fx=Counter]").first().evaluate((e) => e.querySelector("[data-fx-view]").textContent);
  ok(/130\.000/.test(cnt), `counter giá chạy tới 130.000 (${cnt})`);
  // velocity marquee phản ứng khi cuộn nhanh
  const mq = page.locator("[data-fx=VelocityMarquee]").first();
  ok((await mq.getAttribute("data-fx-ready")) === "velocity", "marquee ở chế độ velocity");
  await page.evaluate(() => window.scrollTo(0, 250)); await page.waitForTimeout(500);
  const speedOf = async (during) => {
    const read = () => mq.evaluate((el) => ({ x: parseFloat((el.querySelector("[data-fx-track]").style.transform.match(/translate3d\((-?[\d.]+)px/) || [0, 0])[1]), w: el.querySelector("[data-fx-group]").offsetWidth }));
    let prev = await read(), sum = 0;
    const t0 = Date.now();
    for (let i = 0; i < 12; i++) {
      if (during) await page.mouse.wheel(0, 45);
      await page.waitForTimeout(30);
      const cur = await read();
      let d = (prev.x - cur.x) % cur.w; if (d < 0) d += cur.w;
      if (d > cur.w / 2) d = 0;
      sum += d; prev = cur;
    }
    return sum / ((Date.now() - t0) / 1000);
  };
  const idle = await speedOf(false);
  const fast = await speedOf(true);
  ok(idle > 20 && fast > idle * 1.5, `velocity marquee tăng tốc theo cuộn (nền ${Math.round(idle)}px/s, khi cuộn ${Math.round(fast)}px/s)`);
  // speed lines: biến --vx-v lên khi cuộn nhanh
  const v = await page.evaluate(async () => {
    const root = document.querySelector("[data-vx-root]");
    let max = 0;
    const t0 = performance.now();
    while (performance.now() - t0 < 600) { window.scrollBy(0, 140); max = Math.max(max, parseFloat(getComputedStyle(root).getPropertyValue("--vx-v")) || 0); await new Promise((r) => requestAnimationFrame(r)); }
    return max;
  });
  ok(v > 0.05, `speed lines: --vx-v tăng khi cuộn nhanh (${v.toFixed(2)})`);
  // đồng hồ tốc độ: kim quay theo cuộn
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(900);
  const needle = () => page.locator("[data-fx=Speedometer] g").first().evaluate((g) => g.getAttribute("transform") || g.style.transform || "");
  const n0 = await needle();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.6)); await page.waitForTimeout(1200);
  const n1 = await needle();
  const rd = await page.locator("[data-fx=Speedometer] text").first().textContent();
  ok(n0 !== n1 && Number(rd) > 40, `đồng hồ tốc độ: kim quay theo cuộn, số ${rd} km/h (${n0.slice(0, 30)} -> ${n1.slice(0, 30)})`);
  // xe lướt qua: vị trí xe ở dải đường đổi theo cuộn
  const road = page.locator("[data-fx=RoadDivider]").first();
  await road.scrollIntoViewIfNeeded();
  const rb = async () => (await road.locator("[class*=roadBike]").boundingBox()).x;
  await page.evaluate(() => { const r = document.querySelector("[data-fx=RoadDivider]").getBoundingClientRect(); window.scrollBy(0, r.top - window.innerHeight * 0.9); }); await page.waitForTimeout(500);
  const x0 = await rb();
  await page.evaluate(() => { const r = document.querySelector("[data-fx=RoadDivider]").getBoundingClientRect(); window.scrollBy(0, r.top - window.innerHeight * 0.2); }); await page.waitForTimeout(700);
  const x1 = await rb();
  ok(x1 > x0 + 200, `xe lướt ngang qua theo cuộn (x ${Math.round(x0)} -> ${Math.round(x1)})`);
  // đèn xuất phát
  await page.locator("#quy-trinh").scrollIntoViewIfNeeded(); await page.waitForTimeout(2200);
  ok(await page.locator("#quy-trinh [data-step][data-on='1']").count() === 4, "đèn xuất phát: 4 đèn sáng lần lượt");
  // route path draw
  await page.locator("#cung-duong").scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
  await page.evaluate(() => { const t = document.querySelector("[data-fx=RouteLine]").parentElement; window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY + t.offsetHeight * 0.6 - window.innerHeight * 0.5); }); await page.waitForTimeout(900);
  const fillScale = await page.locator("[data-fx=RouteLine] [data-fill]").evaluate((e) => { const m = getComputedStyle(e).transform.match(/matrix\(([^)]+)\)/); return m ? parseFloat(m[1].split(",")[3]) : 1; });
  ok(fillScale > 0.15 && fillScale <= 1, `đường cung đường tô theo cuộn (scaleY ${fillScale.toFixed(2)})`);
  // magnetic: rê chuột gần nút hero thì lớp trong dịch
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
  const cta = page.locator("#top [data-fx=MagneticButton] a").first();
  const bb = await cta.boundingBox();
  await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
  await page.mouse.move(bb.x + bb.width - 4, bb.y + bb.height / 2 + 4, { steps: 6 });
  await page.waitForTimeout(500);
  const mt = await page.locator("#top [data-fx=MagneticButton] > span").first().evaluate((e) => getComputedStyle(e).transform);
  ok(/matrix/.test(mt) && mt !== "matrix(1, 0, 0, 1, 0, 0)", `nút từ tính dịch theo con trỏ (${mt.slice(0, 40)})`);
  // tilt
  const card = page.locator("#doi-xe [data-fx=TiltCard]").first();
  await card.scrollIntoViewIfNeeded();
  const cb = await card.boundingBox();
  await page.mouse.move(cb.x + cb.width * 0.85, cb.y + cb.height * 0.2); await page.waitForTimeout(500);
  const tt = await card.evaluate((e) => getComputedStyle(e).transform);
  ok(/matrix3d|matrix/.test(tt) && tt !== "none", `thẻ xe nghiêng 3D (${tt.slice(0, 30)})`);
  await ctx.close();
}

// 5) preloader chỉ lần đầu, ≤ 1.2s kể cả bộ hẹn; lần sau không hiện
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-fx=Preloader]", { timeout: 6000 }).then(() => ok(true, "preloader cờ caro hiện lần đầu")).catch(() => ok(false, "preloader cờ caro hiện lần đầu"));
  const t0 = Date.now();
  await page.waitForSelector("[data-fx=Preloader]", { state: "detached", timeout: 5000 }).catch(() => {});
  const dur = Date.now() - t0;
  ok(dur < 1800, `preloader tự gỡ (${dur}ms sau khi thấy)`);
  await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(400);
  ok(await page.locator("[data-fx=Preloader]").count() === 0, "lần sau trong phiên không hiện preloader");
  await ctx.close();
}

// 6) bàn phím: Tab tới CTA, menu mobile + Escape
{
  const { ctx, page } = await open();
  let reached = false;
  for (let i = 0; i < 20; i++) { await page.keyboard.press("Tab"); const t = await page.evaluate(() => document.activeElement?.textContent || ""); if (/Chọn xe ngay/.test(t)) { reached = true; break; } }
  ok(reached, "Tab tới CTA chính ở hero");
  const fo = await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + "|" + s.boxShadow; });
  ok(!/^none\|none$/.test(fo), `CTA có viền focus rõ (${fo.slice(0, 50)})`);
  await ctx.close();
  const m = await open({ hasTouch: true, isMobile: true }, 390, 844);
  const btn = m.page.getByRole("button", { name: /Menu/ });
  await btn.click();
  ok(await m.page.locator("#vx-menu").isVisible(), "menu mobile mở");
  await m.page.keyboard.press("Escape");
  ok(!(await m.page.locator("#vx-menu").isVisible()), "Escape đóng menu");
  ok(await m.page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "vx-menu"), "Escape trả focus về nút menu");
  await m.page.screenshot({ path: path.join(shots, "hero-390.png") });
  // thanh tổng tiền cố định trên mobile
  await m.page.locator("#tinh-gia").scrollIntoViewIfNeeded();
  ok(await m.page.locator("[class*=stickyBar]").isVisible(), "mobile: có thanh tổng tiền dính");
  await m.ctx.close();
}

// 7) reduced motion
{
  const { ctx, page, errs } = await open({ reducedMotion: "reduce" });
  const vis = await page.evaluate(() => {
    const l = document.querySelector("h1 [data-h=line]");
    const cs = getComputedStyle(l);
    const g = document.querySelector("[data-fx=Speedometer]");
    const sl = document.querySelector("[data-fx=SpeedLines] i");
    return { op: cs.opacity, tf: cs.transform, gauge: g ? getComputedStyle(g).display : "none", sl: sl ? getComputedStyle(sl).animationName : "none", pre: document.querySelectorAll("[data-fx=Preloader]").length, mq: document.querySelector("[data-fx=VelocityMarquee]")?.getAttribute("data-fx-ready") };
  });
  ok(vis.op === "1" && (vis.tf === "none" || vis.tf === "matrix(1, 0, 0, 1, 0, 0)"), `reduced: tiêu đề hiện đủ, không dịch (${vis.op}/${vis.tf})`);
  ok(vis.gauge === "none", "reduced: ẩn đồng hồ tốc độ");
  ok(vis.sl === "none", "reduced: vệt tốc độ không animation");
  ok(vis.pre === 0, "reduced: không preloader");
  ok(vis.mq === "static", `reduced: marquee ở chế độ tĩnh (${vis.mq})`);
  const txt = await page.locator("main").innerText();
  ok(/Tám mẫu xe/.test(txt) && /Phiếu giá/.test(txt) && /Hỏi trước/.test(txt), "reduced: nội dung vẫn hiện đủ");
  const od = await page.locator("#top [data-fx=Odometer]").first().evaluate((e) => e.getAttribute("data-fx-ready"));
  ok(od === "static", `reduced: odometer ở trạng thái cuối (${od})`);
  ok(errs.length === 0, "reduced: 0 lỗi console");
  await page.screenshot({ path: path.join(shots, "reduced-1440.png"), fullPage: true });
  await ctx.close();
}

// 8) no-JS
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "load" });
  const t = await page.locator("main").innerText();
  ok(/LÊN ĐƯỜNG|Lên đường/i.test(t) && /Tám mẫu xe/.test(t) && /Hỏi trước, đỡ lo sau/.test(t), "no-JS: nội dung hero, đội xe, hỏi đáp có trong HTML");
  ok(await page.locator("[data-fx=Preloader]").count() === 0, "no-JS: không có lớp chặn preloader");
  await ctx.close();
}

// 9) ?ref, credits, long task, ảnh chụp
{
  const { ctx, page } = await open({}, 1440, 900, "?ref=abc");
  const href = await page.getByRole("link", { name: "Đặt xe ngay" }).first().getAttribute("href");
  ok(!!href && href.startsWith("/lien-he"), "link thoát cùng origin (cookie tct_ref đi theo, demo không đọc/ghi)");
  await ctx.close();
  const c2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p2 = await c2.newPage();
  const r = await p2.goto(`${URL}/credits`, { waitUntil: "networkidle" });
  ok(r.status() === 200, "credits 200");
  const ct = await p2.locator("main").innerText();
  ok(!BAD.test(ct), "credits không có chữ cấm");
  ok(/Trần Công Tiến thiết kế/.test(ct), "credits có lời công khai");
  ok((await p2.locator("main li img").count()) === 11, "credits liệt kê 11 ảnh");
  await p2.screenshot({ path: path.join(shots, "credits-1440.png") });
  await c2.close();
  for (const [w, h, label] of [[1440, 900, "1440"], [390, 844, "390"]]) {
    const { ctx: c3, page: p3 } = await open({}, w, h);
    await p3.screenshot({ path: path.join(shots, `hero-${label}.png`) });
    await p3.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ["longtask"] }); });
    const total = await p3.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(h * 0.6)) { await p3.mouse.wheel(0, Math.round(h * 0.6)); await p3.waitForTimeout(90); }
    const lt = await p3.evaluate(() => window.__lt.filter((d) => d > 200).length);
    console.log(`INFO long task >200ms khi cuộn toàn trang ở ${label}: ${lt}`);
    for (const id of ["cua-hang", "doi-xe", "cung-duong", "giao-nhan", "dieu-kien", "bao-hiem", "dat-xe"]) {
      await p3.evaluate((id) => { const e = document.getElementById(id); window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 60); }, id);
      await p3.waitForTimeout(1500);
      await p3.screenshot({ path: path.join(shots, `sec-${id}-${label}.png`) });
    }
    await p3.evaluate(() => window.scrollTo(0, 0));
    await p3.waitForTimeout(700);
    await p3.screenshot({ path: path.join(shots, `full-${label}.png`), fullPage: true });
    await c3.close();
  }
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
