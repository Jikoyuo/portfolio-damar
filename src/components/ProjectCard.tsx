"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={() => onClick(project)}
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
        >
            {/* Image — fixed aspect ratio */}
            <div className="relative aspect-video overflow-hidden bg-slate-100 flex-shrink-0">
                <div className="absolute top-3 right-3 z-10">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${project.type === 'Office' ? 'bg-blue-100 text-blue-600'
                            : project.type === 'Campus' ? 'bg-emerald-100 text-emerald-600'
                                : 'bg-purple-100 text-purple-600'
                        }`}>
                        {project.type}
                    </span>
                </div>
                <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
            </div>

            {/* Content — flex-grow to fill remaining space, button at bottom */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                    {project.title}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {project.description}
                </p>

                {/* Stack — fixed height with overflow hidden */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 max-h-[52px] overflow-hidden">
                    {project.stack.map(tech => (
                        <span key={tech} className="text-[10px] sm:text-[11px] bg-slate-50 text-slate-400 px-2 py-1 rounded border border-slate-100">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Button — always at the bottom */}
                <div className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all active:scale-95 text-xs sm:text-sm font-medium group-hover:shadow-lg shadow-indigo-200/50 mt-auto">
                    Detail Project <ExternalLink size={14} />
                </div>
            </div>
        </motion.div>
    );
}