import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/content/skills";

/** Fixes audit Section 2: 7 of 12 resume skills were missing from the old site. */
export function Skills() {
  return (
    <section id="skills" className="border-line border-b">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading cellRef="C2 -- SKILLS" title="Skills" />
        </Reveal>

        <div className="border-line bg-line grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.group} delayMs={i * 60} className="bg-paper-0">
              <div className="h-full p-6">
                <p className="text-gold font-mono text-xs">{group.cellPrefix} column</p>
                <h3 className="text-ink-strong mt-2 mb-4 font-semibold">{group.group}</h3>
                <ul className="text-ink-muted space-y-2 text-sm">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
