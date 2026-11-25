import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DemoEntry } from "./registry";

/** Thẻ xem trước demo cho khu vực website chính (Tailwind). Ảnh là ảnh chụp thật của demo. */
export function DemoCard({ demo, priority = false }: { demo: DemoEntry; priority?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface">
      <Link
        href={`/demos/${demo.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-label={`Xem demo ${demo.brand}`}
      >
        <Image
          src={`/images/demos/_showroom/${demo.slug}.webp`}
          alt={`Ảnh chụp màn hình đầu trang demo ${demo.brand}`}
          fill
          sizes="(min-width:1280px) 400px, (min-width:768px) 45vw, 100vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
          {demo.industry} · {demo.id}
        </p>
        <h3 translate="no" className="font-display text-xl font-bold text-ink">
          {demo.brand}
        </h3>
        <p className="flex-1 text-sm leading-6 text-ink-muted">{demo.look}</p>
        <Link
          href={`/demos/${demo.slug}`}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand"
        >
          Xem demo <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
