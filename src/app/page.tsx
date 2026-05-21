import { api, ApiProject } from "@/lib/api";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import WorkList from "@/components/sections/WorkList";
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
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5">
        <Intro />
        <hr className="border-[var(--border)]" />
        <About />
        <hr className="border-[var(--border)]" />
        <WorkList projects={projects} />
        <hr className="border-[var(--border)]" />
        <Path />
        <hr className="border-[var(--border)]" />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
