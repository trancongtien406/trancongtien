/**
 * Ước tính buổi thu. Thuần hàm, không gọi mạng. Giá là giá tham khảo; báo giá chính thức theo yêu cầu thực tế.
 */
export type KindId = "vocal" | "band" | "podcast" | "voice" | "mix" | "beat";
export type Kind = {
  id: KindId; ch: string; label: string; short: string;
  rateEng: number; rateSelf: number | null;
  setup: number; perTrack: number; trackLabel: string; peopleLabel: string; usesPeople: boolean;
};

export const KINDS: readonly Kind[] = [
  { id: "vocal", ch: "CH 01", label: "Thu giọng", short: "Vocal", rateEng: 350000, rateSelf: 220000, setup: 0.5, perTrack: 0.6, trackLabel: "Số track giọng (lead, bè, ad-lib)", peopleLabel: "Số ca sĩ", usesPeople: true },
  { id: "band", ch: "CH 02", label: "Thu band", short: "Band", rateEng: 650000, rateSelf: null, setup: 1, perTrack: 0.45, trackLabel: "Số track (mỗi mic hoặc line là một track)", peopleLabel: "Số người chơi", usesPeople: true },
  { id: "podcast", ch: "CH 03", label: "Podcast", short: "Podcast", rateEng: 380000, rateSelf: 250000, setup: 0.5, perTrack: 0.5, trackLabel: "Số micro", peopleLabel: "Số người tham gia", usesPeople: true },
  { id: "voice", ch: "CH 04", label: "Voice-over", short: "Voice", rateEng: 450000, rateSelf: 280000, setup: 0.25, perTrack: 0.35, trackLabel: "Số đoạn đọc (bản đọc riêng)", peopleLabel: "Số giọng đọc", usesPeople: true },
  { id: "mix", ch: "CH 05", label: "Mix & Master", short: "Mix", rateEng: 300000, rateSelf: null, setup: 0.25, perTrack: 0.6, trackLabel: "Số track cần mix", peopleLabel: "", usesPeople: false },
  { id: "beat", ch: "CH 06", label: "Sản xuất beat", short: "Beat", rateEng: 400000, rateSelf: null, setup: 0.5, perTrack: 0.7, trackLabel: "Số lớp nhạc (trống, bass, hợp âm, giai điệu...)", peopleLabel: "", usesPeople: false },
] as const;

export const LIMITS = { hours: [1, 12], tracks: [1, 32], people: [1, 8], minBill: 2, discountFrom: 6, discountPct: 10 } as const;

export type Input = { kind: KindId; hours: number; tracks: number; people: number; engineer: boolean };
export type Result = {
  kind: Kind; engineer: boolean; engineerForced: boolean;
  needHours: number; billHours: number; rate: number;
  subtotal: number; discountPct: number; low: number; high: number; needCost: number;
  fit: "ok" | "short"; shortBy: number; splitHint: boolean; notes: string[];
};

const roundK = (v: number, step = 10000) => Math.round(v / step) * step;
const ceilHalf = (v: number) => Math.ceil(v * 2) / 2;

export function getKind(id: KindId) { return KINDS.find((k) => k.id === id)!; }

function price(k: Kind, engineer: boolean, hours: number, people: number) {
  const bill = Math.max(LIMITS.minBill, hours);
  const rate = engineer || k.rateSelf === null ? k.rateEng : k.rateSelf;
  const surcharge = k.id === "band" ? 1 + 0.06 * Math.max(0, people - 4) : 1;
  const discount = bill >= LIMITS.discountFrom ? LIMITS.discountPct : 0;
  const subtotal = bill * rate * surcharge * (1 - discount / 100);
  return { bill, rate, discount, subtotal };
}

export function estimate(i: Input): Result {
  const k = getKind(i.kind);
  const hours = Math.min(LIMITS.hours[1], Math.max(LIMITS.hours[0], Math.round(i.hours * 2) / 2));
  const tracks = Math.min(LIMITS.tracks[1], Math.max(LIMITS.tracks[0], Math.round(i.tracks)));
  const people = k.usesPeople ? Math.min(LIMITS.people[1], Math.max(LIMITS.people[0], Math.round(i.people))) : 1;
  const forced = k.rateSelf === null;
  const engineer = forced ? true : i.engineer;
  const need = ceilHalf(k.setup + tracks * k.perTrack * (1 + 0.18 * (people - 1)));
  const p = price(k, engineer, hours, people);
  const pn = price(k, engineer, need, people);
  const notes: string[] = [];
  if (forced) notes.push(i.kind === "mix" ? "Mix & Master luôn do engineer của phòng thực hiện." : i.kind === "beat" ? "Sản xuất beat luôn có producer của phòng cùng làm." : "Thu band cần engineer vận hành, nên mục tự thu không áp dụng.");
  if (hours < LIMITS.minBill) notes.push(`Buổi tối thiểu tính ${LIMITS.minBill} giờ.`);
  if (p.discount) notes.push(`Từ ${LIMITS.discountFrom} giờ liên tục được giảm ${LIMITS.discountPct}%.`);
  if (!engineer) notes.push("Tự thu: phòng chuẩn bị chuỗi tín hiệu và hướng dẫn 15 phút đầu; bạn tự vận hành.");
  if (i.kind === "band" && people > 4) notes.push("Từ người thứ 5, thêm 6% mỗi người cho phần setup và kiểm âm.");
  const shortBy = Math.max(0, need - hours);
  return {
    kind: k, engineer, engineerForced: forced, needHours: need, billHours: p.bill, rate: p.rate,
    subtotal: p.subtotal, discountPct: p.discount,
    low: roundK(p.subtotal * 0.95), high: roundK(p.subtotal * 1.15), needCost: roundK(pn.subtotal),
    fit: shortBy > 0 ? "short" : "ok", shortBy, splitHint: need > LIMITS.hours[1],
    notes,
  };
}

