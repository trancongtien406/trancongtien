# REWORK (2026-11-25) — Rong Dặm Tour

## (a) Đánh giá đề tài
Trước: trang "sổ tay du lịch" chung chung, hero khẩu hiệu ("Đi một dặm. Thêm một chuyện."), thiếu bảng giờ, xe/hướng dẫn viên, đặt tour; công cụ là thân trang; chữ "Trao đổi dự án / không nhận đặt tour" lộ vai demo. Sau: website công ty tour miền Trung có văn phòng Quận Hải Châu, Đà Nẵng, giữ nhận diện zine và tên thương hiệu (thêm "Tour").
## (b) Section thật của ngành
Hero (loại hình, khu vực, đối tượng, 3 sự thật, CTA Đặt tour) → Điểm đến → Lịch khởi hành (bảng lật + đếm ngược) → Hành trình & giá (vé lật, bảng giá theo nhóm) → Chọn tour → Lịch trình, bản đồ giờ, tính giá → Combo 3N2Đ (cuộn ngang) → Xe & đội ngũ theo vai trò → Ghi chú dọc đường → Cách làm việc → Đặt tour 4 bước + chính sách cọc/huỷ → FAQ 8 câu → Liên hệ. VI và EN đủ.
## (c) Kế hoạch nội dung
data/ops.ts (mới, song ngữ), copy.ts (hero, nav, FAQ, closing, footer), components DepartureBoard/Combo/Team/Booking/Tours(+PriceTable). Không bịa: khách, đánh giá, giấy phép, địa chỉ đường; SĐT 0236 000 0000.
## (d) Hiệu ứng trước/sau (ma trận: thư viện 0 → PD, MB, PinnedHorizontalScroll)
Giữ đại trà: SVGPathDraw (đường lộ trình hero), MagneticButton (CTA hero + đặt tour). Bỏ: không còn hiệu ứng đại trà khác. Chữ ký riêng (3 code riêng + 1 thư viện): bảng giờ split-flap, đồng hồ đếm ngược khởi hành (giờ VN), vé tour lật 2 mặt, xe chạy theo thanh giờ trên bản đồ (play/kéo), PinnedHorizontalScroll cho combo. Ngôn ngữ chuyển động: "đóng dấu và lật vé" (tiêu đề đóng dấu, thẻ lật từ mép trên, vé chạy vào từ cạnh).
