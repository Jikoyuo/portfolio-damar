"use client";

export function HandArrow({
  className,
  color = "var(--clay)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 60"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 8 C 18 4, 36 22, 50 38" />
      <path d="M50 38 L 44 30" />
      <path d="M50 38 L 42 40" />
    </svg>
  );
}

export function HandCircle({
  className,
  color = "var(--clay)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 100"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M14 52 C 30 22, 80 12, 120 16 C 170 22, 196 44, 188 64 C 178 86, 122 92, 78 86 C 38 82, 8 70, 14 52 Z" />
    </svg>
  );
}

export function Squiggle({ className, color = "var(--clay)" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 14" fill="none" aria-hidden preserveAspectRatio="none">
      <path
        d="M2 7 C 22 1, 42 13, 62 7 S 102 1, 122 7 S 162 13, 182 7 S 222 1, 238 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarBurst({
  className,
  color = "var(--clay)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <g stroke={color} strokeWidth="1.6" strokeLinecap="round">
        <line x1="20" y1="4" x2="20" y2="14" />
        <line x1="20" y1="26" x2="20" y2="36" />
        <line x1="4" y1="20" x2="14" y2="20" />
        <line x1="26" y1="20" x2="36" y2="20" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="25" y1="25" x2="31" y2="31" />
        <line x1="9" y1="31" x2="15" y2="25" />
        <line x1="25" y1="15" x2="31" y2="9" />
      </g>
    </svg>
  );
}

export function BlobShape({
  className,
  color = "var(--clay)",
  opacity = 0.18,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg className={className} viewBox="0 0 600 600" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
      <path
        d="M 432 84 C 510 132, 562 224, 540 320 C 518 416, 422 506, 320 522 C 218 538, 110 480, 74 392 C 38 304, 74 186, 156 116 C 238 46, 354 36, 432 84 Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  );
}
