import { Fragment } from "react";

/** Mỗi từ trong một mặt nạ overflow (trượt lên khi vào). `hi` là các từ nhấn đỏ/nghiêng. */
export function Mask({ text, className, hi = [] }: { text: string; className?: string; hi?: string[] }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={className} data-w="">
            <span data-wi="" data-hi={hi.includes(w) ? "1" : undefined} style={{ display: "inline-block" }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** Mỗi từ là một span riêng để sáng dần theo cuộn. */
export function Scrub({ text, hi = [] }: { text: string; hi?: string[] }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span data-mw="" data-hi={hi.includes(w.replace(/[.,]/g, "")) ? "1" : undefined}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
