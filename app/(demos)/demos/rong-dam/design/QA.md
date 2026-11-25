# QA: Rong Dặm (LP-03), kết quả test THẬT

Lệnh: `node tests/showroom/rong-dam/e2e.mjs` (Playwright + Google Chrome headless, BASE=http://localhost:3100, dev server chung).
**Lần chạy cuối (sau mọi chỉnh sửa): 136 pass, 0 fail.** Log lấy từ /tmp/rd-e2e.log; exit 0.

## Đã kiểm (đều pass)
- VI và EN: HTTP 200, 0 lỗi console, không request ra ngoài origin, title riêng, robots noindex, favicon theo route, đúng 1 h1, hreflang vi-VN / en / x-default đối ứng, canonical tự tham chiếu, `lang="vi"` / `lang="en"` đúng ở wrapper, `<html lang>` đổi thành en khi chạy và trả lại vi, nút VI/EN có hreflang, link credits, nhãn Demo.
- Không tràn ngang ở 320/390/768/1024/1440 cho cả VI và EN (10 phép đo).
- Font: face vietnamese của Bricolage Grotesque và Lexend tải thật; đo glyph Ă Â Ê Ô Ơ Ư Đ và toàn bộ Ắ…Ự ở weight 800 và 400: không rơi fallback, không tách dấu.
- Trip Finder: lỗi thiếu thời gian/người đồng hành cạnh ô, ngân sách sai có `aria-invalid`, kết quả 1-3, 1 ngày không gợi ý combo, tính cả vé khi lọc ngân sách, không hiện "% phù hợp", cảnh báo kết quả cũ, trạng thái rỗng kèm gợi ý và giữ nguyên lựa chọn, 3 ngày+ ra RD-06, nút "Khám phá lịch trình" chọn tour và chuyển focus tới tiêu đề Explorer, đặt lại.
- Explorer: 8 mốc giờ RD-01, bản đồ SVG, chọn điểm dừng làm nổi bật ghim hai chiều, giá RD-01 2NL = 3.200.000, 2NL+1TE = 4.400.000 (dịch vụ 1.750.000 + vé 2.650.000), bỏ tính vé = 1.750.000, khoá tối thiểu 1 người lớn và tối đa 12 khách, đổi tour giữ số khách, RD-06 có 3 tab ngày, 2NL+1TE = 11.755.000, +1 phòng riêng = 12.355.000, tour trong ngày không có phụ thu phòng, RD-02 2NL+1TE = 1.780.000, 6 thẻ tour có giờ khởi hành/thời lượng/điểm đón/vé tách riêng, có câu "kiểm tra lại với đơn vị vận hành", không có Review/AggregateRating.
- Lưu/sao chép kế hoạch (nội dung clipboard đúng, không dữ liệu cá nhân); storage lỗi: báo "Không thể lưu kế hoạch", không báo thành công giả, trang không vỡ.
- Giữ trạng thái VI→EN→VI: tour, ngày/điểm dừng, số khách, lựa chọn và kết quả Trip Finder; EN không lẫn chữ tiếng Việt ở nội dung chính; tiền vẫn VND.
- Link tư vấn (VI và EN, ≥2 link mỗi trang) có industry=Tour, solution=hospitality, utm_source=showroom, utm_campaign=rong-dam; mở với `?ref=` không lỗi và link vẫn cùng origin; skip link là Tab đầu; Tab tới CTA chính; menu mobile mở, Escape đóng và trả focus; touch target ≥44px; input ≥16px.
- `prefers-reduced-motion`: mọi phần tử `data-rd` hiện đủ.
- Credits 200, noindex, 12 ảnh, link nguồn, liệt kê 2 font. Trang chính dùng ≥11 ảnh, không lặp ảnh, mọi ảnh tải được.
- Ảnh chụp 1440×900 và 390×844 (VI, EN): hero, full page, Trip Finder (đã có kết quả), Explorer (RD-06, điểm dừng chọn) trong `tests/showroom/rong-dam/screenshots/`, đã tự xem. `logo-sheet.png`: kiểm logo ở 16/32/200px, mono, đảo màu.
- `tsc --noEmit` không có lỗi ở file rong-dam. 

## Lỗi thật tìm thấy trong quá trình và đã sửa
- `next/font/local` không cho spread options (làm 500 mọi route demo trong vài giây, đã sửa ngay).
- Path bản đồ chặn click vào ghim (thêm `pointer-events:none`).
- Hover làm mất giờ ở dòng đang chọn.
- h1 EN xuống 3 dòng (giảm cỡ, nay 2 dòng).
- Vệt mờ ở ảnh đèn lồng hero (làm mờ đèn pha để lại vệt): cắt bỏ cạnh phải ảnh, đổi tên file để vượt cache next/image.

## Sửa assertion (không phải sửa sản phẩm)
- Hai assertion phân biệt hoa/thường nhầm với chữ in hoa do CSS (`text-transform`): đã thêm cờ `i`.
- Assertion cookie `tct_ref`: `proxy.ts` chỉ đặt cookie khi mã thuộc đối tác ĐÃ DUYỆT trong DB nên mã thử "ABC123" không tạo cookie; đổi thành kiểm demo không tự ghi cookie và link tư vấn vẫn cùng origin. **Chưa kiểm được**: cookie `tct_ref` thật đi theo sang `/lien-he` (cần mã đối tác đã duyệt trong DB).

## Chưa kiểm / hạn chế
- Không đo bundle, Lighthouse, không chạy trên trình duyệt khác ngoài Chrome, không thử máy thật; không kiểm bằng trình đọc màn hình.
- Chưa đối chiếu độc lập nhãn địa danh của vài ảnh stock (xem ASSETS.md).
- Không có reviewer độc lập; chưa chạy Differentiation Gate chung.

## Chạy lại sau chính sách nhãn mới (2026-11-25)
- Kết quả: 146 pass, 0 fail (`node tests/showroom/rong-dam/e2e.mjs`; lần chạy đầu 144/2 do sót alt og EN "fictional" và một chuỗi đã đổi, đã sửa rồi chạy lại toàn bộ).
- Thêm kiểm tra quét ngược: văn bản (kể cả mục ẩn/FAQ), alt, aria-label, title, placeholder, meta title/description/og/twitter, JSON-LD không chứa "Demo", "minh hoạ", "giả định", "mô phỏng", "dữ liệu mẫu", "thương hiệu minh hoạ"... ở trang chủ, trạng thái lỗi/kết quả của công cụ, dialog, menu mobile và trang credits (credits còn lời công khai trung thực do Trần Công Tiến thiết kế, ảnh stock có ghi công). Phạm vi quét: wrapper `[data-site]` của thương hiệu, không gồm thanh nổi dùng chung của điều phối viên.
- Ảnh chụp 1440/390 đã chụp lại và xem; og-image tạo lại bản sạch (`tests/showroom/rong-dam/og.mjs`).
- Chưa kiểm: thanh nổi dùng chung (file chung) còn do điều phối viên cập nhật.
