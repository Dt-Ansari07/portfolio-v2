type SectionHeadingProps = {
  cellRef: string;
  title: string;
  description?: string;
};

/**
 * Every section is labelled with a spreadsheet-style cell reference (A1, B1...)
 * instead of a decorative "01 / 02 / 03" counter -- see design rationale in
 * README "Design system" section.
 */
export function SectionHeading({ cellRef, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p aria-hidden="true" className="text-gold mb-3 font-mono text-xs tracking-widest">
        {cellRef}
      </p>
      <h2 className="text-ink-strong text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? <p className="text-ink-muted mt-3">{description}</p> : null}
    </div>
  );
}
