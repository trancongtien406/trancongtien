"use client";

import { useSyncExternalStore } from "react";
import { PRODUCTS } from "./data";

/** Giỏ hàng dùng chung giữa thanh app (trong cảnh 3D), bảng đặc sản và form đặt hàng. */
type Cart = Record<number, number>;
let cart: Cart = {};
let snap = { n: 0, total: 0, lines: [] as { id: number; qty: number }[] };
const subs = new Set<() => void>();

function recompute() {
  const lines = Object.entries(cart).map(([id, qty]) => ({ id: Number(id), qty }));
  snap = {
    n: lines.reduce((s, l) => s + l.qty, 0),
    total: lines.reduce((s, l) => s + PRODUCTS[l.id].price * l.qty, 0),
    lines,
  };
  subs.forEach((f) => f());
}
export function addToCart(id: number) {
  cart = { ...cart, [id]: (cart[id] ?? 0) + 1 };
  recompute();
}
export function setQty(id: number, qty: number) {
  const n = { ...cart };
  if (qty <= 0) delete n[id];
  else n[id] = qty;
  cart = n;
  recompute();
}
export function clearCart() {
  cart = {};
  recompute();
}
const serverSnap = { n: 0, total: 0, lines: [] as { id: number; qty: number }[] };
export function useCart() {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => snap,
    () => serverSnap,
  );
}
