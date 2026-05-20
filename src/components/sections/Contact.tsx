"use client";
import { PROFILE } from "@/data/profile";
import { Github, Linkedin } from "lucide-react";
import Reveal from "../Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center gap-4 mb-16">
          <span className="label text-[var(--volt)]">§ 05</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="label">Contact</span>
        </div>

        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] font-black uppercase leading-[0.88] tracking-tight text-[var(--text)] mb-12"
            style={{ fontSize: "clamp(2.8rem, 9vw, 9rem)" }}>
            Let&rsquo;s<br />
            <span className="text-[var(--volt)]">work</span><br />
            together.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-12 gap-8 border-t border-[var(--border)] pt-10">
            <div className="col-span-12 md:col-span-7">
              <p className="font-[family-name:var(--font-mono)] text-[13.5px] leading-[1.9] text-[var(--text-2)] max-w-[55ch] mb-8">
                Tertarik untuk berkolaborasi, punya proyek menarik, atau sekadar ingin ngobrol soal code?
                Saya selalu terbuka untuk diskusi dan peluang baru.
              </p>
              <a
                href={PROFILE.socials.email}
                className="group inline-flex items-center gap-4 bg-[var(--volt)] px-8 py-4 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-[0.16em] text-[var(--bg)] transition-all hover:bg-[var(--text)]"
              >
                chornaeld@gmail.com
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <div className="col-span-12 md:col-span-5 md:border-l border-[var(--border)] md:pl-8">
              <dl className="space-y-6">
                <div>
                  <dt className="label mb-1">Based in</dt>
                  <dd className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--text)]">Yogyakarta, Indonesia · UTC+7</dd>
                </div>
                <div>
                  <dt className="label mb-1">Response time</dt>
                  <dd className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--text)]">Usually within 24 hours</dd>
                </div>
                <div>
                  <dt className="label mb-3">Elsewhere</dt>
                  <dd className="flex gap-3">
                    {[
                      { href: PROFILE.socials.github,   Icon: Github,   label: "GitHub"   },
                      { href: PROFILE.socials.linkedin,  Icon: Linkedin, label: "LinkedIn" },
                    ].map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[var(--border-2)] px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--text-2)] hover:border-[var(--volt)] hover:text-[var(--volt)] transition-colors"
                      >
                        <s.Icon size={13} /> {s.label}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
