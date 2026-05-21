"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "@/data/profile";
import Reveal from "@/components/Reveal";

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

  const data: Record<Tab, { title: string; sub: string; period: string; description: string }[]> = {
    experience: PROFILE.experience.map((e) => ({
      title: e.company, sub: e.role, period: e.period, description: e.description,
    })),
    education: PROFILE.education.map((e) => ({
      title: e.school, sub: e.degree, period: e.year, description: e.description,
    })),
    organization: PROFILE.organizations.map((e) => ({
      title: e.org, sub: e.role, period: e.period, description: e.description,
    })),
    competition: PROFILE.competitions.map((e) => ({
      title: e.name, sub: e.organizer, period: e.year, description: e.description,
    })),
    volunteer: PROFILE.volunteering.map((e) => ({
      title: e.event, sub: e.role, period: e.year, description: e.description,
    })),
  };

  const items = data[tab];

  return (
    <section id="path" className="relative py-32 md:py-44 scroll-mt-24">
      <div className="mx-auto max-w-[1300px] px-5 md:px-10">
        <Reveal className="flex items-baseline gap-6 mb-16 md:mb-24">
          <span className="label">§ 03 — Path so far</span>
          <span className="h-px flex-1 bg-[var(--bone-3)]" />
        </Reveal>

        <Reveal>
          <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)] text-[var(--ink)] mb-12 md:mb-16 leading-[0.98]">
            How I&rsquo;ve <span className="italic-serif text-[var(--clay)]">spent</span> my time.
          </h2>
        </Reveal>

        {/* Tabs */}
        <Reveal className="flex flex-wrap gap-2 mb-10 pb-3 border-b border-[var(--bone-3)]">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-cursor={t.label}
                className="relative px-3 py-2"
              >
                <span className={`text-[13px] md:text-[14px] transition-colors ${
                  active ? "text-[var(--ink)] font-medium" : "text-[var(--muted)] hover:text-[var(--ink-2)]"
                }`}>
                  {t.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="path-indicator"
                    className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[var(--clay)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </Reveal>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-10 md:space-y-14"
          >
            {items.length === 0 && (
              <li className="italic-serif text-2xl text-[var(--muted)]">Nothing here yet.</li>
            )}
            {items.map((it, i) => (
              <motion.li
                key={`${tab}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                className="grid grid-cols-12 gap-4 md:gap-6 group"
              >
                <div className="col-span-12 md:col-span-3">
                  <span className="label tabular-nums">{it.period}</span>
                </div>
                <div className="col-span-12 md:col-span-9 max-w-2xl">
                  <h3 className="display text-[1.8rem] md:text-[2.2rem] leading-[1.05] text-[var(--ink)] transition-colors group-hover:text-[var(--clay)]">
                    {it.title}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium text-[var(--clay)]">{it.sub}</p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[var(--ink-2)]">
                    {it.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
