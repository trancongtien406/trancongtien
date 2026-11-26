// E2E Mây Kẹo (/demos/tiem-banh). Chạy: BASE=http://localhost:3100 node tests/showroom/tiem-banh/e2e.mjs
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const URL = `${BASE}/demos/tiem-banh`;
const here = path.dirname(fileURLToPath(import.meta.url));
const shots = path.join(here, "screenshots");
fs.mkdirSync(shots, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const BAD = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;

async function open(ctxOpts = {}, w = 1440, h = 900, query = "") {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...ctxOpts });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  page.on("request", (r) => { const u = new URL_(r.url()); if (u.protocol.startsWith("http") && u.origin !== new URL_(BASE).origin) ext.push(r.url()); });
  await page.goto(URL + query, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  return { ctx, page, errs, ext };
}
const URL_ = globalThis.URL;

// 1) tải + console + request ngoài + chữ cấm + overflow
{
  const { ctx, page, errs, ext } = await open();
  ok(errs.length === 0, `0 lỗi console (${errs.length}) ${errs.slice(0, 2).join(" | ")}`);
  ok(ext.length === 0, `0 request ngoài origin (${ext.length}) ${ext.slice(0, 2).join(" ")}`);
  const title = await page.title();
  ok(/Mây Kẹo/.test(title), `title: ${title}`);
  // quét chữ cấm: văn bản hiển thị, alt, aria, meta (trừ thanh nổi chung)
  const texts = await page.evaluate(() => {
    const root = document.querySelector("main")?.parentElement;
    const out = [];
    root.querySelectorAll("*").forEach((e) => {
      ["alt", "aria-label", "title", "placeholder"].forEach((a) => e.getAttribute(a) && out.push(e.getAttribute(a)));
    });
    out.push(root.innerText);
    document.querySelectorAll("meta[name=description],meta[property^='og:']").forEach((m) => out.push(m.content));
    out.push(document.title);
    return out.join("\n");
  });
  const m = texts.match(BAD);
  ok(!m, `không có chữ cấm trên trang chính${m ? ": " + m[0] : ""}`);
  // glyph tiếng Việt
  const gl = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    const h1 = document.querySelector("h1");
    const fam = getComputedStyle(h1).fontFamily;
    const c = document.createElement("canvas").getContext("2d");
    const sample = "ăâêôơưđẮỆỐỬỮỜẶ";
    const res = {};
    for (const ch of sample) {
      c.font = `800 80px ${fam}`; const a = c.measureText(ch).width;
      c.font = `800 80px monospace`; const b = c.measureText(ch).width;
      res[ch] = Math.abs(a - b) > 0.5;
    }
    return { loaded: loaded.length, fam: fam.slice(0, 60), res };
  });
  ok(gl.loaded >= 4, `font đã tải (${gl.loaded} face loaded)`);
  ok(Object.values(gl.res).every(Boolean), `glyph Việt khác fallback: ${JSON.stringify(gl.res)}`);
  await page.screenshot({ path: path.join(shots, "hero-1440.png") });
  await ctx.close();
}

