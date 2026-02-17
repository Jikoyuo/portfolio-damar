"use client";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface TimelineItem {
    title: string;
    subtitle: string;
    period: string;
    description: string;
    tags?: string[];
}

interface TimelineProps {
    items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                delay: i * 0.12,
            },
        }),
    };

    const dotVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 20,
                delay: i * 0.12,
            },
        }),
    };
    return (
        <div className="relative pl-8">
            {/* Vertical Line — animates height from top to bottom */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-300 via-indigo-400 to-purple-400 rounded-full origin-top"
            />

            <div className="space-y-5">
                {items.map((item, index) => (
                    <div key={index} className="relative group">
                        {/* Dot — springs in */}
                        <motion.div
                            custom={index}
                            variants={dotVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="absolute -left-8 top-[18px] w-[14px] h-[14px] rounded-full border-[3px] border-indigo-400 bg-white group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-colors duration-300 z-10"
                        />

                        {/* Card — fades in with subtle rise + deblur */}
                        <motion.div
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="bg-white p-5 rounded-xl border border-slate-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-indigo-100 transition-[box-shadow,border-color] duration-300"
                        >
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 mb-2">
                                <Calendar size={10} />
                                {item.period}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 leading-tight">{item.title}</h4>
                            <p className="text-sm text-indigo-600 font-medium mb-1">{item.subtitle}</p>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {item.description}
                            </p>
                            {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-200 font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
