"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  text: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  wrapperClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Optional element rendered between words (e.g. line break) */
  separator?: ReactNode;
}

/**
 * Splits a string by words and reveals each word with a vertical slide.
 * Each word stays as a single unit so wrapping doesn't break mid-word.
 */
export default function SplitText({
  text,
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  className,
  wrapperClassName,
  as = "span",
}: Props) {
  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.span;

  return (
    <Tag
      className={wrapperClassName}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}
        >
          <motion.span
            className={`inline-block ${className || ""}`}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show:   { y: "0%",   opacity: 1,
                transition: { duration, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
