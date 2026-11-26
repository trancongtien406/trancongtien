// E2E Rót Nhiệt (LP-04). Chạy: node tests/showroom/rot-nhiet/e2e.mjs  (dev server chung; dùng localhost:3100 vì 127.0.0.1 bị Next dev chặn HMR/hydration do thiếu allowedDevOrigins)
import { chromium } from '/Users/mac/mern/works/hancitywebsite/node_modules/playwright/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:3100';
const URL_ = `${BASE}/demos/rot-nhiet`;
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra = '') {
  if (cond) { pass++; console.log('  PASS', name); } else { fail++; failures.push(name + ' ' + extra); console.log('  FAIL', name, extra); }
}
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
  const page = await ctx.newPage();
  page.errors = []; page.external = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/webpack-hmr|WebSocket|Failed to load resource|MIME type|_clientMiddlewareManifest/.test(m.text())) page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => { const u = new URL(r.url()); if (!['http:', 'https:'].includes(u.protocol)) return; if (u.origin !== new URL(BASE).origin) page.external.push(r.url()); });
  return { ctx, page };
}
const load = async (page, url = URL_) => { await page.goto(url, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2200); };
async function slowScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 160)); }
    await new Promise((r) => setTimeout(r, 700)); window.scrollTo(0, 0);
    await Promise.race([Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }); })), new Promise((r) => setTimeout(r, 15000))]);
  });
  await page.waitForTimeout(700);
}

// ---------- 1. tải trang, console, request ngoài
console.log('[1] Tải trang, console, request ngoài origin');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_, { waitUntil: 'networkidle' });
  ok(res.status() === 200, 'HTTP 200', String(res.status()));
  await page.waitForTimeout(2000);
  ok(page.errors.length === 0, '0 lỗi console', page.errors.join(' | '));
  await expectClean(page, 'trang chủ sau khi tải');
  ok(page.external.length === 0, 'không request ra ngoài origin', page.external.join(' | '));
  const title = await page.title();
  ok(/Rót Nhiệt/.test(title), 'title riêng', title);
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'robots noindex');
  ok(await page.locator('link[rel=icon][href*="rot-nhiet/identity/favicon"]').count() > 0, 'favicon theo route');
  ok(await page.locator('h1').count() === 1, 'đúng 1 h1');
  ok((await page.locator('#menu article, #menu li[class*=card]').count()) === 18 || (await page.locator('#menu ul > li').count()) === 18, 'menu 18 món');
  await ctx.close();
}

// ---------- 2. tràn ngang
console.log('[2] Không tràn ngang 320/390/768/1024/1440');
for (const w of [320, 390, 768, 1024, 1440]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: 900 } });
  await load(page);
  const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(m.sw <= m.cw, `w=${w} scrollWidth<=clientWidth`, `${m.sw}>${m.cw}`);
  await ctx.close();
}

