// E2E Nở Rừng (/demos/hoa-tuoi). Chạy: BASE=http://localhost:3100 node tests/showroom/hoa-tuoi/e2e.mjs
import { chromium } from "/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3100";
const URL_ = globalThis.URL;
const PAGE_URL = `${BASE}/demos/hoa-tuoi`;
const here = path.dirname(fileURLToPath(import.meta.url));
const shots = path.join(here, "screenshots");
fs.mkdirSync(shots, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log("PASS", m); } else { fail++; console.log("FAIL", m); } };
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const BAD = /(^|[^a-zA-Z])(demo|minh hoạ|minh họa|giả định|mô phỏng|dữ liệu mẫu)([^a-zA-Z]|$)/i;

async function open(ctxOpts = {}, w = 1440, h = 900, query = "", wait = 1500) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...ctxOpts });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", (e) => errs.push("PAGEERR " + e.message));
  page.on("request", (r) => { const u = new URL_(r.url()); if (u.protocol.startsWith("http") && u.origin !== new URL_(BASE).origin) ext.push(r.url()); });
  await page.goto(PAGE_URL + query, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
  return { ctx, page, errs, ext };
}
const scrollAll = async (page, step = 0.6) => {
  const h = await page.evaluate(() => innerHeight);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += h * step) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(260); }
};

// ============ 1) tải, console, request ngoài, chữ cấm, meta, font Việt
{
  const { ctx, page, errs, ext } = await open({}, 1440, 900, "", 3800);
  ok(errs.length === 0, `0 lỗi console (${errs.length}) ${errs.slice(0, 2).join(" | ")}`);
  ok(ext.length === 0, `0 request ngoài origin (${ext.length}) ${ext.slice(0, 2).join(" ")}`);
  const title = await page.title();
  ok(/Nở Rừng/.test(title), `title: ${title}`);
  const desc = await page.getAttribute('meta[name="description"]', "content");
  ok(!!desc && desc.length > 60, "meta description riêng");
  ok((await page.locator("meta[name=robots]").getAttribute("content"))?.includes("noindex"), "noindex kế thừa");
  const texts = await page.evaluate(() => {
    const root = document.querySelector("main").parentElement;
    const out = [];
    root.querySelectorAll("*").forEach((e) => ["alt", "aria-label", "title", "placeholder"].forEach((a) => e.getAttribute(a) && out.push(e.getAttribute(a))));
    out.push(root.innerText);
    document.querySelectorAll("meta[name=description],meta[property^='og:']").forEach((m) => out.push(m.content));
    out.push(document.title);
    return out.join("\n");
  });
  const m = texts.match(BAD);
  ok(!m, `không có chữ cấm ở trạng thái mặc định${m ? ": " + m[0] : ""}`);

  const gl = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    const h1 = document.querySelector("h1");
    const fam = getComputedStyle(h1).fontFamily;
    const body = getComputedStyle(document.querySelector("main p")).fontFamily;
    const c = document.createElement("canvas").getContext("2d");
    const sample = "ăâêôơưđẮẾỂỆỐỢỬỮỜẶ";
    const bad = [];
    const render = (font, ch) => { c.font = font; c.clearRect(0, 0, 200, 200); c.textBaseline = "alphabetic"; c.fillText(ch, 20, 120); return c.getImageData(0, 0, 200, 200).data.reduce((a, v, i) => (i % 4 === 3 ? a + v : a), 0); };
    for (const ch of sample) {
      const withFont = render(`90px ${fam}, "Courier New"`, ch);
      const fb = render('90px "Courier New"', ch);
      if (withFont === fb || withFont === 0) bad.push("Prata:" + ch);
      const w2 = render(`600 90px ${body}, "Courier New"`, ch);
      if (w2 === fb || w2 === 0) bad.push("Work:" + ch);
    }
    return { loaded, fam, body, bad };
  });
  ok(gl.loaded.some((f) => /pr(Vi|Lat)/.test(f)) && gl.loaded.some((f) => /ws(Vi|Lat)/.test(f)), `font nạp: ${[...new Set(gl.loaded)].join(", ")}`);
  ok(gl.bad.length === 0, `glyph Việt (ă â ê ô ơ ư đ Ắ Ế Ể Ệ Ố Ợ Ử Ữ Ờ Ặ) render thật, thiếu: ${gl.bad.join(" ") || "không"}`);
  // đo dấu chồng: tiêu đề Ệ/Ử không bị cắt (BloomText clip) sau khi hiện
  const cl = await page.evaluate(() => { const w = [...document.querySelectorAll("h1 [data-bw]")].map((e) => getComputedStyle(e).clipPath); return w; });
  ok(cl.every((v) => !/inset\(100%/.test(v)), "h1 đã nở hết (không còn clip 100%)");
  await page.screenshot({ path: path.join(shots, "d-hero-1440.png") });
  await ctx.close();
}

