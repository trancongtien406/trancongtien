"use client";

import { Button } from "@/components/common/Button";
import { openEstimateChat } from "@/components/floating/FloatingActions";

export function OpenEstimateButton({
  productKey,
  children = "Ước tính nhanh",
  variant = "secondary",
  size = "lg",
}: {
  productKey?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => openEstimateChat(productKey)}
    >
      {children}
    </Button>
  );
}
