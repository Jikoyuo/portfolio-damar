"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Briefcase, Code2, Award, Mail } from "lucide-react";

const NAV_ITEMS = [
    { name: "About", href: "#about", icon: User },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code2 },
    { name: "Projects", href: "#projects", icon: Award },
    { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const sectionIds = NAV_ITEMS.map(item => item.href.slice(1));
        const visibleSections = new Map<string, number>();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        visibleSections.set(entry.target.id, entry.intersectionRatio);
                    } else {
                        visibleSections.delete(entry.target.id);
                    }
                });

                if (visibleSections.size > 0) {
                    let bestSection = "";
                    let bestRatio = 0;
                    visibleSections.forEach((ratio, id) => {
                        if (ratio > bestRatio) {
                            bestRatio = ratio;
                            bestSection = id;
                        }
                    });
                    const atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100);
                    if (atBottom && visibleSections.has("contact")) {
                        setActiveSection("contact");
                    } else {
                        setActiveSection(bestSection);
                    }
                }
            },
            {
                threshold: [0, 0.1, 0.2, 0.3, 0.5],
                rootMargin: "-80px 0px -30% 0px",
            }
        );
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100);
            if (atBottom) {
                setActiveSection("contact");
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            setMobileMenuOpen(false);
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3 sm:py-4" : "bg-transparent py-5 sm:py-6"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setActiveSection("");
                        }}
                        className="text-base sm:text-xl font-bold tracking-tighter text-slate-900 z-50 truncate max-w-[200px] sm:max-w-none hover:text-indigo-600 transition-colors"
                    >
                        Chornael Damar K<span className="hidden sm:inline">esuma</span><span className="text-indigo-600">.</span>
                    </a>

                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.href.slice(1);
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "text-indigo-600"
                                        : "text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navActiveIndicator"
                                            className="absolute inset-0 bg-indigo-50 rounded-lg"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </a>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden z-50 p-2 text-slate-600 hover:text-indigo-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col justify-center items-center gap-6 md:hidden"
                    >
                        {NAV_ITEMS.map((item, i) => {
                            const isActive = activeSection === item.href.slice(1);
                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    className={`text-2xl font-bold flex items-center gap-4 px-6 py-3 rounded-xl transition-colors ${isActive
                                        ? "text-indigo-600 bg-indigo-50"
                                        : "text-slate-900 hover:text-indigo-600"
                                        }`}
                                >
                                    <item.icon size={24} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                                    {item.name}
                                </motion.a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
