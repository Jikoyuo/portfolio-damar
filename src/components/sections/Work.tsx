"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ApiProject } from "@/lib/api";
import { ExternalLink, Github, X } from "lucide-react";

type Filter = "All" | "Office" | "Personal" | "Campus";
const FILTERS: Filter[] = ["All", "Office", "Personal", "Campus"];

interface Props { projects: ApiProject[]; apiBase: string; }

export default function Work({ projects, apiBase }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<ApiProject | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const filtered = useMemo(
    () => filter === "All" ? projects : projects.filter(p => p.type === filter),
    [filter, projects]
  );

  const resolve = (img: string) => {
    if (!img || img.includes("/api/placeholder")) return null;
    if (/^https?:\/\//.test(img)) return img;
    if (img.startsWith("/")) return img;
    return `${apiBase}/${img}`;
  };

  const select = (p: ApiProject) => {
    setSelected(s => s?.id === p.id ? null : p);
    setImgIdx(0);
  };

  const validImgs = selected ? (selected.images || []).map(resolve).filter((u): u is string => !!u) : [];

  return (
    <section id="work" className="py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="label text-[var(--volt)]">§ 02</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="label">Selected Work</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map(f => {
            const cnt = f === "All" ? projects.length : projects.filter(p => p.type === f).length;
            return (
              <button
                key={f}
                onClick={() => { setFilter(f); setSelected(null); }}
                className={`flex items-center gap-2 px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] border transition-all ${
                  filter === f
                    ? "border-[var(--volt)] bg-[var(--volt-dim)] text-[var(--volt)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-2)] hover:text-[var(--text)]"
                }`}
              >
                {f}
                <span className="opacity-50">{String(cnt).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        {/* Project rows */}
        <div className="border-t border-[var(--border)]">
          {filtered.length === 0 && (
            <p className="py-16 text-center label">No projects in this category yet.</p>
          )}
          {filtered.map((p, i) => {
            const isOpen = selected?.id === p.id;
            return (
              <div key={p.id}>
                <button
                  onClick={() => select(p)}
                  className={`group w-full border-b border-[var(--border)] transition-colors ${
                    isOpen ? "bg-[var(--volt-dim)]" : "hover:bg-[var(--bg-2)]"
                  }`}
                >
                  <div className="grid grid-cols-12 items-center gap-4 px-0 py-5 md:py-6">
                    <span className="col-span-1 label text-right">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={`col-span-7 md:col-span-6 text-left font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl tracking-tight transition-colors ${
                      isOpen ? "text-[var(--volt)]" : "text-[var(--text)] group-hover:text-[var(--volt)]"
                    }`}>
                      {p.title}
                    </h3>
                    <span className="col-span-2 hidden md:block label">{p.type}</span>
                    <span className="col-span-3 md:col-span-2 hidden md:block label truncate">
                      {(p.stack || []).slice(0, 2).join(" · ")}
                    </span>
                    <span className={`col-span-4 md:col-span-1 label text-right transition-transform ${isOpen ? "rotate-45 text-[var(--volt)]" : "group-hover:text-[var(--text)]"}`}>
                      ✕
                    </span>
                  </div>
                </button>

                {/* Inline expand */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-b border-[var(--border)] bg-[var(--bg-2)] px-5 py-8">
                        <div className="grid grid-cols-12 gap-8">
                          {/* Left: image */}
                          <div className="col-span-12 md:col-span-5">
                            {validImgs.length > 0 ? (
                              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-3)]">
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={imgIdx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                  >
                                    <Image src={validImgs[imgIdx]} alt={p.title} fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover" />
                                  </motion.div>
                                </AnimatePresence>
                                {validImgs.length > 1 && (
                                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                                    {validImgs.map((_, ii) => (
                                      <button key={ii} onClick={() => setImgIdx(ii)}
                                        className={`h-1.5 transition-all ${ii === imgIdx ? "w-6 bg-[var(--volt)]" : "w-1.5 bg-[var(--border-2)]"}`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex aspect-[4/3] items-center justify-center bg-[var(--bg-3)] label">
                                No preview
                              </div>
                            )}
                          </div>

                          {/* Right: details */}
                          <div className="col-span-12 md:col-span-7 flex flex-col gap-5">
                            <p className="font-[family-name:var(--font-mono)] text-[13.5px] leading-[1.85] text-[var(--text-2)]">
                              {p.description}
                            </p>

                            {(p.stack || []).length > 0 && (
                              <div>
                                <div className="label mb-3">Stack</div>
                                <div className="flex flex-wrap gap-2">
                                  {p.stack.map(s => (
                                    <span key={s} className="border border-[var(--border-2)] px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-2)]">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-[var(--border)]">
                              {p.demoUrl && (
                                <a href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-[var(--volt)] px-5 py-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--bg)] hover:bg-[var(--text)] transition-colors"
                                >
                                  Live demo <ExternalLink size={12} />
                                </a>
                              )}
                              {p.githubUrl && (
                                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 border border-[var(--border-2)] px-5 py-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--text-2)] hover:border-[var(--text)] hover:text-[var(--text)] transition-colors"
                                >
                                  Source <Github size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
