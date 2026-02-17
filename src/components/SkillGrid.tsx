"use client";
import { motion } from "framer-motion";

interface SkillCategory {
    title: string;
    level: string;
    skills: string[];
}

export default function SkillGrid({ categories }: { categories: SkillCategory[] }) {
    const levelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "intermediate": return "text-emerald-600 bg-emerald-50 border-emerald-200";
            case "beginner": return "text-amber-600 bg-amber-50 border-amber-200";
            default: return "text-blue-600 bg-blue-50 border-blue-200";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, catIndex) => (
                <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.15 }}
                    className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all relative overflow-hidden"
                >
                    {/* Decorative gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/30 transition-all duration-500 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="w-2 h-6 bg-indigo-500 rounded-full" />
                                {category.title}
                            </h3>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${levelColor(category.level)}`}>
                                {category.level}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (catIndex * 0.1) + (skillIndex * 0.04) }}
                                    whileHover={{
                                        scale: 1.08,
                                        backgroundColor: "#EEF2FF",
                                        color: "#4F46E5",
                                        borderColor: "#C7D2FE",
                                        y: -2
                                    }}
                                    className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg border border-slate-200 cursor-default transition-shadow hover:shadow-sm"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
