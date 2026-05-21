import { api, ApiProject } from "@/lib/api";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Path from "@/components/sections/Path";
import Contact from "@/components/sections/Contact";

export const revalidate = 60;

async function getProjects(): Promise<ApiProject[]> {
  try {
    return await api.listProjects();
  } catch (err) {
    console.warn("[home] fetch projects failed:", err);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <SmoothScroll>
      <Cursor />
      <ScrollProgress />
      <SiteHeader />
      <main className="relative">
        <Hero />
        <About />
        <Work projects={projects} />
        <Path />
        <Contact />
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
