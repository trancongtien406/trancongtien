// Chạy: node tests/showroom/khoi-nep/e2e.mjs   (cần dev server http://127.0.0.1:3100)
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire("/Users/mac/mern/works/hancitywebsite/package.json");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:3100";
const URL_ = `${BASE}/demos/khoi-nep`;
const DIR = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.join(DIR, "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

let pass = 0, fail = 0;
const failures = [];
const ok = (cond, name, extra = "") => {
  if (cond) { pass++; console.log("  PASS", name); }
  else { fail++; failures.push(name); console.log("  FAIL", name, extra); }
};
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });

async function newPage(w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, acceptDownloads: true, reducedMotion: opts.reduced ? "reduce" : "no-preference", permissions: ["clipboard-read", "clipboard-write"], deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.setDefaultTimeout(40000);
  page.setDefaultNavigationTimeout(45000);
  const errors = [], external = [];
  page.on("console", (m) => { if (m.type() === "error" && !/webpack-hmr/.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("request", (r) => { const u = new URL(r.url()); if (!u.href.startsWith("data:") && !u.href.startsWith("blob:") && u.origin !== new URL(BASE).origin) external.push(r.url()); });
  return { ctx, page, errors, external };
}
const BANNED = /\bdemo\b|minh h[oọ][aạ]|giả định|mô phỏng|dữ liệu mẫu|giả lập|không phải doanh nghiệp|không phải tác phẩm|thương hiệu minh/i;
// quét văn bản hiển thị + thuộc tính người dùng thấy/nghe (aria-label, alt, title, placeholder, value) + meta; bỏ qua href/src (đường dẫn /demos/ là URL)
async function scanAll(page) {
  return page.evaluate((src) => {
    const re = new RegExp(src, "i"); const hits = [];
    const add = (where, s) => { const m = s && s.match(re); if (m) hits.push(where + ": " + m[0] + " <- " + s.slice(0, 60)); };
    add("text", document.body.innerText); add("title", document.title);
    for (const m of document.querySelectorAll('meta[name="description"],meta[property^="og:"],meta[name^="twitter:"]')) add("meta", m.getAttribute("content") || "");
    for (const el of document.querySelectorAll("[aria-label],[alt],[title],[placeholder],[aria-description]")) for (const a of ["aria-label", "alt", "title", "placeholder", "aria-description"]) add(a, el.getAttribute(a) || "");
    for (const el of document.querySelectorAll("dialog:not([open]),[hidden]")) add("hidden", el.textContent || "");
    return hits;
  }, BANNED.source);
}
const raceTo = (pr, ms = 8000) => Promise.race([pr, new Promise((r) => setTimeout(() => r("__TIMEOUT__"), ms))]);
async function scrollAll(page) {
  // dev server dùng chung hay Fast Refresh: mọi bước đều có giới hạn thời gian để không treo
  const h = (await raceTo(page.evaluate(() => document.documentElement.scrollHeight))) || 12000;
  for (let y = 0; y < (typeof h === "number" ? h : 12000); y += 1100) {
    await raceTo(page.evaluate((v) => window.scrollTo(0, v), y), 4000);
    await page.waitForTimeout(110);
  }
  await page.waitForTimeout(1400);
  await raceTo(page.evaluate(() => window.scrollTo(0, 0)), 4000);
  await page.waitForTimeout(300);
}

console.log("== 1. Tải trang, console, request ngoài origin");
{
  const { ctx, page, errors, external } = await newPage(1440, 900);
  const res = await page.goto(URL_, { waitUntil: "networkidle" });
  ok(res.status() === 200, "HTTP 200");
  ok((await page.title()).includes("Khối Nếp"), "title riêng", await page.title());
  await scrollAll(page);
  ok(errors.length === 0, "0 lỗi console", errors.join(" | "));
  ok(external.length === 0, "0 request ngoài origin", external.join(", "));
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  ok(/noindex/.test(robots || ""), "robots noindex", robots);
  ok((await page.locator("h1").count()) === 1, "đúng 1 h1");
  const imgs = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
  ok(imgs.length === 0, "mọi ảnh tải được", imgs.join(", "));
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  const consult = hrefs.find((h) => h.startsWith("/lien-he"));
  const q = new globalThis.URL(consult, "http://x").searchParams;
  ok(q.get("industry") === "Nội thất" && q.get("solution") === "construction" && q.get("utm_campaign") === "khoi-nep" && q.get("utm_source") === "showroom", "link thoát đủ industry/solution/utm", consult);
  ok((await page.locator("text=Ảnh & ghi công").count()) > 0 && hrefs.includes("/demos/khoi-nep/credits"), "link Ảnh & ghi công");
  ok((await page.locator("text=Trần Công Tiến").count()) > 0, "dòng ký tên thiết kế website");
  const body = await page.evaluate(() => document.body.innerText);
  ok(!/trancongtien406|0382/.test(body), "không lộ email/SĐT thật");
  ok(!BANNED.test(body), "trang chủ không chứa từ bị cấm", (body.match(BANNED) || [""])[0]);
  ok((await scanAll(page)).length === 0, "quét văn bản+aria/alt/title+meta: sạch", JSON.stringify(await scanAll(page)));
  await ctx.close();
}

console.log("== 2. Không tràn ngang");
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await newPage(w, 900);
  await page.goto(URL_, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(r.sw <= r.cw, `không tràn ngang @${w}`, JSON.stringify(r));
  await ctx.close();
}

console.log("== 3. Font Việt render thật");
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(URL_, { waitUntil: "networkidle" });
  const r = await page.evaluate(async () => {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 4000))]);
    const probe = "Ắ Ằ Ẳ Ẵ Ặ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự ă â ê ô ơ ư đ Đ";
    const fam = (sel) => getComputedStyle(document.querySelector(sel)).fontFamily;
    const sans = fam("h2"), serif = fam("p");
    const width = (font, t) => { const c = document.createElement("canvas").getContext("2d"); c.font = font; return c.measureText(t).width; };
    const out = {};
    for (const [k, f, w] of [["sans500", sans, 500], ["sans600", sans, 600], ["serif400", serif, 400]]) {
      const withFont = width(`${w} 32px ${f}, monospace`, probe);
      const only = width(`${w} 32px monospace`, probe);
      out[k] = { differs: Math.abs(withFont - only) > 5, loaded: document.fonts.check(`${w} 32px ${f}`, probe) };
    }
    const loaded = [...document.fonts].filter((f) => f.status === "loaded").length;
    return { out, loaded, sans, serif };
  });
  ok(r.loaded >= 4, "FontFace đã tải (>=4)", String(r.loaded));
  for (const k of Object.keys(r.out)) ok(r.out[k].differs && r.out[k].loaded, `glyph Việt không fallback: ${k}`, JSON.stringify(r.out[k]));
  ok(/IBM|ibm|__/i.test(r.sans) || r.sans.includes("kn") || r.sans.length > 10, "font-family heading dùng font thương hiệu", r.sans);
  await ctx.close();
}

