// Dựng bộ nhận diện Tháng Mơ: chữ chuyển thành path (opentype.js đọc woff tĩnh của @fontsource, cài trong thư mục tạm).
// Chạy: node tests/showroom/thang-mo/build-identity.cjs
const SC = '/private/tmp/claude-501/-Users-mac-mern-personal-portfolio/43ec291b-805a-4b66-af43-6e995bffd108/scratchpad/f';
const opentype = require(SC + '/ot/node_modules/opentype.js');
const fs = require('fs');
const OUT = '/Users/mac/mern/personal/trancongtien/public/images/demos/thang-mo/identity/';
fs.mkdirSync(OUT, { recursive: true });
const load = (p) => { const b = fs.readFileSync(p); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const PF = SC + '/x-fontsource-playfair-display-5.3.0.tgz/package/files/playfair-display-';
const JS = SC + '/ot/node_modules/@fontsource/josefin-sans/files/josefin-sans-';
const pf = [load(PF + 'latin-500-normal.woff'), load(PF + 'vietnamese-500-normal.woff')];
const js = [load(JS + 'latin-400-normal.woff'), load(JS + 'vietnamese-400-normal.woff')];

function textPath(fonts, text, size, tracking) {
  // trả về {d, width}; tracking tính theo em
  let x = 0, d = '';
  for (const ch of text.normalize('NFC')) {
    if (ch === ' ') { x += fonts[0].charToGlyph(' ').advanceWidth * size / fonts[0].unitsPerEm + size * 0.12 + tracking * size; continue; }
    const f = fonts.find((ff) => ff.charToGlyph(ch).index > 0);
    if (!f) throw new Error('thiếu glyph ' + ch);
    const g = f.charToGlyph(ch);
    d += g.getPath(x, 0, size).toPathData(2);
    x += g.advanceWidth * size / f.unitsPerEm + tracking * size;
  }
  return { d, width: x - tracking * size };
}
const place = (p, x, y) => `<path transform="translate(${x.toFixed(2)} ${y})" d="${p.d}"/>`;

const symbolInner = (sw) => `<path d="M42 7H12Q7 7 7 12V51Q7 56 12 56H51Q56 56 56 51V22" fill="none" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="32" r="12" fill="none" stroke-width="${sw}"/><circle cx="38" cy="32" r="12" fill="none" stroke-width="${sw}"/><path d="M56 2Q56.8 6.2 61 7Q56.8 7.8 56 12Q55.2 7.8 51 7Q55.2 6.2 56 2Z" stroke="none"/>`;
const word = textPath(pf, 'tháng mơ', 49, -0.04);
const wordH = textPath(pf, 'tháng mơ', 42, -0.04);
const desc = textPath(js, 'WEDDING PHOTOGRAPHY', 8.4, 0.4);
const descH = textPath(js, 'WEDDING PHOTOGRAPHY', 8.4, 0.4);

function svg(w, h, color, body, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Tháng Mơ Wedding Studio">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}<g fill="${color}" stroke="${color}">${body}</g></svg>\n`;
}
const primary = () => `<g transform="translate(128 20)">${symbolInner(1.5)}</g><g stroke="none">${place(word, 160 - word.width / 2, 132)}${place(desc, 160 - desc.width / 2, 164)}</g>`;
const horiz = () => `<g transform="translate(13 23)">${symbolInner(1.5)}</g><g stroke="none">${place(wordH, 95, 62)}${place(descH, 96, 86)}</g>`;
const W = '#F5F0E8', C = '#4E302A', M = '#24211F';
const files = {
  'logo-primary.svg': svg(320, 200, C, primary()),
  'logo-horizontal.svg': svg(320, 110, C, horiz()),
  'logo-mono.svg': svg(320, 200, M, primary()),
  'logo-horizontal-mono.svg': svg(320, 110, M, horiz()),
  'logo-reversed.svg': svg(320, 200, W, primary(), C),
  'logo-horizontal-reversed.svg': svg(320, 110, W, horiz(), C),
  'symbol.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Tháng Mơ"><g fill="${C}" stroke="${C}">${symbolInner(1.5)}</g></svg>\n`,
  'favicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><rect width="64" height="64" rx="12" fill="#F5F0E8"/><g transform="translate(32 32) scale(1.1) translate(-32 -32)" fill="${C}" stroke="${C}">${symbolInner(2.5)}</g></svg>\n`,
};
for (const [n, s] of Object.entries(files)) fs.writeFileSync(OUT + n, s);
console.log('ok', Object.keys(files).join(' '), word.width.toFixed(1), desc.width.toFixed(1));
