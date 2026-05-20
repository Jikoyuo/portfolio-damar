"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const LINKS = [
  { href: "#index",   label: "Index",    num: "00" },
  { href: "#about",   label: "About",    num: "01" },
  { href: "#journey", label: "Journey",  num: "02" },
  { href: "#craft",   label: "Craft",    num: "03" },
  { href: "#work",    label: "Work",     num: "04" },
  { href: "#contact", label: "Contact",  num: "05" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("index");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = LINKS.map((l) => l.href.slice(1));
    const observed = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.6, 1] }
    );
    observed.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`sticky top-0 z-30 transition-colors ${
        scrolled ? "bg-[var(--bone)]/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <a
          href="#index"
          onClick={(e) => scrollTo(e, "#index")}
          data-cursor="Top"
          className="group inline-flex items-baseline gap-2"
        >
          <span className="font-[family-name:var(--font-display)] italic text-3xl leading-none text-[var(--ink)]">
            damar
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            /portfolio
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Magnetic key={l.href} strength={10}>
              <a
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                data-cursor={l.label}
                className="group relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                <span className="text-[var(--muted)] group-hover:text-[var(--clay)] transition-colors">
                  {l.num}
                </span>
                <span className={`scribble-link ${active === l.href.slice(1) ? "is-active" : ""}`}>
                  {l.label}
                </span>
              </a>
            </Magnetic>
          ))}
        </div>

        <Magnetic strength={14}>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            data-cursor="Hello"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[12px] font-medium text-[var(--paper)] transition-all hover:bg-[var(--clay)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--moss)] blink-soft" />
            Let&rsquo;s talk
          </a>
        </Magnetic>
      </div>
    </nav>
  );
}
