import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api, API_BASE } from "@/lib/api";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const revalidate = 60;

interface Params { params: Promise<{ id: string }> }

function resolveImage(img: string): string | null {
  if (!img) return null;
  if (/^https?:\/\//.test(img)) return img;
  if (img.startsWith("/api/placeholder")) return null;
  if (img.startsWith("/")) return img;
  return `${API_BASE}/${img}`;
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  try {
    const p = await api.getProject(id);
    return { title: `${p.title} — Damar`, description: p.description };
  } catch {
    return { title: "Work — Damar" };
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  let project;
  try { project = await api.getProject(numericId); }
  catch { notFound(); }

  const images = (project.images || [])
    .map(resolveImage)
    .filter((u): u is string => !!u);

  const year = (() => {
    const d = new Date(project.createdAt);
    return Number.isFinite(d.getTime()) ? d.getFullYear() : null;
  })();

  return (
    <SmoothScroll>
      <Cursor />
      <ScrollProgress />
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-5 md:px-10 pt-32 pb-24">
        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2 text-[12.5px] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">Index</Link>
          <span>/</span>
          <Link href="/#work" className="hover:text-[var(--ink)] transition-colors">Work</Link>
          <span>/</span>
          <span className="text-[var(--ink)] truncate">{project.title}</span>
        </nav>

        {/* Title */}
        <header className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 label mb-4">
            <span>{project.type}</span>
            {year && <><span className="text-[var(--bone-3)]">·</span><span>{year}</span></>}
          </div>
          <h1 className="display text-[clamp(2.4rem,6vw,5rem)] text-[var(--ink)] leading-[1]">
            {project.title}
          </h1>
        </header>

        {/* Hero image */}
        {images[0] && (
          <div className="mb-16 overflow-hidden rounded-2xl bg-[var(--bone-2)] border border-[var(--bone-3)]">
            <div className="relative aspect-[16/9]">
              <Image
                src={images[0]}
                alt={project.title}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8 md:gap-16">
          {/* Description */}
          <div className="col-span-12 md:col-span-8">
            <div className="prose">
              {project.description.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Meta sidebar */}
          <aside className="col-span-12 md:col-span-4 md:border-l md:border-[var(--bone-3)] md:pl-8">
            <dl className="space-y-6 text-[14px]">
              {project.stack?.length > 0 && (
                <div>
                  <dt className="label mb-2">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="rounded-full border border-[var(--bone-3)] bg-[var(--paper)] px-3 py-1 text-[12.5px] text-[var(--ink-2)]">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {project.demoUrl && (
                <div>
                  <dt className="label mb-1.5">Live demo</dt>
                  <dd>
                    <a className="lnk ext text-[14px] text-[var(--ink)]" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      {project.demoUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}
              {project.githubUrl && (
                <div>
                  <dt className="label mb-1.5">Source</dt>
                  <dd>
                    <a className="lnk ext text-[14px] text-[var(--ink)]" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      {project.githubUrl.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>

        {/* Gallery */}
        {images.length > 1 && (
          <div className="mt-20">
            <div className="label mb-6">Gallery</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.slice(1).map((src, i) => (
                <div key={i} className="overflow-hidden rounded-xl bg-[var(--bone-2)] border border-[var(--bone-3)] group">
                  <div className="relative aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.02]">
                    <Image
                      src={src}
                      alt={`${project.title} — image ${i + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 540px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 border-t border-[var(--bone-3)] pt-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[14px] text-[var(--ink-2)] hover:text-[var(--clay)] transition-colors"
          >
            <span>←</span>
            <span>Back to all work</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
