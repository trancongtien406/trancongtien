# Đặc tả từ ChatGPT (chế độ khách, rút gọn)

Gửi một câu rút gọn (ChatGPT chỉ dùng được ở chế độ khách, không đăng nhập), đọc đủ phản hồi rồi đóng tab. Không gửi thông tin cá nhân/đường dẫn máy.

## ChatGPT đề xuất (dùng được)
- 3 tên: MởLời ("Mở ngôn ngữ, mở tương lai"), LingGo, Chạm Ngữ. Chọn **Mở Lời** (thuần Việt, dễ đọc dấu).
- Logo: bong bóng hội thoại + dấu tick vàng + chấm hồng. (Đã dựng: bong bóng xanh #1d4ed8, tick vàng, chấm hồng.)
- Hero chữ đổi ngôn ngữ: mỗi lượt khoảng 2.8s (fade out 250ms, trượt lên 350ms, giữ ~1.7s), easing cubic-bezier(.22,1,.36,1), màu nhấn luân phiên; hover/focus tạm dừng; nút Tạm dừng/Tiếp tục; dừng khi ẩn tab; reduced-motion = chữ tĩnh; `aria-live="off"`; giữ bề rộng vùng chữ ổn định.
- Flip card: lật 450ms, easing cubic-bezier(.2,.8,.2,1), rotateY(180deg), hover nâng 4px; Enter/Space lật, Esc về mặt trước.
- Bubble chat: bubble đầu 300ms, các bubble sau cách 900ms, hiện bằng fade + translateY(10px), typing 600ms trước mỗi tin; Play/Pause/Replay; role="log" aria-live="polite"; không đọc lại toàn bộ.

## Phần tự quyết (ChatGPT không trả lời hoặc không hợp repo)
- Thời gian thực tế: giữ 2.3s mỗi từ (nhanh hơn 2.8s để chữ chào lặp đủ 4 ngôn ngữ trong khung hero); vào 0.6s back.out, ra 0.32s. Chữ cắt theo ký tự có mặt nạ đệm cho dấu tiếng Việt.
- Thẻ lật: thêm "Lật tất cả" và bộ đếm; bỏ nút "Đã nhớ/Ôn lại" để tránh lồng nút tương tác trong thẻ.
- Bubble chat: thêm bấm vào bong bóng để xem nghĩa tiếng Việt thay vì phát âm (không dùng audio).
- Palette, font (Baloo 2 + Nunito), bố cục panel bo lớn, bảng giá, lịch lớp, Level Test: tự quyết (xem ART-DIRECTION.md).
- Không lấy phần "đặt tên/slogan" khác của ChatGPT; slogan tự viết.
