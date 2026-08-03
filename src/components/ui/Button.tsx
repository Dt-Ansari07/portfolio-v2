import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-ink-strong text-paper-0 hover:bg-gold hover:text-ink-strong",
  secondary: "border border-line text-ink hover:border-gold hover:text-gold",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

export function LinkButton({
  variant = "primary",
  className,
  ...props
}: LinkButtonProps) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}
