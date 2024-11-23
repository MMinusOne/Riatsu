import React, { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { VideoDisplayProps } from "@/types";

export default function VideoDisplay(props: VideoDisplayProps) {
  const { contentEnvironment, animeData } = props;
  const artRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Artplayer | null>(null);

  useEffect(() => {
    if (!artRef.current || !contentEnvironment.stream.proxiedStream) return;

    // Handle intro/outro skip
    const handleTimeUpdate = (currentTime: number) => {
      if (!contentEnvironment.stream.meta || !playerRef.current) return;

      const { intro, outro } = contentEnvironment.stream.meta;

      if (
        intro &&
        currentTime >= intro.start &&
        currentTime < intro.end &&
        contentEnvironment?.videoControls?.autoSkipIntro
      ) {
        playerRef.current.currentTime = intro.end;
      }

      if (
        outro &&
        currentTime >= outro.start &&
        currentTime < outro.end &&
        contentEnvironment?.videoControls?.autoSkipOutro
      ) {
        playerRef.current.currentTime = outro.end;
      }
    };

    // Configure subtitles
    const subtitles = contentEnvironment.stream.subtitles.map((subtitle) => ({
      default: false,
      url: `/api/content/vtt?url=${encodeURIComponent(subtitle.url || "")}`,
      lang: subtitle.lang,
      html: subtitle.lang,
    }));

    const hls = new Hls();
    // Initialize ArtPlayer
    const art = new Artplayer({
      container: artRef.current,
      url: contentEnvironment.stream.proxiedStream,
      type: "m3u8",
      title: contentEnvironment.episode.meta?.title,
      poster: animeData.cover,
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoSize: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#23ade5",
      lang: navigator.language.toLowerCase(),
      whitelist: ["*"],

      customType: {
        m3u8: function (video: HTMLVideoElement, url: string) {
          if (Hls.isSupported()) {
            hls.loadSource(url);
            hls.attachMedia(video);

            // Handle quality switching
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
              console.log(hls.levels);
              const levels = hls.levels.map((level) => ({
                html: `${level.height}p`,
                value: level.height,
              }));

              // Update the quality selector
              art.setting.update({
                name: "Quality",
                selector: levels,
              });

              // Set default quality to highest
              const defaultQuality = Math.max(
                ...hls.levels.map((l) => l.height)
              );
              art.setting.value("Quality", defaultQuality);
            });

            // Handle quality changes

            art.on("destroy", () => {
              hls.destroy();
            });
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          }
        },
      },

      subtitle: {
        type: "vtt",
        style: {
          color: "#fff",
          fontSize: "20px",
        },
        encoding: "utf-8",
      },

      settings: [
        {
          name: "subtitle",
          type: "selector",
          width: 200,
          html: "Subtitles",
          tooltip: "Select Subtitles",
          selector: [
            {
              html: "Off",
              value: "off",
            },
            ...subtitles.map((subtitle) => ({
              html: subtitle.html,
              value: subtitle.url,
            })),
          ],
          onSelect: function (item) {
            if (item.value === "off") {
              art.subtitle.show = false;
            } else {
              art.subtitle.show = true;
              console.log(item);
              art.subtitle.switch(item.value);
            }
          },
        },
        {
          name: "Quality",
          type: "selector",
          width: 200,
          html: "Quality",
          tooltip: "Select Quality",
          selector: [], // This will be populated when HLS manifest is parsed
          onSelect: (name) => {
            console.log(name);
            const { value: height } = name;
            const levelIndex = hls.levels.findIndex(
              (level) => level.height === height
            );
            hls.currentLevel = levelIndex;
          },
        },
      ],
    });

    // Add subtitle switching control
    // Add time update listener for intro/outro skipping
    art.on("video:timeupdate", () => {
      handleTimeUpdate(art.currentTime);
    });

    playerRef.current = art;

    // Cleanup
    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [
    contentEnvironment.stream.proxiedStream,
    contentEnvironment.stream.subtitles,
    animeData.cover,
  ]);

  return (
    <div className="bg-base-200 rounded-lg w-full aspect-video">
      <div
        className={`flex justify-center ${
          contentEnvironment.stream.loadingStream ? "skeleton" : ""
        } items-center w-full h-full`}
      >
        {contentEnvironment.stream.loadingStream &&
        !contentEnvironment.stream.proxiedStream &&
        !contentEnvironment.episode.meta ? (
          <span className="loading loading-lg loading-spinner"></span>
        ) : (
          <div ref={artRef} className="w-full h-full" />
        )}
      </div>
    </div>
  );
}
