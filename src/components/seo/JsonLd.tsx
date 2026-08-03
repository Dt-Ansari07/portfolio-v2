import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site-config";

/** Fixes audit Section 8 (SEO): no structured data existed on the old site. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
    sameAs: [profile.links.linkedin, profile.links.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
