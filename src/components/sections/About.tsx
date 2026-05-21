"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROFILE } from "@/data/profile";
import Reveal from "@/components/Reveal";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const stats = [
    { value: "1.5",  suffix: "yrs", label: "shipping" },
    { value: "09",   suffix: "—",   label: "projects" },
    { value: "02",   suffix: "—",   label: "competitions" },
    { value: "04",   suffix: "+",   label: "volunteer roles" },
  ];

  return (
    <section ref={ref} id="about" className="relative py-32 md:py-44 scroll-mt-24">
      <div className="mx-auto max-w-[1300px] px-5 md:px-10">
        {/* Section mark */}
        <Reveal className="flex items-baseline gap-6 mb-16 md:mb-24">
          <span className="label">§ 01 — About</span>
          <span className="h-px flex-1 bg-[var(--bone-3)]" />
        </Reveal>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-20">
          {/* Headline */}
          <Reveal className="col-span-12 md:col-span-8">
            <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)] text-[var(--ink)] leading-[0.98]">
              I build the parts of products
              <span className="italic-serif text-[var(--clay)]"> people use,</span>{" "}
              and the patient systems behind them.
            </h2>
          </Reveal>

          {/* Bio + philosophy */}
          <Reveal className="col-span-12 md:col-span-7 md:col-start-1" delay={120}>
            <div className="space-y-5 text-[16px] leading-[1.7] text-[var(--ink-2)] max-w-prose">
              <p className="text-[18px] leading-[1.6] text-[var(--ink)]">
                {PROFILE.about.intro}
              </p>
              <p>{PROFILE.about.philosophy}</p>
            </div>
          </Reveal>

          {/* Stats — parallax-tilted */}
          <motion.aside
            style={{ y }}
            className="col-span-12 md:col-span-4 md:col-start-9 md:row-start-2 md:-mt-4"
          >
            <Reveal delay={240}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--bone-3)] bg-[var(--bone-3)]">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`bg-[var(--paper)] p-5 md:p-6 ${
                      i % 2 === 0 ? "md:translate-y-2" : "md:-translate-y-2"
                    }`}
                  >
                    <div className="flex items-baseline gap-1">
                      <span className="display text-[3.2rem] leading-none text-[var(--ink)]">
                        {s.value}
                      </span>
                      <span className="label text-[var(--clay)] normal-case">{s.suffix}</span>
                    </div>
                    <div className="mt-2 label">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-6 flex items-center gap-3 text-[13px] text-[var(--muted)]">
                <span className="h-px w-8 bg-[var(--bone-3)]" />
                <span>Currently @ </span>
                <span className="font-medium text-[var(--ink)]">PT. Digital Nusantara Adisolusi</span>
              </div>
            </Reveal>
          </motion.aside>
        </div>

        {/* Toolbox */}
        <div className="mt-24 md:mt-32 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-3">
            <div className="label mb-3">Toolbox</div>
            <h3 className="display text-[2rem] md:text-[2.4rem] text-[var(--ink)] leading-[1]">
              What I reach for
            </h3>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9" delay={120}>
            <ul className="divide-y divide-[var(--bone-3)] border-y border-[var(--bone-3)]">
              {[
                { k: "Frontend",  v: PROFILE.skills.frontend.items },
                { k: "Backend",   v: PROFILE.skills.backend.items },
                { k: "Database & Ops", v: PROFILE.skills.database.items },
              ].map((row) => (
                <li key={row.k} className="grid grid-cols-12 gap-4 py-5">
                  <div className="col-span-12 md:col-span-3 label">{row.k}</div>
                  <div className="col-span-12 md:col-span-9 flex flex-wrap gap-1.5">
                    {row.v.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-3 py-1.5 text-[13px] text-[var(--ink-2)] transition-all hover:-translate-y-0.5 hover:border-[var(--clay)] hover:text-[var(--clay)] hover:bg-[var(--clay)]/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
