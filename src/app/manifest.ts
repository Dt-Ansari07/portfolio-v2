import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Zulfiqar Ansari",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f5f0",
    theme_color: "#c8952e",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
