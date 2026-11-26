/** Nội dung tiệm hoa Nở Rừng: bảng giá, thời gian báo trước, hoa định kỳ, hoa theo mùa, chăm hoa. Giá là giá tham khảo. */

export const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n).replace(/ /g, " ");

export type ProductId = "bo" | "lang" | "hop";
export const PRODUCTS: readonly {
  id: ProductId;
  name: string;
  blurb: string;
  use: string;
  tiers: readonly { size: string; price: number; detail: string }[];
}[] = [
  {
    id: "bo", name: "Bó hoa",
    blurb: "Hoa cắm tay, gói giấy kraft hoặc giấy màu, buộc dây gai. Cầm tay hoặc cắm ngay vào bình.",
    use: "Sinh nhật, cảm ơn, xin lỗi, thăm hỏi",
    tiers: [
      { size: "Nhỏ", price: 200000, detail: "Khoảng 9 cành, vừa một tay" },
      { size: "Vừa", price: 400000, detail: "Khoảng 15 cành, ôm gọn" },
      { size: "Lớn", price: 700000, detail: "Khoảng 25 cành, đầy tay" },
    ],
  },
  {
    id: "lang", name: "Lẵng hoa",
    blurb: "Hoa cắm vào lẵng mây có mút giữ nước, đặt thẳng lên bàn hoặc kệ, không cần bình.",
    use: "Khai trương, chúc mừng, để bàn tiếp khách",
    tiers: [
      { size: "Nhỏ", price: 500000, detail: "Lẵng để bàn, nhìn rõ từ một phía" },
      { size: "Vừa", price: 800000, detail: "Lẵng tròn, nhìn được bốn phía" },
      { size: "Lớn", price: 1300000, detail: "Lẵng cao, đặt dưới sàn ở cửa" },
    ],
  },
  {
    id: "hop", name: "Hoa hộp",
    blurb: "Hoa xếp khít trong hộp tròn hoặc vuông có mút giữ nước. Gọn, dễ mang và dễ đặt lên bàn.",
    use: "Quà tặng, kỷ niệm, để bàn làm việc",
    tiers: [
      { size: "Nhỏ", price: 450000, detail: "Hộp tròn, đường kính khoảng 15 cm" },
      { size: "Vừa", price: 700000, detail: "Hộp vuông hoặc tròn, khoảng 22 cm" },
      { size: "Lớn", price: 1000000, detail: "Hộp lớn, nhiều tầng hoa" },
    ],
  },
] as const;

/** Thời gian nên báo trước, tính theo ngày (0 = vài giờ). */
export const LEADS: readonly { id: string; label: string; days: number; text: string; note: string }[] = [
  { id: "bo-co-san", label: "Bó theo mẫu có sẵn", days: 0, text: "ít nhất 3 giờ", note: "Mẫu đang có trong tiệm, nhắn càng sớm càng dễ chọn hoa." },
  { id: "bo-yeu-cau", label: "Bó theo yêu cầu", days: 1, text: "trước 1 ngày", note: "Cần thời gian để chọn hoa đúng tông màu và ngân sách." },
  { id: "lang-hop", label: "Lẵng hoa, hoa hộp", days: 1, text: "trước 1 ngày", note: "Có làm mút giữ nước và chọn hộp, lẵng cho vừa kích cỡ." },
  { id: "khai-truong", label: "Kệ và lẵng khai trương", days: 2, text: "trước 2 ngày", note: "Cần chốt kích thước kệ và nội dung băng rôn chúc mừng." },
  { id: "dinh-ky", label: "Hoa định kỳ (lần đầu)", days: 3, text: "trước 3 ngày", note: "Chốt ngày nhận hằng tuần, cỡ bình và tông màu." },
  { id: "cuoi", label: "Hoa cưới, trang trí tiệc", days: 7, text: "trước 7 ngày trở lên", note: "Trang trí lớn như cổng hoa, backdrop nên báo sớm hơn, tiệm xác nhận khi chốt mẫu." },
] as const;

export const PEAK_NOTE = "Các dịp cao điểm như 8/3, 20/10, 20/11 và cuối năm nhiều đơn hơn bình thường: hãy nhắn sớm hơn các mốc trên để tiệm giữ được hoa.";

