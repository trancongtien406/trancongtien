# QA — Miên An Wellness (kết quả chạy THẬT, 2026-11-24)

Lệnh: `node tests/showroom/mien-an/e2e.mjs` (Playwright + Google Chrome headless, dev server chung `http://localhost:3100`, Next 16.2.10 Turbopack dev). Kết quả: **107 pass, 0 fail** (`tests/showroom/mien-an/results.json`). Sau lần chạy cuối còn sửa 2 chỗ CSS nhỏ (màu tên gợi ý chính trong Finder, khoảng cách đoạn success); đã kiểm riêng màu bằng script, chưa chạy lại toàn bộ.
Ngoài ra: `tsc --noEmit` không lỗi ở file mien-an; `eslint app/(demos)/demos/mien-an` 0 error, 5 warning (aria-invalid trên input radio, giữ có chủ đích).

## Đã kiểm
- Trang 200, title/description/robots noindex,follow, lang vi, 1 h1, favicon route (svg/png/apple), og:image, JSON-LD chỉ WebPage (không Review/LocalBusiness/giá), skip link, ribbon thương hiệu.
- 9 tệp identity tải được; logo SVG không script/href/font/text. Ảnh: không ảnh hỏng, đều có alt. 0 lỗi console (đã lọc 3 loại nhiễu của dev server: WebSocket HMR, DevTools). Không request ra ngoài origin, không request ghi.
- Link thoát `/lien-he?industry=Spa&solution=spa&utm_source=showroom&utm_campaign=mien-an` (header-less: footer, tóm tắt, success CTA); mở với `?ref=` không bị trang đọc/ghi cookie `tct_ref`. Chưa kiểm được việc proxy đặt cookie vì `ref` thử không phải đối tác đã duyệt trong DB.
- Font: 6 kiểu có face khớp chữ Việt (Ắ…Ự ă â ê ô ơ ư đ), đo glyph khác fallback (Cormorant, Be Vietnam), subset vietnamese đã load, h1/body đúng family.
- Không tràn ngang ở 320/390/768/1024/1440; touch target >= 44px (trừ liên kết nằm trong câu/nav/skip).
- Reduced-motion: mọi khối opacity 1, GSAP không chạy. Tắt JS: h1, 6 thẻ, 8 câu FAQ vẫn có.
- Ritual Finder: lỗi thiếu mong muốn/thời gian (role=alert, aria-invalid), focus sang tiêu đề bước, 10 ca luật (RF-01..10 gồm rỗng và không nới lỏng điều kiện), chọn kết quả điền sẵn Appointment (nghi thức, áp lực, hương liệu).
- Appointment Preview: lỗi gửi trống + focus ô lỗi, ngày kín (offset 3) + nhãn "Kín", slot 30 phút và không quá 20:00, đổi nghi thức reset giờ, phòng không hỗ trợ bị vô hiệu, bắt buộc xác nhận demo, preview thành công (mã DEMO-MA-XXXXXXXX, giá, giờ), không dùng "đặt lịch thành công", CTA chính = buildConsultHref('mien-an') focus được bằng bàn phím, Chỉnh sửa giữ draft, Tạo mới reset, không có request ghi/localStorage.
- Dialog liệu trình (mở, Escape, trả focus, "Chọn nghi thức này"), lightbox (mũi tên, Escape, trả focus), menu mobile (Escape, trả focus, điều hướng), FAQ (một mục mở, Enter/Space), Tab tới skip link và CTA hero, focus-visible >= 2px. Credits: 200, noindex, 12 thẻ ảnh đủ nguồn, bảng font, credits.json đủ trường.
- Ảnh chụp (đã TỰ XEM, sửa 7 lỗi thấy được: nút primary chữ tối do specificity, thẻ success chiếm 1 cột, dialog lệch góc do Tailwind preflight reset margin, vùng Finder bị cuộn ngang do overflow hidden, ribbon link nhỏ, tên gợi ý chính trùng màu nền, chụp giữa lúc animation): `screenshots/hero-1440|390|320.png`, `full-1440|390.png`, `state-finder-result|empty-1440`, `state-booking-errors|full|filled|success-1440`, `state-booking-390`, `state-finder-390`, `state-dialog-1440`, `state-menu-390`, `credits-1440`.

## Chưa kiểm / hạn chế
- Chưa chạy production build, Lighthouse, đo bundle (dev server dùng chung không cho `next build`). Mục tiêu đặc tả (LCP, TBT, JS <= 100KB gzip) CHƯA có số.
- Chỉ Chrome headless; chưa thử Safari/Firefox/thiết bị thật; chưa kiểm screen reader; chưa kiểm 200% zoom bằng máy.
- Ảnh chụp fullPage mobile có sticky header lặp (đặc điểm của Playwright), thanh DemoNotice dùng chung chiếm khá nhiều chỗ ở 320–390px (file chung, không sửa).
- Tương phản mới tính theo bảng đặc tả, chưa chạy công cụ đo tự động. Dev server 127.0.0.1 không hydrate (xem REQUESTS.md).
- Câu trả lời FAQ và nội dung bổ sung do mình viết; phản hồi ChatGPT cho câu hỏi bổ sung không đọc được qua DOM.

## Chạy lại sau chính sách nhãn mới (2026-11-25)
- Kết quả: 115 pass, 0 fail (`node tests/showroom/mien-an/e2e.mjs`).
- Thêm kiểm tra quét ngược: văn bản (kể cả mục ẩn/FAQ), alt, aria-label, title, placeholder, meta title/description/og/twitter, JSON-LD không chứa "Demo", "minh hoạ", "giả định", "mô phỏng", "dữ liệu mẫu", "thương hiệu minh hoạ"... ở trang chủ, trạng thái lỗi/kết quả của công cụ, dialog, menu mobile và trang credits (credits còn lời công khai trung thực do Trần Công Tiến thiết kế, ảnh stock có ghi công). Phạm vi quét: wrapper `[data-site]` của thương hiệu, không gồm thanh nổi dùng chung của điều phối viên.
- Ảnh chụp 1440/390 đã chụp lại và xem; og-image tạo lại bản sạch (`tests/showroom/mien-an/og.mjs`).
- Chưa kiểm: thanh nổi dùng chung (file chung) còn do điều phối viên cập nhật.
