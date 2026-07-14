import { ArrowRight, Rocket, Send } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

type CtaBannerProps = {
  title: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
  variant?: "navy" | "blue" | "soft";
  className?: string;
};

export function CtaBanner({
  title,
  description = "Đặt lịch tư vấn miễn phí 30 phút — cùng bàn cách biến ý tưởng thành sản phẩm.",
  buttonLabel = "Đặt lịch tư vấn miễn phí",
  href = "/lien-he",
  variant = "navy",
  className,
}: CtaBannerProps) {
  const styles = {
    navy: "bg-footer text-white",
    blue: "bg-brand text-white",
    soft: "bg-brand-soft text-ink border border-brand/10",
  };

  const buttonVariant = variant === "soft" ? "primary" : "white";
  const Icon = variant === "blue" ? Rocket : Send;

  return (
    <section className={cn("py-10 sm:py-14", className)}>
      <Container>
        <div
          className={cn(
            "flex flex-col items-start gap-6 rounded-3xl px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10",
            styles[variant],
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "mt-1 flex size-12 shrink-0 items-center justify-center rounded-full",
                variant === "soft" ? "bg-brand text-white" : "bg-white/10",
              )}
            >
              <Icon className="size-5" />
            </div>
            <div>
              <h2
                className={cn(
                  "font-display text-xl font-bold tracking-tight sm:text-2xl",
                  variant === "soft" ? "text-ink" : "text-white",
                )}
              >
                {title}
              </h2>
              {description ? (
                <p
                  className={cn(
                    "mt-2 max-w-xl text-sm leading-relaxed sm:text-base",
                    variant === "soft" ? "text-ink-muted" : "text-white/75",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          <Button
            href={href}
            variant={buttonVariant}
            size="lg"
            className="shrink-0"
            iconRight={<ArrowRight className="size-4" />}
          >
            {buttonLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
