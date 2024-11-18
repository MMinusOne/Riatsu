import { VideoDisplayProps } from "@/types";
import {
  MediaPlayer,
  MediaProvider,
  MediaTimeUpdateEventDetail,
  Track,
} from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";

export default function VideoDisplay(props: VideoDisplayProps) {
  const { contentEnvironment, animeData } = props;

  const handleTimeUpdate = (player: MediaTimeUpdateEventDetail) => {
    if (!player || !contentEnvironment.stream.meta) return;

    const currentTime = player.currentTime;
    const { intro } = contentEnvironment.stream.meta;
    const { outro } = contentEnvironment.stream.meta;

    if (
      intro &&
      currentTime >= intro.start &&
      currentTime < intro.end &&
      contentEnvironment?.videoControls?.autoSkipIntro
    ) {
      player.currentTime = intro.end;
    }

    if (
      outro &&
      currentTime >= outro.start &&
      currentTime < outro.end &&
      contentEnvironment?.videoControls?.autoSkipOutro
    ) {
      player.currentTime = outro.end;
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
              src={contentEnvironment?.stream?.proxiedStream || ""}
            >
              <MediaProvider />
              <Track
                src={contentEnvironment?.stream?.subtitles?.at(0)?.url}
                kind="subtitles"
                label={contentEnvironment?.stream?.subtitles?.at(0)?.lang}
                default
              />
            </MediaPlayer>
          )}
        </div>
      </div>
    </>
  );
}
