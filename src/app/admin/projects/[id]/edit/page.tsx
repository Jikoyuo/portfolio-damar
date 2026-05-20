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
    api
      .getProject(id)
      .then(setProject)
      .catch((e) =>
        setErr(e instanceof Error ? e.message : "Failed to load project")
      )
      .finally(() => setLoading(false));
  }, [id, ready, token]);

  if (!ready || !token) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Studio · edit entry
        </div>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-5xl text-[var(--ink)]">
          {loading ? (
            <span className="text-[var(--muted)]">loading…</span>
          ) : project ? (
            <>
              Editing{" "}
              <span className="italic text-[var(--clay)]">
                &ldquo;{project.title}&rdquo;
              </span>
            </>
          ) : (
            <span className="italic text-[var(--muted)]">not found</span>
          )}
        </h1>
      </div>

      {err && (
        <div className="rounded-2xl border border-[var(--clay)]/40 bg-[var(--clay)]/8 px-4 py-3 text-[13px] text-[var(--clay-2)]">
          {err}
        </div>
      )}

      {project && <ProjectForm initial={project} />}
    </div>
  );
}
