"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ApiProject, API_BASE } from "@/lib/api";
import Reveal from "@/components/Reveal";

type Filter = "All" | "Office" | "Personal" | "Campus";
const FILTERS: Filter[] = ["All", "Office", "Personal", "Campus"];

interface Props { projects: ApiProject[] }

function resolveImage(img: string): string | null {
  if (!img) return null;
  if (/^https?:\/\//.test(img)) return img;
  if (img.startsWith("/api/placeholder")) return null;
  if (img.startsWith("/")) return img;
  return `${API_BASE}/${img}`;
}

export default function Work({ projects }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<ApiProject | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Floating image position (springs lag behind cursor for that crafted feel)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 });

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.type === filter)),
    [filter, projects]
  );

  const onMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section id="work" className="relative py-32 md:py-44 scroll-mt-24">
      <div className="mx-auto max-w-[1300px] px-5 md:px-10">
        {/* Section mark */}
        <Reveal className="flex items-baseline gap-6 mb-16 md:mb-24">
          <span className="label">§ 02 — Selected work</span>
          <span className="h-px flex-1 bg-[var(--bone-3)]" />
          <span className="label tabular-nums">{String(filtered.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </Reveal>

        <Reveal>
          <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)] text-[var(--ink)] mb-12 md:mb-16 leading-[0.98]">
            A small shelf of <span className="italic-serif text-[var(--clay)]">things</span> I&rsquo;ve shipped.
          </h2>
        </Reveal>

        {/* Filter */}
        <Reveal className="mb-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            const count = f === "All" ? projects.length : projects.filter((p) => p.type === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor={f}
                className={`group inline-flex items-baseline gap-2 rounded-full border px-4 py-2 text-[13px] transition-all ${
                  active
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--bone-3)] text-[var(--ink-2)] hover:border-[var(--clay)] hover:text-[var(--clay)]"
                }`}
              >
                {f}
                <span className={`text-[10px] tabular-nums ${active ? "text-[var(--paper)]/60" : "text-[var(--muted)]"}`}>
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* List + cursor preview */}
        <div
          ref={containerRef}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
          className="relative"
        >
          {filtered.length === 0 ? (
            <p className="py-24 text-center italic-serif text-2xl text-[var(--muted)]">
              Nothing in this drawer yet.
            </p>
          ) : (
            <ul className={`relative ${hovered ? "[&_li[data-row]:not(.active)]:opacity-30" : ""}`}>
              {filtered.map((p, i) => {
                const isHover = hovered?.id === p.id;
                return (
                  <li
                    key={p.id}
                    data-row
                    className={`group border-t border-[var(--bone-3)] last:border-b transition-opacity duration-300 ${isHover ? "active" : ""}`}
                    onMouseEnter={() => setHovered(p)}
                  >
                    <Link
                      href={`/work/${p.id}`}
                      data-cursor="View"
                      className="grid w-full grid-cols-12 items-baseline gap-3 py-6 md:py-8 text-left"
                    >
                      <span className="col-span-2 md:col-span-1 label tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="col-span-10 md:col-span-7 display text-[2rem] md:text-[2.6rem] leading-[1.02] text-[var(--ink)] transition-colors group-hover:text-[var(--clay)]">
                        {p.title}
                      </h3>

                      <span className="hidden md:block md:col-span-3 text-[13px] text-[var(--ink-2)] truncate">
                        {(p.stack || []).slice(0, 3).join(" · ")}
                      </span>

                      <span className="hidden md:flex md:col-span-1 items-center justify-end label">
                        {p.type}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Floating preview — follows cursor with spring */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.id}
                style={{
                  x: sx,
                  y: sy,
                  translateX: "-50%",
                  translateY: "-110%",
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute left-0 top-0 hidden md:block z-20 h-[280px] w-[360px] overflow-hidden rounded-xl border border-[var(--bone-3)] bg-[var(--paper)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
              >
                {(() => {
                  const url = resolveImage(hovered.images?.[0] || "");
                  return url ? (
                    <Image
                      src={url}
                      alt={hovered.title}
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-[var(--bone-2)] italic-serif text-2xl text-[var(--muted)]">
                      no image yet
                    </div>
                  );
                })()}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--ink)]/85 to-transparent px-4 pb-3 pt-12">
                  <div className="label text-[var(--paper)]/80">{hovered.type}</div>
                  <div className="display text-xl text-[var(--paper)]">{hovered.title}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
