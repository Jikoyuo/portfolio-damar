import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

let apiHost = "localhost";
let apiProtocol: "http" | "https" = "http";
try {
  const u = new URL(apiUrl);
  apiHost = u.hostname;
  apiProtocol = u.protocol === "https:" ? "https" : "http";
} catch {
  /* fall back to defaults */
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: apiProtocol, hostname: apiHost },
      { protocol: "https", hostname: "*.run.app" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.imgur.com" },
    ],
  },
};

export default nextConfig;