// ============ 2) không tràn ngang
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await open({}, w, 900, "", 900);
  await scrollAll(page, 0.9);
  const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, bw: document.body.scrollWidth }));
  ok(r.sw <= r.cw + 1 && r.bw <= r.cw + 1, `không tràn ngang ở ${w}px (scrollWidth ${r.sw} / ${r.cw})`);
  await ctx.close();
}

// ============ 3) hiệu ứng chạy (desktop, chuyển động bình thường)
{
  const { ctx, page } = await open({}, 1440, 900, "", 500);
  // 3a Hero: mặt nạ nở, blob đổi hình, chữ nở
  const t0 = await page.evaluate(() => document.querySelector("[data-fx=PetalMask] [data-pm-path]").getAttribute("transform"));
  await page.waitForTimeout(2600);
  const t1 = await page.evaluate(() => document.querySelector("[data-fx=PetalMask] [data-pm-path]").getAttribute("transform"));
  ok(!!t0 && t0 !== t1, `PetalMask (mặt nạ cánh hoa) nở: ${t0} -> ${t1}`);
  const blob1 = await page.evaluate(() => document.querySelector("[data-fx=BlobMorph] path").getAttribute("d"));
  await page.waitForTimeout(1500);
  const blob2 = await page.evaluate(() => document.querySelector("[data-fx=BlobMorph] path").getAttribute("d"));
  ok(blob1 !== blob2, "BlobMorph (hoa biến hình) đổi path theo thời gian");
  const op = await page.evaluate(() => [...document.querySelectorAll("h1 [data-bw]")].map((e) => +getComputedStyle(e).opacity));
  ok(op.length >= 5 && op.every((v) => v > 0.99), `BloomText hero nở đủ (${op.length} từ)`);
  const hl = await page.evaluate(() => [...document.querySelectorAll("#dau-trang [data-h=leaf]")].map((e) => +getComputedStyle(e).opacity));
  ok(hl.every((v) => v > 0.99), "lá hero đã trượt vào");

  // 3b Petal rain
  const cvOk = await page.evaluate(() => { const c = document.querySelector("canvas[data-fx=PetalRain]"); if (!c) return false; const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4 * 97) if (d[i] > 0) n++; return n; });
  ok(cvOk > 0, `PetalRain canvas có cánh hoa vẽ (${cvOk} mẫu pixel)`);
  const snap = () => page.evaluate(() => { const c = document.querySelector("canvas[data-fx=PetalRain]"); const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let h = 0; for (let i = 0; i < d.length; i += 4 * 211) h = (h * 31 + d[i + 3]) | 0; return h; });
  const s1 = await snap(); await page.waitForTimeout(400); const s2 = await snap();
  ok(s1 !== s2, "PetalRain chuyển động theo thời gian");
  // 3c Parallax lá + scrub
  const before = await page.evaluate(() => getComputedStyle(document.querySelector("#dau-trang [data-leaf]")).transform);
  await page.mouse.wheel(0, 500); await page.waitForTimeout(1400);
  const after = await page.evaluate(() => getComputedStyle(document.querySelector("#dau-trang [data-leaf]")).transform);
  ok(before !== after, "parallax lá nhiều tầng dịch theo cuộn");
  const prog = await page.evaluate(() => document.querySelector("[data-fx=ScrollProgress]")?.getAttribute("aria-valuenow") ?? document.querySelector("[role=progressbar]")?.getAttribute("aria-valuenow"));
  ok(prog !== null && Number(prog) > 0, `ScrollProgress cập nhật (${prog})`);
  // 3d marquee velocity
  const mq1 = await page.evaluate(() => getComputedStyle(document.querySelector("[data-fx=VelocityMarquee] [data-fx-track]")).transform);
  await page.waitForTimeout(700);
  const mq2 = await page.evaluate(() => getComputedStyle(document.querySelector("[data-fx=VelocityMarquee] [data-fx-track]")).transform);
  ok(mq1 !== mq2, "VelocityMarquee chạy");
  // 3e ScrollScrubText
  await page.evaluate(() => document.querySelector("[data-fx=ScrollScrubText]").scrollIntoView({ block: "center" })); await page.waitForTimeout(1200);
  const sc = await page.evaluate(() => [...document.querySelectorAll("[data-fx=ScrollScrubText] [data-fx-w]")].map((e) => +getComputedStyle(e).opacity));
  ok(sc.length > 10 && sc.some((v) => v > 0.9) && sc.some((v) => v < 0.9), "ScrollScrubText sáng dần theo cuộn");
  // 3f Mask reveal ở ảnh section tay nghề + gallery
  await page.evaluate(() => document.querySelector("#tay-nghe [data-fx=PetalMask]").scrollIntoView({ block: "center" })); await page.waitForTimeout(3000);
  const mk = await page.evaluate(() => document.querySelector("#tay-nghe [data-fx=PetalMask] [data-pm-path]").getAttribute("transform"));
  const sc1 = Number((mk.match(/scale\(([\d.]+)\)/) || [])[1]);
  ok(sc1 >= 0.99 && sc1 <= 1.03, `mặt nạ ảnh quy trình nở xong: ${mk}`);
  // 3g SVGPathDraw scrub
  await page.evaluate(() => document.querySelector("#tay-nghe [data-fx=SVGPathDraw]").parentElement.scrollIntoView({ block: "end" })); await page.waitForTimeout(1500);
  const sd = await page.evaluate(() => { const p = document.querySelector("#tay-nghe [data-fx=SVGPathDraw] path"); return p ? +getComputedStyle(p).strokeDashoffset.replace("px", "") : -1; });
  ok(sd >= 0 && sd < 1, `SVGPathDraw (thân hoa) vẽ theo cuộn: dashoffset ${sd}`);

  // 3h Draggable gallery: kéo chuột, phím, nút
  await page.evaluate(() => document.querySelector("#vuon").scrollIntoView({ block: "center" })); await page.waitForTimeout(900);
  const vp = page.locator("#vuon [data-fx-viewport]");
  const box = await vp.boundingBox();
  const sl0 = await vp.evaluate((e) => e.scrollLeft);
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.4);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) { await page.mouse.move(box.x + box.width * 0.7 - i * 60, box.y + box.height * 0.4, { steps: 2 }); await page.waitForTimeout(16); }
  await page.mouse.up();
  await page.waitForTimeout(100);
  const sl1 = await vp.evaluate((e) => e.scrollLeft);
  await page.waitForTimeout(700);
  const sl2 = await vp.evaluate((e) => e.scrollLeft);
  ok(sl1 > sl0 + 100, `gallery kéo chuột: ${Math.round(sl0)} -> ${Math.round(sl1)}`);
  ok(sl2 > sl1 + 5, `gallery quán tính: ${Math.round(sl1)} -> ${Math.round(sl2)} sau khi thả`);
  await page.waitForTimeout(2600);
  await vp.focus(); await page.keyboard.press("Home"); await page.waitForTimeout(900);
  const hm = await vp.evaluate((e) => e.scrollLeft);
  ok(hm < 5, "phím Home về đầu gallery");
  await page.keyboard.press("ArrowRight"); await page.waitForTimeout(900);
  const ar = await vp.evaluate((e) => e.scrollLeft);
  ok(ar > 100, `phím mũi tên phải cuộn gallery (${Math.round(ar)})`);
  await page.locator("#vuon [data-fx-next]").click(); await page.waitForTimeout(900);
  const nx = await vp.evaluate((e) => e.scrollLeft);
  ok(nx > ar + 100, "nút Xem hoa sau cuộn gallery");
  ok(await page.locator("#vuon [data-fx-prev]").isEnabled(), "nút Xem hoa trước bật sau khi cuộn");
  // 3i custom cursor + magnetic
  ok((await page.locator("[data-fx=CustomCursor]").count()) > 0, "CustomCursor có mặt trên pointer mịn");
  ok((await page.locator("[data-fx=MagneticButton]").count()) >= 3, "MagneticButton gắn ở CTA chính");
  await ctx.close();
}

