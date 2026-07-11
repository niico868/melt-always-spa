import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Sign In — Melt Elite Aesthetics" },
    { name: "robots", content: "noindex" },
  ]}),
  component: Login,
});

type Tab = "client" | "staff";
const STAFF_ROLES = ["admin", "manager", "staff", "receptionist"] as const;

async function routeAfterLogin(userId: string): Promise<string> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const isStaff = (data ?? []).some((r: any) => (STAFF_ROLES as readonly string[]).includes(r.role));
  return isStaff ? "/dashboard" : "/account";
}

function Login() {
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) nav({ to: (await routeAfterLogin(data.user.id)) as any });
    });
  }, [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setInfo("Signing you in…"); setBusy(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      if (!data.user) throw new Error("Sign in failed.");
      setInfo("Success. Redirecting…");
      const to = await routeAfterLogin(data.user.id);
      setTimeout(() => nav({ to: to as any }), 400);
    } catch (err: any) {
      setInfo(null);
      setError(err?.message || "Sign in failed.");
      setBusy(false);
    }
  }

  return (
    <Section className="max-w-md">
      <div className="text-center mb-8">
        <Eyebrow>Welcome Back</Eyebrow>
        <h1 className="text-4xl font-light text-ink">Sign in to your account</h1>
      </div>
      <div className="bg-background border border-border/60 rounded-3xl p-7 card-shadow">
        <div className="flex gap-2 mb-6 bg-cream rounded-full p-1">
          {(["client", "staff"] as Tab[]).map(r => (
            <button key={r} type="button" onClick={() => setTab(r)}
              className={`flex-1 rounded-full py-2 text-sm font-medium capitalize transition ${tab === r ? "bg-primary text-primary-foreground" : "text-taupe"}`}>
              {r}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          <div>
            <label className="text-sm font-medium text-ink">Password</label>
            <div className="relative mt-1.5">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                required autoComplete="current-password"
                className="w-full rounded-2xl border border-input bg-cream/50 px-4 py-3 pr-11 outline-none focus:border-primary transition" />
              <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 flex items-center px-2 text-taupe hover:text-primary">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {info && <p className="text-sm rounded-lg bg-blush/60 border border-primary/20 text-primary px-3 py-2">{info}</p>}
          {error && <p className="text-sm rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2">{error}</p>}
          <button disabled={busy} className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium soft-shadow disabled:opacity-60">
            {busy ? "Please wait…" : "Sign In"}
          </button>
        </form>
        <p className="mt-5 text-xs text-center text-taupe">
          {tab === "client"
            ? "Client accounts are created by our team. Check your email for an invite to set your password."
            : "Staff accounts are created by an administrator."}
        </p>
      </div>
    </Section>
  );
}

function Input({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input {...p} className="mt-1.5 w-full rounded-2xl border border-input bg-cream/50 px-4 py-3 outline-none focus:border-primary transition" />
    </div>
  );
}