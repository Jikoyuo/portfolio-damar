"use client";
import { Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [imgIndex, setImgIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Reset index when project changes
    useEffect(() => { setImgIndex(0); setDirection(0); }, [project]);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [project]);

    const goPrev = useCallback(() => {
        if (!project) return;
        setDirection(-1);
        setImgIndex(prev => (prev - 1 + project.images.length) % project.images.length);
    }, [project]);

    const goNext = useCallback(() => {
        if (!project) return;
        setDirection(1);
        setImgIndex(prev => (prev + 1) % project.images.length);
    }, [project]);

    // Keyboard navigation
    useEffect(() => {
        if (!project) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "ArrowRight") goNext();
            else if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [project, goPrev, goNext, onClose]);

    if (!project) return null;

    const hasMultiple = project.images.length > 1;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            >
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative bg-white w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* ─── Image Carousel ─── */}
                    <div className="w-full bg-slate-100 flex-shrink-0 flex flex-col">
                        <div className="relative w-full aspect-[16/10] overflow-hidden p-3 sm:p-4">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.img
                                    key={imgIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                    src={project.images[imgIndex]}
                                    alt={`${project.title} screenshot ${imgIndex + 1}`}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </AnimatePresence>

                            {/* Prev / Next Buttons */}
                            {hasMultiple && (
                                <>
                                    <button
                                        onClick={goPrev}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 active:scale-95"
                                    >
                                        <ChevronLeft size={18} className="text-slate-700" />
                                    </button>
                                    <button
                                        onClick={goNext}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 active:scale-95"
                                    >
                                        <ChevronRight size={18} className="text-slate-700" />
                                    </button>
                                </>
                            )}

                            {/* Counter badge */}
                            {hasMultiple && (
                                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                    {imgIndex + 1} / {project.images.length}
                                </span>
                            )}
                        </div>

                        {/* Dot Indicators */}
                        {hasMultiple && (
                            <div className="flex justify-center gap-1.5 py-3 bg-slate-100">
                                {project.images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setDirection(i > imgIndex ? 1 : -1); setImgIndex(i); }}
                                        className={`rounded-full transition-all duration-300 ${i === imgIndex
                                            ? "w-6 h-2 bg-indigo-500"
                                            : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-full p-5 sm:p-6 overflow-y-auto">
                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 ${project.type === 'Office' ? 'bg-blue-100 text-blue-600'
                            : project.type === 'Campus' ? 'bg-emerald-100 text-emerald-600'
                                : 'bg-purple-100 text-purple-600'
                            }`}>
                            {project.type}
                        </span>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">{project.title}</h2>

                        <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium border border-slate-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all font-medium">
                                View Live <ExternalLink size={18} />
                            </button>
                            <button className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                <Github size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
