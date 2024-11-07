import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      hostname: "gogocdn.net"
    }, {
      hostname: "s4.anilist.co"
    }]
  }
};

export default nextConfig;
