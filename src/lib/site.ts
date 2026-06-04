import logoAsset from "@/assets/logo.asset.json";

export const SITE = {
  name: "Melt Aways",
  tagline: "Where we melt fat and reveal the you inside.",
  phone: "1(868) 378-5630",
  phoneDigits: "18683785630",
  email: "meltawaystt@gmail.com",
  hours: "8:00 AM – 4:00 PM",
  whatsapp: "https://wa.me/18683785630?text=Hi%20Melt%20Aways%2C%20I%20would%20like%20to%20book%20a%20consultation.",
  whatsappBase: "https://wa.me/18683785630",
  instagram: "https://www.instagram.com/meltawaystt/",
  facebook: "https://www.facebook.com/p/Melt-Aways-100088384824763/",
  tiktok: "https://www.tiktok.com/@melt.aways.spa.tt",
  locations: [
    {
      name: "Woodbrook",
      address: "#14 Petra Street, Woodbrook",
      mapsUrl: "https://maps.app.goo.gl/u3f2tXm18zxNkwg59",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.9185337747854!2d-61.52817097713834!3d10.662107861419683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c36081175b18d1d%3A0x4ba5719cbcd8f83c!2s14%20Petra%20St%2C%20Port%20of%20Spain!5e0!3m2!1sen!2stt!4v1780557289251!5m2!1sen!2stt",
    },
    {
      name: "St Augustine",
      address: "#26 Agostini Street, St Augustine",
      mapsUrl: "https://maps.app.goo.gl/hThw1pJXXyPpBzs26",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.1478135447774!2d-61.404249899999996!3d10.6456228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c36018b1314825b%3A0x64e4703fa9358ace!2sMelt%20Aways%20Spa%20TT!5e0!3m2!1sen!2stt!4v1780556973929!5m2!1sen!2stt",
    },
  ],
  logo: logoAsset.url,
};

export function waLink(message?: string) {
  return message
    ? `https://wa.me/18683785630?text=${encodeURIComponent(message)}`
    : SITE.whatsapp;
}

// Concierge prefilled message for visiting / foreign clients.
export const CONCIERGE_MESSAGE =
  "Hi Melt Aways, I’m interested in planning treatment before visiting Trinidad. My travel dates are ___ and I’d like help choosing the right service.";

export const CONCIERGE_WA = waLink(CONCIERGE_MESSAGE);

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/visiting", label: "Visiting Trinidad" },
  { to: "/journal", label: "Journal" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Booking" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  { slug: "fat-melting", name: "Fat Melting", desc: "Target stubborn areas with non-surgical body-contouring treatments designed to support a slimmer, more sculpted look." },
  { slug: "skin-tightening", name: "Skin Tightening", desc: "Support firmer-looking skin and smoother body definition through treatment plans created around your goals." },
  { slug: "anti-aging", name: "Anti-Aging", desc: "Refresh the appearance of your skin with treatments focused on glow, firmness, texture, and confidence." },
  { slug: "wellness", name: "Wellness", desc: "Support your body from the inside out with wellness-focused treatments and guided care." },
  { slug: "muscle-toning", name: "Muscle Toning", desc: "Help define and strengthen targeted areas with body-sculpting support designed to complement your lifestyle." },
  { slug: "breast-filler", name: "Breast Filler", desc: "A consultation-led enhancement service for clients seeking fuller, more balanced-looking results." },
  { slug: "butt-filler", name: "Butt Filler", desc: "A consultation-led contouring service designed for shape, volume, and body confidence." },
  { slug: "cavitation", name: "Cavitation", desc: "A non-surgical body-contouring treatment commonly used to support stubborn fat reduction." },
  { slug: "lymphatic-drainage", name: "Lymphatic Drainage", desc: "A gentle treatment designed to support circulation, reduce fluid retention, and assist post-treatment recovery." },
  { slug: "slimming-injections", name: "Slimming Injections", desc: "A wellness and weight-support service that requires proper consultation before recommendation." },
  { slug: "peptides", name: "Peptides", desc: "Support anti-aging, wellness, and body goals through guided peptide-based treatment options." },
  { slug: "body-contouring", name: "Body-Contouring", desc: "Personalised treatment paths designed to help sculpt, define, and support your ideal body goals." },
];

export const PACKAGES = [
  { name: "Sculpt & Smooth", desc: "A contouring-focused journey for clients targeting stubborn areas with a smoother finish.", bestFor: "First-time body-contouring clients", includes: ["Cavitation", "Lymphatic Drainage", "Skin Tightening"] },
  { name: "Melt & Tighten", desc: "A combined plan that pairs fat-melting treatments with skin tightening for a more defined silhouette.", bestFor: "Clients seeking definition + firmness", includes: ["Fat Melting", "Skin Tightening", "Body-Contouring"] },
  { name: "Glow & Firm", desc: "An anti-aging and skin-focused plan designed to restore glow and improve skin appearance.", bestFor: "Anti-aging and skin confidence", includes: ["Anti-Aging", "Skin Tightening", "Wellness Support"] },
  { name: "Full Body Confidence", desc: "A comprehensive premium plan covering multiple zones for a complete body confidence journey.", bestFor: "Clients ready for a full transformation", includes: ["Cavitation", "Body-Contouring", "Skin Tightening", "Lymphatic Drainage"] },
  { name: "Wellness Reset", desc: "A restorative plan focused on internal wellness, drainage, and supportive guidance.", bestFor: "Clients prioritising wellness", includes: ["Lymphatic Drainage", "Wellness", "Peptide Guidance"] },
];

