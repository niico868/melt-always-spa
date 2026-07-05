import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, ShieldOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardPage, PrimaryButton } from "@/components/dashboard/DashboardPage";
import { inputCls } from "@/components/dashboard/Modal";

export const Route = createFileRoute("/dashboard/security")({ component: SecurityPage });

type Factor = { id: string; friendly_name?: string | null; factor_type: string; status: string };

function SecurityPage() {
  const [factors, setFactors] = useState<Factor[] | null>(null);
  const [enrolling, setEnrolling] = useState<{ id: string; qr: string; secret: string } | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function refresh() {
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (error) { setErr(error.message); return; }
    setFactors((data.totp ?? []) as any);
  }
  useEffect(() => { void refresh(); }, []);

  async function startEnroll() {
    setErr(null); setOk(null); setBusy(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: `TOTP ${new Date().toLocaleDateString()}` });
      if (error) throw error;
      setEnrolling({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  }

  async function verifyEnroll() {
    if (!enrolling) return;
    setErr(null); setBusy(true);
    try {
      const { data: ch, error: e1 } = await supabase.auth.mfa.challenge({ factorId: enrolling.id });
      if (e1) throw e1;
      const { error: e2 } = await supabase.auth.mfa.verify({ factorId: enrolling.id, challengeId: ch.id, code });
      if (e2) throw e2;
      setOk("Two-factor authentication is now active on your account.");
      setEnrolling(null); setCode(""); void refresh();
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  }

  async function removeFactor(id: string) {
    if (!confirm("Remove this authenticator? You'll be asked to sign in without 2FA next time.")) return;
    setBusy(true);
    const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
    setBusy(false);
    if (error) setErr(error.message); else { setOk("Authenticator removed."); void refresh(); }
  }

  const activeFactors = (factors ?? []).filter(f => f.status === "verified");
  const has2FA = activeFactors.length > 0;

  return (
    <DashboardPage title="Security & Two-Factor Authentication" subtitle="Protect your account with an authenticator app">
      <div className="p-4 md:p-6 max-w-2xl space-y-4">
        <div className={`rounded-xl border p-4 flex items-start gap-3 ${has2FA ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          {has2FA ? <ShieldCheck className="text-emerald-600 mt-0.5" size={22} /> : <ShieldOff className="text-amber-600 mt-0.5" size={22} />}
          <div className="text-sm">
            <div className="font-semibold text-gray-900">{has2FA ? "2FA is enabled" : "2FA is not set up"}</div>
            <div className="text-xs text-gray-600 mt-0.5">
              {has2FA
                ? "You'll be asked for a 6-digit code from your authenticator app on each sign-in."
                : "Use Google Authenticator, Authy, or 1Password to add a second layer of security."}
            </div>
          </div>
        </div>

        {err && <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">{err}</div>}
        {ok && <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2">{ok}</div>}

        {activeFactors.length > 0 && (
          <div className="border border-gray-200 rounded-xl">
            <div className="p-3 border-b border-gray-100 text-xs font-semibold text-gray-700">Your authenticators</div>
            {activeFactors.map(f => (
              <div key={f.id} className="p-3 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium text-gray-800">{f.friendly_name || "Authenticator app"}</div>
                  <div className="text-[11px] text-gray-500">TOTP · verified</div>
                </div>
                <button onClick={() => removeFactor(f.id)} disabled={busy}
                  className="text-[11px] text-red-600 hover:underline">Remove</button>
              </div>
            ))}
          </div>
        )}

        {!enrolling && (
          <PrimaryButton onClick={startEnroll}>
            {busy ? "Please wait…" : has2FA ? "Add another authenticator" : "Set up 2FA"}
          </PrimaryButton>
        )}

        {enrolling && (
          <div className="border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="text-sm font-semibold text-gray-800">Scan this QR code</div>
            <div className="text-xs text-gray-600">Open Google Authenticator / Authy / 1Password and scan.</div>
            <img src={enrolling.qr} alt="TOTP QR" className="w-48 h-48 border border-gray-200 rounded" />
            <div className="text-[11px] text-gray-500">Or enter this key manually: <code className="bg-gray-100 px-1 rounded">{enrolling.secret}</code></div>
            <div>
              <label className="text-xs font-medium text-gray-700">Enter the 6-digit code from the app</label>
              <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g,"").slice(0,6))}
                className={inputCls} placeholder="000000" inputMode="numeric" />
            </div>
            <div className="flex gap-2">
              <PrimaryButton onClick={verifyEnroll}>{busy ? <><Loader2 className="inline animate-spin" size={12}/> Verifying…</> : "Verify & activate"}</PrimaryButton>
              <button onClick={() => { setEnrolling(null); setCode(""); }} className="text-xs text-gray-500 px-3">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </DashboardPage>
  );
}