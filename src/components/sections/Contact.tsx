import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" className="bg-paper-1">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading
            cellRef="F2 -- CONTACT"
            title="Let's talk"
            description="Open to MIS, reporting, and junior data analyst roles. The fastest way to reach me is email."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="text-ink hover:text-gold flex items-center gap-3 transition-colors"
            >
              <Mail className="text-gold h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phoneDisplay.replace(/\s/g, "")}`}
              className="text-ink hover:text-gold flex items-center gap-3 transition-colors"
            >
              <Phone className="text-gold h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.phoneDisplay}
            </a>
            <p className="text-ink-muted flex items-center gap-3">
              <MapPin className="text-gold h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.location}
            </p>
          </Reveal>

          <Reveal delayMs={80}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
