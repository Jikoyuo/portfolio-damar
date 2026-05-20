"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about",   label: "About",   n: "01" },
  { href: "#work",    label: "Work",    n: "02" },
  { href: "#craft",   label: "Craft",   n: "03" },
  { href: "#journey", label: "Journey", n: "04" },
  { href: "#contact", label: "Contact", n: "05" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    LINKS.forEach(l => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });

    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <a href="#" onClick={e => go(e, "#")} className="group flex items-center gap-3">
          <span className="label text-[var(--volt)]">CDK</span>
          <span className="h-4 w-px bg-[var(--border)]" />
          <span className="label text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
            Portfolio
          </span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {LINKS.map(l => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={e => go(e, l.href)}
                  className={`group flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                    isActive ? "text-[var(--volt)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span className="font-[family-name:var(--font-mono)] text-[9px] opacity-60">{l.n}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em]">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => go(e, "#contact")}
          className="inline-flex items-center gap-2 border border-[var(--volt)] px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--volt)] transition-all hover:bg-[var(--volt)] hover:text-[var(--bg)]"
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}
