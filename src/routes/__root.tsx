import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";

import { MotionConfig } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE, SITE_URL } from "../lib/site";

/** Structured data so Google can show the spa as a local business (map pack, knowledge panel). */
const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Melt Aways Spa",
  alternateName: ["Meltaways Spa", "Melt Elite Aesthetics"],
  url: SITE_URL,
  logo: `${SITE_URL}${SITE.logo}`,
  telephone: "+1-868-378-5630",
  email: SITE.email,
  priceRange: "$$",
  areaServed: "Trinidad and Tobago",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#240 Eastern Main Road",
    addressLocality: "El Dorado",
    addressCountry: "TT",
  },
  sameAs: [SITE.instagram, SITE.facebook, SITE.tiktok],
};

const Header = lazy(() => import("../components/Header").then((m) => ({ default: m.Header })));
const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));
const WhatsAppFab = lazy(() => import("../components/WhatsAppFab").then((m) => ({ default: m.WhatsAppFab })));
const ScrollProgress = lazy(() => import("../components/ScrollProgress").then((m) => ({ default: m.ScrollProgress })));
const AmbientAudio = lazy(() => import("../components/AmbientAudio").then((m) => ({ default: m.AmbientAudio })));

function NotFoundComponent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const search = window.location.search;
    const looksLikeAuth =
      hash.includes("access_token=") ||
      hash.includes("type=invite") ||
      hash.includes("type=recovery") ||
      /[?&]code=/.test(search);
    if (looksLikeAuth && window.location.pathname !== "/set-password") {
      window.location.replace(`/set-password${search}${hash}`);
    }
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Melt Elite Aesthetics — a subsidiary of Melt Aways Spa | Trinidad & Tobago" },
      { name: "description", content: "Melt Elite Aesthetics (MEA) — body-contouring, fat melting, skin tightening & anti-aging in El Dorado, Trinidad & Tobago. Consultation-led, respectful, premium." },
      { name: "author", content: "Melt Elite Aesthetics" },
      { property: "og:title", content: "Melt Elite Aesthetics — a subsidiary of Melt Aways Spa" },
      { property: "og:description", content: "MEA — consultation-led body contouring, skin tightening & anti-aging in Trinidad & Tobago." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Melt Elite Aesthetics — a subsidiary of Melt Aways Spa" },
      { name: "twitter:description", content: "MEA — consultation-led body contouring, skin tightening & anti-aging in Trinidad & Tobago." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1oLizYD3jPdpD8eRPF5rvL3aAS23/social-images/social-1780560137740-ChatGPT_Image_Jun_2,_2026,_04_00_39_PM_(4).webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1oLizYD3jPdpD8eRPF5rvL3aAS23/social-images/social-1780560137740-ChatGPT_Image_Jun_2,_2026,_04_00_39_PM_(4).webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Great+Vibes&family=Inter:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: (props) => <ErrorComponent error={props.error as Error} reset={props.reset} />,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const browserPath = typeof window === "undefined" ? "" : window.location.pathname;
  const isDashboard =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    browserPath === "/dashboard" ||
    browserPath.startsWith("/dashboard/");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const search = window.location.search;
    const looksLikeAuth =
      hash.includes("access_token=") ||
      hash.includes("type=invite") ||
      hash.includes("type=recovery") ||
      /[?&]code=/.test(search);
    if (looksLikeAuth && window.location.pathname === "/") {
      window.location.replace(`/set-password${search}${hash}`);
    }
  }, []);

  if (isDashboard) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  }

  // One canonical URL per page (no trailing slash, no query string) so search
  // engines don't split ranking between duplicates. React 19 hoists this into <head>.
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;

  return (
    <QueryClientProvider client={queryClient}>
      <link rel="canonical" href={canonical} />
      {/* Honour the visitor's "reduce motion" setting for all Framer Motion reveals. */}
      <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <div data-public-chrome="site-progress"><ScrollProgress /></div>
        <div data-public-chrome="site-header"><Header /></div>
      </Suspense>
      <main data-public-chrome="site-main">
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <div data-public-chrome="site-footer"><Footer /></div>
        <div data-public-chrome="site-whatsapp"><WhatsAppFab /></div>
        <div data-public-chrome="site-audio"><AmbientAudio /></div>
      </Suspense>
      </MotionConfig>
    </QueryClientProvider>
  );
}
