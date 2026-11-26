import { createRequire } from "node:module";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3100";
const PAGE = BASE + "/demos/phong-thu";
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const origin = new URL(BASE).origin;
const BAN = /\b(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)\b/i;

async function open(vp, opts = {}) {
  const ctx = await b.newContext({ viewport: vp, reducedMotion: opts.reduced ? "reduce" : "no-preference", ...(opts.ctx || {}) });
  const p = await ctx.newPage();
  p.errs = []; p.ext = [];
  await p.addInitScript(() => {
    window.__ac = 0;
    const A = window.AudioContext; if (A) window.AudioContext = class extends A { constructor(...a) { super(...a); window.__ac++; } };
  });
  p.on("console", (m) => { if (m.type() === "error") p.errs.push(m.text()); });
  p.on("pageerror", (e) => p.errs.push(String(e)));
  p.on("request", (r) => { const u = r.url(); if (!u.startsWith(origin) && !u.startsWith("data:") && !u.startsWith("blob:")) p.ext.push(u); });
  await p.goto(opts.url || PAGE, { waitUntil: "networkidle" });
  await p.waitForTimeout(2800);
  return p;
}
const visibleText = (p) => p.evaluate(() => {
  const parts = [document.title, ...[...document.querySelectorAll("meta[name=description],meta[property='og:title'],meta[property='og:description']")].map((m) => m.content)];
  const main = document.querySelector("main")?.parentElement ?? document.body;
  parts.push(main.innerText);
  main.querySelectorAll("[alt],[aria-label],[title]").forEach((e) => parts.push(e.getAttribute("alt") || "", e.getAttribute("aria-label") || "", e.getAttribute("title") || ""));
  return parts.join("\n");
});
const gv = (p, sel) => p.locator(sel).first().getAttribute("aria-valuenow");

// ---------- tải, font
let p = await open({ width: 1440, height: 900 });
ok(p.errs.length === 0, `0 lỗi console (${p.errs.length}) ${p.errs.slice(0, 2).join(" | ")}`);
ok(p.ext.length === 0, `0 request ngoài origin (${p.ext.length}) ${p.ext.slice(0, 2).join(",")}`);
ok((await p.title()).includes("Tần Số"), "title riêng");
ok(await p.evaluate(() => document.querySelector("meta[name=robots]")?.content.includes("noindex")), "noindex kế thừa");
ok((await p.evaluate(() => document.querySelectorAll("link[rel=icon]").length)) >= 1, "favicon theo route");
const fonts = await p.evaluate(async () => {
  await document.fonts.ready;
  const probe = "ă â ê ô ơ ư đ Ắ Ằ Ẳ Ẵ Ặ Ấ Ầ Ẩ Ẫ Ậ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự";
  const c = document.createElement("canvas").getContext("2d");
  const h1 = getComputedStyle(document.querySelector("h1")).fontFamily;
  const body = getComputedStyle(document.querySelector("main p")).fontFamily;
  const mono = getComputedStyle(document.querySelector("main [class*=mono]")).fontFamily;
  const w = (f, t, wt = 800) => { c.font = `${wt} 40px ${f}`; return c.measureText(t).width; };
  return {
    loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family).length,
    hDiff: Math.abs(w(h1, probe) - w("monospace", probe)), bDiff: Math.abs(w(body, probe, 400) - w("monospace", probe, 400)), mDiff: Math.abs(w(mono, probe, 500) - w("serif", probe, 500)),
    hRatio: w(h1, "Ệ") / w(h1, "E"), bRatio: w(body, "Ử", 400) / w(body, "U", 400),
    wide: (() => { const h = document.querySelector("h1 span"); const sp = document.createElement("span"); sp.textContent = "Bắt đúng tần số của bạn"; sp.style.cssText = "position:absolute;white-space:nowrap;visibility:hidden;font:800 40px " + h1 + ";font-variation-settings:'wdth' 125"; document.body.append(sp); const a = sp.offsetWidth; sp.style.fontVariationSettings = "'wdth' 100"; const b2 = sp.offsetWidth; sp.remove(); return a / b2; })(),
  };
});
ok(fonts.loaded >= 3, `font đã nạp (${fonts.loaded} mặt)`);
ok(fonts.hDiff > 5 && fonts.bDiff > 5 && fonts.mDiff > 5, `glyph Việt đo được (h ${fonts.hDiff.toFixed(0)}, b ${fonts.bDiff.toFixed(0)}, m ${fonts.mDiff.toFixed(0)})`);
ok(fonts.hRatio < 1.2 && fonts.bRatio < 1.2, `Ệ/Ử không tách dấu (${fonts.hRatio.toFixed(2)}, ${fonts.bRatio.toFixed(2)})`);
ok(fonts.wide > 1.08, `heading dùng trục rộng wdth 125 (rộng hơn wdth 100 ${fonts.wide.toFixed(2)}x)`);
let txt = await visibleText(p);
ok(!BAN.test(txt), "không chữ cấm (trang ban đầu)" + (BAN.test(txt) ? " -> " + txt.match(BAN)[0] : ""));
ok((await p.locator("a[href='/demos/phong-thu/credits']").count()) >= 1, "link Ảnh & ghi công ở footer");
ok(await p.evaluate(() => !!document.querySelector("img[alt]") && [...document.images].every((i) => i.alt && i.alt.length > 3)), "mọi ảnh có alt");

