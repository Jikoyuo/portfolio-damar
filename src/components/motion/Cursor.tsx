"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-on");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let scale = 1, targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (targetScale - scale) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    const enter = () => {
      targetScale = 1.8;
      ringRef.current?.classList.add("active");
    };
    const leave = () => {
      targetScale = 1;
      ringRef.current?.classList.remove("active");
    };

    const targets = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], [data-cursor]'
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    const mo = new MutationObserver(() => {
      const next = document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], [data-cursor]'
      );
      next.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      mo.disconnect();
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot — snaps directly to cursor */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-[var(--ink)]"
        style={{ willChange: "transform" }}
      />

      {/* Outer ring — lags behind, scales on hover */}
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[199] h-9 w-9 rounded-full border border-[var(--ink)]/35 transition-[background-color,border-color] duration-200"
        style={{ willChange: "transform" }}
      >
        <style jsx>{`
          .cursor-ring.active {
            background: rgba(181, 57, 30, 0.12);
            border-color: var(--clay);
          }
        `}</style>
      </div>
    </>
  );
}
