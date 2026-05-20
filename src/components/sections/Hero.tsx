"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PROFILE } from "@/data/profile";

export default function Hero() {
  const [time, setTime] = useState("");
  const [loaded, setLoaded] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setLoaded(true);
    const fmt = () =>
      new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        timeZone: "Asia/Jakarta", hour12: false,
      }).format(new Date());
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="index" className="relative grid-bg min-h-[100svh] flex flex-col justify-between overflow-hidden">
      {/* Top HUD bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <span className="label">
          Yogyakarta, Indonesia · <span className="text-[var(--text)]">{time}</span> WIB
        </span>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--volt)] blink" />
          <span className="label text-[var(--volt)]">Available for work</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center px-5 py-12">
        {/* Giant name */}
        <div className="relative overflow-hidden mb-4">
          <motion.h1
            ref={nameRef}
            className="font-[family-name:var(--font-display)] font-black leading-[0.88] tracking-tight text-[var(--text)] uppercase"
            style={{ fontSize: "clamp(4rem, 16vw, 17rem)" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={loaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
          >
            Damar
          </motion.h1>
        </div>

        {/* Rule + role row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-px w-24 bg-[var(--volt)]" />
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="label text-[var(--text-2)]">{PROFILE.role} — {PROFILE.subRole}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              onClick={e => go(e, "work")}
              className="group inline-flex items-center gap-3 bg-[var(--volt)] px-6 py-3 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[var(--bg)] transition-all hover:bg-[var(--text)]"
            >
              View work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 border border-[var(--border-2)] px-5 py-3 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[var(--text-2)] transition-all hover:border-[var(--text)] hover:text-[var(--text)]"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.85 }}
          className="mt-10 max-w-xl font-[family-name:var(--font-mono)] text-[13px] leading-[1.8] text-[var(--muted)]"
        >
          {PROFILE.tagline}
        </motion.p>
      </div>

      {/* Bottom HUD bar */}
      <div className="flex items-center justify-between border-t border-[var(--border)] px-5 py-3">
        <div className="flex items-center gap-6">
          {[
            { href: PROFILE.socials.github,   label: "Github" },
            { href: PROFILE.socials.linkedin,  label: "LinkedIn" },
            { href: PROFILE.socials.email,     label: "Email" },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="label hover:text-[var(--volt)] transition-colors"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
        <span className="label">Scroll to explore ↓</span>
      </div>
    </section>
  );
}
