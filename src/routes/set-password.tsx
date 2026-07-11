import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/set-password")({
  ssr: false,
  head: () => ({ meta: [{ title: "Set your password — Melt Elite Aesthetics" }, { name: "robots", content: "noindex" }] }),
  component: SetPasswordPage,
});

function SetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Newer PKCE flow: ?code=...
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (window.location.hash.includes("access_token")) {
          // Legacy implicit flow: #access_token=...&refresh_token=...
          const params = new URLSearchParams(window.location.hash.slice(1));
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");
          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({ access_token, refresh_token });
            if (error) throw error;
          }
        }

        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          setLinkError("This invite link is invalid or has expired. Ask an administrator to send a new invite.");
        } else {
          const meta = (data.user.user_metadata ?? {}) as { full_name?: string };
          if (meta.full_name) setFullName(meta.full_name);
          // Clean the URL
          window.history.replaceState({}, "", "/set-password");
        }
      } catch (err: any) {
        setLinkError(err?.message || "We couldn't verify your invite link.");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setBusy(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase.auth.updateUser({
        password,
        data: { full_name: fullName },
      });
      if (error) throw error;
      if (userData.user) {
        await supabase.from("profiles").upsert({ id: userData.user.id, full_name: fullName });
      }
      nav({ to: "/dashboard" });
    } catch (err: any) {
      setError(err?.message || "Could not set your password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEAF0] to-[#FDF2F7] px-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-6">
          <div className="text-[#E8246A] text-2xl font-extrabold tracking-tight">Melt Elite Aesthetics</div>
          <p className="text-sm text-gray-500 mt-1">Set up your admin account</p>
        </div>

        {!ready ? (
          <p className="text-sm text-gray-500 text-center py-6">Verifying your invite…</p>
        ) : linkError ? (
          <div className="space-y-3">
            <p className="text-sm text-red-600">{linkError}</p>
            <a href="/auth" className="block text-center text-sm text-[#E8246A] hover:underline">Go to sign in</a>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Field label="Full name" value={fullName} onChange={setFullName} required />
            <Field label="New password" type="password" value={password} onChange={setPassword} required />
            <Field label="Confirm password" type="password" value={confirm} onChange={setConfirm} required />
            <p className="text-xs text-gray-500">Minimum 8 characters.</p>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button disabled={busy} className="w-full rounded-lg bg-[#E8246A] text-white py-3 font-medium hover:bg-[#C91D5C] disabled:opacity-60 transition">
              {busy ? "Saving…" : "Set password & continue"}
            </button>
          </form>
        )}
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