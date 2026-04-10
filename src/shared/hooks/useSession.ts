import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../services/supabaseClient";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async(_event, next) => {
      setSession(next);

      if (_event === "SIGNED_IN" && next?.user) {
        const { id, email } = next.user;
        const { error } = await supabase
          .from("profiles")
          .upsert({ id, email }, { onConflict: "id" });

         if (error) console.error("Error guardando perfil:", error.message);

      }

    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session?.user.email)

  return session;
}