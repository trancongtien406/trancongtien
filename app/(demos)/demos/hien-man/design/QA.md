# QA — Hiên Mặn Villa (kết quả chạy THẬT, 2026-11-25)

## Lệnh và kết quả
| Lệnh | Kết quả |
|---|---|
| `node_modules/.bin/tsx --test tests/showroom/hien-man/logic.test.ts` | **22 pass, 0 fail** (ghi ở `tests/showroom/hien-man/logic-test-output.txt`) |
| `node tests/showroom/hien-man/e2e.mjs` (BASE=http://localhost:3100, Chrome headless, dev server chung) | **121 pass, 0 fail** (lần chạy cuối, sau mọi chỉnh sửa) |
| `npx tsc --noEmit -p . \| grep demos/hien-man` | 0 lỗi |
| `npx eslint "app/(demos)/demos/hien-man"` | 0 lỗi/cảnh báo |

## Unit test logic thuần (`lib/`)
Ngày UTC (cộng ngày qua tháng/năm/năm nhuận), mùa thấp/thường/cao/lễ, đêm cuối tuần (T6, T7), giá đêm (golden: Hiên Biển mùa thấp T4 2.040.000; T6 2.410.000; mùa cao 3.120.000; lễ+T6 4.390.000), ngày kín (khối cứng 6–7/12, Tết 5–8/2/2027 kín mọi loại, quá khứ, quá hạn), dữ liệu xác định, bao trọn villa chỉ trống khi mọi phòng trống, giảm giá 3/5/7 đêm, đêm tối thiểu (T6/T7 = 2, lễ = 3), báo giá khớp công thức, **qua mùa** (28/12→2/1: low,low,holiday,holiday,holiday), **ở dài ngày** 7 đêm giảm 12%, phụ thu khách thêm, 9 mã lỗi (thiếu ngày, ngược ngày, quá khứ, quá xa, quá 30 đêm, ngày kín có liệt kê, khách vượt, số phòng sai, tối thiểu đêm), luật chọn ngày hai lần bấm (ngày kín làm ngày trả phòng hợp lệ, khoảng chứa đêm kín bị từ chối).

## E2E (e2e.mjs) gồm
Tải trang 200, 0 lỗi console, 0 request ngoài origin, title/description/noindex/favicon/og riêng, 1 h1, 8 section, ≥11 ảnh khác nhau; không tràn ngang 320/390/768/1024/1440 (cả tại khu lịch); ô lịch đủ chạm (320: ~39×48, 390: ≥44); font Lora + Manrope đã tải, glyph ă â ê ô ơ ư đ + Ắ…Ự, đo dấu chồng (Ế≠Ê, Ỗ≠Ô, Ấ≠Â, Ầ≠Â, Ố≠Ô, Ự≠Ư, Ệ≠Ê, Ử≠Ư, Ặ≠Ă), chữ NFC; reduced-motion: nội dung hiện đủ không cần cuộn; motion bật: không phần tử nào kẹt ẩn; rooms tablist (click, ArrowDown, Home, đồng bộ sang công cụ tính); calendar + calculator (rỗng, chọn chuột, bảng từng đêm khớp tổng, booking bar cùng tổng, phụ thu khách, khách vượt sức chứa, 7 đêm giảm 12%, ngày kín, khoảng chứa đêm kín, tối thiểu 2 đêm + nút "Kéo dài", bao trọn villa khoá số phòng); lưu/khôi phục/ bỏ dữ liệu hỏng localStorage; calendar bàn phím (roving tabindex, mũi tên, PageDown, Enter, Esc, aria-label ngày kín, ngày quá khứ disabled), Tab tới CTA; booking bar báo lỗi; FAQ (mở nhiều, Enter/Space); link thoát `industry=Villa&solution=hospitality&utm_source=showroom&utm_campaign=hien-man`, mở với `?ref=` vẫn đúng, không tự ghi `tct_ref`; credits (12 ảnh, noindex, ảnh tải được); mobile: menu mở, Escape đóng và trả focus, mọi nút/link/ô nhập ≥44px, input ≥16px.

## Ảnh chụp đã tự xem và sửa
`tests/showroom/hien-man/screenshots/`: `hero-1440.png`, `hero-390.png`, `hero-768.png`, `hero-1024.png`, `s-<section>-1440.png` và `s-<section>-390.png` (8 section), `planner-selected-*`, `hero-with-quote-1440.png`, `menu-390.png`, `logo-check-16-32-200-mono-reversed.png`.
Lỗi đã thấy và sửa: chữ nút trong header trùng màu nền (specificity `.brand a`), margin của p/h2 bị reset ghi đè, thanh đặt phòng fixed che nội dung (chuyển sang nổi trong hero), tấm Về Hiên tràn sang cảnh sau, chữ "Một ngày ở Hiên" đặt sai chỗ, link hero chạm tab thanh đặt phòng, thanh đặt phòng mobile bị thanh Demo che, ảnh phụ Quanh Hiên rời nhau, lịch+công cụ lệch chiều cao (đưa bảng giá mùa xuống dưới lịch), công cụ tính sticky cao hơn khung nhìn (bỏ sticky), nút dismiss thông báo bị `aria-label` che chữ, ô chọn khách 32px, logo header mobile 42px.

## Chưa kiểm / yếu
- Chưa đo Lighthouse/LCP/bundle (không chạy build; dev server chung). Chưa kiểm axe/NVDA/VoiceOver, chỉ kiểm bằng DOM (role, aria, focus) và Tab.
- Ô ngày lịch ở 320px rộng ~39px (cao 48px): dưới 44px theo chiều ngang, đã chấp nhận để không tràn ngang.
- Ảnh stock không cùng một công trình; ảnh "14:30" ngả tím, ảnh hiên-dai-vong và cua-so-ban-mai ngả ấm cam hơn bộ.
- Thanh Demo dùng chung (fixed dưới) che phần đáy nội dung khi cuộn; không sửa vì là file chung.
- Chưa chạy bộ differentiation chung (`tests/showroom/differentiation.mjs`).
- Calendar chỉ tính tồn kho theo hạng phòng (dữ liệu giả định), không có từng phòng vật lý.
- Hover/scroll motion kiểm bằng ảnh chụp và test trạng thái, chưa quay video chuyển động.

## Chạy lại sau chính sách nhãn mới (2026-11-25)
- Kết quả: 129 pass, 0 fail (`node tests/showroom/hien-man/e2e.mjs`).
- Thêm kiểm tra quét ngược: văn bản (kể cả mục ẩn/FAQ), alt, aria-label, title, placeholder, meta title/description/og/twitter, JSON-LD không chứa "Demo", "minh hoạ", "giả định", "mô phỏng", "dữ liệu mẫu", "thương hiệu minh hoạ"... ở trang chủ, trạng thái lỗi/kết quả của công cụ, dialog, menu mobile và trang credits (credits còn lời công khai trung thực do Trần Công Tiến thiết kế, ảnh stock có ghi công). Phạm vi quét: wrapper `[data-site]` của thương hiệu, không gồm thanh nổi dùng chung của điều phối viên.
- Ảnh chụp 1440/390 đã chụp lại và xem; og-image tạo lại bản sạch (`tests/showroom/hien-man/og.mjs`).
- Chưa kiểm: thanh nổi dùng chung (file chung) còn do điều phối viên cập nhật.
