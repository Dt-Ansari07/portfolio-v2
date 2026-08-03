import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "border-line text-ink-muted inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}