export const REVIEWS = [
  { initials: "K.M.", service: "Body Contouring", text: "From my first consultation I felt heard and respected. The team explained every step before treatment, and I never felt pressured." },
  { initials: "A.J.", service: "Cavitation", text: "Calm, clean, and so welcoming. I love how personable everyone is. The space feels truly premium." },
  { initials: "R.S.", service: "Skin Tightening", text: "I was nervous to start but they walked me through everything. I genuinely feel more confident in my skin." },
  { initials: "T.D.", service: "Wellness", text: "What I appreciate most is the genuine care. It's wellness without judgement." },
  { initials: "L.P.", service: "Anti-Aging", text: "The results speak for themselves but it's the experience that makes me come back." },
  { initials: "S.B.", service: "Lymphatic Drainage", text: "A beautiful, restorative space. I leave every visit feeling lighter and clearer." },
];

export const FAQS = [
  { q: "Do I need a consultation before booking?", a: "Yes. Every treatment journey begins with a consultation so we can understand your goals and recommend a suitable plan." },
  { q: "Which treatment is best for me?", a: "There is no single answer. Your consultation helps us match the right treatment path to your body and goals." },
  { q: "How many sessions will I need?", a: "Most clients benefit from a course of sessions. Your recommended plan will be discussed during consultation." },
  { q: "Are results immediate?", a: "Some clients notice early visible changes. Most results build gradually with a consistent treatment plan." },
  { q: "Is there downtime?", a: "Most of our treatments are non-surgical with minimal downtime, though this depends on the service." },
  { q: "Who may not be suitable for treatment?", a: "Pregnancy, certain medical conditions, and some medications may affect suitability. We will review this with you in consultation." },
  { q: "Do you offer packages?", a: "Yes. We offer curated treatment packages to support consistent results. Pricing is shared after consultation." },
  { q: "Where are you located?", a: "We have two locations: #14 Petra Street, Woodbrook and #26 Agostini Street, St Augustine." },
  { q: "How do I book?", a: "Submit a consultation request online, message us on WhatsApp, or call us during opening hours." },
  { q: "What should I do before my appointment?", a: "We will share simple pre-treatment guidance once your consultation is confirmed." },
];

export const POLICIES = [
  { title: "Booking Policy", body: "All appointments are scheduled following a consultation. Booking confirmation will be shared once your plan is reviewed. [Final policy approval pending]" },
  { title: "Consultation Policy", body: "A consultation is required before any treatment. This ensures the recommended path is safe and suitable for you. [Final policy approval pending]" },
  { title: "Deposit Policy", body: "A deposit may be required to secure your appointment. Deposit details will be shared at the time of booking. [Final policy approval pending]" },
  { title: "Cancellation Policy", body: "We kindly ask for advance notice if you must cancel. Specific notice windows will be confirmed at booking. [Final policy approval pending]" },
  { title: "Late Arrival Policy", body: "If you arrive late, your appointment may be shortened or rescheduled to respect other clients' time. [Final policy approval pending]" },
  { title: "Refund Policy", body: "Refunds are reviewed case-by-case and may be subject to consultation outcomes. [Final policy approval pending]" },
  { title: "Health & Safety Disclaimer", body: "Melt Aways does not provide medical diagnosis. All recommendations are made within the scope of consultation-led aesthetic and wellness services." },
  { title: "Results Disclaimer", body: "Results vary by client. No specific outcome is guaranteed. Consistency, lifestyle, and personalised guidance influence results." },
  { title: "Privacy Policy", body: "Information collected through our forms is used solely to support your consultation and booking experience. We do not share your information with third parties." },
];

export type Lead = {
  id: string;
  createdAt: string;
  status: "New Lead" | "Contacted" | "Consultation Booked" | "Treatment Recommended" | "Package Offered" | "Paid" | "Completed" | "Follow-Up Needed" | "Not Suitable" | "Lost Lead";
  fullName: string;
  phone: string;
  email: string;
  location: string;
  concern: string;
  targetArea: string;
  targetAreas: string[];
  targetAreaOther: string;
  priorTreatments: string;
  medical: string;
  medication: string;
  pregnancy: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  suggestedPackage: string;
};

export const LEAD_STATUSES: Lead["status"][] = [
  "New Lead", "Contacted", "Consultation Booked", "Treatment Recommended",
  "Package Offered", "Paid", "Completed", "Follow-Up Needed", "Not Suitable", "Lost Lead",
];

const KEY = "meltaways.leads.v1";

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveLead(lead: Lead) {
  const all = getLeads();
  all.unshift(lead);
  localStorage.setItem(KEY, JSON.stringify(all));
}
export function updateLead(id: string, patch: Partial<Lead>) {
  const all = getLeads().map(l => l.id === id ? { ...l, ...patch } : l);
  localStorage.setItem(KEY, JSON.stringify(all));
}