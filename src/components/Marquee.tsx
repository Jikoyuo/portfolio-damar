"use client";

import { ReactNode } from "react";

interface Props {
  items: ReactNode[];
  className?: string;
  /** Reverse direction */
  reverse?: boolean;
}

export default function Marquee({ items, className, reverse }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-mask overflow-hidden ${className || ""}`}>
      <div
        className="marquee-track flex w-max items-center gap-12 whitespace-nowrap"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((node, i) => (
          <span key={i} className="flex items-center gap-12">
            {node}
            <span aria-hidden className="text-[var(--clay)] text-2xl">✦</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .marquee-mask {
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            black 8%,
            black 92%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}