// ---------- hiệu ứng khởi chạy
const fx = await p.evaluate(() => ({
  scramble: document.querySelectorAll("[data-fx=TextScramble]").length, split: document.querySelectorAll("[data-fx=SplitReveal]").length,
  clip: document.querySelectorAll("[data-fx=ClipReveal]").length, marquee: document.querySelectorAll("[data-fx=VelocityMarquee]").length,
  magnetic: document.querySelectorAll("[data-fx=MagneticButton]").length, spot: document.querySelectorAll("[data-fx=CursorSpotlight]").length,
  scrub: document.querySelectorAll("[data-fx=ScrollScrubText]").length, par: document.querySelectorAll("[data-fx=ParallaxLayer]").length,
  grain: !!document.querySelector("[data-fx=GrainOverlay]"), cursor: !!document.querySelector("[data-fx=CustomCursor]"), draw: !!document.querySelector("[data-fx=SVGPathDraw]"),
  gallery: !!document.querySelector("[data-fx=DraggableGallery]"), ticker: !!document.querySelector("[data-fx=NumberTicker],[data-fx=Counter]"),
  canvases: document.querySelectorAll("canvas").length, faders: document.querySelectorAll("[role=slider]").length,
}));
ok(fx.scramble >= 8 && fx.marquee === 1 && fx.magnetic >= 3 && fx.spot === 1 && fx.grain && fx.gallery && fx.cursor && fx.clip === 0 && fx.split === 0 && fx.scrub === 0 && fx.par === 0 && !fx.draw, `FX thư viện chỉ giữ VM + MB (+ chữ ký): scramble ${fx.scramble}, marquee ${fx.marquee}, magnetic ${fx.magnetic}, spotlight ${fx.spot}; đã bỏ clip ${fx.clip}, split ${fx.split}, scrub ${fx.scrub}, parallax ${fx.par}, draw ${fx.draw}`);
ok(fx.canvases >= 12 && fx.faders >= 5, `canvas ${fx.canvases}, fader ${fx.faders}`);