// ---------- 3. font tiếng Việt
console.log('[3] Font Việt render thật');
{
  const { ctx, page } = await newPage();
  await load(page);
  const r = await page.evaluate(async () => {
    const h1 = document.querySelector('h1');
    const dispStack = getComputedStyle(h1).fontFamily;
    const bodyStack = getComputedStyle(document.querySelector('main p')).fontFamily;
    const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
    const px = (stack, wt, ch) => { const c = document.createElement('canvas'); c.width = 80; c.height = 100; const x = c.getContext('2d'); x.font = `${wt} 60px ${stack}`; x.textBaseline = 'alphabetic'; x.fillText(ch, 8, 80); return x.getImageData(0, 0, 80, 100).data; };
    const diff = (a, b) => { let n = 0; for (let i = 3; i < a.length; i += 4) if ((a[i] > 128) !== (b[i] > 128)) n++; return n; };
    const ink = (a) => { let n = 0; for (let i = 3; i < a.length; i += 4) if (a[i] > 128) n++; return n; };
    const lower = 'ăâêôơưđ', upper = 'ĂÂÊÔƠƯĐ';
    const all = 'ẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ';
    const empty = [...(lower + upper + all)].filter((ch) => ink(px(dispStack, 900, ch)) < 30);
    const emptyBody = [...(lower + upper + all.toLowerCase())].filter((ch) => ink(px(bodyStack, 400, ch)) < 20);
    const pairs = [['Ế', 'Ê'], ['Ỗ', 'Ô'], ['Ấ', 'Â'], ['Ầ', 'Â'], ['Ố', 'Ô'], ['Ự', 'Ư'], ['Ệ', 'Ê']];
    const stacked = pairs.map(([a, b]) => diff(px(dispStack, 900, a), px(dispStack, 900, b)) > 40);
    const stackedBody = pairs.map(([a, b]) => diff(px(bodyStack, 400, a.toLowerCase()), px(bodyStack, 400, b.toLowerCase())) > 15);
    // glyph dựng sẵn vs rời: ký tự precomposed phải trùng với NFC (không bị tách)
    return { dispStack, bodyStack, faces, empty, emptyBody, stacked, stackedBody };
  });
  ok(r.faces.some((f) => /anybody/i.test(f)) && r.faces.some((f) => /grot/i.test(f)), 'face Anybody + Space Grotesk loaded', r.faces.join(','));
  ok(!/Impact|Arial/.test(r.dispStack.split(',').slice(0, 3).join('')), 'stack display bắt đầu bằng font riêng');
  ok(r.empty.length === 0, 'Anybody có glyph cho ă â ê ô ơ ư đ + Ắ…Ự (heading)', r.empty.join(''));
  ok(r.emptyBody.length === 0, 'Space Grotesk có glyph tiếng Việt (body)', r.emptyBody.join(''));
  ok(r.stacked.every(Boolean), 'Anybody vẽ đủ dấu chồng (Ế≠Ê, Ỗ≠Ô, Ấ≠Â, Ầ≠Â, Ố≠Ô, Ự≠Ư, Ệ≠Ê)', JSON.stringify(r.stacked));
  ok(r.stackedBody.every(Boolean), 'Space Grotesk vẽ đủ dấu chồng', JSON.stringify(r.stackedBody));
  await ctx.close();
}

// ---------- 4. reduced motion
console.log('[4] prefers-reduced-motion: nội dung hiện đủ');
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await load(page);
  await slowScroll(page);
  const r = await page.evaluate(() => {
    const op = (s) => [...document.querySelectorAll(s)].map((e) => +getComputedStyle(e).opacity);
    const tr = (s) => [...document.querySelectorAll(s)].map((e) => getComputedStyle(e).transform);
    return {
      meta: op('[data-rn=meta],[data-rn=sub],[data-rn=desc],[data-rn=cta],[data-rn=frame],[data-rn=specs]'), ch: op('.rn-ch'), reveal: op('[data-rn-reveal]'),
      chT: tr('.rn-ch'), track: getComputedStyle(document.querySelector('[data-fx=VelocityMarquee] [data-fx-track]')).transform,
      clip: [...document.querySelectorAll('[data-rn-reveal],[data-rn]')].filter((e) => getComputedStyle(e).clipPath !== 'none').length,
      grinder: getComputedStyle(document.querySelector('[data-testid=grinder]')).getPropertyValue('--p').trim(),
    };
  });
  ok(r.meta.every((o) => o === 1), 'hero hiện đủ', JSON.stringify(r.meta));
  ok(r.ch.every((o) => o === 1) && r.chT.every((t) => t === 'none'), 'chữ H1 không bị ẩn/dịch');
  ok(r.reveal.every((o) => o === 1) && r.clip === 0, 'các khối reveal hiện đủ, không bị cắt clip-path', String(r.clip));
  ok(r.track === 'none', 'dải thông tin (VelocityMarquee) không chuyển động');
  ok(r.grinder === '1', 'máy xay đứng ở trạng thái đầy khi reduced-motion', r.grinder);
  await ctx.close();
}
// và khi bật motion, sau khi cuộn mọi thứ cũng phải hiện (không kẹt opacity 0)
{
  const { ctx, page } = await newPage();
  await load(page);
  await slowScroll(page);
  const r = await page.evaluate(() => [...document.querySelectorAll('[data-rn-reveal],.rn-ch,[data-rn=cta]')].filter((e) => +getComputedStyle(e).opacity < 0.99).length);
  ok(r === 0, 'motion bật: không phần tử nào kẹt ẩn sau khi cuộn', String(r));
  const inline = await page.evaluate(() => [...document.querySelectorAll('[data-rn=meta],[data-rn=sub],[data-rn=desc],[data-rn=cta],[data-rn=frame],[data-rn=specs]')].map((e) => e.style.opacity));
  ok(inline.length === 6 && inline.every((o) => o === '1'), 'hero do GSAP đưa về opacity 1 (không dựa vào failsafe CSS)', JSON.stringify(inline));
  const clipped = await page.evaluate(() => [...document.querySelectorAll('[data-rn-reveal],[data-rn]')].filter((e) => getComputedStyle(e).clipPath !== 'none').length);
  ok(clipped === 0, 'sau khi cuộn không khối nào kẹt clip-path (rót xong hết)', String(clipped));
  await ctx.close();
}

