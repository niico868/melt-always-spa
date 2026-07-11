import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow } from "@/components/Section";
import { signIn, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign In — Melt Aways" },
    { name: "robots", content: "noindex" },
  ]}),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [role, setRole] = useState<Role>("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const r = signIn(email, password, role);
    if (!r.ok) return setError(r.error || "Sign in failed.");
    nav({ to: role === "client" ? "/account" : "/dashboard" });
  }

  return (
    <Section className="max-w-md">
      <div className="text-center mb-8">
        <Eyebrow>Welcome Back</Eyebrow>
        <h1 className="text-4xl font-light text-ink">Sign in to your account</h1>
      </div>
      <div className="bg-background border border-border/60 rounded-3xl p-7 card-shadow">
        <div className="flex gap-2 mb-6 bg-cream rounded-full p-1">
          {(["client", "staff", "admin"] as Role[]).map(r => (
            <button key={r} type="button" onClick={() => setRole(r)}
              className={`flex-1 rounded-full py-2 text-sm font-medium capitalize transition ${role === r ? "bg-primary text-primary-foreground" : "text-taupe"}`}>
              {r}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium soft-shadow">
            Sign In
          </button>
        </form>
        {role === "client" ? (
          <p className="mt-5 text-xs text-center text-taupe">
            Accounts are created by our team. Please contact reception to set one up.
          </p>
        ) : (
          <p className="mt-5 text-xs text-center text-taupe">
            Demo staff: <code className="text-ink">staff@meltaways.tt / staff123</code><br/>
            Demo admin: <code className="text-ink">admin@meltaways.tt / admin123</code>
          </p>
        )}
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
