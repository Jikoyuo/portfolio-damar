"use client";

import { PROFILE } from "@/data/profile";

export default function Intro() {
  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="space-y-6">
        <div>
          <div className="label mb-3">Web developer · Go enthusiast</div>
          <h1 className="text-[clamp(1.875rem,4.6vw,2.4rem)] leading-[1.18] tracking-[-0.018em] font-medium text-[var(--text)] max-w-[28ch]">
            I&rsquo;m Damar — I build the parts of products people use, and
            <span className="text-[var(--text-2)]"> the patient systems behind them.</span>
          </h1>
        </div>

        <p className="measure text-[14.5px] leading-[1.7] text-[var(--text-2)]">
          Frontend engineer at{" "}
          <a
            href="https://digitalnusantara.id"
            target="_blank"
            rel="noopener noreferrer"
            className="lnk ext"
          >
            PT. Digital Nusantara Adisolusi
          </a>
          , working on scalable React + Next.js applications. Outside work I&rsquo;m
          a final-year informatics student exploring Go and the kind of backend
          plumbing that doesn&rsquo;t scream for attention. Based in Yogyakarta.
        </p>

        <p className="measure text-[14.5px] leading-[1.7] text-[var(--text-2)]">
          You can read about{" "}
          <a href="#work" className="lnk">selected work</a>,{" "}
          <a href="/notes" className="lnk">notes I&rsquo;ve written</a>,
          or just{" "}
          <a href={PROFILE.socials.email} className="lnk">say hello</a>.
        </p>
      </div>
    </section>
  );
}
