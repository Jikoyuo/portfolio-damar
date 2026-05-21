"use client";

import { PROFILE } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="pt-8 pb-16 scroll-mt-20">
      <h2 className="mb-6 text-[15px] font-medium text-[var(--text)]">Get in touch</h2>

      <div className="measure space-y-4 text-[14.5px] leading-[1.7] text-[var(--text-2)]">
        <p>
          I&rsquo;m usually open to interesting work, paid consultancy, or just a
          conversation about frontend craft and Go backends. The quickest way to
          reach me is by email — I read everything, and reply within a day or
          two.
        </p>

        <p>
          You can also find me on{" "}
          <a className="lnk ext" href={PROFILE.socials.github}   target="_blank" rel="noopener noreferrer">GitHub</a>{" "}
          and{" "}
          <a className="lnk ext" href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
      </div>

      <div className="mt-8 border-t border-[var(--border)] pt-6">
        <a
          href={PROFILE.socials.email}
          className="inline-flex items-baseline gap-2 text-[14px] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
        >
          <span className="label">→</span>
          <span className="underline decoration-[var(--border-2)] decoration-1 underline-offset-[3px] hover:decoration-[var(--accent)]">
            chornaeld@gmail.com
          </span>
        </a>
      </div>
    </section>
  );
}
