"use client";

import Link from "next/link";
import { PROFILE } from "@/data/profile";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[13.5px] text-[var(--text)]">
              {PROFILE.name}
            </div>
            <div className="mt-0.5 label">
              Yogyakarta · GMT+7
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <div className="flex items-center gap-3 text-[13px]">
              <a href={PROFILE.socials.email}   className="lnk">Email</a>
              <span className="text-[var(--text-3)]">·</span>
              <a href={PROFILE.socials.github}    target="_blank" rel="noopener noreferrer" className="lnk ext">GitHub</a>
              <span className="text-[var(--text-3)]">·</span>
              <a href={PROFILE.socials.linkedin}  target="_blank" rel="noopener noreferrer" className="lnk ext">LinkedIn</a>
            </div>
            <div className="mt-1 label flex items-center gap-2">
              <span>© {year}</span>
              <span className="text-[var(--text-3)]">·</span>
              <Link href="/admin/login" className="hover:text-[var(--text)] transition-colors">Studio</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