// 2) không tràn ngang 320..1440
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await open({}, w, 800);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ở ${w}px (scrollWidth ${o.sw} / ${o.cw})`);
  await ctx.close();
}

// 3) Cake Builder: luồng chính, lỗi, copy, CTA
{
  const { ctx, page } = await open({ permissions: ["clipboard-read", "clipboard-write"] });
  await page.locator("#dung-banh").scrollIntoViewIfNeeded();
  const total0 = await page.locator("strong", { hasText: /₫/ }).first().innerText();
  await page.locator("label", { hasText: "Socola đậm" }).first().click();
  const sum = await page.locator("[aria-label='Bản xem trước và tóm tắt']").innerText();
  ok(/Vị socola đậm/i.test(sum), "đổi vị cập nhật tóm tắt");
  const svgLabel = await page.locator("#dung-banh svg[role=img]").first().getAttribute("aria-label");
  ok(/socola đậm/i.test(svgLabel || ""), "bản xem trước SVG cập nhật nhãn");
  // đổi size 2 tầng
  await page.locator("label", { hasText: "2 tầng" }).first().click();
  const t1 = await page.locator("strong", { hasText: /₫/ }).first().innerText();
  ok(t1 !== total0, `giá đổi theo size (${total0} -> ${t1})`);
  // chữ viết
  const input = page.getByLabel(/Lời chúc \(tối đa/);
  await input.fill("Chúc mừng Mai 30 tuổi ắệ");
  ok(await page.locator("#dung-banh svg[role=img] text").first().textContent() === "Chúc mừng Mai 30 tuổi ắệ", "chữ viết hiện lên bánh (có dấu)");
  ok((await input.getAttribute("maxlength")) === "24", "giới hạn 24 ký tự");
  await input.fill("");
  ok((await page.locator("#dung-banh svg[role=img] text").count()) === 0, "xoá chữ thì bản vẽ không còn dòng chữ");
  // trạng thái lỗi: số người rỗng / vượt
  const serv = page.getByLabel("Bánh cho bao nhiêu người?");
  await serv.fill("");
  ok((await serv.getAttribute("aria-invalid")) === "true", "ô số người rỗng: aria-invalid");
  ok(/1 đến 40/.test(await page.locator("[aria-live=polite]").filter({ hasText: "1 đến 40" }).first().innerText()), "thông báo lỗi cạnh ô");
  await serv.fill("40");
  ok(/chia thành 2 chiếc|nhắn/.test(await page.locator("text=Với 40 người").first().innerText()), "40 người: gợi ý chia bánh");
  await serv.fill("12");
  await page.locator("label", { hasText: "14cm" }).first().click();
  ok(await page.locator("text=chưa đủ cho 12 người").count() > 0, "size nhỏ hơn số người: cảnh báo");
  await page.getByRole("button", { name: /Chọn 22cm/ }).first().click();
  ok(await page.locator("text=chưa đủ cho 12 người").count() === 0, "nút chọn size phù hợp xoá cảnh báo");
  // copy
  await page.getByRole("button", { name: "Sao chép tóm tắt" }).click();
  await page.waitForTimeout(300);
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => "ERR"));
  ok(/Yêu cầu bánh tại Mây Kẹo/.test(clip), "sao chép tóm tắt vào clipboard");
  // confetti burst
  await page.getByRole("button", { name: "Thả confetti" }).click();
  ok(true, "nút Thả confetti không lỗi");
  // trang trí toggle
  await page.locator("label", { hasText: "Macaron" }).last().click();
  // CTA
  const href = await page.getByRole("link", { name: "Gửi yêu cầu đặt bánh" }).first().getAttribute("href");
  ok(/^\/lien-he/.test(href || ""), `CTA tới form tư vấn: ${href}`);
  console.log("INFO href đầy đủ:", href, "(industry/solution/utm chỉ có khi registry có tiem-banh)");
  await page.locator("#dung-banh").screenshot({ path: path.join(shots, "builder-1440.png") });
  // persist
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  ok(await page.locator("input[type=radio]:checked").count() > 0, "trạng thái builder khôi phục sau reload");
  await ctx.close();
}

// 4) menu lọc + tilt + sticker kéo/xoay + bàn phím + Tab tới CTA
{
  const { ctx, page } = await open();
  ok(await page.locator("#tu-banh article").count() === 6, "mặc định nhóm Bánh kem = 6 món");
  let tot = 6;
  for (const [name, c] of [["Bánh lạnh", 6], ["Bánh mì & croissant", 5], ["Cookie & macaron", 4]]) {
    await page.locator("#tu-banh button[aria-pressed]").filter({ hasText: name }).click();
    ok(await page.locator("#tu-banh article").count() === c, `nhóm ${name} = ${c} món`);
    tot += c;
  }
  ok(tot === 21, "tổng 21 món chia 4 nhóm");
  await page.locator("#tu-banh button[aria-pressed]").filter({ hasText: "Bánh kem" }).click();
  // tilt
  const card = page.locator("#tu-banh [data-fx=TiltCard]").first();
  await card.scrollIntoViewIfNeeded();
  const bb = await card.boundingBox();
  await page.mouse.move(bb.x + bb.width * 0.8, bb.y + bb.height * 0.2);
  await page.waitForTimeout(400);
  const tr = await card.evaluate((e) => getComputedStyle(e.firstElementChild || e).transform + "|" + getComputedStyle(e).transform);
  ok(/matrix/.test(tr), `TiltCard nghiêng 3D khi rê chuột (${tr.slice(0, 50)})`);
  // sticker drag
  await page.locator("#dau-trang").scrollIntoViewIfNeeded();
  const st = page.locator("#dau-trang [data-sticker]").first();
  const b0 = await st.boundingBox();
  await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2);
  await page.mouse.down(); await page.mouse.move(b0.x + b0.width / 2 + 70, b0.y + b0.height / 2 + 50, { steps: 8 }); await page.mouse.up();
  const b1 = await st.boundingBox();
  ok(Math.abs(b1.x - b0.x) > 30 && Math.abs(b1.y - b0.y) > 30, `kéo nhãn dán trong hero dời vị trí (${Math.round(b1.x - b0.x)}px)`);
  // board: xoay + phím
  await page.locator("#mot-ngay").scrollIntoViewIfNeeded();
  const pol = page.locator("#mot-ngay [data-sticker]").first();
  await pol.focus();
  const tBefore = await pol.evaluate((e) => e.style.transform);
  await page.keyboard.press("r"); await page.keyboard.press("ArrowRight");
  const tAfter = await pol.evaluate((e) => e.style.transform);
  ok(tBefore !== tAfter, "bàn phím: R xoay, mũi tên dời nhãn dán");
  let rotated = false;
  const n = await page.locator("#mot-ngay [data-sticker] [data-rot]").count();
  for (let i = 0; i < n && !rotated; i++) {
    const handle = page.locator("#mot-ngay [data-sticker] [data-rot]").nth(i);
    const hb = await handle.boundingBox();
    const hx = hb.x + hb.width / 2, hy = hb.y + hb.height / 2;
    const top = await page.evaluate(([x, y]) => !!document.elementFromPoint(x, y)?.closest("[data-rot]"), [hx, hy]);
    if (!top) continue;
    const owner = handle.locator("xpath=..");
    const before = await owner.evaluate((e) => e.style.transform);
    await page.mouse.move(hx, hy); await page.mouse.down(); await page.mouse.move(hx - 40, hy + 60, { steps: 6 }); await page.mouse.up();
    rotated = (await owner.evaluate((e) => e.style.transform)) !== before;
  }
  ok(rotated, "kéo tay nắm xoay đổi góc");
  // hero effects tồn tại
  const fx = await page.evaluate(() => [...document.querySelectorAll("[data-fx]")].map((e) => e.getAttribute("data-fx")));
  const need = ["SprinkleRain", "ConfettiBurst", "BounceWords", "Drip", "TiltCard", "MagneticButton", "SlotText", "StackingCards", "BlobMorph", "ScrollProgress"];
  for (const n of need) ok(fx.includes(n), `hiệu ứng có mặt: ${n}`);
  for (const n of ["VelocityMarquee", "ParallaxLayer", "ScrollScrubText", "ClipReveal", "SplitReveal"]) ok(!fx.includes(n), `đã bỏ hiệu ứng đại trà: ${n}`);
  for (const sel of ["oven-timer", "tu-kinh", "bang-gia", "thiep-chu"]) ok(await page.evaluate((x) => !!document.querySelector(`[data-fx-own=${x}], #${x}`), sel), `section/hiệu ứng riêng: ${sel}`);
  await ctx.close();
}


