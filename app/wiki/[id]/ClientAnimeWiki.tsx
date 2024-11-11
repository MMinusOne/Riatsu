"use client";

import Header from "@/components/blocks/home/Header";
import getInfo from "@/components/lib/services/anime/getInfo";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";

export function ClientAnimeWiki(props: { id: string }) {
  const { id } = props;
  const {
    data: animeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["anime", id],
    queryFn: () => getInfo(id),
  });

  console.log(animeData);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="relative">
      <Header />
      <div className="relative w-full h-[400px]">
        <NextImage
          src={animeData.cover}
          alt={animeData.title}
          fill
          className="opacity-80 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-base-100/60 to-transparent" />
      </div>

      <div className="relative z-10 -mt-32 px-6">
        <div className="flex gap-8">
          <div className="flex-shrink-0">
            <NextImage
              src={animeData.image}
              alt={animeData.title}
              width={220}
              height={300}
              className="opacity-90 shadow-lg rounded-lg"
            />
          </div>

          <div>
            <h1 className="mb-2 font-bold text-4xl">{animeData.title}</h1>
            <h2 className="mb-4 text-xl">{animeData.originalTitle}</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐ {animeData.rating}</span>
                <span className="bg-green-500 px-2 py-1 rounded text-sm">
                  {animeData.status}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="rounded-full font-medium btn btn-outline btn-secondary">
                Play Now
              </button>
              <button className="border-white px-6 py-2 border rounded-full font-medium">
                Add to List
              </button>
              <button className="rounded-full font-medium btn btn-outline">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
