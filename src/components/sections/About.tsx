"use client";

import { PROFILE } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="pt-8 pb-16 scroll-mt-20">
      <h2 className="mb-6 text-[15px] font-medium text-[var(--text)]">About</h2>

      <div className="space-y-4 text-[14.5px] leading-[1.7] text-[var(--text-2)] measure">
        <p>{PROFILE.about.intro}</p>
        <p>{PROFILE.about.philosophy}</p>
      </div>

      {/* Toolbox — tabular, restrained */}
      <div className="mt-10">
        <div className="mb-3 label">Toolbox</div>
        <dl className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
          {[
            { k: "Frontend", v: PROFILE.skills.frontend.items.join(", ") },
            { k: "Backend",  v: PROFILE.skills.backend.items.join(", ")  },
            { k: "Database & Ops", v: PROFILE.skills.database.items.join(", ") },
          ].map((row) => (
            <div key={row.k} className="grid grid-cols-12 gap-3 py-3">
              <dt className="col-span-12 sm:col-span-3 label">{row.k}</dt>
              <dd className="col-span-12 sm:col-span-9 text-[13.5px] text-[var(--text)] leading-[1.6]">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
