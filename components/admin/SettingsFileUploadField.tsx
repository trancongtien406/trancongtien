"use client";

import { useState } from "react";
import { FileUploadField } from "@/components/admin/ui/FileUploadField";

type Props = {
  name: string;
  label: string;
  defaultValue?: string | null;
  accept?: string;
  hint?: string;
};

export function SettingsFileUploadField({
  name,
  label,
  defaultValue,
  accept,
  hint,
}: Props) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="space-y-1.5">
      <input type="hidden" name={name} value={value} readOnly />
      <FileUploadField
        label={label}
        value={value}
        alt={label}
        accept={accept}
        onChange={(url) => setValue(url)}
      />
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
