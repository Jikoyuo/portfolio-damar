"use client";

import { useState } from "react";
import { PROFILE } from "@/data/profile";

type Tab = "experience" | "education" | "organization" | "competition" | "volunteer";

const TABS: { id: Tab; label: string }[] = [
  { id: "experience",   label: "Work"          },
  { id: "education",    label: "Education"     },
  { id: "organization", label: "Organizations" },
  { id: "competition",  label: "Competitions"  },
  { id: "volunteer",    label: "Volunteer"     },
];

export default function Path() {
  const [tab, setTab] = useState<Tab>("experience");

  const data: Record<Tab, { title: string; sub: string; period: string }[]> = {
    experience:   PROFILE.experience.map((e)   => ({ title: e.company, sub: e.role,      period: e.period })),
    education:    PROFILE.education.map((e)    => ({ title: e.school,  sub: e.degree,    period: e.year   })),
    organization: PROFILE.organizations.map((e)=> ({ title: e.org,     sub: e.role,      period: e.period })),
    competition:  PROFILE.competitions.map((e) => ({ title: e.name,    sub: e.organizer, period: e.year   })),
    volunteer:    PROFILE.volunteering.map((e) => ({ title: e.event,   sub: e.role,      period: e.year   })),
  };

  const items = data[tab];

  return (
    <section className="pt-8 pb-16">
      <h2 className="mb-6 text-[15px] font-medium text-[var(--text)]">Path so far</h2>

      <div className="mb-2 flex flex-wrap gap-1.5">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-2.5 py-1 text-[12px] transition-colors rounded-sm ${
                active
                  ? "bg-[var(--text)] text-[var(--bg)]"
                  : "text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--bg-2)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <ul className="border-t border-[var(--border)] divide-y divide-[var(--border)] mt-2">
        {items.length === 0 && (
          <li className="py-6 text-center text-[13px] text-[var(--text-3)]">Nothing here yet.</li>
        )}
        {items.map((it, i) => (
          <li
            key={`${tab}-${i}`}
            className="grid grid-cols-12 items-baseline gap-3 py-3 px-2 -mx-2"
          >
            <div className="col-span-12 sm:col-span-8">
              <div className="text-[14px] text-[var(--text)]">{it.title}</div>
              <div className="text-[12.5px] text-[var(--text-2)]">{it.sub}</div>
            </div>
            <div className="col-span-12 sm:col-span-4 sm:text-right label tabular-nums">
              {it.period}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
