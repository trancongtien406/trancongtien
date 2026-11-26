import type { Pattern, Shape } from "../lib/pot";

export const AREA = "Quận Ngũ Hành Sơn, Đà Nẵng";

export const NAV = [
  { href: "#ke-gom", label: "Gốm bán" },
  { href: "#buoi-lam-gom", label: "Workshop" },
  { href: "#tu-dat-den-men", label: "Từ đất đến men" },
  { href: "#dat-theo-yeu-cau", label: "Đặt riêng" },
  { href: "#cham-soc", label: "Chăm sóc" },
  { href: "#gio-mo-cua", label: "Giờ mở cửa" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const FACTS = [
  { b: "Từ 250.000 ₫/người", s: "workshop đã gồm đất, dụng cụ, người hướng dẫn" },
  { b: "Tối đa 8 người", s: "một lớp nặn tay, bàn xoay hoặc vẽ men" },
  { b: "09:00 đến 20:00", s: "Thứ Ba đến Chủ Nhật, nghỉ Thứ Hai" },
] as const;

export const PATHS = [
  { href: "#ke-gom", k: "Mua gốm", t: "Cốc, bát, bình, bộ quà làm tại xưởng", s: "Giá từ 145.000 ₫" },
  { href: "#buoi-lam-gom", k: "Học làm gốm", t: "Nặn tay, bàn xoay, vẽ men; 90 đến 120 phút", s: "Từ 250.000 ₫/người" },
  { href: "#dat-theo-yeu-cau", k: "Đặt theo yêu cầu", t: "Quà tặng, bộ đồ ăn, đặt cho doanh nghiệp", s: "Báo giá theo số lượng" },
] as const;

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export const CATS = [
  { id: "coc", name: "Cốc và ly" },
  { id: "bat", name: "Bát và đĩa" },
  { id: "binh", name: "Bình và lọ" },
  { id: "qua", name: "Bộ quà và bộ trà" },
] as const;
export type CatId = (typeof CATS)[number]["id"];

export type Product = {
  id: string; code: string; cat: CatId; name: string; price: number; note: string;
  img?: { file: string; alt: string };
  pot?: { shape: Shape; bulge: number; neck: number; glaze: string; pattern: Pattern; dip: boolean };
};

export const PRODUCTS: Product[] = [
  { id: "coc-dat-moc", cat: "coc", code: "DM-01", name: "Cốc Đất Mộc", price: 145000, note: "Cốc cà phê, men mộc", img: { file: "ke-coc-men", alt: "Hàng cốc gốm men sáng xếp trên giá gỗ cũ" } },
  { id: "binh-nang", cat: "binh", code: "DM-02", name: "Bình Nắng", price: 320000, note: "Bình hoa nhỏ, dáng hữu cơ", pot: { shape: "bau", bulge: 0.7, neck: 0.5, glaze: "do", pattern: "van", dip: true } },
  { id: "binh-dat", cat: "binh", code: "DM-03", name: "Bình Đất", price: 490000, note: "Bình trang trí nặn bàn xoay", img: { file: "binh-cao-be", alt: "Những chiếc bình cao màu đất mộc chưa tráng men" } },
  { id: "bat-may", cat: "bat", code: "DM-04", name: "Bát Mây", price: 165000, note: "Bát ăn nhỏ, men hạt", img: { file: "chong-bat-nau", alt: "Chồng bát đất nâu sẫm xếp trên kệ gỗ" } },
  { id: "dia-bien", cat: "bat", code: "DM-05", name: "Đĩa Biển", price: 250000, note: "Đĩa trưng bày, men xanh ngọc", img: { file: "bat-men-ngoc", alt: "Đĩa và bát men xanh ngọc loang trên nền sáng" } },
  { id: "binh-tro", cat: "binh", code: "DM-06", name: "Bình Tro", price: 540000, note: "Bình men tro, thân bầu", img: { file: "binh-tren-ban-xoay", alt: "Chiếc bình đất mộc vừa nặn xong trên bàn xoay" } },
  { id: "coc-men-ngoc", cat: "coc", code: "DM-07", name: "Cốc Men Ngọc", price: 185000, note: "Men xanh ngọc, nhúng nửa thân", pot: { shape: "coc", bulge: 0.5, neck: 0.5, glaze: "ngoc", pattern: "tron", dip: true } },
  { id: "lo-suong", cat: "binh", code: "DM-08", name: "Lọ Sương", price: 380000, note: "Lọ cổ cao cắm cành khô", pot: { shape: "lo", bulge: 0.55, neck: 0.5, glaze: "sua", pattern: "van", dip: false } },
  { id: "binh-than", cat: "binh", code: "DM-09", name: "Bình Than", price: 420000, note: "Men đen nhám, vẽ sóng", pot: { shape: "cao", bulge: 0.5, neck: 0.5, glaze: "den", pattern: "song", dip: false } },
  { id: "bat-cham", cat: "bat", code: "DM-10", name: "Bát Chậm", price: 210000, note: "Men đỏ đất, chấm tay", pot: { shape: "bat", bulge: 0.5, neck: 0.5, glaze: "do", pattern: "cham", dip: true } },
  { id: "bo-tra-moc", cat: "qua", code: "DM-11", name: "Bộ Trà Mộc", price: 980000, note: "Một ấm và bốn chén, men đen nhám", pot: { shape: "bau", bulge: 0.85, neck: 0.75, glaze: "den", pattern: "tron", dip: true } },
  { id: "hop-qua-doi", cat: "qua", code: "DM-12", name: "Hộp Quà Đôi", price: 560000, note: "Hai cốc và một đĩa nhỏ, đóng hộp giấy", pot: { shape: "coc", bulge: 0.5, neck: 0.5, glaze: "sua", pattern: "song", dip: false } },
];

export type Session = {
  id: "nan-tay" | "ban-xoay" | "ve-men"; name: string; kind: string; minutes: number; price: number; blurb: string; bullets: string[]; includes: string[]; level: string;
  img: { file: string; alt: string };
};

export const SESSIONS: Session[] = [
  {
    id: "nan-tay", name: "Chạm Đất", kind: "Nặn tay", minutes: 90, price: 250000,
    blurb: "Làm quen với đất: vê, véo, cuộn và ghép. Hợp người chưa từng chạm vào gốm.",
    bullets: ["Làm quen đất và dụng cụ", "Tạo hình một chiếc cốc hoặc khay", "Khắc hoạ tiết bằng que và dấu tay"],
    level: "Người mới, từ 8 tuổi có người lớn đi cùng",
    includes: ["Khoảng 1 kg đất", "Tạp dề và dụng cụ", "Một món hoàn thiện sau khi nung"],
    img: { file: "dat-set-tho", alt: "Thùng đất sét ướt màu nâu chưa nặn" },
  },
  {
    id: "ban-xoay", name: "Xoay Đất", kind: "Bàn xoay", minutes: 120, price: 350000,
    blurb: "Buổi được hỏi nhiều nhất: căn tâm, mở lòng và kéo thành trên bàn xoay.",
    bullets: ["Căn tâm khối đất", "Mở lòng, kéo thành, tạo dáng", "Cắt đáy và để khô, chờ nung"],
    level: "Người mới đến người đã học một buổi",
    includes: ["Khoảng 1,5 kg đất", "Bàn xoay riêng, tạp dề, dụng cụ", "Một đến hai món sau khi nung"],
    img: { file: "ban-xoay-tay-nan", alt: "Tay nặn khối đất trên bàn xoay, ánh sáng ấm" },
  },
  {
    id: "ve-men", name: "Phủ Men", kind: "Vẽ men", minutes: 90, price: 290000,
    blurb: "Chọn phôi đã nung mộc, phối màu men và vẽ hoạ tiết của riêng bạn.",
    bullets: ["Chọn phôi và bảng màu men", "Vẽ, nhúng, chấm men", "Chờ nung men để ra màu thật"],
    level: "Mọi người, kể cả trẻ em đi cùng",
    includes: ["Một phôi đã nung mộc (cốc, bát hoặc đĩa)", "Men, cọ và tạp dề", "Nung men tại xưởng"],
    img: { file: "pha-men-xanh", alt: "Tay pha men xanh bên chiếc bát đất mộc" },
  },
];

export const SLOTS = ["Buổi sáng", "Buổi chiều", "Buổi tối", "Linh hoạt"] as const;
export const FIRING_FEE = 70000; // mỗi sản phẩm

export type SlotRow = { sid: Session["id"]; slot: (typeof SLOTS)[number]; time: string };
export const SCHEDULE: { day: string; rows: SlotRow[] }[] = [
  { day: "Thứ Ba", rows: [{ sid: "ban-xoay", slot: "Buổi chiều", time: "14:00 đến 16:00" }, { sid: "nan-tay", slot: "Buổi tối", time: "17:30 đến 19:00" }] },
  { day: "Thứ Tư", rows: [{ sid: "ve-men", slot: "Buổi sáng", time: "09:30 đến 11:00" }, { sid: "ban-xoay", slot: "Buổi tối", time: "17:30 đến 19:30" }] },
  { day: "Thứ Năm", rows: [{ sid: "nan-tay", slot: "Buổi chiều", time: "14:00 đến 15:30" }, { sid: "ve-men", slot: "Buổi tối", time: "17:30 đến 19:00" }] },
  { day: "Thứ Sáu", rows: [{ sid: "nan-tay", slot: "Buổi sáng", time: "09:30 đến 11:00" }, { sid: "ban-xoay", slot: "Buổi tối", time: "17:30 đến 19:30" }] },
  { day: "Thứ Bảy", rows: [{ sid: "ban-xoay", slot: "Buổi sáng", time: "09:00 đến 11:00" }, { sid: "ve-men", slot: "Buổi chiều", time: "14:00 đến 15:30" }, { sid: "nan-tay", slot: "Buổi tối", time: "17:30 đến 19:00" }] },
  { day: "Chủ Nhật", rows: [{ sid: "nan-tay", slot: "Buổi sáng", time: "09:30 đến 11:00" }, { sid: "ban-xoay", slot: "Buổi chiều", time: "14:00 đến 16:00" }, { sid: "ve-men", slot: "Buổi tối", time: "17:30 đến 19:00" }] },
];

export const CUSTOM = [
  { k: "Quà tặng", t: "Hộp quà gốm", text: "Bộ hai cốc, bộ trà hoặc đĩa nhỏ đóng hộp giấy, có thể khắc chữ hoặc đặt màu men. Nên đặt trước vì cần thời gian nung men.", s: "Từ 560.000 ₫ một hộp" },
  { k: "Theo yêu cầu", t: "Gốm làm riêng", text: "Bộ đồ ăn, chậu cây, bình hoa theo kích thước và màu men bạn chọn. Gửi phác thảo hoặc ảnh tham khảo, xưởng trả lời về dáng, men và thời gian làm.", s: "Báo giá theo từng đơn" },
  { k: "Doanh nghiệp", t: "Workshop nhóm và quà tặng công ty", text: "Lớp riêng cho đội nhóm từ 8 người trở lên, hoặc số lượng cốc, đĩa làm đồng bộ để tặng khách. Xưởng chia lớp và lên lịch theo số người.", s: "Báo giá theo số lượng" },
] as const;

export const CARE = [
  { t: "Rửa nhẹ tay", text: "Dùng nước ấm và miếng xốp mềm. Đồ vẽ men tay nên rửa tay thay vì máy rửa chén để men giữ màu lâu." },
  { t: "Tránh sốc nhiệt", text: "Không đổ nước sôi vào cốc lạnh, không đặt gốm vừa rửa nước nóng lên mặt đá lạnh. Chênh nhiệt đột ngột dễ làm gốm nứt." },
  { t: "Lò vi sóng và lò nướng", text: "Chỉ dùng khi xưởng ghi rõ món đó dùng được. Món có men kim loại hoặc vẽ trang trí nên để ngoài lò." },
  { t: "Đựng đồ ăn", text: "Xưởng cho biết món nào dùng đựng đồ ăn, món nào để trang trí khi bạn nhận. Phôi chưa nung men không đựng đồ ăn." },
  { t: "Cất giữ", text: "Xếp chồng cốc, bát có lót giấy hoặc vải mỏng để chân gốm không cào xước men." },
  { t: "Có vết nứt nhỏ", text: "Ngừng dùng đựng đồ ăn nóng, đem tới xưởng để xem còn dùng làm vật trang trí được không." },
] as const;

export const HOURS = [
  { d: "Thứ Ba đến Chủ Nhật", t: "09:00 đến 20:00" },
  { d: "Thứ Hai", t: "Nghỉ, xưởng nung và dọn kho" },
  { d: "Ngày lễ", t: "Báo trước 3 ngày để xếp lịch lớp" },
] as const;

export const POLICY = [
  { k: "Giữ chỗ", v: "Cọc 50%", s: "học phí của buổi, trừ vào tổng khi đến lớp. Lớp mở khi có từ 2 người." },
  { k: "Dời lịch", v: "Trước 24 giờ", s: "được dời sang buổi khác trong 30 ngày, không mất phí." },
  { k: "Huỷ lịch", v: "Trước 48 giờ", s: "hoàn cọc. Huỷ muộn hơn thì giữ cọc để bù chỗ đã giữ." },
  { k: "Lấy sản phẩm", v: "Tuỳ lò nung", s: "xưởng nhắn khi món ra lò. Món được lưu 30 ngày sau ngày nhắn." },
] as const;

export const FAQ = [
  { q: "Chưa từng làm gốm thì có tham gia được không?", a: "Được. Mỗi buổi đều có người hướng dẫn cầm tay từng bước, bạn chỉ cần tò mò và sẵn sàng lấm đất." },
  { q: "Nên mặc gì khi đến xưởng?", a: "Quần áo thoải mái, dễ giặt, móng tay ngắn. Xưởng có tạp dề; đất khô sẽ rơi ra khỏi vải khi giặt." },
  { q: "Bao lâu thì nhận được sản phẩm?", a: "Tuỳ lò nung. Sản phẩm cần phơi khô, nung mộc rồi nung men, nên không lấy được ngay trong ngày. Xưởng báo ngày dự kiến khi bạn đặt và nhắn khi món ra lò." },
  { q: "Một buổi làm được mấy món?", a: "Nặn tay thường một món, bàn xoay một đến hai món, vẽ men một món trên phôi có sẵn. Thêm món sẽ tính thêm tiền nung." },
  { q: "Trẻ em có tham gia được không?", a: "Trẻ nhỏ đi cùng người lớn; lớp vẽ men phù hợp nhất cho trẻ. Nhóm có trẻ em nên báo khi đặt để xưởng chuẩn bị đất và dụng cụ phù hợp." },
  { q: "Nhóm đông hoặc đi cùng công ty thì sao?", a: "Một lớp nhận tối đa 8 người. Nhóm đông hơn thì trao đổi riêng để chia lớp và khung giờ, xem mục Đặt theo yêu cầu." },
  { q: "Món gốm có dùng đựng đồ ăn được không?", a: "Tuỳ loại men và cách nung. Khi bạn nhận sản phẩm, xưởng sẽ cho biết món nào dùng đựng đồ ăn, món nào để trang trí." },
  { q: "Tôi có thể mua gốm mà không học không?", a: "Được. Gốm làm sẵn bày tại xưởng trong giờ mở cửa; bạn cầm xem rồi mua. Giá trên trang là giá tham khảo." },
  { q: "Đặt cọc và dời lịch thế nào?", a: "Cọc 50% học phí để giữ chỗ. Dời lịch miễn phí nếu báo trước 24 giờ, huỷ trước 48 giờ được hoàn cọc." },
] as const;

export const STEPS = [
  { no: "01", name: "Đất", temp: "Nhiệt độ phòng", text: "Xưởng dùng đất sét nung đỏ, được ủ và luyện cho hết bọt khí. Đất ẩm, dẻo, nặng tay; bạn sẽ nghe và cảm nhận nó trước khi nặn." },
  { no: "02", name: "Nặn", temp: "Nhiệt độ phòng", text: "Đất được luyện cho hết bọt khí, rồi nặn tay hoặc kéo trên bàn xoay. Dấu vân tay của người nặn ở lại trong từng đường cong." },
  { no: "03", name: "Phơi khô", temp: "Gió và thời gian", text: "Phôi ướt để khô chậm, tránh nứt. Đất đổi từ nâu sẫm sang màu đất nhạt, nhẹ hẳn đi." },
  { no: "04", name: "Nung mộc", temp: "Khoảng 900 °C", text: "Lần nung đầu giúp phôi cứng, chưa có men. Lúc này màu đất ngả đỏ, bề mặt hút men rất tốt." },
  { no: "05", name: "Phủ men, nung men", temp: "Khoảng 1.200 °C", text: "Men được nhúng, vẽ hoặc chấm lên phôi. Trong lò, men chảy ra và đổi màu, xanh ngọc chỉ hiện sau lần nung này. Ngày lấy món tuỳ lò, xưởng nhắn khi món ra lò." },
] as const;
