"use client";
import { PROFILE } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-2)]">
      <div className="mx-auto max-w-7xl px-5 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-display)] font-black text-lg text-[var(--volt)] uppercase tracking-tight">CDK</span>
          <span className="h-4 w-px bg-[var(--border)]" />
          <span className="label">© {new Date().getFullYear()} {PROFILE.name}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="label">Syne · JetBrains Mono · Next.js · Go</span>
          <span className="h-4 w-px bg-[var(--border)]" />
          <a href="/admin/login" className="label hover:text-[var(--volt)] transition-colors">Studio →</a>
        </div>
      </div>
    </footer>
  );
}
