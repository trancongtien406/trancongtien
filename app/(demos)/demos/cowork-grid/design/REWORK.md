# REWORK (2026-11-25) — Ô Lưới

## (a) Đánh giá đề tài
Trước: trang "chọn đúng ô" nghiêng về công cụ sơ đồ; hero là khẩu hiệu, thiếu giờ mở cửa, quy định, chính sách dùng thử, cộng đồng, chính sách đặt cọc; giá chỉ theo tháng. Sau: website một không gian làm việc chung một tầng ở Quận Hải Châu, Đà Nẵng. Giữ tên Ô Lưới và nhận diện bản vẽ/terminal.
## (b) Section thật của ngành
Hero (loại hình, khu vực, đối tượng, CTA "Đăng ký dùng thử 1 ngày", 3 sự thật: hot desk từ 120.000 đ/ngày, 07:00–21:00, dùng thử 1 ngày miễn phí) → Giờ mở cửa (trạng thái mở/đóng thật + bảng giờ) → Giới thiệu → Loại chỗ và bảng giá ngày/tuần/tháng + phòng riêng + phòng họp → Không gian và khu vực A–D → Sơ đồ chỗ ngồi + chọn gói (công cụ, một section) → Nhịp ngày → Tiện ích và quy định (khách mời, gửi xe, ăn uống, thẻ, phòng họp) → Dùng thử 1 ngày (điều kiện + 4 bước) → Cộng đồng và sự kiện (lịch tháng) → Đặt chỗ, tham quan, đặt cọc/đổi gói/tạm dừng → FAQ 10 câu (internet, in ấn, khách mời, gửi xe; không cam kết tốc độ/uptime) → Đặt lịch.
## (c) Kế hoạch nội dung
data/content.ts viết lại (FACTS, HOURS, RULES, PRICE_TABLE, TRIAL, COMMUNITY, BOOKING, POLICY, FAQ); component mới OpenNow.tsx, CommunityCal.tsx; Sections.tsx dựng lại; metadata và meta.ts đổi sang loại hình + khu vực; og-image tạo lại (tests/showroom/cowork-grid/og.mjs), không chữ demo/minh hoạ. Không bịa: khách, đánh giá, tên công ty, địa chỉ đường; SĐT 0236 000 0000.
## (d) Hiệu ứng trước/sau (ma trận: đại trà 7 -> 2 (SplitWords, ScrollProgress); chữ ký thư viện 3: TextScramble, Counter, NumberTicker)
Bỏ: ScrollScrubText (tuyên ngôn), VelocityMarquee (2 dải), MagneticButton (5 nút), ClipReveal (ảnh, footer), SVGPathDraw (đường mật độ, đường quy trình).
Chữ ký (code riêng trừ khi ghi thư viện):
1. Grid reveal ô che ảnh hero + nhóm ô — components/Hero.tsx, Motion.tsx; đường lưới vẽ, ô hiện theo đường chéo, ô cam sáng cuối.
2. Tile unveil ảnh (mới, thay ClipReveal) — Sections.tsx TileFrame + Motion.tsx; ảnh che lưới 4x3 ô, tan theo đường chéo.
3. Sơ đồ ghế trực tiếp theo ngày/giờ + tua giờ — SeatMap.tsx, SeatPicker.tsx.
4. Con trỏ chữ thập + toạ độ lưới 80px — Crosshair.tsx.
5. Đồng hồ ngày làm việc + kim "bây giờ" + đường mật độ lộ ra bằng clip — Workday.tsx, LiveClock.tsx.
6. Trạng thái mở/đóng cửa theo giờ Đà Nẵng, tô dòng "hôm nay" — OpenNow.tsx (mới).
7. Lịch cộng đồng tự dựng tháng hiện tại, ô sinh hoạt bấm xem — CommunityCal.tsx (mới).
8. TextScramble nhãn mono (thư viện).
Ngôn ngữ chuyển động: "bản vẽ dựng ô": mọi thứ hiện theo ô lưới và đường kẻ, không fade-up/ghim ngang.