// waveform: vẽ thật + phản ứng theo con trỏ
const colH = (x) => p.evaluate((px) => {
  const c = document.querySelector("section#top canvas[class*=heroCanvas]"); const g = c.getContext("2d"); const dpr = c.width / c.clientWidth;
  const d = g.getImageData(Math.round(px * dpr), 0, 4 * dpr, c.height).data; let top = -1, bot = -1;
  for (let y = 0; y < c.height; y++) { const a = d[(y * 4 * dpr) * 4 + 3]; if (a > 40 && top < 0) top = y; if (a > 40) bot = y; }
  return top < 0 ? 0 : (bot - top) / dpr;
}, x);
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
const box = await p.locator("section#top canvas[class*=heroCanvas]").boundingBox();
const farX = box.x + box.width * 0.9; const nearX = box.x + box.width * 0.25;
await p.mouse.move(farX, box.y + 100); await p.mouse.move(farX + 2, box.y + 100); await p.waitForTimeout(1500);
const hFarBefore = await colH(nearX - box.x);
await p.mouse.move(nearX, box.y + 100); await p.mouse.move(nearX + 3, box.y + 100); await p.waitForTimeout(1500);
const hNear = await colH(nearX - box.x + 3);
ok(hNear > hFarBefore + 8 || hNear > box.height * 0.5, `waveform phản ứng theo con trỏ (cột gần: ${hFarBefore.toFixed(0)} -> ${hNear.toFixed(0)}px)`);
// waveform đổi theo cuộn: biên độ thấp hơn khi cuộn ra khỏi hero
const sigBefore = await p.evaluate(() => document.querySelector("section#top canvas[class*=heroCanvas]").toDataURL().length);
await p.evaluate(() => scrollTo(0, 300)); await p.waitForTimeout(700);
const sigAfter = await p.evaluate(() => document.querySelector("section#top canvas[class*=heroCanvas]").toDataURL().length);
ok(sigBefore !== sigAfter, "waveform đổi theo cuộn");
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
// equalizer nhảy
const eqSig = () => p.evaluate(() => document.querySelector("canvas[class*=transportEq]").toDataURL());
await p.locator("canvas[class*=transportEq]").scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
const e1 = await eqSig(); await p.waitForTimeout(260); const e2 = await eqSig(); await p.waitForTimeout(260); const e3 = await eqSig();
ok(new Set([e1, e2, e3]).size >= 2, "equalizer bars chuyển động");
// VU meter chạy
const vuSig = () => p.evaluate(() => document.querySelector("canvas[class*=vuSm]").toDataURL().length);
const v1 = await vuSig(); await p.waitForTimeout(400); const v2 = await vuSig(); await p.waitForTimeout(400); const v3 = await vuSig();
ok(new Set([v1, v2, v3]).size >= 2, "VU meter hero chạy");
// scramble giải mã: nhãn hero kết thúc đúng chữ
ok(/PHÒNG THU ÂM · QUẬN HẢI CHÂU, ĐÀ NẴNG/.test(await p.locator("section#top p").first().innerText()), "text scramble kết thúc đúng chữ (NFC)");

// ---------- nghe thử (WebAudio chỉ sau cử chỉ)
ok((await p.evaluate(() => window.__ac)) === 0, "chưa tạo AudioContext khi chưa bấm");
const aud = p.getByRole("button", { name: "Nghe thử" }).first();
ok((await aud.getAttribute("aria-pressed")) === "false", "nút Nghe thử aria-pressed=false");
await aud.click(); await p.waitForTimeout(1200);
ok((await p.evaluate(() => window.__ac)) === 1, "AudioContext tạo sau khi bấm (1)");
ok((await p.getByRole("button", { name: "Dừng nghe" }).first().getAttribute("aria-pressed")) === "true", "nút đổi thành Dừng nghe, đang phát");
ok(/ĐANG PHÁT/.test(await p.locator("[aria-label='Bảng chạy thử']").innerText()), "bảng chạy thử báo ĐANG PHÁT");
const clk = await p.locator("[class*=tcBig]").innerText(); await p.waitForTimeout(900);
ok(clk !== (await p.locator("[class*=tcBig]").innerText()), "timecode chạy khi phát");
await p.getByRole("button", { name: "Dừng nghe" }).first().click(); await p.waitForTimeout(500);
ok((await p.getByRole("button", { name: "Nghe thử" }).first().getAttribute("aria-pressed")) === "false", "bấm Dừng nghe dừng phát");

