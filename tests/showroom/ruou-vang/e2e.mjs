import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = BASE + "/demos/ruou-vang";
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const origin = new URL(BASE).origin;
const BAN = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;
const BRANDS = /\b(opus one|penfolds|château|chateau|moët|moet|dom p[eé]rignon|veuve|robert mondavi|antinori|torres|concha|santa rita|barefoot|yellow tail|casillero|jacob'?s creek|lamarca|mionetto|cloudy bay)\b/i;

async function open(vp, opts = {}) {
  const ctx = opts.ctx || (await b.newContext({ viewport: vp, reducedMotion: opts.reduced ? "reduce" : "no-preference", javaScriptEnabled: opts.nojs ? false : true, permissions: ["clipboard-read", "clipboard-write"], hasTouch: vp.width < 800, isMobile: vp.width < 800 && !opts.nomobile }));
  const p = await ctx.newPage();
  p.errs = []; p.ext = []; p.longs = 0;
  p.on("console", (m) => { if (m.type() === "error") p.errs.push(m.text()); });
  p.on("pageerror", (e) => p.errs.push(String(e)));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(origin) && !u.startsWith("data:") && !u.startsWith("blob:")) p.ext.push(u); });
  await p.goto(opts.url || PAGE, { waitUntil: opts.nowait ? "commit" : "networkidle" });
  if (!opts.nowait) await p.waitForTimeout(opts.settle ?? 3200);
  return p;
}
const visibleText = (p) => p.evaluate(() => {
  const parts = [document.title, ...[...document.querySelectorAll("meta[name=description],meta[property='og:title'],meta[property='og:description']")].map((m) => m.content)];
  const root = document.querySelector("main")?.parentElement ?? document.body;
  parts.push(root.innerText);
  root.querySelectorAll("[alt],[aria-label],[title]").forEach((e) => parts.push(e.getAttribute("alt") || "", e.getAttribute("aria-label") || "", e.getAttribute("title") || ""));
  return parts.join("\n");
});
const css = (p, sel, prop) => p.evaluate(([s, pr]) => { const e = document.querySelector(s); return e ? getComputedStyle(e)[pr] : null; }, [sel, prop]);

// ================= desktop: nạp trang, font, chữ cấm
let p = await open({ width: 1440, height: 900 });
ok(p.errs.length === 0, `0 lỗi console (${p.errs.length}) ${p.errs.slice(0, 2).join(" | ")}`);
ok(p.ext.length === 0, `0 request ngoài origin (${p.ext.length}) ${p.ext.slice(0, 2).join(",")}`);
ok((await p.title()).includes("Mộc Vang"), "title riêng");
ok(await p.evaluate(() => document.querySelector("meta[name=robots]")?.content.includes("noindex")), "noindex kế thừa");
ok((await p.locator("h1").count()) === 1, "đúng 1 h1");
const fonts = await p.evaluate(async () => {
  await document.fonts.ready;
  const probe = "ă â ê ô ơ ư đ Ắ Ằ Ẳ Ẵ Ặ Ấ Ầ Ẩ Ẫ Ậ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự";
  const c = document.createElement("canvas").getContext("2d");
  const h = getComputedStyle(document.querySelector("h1")).fontFamily;
  const bd = getComputedStyle(document.querySelector("main p")).fontFamily;
  const w = (f, t, wt = 500) => { c.font = `${wt} 40px ${f}`; return c.measureText(t).width; };
  const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + " " + f.style);
  return { hDiff: Math.abs(w(h, probe) - w("monospace", probe)), bDiff: Math.abs(w(bd, probe) - w("monospace", probe)), hR: w(h, "Ệ") / w(h, "E"), bR: w(bd, "Ử", 700) / w(bd, "U", 700), loaded, h: h.slice(0, 50) };
});
ok(fonts.loaded.length >= 3, `font đã nạp (${fonts.loaded.length}: ${fonts.loaded.join(", ").slice(0, 120)})`);
ok(fonts.hDiff > 5 && fonts.bDiff > 5, `glyph Việt đo được (h ${fonts.hDiff.toFixed(0)}, b ${fonts.bDiff.toFixed(0)})`);
ok(fonts.hR < 1.2 && fonts.bR < 1.2, `Ệ/Ử không tách dấu (${fonts.hR.toFixed(2)}, ${fonts.bR.toFixed(2)})`);
// pixel: vẽ chữ đậm cỡ lớn, so với khi thiếu glyph (canvas đo bề cao dấu không bị cắt)
const cut = await p.evaluate(() => {
  const c = document.createElement("canvas"); c.width = 900; c.height = 160; const x = c.getContext("2d");
  x.font = "700 80px " + getComputedStyle(document.querySelector("h1")).fontFamily; x.fillStyle = "#000"; x.textBaseline = "alphabetic"; x.fillText("ỐẾỂỆỢỬỮ", 10, 130);
  const d = x.getImageData(0, 0, 900, 4).data; let top = 0; for (let i = 3; i < d.length; i += 4) top += d[i]; return top;
});
ok(cut === 0, `dấu chồng (Ố Ế Ể Ệ Ợ Ử Ữ) không bị cắt đỉnh canvas (${cut})`);
let txt = await visibleText(p);
ok(!BAN.test(txt), "không chữ cấm (trang ban đầu)" + (BAN.test(txt) ? " -> " + txt.match(BAN)[0] : ""));
ok(!BRANDS.test(txt), "không tên nhà sản xuất/nhãn rượu thật");
ok(/18 tuổi/.test(txt), "có cảnh báo 'từ 18 tuổi'");
ok(!/(tốt cho sức khoẻ|tốt cho sức khỏe|chữa|giảm cân|tim mạch|bổ)/i.test(txt), "không khẳng định công dụng sức khoẻ");

