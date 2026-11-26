# ART-DIRECTION: Đất Mơ (cập nhật 2026-11-25, xem REWORK.md)

Ý tưởng: website của một xưởng gốm thủ công ở Quận Ngũ Hành Sơn, Đà Nẵng. Bình SVG quay trên bàn xoay là điểm nhấn; phần còn lại là thông tin xưởng thật: gốm bán có giá, workshop có lịch, đặt riêng, chăm sóc, chính sách, giờ mở cửa.

| Section | Nội dung | Hiệu ứng |
|---|---|---|
| Hero | Nhãn viết tay (loại hình + quận), H1 khắc vào đất, mô tả đối tượng, CTA "Đặt chỗ workshop", 3 sự thật (từ 250.000 ₫/người, tối đa 8 người, 09:00 đến 20:00), bàn xoay + bình nặn được, ảnh vòm | Bình nặn từ cục đất, chữ khắc, ring chữ xoay theo cuộn, đất nén rồi nở |
| 3 đường vào | Mua gốm, Học làm gốm, Đặt theo yêu cầu (có giá từ) | Đất nén rồi nở; hover viền ngọc |
| Gốm bán tại xưởng | 12 món, 4 nhóm lọc (cốc, bát, bình, bộ quà) kèm giá từ, kệ kéo ngang | DraggableGallery, ImageHoverDistort, bình SVG tự quay |
| Workshop | Lịch lớp tuần (14 buổi), 3 buổi (thời lượng, giá, đã gồm, phù hợp), số người, khung giờ, nung, tờ tóm tắt, chính sách cọc/dời/huỷ/lấy món | Ô lịch bấm điền sẵn; ô chọn nén xuống |
| Từ đất đến men | 5 bước đất, nặn, phơi, nung mộc, men; ghi thời gian lấy món tuỳ lò | Vết nung theo cuộn: nền đất sống, lửa, men; nhiệt kế; đường cong |
| Đặt theo yêu cầu | Quà tặng, gốm làm riêng, doanh nghiệp (mô tả chung, báo giá theo đơn) | Hover men xanh ngọc chảy từ trên xuống |
| Phác bình | Pot Designer: gửi mã phác thảo cho xưởng | Bình nội suy dáng |
| Về xưởng | Ảnh bàn xoay khung vòm + đoạn giới thiệu | ClipReveal circle, ScrollScrubText |
| Chăm sóc và sử dụng | 6 mục: rửa, sốc nhiệt, lò vi sóng, đựng đồ ăn, cất giữ, vết nứt | Đất nén rồi nở |
| Xưởng và giờ mở cửa | Giờ mở, nghỉ Thứ Hai, 4 góc xưởng, khu vực | Chữ khắc |
| FAQ, kết | 9 câu; CTA gửi yêu cầu | Chữ khắc |

Ngôn ngữ chuyển động: đất nén rồi nở (back.out) + men chảy; không fade-up chung, không marquee, không từ tính, không parallax, không thanh tiến độ. Hiệu ứng đại trà giữ: ClipReveal, ScrollScrubText. Mobile: tắt méo ảnh; reduced-motion: chữ khắc hiện đủ, bình đứng yên, vết nung tĩnh.
