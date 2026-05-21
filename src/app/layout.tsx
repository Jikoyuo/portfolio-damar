import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chornael Damar Kesuma",
  description:
    "Web developer & Go enthusiast based in Yogyakarta. Building scalable interfaces and the quiet systems behind them.",
  metadataBase: new URL("https://damar-portfolio-jikoyuooos-projects.vercel.app"),
  openGraph: {
    title: "Chornael Damar Kesuma",
    description: "Web developer & Go enthusiast based in Yogyakarta.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#FAFAFA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