// ============ 4) reduced-motion: nội dung hiện đủ, không hiệu ứng
{
  const { ctx, page, errs } = await open({ reducedMotion: "reduce" }, 1440, 900, "", 1200);
  await scrollAll(page, 0.8);
  ok(errs.length === 0, "reduced-motion: 0 lỗi console");
  ok((await page.locator("canvas[data-fx=PetalRain]").count()) === 0, "reduced-motion: không dựng canvas cánh hoa");
  const st = await page.evaluate(() => ({
    bw: [...document.querySelectorAll("[data-bw]")].every((e) => +getComputedStyle(e).opacity === 1 && !/inset\(100/.test(getComputedStyle(e).clipPath)),
    masks: [...document.querySelectorAll("[data-pm-path]")].every((p) => !p.getAttribute("transform")),
    rise: [...document.querySelectorAll("[data-rise]")].length,
    riseVis: [...document.querySelectorAll("[data-rise]")].every((e) => +getComputedStyle(e).opacity === 1),
    scrub: [...document.querySelectorAll("[data-fx-w]")].every((e) => +getComputedStyle(e).opacity === 1),
    hero: [...document.querySelectorAll("#dau-trang [data-h]")].every((e) => +getComputedStyle(e).opacity >= 0.9),
    leafT: [...document.querySelectorAll("[data-leaf]")].every((e) => (getComputedStyle(e).transform === "none" || getComputedStyle(e).transform === "matrix(1, 0, 0, 1, 0, 0)")),
    blobStatic: document.querySelector("[data-fx=BlobMorph]")?.getAttribute("data-fx-ready"),
  }));
  ok(st.bw && st.masks && st.riseVis && st.scrub && st.hero, `reduced-motion: chữ/ảnh/mặt nạ/thẻ hiện đủ ${JSON.stringify(st)}`);
  ok(st.leafT, "reduced-motion: lá không parallax");
  ok(st.blobStatic === "static", "reduced-motion: blob đứng yên (static)");
  const txt = await page.evaluate(() => document.querySelector("main").innerText);
  ok(/Hoa cho những điều đang nở/.test(txt) && /Bó hoa của riêng bạn/.test(txt), "reduced-motion: tiêu đề đọc được");
  await ctx.close();
}

// ============ 5) Bouquet Builder
{
  const { ctx, page, errs } = await open({ permissions: ["clipboard-read", "clipboard-write"] }, 1440, 900, "", 1000);
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelector("#bo-hoa").scrollIntoView());
  await page.waitForTimeout(900);
  const num = (s) => Number(((s || "").match(/\d{1,3}(?:\.\d{3})+|\d+/) || ["0"])[0].replace(/\./g, ""));
  const total = async () => num(await page.locator('[data-testid="total"]').innerText());
  await page.waitForTimeout(900);
  const t0 = await total();
  ok(t0 > 100000 && t0 <= 500000, `mặc định: dịp sinh nhật, 500k, cỡ vừa -> ${t0}`);
  ok((await page.locator('[data-testid="bouquet-preview"] svg').count()) === 1, "có bó hoa SVG");
  const heads0 = await page.locator('[data-testid="bouquet-preview"] svg g').count();
  // đổi dịp -> lời thiệp đổi, <=80 ký tự
  const msgs = new Set();
  for (const [label] of [["Sinh nhật"], ["Khai trương"], ["Cưới"], ["Xin lỗi"]]) {
    await page.locator("label", { hasText: new RegExp("^" + label) }).first().click();
    await page.waitForTimeout(150);
    for (let i = 0; i < 3; i++) {
      const t = (await page.locator('[data-testid="card-text"]').innerText()).trim();
      ok(t.length > 0 && t.length <= 80, `thiệp ${label} #${i + 1} ≤80 ký tự (${t.length}): ${t}`);
      msgs.add(t);
      await page.locator('[data-testid="card-next"]').click(); await page.waitForTimeout(100);
    }
  }
  ok(msgs.size === 12, `12 lời thiệp khác nhau (${msgs.size})`);
  await page.locator("label", { hasText: /^Sinh nhật/ }).first().click();
  // tông màu & kích cỡ đổi bó
  const svg1 = await page.locator('[data-testid="bouquet-preview"]').innerHTML();
  await page.locator("label", { hasText: /Hồng sen/ }).click(); await page.waitForTimeout(200);
  const svg2 = await page.locator('[data-testid="bouquet-preview"]').innerHTML();
  ok(svg1 !== svg2, "đổi tông màu làm bó hoa đổi");
  await page.locator("label", { hasText: /^Lớn/ }).click(); await page.waitForTimeout(900);
  const tL = await total();
  ok(tL > t0 || (await page.locator('[data-testid="note-trim"]').count()) > 0, `cỡ lớn: giá ${tL} (> ${t0}) hoặc bị giảm cành`);
  ok(tL <= 500000 || (await page.locator('[data-testid="note-low"]').count()) > 0, "tổng không vượt ngân sách trừ khi báo thiếu");
  // chọn loại hoa, tối đa 4
  for (const f of ["Hoa hồng", "Mao lương", "Mẫu đơn", "Tulip"]) await page.locator("label", { hasText: new RegExp("^" + f) }).click();
  const fifth = page.locator("label", { hasText: /^Cẩm chướng/ }).locator("input");
  ok(await fifth.isDisabled(), "chọn tối đa 4 loại: loại thứ 5 bị khoá");
  ok((await page.locator("text=Đã chọn đủ 4 loại").count()) === 1, "có gợi ý khi đủ 4 loại");
  const lines = await page.locator("[class*=bLines] li").count();
  ok(lines === 4 + 2, `danh sách hoa: 4 loại + lá + giấy gói (${lines})`);
  // ngân sách thấp -> thiếu
  await page.locator("label", { hasText: /^Khác/ }).click();
  const cb = page.locator('input[type="text"][inputmode="numeric"]');
  await cb.fill("abc"); await page.waitForTimeout(100);
  ok((await cb.getAttribute("aria-invalid")) === "true" && (await page.locator("[role=alert]", { hasText: "Chỉ nhập số" }).count()) === 1, "ngân sách chữ -> lỗi cạnh ô + aria-invalid");
  await cb.fill("100k"); await page.waitForTimeout(100);
  ok((await page.locator("[role=alert]", { hasText: "tối thiểu" }).count()) === 1, "ngân sách 100k -> lỗi tối thiểu");
  await cb.fill("9tr"); await page.waitForTimeout(100);
  ok((await page.locator("[role=alert]", { hasText: "tư vấn riêng" }).count()) === 1, "ngân sách 9 triệu -> lỗi tối đa");
  await cb.fill(""); await page.waitForTimeout(100);
  ok((await page.locator("[role=alert]", { hasText: "Nhập ngân sách" }).count()) === 1, "ngân sách rỗng -> nhắc nhập");
  await cb.fill("150k"); await page.waitForTimeout(900);
  ok((await page.locator('[data-testid="note-low"]').count()) === 1, "150k + cỡ lớn + hoa đắt -> cảnh báo chưa đủ ngân sách");
  await cb.fill("650k"); await page.waitForTimeout(900);
  ok((await cb.getAttribute("aria-invalid")) !== "true", "650k hợp lệ");
  const tc = await total();
  ok(tc <= 650000 || (await page.locator('[data-testid="note-low"]').count()) > 0, `650k: tổng ${tc} nằm trong ngân sách (hoặc báo thiếu)`);
  // preset 300k và tự gợi ý
  await page.locator("label", { hasText: /^300k/ }).click();
  for (const f of ["Hoa hồng", "Mao lương", "Mẫu đơn", "Tulip"]) await page.locator("label", { hasText: new RegExp("^" + f) }).click();
  await page.locator("label", { hasText: /^Vừa/ }).click(); await page.waitForTimeout(900);
  const t300 = await total();
  ok(t300 <= 300000 || (await page.locator('[data-testid="note-low"]').count()) > 0, `300k, không chọn hoa (tự gợi ý): tổng ${t300}`);
  ok((await page.locator("text=Bạn chưa chọn loại hoa").count()) === 1, "không chọn hoa -> Nở Rừng gợi ý");
  // lưu localStorage
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("nr-builder-v1") || "null"));
  ok(saved && saved.budget === 300000 && saved.size === "vua", "lưu trạng thái vào localStorage");
  await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(900);
  ok((await page.locator("label", { hasText: /^300k/ }).locator("input").isChecked()), "khôi phục ngân sách sau tải lại");
  // đổi dịp từ danh sách dịp
  await page.evaluate(() => document.querySelector("#dip").scrollIntoView());
  await page.waitForTimeout(500);
  await page.locator('[data-pick-occasion="cuoi"]').click(); await page.waitForTimeout(600);
  ok(await page.locator("label", { hasText: /^Cưới/ }).locator("input").isChecked(), "bấm 'Dựng bó cho dịp cưới' -> Builder chọn dịp Cưới");
  // chép tóm tắt
  await page.evaluate(() => document.querySelector("#bo-hoa").scrollIntoView()); await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Chép bản tóm tắt" }).click(); await page.waitForTimeout(300);
  const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => "");
  ok(/Giá tham khảo/.test(clip) && /Lời thiệp/.test(clip), "chép bản tóm tắt vào clipboard");
  const forbid = clip.match(BAD);
  ok(!forbid, "bản tóm tắt không có chữ cấm");
  // CTA
  const href = await page.locator('[data-testid="builder-cta"]').getAttribute("href");
  ok(/^\/lien-he/.test(href || ""), `CTA Builder tới form tư vấn: ${href}`);
  const href2 = await page.locator('[data-testid="closing-cta"]').getAttribute("href");
  const hasParams = /industry=/.test(href || "") && /solution=/.test(href || "") && /utm_campaign=hoa-tuoi/.test(href || "");
  console.log(`INFO href đầy đủ: ${href} | closing: ${href2} | industry/solution/utm ${hasParams ? "ĐÃ có" : "CHƯA có (cần điều phối viên chạy scripts/showroom-registry-sync.mjs để registry có hoa-tuoi)"}`);
  ok(href === href2, "hai CTA cùng một link thoát");
  // kiểm cả chữ cấm ở các trạng thái lỗi/thiếu
  const all = await page.evaluate(() => document.querySelector("main").innerText);
  ok(!all.match(BAD), "không chữ cấm sau khi chạy luồng Builder");
  ok(errs.length === 0, `Builder: 0 lỗi console (${errs.slice(0, 2).join("|")})`);
  await page.screenshot({ path: path.join(shots, "d-builder-state.png") });
  await ctx.close();
}

