export const SLUG = "luot-song";
export const IMG = "/images/demos/luot-song";
export const ID = `${IMG}/identity`;

export const NAV = [
  { href: "#tuyen-ngon", label: "Tinh thần" },
  { href: "#khoa-hoc", label: "Khoá học" },
  { href: "#buoi-hoc", label: "Một buổi học" },
  { href: "#lap-ke-hoach", label: "Lên kế hoạch" },
  { href: "#mua-song", label: "Mùa sóng" },
  { href: "#hoi-dap", label: "Hỏi nhanh" },
] as const;

export const MARQUEE_A = ["Chạm sóng", "Bắt nắng", "Chèo chậm", "Đứng dậy", "Cười thật to"];
export const MARQUEE_B = ["Ráng chiều", "Sóng trắng", "Ván nhẹ", "Muối trên da", "Biển Đà Nẵng"];

export type Course = {
  id: string;
  name: string;
  tag: string;
  length: string;
  who: string;
  points: string[];
  price: number;
  tone: "teal" | "orange" | "sun" | "brown";
};

export const COURSES: Course[] = [
  { id: "lam-quen", name: "Buổi Làm Quen", tag: "Chưa biết gì cũng được", length: "1 buổi · 90 phút", who: "Người chưa từng lướt, muốn thử một buổi.", points: ["An toàn và cách ngã đúng", "Chèo ván, pop-up trên cát", "Thử đứng trên sóng trắng"], price: 650000, tone: "orange" },
  { id: "song-trang", name: "Nhập Môn Sóng Trắng", tag: "Khoá hai buổi", length: "2 buổi · mỗi buổi 90 phút", who: "Người mới muốn đứng được và tự bắt sóng trắng.", points: ["Chèo ván và giữ thăng bằng", "Pop-up mượt hơn", "Bắt sóng trắng cùng huấn luyện viên"], price: 1200000, tone: "teal" },
  { id: "dung-vung", name: "Đứng Vững", tag: "Khoá ba buổi", length: "3 buổi · mỗi buổi 90 phút", who: "Người mới muốn đứng vững và đổi hướng nhẹ.", points: ["Trọng tâm và tư thế", "Điều khiển hướng cơ bản", "Đọc sóng từng bước"], price: 1650000, tone: "sun" },
  { id: "nen-tang", name: "Nền Tảng Trọn Vẹn", tag: "Khoá năm buổi", length: "5 buổi · mỗi buổi 90 phút", who: "Người muốn đi từ số không đến tự tin ở vùng sóng nhỏ.", points: ["Đủ bốn mảng: an toàn, chèo, pop-up, đọc sóng", "Buổi ôn và nhận xét kỹ thuật", "Gợi ý tập tiếp sau khoá"], price: 2500000, tone: "brown" },
  { id: "kem-rieng", name: "Một Kèm Một", tag: "Lớp riêng", length: "1 buổi · 90 phút", who: "Người cần nhịp riêng, hoặc muốn sửa một lỗi cụ thể.", points: ["Huấn luyện viên đi cùng riêng", "Nội dung theo mục tiêu của bạn", "Lịch linh hoạt theo biển"], price: 1200000, tone: "teal" },
  { id: "song-nhi", name: "Sóng Nhí", tag: "Từ 6 đến 12 tuổi", length: "1 buổi · 60 đến 75 phút", who: "Các bạn nhỏ làm quen với biển, có huấn luyện viên giám sát sát bên.", points: ["Thời lượng dưới nước ngắn", "Trò chơi làm quen ván và sóng", "Phụ huynh ở bờ, trong tầm nhìn"], price: 750000, tone: "orange" },
];

