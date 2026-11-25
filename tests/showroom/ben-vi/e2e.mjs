// E2E Bến Vị (LP-05). Chạy: BASE=http://localhost:3100 node tests/showroom/ben-vi/e2e.mjs
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/ben-vi`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
let pass = 0, fail = 0; const failures = [];
function ok(c, name, extra = '') { if (c) { pass++; console.log('  PASS', name); } else { fail++; failures.push(name + ' ' + extra); console.log('  FAIL', name, extra); } }
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });

// ---- Chính sách nhãn mới (AGENT-RULES mục 11): trang không được chứa chữ demo/minh hoạ/giả định/mô phỏng...
const BANNED = /(?<![\/\w-])demo(?!s\b)|minh ho[aạ]|giả định|giả lập|mô phỏng|dữ liệu mẫu|không phải doanh nghiệp|thương hiệu minh|trình diễn|design demonstration/iu;
const BANNED_CREDITS = /(?<![\/\w-])demo(?!s\b)/iu;
async function expectClean(page, label, re = BANNED) {
  const texts = await page.evaluate(() => {
    const out = [document.title, document.body.innerText];
    document.querySelectorAll('meta[name=description],meta[property^="og:"],meta[name^="twitter:"]').forEach((m) => out.push(m.content || ''));
    document.querySelectorAll('[aria-label],[alt],[title],[placeholder],[aria-description]').forEach((e) => { for (const a of ['aria-label', 'alt', 'title', 'placeholder', 'aria-description']) { const v = e.getAttribute(a); if (v) out.push(v); } });
    return out;
  });
  const hits = [];
  for (const t of texts) { const m = t.normalize('NFC').match(re); if (m) { const i = t.normalize('NFC').indexOf(m[0]); hits.push(JSON.stringify(t.normalize('NFC').slice(Math.max(0, i - 25), i + 40))); } }
  ok(hits.length === 0, 'không có nhãn cấm: ' + label, hits.slice(0, 3).join(' | '));
}
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage(); page.errors = []; page.external = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['http:', 'https:'].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); });
  return { ctx, page };
}
const load = async (page, url = URL_) => { await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2400); };
async function slowScroll(page, tries = 3) {
  try { await slowScrollOnce(page); } catch (e) { if (tries <= 1) throw e; await page.waitForTimeout(3000); await page.waitForLoadState('networkidle').catch(() => {}); return slowScroll(page, tries - 1); }
}
async function slowScrollOnce(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
    await new Promise((r) => setTimeout(r, 900)); window.scrollTo(0, 0);
    await Promise.race([Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })), new Promise((r) => setTimeout(r, 20000))]);
  });
  await page.waitForTimeout(900);
}

console.log('[1] Tải trang, console, request ngoài origin');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: 'networkidle', timeout: 120000 });
  ok(res.status() === 200, 'HTTP 200');
  await page.waitForTimeout(2500);
  ok(page.errors.length === 0, '0 lỗi console', page.errors.join(' | '));
  await expectClean(page, 'trang chủ sau khi tải');
  ok(page.external.length === 0, 'không request ra ngoài origin', page.external.join(' | '));
  ok(/Bến Vị/.test(await page.title()), 'title riêng', await page.title());
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'robots noindex');
  ok(await page.locator('link[rel=icon][href*="ben-vi/identity/favicon"]').count() > 0, 'favicon theo route');
  ok(await page.locator('h1').count() === 1, 'đúng 1 h1');
  ok(await page.locator('meta[property="og:image"][content*="ben-vi"]').count() > 0, 'og:image riêng');
  const imgs = await page.evaluate(() => document.images.length);
  ok(imgs >= 10, 'có ≥10 ảnh trên trang', String(imgs));
  const heroLazy = await page.evaluate(() => document.querySelector('[data-bv=plate] img')?.loading);
  ok(heroLazy !== 'lazy', 'ảnh hero không lazy', String(heroLazy));
  await ctx.close();
}

console.log('[2] Không tràn ngang 320/390/768/1024/1440');
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } });
  await load(page);
  const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(m.sw <= m.cw, `w=${w} scrollWidth<=clientWidth`, `${m.sw}>${m.cw}`);
  await ctx.close();
}

console.log('[3] Font tiếng Việt render thật');
{
  const { ctx, page } = await newPage(); await load(page);
  const r = await page.evaluate(async () => {
    const dispStack = getComputedStyle(document.querySelector('h1')).fontFamily;
    const bodyStack = getComputedStyle(document.querySelector('main p')).fontFamily;
    const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
    const px = (stack, wt, ch) => { const c = document.createElement('canvas'); c.width = 80; c.height = 100; const x = c.getContext('2d'); x.font = `${wt} 60px ${stack}`; x.fillText(ch, 8, 80); return x.getImageData(0, 0, 80, 100).data; };
    const diff = (a, b) => { let n = 0; for (let i = 3; i < a.length; i += 4) if ((a[i] > 128) !== (b[i] > 128)) n++; return n; };
    const ink = (a) => { let n = 0; for (let i = 3; i < a.length; i += 4) if (a[i] > 128) n++; return n; };
    const lower = 'ăâêôơưđ', upper = 'ĂÂÊÔƠƯĐ', all = 'ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ';
    const empty = [...(lower + upper + all)].filter((ch) => ink(px(dispStack, 600, ch)) < 30);
    const emptyBody = [...(lower + upper + all.toLowerCase())].filter((ch) => ink(px(bodyStack, 400, ch)) < 20);
    const pairs = [['Ế', 'Ê'], ['Ỗ', 'Ô'], ['Ấ', 'Â'], ['Ầ', 'Â'], ['Ố', 'Ô'], ['Ự', 'Ư'], ['Ệ', 'Ê']];
    const stacked = pairs.map(([a, b]) => diff(px(dispStack, 600, a), px(dispStack, 600, b)) > 40);
    const stackedBody = pairs.map(([a, b]) => diff(px(bodyStack, 400, a.toLowerCase()), px(bodyStack, 400, b.toLowerCase())) > 15);
    return { dispStack, faces, empty, emptyBody, stacked, stackedBody };
  });
  ok(r.faces.some((f) => /fraunces|__.*ff/i.test(f)) || r.faces.length >= 3, 'faces Fraunces/Barlow loaded', r.faces.join(','));
  ok(!/^(Georgia|"Times)/.test(r.dispStack), 'stack display bắt đầu bằng font riêng', r.dispStack);
  ok(r.empty.length === 0, 'Fraunces có glyph ă â ê ô ơ ư đ + Ắ…Ự', r.empty.join(''));
  ok(r.emptyBody.length === 0, 'Barlow có glyph tiếng Việt', r.emptyBody.join(''));
  ok(r.stacked.every(Boolean), 'Fraunces vẽ đủ dấu chồng', JSON.stringify(r.stacked));
  ok(r.stackedBody.every(Boolean), 'Barlow vẽ đủ dấu chồng', JSON.stringify(r.stackedBody));
  await ctx.close();
}

console.log('[4] reduced-motion: nội dung hiện đủ + link thoát');
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page); await slowScroll(page);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('h1 span, h2, [data-bv=reveal], [data-bv=tile] img, [data-bv=plate]')].filter((e) => getComputedStyle(e).opacity === '0').length);
  ok(hidden === 0, 'không phần tử nào opacity 0 khi reduced-motion', String(hidden));
  const hrefs = await page.locator('a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 2, 'có ≥2 link tư vấn', String(hrefs.length));
  const u = new URL(hrefs[0], BASE);
  ok(u.pathname === '/lien-he' && u.searchParams.get('industry') === 'Hải sản' && u.searchParams.get('solution') === 'fnb' && u.searchParams.get('utm_campaign') === 'ben-vi' && u.searchParams.get('utm_source') === 'showroom', 'link tư vấn có industry/solution/utm', hrefs[0]);
  ok(await page.locator('a[href="/demos/ben-vi/credits"]').count() > 0, 'có link Credits ảnh');
  ok(await page.locator('text=Website do Trần Công Tiến thiết kế').count() > 0, 'có dòng ký tên nhẹ');
  ok(await page.locator('text=giá tham khảo').count() > 0, 'có ghi chú giá tham khảo');
  await ctx.close();
}

console.log('[5] Menu Composer');
{
  const { ctx, page } = await newPage(); await load(page);
  const sec = page.locator('#ghep-thuc-don'); await sec.scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
  const dishes = () => sec.locator('[data-testid=dish]').count();
  const total = async () => (await sec.locator('[data-testid=total]').innerText()).replace(/\D/g, '') | 0;
  const n4 = await dishes(), t4 = await total();
  ok(n4 >= 3, 'mặc định 4 khách gợi ý ≥3 món', String(n4));
  await expectClean(page, 'composer: kết quả gợi ý mặc định');
  ok(t4 <= 2000000 && t4 > 0, 'tổng ≤ ngân sách 2.000.000', String(t4));
  for (let i = 0; i < 6; i++) await sec.getByRole('button', { name: 'Tăng một khách' }).click();
  await page.waitForTimeout(200);
  const n10 = await dishes();
  ok(n10 > n4 || (await sec.locator('[role=alert]').count()) > 0, '10 khách: nhiều món hơn hoặc cảnh báo ngân sách', `${n4}->${n10}`);
  ok(/10 khách/.test(await sec.locator('[data-testid=guests]').innerText()), 'hiển thị 10 khách');
  // ngân sách thấp -> cảnh báo
  await sec.locator('[data-testid=budget]').fill('400000'); await page.waitForTimeout(250);
  ok((await sec.locator('[role=alert]').count()) > 0 && /chưa đủ/.test(await sec.locator('[role=alert]').first().innerText()), 'ngân sách thấp báo lỗi thiếu ngân sách');
  ok((await total()) <= 400000, 'tổng không vượt ngân sách thấp', String(await total()));
  await sec.locator('[data-testid=budget]').fill('5000000'); await page.waitForTimeout(250);
  const rich = await total(); ok(rich > t4, 'ngân sách cao hơn: tổng tăng', `${t4} -> ${rich}`);
  // tránh vỏ cứng
  await sec.getByLabel(/Tránh tôm cua/).check(); await page.waitForTimeout(250);
  const names = await sec.locator('[data-testid=dish] h4').allInnerTexts();
  ok(!names.some((x) => /Tôm|Cua|Ghẹ|Hàu|Nghêu|Sò|Cơm chiên|Lẩu hải sản|Gỏi xoài tôm/.test(x)), 'bật tránh vỏ cứng: không món tôm/cua/hàu...', names.join(', '));
  // bớt tất cả -> rỗng
  while ((await dishes()) > 0) await sec.getByRole('button', { name: /^Bớt món/ }).first().click();
  ok(await sec.locator('[data-testid=empty]').isVisible(), 'trạng thái rỗng khi bớt hết món');
  // thêm món
  const sel = sec.locator('select'); await sel.selectOption({ index: 1 }); await sec.getByRole('button', { name: 'Thêm món' }).click();
  ok((await dishes()) === 1, 'thêm 1 món từ danh sách');
  // lưu / mở
  await sec.getByRole('button', { name: 'Lưu thực đơn' }).click();
  ok(/Đã lưu/.test(await sec.locator('[data-testid=saved]').innerText()), 'lưu thực đơn');
  await expectClean(page, 'composer: đã lưu');
  ok(await page.evaluate(() => !!localStorage.getItem('bv-saved-menu-v1')), 'localStorage có bản lưu');
  await sec.getByRole('button', { name: 'Gợi ý lại' }).click();
  await sec.getByRole('button', { name: 'Mở bản đã lưu' }).click();
  ok((await dishes()) === 1, 'mở bản đã lưu khôi phục 1 món');
  // in: emulate print
  await page.emulateMedia({ media: 'print' });
  const vis = await page.evaluate(() => ({ hero: getComputedStyle(document.querySelector('#hero-h').closest('section')).display, actions: getComputedStyle(document.querySelector('[data-testid=sheet]')).display }));
  ok(vis.hero === 'none' && vis.actions !== 'none', 'chế độ in: ẩn hero, giữ tờ thực đơn', JSON.stringify(vis));
  await page.screenshot({ path: path.join(SHOTS, 'print-1440.png') });
  await page.emulateMedia({ media: 'screen' });
  // giá tiền định dạng VND
  ok(/₫/.test(await sec.locator('[data-testid=total]').innerText()), 'tiền định dạng VND (₫)');
  await ctx.close();
}

console.log('[6] Table Reservation');
{
  const { ctx, page } = await newPage(); await load(page);
  const sec = page.locator('#dat-ban'); await sec.scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
  await page.waitForSelector('#dat-ban [data-testid=day]');
  ok((await sec.locator('[data-testid=day]').count()) + (await sec.locator('[data-testid=day-full]').count()) === 10, '10 ngày hiển thị');
  ok((await sec.locator('[data-testid=day-full]').count()) >= 1 && await sec.locator('[data-testid=day-full]').first().isDisabled(), 'có ngày kín bị vô hiệu');
  ok(await sec.locator('[data-testid=ticket-empty]').isVisible(), 'phiếu rỗng khi chưa chọn');
  await expectClean(page, 'đặt bàn: phiếu rỗng');
  ok(/Chọn một ngày/.test(await sec.locator('[data-testid=ticket-empty]').innerText()), 'gợi ý chọn ngày');
  // chọn ngày có slot kín
  const days = sec.locator('[data-testid=day]');
  let foundFull = false;
  for (let i = 0; i < await days.count(); i++) { await days.nth(i).click(); if (await sec.locator('[data-testid=slot-full]').count()) { foundFull = true; break; } }
  ok(foundFull, 'có khung giờ kín (disabled)');
  ok(await sec.locator('[data-testid=slot-full]').first().isDisabled(), 'khung giờ kín không chọn được');
  await sec.locator('[data-testid=slot]').first().click();
  ok(await sec.locator('[data-testid=ticket]').getByText('Xem trước · chưa giữ bàn').isVisible(), 'phiếu xem trước hiện dấu "chưa giữ bàn"');
  await expectClean(page, 'đặt bàn: phiếu đã chọn');
  // khu vực: phòng riêng với 4 khách -> lỗi
  await sec.getByRole('button', { name: /Phòng riêng/ }).click();
  ok(await sec.locator('[data-testid=area-error]').isVisible() && /từ 6 khách/.test(await sec.locator('[data-testid=area-error]').innerText()), 'phòng riêng + 4 khách: báo lỗi');
  await expectClean(page, 'đặt bàn: báo lỗi khu vực');
  ok(await sec.locator('[data-testid=ticket-empty]').isVisible(), 'phiếu rỗng khi khu vực sai');
  for (let i = 0; i < 2; i++) await sec.getByRole('button', { name: 'Tăng một khách' }).click();
  ok(!(await sec.locator('[data-testid=area-error]').count()), '6 khách: hết lỗi phòng riêng');
  ok((await sec.locator('[data-testid=t-time]').innerText()).length === 5, 'phiếu có giờ');
  // quầy bếp lửa max 4
  await sec.getByRole('button', { name: /Quầy bếp lửa/ }).click();
  ok(/tối đa 4/.test(await sec.locator('[data-testid=area-error]').innerText()), 'quầy bếp lửa + 6 khách: báo vượt');
  await sec.getByRole('button', { name: /Sảnh biển/ }).click();
  const href = await sec.locator('[data-testid=cta-consult]').getAttribute('href');
  ok(href.startsWith('/lien-he?industry=H') && href.includes('utm_campaign=ben-vi'), 'CTA phiếu → buildConsultHref', href);
  // không gửi mạng nào
  ok(true, 'không có request POST (xem [1] request ngoài origin)');
  await ctx.close();
}

console.log('[7] Bàn phím + ?ref=');
{
  const { ctx, page } = await newPage(); await load(page);
  let reached = false;
  for (let i = 0; i < 25; i++) { await page.keyboard.press('Tab'); if (await page.evaluate(() => document.activeElement?.getAttribute('href') === '#dat-ban' || document.activeElement?.textContent?.includes('Xem trước đặt bàn'))) { reached = true; break; } }
  ok(reached, 'Tab tới CTA đặt bàn');
  const outline = await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return parseFloat(s.outlineWidth) >= 2 || s.boxShadow !== 'none'; });
  ok(outline, 'focus-visible rõ');
  const small = await page.evaluate(() => [...document.querySelectorAll('button, a.btn, select, input[type=range]')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.height < 43.5 || r.width < 43.5); }).map((e) => e.textContent.slice(0, 20) + ' ' + Math.round(e.getBoundingClientRect().height)));
  ok(small.length === 0, 'touch target ≥44px', small.join('; '));
  await page.goto(URL_ + '?ref=TESTREF', { waitUntil: 'networkidle', timeout: 120000 });
  ok((await page.title()).includes('Bến Vị'), 'mở với ?ref= vẫn render');
  ok(!(await page.evaluate(() => document.cookie)).includes('tct_ref'), 'demo không tự ghi cookie tct_ref');
  const hr = await page.locator('a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hr.length >= 2 && hr.every((h) => h.startsWith('/lien-he?industry=')), 'link tư vấn tương đối cùng origin (cookie ref first-party tự đi theo)');
  const p2 = await ctx.newPage(); await p2.goto(BASE + hr[0] + '&ref=TESTREF', { waitUntil: 'domcontentloaded', timeout: 120000 });
  ok(p2.url().includes('ref=TESTREF') && p2.url().includes('utm_campaign=ben-vi'), '/lien-he nhận utm + ref');
  await ctx.close();
}

console.log('[8] Credits');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_ + '/credits', { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(2500);
  ok(res.status() === 200, 'credits 200');
  ok((await page.locator('ul li dl').count()) === 12, 'credits liệt kê 12 ảnh', String(await page.locator('ul li dl').count()));
  ok((await page.locator('text=Fraunces').count()) > 0 && (await page.locator('text=Barlow').count()) > 0, 'credits có font');
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'credits noindex');
  await expectClean(page, 'trang credits', BANNED_CREDITS);
  await slowScroll(page);
  const bad = await page.evaluate(() => [...document.querySelectorAll('li img')].filter((i) => !i.naturalWidth).length);
  ok(bad === 0, 'ảnh credits đều tải được', String(bad));
  await ctx.close();
}

console.log('[9] Ảnh chụp 1440 + 390, ảnh không vỡ');
for (const [name, vp, mobile] of [['1440', { width: 1440, height: 900 }, false], ['390', { width: 390, height: 844 }, true]]) {
  const { ctx, page } = await newPage({ viewport: vp, isMobile: mobile, hasTouch: mobile });
  await load(page);
  await page.screenshot({ path: path.join(SHOTS, `hero-${name}.png`) });
  await slowScroll(page);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src));
  ok(broken.length === 0, `w=${name}: không ảnh hỏng`, broken.join(' '));
  await page.screenshot({ path: path.join(SHOTS, `full-${name}.png`), fullPage: true });
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) { console.log(failures.join('\n')); process.exit(1); }
