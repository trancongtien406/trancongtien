"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";
import { Editor } from "./Editor";
import { Mark } from "./Poster";

const MSG = "Bắt đầu với";
const Spark = () => (<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v14M1 8h14M3 3l10 10M13 3 3 13" stroke="#d9724a" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const Hex = () => (<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="#111" strokeWidth="1.4"><path d="M8 1.5 14 5v6l-6 3.5L2 11V5Z" /><path d="M8 5.5v5M5.5 7l5 2" /></svg>);
const Cube = () => (<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 14 5v6l-6 3.5L2 11V5Z" fill="#111" /><path d="M8 8 14 5M8 8v6.5M8 8 2 5" stroke="#fff" strokeWidth="1" /></svg>);

export function Mcp() {
  const [txt, setTxt] = useState(MSG);
  const [chat, setChat] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0, id: ReturnType<typeof setInterval> | undefined, t: ReturnType<typeof setTimeout> | undefined;
    const run = () => { i = 0; setTxt(""); id = setInterval(() => { i++; setTxt(MSG.slice(0, i)); if (i >= MSG.length) { clearInterval(id); t = setTimeout(run, 2600); } }, 130); };
    run();
    return () => { clearInterval(id); clearTimeout(t); };
  }, []);
  useEffect(() => {
    const el = chatRef.current; if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setChat(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <section id="tm-mcp" className={styles.mcp} aria-labelledby="tm-h-mcp">
        <h2 id="tm-h-mcp" className={styles.h2xl}>Kết nối trợ lý AI<br />của bạn qua<br />→ MCP</h2>
        <ul className={styles.chips} aria-label="Trợ lý tương thích (tên minh hoạ)">
          <li className={styles.c1}><Spark />Trợ lý Mây</li>
          <li className={styles.c2}><Hex />Trợ lý Sao</li>
          <li className={styles.c3}><Cube />Trình mã Khối</li>
        </ul>
        <p className={styles.mp1}>Trợ lý có thể dựng chuỗi cảnh ngay trong trình chỉnh sửa, còn bạn vẫn là người giữ hướng đi.</p>
        <p className={styles.mp2}>Hãy đưa cho nó tệp, bản brief và các ràng buộc.</p>
        <div className={styles.chatMini}>
          <p><b><Mark size={16} /> Thư Viện</b> × <Spark /> Mây <em>Đã kết nối</em></p>
          <div className={styles.input}>{txt}<span className={styles.caret} aria-hidden="true" /><u aria-hidden="true">↵</u></div>
        </div>
        <div className={styles.mcpCard} aria-hidden="true"><Editor shots={3} /></div>
      </section>

      <section ref={chatRef} className={styles.chatSec} aria-labelledby="tm-h-chat">
        <h2 id="tm-h-chat" className={styles.srOnly}>Trợ lý dựng chuỗi cảnh ngay trong trình chỉnh sửa</h2>
        <div className={`${styles.chatBig} ${chat ? styles.chatGo : ""}`}>
          <p className={styles.chatHead}><b><Mark size={18} /> Thư Viện</b> × <Spark /> Mây <em>Đã kết nối</em></p>
          <div className={styles.chatBody}>
            <i className={styles.skel} /><i className={`${styles.skel} ${styles.skelS}`} />
            <p className={styles.me1}>Bắt đầu với Vòng 07 và chín poster của tôi.</p>
            <p className={styles.ai1}>Đã thêm một cảnh: Vòng 07, 20 giây</p>
            <p className={styles.me2}>Thêm hai cảnh nữa.</p>
            <p className={styles.tool}><span aria-hidden="true" /><b>thuvien / them_canh ×2</b><small>Vòng 03, Vòng 04</small></p>
            <p className={styles.ai2}>Đã thêm hai cảnh, tổng cộng 41,9 giây</p>
          </div>
          <div className={styles.input}>Mô tả một thay đổi…<u aria-hidden="true">↵</u></div>
        </div>
        <div className={styles.chatEd}><Editor shots={3} ring toast label="Trình chỉnh sửa sau khi trợ lý thêm hai cảnh" /><p className={styles.agent}><Spark /> Mây</p></div>
      </section>
    </>
  );
}
