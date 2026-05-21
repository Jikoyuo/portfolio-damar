"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/",       label: "Index" },
  { href: "/#work",  label: "Work" },
  { href: "/notes",  label: "Notes" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-colors ${
        scrolled ? "border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur" : "border-transparent bg-[var(--bg)]"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="Home"
        >
          <span className="font-medium text-[var(--text)]">Damar</span>
          <span className="label hidden sm:inline">/ Chornael Damar Kesuma</span>
        </Link>

        <nav className="flex items-center gap-1">
          {LINKS.map((l) => {
            const isActive =
              l.href === "/"
                ? pathname === "/"
                : l.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2 py-1 text-[13px] transition-colors ${
                  isActive ? "text-[var(--text)]" : "text-[var(--text-2)] hover:text-[var(--text)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
