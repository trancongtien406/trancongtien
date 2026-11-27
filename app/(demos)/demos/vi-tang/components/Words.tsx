import { Fragment } from "react";

/** Tách từ phía server: mỗi từ nằm trong mặt nạ overflow, để GSAP trượt lên khi cuộn. */
export function Words({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={className} data-w="">
            <span data-wi="" style={{ display: "inline-block" }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
