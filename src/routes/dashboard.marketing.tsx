import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Megaphone, Trash2 } from "lucide-react";
import { DashboardPage, PrimaryButton } from "@/components/dashboard/DashboardPage";
import { Field, inputCls } from "@/components/dashboard/Modal";

export const Route = createFileRoute("/dashboard/marketing")({ component: MarketingPage });

type Draft = { id: string; subject: string; body: string; audience: string; created_at: string };
const KEY = "meltaways.marketing.drafts";

function loadDrafts(): Draft[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

function MarketingPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all-customers");

  useEffect(() => { setDrafts(loadDrafts()); }, []);

  const save = () => {
    if (!subject.trim() || !body.trim()) return;
    const next: Draft = { id: crypto.randomUUID(), subject, body, audience, created_at: new Date().toISOString() };
    const all = [next, ...drafts];
    localStorage.setItem(KEY, JSON.stringify(all));
    setDrafts(all);
    setSubject(""); setBody("");
  };
  const remove = (id: string) => {
    const all = drafts.filter(d => d.id !== id);
    localStorage.setItem(KEY, JSON.stringify(all));
    setDrafts(all);
  };

  return (
    <DashboardPage title="Marketing" subtitle="Compose campaigns and save drafts">
      <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone size={16} className="text-[#E8246A]" />
            <h3 className="text-sm font-semibold text-gray-800">New broadcast</h3>
          </div>
          <Field label="Audience">
            <select value={audience} onChange={e => setAudience(e.target.value)} className={inputCls}>
              <option value="all-customers">All customers</option>
              <option value="new-leads">New leads (past 30 days)</option>
              <option value="active-clients">Active clients</option>
              <option value="dormant">Dormant (60+ days)</option>
            </select>
          </Field>
          <Field label="Subject">
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Summer glow special" className={inputCls} />
          </Field>
          <Field label="Message">
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={6} placeholder="Write your message…" className={inputCls} />
          </Field>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-gray-400">Sending is coming soon. Drafts save locally.</span>
            <PrimaryButton onClick={save}>Save draft</PrimaryButton>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Saved drafts ({drafts.length})</h3>
          {drafts.length === 0 ? (
            <p className="text-xs text-gray-400">No drafts yet.</p>
          ) : (
            <ul className="space-y-2 max-h-[420px] overflow-auto">
              {drafts.map(d => (
                <li key={d.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-gray-800 truncate">{d.subject}</div>
                      <div className="text-[10px] text-gray-500">{d.audience} · {new Date(d.created_at).toLocaleDateString()}</div>
                      <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">{d.body}</p>
                    </div>
                    <button onClick={() => remove(d.id)} className="text-gray-400 hover:text-red-500 flex-shrink-0"><Trash2 size={13} /></button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardPage>
  );
}