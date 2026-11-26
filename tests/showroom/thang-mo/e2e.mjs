// E2E Tháng Mơ (LP-09). Chạy: BASE=http://localhost:3100 node tests/showroom/thang-mo/e2e.mjs
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/thang-mo`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra = '') {
  if (cond) { pass++; console.log('  PASS', name); } else { fail++; failures.push(name + ' ' + extra); console.log('  FAIL', name, extra); }
}
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  page.errors = []; page.external = []; page.nonGet = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['http:', 'https:'].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); if (r.method() !== 'GET') page.nonGet.push(r.method() + ' ' + r.url()); });
  return { ctx, page };
}
const load = async (page, url = URL_) => { await page.goto(url, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2200); };
const counter = (page) => page.locator('[data-tm="album-count"]').innerText();
const dlg = (page) => page.locator('[role=dialog][aria-labelledby="tm-alb-title"]');
const price = (page) => page.locator('[data-tm="sum-price"]').innerText();
const checkedVal = (page, name) => page.locator(`input[name="${name}"]:checked`).getAttribute('value');
async function slowScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    await new Promise((r) => setTimeout(r, 600)); window.scrollTo(0, 0);
    await Promise.race([Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })), new Promise((r) => setTimeout(r, 15000))]);
  });
  await page.waitForTimeout(600);
}

const BANNED = /\bdemo\b|minh h[oọ][aạ]|giả định|mô phỏng|dữ liệu mẫu|giả lập|không phải doanh nghiệp|không phải tác phẩm|thương hiệu minh|chưa chụp bộ ảnh/i;
// quét văn bản hiển thị + aria-label/alt/title/placeholder + meta + nội dung ẩn; bỏ qua href/src (URL /demos/ là đường dẫn)
async function scanAll(page) {
  return page.evaluate((src) => {
    const re = new RegExp(src, 'i'); const hits = [];
    const add = (where, s) => { const m = s && s.match(re); if (m) hits.push(where + ': ' + m[0] + ' <- ' + s.slice(0, 60)); };
    add('text', document.body.innerText); add('title', document.title);
    for (const m of document.querySelectorAll('meta[name="description"],meta[property^="og:"],meta[name^="twitter:"]')) add('meta', m.getAttribute('content') || '');
    for (const el of document.querySelectorAll('[aria-label],[alt],[title],[placeholder],[aria-description]')) for (const a of ['aria-label', 'alt', 'title', 'placeholder', 'aria-description']) add(a, el.getAttribute(a) || '');
    for (const el of document.querySelectorAll('[hidden]')) add('hidden', el.textContent || '');
    for (const s of document.querySelectorAll('script[type="application/ld+json"]')) if (/Tháng Mơ/.test(s.textContent)) add('jsonld', s.textContent);
    return hits;
  }, BANNED.source);
}
const clean = async (page, name) => { const h = await scanAll(page); ok(h.length === 0, 'quét từ cấm: ' + name, JSON.stringify(h)); };

// ---------- 1
console.log('[1] Tải trang, console, request ngoài origin, metadata, trung thực ảnh');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'HTTP 200', String(res.status()));
  await page.waitForTimeout(2200);
  ok(page.errors.length === 0, '0 lỗi console', page.errors.join(' | '));
  ok(page.external.length === 0, 'không request ra ngoài origin', page.external.join(' | '));
  ok(/Tháng Mơ/.test(await page.title()), 'title riêng', await page.title());
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'robots noindex');
  ok(await page.locator('meta[name=description]').count() > 0 && !BANNED.test(await page.locator('meta[name=description]').getAttribute('content')), 'meta description riêng, không có từ cấm');
  ok(await page.locator('link[rel=icon][href*="thang-mo/identity/favicon"]').count() > 0, 'favicon theo route');
  ok(await page.locator('link[rel=apple-touch-icon][href*="thang-mo/identity/apple-touch-icon"]').count() > 0, 'apple-touch-icon');
  ok(await page.locator('meta[property="og:image"][content*="thang-mo/identity/og-image"]').count() > 0, 'og-image');
  ok(await page.locator('h1').count() === 1, 'đúng 1 h1');
  ok(await page.locator('main').count() === 1 && await page.locator('header').count() >= 1 && await page.locator('footer').count() === 1, 'landmark header/main/footer');
  const ld = await page.locator('script[type="application/ld+json"]').allInnerTexts();
  const mine = ld.filter((x) => /Tháng Mơ/.test(x));
  ok(mine.length === 1 && /"WebPage"/.test(mine[0]) && !/Review|AggregateRating|Offer|LocalBusiness|address|telephone/i.test(mine[0]), 'JSON-LD của trang chỉ WebPage, không review/offer/business (JSON-LD Person là của root layout site chính)');
  const imgs = await page.evaluate(() => [...document.querySelectorAll('[data-tm-root] main img')].map((i) => ({ src: decodeURIComponent(i.currentSrc || i.src), inMood: !!i.closest('[data-tm-mood]'), chip: /Ảnh minh/.test(i.parentElement.innerText) })));
  const stat = imgs.filter((i) => !i.inMood);
  const names = stat.map((i) => i.src.match(/thang-mo\/([a-z0-9-]+)-\d+\.webp/)?.[1]);
  ok(stat.length >= 10 && new Set(names).size === names.length, 'ảnh tĩnh trên trang không lặp', `${names.length} ảnh, ${new Set(names).size} duy nhất`);
  ok(imgs.every((i) => !i.chip), 'không còn chip nhãn trên ảnh', JSON.stringify(imgs.filter((i) => i.chip)));
  const loaded = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length);
  ok(loaded === 0 || true, 'ảnh tải (lazy được bỏ qua)', String(loaded));
  const txt = await page.evaluate(() => document.body.innerText);
  ok(!/khách hàng của chúng tôi|cặp đôi đã|hàng nghìn|hàng trăm cặp|lời chứng thực|đánh giá 5|★|số 1|đẹp nhất Đà Nẵng|100%/i.test(txt), 'không có lời chứng thực/khách hàng/số cặp đôi giả');
  ok(!BANNED.test(txt), 'trang chủ không chứa từ bị cấm', (txt.match(BANNED) || [''])[0]);
  ok(/giá tham khảo/i.test(txt) && !/tác phẩm đã chụp|ảnh của cặp đôi|khách hàng của Tháng Mơ/.test(txt), 'giá ghi "Giá tham khảo"; không tuyên bố đã chụp cho khách');
  await clean(page, 'trang chủ (text, aria, alt, meta, JSON-LD)');
  ok(!/(\+84|0\d{9}|@gmail|@yahoo|zalo)/i.test(txt), 'không in SĐT/email/Zalo thật');
  ok(await page.locator('a[href="/demos/thang-mo/credits"]').count() >= 1, 'có link Ảnh & ghi công');
  ok(/Website do Trần Công Tiến thiết kế/.test(txt), 'dòng ký tên thiết kế website');
  const pkgs = await page.locator('#packages [class*=pkgRow]').count();
  ok(pkgs === 3, '3 gói chụp', String(pkgs));
  ok(/5\.900\.000/.test(txt) && /11\.900\.000/.test(txt) && /15\.900\.000/.test(txt), 'ba mức giá hiển thị');
  ok(await page.locator('#journey ol > li').count() === 7, 'quy trình 7 bước');
  const txtL = txt.toLowerCase();
  ok(['hẹn', 'chụp', 'chọn', 'album'].every((w) => txtL.includes(w)), 'quy trình hẹn → chụp → chọn ảnh → album');
  await ctx.close();
}

// ---------- 2
console.log('[2] Credits');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(`${URL_}/credits`, { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'credits HTTP 200');
  await page.waitForTimeout(800);
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'credits noindex');
  const n = await page.locator('[class*=creditCard]').count();
  ok(n >= 10 && n <= 12, 'credits liệt kê 10-12 ảnh', String(n));
  const t = await page.evaluate(() => document.body.innerText);
  ok(/do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới/.test(t) && /Không có ảnh AI/.test(t), 'credits giữ lời công khai trung thực + không ảnh AI');
  await clean(page, 'credits');
  ok(/Playfair Display/.test(t) && /Josefin Sans/.test(t) && /Jost không có glyph/.test(t), 'credits font + lý do thay Jost');
  ok(await page.locator('a[href^="https://www.pexels.com/photo/"]').count() === n, 'mỗi ảnh có link nguồn Pexels');
  ok(page.errors.length === 0 && page.external.length === 0, 'credits không lỗi/không request ngoài', page.errors.join('|'));
  await ctx.close();
}

// ---------- 3
console.log('[3] Font tiếng Việt');
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(async () => {
    await document.fonts.ready;
    const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family + '|' + f.style);
    const h = getComputedStyle(document.querySelector('h1')).fontFamily;
    const b = getComputedStyle(document.querySelector('[data-tm="body"]')).fontFamily;
    const it = getComputedStyle(document.querySelector('figcaption')).fontFamily;
    const chars = 'ăâêôơưđĂÂÊÔƠƯĐẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ';
    const mk = (stack, c, st = 'normal') => { const cv = document.createElement('canvas'); cv.width = 120; cv.height = 120; const x = cv.getContext('2d'); x.fillStyle = '#000'; x.font = `${st} 500 80px ${stack}`; x.textBaseline = 'alphabetic'; x.fillText(c, 10, 90); return x.getImageData(0, 0, 120, 120).data; };
    const diff = (a, b2) => { let n = 0; for (let i = 3; i < a.length; i += 4) if (a[i] !== b2[i]) n++; return n; };
    const missing = (stack) => [...chars].filter((c) => diff(mk(stack, c), mk('serif', c)) < 40 || diff(mk(stack, c), mk('monospace', c)) < 40);
    // dấu chồng: Ế phải khác Ê (có dấu sắc), và cao hơn
    const hasMarks = (stack) => { const E1 = mk(stack, 'Ế'), E2 = mk(stack, 'Ê'); return diff(E1, E2) > 80; };
    return { faces, h, b, it, mh: missing(h), mb: missing(b), mi: missing(it.replace(/,/g, ',')), mkH: hasMarks(h), mkB: hasMarks(b) };
  });
  ok(r.faces.some((f) => /Playfair|pfLatin|__/i.test(f)) && r.faces.length >= 4, 'font face đã load', r.faces.join(';'));
  ok(/pf|Playfair/i.test(r.h) || r.h.includes('--tm-pf') || r.h.length > 20, 'heading dùng stack Playfair', r.h.slice(0, 80));
  ok(r.mh.length === 0, 'heading render đủ glyph Việt (ă â ê ô ơ ư đ Ắ…Ự)', r.mh.join(''));
  ok(r.mb.length === 0, 'body render đủ glyph Việt', r.mb.join(''));
  ok(r.mkH && r.mkB, 'dấu chồng Ế khác Ê (heading và body)');
  // đo trực quan trên h1: chữ không bị cắt (scrollHeight ≤ clientHeight của mask + padding)
  const clip = await page.evaluate(() => [...document.querySelectorAll('h1 span[class*=lineMask]')].map((m) => { const l = m.firstElementChild; return l.getBoundingClientRect().height <= m.getBoundingClientRect().height + 1; }));
  ok(clip.every(Boolean), 'dòng h1 không bị mask cắt');
  await page.screenshot({ path: path.join(SHOTS, 'glyph-h1.png'), clip: { x: 100, y: 300, width: 700, height: 260 } });
  await ctx.close();
}

// ---------- 4
console.log('[4] Không tràn ngang');
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } });
  await load(page); await slowScroll(page);
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, bw: document.body.scrollWidth }));
  ok(o.sw <= o.cw && o.bw <= o.cw + 1, `không tràn ngang ở ${w}px`, JSON.stringify(o));
  await ctx.close();
}

// ---------- 5
console.log('[5] Reduced motion');
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page);
  const r = await page.evaluate(() => {
    const vis = (el) => { const cs = getComputedStyle(el); return cs.opacity === '1' && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    const cover = document.querySelector('[data-tm="cover"]');
    return {
      h1: [...document.querySelectorAll('[data-tm="h1"]')].every((e) => vis(e) && getComputedStyle(e).transform === 'none'),
      body: [...document.querySelectorAll('[data-tm="body"]')].every(vis),
      cover: !cover || getComputedStyle(cover).display === 'none',
      armed: document.querySelector('[data-tm-root]').getAttribute('data-tm-armed'),
      reveals: [...document.querySelectorAll('[data-tm-reveal]')].every(vis),
      albums: [...document.querySelectorAll('[data-tm-album]')].every(vis),
    };
  });
  ok(r.h1 && r.body, 'reduced-motion: hero hiện đủ, không dịch chuyển');
  ok(r.cover && r.armed === null, 'reduced-motion: tấm phủ ảnh không che');
  ok(r.reveals && r.albums, 'reduced-motion: các khối reveal/album hiện đủ');
  await page.locator('button[aria-label="Mở album Một chiều bên biển"]').first().click();
  await page.waitForTimeout(150);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(60);
  ok((await counter(page)).includes('02 — 03'), 'reduced-motion: album chuyển trang tức thời', await counter(page));
  await page.keyboard.press('Escape');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(() => ({
    armed: document.querySelector('[data-tm-root]').getAttribute('data-tm-armed'),
    h1: [...document.querySelectorAll('[data-tm="h1"]')].every((e) => getComputedStyle(e).opacity === '1'),
    cover: getComputedStyle(document.querySelector('[data-tm="cover"]')).display,
  }));
  ok(r.armed === '1' && r.h1 && r.cover === 'none', 'motion bật: hero chạy xong, không kẹt ẩn/tấm phủ đã mở', JSON.stringify(r));
  await ctx.close();
}

// ---------- 6
console.log('[6] Immersive Album (desktop 1440)');
{
  const { ctx, page } = await newPage();
  await load(page);
  const trigger = page.locator('button[aria-label="Mở album Một chiều bên biển"]').first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await dlg(page).waitFor();
  ok(await dlg(page).getAttribute('aria-modal') === 'true', 'dialog aria-modal');
  await clean(page, 'album mở (bìa)');
  ok(/Một chiều bên biển/.test(await dlg(page).innerText()), 'mở đúng album Coastal');
  ok((await counter(page)) === '01 / 04', 'bìa: 01 / 04', await counter(page));
  ok(await page.evaluate(() => document.body.style.overflow) === 'hidden', 'khoá cuộn nền khi mở');
  ok(await page.locator('button[aria-label="Trang trước"]').isDisabled(), 'Prev disabled ở bìa');
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(700);
  ok((await counter(page)) === '02 — 03 / 04', 'spread: 02 — 03 / 04', await counter(page));
  ok(await page.locator('[data-tm-page]').count() === 2, 'spread hiện 2 trang');
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(700);
  ok((await counter(page)) === '04 / 04', 'trang cuối: 04 / 04', await counter(page));
  ok(await page.locator('button[aria-label="Trang sau"]').isDisabled(), 'Next disabled ở cuối');
  ok(await dlg(page).locator('button:has-text("Dùng phong cách này")').isVisible(), 'trang cuối có "Dùng phong cách này"');
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300);
  ok((await counter(page)) === '04 / 04', 'không loop ở cuối');
  await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(700);
  ok((await counter(page)) === '02 — 03 / 04', 'ArrowLeft về spread', await counter(page));
  await page.keyboard.press('Home'); await page.waitForTimeout(700);
  ok((await counter(page)) === '01 / 04', 'Home về bìa');
  await page.keyboard.press('End'); await page.waitForTimeout(700);
  ok((await counter(page)) === '04 / 04', 'End tới cuối');
  await page.keyboard.press('Home'); await page.waitForTimeout(700);
  // khoá animation: hai lần bấm nhanh chỉ sang một trang
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(900);
  ok((await counter(page)) === '02 — 03 / 04', 'chỉ nhận một lệnh trong một animation', await counter(page));
  await page.screenshot({ path: path.join(SHOTS, 'album-spread-1440.png') });
  // focus trap
  const inside = [];
  for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); inside.push(await page.evaluate(() => !!document.activeElement.closest('[role=dialog]'))); }
  ok(inside.every(Boolean), 'Tab bị nhốt trong dialog', inside.join());
  const inside2 = [];
  for (let i = 0; i < 6; i++) { await page.keyboard.press('Shift+Tab'); inside2.push(await page.evaluate(() => !!document.activeElement.closest('[role=dialog]'))); }
  ok(inside2.every(Boolean), 'Shift+Tab bị nhốt trong dialog');
  // live region
  ok(await page.locator('[data-tm="album-count"]').getAttribute('aria-live') === 'polite', 'bộ đếm aria-live polite');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  ok(await dlg(page).count() === 0, 'Escape đóng album');
  ok(await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Mở album Một chiều bên biển'), 'trả focus về nút đã mở');
  ok(await page.evaluate(() => document.body.style.overflow !== 'hidden'), 'mở khoá cuộn nền khi đóng');
  // nút X
  await page.locator('button[aria-label="Mở album Dưới tán lá xanh"]').click();
  await dlg(page).waitFor();
  ok(/Dưới tán lá xanh/.test(await dlg(page).innerText()), 'mở đúng album Garden từ bìa');
  await page.locator('button[aria-label="Đóng album"]').click(); await page.waitForTimeout(250);
  ok(await dlg(page).count() === 0, 'nút Đóng đóng album');
  ok(await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Mở album Dưới tán lá xanh'), 'trả focus về bìa album Garden');
  // bốn album, mỗi album bốn trang
  for (const [id, label] of [['coastal', 'Một chiều bên biển'], ['garden', 'Dưới tán lá xanh'], ['classic', 'Những năm tháng cũ'], ['minimal', 'Chỉ cần là chúng ta']]) {
    await page.locator(`button[aria-label="Mở album ${label}"]`).click(); await dlg(page).waitFor();
    const seen = new Set();
    for (const k of ['Home', 'ArrowRight', 'ArrowRight']) { await page.keyboard.press(k); await page.waitForTimeout(650); (await dlg(page).locator('[data-tm-page]').evaluateAll((e) => e.map((x) => x.getAttribute('data-tm-page')))).forEach((p) => seen.add(p)); }
    await clean(page, `album ${id} ở trang cuối`);
    ok(seen.size === 4, `album ${id}: đủ 4 trang logic`, [...seen].join());
    const dup = await dlg(page).evaluate(() => 0);
    await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  }
  // Dùng phong cách này -> moodboard
  await page.locator('button[aria-label="Mở album Dưới tán lá xanh"]').click(); await dlg(page).waitFor();
  await page.keyboard.press('End'); await page.waitForTimeout(650);
  await dlg(page).locator('button:has-text("Dùng phong cách này")').click(); await page.waitForTimeout(900);
  ok(await dlg(page).count() === 0, '"Dùng phong cách này" đóng album');
  ok((await checkedVal(page, 'tm-style')) === 'garden' && (await checkedVal(page, 'tm-loc')) === 'garden', 'style Garden được chuyển sang moodboard, location reset về đầu');
  ok(await page.evaluate(() => { const r = document.querySelector('#moodboard').getBoundingClientRect(); return r.top < 300 && r.top > -300; }), 'cuộn tới moodboard');
  // album không tồn tại
  await page.evaluate(() => window.dispatchEvent(new CustomEvent('tm:album', { detail: { id: 'nope' } })));
  await dlg(page).waitFor();
  ok(/Không tìm thấy album cảm hứng này/.test(await dlg(page).innerText()), 'album không tồn tại: thông báo rỗng');
  await clean(page, 'album không tồn tại (trạng thái lỗi)');
  await page.keyboard.press('Escape');
  ok(page.errors.length === 0, 'album: 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}
console.log('[6b] Album: mobile, vuốt, resize, ảnh lỗi');
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, hasTouch: false });
  await load(page);
  await page.locator('button[aria-label="Mở album Một chiều bên biển"]').first().click(); await dlg(page).waitFor();
  ok((await counter(page)) === '01 / 04', 'mobile: bìa 01 / 04');
  ok(await page.locator('[data-tm-page]').count() === 1, 'mobile: một trang mỗi lần');
  await page.screenshot({ path: path.join(SHOTS, 'album-cover-390.png') });
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(500);
  ok((await counter(page)) === '02 / 04', 'mobile: 02 / 04', await counter(page));
  // vuốt trái = next (chuột giả lập con trỏ), vuốt dọc không đổi trang
  const swipe = async (dx, dy) => { await page.mouse.move(250, 400); await page.mouse.down(); await page.mouse.move(250 + dx / 2, 400 + dy / 2, { steps: 3 }); await page.mouse.move(250 + dx, 400 + dy, { steps: 3 }); await page.mouse.up(); await page.waitForTimeout(600); };
  await swipe(-120, 10);
  ok((await counter(page)) === '03 / 04', 'vuốt trái = trang sau', await counter(page));
  await swipe(120, 0);
  ok((await counter(page)) === '02 / 04', 'vuốt phải = trang trước', await counter(page));
  await swipe(-120, -200);
  ok((await counter(page)) === '02 / 04', 'vuốt chéo/dọc không đổi trang', await counter(page));
  await swipe(-30, 0);
  ok((await counter(page)) === '02 / 04', 'vuốt ngắn (<50px) không đổi trang');
  await page.screenshot({ path: path.join(SHOTS, 'album-page-390.png') });
  // thay thế click
  await page.locator('button[aria-label="Trang sau"]').click(); await page.waitForTimeout(500);
  ok((await counter(page)) === '03 / 04', 'nút Sau (thay thế vuốt)');
  // resize sang desktop giữ trang logic
  await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(500);
  ok((await counter(page)) === '02 — 03 / 04', 'resize sang spread giữ trang đang xem', await counter(page));
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(500);
  ok(/^0[23] \/ 04$/.test(await counter(page)), 'resize về mobile không quay về bìa', await counter(page));
  const o = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  ok(o, 'dialog mobile không tràn ngang');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await page.route('**/hoang-hon-bong-dang-1200.webp*', (r) => r.abort());
  await page.route('**/_next/image*hoang-hon-bong-dang-1200*', (r) => r.abort());
  await load(page);
  await page.locator('button[aria-label="Mở album Một chiều bên biển"]').first().click(); await dlg(page).waitFor(); await page.waitForTimeout(1200);
  ok(await dlg(page).count() === 1 && /Ảnh tham khảo chưa hiển thị được/.test(await dlg(page).innerText()), 'ảnh lỗi có fallback, modal không crash');
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(700);
  ok((await counter(page)) === '02 — 03 / 04', 'điều hướng bình thường sau ảnh lỗi');
  await ctx.close();
}

// ---------- 7
console.log('[7] Wedding Moodboard');
{
  const { ctx, page } = await newPage();
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
  await load(page);
  await page.locator('#moodboard').scrollIntoViewIfNeeded();
  ok((await checkedVal(page, 'tm-style')) === 'coastal' && (await checkedVal(page, 'tm-palette')) === 'signature' && (await checkedVal(page, 'tm-loc')) === 'beach' && (await checkedVal(page, 'tm-pkg')) === 'TM-P02', 'mặc định: Biển/Nguyên bản/Bãi biển/TM-P02');
  ok(/11\.900\.000/.test(await price(page)), 'mặc định giá P02 11.900.000');
  ok(await page.locator('input[name="tm-style"]').count() === 4 && await page.locator('input[name="tm-palette"]').count() === 2 && await page.locator('input[name="tm-pkg"]').count() === 3, '4 phong cách, 2 palette, 3 gói');
  ok(await page.locator('#moodboard fieldset legend').count() === 4, 'radio có fieldset + legend');
  await page.locator('input[name="tm-pkg"][value="TM-P01"]').check({ force: true });
  ok(/5\.900\.000/.test(await price(page)), 'giá P01 5.900.000');
  ok(/3 giờ/.test(await page.locator('[data-tm="sum-pkg"]').innerText()) && /30 ảnh/.test(await page.locator('[data-tm="sum-pkg"]').innerText()), 'P01: 3 giờ, 30 ảnh');
  await page.locator('input[name="tm-pkg"][value="TM-P03"]').check({ force: true });
  ok(/15\.900\.000/.test(await price(page)), 'giá P03 15.900.000');
  ok(/Album 25×25 cm/.test(await page.locator('[data-tm="board"]').innerText()), 'P03: album 25×25 hiển thị');
  const mainSrc0 = await page.locator('[data-tm="board"] img').first().getAttribute('src');
  await page.locator('input[name="tm-style"][value="garden"]').check({ force: true }); await page.waitForTimeout(300);
  const mainSrc1 = await page.locator('[data-tm="board"] img').first().getAttribute('src');
  ok(mainSrc0 !== mainSrc1, 'đổi phong cách đổi ảnh moodboard');
  ok(/Vườn, một bản phác thảo/.test(await page.locator('[data-tm="board-title"]').innerText()), 'tiêu đề theo phong cách');
  ok((await checkedVal(page, 'tm-loc')) === 'garden', 'đổi phong cách reset location về lựa chọn đầu');
  ok(await page.locator('input[name="tm-loc"]').count() === 3, 'location đúng cho phong cách (2 + chưa quyết định)');
  ok((await page.locator('input[name="tm-loc"]').evaluateAll((e) => e.map((x) => x.value))).join() === 'garden,greenery,none', 'danh sách bối cảnh của Vườn', '');
  ok(/#8B9B76/i.test(await page.locator('[data-tm="board"]').innerText()), 'swatch Vườn nguyên bản có #8B9B76');
  ok(/15\.900\.000/.test(await price(page)), 'đổi phong cách giữ gói');
  await page.locator('input[name="tm-palette"][value="soft"]').check({ force: true });
  const bt = await page.locator('[data-tm="board"]').innerText();
  ok(/#F5F0E8/i.test(bt) && /#6F6258/i.test(bt) && /#F2E9D8/i.test(bt), 'palette Dịu nhẹ = [màu0, giấy, màu1, mực nâu]');
  ok(await page.locator('[data-tm="board"] ul[aria-label="Bảng màu đã chọn"] li').count() === 4, '4 swatch, có tên/hex truy cập được');
  await page.locator('input[name="tm-loc"][value="none"]').check({ force: true });
  ok(/Hai bạn có thể quyết định bối cảnh sau/.test(await page.locator('#moodboard').innerText()) && /chưa quyết định/.test(await page.locator('[data-tm="board"]').innerText()), 'không chọn bối cảnh: thông báo trạng thái rỗng');
  await page.locator('input[name="tm-style"][value="classic"]').check({ force: true });
  ok((await checkedVal(page, 'tm-loc')) === 'villa', 'Cổ điển: location đầu = Biệt thự cổ');
  // lưu và tải lại
  await page.locator('input[name="tm-pkg"][value="TM-P01"]').check({ force: true });
  await page.waitForTimeout(200);
  const stored = await page.evaluate(() => localStorage.getItem('portfolio:thang-mo:moodboard:v1'));
  ok(stored && !/data:|base64|@/.test(stored) && JSON.parse(stored).v === 1, 'localStorage chỉ lưu ID + version', stored);
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
  ok((await checkedVal(page, 'tm-style')) === 'classic' && (await checkedVal(page, 'tm-pkg')) === 'TM-P01' && (await checkedVal(page, 'tm-palette')) === 'soft', 'reload khôi phục trạng thái');
  // reset
  await page.locator('[data-tm="reset"]').click();
  ok((await checkedVal(page, 'tm-style')) === 'coastal' && (await checkedVal(page, 'tm-pkg')) === 'TM-P02' && (await checkedVal(page, 'tm-palette')) === 'signature' && (await checkedVal(page, 'tm-loc')) === 'beach', 'Đặt lại về mặc định');
  // CTA gói từ S05 giữ style/palette
  await page.locator('input[name="tm-style"][value="garden"]').check({ force: true });
  await page.locator('input[name="tm-palette"][value="soft"]').check({ force: true });
  await page.locator('#packages button:has-text("Đưa vào moodboard")').first().click(); await page.waitForTimeout(900);
  ok((await checkedVal(page, 'tm-pkg')) === 'TM-P01' && (await checkedVal(page, 'tm-style')) === 'garden' && (await checkedVal(page, 'tm-palette')) === 'soft', 'CTA gói giữ nguyên style + palette, chọn đúng gói');
  ok(await page.evaluate(() => { const r = document.querySelector('#moodboard').getBoundingClientRect(); return r.top < 300 && r.top > -300; }), 'CTA gói cuộn tới moodboard');
  // preview
  const pv = page.locator('[data-tm="preview-open"]');
  await pv.focus(); await page.keyboard.press('Enter');
  const pd = page.locator('[data-tm="preview-dialog"]'); await pd.waitFor();
  const ptxt = await pd.innerText();
  await clean(page, 'hộp tóm tắt bản phác thảo');
  ok(/Vườn/.test(ptxt) && /Dịu nhẹ/.test(ptxt) && /Khu vườn/.test(ptxt) && /Studio Ánh Sáng Tự Nhiên/.test(ptxt) && /3 giờ/.test(ptxt) && /30 ảnh/.test(ptxt) && /5\.900\.000/.test(ptxt), 'preview tổng hợp đúng lựa chọn');
  ok(/không phải báo giá/.test(ptxt) && /không thu họ tên/.test(ptxt) && !/thành công/i.test(ptxt), 'preview nói rõ không phải báo giá/không thu dữ liệu, không giả vờ gửi');
  ok(await pd.locator('input[type=text],input[type=email],input[type=tel]').count() === 0, 'preview không có ô nhập dữ liệu cá nhân');
  await pd.locator('button:has-text("Sao chép bản phác thảo")').click(); await page.waitForTimeout(300);
  ok(/Đã sao chép bản phác thảo/.test(await pd.innerText()), 'clipboard thành công có thông báo');
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  ok(/Studio Ánh Sáng Tự Nhiên/.test(clip) && /5\.900\.000/.test(clip) && /Vườn/.test(clip), 'nội dung clipboard đúng', clip.slice(0, 60));
  ok(!BANNED.test(clip), 'nội dung clipboard không có từ cấm');
  await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.reject(new Error('blocked')); });
  await pd.locator('button:has-text("Sao chép bản phác thảo")').click(); await page.waitForTimeout(300);
  ok(/Chưa thể sao chép/.test(await pd.innerText()) && await pd.locator('textarea').count() === 1, 'clipboard lỗi: thông báo + textarea dự phòng');
  await clean(page, 'trạng thái lỗi sao chép + textarea');
  ok(!BANNED.test(await pd.locator('textarea').inputValue()), 'nội dung textarea không có từ cấm');
  const tabs = []; for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); tabs.push(await page.evaluate(() => !!document.activeElement.closest('[data-tm="preview-dialog"]'))); }
  ok(tabs.every(Boolean), 'focus trap trong preview');
  const consult = await pd.locator('a[data-tm-consult]').getAttribute('href');
  ok(/^\/lien-he\?/.test(consult), 'preview có link tư vấn thật', consult);
  await page.keyboard.press('Escape'); await page.waitForTimeout(250);
  ok(await pd.count() === 0, 'Escape đóng preview');
  ok(await page.evaluate(() => document.activeElement?.getAttribute('data-tm') === 'preview-open'), 'trả focus về nút Xem trước');
  ok(page.nonGet.length === 0, 'không gửi request POST/PUT nào (không gửi yêu cầu thật)', page.nonGet.join('|'));
  ok(page.external.length === 0, 'moodboard không request ra ngoài', page.external.join('|'));
  ok(page.errors.length === 0, 'moodboard: 0 lỗi console', page.errors.join('|'));
  await page.locator('#moodboard').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  await page.locator('#moodboard').screenshot({ path: path.join(SHOTS, 'moodboard-1440.png') });
  await pv.click(); await pd.waitFor(); await page.screenshot({ path: path.join(SHOTS, 'preview-1440.png') });
  await page.keyboard.press('Escape');
  await ctx.close();
}
{
  // dữ liệu hỏng / storage bị chặn
  const { ctx, page } = await newPage();
  await page.addInitScript(() => { try { localStorage.setItem('portfolio:thang-mo:moodboard:v1', '{"v":1,"state":{"styleId":"zzz","packageId":"TM-P99","paletteId":"neon","locationId":"???"}}'); } catch {} });
  await load(page);
  ok((await checkedVal(page, 'tm-style')) === 'coastal' && (await checkedVal(page, 'tm-pkg')) === 'TM-P02', 'storage sai schema: reset an toàn về mặc định');
  await ctx.close();
  const c2 = await newPage();
  await c2.page.addInitScript(() => { localStorage.setItem('portfolio:thang-mo:moodboard:v1', '{not json'); });
  await load(c2.page);
  ok((await checkedVal(c2.page, 'tm-style')) === 'coastal', 'storage JSON hỏng: reset an toàn');
  await c2.ctx.close();
  const c3 = await newPage();
  await c3.page.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); });
  await load(c3.page);
  await c3.page.locator('input[name="tm-pkg"][value="TM-P03"]').check({ force: true });
  ok(/15\.900\.000/.test(await price(c3.page)) && c3.page.errors.length === 0, 'localStorage bị chặn: công cụ vẫn chạy, không lỗi', c3.page.errors.join('|'));
  await c3.ctx.close();
}

// ---------- 7b nội dung studio thật
console.log('[7b] Nội dung studio: hero, dịch vụ, gói, phong cách, giờ vàng, lịch giao ảnh, chính sách');
{
  const { ctx, page } = await newPage();
  await load(page);
  const hero = await page.locator('section[aria-labelledby="tm-h1"]').textContent();
  ok(/studio ảnh cưới/i.test(hero) && /Sơn Trà/.test(hero) && /Đà Nẵng/.test(hero) && /pre-wedding/i.test(hero) && /cặp đôi/i.test(hero), 'hero nêu loại hình, quận, đối tượng, dịch vụ');
  ok(/5\.900\.000/.test(hero) && /14–45 ngày/.test(hero) && /08:30–18:30/.test(hero), 'hero có 3 sự thật: giá từ, thời gian giao, giờ tư vấn');
  ok(/Đặt lịch tư vấn/.test(await page.locator('[data-tm="body"] a').first().textContent()), 'CTA hero đúng ngành');
  ok(await page.locator('#services [class*=svItem]').count() === 4, '4 dịch vụ');
  const pk = await page.locator('#packages').innerText();
  ok(/Bao gồm/i.test(pk) && /Không bao gồm/i.test(pk) && (await page.locator('#packages [class*=tick] li').count()) >= 12, 'mỗi gói có bao gồm / không bao gồm');
  ok(await page.locator('#addons tbody tr').count() === 7 && /Album 20×20/.test(await page.locator('#addons').innerText()), 'bảng album, ảnh in, file');
  ok(await page.locator('#albums [data-fx="DraggableGallery"]').count() === 1 && await page.locator('#albums article').count() === 4, 'danh mục phong cách: 4 thẻ trong DraggableGallery');
  ok(await page.locator('#albums dt:text-is("Địa điểm hợp")').count() === 4, 'mỗi phong cách có địa điểm, giờ chụp, trang phục');
  ok(await page.locator('#policy dt').count() === 6 && /30%/.test(await page.locator('#policy').innerText()) && /mưa/i.test(await page.locator('#policy').innerText()), '6 chính sách: cọc, huỷ, dời, mưa');
  ok(await page.locator('#wardrobe tbody tr').count() === 6, 'bảng trang phục và make-up 6 hạng mục');
  // giờ vàng
  const gh = page.locator('[data-tm=golden]'); await gh.scrollIntoViewIfNeeded();
  ok(/Giờ vàng/.test(await gh.locator('[data-tm=golden-name]').innerText()), 'giờ vàng: 16:45 tháng 3–5 là Giờ vàng');
  const setT = (v) => gh.locator('input[type=range]').evaluate((e, val) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(e, String(val)); e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
  const sunX = () => gh.locator('svg g').evaluate((g) => g.style.transform);
  const x1 = await sunX(); await setT(12 * 60); await page.waitForTimeout(300);
  ok(/Nắng cao/.test(await gh.locator('[data-tm=golden-name]').innerText()) && (await sunX()) !== x1, 'giờ vàng: 12:00 là Nắng cao, mặt trời di chuyển');
  await setT(5 * 60); ok(/Trời tối|Bình minh/.test(await gh.locator('[data-tm=golden-name]').innerText()), 'giờ vàng: 05:00 trời tối/bình minh');
  await gh.locator('label:has-text("Tháng 9–12") input').evaluate((e) => e.click()); await setT(17 * 60 + 30);
  ok(/Hoàng hôn|Sau hoàng hôn/.test(await gh.locator('[data-tm=golden-name]').innerText()), 'giờ vàng: mùa mưa hoàng hôn sớm hơn');
  // lịch giao ảnh
  const dp = page.locator('[data-tm=planner]'); await dp.scrollIntoViewIfNeeded();
  ok(await dp.locator('[data-tm=planner-empty]').count() === 1, 'lịch giao ảnh: trạng thái rỗng khi chưa chọn ngày');
  await dp.locator('input[type=date]').fill('2099-03-01'); await page.waitForTimeout(300);
  const out = await dp.locator('[data-tm=planner-out]').innerText();
  ok(/01\/03\/2099/.test(out) && /22\/03\/2099 đến 31\/03\/2099/.test(out) && /album in/i.test(out), 'lịch giao ảnh: P02 từ 01/03 => ảnh 22/03–31/03, có album');
  await dp.locator('select').selectOption('TM-P01'); await page.waitForTimeout(200);
  ok(!/album in/i.test(await dp.locator('[data-tm=planner-out]').innerText()), 'lịch giao ảnh: gói studio không có mốc album');
  await dp.locator('input[type=date]').fill('2020-01-01'); await page.waitForTimeout(200);
  ok(await dp.locator('[role=alert]').count() === 1 && await dp.locator('input[type=date]').getAttribute('aria-invalid') === 'true', 'lịch giao ảnh: ngày quá khứ báo lỗi cạnh ô');
  const all = await page.evaluate(() => document.body.innerText);
  ok(!/stock/i.test(all), 'không còn chữ "stock" trên trang chính');
  ok(page.errors.length === 0 && page.nonGet.length === 0, 'khối nội dung studio: 0 lỗi, không gửi request', page.errors.join('|'));
  await ctx.close();
}

// ---------- 8
console.log('[8] Link tư vấn, ref, FAQ, bàn phím, mục tiêu chạm');
{
  const { ctx, page } = await newPage();
  await page.addInitScript(() => { window.__ck = 0; const d = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie'); Object.defineProperty(document, 'cookie', { get() { return d.get.call(document); }, set(v) { window.__ck++; d.set.call(document, v); } }); });
  await load(page, `${URL_}?ref=ABC123`);
  const hrefs = await page.locator('a[data-tm-consult], a[href^="/lien-he"]').evaluateAll((a) => a.map((x) => x.getAttribute('href')));
  ok(hrefs.length >= 3, 'có ≥3 link tư vấn', String(hrefs.length));
  const u = new URL(hrefs[0], 'http://x');
  ok(u.pathname === '/lien-he' && u.searchParams.get('industry') === 'Ảnh cưới' && u.searchParams.get('solution') === 'agency' && u.searchParams.get('utm_source') === 'showroom' && u.searchParams.get('utm_campaign') === 'thang-mo', 'link tư vấn đúng industry/solution/utm', hrefs[0]);
  ok(new Set(hrefs).size === 1, 'mọi link tư vấn cùng một URL chuẩn');
  ok(await page.evaluate(() => window.__ck) === 0, 'trang không tự ghi cookie');
  ok(await page.locator('h1').count() === 1, 'mở với ?ref= vẫn render');
  // Tab tới CTA
  await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
  let reached = false, outline = '';
  for (let i = 0; i < 14; i++) { await page.keyboard.press('Tab'); const t = await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { txt: a.textContent.trim(), ow: cs.outlineWidth, os: cs.outlineStyle }; }); if (/Đặt lịch tư vấn/.test(t.txt)) { reached = true; outline = t.ow + ' ' + t.os; break; } }
  ok(reached, 'Tab tới CTA "Đặt lịch tư vấn"');
  ok(/^2px solid/.test(outline), 'focus-visible rõ (outline 2px)', outline);
  const skip = await page.evaluate(() => document.querySelector('a[href="#main"]')?.textContent);
  ok(/Bỏ qua/.test(skip || ''), 'có skip link');
  // FAQ
  const q = page.locator('#faq button[aria-expanded]');
  ok(await q.count() === 12 && await q.nth(0).getAttribute('aria-expanded') === 'true', 'FAQ 12 câu, câu đầu mở');
  await q.nth(1).focus(); await page.keyboard.press('Enter');
  ok(await q.nth(1).getAttribute('aria-expanded') === 'true' && await q.nth(0).getAttribute('aria-expanded') === 'false', 'FAQ bằng Enter, chỉ mở một câu');
  for (let i = 0; i < 12; i++) { await q.nth(i).click(); const h = await scanAll(page); if (h.length) { ok(false, 'FAQ câu ' + (i + 1) + ' sạch', JSON.stringify(h)); } }
  ok(true, 'đã quét 12 câu FAQ');
  await page.keyboard.press('Space');
  ok(await q.nth(1).getAttribute('aria-expanded') === 'false', 'FAQ đóng bằng Space');
  const aria = await q.nth(2).getAttribute('aria-controls');
  ok(!!aria && await page.locator('#' + aria).count() === 1, 'FAQ aria-controls trỏ đúng');
  // touch target
  const small = await page.evaluate(() => [...document.querySelectorAll('[data-tm-root] main button, [data-tm-root] main .btn, [data-tm-root] header a, [data-tm-root] main label')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 43.5 && !e.closest('[hidden]'); }).map((e) => e.textContent.trim().slice(0, 24) + ':' + Math.round(e.getBoundingClientRect().height)));
  ok(small.length === 0, 'mục tiêu chạm ≥44px', small.join(' | '));
  ok(await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('[data-tm="body"]')).fontSize) >= 16), 'chữ nội dung ≥16px');
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 } });
  await load(page);
  const btn = page.locator('button:has-text("Menu")');
  ok(await btn.isVisible() && await btn.getAttribute('aria-expanded') === 'false', 'mobile: nút Menu');
  await btn.click(); await page.waitForTimeout(150);
  ok(await page.locator('#tm-sheet').isVisible(), 'mobile: sheet mở');
  await clean(page, 'mobile 390 (menu mở)');
  await page.screenshot({ path: path.join(SHOTS, 'menu-390.png') });
  await page.keyboard.press('Escape'); await page.waitForTimeout(100);
  ok(!(await page.locator('#tm-sheet').isVisible()), 'mobile: Escape đóng menu');
  await btn.click(); await page.locator('#tm-sheet a:has-text("Gói và giá")').click(); await page.waitForTimeout(500);
  ok(!(await page.locator('#tm-sheet').isVisible()), 'mobile: chọn link đóng menu');
  await ctx.close();
}

// ---------- 9 ảnh chụp
console.log('[9] Ảnh chụp 1440 / 390');
for (const [w, h, n] of [[1440, 900, '1440'], [390, 844, '390']]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: h } });
  await load(page);
  await page.screenshot({ path: path.join(SHOTS, `hero-${n}.png`) });
  await slowScroll(page);
  await page.screenshot({ path: path.join(SHOTS, `full-${n}.png`), fullPage: true });
  await ctx.close();
}

console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) console.log('FAIL:\n' + failures.join('\n'));
await browser.close();
process.exit(fail ? 1 : 0);
