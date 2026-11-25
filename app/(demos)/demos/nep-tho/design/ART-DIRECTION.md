# ART DIRECTION — Nếp Thở

DNA: Movement lifestyle, ngôn ngữ viên thuốc (capsule) cho nút/chip/ảnh/ô lịch; lịch tuần là trung tâm. Khác 7 demo: không vòm, không poster viền đậm, không tạp chí, không full-bleed, không zine, không tối-vàng, không lưới Swiss.
- Header: viên thuốc nổi (sticky), logo trái, menu giữa, CTA apricot. Mobile: nút burger tròn, panel thả xuống.
- Hero (desktop): 6/6. Trái: eyebrow, H1 Lexend 600 cỡ 80px (3 dòng), lead, 2 CTA, microcopy. Phải: ảnh reformer dạng viên thuốc dọc 58% rộng × 620px, ảnh bàn tay hình tròn lệch xuống, con dấu forest 120px chứa symbol, thẻ "33 buổi mỗi tuần". Đáy: đường kẻ + 2 dòng nhỏ. Mobile: chữ trước, cụm ảnh 380px, CTA full-width.
- Ribbon: dải sage 76px, bốn từ ngăn bằng chấm apricot; mobile lưới 2×2, không marquee.
- Timetable (S03): khối sage bo 48px. Thanh tuần (‹ ›), 3 nhóm chip lọc, đếm buổi, 7 cột ngày (đầu cột viên forest), ô lớp bo 24px (trắng/kem/sage theo loại), nhãn chỗ có chữ + hình dấu (tròn/vuông/rỗng). Mobile: 7 tab ngày + danh sách dọc (ô lớp lưới 76px thời gian + nội dung). Dialog giữa màn hình (desktop) / bottom sheet (≤560px).
- Lớp tập: hàng 1 hai ảnh elip 16:10, hàng 2 bốn ảnh viên dọc 3:4.2; số thứ tự, chip thông tin.
- Class Finder: khối forest bo 48px, 5/7; panel bên phải có thanh tiến trình 4 đoạn, lựa chọn dạng viên, trạng thái lỗi, kết quả, gate an toàn.
- Không gian: ảnh vòm-trên 160px (4:5), cột chữ + 3 giá trị, 2 viên ảnh dọc. HLV: ba thẻ bo 48px với monogram tròn (không dùng ảnh người). Gói tập: nền sage bo trên 64px, ba thẻ (thẻ giữa forest), dải giá lẻ dạng viên. Buổi đầu: 4 vòng số 80px nối bằng đường chấm. FAQ: accordion `details` dạng viên. Closing: khối apricot bo 48px + ảnh viên. Footer 4 cột.
- Motion (GSAP, chỉ transform/opacity, không lặp vô hạn): hero ≤1.5s (ảnh viên nở 0.96→1, chữ lên theo cụm, ảnh nhỏ trôi lên, symbol xoay -12°→0); cuộn 1: các cột ngày của lịch nở lần lượt (stagger 70ms); cuộn 2: các bước "Buổi đầu tiên" nối nhau; reveal khối khi vào màn hình, một lần. reduced-motion: không hiệu ứng, nội dung hiện đủ.
- Tương tác: Weekly Timetable (33 buổi, 4 tuần, lọc AND, dialog chi tiết lớp và "Lưu tóm tắt lớp" không tạo đặt chỗ, CTA → buildConsultHref('nep-tho')); Class Finder 4 câu, thuật toán xác định, safety gate. Link "Xem giờ tập" ở lớp/HLV/Finder phát sự kiện `nt:filter` để Timetable lọc và cuộn.
