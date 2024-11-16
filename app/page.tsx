"use client";

import Header from "@/components/blocks/home/Header";
import Banner from "@/components/blocks/home/Banner";
import ContentTable from "../components/blocks/home/ContentTable/index";
import getTrendingAnime from "@/lib/services/anime/getTrending";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { IAnimeResult, IMangaResult, MediaStatus } from "@consumet/extensions";
import getTrendingManga from "@/lib/services/manga/getTrending";
import getTrendingMovies from "@/lib/services/movies/getTrending";

export default function Home() {
  const { data: trendingAnimes, isLoading: trendingAnimeLoading } = useQuery({
    queryFn: getTrendingAnime,
    queryKey: ["trending-anime"],
    staleTime: ms("12h"),
  });

  // const { data: trendingMangas, isLoading: trendingMangaLoading } = useQuery({
  //   queryFn: getTrendingManga,
  //   queryKey: ["trending-manga"],
  //   staleTime: ms("12h"),
  // });

  // const { data: trendingMovies, isLoading: trendingMoviesLoading } = useQuery({
  //   queryFn: getTrendingMovies,
  //   queryKey: ["trending-movies"],
  //   staleTime: ms("12h"),
  // });

  return (
    <>
      <div className="flex flex-col gap-3">
        <Header />
        {trendingAnimeLoading ? null : <Banner data={trendingAnimes} />}

        <div className="flex flex-col gap-4 p-4 min-h-1/2">
          {!trendingAnimeLoading &&
          // !trendingMangaLoading &&
          // !trendingMoviesLoading &&
          trendingAnimes ? (
            // && trendingMangas &&
            // trendingMovies
            <>
              <ContentTable
                title="Trending Anime"
                type="anime"
                data={trendingAnimes.filter(
                  (e: IAnimeResult) => e.status !== MediaStatus.NOT_YET_AIRED
                )}
              />

              {/* <ContentTable
                title="Trending Manga"
                type="manga"
                data={trendingMangas.filter(
                  (e: IMangaResult) => e.status !== MediaStatus.NOT_YET_AIRED
                )}
              />
              <ContentTable
                title="Trending Movies"
                type="movie"
                data={trendingMovies.filter(
                  (e: IMangaResult) => e.status !== MediaStatus.NOT_YET_AIRED
                )}
              /> */}
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
