import type { StyleId } from "./content";

export const FACTS = [
  { k: "Giá gói từ", v: "5.900.000 đ" },
  { k: "Giao ảnh chỉnh sửa", v: "14–45 ngày" },
  { k: "Giờ tư vấn", v: "08:30–18:30, T2–T7" },
];

export const SERVICES = [
  { id: "studio", n: "01", name: "Pre-wedding trong studio", img: "thiep", pos: "50% 40%", text: "Buổi chụp 3 giờ trong studio có cửa sổ lớn, phông giấy và phụ kiện. Không phụ thuộc mưa nắng, hợp cặp đôi muốn gọn một buổi.", meta: ["3 giờ", "2 trang phục", "30 ảnh chỉnh sửa"], pkg: "TM-P01" },
  { id: "outdoor", n: "02", name: "Pre-wedding ngoại cảnh", img: "hoang", pos: "50% 55%", text: "Một ngày chụp ở hai địa điểm quanh Đà Nẵng: sáng sớm ở biển hoặc bán đảo, cuối chiều ở vườn hoặc phố cũ, theo giờ ánh sáng đẹp.", meta: ["8 giờ", "3 trang phục", "60 ảnh chỉnh sửa"], pkg: "TM-P02" },
  { id: "day", n: "03", name: "Phóng sự cưới ngày cưới", img: "ban", pos: "50% 55%", text: "Hai nhiếp ảnh đi cùng từ lúc chuẩn bị đến hết tiệc, ghi lại lễ gia tiên, đón dâu, nghi thức và tiệc theo trình tự thật của ngày hôm đó.", meta: ["10 giờ", "2 nhiếp ảnh", "300 ảnh chỉnh sửa"], pkg: "TM-P03" },
  { id: "print", n: "04", name: "Album, ảnh in và file", img: "album", pos: "60% 50%", text: "Album dàn trang riêng cho từng bộ ảnh, ảnh in khung treo tường và file ảnh chỉnh sửa để lưu trữ. Mua kèm gói hoặc mua riêng sau buổi chụp.", meta: ["Duyệt layout trước khi in", "Sửa tối đa 2 lần"], pkg: null },
] as const;

export const ADDONS = [
  { name: "Album 20×20 cm, 20 trang", note: "Bìa vải, giấy ảnh mờ, hộp đựng", price: 2800000 },
  { name: "Album 25×25 cm, 30 trang", note: "Bìa da PU, dàn trang tràn viền", price: 4200000 },
  { name: "Ảnh in 20×30 cm", note: "Giấy ảnh cao cấp, giá mỗi ảnh", price: 90000 },
  { name: "Ảnh đóng khung 40×60 cm", note: "Khung gỗ, kính, kèm móc treo", price: 650000 },
  { name: "Thêm ảnh chỉnh sửa", note: "Giá mỗi ảnh ngoài số ảnh của gói", price: 120000 },
  { name: "File ảnh gốc chưa chỉnh", note: "Gửi qua link tải về, giữ 12 tháng", price: 1500000 },
  { name: "Thêm giờ chụp", note: "Giá mỗi giờ, tuỳ lịch còn trống", price: 600000 },
];

export const WARDROBE = {
  cols: ["Studio", "Ngoại cảnh", "Phóng sự"],
  rows: [
    { item: "Thuê váy cưới và vest từ kho studio", v: ["2 bộ", "3 bộ", "Không"] },
    { item: "Trang điểm cô dâu", v: ["2 kiểu", "3 kiểu", "Không"] },
    { item: "Làm tóc chú rể", v: ["Có", "Có", "Không"] },
    { item: "Chỉnh lại trang điểm giữa buổi", v: ["Không", "Có", "Không"] },
    { item: "Phụ kiện: voan, khăn, nơ, giày", v: ["Có", "Có", "Không"] },
    { item: "Hoa cầm tay", v: ["Không", "Không", "Không"] },
  ],
  note: "Váy và vest được thử trước ngày chụp tại studio để chỉnh vừa người. Hoa cầm tay là hạng mục riêng, studio có thể giới thiệu cửa hàng hoa.",
};

export const STYLE_INFO: Record<StyleId, { where: string; light: string; wear: string; months: string }> = {
  coastal: { where: "Bãi biển, bán đảo ven biển", light: "05:30–07:00 hoặc 16:30–17:45", wear: "Váy voan nhẹ, vest lanh sáng màu", months: "Tháng 3–8 ít mưa nhất" },
  garden: { where: "Sân vườn, nhà vườn, công viên nhiều cây", light: "07:00–09:00 hoặc 15:30–17:00", wear: "Váy ren xoè, vest xanh rêu hoặc be", months: "Tháng 2–8" },
  classic: { where: "Biệt thự cũ, phố cổ, quán cà phê có nội thất gỗ", light: "08:00–10:30 hoặc 15:00–16:30", wear: "Váy cổ vuông tay phồng, vest đen hoặc nâu", months: "Quanh năm, nhiều chỗ có mái che" },
  minimal: { where: "Studio có cửa sổ lớn, tường trắng, hành lang bóng đổ", light: "10:00–15:00 (ánh sáng cửa sổ)", wear: "Váy suông tối giản, áo sơ mi và quần tây", months: "Quanh năm, không phụ thuộc mưa" },
};

export const POLICIES = [
  { t: "Đặt cọc và giữ lịch", d: "Cọc 30% giá gói để giữ ngày chụp. Phần còn lại thanh toán trong ngày chụp, riêng album và ảnh in thanh toán khi nhận." },
  { t: "Huỷ lịch", d: "Huỷ trước ngày chụp ít nhất 14 ngày: bảo lưu cọc để đặt ngày khác trong 6 tháng. Huỷ muộn hơn: không hoàn cọc." },
  { t: "Dời lịch", d: "Một lần dời miễn phí nếu báo trước ít nhất 3 ngày. Từ lần thứ hai phụ thu 500.000 đ." },
  { t: "Thời tiết", d: "Quyết định chụp hay dời trước giờ chụp ít nhất 6 giờ, dựa trên dự báo. Dời vì mưa không mất phí; có thể chuyển sang chụp trong studio." },
  { t: "Giao ảnh và chỉnh sửa", d: "Thời gian giao tính từ ngày hai bạn chốt danh sách ảnh. Album được sửa layout tối đa 2 lần trước khi in." },
  { t: "Quyền sử dụng ảnh", d: "Studio chỉ đăng ảnh của hai bạn khi có đồng ý bằng văn bản. Hai bạn được dùng ảnh cho mục đích cá nhân và chia sẻ mạng xã hội." },
];

export const SEASONS = [
  { id: "m1", label: "Tháng 1–2", rise: 6 * 60 + 30, set: 17 * 60 + 40, note: "Nắng dịu, hay có ngày se lạnh buổi sáng. Thỉnh thoảng có mưa phùn." },
  { id: "m2", label: "Tháng 3–5", rise: 5 * 60 + 50, set: 17 * 60 + 55, note: "Trời trong, ít mưa. Giờ vàng cuối chiều kéo dài, rất hợp biển." },
  { id: "m3", label: "Tháng 6–8", rise: 5 * 60 + 25, set: 18 * 60 + 10, note: "Nắng gắt từ 10:00 đến 15:00. Nên chụp sáng sớm hoặc sau 16:30." },
  { id: "m4", label: "Tháng 9–12", rise: 5 * 60 + 50, set: 17 * 60 + 20, note: "Mùa mưa bão, cần phương án dự phòng trong nhà." },
] as const;
