import Link from "next/link";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listPublishedNotes } from "@/data/notes";

export const metadata = {
  title: "Notes — Damar",
  description: "Short essays on building software, Go, frontend craft.",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function NotesIndex() {
  const notes = listPublishedNotes();

  return (
    <SmoothScroll>
      <Cursor />
      <ScrollProgress />
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-5 md:px-10 pt-32 pb-24">
        <div className="flex items-baseline gap-6 mb-12">
          <span className="label">§ — Writing</span>
          <span className="h-px flex-1 bg-[var(--bone-3)]" />
          <span className="label tabular-nums">{String(notes.length).padStart(2, "0")} notes</span>
        </div>

        <header className="mb-16 max-w-3xl">
          <h1 className="display text-[clamp(2.4rem,6vw,5rem)] text-[var(--ink)] leading-[0.98]">
            Field <span className="italic-serif text-[var(--clay)]">notes.</span>
          </h1>
          <p className="mt-5 text-[16px] leading-[1.65] text-[var(--ink-2)]">
            Short pieces on building software — Go, frontend, and the occasional
            thought worth recording. Updated when I have something actually
            worth saying.
          </p>
        </header>

        {notes.length === 0 ? (
          <p className="italic-serif text-2xl text-[var(--muted)] py-20">
            Nothing published yet — first notes are in draft.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--bone-3)] border-y border-[var(--bone-3)]">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/notes/${n.slug}`}
                  data-cursor="Read"
                  className="group grid grid-cols-12 items-baseline gap-4 py-7 md:py-9 transition-colors hover:bg-[var(--paper)]/60 -mx-3 px-3 rounded-lg"
                >
                  <div className="col-span-12 md:col-span-8">
                    <h2 className="display text-[1.6rem] md:text-[2rem] leading-[1.05] text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors">
                      {n.title}
                    </h2>
                    <p className="mt-2 text-[14.5px] leading-[1.55] text-[var(--ink-2)] max-w-xl">
                      {n.excerpt}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:text-right label tabular-nums">
                    <span>{fmtDate(n.date)}</span>
                    <span className="mx-2 text-[var(--bone-3)]">·</span>
                    <span>{n.readingTime}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
