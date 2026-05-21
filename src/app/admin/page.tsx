"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "@/components/admin/AdminAuth";
import { api, ApiProject, API_BASE } from "@/lib/api";

export default function AdminHomePage() {
  const { token, ready } = useAdminAuth();
  const [items, setItems] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [removing, setRemoving] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setErr(null);
      const data = await api.listProjects();
      setItems(data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ready && token) load();
  }, [ready, token, load]);

  const onDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Hapus project ini? Tidak bisa di-undo.")) return;
    try {
      setRemoving(id);
      await api.deleteProject(id, token);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setRemoving(null);
    }
  };

  const resolveImage = (img: string) => {
    if (!img) return null;
    if (/^https?:\/\//.test(img)) return img;
    if (img.startsWith("/api/placeholder")) return null;
    if (img.startsWith("/")) return img;
    return `${API_BASE}/${img}`;
  };

  if (!ready) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label mb-1">Studio</div>
          <h1 className="text-[22px] font-medium text-[var(--text)]">
            Projects <span className="text-[var(--text-3)] font-normal">({items.length})</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="rounded-sm border border-[var(--border)] px-3 py-1.5 text-[12.5px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors"
          >
            Refresh
          </button>
          <Link
            href="/admin/projects/new"
            className="rounded-sm bg-[var(--text)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--bg)] hover:bg-[var(--accent)] transition-colors"
          >
            + New project
          </Link>
        </div>
      </div>

      {err && (
        <div className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent)]/8 px-4 py-3 text-[13px] text-[var(--accent)]">
          {err}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-[13px] text-[var(--text-3)]">
          loading the archive…
        </div>
      ) : items.length === 0 ? (
        <div className="border-y border-[var(--border)] py-16 text-center">
          <p className="text-[14px] text-[var(--text-2)]">No projects yet.</p>
          <Link
            href="/admin/projects/new"
            className="mt-3 inline-block text-[13px] text-[var(--accent)] hover:underline"
          >
            Add your first project →
          </Link>
        </div>
      ) : (
        <ul className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
          {items.map((p) => {
            const thumb = resolveImage(p.images?.[0] || "");
            return (
              <li
                key={p.id}
                className="grid grid-cols-12 items-center gap-3 py-3 transition-colors hover:bg-[var(--bg-2)] px-2 -mx-2"
              >
                <div className="col-span-2 sm:col-span-1 relative aspect-square overflow-hidden rounded-sm bg-[var(--bg-3)] border border-[var(--border)]">
                  {thumb ? (
                    <Image src={thumb} alt={p.title} fill sizes="48px" className="object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center label">—</div>
                  )}
                </div>
                <div className="col-span-7 sm:col-span-6">
                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="block truncate text-[14px] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    {p.title}
                  </Link>
                  <div className="mt-0.5 truncate text-[12px] text-[var(--text-2)]">
                    {(p.stack || []).join(", ")}
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-2 label">
                  {p.type}
                </div>
                <div className="col-span-3 sm:col-span-3 flex items-center justify-end gap-2">
                  <Link
                    href={`/work/${p.id}`}
                    target="_blank"
                    className="text-[12.5px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
                  >
                    View
                  </Link>
                  <span className="text-[var(--border)]">·</span>
                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="text-[12.5px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
                  >
                    Edit
                  </Link>
                  <span className="text-[var(--border)]">·</span>
                  <button
                    disabled={removing === p.id}
                    onClick={() => onDelete(p.id)}
                    className="text-[12.5px] text-[var(--text-2)] hover:text-[var(--accent)] transition-colors disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
