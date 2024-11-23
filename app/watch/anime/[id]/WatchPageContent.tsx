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
    if (!id) {
      router.push("/");
    } else if (!ep || !Number(ep) || ep <= 0) {
      router.push(`/watch/anime/${id}?ep=1`);
    }
  }, [id, ep, router]);

  const { data: animeData, isLoading: animeDataLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
  });
   console.log(Object.values(servers).find(
    (e) => preVideoControls.server.id === e.id
  )
    ? preVideoControls.server
    : servers.VIDCLOUD_SUB);
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
        autoSkipIntro: preVideoControls.autoSkipIntro,
        autoSkipOutro: preVideoControls.autoSkipOutro,
        server: Object.values(servers).find(
          (e) => preVideoControls.server.id === e.id
        )
          ? preVideoControls.server
          : servers.VIDCLOUD_SUB,
      },
    });

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (episodes.length > 0 && !episodes.at(ep)) {
      router.push(`/watch/anime/${id}?ep=1`);
    }
  }, [id, episodes]);

  useEffect(() => {
    if (animeDataLoading) return;
    const { server } = preVideoControls;
    if (!server.available) return;
    setContentEnvironment((prev) => ({
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
        ...prev.videoControls,
        server,
      },
    }));
    setEpisodes([]);
    const { subEpisodes, dubEpisodes } = animeData;
    switch (server.SUB_OR_DUB) {
      case SUB_OR_DUB.DUB:
        setEpisodes(dubEpisodes);
        break;
      case SUB_OR_DUB.SUB:
        setEpisodes(subEpisodes);
        break;
    }
  }, [animeData, animeDataLoading, preVideoControls]);

  useEffect(() => {
    const stream = contentEnvironment?.stream;
    if (!stream?.currentStream) return;
    const { url: streamUrl } = stream.currentStream;
    if (!streamUrl) return;

    const proxySearchParams = new URLSearchParams();
    proxySearchParams.set("url", streamUrl);
    proxySearchParams.set(
      "headers",
      JSON.stringify({
        referrer: "https://hianime.to",
      })
    );

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
      const { data: streams } = await axios.post(
        `/api/anime/episodes/stream/`,
        {
          episodeId,
          server: preVideoControls.server.serverDefinition,
        }
      );
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
        episodeIndex: episodeIndex,
        meta: episodeData,
      },
      videoControls: {
        autoSkipIntro: preVideoControls.autoSkipIntro,
        autoSkipOutro: preVideoControls.autoSkipOutro,
        server: preVideoControls.server,
      },
    }));
  }, [animeData, episodes, animeDataLoading, ep, id, router, preVideoControls]);

  if (animeDataLoading) {
    return <Loading headless={true} />;
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-base-100/60 to-transparent" />
        <NextImage
          unoptimized
          src={animeData.anilistInfo?.cover || animeData.zoroInfo?.image}
          fill
          alt="Background"
          className="absolute inset-0 opacity-20 blur-xl w-full h-full object-cover scale-110"
        />
      </div>

      <div className="relative opacity-80 min-h-screen">
        <div className="p-4 text-sm breadcrumbs">
          <ul>
            <li>
              <a>{animeData.zoroInfo.title}</a>
            </li>
            {contentEnvironment.episode.episodeIndex !== null ? (
              <li>Episode. {contentEnvironment.episode.episodeIndex + 1}</li>
            ) : null}
          </ul>
        </div>

        <div className="flex lg:flex-row flex-col gap-4 p-4">
          <div className="flex md:flex-row flex-col-reverse gap-[inherit] w-full">
            {episodes.length && !contentEnvironment.episode.loadingEpisode ? (
              <EpisodeDisplay
                episodesData={episodes}
                selectedEpisode={contentEnvironment.episode}
                onEpisodeSelect={(
                  episodeData: PostiveEpisodeMeta,
                  episodeIndex: number
                ) => {
                  if (episodeIndex === contentEnvironment.episode.episodeIndex)
                    return;
                  setContentEnvironment((prev) => ({
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
                      server: preVideoControls.server,
                    },
                  }));
                  router.push(`/watch/anime/${id}?ep=${episodeIndex + 1}`);
                }}
              />
            ) : null}

            <div className="flex-1">
              <VideoDisplay
                contentEnvironment={contentEnvironment}
                animeData={animeData.anilistInfo}
              />
              <ConfigurationDisplay
                contentEnvironment={contentEnvironment}
                onSelectAutoSkipIntro={(selected) => {
                  preVideoControls.setAutoSkipIntro(selected);
                }}
                onSelectAutoSkipOutro={(selected) => {
                  preVideoControls.setAutoSkipOutro(selected);
                }}
                onClickNext={() => {
                  if (contentEnvironment.episode.loadingEpisode) return;
                  const currentUrl = new URL(window.location.href);
                  const nextEpisodeNumber = Number(ep) + 1;
                  if (!episodes.at(nextEpisodeNumber)) return;
                  currentUrl.searchParams.set(
                    "ep",
                    nextEpisodeNumber.toString()
                  );
                  router.push(currentUrl.toString());
                }}
                onClickPrevious={() => {
                  if (contentEnvironment.episode.loadingEpisode) return;
                  const currentUrl = new URL(window.location.href);
                  const nextEpisodeNumber = Number(ep) - 1;
                  if (!episodes.at(nextEpisodeNumber)) return;
                  currentUrl.searchParams.set(
                    "ep",
                    nextEpisodeNumber.toString()
                  );
                  router.push(currentUrl.toString());
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
