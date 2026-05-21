"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("in"), delay);
            io.unobserve(el);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const C = Tag as keyof React.JSX.IntrinsicElements;
  // @ts-expect-error dynamic tag
  return <C ref={ref} className={`reveal ${className || ""}`}>{children}</C>;
}
