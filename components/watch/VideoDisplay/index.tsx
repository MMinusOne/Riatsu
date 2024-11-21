import { VideoDisplayProps } from "@/types";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaTimeUpdateEventDetail,
  Track,
} from "@vidstack/react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { useRef } from "react";

export default function VideoDisplay(props: VideoDisplayProps) {
  const { contentEnvironment, animeData } = props;
  const videoRef = useRef<MediaPlayerInstance | null>(null); // Changed to allow null

  const handleTimeUpdate = (player: MediaTimeUpdateEventDetail) => {
    if (!player || !contentEnvironment.stream.meta || !videoRef.current) return;

    const currentTime = player.currentTime;
    const { intro } = contentEnvironment.stream.meta;
    const { outro } = contentEnvironment.stream.meta;

    if (
      intro &&
      currentTime >= intro.start &&
      currentTime < intro.end &&
      contentEnvironment?.videoControls?.autoSkipIntro
    ) {
      videoRef.current.currentTime = intro.end;
    }

    if (
      outro &&
      currentTime >= outro.start &&
      currentTime < outro.end &&
      contentEnvironment?.videoControls?.autoSkipOutro
    ) {
      videoRef.current.currentTime = outro.end;
    }
  };

  return (
    <>
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
            <MediaPlayer
              title={contentEnvironment.episode.meta?.title}
              poster={animeData.cover}
              controls
              playsInline
              onTimeUpdate={handleTimeUpdate}
              streamType="on-demand"
              viewType="video"
              src={contentEnvironment?.stream?.proxiedStream || ""}
              ref={videoRef}
            >
              <MediaProvider />

              {contentEnvironment.stream.subtitles.map(
                (subtitle) => {
                  return (
                    <Track
                      key={subtitle.lang}
                      src={`/api/content/vtt?url=${encodeURIComponent(
                        subtitle?.url || ""
                      )}`}
                      kind="subtitles"
                      language={subtitle.lang}
                      label={subtitle.lang}
                      default={false} 
                    />
                  );
                }
              )}
            </MediaPlayer>
          )}
        </div>
      </div>
    </>
  );
}
