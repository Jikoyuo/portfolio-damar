import type { Metadata, Viewport } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Damar — Web Developer & Go Enthusiast",
  description:
    "Chornael Damar Kesuma — frontend engineer building scalable interfaces and Go-powered backends from Yogyakarta.",
  metadataBase: new URL("https://damar-portfolio-jikoyuooos-projects.vercel.app"),
  openGraph: {
    title: "Damar — Web Developer",
    description: "Scalable interfaces. Deliberate motion. Go backends.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#111109" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${jetbrains.variable} grain antialiased bg-[var(--bg)] text-[var(--text)]`}>
        {children}
      </body>
    </html>
  );
}