// ---------- 5. Interactive Menu + khay
console.log('[5] Interactive Menu + Khay');
{
  const { ctx, page } = await newPage();
  await load(page);
  const count = async () => +(await page.locator('#menu [role=status] b').first().innerText());
  ok((await count()) === 18, 'mặc định 18 món');
  await page.getByRole('button', { name: 'Cold Brew', exact: true }).click();
  ok((await count()) === 2, 'lọc Cold Brew = 2 món', String(await count()));
  await page.getByRole('group', { name: 'Lọc theo gu của bạn' }).getByRole('button', { name: 'Đậm', exact: true }).click();
  ok((await count()) === 0, 'Cold Brew + Đậm = 0 (AND)');
  ok(await page.getByText('Chưa có ly nào hợp bộ lọc này.').isVisible(), 'trạng thái rỗng hiện đúng chữ');
  await expectClean(page, 'menu: trạng thái rỗng');
  await page.locator('#menu').getByRole('button', { name: 'Xóa bộ lọc' }).last().click();
  ok((await count()) === 18, 'Xóa bộ lọc về 18');
  // lọc nhiệt độ: Lạnh -> chỉ món có lạnh, nút thêm dùng lạnh
  await page.getByRole('group', { name: 'Lọc theo gu của bạn' }).getByRole('button', { name: 'Lạnh', exact: true }).click();
  const nCold = await count();
  ok(nCold > 0 && nCold < 18, 'lọc Lạnh ra tập con', String(nCold));
  await page.getByRole('group', { name: 'Lọc theo gu của bạn' }).getByRole('button', { name: 'Có sữa', exact: true }).click();
  const nMilk = await count();
  ok(nMilk > 0 && nMilk < nCold, 'Lạnh + Có sữa nhỏ hơn Lạnh', `${nMilk}<${nCold}`);
  await page.locator('#menu').getByRole('button', { name: 'Xóa bộ lọc' }).first().click();

  // thêm: Cà phê sữa lạnh x2, Latte nóng x1 => 119.000
  const card = (n) => page.locator('#menu li', { has: page.getByRole('heading', { name: n, exact: true }) });
  await card('Cà phê sữa').getByRole('button', { name: 'Lạnh', exact: true }).click();
  await card('Cà phê sữa').getByRole('button', { name: /Thêm Cà phê sữa lạnh vào khay/ }).click();
  await card('Cà phê sữa').getByRole('button', { name: /Thêm Cà phê sữa lạnh vào khay/ }).click();
  await card('Latte').getByRole('button', { name: /Thêm Latte nóng vào khay/ }).click();
  ok(await page.getByText('Đã thêm vào khay.').isVisible(), 'thông báo "Đã thêm vào khay."');
  const trayBtn = page.getByRole('button', { name: /^Khay/ });
  ok((await trayBtn.innerText()).replace(/\s/g, '').includes('3'), 'header đếm 3 ly');
  await trayBtn.click();
  const dlg = page.getByRole('dialog');
  ok(await dlg.isVisible(), 'drawer mở (dialog modal)');
  const txt = await dlg.innerText();
  ok(/119\.000/.test(txt), 'tạm tính 119.000 ₫', txt.replace(/\n/g, ' ').slice(0, 300));
  ok(/Cà phê sữa · Lạnh/.test(txt) && /Latte · Nóng/.test(txt), 'dòng khay đúng nhiệt độ');
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(SHOTS, 'tray-1440.png') });
  // tăng số lượng
  await dlg.getByRole('button', { name: 'Tăng Latte' }).click();
  ok(/168\.000/.test(await dlg.innerText()), 'tăng Latte -> 168.000');
  await dlg.getByRole('button', { name: 'Giảm Latte' }).click();
  // Escape đóng, trả focus
  await page.keyboard.press('Escape');
  ok(!(await dlg.isVisible()), 'Escape đóng drawer');
  ok(await trayBtn.evaluate((el) => el === document.activeElement), 'focus trả về nút Khay');
  // persistence
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(800);
  ok((await trayBtn.innerText()).replace(/\s/g, '').includes('3'), 'reload vẫn giữ 3 ly (localStorage)');
  // dữ liệu hỏng
  await page.evaluate(() => localStorage.setItem('rn:tray:v1', '{bad json'));
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  ok((await trayBtn.innerText()).replace(/\s/g, '').includes('0'), 'JSON hỏng -> khay rỗng không crash');
  await page.evaluate(() => localStorage.setItem('rn:tray:v1', JSON.stringify({ version: 1, items: [{ productId: 'M99', temperature: 'hot', quantity: 2 }, { productId: 'M01', temperature: 'cold', quantity: 2 }, { productId: 'M02', temperature: 'hot', quantity: 99 }] })));
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  ok((await trayBtn.innerText()).replace(/\s/g, '').includes('9'), 'ID lạ/nhiệt độ sai bị loại, số lượng kẹp 9');
  // giới hạn 9
  for (let i = 0; i < 2; i++) await card('Americano').getByRole('button', { name: /Thêm Americano nóng vào khay/ }).click();
  await page.waitForTimeout(100);
  ok(await page.getByText('Mỗi lựa chọn tối đa 9 ly.').isVisible(), 'chặn >9 ly mỗi dòng (hiện thông báo)');
  // làm trống có xác nhận + hoàn tất
  await trayBtn.click();
  await dlg.getByRole('button', { name: 'Làm trống khay' }).click();
  ok(await dlg.getByText('Bạn muốn làm trống toàn bộ khay?').isVisible(), 'xác nhận làm trống (không dùng confirm())');
  await expectClean(page, 'khay: có món + xác nhận làm trống');
  await dlg.getByRole('button', { name: 'Giữ lại' }).click();
  await dlg.getByRole('button', { name: 'Xem tóm tắt khay' }).click();
  ok(await dlg.getByText('Trang này chưa nhận đơn trực tuyến.').isVisible(), 'hoàn tất: tóm tắt khay, không khẳng định đã đặt');
  await expectClean(page, 'khay: tóm tắt');
  await page.keyboard.press('Escape');
  ok((await trayBtn.innerText()).replace(/\s/g, '').includes('0'), 'sau hoàn tất khay rỗng');
  await trayBtn.click();
  ok(await dlg.getByText('Khay của bạn đang chờ một chút nhiệt.').isVisible(), 'trạng thái khay trống');
  await expectClean(page, 'khay: trống');
  await page.keyboard.press('Escape');
  ok(page.errors.length === 0, 'không lỗi console khi dùng menu', page.errors.join('|'));
  await ctx.close();
}

