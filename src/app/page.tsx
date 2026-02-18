"use client";
import { useState } from "react";
import { PROJECTS, Project } from "@/data/projects";
import { PROFILE } from "@/data/profile";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import SkillGrid from "@/components/SkillGrid";
import LanguageCard from "@/components/LanguageCard";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import { Github, Linkedin, Mail, Trophy, Users, Heart, Briefcase, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JOURNEY_TABS = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "organization", label: "Organizations", icon: Users },
  { id: "competition", label: "Competitions", icon: Trophy },
  { id: "volunteer", label: "Volunteering", icon: Heart },
] as const;

type JourneyTabId = typeof JOURNEY_TABS[number]["id"];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<JourneyTabId>("experience");
  const [projectFilter, setProjectFilter] = useState<'All' | 'Office' | 'Personal' | 'Campus'>('All');

  const filteredProjects = projectFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === projectFilter);

  const experienceItems = PROFILE.experience.map(exp => ({
    title: exp.company,
    subtitle: exp.role,
    period: exp.period,
    description: exp.description,
  }));

  const educationItems = PROFILE.education.map(edu => ({
    title: edu.school,
    subtitle: edu.degree,
    period: edu.year,
    description: edu.description,
  }));

  const orgItems = PROFILE.organizations.map(org => ({
    title: org.org,
    subtitle: org.role,
    period: org.period,
    description: org.description,
  }));

  const competitionItems = PROFILE.competitions.map(comp => ({
    title: comp.name,
    subtitle: comp.organizer,
    period: comp.year,
    description: comp.description,
  }));

  const volunteerItems = PROFILE.volunteering.map(vol => ({
    title: vol.event,
    subtitle: vol.role,
    period: vol.year,
    description: vol.description,
  }));

  const tabContent: Record<JourneyTabId, { title: string; subtitle: string; period: string; description: string; tags?: string[] }[]> = {
    experience: experienceItems,
    education: educationItems,
    organization: orgItems,
    competition: competitionItems,
    volunteer: volunteerItems,
  };

  const skillCategories = [
    { title: "Frontend", level: PROFILE.skills.frontend.level, skills: PROFILE.skills.frontend.items },
    { title: "Backend", level: PROFILE.skills.backend.level, skills: PROFILE.skills.backend.items },
    { title: "Database & Tools", level: PROFILE.skills.database.level, skills: PROFILE.skills.database.items },
  ];

  return (
    <main className="bg-[#FAFAFA] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Preloader />
      <ScrollProgress />
      <Navbar />

      <Hero />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24 md:space-y-32 pb-32">
        {/* ─── About Section ─── */}
        <section id="about" className="scroll-mt-32">
          <SectionHeading title="About Me" subtitle="Who am I?" />
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-3 text-base md:text-lg text-slate-600 leading-relaxed space-y-5">
              <p>{PROFILE.about.intro}</p>
              <p>{PROFILE.about.philosophy}</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {[
                { value: "1.5+", label: "Years Exp", color: "text-indigo-600" },
                { value: "9", label: "Projects", color: "text-purple-600" },
                { value: "2×", label: "Competitions", color: "text-emerald-600" },
                { value: "2", label: "Organizations", color: "text-amber-600" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center cursor-default"
                >
                  <span className={`block text-3xl md:text-4xl font-bold mb-1 ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Journey Section (Tabbed) ─── */}
        <section id="experience" className="scroll-mt-32">
          <SectionHeading title="My Journey" subtitle="Experience & Background" />

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-10">
            {JOURNEY_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                    }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl"
            >
              {tabContent[activeTab].length > 0 ? (
                <Timeline items={tabContent[activeTab]} />
              ) : (
                <p className="text-slate-400 italic">No data available yet.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        <section id="skills" className="scroll-mt-32">
          <SectionHeading title="Technical Stack" subtitle="Skills & Tools" />
          <SkillGrid categories={skillCategories} />
          <LanguageCard />
        </section>

        <section id="projects" className="scroll-mt-32">
          <SectionHeading title="Featured Work" subtitle="Portfolio" />

          <div className="flex gap-2 mb-8">
            {(['All', 'Office', 'Personal', 'Campus'] as const).map(filter => (
              <motion.button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${projectFilter === filter
                  ? "text-white"
                  : "text-slate-500 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-700"
                  }`}
              >
                {projectFilter === filter && (
                  <motion.div
                    layoutId="projectFilterBg"
                    className="absolute inset-0 bg-slate-900 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={setSelectedProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-12 text-center">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
            >
              View more on GitHub <Github size={18} />
            </a>
          </div>
        </section>

        {/* ─── Contact Section ─── */}
        <section id="contact" className="scroll-mt-32 text-center max-w-2xl mx-auto">
          <SectionHeading title="Get In Touch" className="mb-8" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-slate-600 mb-10 px-2 sm:px-0"
          >
            Tertarik untuk berkolaborasi atau punya pertanyaan?
            Jangan ragu untuk menghubungi saya. Saya selalu terbuka untuk mendiskusikan proyek dan kesempatan baru.
          </motion.p>
          <div className="flex justify-center gap-6 sm:gap-8">
            {[
              { href: PROFILE.socials.email, icon: Mail, label: "Email" },
              { href: PROFILE.socials.linkedin, icon: Linkedin, label: "LinkedIn", external: true },
              { href: PROFILE.socials.github, icon: Github, label: "GitHub", external: true },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="p-4 bg-white border border-slate-200 rounded-full text-slate-600 group-hover:text-indigo-600 group-hover:border-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-100/50 transition-all duration-300">
                  <social.icon size={22} />
                </div>
                <span className="text-xs text-slate-400 group-hover:text-indigo-600 transition-colors font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-slate-400 text-xs sm:text-sm"
          >
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js, Tailwind & Framer Motion.
          </motion.p>
        </section>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}