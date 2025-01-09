import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "gogocdn.net" },
      { hostname: "s4.anilist.co" },
      { hostname: "localhost" },
      { hostname: "artworks.thetvdb.com" },
      { hostname: "media.kitsu.app" },
      { hostname: "mangadex.org" },
      { hostname: "cdn.noitatnemucod.net" },
    ],
  },
  env: {
  },
};

export default withPWA(nextConfig);
