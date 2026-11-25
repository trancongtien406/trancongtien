# BRAND — Miên An Wellness (LP-01, /demos/mien-an)

Trạng thái tên thương hiệu: **NEEDS_OWNER_REVIEW**. Tên và thương hiệu do Trần Công Tiến thiết kế; chưa có doanh nghiệp thật đứng sau.

## Tên & định vị
- Tên: Miên An Wellness (hiển thị ngắn: MIÊN AN). Miên = liên tục, mềm; An = an yên. Slogan: "Chậm lại, để trở về với mình." / "Một khoảng lặng dành riêng cho bạn."
- Boutique wellness trung–cao cấp; giọng dịu, không thúc ép, không cam kết điều trị y khoa. Giá luôn là "giá tham khảo".

## Tra cứu tên (2026-11-24, chỉ bằng WebSearch)
- Tìm "Miên An" spa wellness Việt Nam và "Mien An Wellness" spa: KHÔNG thấy doanh nghiệp tên đúng "Miên An Wellness".
- **Có tên gần giống**: chuỗi "An Miên Spa" (gội đầu thảo dược và massage, đăng trên Klook, có chi nhánh ở TP.HCM). Chỉ là đảo thứ tự hai chữ; có nguy cơ nhầm lẫn nếu dùng thật. Ngoài ra "Tĩnh Spa" (Hoiana) tồn tại, tránh dùng "Tĩnh" làm tên thương hiệu (demo chỉ dùng "Tĩnh Tâm" cho tên liệu trình).
- KHÔNG tra được (máy không truy cập/không xác nhận): Google Maps, Facebook, Zalo, Cục Sở hữu trí tuệ (WIPO Global Brand DB / IP Viet Nam), tên miền. Chủ phải tự kiểm trước khi công khai hoặc dùng cho khách thật.

## Logo (tự vẽ, SVG, không script/href/font ngoài)
Biểu tượng: khung vòm kiến trúc + mầm lá mở + đường nền (viewBox 100x100, nét 1.6, round cap/join; toạ độ theo đặc tả: chân vòm (18,80)/(82,80), đỉnh (50,10), lá từ (50,76) tới (28,39), mầm (50,57)->(50,26), nền (31,87)-(69,87)). Wordmark "MIÊN AN" (Cormorant Garamond 500, tracking 0.14em) và "WELLNESS" (Be Vietnam Pro 400, tracking 0.32em) đã chuyển thành path từ font thật (opentype.js), nên không phụ thuộc font khi hiển thị.
Tệp trong `public/images/demos/mien-an/identity/`: logo-primary, logo-horizontal, logo-horizontal-reversed, symbol, logo-mono, logo-reversed, favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.webp (1200x630, nhãn minh hoạ). Favicon bỏ mầm giữa + đường nền, nét 4 để rõ ở 16px.

## Palette (tiền tố --ma-)
Ivory #F3EFE6 nền chính 45% · Linen #E6DCCD nền phụ 22% · Soft Olive #485346 CTA/section tối 15% · Sand #C6B59E chất liệu 8% · Bronze #8D765E đường nét 5% (chỉ chữ lớn/đường kẻ) · Forest #292D26 chữ 5%. Chữ phụ #6B6255 (5.2:1 trên ivory). Lỗi #9B3833, thành công #356345.

## Font (tự host, OFL, subset latin + latin-ext + vietnamese)
Cormorant Garamond 400/500 + italic 400/500 (tiêu đề), Be Vietnam Pro 400/500/600 (nội dung). woff2 trong `fonts/`, khai báo bằng @font-face trong `brand.module.css` (family "MA Cormorant", "MA Be Vietnam") kèm unicode-range. Lý do không dùng next/font/local: một file cho mỗi weight không biểu diễn được unicode-range của 3 subset.

## Chính sách nhãn (AGENT-RULES mục 11, 2026-11-25)
Trang đọc như website thật: không còn chữ "Demo", "minh hoạ", "giả định", "mô phỏng" trong giao diện, meta, aria-label, alt, tooltip, lỗi, dialog, nội dung công cụ, data và og-image (đã tạo lại bản sạch). Giá ghi "Giá tham khảo". Ranh giới trung thực vẫn giữ: không lời chứng thực/sao/số liệu khách/giải thưởng/chứng nhận, liên hệ dùng `.example`, không JSON-LD Review/LocalBusiness/Offer, trang `noindex`, công cụ không khẳng định đã đặt/gửi thành công (nút cuối dẫn tới `buildConsultHref`). Lời công khai trung thực nằm ở trang `/credits` và dòng ký tên "Website do Trần Công Tiến thiết kế" ở footer. Có `meta.ts` cho registry.
