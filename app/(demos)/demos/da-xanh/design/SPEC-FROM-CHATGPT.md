# Đặc tả từ ChatGPT (rút gọn) và quyết định của agent
ChatGPT trả lời được tới mục 6.8 thì báo "Unable to connect" (bị cắt). Phần thiếu (6.9 mobile/reduced-motion, 7 shot list ảnh, 8 SEO/a11y) do agent tự quyết, ghi rõ dưới đây.

## Dùng từ ChatGPT
- Tên NÉA Skin Studio, slogan, giọng văn (nhẹ nhàng, không "trị dứt điểm"), câu chuyện thương hiệu, ý tưởng logo (giọt nước + vòng cung + điểm sáng, viewBox 200, tâm 100,100, r76).
- Palette lilac/aqua/trắng, gradient mesh 3 radial, kính trắng ~50% + viền trắng 0.75.
- Hero timeline ~2s (mesh 0, eyebrow .15, headline .35 blur 14, mô tả .7, CTA .9 stagger .12, ảnh 1.05, thẻ kính 1.3, giọt 1.6, halo 2.0). Blur-fade: opacity 0, blur 14px, y 24, 0.85s, stagger .1, bỏ filter sau khi xong. Spotlight bán kính 180px. Mesh chu kỳ 28-36s. Parallax 5 lớp. Giọt serum một giọt chính. Halo xoay 24s, nhịp 6s.
- 7 liệu trình, 4 bước tại studio, hoạt chất chung, FAQ 6 câu, Routine Builder (4 input, luật theo loại da, trạng thái đặc biệt, a11y).
## Agent đổi/tự quyết
- Mesh dùng 5 blob radial-gradient animate transform (không animate background-position: rẻ hơn, chạy compositor), dừng khi tab ẩn; trôi theo cuộn.
- Giọt serum: một giọt trên rail phải, hình thành 3.5% cuộn đầu, giãn theo vận tốc, vệt trail, gợn nước khi cuối trang (thay MotionPath).
- Spotlight dùng `CursorSpotlight` của thư viện; blur-fade viết riêng bằng IntersectionObserver + CSS, trạng thái cuối filter:none (blur giữ lại sẽ phá backdrop-filter của thẻ kính con).
- Liệu trình đặt tên tiếng Việt, 6 mục (không có "Fresh Reset"... vì nghe như thủ thuật), giá tham khảo 250.000-560.000 đ.
- Shot list ảnh, SEO (noindex, không JSON-LD review), checklist: tự quyết, xem ASSETS.md và QA.md.