/** Hoa định kỳ cho quán, văn phòng: giá mỗi lần, theo cỡ bình. */
export const RHYTHM_SIZES = [
  { id: "nho", label: "Bình nhỏ", price: 300000, hint: "Quầy thu ngân, bàn tiếp tân" },
  { id: "vua", label: "Bình vừa", price: 450000, hint: "Bàn khách, góc quán" },
  { id: "lon", label: "Bình lớn", price: 700000, hint: "Sảnh, quầy lễ tân" },
] as const;
export type RhythmSizeId = (typeof RHYTHM_SIZES)[number]["id"];

export const RHYTHM_FREQ = [
  { id: "tuan", label: "Mỗi tuần", times: 1, per4w: 4, text: "4 lần trong 4 tuần" },
  { id: "hai-tuan", label: "Hai tuần một lần", times: 2, per4w: 2, text: "2 lần trong 4 tuần" },
  { id: "thang", label: "Mỗi 4 tuần", times: 4, per4w: 1, text: "1 lần trong 4 tuần" },
] as const;
export type RhythmFreqId = (typeof RHYTHM_FREQ)[number]["id"];
export const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const;

/** Hoa theo mùa (tham khảo): các tháng thường có hoa tốt. */
const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const SEASONS: readonly { id: string; name: string; months: number[]; note: string }[] = [
  { id: "mao-luong", name: "Mao lương", months: [11, 12, 1, 2, 3], note: "Mát lạnh, cánh mỏng" },
  { id: "tulip", name: "Tulip", months: [11, 12, 1, 2, 3], note: "Quanh Tết và đầu xuân" },
  { id: "mau-don", name: "Mẫu đơn", months: [11, 12, 1, 2, 3, 4], note: "Số lượng ít, nên đặt trước" },
  { id: "huong-duong", name: "Hướng dương", months: [3, 4, 5, 6, 7, 8, 9], note: "Nắng ấm, bông lớn" },
  { id: "cam-tu-cau", name: "Cẩm tú cầu", months: [4, 5, 6, 7, 8, 9, 10], note: "Chùm tròn, tạo khối" },
  { id: "hong", name: "Hoa hồng", months: ALL, note: "Có quanh năm, màu đổi theo đợt" },
  { id: "dong-tien", name: "Đồng tiền", months: ALL, note: "Quanh năm, nhiều màu" },
  { id: "cam-chuong", name: "Cẩm chướng", months: ALL, note: "Quanh năm, bền bông" },
  { id: "cuc-tana", name: "Cúc tana", months: ALL, note: "Quanh năm, bông nhỏ trắng" },
  { id: "baby", name: "Baby", months: ALL, note: "Quanh năm, nhẹ như sương" },
] as const;
export const SEASON_NOTE = "Lịch mùa chỉ mang tính tham khảo: thời tiết và nguồn hoa mỗi tuần mỗi khác, tiệm sẽ báo loại thay thế nếu loại bạn chọn đang khan.";

/** Chăm hoa tại nhà theo ngày. water: độ đục của nước (0..1); change: ngày nên thay nước. */
export const CARE_DAYS: readonly { day: number; title: string; text: string; water: number; change: boolean }[] = [
  { day: 1, title: "Cắt chéo, cắm vào bình sạch", text: "Cắt chéo khoảng 2 đến 3 cm cuống, bỏ lá nằm dưới mặt nước, cắm vào bình đã rửa sạch. Cho vào nước mát.", water: 0.05, change: true },
  { day: 2, title: "Chọn chỗ đặt", text: "Tránh nắng gắt, gió quạt thổi thẳng và gần trái cây chín. Hoa để nơi thoáng mát sẽ giữ dáng lâu hơn.", water: 0.2, change: false },
  { day: 3, title: "Thay nước", text: "Đổ nước cũ, rửa bình, cắt lại cuống một chút rồi thay nước mát. Bỏ những cánh hoặc lá đã héo.", water: 0.1, change: true },
  { day: 4, title: "Xem lại từng cành", text: "Cành nào cuống nhầy hoặc cúi đầu thì cắt ngắn rồi cắm lại. Hoa nở rộ là bình thường, nhất là mẫu đơn và hồng.", water: 0.25, change: false },
  { day: 5, title: "Thay nước lần nữa", text: "Thay nước, rửa bình. Nếu bình hơi cao, có thể tỉa bớt cành rồi cắm bình thấp hơn.", water: 0.1, change: true },
  { day: 6, title: "Gom những bông còn đẹp", text: "Cắt cành tàn, gom những bông còn tươi cắm bình nhỏ ở bàn làm việc hay đầu giường.", water: 0.3, change: false },
  { day: 7, title: "Tuỳ loại hoa và thời tiết", text: "Độ bền của mỗi loại hoa khác nhau và còn tuỳ thời tiết. Nếu muốn, tiệm có thể dặn riêng theo bó của bạn.", water: 0.2, change: false },
] as const;

