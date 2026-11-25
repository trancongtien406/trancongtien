# Đặc tả từ ChatGPT (rút gọn phần dùng được) — LP-07 Nếp Thở

Nguồn: một đoạn chat riêng (đặc tả V1.0, hai lượt "tiếp"). Đã đọc đủ; đối chiếu với repo, phần không hợp bị bỏ (ghi ở cuối).

## Dùng nguyên hoặc gần nguyên
- Slogan "Chuyển động nhẹ nhàng. Sống theo nhịp mình."; tagline "Mỗi ngày, một nhịp thở."; hero "Tìm lại nhịp chuyển động của riêng mình."; closing "Hẹn mình một nhịp thở."; microcopy "Không cần hoàn hảo để bắt đầu." Không dùng ký hiệu ®.
- Palette: Warm Cream #F7F4EC, Soft Sage #E6E9DF, Deep Forest #303E34, Muted Olive #A8B5A2, Apricot #E8B17B (màu nhấn), Clay Sand #D9C9B7; chữ phụ #566357. Không dùng Olive/Apricot làm chữ nhỏ trên cream.
- Hình học: nút/chip 999px, ảnh hero dạng viên thuốc, thẻ 24–48px, dialog 32px; không bo tròn mọi thứ.
- 13 section S00–S12; 6 lớp (Reformer Khởi đầu/Flow, Mat Pilates, Yoga Flow/Nền tảng/Chậm), 3 HLV (hồ sơ do thương hiệu dựng, không chứng chỉ/số năm) (An, Mây, Lam), fixture 33 buổi/tuần (5 khung 06:30, 09:00, 12:15, 18:00, 19:15), 3 gói (Nhịp đầu 250.000đ, Nhịp đều 1.600.000đ, Nhịp riêng 2.800.000đ), giá lẻ 300.000/180.000đ, 8 FAQ.
- Timetable: lọc AND (loại, cấp độ, HLV, lớp), đếm buổi tính từ kết quả, nút đặt lại, 4 tuần, trạng thái còn/ít (≤2)/hết chỗ có nhãn chữ, dialog chi tiết lớp có "Lưu tóm tắt lớp", không nói "thành công", mobile chọn ngày + danh sách.
- Class Finder 4 câu (mục tiêu, kinh nghiệm, giờ, lưu ý), thuật toán xác định (bảng điểm mục tiêu/kinh nghiệm/giờ, loại lớp nâng cao khi chưa quen), tối đa 2 lớp, safety gate: có lưu ý sức khoẻ hoặc không muốn trả lời thì KHÔNG gợi ý lớp, chỉ hiện lưu ý hỏi bác sĩ + xem toàn bộ lịch. Không lưu gì.
- Motion "Breathing Rhythm": hero ≤1.5s, cuộn 1 lịch tuần (stagger), hover trong hover:hover, reduced-motion bỏ hết, KHÔNG animation lặp vô hạn.
- JSON-LD: không dùng (chỉ cho phép WebPage; bỏ để tránh rủi ro). Title/description riêng, noindex.

## Khác với đặc tả (quyết định của agent)
- Font: Sora KHÔNG có subset tiếng Việt (chỉ latin + latin-ext, thiếu ế ở ơ ạ…). Thay heading bằng Lexend (OFL, có vietnamese, hình học thân thiện, chưa demo nào dùng). Body vẫn Mulish.
- Logo: tự vẽ "viên thuốc xoay -38°, chia bởi đường cong thở, nửa Apricot" thay vì "Breathing Loop" hai vòng cong stroke; wordmark "Nếp Thở" viết hoa N/T (không lowercase) dựng thành path từ Lexend 600.
- Tuần cố định 23/11–20/12/2026 (không lấy ngày hiện tại, tránh lệch hydrate và test chập chờn) nên không có trạng thái "Đã qua giờ".
- Không làm dialog "Xem gói tập" và 2 parallax cuộn của S06 (bỏ cho nhẹ); cuộn 2 là các bước "Buổi đầu tiên" nở lần lượt.
- Hero không có Nav opacity 0.7→1; ảnh phụ là bàn tay trên thảm (không có ảnh chân đặt footbar), vài ảnh lớp Reformer là ảnh bàn chân/dáng lưng vì stock reformer có người đều lộ mặt.
- Tablet 768 và 1920 chỉ kiểm tràn ngang/ảnh hero, không chụp từng trạng thái.
