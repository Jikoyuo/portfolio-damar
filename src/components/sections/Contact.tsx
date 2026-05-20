"use client";

import { PROFILE } from "@/data/profile";
import SectionMark from "../SectionMark";
import Magnetic from "../Magnetic";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { HandArrow } from "../Scribbles";

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-32 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionMark
          number="05"
          kicker="The last page"
          title="Get in"
          tagline="touch."
        />

        <div className="grid grid-cols-12 gap-8 md:gap-14">
          <div className="col-span-12 md:col-span-7">
            <p className="font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-[1.1] text-[var(--ink)]">
              I&rsquo;m always up for a good conversation about{" "}
              <span className="italic text-[var(--clay)]">interfaces, frontends,</span>{" "}
              and the quiet craft of shipping things that feel handmade.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <HandArrow className="h-12 w-14 -rotate-[18deg] text-[var(--clay)]" />
              <Magnetic strength={22}>
                <a
                  href={PROFILE.socials.email}
                  data-cursor="Write"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-7 py-4 text-base font-medium text-[var(--paper)] transition-all hover:bg-[var(--clay)]"
                >
                  Write me a note
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
            </div>
          </div>

          <aside className="col-span-12 md:col-span-5 md:border-l md:border-[var(--bone-3)] md:pl-10">
            <dl className="space-y-7">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Email
                </dt>
                <dd>
                  <a
                    className="scribble-link font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] hover:text-[var(--clay)] transition-colors"
                    href={PROFILE.socials.email}
                    data-cursor="Mail"
                  >
                    chornaeld@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Elsewhere
                </dt>
                <dd className="mt-2 flex items-center gap-3">
                  {[
                    { href: PROFILE.socials.linkedin, label: "LinkedIn", icon: Linkedin },
                    { href: PROFILE.socials.github,   label: "GitHub",   icon: Github },
                    { href: PROFILE.socials.email,    label: "Email",    icon: Mail },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.label === "Email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      data-cursor={s.label}
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-[var(--bone-3)] bg-[var(--paper)] text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--clay)] hover:text-[var(--clay)]"
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Time zone
                </dt>
                <dd className="mt-2 text-base text-[var(--ink-2)]">
                  Asia/Jakarta · GMT+7 — usually replies within a day.
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
