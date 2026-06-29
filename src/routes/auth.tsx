import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Sign in — Melt Aways Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav({ to: "/dashboard" });
    });
  }, [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName }, emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
      }
      nav({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEAF0] to-[#FDF2F7] px-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-6">
          <div className="text-[#E8246A] text-2xl font-extrabold tracking-tight">Melt AWAYS</div>
          <p className="text-sm text-gray-500 mt-1">Spa management dashboard</p>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-full p-1 mb-6">
          <button type="button" onClick={() => setMode("signin")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition ${mode === "signin" ? "bg-[#E8246A] text-white" : "text-gray-600"}`}>
            Sign in
          </button>
          <button type="button" onClick={() => setMode("signup")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition ${mode === "signup" ? "bg-[#E8246A] text-white" : "text-gray-600"}`}>
            Create account
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <Field label="Full name" value={fullName} onChange={setFullName} required />
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="w-full rounded-lg bg-[#E8246A] text-white py-3 font-medium hover:bg-[#C91D5C] disabled:opacity-60 transition">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#E8246A] focus:bg-white transition" />
    </div>
  );
}