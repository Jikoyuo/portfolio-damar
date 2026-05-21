import { notFound } from "next/navigation";
import Link from "next/link";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getNoteBySlug, listPublishedNotes } from "@/data/notes";

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listPublishedNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const n = getNoteBySlug(slug);
  if (!n) return { title: "Note — Damar" };
  return { title: `${n.title} — Damar`, description: n.excerpt };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <SmoothScroll>
      <Cursor />
      <ScrollProgress />
      <SiteHeader />
      <main className="mx-auto max-w-[760px] px-5 md:px-10 pt-32 pb-24">
        <nav className="mb-12 flex items-center gap-2 text-[12.5px] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">Index</Link>
          <span>/</span>
          <Link href="/notes" className="hover:text-[var(--ink)] transition-colors">Notes</Link>
          <span>/</span>
          <span className="text-[var(--ink)] truncate">{note.title}</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 label mb-4">
            <time dateTime={note.date}>{fmtDate(note.date)}</time>
            <span className="text-[var(--bone-3)]">·</span>
            <span>{note.readingTime}</span>
          </div>
          <h1 className="display text-[clamp(2rem,5vw,3.6rem)] text-[var(--ink)] leading-[1.05]">
            {note.title}
          </h1>
        </header>

        <article className="prose">
          {note.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className="mt-20 border-t border-[var(--bone-3)] pt-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-[14px] text-[var(--ink-2)] hover:text-[var(--clay)] transition-colors"
          >
            <span>←</span>
            <span>All notes</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