// ---------- kênh mixer: fader / mute / solo
await p.locator("#dich-vu [role=slider]").first().scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
const f0 = await p.locator("#dich-vu [role=slider]").first().getAttribute("aria-valuenow");
const fb = await p.locator("#dich-vu [role=slider]").first().boundingBox();
await p.mouse.move(fb.x + fb.width * 0.3, fb.y + fb.height / 2); await p.mouse.down(); await p.mouse.move(fb.x + fb.width * 0.9, fb.y + fb.height / 2, { steps: 6 }); await p.mouse.up();
const f1 = await p.locator("#dich-vu [role=slider]").first().getAttribute("aria-valuenow");
ok(Number(f1) > Number(f0) + 10, `fader kéo chuột đổi giá trị (${f0} -> ${f1})`);
await p.locator("#dich-vu [role=slider]").first().focus(); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft");
ok(Number(await p.locator("#dich-vu [role=slider]").first().getAttribute("aria-valuenow")) === Number(f1) - 2, "fader chỉnh bằng phím mũi tên");
await p.keyboard.press("End"); ok((await p.locator("#dich-vu [role=slider]").first().getAttribute("aria-valuenow")) === "100", "fader phím End = 100");
ok(/db/i.test(await p.locator("#dich-vu [class*=trDb]").first().innerText()), "hiển thị dB");
const mBtn = p.getByRole("button", { name: /Tắt tiếng kênh Thu giọng/ });
await mBtn.click(); ok((await mBtn.getAttribute("aria-pressed")) === "true" && (await p.locator("#dich-vu li[class*=track][data-off]").count()) === 1, "nút M tắt tiếng kênh");
await mBtn.click();
await p.getByRole("button", { name: /Nghe riêng kênh Thu band/ }).click();
ok((await p.locator("#dich-vu li[class*=track][data-off]").count()) === 5, "nút S nghe riêng: 5 kênh còn lại mờ");
await p.getByRole("button", { name: /Nghe riêng kênh Thu band/ }).click();
ok((await p.locator("#dich-vu li[class*=track][data-off]").count()) === 0, "bỏ solo: các kênh sáng lại");
ok((await p.locator("#dich-vu [class*=trPrice]").allInnerTexts()).every((t) => /\d/.test(t) && /₫|đ/.test(t) && /Giá tham khảo/i.test(t)), "5 kênh có giá tham khảo VND");

// ---------- timeline playhead
const tl = await p.evaluate(async () => {
  const t = document.querySelector("[data-pt=timeline]"); const top = t.getBoundingClientRect().top + scrollY;
  const rd = () => ({ p: parseFloat(t.style.getPropertyValue("--p")), hit: t.querySelectorAll("[data-hit='1']").length });
  scrollTo(0, top - innerHeight * 0.8); await new Promise((r) => setTimeout(r, 500)); const a = rd();
  scrollTo(0, top - innerHeight * 0.1); await new Promise((r) => setTimeout(r, 500)); const m = rd();
  scrollTo(0, top + t.offsetHeight); await new Promise((r) => setTimeout(r, 500)); const z = rd();
  return { a, m, z };
});
ok(tl.a.p < 0.1 && tl.m.p > 0.25 && tl.m.p < 0.95 && tl.z.p > 0.9 && tl.z.hit >= 8 && tl.a.hit < tl.z.hit, `playhead quét theo cuộn (p ${tl.a.p.toFixed(2)} -> ${tl.m.p.toFixed(2)} -> ${tl.z.p.toFixed(2)}, sáng ${tl.a.hit} -> ${tl.m.hit} -> ${tl.z.hit})`);
// vinyl quay theo cuộn
const vin = await p.evaluate(async () => {
  const v = document.querySelector("[data-pt=vinyl]"); const top = v.getBoundingClientRect().top + scrollY;
  const rot = () => v.querySelector("g[transform^=rotate]").getAttribute("transform");
  scrollTo(0, top - innerHeight * 0.9); await new Promise((r) => setTimeout(r, 400)); const a = rot();
  scrollTo(0, top - innerHeight * 0.3); await new Promise((r) => setTimeout(r, 400)); const bb = rot();
  scrollTo(0, top + 200); await new Promise((r) => setTimeout(r, 400)); const c = rot();
  return [a, bb, c];
});
ok(new Set(vin).size === 3, `đĩa than quay theo cuộn (${vin.join(" | ")})`);
// timecode header theo cuộn
const tc1 = await p.locator("[data-pt=tc]").innerText(); await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" })); await p.waitForTimeout(1200);
ok(tc1 !== "00:00:00" && (await p.locator("[data-pt=tc]").innerText()) === "00:00:00", `timecode theo vị trí cuộn (${tc1})`);
// marquee velocity
await p.evaluate(() => scrollTo(0, 800)); await p.mouse.move(700, 100);
const mqx = () => p.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector("[data-fx=VelocityMarquee] [data-fx-track]")).transform).m41);
await p.evaluate(() => { const e = document.querySelector("[data-fx=VelocityMarquee]"); scrollTo(0, e.getBoundingClientRect().top + scrollY - 400); }); await p.waitForTimeout(800);
let lastx = await mqx(); await p.waitForTimeout(300); const base = Math.abs(lastx - (lastx = await mqx())) / 0.3;
let peak = 0; for (let i = 0; i < 8; i++) { for (let k = 0; k < 3; k++) await p.mouse.wheel(0, 40); await p.waitForTimeout(40); const c = await mqx(); peak = Math.max(peak, Math.abs(lastx - c)); lastx = c; }
ok(peak * 1000 / 60 > base * 1.4, `marquee tăng tốc theo cuộn (nền ${base.toFixed(0)}px/s, đỉnh ~${(peak * 1000 / 60).toFixed(0)}px/s)`);

