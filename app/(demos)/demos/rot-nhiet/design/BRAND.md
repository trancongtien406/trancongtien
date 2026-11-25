# BRAND - Rót Nhiệt Coffee (LP-04)

Trạng thái tên thương hiệu: **NEEDS_OWNER_REVIEW**. Thương hiệu, logo, menu, giá, hồ sơ hạt do Trần Công Tiến sáng tác; trang không dùng nhãn trong nội dung, lời công khai nằm ở trang credits và thanh nổi chung.

## Tên và ý nghĩa
- RÓT NHIỆT COFFEE (ngắn: RÓT NHIỆT; phụ: COFFEE ROASTERS). "Rót" = rót ly cà phê, mở cuộc trò chuyện; "Nhiệt" = nhiệt độ rang và sự nhiệt thành.
- Slogan: "Rang thật. Vị thật. Nhiệt thật." Hero: "RÓT NHIỆT. Đánh thức vị giác." Nhãn phụ tiếng Anh dùng như đồ hoạ: GOOD BEANS. GOOD HEAT.
- Giọng văn: xưng "Rót Nhiệt - bạn", câu ngắn, chủ động, nói về hương vị. Không tuyên bố kiểu "số một", không bịa đánh giá/chứng nhận/giải thưởng/địa chỉ/giờ mở cửa.

## Tra cứu tên (máy, 2026-11-24)
- Đã làm: WebSearch (cả có dấu và không dấu: "Rót Nhiệt" cà phê; "Rot Nhiet Coffee" / "Rót Nhiệt Coffee" roasters). Kết quả: KHÔNG có trang nào nhắc đến thương hiệu/quán tên này; chỉ ra các quán/roaster khác (refined., Coffee Sắt, The Running Bean, Lacàph, Donkey, Capella, 3C, RAAW...).
- KHÔNG xác nhận được (máy không truy cập/không đủ): Google Maps, Facebook, Zalo, Instagram, TikTok, WIPO Global Brand Database, cơ sở dữ liệu Cục Sở hữu trí tuệ (WIPO/NOIP cần người làm thủ công), tên miền. "Không thấy kết quả" không đồng nghĩa với "không trùng".
- Việc chủ cần làm trước khi dùng công khai: tra Maps/Facebook/Zalo/TikTok; tra nhãn hiệu nhóm 30, 35, 43 tại Cục SHTT và WIPO; cân nhắc đổi tên nếu trùng.

## Logo (SVG tự vẽ, `public/images/demos/rot-nhiet/identity/`)
- `symbol.svg` (viewBox 0 0 128 128): khung đỏ #E33C29 viền Ink 4, tách Paper viền Ink 5, quai Ink 7, tia nhiệt 7 đỉnh Ink, đường đế 93x5.
- `logo-primary.svg` (480x360) symbol xếp trên wordmark; `logo-horizontal.svg` (640x144); `logo-reversed.svg` (nền Ink, chữ Paper, tách đen); `logo-mono.svg` (không nền, nét Ink); `favicon.svg` (32x32 giản lược), `favicon-32.png`, `apple-touch-icon.png` (180, symbol trong vùng an toàn), `og-image.webp` (1200x630, có nhãn "DEMO · THƯƠNG HIỆU MINH HOẠ").
- Wordmark RÓT NHIỆT: Anybody 900, wdth 85, tracking -0.03em, đã chuyển thành path (không phụ thuộc font); descriptor COFFEE ROASTERS: Space Grotesk 700, tracking +0.18em, cũng là path. SVG không script, không href ngoài, không font ngoài.
- Kiểm bằng ảnh chụp thật (xem QA.md): symbol 16/32/64/200px, bản mono, bản đảo màu.

## Palette (token `--rn-*`, chỉ trong `.brand`)
| Token | Hex | Vai trò |
|---|---|---|
| paper | #F8F5ED | nền chính |
| heat | #E33C29 | poster, dải nhiệt, khối nhấn (chữ đỏ chỉ cho tiêu đề lớn) |
| ink | #1D1D1B | chữ, viền 3px, nền tối, nút chính |
| gray | #D8D3C8 | nền phụ, thanh card |
| error | #A82519 | lỗi/validation (6.55:1 trên Paper) |
| success | #23643C | (dự phòng) |
Tương phản: Ink/Paper 15.5:1; Ink/Heat 3.98:1 và Paper/Heat 3.9:1 chỉ dùng cho chữ lớn (>=24px đậm); mọi chữ nhỏ nằm trên Paper/Ink/Gray.

## Font (đủ glyph tiếng Việt, OFL, tự host qua `next/font/local`)
- Heading: **Anybody** (biến thiên wght 100-900, wdth 50-150), 3 file woff2 subset latin / latin-ext / vietnamese lấy từ `@fontsource-variable/anybody` (pack trong thư mục tạm, không cài vào repo). Dùng wght 900, wdth 82.
- Body: **Space Grotesk** (wght 300-700), 3 subset từ `@fontsource-variable/space-grotesk`.
- Kiểm coverage bằng fontTools: cả hai font có đủ 134 ký tự U+1EA0-1EF9 + ă â ê ô ơ ư đ (hoa/thường). Kiểm render thật bằng canvas trong e2e: Ế≠Ê, Ỗ≠Ô, Ấ≠Â, Ầ≠Â, Ố≠Ô, Ự≠Ư, Ệ≠Ê (dấu chồng được vẽ).
- **Bài học bắt buộc ghi lại**: lần đầu Anybody và Space Grotesk bị hiển thị SAI (Ế thành Ê, "dễ" thành "dê" + dấu ngã rời). Nguyên nhân không phải font mà là thứ tự stack: (1) `next/font/local` chèn font fallback (Arial) ngay sau subset latin, (2) Chrome tách ký tự dựng sẵn thành chữ + dấu rời khi font đầu stack thiếu glyph. Cách sửa đã áp dụng: đặt subset **vietnamese đứng trước latin** trong `font-family` (`var(--rn-fa-vi), var(--rn-fa-lat), var(--rn-fa-ext)`) và `adjustFontFallback:false`. Vì vậy KHÔNG cần đổi font; giữ cặp Anybody + Space Grotesk theo hướng đã chốt.
- Không trùng font của demo khác: Miên An (Cormorant Garamond/Be Vietnam Pro), Hiên Mặn (Lora/Manrope), Rong Dặm (Bricolage/DM Sans), Bến Vị (Fraunces/Barlow), Miền Cười (Plus Jakarta/Public Sans), Nếp Thở (Sora/Mulish), Khối Nếp (IBM Plex), Tháng Mơ (Playfair/Jost), Nét Lệch (Oswald/Archivo) - theo bảng LANDING_PLAN.

## Quy tắc ảnh
Ảnh cà phê thật cận cảnh, tông ấm tương phản mạnh, khung chữ nhật 0 radius, viền 3px Ink, tỉ lệ: hero 4:5, menu 4:3, hạt 4:3, bước quy trình 1:1, manifesto 4:5. Không grade nặng; không logo/mặt người nhận diện.

## Chính sách nhãn (2026-11-25, AGENT-RULES mục 11)
Trang landing và công cụ không còn các chữ "Demo", "minh hoạ", "giả định", "mô phỏng", "dữ liệu mẫu", chip "Ảnh minh hoạ". Giá ghi "giá tham khảo"; công cụ đặt tên theo chức năng. Vẫn giữ: không đánh giá/số liệu/chứng nhận giả, liên hệ `.example`, không khẳng định đã gửi/đặt, noindex. Trang credits ghi: "Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới." e2e có kiểm quét toàn bộ văn bản hiển thị. Có `meta.ts` cho registry.