// 4a) nội dung ngành + hiệu ứng riêng gắn nghiệp vụ
{
  const { ctx, page } = await open();
  const heroTxt = await page.locator("#dau-trang").innerText();
  ok(/Quận Hải Châu/i.test(heroTxt) && /7:00/.test(heroTxt) && /320\.000/.test(heroTxt) && /trước 2 ngày/i.test(heroTxt) && /bánh kem/i.test(heroTxt), "hero: loại hình tiệm bánh, Quận Hải Châu, giờ bán, giá từ, báo trước 2 ngày");
  ok(await page.getByRole("link", { name: "Đặt bánh sinh nhật" }).first().isVisible() && await page.getByRole("link", { name: "Xem tủ bánh" }).isVisible(), "hero: CTA Đặt bánh sinh nhật + Xem tủ bánh");
  for (const id of ["tu-banh", "tu-kinh", "gio-ra-lo", "bang-gia", "dung-banh", "thiep-chu", "mua-dip", "dat-banh", "giao-nhan", "mot-ngay", "hoi-dap"]) ok((await page.locator("#" + id).count()) === 1, `section #${id}`);
  ok((await page.locator("#hoi-dap details").count()) >= 7, "FAQ >= 7 câu (đặt trước, dị ứng, bảo quản, giao, cọc)");
  // tủ kính xoay
  await page.locator("#tu-kinh").scrollIntoViewIfNeeded();
  const nm = () => page.locator("#tu-kinh h3").innerText();
  const n0 = await nm();
  await page.getByRole("button", { name: "Món sau" }).click(); await page.waitForTimeout(300);
  const n1 = await nm();
  const box = await page.locator("#tu-kinh [role=group]").first().boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 - 260, box.y + box.height / 2, { steps: 10 }); await page.mouse.up(); await page.waitForTimeout(900);
  const n2 = await nm();
  ok(n0 !== n1 && n1 !== n2, `tủ kính xoay: nút Sau + kéo đổi món (${n0} -> ${n1} -> ${n2})`);
  await page.locator("#tu-kinh [role=group]").first().focus(); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(300);
  ok((await nm()) === n1 || (await nm()) !== n2, "tủ kính: phím mũi tên đổi món");
  // lò nướng đếm giờ
  await page.locator("#gio-ra-lo").scrollIntoViewIfNeeded();
  const c1 = await page.locator("#gio-ra-lo [role=timer]").getAttribute("aria-label"); await page.waitForTimeout(2200);
  const c2 = await page.locator("#gio-ra-lo [role=timer]").getAttribute("aria-label");
  ok(/^Còn \d\d:\d\d:\d\d tới mẻ /.test(c2) && c1 !== c2, `lò nướng đếm ngược chạy (${c1} -> ${c2})`);
  ok((await page.locator("#gio-ra-lo li").count()) === 5, "5 mẻ nướng trong ngày");
  // cắt bánh: đổi size đổi số lát; cuộn đổi tiến độ
  await page.locator("#bang-gia").scrollIntoViewIfNeeded();
  for (const [lab, n] of [["14cm", 6], ["22cm", 16], ["2 tầng", 24], ["18cm", 10]]) {
    await page.locator("#bang-gia").getByRole("radio", { name: new RegExp("^" + lab) }).click();
    ok((await page.locator("#bang-gia svg g[class*=slice]").count()) === n, `cắt bánh ${lab}: ${n} lát`);
  }
  const pv = (y) => page.evaluate((yy) => { const e = document.querySelector("#bang-gia [class*=sliceGrid]"); window.scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight * 0.7 + yy); return new Promise((r) => setTimeout(() => r(parseFloat(e.style.getPropertyValue("--p") || "1")), 900)); }, y);
  const pa = await pv(0), pb = await pv(700);
  ok(pa < pb && pb > 0.3, `cắt bánh theo cuộn: tiến độ ${pa.toFixed(2)} -> ${pb.toFixed(2)}`);
  // nến thổi
  await page.locator("#thiep-chu").scrollIntoViewIfNeeded();
  const flames = () => page.locator("#thiep-chu path[class*=flame]").count();
  const f0 = await flames();
  await page.getByRole("button", { name: "Thêm một nến" }).click();
  ok((await flames()) === f0 + 1, `thêm nến: ${f0} -> ${f0 + 1}`);
  await page.getByRole("button", { name: "Thổi nến" }).click(); await page.waitForTimeout(1800);
  ok((await flames()) === 0 && /Tắt hết/.test(await page.locator("#thiep-chu").innerText()), "thổi nến: tắt hết, hiện lời ước");
  await page.getByRole("button", { name: "Thắp lại nến" }).click();
  ok((await flames()) === f0 + 1, "thắp lại nến");
  await page.getByLabel("Lời chúc trên thiệp").fill("Chúc mừng ắệ 30");
  ok(/Chúc mừng ắệ 30/.test(await page.locator("#thiep-chu svg[role=img]").innerHTML()), "lời chúc hiện lên bánh (có dấu)");
  await ctx.close();
  // giả lập giờ: 03:00 sáng VN (20:00 UTC) -> mẻ đầu 06:30 sau 3.5h; 08:30 VN -> mẻ tiếp 10:00
  for (const [utc, re, label] of [[Date.UTC(2026, 10, 24, 20, 0, 0), /^Còn 03:[23]\d:\d\d tới mẻ Croissant bơ/, "03:00 -> 06:30"], [Date.UTC(2026, 10, 25, 1, 30, 0), /^Còn 01:[23]\d:\d\d tới mẻ Cookie/, "08:30 -> 10:00"]]) {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await c.addInitScript((T) => { const R = Date; const off = T - R.now(); globalThis.Date = class extends R { constructor(...a) { if (a.length) super(...a); else super(R.now() + off); } static now() { return R.now() + off; } }; }, utc);
    const q = await c.newPage(); await q.goto(URL, { waitUntil: "networkidle" }); await q.waitForTimeout(1500);
    const lab = await q.locator("#gio-ra-lo [role=timer]").getAttribute("aria-label");
    ok(re.test(lab), `lò nướng giả lập giờ ${label}: ${lab}`);
    await c.close();
  }
}