// hiệu ứng khởi chạy
const fx = await p.evaluate(() => {
  const cs = (e) => (e ? getComputedStyle(e) : null);
  const q = (s) => document.querySelector(s);
  const ready = (n) => [...document.querySelectorAll(`[data-fx=${n}]`)].map((e) => e.getAttribute("data-fx-ready"));
  return {
    split: ready("SplitReveal"), grain: ready("GrainOverlay"), canvas: ready("CanvasParticles"), clip: ready("ClipReveal"), gal: ready("DraggableGallery"), scrub: ready("ScrollScrubText"), marq: ready("VelocityMarquee"), par: ready("ParallaxLayer"), mag: ready("MagneticButton"), spot: ready("CursorSpotlight"),
    flame: [...document.querySelectorAll("[class*=flameOuter]")].some((e) => /Flame/i.test(cs(e).animationName)),
    flame2: [...document.querySelectorAll("[class*=flameInner]")].some((e) => /Flame/i.test(cs(e).animationName)),
    halo: [...document.querySelectorAll("[class*=candleHalo]")].some((e) => /Halo/i.test(cs(e).animationName)),
    candles: document.querySelectorAll("svg[class*=candle]").length,
    lampCone: !!q("[class*=cone]"), frame: !!q("[class*=frame]"),
    pour: q("[data-rv=pour]")?.getAttribute("data-live"),
    stream: !!q("[data-rv=stream]"),
    vignette: !!q("[class*=vignette]"), spotEl: !!q("[data-rv=spot]"),
  };
});
ok(fx.split.length >= 6 && fx.split.every((v) => v === "1"), `SplitWords khởi chạy (${fx.split.length} gốc, ready=${[...new Set(fx.split)]})`);
ok(fx.grain.length === 1 && fx.canvas.length >= 1 && fx.clip.length >= 1 && fx.gal.length === 1 && fx.scrub.length === 1 && fx.marq.length === 1 && fx.par.length === 1 && fx.mag.length >= 2, `thư viện: Grain/Canvas/ClipReveal/Gallery/ScrubText/Marquee/Parallax/Magnetic có mặt (${JSON.stringify({ g: fx.grain, c: fx.canvas, cl: fx.clip, ga: fx.gal, sc: fx.scrub, m: fx.marq, pa: fx.par, mag: fx.mag.length })})`);
ok(fx.flame && fx.flame2 && fx.halo && fx.candles >= 3, `nến SVG nhấp nháy: 2 lớp lửa + quầng (${fx.candles} ngọn)`);
ok(fx.lampCone && fx.frame, "hero: đèn rọi + khung tranh");
ok(fx.vignette && fx.spotEl, "vignette cố định + lớp ánh nến theo con trỏ");
ok(fx.pour === "1" && fx.stream, "đường rượu rót (SVG pour line) đã kích hoạt");