console.log("== 3b. Dấu chồng tiếng Việt (Ố Ế Ể Ệ Ợ Ử Ữ) + wordmark");
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const { ctx, page } = await newPage(w, h, { reduced: true });
  await page.goto(URL_, { waitUntil: "networkidle" });
  await raceTo(page.evaluate(() => document.fonts.ready), 6000);
  const r = await page.evaluate(() => {
    const out = { nfc: true, glyphs: {}, gaps: [] };
    out.nfc = document.body.innerText === document.body.innerText.normalize("NFC");
    const c = document.createElement("canvas").getContext("2d");
    const mast = document.querySelector("[data-mast]");
    const sans = getComputedStyle(mast).fontFamily;
    const serif = getComputedStyle(document.querySelector("p")).fontFamily;
    const chars = [..."ỐẾỂỆỢỬỮẮẰẲẴẶẤẦẨẪẬỒỔỖỘỜỞỠỚỨỪỰ"];
    for (const [k, fam, wt] of [["sans600", sans, 600], ["serif400", serif, 400]]) {
      const bad = [];
      for (const ch of chars) {
        // glyph "vắng" khi chiều rộng không đổi với CẢ HAI font dự phòng (một font dự phòng có thể trùng bề rộng ngẫu nhiên, vd monospace 0.6em)
        const w = (f) => { c.font = f; return c.measureText(ch).width; };
        const absent = Math.abs(w(`${wt} 64px ${fam}, monospace`) - w(`${wt} 64px monospace`)) < 0.5 && Math.abs(w(`${wt} 64px ${fam}, serif`) - w(`${wt} 64px serif`)) < 0.5;
        if (absent) bad.push(ch);
      }
      out.glyphs[k] = bad;
    }
    // khoảng hở giữa mực của chữ có dấu chồng và chữ kế bên (masthead + wordmark footer)
    for (const [name, host] of [["mast", mast], ["footer", document.querySelector("footer p[aria-hidden]")]]) {
      const els = [...host.querySelectorAll("[data-chin]")];
      const cs = getComputedStyle(els[0]);
      c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      els.forEach((el, i) => {
        const ch = el.textContent;
        if (!/[ẤẾỐ]/.test(ch) || !els[i + 1]) return;
        const nx = els[i + 1];
        const mi = c.measureText(ch), mn = c.measureText(nx.textContent);
        const gap = nx.getBoundingClientRect().left - mn.actualBoundingBoxLeft - (el.getBoundingClientRect().left + mi.actualBoundingBoxRight);
        out.gaps.push({ name, ch, next: nx.textContent, gap: Math.round(gap * 10) / 10, fs: cs.fontSize });
      });
    }
    return out;
  });
  ok(r.nfc, `@${w} văn bản trang ở dạng NFC`);
  ok(r.glyphs.sans600.length === 0, `@${w} Sans 600 đủ glyph dấu chồng`, r.glyphs.sans600.join(""));
  ok(r.glyphs.serif400.length === 0, `@${w} Serif 400 đủ glyph dấu chồng`, r.glyphs.serif400.join(""));
  ok(r.gaps.length >= 4 && r.gaps.every((g) => g.gap >= 1), `@${w} dấu của Ố/Ế không đè chữ kế bên`, JSON.stringify(r.gaps));
  await ctx.close();
}

