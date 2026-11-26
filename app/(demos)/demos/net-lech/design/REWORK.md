# REWORK (2026-11-25) — Nét Lệch

## (a) Đánh giá đề tài
Trước: "hair studio tạp chí thời trang": hero khẩu hiệu "Không cần giống ai", bốn dịch vụ một dòng giá "từ", chú thích "Cắt sát / ảnh stock" nhìn thấy trên ảnh hero, tên section tiếng Anh (Manifesto, Craft, Build your look), CTA cuối "Nhận tư vấn website tiệm tóc" (lệch đề tài), không có bảng giá theo độ dài, giờ mở cửa, chính sách cọc, sản phẩm sử dụng. Sau: website một salon tóc nam nữ ở Quận Hải Châu, Đà Nẵng. Giữ tên Nét Lệch, logo N chéo, lime/đen/giấy, Oswald + Archivo, hero cắt chéo 14 độ, Lookbook lọc, Service Builder (nay là một section "Đặt lịch và ước tính").

## (b) Section thật của ngành
Hero (loại hình, quận, đối tượng, CTA "Đặt lịch giữ chỗ", 3 sự thật: cắt từ 150.000 đ, mở 09:00–20:00, tư vấn miễn phí) → dải chạy tên dịch vụ → Dịch vụ và bảng giá theo độ dài tóc (7 dịch vụ: gội dưỡng, cắt, uốn, duỗi, nhuộm, tẩy, phục hồi; giá + thời gian) → Về salon (3 lời hứa) → Lookbook 8 kiểu theo phong cách (mô tả, không là ảnh khách) → Quy trình tư vấn → thực hiện (4 bước có thời gian) → Đặt lịch và ước tính (Service Builder) → Stylist theo vai trò (vector) → Sản phẩm sử dụng (6 nhóm, không tên hãng) → Salon, giờ mở cửa và thanh khung giờ → Chính sách đặt lịch (6 mục: cọc 100.000 đ cho hoá chất, dời/huỷ 24 giờ...) → FAQ 10 câu → Đặt lịch.

## (c) Kế hoạch nội dung
data/content.ts viết lại (NAV, FACTS, PRINCIPLES, PROCESS, POLICIES, PRODUCTS, HOURS, FAQ); data/builder.ts: bảng giá và thời gian từng độ dài (prices/minutes), 7 dịch vụ, quy tắc xung đột (uốn+duỗi, hoá chất tạo kết cấu + màu), stylist đổi sang vai trò; components mới PriceTable.tsx, SlotBar.tsx; Sections.tsx dựng lại; bỏ chú thích "ảnh stock" trên ảnh; og-image dựng lại (tests/showroom/net-lech/og.mjs), trước đó có nhãn "Website demo · thương hiệu minh hoạ", nay không còn. Không bịa: khách, đánh giá, tên người, địa chỉ đường, tên hãng sản phẩm; SĐT 0236 000 0000.

## (d) Hiệu ứng trước/sau (ma trận: trước 0 thư viện; sau: đại trà 2 = SplitWords, VelocityMarquee; chữ ký thư viện 1 = ImageHoverDistort)
Bỏ: fade-up y cho mọi khối (đổi sang trượt ngang từ trái), cuộn "Cuộn để khám phá".
Ngôn ngữ chuyển động chính: "đường cắt chéo 14 độ": tấm phủ lime quét ngang, ảnh/khối hiện bằng mép cắt chéo, lưỡi chéo trượt trên bảng giá.
Chữ ký:
1. Hero cắt chéo: tấm phủ lime quét, H1 vào từng dòng, thanh lime nghiêng sau chữ — Motion.tsx, Sections.tsx Hero (có sẵn).
2. Lookbook contact sheet: lọc 4 nhóm, thẻ hiện bằng mép cắt chéo (clip-path) — Lookbook.tsx, Motion.tsx (có sẵn, đổi kiểu vào).
3. Lưỡi cắt trên bảng giá: chọn Ngắn/Vừa/Dài, dải lime hình bình hành trượt tới đúng cột — PriceTable.tsx (mới).
4. Thanh khung giờ: kéo thời lượng dịch vụ, dải lime cho biết giờ bắt đầu muộn nhất trước 20:00 — SlotBar.tsx (mới).
5. ImageHoverDistort trên 8 thẻ Lookbook (thư viện).
6. Service Builder tính giá theo độ dài + stylist, quy tắc xung đột — Builder.tsx, data/builder.ts (có sẵn, nâng cấp).
