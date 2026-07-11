import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, NAV_LEFT, NAV_RIGHT } from "@/lib/site";
import { getSession, signOut, type ClientProfile } from "@/lib/auth";

function NavLink({ to, label, flag, linkClass }: { to: string; label: string; flag?: boolean; linkClass: string }) {
  return (
    <Link to={to} className={`${linkClass} relative inline-flex items-center gap-1.5 leading-none`}
      activeProps={{ className: "text-primary font-medium" }}
      activeOptions={{ exact: to === "/" }}>
      <span>{label}</span>
      {flag && (
        <span aria-hidden className="text-sm leading-none">🇹🇹</span>
      )}
    </Link>
  );
}

export function Header() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<ClientProfile | null>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const sync = () => setUser(getSession());
    sync();
    window.addEventListener("meltaways:auth", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("meltaways:auth", sync); window.removeEventListener("storage", sync); };
  }, []);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) { setHidden(false); lastY = y; return; }
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const accountLink: "/account" | "/dashboard" = user?.role === "client" ? "/account" : "/dashboard";
  const linkClass = "nav-underline text-[13px] tracking-[0.08em] uppercase text-foreground/75 hover:text-primary transition-colors";
  return (
    <header className={`sticky top-0 z-40 glass-nav border-b border-border/40 header-fade transition-transform duration-300 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 h-[calc(4rem+0.67em)] lg:h-[calc(5rem+0.67em)] grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* LEFT NAV */}
        <nav className="hidden lg:flex items-center justify-around gap-8">
          {NAV_LEFT.map((n: any) => (
            <NavLink key={n.to} to={n.to} label={n.label} flag={n.flag} linkClass={linkClass} />
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link to="/" className="flex items-center justify-center -my-2 lg:col-start-2" aria-label="Melt Elite Aesthetics home">
          <Logo className="h-20 lg:h-24 w-auto" />
        </Link>

        {/* RIGHT NAV + ACTIONS */}
        <div className="hidden lg:flex items-center justify-end gap-7">
          <nav className="flex items-center gap-7">
            {NAV_RIGHT.map((n: any) => (
              <NavLink key={n.to} to={n.to} label={n.label} flag={n.flag} linkClass={linkClass} />
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