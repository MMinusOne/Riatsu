import React, { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { VideoDisplayProps } from "@/types";
import colors from "@/constants/colors";

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

      customType: {
        m3u8: function (video: HTMLVideoElement, url: string) {
          if (Hls.isSupported()) {
            hls.loadSource(url);
            hls.attachMedia(video);

            // Handle quality switching
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
              const levels = hls.levels.map((level) => ({
                html: `${level.height}p`,
                value: level.height,
                default:
                  level.height === Math.min(...hls.levels.map((l) => l.height)),
              }));

              // Update the quality selector
              art.setting.update({
                name: "Quality",
                selector: levels,
              });
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
          color: colors.subtitles,
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
          onSelect: function (subtitle) {
            if (subtitle.value === "off") {
              art.subtitle.show = false;
              return "Off";
            } else {
              art.subtitle.show = true;
              art.subtitle.switch(subtitle.value);
              return subtitle.html;
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
          onSelect: (quality) => {
            const { value: height, html } = quality;
            const levelIndex = hls.levels.findIndex(
              (level) => level.height === height
            );
            hls.currentLevel = levelIndex;
            return html;
          },
        },
      ],
    });

    art.on("video:timeupdate", () => {
      handleTimeUpdate(art.currentTime);
    });

    playerRef.current = art;

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
