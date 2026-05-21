"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuth";

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
    <div className="mx-auto grid min-h-[80vh] max-w-sm place-items-center px-5">
      <div className="w-full">
        <div className="mb-8">
          <div className="label mb-2">Studio · sign in</div>
          <h1 className="text-[22px] font-medium text-[var(--text)]">
            Welcome back.
          </h1>
          <p className="mt-2 text-[13px] text-[var(--text-2)]">
            Private editor for portfolio entries.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Username">
            <input
              type="text"
              autoComplete="username"
              value={u}
              onChange={(e) => setU(e.target.value)}
              required
              className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
              placeholder="damar"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              autoComplete="current-password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              required
              className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
              placeholder="••••••••"
            />
          </Field>

          {error && (
            <div className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent)]/8 px-3 py-2 text-[12.5px] text-[var(--accent)]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--text)] px-4 py-2.5 text-[13px] font-medium text-[var(--bg)] transition-colors hover:bg-[var(--accent)] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center label">
          Private studio · public users have no business here.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 label">{label}</div>
      <div className="rounded-sm border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 focus-within:border-[var(--text)] transition-colors">
        {children}
      </div>
    </label>
  );
}
