import { ArrowRight } from "lucide-react";
import { KpiStrip } from "@/components/ui/KpiStrip";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      id="top"
      className="ledger-grid border-line border-b [background-size:48px_48px]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="fade-up text-gold mb-5 font-mono text-xs tracking-widest">
          A1 -- {profile.location.toUpperCase()}
        </p>
        <h1
          className="fade-up text-ink-strong max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          {profile.name}
        </h1>
        <p
          className="fade-up text-ink-muted mt-3 text-lg sm:text-xl"
          style={{ animationDelay: "140ms" }}
        >
          {profile.title}
        </p>
        <p
          className="fade-up text-ink mt-6 max-w-xl text-base sm:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          {profile.tagline}
        </p>

        <div
          className="fade-up mt-8 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "260ms" }}
        >
          <LinkButton href="#projects" variant="primary">
            View projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
          <LinkButton href="#contact" variant="secondary">
            Get in touch
          </LinkButton>
        </div>

        <div className="fade-up mt-14" style={{ animationDelay: "320ms" }}>
          <KpiStrip />
        </div>
      </div>
    </section>
  );
}
