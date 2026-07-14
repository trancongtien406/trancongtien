"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export type SettingsActionState = {
  ok: boolean;
  message: string;
  submittedAt: number;
};

type Props = {
  action: (
    state: SettingsActionState,
    formData: FormData,
  ) => Promise<SettingsActionState>;
  children: React.ReactNode;
};

const initialState: SettingsActionState = {
  ok: false,
  message: "",
  submittedAt: 0,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center rounded-xl bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
    >
      {pending ? "Đang lưu..." : "Lưu cài đặt"}
    </button>
  );
}

export function SettingsForm({ action, children }: Props) {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.submittedAt) return;
    if (state.ok) {
      toast.success(state.message);
      return;
    }
    toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="mx-auto max-w-3xl space-y-4">
      {children}
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