// ================= rèm nhung
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const q = await ctx.newPage();
  await q.addInitScript(() => {
    window.__ph = [];
    new MutationObserver(() => {
      const e = document.querySelector("[data-rv=curtain]");
      const v = e ? e.getAttribute("data-phase") : "gone";
      const l = window.__ph[window.__ph.length - 1];
      if (v === "gone" && !l) return;
      if (!l || l[0] !== v) window.__ph.push([v, performance.now()]);
    }).observe(document, { subtree: true, childList: true, attributes: true });
  });
  await q.goto(PAGE, { waitUntil: "networkidle" });
  await q.waitForTimeout(1500);
  const ph = await q.evaluate(() => window.__ph);
  const names = ph.map((x) => x[0]);
  ok(names[0] === "closed", "rèm nhung xuất hiện sau hydrate");
  ok(names.includes("open") && names[names.length - 1] === "gone", `rèm đi qua đóng -> mở -> gỡ (${names.join(">")})`);
  const dur = ph.length ? ph[ph.length - 1][1] - ph[0][1] : 99999;
  ok(dur <= 1250, `rèm tổng ≤1,2 s (đo ${dur.toFixed(0)} ms)`);
  ok(await q.locator("h1").isVisible(), "hero hiện sau rèm");
  // không lặp lần 2 cùng phiên
  const q2 = q;
  await q2.reload({ waitUntil: "networkidle" }); await q2.waitForTimeout(500);
  ok((await q2.locator("[data-rv=curtain]").count()) === 0, "oncePerSession: tải lại cùng phiên không có rèm");
  // bỏ qua bằng phím
  const ctx3 = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const q3 = await ctx3.newPage();
  await q3.goto(PAGE, { waitUntil: "commit" });
  await q3.waitForSelector("[data-rv=curtain]", { timeout: 15000 });
  await q3.keyboard.press("Space");
  await q3.waitForTimeout(150);
  ok((await q3.locator("[data-rv=curtain]").count()) === 0, "bỏ qua rèm bằng phím");
  await ctx.close(); await ctx3.close();
  // reduced motion: không rèm
  const r = await open({ width: 1440, height: 900 }, { reduced: true, nowait: true });
  await r.waitForTimeout(2500);
  ok((await r.locator("[data-rv=curtain]").count()) === 0, "reduced-motion: không có rèm");
  await r.context().close();
}

// ================= no-JS
{
  const n = await open({ width: 1280, height: 800 }, { nojs: true, settle: 500 });
  ok((await n.locator("h1").innerText()).includes("Chậm lại"), "no-JS: h1 có chữ");
  ok(await n.locator("h1").isVisible(), "no-JS: h1 hiện");
  ok((await n.locator("[data-rv=curtain]").count()) === 0, "no-JS: không rèm chặn");
  ok((await n.locator("a", { hasText: "Đặt bàn tối nay" }).isVisible()), "no-JS: nút CTA hiện");
  ok(((await n.locator("[class*=stream]").first().evaluate((e) => getComputedStyle(e).strokeDashoffset))) !== "1px", "no-JS: đường rượu hiện đủ");
  await n.context().close();
}

// ================= ánh nến theo con trỏ
await p.mouse.move(400, 400); await p.mouse.move(520, 380, { steps: 4 }); await p.waitForTimeout(250);
const spotSt = await p.evaluate(() => { const e = document.querySelector("[data-rv=spot]"); return { on: e.dataset.on, x: e.style.getPropertyValue("--x") }; });
ok(spotSt.on === "1" && /520/.test(spotSt.x), `spotlight theo con trỏ (x=${spotSt.x})`);

// ================= pour theo cuộn
{
  const box = await p.evaluate(() => { const r = document.getElementById("rot").getBoundingClientRect(); return { top: r.top + scrollY, h: r.height }; });
  const read = () => p.evaluate(() => ({ off: document.querySelector("[data-rv=stream]").style.strokeDashoffset, y: document.querySelector("[data-rv=fill]").getAttribute("y"), lv: document.querySelector("[data-rv=level]").textContent, on: [...document.querySelectorAll("[data-rv=step]")].findIndex((e) => e.hasAttribute("data-on")) }));
  const seq = [];
  for (const f of [0.05, 0.25, 0.55, 0.8, 0.95]) { await p.evaluate((y) => window.scrollTo(0, y), box.top + box.h * f - 360); await p.waitForTimeout(800); seq.push(await read()); }
  ok(seq[0].off === "1" || parseFloat(seq[0].off) > 0.4, `pour: đầu cuộn đường rượu chưa vẽ (offset ${seq[0].off})`);
  ok(parseFloat(seq[1].off) < parseFloat(seq[0].off), `pour: vẽ dần (${seq.map((s) => parseFloat(s.off).toFixed(2)).join(" > ")})`);
  ok(+seq[2].lv > +seq[1].lv && +seq[3].lv > +seq[2].lv, `pour: ly dâng đầy theo cuộn (${seq.map((s) => s.lv + "%").join(" ")})`);
  ok(parseFloat(seq[2].y) < parseFloat(seq[1].y), "pour: mực rượu (y) tăng");
  ok(seq[0].on !== seq[3].on && seq[3].on >= 2, `pour: bước sáng đổi (${seq.map((s) => s.on).join(",")})`);
}

