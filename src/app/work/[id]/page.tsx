import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api, API_BASE } from "@/lib/api";
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
    return {
      title: `${p.title} — Damar`,
      description: p.description,
    };
  } catch {
    return { title: "Work — Damar" };
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  let project;
  try {
    project = await api.getProject(numericId);
  } catch {
    notFound();
  }

  const images = (project.images || [])
    .map(resolveImage)
    .filter((u): u is string => !!u);

  const year = (() => {
    const d = new Date(project.createdAt);
    return Number.isFinite(d.getTime()) ? d.getFullYear() : null;
  })();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[12.5px] text-[var(--text-2)]">
          <Link href="/" className="hover:text-[var(--text)] transition-colors">Index</Link>
          <span className="text-[var(--text-3)]">/</span>
          <Link href="/#work" className="hover:text-[var(--text)] transition-colors">Work</Link>
          <span className="text-[var(--text-3)]">/</span>
          <span className="text-[var(--text)] truncate">{project.title}</span>
        </nav>

        {/* Title block */}
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3 label">
            <span>{project.type}</span>
            {year && <><span className="text-[var(--text-3)]">·</span><span>{year}</span></>}
          </div>
          <h1 className="text-[clamp(1.75rem,3.6vw,2.2rem)] leading-[1.18] tracking-[-0.018em] font-medium text-[var(--text)] max-w-[28ch]">
            {project.title}
          </h1>
        </header>

        {/* Hero image */}
        {images[0] && (
          <div className="mb-12 overflow-hidden rounded-md bg-[var(--bg-3)] border border-[var(--border)]">
            <div className="relative aspect-[16/10]">
              <Image
                src={images[0]}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Description as prose */}
        <div className="prose mb-12">
          {project.description.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Meta table */}
        <dl className="mb-12 border-t border-[var(--border)] divide-y divide-[var(--border)] text-[13.5px]">
          {project.stack?.length > 0 && (
            <div className="grid grid-cols-12 gap-3 py-3">
              <dt className="col-span-12 sm:col-span-3 label">Stack</dt>
              <dd className="col-span-12 sm:col-span-9 text-[var(--text)]">
                {project.stack.join(", ")}
              </dd>
            </div>
          )}
          {project.demoUrl && (
            <div className="grid grid-cols-12 gap-3 py-3">
              <dt className="col-span-12 sm:col-span-3 label">Demo</dt>
              <dd className="col-span-12 sm:col-span-9">
                <a className="lnk ext" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  {project.demoUrl.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          )}
          {project.githubUrl && (
            <div className="grid grid-cols-12 gap-3 py-3">
              <dt className="col-span-12 sm:col-span-3 label">Source</dt>
              <dd className="col-span-12 sm:col-span-9">
                <a className="lnk ext" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  {project.githubUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>

        {/* Image gallery (rest) */}
        {images.length > 1 && (
          <div className="space-y-4 mb-12">
            <div className="label">Gallery</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {images.slice(1).map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-md bg-[var(--bg-3)] border border-[var(--border)]"
                >
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={src}
                      alt={`${project.title} — image ${i + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="border-t border-[var(--border)] pt-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
          >
            <span className="label">←</span>
            <span>Back to all work</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
