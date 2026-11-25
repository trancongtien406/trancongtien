# BRAND — Hiên Mặn Villa (LP-02)

Trạng thái: **NEEDS_OWNER_REVIEW**. Tên và thương hiệu do Trần Công Tiến thiết kế; chưa có cơ sở lưu trú thật đứng sau.

## Tên và ý nghĩa
- **Hiên Mặn Villa**, hiển thị HIÊN MẶN. Hiên: khoảng giao giữa trong và ngoài nhà, nơi ngồi nghỉ đón gió. Mặn: vị muối của biển, của không khí ven bờ.
- Slogan: *Ở lại cùng nhịp biển.* Headline hero: *Chậm lại, nghe biển thở.* Closing: *Để biển giữ hộ những bộn bề.*
- Khu vực: ven biển bán đảo Sơn Trà, Đà Nẵng (chỉ ghi khu vực chung, không địa chỉ).
- Giọng văn: câu ngắn, giàu ánh sáng/chất liệu, như tạp chí kiến trúc pha nhật ký nghỉ dưỡng. Tránh "thiên đường nghỉ dưỡng", "đẳng cấp", "giá tốt nhất", khan hiếm giả tạo.

## Logo (SVG tự vẽ, chữ đã chuyển thành path từ Lora/Manrope bằng fontTools)
Ý tưởng: mái hiên + hai cột + mặt trời + hai đường sóng. Symbol viewBox `0 0 72 88`: mái `M8 33 L36 14 L64 33`, cột `M16 33 V60`/`M56 33 V60`, mặt trời `circle 36,44 r8`, sóng `M8 67 Q22 59 36 67 T64 67` và `M8 76 Q22 68 36 76 T64 76`. Nét 3, bo tròn, không gradient.
File trong `public/images/demos/hien-man/identity/`: `logo-primary.svg` (300×180), `logo-horizontal.svg` (360×96), `symbol.svg`, `logo-mono.svg`, `logo-reversed.svg`, `logo-horizontal-reversed.svg`, `logo-horizontal-mono.svg`, `symbol-reversed.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.webp` (1200×630, có nhãn "Demo · thương hiệu minh hoạ").
Wordmark: Lora 500, tracking 0.12em; VILLA: Manrope 600, tracking 0.32em. Đã kiểm ảnh ở 16/32/200px, bản mono, bản đảo màu (xem QA.md).

## Palette
| Vai trò | Hex |
|---|---|
| Ocean Deep (nav, CTA, nền tối) | #173E49 |
| Deeper (footer, nền cảnh) | #0F2A31 |
| Warm Ivory (nền chính) | #FAF8F4 |
| Natural Sand (booking, phụ) | #F2E9DA |
| Sea Mist (lịch & giá) | #DCE7E4 |
| Deep Ink (chữ) | #172E34 |
| Text secondary | #486068 (5.6:1 trên Sand) |
| Driftwood (chi tiết, không dùng cho chữ nhỏ) | #96765B |
| Sun (mặt trời, vạch "sắp kín", ngày lễ) | #C98B5A; bản sáng #E8B184 cho chữ trên nền tối |
| Lỗi / còn phòng / focus | #A43D35 / #2E6554 / #216C91 |

## Font
Lora (heading, 400–700, có italic) + Manrope (body, 200–800). woff2 từ `@fontsource-variable/*` (OFL), subset vietnamese + latin + latin-ext, nằm trong `fonts/`. `next/font/local`, `adjustFontFallback:false`, vietnamese xếp trước latin.

## Tra cứu tên (sơ bộ, máy làm)
- Google `"Hiên Mặn" villa Đà Nẵng` (2026-11-25): không thấy cơ sở lưu trú trùng tên; chỉ ra một bài Facebook không liên quan (món ăn "hiên mặn" ở Mũi Né).
- **Chưa kiểm được**: Google Maps, Facebook Pages, Zalo, Booking/Agoda, WIPO Global Brand DB, Cục Sở hữu trí tuệ. Chủ cần tự tra trước khi dùng công khai.

## Chính sách nhãn (AGENT-RULES mục 11, 2026-11-25)
Trang đọc như website thật: không còn chữ "Demo", "minh hoạ", "giả định", "mô phỏng" trong giao diện, meta, aria-label, alt, tooltip, lỗi, dialog, nội dung công cụ, data và og-image (đã tạo lại bản sạch). Giá ghi "Giá tham khảo". Ranh giới trung thực vẫn giữ: không lời chứng thực/sao/số liệu khách/giải thưởng/chứng nhận, liên hệ dùng `.example`, không JSON-LD Review/LocalBusiness/Offer, trang `noindex`, công cụ không khẳng định đã đặt/gửi thành công (nút cuối dẫn tới `buildConsultHref`). Lời công khai trung thực nằm ở trang `/credits` và dòng ký tên "Website do Trần Công Tiến thiết kế" ở footer. Có `meta.ts` cho registry.