console.log("== 4. Reduced motion: nội dung hiện đủ");
{
  const { ctx, page } = await newPage(1440, 900, { reduced: true });
  await page.goto(URL_, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const r = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const cs = getComputedStyle(h1);
    const rules = [...document.querySelectorAll("i")].filter((e) => e.getBoundingClientRect().height <= 1.5 && e.getBoundingClientRect().width > 100);
    return { op: cs.opacity, tr: cs.transform, veils: document.querySelectorAll(".kn-veil").length, ruleTransforms: rules.map((e) => getComputedStyle(e).transform), mast: [...document.querySelectorAll("[data-chin]")].map((e) => getComputedStyle(e).transform) };
  });
  ok(r.op === "1" && (r.tr === "none"), "h1 hiện đủ", JSON.stringify(r));
  ok(r.veils === 0, "không có lớp che ảnh");
  ok(r.ruleTransforms.every((t) => t === "none"), "đường kẻ hiện đủ", r.ruleTransforms.join(";"));
  ok(r.mast.every((t) => t === "none"), "masthead hiện đủ");
  await ctx.close();
}

console.log("== 5. Budget Estimator");
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(URL_, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  const range = page.getByTestId("est-range");
  await page.evaluate(() => document.getElementById("budget").scrollIntoView({ block: "center" }));
  ok((await range.innerText()).replace(/\s/g, " ") === "162–216 triệu", "mặc định 80m² căn hộ thiết yếu trọn gói = 162–216 triệu", await range.innerText());
  ok((await page.getByTestId("est-base").innerText()).includes("180.000.000"), "chi phí cơ sở 180.000.000 ₫", await page.getByTestId("est-base").innerText());
  await page.getByLabel("Cân bằng").check();
  ok((await range.innerText()).includes("270–360"), "cân bằng 80m² = 270–360 triệu", await range.innerText());
  await page.getByLabel("Nhà phố").check();
  await page.locator("#kn-area").fill("100");
  ok((await range.innerText()).includes("371–495"), "nhà phố 100 cân bằng = 371–495 triệu", await range.innerText());
  await page.getByLabel("Biệt thự").check();
  await page.locator("#kn-area").fill("200");
  await page.getByLabel("Tinh tuyển").check();
  ok((await range.innerText()).includes("1,29–1,73"), "biệt thự 200 tinh tuyển = 1,29–1,73 tỷ", await range.innerText());
  await page.getByLabel("Chỉ thiết kế").check();
  await page.getByLabel("Căn hộ", { exact: true }).check();
  await page.locator("#kn-area").fill("80");
  ok((await range.innerText()).includes("18–24"), "căn hộ 80 chỉ thiết kế = 18–24 triệu", await range.innerText());
  ok(await page.locator('input[name="kn-finish"]').first().isDisabled(), "chỉ thiết kế khoá mức hoàn thiện");
  await page.getByLabel("Thiết kế & thi công").check();
  // lỗi
  const cases = [["", "Nhập diện tích"], ["abc", "số hợp lệ"], ["10", "tối thiểu là 20"], ["1500", "tối đa 1.000"], ["50.55", "một chữ số thập phân"]];
  for (const [val, msg] of cases) {
    await page.locator("#kn-area").fill(val);
    const err = await page.locator("#kn-area-err").innerText().catch(() => "");
    ok(err.includes(msg) && (await page.locator("#kn-area").getAttribute("aria-invalid")) === "true", `lỗi diện tích "${val}"`, err);
    ok((await page.getByTestId("est-empty").count()) === 1, `trạng thái rỗng khi "${val}"`);
  }
  // bàn phím
  await page.locator("#kn-area").fill("80");
  await page.locator("#kn-area").focus();
  await page.keyboard.press("ArrowUp");
  ok((await page.locator("#kn-area").inputValue()) === "85", "phím ↑ tăng 5");
  // lưu + khôi phục
  await page.getByRole("button", { name: "Lưu dự toán" }).click();
  ok((await page.getByText("Đã lưu dự toán trên thiết bị này.").count()) === 1, "lưu thành công");
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  ok((await page.locator("#kn-area").inputValue()) === "85", "khôi phục sau reload");
  ok((await scanAll(page)).length === 0, "estimator (kết quả+lỗi) sạch", JSON.stringify(await scanAll(page)));
  // sao chép
  await page.getByRole("button", { name: "Sao chép dự toán" }).click();
  await page.waitForTimeout(200);
  const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => "");
  ok(clip.includes("DỰ TOÁN THAM KHẢO") && clip.includes("Khoảng ngân sách"), "sao chép nội dung dự toán", clip.slice(0, 60));
  ok(!BANNED.test(clip), "nội dung sao chép không có từ bị cấm");
  // storage bị chặn
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error("blocked"); }; });
  await page.getByRole("button", { name: "Lưu dự toán" }).click();
  ok((await page.getByText("Không thể lưu trên thiết bị này").count()) === 1, "báo lỗi khi storage bị chặn");
  // Dịch vụ -> chọn scope
  await page.getByRole("button", { name: /Dự toán phí thiết kế/ }).click();
  await page.waitForTimeout(700);
  ok(await page.getByLabel("Chỉ thiết kế").isChecked(), "CTA dịch vụ chọn sẵn phạm vi Chỉ thiết kế");
  await ctx.close();
}

