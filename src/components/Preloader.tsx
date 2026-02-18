"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { clearInterval(interval); return 100; }
                return Math.min(prev + (prev < 50 ? 2 : prev < 80 ? 3 : 1), 100);
            });
        }, 22);

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 2200);

        document.body.style.overflow = "hidden";
        return () => { clearInterval(interval); clearTimeout(timer); document.body.style.overflow = ""; };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAFAFA]"
                >
                    <motion.div
                        animate={isMobile ? { opacity: 0.5 } : { scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                        transition={isMobile ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute rounded-full bg-indigo-100 ${isMobile ? "w-[150px] h-[150px] blur-[60px]" : "w-[300px] h-[300px] blur-[120px]"
                            }`}
                        style={{ top: "25%", left: "25%" }}
                    />
                    <motion.div
                        animate={isMobile ? { opacity: 0.4 } : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={isMobile ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className={`absolute rounded-full bg-purple-100 ${isMobile ? "w-[120px] h-[120px] blur-[60px]" : "w-[250px] h-[250px] blur-[120px]"
                            }`}
                        style={{ bottom: "25%", right: "25%" }}
                    />

                    <div className="relative z-10 flex flex-col items-center">

                        <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                                transition={{
                                    opacity: { duration: 0.5 },
                                    scale: { duration: 0.5 },
                                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                }}
                                className="absolute inset-0 rounded-full will-change-transform"
                                style={{
                                    border: "1px solid transparent",
                                    borderTopColor: "#c7d2fe",
                                    borderRightColor: "#e0e7ff",
                                }}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1, rotate: -360 }}
                                transition={{
                                    opacity: { duration: 0.5, delay: 0.1 },
                                    scale: { duration: 0.5, delay: 0.1 },
                                    rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                                }}
                                className="absolute inset-[18%] rounded-full will-change-transform"
                                style={{
                                    border: "1px solid transparent",
                                    borderBottomColor: "#ddd6fe",
                                    borderLeftColor: "#ede9fe",
                                }}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-lg shadow-indigo-100/50 border border-slate-100 flex items-center justify-center"
                            >
                                <span className="text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-purple-500">
                                    CD
                                </span>
                            </motion.div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="mt-7 text-lg sm:text-xl font-bold tracking-tight text-slate-800"
                        >
                            Chornael Damar<span className="text-indigo-600">.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            className="w-10 h-px bg-slate-200 mt-2.5 origin-center"
                        />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-2.5 text-[11px] text-slate-400 font-medium tracking-[0.25em] uppercase"
                        >
                            Portfolio
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex flex-col items-center gap-2.5"
                        >
                            <div className="w-32 sm:w-40 h-[2px] bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                            <span className="text-[10px] text-slate-300 font-mono tabular-nums">
                                {progress}%
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
