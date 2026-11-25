"use client";

/**
 * Lõi dùng chung của thư viện hiệu ứng hành vi (không có ngôn ngữ thiết kế).
 * Quy ước: mọi hiệu ứng hiển thị đủ nội dung khi SSR / no-JS / reduced-motion;
 * chỉ khi JS chạy xong (layout effect, trước khi vẽ) mới đặt trạng thái ẩn ban đầu rồi phát.
 */
import { useEffect, useLayoutEffect, type CSSProperties, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

let registered = false;
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export const matches = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;
export const prefersReducedMotion = () => matches("(prefers-reduced-motion: reduce)");
export const hasFinePointer = () => matches("(hover: hover) and (pointer: fine)");

/** Ẩn khỏi trình đọc màn hình nhưng vẫn đọc được (bản chữ cuối cho hiệu ứng thay đổi chữ). */
export const srOnly: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const nfc = (s: string) => s.normalize("NFC");

/** id hợp lệ cho class/selector/url(#id) từ useId() của React. */
export const safeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "");

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Đợi font tải xong (để đo dòng chính xác). Luôn resolve, có trần thời gian. */
export function whenFontsReady(maxMs = 2500): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.ready) return Promise.resolve();
  return Promise.race([
    document.fonts.ready.then(() => undefined),
    new Promise<void>((r) => window.setTimeout(r, maxMs)),
  ]);
}

/** Gắn/gỡ listener đối xứng: trả về hàm gỡ. */
export function on<K extends keyof WindowEventMap>(t: Window, type: K, fn: (e: WindowEventMap[K]) => void, o?: AddEventListenerOptions | boolean): () => void;
export function on<K extends keyof DocumentEventMap>(t: Document, type: K, fn: (e: DocumentEventMap[K]) => void, o?: AddEventListenerOptions | boolean): () => void;
export function on<K extends keyof HTMLElementEventMap>(t: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void, o?: AddEventListenerOptions | boolean): () => void;
export function on(t: EventTarget, type: string, fn: (e: never) => void, o?: AddEventListenerOptions | boolean): () => void {
  t.addEventListener(type, fn as EventListener, o);
  return () => t.removeEventListener(type, fn as EventListener, o);
}

/** IntersectionObserver gọn. once: gỡ sau lần vào khung đầu tiên. Trả về hàm dọn. */
export function observeInView(
  el: Element,
  cb: (inView: boolean) => void,
  opts: { rootMargin?: string; threshold?: number; once?: boolean } = {},
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    cb(true);
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        cb(e.isIntersecting);
        if (e.isIntersecting && opts.once) io.disconnect();
      }
    },
    { rootMargin: opts.rootMargin ?? "0px 0px -8% 0px", threshold: opts.threshold ?? 0.01 },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** Đánh dấu hiệu ứng đã khởi chạy (để kiểm thử và để consumer biết). */
export function markReady(el: Element | null | undefined, state = "1") {
  el?.setAttribute("data-fx-ready", state);
}

type Setup<T extends HTMLElement> = (el: T) => void | (() => void);

function factory(useE: typeof useEffect) {
  return function useFxImpl<T extends HTMLElement>(ref: RefObject<T | null>, setup: Setup<T>, deps: DependencyList) {
    useE(() => {
      const el = ref.current;
      if (!el) return;
      registerGsap();
      let cleanup: void | (() => void);
      const ctx = gsap.context(() => {
        cleanup = setup(el);
      }, el);
      return () => {
        if (cleanup) cleanup();
        ctx.revert();
      };
    }, deps);
  };
}

/** Chạy setup trong gsap.context gắn với phần tử; dọn bằng revert + cleanup trả về. (useEffect) */
export const useFx = factory(useEffect);
/** Như useFx nhưng chạy trước khi vẽ (đặt trạng thái ẩn ban đầu không nhấp nháy). */
export const useFxLayout = factory(useIsoLayoutEffect);
