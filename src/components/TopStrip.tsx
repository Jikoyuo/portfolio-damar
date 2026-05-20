"use client";

import { useEffect, useState } from "react";

export default function TopStrip() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative z-30 border-b border-[var(--bone-3)] bg-[var(--bone)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--muted)]">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--moss)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--moss)]" />
          </span>
          <span>Available · Q2 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>Yogyakarta — Indonesia</span>
          <span className="text-[var(--ink)]">{time || "--:--:--"} WIB</span>
        </div>
        <div className="hidden sm:block">
          v3.0 · Edition 01
        </div>
      </div>
    </div>
  );
}
