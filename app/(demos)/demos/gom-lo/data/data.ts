import type { Pattern, Shape } from "../lib/pot";

export const NAV = [
  { href: "#cau-chuyen", label: "Câu chuyện" },
  { href: "#tu-dat-den-men", label: "Từ đất đến men" },
  { href: "#ke-gom", label: "Kệ gốm" },
  { href: "#buoi-lam-gom", label: "Buổi làm gốm" },
  { href: "#nan-binh", label: "Nặn bình" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export type Product = {
  id: string; code: string; name: string; price: number; note: string;
  img?: { file: string; alt: string };
  pot?: { shape: Shape; bulge: number; neck: number; glaze: string; pattern: Pattern; dip: boolean };
};

export const PRODUCTS: Product[] = [
  { id: "coc-dat-moc", code: "DM-01", name: "Cốc Đất Mộc", price: 145000, note: "Cốc cà phê, men mộc", img: { file: "ke-coc-men", alt: "Hàng cốc gốm men sáng xếp trên giá gỗ cũ" } },
  { id: "binh-nang", code: "DM-02", name: "Bình Nắng", price: 320000, note: "Bình hoa nhỏ, dáng hữu cơ", pot: { shape: "bau", bulge: 0.7, neck: 0.5, glaze: "do", pattern: "van", dip: true } },
  { id: "binh-dat", code: "DM-03", name: "Bình Đất", price: 490000, note: "Bình trang trí nặn bàn xoay", img: { file: "binh-cao-be", alt: "Những chiếc bình cao màu đất mộc chưa tráng men" } },
  { id: "bat-may", code: "DM-04", name: "Bát Mây", price: 165000, note: "Bát ăn nhỏ, men hạt", img: { file: "chong-bat-nau", alt: "Chồng bát đất nâu sẫm xếp trên kệ gỗ" } },
  { id: "dia-bien", code: "DM-05", name: "Đĩa Biển", price: 250000, note: "Đĩa trưng bày, men xanh ngọc", img: { file: "bat-men-ngoc", alt: "Đĩa và bát men xanh ngọc loang trên nền sáng" } },
  { id: "binh-tro", code: "DM-06", name: "Bình Tro", price: 540000, note: "Bình men tro, thân bầu", img: { file: "binh-tren-ban-xoay", alt: "Chiếc bình đất mộc vừa nặn xong trên bàn xoay" } },
  { id: "coc-men-ngoc", code: "DM-07", name: "Cốc Men Ngọc", price: 185000, note: "Men xanh ngọc, nhúng nửa thân", pot: { shape: "coc", bulge: 0.5, neck: 0.5, glaze: "ngoc", pattern: "tron", dip: true } },
  { id: "lo-suong", code: "DM-08", name: "Lọ Sương", price: 380000, note: "Lọ cổ cao cắm cành khô", pot: { shape: "lo", bulge: 0.55, neck: 0.5, glaze: "sua", pattern: "van", dip: false } },
  { id: "binh-than", code: "DM-09", name: "Bình Than", price: 420000, note: "Men đen nhám, vẽ sóng", pot: { shape: "cao", bulge: 0.5, neck: 0.5, glaze: "den", pattern: "song", dip: false } },
  { id: "bat-cham", code: "DM-10", name: "Bát Chậm", price: 210000, note: "Men đỏ đất, chấm tay", pot: { shape: "bat", bulge: 0.5, neck: 0.5, glaze: "do", pattern: "cham", dip: true } },
];

export type Session = {
  id: "nan-tay" | "ban-xoay" | "ve-men"; name: string; kind: string; minutes: number; price: number; blurb: string; bullets: string[];
  img: { file: string; alt: string };
};

export const SESSIONS: Session[] = [
  {
    id: "nan-tay", name: "Chạm Đất", kind: "Nặn tay", minutes: 90, price: 250000,
    blurb: "Làm quen với đất: vê, véo, cuộn và ghép. Hợp người chưa từng chạm vào gốm.",
    bullets: ["Làm quen đất và dụng cụ", "Tạo hình một chiếc cốc hoặc khay", "Khắc hoạ tiết bằng que và dấu tay"],
    img: { file: "dat-set-tho", alt: "Thùng đất sét ướt màu nâu chưa nặn" },
  },
  {
    id: "ban-xoay", name: "Xoay Đất", kind: "Bàn xoay", minutes: 120, price: 350000,
    blurb: "Buổi được hỏi nhiều nhất: căn tâm, mở lòng và kéo thành trên bàn xoay.",
    bullets: ["Căn tâm khối đất", "Mở lòng, kéo thành, tạo dáng", "Cắt đáy và để khô, chờ nung"],
    img: { file: "ban-xoay-tay-nan", alt: "Tay nặn khối đất trên bàn xoay, ánh sáng ấm" },
  },
  {
    id: "ve-men", name: "Phủ Men", kind: "Vẽ men", minutes: 90, price: 290000,
    blurb: "Chọn phôi đã nung mộc, phối màu men và vẽ hoạ tiết của riêng bạn.",
    bullets: ["Chọn phôi và bảng màu men", "Vẽ, nhúng, chấm men", "Chờ nung men để ra màu thật"],
    img: { file: "pha-men-xanh", alt: "Tay pha men xanh bên chiếc bát đất mộc" },
  },
];

export const SLOTS = ["Buổi sáng", "Buổi chiều", "Buổi tối", "Linh hoạt"] as const;
export const FIRING_FEE = 70000; // mỗi sản phẩm

export const FAQ = [
  { q: "Chưa từng làm gốm thì có tham gia được không?", a: "Được. Mỗi buổi đều có người hướng dẫn cầm tay từng bước, bạn chỉ cần tò mò và sẵn sàng lấm đất." },
  { q: "Nên mặc gì khi đến xưởng?", a: "Quần áo thoải mái, dễ giặt, móng tay ngắn. Xưởng có tạp dề; đất khô sẽ rơi ra khỏi vải khi giặt." },
  { q: "Bao lâu thì nhận được sản phẩm?", a: "Tuỳ lò nung, trao đổi khi đặt. Sản phẩm cần phơi khô, nung mộc rồi nung men nên không lấy được ngay trong ngày." },
  { q: "Trẻ em có tham gia được không?", a: "Trẻ nhỏ đi cùng người lớn. Nhóm có trẻ em nên báo khi đặt để xưởng chuẩn bị đất và dụng cụ phù hợp." },
  { q: "Nhóm đông hoặc đi cùng công ty thì sao?", a: "Một lớp nhận tối đa 8 người. Nhóm đông hơn thì trao đổi riêng để chia lớp và khung giờ." },
  { q: "Món gốm có dùng đựng đồ ăn được không?", a: "Tuỳ loại men và cách nung. Khi bạn nhận sản phẩm, xưởng sẽ cho biết món nào dùng đựng đồ ăn, món nào để trang trí." },
] as const;

export const STEPS = [
  { no: "01", name: "Nặn", temp: "Nhiệt độ phòng", text: "Đất được luyện cho hết bọt khí, rồi nặn tay hoặc kéo trên bàn xoay. Dấu vân tay của người nặn ở lại trong từng đường cong." },
  { no: "02", name: "Phơi khô", temp: "Gió và thời gian", text: "Phôi ướt để khô chậm, tránh nứt. Đất đổi từ nâu sẫm sang màu đất nhạt, nhẹ hẳn đi." },
  { no: "03", name: "Nung mộc", temp: "Khoảng 900 °C", text: "Lần nung đầu giúp phôi cứng, chưa có men. Lúc này màu đất ngả đỏ, bề mặt hút men rất tốt." },
  { no: "04", name: "Phủ men, nung men", temp: "Khoảng 1.200 °C", text: "Men được nhúng, vẽ hoặc chấm lên phôi. Trong lò, men chảy ra và đổi màu, xanh ngọc chỉ hiện sau lần nung này." },
] as const;
