# Đặc tả từ ChatGPT (rút gọn phần đã dùng)

Chat riêng cho LP-03, hai lượt: (1) đặc tả thi công đầy đủ (~97k ký tự), (2) bản dịch EN + microcopy. Quyết định cuối do agent chốt, đối chiếu với repo.

## Đã dùng
- Thương hiệu "Rong Dặm", slogan "Đi một dặm. Thêm một chuyện.", ý tưởng logo The Wandering Trail (đường đi + mặt trời + sao), palette Travel Paper/Deep Forest/Marigold/Terracotta/Coastal Blue/Warm White, token `--rd-*`.
- 6 tour minh hoạ RD-01..RD-06 và bảng giá/vé/giờ/chính sách huỷ A/B; quy ước trẻ em (từ 12 tuổi = người lớn, 5-11 tuổi = giá trẻ em, dưới 5 chưa tính tự động); tối đa 12 khách; phụ thu phòng riêng 600.000 đ/người cho RD-06.
- Trip Finder: lọc cứng theo thời gian + ngân sách (đã gồm vé), chấm điểm 55/20/15/10, tối đa 3 kết quả, lý do giải thích được, không hiển thị "% phù hợp", trạng thái rỗng/lỗi/kết quả cũ.
- Itinerary Explorer: công thức S+T+R, test case giá (RD-01 2NL+1TE = 4.400.000; RD-06 2NL+1TE+1 phòng = 12.355.000), lưu kế hoạch vào localStorage, không có booking ID.
- Cấu trúc section và microcopy VI/EN (British English), FAQ 6 câu, hreflang vi-VN/en/x-default, giữ trạng thái khi đổi ngôn ngữ.

## Không theo
- Đặc tả hero line-height 0.98: đổi thành 1.1 (dấu tiếng Việt chồng bị cắt, theo AGENT-RULES).
- Đường dẫn `public/demos/rong-dam/brand/`: dùng `public/images/demos/rong-dam/identity/` theo AGENT-RULES (CSP/next/image).
- DM Sans: không có glyph tiếng Việt, thay bằng Lexend (xem BRAND.md).
- Route tour chi tiết riêng: không tạo, chọn tour ngay trong trang.
- Ảnh hero "4:5 + 5:4 + 1:1" giữ đúng, nhưng thêm 6 ảnh cho thẻ tour/nhật ký.
