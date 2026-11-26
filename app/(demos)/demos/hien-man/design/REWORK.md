# REWORK — Hiên Mặn Villa (2026-11-25, theo REWORK-STANDARD)

## a) Đánh giá đề tài trước
Trước: hero khẩu hiệu ("nghe biển thở"), câu chữ trừu tượng, thiếu bảng giá theo loại phòng, ăn uống, dịch vụ đưa đón, vị trí, tiện ích cụ thể. Ba cảnh toàn màn hình chỉ để ngắm.
Sau: website villa 7 phòng ven biển Sơn Trà, 2-16 khách, giá từ 2.040.000 ₫, nhận 14:00/trả 12:00.

## b) Section thật của ngành
Hero · Giới thiệu (dành cho ai) · Phòng nghỉ · Bảng phòng & giá (diện tích, giường, sức chứa, giá 4 mùa) · Lịch phòng & chi phí · Cảnh đổi giờ · Tiện ích · Sơ đồ villa · Ăn uống · Hoạt động & dịch vụ (giá, đưa đón) · Vị trí · Quy định & FAQ · Đặt phòng.

## c) Hiệu ứng trước/sau (node scripts/showroom-effects-matrix.mjs hien-man)
Trước: thư viện 0, fade-up "rise" chung, parallax tự viết. Sau: đại trà giữ ParallaxLayer, ScrollProgress; chữ ký thư viện: CurtainReveal (rèm mở đầu ≤1s, một lần/phiên).
Chữ ký riêng: TimeOfDay (kéo giờ đổi ảnh + màu trời), VillaWalk (đường đi trong villa, người đi nhỏ + nét vẽ dần), SeasonStrip (cột giá 12 tháng theo phòng), Calendar lịch phòng (đã có), kính trượt ở hero.
Ngôn ngữ chuyển động chính: "cửa kính trượt": mọi thứ mở theo chiều ngang (kính trượt hero, lát cắt trái→phải, ảnh phòng đổi bằng lát cắt ngang).
