// E2E Nét Lệch (LP-10). Chạy: BASE=http://localhost:3100 node tests/showroom/net-lech/e2e.mjs
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/net-lech`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra = '') {
  if (cond) { pass++; console.log('  PASS', name); } else { fail++; failures.push(name + ' ' + extra); console.log('  FAIL', name, extra); }
}
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'], ...opts });
  const page = await ctx.newPage();
  page.errors = []; page.external = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['http:', 'https:'].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); });
  return { ctx, page };
}
const load = async (page, url = URL_) => { await page.goto(url, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2000); };
async function slowScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); }
    await new Promise((r) => setTimeout(r, 700)); window.scrollTo(0, 0);
    await Promise.race([Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })), new Promise((r) => setTimeout(r, 15000))]);
  });
  await page.waitForTimeout(700);
}
const FORBID = /\bdemo\b|minh ho[aạ]|giả định|mô phỏng|dữ liệu mẫu|giả lập|thương hiệu minh|không phải doanh nghiệp|không phải tác phẩm|yêu cầu mẫu|ảnh mẫu/i;
async function scanForbidden(page) {
  const found = await page.evaluate(() => {
    const out = [document.title];
    out.push(document.body.innerText);
    for (const m of document.querySelectorAll('meta[content]')) out.push(m.getAttribute('content'));
    for (const e of document.querySelectorAll('[alt],[aria-label],[title],[placeholder],[aria-description],option,dialog,textarea,svg title')) {
      for (const a of ['alt', 'aria-label', 'title', 'placeholder', 'aria-description']) { const v = e.getAttribute && e.getAttribute(a); if (v) out.push(v); }
      out.push(e.textContent || ''); if (e.value) out.push(e.value);
    }
    for (const j of document.querySelectorAll('script[type="application/ld+json"]')) out.push(j.textContent);
    return out;
  });
  return found.map((t) => (t || '').normalize('NFC')).filter((t) => FORBID.test(t)).map((t) => t.match(FORBID)[0] + ' @ ' + t.slice(Math.max(0, t.search(FORBID) - 30), t.search(FORBID) + 40));
}
const num = (s) => Number((s || '').replace(/[^\d]/g, ''));

// ---------- 1
console.log('[1] Tải trang, console, request ngoài origin, metadata');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'HTTP 200', String(res.status()));
  await page.waitForTimeout(2000);
  ok(page.errors.length === 0, '0 lỗi console', page.errors.join(' | '));
  ok(page.external.length === 0, 'không request ra ngoài origin', page.external.join(' | '));
  ok(/Nét Lệch/.test(await page.title()), 'title riêng', await page.title());
  ok(await page.locator('meta[name=description][content*="Nét Lệch"], meta[name=description][content*="tiệm tóc"], meta[name=description][content*="Salon tóc"]').count() > 0, 'description riêng');
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'robots noindex');
  ok(await page.locator('link[rel=icon][href*="net-lech/identity/favicon"]').count() > 0, 'favicon theo route');
  ok(await page.locator('meta[property="og:image"][content*="net-lech/identity/og-image"]').count() > 0, 'og-image');
  ok(await page.locator('h1').count() === 1, 'đúng 1 h1');
  ok(await page.locator('html[lang=vi]').count() === 1, 'html lang=vi');
  ok(await page.locator('[data-nl="lb-card"]').count() === 8, '8 kiểu trong lookbook');
  ok(await page.locator('#faq details').count() === 10, '10 câu FAQ');
  const imgs = await page.evaluate(() => [...document.images].map((i) => decodeURIComponent(i.currentSrc || i.src)));
  const names = imgs.map((s) => s.match(/net-lech\/([a-z0-9-]+)-\d+\.webp/)?.[1]).filter(Boolean);
  ok(names.length >= 10 && new Set(names).size === names.length, 'ảnh không lặp trên trang (≥10 ảnh)', `${names.length}/${new Set(names).size}`);
  const txt = await page.evaluate(() => document.body.innerText);
  ok(!/đảm bảo|100%|cam kết kết quả|số 1|hàng đầu|phục hồi hoàn toàn(?! tóc hư)/i.test(txt.replace(/Dịch vụ chăm sóc có phục hồi hoàn toàn tóc hư tổn không\?/g, '')), 'không có từ cam kết/tuyệt đối');
  ok(/Giá tham khảo|giá tham khảo/.test(txt), 'có chữ giá tham khảo');
  ok(!/Ảnh minh/i.test(txt) && (await page.locator('[class*=chip]').count()) === 0, 'không còn chip ảnh');
  ok(!/Đã (gửi|đặt) (lịch )?thành công|đặt lịch thành công/i.test(txt), 'không khẳng định đã gửi/đặt thành công');
  ok(!/khách hàng|album của|đã thực hiện cho|tác phẩm của chúng tôi/i.test(txt), 'không tuyên bố ảnh stock là tác phẩm cho khách');
  { const bad = await scanForbidden(page); ok(bad.length === 0, 'trang chủ: không chứa từ bị cấm (text/aria/alt/title/meta)', bad.join(' | ')); }
  ok(!/@|\b0\d{9}\b|zalo|facebook/i.test(txt.replace(/@/g, '')), 'không có SĐT/email/Zalo/Facebook');
  ok(await page.locator('[data-nl-root] a[href^="/lien-he"]').count() >= 3, 'có ≥3 link tư vấn');
  const jsonld = (await page.locator('script[type="application/ld+json"]').allTextContents()).filter((t) => /Nét Lệch/.test(t));
  ok(jsonld.length === 1 && !/Review|AggregateRating|Offer|LocalBusiness|HairSalon|PostalAddress/.test(jsonld[0]) && /WebPage/.test(jsonld[0]), 'JSON-LD chỉ WebPage, không review/offer/local business');
  const c = await ctx.newPage(); const r2 = await c.goto(URL_ + '/credits', { waitUntil: 'networkidle' });
  ok(r2.status() === 200 && (await c.locator('li img').count()) === 12 && await c.locator('meta[name=robots][content*=noindex]').count() > 0, '/credits: 200, 12 ảnh, noindex');
  ok((await c.locator('text=Oswald').count()) > 0 && (await c.locator('text=Archivo').count()) > 0, '/credits liệt kê font');
  await ctx.close();
}

// ---------- 2
console.log('[2] Không tràn ngang 320/390/768/1024/1440');
{
  for (const w of [320, 390, 768, 1024, 1440]) {
    const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } });
    await load(page);
    const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    ok(r.sw <= r.cw + 1, `không tràn ngang ở ${w}px`, `${r.sw}>${r.cw}`);
    await ctx.close();
  }
}

// ---------- 3
console.log('[3] Font Việt render thật (Oswald + Archivo)');
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(async () => {
    const dispStack = getComputedStyle(document.querySelector('h1')).fontFamily;
    const bodyStack = getComputedStyle(document.querySelector('main p')).fontFamily;
    const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
    const px = (stack, wt, ch) => { const c = document.createElement('canvas'); c.width = 80; c.height = 100; const x = c.getContext('2d'); x.font = `${wt} 60px ${stack}`; x.textBaseline = 'alphabetic'; x.fillText(ch, 8, 80); return x.getImageData(0, 0, 80, 100).data; };
    const diff = (a, b) => { let n = 0; for (let i = 3; i < a.length; i += 4) if ((a[i] > 128) !== (b[i] > 128)) n++; return n; };
    const ink = (a) => { let n = 0; for (let i = 3; i < a.length; i += 4) if (a[i] > 128) n++; return n; };
    const lower = 'ăâêôơưđ', upper = 'ĂÂÊÔƠƯĐ', all = 'ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ';
    const empty = [...(lower + upper + all)].filter((ch) => ink(px(dispStack, 700, ch)) < 30);
    const emptyBody = [...(lower + upper + all.toLowerCase())].filter((ch) => ink(px(bodyStack, 400, ch)) < 20);
    const pairs = [['Ế', 'Ê'], ['Ỗ', 'Ô'], ['Ấ', 'Â'], ['Ầ', 'Â'], ['Ố', 'Ô'], ['Ự', 'Ư'], ['Ệ', 'Ê'], ['Ề', 'Ê'], ['Ờ', 'Ơ'], ['Ử', 'Ư']];
    const stacked = pairs.map(([a, b]) => diff(px(dispStack, 700, a), px(dispStack, 700, b)) > 40);
    const stackedBody = pairs.map(([a, b]) => diff(px(bodyStack, 400, a.toLowerCase()), px(bodyStack, 400, b.toLowerCase())) > 15);
    // so với font fallback: glyph Ệ của Oswald phải khác Ệ của Arial Narrow/sans
    const vsFallback = diff(px(dispStack, 700, 'Ệ'), px('sans-serif', 700, 'Ệ')) > 100;
    const nfc = [...document.querySelectorAll('h1,h2,h3,p,li,button,a')].every((e) => e.textContent === e.textContent.normalize('NFC'));
    return { dispStack, bodyStack, faces, empty, emptyBody, stacked, stackedBody, vsFallback, nfc };
  });
  ok(r.faces.length >= 4, 'các face next/font đã loaded', r.faces.join(','));
  ok(/^var\(|^"?__|oswald|__/i.test(r.dispStack) || !/^(Arial|Impact|system)/i.test(r.dispStack), 'stack heading bắt đầu bằng font riêng', r.dispStack.slice(0, 80));
  ok(r.empty.length === 0, 'Oswald 700 có glyph ă â ê ô ơ ư đ + Ắ…Ự', r.empty.join(''));
  ok(r.emptyBody.length === 0, 'Archivo 400 có glyph tiếng Việt', r.emptyBody.join(''));
  ok(r.stacked.every(Boolean), 'Oswald vẽ đủ dấu chồng (Ế Ỗ Ấ Ầ Ố Ự Ệ Ề Ờ Ử)', JSON.stringify(r.stacked));
  ok(r.stackedBody.every(Boolean), 'Archivo vẽ đủ dấu chồng', JSON.stringify(r.stackedBody));
  ok(r.vsFallback, 'Ệ trong Oswald khác font hệ thống (không fallback)');
  ok(r.nfc, 'chữ trong DOM ở dạng NFC');
  await ctx.close();
}

// ---------- 4
console.log('[4] prefers-reduced-motion: nội dung hiện đủ');
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page); await slowScroll(page);
  const r = await page.evaluate(() => {
    const op = (s) => [...document.querySelectorAll(s)].map((e) => +getComputedStyle(e).opacity);
    return { hero: op('[data-nl]:not([disabled])'), reveal: op('[data-nl-reveal]'), cards: op('[data-nl=lb-card]'), cover: getComputedStyle(document.querySelector('[data-nl=cover]')).display, wipe: getComputedStyle(document.querySelector('[data-nl=wipe]')).display, h1t: getComputedStyle(document.querySelector('[data-nl=h1a]')).transform };
  });
  ok(r.hero.length > 10 && r.hero.every((o) => o === 1), 'hero + khối [data-nl] hiện đủ', JSON.stringify(r.hero));
  ok(r.reveal.length > 8 && r.reveal.every((o) => o === 1), 'khối reveal hiện đủ');
  ok(r.cards.length === 8 && r.cards.every((o) => o === 1), '8 thẻ lookbook hiện đủ');
  ok(r.h1t === 'none', 'H1 không bị dịch');
  ok(r.cover === 'none' && r.wipe === 'none', 'tấm phủ hero/closing bị tắt');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page); await slowScroll(page);
  await page.locator('[data-nl-final]').scrollIntoViewIfNeeded(); await page.waitForTimeout(2200);
  const r = await page.evaluate(() => ({ h: +getComputedStyle(document.querySelector('[data-nl=f-h]')).opacity, wipe: new DOMMatrix(getComputedStyle(document.querySelector('[data-nl=wipe]')).transform).a, hero: [...document.querySelectorAll('[data-nl=h1a],[data-nl=h1b],[data-nl=cta]')].map((e) => +getComputedStyle(e).opacity) }));
  ok(r.h >= 0.99 && r.wipe === 0, 'chuyển động có bật: kết thúc ở trạng thái hiện đủ (closing)', JSON.stringify(r));
  ok(r.hero.every((o) => o === 1), 'hero kết thúc hiện đủ sau animation');
  await ctx.close();
}

// ---------- 5 Lookbook
console.log('[5] Lookbook Filter');
{
  const { ctx, page } = await newPage();
  await load(page);
  const grp = (t) => page.locator(`#nl-filters fieldset:has(legend:text-is("${t}"))`);
  const tick = async (g, label) => { await grp(g).locator(`label:has-text("${label}") input`).first().click({ force: true }); };
  const cnt = async () => page.locator('[data-nl="lb-card"]').count();
  const names = async () => page.locator('[data-nl="lb-card"] [class*="lbName"]').allTextContents();
  ok(await cnt() === 8, 'mặc định 8 kiểu');
  await tick('Độ dài', 'Ngắn');
  ok(await cnt() === 4, 'Ngắn = 4 kiểu', String(await cnt()));
  await tick('Độ dài', 'Vừa');
  ok(await cnt() === 5, 'Ngắn OR Vừa = 5 kiểu (OR trong nhóm)', String(await cnt()));
  await tick('Độ dài', 'Vừa'); await tick('Phong cách', 'Nổi bật');
  ok(await cnt() === 1, 'Ngắn AND Nổi bật = 1 (AND giữa nhóm)', String(await cnt()));
  ok((await names())[0].includes('Rose Flash'), 'kết quả là Rose Flash', (await names())[0]);
  ok(/Hiển thị 1\/8/i.test(await page.locator('[data-nl=lb-count]').innerText()), 'bộ đếm cập nhật 1/8');
  ok(await page.locator('[data-nl=lb-count][aria-live=polite]').count() === 1, 'số kết quả có aria-live=polite');
  await tick('Độ dài', 'Ngắn'); await tick('Độ dài', 'Vừa'); // bỏ Ngắn, chọn Vừa
  ok(await page.locator('[data-nl=lb-empty]').count() === 1 && await cnt() === 0, 'Vừa AND Nổi bật = rỗng, hiện empty state');
  await page.locator('[data-nl=lb-empty] button').click();
  ok(await cnt() === 8, 'nút Xóa bộ lọc trong empty state khôi phục 8');
  // thứ tự dataset giữ nguyên
  await tick('Loại tạo kiểu', 'Nhuộm');
  const n = await names();
  ok(n.length === 2 && n[0].includes('Copper') && n[1].includes('Rose'), 'giữ thứ tự dataset khi lọc (Nhuộm)', n.join('|'));
  await page.locator('aside button:text-is("Xóa bộ lọc")').first().click();
  ok(await cnt() === 8, 'Xóa bộ lọc ở panel');
  // dialog
  const card = page.locator('[data-look="LK-05"]');
  await card.focus(); await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  ok(await page.locator('dialog[open]').count() === 1, 'Enter mở dialog chi tiết');
  ok(/rose flash/i.test(await page.locator('dialog[open] h3').innerText()), 'dialog đúng kiểu');
  ok(await page.evaluate(() => document.documentElement.style.overflow === 'hidden'), 'khoá cuộn nền khi mở dialog');
  ok(await page.evaluate(() => !!document.querySelector('dialog[open]').contains(document.activeElement)), 'focus nằm trong dialog');
  await page.keyboard.press('Escape'); await page.waitForTimeout(400);
  ok(await page.locator('dialog[open]').count() === 0, 'Escape đóng dialog');
  ok(await page.evaluate(() => document.activeElement?.getAttribute('data-look') === 'LK-05'), 'trả focus về thẻ đã mở');
  ok(await page.evaluate(() => document.documentElement.style.overflow === ''), 'mở khoá cuộn nền');
  // cảm hứng -> builder
  await page.locator('[data-look="LK-03"]').click(); await page.waitForTimeout(300);
  await page.locator('dialog[open] button:text-is("Dùng kiểu này làm cảm hứng")').click(); await page.waitForTimeout(900);
  ok(await page.evaluate(() => document.activeElement?.id === 'nl-bld-h'), 'focus chuyển tới tiêu đề Builder');
  ok(await page.locator('[data-svc=SV-01]').isChecked() && await page.locator('[data-svc=SV-02]').isChecked(), 'Builder nhận dịch vụ gợi ý (Cắt + Nhuộm)');
  ok(/LK-03 Copper Long/.test(await page.locator('[data-nl=summary]').innerText()), 'Builder hiện kiểu cảm hứng');
  ok(await page.locator('input[name=nl-length]:checked').evaluate((e) => e.closest('label').innerText.includes('Vừa')), 'không tự đổi độ dài tóc');
  await ctx.close();
}

