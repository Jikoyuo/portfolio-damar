"use client";

import { PROFILE } from "@/data/profile";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import SplitText from "@/components/motion/SplitText";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-44 scroll-mt-24">
      <div className="mx-auto max-w-[1300px] px-5 md:px-10">
        <Reveal className="flex items-baseline gap-6 mb-16 md:mb-24">
          <span className="label">§ 04 — Get in touch</span>
          <span className="h-px flex-1 bg-[var(--bone-3)]" />
        </Reveal>

        <div className="grid grid-cols-12 gap-8 md:gap-14">
          <div className="col-span-12 md:col-span-8">
            <h2 className="display text-[clamp(2.6rem,7vw,6rem)] text-[var(--ink)] leading-[0.98]">
              <SplitText text="Let's build" stagger={0.05} duration={1} />
              <br />
              <span className="italic-serif text-[var(--clay)]">
                <SplitText text="something" delay={0.2} stagger={0.05} duration={1} />
              </span>
              <span> </span>
              <SplitText text="together." delay={0.4} stagger={0.05} duration={1} />
            </h2>

            <Reveal delay={300}>
              <p className="mt-8 text-[17px] leading-[1.6] text-[var(--ink-2)] max-w-xl">
                Open to interesting work, paid consultancy, or just a
                conversation about frontend craft and Go backends. I read
                everything and reply within a day or two.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Magnetic strength={28}>
                  <a
                    href={PROFILE.socials.email}
                    data-cursor="Write"
                    className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-5 text-[15px] font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)]"
                  >
                    Write me a note
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <aside className="col-span-12 md:col-span-4 md:border-l md:border-[var(--bone-3)] md:pl-10">
            <Reveal>
              <dl className="space-y-7">
                <div>
                  <dt className="label">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={PROFILE.socials.email}
                      data-cursor="Mail"
                      className="display text-[1.5rem] text-[var(--ink)] hover:text-[var(--clay)] transition-colors lnk"
                    >
                      chornaeld@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label">Elsewhere</dt>
                  <dd className="mt-2 flex items-center gap-2">
                    {[
                      { href: PROFILE.socials.linkedin, label: "LinkedIn", icon: Linkedin },
                      { href: PROFILE.socials.github,   label: "GitHub",   icon: Github },
                      { href: PROFILE.socials.email,    label: "Email",    icon: Mail },
                    ].map((s) => (
                      <Magnetic key={s.label} strength={14}>
                        <a
                          href={s.href}
                          target={s.label === "Email" ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          data-cursor={s.label}
                          aria-label={s.label}
                          className="grid h-12 w-12 place-items-center rounded-full border border-[var(--bone-3)] bg-[var(--paper)] text-[var(--ink)] transition-all hover:border-[var(--clay)] hover:text-[var(--clay)] hover:-translate-y-0.5"
                        >
                          <s.icon size={16} />
                        </a>
                      </Magnetic>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="label">Time zone</dt>
                  <dd className="mt-1.5 text-[14px] text-[var(--ink-2)]">
                    Asia/Jakarta · GMT+7
                  </dd>
                </div>
              </dl>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
