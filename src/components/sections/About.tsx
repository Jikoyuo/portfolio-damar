"use client";
import { PROFILE } from "@/data/profile";
import Reveal from "../Reveal";

const STATS = [
  { v: "1.5+", l: "Years exp" },
  { v: "09",   l: "Projects shipped" },
  { v: "02×",  l: "National competitions" },
  { v: "04",   l: "Leadership roles" },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-16">
          <span className="label text-[var(--volt)]">§ 01</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="label">About</span>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {/* Left: big heading + bio */}
          <Reveal className="col-span-12 md:col-span-7">
            <h2 className="font-[family-name:var(--font-display)] font-black text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight text-[var(--text)] mb-10">
              Building<br />
              <span className="text-[var(--volt)]">things</span><br />
              that last.
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[13.5px] leading-[1.9] text-[var(--text-2)] max-w-[58ch]">
              {PROFILE.about.intro}
            </p>
            <p className="mt-5 font-[family-name:var(--font-mono)] text-[13.5px] leading-[1.9] text-[var(--muted)] max-w-[58ch]">
              {PROFILE.about.philosophy}
            </p>

            {/* Status */}
            <div className="mt-10 inline-flex items-center gap-3 border border-[var(--border-2)] px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-[var(--volt)] blink" />
              <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
                Currently @ <span className="text-[var(--text)]">PT. Digital Nusantara Adisolusi</span>
              </span>
            </div>
          </Reveal>

          {/* Right: stats grid */}
          <Reveal className="col-span-12 md:col-span-5" delay={100}>
            <div className="grid grid-cols-2 gap-px bg-[var(--border)]">
              {STATS.map((s, i) => (
                <div
                  key={s.l}
                  className={`bg-[var(--bg)] p-6 ${i % 2 === 0 ? "md:pt-10" : "md:pb-10"}`}
                >
                  <div className="font-[family-name:var(--font-display)] font-black text-5xl md:text-6xl text-[var(--volt)] leading-none mb-2">
                    {s.v}
                  </div>
                  <div className="label">{s.l}</div>
                </div>
              ))}
            </div>
            {/* Tech marquee */}
            <div className="mt-px bg-[var(--bg-2)] overflow-hidden border-t border-[var(--border)] py-4">
              <div className="flex w-max marquee-run">
                {[...PROFILE.skills.frontend.items, ...PROFILE.skills.backend.items, ...PROFILE.skills.database.items,
                  ...PROFILE.skills.frontend.items, ...PROFILE.skills.backend.items, ...PROFILE.skills.database.items]
                  .map((s, i) => (
                    <span key={i} className="flex items-center shrink-0">
                      <span className="label mx-6 whitespace-nowrap">{s}</span>
                      <span className="text-[var(--volt)] text-xs">◆</span>
                    </span>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
