"use client";

import Header from "@/components/blocks/home/Header";
import Banner from "@/components/blocks/home/Banner";
import AnimeTable from "../components/blocks/home/AnimeTable/index";
import getTrending from "@/components/lib/services/getTrending";
import getAiring from "@/components/lib/services/getAiring";
import { useQuery } from "@tanstack/react-query";
import AnimeMap from "@/components/blocks/home/AnimeMap";
import ms from "ms";
import { IAnimeResult } from "@consumet/extensions";

export default function Home() {
  const { data: trendingAnimes, isLoading: trendingAnimeLoading } = useQuery({
    queryFn: getTrending,
    queryKey: ["trending"],
    staleTime: ms("12h"),
  });

  const { data: topAiringAnimes, isLoading: topAiringLoading } = useQuery({
    queryFn: getAiring,
    queryKey: ["airing"],
    staleTime: ms("12h"),
  });

  return (
    <>
      <div className="flex flex-col gap-3">
        <Header />
        {trendingAnimeLoading ? null : <Banner data={trendingAnimes} />}

        {trendingAnimeLoading ? null : (
          <AnimeTable
            title="Trending"
            data={trendingAnimes.filter(
              (e: IAnimeResult) => e.status !== "NOT_YET_RELEASED"
            )}
          />
        )}

        {/* <Comments /> */}
      </div>
    </>
  );
}
