import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { education, certifications } from "@/content/experience";

/** Fixes audit Section 2: education and certifications were absent from the old site. */
export function Credentials() {
  return (
    <section id="credentials" className="border-line border-b">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading
            cellRef="E2 -- CREDENTIALS"
            title="Education & Certifications"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-ink-muted mb-4 font-mono text-xs tracking-widest uppercase">
              Education
            </h3>
            <ul className="space-y-6">
              {education.map((entry) => (
                <li key={entry.institution} className="border-line border-t pt-4">
                  <p className="text-ink-muted font-mono text-xs">{entry.period}</p>
                  <p className="text-ink-strong mt-1 font-semibold">{entry.credential}</p>
                  <p className="text-ink-muted text-sm">
                    {entry.institution} &middot; {entry.location}
                  </p>
                  {entry.detail ? (
                    <p className="text-ink mt-2 text-sm">{entry.detail}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={80}>
            <h3 className="text-ink-muted mb-4 font-mono text-xs tracking-widest uppercase">
              Certifications
            </h3>
            <ul className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <li key={cert}>
                  <Badge className="py-1.5">{cert}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
