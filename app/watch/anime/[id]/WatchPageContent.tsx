"use client";

import getEpisodesInfo from "@/lib/services/anime/getEpisdesInfo";
import getAnimeInfo from "@/lib/services/anime/getInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ms from "ms";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import EpisodeDisplay from "@/components/watch/EpisodeDisplay";
import VideoDisplay from "@/components/watch/VideoDisplay";
import ConfigurationDisplay from "@/components/watch/ConfigurationDisplay/page";
import ServerDisplay from "@/components/watch/ServerDisplay";
import InfoDisplay from "@/components/watch/InfoDisplay";

export default function WatchPageContent({ id }: { id: string }) {
  const proxyHost = `https://m3u8-proxy-six.vercel.app`;

  const { data: animeData, isLoading: animeInfoLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
  });

  const { data: episodesData, isLoading: episodeDataLoading } = useQuery({
    queryKey: ["episodes-info", id],
    queryFn: () => getEpisodesInfo(id),
    staleTime: ms("1h"),
  });

  console.log({ episodesData }, episodeDataLoading);

  const [streamSettings, setStreamSettings] = useState({
    episode: {
      streams: [] as Array<any>,
      stream: null,
      proxiedStream: null,
      loadingStream: true,
      meta: episodesData?.at(0),
      streamMeta: {},
      episodeIndex: 0,
    },
    videoControls: {
      autoSkipIntro: false,
      autoSkipOutro: false,
      server: { id: "zoro", name: "Zoro" },
    },
  });

  useEffect(() => {
    if (!streamSettings.episode.stream?.url) return;

    const streamUrl = streamSettings.episode.stream.url;

    const proxySearchParams = new URLSearchParams();
    proxySearchParams.set("url", streamUrl);
    proxySearchParams.set(
      "headers",
      JSON.stringify({
        referrer: "https://hianime.to",
        origin: "https:///hianime.to",
      })
    );

    const proxiedStream = `${proxyHost}/m3u8-proxy?${proxySearchParams}`;
    setStreamSettings({
      ...streamSettings,
      episode: { ...streamSettings.episode, proxiedStream },
    });
  }, [streamSettings.episode.stream?.url]);

  const getEpisodeInfo = async () => {
    if (streamSettings?.episode?.meta?.id) {
      setStreamSettings((prev) => ({
        ...prev,
        episode: {
          ...prev.episode,
          loadingStream: true,
        },
      }));
      try {
        const { data: streams } = await axios.post(
          `/api/anime/episodes/stream/`,
          {
            episodeId: streamSettings?.episode?.meta?.id,
          }
        );
        console.log({ streams });
        setStreamSettings((prev) => ({
          ...prev,
          episode: {
            ...prev.episode,
            loadingStream: false,
            streams: streams?.sources || [],
            stream: streams?.sources?.at(0) || null,
            subtitles: streams?.subtitles || [],
            streamMeta: {
              intro: streams.intro || 0,
              outro: streams?.outro || 0,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching episode info:", error);
        setStreamSettings((prev) => ({
          ...prev,
          episode: {
            ...prev.episode,
            loadingStream: false,
          },
        }));
      }
    }
  };

  useEffect(() => {
    getEpisodeInfo();
  }, [streamSettings?.episode?.meta?.id, animeInfoLoading]);

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
            <li>Episode. {streamSettings.episode.episodeIndex + 1}</li>
          </ul>
        </div>

        <div className="flex gap-4 p-4">
          <EpisodeDisplay
            episodesData={episodesData}
            selectedEpisode={streamSettings?.episode}
            onEpisodeSelect={(episodeData, episodeIndex) => {
              console.log({ episodeData });
              setStreamSettings((prev) => ({
                ...prev,
                episode: {
                  episodeIndex,
                  meta: episodesData?.at(episodeIndex),
                  loadingStream: true,
                  stream: null,
                  streams: [],
                  proxiedStream: null,
                  streamMeta: {},
                },
              }));
            }}
          />

          <div className="flex-1">
            <VideoDisplay streamSettings={streamSettings} />
            <ConfigurationDisplay
              streamSettings={streamSettings}
              onSelectAutoSkipIntro={() => {}}
              onSelectAutoSkipOutro={() => {}}
            />
            <ServerDisplay
              streamSettings={streamSettings}
              onSelectServer={() => {}}
            />
          </div>

          <InfoDisplay animeData={animeData} />
        </div>
      </div>
    </div>
  );
}
