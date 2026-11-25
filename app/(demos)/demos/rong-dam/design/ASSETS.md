# ASSETS: ảnh và nhận diện

12 ảnh stock chụp thật (Unsplash ×11, Pexels ×1), **0 ảnh AI**, webp 2000/1200/600, đã tự mở xem từng ảnh. Chi tiết nguồn/tác giả/giấy phép/sha256 trong `public/images/demos/rong-dam/credits.json` và `/demos/rong-dam/credits`.

| File | Chủ đề | Vị trí dùng |
|---|---|---|
| hoi-an-song-den | thuyền gắn đèn lồng, sông Hội An chiều muộn (4:5) | hero collage (ảnh chính) |
| ba-na-hoang-hon | Cầu Vàng bình minh nhìn từ trên (5:4) | hero collage |
| den-long-hoi-an | đèn lồng lụa trước tường vàng (dọc) | hero collage |
| ba-na-bien-may | Cầu Vàng trên biển mây | thẻ RD-01 |
| hoi-an-cau-chua | Chùa Cầu, kênh, nhà tường vàng | thẻ RD-02 |
| my-son-thap | tháp gạch Chăm Pa rêu phong (Pexels) | thẻ RD-03 |
| son-tra-phat | tượng Phật trắng trong sương (nhãn Linh Ứng/Sơn Trà) | thẻ RD-04 |
| hue-dai-noi | sân gạch, điện mái ngói tường vàng kiểu cung đình | thẻ RD-05 |
| da-nang-cau-rong | Cầu Rồng và sông Hàn buổi sớm | thẻ RD-06 |
| cao-lau | hai tô mì kiểu cao lầu | nhật ký (Ăn) |
| ba-na-suong | bàn tay đá, lan can vàng trong sương | nhật ký (Mây) |
| da-nang-bo-bien | bờ biển Đà Nẵng nhìn từ trên, sóng trắng | nhật ký (Biển) |

Đã loại: ảnh phố Hội An có biển hiệu/menu thật rõ nét, bánh mì có giấy lót in chữ thương hiệu, đồ ăn nền có bảng hiệu, tháp Chăm gắn nhãn Quy Nhơn (không phải Mỹ Sơn), ảnh Cầu Vàng thứ ba trùng chủ đề.
Xử lý: làm mờ vùng nhỏ có chữ/nhãn (xô sơn ở hoi-an-song-den); cắt bỏ cạnh phải ảnh den-long-hoi-an (đèn pha in logo; thử làm mờ trước đó để lại vệt xấu). Tên file den-long-hoi-an do đổi từ hoi-an-long-den để vượt cache next/image. Ảnh có người đều ở xa, không nhận diện mặt.
**Cần chủ duyệt:** nhãn địa danh của my-son-thap, son-tra-phat, hue-dai-noi theo mô tả của nguồn, chưa xác minh độc lập.
Ghi công ảnh nằm ở trang credits (link "Ảnh & ghi công" ở footer); không có chip trên từng ảnh.

## Nhận diện
SVG đủ bộ + favicon + apple-touch-icon + og-image, sinh bằng `fontTools` (wordmark thành path) và `sharp`. Xem BRAND.md.
