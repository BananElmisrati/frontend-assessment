import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-GB", "ar-SA"], 
    defaultLocale: "en-GB",  
  },
};

export default nextConfig;
