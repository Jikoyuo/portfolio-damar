"use client";
import { PROFILE } from "@/data/profile";
import Reveal from "../Reveal";

const LANGS = [
  { name: "Indonesian", level: "Native",         dots: 5 },
  { name: "English",    level: "Professional",   dots: 4 },
  { name: "Javanese",   level: "Conversational", dots: 3 },
];

export default function Craft() {
  const buckets = [
    { label: "Frontend",          tier: PROFILE.skills.frontend.level,  items: PROFILE.skills.frontend.items },
    { label: "Backend",           tier: PROFILE.skills.backend.level,   items: PROFILE.skills.backend.items },
    { label: "Database & Ops",    tier: PROFILE.skills.database.level,  items: PROFILE.skills.database.items },
  ];

  return (
    <section id="craft" className="py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center gap-4 mb-16">
          <span className="label text-[var(--volt)]">§ 03</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="label">Craft</span>
        </div>

        {/* Tools table */}
        <div className="border border-[var(--border)]">
          {buckets.map((b, i) => (
            <Reveal key={b.label} delay={i * 80}>
              <div className={`grid grid-cols-12 gap-0 ${i > 0 ? "border-t border-[var(--border)]" : ""}`}>
                {/* Left header */}
                <div className="col-span-12 md:col-span-3 flex flex-col justify-between gap-3 border-b md:border-b-0 md:border-r border-[var(--border)] p-5">
                  <span className="font-[family-name:var(--font-display)] font-bold text-2xl text-[var(--text)]">{b.label}</span>
                  <span className="label text-[var(--volt)]">{b.tier}</span>
                </div>
                {/* Right: pills */}
                <div className="col-span-12 md:col-span-9 flex flex-wrap gap-2 p-5">
                  {b.items.map(s => (
                    <span
                      key={s}
                      className="border border-[var(--border-2)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--text-2)] transition-all hover:border-[var(--volt)] hover:text-[var(--volt)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Languages */}
        <Reveal className="mt-8">
          <div className="border border-[var(--border)] p-5 flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
            <span className="label whitespace-nowrap">Languages spoken</span>
            <div className="flex flex-wrap gap-8">
              {LANGS.map(l => (
                <div key={l.name} className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`h-1.5 w-4 ${i < l.dots ? "bg-[var(--volt)]" : "bg-[var(--border-2)]"}`} />
                    ))}
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text)]">{l.name}</div>
                    <div className="label">{l.level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
