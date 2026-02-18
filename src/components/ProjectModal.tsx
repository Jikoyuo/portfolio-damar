"use client";
import { Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [project]);

    if (!project) return null;

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
                    className="relative bg-white w-full sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col md:flex-row"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-full md:w-1/2 bg-slate-100 overflow-y-auto max-h-[30vh] md:max-h-full p-3 sm:p-4 space-y-3 sm:space-y-4 flex-shrink-0">
                        {project.images.map((img, index) => (
                            <div key={index} className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                                <img
                                    src={img}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 overflow-y-auto">
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
