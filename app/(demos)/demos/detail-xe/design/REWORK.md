# REWORK (2026-11-25) — Gương Phẩm

## (a) Đánh giá đề tài
Trước: hero là khẩu hiệu ("Vẻ đẹp nằm ở từng chi tiết"), triết lý chiếm chỗ dịch vụ, thiếu giờ mở cửa, bảng giá theo dòng xe, tiếp nhận/bàn giao, chuẩn bị và chăm sóc sau, chính sách đặt lịch/bảo hành; công cụ chọn gói là điểm nhấn của trang; chip "ảnh stock / đồ hoạ thể hiện" lộ vai trình diễn. Sau: website một cửa hàng chăm sóc xe hơi ở Quận Ngũ Hành Sơn, Đà Nẵng. Giữ tên Gương Phẩm và nhận diện carbon & chrome.
## (b) Section thật của ngành
Hero (loại hình, khu vực, đối tượng chủ xe cá nhân, CTA "Đặt lịch kiểm tra xe", 3 sự thật: rửa chi tiết từ 350.000 đ, 08:00–18:00 T2–T7, kiểm tra miễn phí) → Dịch vụ (5 gói với bước, thời gian, giá từ) → Giá theo dòng xe (bảng sedan/SUV/bán tải/xe điện) → Cách làm việc → Một ngày làm việc với xe (scrub bụi -> sạch) → Quy trình tiếp nhận–kiểm tra–thực hiện–bàn giao + phiếu bàn giao → Phủ ceramic (slider) → Chọn gói (công cụ, một section) → Chuẩn bị và chăm sóc sau dịch vụ → Đặt lịch, đặt cọc/huỷ, đón xe, bảo hành thi công (không nêu số năm) → Dụng cụ và vật tư → FAQ 14 câu (không cam kết xoá hết xước) → Đặt lịch.
## (c) Kế hoạch nội dung
data/content.ts (FACTS, PHASES, PREP, AFTER, POLICY, FAQ, NAV), builder.ts (PRICE_ROWS), Sections.tsx (PriceTable, Process, Care, Booking), Hero.tsx, metadata/meta.ts, og-image tạo lại (tests/showroom/detail-xe/og.mjs, không chữ demo/minh hoạ). Không bịa: khách, đánh giá, số năm bảo hành, giấy phép, địa chỉ đường.
## (d) Hiệu ứng trước/sau (ma trận: đại trà 6 -> 2 (ParallaxLayer, SVGPathDraw); chữ ký thư viện 5: Counter, CursorSpotlight, ShineSweep, DraggableGallery, NumberTicker)
Bỏ: SplitWords (hero thay bằng quét sáng từng dòng), ScrollScrubText, ClipReveal, ScrollProgress.
Chữ ký (code riêng trừ khi ghi thư viện):
1. Scrub bụi -> sạch với mép sáng, đồng hồ giờ làm, bước — components/Scrub.tsx.
2. Slider lớp phủ chưa phủ/đã phủ (kéo, phím, gợi ý lần đầu) — CoatSlider.tsx.
3. Light streak chạy theo cuộn trên khung ảnh — Motion.tsx (data-dx-streak).
4. Ánh sáng phản chiếu bám con trỏ trên thẻ gói — PackageCards.tsx.
5. Hero: ảnh mở từ dưới + blur-to-sharp, tiêu đề quét sáng từng dòng bằng clip-path, vệt sáng lướt thân xe — Hero.tsx.
6. CursorSpotlight, ShineSweep, DraggableGallery, Counter, NumberTicker (thư viện).
Ngôn ngữ chuyển động: "ánh sáng quét trên bề mặt": chậm, có điểm dừng, không nảy.
