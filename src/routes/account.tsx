import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Section, Eyebrow } from "@/components/Section";
import { getSession, updateProfile, signOut, clientTreatments, type ClientProfile, type TreatmentRecord } from "@/lib/auth";
import { LogOut, Save, User as UserIcon, Activity } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [
    { title: "My Account — Melt Aways" },
    { name: "robots", content: "noindex" },
  ]}),
  component: Account,
});

function Account() {
  const nav = useNavigate();
  const [user, setUser] = useState<ClientProfile | null>(null);
  const [treatments, setTreatments] = useState<TreatmentRecord[]>([]);
  const [tab, setTab] = useState<"profile" | "history">("profile");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "client") { nav({ to: "/login" }); return; }
    setUser(s);
    setTreatments(clientTreatments(s.id));
  }, [nav]);

  if (!user) return null;

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const patch: Partial<ClientProfile> = {
      fullName: String(f.get("fullName") || ""),
      phone: String(f.get("phone") || ""),
      dob: String(f.get("dob") || ""),
      address: String(f.get("address") || ""),
      emergencyContact: String(f.get("emergencyContact") || ""),
      medicalConditions: String(f.get("medicalConditions") || ""),
      medications: String(f.get("medications") || ""),
      allergies: String(f.get("allergies") || ""),
      pregnancy: String(f.get("pregnancy") || ""),
      goals: String(f.get("goals") || ""),
      notes: String(f.get("notes") || ""),
    };
    updateProfile(patch);
    setUser({ ...user!, ...patch });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <Section className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <Eyebrow>My Account</Eyebrow>
          <h1 className="text-3xl lg:text-4xl font-light text-ink">Welcome back, {user.fullName.split(" ")[0]}.</h1>
          <p className="text-sm text-taupe mt-1">{user.email}</p>
        </div>
        <button onClick={() => { signOut(); nav({ to: "/" }); }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm hover:bg-blush transition">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="flex gap-2 mb-6 bg-cream rounded-full p-1 w-fit">
        <TabBtn active={tab === "profile"} onClick={() => setTab("profile")} icon={<UserIcon className="w-4 h-4" />}>My Profile</TabBtn>
        <TabBtn active={tab === "history"} onClick={() => setTab("history")} icon={<Activity className="w-4 h-4" />}>Treatment History</TabBtn>
      </div>

      {tab === "profile" && (
        <form onSubmit={save} className="bg-background border border-border/60 rounded-3xl p-7 lg:p-10 card-shadow space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Full name" name="fullName" defaultValue={user.fullName} required />
            <F label="Phone" name="phone" defaultValue={user.phone} />
            <F label="Date of birth" name="dob" type="date" defaultValue={user.dob} />
            <F label="Address" name="address" defaultValue={user.address} />
            <F label="Emergency contact" name="emergencyContact" defaultValue={user.emergencyContact} />
            <F label="Pregnancy status" name="pregnancy" defaultValue={user.pregnancy} placeholder="No / Pregnant / Postpartum" />
          </div>
          <T label="Medical conditions" name="medicalConditions" defaultValue={user.medicalConditions} />
          <T label="Current medications" name="medications" defaultValue={user.medications} />
          <T label="Allergies" name="allergies" defaultValue={user.allergies} />
          <T label="Your wellness goals" name="goals" defaultValue={user.goals} />
          <T label="Additional notes for your care team" name="notes" defaultValue={user.notes} />
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium soft-shadow">
              <Save className="w-4 h-4" /> Save Changes
            </button>
            {saved && <span className="text-sm text-primary">Profile updated.</span>}
          </div>
        </form>
      )}

      {tab === "history" && (
        <div className="bg-background border border-border/60 rounded-3xl card-shadow overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <h2 className="text-lg font-medium text-ink">Treatment history</h2>
            <p className="text-sm text-taupe">A record of your sessions with Melt Aways. Includes practitioner and processing clerk for each visit.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream text-left text-xs uppercase tracking-wider text-taupe">
                <tr>
                  <th className="px-4 py-3">Date</th><th className="px-4 py-3">Service</th><th className="px-4 py-3">Area</th>
                  <th className="px-4 py-3">Practitioner</th><th className="px-4 py-3">Clerk</th>
                  <th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map(t => (
                  <tr key={t.id} className="border-t border-border">
                    <td className="px-4 py-3 text-ink">{t.date}</td>
                    <td className="px-4 py-3 text-ink">{t.service}</td>
                    <td className="px-4 py-3 text-taupe">{t.area}</td>
                    <td className="px-4 py-3 text-taupe">{t.practitioner}</td>
                    <td className="px-4 py-3 text-taupe">{t.clerk}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-blush text-primary text-xs px-3 py-1">{t.status}</span></td>
                    <td className="px-4 py-3 text-right text-ink">TT${t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Section>
  );
}

function TabBtn({ active, onClick, children, icon }: { active: boolean; onClick: () => void; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground" : "text-taupe"}`}>
      {icon}{children}
    </button>
  );
}
function F({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input {...p} className="mt-1.5 w-full rounded-2xl border border-input bg-cream/50 px-4 py-3 outline-none focus:border-primary transition" />
    </div>
  );
}
function T({ label, ...p }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <textarea rows={3} {...p} className="mt-1.5 w-full rounded-2xl border border-input bg-cream/50 px-4 py-3 outline-none focus:border-primary transition" />
    </div>
  );
}
