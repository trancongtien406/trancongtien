# QA — Khối Nếp (kết quả chạy THẬT, 2026-11-24)

Lệnh: `BASE=http://localhost:3100 node tests/showroom/khoi-nep/e2e.mjs` (Playwright + Chrome headless). Kết quả: **95 pass, 0 fail** (chính sách nhãn 2026-11-25: không còn nhãn Demo/minh hoạ; e2e quét toàn bộ văn bản, aria/alt/title, meta, nội dung xuất ở mọi trạng thái) (có thêm mục 3b đo glyph dấu chồng). Cũng chạy: `npx tsc --noEmit -p .` (0 lỗi ở khoi-nep), `npx eslint "app/(demos)/demos/khoi-nep"` (0 lỗi; 2 chỗ khôi phục localStorage có eslint-disable `set-state-in-effect`).

Phủ: HTTP 200, title riêng, robots noindex, 1 h1, 0 lỗi console (loại trừ websocket HMR của dev), 0 request ngoài origin, mọi ảnh tải được, link thoát đủ industry/solution/utm_source/utm_campaign, link Credits, dòng ký tên, không lộ email/SĐT; không tràn ngang 320/390/768/1024/1440; font Việt (ă â ê ô ơ ư đ + Ắ…Ự) không fallback cho Sans 500/600 và Serif 400; reduced-motion hiện đủ nội dung (không lớp che, đường kẻ/masthead transform none); Estimator đúng 5 test case của spec (162–216, 270–360, 371–495 triệu, 1,29–1,73 tỷ, 18–24) + 5 trạng thái lỗi + trạng thái rỗng + ↑↓ + lưu/khôi phục/sao chép/storage bị chặn + CTA dịch vụ chọn phạm vi; Board: chọn vật liệu, lỗi tên, lưu, lưu bản mới, reload, xác nhận ghi đè preset, xuất TXT (giữ dấu), xuất PNG đúng 1600×1200, xoá hai bước; dialog mở/Escape/trả focus/áp preset; Tab tới CTA chính; menu mobile Escape; FAQ một câu mỗi lần; credits 200 + 12 ảnh + nguồn.
Ảnh chụp: `tests/showroom/khoi-nep/screenshots/` (hero-1440, hero-390, full-1440, full-390, credits-1440, board-export.png), đã tự xem và sửa: accent Ố/Ế bị cắt ở masthead, nút mất chữ do specificity reset, cover mobile tràn ngang, H1 mobile khó đọc trên cửa sổ sáng, cột giá tràn, thiếu khoảng trắng "Từ 20 đến".

## Chưa kiểm / hạn chế
- Dev server `http://127.0.0.1:3100`: trang KHÔNG hydrate (Next 16 chặn tài nguyên dev từ origin 127.0.0.1); e2e phải chạy bằng `localhost:3100`. Xem REQUESTS.md.
- Cookie `tct_ref` không dựng được (proxy cần mã đối tác thật trong DB); chỉ kiểm link thoát là đường dẫn tương đối cùng origin.
- Chưa đo tương phản bằng công cụ (chỉ dùng cặp màu spec), chưa kiểm 200% zoom, VoiceOver, 768/1024 bằng mắt (chỉ kiểm tràn ngang), bundle size, Lighthouse.
- Chưa làm theo phản biện: editorial spread xen giữa concept; mỗi concept một cách trình bày riêng.
- Font: không có subset latin-ext, không có Sans 400 (dùng 500 cho chú thích nhỏ).
- Photo: ảnh óc chó/olive là ảnh gỗ/vải nhân màu, không phải ảnh thật riêng.
