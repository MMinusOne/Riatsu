"use client";

import ConfigurationDisplay from "@/components/watch/ConfigurationDisplay/page";
import EpisodeDisplay from "@/components/watch/EpisodeDisplay";
import ServerDisplay from "@/components/watch/ServerDisplay";
import VideoDisplay from "@/components/watch/VideoDisplay";
import InfoDisplay from "@/components/watch/InfoDisplay";
import getAnimeInfo from "@/lib/services/anime/getInfo";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import axios from "axios";
import {
  ContentEnvironmentState,
  PostiveEpisodeMeta,
  SUB_OR_DUB,
} from "@/types";
import { useRouter } from "next/navigation";
import servers from "@/constants/servernames";
import useVideoControlsStore from "@/components/state/videoControlsStore";
import Loading from "@/app/loading";

export default function WatchPageContent({
  id,
  ep,
}: {
  id: string;
  ep: number;
}) {
  const router = useRouter();
  const preVideoControls = useVideoControlsStore();

  useEffect(() => {
    if (!id || !ep || ep <= 0) {
      router.push(`/watch/anime/${id}?ep=1`);
    }
  }, [id, ep, router]);

  const { data: animeData, isLoading: animeDataLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
  });

  const [contentEnvironment, setContentEnvironment] = useState<ContentEnvironmentState>({
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
      autoSkipIntro: preVideoControls.autoSkipIntro,
      autoSkipOutro: preVideoControls.autoSkipOutro,
      server: preVideoControls.server?.id ? preVideoControls.server : servers.VIDCLOUD_SUB,
    },
  });

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (episodes.length > 0 && !episodes.at(ep)) {
      router.push(`/watch/anime/${id}?ep=1`);
    }
  }, [id, episodes, ep, router]);

  useEffect(() => {
    if (animeDataLoading) return;
    const { server } = preVideoControls;
    if (!server.available) return;

    setContentEnvironment((prev) => ({
      ...prev,
      videoControls: {
        ...prev.videoControls,
        server,
      },
    }));

    const { subEpisodes, dubEpisodes } = animeData;
    setEpisodes(server.SUB_OR_DUB === SUB_OR_DUB.DUB ? dubEpisodes : subEpisodes);
  }, [animeData, animeDataLoading, preVideoControls.server]);

  useEffect(() => {
    const stream = contentEnvironment.stream;
    if (!stream.currentStream) return;

    const { url: streamUrl } = stream.currentStream;
    if (!streamUrl) return;

    const proxySearchParams = new URLSearchParams({
      url: streamUrl,
      headers: JSON.stringify({ referrer: "https://hianime.to" }),
    });

    const proxiedStream = `${process.env.NEXT_M3U8_PROXY}/m3u8-proxy?${proxySearchParams}`;

    setContentEnvironment((prev) => ({
      ...prev,
      stream: {
        ...prev.stream,
        proxiedStream,
      },
    }));
  }, [contentEnvironment.stream.currentStream]);

  const getEpisodeInfo = async (episodeId: string) => {
    if (!episodeId) return;

    try {
      const { data: streams } = await axios.post(`/api/anime/episodes/stream/`, {
        episodeId,
        server: preVideoControls.server.serverDefinition,
      });
      setContentEnvironment((prev) => ({
        ...prev,
        stream: {
          ...prev.stream,
          loadingStream: false,
          streams: streams?.sources || [],
          currentStream: streams?.sources?.[0] || null,
          subtitles: streams?.subtitles || [],
          meta: {
            intro: streams.intro || 0,
            outro: streams.outro || 0,
          },
        },
      }));
    } catch (error) {
      console.error("Error fetching episode info:", error);
      setContentEnvironment((prev) => ({
        ...prev,
        stream: {
          ...prev.stream,
          loadingStream: true,
        },
      }));
    }
  };

  useEffect(() => {
    const currentEpisodeId = contentEnvironment.episode.meta?.id;
    if (currentEpisodeId) {
      getEpisodeInfo(currentEpisodeId);
    }
  }, [ep, contentEnvironment.episode.meta, animeDataLoading]);

  useEffect(() => {
    if (animeDataLoading) return;
    const episodeIndex = Number(ep) - 1;
    const episodeData = episodes.at(episodeIndex);
    if (!episodeData) {
      router.push(`/watch/anime/${id}?ep=1`);
      return;
    }
    setContentEnvironment((prev) => ({
      ...prev,
      episode: {
        loadingEpisode: false,
        episodeIndex,
        meta: episodeData,
      },
    }));
  }, [animeData, episodes, animeDataLoading, ep, id, router]);

  if (animeDataLoading) {
    return <Loading headless={true} />;
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <NextImage
          unoptimized
          src={animeData.anilistInfo?.cover || animeData.zoroInfo?.image}
          fill
          alt="Background"
          className="absolute inset-0 opacity-20 blur-xl object-cover scale-110"
        />
      </div>

      <div className="relative opacity-80 min-h-screen">
        <div className="p-4 text-sm breadcrumbs">
          <ul>
            <li>
              <a>{animeData?.zoroInfo?.title}</a>
            </li>
            {contentEnvironment.episode.episodeIndex !== null && (
              <li>Episode {contentEnvironment.episode.episodeIndex + 1}</li>
            )}
          </ul>
        </div>

        <div className="flex lg:flex-row flex-col gap-4 p-4">
          <div className="flex md:flex-row flex-col-reverse gap-4 w-full">
            {episodes.length && !contentEnvironment.episode.loadingEpisode && (
              <EpisodeDisplay
                episodesData={episodes}
                selectedEpisode={contentEnvironment.episode}
                onEpisodeSelect={(episodeData, episodeIndex) => {
                  if (episodeIndex === contentEnvironment.episode.episodeIndex) return;
                  setContentEnvironment((prev) => ({
                    ...prev,
                    episode: {
                      loadingEpisode: true,
                      meta: null,
                      episodeIndex: null,
                    },
                  }));
                  router.push(`/watch/anime/${id}?ep=${episodeIndex + 1}`);
                }}
              />
            )}

            <div className="flex-1">
              <VideoDisplay
                contentEnvironment={contentEnvironment}
                animeData={animeData.anilistInfo}
              />
              <ConfigurationDisplay
                contentEnvironment={contentEnvironment}
                onSelectAutoSkipIntro={preVideoControls.setAutoSkipIntro}
                onSelectAutoSkipOutro={preVideoControls.setAutoSkipOutro}
                onClickNext={() => {
                  if (contentEnvironment.episode.loadingEpisode) return;
                  const nextEpisodeNumber = Number(ep) + 1;
                  if (!episodes.at(nextEpisodeNumber)) return;
                  router.push(`/watch/anime/${id}?ep=${nextEpisodeNumber}`);
                }}
                onClickPrevious={() => {
                  if (contentEnvironment.episode.loadingEpisode) return;
                  const nextEpisodeNumber = Number(ep) - 1;
                  if (!episodes.at(nextEpisodeNumber)) return;
                  router.push(`/watch/anime/${id}?ep=${nextEpisodeNumber}`);
                }}
              />
              <ServerDisplay
                contentEnvironment={contentEnvironment}
                selectedServer={contentEnvironment.videoControls.server}
                onServerSelect={(server) => {
                  preVideoControls.setServer(servers[server.id]);
                }}
              />
            </div>
          </div>

          <InfoDisplay animeData={animeData.anilistInfo} />
        </div>
      </div>
    </div>
  );
}
