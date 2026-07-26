import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/submit-consultation")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: any;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "content-type": "application/json" } });
        }
        const s = (v: unknown) => (typeof v === "string" ? v.slice(0, 2000) : undefined);
        const full_name = s(body.full_name);
        if (!full_name || full_name.trim().length < 2) {
          return new Response(JSON.stringify({ error: "Name is required" }), { status: 400, headers: { "content-type": "application/json" } });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await (supabaseAdmin.rpc as any)("public_submit_consultation", {
          p_full_name: full_name,
          p_phone: s(body.phone),
          p_email: s(body.email),
          p_concern: s(body.concern),
          p_areas: s(body.areas),
          p_notes: s(body.notes),
          p_preferred_date: s(body.preferred_date),
          p_preferred_time: s(body.preferred_time),
          p_location: s(body.location),
          p_suggested_package: s(body.suggested_package),
        });
        if (error) {
          console.error("submit-consultation failed", error);
          return new Response(JSON.stringify({ error: "Submission failed" }), { status: 500, headers: { "content-type": "application/json" } });
        }
        return new Response(JSON.stringify({ ok: true, id: data }), { headers: { "content-type": "application/json" } });
      },
    },
  },
});