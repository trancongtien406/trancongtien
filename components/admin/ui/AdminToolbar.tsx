"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterOption = { value: string; label: string };

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  filters?: Array<{
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (v: string) => void;
  }>;
  actions?: React.ReactNode;
  className?: string;
};

export function AdminToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  filters = [],
  actions,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-4",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <label className="relative block min-w-0 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
          {search ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </label>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <select
              key={f.key}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              aria-label={f.label}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="">{f.label}</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
