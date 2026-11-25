# QA: Đất Mơ

Lệnh: `BASE=http://localhost:3100 node tests/showroom/gom-lo/e2e.mjs` (Playwright + Chrome headless). Kết quả lần chạy cuối: **99 pass, 0 fail**. Kiểm kiểu: `npx tsc --noEmit` lọc `gom-lo` 0 lỗi; `eslint` thư mục demo 0 cảnh báo.

Đã kiểm: status 200, title/description riêng, một h1, favicon, skip link; quét chữ cấm (demo/minh hoạ/giả định/mô phỏng/dữ liệu mẫu) ở trạng thái đầu, sau tương tác, mobile, reduced; 0 lỗi console, 0 request ngoài origin; không tràn ngang 320/390/768/1024/1440; font Việt (Ắ...Ự, đ) render bằng Yeseva/Patrick/Nunito, có ảnh chụp glyph; bàn xoay SVG (đang quay, thanh độ phình đổi độ rộng bình, kéo ngang trên bình, đổi dáng sang cốc, hoạ tiết chấm, men, mã sản phẩm, nặn lại); vết nung (3 trạng thái theo cuộn, cuộn ngược về đúng); gallery (phím →/End/Home, nút Trước/Sau tự khoá ở hai đầu, kéo chuột, quán tính); ảnh méo (filter gắn khi rê, displacement scale>0, gỡ khi rời; mobile không có filter); Workshop (rỗng, tính 840.000 ₫ và 3.360.000 ₫, tối đa 8 người, không nung, cảnh báo vẽ men không nung, lỗi khung giờ aria-invalid + role=alert, chép tóm tắt); chữ khắc hoàn tất sau khi cuộn; menu mobile (Escape, trả focus); touch target >=40px; reduced-motion (chữ hiện đủ, bình không quay nhưng đổi hình theo thanh, nền không đổi); no-JS (tiêu đề hiện đủ); credits 12 ảnh + noindex; cookie tct_ref không bị trang ghi.

Hiệu năng thô (cuộn toàn trang): long task >200ms 1440 = 0 (tối đa 72ms), 390 = 0 (72ms).

Ảnh chụp đã tự xem và sửa: hero 1440/390, full 1440/390, vết nung 3 mức cuộn, workshop, glyph. Lỗi đã sửa trong quá trình: khoảng trắng giữa các từ chữ khắc, logo bị cắt đầu, ảnh vòm hero hở đáy, ring xoay làm mất căn giữa, ảnh xưởng có huy hiệu hãng xe (đã cắt), snap của gallery làm thẻ đầu lệch, hero mobile đưa bình lên trước 3 ý nhanh.

Chưa kiểm / hạn chế:
- `buildConsultHref("gom-lo")` chưa có industry/solution/utm vì registry chưa có slug (REQUESTS.md); e2e in WARN.
- Chưa kiểm trên thiết bị thật và Safari/Firefox (`style.rotate`, clip-path inset âm cần trình duyệt mới). Chưa chạy `tests/showroom/differentiation.mjs`.
- Chưa đo tương phản bằng công cụ; tính tay: chữ kem trên terracotta ~4.6:1 (chỉ dùng cỡ lớn hoặc đậm), nút ngọc #256863 chữ kem ~5.6:1.
- Chưa tra tên ở Maps/Facebook/Zalo/WIPO/Cục SHTT.
- Ảnh xưởng tối và hơi "cũ", không có ảnh lò nung chính diện.