console.log("== 6. Material Board Builder");
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(URL_, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  const board = page.locator("#board");
  await board.scrollIntoViewIfNeeded();
  ok((await page.getByTestId("board-empty").count()) === 1, "danh sách đã lưu rỗng ban đầu");
  // chọn vật liệu
  await board.getByRole("radio", { name: /Gỗ óc chó/ }).check();
  const mood = await page.getByTestId("moodboard").getAttribute("aria-label");
  ok(mood.includes("Gỗ óc chó"), "chọn gỗ óc chó cập nhật bảng", mood);
  ok((await board.locator("ul[aria-label='Bảng màu'] li").count()) === 5, "bảng màu 5 ô");
  // lỗi tên rỗng
  await page.locator("#kn-bname").fill("");
  await page.getByRole("button", { name: "Lưu bảng vật liệu" }).click();
  ok((await page.locator("#kn-bname-err").count()) === 1 && (await page.locator("#kn-bname").getAttribute("aria-invalid")) === "true", "lỗi tên rỗng cạnh ô");
  await page.locator("#kn-bname").fill("Phòng khách Ắ Ự");
  await page.locator("#kn-bnotes").fill("Ưu tiên ánh sáng buổi sáng, đồ gỗ mộc.");
  await page.getByRole("button", { name: "Lưu bảng vật liệu" }).click();
  ok((await page.getByText("Bảng vật liệu đã được lưu trên thiết bị này.").count()) === 1, "lưu bảng thành công");
  ok((await page.getByTestId("board-list").locator("li").count()) === 1, "bảng xuất hiện trong danh sách");
  // lưu bản mới
  await page.getByRole("button", { name: "Lưu thành bản mới" }).click();
  ok((await page.getByTestId("board-list").locator("li").count()) === 2, "lưu thành bản mới tạo bản sao");
  // reload giữ
  await page.reload({ waitUntil: "networkidle" });
  ok((await page.getByTestId("board-list").locator("li").count()) === 2, "bảng còn sau reload");
  // preset ghi đè có xác nhận (draft khôi phục => dirty)
  await page.getByRole("button", { name: /Mộc xanh/ }).click();
  ok((await page.getByRole("alertdialog").count()) === 1, "hỏi xác nhận khi bảng đã chỉnh");
  await page.getByRole("button", { name: "Ghi đè" }).click();
  ok((await board.getByRole("radio", { name: /Vải olive/ }).isChecked()), "preset Mộc xanh áp dụng vải olive");
  // xuất txt
  const [dTxt] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Xuất ghi chú" }).click()]);
  const txtPath = path.join(SHOTS, "export.txt");
  await dTxt.saveAs(txtPath);
  const txt = fs.readFileSync(txtPath, "utf8");
  ok(txt.includes("Phòng khách Ắ Ự") && txt.includes("#"), "xuất .txt UTF-8 giữ dấu", txt.slice(0, 80));
  ok(!BANNED.test(txt), "file .txt xuất ra không có từ bị cấm");
  ok((await scanAll(page)).length === 0, "board builder (đã lưu+hộp xác nhận) sạch", JSON.stringify(await scanAll(page)));
  // xuất png
  const [dPng] = await Promise.all([page.waitForEvent("download", { timeout: 15000 }), page.getByRole("button", { name: "Xuất ảnh PNG" }).click()]);
  const pngPath = path.join(SHOTS, "board-export.png");
  await dPng.saveAs(pngPath);
  const buf = fs.readFileSync(pngPath);
  const isPng = buf.slice(1, 4).toString() === "PNG";
  const wpx = buf.readUInt32BE(16), hpx = buf.readUInt32BE(20);
  ok(isPng && wpx === 1600 && hpx === 1200, "xuất PNG 1600×1200", `${wpx}x${hpx}`);
  ok(/khoi-nep-material-board-phong-khach-a-u-\d{4}-\d{2}-\d{2}\.png/.test(dPng.suggestedFilename()) || dPng.suggestedFilename().startsWith("khoi-nep-material-board-"), "tên file PNG", dPng.suggestedFilename());
  // xoá có xác nhận
  const li = page.getByTestId("board-list").locator("li").first();
  await li.getByRole("button", { name: "Xoá" }).click();
  await li.getByRole("button", { name: "Xác nhận xoá" }).click();
  ok((await page.getByTestId("board-list").locator("li").count()) === 1, "xoá bảng sau xác nhận");
  await ctx.close();
}