export function checklist(i: Input, r: Result): string[] {
  const out: string[] = [];
  switch (i.kind) {
    case "vocal":
      out.push("Nhạc nền (beat) dạng WAV 24-bit, 44.1 hoặc 48 kHz; ghi sẵn tempo (BPM) và tone.", "Lời bài hát in sẵn hoặc lưu trên điện thoại, đánh dấu chỗ lấy hơi và chỗ bè.", "Một bản nghe tham chiếu (bài có màu âm bạn thích) để engineer bắt đúng hướng.", "Uống nước ấm, tránh sữa và đồ lạnh trước buổi thu; đến sớm 10 phút để làm quen tai nghe.");
      break;
    case "band":
      out.push("Nhạc cụ đã lên dây mới hoặc kiểm tra: dây, da trống, pin, dây cáp dự phòng.", "Bản demo hoặc chart (hợp âm, cấu trúc) để cả nhóm chơi theo một bản.", "Thống nhất click track hay chơi tự do trước khi vào phòng.", "Cho biết nhạc cụ nào cần thu bằng micro, nhạc cụ nào đi thẳng line (DI) để xếp số track.");
      break;
    case "podcast":
      out.push("Kịch bản hoặc dàn ý từng phần, đánh dấu chỗ chèn nhạc đệm.", "Danh sách tên khách mời để gắn nhãn từng track micro.", "Tắt thông báo điện thoại; đeo tai nghe kín để tiếng không lọt vào micro.", "Nhạc hiệu, intro, outro nếu đã có (WAV hoặc MP3 320 kbps).");
      break;
    case "voice":
      out.push("Kịch bản đã chốt, tách theo đoạn và đánh số; ghi chú giọng đọc (tốc độ, cảm xúc).", "Bản video hoặc file hình ảnh nếu cần đọc khớp thời lượng.", "Nhắc cách đọc các tên riêng, số liệu, từ nước ngoài.", "Uống nước ấm, đọc thử một đoạn trước khi vào phòng.");
      break;
    case "beat":
      out.push("Một đến ba bài tham chiếu về nhịp, màu âm và không khí bạn muốn.", "BPM và tone dự kiến nếu đã có; nếu chưa, producer sẽ đề xuất theo giọng bạn.", "Lời hoặc giai điệu ngân nga (ghi âm điện thoại cũng được) để beat bám theo.", "Cho biết beat dùng để thu hát, để đăng nền tảng hay làm nhạc nền video.");
      break;
    case "mix":
      out.push("Xuất từng track thành WAV 24-bit, cùng điểm bắt đầu 0:00, không gắn limiter lên tổng.", "Đặt tên track rõ ràng (Vocal lead, Bè 1, Kick...) và ghi tempo.", "Một bản mix thô hoặc bài tham chiếu cho hướng âm thanh mong muốn.", "Ghi chú những chỗ cần xử lý (lỗi thu, chỗ tuning, chỗ muốn nhấn).");
      break;
  }
  if (!r.engineer) out.push("Mang ổ cứng hoặc USB để nhận lại file thu ngay sau buổi.");
  if (i.people > 1 && i.kind !== "mix") out.push(`Báo trước ${i.people} người tham gia để bố trí đủ tai nghe và vị trí đứng.`);
  return out;
}

export function summary(i: Input, r: Result, fmt: (n: number) => string): string {
  return [
    `Tần Số Studio, ước tính buổi thu (giá tham khảo)`,
    `Loại: ${r.kind.label}${r.engineer ? ", có engineer" : ", tự thu"}`,
    `Số giờ chọn: ${i.hours}, số track: ${i.tracks}${r.kind.usesPeople ? `, ${i.people} ${r.kind.peopleLabel.toLowerCase().replace("số ", "")}` : ""}`,
    `Giờ nên dự trù: ${r.needHours}`,
    `Chi phí tham khảo: ${fmt(r.low)} đến ${fmt(r.high)}`,
  ].join("\n");
}
