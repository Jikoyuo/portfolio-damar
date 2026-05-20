"use client";

interface Props {
  /** Two-digit chapter number, e.g. "01" */
  number: string;
  /** Short kicker, e.g. "Field notes" */
  kicker: string;
  /** Section title (display serif) */
  title: string;
  /** Optional italic tagline below title */
  tagline?: string;
}

export default function SectionMark({ number, kicker, title, tagline }: Props) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-baseline gap-4 md:gap-6 mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          {`Ch. ${number}`}
        </span>
        <span className="h-px flex-1 bg-[var(--bone-3)]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          {kicker}
        </span>
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.92] tracking-tight text-[var(--ink)]">
        {title}
      </h2>
      {tagline && (
        <p className="mt-3 font-[family-name:var(--font-display)] italic text-2xl md:text-3xl text-[var(--clay)]">
          {tagline}
        </p>
      )}
    </div>
  );
}
