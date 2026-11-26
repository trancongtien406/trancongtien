"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EV } from "./events";
import { src } from "../data/images";
import {
  BOARDS_KEY,
  CATEGORY_LABEL,
  DRAFT_KEY,
  MAX_BOARDS,
  NAME_MAX,
  NOTES_MAX,
  PRESETS,
  byCat,
  byId,
  isBoard,
  isSelection,
  type MaterialBoard,
  type MaterialCategory,
  type Selection,
} from "../data/materials";
import s from "../brand.module.css";

const DEFAULT_SEL = PRESETS[0].selection;
const DEFAULT_NAME = "Bảng vật liệu của tôi";
const CATS: MaterialCategory[] = ["wood", "stone", "fabric"];
const PAPER = "#EDEAE2";
const INK = "#262824";

function slugify(t: string) {
  return (
    t
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "board"
  );
}

function loadImg(url: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => rej(new Error("img"));
    im.src = url;
  });
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number) {
  const lines: string[] = [];
  let truncated = false;
  for (const para of text.split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = word;
      } else line = test;
    }
    lines.push(line);
  }
  if (lines.length > maxLines) {
    truncated = true;
    lines.length = maxLines;
  }
  if (truncated) {
    let last = lines[maxLines - 1];
    while (last && ctx.measureText(`${last}…`).width > maxW) last = last.slice(0, -1);
    lines[maxLines - 1] = `${last}…`;
  }
  return lines;
}

