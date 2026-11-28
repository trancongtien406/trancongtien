export type BagItem = { id: string; name: string; price: number };
export const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";
/** Thêm vào giỏ từ bất kỳ section nào: Shop lắng nghe sự kiện này. */
export function addToBag(item: BagItem) {
  window.dispatchEvent(new CustomEvent<BagItem>("gs:add", { detail: item }));
}
export function openBag() {
  window.dispatchEvent(new Event("gs:openbag"));
}
