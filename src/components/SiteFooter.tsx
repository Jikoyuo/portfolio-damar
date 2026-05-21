"use client";

import Link from "next/link";
import { PROFILE } from "@/data/profile";

const PALETTE = [
  { name: "Bone",  c: "#F2EDE4" },
  { name: "Paper", c: "#FAF6EE" },
  { name: "Ink",   c: "#1A1612" },
  { name: "Clay",  c: "#B5391E" },
  { name: "Moss",  c: "#2F4F2C" },
  { name: "Ochre", c: "#C49A4A" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--bone-3)] bg-[var(--paper)] mt-12">
      <div className="mx-auto max-w-[1300px] px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="label mb-3">Colophon</div>
            <p className="max-w-md text-[14.5px] leading-[1.65] text-[var(--ink-2)]">
              Set in Fraunces &amp; Inter Tight. Hand-laid in Next.js with a Go API on
              Cloud Run and Supabase. Smooth scroll by Lenis. Built deliberately,
              not stamped from a template.
            </p>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="label mb-3">Palette</div>
            <ul className="grid grid-cols-3 gap-3">
              {PALETTE.map((p) => (
                <li key={p.name} className="flex items-center gap-2">
                  <span
                    className="block h-5 w-5 rounded-full border border-[var(--bone-3)]"
                    style={{ background: p.c }}
                  />
                  <span className="text-[12px] text-[var(--ink-2)]">{p.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="label mb-3">Index</div>
            <ul className="space-y-1 text-[14px]">
              {["About", "Work", "Path", "Notes", "Contact"].map((l) => (
                <li key={l}>
                  <Link
                    href={l === "Notes" ? "/notes" : `/#${l.toLowerCase()}`}
                    className="lnk text-[var(--ink-2)]"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--bone-3)] pt-6 text-[12px] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <span>© {year} {PROFILE.name}. All work, mishaps &amp; pixels.</span>
          <div className="flex items-center gap-2 label">
            <Link href="/admin/login" className="hover:text-[var(--clay)] transition-colors">Studio</Link>
            <span>·</span>
            <span>v4.0 · Atelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
