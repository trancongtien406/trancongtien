# Tịch Trà · QA (kết quả thật)

Lệnh: `BASE=http://localhost:3100 node tests/showroom/tra-thi/e2e.mjs` (Playwright + Chrome headless). Lần chạy cuối: **86 pass, 0 fail**.
Phủ: tải 200, title/meta/favicon/skip link/1 h1; 0 lỗi console và 0 request ngoài origin (desktop, mobile, reduced, credits); không tràn ngang 320/390/768/1024/1440; font Newsreader/Sarabun tải thật + so pixel glyph Ắ…Ự đ Đ với fallback (ảnh `screenshots/glyph-test.png`, đã xem: dấu chồng đúng); quét chữ cấm (demo, minh hoạ, giả định, mô phỏng, dữ liệu mẫu) trên văn bản/alt/aria/meta ở trạng thái đầu, sau tương tác, mobile, reduced; không số điện thoại/đánh giá/giải thưởng; hiệu ứng khởi chạy (InkReveal x>=8 và hoàn tất sau cuộn, InkTitle, ScrollScrubText, SVGPathDraw x>=4, ParallaxLayer, Grain/Cursor/Progress/Marquee, Steam có điểm ảnh, lá trà, chuyển cảnh mực xuất hiện rồi tự gỡ); danh mục (12 loại, giá vi-VN, hover, lọc); Ghép trà (trạng thái rỗng, kết quả, đổi số chén, xoá); đồng hồ pha dùng `page.clock` (đếm ngược, tạm dừng, tiếp tục, hết giờ, nước 2, đặt lại, thông báo status); tóm tắt (khoá sao chép khi thiếu giờ, tối đa 8 người, lỗi bộ trà không khớp, ước tính, ghi chú); Tab/skip/focus-visible; mobile (menu Escape + trả focus, chi tiết trà trong hàng, touch target >=40, input >=16px); reduced-motion (không preloader/mặt nạ/blur, chữ hiện đủ, path tĩnh); no-JS (chữ và ảnh hiện); credits 12 ảnh + noindex.
Hiệu năng thô khi cuộn toàn trang: long task >200ms = 0 ở 1440 (max 70ms) và 390 (max 69ms).
Ảnh chụp: `screenshots/hero-1440.png`, `full-1440.png`, `hero-390.png`, `full-390.png`, `hero-reduced.png` (đã xem hero + full desktop và full mobile bản trước lần sửa cuối).

## Chưa kiểm / yếu
- Nút cuối `buildConsultHref("tra-thi")` chỉ ra `/lien-he` trần tới khi registry có `tra-thi` (REQUESTS.md). Test in WARN.
- Chỉ Chrome headless; chưa Safari/Firefox, trình đọc màn hình thật, Lighthouse/axe, `next build`. Mask `mask-image` có tiền tố -webkit- nhưng chưa thử Safari.
- Sau lần chạy e2e cuối chỉ xoá một dòng chú thích eslint ở Preloader.tsx (eslint/tsc sạch), chưa chạy lại toàn bộ e2e.
- Chuông báo dùng Web Audio, chưa nghe thử ở trình duyệt thật. Dữ liệu 12 loại trà và giá do tự soạn, cần chủ duyệt.
