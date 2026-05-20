"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-on");

    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;

    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; setVisible(true); };
    const enter = () => setActive(true);
    const leave = () => setActive(false);

    const loop = () => {
      cx += (x - cx) * 0.14;
      cy += (y - cy) * 0.14;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const bind = () => {
      document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    bind();
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-4 -mt-4"
      style={{ willChange: "transform", opacity: visible ? 1 : 0 }}
    >
      {/* Crosshair */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Horizontal line */}
        <line x1="0" y1="16" x2="13" y2="16" stroke={active ? "var(--volt)" : "var(--text)"} strokeWidth="1.5" />
        <line x1="19" y1="16" x2="32" y2="16" stroke={active ? "var(--volt)" : "var(--text)"} strokeWidth="1.5" />
        {/* Vertical line */}
        <line x1="16" y1="0" x2="16" y2="13" stroke={active ? "var(--volt)" : "var(--text)"} strokeWidth="1.5" />
        <line x1="16" y1="19" x2="16" y2="32" stroke={active ? "var(--volt)" : "var(--text)"} strokeWidth="1.5" />
        {/* Center dot */}
        <circle cx="16" cy="16" r={active ? "3" : "1.5"}
          fill={active ? "var(--volt)" : "var(--text)"}
          style={{ transition: "r 0.2s, fill 0.2s" }}
        />
      </svg>
    </div>
  );
}