// ================= xoay ly
{
  await p.evaluate(() => document.getElementById("xoay-ly").scrollIntoView({ block: "center" })); await p.waitForTimeout(600);
  const g = p.locator("[class*=swirlGlass]");
  const bb = await g.boundingBox();
  const val = () => p.locator("[role=progressbar][aria-label='Vang đã thở']").getAttribute("aria-valuenow");
  await g.focus(); const v2a = +(await val());
  for (let i = 0; i < 6; i++) { await p.keyboard.press("ArrowRight"); await p.waitForTimeout(150); }
  const v2 = +(await val());
  ok(v2 > v2a, `swirl: phím ← → xoay được (${v2a} -> ${v2}%)`);
  const v0 = v2;
  await p.waitForTimeout(3500);
  await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 3);
  await p.mouse.down();
  for (let i = 0; i < 40; i++) { await p.mouse.move(bb.x + bb.width / 2 + (i % 2 ? 60 : -60), bb.y + bb.height / 3, { steps: 2 }); await p.waitForTimeout(40); }
  const tf = await p.evaluate(() => document.querySelector("[class*=swirlGlass] g[clip-path] g")?.getAttribute("transform"));
  await p.mouse.up();
  await p.waitForTimeout(500);
  const v1 = +(await val());
  ok(v1 >= v0 && v1 > 20, `swirl: kéo ngang làm 'vang thở' đầy dần (${v0} -> ${v1}%)`);
  ok(tf && /skewX/.test(tf), `swirl: mặt vang lắc theo (${tf})`);
  await p.waitForTimeout(7000);
  const muts = await p.evaluate(() => new Promise((res) => { let n = 0; const mo = new MutationObserver((l) => { n += l.length; }); mo.observe(document.querySelector("[class*=swirlGlass] svg"), { attributes: true, subtree: true }); setTimeout(() => { mo.disconnect(); res(n); }, 1200); }));
  ok(muts === 0, `swirl: vòng rAF dừng khi hết năng lượng (${muts} thay đổi DOM trong 1,2 s)`);
}

// ================= nhãn chai lật + thực đơn
{
  await p.evaluate(() => document.getElementById("bon-loi").scrollIntoView({ block: "center" })); await p.waitForTimeout(500);
  const front = p.locator("button[class*=labFront]").first();
  ok((await front.getAttribute("aria-expanded")) === "false", "nhãn: ban đầu chưa lật");
  await front.click(); await p.waitForTimeout(1000);
  ok((await front.getAttribute("aria-expanded")) === "true", "nhãn: bấm lật (aria-expanded=true)");
  const backVisible = await p.evaluate(() => { const e = document.getElementById("rv-lab-do"); return getComputedStyle(e).visibility; });
  ok(backVisible === "visible", "nhãn: mặt sau hiện");
  await p.locator("#rv-lab-do button", { hasText: "Xem đỏ trong thực đơn" }).click(); await p.waitForTimeout(900);
  ok((await p.locator("#rv-tab-do").getAttribute("aria-selected")) === "true", "nhãn -> thực đơn: tab Vang đỏ được chọn");
  await p.locator("#rv-tab-sui").click();
  ok((await p.locator("#rv-panel li").count()) === 2, "thực đơn: tab Sủi có 2 mục");
  await p.locator("#rv-tab-sui").focus(); await p.keyboard.press("Home");
  ok((await p.locator("#rv-tab-do").getAttribute("aria-selected")) === "true", "thực đơn: phím Home về tab đầu");
  await p.keyboard.press("ArrowRight");
  ok((await p.locator("#rv-tab-trang").getAttribute("aria-selected")) === "true", "thực đơn: phím → chuyển tab");
  let total = 0;
  for (const k of ["do", "trang", "hong", "sui"]) { await p.locator(`#rv-tab-${k}`).click(); total += await p.locator("#rv-panel li").count(); }
  ok(total === 14, `thực đơn: tổng 14 ly/chai (${total})`);
  const shots = await p.evaluate(() => [...document.querySelectorAll("[class*=menuShot]")].map((e) => [e.dataset.on, e.getAttribute("aria-hidden")]));
  ok(shots.filter((s) => s[0] != null).length === 1 && shots.filter((s) => s[1] === "false").length === 1, "thực đơn: ảnh crossfade chỉ một ảnh active/không bị đọc ẩn");
  const menuText = await p.locator("#thuc-don").innerText();
  ok(!BRANDS.test(menuText) && !/\b(Château|Domaine)\b/.test(menuText), "thực đơn: tên theo phong cách, không nhãn hiệu");
  await front.click({ force: true }).catch(() => {});
}

