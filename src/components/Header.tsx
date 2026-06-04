import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-24 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center -my-2" aria-label="Melt Aways home">
          <Logo className="h-20 lg:h-24 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(n => (
            <Link key={n.to} to={n.to}
              className="text-sm tracking-wide text-foreground/80 hover:text-primary transition"
              activeProps={{ className: "text-primary font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-taupe hover:text-primary">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <Link to="/booking"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition soft-shadow">
            Book Consultation
          </Link>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-3">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="py-2 text-base text-foreground/80">{n.label}</Link>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 font-medium">
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}