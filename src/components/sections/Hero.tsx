"use client";

import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import { HandArrow, BlobShape, StarBurst } from "../Scribbles";

export default function Hero() {
  return (
    <section
      id="index"
      className="relative scroll-mt-32 overflow-hidden pb-24 pt-10 md:pt-20"
    >
      {/* Ambient sculptural blobs */}
      <BlobShape
        className="pointer-events-none absolute -left-32 top-32 h-[520px] w-[520px] float-slow"
        color="var(--clay)"
        opacity={0.10}
      />
      <BlobShape
        className="pointer-events-none absolute -right-40 -bottom-20 h-[640px] w-[640px] float-slow"
        color="var(--moss)"
        opacity={0.07}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Issue / dateline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
        >
          <span>Edition&nbsp;Nº.01 — Selected Works &amp; Field Notes</span>
          <span className="hidden md:inline">A handmade portfolio · est. 2024</span>
        </motion.div>

        {/* Big editorial headline grid */}
        <div className="grid grid-cols-12 gap-x-4 gap-y-6 md:gap-y-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="col-span-12 font-[family-name:var(--font-display)] leading-[0.86] tracking-[-0.02em] text-[var(--ink)]"
          >
            <span className="block text-[clamp(3rem,11vw,11rem)]">Soft-spoken</span>
            <span className="block text-[clamp(3rem,11vw,11rem)] italic text-[var(--clay)]">
              code,
              <StarBurst className="ml-3 inline-block h-10 w-10 -translate-y-6 md:h-14 md:w-14" />
            </span>
            <span className="block text-[clamp(3rem,11vw,11rem)] -mt-1">
              <span className="relative inline-block">
                deliberate
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-3 w-full text-[var(--clay)]"
                  viewBox="0 0 600 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 8 C 80 1, 200 12, 320 6 S 540 12, 596 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              <span className="font-[family-name:var(--font-display)] italic">motion.</span>
            </span>
          </motion.h1>

          {/* Sidebar lockup: meta + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="col-span-12 md:col-span-5 md:col-start-1"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1.5 inline-block h-3 w-3 rounded-full bg-[var(--clay)]" />
              <p className="max-w-md text-[15px] leading-relaxed text-[var(--ink-2)]">
                I&rsquo;m <span className="marker font-medium">Chornael Damar Kesuma</span>{" "}
                — a Yogyakarta-based web developer who spends his hours building
                scalable frontends in JavaScript and patient backends in Go.
                I&rsquo;m drawn to interfaces that feel hand-built, not assembled
                from kits.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col gap-6"
          >
            <dl className="grid grid-cols-3 gap-4 border-l border-[var(--bone-3)] pl-5">
              {[
                { k: "Role",      v: "Frontend Engineer" },
                { k: "Focus",     v: "React · Next · Go" },
                { k: "Since",     v: "2024" },
              ].map((m) => (
                <div key={m.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    {m.k}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--ink)]">{m.v}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={18}>
                <a
                  href="#work"
                  data-cursor="Browse"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)]"
                >
                  See selected works
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
              <Magnetic strength={12}>
                <a
                  href="/cv.pdf"
                  download
                  data-cursor="PDF"
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
                >
                  Download CV
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="col-span-12 mt-6 flex items-center gap-4"
          >
            <HandArrow className="h-10 w-12 -rotate-12 text-[var(--clay)]" />
            <span className="font-[family-name:var(--font-display)] italic text-lg text-[var(--ink-2)]">
              keep reading, the good stuff is below
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
