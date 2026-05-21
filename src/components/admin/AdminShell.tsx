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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {!isLogin && (
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[12.5px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
                aria-label="Back to public site"
              >
                ← Public site
              </Link>
              <span className="text-[var(--text-3)]">/</span>
              <Link href="/admin" className="text-[13.5px] font-medium text-[var(--text)]">
                Studio
              </Link>
            </div>

            <nav className="flex items-center gap-2">
              <Link
                href="/admin"
                className={`px-2 py-1 text-[12.5px] transition-colors ${
                  pathname === "/admin"
                    ? "text-[var(--text)]"
                    : "text-[var(--text-2)] hover:text-[var(--text)]"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/admin/projects/new"
                className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[12.5px] text-[var(--text)] transition-colors hover:bg-[var(--bg-2)]"
              >
                + New
              </Link>
              <span className="mx-2 h-4 w-px bg-[var(--border)]" />
              <span className="hidden label sm:inline">
                {ready ? (username ? `@${username}` : "—") : "…"}
              </span>
              <button
                onClick={logout}
                className="text-[12.5px] text-[var(--text-2)] hover:text-[var(--accent)] transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-5xl px-5 py-10">{children}</div>
    </div>
  );
}
