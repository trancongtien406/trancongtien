export const SLUG = "luot-song";
export const IMG = "/images/demos/luot-song";
export const ID = `${IMG}/identity`;

export const NAV = [
  { href: "#khoa-hoc", label: "Khoá học" },
  { href: "#buoi-hoc", label: "Một buổi học" },
  { href: "#lich-hoc", label: "Lịch học" },
  { href: "#bang-gia", label: "Giá và đồ" },
  { href: "#an-toan", label: "An toàn" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const FOOT_NAV = [
  ...NAV,
  { href: "#chon-khoa", label: "Chọn khoá phù hợp" },
  { href: "#mua-song", label: "Mùa sóng" },
  { href: "#huan-luyen-vien", label: "Huấn luyện viên" },
  { href: "#dat-lich", label: "Đặt lịch" },
] as const;

export const MARQUEE_A = ["Buổi trải nghiệm 1 buổi", "Khoá 3 · 5 · 10 buổi", "Lớp trẻ em từ 6 tuổi", "Thuê ván và đồ"];
export const MARQUEE_B = ["Nhóm tối đa 6 học viên", "Ván và đồ bảo hộ có sẵn", "Biển Sơn Trà, Đà Nẵng", "Sáng sớm · Sáng · Chiều muộn"];

export const HERO_FACTS = [
  { k: "Buổi trải nghiệm từ", v: "750.000 ₫" },
  { k: "Ba khung giờ", v: "05:30 · 08:00 · 15:30" },
  { k: "Mỗi huấn luyện viên", v: "tối đa 6 học viên" },
] as const;

export type Course = {
  id: string;
  name: string;
  tag: string;
  length: string;
  who: string;
  points: string[];
  price: number;
  per: string;
  from?: boolean;
  tone: "teal" | "orange" | "sun" | "brown";
};

export const COURSES: Course[] = [
  { id: "trai-nghiem", name: "Buổi trải nghiệm", tag: "Chưa biết gì cũng được", length: "1 buổi · khoảng 2 giờ", who: "Người chưa từng lướt, muốn thử đúng một buổi trước khi quyết định.", points: ["An toàn, cách ngã và nhường sóng", "Chèo ván và pop-up trên cát", "Thử đứng trên sóng trắng cùng huấn luyện viên"], price: 750000, per: "mỗi người", tone: "orange" },
  { id: "khoa-3", name: "Khoá 3 buổi", tag: "Đứng vững trên ván", length: "3 buổi · mỗi buổi khoảng 2 giờ", who: "Người mới muốn đứng được, chèo ra và tự bắt sóng trắng.", points: ["Buổi 1 an toàn và chèo ván", "Buổi 2 pop-up và giữ thăng bằng", "Buổi 3 bắt sóng trắng, đổi hướng nhẹ"], price: 1950000, per: "mỗi người", tone: "teal" },
  { id: "khoa-5", name: "Khoá 5 buổi", tag: "Nền tảng đủ bốn mảng", length: "5 buổi · mỗi buổi khoảng 2 giờ", who: "Người muốn đi từ số không tới tự tin ở vùng sóng nhỏ.", points: ["Đủ bốn mảng: an toàn, chèo, pop-up, đọc sóng", "Một buổi ôn và nhận xét kỹ thuật", "Gợi ý bài tập tiếp sau khoá"], price: 3100000, per: "mỗi người", tone: "sun" },
  { id: "khoa-10", name: "Khoá 10 buổi", tag: "Ra sóng đều tay", length: "10 buổi · mỗi buổi khoảng 2 giờ", who: "Người muốn học đều trong vài tuần: đọc sóng, chọn vị trí, chuyển hướng.", points: ["Lịch cố định mỗi tuần cùng một huấn luyện viên", "Quay video chỉnh kỹ thuật giữa khoá", "Dời lịch khi biển động, không mất buổi"], price: 5800000, per: "mỗi người", tone: "brown" },
  { id: "tre-em", name: "Lớp trẻ em", tag: "Từ 6 đến 12 tuổi", length: "1 buổi · 75 phút", who: "Các bạn nhỏ làm quen với biển, nhóm tối đa 4 bạn, phụ huynh ở bờ trong tầm nhìn.", points: ["Thời gian dưới nước ngắn, xen trò chơi", "Làm quen ván, sóng trắng nông", "Gói 4 buổi 2.300.000 ₫"], price: 650000, per: "mỗi bạn", tone: "orange" },
  { id: "thue-van", name: "Thuê ván và đồ", tag: "Cho người đã biết lướt", length: "2 giờ · tự lướt", who: "Người đã lướt được, cần ván và đồ; huấn luyện viên nhìn biển giúp trước khi xuống.", points: ["Ván mềm hoặc ván cứng theo trình độ", "Dây leash và áo lycra kèm theo", "Có thể thêm 30 phút chỉnh kỹ thuật"], price: 150000, per: "từ, mỗi 2 giờ", from: true, tone: "teal" },
];

export const STEPS = [
  { n: "01", min: "Phút 0 đến 15", title: "Tập trung và đọc biển", text: "Điểm danh, phát ván và áo lycra. Huấn luyện viên nhìn sóng, gió, dòng chảy, thuỷ triều rồi nói cho cả nhóm biết biển hôm nay thế nào.", file: "nhom-tren-cat", alt: "Nhóm học viên nhỏ đứng trên cát nhìn ra sóng, chụp từ xa" },
  { n: "02", min: "Phút 15 đến 35", title: "Khởi động và an toàn", text: "Cách cầm ván, buộc dây leash vào cổ chân, tín hiệu dừng, cách ngã và nhường sóng. Cả nhóm nhắc lại một lượt.", file: "day-buoc", alt: "Tay buộc dây leash vào cổ chân trên cát, ván lướt phía sau" },
  { n: "03", min: "Phút 35 đến 60", title: "Tập trên cát", text: "Nằm chèo, chuyển từ nằm sang đứng, giữ trọng tâm. Làm chậm, làm nhiều lần cho tới khi cơ thể nhớ.", file: "boi-sap", alt: "Bàn tay xoa sáp lên mặt ván lướt" },
  { n: "04", min: "Phút 60 đến 120", title: "Xuống nước và nhận xét", text: "Ra vùng sóng hợp trình độ, bắt sóng trắng với huấn luyện viên đứng cạnh. Cuối buổi lên bờ, giãn cơ, nghe nhận xét và bài cho buổi sau.", file: "chai-van", alt: "Người chèo ván nhìn từ trên cao trên nước xanh ngọc, bọt sóng trắng" },
] as const;

export type SlotId = "som" | "sang" | "chieu";
export const SLOT_INFO: Record<SlotId, { label: string; gather: string; end: string; t: number; who: string; note: string }> = {
  som: { label: "Sáng sớm", gather: "05:30", end: "khoảng 07:30", t: 0.06, who: "Người cần xong sớm trước giờ làm, người ở gần biển.", note: "Nắng dịu, ít người trên bãi. Giờ thật dịch theo thuỷ triều và ánh sáng từng ngày." },
  sang: { label: "Sáng", gather: "08:00", end: "khoảng 10:00", t: 0.34, who: "Lớp trẻ em cuối tuần, khách đi theo nhóm gia đình.", note: "Nắng lên rõ: thoa kem chống nắng kỹ, mang mũ và nước uống." },
  chieu: { label: "Chiều muộn", gather: "15:30", end: "khoảng 17:30", t: 0.86, who: "Người đi làm, người muốn học lúc nắng đã dịu.", note: "Nắng xế mát hơn, buổi học kết thúc lúc ánh chiều đẹp nhất." },
};

export const WEEKLY = [
  { cls: "Buổi trải nghiệm", slot: "Cả ba khung giờ", day: "Hằng ngày, đặt trước ít nhất 1 ngày" },
  { cls: "Khoá 3, 5, 10 buổi", slot: "Sáng sớm hoặc chiều muộn, cố định mỗi tuần", day: "Xếp lịch cùng huấn luyện viên khi đăng ký" },
  { cls: "Lớp trẻ em 6 đến 12 tuổi", slot: "08:00 hoặc 15:30, mỗi lớp 75 phút", day: "Thứ Bảy, Chủ nhật; ngày thường theo hẹn" },
  { cls: "Thuê ván và đồ", slot: "06:00 đến 17:30 theo giờ trường mở", day: "Hằng ngày" },
] as const;

export const PRICES = [
  { name: "Buổi trải nghiệm", len: "1 buổi · 2 giờ", price: "750.000 ₫" },
  { name: "Khoá 3 buổi", len: "3 × 2 giờ", price: "1.950.000 ₫" },
  { name: "Khoá 5 buổi", len: "5 × 2 giờ", price: "3.100.000 ₫" },
  { name: "Khoá 10 buổi", len: "10 × 2 giờ", price: "5.800.000 ₫" },
  { name: "Lớp trẻ em, buổi lẻ", len: "75 phút", price: "650.000 ₫" },
  { name: "Lớp trẻ em, gói 4 buổi", len: "4 × 75 phút", price: "2.300.000 ₫" },
  { name: "Một kèm một, nâng thêm", len: "mỗi buổi", price: "+ 450.000 ₫" },
] as const;

export const RENTALS = [
  { name: "Ván mềm (softboard)", price: "150.000 ₫ / 2 giờ" },
  { name: "Ván cứng (hardboard)", price: "220.000 ₫ / 2 giờ" },
  { name: "Áo lycra (rash guard)", price: "30.000 ₫ / buổi" },
  { name: "Wetsuit mỏng", price: "60.000 ₫ / buổi" },
  { name: "Dây leash, sáp ván", price: "Kèm theo ván" },
] as const;

export const INCLUDED = [
  "Một huấn luyện viên cho tối đa 6 học viên (lớp nhí tối đa 4)",
  "Ván phù hợp trình độ, dây leash, áo lycra mượn trong buổi",
  "Nước uống và chỗ gửi đồ có người trông",
  "Ảnh nhóm cuối buổi chụp bằng điện thoại của bạn",
] as const;
export const EXCLUDED = [
  "Di chuyển tới điểm tập trung",
  "Bảo hiểm cá nhân",
  "Đồ bơi, kem chống nắng, khăn tắm",
  "Ăn uống ngoài giờ học",
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

export const CREW = [
  { role: "Huấn luyện viên trưởng", icon: "flag", text: "Xây giáo án, đọc biển từ sớm và quyết định buổi học được mở, đổi chỗ tập hay dời lịch." },
  { role: "Huấn luyện viên nhóm", icon: "board", text: "Dẫn nhóm tối đa 6 học viên, ở trong nước ngay cạnh bạn, chỉnh từng lượt chèo và đứng." },
  { role: "Huấn luyện viên lớp nhí", icon: "star", text: "Phụ trách lớp 6 đến 12 tuổi: trò chơi làm quen, nhóm nhỏ, luôn trong tầm nhìn phụ huynh." },
  { role: "Người hỗ trợ bờ", icon: "eye", text: "Quan sát từ bờ, giữ đồ, phát ván và áo lycra, báo huấn luyện viên khi biển đổi." },
] as const;

export const RULES = [
  { t: "Nói trước nếu bạn chưa biết bơi", d: "Mức bơi quyết định nơi tập và cách giám sát, nên trường trao đổi riêng với bạn khi đặt lịch." },
  { t: "Tuổi và người đi cùng", d: "Từ 6 đến 12 tuổi học lớp riêng, phụ huynh ở bờ. Từ 13 đến 17 tuổi cần phụ huynh xác nhận. Từ 40 tuổi trở lên được chỉnh khởi động theo thể trạng." },
  { t: "Sức khoẻ", d: "Có bệnh tim, hô hấp, động kinh, chấn thương cột sống, vai hoặc đang mang thai: hãy hỏi bác sĩ trước và ghi rõ khi đặt lịch. Thông tin này không thay thế tư vấn y tế." },
  { t: "Không dùng rượu bia trước buổi học", d: "Huấn luyện viên có thể từ chối cho xuống nước nếu thấy bạn chưa đủ tỉnh táo hoặc quá mệt." },
  { t: "Tín hiệu tay và dây leash", d: "Cả nhóm học tín hiệu dừng, gọi giúp đỡ và luôn đeo dây leash khi ở trên nước." },
  { t: "Huấn luyện viên là người quyết định", d: "Huấn luyện viên có quyền thu ngắn, đổi chỗ hoặc dừng buổi học bất cứ lúc nào vì lý do an toàn." },
] as const;

export type FlagId = "xanh" | "vang" | "do";
export const FLAGS: Record<FlagId, { label: string; color: string; sea: string; act: string; move: string }> = {
  xanh: { label: "Cờ xanh", color: "#0f8b8d", sea: "Sóng nhỏ hoặc vừa, dòng chảy yếu.", act: "Học bình thường ở vùng sóng hợp với trình độ.", move: "Giữ nguyên lịch." },
  vang: { label: "Cờ vàng", color: "#ffd27d", sea: "Sóng mạnh dần hoặc dòng chảy đổi.", act: "Tăng phần học trên cát, giữ nhóm ở vùng nước nông, có thể đổi chỗ tập hoặc rút ngắn buổi.", move: "Giữ lịch, đổi nội dung buổi học." },
  do: { label: "Cờ đỏ", color: "#e0452a", sea: "Sóng lớn, dòng mạnh hoặc mưa dông.", act: "Không xuống nước. Có thể học lý thuyết và tập trên cát, hoặc dời buổi.", move: "Dời sang buổi trống gần nhất, không tính phí." },
};

export const POLICY = [
  { t: "Biển động hoặc thời tiết xấu", d: "Trường nhắn xác nhận hoặc đề nghị dời lịch trước giờ tập trung, thường vào tối hôm trước hoặc sáng cùng ngày. Dời lịch do biển động không tính phí." },
  { t: "Bạn cần dời lịch", d: "Báo trước ít nhất 24 giờ để dời miễn phí sang buổi trống. Báo sát giờ có thể bị giữ một phần phí buổi học." },
  { t: "Khoá nhiều buổi", d: "Các buổi bị dời được bù tiếp vào lịch. Gói có hiệu lực 4 tháng kể từ buổi đầu tiên." },
] as const;

export const BOOK_STEPS = [
  { t: "Chọn khoá và khung giờ", d: "Dùng phần chọn khoá phù hợp hoặc nhắn thẳng cho trường." },
  { t: "Trường xác nhận giờ thật", d: "Huấn luyện viên xem thuỷ triều, gió, dòng chảy rồi chốt giờ và điểm tập trung." },
  { t: "Giữ chỗ bằng cọc một phần", d: "Phần còn lại thanh toán trực tiếp trước buổi học." },
  { t: "Ra biển", d: "Mang theo đồ trong danh sách, đến sớm 10 phút." },
] as const;

export const FAQ = [
  { q: "Tôi chưa biết bơi thì học được không?", a: "Hãy nói trước với trường khi đặt lịch. Mức bơi của bạn quyết định nơi tập và cách giám sát, nên trường sẽ trao đổi riêng thay vì trả lời chung cho mọi người." },
  { q: "Người mới hoàn toàn học bao nhiêu buổi thì tự đứng được?", a: "Mỗi người một nhịp nên trường không hứa số buổi. Buổi trải nghiệm giúp bạn biết cảm giác; khoá 3 hoặc 5 buổi dành cho người muốn có nền tảng, huấn luyện viên sẽ nhận xét thẳng sau mỗi buổi." },
  { q: "Ván và đồ bảo hộ có sẵn không?", a: "Có. Ván, dây leash và áo lycra mượn trong buổi đã nằm trong học phí. Bạn chỉ cần mang đồ trong danh sách đồ cần mang." },
  { q: "Trời mưa hoặc biển động thì sao?", a: "Huấn luyện viên quyết định mỗi buổi dựa trên sóng, gió, dòng chảy, thuỷ triều và cảnh báo thời tiết. Trường có thể đổi chỗ tập, đổi nội dung sang học trên cát hoặc dời buổi và không tính phí dời do biển động." },
  { q: "Bao nhiêu tuổi thì học được?", a: "Lớp riêng cho 6 đến 12 tuổi, nhóm tối đa 4 bạn. Từ 13 đến 17 tuổi cần phụ huynh xác nhận. Từ 40 tuổi trở lên học với khởi động điều chỉnh theo thể trạng." },
  { q: "Tôi có bệnh nền hoặc đang chấn thương thì sao?", a: "Hãy ghi rõ khi trao đổi lịch để huấn luyện viên điều chỉnh bài tập. Nếu cần, hãy hỏi bác sĩ trước khi tham gia." },
  { q: "Giá đã gồm những gì?", a: "Giá gồm huấn luyện viên, ván, dây leash, áo lycra mượn trong buổi, nước uống và chỗ gửi đồ. Chưa gồm di chuyển, bảo hiểm cá nhân và ăn uống ngoài giờ học." },
  { q: "Tôi muốn học theo nhóm bạn bè, có giảm giá không?", a: "Nhóm từ 4 người có thể xếp chung một lớp với một huấn luyện viên. Mức giá nhóm được báo khi bạn trao đổi lịch." },
  { q: "Đặt lịch và thanh toán thế nào?", a: "Bạn gửi khoá và khung giờ mong muốn qua form tư vấn. Trường xác nhận giờ thật, giữ chỗ bằng cọc một phần và thanh toán phần còn lại trước buổi học." },
  { q: "Điểm tập trung ở đâu?", a: "Trên bãi biển thuộc quận Sơn Trà, Đà Nẵng. Vị trí chính xác và điểm gặp cụ thể được nhắn cho bạn khi trường xác nhận buổi học." },
] as const;

export const FOOTER = {
  area: "Bãi biển quận Sơn Trà, Đà Nẵng",
  email: "xinchao@rangsong.example",
  phone: "0236 000 0000",
};
