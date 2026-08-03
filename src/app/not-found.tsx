import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-6 py-24">
      <p className="text-gold font-mono text-xs tracking-widest">#REF! -- 404</p>
      <h1 className="text-ink-strong mt-3 text-2xl font-semibold">This cell is empty</h1>
      <p className="text-ink-muted mt-2 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist, or it moved.
      </p>
      <LinkButton href="/" className="mt-6">
        Back to home
      </LinkButton>
    </div>
  );
}
