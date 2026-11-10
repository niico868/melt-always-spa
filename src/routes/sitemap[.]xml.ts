import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES, SITE_URL } from "@/lib/site";
import { JOURNAL_POSTS } from "@/lib/journal";

// Sitemap URLs must be absolute, or search engines ignore them.
const STATIC_PATHS = [
  "/", "/about", "/services", "/packages", "/gallery", "/reviews", "/booking", "/contact", "/faq", "/policies",
  "/certifications", "/treatment-finder", "/vip", "/vipconsult",
  "/visiting", "/timeline", "/journal",
  "/locations/body-contouring-trinidad",
  "/locations/fat-melting-treatments-trinidad",
  "/locations/skin-tightening-trinidad",
  "/locations/morpheus8-trinidad",
  "/locations/anti-aging-facial-trinidad",
  "/locations/body-sculpting-before-carnival",
  "/locations/beauty-clinic-woodbrook",
  "/locations/body-contouring-st-augustine",
];

const paths = [
  ...STATIC_PATHS,
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...JOURNAL_POSTS.map((a) => `/journal/${a.slug}`),
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = paths.map(p => `  <url><loc>${SITE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