// ---------- 5b nội dung salon thật
console.log('[5b] Nội dung salon: hero, bảng giá theo độ dài, khung giờ, chính sách');
{
  const { ctx, page } = await newPage();
  await load(page);
  const hero = await page.locator('[data-nl-hero]').textContent();
  ok(/salon tóc/i.test(hero) && /Hải Châu/.test(hero) && /Đà Nẵng/.test(hero) && /nam và nữ/.test(hero), 'hero nêu loại hình, quận, đối tượng');
  ok(/150\.000/.test(hero) && /09:00/.test(hero) && /Miễn phí/i.test(hero), 'hero có 3 sự thật: giá từ, giờ, tư vấn miễn phí');
  ok(await page.locator('[data-nl=cta] a').first().textContent().then((t) => /Đặt lịch/.test(t)), 'CTA hero đúng ngành (Đặt lịch)');
  const all = await page.evaluate(() => document.body.innerText + [...document.querySelectorAll('[alt],[aria-label]')].map((e) => (e.getAttribute('alt') || '') + (e.getAttribute('aria-label') || '')).join(' '));
  ok(!/ảnh stock|stock/i.test(all), 'không còn chữ "stock" hiển thị trên trang');
  const pt = page.locator('[data-nl=price-table]');
  await pt.scrollIntoViewIfNeeded();
  ok(await pt.locator('tbody tr').count() === 7, 'bảng giá 7 dịch vụ');
  ok(/150\.000/.test(await pt.innerText()) && /1\.200\.000/.test(await pt.innerText()), 'bảng giá có mức thấp nhất và cao nhất');
  const blade = async () => page.evaluate(() => { const t = document.querySelector('[data-nl=price-table]'); return getComputedStyle(t.querySelector('[class*=ptBlade]')).left; });
  const l1 = await blade();
  await pt.locator('label:has-text("Dài") input').evaluate((e) => e.click()); await page.waitForTimeout(700);
  const l2 = await blade();
  ok(l1 !== l2 && /dài/i.test(await pt.locator('thead th[data-on="1"]').innerText()), 'chọn Dài: lưỡi cắt trượt tới cột Dài', `${l1} -> ${l2}`);
  const sb = page.locator('[data-nl=slotbar]');
  await sb.scrollIntoViewIfNeeded();
  ok(/18:00/.test(await sb.locator('[data-nl=slot-out]').innerText()), 'thanh khung giờ: 2 giờ => muộn nhất 18:00');
  await sb.locator('button:text-is("Tẩy và nhuộm")').click();
  ok(/16:00/.test(await sb.locator('[data-nl=slot-out]').innerText()), 'thanh khung giờ: 4 giờ => muộn nhất 16:00');
  await sb.locator('input[type=range]').evaluate((e) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(e, '300'); e.dispatchEvent(new Event('input', { bubbles: true })); });
  ok(/15:00/.test(await sb.locator('[data-nl=slot-out]').innerText()), 'thanh khung giờ: 5 giờ => 15:00');
  ok(await page.locator('#policy dt').count() === 6 && /100\.000/.test(await page.locator('#policy').innerText()), '6 chính sách đặt lịch, có mức cọc');
  ok(await page.locator('#products li').count() === 6 && !/(Loreal|L'Oréal|Wella|Schwarzkopf|Kerastase|Olaplex|Davines)/i.test(await page.locator('#products').innerText()), 'sản phẩm mô tả chung, không tên hãng');
  ok(await page.locator('[data-fx="ImageHoverDistort"]').count() === 8 && await page.locator('[data-fx="VelocityMarquee"]').count() >= 1 && await page.locator('[data-fx="SplitReveal"],[data-fx="SplitWords"]').count() >= 1, 'hiệu ứng thư viện: ImageHoverDistort x8, VelocityMarquee, SplitWords');
  ok(page.errors.length === 0, 'khối nội dung salon: 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}

// ---------- 6 Builder
console.log('[6] Service Builder');
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.locator('#builder').scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
  const setSvc = async (ids) => { for (const id of ['SV-01', 'SV-02', 'SV-03', 'SV-04', 'SV-05', 'SV-06', 'SV-07']) { const el = page.locator(`[data-svc=${id}]`); if ((await el.isChecked()) !== ids.includes(id)) await el.evaluate((e) => e.click()); } };
  const setLen = async (l) => page.locator(`label:has(input[name=nl-length]):has-text("${l}") input`).evaluate((e) => e.click());
  const setSty = async (i) => page.locator('input[name=nl-stylist]').nth(i).evaluate((e) => e.click());
  const read = async () => ({ total: num(await page.locator('[data-nl=sum-total]').innerText()), time: await page.locator('[data-nl=sum-time]').innerText() });
  ok(await page.locator('[data-nl=sum-empty]').count() === 1 && num(await page.locator('[data-nl=sum-total]').innerText()) === 0, 'rỗng: 0đ + gợi ý chọn dịch vụ');
  ok(await page.locator('[data-nl=open-preview]').isDisabled(), 'rỗng: nút preview disabled');
  const cases = [
    ['Cắt/Ngắn/Stylist', ['SV-01'], 'Ngắn', 0, 150000, '40 phút'],
    ['Cắt/Vừa/Stylist', ['SV-01'], 'Vừa', 0, 200000, '50 phút'],
    ['Nhuộm/Dài/Senior', ['SV-02'], 'Dài', 1, 1093000, '2 giờ 30 phút'],
    ['Cắt+Nhuộm/Vừa/Stylist', ['SV-01', 'SV-02'], 'Vừa', 0, 950000, '2 giờ 50 phút'],
    ['Cắt+Chăm sóc/Dài/Senior', ['SV-01', 'SV-04'], 'Dài', 1, 1036000, '2 giờ 15 phút'],
    ['Uốn/Dài/Director', ['SV-03'], 'Dài', 2, 1430000, '3 giờ'],
  ];
  for (const [name, ids, len, sty, total, time] of cases) {
    await setSvc(ids); await setLen(len); await setSty(sty);
    const r = await read();
    ok(r.total === total && r.time === time, `tính giá ${name}: ${total} / ${time}`, JSON.stringify(r));
  }
  await setSvc(['SV-02', 'SV-03']); await setLen('Vừa'); await setSty(0);
  ok(await page.locator('[data-nl=sum-warn][role=alert]').count() === 1, 'Nhuộm + Uốn: hiện cảnh báo');
  ok(await page.locator('[data-nl=open-preview]').isDisabled(), 'Nhuộm + Uốn: preview disabled');
  ok(num(await page.locator('[data-nl=sum-total]').innerText()) === 750000 + 850000, 'Nhuộm + Uốn vẫn tính tổng tham khảo', String(num(await page.locator('[data-nl=sum-total]').innerText())));
  ok(await page.locator('[data-svc=SV-02]').isChecked() && await page.locator('[data-svc=SV-03]').isChecked(), 'không tự đổi lựa chọn khi xung đột');
  // persistence
  await setSvc(['SV-01', 'SV-04']); await setLen('Dài'); await setSty(1);
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
  ok(await page.locator('[data-svc=SV-01]').isChecked() && await page.locator('[data-svc=SV-04]').isChecked() && !(await page.locator('[data-svc=SV-02]').isChecked()), 'localStorage khôi phục dịch vụ sau reload');
  ok(await page.locator('input[name=nl-length]:checked').evaluate((e) => e.closest('label').innerText.includes('Dài')), 'khôi phục độ dài');
  ok(await page.evaluate(() => Object.keys(localStorage).every((k) => k === 'nl:builder:v1')), 'chỉ dùng key nl:builder:v1');
  ok(!(await page.evaluate(() => localStorage.getItem('nl:builder:v1'))).match(/date|period|clipboard/i), 'không lưu ngày/dữ liệu cá nhân');
  // dữ liệu hỏng -> mặc định
  await page.evaluate(() => localStorage.setItem('nl:builder:v1', '{"v":1,"state":{"selected":["XX"],"length":"medium","stylist":"ST-01"}}'));
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
  ok(await page.locator('[data-nl=sum-empty]').count() === 1, 'localStorage sai ID => về mặc định');
  await page.evaluate(() => localStorage.setItem('nl:builder:v1', '{broken'));
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
  ok(await page.locator('[data-nl=sum-empty]').count() === 1 && page.errors.length === 0, 'localStorage JSON hỏng => mặc định, không lỗi console', page.errors.join('|'));
  // thêm từ bảng dịch vụ + stylist
  await page.locator('#services a:text-is("Thêm")').nth(1).click(); await page.waitForTimeout(300);
  await page.locator('#services a:text-is("Thêm")').nth(1).click(); await page.waitForTimeout(300);
  ok(await page.locator('[data-svc=SV-01]').isChecked() && (await page.locator('[data-nl=summary] li').count()) === 1, 'Thêm vào dịch vụ: thêm một lần, không trùng');
  await page.locator('#stylists a:text-is("Chọn vai trò này")').nth(2).click(); await page.waitForTimeout(300);
  ok(await page.locator('input[name=nl-stylist]').nth(2).isChecked(), 'Chọn định hướng stylist cập nhật Builder');
  // preview
  await setSvc(['SV-01']); await setLen('Vừa'); await setSty(0);
  await page.locator('[data-nl=open-preview]').click(); await page.waitForTimeout(400);
  ok(await page.locator('dialog[open]').count() === 1 && /chưa xác nhận/i.test(await page.locator('dialog[open]').innerText()), 'dialog tóm tắt có nhãn chưa xác nhận');
  { const bad = await scanForbidden(page); ok(bad.length === 0, 'dialog tóm tắt: không chứa từ bị cấm', bad.join(' | ')); }
  ok(num(await page.locator('[data-nl=pv-total]').innerText()) === 200000, 'preview đúng tổng');
  await page.fill('#nl-date', '2020-01-01');
  await page.locator('[data-nl=copy]').click();
  ok(await page.locator('#nl-date-err').count() === 1 && (await page.locator('#nl-date').getAttribute('aria-invalid')) === 'true', 'ngày quá khứ: lỗi cạnh ô + aria-invalid');
  ok((await page.locator('#nl-date').getAttribute('aria-describedby')) === 'nl-date-err', 'aria-describedby trỏ lỗi');
  await page.fill('#nl-date', ''); 
  await page.locator('[data-nl=copy]').click(); await page.waitForTimeout(400);
  ok(await page.locator('[data-nl=copy-ok]').count() === 1 && /Chưa có thông tin nào được gửi đi/.test(await page.locator('[data-nl=copy-ok]').innerText()), 'sao chép thành công có thông báo thật');
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  ok(/Tóm tắt lịch hẹn/.test(clip) && /200\.000/.test(clip) && !/@|Zalo/.test(clip) && !FORBID.test(clip.normalize('NFC')), 'nội dung clipboard là bản tóm tắt sạch', clip.slice(0, 60));
  { const bad = await scanForbidden(page); ok(bad.length === 0, 'sau khi sao chép: không chứa từ bị cấm', bad.join(' | ')); }
  const href = await page.locator('[data-nl=pv-consult]').getAttribute('href');
  ok(/^\/lien-he\?industry=.*solution=spa.*utm_source=showroom.*utm_campaign=net-lech/.test(href), 'CTA tư vấn trong dialog dùng buildConsultHref', href);
  await page.keyboard.press('Escape'); await page.waitForTimeout(400);
  ok(await page.locator('dialog[open]').count() === 0, 'Escape đóng dialog preview');
  ok(await page.evaluate(() => document.activeElement?.getAttribute('data-nl') === 'open-preview'), 'trả focus về nút mở preview');
  await page.locator('button:text-is("Đặt lại lựa chọn")').click(); await page.waitForTimeout(200);
  ok(await page.locator('[data-nl=sum-empty]').count() === 1 && (await page.evaluate(() => localStorage.getItem('nl:builder:v1'))).includes('"selected":[]'), 'Đặt lại lựa chọn về mặc định');
  // clipboard lỗi -> textarea
  await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) }, configurable: true }); });
  await setSvc(['SV-01']);
  await page.locator('[data-nl=open-preview]').click(); await page.waitForTimeout(300);
  await page.locator('[data-nl=copy]').click(); await page.waitForTimeout(400);
  ok(await page.locator('[data-nl=copy-fail] textarea').count() === 1 && await page.locator('[data-nl=copy-ok]').count() === 0, 'clipboard lỗi: hiện văn bản để chép tay, không báo thành công');
  await ctx.close();
}

