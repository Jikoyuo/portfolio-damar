"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuth";
import ProjectForm from "@/components/admin/ProjectForm";
import { api, ApiProject } from "@/lib/api";

export default function EditProjectPage() {
  const { ready, token } = useAdminAuth();
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  const [project, setProject] = useState<ApiProject | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready || !token) return;
    if (!id || Number.isNaN(id)) {
      setErr("Invalid project id");
      setLoading(false);
      return;
    }
    api.getProject(id)
      .then(setProject)
      .catch((e) => setErr(e instanceof Error ? e.message : "Failed to load project"))
      .finally(() => setLoading(false));
  }, [id, ready, token]);

  if (!ready || !token) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="label mb-1">Studio · edit entry</div>
        <h1 className="text-[22px] font-medium text-[var(--text)]">
          {loading ? "loading…" : project ? `Editing "${project.title}"` : "Not found"}
        </h1>
      </div>

      {err && (
        <div className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent)]/8 px-3 py-2 text-[12.5px] text-[var(--accent)]">
          {err}
        </div>
      )}

      {project && <ProjectForm initial={project} />}
    </div>
  );
}