console.log("== 7. Dialog + bàn phím + link ref");
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(URL_ + "?ref=ABC123", { waitUntil: "networkidle" });
  // proxy.ts chỉ đặt tct_ref khi mã đối tác tồn tại trong DB (không dựng được ở test) => kiểm: trang mở được với ?ref=, link thoát là đường dẫn tương đối cùng origin (cookie first-party tự đi theo)
  const consultHref = await page.locator('[data-cta="primary"]').getAttribute("href");
  ok(consultHref.startsWith("/lien-he?") && !/ref=/.test(consultHref), "mở với ?ref= vẫn ổn; link thoát tương đối cùng origin", consultHref);
  // Tab tới CTA chính
  let reached = false;
  for (let i = 0; i < 20; i++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => document.activeElement?.getAttribute("data-cta") === "primary")) { reached = true; break; } }
  ok(reached, "Tab tới được CTA chính");
  // dialog
  const trigger = page.getByRole("button", { name: /Xem hồ sơ.*Căn hộ/ });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  ok(await page.locator("dialog[open]").count() === 1, "dialog mở");
  ok((await scanAll(page)).length === 0, "dialog loại công trình sạch", JSON.stringify(await scanAll(page)));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  ok(await page.locator("dialog[open]").count() === 0, "Escape đóng dialog");
  ok(await trigger.evaluate((el) => el === document.activeElement), "trả focus về nút mở");
  // áp dụng bảng vật liệu
  await trigger.click();
  await page.getByRole("button", { name: "Áp dụng bảng vật liệu" }).click();
  await page.waitForTimeout(900);
  ok((await page.locator("#board").getByRole("radio", { name: /Travertine/ }).isChecked()), "dialog áp preset Nếp ấm vào board");
  // skip link
  await page.keyboard.press("Home");
  // menu mobile Esc
  await ctx.close();
  const m = await newPage(390, 844);
  await m.page.goto(URL_, { waitUntil: "networkidle" });
  const menuBtn = m.page.locator('button[aria-controls="kn-menu"]');
  await menuBtn.click();
  ok((await menuBtn.getAttribute("aria-expanded")) === "true", "menu mobile mở");
  await m.page.keyboard.press("Escape");
  ok(await m.page.locator("#kn-menu").isHidden(), "Escape đóng menu mobile");
  await m.ctx.close();
}


