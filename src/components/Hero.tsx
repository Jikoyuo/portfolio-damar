"use client";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FAFAFA]">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-100 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 justify-center mb-6"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-medium text-slate-500 tracking-wide">
                        {PROFILE.role}
                    </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                        className="block"
                    >
                        Building
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                        Digital Excellence
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0"
                >
                    {PROFILE.tagline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-full font-bold text-base sm:text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                        View My Work
                    </a>
                    <a
                        href={PROFILE.socials.email}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-base sm:text-lg hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
                    >
                        <Mail size={20} />
                        Contact Me
                    </a>
                </motion.div>
            </div>

            {/* Arrow — positioned at bottom of the section, not inside content */}
            <motion.a
                href="#about"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer z-10"
            >
                <ArrowDown size={24} />
            </motion.a>
        </section>
    );
}