// ---------- 6. Coffee Selector
console.log('[6] Coffee Selector');
{
  const { ctx, page } = await newPage();
  await load(page);
  const sel = page.locator('#tim-gu');
  await sel.getByRole('button', { name: 'Bắt đầu tìm gu' }).click();
  await sel.getByRole('button', { name: 'Câu tiếp theo →' }).click();
  ok(await sel.getByRole('alert').filter({ hasText: 'Chọn một đáp án' }).isVisible(), 'lỗi khi chưa chọn đáp án (role=alert)');
  ok(await sel.locator('input[aria-invalid=true]').count() > 0, 'aria-invalid trên lựa chọn');
  await expectClean(page, 'selector: lỗi chưa chọn');
  await sel.getByLabel(/Đậm đà, hậu đắng/).check();
  ok(await sel.getByRole('alert').count() === 0, 'lỗi biến mất sau khi chọn');
  await page.keyboard.press('Enter');
  ok(await sel.getByText('02 / 03').isVisible(), 'Enter trên radio sang câu 2');
  await sel.getByRole('button', { name: 'Quay lại' }).click();
  ok(await sel.getByLabel(/Đậm đà, hậu đắng/).isChecked(), 'quay lại giữ đáp án');
  await sel.getByRole('button', { name: 'Câu tiếp theo →' }).click();
  await sel.getByLabel(/Phin/).check();
  await sel.getByRole('button', { name: 'Câu tiếp theo →' }).click();
  await sel.getByLabel(/Ngọt dịu/).check();
  await sel.getByRole('button', { name: 'Xem gu của tôi' }).click();
  ok(await sel.getByRole('heading', { name: /Nhiệt Đậm/ }).isVisible(), 'đậm+phin+sữa đặc => Nhiệt Đậm');
  await expectClean(page, 'selector: kết quả');
  ok(await sel.getByText('Cà phê sữa', { exact: false }).first().isVisible(), 'gợi ý ly Cà phê sữa');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SHOTS, 'selector-result-1440.png') });
  await sel.getByRole('button', { name: 'Thêm vào khay' }).first().click();
  ok(await page.getByRole('dialog').isVisible(), 'thêm gợi ý vào khay mở drawer');
  await page.keyboard.press('Escape');
  await sel.getByRole('button', { name: 'Thử lại từ đầu' }).click();
  ok(await sel.getByRole('button', { name: 'Bắt đầu tìm gu' }).isVisible(), 'làm lại từ đầu');
  // nhánh Nhiệt Sáng
  await sel.getByRole('button', { name: 'Bắt đầu tìm gu' }).click();
  await sel.getByLabel(/Thanh nhẹ/).check(); await sel.getByRole('button', { name: 'Câu tiếp theo →' }).click();
  await sel.getByLabel(/Pour-over/).check(); await sel.getByRole('button', { name: 'Câu tiếp theo →' }).click();
  await sel.getByLabel(/Uống đen/).check(); await sel.getByRole('button', { name: 'Xem gu của tôi' }).click();
  ok(await sel.getByRole('heading', { name: /Nhiệt Sáng/ }).isVisible(), 'thanh+pour-over+đen => Nhiệt Sáng');
  await ctx.close();
}

