"use client";

import Header from "@/components/misc/Header";
import getAnimeInfo from "@/lib/services/anime/getInfo";
import getMangaInfo from "@/lib/services/manga/getInfo";
import getMovieInfo from "@/lib/services/movies/getInfo";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export function ClientWiki(props: {
  id: string;
  type: "manga" | "movie" | "anime";
}) {
  const { id } = props;
  const {
    data: contentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["info", id],
    queryFn: () =>
      props.type === "anime"
        ? getAnimeInfo(id)
        : props.type === "manga"
        ? getMangaInfo(id)
        : getMovieInfo(id),
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Header />

      <div className="relative w-full h-[400px]">
        <NextImage
          unoptimized
          src={contentData.anilistInfo.cover}
          alt={contentData.zoroInfo.title}
          fill
          className="opacity-80 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-base-100/60 to-transparent" />
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="relative z-10 -mt-32 px-6">
          <div className="flex gap-8">
            <div className="flex-shrink-0">
              <NextImage
                unoptimized
                src={contentData.zoroInfo.image}
                alt={contentData.zoroInfo.title}
                width={220}
                height={300}
                className="opacity-90 shadow-lg rounded-lg"
              />
            </div>

            <div>
              <h1 className="mb-2 font-bold text-4xl">
                {contentData.zoroInfo.title}
              </h1>
              <h2 className="mb-4 text-xl">
                {contentData.anilistInfo.originalTitle}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="flex justify-center items-center gap-2 text-center text-xl">
                    <FaStar /> {contentData.anilistInfo.rating}
                  </span>
                  <span className="bg-primary px-2 py-1 rounded text-sm">
                    {contentData.anilistInfo.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/watch/anime/${contentData.zoroInfo.id}`}
                  className="bg-opacity-30 backdrop-blur-md rounded-md font-medium btn btn-primary"
                >
                  Play Now
                </Link>
                <button className="bg-opacity-30 backdrop-blur-md rounded-md font-medium btn btn-secondary">
                  Add to List
                </button>
                <button className="bg-opacity-30 backdrop-blur-md rounded-md font-medium btn btn-secondary">
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-10 w-full"></div>
      </div>
    </>
  );
}
