// Long-form content for each treatment page.
// Fill in the fields per service. Any field left as an empty string / empty
// array will be hidden on the page — no need to delete sections you don't use.

export type ServiceFaq = { q: string; a: string };

export type ServiceContent = {
  slug: string;              // must match SERVICES slug in src/lib/site.ts
  tagline: string;           // 1 short sentence under the H1
  overview: string;          // 1–3 paragraphs, plain prose
  howItWorks: string;        // 1–3 paragraphs
  benefits: string[];        // bullet points
  idealFor: string[];        // bullet points
  whatToExpect: string;      // 1–2 paragraphs (session flow, feel, downtime)
  aftercare: string;         // 1–2 paragraphs
  duration: string;          // e.g. "45–60 minutes per session"
  sessions: string;          // e.g. "6–10 sessions recommended"
  faqs: ServiceFaq[];        // shown in an accordion
  disclaimer?: string;       // optional safety / results-vary note
};

export const SERVICES_CONTENT: Record<string, ServiceContent> = {
  "fat-melting": {
    slug: "fat-melting",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "skin-tightening": {
    slug: "skin-tightening",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "anti-aging": {
    slug: "anti-aging",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "muscle-toning": {
    slug: "muscle-toning",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "breast-filler": {
    slug: "breast-filler",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "butt-filler": {
    slug: "butt-filler",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "cavitation": {
    slug: "cavitation",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "lymphatic-drainage": {
    slug: "lymphatic-drainage",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "slimming-injections": {
    slug: "slimming-injections",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "peptides": {
    slug: "peptides",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "body-contouring": {
    slug: "body-contouring",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
};