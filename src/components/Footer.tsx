"use client";

import { PROFILE } from "@/data/profile";

const PALETTE = [
  { name: "Bone",  color: "#F1ECE3" },
  { name: "Paper", color: "#FAF6EE" },
  { name: "Ink",   color: "#1B1814" },
  { name: "Clay",  color: "#B85C38" },
  { name: "Moss",  color: "#2F5D3F" },
  { name: "Ochre", color: "#C8932A" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--bone-3)] bg-[var(--paper)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Colophon */}
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Colophon
            </div>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--ink-2)]">
              Set in Instrument Serif &amp; Inter Tight. Built with Next.js
              and a Go API, hand-laid &mdash; not stamped from a template.
              Hosted on Vercel &amp; Google Cloud Run.
            </p>
          </div>

          {/* Palette */}
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Palette
            </div>
            <ul className="mt-3 grid grid-cols-3 gap-3">
              {PALETTE.map((p) => (
                <li key={p.name} className="flex items-center gap-2">
                  <span
                    className="block h-5 w-5 rounded-full border border-[var(--bone-3)]"
                    style={{ background: p.color }}
                  />
                  <span className="text-[12px] text-[var(--ink-2)]">{p.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Index */}
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Index
            </div>
            <ul className="mt-3 space-y-1.5 text-[14px]">
              {["About", "Journey", "Craft", "Work", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="scribble-link text-[var(--ink-2)] hover:text-[var(--clay)] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--bone-3)] pt-6 text-[12px] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {PROFILE.name}. All work, mishaps &amp; pixels.
          </span>
          <span className="font-mono uppercase tracking-[0.22em]">
            v3.0 · made on a Tuesday
          </span>
        </div>
      </div>
    </footer>
  );
}
