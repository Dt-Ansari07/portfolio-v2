import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/content/experience";

/**
 * Fixes audit Section 2: work experience was entirely absent from the old
 * site. Dated entries are a genuine sequence, so a chronological layout
 * (rather than a decorative counter) is the right structural device here.
 */
export function Experience() {
  return (
    <section id="experience" className="border-line bg-paper-1 border-b">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading
            cellRef="B2 -- EXPERIENCE"
            title="Experience"
            description="What I've been doing on the job, in order."
          />
        </Reveal>

        <ol className="space-y-12">
          {experience.map((entry, i) => (
            <Reveal key={entry.company} delayMs={i * 80}>
              <li className="border-line grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-[200px_1fr]">
                <div>
                  <p className="text-ink-muted font-mono text-xs">{entry.period}</p>
                  <p className="text-ink-strong mt-1 font-semibold">{entry.company}</p>
                  <p className="text-ink-muted text-sm">{entry.role}</p>
                  <p className="text-ink-muted text-sm">{entry.location}</p>
                </div>
                <ul className="text-ink marker:text-gold list-disc space-y-2 pl-5">
                  {entry.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
