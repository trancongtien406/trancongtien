# BRAND: Rong Dặm (LP-03, tour trải nghiệm Đà Nẵng, Hội An, Bà Nà)

Trạng thái: **NEEDS_OWNER_REVIEW**. Thương hiệu, logo, tour, giá do Trần Công Tiến thiết kế; giá chỉ là giá tham khảo, chưa có đơn vị vận hành thật.

## Tên và ý nghĩa
- **Rong Dặm** (viết thường trong wordmark: `rong dặm.`; EN: Rong Dam). "Rong" = đi lang thang không vội; "dặm" = đơn vị đường đi. Ý: đi chậm, đi từng dặm.
- Slogan chính: **Đi một dặm. Thêm một chuyện.** / A little further. A little more to tell.
- Slogan phụ: Miền Trung, đi cho thật gần. · Đi chậm một chút, thấy nhiều hơn. · Chuyến đi hợp gu, kỷ niệm hợp lòng.
- Giọng: người bạn địa phương am hiểu, gợi ý không chèo kéo, vui nhưng minh bạch. Tránh: "số 1", "giá rẻ nhất", "100% hài lòng", "độc quyền".

## Logo (SVG tự vẽ, trong `public/images/demos/rong-dam/identity/`)
- Ý tưởng "The Wandering Trail": đường đi uốn lượn (stroke 9, nét tròn) + mặt trời vàng + ngôi sao định hướng 8 đỉnh. Không dùng máy bay, vali, địa cầu, ghim định vị.
- symbol viewBox 0 0 100 110; primary 0 0 320 230; horizontal 0 0 320 90; favicon 0 0 32 32 (nền forest, bỏ sao).
- Wordmark dựng từ glyph thật của Bricolage Grotesque 800, tracking -0.065em, **chuyển thành path** (script fontTools, không dùng `<text>`), nên không phụ thuộc font ngoài. Chữ "ặ" lấy glyph dựng sẵn từ subset vietnamese.
- File: `logo-primary.svg`, `logo-horizontal.svg`, `logo-horizontal-reversed.svg`, `symbol.svg`, `logo-mono.svg`, `logo-reversed.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.webp` (1200×630, có nhãn "DEMO · THƯƠNG HIỆU MINH HOẠ").
- Đã kiểm bằng ảnh chụp: symbol 16/32/200px, bản mono, bản đảo màu (xem `tests/showroom/rong-dam/screenshots/logo-sheet.png`). Ở 16px ngôi sao nhỏ mờ, favicon dùng bản không sao.

## Palette (đạt AA cho các cặp dùng với chữ)
| Token | Hex | Vai trò |
|---|---|---|
| --rd-paper | #F5F0E3 | nền giấy chủ đạo (~52%) |
| --rd-forest | #24392D | chữ, nút, footer (~20%) |
| --rd-yellow | #F2B84B | nhãn dán, highlight, section Trip Finder (~10%) |
| --rd-red | #B83E2B | CTA phụ, dấu bưu điện, dòng nhấn (~7%); chữ trắng trên đỏ đạt AA |
| --rd-blue | #B9D9DF | nền bản đồ/Explorer (~7%) |
| --rd-white | #FFFDF7 | form, vé giấy, polaroid |
| --rd-muted | #4D5C48 | chữ phụ trên paper (tương phản ~6:1) |
Không dùng chữ trắng trên vàng/xanh dương, không dùng chữ đỏ trên forest.

## Font
- Heading: **Bricolage Grotesque** (variable wght 200-800, OFL), dùng 700-800, tracking -0.04em, line-height 1.1.
- Body: **Lexend** (variable, OFL) thay cho DM Sans.
  - Lý do: DM Sans (Google Fonts/Fontsource) **không có subset vietnamese**; chữ ă, ế, ộ, ữ... sẽ rơi về font hệ thống và tách dấu. Lexend là sans hình học thân thiện, dễ đọc, có đủ Vietnamese, không trùng cặp font của demo khác (Mien An dùng Be Vietnam Pro, Rót Nhiệt dùng Space Grotesk, Khối Nếp dùng IBM Plex).
- `next/font/local`, subset vietnamese đặt TRƯỚC latin, `adjustFontFallback:false`. e2e đo glyph Ắ…Ự thật.

## Tra cứu tên (sơ bộ, máy)
- WebSearch "Rong Dặm tour du lịch Đà Nẵng" và "Rong Dặm travel/du lịch nhãn hiệu/công ty": **không thấy** công ty/nhãn hiệu trùng tên. Chỉ thấy tên gần giống "Rồng Việt" (công ty du lịch khác).
- **Máy KHÔNG xác nhận được**: Google Maps, Facebook, Zalo, tra cứu nhãn hiệu WIPO/Cục SHTT (cần truy cập cổng chính thức), đăng ký kinh doanh. Chủ phải tự kiểm trước khi dùng công khai.
- Ngày kiểm: 2026-11-25.

## Chính sách nhãn (AGENT-RULES mục 11, 2026-11-25)
Trang đọc như website thật: không còn chữ "Demo", "minh hoạ", "giả định", "mô phỏng" trong giao diện, meta, aria-label, alt, tooltip, lỗi, dialog, nội dung công cụ, data và og-image (đã tạo lại bản sạch). Giá ghi "Giá tham khảo". Ranh giới trung thực vẫn giữ: không lời chứng thực/sao/số liệu khách/giải thưởng/chứng nhận, liên hệ dùng `.example`, không JSON-LD Review/LocalBusiness/Offer, trang `noindex`, công cụ không khẳng định đã đặt/gửi thành công (nút cuối dẫn tới `buildConsultHref`). Lời công khai trung thực nằm ở trang `/credits` và dòng ký tên "Website do Trần Công Tiến thiết kế" ở footer. Có `meta.ts` cho registry.