export const STEPS = [
  { n: "01", title: "Đọc biển cùng nhau", text: "Trước khi xuống nước, huấn luyện viên nhìn sóng, gió, dòng chảy, thuỷ triều và nói cho cả nhóm nghe biển hôm nay thế nào.", file: "nhom-tren-cat", alt: "Nhóm học viên nhỏ đứng trên cát nhìn ra sóng, chụp từ xa" },
  { n: "02", title: "Khởi động và an toàn", text: "Cách cầm ván, buộc dây leash vào cổ chân, tín hiệu dừng, cách ngã và nhường sóng. Mọi người cùng nhắc lại một lượt.", file: "day-buoc", alt: "Tay buộc dây leash vào cổ chân trên cát, ván lướt phía sau" },
  { n: "03", title: "Tập trên cát", text: "Nằm chèo, chuyển từ nằm sang đứng, giữ trọng tâm. Làm chậm, làm nhiều lần cho đến khi cơ thể nhớ.", file: "boi-sap", alt: "Bàn tay xoa sáp lên mặt ván lướt" },
  { n: "04", title: "Xuống nước có giám sát", text: "Ra vùng sóng phù hợp với trình độ, bắt sóng trắng hoặc sóng nhỏ. Huấn luyện viên đứng cạnh, chỉnh từng lượt.", file: "chai-van", alt: "Người chèo ván nhìn từ trên cao trên nước xanh ngọc, bọt sóng trắng" },
] as const;

export const MODULES = {
  AT: { name: "An toàn", text: "Nhận biết dòng chảy, vùng nước và tín hiệu dừng; cách cầm ván, giữ khoảng cách, ngã an toàn, nhường sóng." },
  CH: { name: "Chèo ván", text: "Tư thế nằm, giữ thăng bằng, kỹ thuật chèo và chỉnh vị trí trên ván." },
  PO: { name: "Pop-up", text: "Tập động tác trên cát, chuyển từ nằm sang đứng và giữ trọng tâm." },
  DS: { name: "Đọc sóng", text: "Nhận biết hướng sóng, vùng sóng vỡ, thời điểm bắt sóng; thực hành ở sóng phù hợp với trình độ, có giám sát." },
} as const;
export type ModuleKey = keyof typeof MODULES;

export const CHECKLIST = [
  "Đồ bơi hoặc áo rash guard",
  "Kem chống nắng chống nước",
  "Khăn tắm và quần áo thay",
  "Nước uống cá nhân",
  "Dép đi biển",
  "Kính râm và túi chống nước cho đồ cá nhân",
  "Thuốc cá nhân cần thiết (nếu có)",
] as const;

export const FAQ = [
  { q: "Tôi chưa biết bơi thì học được không?", a: "Hãy nói trước với huấn luyện viên khi đặt lịch. Mức bơi của bạn quyết định nơi tập và cách giám sát, nên trường sẽ trao đổi riêng thay vì trả lời chung cho mọi người." },
  { q: "Ván và đồ bảo hộ có sẵn không?", a: "Ván lướt, dây leash và thiết bị bảo hộ do trường chuẩn bị theo gói học đã xác nhận. Bạn chỉ cần mang những thứ trong danh sách ở phần lên kế hoạch." },
  { q: "Người mới hoàn toàn có học được không?", a: "Có. Các khoá nhập môn bắt đầu từ an toàn và tập trên cát, sau đó mới xuống nước ở vùng sóng phù hợp với người mới." },
  { q: "Trời mưa hoặc biển động thì sao?", a: "Điều kiện thực tế do huấn luyện viên quyết định mỗi buổi dựa trên sóng, gió, dòng chảy, thuỷ triều và cảnh báo thời tiết. Có thể đổi địa điểm, đổi nội dung (ví dụ học trên cát) hoặc hoãn buổi học nếu chưa phù hợp." },
  { q: "Bao nhiêu tuổi thì học được?", a: "Có lớp riêng cho 6 đến 12 tuổi với huấn luyện viên giám sát sát bên. Từ 13 đến 17 tuổi cần phụ huynh xác nhận. Người từ 40 tuổi trở lên học với thời lượng và khởi động điều chỉnh theo thể trạng." },
  { q: "Tôi có bệnh nền hoặc đang chấn thương thì sao?", a: "Hãy ghi rõ khi trao đổi lịch để huấn luyện viên điều chỉnh bài tập. Nếu cần, hãy hỏi ý kiến bác sĩ trước khi tham gia." },
  { q: "Giá đã gồm những gì?", a: "Bảng giá trên trang là giá tham khảo theo từng người. Phần bao gồm ván, đồ bảo hộ, ảnh, bảo hiểm và di chuyển sẽ được xác nhận cụ thể khi trao đổi lịch." },
] as const;

export const FOOTER = {
  area: "Bãi biển Đà Nẵng",
  email: "xinchao@rangsong.example",
  phone: "0236 000 0000",
};
