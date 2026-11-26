# REWORK (2026-11-25) — Đất Mơ (xưởng gốm thủ công)

## (a) Đánh giá đề tài
Trước: áp phích "Đất trong tay, bình yên trong lòng" + kệ 10 món + công cụ đặt buổi + nặn bình; thiếu nhóm sản phẩm, lịch lớp, "đã gồm gì", đặt theo yêu cầu/quà/doanh nghiệp, chăm sóc đồ gốm, chính sách, giờ mở cửa; 7 hiệu ứng đại trà. Sau: website một xưởng gốm thủ công ở Quận Ngũ Hành Sơn, Đà Nẵng: bán gốm theo 4 nhóm có giá, workshop 3 loại (thời lượng, số người, giá, đã gồm, lịch tuần), đặt riêng, chăm sóc, chính sách, giờ mở. Pot Designer đổi vai thành "Phác bình theo ý bạn" gửi xưởng.

## (b) Section thật của ngành (11)
Hero (loại hình + khu vực + 3 sự thật + CTA Đặt chỗ workshop) → 3 đường vào (mua/học/đặt riêng) → Gốm bán tại xưởng (12 món, lọc 4 nhóm) → Workshop (lịch lớp tuần, 3 buổi, tóm tắt, chính sách cọc/dời/huỷ/lấy món) → Từ đất đến men (5 bước, thời gian lấy món tuỳ lò) → Đặt theo yêu cầu (quà, riêng, doanh nghiệp) → Phác bình → Về xưởng → Chăm sóc và sử dụng (6) → Xưởng và giờ mở cửa → FAQ 9 → liên hệ.

## (c) Kế hoạch nội dung
data/data.ts viết lại (AREA, FACTS, PATHS, CATS, 12 sản phẩm, SESSIONS có includes/level, SCHEDULE, CUSTOM, CARE, HOURS, POLICY, FAQ, STEPS 5); Shelf thành client có lọc; Workshop thêm lịch lớp; Sections.tsx thêm Paths/Custom/Care; Hero viết lại.

## (d) Hiệu ứng trước/sau (ma trận)
Trước: đại trà 7 (CR, PL, SST, VM, MB, PD, SP), chữ ký thư viện 4. Sau: đại trà 2 (ClipReveal: ảnh bàn xoay ở "Về xưởng"; ScrollScrubText: đoạn giới thiệu xưởng) | chữ ký thư viện 4 (CustomCursor, ImageHoverDistort, DraggableGallery, GrainOverlay). Bỏ: VelocityMarquee (dải chữ), MagneticButton, SVGPathDraw (nét vẽ hero), ParallaxLayer (hero, xưởng), ScrollProgress (thanh tiến độ).
Ngôn ngữ chuyển động chính: "đất nén rồi nở" (khối hạ xuống bẹp rồi bật về dáng, back.out) và "men chảy" (hover thẻ yêu cầu riêng: men xanh ngọc chảy từ trên xuống).

## Chữ ký riêng (file, mô tả)
1. Pot / PotWheel (components/Pot.tsx, lib/pot.ts): bàn xoay SVG, kéo ngang hoặc thanh trượt để nặn phình/thon; dùng ở hero, kệ, Phác bình.
2. Fire (components/Fire.tsx): vết nung đổi màu đất sống, lửa, men theo cuộn; nhiệt kế, đường cong lò, 5 bước.
3. Lịch lớp tuần (Workshop.tsx, mới): 14 buổi, chọn một ô điền sẵn loại lớp + khung giờ vào bản tóm tắt.
4. Engrave (Engrave.tsx): chữ được rạch vào đất bằng clip-path kèm rãnh lõm.
5. Lọc kệ gốm (Shelf.tsx, mới): 4 nhóm kèm giá từ, kệ kéo ngang đổi theo nhóm.
6. Men chảy hover (CSS .customCard) và đất nén rồi nở (Motion.tsx).
Còn yếu: ảnh dùng lại bộ cũ, chưa chụp thêm ảnh lớp học.