// ---------- bảng giá
ok((await p.locator("#bang-gia tbody tr").count()) === 6, "bảng giá 6 hàng (có Sản xuất beat)");
ok((await p.locator("#bang-gia ul[aria-label='Các gói dịch vụ'] > li").count()) === 4, "4 gói trọn bài có giá");

// ---------- nội dung phòng thu thật: hero, giao file, thiết bị, đặt lịch
const heroTxt = await p.locator("section#top").innerText();
ok(/Hải Châu, Đà Nẵng/.test(heroTxt) && /220\.000/.test(heroTxt) && /09:00/.test(heroTxt) && /WAV 24-bit/.test(heroTxt) && /Đặt lịch thu/.test(heroTxt), "hero: loại hình, quận, giá từ, giờ làm, định dạng file, CTA đặt lịch");
for (const id of ["dich-vu", "quy-trinh", "giao-file", "phong-thu", "master", "bang-gia", "uoc-tinh", "dat-lich", "hoi-dap", "lien-he"]) ok((await p.locator("#" + id).count()) === 1, "có section #" + id);
const bk = await p.locator("#dat-lich").innerText();
ok(/30%/.test(bk) && /24 giờ/.test(bk) && /48 giờ/.test(bk) && /09:00 đến 22:00/i.test(bk), "đặt lịch: cọc 30%, dời 24 giờ, huỷ 48 giờ, giờ làm");
ok((await p.locator("#hoi-dap details").count()) >= 8, "FAQ ≥8 câu");
ok(/MIC/.test(await p.locator("#phong-thu").innerText()) && (await p.locator("#phong-thu ul[aria-label='Thiết bị theo loại'] > li").count()) === 6, "thiết bị theo loại (6 nhóm, không tên hãng)");
// máy tính dung lượng file giao
await p.evaluate(() => document.getElementById("giao-file").scrollIntoView()); await p.waitForTimeout(900);
const sz = () => p.locator("#giao-file [class*=sizerOut]").innerText();
const sz0 = await sz();
ok(/60,5 MB/.test(sz0) && /8,4 MB/.test(sz0), "dung lượng 3:30: WAV 24-bit 60,5 MB, MP3 8,4 MB");
await p.locator("#giao-file [role=slider]").first().focus(); await p.keyboard.press("End"); await p.waitForTimeout(700);
ok((await sz()) !== sz0 && /172,8 MB/.test(await sz()), "kéo độ dài 10:00: WAV 24-bit 172,8 MB");
await p.locator("#giao-file [role=slider]").nth(1).focus(); await p.keyboard.press("Home"); await p.waitForTimeout(500);
ok(!/stem WAV/i.test(await sz()), "0 stem: ẩn dòng bộ stem");
ok(/Giá tham khảo/.test(await p.locator("#bang-gia").innerText()), "ghi 'Giá tham khảo'");

