# SPEC-FROM-CHATGPT — rút gọn phần dùng được (LP-02 Hiên Mặn Villa)

Nguồn: một đoạn chat riêng trên ChatGPT (2026-11-25), gửi prompt mẫu từ `docs/showroom/CHATGPT-SPEC-PROMPT.md`, đọc hai lượt ("tiếp"). Lượt 2 còn đang sinh dở phần cấu trúc thư mục thi công khi mình dừng đọc; các mục 1 đến 8 đã đọc đủ. Quyết định cuối là của mình, đối chiếu với repo (ChatGPT đề xuất thư mục `public/demos/...` và file `hien-man.module.css`, repo bắt buộc `public/images/demos/hien-man/` và `brand.module.css`; bỏ phần đó).

## Dùng nguyên hoặc gần nguyên
- Thương hiệu: HIÊN MẶN VILLA, slogan "Ở lại cùng nhịp biển.", hero "Chậm lại, nghe biển thở.", closing "Để biển giữ hộ những bộn bề.", câu chuyện ~120 chữ (dùng nguyên văn), giọng văn tạp chí kiến trúc + nhật ký nghỉ dưỡng, danh sách cụm từ cấm ("thiên đường nghỉ dưỡng", "đẳng cấp", "giá tốt nhất").
- Logo: symbol viewBox 72×88 (mái, hai cột, mặt trời, hai đường sóng), wordmark Lora 500 tracking .12em, VILLA Manrope tracking .32em, favicon nền Ocean Deep. Dựng chữ thành path để không phụ thuộc font.
- Palette: Ocean Deep #173E49, Warm Ivory #FAF8F4, Natural Sand #F2E9DA, Sea Mist #DCE7E4, Driftwood #96765B, Deep Ink #172E34, text phụ #486068, trạng thái (còn phòng #2E6554, kín #596469, lỗi #A43D35, focus #216C91). Ảnh bo 0, nút 2px, input 4px, không card bo tròn.
- Cấu trúc: hero điện ảnh + booking bar nổi dùng chung state với planner; Our Story; Rooms; panorama; Amenities (masonry có chủ đích, không lưới 2×2 đều); Stay Planner; Around Hiên; FAQ ("Trước khi đến Hiên."); Closing; Footer kiểu trang cuối tạp chí. Không testimonial, rating, bộ đếm khách.
- Tương tác: một state dùng chung (booking bar, calendar, calculator, nút phòng); khoảng [checkIn, checkOut); ngày kín vẫn chọn được làm ngày trả phòng nếu mọi đêm trước hợp lệ; đổi loại phòng giữ ngày + số khách, kiểm lại, không tự giảm khách; roving tabindex; phím mũi tên/Home/End/PageUp/PageDown/Enter/Space/Esc; mã lỗi (thiếu ngày, quá khứ, ngược ngày, quá 30 đêm, vượt sức chứa, không có phòng xuyên suốt); giá tính từng đêm (không lấy hệ số của ngày nhận cho cả kỳ), nhân hệ số mùa × cuối tuần rồi làm tròn; phụ thu khách; lưu kế hoạch localStorage có validate và tính lại giá, sao chép tóm tắt; không count-up số tiền.
- Motion: "Breathing architecture"; hero mask reveal 2 dòng, không split từng ký tự (tránh hỏng dấu tiếng Việt); ảnh full-bleed zoom 1.08→1 khi cuộn, không pin, không scroll hijacking; reduced motion tắt hết; gsap.context + cleanup.
- Ảnh: bộ 12 vai trò (hero, mái hiên, chi tiết, 3 phòng, panorama, bữa sáng, phòng tắm đá, góc đọc sách, Sơn Trà, chạng vạng); tránh logo, mặt nhận diện, watermark, ảnh Maldives/Bali/Địa Trung Hải lẫn kiến trúc.
- SEO/a11y: noindex,follow; JSON-LD tuỳ chọn chỉ `WebPage`, cấm Hotel/LodgingBusiness/LocalBusiness/Review/AggregateRating/Offer; WCAG 2.2 AA; target ≥44px; lưu ý riêng lịch 7 cột ở 320px.

## Khác biệt có chủ ý so với ChatGPT (và lý do)
| ChatGPT | Mình làm | Lý do |
|---|---|---|
| 8 phòng, 3 hạng (Vườn/Biển/Bình Minh), giá 1,45–2,65 triệu | 7 phòng, 3 hạng + "Bao trọn villa" (Hiên Biển, Hiên Bình Minh, Suite Hồ Bơi), giá gốc 2,4–4,6 triệu | Không có ảnh stock phòng nhìn ra vườn hợp bộ; ưu tiên ảnh đẹp hơn là đủ hạng |
| Đặt chỗ theo từng phòng vật lý + reservation fixture | Tồn kho theo hạng, dữ liệu "đã đặt" sinh xác định bằng hash (không Math.random) | Đủ cho demo, test được, không đổi giữa các lần tải |
| Trẻ em / người lớn tách riêng | Chỉ "số khách" | Giữ UI gọn; phụ thu theo khách thêm |
| Mùa: 3 mức theo tháng + hệ số cuối tuần ×1,20 | 4 mức (thấp/thường/cao/lễ Tết), cuối tuần ×1,18, giảm 5/8/12% ở 3/5/7 đêm, phí dịch vụ 5%, phí vệ sinh | Có "qua mùa", "ở dài ngày", dịp lễ theo yêu cầu điều phối viên |
| Calculator nền Ocean Deep tương phản với calendar | Cả hai trên nền ivory trong khu Sea Mist | Giữ đọc được số liệu; vẫn khác biệt bằng sticky + chữ số Lora |
| Panorama 21:9 + Closing có ảnh | Ba cảnh sticky theo giờ trong ngày; Closing dùng symbol line-art, không ảnh | Mỗi ảnh chỉ dùng một lần, đã hết ảnh hợp tông |
| Booking window 180 ngày | 12 tháng (đến 30/11/2027) | Để thấy được Tết 2027 và mùa cao |
