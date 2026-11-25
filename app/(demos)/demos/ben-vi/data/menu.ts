/** Dữ liệu thực đơn. Giá tham khảo (VND / phần), thay đổi theo ngày. */
export type Taste = "thanh" | "beo" | "cay" | "nuong";
export type Course = "khai-vi" | "chinh" | "rau" | "no";

export type Dish = {
  id: string;
  name: string;
  note: string;
  course: Course;
  taste: Taste[];
  /** giá tham khảo cho 1 phần (2–3 người) */
  price: number;
  /** có hải sản vỏ cứng (tôm cua ghẹ, nghêu sò ốc) */
  shellfish: boolean;
  photo?: string;
};

export const COURSE_LABEL: Record<Course, string> = {
  "khai-vi": "Khai vị",
  chinh: "Món chính",
  rau: "Rau & canh",
  no: "Cơm & lẩu",
};

export const TASTE_LABEL: Record<Taste, string> = {
  thanh: "Thanh, nhẹ",
  beo: "Béo, đậm đà",
  cay: "Cay nồng",
  nuong: "Nướng than",
};

export const DISHES: Dish[] = [
  { id: "hau-nuong-mo-hanh", name: "Hàu nướng mỡ hành", note: "Hàu nướng than, mỡ hành, đậu phộng giã", course: "khai-vi", taste: ["nuong", "beo"], price: 180000, shellfish: true, photo: "hau-dia-toi" },
  { id: "hau-song-chanh", name: "Hàu sống chanh muối ớt", note: "Dùng lạnh, chanh muối ớt xanh", course: "khai-vi", taste: ["thanh"], price: 220000, shellfish: true, photo: "hau-da-lanh" },
  { id: "goi-tom-thit", name: "Gỏi xoài tôm khô", note: "Xoài xanh, tôm khô, rau răm, mè rang", course: "khai-vi", taste: ["thanh", "cay"], price: 120000, shellfish: true },
  { id: "chao-so-diep", name: "Sò điệp nướng phô mai", note: "Sò điệp nướng bơ tỏi, rắc phô mai", course: "khai-vi", taste: ["beo", "nuong"], price: 210000, shellfish: true },
  { id: "tom-nuong-muoi-ot", name: "Tôm sú nướng muối ớt", note: "Tôm sú nướng than, muối ớt xanh", course: "chinh", taste: ["nuong", "cay"], price: 480000, shellfish: true, photo: "tom-bat-go" },
  { id: "tom-rang-me", name: "Tôm rang me", note: "Tôm sú rang me chua ngọt, hành phi", course: "chinh", taste: ["beo", "thanh"], price: 420000, shellfish: true, photo: "tom-sot" },
  { id: "cua-rang-me", name: "Cua rang me", note: "Cua thịt rang me, ăn kèm bánh mì nướng", course: "chinh", taste: ["beo", "cay"], price: 690000, shellfish: true, photo: "cua-hoang-de" },
  { id: "ghe-hap-bia", name: "Ghẹ hấp bia sả", note: "Ghẹ hấp bia, sả, gừng, chấm muối tiêu chanh", course: "chinh", taste: ["thanh"], price: 520000, shellfish: true },
  { id: "muc-nuong-sa-te", name: "Mực nướng sa tế", note: "Mực ống nướng than, sa tế tỏi ớt", course: "chinh", taste: ["nuong", "cay"], price: 360000, shellfish: false, photo: "muc-nuong-than" },
  { id: "muc-hap-gung", name: "Mực hấp gừng", note: "Mực ống hấp gừng hành, nước chấm mắm gừng", course: "chinh", taste: ["thanh"], price: 340000, shellfish: false },
  { id: "ca-chinh-hap-xi-dau", name: "Cá chình hấp xì dầu", note: "Cá chình hấp, xì dầu gừng, hành ngò", course: "chinh", taste: ["thanh", "beo"], price: 460000, shellfish: false, photo: "ca-tuoi-da" },
  { id: "ca-thu-nuong-muoi", name: "Cá thu nướng muối ớt", note: "Cá thu một nắng nướng than, muối ớt", course: "chinh", taste: ["nuong", "cay"], price: 390000, shellfish: false },
  { id: "xien-nuong-hon-hop", name: "Xiên nướng hải sản", note: "Xiên mực, tôm, hành tây nướng sốt mật ong", course: "chinh", taste: ["nuong"], price: 260000, shellfish: true, photo: "xien-nuong" },
  { id: "nghe-hap-sa", name: "Nghêu hấp sả ớt", note: "Nghêu hấp sả, ớt, lá chanh", course: "chinh", taste: ["thanh", "cay"], price: 240000, shellfish: true, photo: "nghe-so" },
  { id: "rau-muong-xao-toi", name: "Rau muống xào tỏi", note: "Rau muống xào lửa lớn, tỏi phi", course: "rau", taste: ["thanh"], price: 90000, shellfish: false },
  { id: "canh-chua-ca", name: "Canh chua cá", note: "Canh chua me, thơm, cà chua, rau om", course: "rau", taste: ["thanh"], price: 190000, shellfish: false },
  { id: "com-chien-hai-san", name: "Cơm chiên hải sản", note: "Cơm chiên tôm, mực, trứng, hành lá", course: "no", taste: ["beo"], price: 170000, shellfish: true },
  { id: "lau-hai-san", name: "Lẩu hải sản bếp lửa", note: "Nồi lẩu cá, mực, nghêu, rau; nước dùng xương ninh", course: "no", taste: ["thanh", "cay"], price: 720000, shellfish: true },
];

export const dishById = (id: string) => DISHES.find((d) => d.id === id);

export const vnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
