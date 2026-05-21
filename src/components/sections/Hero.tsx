"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import { PROFILE } from "@/data/profile";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y    = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const op   = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "6px"]);

  return (
    <section
      ref={ref}
      id="index"
      className="relative min-h-[100svh] overflow-hidden pt-24 pb-20 md:pt-28 md:pb-32"
    >
      {/* Ambient warm gradient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(181,57,30,0.20),transparent)] blur-3xl float-slow" />
        <div className="absolute top-40 -right-40 h-[55rem] w-[55rem] rounded-full bg-[radial-gradient(closest-side,rgba(196,154,74,0.18),transparent)] blur-3xl float-slow" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-0 left-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(47,79,44,0.12),transparent)] blur-3xl float-slow" style={{ animationDelay: "-7s" }} />
      </div>

      <motion.div
        style={{ y, opacity: op, filter: blur.get ? `blur(${blur.get()}px)` : undefined }}
        className="relative mx-auto max-w-[1300px] px-5 md:px-10"
      >
        {/* Dateline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12 md:mb-20"
        >
          <div className="flex items-center gap-3 label">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--moss)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--moss)]" />
            </span>
            <span>Available — Q2 2026</span>
          </div>
          <div className="hidden md:block label">Yogyakarta · GMT+7</div>
        </motion.div>

        {/* Big editorial headline */}
        <div className="space-y-6 md:space-y-10">
          <h1 className="display text-[clamp(3.5rem,11vw,11.5rem)] text-[var(--ink)]">
            <SplitText text="Frontend" delay={0.05} stagger={0.04} duration={1.1} />
            <br />
            <span className="block">
              <SplitText text="engineer," delay={0.18} stagger={0.04} duration={1.1} />
              <span className="italic-serif text-[var(--clay)] inline-block ml-3 md:ml-6">
                <SplitText text="quiet" delay={0.4} stagger={0.04} duration={1.1} />
              </span>
            </span>
            <span className="block">
              <SplitText text="systems." delay={0.55} stagger={0.04} duration={1.1} />
            </span>
          </h1>

          {/* Sidebar lockup */}
          <div className="grid grid-cols-12 gap-6 pt-6 md:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="col-span-12 md:col-span-5"
            >
              <p className="text-[16px] md:text-[17px] leading-[1.55] text-[var(--ink-2)] max-w-md">
                I&rsquo;m <span className="marker font-medium text-[var(--ink)]">{PROFILE.name.split(" ").slice(0, 2).join(" ")}</span> — a
                Yogyakarta-based engineer building scalable React/Next.js
                interfaces and the patient Go backends behind them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="col-span-12 md:col-span-7 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            >
              <dl className="grid grid-cols-3 gap-x-6 max-w-md">
                {[
                  { k: "Role",  v: "Frontend Eng." },
                  { k: "Stack", v: "React · Next · Go" },
                  { k: "Since", v: "2024" },
                ].map((m) => (
                  <div key={m.k}>
                    <dt className="label mb-1.5">{m.k}</dt>
                    <dd className="text-[14px] font-medium text-[var(--ink)]">{m.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={22}>
                  <a
                    href="#work"
                    data-cursor="Browse"
                    className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-7 py-4 text-[14px] font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)]"
                  >
                    See selected works
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >→</motion.span>
                  </a>
                </Magnetic>
                <Magnetic strength={14}>
                  <a
                    href="/cv.pdf"
                    download
                    data-cursor="PDF"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-6 py-4 text-[14px] font-medium text-[var(--ink)] transition-all hover:border-[var(--clay)] hover:text-[var(--clay)]"
                  >
                    Download CV
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
        style={{ opacity: op }}
      >
        <span className="label">scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block h-8 w-px bg-[var(--bone-3)]"
        />
      </motion.div>
    </section>
  );
}
