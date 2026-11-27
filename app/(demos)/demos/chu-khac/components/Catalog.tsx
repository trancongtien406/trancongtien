"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../brand.module.css";
import { Cover } from "./Cover";

export type Book = { title: string; kind: string; author: string; year: string; pages: number; price: number };

export function Catalog({ books }: { books: Book[] }) {
  const [active, setActive] = useState<number | null>(null);
  const prev = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useEffect(() => {
    const el = prev.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    move.current = { x, y };
    return () => { gsap.killTweensOf(el); move.current = null; };
  }, []);

  return (
    <div className={styles.catalog} onMouseMove={(e) => move.current && (move.current.x(e.clientX + 28), move.current.y(e.clientY - 120))} onMouseLeave={() => setActive(null)}>
      <ul>
        {books.map((b, i) => (
          <li key={b.title} data-active={active === i ? "1" : "0"}>
            <a href="#dat-truoc" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
              <span className={styles.cNo}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.cTitle}>{b.title}</span>
              <span className={styles.cKind}>{b.kind}</span>
              <span className={styles.cAuthor}>{b.author}</span>
              <span className={styles.cPrice}>{b.price.toLocaleString("vi-VN")}đ</span>
            </a>
            <div className={styles.cMobile} aria-hidden="true"><Cover i={i} title={b.title} /></div>
          </li>
        ))}
      </ul>
      <div ref={prev} className={styles.preview} data-show={active === null ? "0" : "1"} aria-hidden="true">
        {books.map((b, i) => (<div key={b.title} data-on={active === i ? "1" : "0"}><Cover i={i} title={b.title} /></div>))}
      </div>
    </div>
  );
}
