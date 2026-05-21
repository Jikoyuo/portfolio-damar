"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ApiProject } from "@/lib/api";

type Filter = "All" | "Office" | "Personal" | "Campus";

interface Props {
  projects: ApiProject[];
}

export default function WorkList({ projects }: Props) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.type === filter)),
    [filter, projects]
  );

  const filters: Filter[] = ["All", "Office", "Personal", "Campus"];

  return (
    <section id="work" className="pt-8 pb-16 scroll-mt-20">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-[15px] font-medium text-[var(--text)]">Selected work</h2>
        <span className="label">{String(filtered.length).padStart(2, "0")} of {String(projects.length).padStart(2, "0")}</span>
      </div>

      {/* Filter chips */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 text-[12px] transition-colors rounded-sm ${
                active
                  ? "bg-[var(--text)] text-[var(--bg)]"
                  : "text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--bg-2)]"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)] mt-2">
        {filtered.length === 0 && (
          <li className="py-8 text-center text-[13px] text-[var(--text-3)]">
            Nothing in this category yet.
          </li>
        )}
        {filtered.map((p) => {
          const year = new Date(p.createdAt).getFullYear();
          return (
            <li key={p.id}>
              <Link
                href={`/work/${p.id}`}
                className="group grid grid-cols-12 items-baseline gap-3 py-3.5 px-2 -mx-2 rounded-sm transition-colors hover:bg-[var(--bg-2)]"
              >
                <span className="col-span-7 sm:col-span-6 text-[14px] text-[var(--text)] font-normal truncate">
                  {p.title}
                </span>
                <span className="col-span-3 sm:col-span-3 hidden sm:block text-[12.5px] text-[var(--text-2)] truncate">
                  {(p.stack || []).slice(0, 2).join(", ")}
                </span>
                <span className="col-span-3 sm:col-span-2 label">
                  {p.type}
                </span>
                <span className="col-span-2 sm:col-span-1 label text-right tabular-nums">
                  {Number.isFinite(year) ? year : "—"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
