import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type ProfileRow = { id: string; full_name: string | null; role: string };

export function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) loadProfile(s.user);
      else setProfile(null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) loadProfile(data.session.user);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function loadProfile(user: User) {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", user.id)
      .maybeSingle();
    setProfile(data ?? null);
  }

  return { session, user: session?.user ?? null, profile, loading: session === undefined };
}

export async function signOutAndRedirect() {
  await supabase.auth.signOut();
  if (typeof window !== "undefined") window.location.href = "/auth";
}