// ---------- 7 bàn phím, link, ref
console.log('[7] Bàn phím, FAQ, link thoát, ref, touch target');
{
  const { ctx, page } = await newPage();
  await load(page);
  let hit = 0;
  for (let i = 1; i <= 30; i++) { await page.keyboard.press('Tab'); const t = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? ''); if (/Đặt lịch giữ chỗ/.test(t)) { hit = i; break; } }
  ok(hit > 0, `Tab tới CTA "Đặt lịch giữ chỗ" trong ${hit} lần`);
  ok(await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2; }), 'focus-visible rõ trên CTA');
  const col = await page.evaluate(() => { const e = document.querySelector('[data-nl=cta] a'); return getComputedStyle(e).color; });
  ok(col === 'rgb(245, 243, 238)', 'chữ nút chính là màu giấy (đọc được trên nền đen)', col);
  const f = page.locator('#faq summary').first();
  await f.focus(); await page.keyboard.press('Enter');
  ok(await page.locator('#faq details').first().evaluate((d) => d.open), 'FAQ mở bằng bàn phím');
  await page.locator('#faq summary').nth(1).click();
  ok((await page.locator('#faq details[open]').count()) === 2, 'FAQ cho mở nhiều câu cùng lúc');
  const hrefs = await page.locator('[data-nl-root] a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 2 && hrefs.every((h) => h.includes('industry=Ti%E1%BB%87m+t%C3%B3c') || h.includes('industry=Ti%E1%BB%87m%20t%C3%B3c') || /industry=Ti/.test(h)) && hrefs.every((h) => h.includes('solution=spa') && h.includes('utm_campaign=net-lech')), 'mọi link tư vấn đúng industry/solution/utm_campaign', hrefs.join(' '));
  ok(await page.locator('a[href="/demos/net-lech/credits"]').count() > 0, 'có link Credits ảnh');
  ok(/Website do Trần Công Tiến thiết kế/.test(await page.locator('footer').innerText()), 'footer có dòng ký tên thiết kế');
  await page.locator('#faq summary').evaluateAll((els) => els.forEach((e) => { e.parentElement.open = true; }));
  { const bad = await scanForbidden(page); ok(bad.length === 0, 'trang chủ + FAQ mở hết: không chứa từ bị cấm', bad.join(' | ')); }
  const targets = await page.evaluate(() => [...document.querySelectorAll('[data-nl-root] a, [data-nl-root] button, [data-nl-root] select, [data-nl-root] input[type=date]')].filter((e) => e.offsetParent && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 44 && !e.closest('summary') && !e.closest('p') && !e.closest('h2') && !(e.tagName === 'INPUT' && e.type === 'checkbox')).map((e) => (e.textContent || e.id).trim().slice(0, 30) + ':' + Math.round(e.getBoundingClientRect().height)));
  ok(targets.length === 0, 'touch target ≥44px (trừ link trong đoạn văn)', targets.join(' | '));
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await page.goto(URL_ + '?ref=TESTREF', { waitUntil: 'networkidle' });
  ok((await page.title()).includes('Nét Lệch'), 'mở với ?ref= vẫn render');
  ok(!(await page.evaluate(() => document.cookie)).includes('tct_ref'), 'demo không tự ghi cookie tct_ref');
  const hrefs = await page.locator('[data-nl-root] a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 2 && hrefs.every((h) => h.startsWith('/lien-he?industry=')), 'link tư vấn tương đối cùng origin (giữ cookie ref first-party)');
  const p2 = await ctx.newPage(); const res = await p2.goto(BASE + hrefs[0] + '&ref=TESTREF', { waitUntil: 'domcontentloaded' });
  ok(res.status() < 400 && p2.url().includes('industry=Ti') && p2.url().includes('ref=TESTREF'), '/lien-he nhận industry + ref', p2.url());
  await ctx.close();
}

// ---------- 7b quét từ bị cấm ở các trạng thái chính
console.log('[7b] Quét từ bị cấm: lookbook dialog, builder rỗng/xung đột, credits');
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.locator('#lookbook').scrollIntoViewIfNeeded(); await page.locator('[data-look="LK-01"]').click(); await page.waitForTimeout(500);
  { const bad = await scanForbidden(page); ok(bad.length === 0 && await page.locator('dialog[open]').count() === 1, 'dialog lookbook: không chứa từ bị cấm', bad.join(' | ')); }
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  await page.locator('#builder').scrollIntoViewIfNeeded();
  for (const id of ['SV-01', 'SV-02', 'SV-03', 'SV-04', 'SV-05', 'SV-06', 'SV-07']) { const c = page.locator(`[data-svc=${id}]`); if (await c.isChecked()) await c.click({ force: true }); }
  await page.waitForTimeout(300);
  ok(await page.locator('[data-nl=sum-empty]').count() === 1, 'builder rỗng hiện');
  { const bad = await scanForbidden(page); ok(bad.length === 0, 'builder rỗng: không chứa từ bị cấm', bad.join(' | ')); }
  await page.locator('[data-svc=SV-02]').click({ force: true }); await page.locator('[data-svc=SV-03]').click({ force: true }); await page.waitForTimeout(300);
  ok(await page.locator('[data-nl=sum-warn]').count() === 1, 'builder xung đột hiện cảnh báo');
  { const bad = await scanForbidden(page); ok(bad.length === 0, 'builder xung đột: không chứa từ bị cấm', bad.join(' | ')); }
  const c = await ctx.newPage(); await c.goto(URL_ + '/credits', { waitUntil: 'networkidle' });
  { const bad = await scanForbidden(c); ok(bad.length === 0, 'credits: không chứa "Demo"/minh hoạ', bad.join(' | ')); }
  ok(/Trần Công Tiến thiết kế/.test(await c.evaluate(() => document.body.innerText)), 'credits giữ lời công khai trung thực');
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await load(page);
  await page.locator('button:text-is("Menu")').tap(); await page.waitForTimeout(300);
  { const bad = await scanForbidden(page); ok(bad.length === 0, 'mobile menu mở: không chứa từ bị cấm', bad.join(' | ')); }
  await ctx.close();
}