// ================= Pairing Finder
{
  await p.evaluate(() => document.getElementById("chon-vang").scrollIntoView({ block: "start" })); await p.waitForTimeout(500);
  const submit = p.locator("button", { hasText: "Tìm ba gợi ý" });
  await submit.click();
  ok(await p.locator("#rv-food-err").isVisible(), "finder: trạng thái lỗi khi chưa chọn món");
  ok(await p.locator("[class*=emptyTitle]").isVisible(), "finder: trạng thái rỗng khi chưa có gợi ý");
  await p.locator("button[class*=chip]", { hasText: "Bò, thịt nướng" }).click();
  await p.locator("label", { hasText: "Đậm" }).first().click();
  await p.locator("label", { hasText: /^Đỏ$/ }).first().click().catch(() => {});
  await submit.click(); await p.waitForTimeout(500);
  const names = await p.locator("[class*=resultName]").allInnerTexts();
  ok(names.length === 3, `finder: 3 gợi ý (${names.join(" | ")})`);
  ok(names.every((n) => /kiểu/i.test(n)) && !BRANDS.test(names.join(" ")), "finder: theo phong cách 'kiểu ...', không tên nhà sản xuất");
  ok(/Cabernet|Malbec|Syrah|Bordeaux/.test(names[0]), `finder: bò + đậm -> đỏ đậm đứng đầu (${names[0]})`);
  const prices = await p.locator("[class*=resultPrice]").first().innerText();
  ok(/Giá tham khảo/.test(prices), "finder: ghi 'Giá tham khảo'");
  // hải sản + trắng + khô + ngân sách thấp
  await p.locator("button[class*=chip]", { hasText: "Bò, thịt nướng" }).click();
  await p.locator("button[class*=chip]", { hasText: "Hải sản" }).click();
  await p.locator("label", { hasText: /^Trắng$/ }).click();
  await p.locator("label", { hasText: /^Nhẹ$/ }).click();
  await p.selectOption("#rv-budget", "b1");
  await submit.click(); await p.waitForTimeout(400);
  const n2 = await p.locator("[class*=resultName]").allInnerTexts();
  ok(/Sauvignon|Grigio/.test(n2[0]), `finder: hải sản + trắng nhẹ -> ${n2[0]}`);
  // ngân sách quá thấp cho đỏ đậm: phải gắn cờ vượt ngân sách
  await p.locator("button[class*=chip]", { hasText: "Hải sản" }).click();
  await p.locator("button[class*=chip]", { hasText: "Bò, thịt nướng" }).click();
  await p.locator("label", { hasText: /^Đỏ$/ }).first().click();
  await p.locator("label", { hasText: /^Đậm$/ }).first().click();
  await submit.click(); await p.waitForTimeout(400);
  ok((await p.locator("[class*=resultPrice] em").count()) >= 1, "finder: cờ 'vượt ngân sách' khi ngân sách thấp");
  await p.locator("button", { hasText: "Làm lại" }).click();
  ok(await p.locator("[class*=emptyTitle]").isVisible(), "finder: Làm lại về trạng thái rỗng");
  // sủi
  await p.locator("button[class*=chip]", { hasText: "Tráng miệng" }).click();
  await p.locator("label", { hasText: /^Sủi$/ }).click();
  await submit.click(); await p.waitForTimeout(400);
  const n3 = await p.locator("[class*=resultName]").allInnerTexts();
  ok(/Sủi/.test(n3[0]), `finder: tráng miệng + sủi -> ${n3[0]}`);
  await p.locator("button", { hasText: "Thêm vào bàn" }).first().click();
  ok((await p.locator("button[aria-pressed=true]", { hasText: "Đã thêm vào bàn" }).count()) === 1, "finder: thêm vào bàn");
  const t = await visibleText(p);
  ok(!BAN.test(t), "không chữ cấm (sau khi dùng công cụ)");
}