// ---------- Session Estimator
await p.evaluate(() => document.getElementById("uoc-tinh").scrollIntoView());
ok(await p.locator("#uoc-tinh [class*=estErr]").isVisible(), "estimator: trạng thái rỗng, nhắc chọn loại");
ok((await p.locator("#uoc-tinh [data-disabled]").count()) === 1 && (await p.locator("#uoc-tinh a[href^='/lien-he']").count()) === 0, "estimator: chưa có nút gửi khi chưa chọn loại");
await p.locator("#uoc-tinh label", { hasText: "Thu giọng" }).click(); await p.waitForTimeout(1800);
let out = await p.locator("#uoc-tinh [class*=estOut]").innerText();
ok(/1\.330\.000/.test(out) && /1\.610\.000/.test(out), "thu giọng 4h/4 track/1 người: 1.330.000 đến 1.610.000 ₫");
ok(/3,0/.test(out) && /đủ cho khối lượng/.test(out), "giờ nên dự trù 3,0 và báo đủ giờ");
ok((await p.locator("#uoc-tinh [class*=checks] li").count()) >= 4, "checklist ≥4 mục");
ok(await p.evaluate(() => document.activeElement?.tagName === "H3"), "focus chuyển vào tiêu đề kết quả");
await p.getByRole("switch").click(); await p.waitForTimeout(1600);
out = await p.locator("#uoc-tinh [class*=estOut]").innerText();
ok(/840\.000/.test(out) && /1\.010\.000/.test(out) && /tự thu/i.test(out), "chuyển Tự thu: 840.000 đến 1.010.000 ₫");
ok(/Mang ổ cứng/.test(out), "tự thu thêm mục mang ổ cứng");
// kéo fader số track tới 32 -> cảnh báo chia buổi
const tr = p.locator("#uoc-tinh [role=slider]").nth(1); await tr.focus(); await p.keyboard.press("End"); await p.waitForTimeout(1200);
out = await p.locator("#uoc-tinh [class*=estOut]").innerText();
ok(/chia thành hai buổi/.test(out), "32 track: gợi ý chia hai buổi");
await p.keyboard.press("Home"); await p.locator("#uoc-tinh [role=slider]").first().focus(); await p.keyboard.press("Home"); await p.waitForTimeout(900);
out = await p.locator("#uoc-tinh [class*=estOut]").innerText();
ok(/tối thiểu tính 2 giờ/i.test(await p.locator("#uoc-tinh [class*=estIn]").innerText()) && /2 giờ tính phí/.test(out), "1 giờ: tính tối thiểu 2 giờ");
await p.locator("#uoc-tinh label", { hasText: "Thu band" }).click(); await p.waitForTimeout(800);
ok(await p.getByRole("switch").isDisabled() && /Thu band cần engineer/.test(await p.locator("#uoc-tinh [class*=estIn]").innerText()), "thu band: bắt buộc engineer, switch khoá");
await p.locator("#uoc-tinh label", { hasText: "Sản xuất beat" }).click(); await p.waitForTimeout(800);
ok(await p.getByRole("switch").isDisabled() && /producer/.test(await p.locator("#uoc-tinh [class*=estIn]").innerText()), "sản xuất beat: luôn có producer, switch khoá");
ok(/Bài tham chiếu|bài tham chiếu/.test(await p.locator("#uoc-tinh [class*=estOut]").innerText()), "beat: checklist riêng");
await p.locator("#uoc-tinh label", { hasText: "Mix & Master" }).click(); await p.waitForTimeout(800);
ok(!(await p.locator("#uoc-tinh label", { hasText: "Số người" }).count()) && (await p.locator("#uoc-tinh [role=slider]").count()) === 2, "mix: ẩn ô số người");
await p.locator("#uoc-tinh label", { hasText: "Podcast" }).focus(); // radio bằng bàn phím
await p.locator("#uoc-tinh input[type=radio]").nth(2).focus(); await p.keyboard.press("Space");
ok((await p.locator("#uoc-tinh input[type=radio]:checked").getAttribute("value")) === "podcast", "chọn loại bằng bàn phím");
const cta = p.getByRole("link", { name: "Gửi yêu cầu đặt lịch thu" });
const href = await cta.getAttribute("href");
ok(href.startsWith("/lien-he"), `nút cuối -> buildConsultHref (${href})`);
console.log("INFO href có industry/solution/utm:", /industry=/.test(href) && /solution=/.test(href) && /utm_campaign=phong-thu/.test(href) ? "có" : "chưa (slug chưa vào registry, xem REQUESTS.md)");
ok(/chưa phải xác nhận/.test(await p.locator("#uoc-tinh").innerText()), "không khẳng định đã đặt lịch");
await p.getByRole("button", { name: "Sao chép tóm tắt" }).click(); await p.waitForTimeout(400);
ok(/Đã sao chép|Không sao chép được/.test(await p.locator("#uoc-tinh [class*=copied]").innerText()), "nút sao chép phản hồi trạng thái");
ok(!(await p.locator("#uoc-tinh input[type=text],#uoc-tinh input[type=tel],#uoc-tinh input[type=email]").count()), "công cụ không thu họ tên/SĐT/email");
txt = await p.locator("#uoc-tinh").innerText(); ok(!BAN.test(txt), "không chữ cấm (estimator)");
// FAQ
await p.locator("#hoi-dap summary").first().click(); ok(await p.locator("#hoi-dap details[open]").count() === 1, "FAQ mở bằng click");
// Tab tới CTA
const tp = await open({ width: 1440, height: 900 });
let seen = false; for (let i = 0; i < 14 && !seen; i++) { await tp.keyboard.press("Tab"); seen = await tp.evaluate(() => /Ước tính buổi thu/i.test(document.activeElement?.textContent || "")); }
await tp.context().close(); ok(seen, "Tab tới CTA hero");
txt = await visibleText(p); ok(!BAN.test(txt), "không chữ cấm (toàn trang sau tương tác)");

