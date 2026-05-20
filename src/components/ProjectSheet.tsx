"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ApiProject } from "@/lib/api";
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

interface Props {
  project: ApiProject | null;
  apiBase: string;
  onClose: () => void;
}

export default function ProjectSheet({ project, apiBase, onClose }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => Math.min(i + 1, (project.images?.length || 1) - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [project, onClose]);

  const resolveImage = (img: string) => {
    if (!img) return null;
    if (/^https?:\/\//.test(img)) return img;
    if (img.startsWith("/api/placeholder")) return null;
    if (img.startsWith("/")) return img;
    return `${apiBase}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  const validImages = (project?.images || [])
    .map(resolveImage)
    .filter((u): u is string => !!u);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[var(--ink)]/55 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 32 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto bg-[var(--bone)] shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.3)]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--bone-3)] bg-[var(--bone)]/90 px-6 py-4 backdrop-blur">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Work · {project.type}
              </div>
              <button
                onClick={onClose}
                data-cursor="Close"
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--bone-3)] bg-[var(--paper)] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 pb-16 pt-10">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.95] text-[var(--ink)]">
                {project.title}
              </h2>

              {/* Image carousel */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--bone-3)] bg-[var(--paper)]">
                {validImages.length > 0 ? (
                  <div className="relative aspect-[16/10]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={validImages[idx]}
                          alt={`${project.title} — image ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 640px"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {validImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setIdx((i) => Math.max(0, i - 1))}
                          disabled={idx === 0}
                          aria-label="Previous"
                          className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-[var(--bone-3)] bg-[var(--bone)]/90 text-[var(--ink)] transition-opacity hover:bg-[var(--paper)] disabled:opacity-40"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setIdx((i) => Math.min(validImages.length - 1, i + 1))
                          }
                          disabled={idx === validImages.length - 1}
                          aria-label="Next"
                          className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-[var(--bone-3)] bg-[var(--bone)]/90 text-[var(--ink)] transition-opacity hover:bg-[var(--paper)] disabled:opacity-40"
                        >
                          <ChevronRight size={16} />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {validImages.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setIdx(i)}
                              aria-label={`Go to image ${i + 1}`}
                              className={`h-1.5 rounded-full transition-all ${
                                i === idx ? "w-6 bg-[var(--paper)]" : "w-1.5 bg-[var(--paper)]/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="grid aspect-[16/10] place-items-center font-[family-name:var(--font-display)] italic text-2xl text-[var(--muted)]">
                    no images attached
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mt-8 text-[15.5px] leading-[1.75] text-[var(--ink-2)]">
                {project.description}
              </p>

              {/* Stack */}
              {project.stack?.length > 0 && (
                <div className="mt-8">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Built with
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-3 py-1.5 text-[12.5px] text-[var(--ink-2)]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              {(project.demoUrl || project.githubUrl) && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Visit"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)]"
                    >
                      Visit live demo <ExternalLink size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Code"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
                    >
                      Source code <Github size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