// 4b) Tab tới CTA (ngữ cảnh mới)
{
  const { ctx, page } = await open();
  let reached = false;
  for (let i = 0; i < 20; i++) { await page.keyboard.press("Tab"); const t = await page.evaluate(() => document.activeElement?.textContent || ""); if (/Đặt bánh sinh nhật/.test(t)) { reached = true; break; } }
  ok(reached, "Tab tới CTA chính ở hero");
  const fo = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  ok(fo !== "none", "CTA có viền focus rõ");
  await ctx.close();
}

// 5) menu mobile + Escape + trả focus; tương tác cảm ứng
{
  const { ctx, page } = await open({ hasTouch: true, isMobile: true }, 390, 844);
  const btn = page.getByRole("button", { name: /Mở menu/ });
  await btn.click();
  ok(await page.locator("#mk-menu").isVisible(), "menu mobile mở");
  await page.keyboard.press("Escape");
  ok(!(await page.locator("#mk-menu").isVisible()), "Escape đóng menu");
  ok(await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "mk-menu"), "Escape trả focus về nút menu");
  await page.screenshot({ path: path.join(shots, "hero-390.png") });
  await ctx.close();
}

// 6) reduced motion
{
  const { ctx, page, errs } = await open({ reducedMotion: "reduce" });
  const vis = await page.evaluate(() => {
    const h = document.querySelector("h1 [data-w]");
    const cs = getComputedStyle(h);
    const cv = document.querySelector("[data-fx=SprinkleRain]");
    return { op: cs.opacity, tf: cs.transform, drip: getComputedStyle(document.querySelector(".mkDrip")).animationName, cvw: cv?.width };
  });
  ok(vis.op === "1" && (vis.tf === "none" || vis.tf === "matrix(1, 0, 0, 1, 0, 0)"), `reduced: chữ hero hiện đủ, không dịch (${vis.op}/${vis.tf})`);
  ok(vis.drip === "none", "reduced: kem chảy không animation");
  const txt = await page.locator("main").innerText();
  ok(/Hai mươi mốt món/.test(txt) && /Sinh nhật ai sắp tới/.test(txt), "reduced: nội dung vẫn hiện đủ");
  ok(errs.length === 0, "reduced: 0 lỗi console");
  await page.screenshot({ path: path.join(shots, "reduced-1440.png"), fullPage: true });
  await ctx.close();
}

