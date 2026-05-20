import { API_BASE, api, ApiProject } from "@/lib/api";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Craft from "@/components/sections/Craft";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export const revalidate = 60;

async function getProjects(): Promise<ApiProject[]> {
  try { return await api.listProjects(); }
  catch (err) { console.warn("[home] fetch projects failed:", err); return []; }
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Work projects={projects} apiBase={API_BASE} />
      <Craft />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
