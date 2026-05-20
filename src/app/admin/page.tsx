"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "@/components/admin/AdminAuth";
import { api, ApiProject, API_BASE } from "@/lib/api";
import { Edit3, Trash2, Plus, ExternalLink, RefreshCw } from "lucide-react";

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
    if (!confirm("Hapus project ini? Aksi ini tidak bisa di-undo.")) return;
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
    return `${API_BASE}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  if (!ready) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Studio
          </div>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-5xl text-[var(--ink)]">
            Projects <span className="italic text-[var(--clay)]">— {items.length}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-4 py-2 text-[13px] text-[var(--ink-2)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
          >
            <RefreshCw size={13} /> Refresh
          </button>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2 text-[13px] font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)]"
          >
            <Plus size={14} /> New project
          </Link>
        </div>
      </div>

      {err && (
        <div className="rounded-2xl border border-[var(--clay)]/40 bg-[var(--clay)]/8 px-4 py-3 text-[13px] text-[var(--clay-2)]">
          {err}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-[var(--bone-3)] bg-[var(--paper)]">
        {loading ? (
          <div className="grid place-items-center py-20 font-[family-name:var(--font-display)] italic text-2xl text-[var(--muted)]">
            loading the archive…
          </div>
        ) : items.length === 0 ? (
          <div className="grid place-items-center gap-2 py-20">
            <div className="font-[family-name:var(--font-display)] italic text-3xl text-[var(--muted)]">
              empty shelf.
            </div>
            <Link
              href="/admin/projects/new"
              className="text-[13px] text-[var(--clay)] underline decoration-dotted underline-offset-4"
            >
              Add your first project →
            </Link>
          </div>
        ) : (
          <ul>
            {items.map((p) => {
              const thumb = resolveImage(p.images?.[0] || "");
              return (
                <li
                  key={p.id}
                  className="grid grid-cols-12 items-center gap-4 border-b border-[var(--bone-3)] px-5 py-4 last:border-b-0 hover:bg-[var(--bone-2)]/40"
                >
                  <div className="col-span-1 relative aspect-square overflow-hidden rounded-lg bg-[var(--bone-2)]">
                    {thumb ? (
                      <Image src={thumb} alt={p.title} fill sizes="48px" className="object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center font-mono text-[9px] uppercase text-[var(--muted)]">
                        no img
                      </div>
                    )}
                  </div>
                  <div className="col-span-7 md:col-span-6">
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="block truncate font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] hover:text-[var(--clay)]"
                    >
                      {p.title}
                    </Link>
                    <div className="mt-0.5 truncate text-[12px] text-[var(--muted)]">
                      {(p.stack || []).join(" · ")}
                    </div>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="inline-block rounded-full border border-[var(--bone-3)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-2)]">
                      {p.type}
                    </span>
                  </div>
                  <div className="col-span-4 md:col-span-3 flex items-center justify-end gap-1.5">
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open demo"
                        className="grid h-8 w-8 place-items-center rounded-full border border-[var(--bone-3)] text-[var(--ink-2)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      title="Edit"
                      className="grid h-8 w-8 place-items-center rounded-full border border-[var(--bone-3)] text-[var(--ink-2)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
                    >
                      <Edit3 size={13} />
                    </Link>
                    <button
                      disabled={removing === p.id}
                      onClick={() => onDelete(p.id)}
                      title="Delete"
                      className="grid h-8 w-8 place-items-center rounded-full border border-[var(--bone-3)] text-[var(--ink-2)] transition-colors hover:border-[var(--clay)] hover:bg-[var(--clay)] hover:text-[var(--paper)] disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
