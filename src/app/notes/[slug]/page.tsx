import { notFound } from "next/navigation";
import Link from "next/link";
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
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-10 pb-16">
        <nav className="mb-8 flex items-center gap-2 text-[12.5px] text-[var(--text-2)]">
          <Link href="/" className="hover:text-[var(--text)] transition-colors">Index</Link>
          <span className="text-[var(--text-3)]">/</span>
          <Link href="/notes" className="hover:text-[var(--text)] transition-colors">Notes</Link>
          <span className="text-[var(--text-3)]">/</span>
          <span className="text-[var(--text)] truncate">{note.title}</span>
        </nav>

        <header className="mb-8">
          <div className="label mb-3 flex items-center gap-2">
            <time dateTime={note.date}>{fmtDate(note.date)}</time>
            <span className="text-[var(--text-3)]">·</span>
            <span>{note.readingTime}</span>
          </div>
          <h1 className="text-[clamp(1.6rem,3.4vw,2rem)] leading-[1.2] tracking-[-0.018em] font-medium text-[var(--text)] max-w-[36ch]">
            {note.title}
          </h1>
        </header>

        <article className="prose">
          {note.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className="mt-16 border-t border-[var(--border)] pt-6">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
          >
            <span className="label">←</span>
            <span>All notes</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
