"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";

const STORAGE_KEY = "damar.admin.token";

interface AuthCtx {
  token: string | null;
  username: string | null;
  ready: boolean;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Restore token on mount
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) {
      setReady(true);
      return;
    }
    // Verify with /auth/me
    api
      .me(stored)
      .then((r) => {
        setToken(stored);
        setUsername(r.username);
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => setReady(true));
  }, []);

  // Route guard
  useEffect(() => {
    if (!ready) return;
    if (!pathname?.startsWith("/admin")) return;
    if (pathname === "/admin/login") return;
    if (!token) router.replace("/admin/login");
  }, [ready, token, pathname, router]);

  const login = useCallback(async (u: string, p: string) => {
    const r = await api.login(u, p);
    localStorage.setItem(STORAGE_KEY, r.token);
    setToken(r.token);
    setUsername(r.username);
    router.replace("/admin");
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUsername(null);
    router.replace("/admin/login");
  }, [router]);

  const value = useMemo(
    () => ({ token, username, ready, login, logout }),
    [token, username, ready, login, logout]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