// ================= Tóm tắt đặt bàn
{
  await p.locator("#dat-ban").scrollIntoViewIfNeeded();
  await p.locator("button", { hasText: "Tạo tóm tắt" }).click();
  ok(await p.locator("#rv-date-err").isVisible() && await p.locator("#rv-time-err").isVisible(), "đặt bàn: lỗi cạnh ô khi thiếu ngày/giờ");
  ok((await p.locator("#rv-date").getAttribute("aria-invalid")) === "true", "đặt bàn: aria-invalid + aria-describedby");
  await p.locator("button[aria-label='Tăng số khách']").click();
  const guests = await p.locator("[class*=stepper] output").innerText();
  ok(guests === "3", "đặt bàn: stepper khách");
  await p.fill("#rv-date", "2020-01-01"); await p.selectOption("#rv-time", "19:30");
  await p.locator("button", { hasText: "Tạo tóm tắt" }).click();
  ok(/đã qua/.test(await p.locator("#rv-date-err").innerText()), "đặt bàn: ngày quá khứ bị chặn");
  const d = new Date(Date.now() + 5 * 864e5); const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  await p.fill("#rv-date", iso);
  await p.locator("button", { hasText: "Tạo tóm tắt" }).click(); await p.waitForTimeout(300);
  const sum = await p.locator("[class*=summaryText]").innerText();
  ok(/Số khách: 3/.test(sum) && /19:30/.test(sum) && /Muốn thử: Sủi/.test(sum), `đặt bàn: tóm tắt đúng (${sum.replace(/\n/g, " / ").slice(0, 120)})`);
  await p.locator("button", { hasText: "Sao chép tóm tắt" }).click(); await p.waitForTimeout(300);
  const clip = await p.evaluate(() => navigator.clipboard.readText()).catch(() => "");
  ok(clip === sum, "đặt bàn: sao chép vào clipboard");
  const href = await p.locator("a", { hasText: "Gửi yêu cầu đặt bàn" }).getAttribute("href");
  ok(href.startsWith("/lien-he"), `CTA cuối dẫn tới form tư vấn (${href})`);
  if (/industry=/.test(href)) ok(/solution=fnb/.test(href) && /utm_campaign=ruou-vang/.test(href) && /utm_source=showroom/.test(href), "link thoát có industry/solution/utm_campaign đúng");
  else console.log("WARN link thoát chưa có industry/solution: registry chưa đồng bộ slug ruou-vang (điều phối viên chạy scripts/showroom-registry-sync.mjs)");
  ok(/chưa có yêu cầu nào được gửi/.test(await p.locator("#dat-ban").innerText()), "đặt bàn: không khẳng định đã gửi");
}

