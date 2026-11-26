# REWORK (2026-11-25) — Tần Số Studio (phòng thu âm)

## (a) Đánh giá đề tài
Trước: áp phích "Bắt đúng tần số" + công cụ ước tính; hero chưa nêu khu vực/đối tượng/CTA đặt lịch, thiếu sản xuất beat, giao file và số lần chỉnh sửa, chính sách cọc/dời lịch, giờ làm, gói trọn bài; 7 hiệu ứng đại trà. Sau: website một phòng thu âm ở Quận Hải Châu, Đà Nẵng cho ca sĩ, ban nhạc, podcaster, đơn vị làm quảng cáo. Không showreel/khách/giải thưởng; thiết bị theo loại, không tên hãng; âm thanh chỉ phát khi bấm "Nghe thử".

## (b) Section thật của ngành (12)
Hero (loại hình + khu vực + 3 sự thật + CTA Đặt lịch thu) → dải VM → Dịch vụ 6 kênh (thu giọng/band/podcast/voice-over/beat/mix-master) → Quy trình 5 chặng → Giao file & chỉnh sửa → Phòng & thiết bị theo loại → Mix & master (kiểm 4 hệ nghe) → Bảng giá giờ + 4 gói → Ước tính buổi thu (công cụ, chỉ một section) → Đặt lịch, giờ làm, cọc/dời/huỷ → FAQ 9 → Liên hệ.

## (c) Kế hoạch nội dung
data/content.ts (FACTS, GEAR, PACKAGES, DELIVERY, BOOKING, FAQ 9, STAGES có thời gian); lib/estimator.ts thêm kênh Sản xuất beat; Sections.tsx viết lại; FileSizer.tsx mới; layout.tsx/meta.ts cập nhật.

## (d) Hiệu ứng trước/sau (ma trận)
Trước: đại trà 7 (SW, CR, PL, SST, VM, MB, PD), chữ ký thư viện 6. Sau: đại trà 2 (VelocityMarquee: dải dịch vụ/giá/giờ; MagneticButton: CTA đặt lịch) | chữ ký thư viện 6 (TextScramble, CustomCursor, CursorSpotlight, DraggableGallery, GrainOverlay, NumberTicker). Bỏ: SplitWords, ClipReveal, ParallaxLayer, ScrollScrubText, SVGPathDraw (không thay bằng đại trà khác).
Ngôn ngữ chuyển động chính: "playhead quét" (vạch cam chạy trái sang phải làm lộ khối, biến --rv + clip-path) và "mức VU dâng" (ảnh lộ từ đáy lên). Hover thẻ gói: nền cam dâng từ đáy.

## Chữ ký riêng (file, mô tả)
1. HeroWave (components/Viz.tsx): waveform canvas phản ứng con trỏ + cuộn + phổ thật khi nghe thử.
2. Kênh mixer M/S + Fader (Tracks.tsx, Fader.tsx): fader kéo/phím, Mute/Solo, VU từng kênh, giá cạnh kênh.
3. Timeline playhead (Timeline.tsx): playhead quét theo cuộn, clip 5 chặng sáng khi đi qua.
4. Vinyl (Vinyl.tsx): đĩa than quay 540 độ theo cuộn, cần gạt nghiêng.
5. FileSizer (FileSizer.tsx, mới): tính dung lượng file giao theo độ dài bài, định dạng, số stem từ bitrate thật.
6. Chuỗi tín hiệu (Sections.tsx + CSS): nét sóng chảy, 5 khối thiết bị sáng lần lượt.
7. Playhead quét/VU dâng (Motion.tsx): ngôn ngữ chuyển động chính.
Còn yếu: chưa nghe âm thật qua loa; ảnh hero là ảnh crop hơi mềm.
