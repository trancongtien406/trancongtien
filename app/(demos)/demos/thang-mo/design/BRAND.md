# BRAND, Tháng Mơ (LP-09, ảnh cưới)

Trạng thái: **NEEDS_OWNER_REVIEW**. Thương hiệu, logo, gói, giá, quy trình do Trần Công Tiến sáng tác (xem trang Ảnh & ghi công). Không có hồ sơ doanh nghiệp thật; không địa chỉ/SĐT/email thật (chỉ `xinchao@thangmo.example`).

- Tên: Tháng Mơ Wedding Studio; wordmark "tháng mơ"; descriptor WEDDING PHOTOGRAPHY. Ý nghĩa: tháng = một chương thời gian, mơ = mong ước và ký ức. Slogan: "Giữ lại một ngày, nhớ cả một đời."
- Logo (`public/images/demos/thang-mo/identity/`): `logo-primary.svg` (320x200), `logo-horizontal.svg` (320x110), `symbol.svg` (64), `logo-mono.svg` (#24211F), `logo-reversed.svg` (nền cocoa), kèm `logo-horizontal-mono/reversed.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.webp` 1200x630 (có chip "Ảnh minh hoạ" và dòng Demo). Chữ đã chuyển thành path (opentype.js từ woff tĩnh), không script, không href/font ngoài. Dựng bằng `tests/showroom/thang-mo/build-identity.cjs` + `og.mjs`. Đã xem `screenshots/logo-sheet.png` (symbol 200/32/16, mono, reversed). Lưu ý tự nhận xét: khung + hai vòng tròn có thể gợi hình máy ảnh dù đặc tả muốn tránh; cần chủ duyệt.
- Palette: paper #F5F0E8 (60%), linen #E8DED1 (20%), cocoa #4E302A (10%), rose #A47B67 (trang trí), olive #78806E (trang trí), ink #302B27 (chữ), muted #675A50 (chữ phụ), accent chữ nhỏ #7D5443, photo #FFFDF8, line #CFC3B5.
- Font: Playfair Display biến thiên (thường + nghiêng, caption kiểu ghi chú tay) + **Josefin Sans** biến thiên (body). Jost của đặc tả bị thay vì không có glyph tiếng Việt. Cả hai OFL, subset vietnamese/latin/latin-ext, file woff2 trong `fonts/`.
- Tra cứu tên: **chưa tra được** Google/Maps/Facebook/Zalo/WIPO/Cục SHTT từ máy này. "Tháng Mơ" là cụm từ thông dụng trong tiếng Việt, rất có khả năng đã có doanh nghiệp/trang dùng tên tương tự. Cần chủ tự tra trước khi công khai.

## Chính sách nhãn (2026-11-25, AGENT-RULES mục 11)
Không còn chữ Demo/minh hoạ/giả định trong trang, meta, aria, alt, og-image (đã dựng lại bằng tests/showroom/thang-mo/og.mjs). Giá ghi "Giá tham khảo"; album/ảnh dùng chữ trung tính theo phong cách; nút tư vấn dẫn tới buildConsultHref. Credits giữ lời công khai trung thực. `meta.ts` có sẵn cho registry.
