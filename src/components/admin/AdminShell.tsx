"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAdminAuth } from "./AdminAuth";

export default function AdminShell({ children }: { children: ReactNode }) {
  const { username, logout, ready } = useAdminAuth();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      {!isLogin && (
        <header className="sticky top-0 z-30 border-b border-[var(--bone-3)] bg-[var(--bone)]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-[12.5px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                ← Public site
              </Link>
              <span className="text-[var(--bone-3)]">/</span>
              <Link href="/admin" className="inline-flex items-baseline gap-2">
                <span className="italic-serif text-[1.4rem] leading-none text-[var(--ink)]">damar</span>
                <span className="label text-[var(--clay)]">/studio</span>
              </Link>
            </div>

            <nav className="flex items-center gap-2">
              <Link
                href="/admin"
                className={`px-3 py-1.5 text-[12.5px] rounded-full transition-colors ${
                  pathname === "/admin"
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "text-[var(--ink-2)] hover:bg-[var(--bone-2)]"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/admin/projects/new"
                className="rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-3 py-1.5 text-[12.5px] text-[var(--ink)] hover:border-[var(--clay)] hover:text-[var(--clay)] transition-colors"
              >
                + New
              </Link>
              <span className="mx-2 h-4 w-px bg-[var(--bone-3)]" />
              <span className="hidden label sm:inline">
                {ready ? (username ? `@${username}` : "—") : "…"}
              </span>
              <button
                onClick={logout}
                className="text-[12.5px] text-[var(--ink-2)] hover:text-[var(--clay)] transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </div>
  );
}
