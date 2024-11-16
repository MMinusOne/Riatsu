"use client";

import getEpisodesInfo from "@/lib/services/anime/getEpisdesInfo";
import getAnimeInfo from "@/lib/services/anime/getInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ms from "ms";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NextVideo from "next-video";
import Hls from "hls.js";

export default function WatchPageContent({ id }: { id: string }) {
  const videoStreamRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const corsProxy = "https://cors-anywhere.herokuapp.com/";

  const { data: animeData, isLoading: animeInfoLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
  });

  const { data: episodeIdData, isLoading: episodeDataLoading } = useQuery({
    queryKey: ["episodes-info", id],
    queryFn: () => getEpisodesInfo(id),
    staleTime: ms("1h"),
  });

  const [streamSettings, setStreamSettings] = useState({
    episode: {
      streams: [] as Array<any>,
      stream: null,
      loadingStream: true,
      id: episodeIdData?.[0] || null,
      episodeIndex: 0,
    },
    videoControls: {},
  });

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!streamSettings.episode.stream?.url || !videoStreamRef.current) return;
    const video = videoStreamRef.current;
    const streamUrl = streamSettings.episode.stream.url;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      return;
    }

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      const proxySearchParams = new URLSearchParams();
      proxySearchParams.set("url", streamUrl);
      proxySearchParams.set(
        "headers",
        JSON.stringify({
          referrer: new URL(streamUrl).host,
          origin: "*",
        })
      );
      console.log(
        `https://m3u8proxy.riatsustreamingm3u8.workers.dev/v2?${proxySearchParams}`
      );
      hls.loadSource(
        `https://m3u8proxy.riatsustreamingm3u8.workers.dev/v2?${proxySearchParams}`
      );
      hls.attachMedia(video);
      hlsRef.current = hls;
    }
  }, [streamSettings.episode.stream?.url]);

  useEffect(() => {
    const getEpisodeInfo = async () => {
      if (streamSettings.episode.id) {
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
              episodeId: streamSettings.episode.id,
            }
          );
          setStreamSettings((prev) => ({
            ...prev,
            episode: {
              ...prev.episode,
              loadingStream: false,
              streams: streams?.sources || [],
              stream:
                streams?.sources[
                  Math.floor(Math.random() * streams?.sources.length)
                ] || null,
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

    getEpisodeInfo();
  }, [streamSettings.episode.id]);

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
          {/* Left sidebar - Episode list */}
          <div className="bg-base-200 rounded-lg w-72 overflow-hidden">
            <div className="bg-base-300 p-4">
              <div className="w-full join join-vertical">
                {episodeIdData.map((episodeId, episodeIndex) => (
                  <button
                    key={episodeIndex}
                    onClick={() => {
                      setStreamSettings((prev) => ({
                        ...prev,
                        episode: {
                          episodeIndex,
                          id: episodeId,
                        },
                      }));
                    }}
                    className={`justify-start btn join-item ${
                      episodeIndex === streamSettings.episode.episodeIndex
                        ? "btn-primary"
                        : "btn-ghost"
                    }`}
                  >
                    Episode {episodeIndex + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content - Video player */}
          <div className="flex-1">
            <div className="bg-base-200 rounded-lg w-full aspect-video">
              <div
                className={`flex justify-center ${
                  streamSettings.episode.loadingStream ? "" : "skeleton"
                } items-center w-full h-full`}
              >
                {streamSettings.episode.loadingStream ? (
                  <span className="loading loading-lg loading-spinner"></span>
                ) : (
                  <video
                    className="w-full h-full"
                    controls
                    playsInline
                    muted
                    preload="auto"
                    ref={videoStreamRef}
                  />
                )}
              </div>
            </div>

            {/* Video controls */}
            <div className="flex gap-2 mt-4">
              <button className="btn btn-primary">Previous</button>
              <button className="btn btn-primary">Next</button>
              <button className="btn">Add to List</button>
              <div className="flex-1"></div>
              <button className="btn">Watch2gether</button>
            </div>
          </div>

          {/* Right sidebar - Anime info */}
          <div className="bg-base-200 p-4 rounded-lg w-80">
            <img
              src={animeData.image}
              alt="Anime Cover"
              className="opacity-90 rounded-lg w-full h-48 object-cover"
            />
            <h2 className="mt-4 font-bold text-xl">{animeData.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {animeData.genres.slice(0, 4).map((genre) => (
                <span key={genre} className="badge badge-primary">
                  {genre}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm">
              <span
                dangerouslySetInnerHTML={{ __html: animeData.description }}
              ></span>
            </p>
            <div className="mt-4">
              <Link
                target="_blank"
                href={`https://anilist.co/anime/${animeData.id}/Bungou-Stray-Dogs-5th-Season`}
                className="w-full btn btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
