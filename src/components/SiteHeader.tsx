"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Magnetic from "@/components/motion/Magnetic";

const LINKS = [
  { href: "/#index",   label: "Index",   num: "00" },
  { href: "/#about",   label: "About",   num: "01" },
  { href: "/#work",    label: "Work",    num: "02" },
  { href: "/#path",    label: "Path",    num: "03" },
  { href: "/notes",    label: "Notes",   num: "04" },
  { href: "/#contact", label: "Contact", num: "05" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (pathname !== "/") return () => window.removeEventListener("scroll", onScroll);

    const ids = ["index", "about", "work", "path", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (v[0]) setActive(v[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.3, 0.6, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all ${
        scrolled
          ? "bg-[var(--bone)]/85 backdrop-blur-xl border-b border-[var(--bone-3)]/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-5 md:px-10 py-4">
        <Link href="/" className="group flex items-baseline gap-2" data-cursor="Top" aria-label="Home">
          <span className="italic-serif text-[1.7rem] leading-none text-[var(--ink)]">damar</span>
          <span className="label hidden sm:inline">/portfolio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {LINKS.map((l) => {
            const id = l.href.split("#")[1];
            const isActive = pathname === "/" ? active === id :
              l.href.startsWith("/notes") && pathname.startsWith("/notes");
            return (
              <Magnetic key={l.href} strength={10}>
                <Link
                  href={l.href}
                  data-cursor={l.label}
                  className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] transition-colors ${
                    isActive
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className={`label normal-case tracking-normal text-[10px] ${
                    isActive ? "text-[var(--clay)]" : "text-[var(--muted)]"
                  }`}>{l.num}</span>
                  <span>{l.label}</span>
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        <Magnetic strength={14}>
          <a
            href="#contact"
            data-cursor="Hello"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-[12.5px] font-medium text-[var(--paper)] transition-colors hover:bg-[var(--clay)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--moss)]" />
            Let&rsquo;s talk
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
