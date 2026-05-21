"use client";

import {
  ChangeEvent, FormEvent, useCallback, useRef, useState,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api, ApiProject, API_BASE, ProjectInput } from "@/lib/api";
import { useAdminAuth } from "./AdminAuth";

interface Props { initial?: ApiProject }

const EMPTY: ProjectInput = {
  title: "", description: "", type: "Personal",
  stack: [], images: [],
  demoUrl: "", githubUrl: "", sortOrder: 0,
};

export default function ProjectForm({ initial }: Props) {
  const router = useRouter();
  const { token } = useAdminAuth();
  const [form, setForm] = useState<ProjectInput>(initial ? {
    title: initial.title, description: initial.description, type: initial.type,
    stack: initial.stack || [], images: initial.images || [],
    demoUrl: initial.demoUrl, githubUrl: initial.githubUrl, sortOrder: initial.sortOrder,
  } : EMPTY);
  const [stackInput, setStackInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChange = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const addStack = () => {
    const v = stackInput.trim();
    if (!v) return;
    if (!form.stack.includes(v)) onChange("stack", [...form.stack, v]);
    setStackInput("");
  };
  const removeStack = (s: string) => onChange("stack", form.stack.filter((x) => x !== s));

  const addUrlImage = () => {
    const v = urlInput.trim();
    if (!v) return;
    onChange("images", [...form.images, v]);
    setUrlInput("");
  };

  const onUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (!token) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true); setError(null);
    try {
      const uploaded: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const r = await api.uploadImage(files[i], token);
        uploaded.push(r.url);
      }
      onChange("images", [...form.images, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [form.images, token]);

  const removeImage = (idx: number) => onChange("images", form.images.filter((_, i) => i !== idx));
  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= form.images.length) return;
    const arr = [...form.images];
    const [m] = arr.splice(from, 1);
    arr.splice(to, 0, m);
    onChange("images", arr);
  };

  const resolveImage = (img: string) => {
    if (/^https?:\/\//.test(img)) return img;
    if (img.startsWith("/")) return img;
    return `${API_BASE}/${img}`;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null); setSubmitting(true);
    try {
      const payload: ProjectInput = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        demoUrl: form.demoUrl.trim(),
        githubUrl: form.githubUrl.trim(),
        sortOrder: Number(form.sortOrder) || 0,
      };
      if (initial) await api.updateProject(initial.id, payload, token);
      else         await api.createProject(payload, token);
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 space-y-5">
        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            required
            placeholder="JiChat — Realtime Social Media"
            className="w-full bg-transparent text-[15px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
          />
        </Field>

        <Field label="Description" required>
          <textarea
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            required
            rows={7}
            placeholder="Problem, role, stack reasoning, scale, outcome. Double newline = new paragraph in case study."
            className="w-full resize-y bg-transparent text-[14px] leading-[1.6] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Demo URL">
            <input
              value={form.demoUrl}
              onChange={(e) => onChange("demoUrl", e.target.value)}
              placeholder="https://…"
              className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
            />
          </Field>
          <Field label="GitHub URL">
            <input
              value={form.githubUrl}
              onChange={(e) => onChange("githubUrl", e.target.value)}
              placeholder="https://github.com/…"
              className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
            />
          </Field>
        </div>

        <div>
          <div className="mb-1.5 label">Stack</div>
          <div className="rounded-sm border border-[var(--border)] bg-[var(--bg)] p-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {form.stack.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-sm bg-[var(--bg-2)] px-2 py-1 text-[12px] text-[var(--text)]">
                  {s}
                  <button
                    type="button"
                    onClick={() => removeStack(s)}
                    className="text-[var(--text-3)] hover:text-[var(--accent)]"
                    aria-label={`Remove ${s}`}
                  >×</button>
                </span>
              ))}
              <input
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addStack();
                  }
                }}
                placeholder="add tag + Enter"
                className="flex-1 min-w-[120px] bg-transparent text-[13px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none px-1 py-0.5"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-1.5 label flex justify-between">
            <span>Images</span>
            <span className="text-[var(--text-3)] normal-case tracking-normal">First is cover. Arrows reorder.</span>
          </div>
          <div className="rounded-sm border border-[var(--border)] bg-[var(--bg)] p-3 space-y-2">
            {form.images.length === 0 && (
              <p className="py-4 text-center text-[12.5px] text-[var(--text-3)]">No images yet.</p>
            )}
            {form.images.map((img, idx) => (
              <div key={`${img}-${idx}`} className="grid grid-cols-12 items-center gap-2 rounded-sm border border-[var(--border)] bg-[var(--bg)] p-2">
                <div className="col-span-1 flex flex-col items-center gap-0.5 text-[var(--text-3)]">
                  <button
                    type="button" onClick={() => moveImage(idx, idx - 1)}
                    aria-label="Move up"
                    className="text-[10px] hover:text-[var(--text)]"
                  >▲</button>
                  <button
                    type="button" onClick={() => moveImage(idx, idx + 1)}
                    aria-label="Move down"
                    className="text-[10px] hover:text-[var(--text)]"
                  >▼</button>
                </div>
                <div className="col-span-2 relative aspect-square overflow-hidden rounded-sm bg-[var(--bg-3)] border border-[var(--border)]">
                  <Image src={resolveImage(img)} alt={`image ${idx + 1}`} fill sizes="56px" className="object-cover" />
                </div>
                <div className="col-span-8 truncate text-[12px] text-[var(--text-2)]">
                  {img}
                  {idx === 0 && <span className="ml-2 rounded-sm bg-[var(--text)] px-1.5 py-0.5 label text-[var(--bg)]">cover</span>}
                </div>
                <button
                  type="button" onClick={() => removeImage(idx)}
                  aria-label="Remove"
                  className="col-span-1 text-[12px] text-[var(--text-3)] hover:text-[var(--accent)]"
                >×</button>
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-[var(--border)] pt-3">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-[var(--border)] px-3 py-2 text-[12.5px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors">
                <input
                  ref={fileRef} type="file" multiple accept="image/*"
                  onChange={onUpload} className="hidden"
                />
                {uploading ? "Uploading…" : "Upload from device"}
              </label>
              <div className="flex items-center gap-1 rounded-sm border border-[var(--border)] px-2 py-1">
                <input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addUrlImage();
                    }
                  }}
                  placeholder="or paste image URL"
                  className="flex-1 bg-transparent text-[12.5px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none py-1"
                />
                <button
                  type="button" onClick={addUrlImage}
                  aria-label="Add URL"
                  className="text-[var(--text-3)] hover:text-[var(--text)] px-1.5"
                >+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="col-span-12 lg:col-span-4 space-y-4">
        <Field label="Type" required>
          <select
            value={form.type}
            onChange={(e) => onChange("type", e.target.value as ProjectInput["type"])}
            className="w-full bg-transparent text-[14px] text-[var(--text)] focus:outline-none"
          >
            <option value="Office">Office</option>
            <option value="Personal">Personal</option>
            <option value="Campus">Campus</option>
          </select>
        </Field>

        <Field label="Sort order">
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => onChange("sortOrder", Number(e.target.value) || 0)}
            className="w-full bg-transparent text-[14px] text-[var(--text)] focus:outline-none"
          />
        </Field>
        <p className="text-[11.5px] text-[var(--text-3)]">Higher number appears earlier. 0 by default.</p>

        {error && (
          <div className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent)]/8 px-3 py-2 text-[12.5px] text-[var(--accent)]">
            {error}
          </div>
        )}

        <div className="sticky bottom-4 flex gap-2 rounded-sm border border-[var(--border)] bg-[var(--bg)] p-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-sm bg-[var(--text)] px-3 py-2 text-[12.5px] font-medium text-[var(--bg)] transition-colors hover:bg-[var(--accent)] disabled:opacity-50"
          >
            {submitting ? "Saving…" : initial ? "Save changes" : "Create project"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-sm border border-[var(--border)] px-3 py-2 text-[12.5px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </aside>
    </form>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <div className="mb-1.5 label flex items-center gap-1">
        <span>{label}</span>
        {required && <span className="text-[var(--accent)]">*</span>}
      </div>
      <div className="rounded-sm border border-[var(--border)] bg-[var(--bg)] px-3 py-2 focus-within:border-[var(--text)] transition-colors">
        {children}
      </div>
    </label>
  );
}