// ---------- 7. FAQ, bàn phím, CTA, link thoát, ref
console.log('[7] FAQ, bàn phím, link thoát, ref');
{
  const { ctx, page } = await newPage();
  await load(page);
  const faq = page.locator('#faq details');
  ok((await faq.count()) === 8, 'FAQ 8 câu');
  ok((await page.locator('#faq details[open]').count()) === 0, 'FAQ mặc định đóng hết');
  await faq.nth(0).locator('summary').click(); await faq.nth(1).locator('summary').click();
  ok((await page.locator('#faq details[open]').count()) === 1, 'FAQ chỉ mở 1 câu cùng lúc');
  // Tab tới CTA hero
  await page.goto(URL_, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
  let hit = -1;
  for (let i = 1; i <= 25; i++) { await page.keyboard.press('Tab'); const t = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? ''); if (/Xem menu/i.test(t)) { hit = i; break; } }
  ok(hit > 0, `Tab tới CTA "Xem menu" trong ${hit} lần`);
  ok(await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2; }), 'focus-visible có outline rõ');
  // link thoát
  const hrefs = await page.locator('a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefs.length >= 2, 'có ≥2 link tư vấn', String(hrefs.length));
  const u = new URL(hrefs[0], BASE);
  ok(u.pathname === '/lien-he' && u.searchParams.get('industry') === 'Cafe' && u.searchParams.get('solution') === 'fnb' && u.searchParams.get('utm_campaign') === 'rot-nhiet' && u.searchParams.get('utm_source') === 'showroom', 'link tư vấn có industry/solution/utm', hrefs[0]);
  ok(await page.locator('a[href="/demos/rot-nhiet/credits"]').count() > 0, 'có link Credits ảnh');
  ok((await page.locator('text=Website do Trần Công Tiến thiết kế').count()) > 0, 'có dòng ký tên nhẹ');
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await page.goto(URL_ + '?ref=TESTREF', { waitUntil: 'networkidle' });
  // proxy.ts chỉ đặt tct_ref cho đối tác APPROVED trong DB (không có ở môi trường test) nên KHÔNG kiểm được cookie thật.
  // Ở đây kiểm phần demo chịu trách nhiệm: không tự đọc/ghi cookie, link thoát là đường dẫn cùng origin (cookie first-party tự đi theo).
  ok((await page.title()).includes('Rót Nhiệt'), 'mở với ?ref= vẫn render bình thường');
  ok(!(await page.evaluate(() => document.cookie)).includes('tct_ref'), 'demo không tự ghi cookie tct_ref');
  const hrefsRef = await page.locator('a[href^="/lien-he"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  ok(hrefsRef.length >= 2 && hrefsRef.every((h) => h.startsWith('/lien-he?industry=Cafe')), 'link tư vấn là đường dẫn tương đối cùng origin (giữ cookie ref first-party)', hrefsRef.join(' '));
  const p2 = await ctx.newPage(); await p2.goto(BASE + hrefsRef[0] + '&ref=TESTREF', { waitUntil: 'domcontentloaded' });
  ok(p2.url().includes('industry=Cafe') && p2.url().includes('ref=TESTREF'), '/lien-he nhận industry + ref');
  await ctx.close();
}

// ---------- 8. credits
console.log('[8] Trang credits');
{
  const { ctx, page } = await newPage();
  const res = await page.goto(URL_ + '/credits', { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(2500);
  ok(res.status() === 200, 'credits 200');
  ok((await page.locator('ul li dl').count()) === 12, 'credits liệt kê 12 ảnh', String(await page.locator('ul li dl').count()));
  ok((await page.locator('text=Anybody').count()) > 0 && (await page.locator('text=Space Grotesk').count()) > 0, 'credits có font');
  ok(await page.locator('meta[name=robots][content*=noindex]').count() > 0, 'credits noindex');
  await expectClean(page, 'trang credits', BANNED_CREDITS);
  await slowScroll(page);
  const bad = await page.evaluate(() => [...document.querySelectorAll('li img')].filter((i) => !i.naturalWidth).length);
  ok(bad === 0, 'ảnh credits đều tải được', String(bad));
  await ctx.close();
}

// ---------- 8b. Nội dung quán + hiệu ứng chữ ký
console.log('[8b] Nội dung quán thật + hiệu ứng chữ ký (độ rang, đồng hồ pha, máy xay, giờ mở cửa, bán buôn)');
{
  const { ctx, page } = await newPage();
  await load(page);
  const h1 = await page.locator('h1').innerText();
  ok(/rót nhiệt/i.test(h1) && /quán cà phê rang xay/i.test(h1) && /sơn trà/i.test(h1), 'h1 nêu loại hình + khu vực cấp quận', h1);
  const hero = await page.locator('section#top').innerText();
  ok(/Quận Sơn Trà/.test(hero) && /06:30–21:30/.test(hero) && /165\.000/.test(hero) && /29\.000/.test(hero), 'hero có khu vực, giờ mở, giá hạt, giá ly');
  ok(await page.locator('section#top [data-rn=specs] > div').count() === 3, 'hero có 3 sự thật cụ thể');
  ok(await page.locator('section#top a[href="#ban-buon"]').count() === 1 && await page.locator('section#top a[href="#hat-ca-phe"]').count() === 1, 'CTA đúng ngành: xem menu / mua hạt / bán buôn');
  const ids = await page.evaluate(() => ['menu', 'tim-gu', 'hat-ca-phe', 'do-rang', 'rang-pha', 'cach-pha', 'quan', 'cau-chuyen', 'ban-buon', 'faq'].filter((i) => !document.getElementById(i)));
  ok(ids.length === 0, '10 section của quán cà phê rang đều có mặt', ids.join(','));
  // nguồn gốc: không nhãn nông trại/chứng nhận
  const body = await page.locator('body').innerText();
  ok(!/(chứng nhận|certified|organic|rainforest|fair ?trade|specialty coffee association|SCA|điểm cupping|\d+ ?điểm)/i.test(body), 'không bịa chứng nhận / nhãn nông trại / điểm cupping');
  ok(!/(Review|AggregateRating|LocalBusiness)/.test(await page.content()), 'không có JSON-LD Review/Rating/LocalBusiness');
  // dải thông tin: VelocityMarquee chạy
  ok(await page.locator('[data-fx=VelocityMarquee][data-fx-ready]').count() === 1, 'VelocityMarquee khởi chạy');
  ok(await page.locator('[data-fx=MagneticButton]').count() >= 1, 'MagneticButton có ở CTA hero');
  ok(await page.locator('[data-fx=Odometer]').count() === 1 && await page.locator('[data-fx=ShineSweep]').count() === 3, 'Odometer + 3 ShineSweep');
  // độ rang: kéo thanh -> hạt đổi màu, nhiệt độ đổi, hạt gần nhất đổi
  const rng = page.locator('[data-testid=roast-range]');
  await rng.scrollIntoViewIfNeeded();
  const col0 = await page.locator('[data-testid=roast-bean]').evaluate((e) => getComputedStyle(e).getPropertyValue('--bean'));
  await rng.fill('0'); await page.waitForTimeout(500);
  const colL = await page.locator('[data-testid=roast-bean]').evaluate((e) => getComputedStyle(e).getPropertyValue('--bean'));
  ok(/nhiệt sáng/i.test(await page.locator('[data-testid=roast-match]').innerText()), 'rang sáng -> gợi ý Nhiệt Sáng');
  const tL = await page.locator('[data-fx=Odometer]').evaluate((e) => e.querySelector('span').textContent);
  await rng.fill('100'); await page.waitForTimeout(1200);
  const colD = await page.locator('[data-testid=roast-bean]').evaluate((e) => getComputedStyle(e).getPropertyValue('--bean'));
  const tD = await page.locator('[data-fx=Odometer]').evaluate((e) => e.querySelector('span').textContent);
  ok(/nhiệt đậm/i.test(await page.locator('[data-testid=roast-match]').innerText()), 'rang đậm -> gợi ý Nhiệt Đậm');
  ok(colL !== colD && colL !== col0 && tL === '196' && tD === '230', 'hạt đổi màu + nhiệt độ lăn số 196 -> 230', `${colL} ${colD} ${tL} ${tD}`);
  ok(await rng.getAttribute('aria-valuetext').then((v) => /Rang đậm/.test(v)), 'thanh kéo có aria-valuetext');
  await expectClean(page, 'độ rang');
  // đồng hồ pha: bắt đầu -> đếm thật
  const clk = () => page.locator('[data-testid=brew-clock]').innerText();
  await page.locator('[data-testid=brew-toggle]').scrollIntoViewIfNeeded();
  ok((await clk()) === '02:45', 'V60 mặc định 02:45', await clk());
  await page.locator('[data-testid=brew-toggle]').click();
  await page.waitForTimeout(2300);
  const c1 = await clk();
  ok(c1 !== '02:45' && /^02:4[0-3]$|^02:3\d$/.test(c1), 'đồng hồ pha chạy thật theo giây', c1);
  ok(/Ủ nở|Rót lượt/.test(await page.locator('[data-testid=brew-stage]').innerText()), 'hiển thị bước pha hiện tại');
  await page.locator('[data-testid=brew-toggle]').click();
  const cp = await clk(); await page.waitForTimeout(900);
  ok((await clk()) === cp, 'tạm dừng giữ nguyên thời gian', cp);
  await page.locator('[data-testid=brew-phin]').click();
  ok((await clk()) === '04:30', 'đổi sang phin: 04:30 và đặt lại', await clk());
  await page.locator('[data-testid=brew-reset]').click();
  // máy xay theo cuộn: --p tăng khi cuộn qua phần Từ hạt đến ly
  await page.evaluate(() => window.scrollTo(0, 0));
  const secTop = await page.evaluate(() => document.getElementById('rang-pha').getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 100), secTop); await page.waitForTimeout(400);
  const p0 = +(await page.locator('[data-testid=grinder]').evaluate((e) => e.style.getPropertyValue('--p')));
  await page.evaluate((y) => window.scrollTo(0, y + 700), secTop); await page.waitForTimeout(500);
  const p1 = +(await page.locator('[data-testid=grinder]').evaluate((e) => e.style.getPropertyValue('--p')));
  ok(p1 > p0 && p1 > 0.2, 'máy xay: tiến độ cuộn tăng (--p)', `${p0} -> ${p1}`);
  // quán + giờ mở cửa
  await page.locator('#quan').scrollIntoViewIfNeeded();
  const st = await page.locator('[data-testid=open-status]').innerText();
  ok(/Đang mở|Đã đóng|Chưa mở/.test(st), 'trạng thái mở/đóng theo giờ Việt Nam', st);
  ok(await page.locator('#quan tr[data-today="1"]').count() === 1, 'dòng hôm nay được tô');
  await page.locator('[data-zone=rang]').click();
  ok(/Máy rang/.test(await page.locator('[data-testid=plan-caption]').innerText()), 'chạm vùng Góc rang -> mô tả đổi');
  // đổi đồng hồ giả: thứ hai 07:00 -> đang mở, 23:00 -> đã đóng
  for (const [iso, re] of [['2026-11-23T00:00:00Z', /Đang mở/], ['2026-11-23T16:30:00Z', /Đã đóng/], ['2026-11-22T22:00:00Z', /Chưa mở/]]) {
    const c2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pg = await c2.newPage();
    await pg.clock.install({ time: new Date(iso) });
    await pg.goto(URL_, { waitUntil: 'networkidle' }); await pg.waitForTimeout(1200);
    const t2 = await pg.locator('[data-testid=open-status]').innerText();
    ok(re.test(t2), `giả lập giờ ${iso}: ${t2}`);
    await c2.close();
  }
  // bán buôn
  const ws = await page.locator('[data-testid=wholesale-table]').innerText();
  ok(/540\.000/.test(ws) && /640\.000/.test(ws) && /780\.000/.test(ws) && /5 kg/i.test(ws), 'bảng giá bán buôn theo kg');
  ok(await page.locator('#ban-buon a[href^="/lien-he"]').count() === 1, 'CTA bán buôn dẫn tới form tư vấn');
  await expectClean(page, 'toàn bộ trang sau khi dùng các công cụ');
  ok(page.errors.length === 0, '0 lỗi console khi dùng hiệu ứng chữ ký', page.errors.join('|'));
  await ctx.close();
}
// long task khi cuộn toàn trang
{
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, page } = await newPage({ viewport: { width: w, height: h } });
    await page.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ entryTypes: ['longtask'] }); } catch {} });
    await load(page);
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 240) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); } });
    const lt = await page.evaluate(() => window.__lt.filter((d) => d > 200));
    console.log(`  (đo) long task >200ms ở ${w}px: ${lt.length}`);
    ok(lt.length <= 3, `long task >200ms khi cuộn toàn trang ${w}px (cho phép <=3)`, JSON.stringify(lt));
    await ctx.close();
  }
}

