# QA · Ô Lưới

Lần chạy cuối (sau mọi chỉnh sửa):
- `BASE=http://localhost:3100 node tests/showroom/cowork-grid/e2e.mjs` → **88 pass, 0 fail**. (Một lần chạy trước đó bị ngắt vì trang tự tải lại khi dev server nạp lại, chạy lại thì qua.)
- `npx vitest run tests/showroom/cowork-grid` → 14/14 (luật gói, tô sáng chỗ, sơ đồ, giờ UTC+7).
- `npx tsc --noEmit -p . | grep cowork-grid` → không lỗi.
- Long task >200ms khi cuộn toàn trang: 0 ở 1440, 0 ở 390.

Phạm vi e2e: 0 lỗi console, 0 request ngoài origin, quét chữ cấm (văn bản, alt, aria, meta) ở trạng thái mặc định và sau khi dùng công cụ, glyph Việt đo bằng canvas cho h1/h2/body/mono + ảnh chụp chữ đậm chồng dấu (`screenshots/glyph-stack.png`, đã xem), không tràn ngang 320/390/768/1024/1440, sơ đồ 62 ô có nhãn chữ trạng thái, đổi ngày/giờ đổi trạng thái, hover và bàn phím (Home, mũi tên), toạ độ trên sơ đồ, tua giờ, về giờ thực, form (0, 25, trống, chữ, +/-), 4 loại chỗ, phòng họp >10 người báo lỗi, thiếu chỗ + nút tìm giờ, tóm tắt + sao chép clipboard, link CTA có industry/solution/utm_campaign, giữ link cùng origin khi mở `?ref=`, menu mobile Escape trả focus, reduced-motion (không ô che, không ẩn gì, scramble/marquee/counter ở trạng thái cuối), crosshair + đồng hồ chạy, credits 200 với 11 ảnh.

Chưa kiểm / hạn chế:
- `industry/solution/utm_campaign` trong link CTA chỉ có khi registry có dòng cowork-grid.
- Không kiểm bằng trình đọc màn hình thật, không đo Lighthouse, không kiểm Safari/Firefox, không chạy trên thiết bị cảm ứng thật (chỉ viewport 390).
- Mobile: sơ đồ SVG rộng tối thiểu 620px nên cuộn ngang trong khung bản vẽ.
- Có thể thấy nháy ngắn lúc hydrate ở hero (nội dung SSR hiện rồi mới ẩn để chạy hiệu ứng).
