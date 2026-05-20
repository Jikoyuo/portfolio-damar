"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("is-in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as keyof React.JSX.IntrinsicElements;
  return (
    // @ts-expect-error dynamic intrinsic tag
    <Component ref={ref} className={`reveal ${className || ""}`}>
      {children}
    </Component>
  );
}
