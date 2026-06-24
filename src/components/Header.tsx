import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, NAV_LEFT, NAV_RIGHT } from "@/lib/site";
import { getSession, signOut, type ClientProfile } from "@/lib/auth";

export function Header() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<ClientProfile | null>(null);
  useEffect(() => {
    const sync = () => setUser(getSession());
    sync();
    window.addEventListener("meltaways:auth", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("meltaways:auth", sync); window.removeEventListener("storage", sync); };
  }, []);
  const accountLink: "/account" | "/admin" = user?.role === "client" ? "/account" : "/admin";
  const linkClass = "nav-underline text-[13px] tracking-[0.08em] uppercase text-foreground/75 hover:text-primary transition-colors";
  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-border/40 header-fade">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 h-24 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* LEFT NAV */}
        <nav className="hidden lg:flex items-center justify-start gap-8">
          {NAV_LEFT.map(n => (
            <Link key={n.to} to={n.to} className={linkClass}
              activeProps={{ className: "text-primary font-medium" }}
              activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link to="/" className="flex items-center justify-center -my-2 lg:col-start-2" aria-label="Melt Aways home">
          <Logo className="h-16 lg:h-20 w-auto" />
        </Link>

        {/* RIGHT NAV + ACTIONS */}
        <div className="hidden lg:flex items-center justify-end gap-7">
          <nav className="flex items-center gap-7">
            {NAV_RIGHT.map(n => (
              <Link key={n.to} to={n.to} className={linkClass}
                activeProps={{ className: "text-primary font-medium" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <span className="h-5 w-px bg-border" />
          {user ? (
            <div className="flex items-center gap-3">
              <Link to={accountLink} className="inline-flex items-center gap-1.5 text-[13px] text-taupe hover:text-primary">
                <User className="w-4 h-4" /> {user.fullName.split(" ")[0]}
              </Link>
              <button onClick={() => { signOut(); nav({ to: "/" }); }} className="text-[13px] text-taupe hover:text-primary">Sign out</button>
            </div>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-1.5 text-[13px] text-taupe hover:text-primary">
              <User className="w-4 h-4" /> Account
            </Link>
          )}
          <Link to="/booking"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-[13px] tracking-wide font-medium hover:opacity-90 transition soft-shadow">
            Book Consultation
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden p-2 justify-self-end col-start-3" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="py-2 text-base text-foreground/80">{n.label}</Link>
            ))}
            {user ? (
              <Link to={accountLink} onClick={() => setOpen(false)} className="py-2 text-base text-foreground/80">My Account</Link>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="py-2 text-base text-foreground/80">Account</Link>
            )}
            <Link to="/booking" onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 font-medium">
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}