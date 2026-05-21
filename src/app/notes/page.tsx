import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listPublishedNotes } from "@/data/notes";

export const metadata = {
  title: "Notes — Damar",
  description: "Short essays on building, Go, frontend craft, and the occasional rant.",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function NotesIndex() {
  const notes = listPublishedNotes();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-12 pb-16">
        <header className="mb-10">
          <div className="label mb-3">Writing</div>
          <h1 className="text-[clamp(1.75rem,3.6vw,2.2rem)] leading-[1.18] tracking-[-0.018em] font-medium text-[var(--text)]">
            Notes
          </h1>
          <p className="measure mt-3 text-[14.5px] leading-[1.7] text-[var(--text-2)]">
            Short pieces on building software — Go, frontend, and the
            occasional thought worth recording. Updated when I have something
            actually worth saying.
          </p>
        </header>

        {notes.length === 0 ? (
          <p className="py-8 text-[14px] text-[var(--text-3)]">
            Nothing published yet — first notes are in draft.
          </p>
        ) : (
          <ul className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/notes/${n.slug}`}
                  className="group grid grid-cols-12 items-baseline gap-3 py-4 px-2 -mx-2 rounded-sm transition-colors hover:bg-[var(--bg-2)]"
                >
                  <div className="col-span-12 sm:col-span-9">
                    <div className="text-[14px] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {n.title}
                    </div>
                    <div className="mt-1 text-[12.5px] text-[var(--text-2)] line-clamp-2">
                      {n.excerpt}
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-3 sm:text-right label tabular-nums">
                    <span>{fmtDate(n.date)}</span>
                    <span className="mx-1.5 text-[var(--text-3)]">·</span>
                    <span>{n.readingTime}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
