"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

/** Fades + slides content up by 14px the first time it enters the viewport. */
export function Reveal({ children, delayMs = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(className, inView ? "fade-up" : "opacity-0")}
      style={inView ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
