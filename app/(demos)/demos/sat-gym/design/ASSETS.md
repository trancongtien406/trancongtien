# ASSETS — SẬT Gym

13 ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại), 0 ảnh AI. Mỗi ảnh có 3 cỡ webp (-2000/-1200/-600) tại `public/images/demos/sat-gym/`; nguồn/tác giả/sha256 trong `credits.json`. Tất cả hiển thị đen trắng (CSS `grayscale(1) contrast(1.08)`) để đồng bộ tông bê tông dù ảnh gốc khác màu (xanh lạnh, gỗ cam...). Mỗi ảnh chỉ xuất hiện một lần trong trang (e2e kiểm).

| Tệp | Chủ thể | Vị trí dùng |
|---|---|---|
| xuong-be-tong | Nhà tập công nghiệp rộng, cột thép, sương | Hero |
| thanh-xep | Thanh tạ dựng cạnh cột bê tông | Giới thiệu |
| thanh-ta-day | Thanh tạ và dây thừng trên sàn gỗ tối | Chương trình 01 |
| dia-ta | Đĩa tạ trên thảm cao su, nhìn chéo | Chương trình 02 |
| khoi-magie | Bột magie bay quanh đôi tay, ngược sáng | Chương trình 03 |
| tay-xa | Bàn tay nắm xà đỏ, tường gạch | Chương trình 04 |
| san-don | Thanh tạ đen trắng trên sàn rộng | Không gian tập, ô lớn 01 |
| day-thung | Dây thừng treo trên tường xám | Không gian tập 02 (đã cắt phần trên) |
| tay-magie | Tay phủ magie | Không gian tập 03 |
| xa-ngoai | Cánh tay treo xà ngoài trời | Không gian tập 04 |
| ban-chan | Bàn chân trần nhón trên sàn | Không gian tập 05 |
| gia-ta | Giá đĩa tạ trước tường gạch trắng | Không gian tập 06 |
| suong-ta | Thanh tạ đứng một mình trong sương | CTA cuối trang |

Ghi chú trung thực (cần chủ duyệt):
- Ảnh được chọn qua bảng thu nhỏ rồi xem lại ở cỡ lớn các ảnh nghi ngờ (dia-ta, thanh-ta-day, thanh-xep); chưa mở xem từng ảnh ở 2000px.
- `day-thung`: đĩa tạ có chữ hãng rõ ("ROGUE"): chỉ dùng với phần **trên** (scale 1.5 từ đỉnh khung) nên chữ không lọt vào khung; ảnh gốc trong thư mục vẫn có chữ.
- `thanh-ta-day`, `dia-ta`: có chữ dập nổi mờ trên đĩa tạ (không phải logo hãng nhận diện rõ ở kích thước hiển thị, vẫn nên duyệt). `gia-ta` là cảnh giá đĩa xa, không đọc được chữ.
- Ảnh người: chỉ chi tiết tay/chân/cánh tay, không có khuôn mặt nhận diện. `khoi-magie` có thân người cắt ngang, không mặt.
- Chưa có ảnh lưng và kettlebell đúng shot list (không tìm được ảnh không-mặt đủ đẹp, cùng tông).
- `day-thung` có tấm poster trên tường chụp nhóm người nhỏ, mờ; không nhận diện được.
- Ảnh chỉ nhìn đẹp khi hiển thị đen trắng; nếu bỏ filter CSS các ảnh sẽ lệch tông (xanh lạnh / cam gỗ).
