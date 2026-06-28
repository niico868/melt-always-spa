import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, NAV_LEFT, NAV_RIGHT } from "@/lib/site";
import { getSession, signOut, type ClientProfile } from "@/lib/auth";

function NavLink({ to, label, flag, linkClass }: { to: string; label: string; flag?: boolean; linkClass: string }) {
  return (
    <Link to={to} className={`${linkClass} relative inline-flex flex-col items-center leading-none`}
      activeProps={{ className: "text-primary font-medium" }}
      activeOptions={{ exact: to === "/" }}>
      {flag && (
        <span aria-hidden className="text-xs leading-none mb-0.5">🇹🇹</span>
      )}
      <span>{label}</span>
    </Link>
  );
}

export function Header() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<ClientProfile | null>(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y < 80) { setHidden(false); return; }
    if (y > prev + 4) setHidden(true);       // scrolling down
    else if (y < prev - 4) setHidden(false); // scrolling up
  });
  useEffect(() => {
    const sync = () => setUser(getSession());
    sync();
    window.addEventListener("meltaways:auth", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("meltaways:auth", sync); window.removeEventListener("storage", sync); };
  }, []);
  const accountLink: "/account" | "/admin" = user?.role === "client" ? "/account" : "/admin";
  const linkClass = "nav-underline text-[12px] tracking-[0.18em] uppercase font-sans font-normal text-ink/85 hover:text-gold transition-colors";
  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-40 border-b border-gold/20 header-fade"
      style={{ background: "color-mix(in oklab, var(--cream) 88%, transparent)", backdropFilter: "saturate(140%) blur(10px)", WebkitBackdropFilter: "saturate(140%) blur(10px)" }}
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 h-24 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* LEFT NAV */}
        <nav className="hidden lg:flex items-center justify-around gap-8">
          {NAV_LEFT.map((n: any) => (
            <NavLink key={n.to} to={n.to} label={n.label} flag={n.flag} linkClass={linkClass} />
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link to="/" className="flex items-center justify-center -my-2 lg:col-start-2" aria-label="Melt Aways home">
          <Logo className="h-16 lg:h-20 w-auto" />
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
            className="inline-flex items-center rounded-full bg-gold text-espresso px-5 py-2.5 text-[12px] tracking-[0.14em] uppercase font-medium hover:bg-rose hover:text-cream transition soft-shadow">
            Book Consultation
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden p-2 justify-self-end col-start-3" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-gold/20 bg-cream">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="py-2 text-sm uppercase tracking-[0.18em] text-ink/85">{n.label}</Link>
            ))}
            {user ? (
              <Link to={accountLink} onClick={() => setOpen(false)} className="py-2 text-sm uppercase tracking-[0.18em] text-ink/85">My Account</Link>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="py-2 text-sm uppercase tracking-[0.18em] text-ink/85">Account</Link>
            )}
            <Link to="/booking" onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center rounded-full bg-gold text-espresso px-5 py-3 font-medium uppercase tracking-[0.14em] text-sm">
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}