// ================= Tab tới CTA, FAQ, credits
{
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
  let hit = false;
  await p.evaluate(() => { document.activeElement?.blur(); const s = document.querySelector("a[href=\"#main\"]"); s.focus(); s.blur(); document.getElementById("main").setAttribute("tabindex", "-1"); document.getElementById("main").focus(); });
  for (let i = 0; i < 14; i++) { await p.keyboard.press("Tab"); const t = await p.evaluate(() => document.activeElement?.textContent?.trim()); if (t && /Đặt bàn tối nay/i.test(t)) { hit = true; break; } }
  ok(hit, "Tab tới được CTA hero");
  const outline = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  ok(outline !== "none", "focus-visible rõ");
  const d = p.locator("details").first(); await d.locator("summary").click();
  ok(await d.evaluate((e) => e.open), "FAQ mở được");
  const cr = await p.request.get(PAGE + "/credits");
  ok(cr.status() === 200, "trang credits 200");
  const ct = await cr.text(); ok(!BAN.test(ct.replace(/<[^>]+>/g, " ").replace(/\/images\/demos\//g, "")), "credits không chữ cấm");
  ok(/Trần Công Tiến/.test(ct) && /Pexels/.test(ct), "credits: lời công khai + nguồn ảnh");
  const foot = await p.locator("footer").innerText();
  ok(/Ảnh & ghi công/.test(foot) && /Trần Công Tiến/.test(foot) && !/@(gmail|yahoo)|0\d{9}/.test(foot), "footer: link credits + ký tên, không liên hệ thật");
  const cookie = await p.evaluate(() => document.cookie);
  ok(!/tct_ref/.test(cookie), "trang không tự ghi cookie tct_ref");
}
await p.context().close();

// ================= mobile: drawer, Escape, nhãn, overflow
{
  const m = await open({ width: 390, height: 844 });
  await m.locator("button[aria-controls=rv-menu]").click();
  ok(await m.locator("#rv-menu").isVisible(), "mobile: menu mở");
  await m.keyboard.press("Escape");
  ok(!(await m.locator("#rv-menu").isVisible()), "mobile: Escape đóng menu");
  ok(await m.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "rv-menu"), "mobile: trả focus về nút menu");
  const sz = await m.evaluate(() => [...document.querySelectorAll("button, a.btn, [role=tab], summary, select, input")].filter((e) => e.offsetParent && !e.closest("[hidden]")).map((e) => { const r = e.getBoundingClientRect(); return [r.width, r.height, e.className.slice(0, 20)]; }).filter((x) => x[1] < 43.5 && x[1] > 0));
  ok(sz.length <= 2, `mobile: touch target ≥44px (${sz.length} vi phạm ${JSON.stringify(sz.slice(0, 3))})`);
  const fs = await m.evaluate(() => [...document.querySelectorAll("input, select")].filter((e) => e.type !== "radio").map((e) => parseFloat(getComputedStyle(e).fontSize)));
  ok(fs.every((f) => f >= 16), "mobile: input ≥16px");
  await m.context().close();
}
for (const w of [320, 390, 768, 1024, 1440]) {
  const q = await open({ width: w, height: 900 }, { settle: 1500 });
  const o = await q.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(o.sw <= o.cw + 1, `không tràn ngang ở ${w}px (${o.sw}/${o.cw})`);
  await q.context().close();
}

// ================= reduced motion
{
  const r = await open({ width: 1440, height: 900 }, { reduced: true });
  const st = await r.evaluate(() => {
    const vis = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return +c.opacity; };
    return { h1: vis("h1"), rise: vis("[class*=rise]"), frame: vis("[class*=frame]"), pourLive: document.querySelector("[data-rv=pour]").getAttribute("data-live"), flame: getComputedStyle(document.querySelector("[class*=flameOuter]")).animationName, curtain: !!document.querySelector("[data-rv=curtain]"), lab: getComputedStyle(document.querySelector("[class*=lab]")).transitionDuration, vows: [...document.querySelectorAll("[data-rv=rv]")].every((e) => getComputedStyle(e).opacity === "1") };
  });
  ok(st.h1 === 1 && st.rise === 1 && st.frame === 1, `reduced: hero hiện đủ (${JSON.stringify(st)})`);
  ok(st.pourLive === null && st.flame === "none" && !st.curtain, "reduced: không pour động, nến không nhấp nháy, không rèm");
  ok(st.vows, "reduced: thẻ reveal hiện đủ");
  const stream = await r.evaluate(() => document.querySelector("[data-rv=stream]").style.strokeDashoffset);
  ok(stream === "", "reduced: đường rượu hiện đủ (không dashoffset)");
  const spot = await r.evaluate(() => document.querySelector("[data-rv=spot]").dataset.on);
  await r.mouse.move(300, 300); await r.waitForTimeout(200);
  ok((await r.evaluate(() => document.querySelector("[data-rv=spot]").dataset.on)) === undefined && spot === undefined, "reduced: spotlight không theo con trỏ");
  await r.context().close();
}

// ================= hiệu năng thô: long task khi cuộn toàn trang
for (const [name, vp] of [["1440", { width: 1440, height: 900 }], ["390", { width: 390, height: 844 }]]) {
  const q = await open(vp, { settle: 1500 });
  await q.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ["longtask"] }); });
  const H = await q.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += vp.height / 2) { await q.evaluate((yy) => window.scrollTo(0, yy), y); await q.waitForTimeout(120); }
  const lt = await q.evaluate(() => window.__lt);
  console.log(`PERF long task >50ms @${name}: ${lt.length}, >200ms: ${lt.filter((d) => d > 200).length}, max ${Math.max(0, ...lt).toFixed(0)}ms`);
  await q.context().close();
}

await b.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
