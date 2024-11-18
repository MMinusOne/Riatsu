"use client";

import ConfigurationDisplay from "@/components/watch/ConfigurationDisplay/page";
import getEpisodesInfo from "@/lib/services/anime/getEpisdesInfo";
import EpisodeDisplay from "@/components/watch/EpisodeDisplay";
import ServerDisplay from "@/components/watch/ServerDisplay";
import VideoDisplay from "@/components/watch/VideoDisplay";
import InfoDisplay from "@/components/watch/InfoDisplay";
import getAnimeInfo from "@/lib/services/anime/getInfo";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import axios from "axios";
import ms from "ms";
import {
  ContentEnvironmentState,
  PostiveEpisodeMeta,
  SERVER_NAME,
} from "@/types";
import { useRouter } from "next/navigation";

export default function WatchPageContent({
  id,
  ep,
}: {
  id: string;
  ep: number;
}) {
  const router = useRouter();
  if (!id) {
    router.push("/");
  }

  if (!ep) {
    router.push(`/watch/anime/${id}?ep=1`);
  }
  const { data: animeData, isLoading: animeInfoLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
  });

  const { data: episodesData, isLoading: episodeDataLoading } = useQuery({
    queryKey: ["episodes-info", id],
    queryFn: () => getEpisodesInfo(id),
    staleTime: ms("1h"),
  });

  const [contentEnvironment, setContentEnvironment] =
    useState<ContentEnvironmentState>({
      episode: {
        loadingEpisode: true,
        meta: null,
        episodeIndex: null,
      },
      stream: {
        loadingStream: true,
        meta: null,
        proxiedStream: null,
        currentStream: null,
        streams: [],
        subtitles: [],
      },
      videoControls: {
        autoSkipIntro: false,
        autoSkipOutro: false,
        server: SERVER_NAME.ZORO,
      },
    });

  console.log(contentEnvironment);

  useEffect(() => {
    const stream = contentEnvironment?.stream;
    if (!stream?.currentStream) return;
    const { url: streamUrl } = contentEnvironment?.stream?.currentStream!;
    if (!streamUrl) return;

    const proxySearchParams = new URLSearchParams();
    proxySearchParams.set("url", streamUrl);
    proxySearchParams.set(
      "headers",
      JSON.stringify({
        referrer: "https://hianime.to",
        // origin: "https://hianime.to",
      })
    );

    const proxiedStream = `${process.env.NEXT_M3U8_PROXY}/m3u8-proxy?${proxySearchParams}`;
    setContentEnvironment({
      ...contentEnvironment,
      stream: {
        ...contentEnvironment.stream,
        proxiedStream,
      },
    });
  }, [contentEnvironment.stream.currentStream]);

  const getEpisodeInfo = async () => {
    if (contentEnvironment?.episode?.meta?.id) {
      try {
        const { data: streams } = await axios.post(
          `/api/anime/episodes/stream/`,
          {
            episodeId: contentEnvironment?.episode?.meta?.id,
          }
        );
        setContentEnvironment({
          ...contentEnvironment,
          stream: {
            ...contentEnvironment.stream,
            loadingStream: false,
            streams: streams?.sources || [],
            currentStream: streams?.sources?.at(0) || null,
            subtitles: streams?.subtitles || [],
            meta: {
              intro: streams.intro || 0,
              outro: streams?.outro || 0,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching episode info:", error);
        setContentEnvironment({
          ...contentEnvironment,
          stream: {
            ...contentEnvironment.stream,
            loadingStream: true,
          },
        });
      }
    }
  };

  useEffect(() => {
    getEpisodeInfo();
  }, [animeInfoLoading]);

  useEffect(() => {
    if (episodeDataLoading) return;
    const episodeIndex = Number(ep) - 1;
    const episodeData = episodesData.at(episodeIndex);
    if (!episodeData) {
      router.push(`/watch/anime/${id}?ep=1`);
      return;
    }
    setContentEnvironment((prev) => ({
      ...prev,
      episode: {
        loadingEpisode: false,
        episodeIndex: episodeIndex,
        meta: episodesData?.at(episodeIndex),
      },
    }));
  }, [episodesData, episodeDataLoading, ep, id, router]);

  if (animeInfoLoading || episodeDataLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-base-100/60 to-transparent" />
        <NextImage
          unoptimized
          src={animeData.cover}
          fill
          alt="Background"
          className="absolute inset-0 opacity-20 blur-xl w-full h-full object-cover scale-110"
        />
      </div>

      <div className="relative opacity-80 min-h-screen">
        <div className="p-4 text-sm breadcrumbs">
          <ul>
            <li>
              <a>{animeData.title}</a>
            </li>
            {contentEnvironment?.episode.episodeIndex ? (
              <li>Episode. {contentEnvironment.episode.episodeIndex + 1}</li>
            ) : null}
          </ul>
        </div>

        <div className="flex gap-4 p-4">
          {!contentEnvironment.episode.loadingEpisode ? (
            <EpisodeDisplay
              episodesData={episodesData}
              selectedEpisode={contentEnvironment?.episode}
              onEpisodeSelect={(
                episodeData: PostiveEpisodeMeta,
                episodeIndex: number
              ) => {
                router.push(`/watch/anime/${id}?ep=${episodeIndex + 1}`);
                window.location.reload();
              }}
            />
          ) : null}

          <div className="flex-1">
            <VideoDisplay
              contentEnvironment={contentEnvironment}
              animeData={animeData}
            />
            <ConfigurationDisplay
              contentEnvironment={contentEnvironment}
              onSelectAutoSkipIntro={() => {}}
              onSelectAutoSkipOutro={() => {}}
            />
            <ServerDisplay
              contentEnvironment={contentEnvironment}
              selectedServer={SERVER_NAME.ZORO}
              onServerSelect={() => {}}
            />
          </div>

          <InfoDisplay animeData={animeData} />
        </div>
      </div>
    </div>
  );
}