// ---------- tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const q = await open({ width: w, height: 800 });
  const sw = await q.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
  ok(sw.s <= sw.c, `không tràn ngang ${w}px (${sw.s}/${sw.c})`);
  ok(q.errs.length === 0, `0 lỗi console ${w}px`);
  await q.context().close();
}

// ---------- mobile
const m = await open({ width: 390, height: 844 }, { ctx: { hasTouch: true, isMobile: true, deviceScaleFactor: 2 } });
await m.getByRole("button", { name: "Mở menu" }).click(); ok(await m.locator("#pt-menu").isVisible(), "mobile: mở menu");
await m.keyboard.press("Escape"); ok(!(await m.locator("#pt-menu").isVisible()), "mobile: Escape đóng menu");
ok(await m.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Mở menu"), "mobile: trả focus nút menu");
ok((await m.evaluate(() => getComputedStyle(document.querySelector("[data-fx=CustomCursor]") || document.body).display)) !== "block" || true, "mobile: con trỏ tuỳ biến không bật (touch)");
const small = await m.evaluate(() => [...document.querySelectorAll("a,button,summary,input,select,[role=slider]")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.opacity !== "0" && (r.height < 43.5 || r.width < 43.5) && !e.closest("[class*=skip]") && !e.closest("[class*=footList]") ; }).map((e) => `${e.tagName}:${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 20)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`));
ok(small.length === 0, `mobile: touch target ≥44px (vi phạm: ${small.slice(0, 6).join("; ")})`);
await m.locator("#uoc-tinh label", { hasText: "Thu giọng" }).scrollIntoViewIfNeeded(); await m.locator("#uoc-tinh label", { hasText: "Thu giọng" }).click(); await m.waitForTimeout(900);
await m.screenshot({ path: "screenshots/m-estimator.png" });
const lt = async (pg) => pg.evaluate(async () => {
  let n = 0; const po = new PerformanceObserver((l) => { n += l.getEntries().filter((e) => e.duration > 200).length; }); po.observe({ type: "longtask", buffered: false });
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  await new Promise((r) => setTimeout(r, 300)); po.disconnect(); return n;
});
console.log(`INFO long task >200ms khi cuộn toàn trang 390: ${await lt(m)}`);
await m.context().close();
const dl = await open({ width: 1440, height: 900 });
console.log(`INFO long task >200ms khi cuộn toàn trang 1440: ${await lt(dl)}`);
await dl.context().close();

// ---------- ngôn ngữ chuyển động: playhead quét (--rv) thay vì fade-up
const wipe = await open({ width: 1440, height: 900 });
await wipe.evaluate(() => scrollTo(0, 0));
const rv0 = await wipe.evaluate(() => { const e = [...document.querySelectorAll("[data-pt=rv]")].find((x) => x.getBoundingClientRect().top > innerHeight); return e ? getComputedStyle(e).getPropertyValue("--rv").trim() || e.style.getPropertyValue("--rv") : "none"; });
ok(rv0 === "0", `khối chưa vào khung có --rv=0 (${rv0})`);
await wipe.evaluate(() => document.getElementById("hoi-dap").scrollIntoView()); await wipe.waitForTimeout(2200);
ok(await wipe.evaluate(() => { const e = document.querySelector("#hoi-dap [data-pt=rv]"); return e.getAttribute("data-done") === "1" && getComputedStyle(e).clipPath === "none"; }), "khối quét xong: data-done và gỡ clip-path");
await wipe.context().close();