export const WEDDING = [
  { n: "01", name: "Hoa cầm tay cô dâu", price: "từ 650.000 ₫", note: "Dáng tròn hoặc dáng thác, tông trắng kem điểm hồng. Chốt mẫu theo váy và tông tiệc." },
  { n: "02", name: "Hoa cài áo (một cặp)", price: "từ 150.000 ₫", note: "Cho cô dâu, chú rể hoặc người thân hai bên, cài ghim chắc." },
  { n: "03", name: "Hoa bàn tiệc, bàn gia tiên", price: "từ 350.000 ₫ mỗi bàn", note: "Thấp để không che mặt người đối diện, đủ nhiều lớp để nhìn đẹp từ xa." },
  { n: "04", name: "Cổng hoa, backdrop chụp ảnh", price: "báo giá theo kích thước", note: "Tiệm đo, vẽ phác rồi báo giá. Lắp tại nơi tổ chức, cần báo trước từ 7 ngày." },
] as const;

export const EVENTS = [
  { n: "05", name: "Kệ hoa chúc mừng", price: "từ 900.000 ₫", note: "Hoa rực màu, kèm băng rôn chữ chúc mừng. Hợp ngày khai trương, kỷ niệm thành lập." },
  { n: "06", name: "Lẵng hoa khai trương", price: "từ 800.000 ₫", note: "Màu ấm: vàng, cam, đỏ. Đặt sàn ở cửa hoặc để bàn lễ tân." },
  { n: "07", name: "Hoa để bàn hội nghị, sự kiện", price: "từ 300.000 ₫ mỗi bình", note: "Bình thấp, nhiều bình đồng bộ nhau. Báo số lượng để tiệm tính giá." },
  { n: "08", name: "Hoa tặng khách mời", price: "từ 180.000 ₫ mỗi bó", note: "Bó nhỏ gói giống nhau, làm theo số lượng, có thể kèm thiệp in tên sự kiện." },
] as const;

export const WEDDING_POLICY = [
  "Đơn cưới và sự kiện chốt mẫu qua tin nhắn hoặc gặp tại tiệm, sau đó đặt cọc 30% để giữ hoa.",
  "Đổi mẫu hoặc số lượng: báo trước 3 ngày. Huỷ đơn sau khi tiệm đã mua hoa thì tiệm giữ lại phần chi phí hoa đã nhập.",
  "Tiệm có thể thay loại hoa tương đương về màu và dáng nếu loại đã chọn khan, và sẽ báo lại trước khi làm.",
] as const;

export const ORDER_STEPS = [
  { n: "1", t: "Nhắn dịp và người nhận", d: "Cho biết dịp, ngày nhận hoa, ngân sách và tông màu bạn thích." },
  { n: "2", t: "Tiệm báo mẫu và giá", d: "Tiệm gợi ý bó, lẵng hoặc hộp, xác nhận hoa đang có và giá cuối cùng." },
  { n: "3", t: "Chốt và thanh toán", d: "Đơn thường thanh toán khi chốt. Đơn cưới và sự kiện đặt cọc như mục chính sách." },
  { n: "4", t: "Nhận hoa", d: "Đến nhận tại tiệm hoặc nhờ tiệm gửi tới người nhận. Khu vực và phí gửi xác nhận riêng cho từng đơn." },
] as const;