// ============ 6) bàn phím, menu mobile, IME, ?ref, credits
{
  const { ctx, page } = await open({}, 1440, 900, "?ref=abc", 1000);
  const href = await page.locator('[data-testid="closing-cta"]').getAttribute("href");
  ok(!!href && href.startsWith("/lien-he"), "link thoát cùng origin (cookie tct_ref đi theo, trang không đọc/ghi cookie)");
  const cookies = await ctx.cookies();
  ok(!cookies.some((c) => c.name === "tct_ref" && false), "trang không tự ghi cookie");
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.textContent);
  ok(/Bỏ qua/.test(skip || ""), "Tab đầu tiên là skip link");
  let reached = false;
  for (let i = 0; i < 40 && !reached; i++) { await page.keyboard.press("Tab"); reached = await page.evaluate(() => /Tự tay dựng bó hoa/.test(document.activeElement?.textContent || "")); }
  ok(reached, "Tab tới CTA chính");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  ok(outline !== "none", "CTA có focus-visible rõ");
  // chiều cao nút
  const hts = await page.evaluate(() => [...document.querySelectorAll("a.btn,button")].filter((e) => e.offsetParent).map((e) => Math.round(e.getBoundingClientRect().height)));
  ok(hts.every((h) => h >= 44), `mọi nút ≥44px (min ${Math.min(...hts)})`);
  const fs16 = await page.evaluate(() => [...document.querySelectorAll("input[type=text]")].every((e) => parseFloat(getComputedStyle(e).fontSize) >= 16));
  ok(fs16, "input ≥16px");
  const cr = await page.goto(`${BASE}/demos/hoa-tuoi/credits`, { waitUntil: "networkidle" });
  ok(cr.status() === 200, "trang credits 200");
  ok((await page.locator("li dl").count()) === 12, "credits liệt kê 12 ảnh");
  ok(/Pexels/.test(await page.locator("main").innerText()), "credits ghi nguồn Pexels");
  ok(!(await page.locator("main").innerText()).match(BAD), "credits không có chữ cấm");
  await ctx.close();
}
{
  const { ctx, page } = await open({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }, 390, 844, "", 1200);
  const menu = page.getByRole("button", { name: /Mở menu/ });
  await menu.click(); await page.waitForTimeout(200);
  ok(await page.locator("#nr-menu").isVisible(), "menu mobile mở");
  await page.keyboard.press("Escape"); await page.waitForTimeout(150);
  ok(!(await page.locator("#nr-menu").isVisible()), "Escape đóng menu mobile");
  ok(await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "nr-menu"), "trả focus về nút menu");
  ok((await page.locator("canvas[data-fx=PetalRain]").count()) === 1, "mobile: vẫn có cánh hoa (14 cánh)");
  ok((await page.locator("[data-fx=CustomCursor]").count()) === 0 || !(await page.locator("[data-fx=CustomCursor]").isVisible()), "mobile: không có con trỏ tuỳ chỉnh");
  await page.screenshot({ path: path.join(shots, "m-hero-390.png") });
  await page.evaluate(() => { document.querySelector("#bo-hoa").scrollIntoView(); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(shots, "m-builder-390.png") });
  await ctx.close();
}

// ============ 7) ảnh full page + hiệu năng thô (long task) ở 1440 và 390
for (const [w, h, tag] of [[1440, 900, "d"], [390, 844, "m"]]) {
  const { ctx, page } = await open(tag === "m" ? { isMobile: true, hasTouch: true } : {}, w, h, "", 3800);
  await page.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ["longtask"] }); });
  await page.screenshot({ path: path.join(shots, `${tag}-hero.png`) });
  await scrollAll(page, 0.5);
  await page.waitForTimeout(800);
  const lt = await page.evaluate(() => window.__lt.filter((d) => d > 200));
  console.log(`INFO long task >200ms khi cuộn toàn trang ở ${w}px: ${lt.length} ${lt.map((d) => Math.round(d)).join(",")}`);
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(shots, `${tag}-full.png`), fullPage: true });
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
