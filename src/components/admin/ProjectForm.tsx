"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api, ApiProject, API_BASE, ProjectInput } from "@/lib/api";
import { useAdminAuth } from "./AdminAuth";
import { Upload, Trash2, GripVertical, Plus, X } from "lucide-react";

interface Props {
  initial?: ApiProject;
}

const EMPTY: ProjectInput = {
  title: "",
  description: "",
  type: "Personal",
  stack: [],
  images: [],
  demoUrl: "",
  githubUrl: "",
  sortOrder: 0,
};

export default function ProjectForm({ initial }: Props) {
  const router = useRouter();
  const { token } = useAdminAuth();
  const [form, setForm] = useState<ProjectInput>(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          type: initial.type,
          stack: initial.stack || [],
          images: initial.images || [],
          demoUrl: initial.demoUrl,
          githubUrl: initial.githubUrl,
          sortOrder: initial.sortOrder,
        }
      : EMPTY
  );
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
    if (form.stack.includes(v)) {
      setStackInput("");
      return;
    }
    onChange("stack", [...form.stack, v]);
    setStackInput("");
  };

  const removeStack = (s: string) =>
    onChange("stack", form.stack.filter((x) => x !== s));

  const addUrlImage = () => {
    const v = urlInput.trim();
    if (!v) return;
    onChange("images", [...form.images, v]);
    setUrlInput("");
  };

  const onUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!token) return;
      const files = e.target.files;
      if (!files || files.length === 0) return;
      setUploading(true);
      setError(null);
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
    },
    [form.images, token]
  );

  const removeImage = (idx: number) =>
    onChange("images", form.images.filter((_, i) => i !== idx));

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
    setError(null);
    setSubmitting(true);
    try {
      const payload: ProjectInput = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        demoUrl: form.demoUrl.trim(),
        githubUrl: form.githubUrl.trim(),
        sortOrder: Number(form.sortOrder) || 0,
      };
      if (initial) {
        await api.updateProject(initial.id, payload, token);
      } else {
        await api.createProject(payload, token);
      }
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
      {/* Left: main fields */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            required
            placeholder="e.g. JiChat — Realtime Social Media"
            className="w-full bg-transparent text-lg text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
          />
        </Field>

        <Field label="Description" required>
          <textarea
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            required
            rows={6}
            placeholder="A few sentences. Focus on what makes this project interesting — problem, role, scale, tech choices."
            className="w-full resize-y bg-transparent text-[15px] leading-relaxed text-[var(--ink-2)] placeholder:text-[var(--muted)] focus:outline-none"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Demo URL">
            <input
              value={form.demoUrl}
              onChange={(e) => onChange("demoUrl", e.target.value)}
              placeholder="https://..."
              className="w-full bg-transparent text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
            />
          </Field>
          <Field label="GitHub URL">
            <input
              value={form.githubUrl}
              onChange={(e) => onChange("githubUrl", e.target.value)}
              placeholder="https://github.com/..."
              className="w-full bg-transparent text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
            />
          </Field>
        </div>

        {/* Stack */}
        <div>
          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Stack
          </div>
          <div className="rounded-2xl border border-[var(--bone-3)] bg-[var(--paper)] p-3">
            <div className="flex flex-wrap gap-2">
              {form.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bone)] px-3 py-1 text-[13px] text-[var(--ink-2)]"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeStack(s)}
                    aria-label={`Remove ${s}`}
                    className="text-[var(--muted)] hover:text-[var(--clay)]"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-1">
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
                  className="bg-transparent text-[13px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none w-32"
                />
                <button
                  type="button"
                  onClick={addStack}
                  className="grid h-7 w-7 place-items-center rounded-full text-[var(--muted)] hover:bg-[var(--clay)] hover:text-[var(--paper)]"
                  aria-label="Add tag"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            <span>Images</span>
            <span className="text-[var(--muted)]/70 normal-case tracking-normal">
              First image is the cover. Drag handle to reorder.
            </span>
          </div>
          <div className="space-y-3 rounded-2xl border border-[var(--bone-3)] bg-[var(--paper)] p-4">
            <ul className="space-y-2">
              {form.images.map((img, idx) => (
                <li
                  key={`${img}-${idx}`}
                  className="grid grid-cols-12 items-center gap-3 rounded-xl border border-[var(--bone-3)] bg-[var(--bone)] p-2"
                >
                  <div className="col-span-1 flex flex-col items-center text-[var(--muted)]">
                    <button
                      type="button"
                      onClick={() => moveImage(idx, idx - 1)}
                      className="text-[10px] leading-none hover:text-[var(--clay)]"
                      aria-label="Move up"
                    >
                      ▲
                    </button>
                    <GripVertical size={12} />
                    <button
                      type="button"
                      onClick={() => moveImage(idx, idx + 1)}
                      className="text-[10px] leading-none hover:text-[var(--clay)]"
                      aria-label="Move down"
                    >
                      ▼
                    </button>
                  </div>
                  <div className="col-span-2 relative aspect-square overflow-hidden rounded-md bg-[var(--bone-2)]">
                    <Image
                      src={resolveImage(img)}
                      alt={`image ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-8 truncate text-[12px] text-[var(--ink-2)]">
                    {img}
                    {idx === 0 && (
                      <span className="ml-2 rounded-full bg-[var(--clay)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--paper)]">
                        cover
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="col-span-1 grid h-8 w-8 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--clay)] hover:text-[var(--paper)]"
                    aria-label="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-[var(--bone-3)] pt-3">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--bone-3)] bg-[var(--bone)] px-4 py-3 text-[13px] text-[var(--ink-2)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]">
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onUpload}
                  className="hidden"
                />
                <Upload size={14} />
                {uploading ? "Uploading…" : "Upload from device"}
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[var(--bone-3)] bg-[var(--bone)] px-3 py-2">
                <input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addUrlImage();
                    }
                  }}
                  placeholder="…or paste image URL"
                  className="flex-1 bg-transparent text-[13px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addUrlImage}
                  className="grid h-7 w-7 place-items-center rounded-full text-[var(--muted)] hover:bg-[var(--clay)] hover:text-[var(--paper)]"
                  aria-label="Add URL"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: side metadata */}
      <aside className="col-span-12 lg:col-span-4 space-y-4">
        <Field label="Type" required>
          <select
            value={form.type}
            onChange={(e) => onChange("type", e.target.value as ProjectInput["type"])}
            className="w-full bg-transparent text-[15px] text-[var(--ink)] focus:outline-none"
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
            onChange={(e) =>
              onChange("sortOrder", Number(e.target.value) || 0)
            }
            className="w-full bg-transparent text-[15px] text-[var(--ink)] focus:outline-none"
          />
          <p className="mt-2 text-[11px] text-[var(--muted)]">
            Higher number appears earlier in the list. 0 by default.
          </p>
        </Field>

        {error && (
          <div className="rounded-2xl border border-[var(--clay)]/40 bg-[var(--clay)]/8 px-4 py-3 text-[13px] text-[var(--clay-2)]">
            {error}
          </div>
        )}

        <div className="sticky bottom-4 flex gap-2 rounded-2xl border border-[var(--bone-3)] bg-[var(--paper)] p-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-full bg-[var(--ink)] px-5 py-3 text-[13px] font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)] disabled:opacity-50"
          >
            {submitting
              ? "Saving…"
              : initial
                ? "Save changes"
                : "Create project"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-[var(--bone-3)] px-4 py-3 text-[13px] text-[var(--ink-2)] hover:border-[var(--clay)] hover:text-[var(--clay)]"
          >
            Cancel
          </button>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
        <span>{label}</span>
        {required && <span className="text-[var(--clay)]">*</span>}
      </div>
      <div className="rounded-2xl border border-[var(--bone-3)] bg-[var(--paper)] px-4 py-3 focus-within:border-[var(--clay)] transition-colors">
        {children}
      </div>
    </label>
  );
}
