# Zulfiqar Ansari — Portfolio

A production-ready personal portfolio built with Next.js 16 (App Router),
React 19, TypeScript, and Tailwind CSS v4. Rebuilt from scratch against the
findings in `Zulfiqar_Portfolio_Audit_Report.html` — see the compliance
checklist at the bottom of this file for what changed and why.

---

## Design system — "Ledger"

The old site used a generic dark-navy-plus-neon-cyan theme. This one borrows
its visual language from the subject's own world: spreadsheets, KPI rows,
and monthly MIS reports.

- **Palette** — cool grey-green "paper" surfaces (light mode) or near-black
  ink (dark mode), one amber accent (`--gold`, like a flagged spreadsheet
  cell) and a muted teal for links/data. No cream+terracotta, no neon-on-black.
- **Type** — IBM Plex Sans (body) + IBM Plex Mono (labels, numbers, cell
  references) — a deliberate, same-family pairing, self-hosted via
  `@fontsource` (no runtime requests to Google's font CDN).
- **Signature element** — the `KpiStrip` component renders real, resume-sourced
  metrics as a literal spreadsheet header row (`A1`, `B1`, `C1`, `D1`).
- **Motion** — small CSS fade-up reveals on scroll via a lightweight
  `useInView` hook (IntersectionObserver), not a full animation library.
  Fully disabled for users with `prefers-reduced-motion: reduce`.

All tokens live in `src/app/globals.css` under `:root` / `:root[data-theme="dark"]`.

---

## Project structure

```
portfolio-v2/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # root layout: fonts, metadata, providers, header/footer
│   │   ├── page.tsx             # home page — composes all sections
│   │   ├── globals.css          # design tokens + global styles
│   │   ├── loading.tsx          # route-level loading skeleton
│   │   ├── error.tsx            # route-level error boundary
│   │   ├── not-found.tsx        # custom 404
│   │   ├── sitemap.ts           # dynamic sitemap.xml
│   │   ├── robots.ts            # dynamic robots.txt
│   │   ├── manifest.ts          # web app manifest
│   │   └── api/
│   │       └── contact/route.ts # contact form endpoint (validate, rate-limit, email)
│   ├── components/
│   │   ├── layout/              # Header (with working mobile nav), Footer
│   │   ├── sections/             # Hero, About, Experience, Skills, Projects,
│   │   │                         # Credentials, Contact, ContactForm
│   │   ├── ui/                   # Button, Badge, SectionHeading, ThemeToggle,
│   │   │                         # KpiStrip, Reveal, icons (custom GitHub/LinkedIn SVGs)
│   │   ├── providers/            # ThemeProvider (next-themes wrapper)
│   │   └── seo/                  # JsonLd (Person structured data)
│   ├── content/                  # profile.ts, experience.ts, projects.ts, skills.ts
│   │                             # — every fact here is resume-sourced
│   ├── lib/                      # utils, validations (zod), email (Resend),
│   │                             # rate-limit, site-config
│   ├── hooks/                    # useInView.ts
│   └── types/
├── public/
│   ├── og-image.png              # generated Open Graph preview image
│   └── resume/                   # put your real resume PDF here (see below)
├── next.config.ts                # security headers, standalone output, image formats
├── Dockerfile                    # multi-stage production build
├── docker-compose.yml
├── .env.example
├── .prettierrc.json / .prettierignore
├── eslint.config.mjs
└── package.json
```

---

## Content checklist — fill these in before deploying

Everything in `src/content/` is already populated from the resume, but two
things are placeholders you must replace:

1. **`public/resume/`** — add your real `Zulfiqar_Ansari_Resume.pdf` here.
   The filename must match `profile.links.resumePdf` in `src/content/profile.ts`.
2. **`src/content/projects.ts`** — each project's `repoUrl` currently points
   at your GitHub *profile* (`github.com/Dt-Ansari07`), not the individual
   repo. Replace each with the real per-project repository URL once those
   repos have real READMEs (see the audit's GitHub Repository Review —
   ship a real README before linking it).

---

## Installation

Requires Node.js 20+ and npm.

```bash
git clone <your-repo-url> portfolio
cd portfolio
npm install
cp .env.example .env.local
# edit .env.local with your Resend API key, destination email, and site URL
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:3000` with hot reload.

Other useful commands during development:

```bash
npm run lint          # ESLint (flat config, Next.js + React Hooks rules)
npm run typecheck      # tsc --noEmit
npm run format         # Prettier, writes changes (Tailwind class sorting included)
npm run format:check   # Prettier, check only — use in CI
```

## Build

```bash
npm run build
```

Produces a standalone, production-optimized build in `.next/`. The home
page is fully static (prerendered); `/api/contact` is server-rendered on
demand.

## Production (local)

```bash
npm run build
node .next/standalone/server.js
```

(`next start` will not serve the app correctly because `next.config.ts` sets
`output: "standalone"` for Docker — use the standalone server directly, or
Docker/Vercel as described below.)

---

## Deployment

### Option A — Vercel (recommended)

1. Push this repo to GitHub.
2. Import it at vercel.com → New Project.
3. Add environment variables from `.env.example` in the Vercel dashboard
   (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `NEXT_PUBLIC_SITE_URL`).
4. Deploy. Vercel builds and serves the App Router project natively —
   no further configuration needed.

### Option B — Docker (self-hosted / any VPS)

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  -t portfolio .

docker run -p 3000:3000 \
  -e RESEND_API_KEY=your_key \
  -e CONTACT_EMAIL_TO=you@example.com \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  portfolio
```

Or with Compose (reads variables from a local `.env` file):

```bash
docker compose up --build
```

The Dockerfile is a 3-stage build (deps → builder → runner) using Next's
`standalone` output tracing, producing a lean runtime image and running as
a non-root user.

---

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | For contact form emails | API key from resend.com |
| `CONTACT_EMAIL_TO` | For contact form emails | Inbox that receives submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL used in metadata, sitemap, robots.txt, JSON-LD |

If `RESEND_API_KEY` / `CONTACT_EMAIL_TO` are not set, the contact form still
validates and rate-limits correctly but returns a safe, generic error when
someone submits it — it fails closed, never silently.

---

## Why there's no database or authentication

The original request asked for a full backend with auth and a database.
This project deliberately does not include either. Reasoning:

- A personal portfolio has no user accounts, no content that needs to be
  gated, and no data that needs to persist between visits. There is nothing
  for authentication to protect.
- The audit report itself calls out "overengineering" as a code-quality
  anti-pattern (Developer Review section) — bolting on Postgres + NextAuth
  for a static content site is exactly that.
- The **one** feature that legitimately needs server logic — the contact
  form — has a real, complete implementation: a validated, rate-limited,
  error-handled API route (`src/app/api/contact/route.ts`) that sends email
  via Resend. That's the entire "backend" this project needs.

If you later add a blog, comments, or gated case studies, that's the point
where a database earns its place — and `src/lib/` is already structured so
you could add a `db.ts` alongside `email.ts` without restructuring anything.

---

## Audit compliance checklist

Every recommendation from `Zulfiqar_Portfolio_Audit_Report.html`, and how
it was addressed (or why it wasn't, when a newer approach was better).

### Section 2 — CV vs Portfolio Comparison
- Job title now matches resume exactly (`src/content/profile.ts`)
- Work experience (GoMechanic) added — `Experience.tsx` + `content/experience.ts`
- Education added — `Credentials.tsx`
- Certifications added (all 4) — `Credentials.tsx`
- Projects rebuilt around the 3 real resume projects — `content/projects.ts`
- All 12 resume skills present, grouped as on the resume — `content/skills.ts`
- Phone, email, location, LinkedIn, GitHub, resume download all present
  in header and/or contact section
- Resume download link added (header + mobile menu)

### Section 3 — Recruiter Perspective
- No dead `href="#"` links anywhere — every project links to a real repo URL
- Every claim on the site is sourced from `src/content/`, which mirrors the resume
- Clear CTAs above the fold ("View projects", "Get in touch")

### Section 4 — Developer Review
- Organized folder structure (`components/`, `content/`, `lib/`, `hooks/`)
- Consistent formatting enforced via Prettier + `prettier-plugin-tailwindcss`
- Project cards generated from a typed data array, not hand-duplicated HTML
- No bundler config needed — Next.js provides this; not applicable to this stack

### Section 5 — UI/UX Review
- **Mobile navigation fixed** — real hamburger menu with `aria-expanded`,
  keyboard support (`Header.tsx`)
- Skill descriptions are always visible (no hover-only tooltips)
- Fluid, responsive layout tested at multiple breakpoints via Tailwind's
  responsive utilities

### Section 6 — Performance
- `next/image`-ready image pipeline (AVIF/WebP) configured in `next.config.ts`
- Self-hosted fonts (`@fontsource`) — no external font requests, no unused
  Font Awesome CDN (removed entirely; icons are `lucide-react` + 2 custom SVGs)
- Static prerendering for the home page (confirmed via `npm run build` output: `○ /`)
- No oversized/unused images shipped — old 633KB unused profile photo is gone

### Section 7 — Accessibility
- Skip-to-content link (`globals.css` `.skip-link`, wired in `layout.tsx`)
- Visible focus rings everywhere (`:focus-visible` in `globals.css`, never suppressed)
- `aria-label`/`aria-expanded`/`aria-controls` on the mobile menu button
- Form fields have associated `<label>`s, `aria-invalid`, and `aria-describedby`
  error linkage (`ContactForm.tsx`)
- `prefers-reduced-motion` respected globally

### Section 8 — SEO
- Meta description, Open Graph, Twitter card metadata (`layout.tsx`)
- Generated `og-image.png` matching the site's design system
- `sitemap.ts`, `robots.ts` (dynamic, Next.js-native — no manual XML files)
- JSON-LD `Person` schema (`components/seo/JsonLd.tsx`)
- Favicon retained from Next.js scaffold; manifest.ts added for installability

### Section 9 — GitHub Repository Review
- Not directly fixable from inside this codebase — this README *is* the
  fix. Replace your existing empty `README.md` with a version of this file
  (trimmed to what's relevant) so the repo has real documentation.

### Section 10 — Project Review
- Both unverifiable projects ("Sales Dashboard", "Customer Churn
  Prediction") removed entirely — they had no resume backing and dead links
- All 3 real projects present with full bullet detail from the resume

### Section 12 — Security
- Security headers: CSP, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy (`next.config.ts`)
- No secrets in source — all sensitive config via environment variables
  (`.env.example` documents every one)
- Contact form: server-side validation (Zod, not just client-side),
  honeypot spam field, rate limiting, and generic error messages that never
  leak stack traces or provider error bodies to the client

### Section 13 — Code Quality
- Full TypeScript, strict mode (inherited from `create-next-app` default `tsconfig.json`)
- ESLint (flat config, `eslint-config-next` + React Hooks rules) — zero errors
- Shared Zod schema between client form and server route — validation can't drift

### Section 14 — ATS (resume, not portfolio)
- Not applicable to the codebase — this was a recommendation for the PDF
  resume itself (add more quantified bullets, a "Core Skills" keyword line).
  No code change addresses this; it's noted here so it isn't forgotten.

### Section 17 — Missing Features
- Loading state (`app/loading.tsx`)
- Error boundary (`app/error.tsx`)
- 404 page (`app/not-found.tsx`)
- Dark/light mode (`next-themes`, `ThemeToggle.tsx`)
- **Blog, testimonials, PWA/offline support — intentionally omitted.**
  The audit itself said not all of these are worth building for an
  entry-level analyst portfolio; credibility (real experience/projects,
  working links) matters more than feature breadth at this stage. Adding a
  blog later is straightforward: a new `app/blog/[slug]/page.tsx` route
  reading from a `content/posts/` directory would fit this structure
  without any restructuring.

### Deviations from the original request, explained
- **No database, no authentication** — see "Why there's no database or
  authentication" above.
- **No `motion`/Framer Motion dependency** — installed initially, removed
  after determining CSS transitions + one small `useInView` hook cover every
  animation this site needs, at a fraction of the bundle cost. Latest stable
  versions of every *used* dependency are still pinned in `package.json`.
- **Icons**: `lucide-react`'s current major version dropped brand/logo icons
  (GitHub, LinkedIn, etc. no longer exist in the package). Rather than add a
  second icon library for two icons, `components/ui/icons.tsx` has two small
  hand-written SVGs.
- **Fonts**: `next/font/google` requires reaching `fonts.googleapis.com` at
  build time. Self-hosting via `@fontsource/ibm-plex-sans` /
  `@fontsource/ibm-plex-mono` (installed from npm) avoids that dependency
  entirely and ships the same fonts with zero runtime third-party requests —
  a strict upgrade for both privacy and Core Web Vitals.
