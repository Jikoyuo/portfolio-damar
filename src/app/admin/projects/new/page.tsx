"use client";

import { useAdminAuth } from "@/components/admin/AdminAuth";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  const { ready, token } = useAdminAuth();
  if (!ready || !token) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Studio · new entry
        </div>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-5xl text-[var(--ink)]">
          Add a <span className="italic text-[var(--clay)]">project.</span>
        </h1>
      </div>
      <ProjectForm />
    </div>
  );
}
