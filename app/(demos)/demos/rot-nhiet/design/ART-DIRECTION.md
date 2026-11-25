# ART DIRECTION - Rót Nhiệt Coffee

Ý tưởng: "Living Poster" - cả trang là một tập áp phích in được dán lên tường: khối màu phẳng, viền Ink 3px, bóng cứng (không blur), chữ khổng lồ, bố cục lệch. Khác hẳn spa (vòm organic, serif mảnh) và nội thất (lưới tạp chí kiến trúc, serif/mono mảnh): ở đây không có bo tròn, không serif, không lưới đều; nền đổi cứng giữa Paper / Heat / Gray / Ink.

## Section (desktop 1440 / mobile 390)
| # | Section | Desktop | Mobile |
|---|---|---|---|
| 0 | Header sticky | logo ngang trái, 6 link giữa, nút "Làm web như thế này" (Ink) + nút Khay (đỏ, đếm ly), viền dưới 3px | logo nhỏ + Khay + hamburger, panel link xổ xuống |
| 1 | Hero kinetic | hàng meta viền 44px; 12 cột: chữ 7 (RÓT / NHIỆT. cỡ 16vw, "Đánh thức vị giác." khối Ink, mô tả, 2 CTA) + khung đỏ 5 cột với ảnh 4:5 và tem tròn xoay -8°; dải Ink cuối | cột đơn: meta, chữ 30vw, CTA full width, ảnh, tem |
| 2 | Heat Strip | dải đỏ 108px chữ ĐẬM ✳ THƠM ✳ RANG ✳ RÓT trôi ngang theo cuộn | 76px |
| 3 | Menu | tiêu đề "UỐNG GÌ?"; thanh lọc 4 nhóm trong khung 3px; lưới 3 cột 18 card (thanh mã món, ảnh 4:3 cắt riêng từng món, tên, mô tả, thẻ độ đậm/sữa/nhiệt độ, giá, chọn Nóng/Lạnh, nút thêm) | 1 cột, card ngang ảnh 36% |
| 4 | Selector | nền đỏ; tiêu đề + khối giải thích 4 cột; phiếu khảo sát Paper 8 cột có bóng cứng 10px, tiến trình 3 ô, đáp án khối 64px | panel full width |
| 5 | Hạt | nền Gray; 3 card (dải mã màu Ink/Đỏ/Paper, ảnh, thông số, thang độ đậm/chua, giá, "Xem cách pha" mở inline) | 1 cột |
| 6 | Từ hạt đến ly | 4 ô viền chung, ảnh vuông + số 01-04 lớn; ô 02 là khối đỏ "230°C" | 4 hàng ngang ảnh 38% |
| 7 | Manifesto | nền Ink; câu tuyên ngôn cỡ lớn sáng dần từng từ; ảnh 4:5 có bóng đỏ lệch | tiêu đề, ảnh, chuyện, CTA |
| 8 | FAQ | tiêu đề 4 cột + 8 `<details>` (mở 1 tại một thời điểm), số đỏ, dấu +/- | xếp dọc |
| 9 | Final poster + footer | nền đỏ "HẸN NHAU Ở MỘT LY CÀ PHÊ." + ảnh pour-over 3:4; footer Ink với "RÓT NHIỆT." cỡ khổng lồ, link Credits ảnh, dòng ký tên | xếp dọc |

## Motion (GSAP, chỉ transform/opacity, tắt hoàn toàn khi reduced-motion)
- Hero (~1.3s, chồng thời gian): meta trượt xuống; từng ký tự RÓT/NHIỆT. rơi lên (stagger 60ms); khung ảnh trồi lên; tem "đóng dấu" (scale 1.8 + xoay -40° về -8°, back.out); ttiêu đề phụ trượt ngang; mô tả/CTA hiện.
- Scroll moment 1: dải nhiệt trượt ngang theo cuộn (scrub 0.6), không pin.
- Scroll moment 2: manifesto - từng từ sáng dần 0.18 -> 1 theo cuộn.
- Reveal: khối section hiện lên 40px/0.7s một lần.
- Hover (chỉ `(hover:hover) and (pointer:fine)`): nút dịch (-3,-3) kèm bóng cứng; drawer trượt 280ms. Không marquee vô hạn, không parallax chữ.
- Ẩn trạng thái đầu chỉ khi JS đã chạy (`html[data-rn-js]`), kèm failsafe CSS 3.5s tự hiện nếu JS không hydrate.

## Tương tác
- Interactive Menu: lọc Loại/Độ đậm/Nhiệt độ/Sữa (AND), rỗng có nút xóa lọc, thêm vào Khay (nóng/lạnh theo bộ lọc hoặc chọn trên card), tối đa 9 ly/dòng và 30 ly/khay, tổng tạm tính giả định, lưu `rn:tray:v1`, drawer là `<dialog>` modal (Escape đóng, trả focus), làm trống có xác nhận trong khay, "Hoàn tất" chỉ tóm tắt, không tạo đơn.
- Coffee Selector: 3 câu radio (bàn phím: mũi tên/Space chọn, Enter sang tiếp), lỗi "Chọn một đáp án để đi tiếp." (role=alert, aria-invalid), quay lại giữ đáp án, kết quả = hạt + cách pha + 2 ly gợi ý thêm được vào khay, "Thử lại từ đầu". Luật: cộng điểm cố định (`data/selector.ts`), hoà điểm ưu tiên câu 1.

## Lý do khác biệt (để reviewer đối chiếu)
Chỉ thay ảnh bằng khối xám + bỏ logo vẫn nhận ra: chữ Anybody 900 cỡ 16vw, viền Ink 3px mọi khối, bóng cứng, 4 nền phẳng đổi cứng, dải chữ trôi, phiếu khảo sát, thanh mã M01-M18 trên card.
