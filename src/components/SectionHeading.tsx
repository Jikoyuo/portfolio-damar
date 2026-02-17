"use client";
import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
    return (
        <div className={`mb-12 ${className}`}>
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="block text-indigo-600 font-bold tracking-widest text-sm uppercase mb-2"
                >
                    {subtitle}
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-slate-900"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="h-1 w-20 bg-indigo-600 mt-4 origin-left rounded-full"
            />
        </div>
    );
}
