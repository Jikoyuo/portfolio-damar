"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAdminAuth } from "./AdminAuth";
import { LogOut, LayoutGrid, Plus, ArrowLeft } from "lucide-react";

export default function AdminShell({ children }: { children: ReactNode }) {
  const { username, logout, ready } = useAdminAuth();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      {!isLogin && (
        <header className="sticky top-0 z-30 border-b border-[var(--bone-3)] bg-[var(--bone)]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                aria-label="Back to public site"
              >
                <ArrowLeft size={14} />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                  Public site
                </span>
              </Link>
              <span className="h-5 w-px bg-[var(--bone-3)]" />
              <Link
                href="/admin"
                className="inline-flex items-baseline gap-2 text-[var(--ink)]"
              >
                <span className="font-[family-name:var(--font-display)] italic text-2xl leading-none">
                  damar
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--clay)]">
                  /studio
                </span>
              </Link>
            </div>

            <nav className="flex items-center gap-2">
              <Link
                href="/admin"
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                  pathname === "/admin"
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "text-[var(--ink-2)] hover:bg-[var(--bone-2)]"
                }`}
              >
                <LayoutGrid size={13} /> Projects
              </Link>
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-3 py-1.5 text-[12px] text-[var(--ink)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
              >
                <Plus size={13} /> New
              </Link>
              <span className="mx-2 hidden h-5 w-px bg-[var(--bone-3)] sm:inline-block" />
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:inline">
                {ready ? (username ? `@${username}` : "—") : "…"}
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--bone-3)] px-3 py-1.5 text-[12px] text-[var(--ink-2)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
              >
                <LogOut size={13} /> Logout
              </button>
            </nav>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
    </div>
  );
}
