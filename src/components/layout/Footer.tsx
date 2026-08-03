import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-ink-muted font-mono text-xs">
          &copy; {year} {profile.name}. Built with Next.js.
        </p>

        <div className="flex items-center gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${profile.name} on GitHub`}
            className="text-ink-muted hover:text-gold transition-colors"
          >
            <GitHubIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${profile.name} on LinkedIn`}
            className="text-ink-muted hover:text-gold transition-colors"
          >
            <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.name}`}
            className="text-ink-muted hover:text-gold transition-colors"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
