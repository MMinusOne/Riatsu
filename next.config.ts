import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "gogocdn.net" },
      { hostname: "s4.anilist.co" },
      { hostname: "localhost" },
      { hostname: "artworks.thetvdb.com" },
      { hostname: "media.kitsu.app" },
      { hostname: "mangadex.org" },
    ],
  },
};

export default nextConfig;
