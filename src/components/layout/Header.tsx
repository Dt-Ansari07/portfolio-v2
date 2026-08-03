"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { profile } from "@/content/profile";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

/**
 * Fixes audit Section 5 ("Mobile users cannot navigate the site") --
 * the old nav used `display:none` on mobile with no replacement. This one
 * renders a real, keyboard-operable disclosure menu below 768px.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-line bg-paper-0/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="text-ink-strong font-mono text-sm font-semibold tracking-tight"
        >
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink-muted hover:text-gold text-sm transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={profile.links.resumePdf}
            className="border-line text-ink hover:border-gold hover:text-gold rounded-md border px-4 py-2 text-sm transition-colors"
            download
          >
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="border-line text-ink inline-flex h-9 w-9 items-center justify-center rounded-md border"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-line bg-paper-0 border-t px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-ink hover:text-gold block text-base"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.links.resumePdf}
                download
                className="text-ink hover:text-gold block text-base"
              >
                Download resume
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
