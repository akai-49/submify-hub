import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async (uid: string | undefined) => {
    if (!uid) {
      setIsAdmin(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (error) {
        console.warn("user_roles check error:", error.message);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(!!data);
    } catch (err) {
      console.warn("checkAdmin exception:", err);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Set up listener BEFORE getSession
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession && typeof window !== "undefined" && window.location.hash.includes("access_token")) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      // Defer role check to avoid deadlock in callback
      setTimeout(() => {
        checkAdmin(newSession?.user?.id);
      }, 0);
    });

    supabase.auth
      .getSession()
      .then(({ data: { session: existing } }) => {
        setSession(existing);
        setUser(existing?.user ?? null);
        checkAdmin(existing?.user?.id).finally(() => setLoading(false));
      })
      .catch((err) => {
        console.error("getSession error:", err);
        setLoading(false);
      });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const refreshRole = async () => {
    await checkAdmin(user?.id);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signOut, refreshRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
