# Ô Lưới · Art direction

Ý tưởng: bản vẽ mặt bằng của một không gian làm việc, đọc như giao diện terminal. Lưới 80px hiện rõ ở nền (cố định), mọi khối bám đường kẻ 1px, nhãn mono viết hoa `[ 03 ] SƠ ĐỒ`, toạ độ A1/B2 làm mã khu. Chỉ ba màu; cam chỉ xuất hiện ở hành động, toạ độ, chỗ đề xuất.

## Bố cục (desktop 1440 / mobile 390)
1. Header cố định 64px: logo ngang, 5 mục đánh số 01-05, đồng hồ "ĐN hh:mm:ss" chạy thật, nút cam. Mobile: logo + nút Menu (dialog, Escape, bẫy focus).
2. Hero: lưới 12 cột có 5 đường dọc + 2 đường ngang vẽ dần; trái: nhãn quét, H1 hai dòng, mô tả, 4 chip loại chỗ, 2 nút; phải: ảnh dãy bàn gỗ 3:2 có thước A-F và 1-4, 24 ô che mở theo đường chéo, ô cam sáng cuối. Dưới: 4 số đếm (40/16/2/4) mã A1-D4. Mobile: một cột, ảnh sau chữ, số liệu 2x2.
3. Dải chạy chữ (velocity) mono 60px.
4. Nguyên tắc: câu tuyên ngôn sáng dần theo cuộn + 4 ô giá trị 2x2 (grid reveal, ô cuối nháy cam).
5. Không gian: 4 thẻ so le (7/5/5/7 cột), mã outline A1-D4, ảnh mở bằng clip-path từ cạnh.
6. Sơ đồ và chọn gói: cột trái 4/12 (số người, ngày/tuần, loại chỗ, giờ cần), cột phải 8/12 (tab ngày, thanh giờ, nút tua giờ, SVG 960x560, chú giải, ô thống kê, thẻ chi tiết ghế); dưới: gói gợi ý, so sánh 3 gói, tóm tắt, hai nút. Mobile: xếp dọc, form trước sơ đồ.
7. Dải chạy chữ viền rỗng, ngược chiều.
8. Nhịp ngày: đồng hồ lớn, đường mật độ vẽ dần, kim "bây giờ", 5 thẻ nhịp ngày (thẻ hiện tại viền cam).
9. Tiện ích: 8 ô 4x2 có mã toạ độ, icon nét 1,5; hàng 3 ảnh.
10. Bảng giá (khối sáng #f4f4f2 duy nhất): 3 thẻ (thẻ giữa nền đen, viền cam xoay), 2 bảng phòng riêng/phòng họp.
11. Quy trình: 4 bước trên đường kẻ, đường cam vẽ theo cuộn (desktop); 2 ảnh.
12. FAQ accordion `details`; Kết: H lớn + nút từ tính; Footer chữ Ô LƯỚI viền rỗng 22vw mở bằng clip-path, 3 cột, dòng ký tên và link "Ảnh & ghi công".

## Chuyển động (ký hiệu)
- Grid reveal (riêng, hero + 4 nhóm ô trong trang): đường lưới vẽ ra, ô hiện theo đường chéo, ô cam sáng cuối (biến `--cg-flash`).
- Text scramble (thư viện TextScramble): mọi nhãn mono `[ 0n ]`, bộ ký tự in hoa/số.
- Live seat map (riêng): trạng thái ghế theo ngày + giờ, chuyển opacity 250ms, hover/bàn phím xem chi tiết, tua giờ, theo giờ thực (UTC+7).
- Cursor crosshair + toạ độ (riêng): hai đường mảnh toàn trang + nhãn "C4 · X0812 Y0340" theo lưới nền 80px, thêm một cặp đường nét đứt riêng trong sơ đồ; chuyển cam khi trên phần tử bấm được; ẩn khi vào ô nhập.
- Đồng hồ + ngày làm việc chạy thật (riêng): header và khu "Nhịp ngày".
- Đường kẻ vẽ dần: SVGPathDraw (đường mật độ, đường quy trình theo cuộn), `.rule` dưới nhãn section.
- Thư viện: SplitWords (tiêu đề), ScrollScrubText (tuyên ngôn), ClipReveal (ảnh), Counter/NumberTicker (số, giá), VelocityMarquee (2 dải), MagneticButton (3 nút), ScrollProgress.
- Reduced-motion: không hiệu ứng, mọi nội dung hiện đủ; crosshair vẫn bám con trỏ nhưng không có chuyển động trễ. Touch: không crosshair, không từ tính.

## Cập nhật 2026-11-25 (xem REWORK.md)
Thứ tự section mới: Hero (3 sự thật) -> Giờ mở cửa -> Giới thiệu -> Loại chỗ và bảng giá -> Không gian -> Sơ đồ chọn chỗ -> Nhịp ngày -> Tiện ích và quy định -> Dùng thử 1 ngày -> Cộng đồng (lịch tháng) -> Đặt chỗ và tham quan -> FAQ -> Đặt lịch. Bỏ hai dải chạy chữ, tuyên ngôn sáng dần, nút từ tính, ClipReveal, SVGPathDraw; ảnh mở bằng lưới ô 4x3 (TileFrame). Mục "Chuyển động" ở trên đã lỗi thời: chỉ còn SplitWords, ScrollProgress, TextScramble, Counter/NumberTicker và các chữ ký riêng liệt kê trong REWORK.md.
