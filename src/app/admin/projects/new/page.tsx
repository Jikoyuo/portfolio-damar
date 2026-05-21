"use client";

import { useAdminAuth } from "@/components/admin/AdminAuth";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  const { ready, token } = useAdminAuth();
  if (!ready || !token) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="label mb-1">Studio · new entry</div>
        <h1 className="text-[22px] font-medium text-[var(--text)]">
          Add a project
        </h1>
      </div>
      <ProjectForm />
    </div>
  );
}
