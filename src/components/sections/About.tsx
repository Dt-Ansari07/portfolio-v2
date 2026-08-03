import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="border-line border-b">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading cellRef="A2 -- ABOUT" title="About" />
        </Reveal>
        <Reveal delayMs={80}>
          <p className="text-ink max-w-2xl text-lg leading-relaxed">{profile.summary}</p>
        </Reveal>
      </div>
    </section>
  );
}
