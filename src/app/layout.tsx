import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Damar — Selected Works & Field Notes",
  description:
    "Chornael Damar Kesuma — web developer & Go enthusiast. Hand-crafted interfaces, deliberate motion, scalable code.",
  metadataBase: new URL("https://damar-portfolio.vercel.app"),
  openGraph: {
    title: "Damar — Selected Works",
    description: "Hand-crafted interfaces, deliberate motion, scalable code.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F1ECE3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrains.variable} antialiased bg-[var(--bone)] text-[var(--ink)]`}
      >
        {children}
      </body>
    </html>
  );
}
