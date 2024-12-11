import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  generateBuildId: async () => {
    return process.env.GIT_HASH || "local-build";
  },
};

export default nextConfig;
