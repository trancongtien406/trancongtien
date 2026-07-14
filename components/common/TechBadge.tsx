import Image from "next/image";
import { getTech } from "@/lib/tech";
import { cn } from "@/lib/utils";

export function TechBadge({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const tech = getTech(name);
  const pad = size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm";
  const icon = size === "sm" ? 14 : 16;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-border bg-surface font-medium text-ink-muted transition hover:border-brand/30 hover:text-ink",
        pad,
        className,
      )}
    >
      {tech.logo ? (
        <span
          className="relative inline-flex shrink-0 items-center justify-center"
          style={{ width: icon, height: icon }}
          aria-hidden
        >
          <Image
            src={tech.logo}
            alt=""
            width={icon}
            height={icon}
            className="size-full object-contain"
            unoptimized
          />
        </span>
      ) : (
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ backgroundColor: tech.color }}
          aria-hidden
        />
      )}
      {tech.name}
    </span>
  );
}

export function TechLogoGrid({
  names,
  className,
}: {
  names: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {names.map((name) => (
        <TechBadge key={name} name={name} />
      ))}
    </div>
  );
}
