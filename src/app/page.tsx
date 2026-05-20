import { API_BASE, api, ApiProject } from "@/lib/api";
import Cursor from "@/components/Cursor";
import TopStrip from "@/components/TopStrip";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Craft from "@/components/sections/Craft";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

// ISR: refresh every 60s. The admin can still call revalidate via tag if needed.
export const revalidate = 60;

async function getProjects(): Promise<ApiProject[]> {
  try {
    return await api.listProjects();
  } catch (err) {
    // Fail soft — render empty Work section rather than crashing the page.
    console.warn("[home] failed to fetch projects:", err);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="paper relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <Cursor />
      <TopStrip />
      <Nav />

      <Hero />
      <About />
      <Journey />
      <Craft />
      <Work projects={projects} apiBase={API_BASE} />
      <Contact />

      <Footer />
    </main>
  );
}
