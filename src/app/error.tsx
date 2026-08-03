"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-6 py-24">
      <p className="text-red-flag font-mono text-xs tracking-widest">
        ERROR -- ROW FAILED
      </p>
      <h1 className="text-ink-strong mt-3 text-2xl font-semibold">
        Something broke on this page
      </h1>
      <p className="text-ink-muted mt-2 max-w-md">
        That&apos;s on this app, not you. Try again, and if it keeps happening, reach out
        through the contact section.
      </p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  );
}
