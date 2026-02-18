"use client";
import { motion } from "framer-motion";

interface Language {
    name: string;
    level: "Intermediate" | "Beginner";
    percentage: number;
}

const LANGUAGES: Language[] = [
    { name: "JavaScript", level: "Intermediate", percentage: 65 },
    { name: "TypeScript", level: "Intermediate", percentage: 60 },
    { name: "Java", level: "Intermediate", percentage: 55 },
    { name: "Python", level: "Beginner", percentage: 35 },
    { name: "Go", level: "Beginner", percentage: 30 },
    { name: "PHP", level: "Beginner", percentage: 30 },
    { name: "SQL", level: "Beginner", percentage: 25 },
];

const LANG_COLORS: Record<string, { bar: string; glow: string; icon: string }> = {
    JavaScript: { bar: "from-yellow-400 to-amber-500", glow: "shadow-yellow-400/30", icon: "JS" },
    TypeScript: { bar: "from-blue-400 to-blue-600", glow: "shadow-blue-500/30", icon: "TS" },
    Java: { bar: "from-red-400 to-orange-500", glow: "shadow-red-400/30", icon: "JV" },
    Python: { bar: "from-emerald-400 to-teal-500", glow: "shadow-emerald-400/30", icon: "PY" },
    Go: { bar: "from-cyan-400 to-sky-500", glow: "shadow-cyan-400/30", icon: "GO" },
    PHP: { bar: "from-violet-400 to-purple-600", glow: "shadow-violet-400/30", icon: "PH" },
    SQL: { bar: "from-pink-400 to-rose-500", glow: "shadow-pink-400/30", icon: "SQ" },
};

export default function LanguageCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 p-6 sm:p-8 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50/60 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-50/40 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse [animation-delay:0.4s]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        Programming Languages
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                </div>

                {/* Language Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {LANGUAGES.map((lang, index) => {
                        const colors = LANG_COLORS[lang.name];
                        return (
                            <motion.div
                                key={lang.name}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.4 }}
                                className="group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2.5">
                                        {/* Language icon badge */}
                                        <motion.div
                                            whileHover={{ scale: 1.15, rotate: -5 }}
                                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bar} flex items-center justify-center shadow-md ${colors.glow} transition-shadow`}
                                        >
                                            <span className="text-[10px] font-black text-white tracking-tight">
                                                {colors.icon}
                                            </span>
                                        </motion.div>
                                        <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                                            {lang.name}
                                        </span>
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${lang.level === "Intermediate"
                                                ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                                                : "text-amber-600 bg-amber-50 border-amber-200"
                                            }`}
                                    >
                                        {lang.level}
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${lang.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.3 + index * 0.08,
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${colors.bar} rounded-full`}
                                    >
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