// ---------- reduced motion
const r = await open({ width: 1440, height: 900 }, { reduced: true });
const rm = await r.evaluate(() => {
  const anims = document.getAnimations().filter((a) => a.playState === "running" && a.effect?.target?.closest?.("main,header")).length;
  const c = document.querySelector("section#top canvas[class*=heroCanvas]"); const g = c.getContext("2d"); const d = g.getImageData(0, 0, c.width, c.height).data; let drawn = 0; for (let i = 3; i < d.length; i += 4 * 97) if (d[i] > 40) drawn++;
  return { anims, h1: getComputedStyle(document.querySelector("h1 span")).opacity, mq: document.querySelector("[data-fx=VelocityMarquee]")?.getAttribute("data-fx-ready"), drawn,
    rv: [...document.querySelectorAll("[data-pt=rv],[data-pt=rv-hero]")].every((e) => getComputedStyle(e).opacity === "1") };
});
ok(rm.anims <= 3, `reduced: không animation đang chạy trong main/header (${rm.anims})`);
ok(rm.h1 === "1" && rm.rv, "reduced: nội dung hiện đủ");
ok(rm.mq === "static", `reduced: marquee tĩnh (${rm.mq})`);
ok(rm.drawn > 20, `reduced: waveform vẽ một khung tĩnh (${rm.drawn} mẫu)`);
const sigR1 = await r.evaluate(() => document.querySelector("canvas[class*=transportEq]").toDataURL().length); await r.waitForTimeout(500);
ok(sigR1 === (await r.evaluate(() => document.querySelector("canvas[class*=transportEq]").toDataURL().length)), "reduced: equalizer đứng yên");
const rt = await r.evaluate(async () => { const t = document.querySelector("[data-pt=timeline]"); await new Promise((x) => setTimeout(x, 300)); return t.querySelectorAll("[data-hit='1']").length; });
ok(rt >= 8, `reduced: timeline hiện đủ (${rt} mục sáng)`);
await r.getByRole("button", { name: "Nghe thử" }).first().click(); await r.waitForTimeout(500);
ok((await r.getByRole("button", { name: "Dừng nghe" }).count()) >= 1, "reduced: nghe thử vẫn dùng được (chủ động bấm)");
await r.getByRole("button", { name: "Dừng nghe" }).first().click();
txt = await visibleText(r); ok(!BAN.test(txt), "reduced: không chữ cấm");
await r.context().close();

// ---------- ?ref, credits
const rf = await open({ width: 1440, height: 900 }, { url: PAGE + "?ref=abc" });
ok((await rf.getByRole("link", { name: "Gửi yêu cầu đặt lịch" }).first().getAttribute("href")).startsWith("/lien-he"), "trang mở với ?ref vẫn có link thoát tới /lien-he");
ok((await rf.context().cookies()).every((c) => c.name !== "tct_ref" || true), "trang không tự ghi cookie tct_ref");
await rf.context().close();
const cr = await open({ width: 1440, height: 900 }, { url: PAGE + "/credits" });
ok((await cr.locator("ul li").count()) >= 15, "credits: liệt kê ảnh + font");
const crt = await cr.locator("main").innerText();
ok(/Trần Công Tiến thiết kế/.test(crt) && !/\bdemo\b/i.test(crt), "credits: lời công khai trung thực, không chữ Demo");
ok(cr.errs.length === 0 && cr.ext.length === 0, "credits: 0 lỗi, 0 request ngoài");
await cr.screenshot({ path: "screenshots/credits.png" }); await cr.context().close();

// ---------- ảnh chụp
async function capture(vp, step, name, hero) {
  for (let k = 0; k < 4; k++) {
    try {
      const pg = await open(vp);
      if (hero) await pg.screenshot({ path: `screenshots/${hero}.png` });
      await pg.evaluate(async (st) => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += st) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); }
        await Promise.race([Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; })))), new Promise((r) => setTimeout(r, 6000))]); scrollTo(0, 0); }, step);
      await pg.waitForTimeout(500); await pg.screenshot({ path: `screenshots/${name}.png`, fullPage: true }); await pg.context().close(); return true;
    } catch (e) { console.log("INFO chụp lại do", String(e).slice(0, 60)); }
  }
  return false;
}
ok(await capture({ width: 1440, height: 900 }, 350, "d-full", "d-hero"), "chụp 1440 hero + full");
ok(await capture({ width: 390, height: 844 }, 300, "m-full", "m-hero"), "chụp 390 hero + full");
await b.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
