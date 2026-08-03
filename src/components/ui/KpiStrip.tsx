import { kpiStats } from "@/content/profile";

/**
 * Signature element. Rendered as a literal spreadsheet header row -- column
 * letters above, a value/label "cell" below each -- because the subject of
 * this portfolio (MIS reporting) is spreadsheets. Every number here is
 * sourced from the resume; see src/content/profile.ts.
 */
export function KpiStrip() {
  return (
    <div
      className="divide-line border-line grid grid-cols-2 divide-y border sm:grid-cols-4 sm:divide-x sm:divide-y-0"
      role="table"
      aria-label="Key career metrics"
    >
      {kpiStats.map((stat) => (
        <div
          key={stat.cell}
          role="row"
          className="group hover:bg-gold-soft relative p-5 transition-colors"
        >
          <span
            aria-hidden="true"
            className="text-ink-muted absolute top-2 right-2 font-mono text-[10px] opacity-60"
          >
            {stat.cell}
          </span>
          <div role="cell">
            <p className="tabular text-ink-strong font-mono text-2xl font-semibold sm:text-3xl">
              {stat.value}
              <span className="text-gold">{stat.unit}</span>
            </p>
            <p className="text-ink-muted mt-1 text-xs">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
