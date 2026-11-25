# Đặc tả rút gọn từ ChatGPT (chế độ khách, 1 lượt, tab đã đóng)
Đã gửi câu rút gọn (bối cảnh + nhận diện + hiệu ứng + 2 việc: đề xuất tên, đặc tả). ChatGPT trả đủ một lượt, không bị cắt. Phần dùng được:
- Tên: Kim Nguyệt / Minh Kim / Nguyệt Kim; chọn Kim Nguyệt, ý tưởng logo trăng khuyết + viên đá + sao.
- Section: hero, bộ sưu tập (nhẫn, mặt dây, bông tai, lắc), công cụ cấu hình, quy trình chế tác (lắng nghe, phác thảo, chế tác, hoàn thiện), bảo hành/chăm sóc, FAQ, liên hệ.
- Hiệu ứng (đã áp dụng): curtain/mở hộp ≤1000ms (mobile 650-750ms), cursor glare rgba(201,162,39,.16) quickTo 250ms, shimmer 1800ms linear một lần mỗi tiêu đề, product reveal 55px/1100ms power3.out + parallax ≤30px (mobile ≤8px), canvas sparkle ≤35 hạt (mobile 12), hạt 1-2px, chu kỳ 2-5s, tia chữ thập; nhẫn 3D CSS perspective 900, 12s/vòng, rotateX cố định, hover dừng và nghiêng ≤8°, mobile 18s; gold line draw 1000ms.
- Công thức giá: P = kim loại (W x R x K) + đá + công + phụ phí; hàm lượng 10K 41,7%, 14K 58,5%, 18K 75%; không hardcode giá vàng; thiếu dữ liệu thì "liên hệ báo giá".
## Tôi tự quyết / khác ChatGPT
- Font: ChatGPT đề xuất Cormorant Garamond + Manrope (trùng trang cũ) -> dùng Libre Bodoni + Montserrat.
- ChatGPT chỉ đưa 1 giá ví dụ; tôi định nghĩa bảng đơn giá, biên độ (kim loại 5%, công 10%, đá tổng hợp 15%, đá tự nhiên 40%), trọng lượng theo loại/cỡ x hệ số khối lượng riêng, trả KHOẢNG giá; đơn giá vàng 24K do người dùng nhập (mặc định 4.000.000 đ/g, ghi rõ không phải giá niêm yết).
- ChatGPT đề nghị tính giá ở server và gửi qua Zalo: không áp dụng (landing không có backend, CTA luôn là buildConsultHref).
- Đá: "tổng hợp / tự nhiên chung chung" (bỏ Zircon/Moissanite/Kim cương để không cam kết chất lượng). Không chứng thư, không viện kiểm định.
- Ảnh: từ khoá ChatGPT dùng làm gợi ý; ảnh chọn trực tiếp trên Pexels.
- Intro: tự quyết hộp trang sức mở nắp bằng CSS thuần (no-JS vẫn tự gỡ) thay vì hai panel.
