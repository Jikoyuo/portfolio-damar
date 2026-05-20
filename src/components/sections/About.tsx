"use client";

import { PROFILE } from "@/data/profile";
import SectionMark from "../SectionMark";
import Reveal from "../Reveal";
import Marquee from "../Marquee";
import { HandCircle } from "../Scribbles";

export default function About() {
  const allSkills = [
    ...PROFILE.skills.frontend.items,
    ...PROFILE.skills.backend.items,
    ...PROFILE.skills.database.items,
  ];

  const stats = [
    { value: "1.5", suffix: "yrs", label: "shipping" },
    { value: "09",  suffix: "—",   label: "projects" },
    { value: "02",  suffix: "—",   label: "competitions" },
    { value: "04",  suffix: "+",   label: "volunteer roles" },
  ];

  return (
    <section id="about" className="relative scroll-mt-32 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionMark
          number="01"
          kicker="A short introduction"
          title="The maker behind"
          tagline="this notebook."
        />

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {/* Lead paragraph with drop cap */}
          <Reveal className="col-span-12 md:col-span-7" as="div">
            <p className="dropcap font-[family-name:var(--font-display)] text-[22px] md:text-[26px] leading-[1.45] text-[var(--ink)]">
              {PROFILE.about.intro}
            </p>
            <p className="mt-8 text-[15px] leading-[1.7] text-[var(--ink-2)] md:max-w-[60ch]">
              {PROFILE.about.philosophy}
            </p>

            <div className="mt-10 flex items-center gap-4 text-[var(--muted)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                Currently
              </span>
              <span className="h-px w-10 bg-[var(--bone-3)]" />
              <span className="text-sm">
                Frontend at{" "}
                <span className="font-medium text-[var(--ink)]">PT. Digital Nusantara Adisolusi</span>
              </span>
            </div>
          </Reveal>

          {/* Numbers card — staggered, asymmetric */}
          <Reveal className="col-span-12 md:col-span-5" as="div">
            <div className="relative">
              <HandCircle
                className="pointer-events-none absolute -top-6 -left-4 h-16 w-32"
                color="var(--clay)"
              />
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--bone-3)] bg-[var(--bone-3)]">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`bg-[var(--paper)] p-6 md:p-7 ${
                      i % 2 === 0 ? "md:translate-y-2" : "md:-translate-y-2"
                    } transition-transform`}
                  >
                    <div className="flex items-baseline gap-1">
                      <span className="font-[family-name:var(--font-display)] text-6xl md:text-7xl leading-none text-[var(--ink)]">
                        {s.value}
                      </span>
                      <span className="font-mono text-xs uppercase text-[var(--clay)]">
                        {s.suffix}
                      </span>
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Skills marquee — sits between sections */}
      <div className="mt-24 border-y border-[var(--bone-3)] bg-[var(--paper)] py-6">
        <Marquee
          items={allSkills.map((s) => (
            <span
              key={s}
              className="font-[family-name:var(--font-display)] italic text-3xl md:text-5xl text-[var(--ink)]"
            >
              {s}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