// ---------- 9. mobile menu + ảnh chụp
console.log('[9] Mobile + ảnh chụp');
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await load(page);
  const burger = page.getByRole('button', { name: 'Mở điều hướng' });
  ok(await burger.isVisible(), 'mobile có nút hamburger');
  await burger.click();
  ok(await page.getByRole('navigation', { name: 'Điều hướng di động' }).getByRole('link', { name: 'Hạt cà phê' }).isVisible(), 'panel điều hướng mở');
  const minH = await page.evaluate(() => [...document.querySelectorAll('button, a.btn, nav a')].filter((e) => e.offsetParent && e.getBoundingClientRect().width > 0).map((e) => e.getBoundingClientRect().height).filter((h) => h < 44 - 0.5).length);
  ok(minH === 0, 'mọi nút/link nav ≥44px cao (mobile)', String(minH));
  await page.locator('button[aria-controls=rn-mobile-nav]').click();
  await page.screenshot({ path: path.join(SHOTS, 'hero-390.png') });
  await slowScroll(page);
  const hh = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i * 6000 < hh; i++) await page.screenshot({ path: path.join(SHOTS, `full-390-${i}.png`), fullPage: true, clip: { x: 0, y: i * 6000, width: 390, height: Math.min(6000, hh - i * 6000) } });
  await page.getByRole('button', { name: /^Khay/ }).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOTS, 'tray-390.png') });
  ok(page.errors.length === 0, 'mobile: 0 lỗi console', page.errors.join('|'));
  await ctx.close();
}
{
  const { ctx, page } = await newPage();
  await load(page);
  await page.screenshot({ path: path.join(SHOTS, 'hero-1440.png') });
  await slowScroll(page);
  await page.screenshot({ path: path.join(SHOTS, 'full-1440.png'), fullPage: true });
  await ctx.close();
}
for (const [w, h] of [[768, 1024], [1024, 768]]) {
  const { ctx, page } = await newPage({ viewport: { width: w, height: h } });
  await load(page); await page.screenshot({ path: path.join(SHOTS, `hero-${w}.png`) });
  await ctx.close();
}

await browser.close();
console.log(`\nKẾT QUẢ: ${pass} pass, ${fail} fail`);
if (fail) { console.log('Thất bại:\n - ' + failures.join('\n - ')); process.exit(1); }
