"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only on fine pointer devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-on");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const enter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      const l = t.getAttribute("data-cursor") || "";
      setLabel(l || "•");
      ringRef.current?.classList.add("is-active");
    };
    const leave = () => {
      setLabel(null);
      ringRef.current?.classList.remove("is-active");
    };

    const targets = document.querySelectorAll<HTMLElement>(
      "a, button, [data-cursor]"
    );
    targets.forEach((t) => {
      t.addEventListener("mouseenter", enter);
      t.addEventListener("mouseleave", leave);
    });

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", enter);
        t.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-[var(--ink)] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[99] -ml-[18px] -mt-[18px] flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[var(--ink)]/40 text-[10px] font-mono uppercase tracking-widest text-[var(--ink)] transition-[width,height,background-color,border-color] duration-300"
        style={{ willChange: "transform" }}
      >
        <span className="px-1">{label}</span>
        <style jsx>{`
          .cursor-ring.is-active {
            width: 64px;
            height: 64px;
            margin-left: -32px;
            margin-top: -32px;
            background: var(--clay);
            border-color: var(--clay);
            color: var(--paper);
            mix-blend-mode: normal;
          }
        `}</style>
      </div>
    </>
  );
}
