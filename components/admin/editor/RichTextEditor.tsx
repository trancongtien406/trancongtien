"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function ToolBtn({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg border text-slate-600 transition",
        active
          ? "border-brand bg-brand-soft text-brand"
          : "border-transparent hover:border-slate-200 hover:bg-white",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Viết nội dung bài viết...",
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [draftAlt, setDraftAlt] = useState("");
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none min-h-70 px-4 py-3 focus:outline-none text-slate-800",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  async function uploadImage(file: File, imageAlt: string) {
    if (!editor) return;
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    fd.set("alt", imageAlt.trim() || file.name);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) return;
      const data = await res.json();
      editor
        .chain()
        .focus()
        .setImage({ src: data.media.url, alt: data.media.alt || imageAlt })
        .run();
    } finally {
      setUploading(false);
    }
  }

  if (!editor) {
    return (
      <div className="min-h-80 rounded-2xl border border-slate-200 bg-slate-50" />
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap gap-1 border-b border-slate-100 bg-slate-50 px-2 py-2">
        <ToolBtn
          title="Đậm"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </ToolBtn>
        <ToolBtn
          title="Nghiêng"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </ToolBtn>
        <ToolBtn
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="size-4" />
        </ToolBtn>
        <ToolBtn
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="size-4" />
        </ToolBtn>
        <ToolBtn
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </ToolBtn>
        <ToolBtn
          title="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </ToolBtn>
        <ToolBtn
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="size-4" />
        </ToolBtn>
        <ToolBtn
          title="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("URL liên kết", prev || "https://");
            if (url === null) return;
            if (!url) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <Link2 className="size-4" />
        </ToolBtn>
        <ToolBtn title="Chèn ảnh" onClick={() => fileRef.current?.click()}>
          <ImagePlus className="size-4" />
        </ToolBtn>
        <div className="mx-1 h-6 w-px bg-slate-200" />
        <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="size-4" />
        </ToolBtn>
        <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="size-4" />
        </ToolBtn>
        </div>
        <EditorContent editor={editor} />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setDraftAlt(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
              setPendingFile(file);
            }
            e.target.value = "";
          }}
        />
      </div>
      <AdminDialog
        open={!!pendingFile}
        onClose={() => setPendingFile(null)}
        title="Alt SEO cho ảnh trong nội dung"
        description="Mỗi ảnh trong bài viết nên có mô tả riêng để tốt hơn cho SEO ảnh và accessibility."
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setPendingFile(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={uploading || !pendingFile}
              onClick={() => {
                if (!pendingFile) return;
                const file = pendingFile;
                setPendingFile(null);
                void uploadImage(file, draftAlt);
              }}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {uploading ? "Đang upload..." : "Chèn ảnh"}
            </button>
          </div>
        }
      >
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Alt text</span>
          <textarea
            value={draftAlt}
            onChange={(e) => setDraftAlt(e.target.value)}
            className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="Ví dụ: Sơ đồ luồng dữ liệu giữa ứng dụng Next.js và AI Agent"
          />
        </label>
        <p className="mt-2 text-xs text-slate-500">
          File: {pendingFile?.name}. Viết mô tả tự nhiên, đừng nhồi keyword.
        </p>
      </AdminDialog>
    </>
  );
}
