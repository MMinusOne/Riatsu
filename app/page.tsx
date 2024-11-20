"use client";

import { IAnimeResult, MediaStatus } from "@consumet/extensions";
import ContentTable from "@/components/home/ContentTable/index";
import getTrendingAnime from "@/lib/services/anime/getTrending";
import Header from "@/components/home/Header";
import Banner from "@/components/home/Banner";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import getSpotlightAnime from "@/lib/services/anime/getSpotlight";

export default function Home() {
  const { data: trendingAnimes, isLoading: trendingAnimeLoading } = useQuery({
    queryFn: getTrendingAnime,
    queryKey: ["trending-anime"],
    staleTime: ms("12h"),
  });
  const { data: spotlightAnimes, isLoading: spotlightAnimeLoading } = useQuery({
    queryFn: getSpotlightAnime,
    queryKey: ["spotlight-anime"],
    staleTime: ms("12h"),
  });
  return (
    <>
      <div className="flex flex-col gap-3">
        <Header />
        {spotlightAnimeLoading ? null : <Banner data={spotlightAnimes} />}

        <div className="flex flex-col gap-4 p-4 min-h-1/2">
          {!trendingAnimeLoading && trendingAnimes ? (
            <>
              <ContentTable
                title="Trending Anime"
                type="anime"
                data={trendingAnimes.filter(
                  (e: IAnimeResult) => e.status !== MediaStatus.NOT_YET_AIRED
                )}
              />
            </>
          ) : (
            <>
              <div className="flex justify-center items-center w-full h-full">
                <span className="loading loading-lg loading-spinner"></span>
              </div>
            </>
          )}
        </div>

        {/* <Comments /> */}
      </div>
    </>
  );
}
