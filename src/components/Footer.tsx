import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { SITE, NAV } from "@/lib/site";
import { FloralAccent } from "./FloralAccent";

export function Footer() {
  return (
    <footer className="mt-24 relative overflow-hidden border-t border-gold/30" style={{ background: "#1f0f08", color: "#C9A84C" }}>
      <FloralAccent variant="footer" opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-24 w-auto -ml-2" />
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed" style={{ color: "#E8DCC8" }}>
            A wellness, body-contouring, and aesthetic spa in Trinidad & Tobago. We guide women and men
            toward confidence through respectful, consultation-led care.
          </p>
          <p className="font-script text-3xl mt-4" style={{ color: "#C9A84C" }}>{SITE.tagline}</p>
        </div>
        <div>
          <h4 className="font-serif text-base tracking-[0.2em] uppercase mb-4" style={{ color: "#C9A84C" }}>Explore</h4>
          <ul className="space-y-2 text-sm font-light" style={{ color: "#E8DCC8" }}>
            {NAV.map(n => <li key={n.to}><Link to={n.to} className="hover:text-rose hover:underline decoration-gold underline-offset-4">{n.label}</Link></li>)}
            <li><Link to="/contact" className="hover:text-rose hover:underline decoration-gold underline-offset-4">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-rose hover:underline decoration-gold underline-offset-4">FAQ</Link></li>
            <li><Link to="/policies" className="hover:text-rose hover:underline decoration-gold underline-offset-4">Policies</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-base tracking-[0.2em] uppercase mb-4" style={{ color: "#C9A84C" }}>Visit & Contact</h4>
          <ul className="space-y-3 text-sm font-light" style={{ color: "#E8DCC8" }}>
            {SITE.locations.map(l => (
              <li key={l.name} className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5" style={{color:'#C9A84C'}} />{l.address}</li>
            ))}
            <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5" style={{color:'#C9A84C'}} />{SITE.hours}</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5" style={{color:'#C9A84C'}} /><a className="hover:text-rose" href={`tel:+${SITE.phoneDigits}`}>{SITE.phone}</a></li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5" style={{color:'#C9A84C'}} /><a className="hover:text-rose" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gold/40 hover:bg-gold/10 transition" style={{color:'#C9A84C'}} aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gold/40 hover:bg-gold/10 transition" style={{color:'#C9A84C'}} aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gold/40 hover:bg-gold/10 transition text-xs font-bold w-8 h-8 flex items-center justify-center" style={{color:'#C9A84C'}} aria-label="TikTok">TT</a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-gold/20 py-6 text-center text-xs font-light" style={{ color: "#E8DCC8" }}>
        © {new Date().getFullYear()} Melt Aways. All rights reserved. Treatments require consultation. Results vary.
      </div>
    </footer>
  );
}