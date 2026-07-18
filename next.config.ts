import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // { protocol: "https", hostname: "cdn.waifu.im" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "nekos.best" },

    ],
  },
};

export default nextConfig;
