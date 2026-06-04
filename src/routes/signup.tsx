import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow } from "@/components/Section";
import { signUpClient } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [
    { title: "Create Account — Melt Aways" },
    { name: "robots", content: "noindex" },
  ]}),
  component: SignUp,
});

function SignUp() {
  const nav = useNavigate();
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password") || "");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    const r = signUpClient({
      email: String(f.get("email") || ""),
      password,
      fullName: String(f.get("fullName") || ""),
      phone: String(f.get("phone") || ""),
      dob: String(f.get("dob") || ""),
    });
    if (!r.ok) return setError(r.error || "Sign up failed.");
    nav({ to: "/account" });
  }

  return (
    <Section className="max-w-md">
      <div className="text-center mb-8">
        <Eyebrow>Begin Your Journey</Eyebrow>
        <h1 className="text-4xl font-light text-ink">Create your client account</h1>
        <p className="mt-3 text-sm text-taupe">Track your treatments, update your profile, and stay close to your care team.</p>
      </div>
      <form onSubmit={submit} className="bg-background border border-border/60 rounded-3xl p-7 card-shadow space-y-4">
        <Input label="Full name" name="fullName" required />
        <Input label="Email" name="email" type="email" required />
        <Input label="Phone" name="phone" type="tel" />
        <Input label="Date of birth" name="dob" type="date" />
        <Input label="Password (min 6 chars)" name="password" type="password" required />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium soft-shadow">
          Create Account
        </button>
        <p className="text-sm text-center text-taupe">
          Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link>
        </p>
      </form>
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