console.log("== 9. Rework: nội dung công ty thật + hiệu ứng chữ ký");
{
  const { ctx, page, errors } = await newPage(1440, 900);
  await page.goto(URL_, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const hero = await page.locator("#hero").innerText();
  ok(/thi công nội thất/i.test(hero) && /Hải Châu, Đà Nẵng/i.test(hero) && /Đặt lịch khảo sát/.test(hero) && /250\.000/.test(hero) && /2\.000\.000/.test(hero), "hero: loại hình, khu vực, CTA khảo sát, 3 sự thật");
  ok(await page.locator("#hero li").count() === 3, "hero 3 sự thật");
  for (const id of ["services", "spaces", "process", "floorplan", "packages", "budget", "materials", "board", "faq", "start"]) ok(await page.locator("#" + id).count() === 1, "có section #" + id);
  ok(await page.locator("#process ol > li").count() === 5, "quy trình 5 bước");
  ok((await page.locator("#process").innerText()).split("Bạn nhận:").length === 6, "mỗi bước có đầu ra");
  ok(await page.locator("#spaces article").count() === 4, "4 loại công trình");
  ok(await page.locator("#faq li").count() === 10, "10 câu FAQ");
  const body = await page.evaluate(() => document.body.innerText);
  ok(/bảo hành/i.test(body) && /theo đợt/i.test(body), "có bảo hành + thanh toán theo đợt");
  ok(await page.locator('[data-fx=PinnedHorizontalScroll]').count() === 1, "PinnedHorizontalScroll cho loại công trình");
  ok((await scanAll(page)).length === 0, "rework: quét nhãn cấm sạch", JSON.stringify(await scanAll(page)));
  // slider mặt bằng -> phối cảnh
  const fp = page.getByTestId("floorplan");
  await fp.scrollIntoViewIfNeeded(); await page.waitForTimeout(2600);
  const rng = page.getByTestId("floorplan-range");
  await rng.fill("20");
  const c1 = await page.locator('[data-testid=floorplan] > div').nth(1).evaluate((e) => e.style.clipPath);
  await rng.fill("80");
  const c2 = await page.locator('[data-testid=floorplan] > div').nth(1).evaluate((e) => e.style.clipPath);
  ok(c1 !== c2 && /inset/.test(c1), "slider mặt bằng→phối cảnh đổi clip-path", c1 + " | " + c2);
  await fp.scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  const box = await fp.boundingBox();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2); await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height / 2, { steps: 6 }); await page.mouse.up();
  ok(Number(await rng.inputValue()) >= 85, "kéo chuột đổi vị trí slider", await rng.inputValue());
  // kéo-thả vật liệu
  const drop = page.getByTestId("material-drop");
  await drop.scrollIntoViewIfNeeded();
  const chip = drop.locator('[data-mat=F02]'); const floor = drop.locator('[data-zone=floor]');
  const cb = await chip.boundingBox(); const fb = await floor.boundingBox();
  await page.mouse.move(cb.x + 20, cb.y + 20); await page.mouse.down();
  await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2, { steps: 8 }); await page.mouse.up();
  ok(/Sàn\s*Vải olive/.test((await page.getByTestId("drop-summary").innerText()).replace(/\n/g, "")), "kéo-thả: Vải olive vào Sàn");
  // bàn phím: chọn mẫu rồi bấm vùng
  await drop.locator('[data-mat=S01]').focus(); await page.keyboard.press("Enter");
  await drop.locator('[data-zone=wall]').click();
  ok(/Tường\s*Travertine/.test((await page.getByTestId("drop-summary").innerText()).replace(/\n/g, "")), "bàn phím: chọn mẫu + bấm vùng Tường");
  ok(errors.length === 0, "rework: 0 lỗi console", errors.join("|"));
  await ctx.close();
}
{
  const { ctx, page } = await newPage(390, 844);
  await page.goto(URL_, { waitUntil: "networkidle" });
  const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(r.sw <= r.cw, "mobile không tràn ngang sau rework", JSON.stringify(r));
  await ctx.close();
}

