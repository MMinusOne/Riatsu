"use client";

import Header from "@/components/blocks/home/Header";
import AnimeTable from "../components/blocks/home/AnimeTable/index";
import getTrending from "@/components/lib/services/getTrending";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export default function Home() {
  const { data: trendingAnimes, isLoading: trendingAnimeLoading } = useQuery({
    queryFn: getTrending,
    queryKey: ["trending"],
    staleTime: ms("12h"),
  });

  return (
    <>
      <Header />
      {/* <Banner /> */}
      {trendingAnimeLoading ? null : <AnimeTable title="Trending" data={trendingAnimes} />}
      {/* <Comments /> */}
      {/* <AnimeTable /> */}
    </>
  );
}
