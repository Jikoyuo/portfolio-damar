"use client";
import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { PROFILE } from "@/data/profile";

type Tab = "experience"|"education"|"organization"|"competition"|"volunteer";
const TABS: { id: Tab; label: string }[] = [
  { id: "experience",   label: "Experience"    },
  { id: "education",    label: "Education"     },
  { id: "organization", label: "Organizations" },
  { id: "competition",  label: "Competitions"  },
  { id: "volunteer",    label: "Volunteering"  },
];

export default function Journey() {
  const [tab, setTab] = useState<Tab>("experience");

  const data: Record<Tab, { title: string; sub: string; period: string; desc: string }[]> = {
    experience:   PROFILE.experience.map(e   => ({ title: e.company,     sub: e.role,       period: e.period, desc: e.description })),
    education:    PROFILE.education.map(e    => ({ title: e.school,      sub: e.degree,     period: e.year,   desc: e.description })),
    organization: PROFILE.organizations.map(e=> ({ title: e.org,         sub: e.role,       period: e.period, desc: e.description })),
    competition:  PROFILE.competitions.map(e => ({ title: e.name,        sub: e.organizer,  period: e.year,   desc: e.description })),
    volunteer:    PROFILE.volunteering.map(e  => ({ title: e.event,       sub: e.role,       period: e.year,   desc: e.description })),
  };

  return (
    <section id="journey" className="py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center gap-4 mb-16">
          <span className="label text-[var(--volt)]">§ 04</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="label">Journey</span>
        </div>

        {/* Tab bar */}
        <LayoutGroup>
          <div className="flex flex-wrap gap-0 border border-[var(--border)] mb-12 w-fit">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative px-4 py-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  tab === t.id ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-[var(--volt)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Entries as table rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="border-t border-[var(--border)]">
              {data[tab].map((item, i) => (
                <div key={i} className="group grid grid-cols-12 gap-4 border-b border-[var(--border)] py-6 md:py-8 hover:bg-[var(--bg-2)] transition-colors px-0">
                  <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
                    <span className="label">{item.period}</span>
                    <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--volt)]">{item.sub}</span>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[var(--text)] mb-3 group-hover:text-[var(--volt)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-[family-name:var(--font-mono)] text-[13px] leading-[1.85] text-[var(--text-2)] max-w-[68ch]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
              {data[tab].length === 0 && (
                <p className="py-12 label text-center">Nothing yet.</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