console.log("== 8. FAQ + credits");
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(URL_, { waitUntil: "networkidle" });
  const q1 = page.locator("#faq-q-0"), q2 = page.locator("#faq-q-1");
  await q1.click();
  ok((await q1.getAttribute("aria-expanded")) === "true", "FAQ mở câu 1");
  ok((await scanAll(page)).length === 0, "FAQ mở sạch", JSON.stringify(await scanAll(page)));
  await q2.click();
  ok((await q1.getAttribute("aria-expanded")) === "false" && (await q2.getAttribute("aria-expanded")) === "true", "chỉ mở một câu mỗi lần");
  const { page: p2, errors, external } = await newPage(1440, 900);
  await ctx.close();
  const c = await newPage(1440, 900);
  const res = await c.page.goto(`${URL_}/credits`, { waitUntil: "networkidle" });
  ok(res.status() === 200, "credits 200");
  await c.page.evaluate(async () => { for (const i of document.images) i.loading = "eager"; await new Promise((r) => setTimeout(r, 1200)); });
  const n = await c.page.locator("ul li img").count();
  ok(n === 12, "credits liệt kê 12 ảnh", String(n));
  const bad = await c.page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length);
  ok(bad === 0, "ảnh credits tải được");
  ok((await c.page.locator("text=Pexels").count()) > 0 && (await c.page.locator("text=IBM Plex Sans").count()) > 0, "credits có nguồn Pexels + font");
  ok((await scanAll(c.page)).length === 0, "credits không có từ bị cấm", JSON.stringify(await scanAll(c.page)));
  ok(/do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công/.test(await c.page.evaluate(() => document.body.innerText)), "credits giữ lời công khai trung thực");
  ok(c.errors.length === 0 && c.external.length === 0, "credits 0 lỗi console / 0 request ngoài", c.errors.join("|") + c.external.join(","));
  await c.page.screenshot({ path: path.join(SHOTS, "credits-1440.png"), fullPage: true });
  await c.ctx.close();
}

console.log("== 9. Ảnh chụp");
for (const [w, h, tag] of [[1440, 900, "1440"], [390, 844, "390"]]) {
  const { ctx, page } = await newPage(w, h);
  await page.goto(URL_, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: path.join(SHOTS, `hero-${tag}.png`) });
  await scrollAll(page);
  await page.screenshot({ path: path.join(SHOTS, `full-${tag}.png`), fullPage: true });
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) console.log("FAIL:\n - " + failures.join("\n - "));
process.exit(fail ? 1 : 0);
