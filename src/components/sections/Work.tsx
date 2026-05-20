"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ApiProject } from "@/lib/api";
import SectionMark from "../SectionMark";
import { HandArrow } from "../Scribbles";
import ProjectSheet from "../ProjectSheet";

type Filter = "All" | "Office" | "Personal" | "Campus";
const FILTERS: Filter[] = ["All", "Office", "Personal", "Campus"];

interface Props {
  projects: ApiProject[];
  apiBase: string;
}

export default function Work({ projects, apiBase }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<ApiProject | null>(null);
  const [selected, setSelected] = useState<ApiProject | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.type === filter)),
    [filter, projects]
  );

  const onMove = (e: React.MouseEvent) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const resolveImage = (img: string) => {
    if (!img) return null;
    if (/^https?:\/\//.test(img)) return img;
    if (img.startsWith("/api/placeholder")) return null;
    if (img.startsWith("/")) return img;
    return `${apiBase}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  return (
    <section id="work" className="relative scroll-mt-32 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionMark
          number="04"
          kicker="A short shelf"
          title="Selected"
          tagline="works."
        />

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Filter
          </span>
          <div className="h-px flex-1 bg-[var(--bone-3)]" />
          <ul className="flex flex-wrap items-center gap-1">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              const count = f === "All" ? projects.length : projects.filter((p) => p.type === f).length;
              return (
                <li key={f}>
                  <button
                    onClick={() => setFilter(f)}
                    data-cursor={f}
                    className={`group inline-flex items-baseline gap-1.5 rounded-full border px-4 py-1.5 text-[12.5px] transition-all ${
                      isActive
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                        : "border-[var(--bone-3)] text-[var(--ink-2)] hover:border-[var(--clay)] hover:text-[var(--clay)]"
                    }`}
                  >
                    {f}
                    <span
                      className={`font-mono text-[10px] ${
                        isActive ? "text-[var(--paper)]/60" : "text-[var(--muted)] group-hover:text-[var(--clay)]"
                      }`}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* List with hover preview */}
        <div
          ref={listRef}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
          className="relative"
        >
          {filtered.length === 0 && (
            <p className="py-20 text-center font-[family-name:var(--font-display)] italic text-3xl text-[var(--muted)]">
              Nothing in this drawer yet.
            </p>
          )}

          <ul className={`relative ${hovered ? "[&_li[data-row]:not(.is-hover)]:opacity-30" : ""}`}>
            {filtered.map((p, i) => {
              const hoverImg = resolveImage(p.images?.[0] || "");
              return (
                <li
                  key={p.id}
                  data-row
                  className={`is-row group border-t border-[var(--bone-3)] last:border-b transition-opacity duration-300 ${
                    hovered?.id === p.id ? "is-hover" : ""
                  }`}
                  onMouseEnter={() => setHovered(p)}
                >
                  <button
                    onClick={() => setSelected(p)}
                    data-cursor="Open"
                    className="grid w-full grid-cols-12 items-baseline gap-4 py-6 md:py-8 text-left"
                  >
                    <span className="col-span-2 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="col-span-10 md:col-span-6 font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-[1] text-[var(--ink)] transition-colors group-hover:text-[var(--clay)]">
                      {p.title}
                      <span className="font-[family-name:var(--font-display)] italic text-[var(--muted)]/70"> </span>
                    </h3>
                    <span className="hidden md:block md:col-span-3 text-sm text-[var(--ink-2)] truncate">
                      {(p.stack || []).slice(0, 3).join(" · ")}
                    </span>
                    <span className="hidden md:flex md:col-span-2 items-center justify-end gap-2 text-[var(--muted)] group-hover:text-[var(--clay)]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                        {p.type}
                      </span>
                      <HandArrow className="h-6 w-7 -rotate-12 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Floating hover preview */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.18 }}
                style={{
                  left: Math.min(mouse.x + 24, (listRef.current?.clientWidth || 0) - 320),
                  top: Math.max(mouse.y - 140, 16),
                }}
                className="pointer-events-none absolute hidden md:block z-20 h-[260px] w-[340px] overflow-hidden rounded-2xl border border-[var(--bone-3)] bg-[var(--paper)] shadow-[0_30px_80px_-30px_rgba(27,24,20,0.5)]"
              >
                {(() => {
                  const url = resolveImage(hovered.images?.[0] || "");
                  if (url) {
                    return (
                      <Image
                        src={url}
                        alt={hovered.title}
                        fill
                        sizes="340px"
                        className="object-cover"
                      />
                    );
                  }
                  return (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[var(--bone-2)] to-[var(--paper)] p-6 text-center font-[family-name:var(--font-display)] italic text-2xl text-[var(--muted)]">
                      no image yet
                    </div>
                  );
                })()}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--ink)]/85 to-transparent px-4 pb-3 pt-10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]/80">
                    {hovered.type}
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-xl text-[var(--paper)]">
                    {hovered.title}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProjectSheet
        project={selected}
        apiBase={apiBase}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
