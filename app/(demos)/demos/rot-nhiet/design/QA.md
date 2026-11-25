# QA - Rót Nhiệt Coffee (kết quả chạy THẬT)

Lệnh: `node tests/showroom/rot-nhiet/e2e.mjs` (Playwright từ hancitywebsite/node_modules + Google Chrome headless, dev server chung `http://localhost:3100`).
Lần chạy cuối: **82 pass, 0 fail**.

Đã kiểm: HTTP 200, 0 lỗi console, 0 request ra ngoài origin, title/noindex/favicon riêng, 1 h1, 18 món; không tràn ngang 320/390/768/1024/1440; font Anybody + Space Grotesk loaded, đủ glyph Việt, dấu chồng Ế/Ỗ/Ấ/Ầ/Ố/Ự/Ệ vẽ đúng (canvas); reduced-motion hiện đủ nội dung, motion bật không kẹt ẩn, hero do GSAP đưa về opacity 1; menu lọc AND, trạng thái rỗng, thêm khay (119.000 ₫), tăng/giảm, Escape đóng + trả focus, localStorage giữ/khôi phục, JSON hỏng, ID lạ, kẹp 9 ly, làm trống có xác nhận, hoàn tất không tạo đơn; Selector lỗi chưa chọn, Enter, quay lại, 2 nhánh kết quả, thêm vào khay; FAQ 8 câu mở 1; Tab tới CTA trong 11 lần, outline focus; link tư vấn industry=Cafe/solution=fnb/utm; credits 12 ảnh; mobile hamburger, target >=44px.
Ảnh chụp: `tests/showroom/rot-nhiet/screenshots/` (hero-1440/768/1024/390, full-1440, full-390-0..3, tray-1440/390, selector-result-1440). Đã xem và sửa: Ế/Ỗ sai dấu (nguyên nhân thứ tự font stack), hero kẹt ẩn do GSAP `from`, crop ảnh menu xấu, kết quả Selector giãn dòng, hero quá cao.

## Chưa kiểm / hạn chế
- Cookie `tct_ref` thật: proxy chỉ đặt khi mã đối tác APPROVED trong DB, môi trường test không có; chỉ kiểm demo không ghi cookie và link tư vấn là đường dẫn cùng origin.
- `http://127.0.0.1:3100` không hydrate (thiếu allowedDevOrigins), phải dùng localhost; xem REQUESTS.md.
- Chưa kiểm production build/bundle size, chưa kiểm trên Safari/Firefox/thiết bị thật, chưa chạy axe, chưa đo Lighthouse.
- Sau lần chạy cuối còn sửa CSS nhỏ (khối 230°C mobile bị cắt, hero cao hơn) mà chưa chụp lại đầy đủ; full-page 390 chụp khi manifesto ở trạng thái mờ ban đầu do cuộn lại đầu trang (hiệu ứng scrub, không phải lỗi).
- ESLint: 0 lỗi, 1 cảnh báo (aria-invalid trên radio).