export function BoardBuilder() {
  const [sel, setSel] = useState<Selection>(DEFAULT_SEL);
  const [name, setName] = useState(DEFAULT_NAME);
  const [notes, setNotes] = useState("");
  const [boards, setBoards] = useState<MaterialBoard[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [nameErr, setNameErr] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const ready = useRef(false);
  const fontProbe = useRef<HTMLHeadingElement>(null);
  const serifProbe = useRef<HTMLParagraphElement>(null);
  const dirtyRef = useRef(false);

  const dirty = notes.trim() !== "" || name !== DEFAULT_NAME || CATS.some((c) => sel[c] !== DEFAULT_SEL[c]);
  useEffect(() => {
    dirtyRef.current = dirty;
  }, [dirty]);

  // khôi phục danh sách + bản nháp (đọc localStorage chỉ có thể làm sau hydration)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BOARDS_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setBoards(arr.filter(isBoard).slice(0, MAX_BOARDS));
      }
      const d = localStorage.getItem(DRAFT_KEY);
      if (d) {
        const o = JSON.parse(d) as { selection?: unknown; name?: unknown; notes?: unknown };
        if (isSelection(o.selection)) setSel(o.selection);
        if (typeof o.name === "string") setName(o.name.slice(0, NAME_MAX));
        if (typeof o.notes === "string") setNotes(o.notes.slice(0, NOTES_MAX));
      }
    } catch {
      setStorageOk(false);
    }
    ready.current = true;
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // autosave nháp (debounce 500ms)
  useEffect(() => {
    if (!ready.current) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ selection: sel, name, notes }));
      } catch {
        setStorageOk(false);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [sel, name, notes]);

  const applyPreset = useCallback((id: string) => {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setSel(p.selection);
    setPending(null);
    setMsg({ kind: "ok", text: `Đã áp dụng preset “${p.name}”.` });
  }, []);

  useEffect(() => {
    const onPreset = (e: Event) => {
      const id = (e as CustomEvent<{ presetId: string }>).detail?.presetId;
      if (!PRESETS.some((p) => p.id === id)) return;
      if (dirtyRef.current) setPending(id);
      else applyPreset(id);
    };
    const onMat = (e: Event) => {
      const m = byId((e as CustomEvent<{ id: string }>).detail?.id);
      if (m) setSel((v) => ({ ...v, [m.category]: m.id }));
    };
    window.addEventListener(EV.preset, onPreset);
    window.addEventListener(EV.material, onMat);
    return () => {
      window.removeEventListener(EV.preset, onPreset);
      window.removeEventListener(EV.material, onMat);
    };
  }, [applyPreset]);

  const mats = CATS.map((c) => byId(sel[c])!);
  const palette = [...mats.map((m) => m.color), PAPER, INK];

  const persist = (list: MaterialBoard[]) => {
    try {
      localStorage.setItem(BOARDS_KEY, JSON.stringify(list));
      setBoards(list);
      return true;
    } catch {
      setBoards(list);
      setMsg({ kind: "err", text: "Không thể lưu trên thiết bị này. Bạn vẫn có thể xuất ảnh hoặc ghi chú." });
      return false;
    }
  };

  const validName = () => {
    const n = name.trim();
    if (n.length < 1 || n.length > NAME_MAX) {
      setNameErr(`Nhập tên bảng (1–${NAME_MAX} ký tự).`);
      return null;
    }
    setNameErr("");
    return n;
  };

  const save = (asNew: boolean) => {
    const n = validName();
    if (!n) return;
    const now = new Date().toISOString();
    const existing = !asNew && currentId ? boards.find((b) => b.id === currentId) : undefined;
    if (!existing && boards.length >= MAX_BOARDS) {
      setMsg({ kind: "err", text: `Đã đủ ${MAX_BOARDS} bảng. Hãy xoá một bảng hoặc cập nhật bảng hiện tại.` });
      return;
    }
    const board: MaterialBoard = existing
      ? { ...existing, name: n, notes, selection: sel, updatedAt: now }
      : { schemaVersion: 1, id: crypto.randomUUID(), name: n, notes, selection: sel, createdAt: now, updatedAt: now };
    const list = [board, ...boards.filter((b) => b.id !== board.id)];
    if (persist(list)) {
      setCurrentId(board.id);
      setMsg({ kind: "ok", text: "Bảng vật liệu đã được lưu trên thiết bị này." });
    }
  };

  const remove = (id: string) => {
    persist(boards.filter((b) => b.id !== id));
    if (currentId === id) setCurrentId(null);
    setConfirmDel(null);
    setMsg({ kind: "ok", text: "Đã xoá bảng vật liệu." });
  };

  const open = (b: MaterialBoard) => {
    setSel(b.selection);
    setName(b.name);
    setNotes(b.notes);
    setCurrentId(b.id);
    setMsg({ kind: "ok", text: `Đã mở “${b.name}”.` });
  };

  const reset = () => {
    setSel(DEFAULT_SEL);
    setName(DEFAULT_NAME);
    setNotes("");
    setCurrentId(null);
    setNameErr("");
    setPending(null);
    setMsg({ kind: "ok", text: "Đã tạo lại bảng mới." });
  };

  const textOut = () =>
    [
      "KHỐI NẾP — MATERIAL BOARD",
      "",
      `Tên bảng: ${name.trim() || DEFAULT_NAME}`,
      "",
      ...CATS.flatMap((c) => [CATEGORY_LABEL[c].toUpperCase(), `${byId(sel[c])!.name} — ${byId(sel[c])!.color}`, ""]),
      "BẢNG MÀU",
      ...palette,
      "",
      "GHI CHÚ",
      notes.trim() || "(trống)",
      "",
      "Ảnh vật liệu: Pexels (xem /demos/khoi-nep/credits).",
    ].join("\n");

  const exportTxt = () => {
    download(new Blob([textOut()], { type: "text/plain;charset=utf-8" }), `khoi-nep-material-board-${slugify(name)}.txt`);
    setMsg({ kind: "ok", text: "Đã xuất ghi chú (.txt)." });
  };
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(textOut());
      setMsg({ kind: "ok", text: "Đã sao chép bảng vật liệu và ghi chú." });
    } catch {
      setMsg({ kind: "err", text: "Không thể sao chép. Hãy thử lại hoặc xuất ghi chú." });
    }
  };

  const exportPng = async () => {
    const n = validName();
    if (!n || exporting) return;
    setExporting(true);
    try {
      const sans = getComputedStyle(fontProbe.current!).fontFamily;
      const serif = getComputedStyle(serifProbe.current!).fontFamily;
      await Promise.all([
        document.fonts.load(`600 40px ${sans}`, "KHỐI NẾP Ắ"),
        document.fonts.load(`500 40px ${sans}`, "Ắ"),
        document.fonts.load(`400 24px ${serif}`, "Ắ"),
      ]);
      await document.fonts.ready;
      const imgs = await Promise.all(mats.map((m) => loadImg(src(m.photo, 1200))));
      const cv = document.createElement("canvas");
      cv.width = 1600;
      cv.height = 1200;
      const ctx = cv.getContext("2d")!;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, 1600, 1200);
      ctx.fillStyle = INK;
      ctx.textBaseline = "alphabetic";
      ctx.font = `600 26px ${sans}`;
      ctx.fillText("KHỐI NẾP — MATERIAL BOARD", 80, 76);
      ctx.fillStyle = "#52574D";
      ctx.font = `500 20px ${sans}`;
      ctx.textAlign = "right";
      ctx.fillText("MATERIAL BOARD", 1520, 76);
      ctx.textAlign = "left";
      ctx.fillStyle = INK;
      ctx.fillRect(80, 96, 1440, 2);
      ctx.font = `500 64px ${sans}`;
      let title = n;
      while (ctx.measureText(title).width > 1440 && title.length > 1) title = title.slice(0, -1);
      ctx.fillText(title === n ? title : `${title}…`, 80, 170);
      const rects: [number, number, number, number][] = [
        [80, 220, 668, 625],
        [778, 220, 742, 298],
        [778, 548, 742, 297],
      ];
      mats.forEach((m, i) => {
        const [x, y, w, h] = rects[i];
        const im = imgs[i];
        const sc = Math.max(w / im.naturalWidth, h / im.naturalHeight);
        const sw = w / sc;
        const sh = h / sc;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, x, y, w, h);
        if (m.tint) {
          ctx.globalCompositeOperation = "multiply";
          ctx.fillStyle = m.tint;
          ctx.fillRect(x, y, w, h);
        }
        ctx.restore();
        ctx.fillStyle = "rgba(250,249,246,.92)";
        ctx.fillRect(x, y + h - 56, 300, 56);
        ctx.fillStyle = INK;
        ctx.font = `600 22px ${sans}`;
        ctx.fillText(`${CATEGORY_LABEL[m.category].toUpperCase()} · ${m.name}`, x + 16, y + h - 21);
      });
      const gap = 16;
      const pw = (1440 - gap * 4) / 5;
      palette.forEach((c, i) => {
        const x = 80 + i * (pw + gap);
        ctx.fillStyle = c;
        ctx.fillRect(x, 875, pw, 75);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, 875.5, pw - 1, 74);
        ctx.fillStyle = INK;
        ctx.font = `500 20px ${sans}`;
        ctx.fillText(c.toUpperCase(), x, 982);
      });
      ctx.fillStyle = INK;
      ctx.fillRect(80, 1004, 1440, 1);
      ctx.font = `400 24px ${serif}`;
      const lines = wrapText(ctx, notes.trim() || "Chưa có ghi chú.", 1440, 3);
      lines.forEach((l, i) => ctx.fillText(l, 80, 1050 + i * 34));
      ctx.fillStyle = "#52574D";
      ctx.font = `500 18px ${sans}`;
      ctx.fillText("Bảng vật liệu tham khảo · Ảnh vật liệu: Pexels (xem /demos/khoi-nep/credits)", 80, 1160);

      const blob = await new Promise<Blob | null>((r) => cv.toBlob(r, "image/png"));
      if (!blob) throw new Error("blob");
      download(blob, `khoi-nep-material-board-${slugify(n)}-${new Date().toISOString().slice(0, 10)}.png`);
      setMsg({ kind: "ok", text: "Đã xuất ảnh PNG 1600 × 1200." });
    } catch {
      setMsg({ kind: "err", text: "Không thể xuất ảnh. Hãy thử lại hoặc xuất ghi chú." });
    } finally {
      setExporting(false);
    }
  };

  return (
    <section id="board" className={`${s.section} ${s.board}`} aria-labelledby="board-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.secHead}>
          <p className={s.label}>09 / Bảng vật liệu</p>
          <h2 id="board-title" className={s.h2} ref={fontProbe}>
            Phối vật liệu theo cách của bạn.
          </h2>
          <p className={s.secLead} ref={serifProbe}>
            Chọn gỗ, đá và vải để tạo một bảng cảm hứng riêng. Thử thay đổi sắc độ, lưu lại những lựa chọn yêu thích hoặc
            xuất bảng vật liệu để tham khảo sau.
          </p>
        </div>

        <div className={s.boardGrid}>
          <div className={s.boardCtl}>
            <div className={s.estHead}>
              <span>Khối Nếp / Material board lab</span>
            </div>
            <fieldset className={s.fs}>
              <legend>Bắt đầu từ một cảm hứng</legend>
              <div className={s.presets}>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={s.preset}
                    aria-pressed={CATS.every((c) => sel[c] === p.selection[c])}
                    onClick={() => (dirty ? setPending(p.id) : applyPreset(p.id))}
                  >
                    <strong>{p.name}</strong>
                    <small>{p.mood}</small>
                  </button>
                ))}
              </div>
            </fieldset>
            {pending && (
              <div className={s.confirm} role="alertdialog" aria-label="Xác nhận ghi đè">
                <p>
                  Bạn đã chỉnh bảng này. Ghi đè lựa chọn vật liệu bằng preset “{PRESETS.find((p) => p.id === pending)?.name}”? Tên bảng và ghi chú được giữ nguyên.
                </p>
                <div>
                  <button type="button" className={s.btnDark} onClick={() => applyPreset(pending)}>
                    Ghi đè
                  </button>
                  <button type="button" className={s.btnLine} onClick={() => setPending(null)}>
                    Giữ nguyên
                  </button>
                </div>
              </div>
            )}
            {CATS.map((c) => (
              <fieldset key={c} className={s.fs}>
                <legend>{CATEGORY_LABEL[c]}</legend>
                <div className={s.matPick}>
                  {byCat(c).map((m) => (
                    <label key={m.id} className={s.pickOpt}>
                      <input type="radio" name={`kn-mat-${c}`} checked={sel[c] === m.id} onChange={() => setSel((v) => ({ ...v, [c]: m.id }))} />
                      <span>
                        <i className={s.dot} style={{ background: m.color }} aria-hidden="true" />
                        {m.name}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className={s.fs}>
              <label className={s.legend} htmlFor="kn-bname">
                Tên bảng vật liệu
              </label>
              <input
                id="kn-bname"
                className={s.input}
                value={name}
                maxLength={NAME_MAX}
                aria-invalid={!!nameErr}
                aria-describedby={nameErr ? "kn-bname-err" : undefined}
                onChange={(e) => setName(e.target.value)}
              />
              {nameErr && (
                <p id="kn-bname-err" className={s.err} role="alert">
                  {nameErr}
                </p>
              )}
            </div>
            <div className={s.fs}>
              <label className={s.legend} htmlFor="kn-bnotes">
                Ghi chú của bạn
              </label>
              <textarea
                id="kn-bnotes"
                className={s.input}
                rows={3}
                value={notes}
                maxLength={NOTES_MAX}
                placeholder="Ghi lại những điều bạn muốn cho không gian này..."
                onChange={(e) => setNotes(e.target.value)}
              />
              <p className={s.hint}>
                {notes.length}/{NOTES_MAX} ký tự
              </p>
            </div>
          </div>

          <div className={s.boardView}>
            <div className={s.moodboard} data-testid="moodboard" aria-label={`Bảng vật liệu: ${mats.map((m) => m.name).join(", ")}`}>
              {mats.map((m, i) => (
                <figure key={m.id} className={`${s.tile} ${s[`tile${i + 1}` as "tile1"]}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src(m.photo, 1200)} alt="" loading="lazy" decoding="async" />
                  {m.tint && <i className={s.tint} style={{ background: m.tint }} />}
                  <figcaption>
                    <b>{CATEGORY_LABEL[m.category]}</b> · {m.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ul className={s.palette} aria-label="Bảng màu">
              {palette.map((c, i) => (
                <li key={i}>
                  <i style={{ background: c }} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className={s.boardBtns}>
              <button type="button" className={s.btnDark} onClick={() => save(false)}>
                {currentId ? "Cập nhật bảng vật liệu" : "Lưu bảng vật liệu"}
              </button>
              {currentId && (
                <button type="button" className={s.btnLine} onClick={() => save(true)}>
                  Lưu thành bản mới
                </button>
              )}
              <button type="button" className={s.btnLine} onClick={exportPng} disabled={exporting}>
                {exporting ? "Đang xuất…" : "Xuất ảnh PNG"}
              </button>
              <button type="button" className={s.btnLine} onClick={exportTxt}>
                Xuất ghi chú
              </button>
              <button type="button" className={s.btnLine} onClick={copyText}>
                Sao chép
              </button>
              <button type="button" className={s.btnLine} onClick={reset}>
                Tạo lại
              </button>
            </div>
            <p role="status" className={msg?.kind === "err" ? s.noteErrDark : s.noteOkDark}>
              {msg?.text ?? ""}
            </p>
            {!storageOk && <p className={s.hint}>Trình duyệt đang chặn lưu cục bộ; bảng sẽ không được nhớ sau khi tải lại.</p>}

            <div className={s.saved}>
              <h3 className={s.h3}>Những bảng đã lưu</h3>
              {boards.length === 0 ? (
                <p className={s.hint} data-testid="board-empty">
                  Bạn chưa lưu bảng vật liệu nào.
                </p>
              ) : (
                <ul data-testid="board-list">
                  {boards.map((b) => (
                    <li key={b.id}>
                      <div>
                        <strong>{b.name}</strong>
                        <small>
                          {CATS.map((c) => byId(b.selection[c])!.name).join(" · ")} ·{" "}
                          {new Date(b.updatedAt).toLocaleDateString("vi-VN")}
                        </small>
                      </div>
                      <div className={s.savedBtns}>
                        <button type="button" className={s.textBtn} onClick={() => open(b)}>
                          Mở
                        </button>
                        {confirmDel === b.id ? (
                          <>
                            <button type="button" className={s.textBtnDanger} onClick={() => remove(b.id)}>
                              Xác nhận xoá
                            </button>
                            <button type="button" className={s.textBtn} onClick={() => setConfirmDel(null)}>
                              Huỷ
                            </button>
                          </>
                        ) : (
                          <button type="button" className={s.textBtn} onClick={() => setConfirmDel(b.id)}>
                            Xoá
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