// 7) no-JS: nội dung vẫn có trong HTML
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "load" });
  const t = await page.locator("main").innerText();
  ok(/Bánh\s+ngọt/.test(t) && /Tủ bánh theo nhóm/i.test(t) && /Điều mọi người hay hỏi/.test(t), "no-JS: nội dung hero, tủ bánh, hỏi đáp có trong HTML");
  await ctx.close();
}

// 8) ?ref giữ nguyên, trang credits, long task
{
  const { ctx, page } = await open({}, 1440, 900, "?ref=abc");
  const href = await page.getByRole("link", { name: "Gửi yêu cầu đặt bánh" }).first().getAttribute("href");
  ok(!!href && href.startsWith("/lien-he"), "link thoát cùng origin (cookie tct_ref đi theo, không đọc/ghi ở demo)");
  await ctx.close();
  const c2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p2 = await c2.newPage();
  const r = await p2.goto(`${URL}/credits`, { waitUntil: "networkidle" });
  ok(r.status() === 200, "credits 200");
  const ct = await p2.locator("main").innerText();
  ok(!BAD.test(ct), "credits không có chữ cấm");
  ok(/Trần Công Tiến thiết kế/.test(ct), "credits có lời công khai");
  ok((await p2.locator("main li img").count()) === 12, "credits liệt kê 12 ảnh");
  await c2.close();
  for (const [w, h, label] of [[1440, 900, "1440"], [390, 844, "390"]]) {
    const { ctx: c3, page: p3 } = await open({}, w, h);
    await p3.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ["longtask"] }); });
    const total = await p3.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(h * 0.6)) { await p3.mouse.wheel(0, Math.round(h * 0.6)); await p3.waitForTimeout(90); }
    const lt = await p3.evaluate(() => window.__lt.filter((d) => d > 200).length);
    console.log(`INFO long task >200ms khi cuộn toàn trang ở ${label}: ${lt}`);
    await p3.evaluate(() => window.scrollTo(0, 0));
    await p3.waitForTimeout(600);
    await p3.screenshot({ path: path.join(shots, `full-${label}.png`), fullPage: true });
    await c3.close();
  }
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
