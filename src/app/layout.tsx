import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Damar — Frontend Engineer · Yogyakarta",
  description:
    "Chornael Damar Kesuma. Frontend engineer building scalable React/Next.js interfaces and the patient Go systems behind them.",
  metadataBase: new URL("https://damar-portfolio-three.vercel.app"),
  openGraph: {
    title: "Damar — Frontend Engineer",
    description: "Hand-crafted interfaces, deliberate motion, scalable code.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#F2EDE4" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} grain`}
      >
        {children}
      </body>
    </html>
  );
}