// ---------- 8 mobile
console.log('[8] Mobile 390: menu, bộ lọc');
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await load(page);
  const nav = page.locator('#nl-nav');
  ok(!(await nav.isVisible()), 'menu đóng mặc định trên mobile');
  await page.locator('button:text-is("Menu")').tap(); await page.waitForTimeout(300);
  ok(await nav.isVisible(), 'mở menu');
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  ok(!(await nav.isVisible()) && await page.evaluate(() => document.activeElement?.textContent.trim() === 'Menu'), 'Escape đóng menu + trả focus về nút');
  await page.locator('#lookbook').scrollIntoViewIfNeeded();
  ok(!(await page.locator('#nl-filters').isVisible()), 'bộ lọc thu gọn mặc định');
  await page.locator('button[aria-controls=nl-filters]').tap(); await page.waitForTimeout(300);
  ok(await page.locator('#nl-filters').isVisible(), 'mở bộ lọc trên mobile');
  await page.locator('#nl-filters label:has-text("Dài") input').first().click({ force: true });
  ok(await page.locator('[data-nl=lb-card]').count() === 3, 'Dài = 3 kiểu trên mobile', String(await page.locator('[data-nl=lb-card]').count()));
  await ctx.close();
}

// ---------- 9 ảnh chụp
console.log('[9] Ảnh chụp 1440 / 390');
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await load(page); await page.screenshot({ path: path.join(SHOTS, 'hero-390.png') });
  await slowScroll(page);
  const hh = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i * 5000 < hh; i++) await page.screenshot({ path: path.join(SHOTS, `full-390-${i}.png`), fullPage: true, clip: { x: 0, y: i * 5000, width: 390, height: Math.min(5000, hh - i * 5000) } });
  await page.goto(URL_ + '/credits', { waitUntil: 'networkidle' }); await page.screenshot({ path: path.join(SHOTS, 'credits-390.png') });
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page); await page.screenshot({ path: path.join(SHOTS, 'hero-1440.png') });
  await slowScroll(page);
  await page.screenshot({ path: path.join(SHOTS, 'full-1440.png'), fullPage: true });
  await page.locator('#lookbook').scrollIntoViewIfNeeded(); await page.locator('[data-look="LK-01"]').click(); await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOTS, 'dialog-1440.png') });
  await page.keyboard.press('Escape');
  await page.locator('#builder').scrollIntoViewIfNeeded();
  await page.locator('[data-svc=SV-01]').click({ force: true }); await page.locator('[data-svc=SV-02]').click({ force: true }); await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(SHOTS, 'builder-1440.png') });
  await ctx.close();
}
for (const w of [768, 1024]) { const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } }); await load(page); await page.screenshot({ path: path.join(SHOTS, `hero-${w}.png`) }); await ctx.close(); }

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) { console.log('FAILURES:\n- ' + failures.join('\n- ')); process.exit(1); }
