import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

/**
 * Fixes audit Sections 2, 3 & 10: the old site showed two unverifiable
 * projects with dead `href="#"` links. Every card here maps to a real
 * resume project and links out to an actual repository -- never `#`.
 */
export function Projects() {
  return (
    <section id="projects" className="border-line bg-paper-1 border-b">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading
            cellRef="D2 -- PROJECTS"
            title="Projects"
            description="Independent projects referenced on my resume -- each one links to its source."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delayMs={i * 80}>
              <article className="border-line hover:border-gold flex h-full flex-col border p-6 transition-colors">
                <p className="text-ink-muted font-mono text-xs">{project.category}</p>
                <h3 className="text-ink-strong mt-2 text-lg font-semibold">
                  {project.title}
                </h3>
                <p className="text-ink-muted mt-2 text-sm">{project.summary}</p>

                <ul className="text-ink marker:text-gold mt-4 list-disc space-y-1.5 pl-5 text-sm">
                  {project.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-teal mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  View source
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
