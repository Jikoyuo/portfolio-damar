"use client";

import { PROFILE } from "@/data/profile";
import SectionMark from "../SectionMark";
import Reveal from "../Reveal";

interface Bucket {
  title: string;
  caption: string;
  items: string[];
}

const LANGUAGES = [
  { name: "Indonesian", level: "Native", dots: 5 },
  { name: "English",    level: "Professional", dots: 4 },
  { name: "Javanese",   level: "Conversational", dots: 3 },
];

export default function Craft() {
  const buckets: Bucket[] = [
    {
      title: "Frontend",
      caption: PROFILE.skills.frontend.level,
      items: PROFILE.skills.frontend.items,
    },
    {
      title: "Backend",
      caption: PROFILE.skills.backend.level,
      items: PROFILE.skills.backend.items,
    },
    {
      title: "Database & ops",
      caption: PROFILE.skills.database.level,
      items: PROFILE.skills.database.items,
    },
  ];

  return (
    <section id="craft" className="relative scroll-mt-32 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionMark
          number="03"
          kicker="Tools of the trade"
          title="What sits in"
          tagline="my toolbox."
        />

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buckets.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="group">
              <article className="relative h-full rounded-3xl border border-[var(--bone-3)] bg-[var(--paper)] p-7 transition-colors hover:border-[var(--clay)]">
                <div className="mb-5 flex items-baseline justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
                    {b.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] group-hover:text-[var(--clay)] transition-colors">
                    {b.caption}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {b.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-[var(--bone-3)] bg-[var(--bone)] px-3 py-1.5 text-[12.5px] text-[var(--ink-2)] transition-all hover:-translate-y-0.5 hover:border-[var(--clay)] hover:bg-[var(--clay)]/10 hover:text-[var(--clay-2)]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden
                  className="absolute right-5 top-5 font-[family-name:var(--font-display)] italic text-[var(--clay)]/40 text-2xl"
                >
                  {`(0${i + 1})`}
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Languages strip */}
        <Reveal className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-3xl border border-dashed border-[var(--bone-3)] p-6">
            <div className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
              I write &amp; speak in&hellip;
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-10">
              {LANGUAGES.map((l) => (
                <li key={l.name} className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i < l.dots ? "bg-[var(--clay)]" : "bg-[var(--bone-3)]"
                        }`}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--ink)]">{l.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      {l.level}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
