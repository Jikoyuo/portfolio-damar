"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { PROFILE } from "@/data/profile";
import SectionMark from "../SectionMark";

type TabId = "experience" | "education" | "organization" | "competition" | "volunteer";

const TABS: { id: TabId; label: string; num: string }[] = [
  { id: "experience",   label: "Experience",     num: "i" },
  { id: "education",    label: "Education",      num: "ii" },
  { id: "organization", label: "Organizations",  num: "iii" },
  { id: "competition",  label: "Competitions",   num: "iv" },
  { id: "volunteer",    label: "Volunteering",   num: "v" },
];

interface Item {
  title: string;
  subtitle: string;
  period: string;
  description: string;
}

export default function Journey() {
  const [tab, setTab] = useState<TabId>("experience");

  const data: Record<TabId, Item[]> = {
    experience: PROFILE.experience.map((e) => ({
      title: e.company, subtitle: e.role, period: e.period, description: e.description,
    })),
    education: PROFILE.education.map((e) => ({
      title: e.school, subtitle: e.degree, period: e.year, description: e.description,
    })),
    organization: PROFILE.organizations.map((e) => ({
      title: e.org, subtitle: e.role, period: e.period, description: e.description,
    })),
    competition: PROFILE.competitions.map((e) => ({
      title: e.name, subtitle: e.organizer, period: e.year, description: e.description,
    })),
    volunteer: PROFILE.volunteering.map((e) => ({
      title: e.event, subtitle: e.role, period: e.year, description: e.description,
    })),
  };

  const items = data[tab];

  return (
    <section id="journey" className="relative scroll-mt-32 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionMark
          number="02"
          kicker="A working biography"
          title="The path,"
          tagline="more or less."
        />

        {/* Tabs */}
        <LayoutGroup>
          <div className="flex flex-wrap gap-x-1 gap-y-2 border-b border-[var(--bone-3)] pb-1 mb-12">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-cursor={t.label}
                className="relative px-3 py-2.5 transition-colors"
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {t.num}.
                  </span>
                  <span
                    className={`text-sm md:text-base font-medium transition-colors ${
                      tab === t.id ? "text-[var(--ink)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {t.label}
                  </span>
                </span>
                {tab === t.id && (
                  <motion.span
                    layoutId="journey-tab-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[var(--clay)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Timeline */}
        <div className="relative">
          {/* Hand-drawn vertical line */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-[6px] top-2 h-[calc(100%-1rem)] w-3 text-[var(--bone-3)]"
            viewBox="0 0 12 800"
            preserveAspectRatio="none"
          >
            <path
              d="M6 4 C 9 80, 3 160, 6 240 S 9 400, 6 480 S 3 640, 6 780"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {items.length === 0 && (
                <li className="pl-8 text-[var(--muted)] italic font-[family-name:var(--font-display)]">
                  Nothing here yet.
                </li>
              )}
              {items.map((it, i) => (
                <motion.li
                  key={`${tab}-${i}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5 }}
                  className="relative grid grid-cols-12 gap-4 pl-10"
                >
                  {/* Dot */}
                  <span className="absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[var(--clay)] ring-4 ring-[var(--bone)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--paper)]" />
                  </span>

                  {/* Period (left) */}
                  <div className="col-span-12 md:col-span-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                      {it.period}
                    </span>
                  </div>

                  {/* Content (right) */}
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.05] text-[var(--ink)]">
                      {it.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--clay)] font-medium">
                      {it.subtitle}
                    </p>
                    <p className="mt-3 max-w-[60ch] text-[14.5px] leading-[1.7] text-[var(--ink-2)]">
                      {it.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
