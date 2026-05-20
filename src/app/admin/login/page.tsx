"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuth";
import { Lock, User as UserIcon } from "lucide-react";

export default function LoginPage() {
  const { login, token, ready } = useAdminAuth();
  const router = useRouter();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && token) router.replace("/admin");
  }, [ready, token, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(u, p);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-[75vh] place-items-center overflow-hidden">

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Studio · authentication
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[var(--ink)]">
            Welcome back,
            <span className="italic text-[var(--clay)]"> Damar.</span>
          </h1>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl border border-[var(--bone-3)] bg-[var(--paper)] p-7"
        >
          <Field label="Username" icon={<UserIcon size={14} />}>
            <input
              type="text"
              autoComplete="username"
              value={u}
              onChange={(e) => setU(e.target.value)}
              required
              className="w-full bg-transparent text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
              placeholder="damar"
            />
          </Field>
          <Field label="Password" icon={<Lock size={14} />}>
            <input
              type="password"
              autoComplete="current-password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              required
              className="w-full bg-transparent text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
              placeholder="••••••••"
            />
          </Field>

          {error && (
            <div className="rounded-lg border border-[var(--clay)]/40 bg-[var(--clay)]/8 px-3 py-2 text-[13px] text-[var(--clay-2)]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] text-[var(--muted)]">
          Private studio. Public users have no business here.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {icon}
        <span>{label}</span>
      </div>
      <div className="rounded-xl border border-[var(--bone-3)] bg-[var(--bone)] px-3.5 py-3 focus-within:border-[var(--clay)] transition-colors">
        {children}
      </div>
    </label>
  );
}
