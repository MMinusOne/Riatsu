import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";

export default function VideoDisplay(props) {
  const { streamSettings } = props;

  if (!streamSettings) return <></>;

  const handleTimeUpdate = (player) => {
    if (!player) return;

    const currentTime = player.currentTime;
    const intro = streamSettings?.episode?.streamMeta?.intro;
    const outro = streamSettings?.episode?.streamMeta?.outro;

    if (
      intro &&
      currentTime >= intro.start &&
      currentTime < intro.end &&
      streamSettings?.videoControls?.autoSkipIntro
    ) {
      player.currentTime = intro.end;
    }

    if (
      outro &&
      currentTime >= outro.start &&
      currentTime < outro.end &&
      streamSettings?.videoControls?.autoSkipOutro
    ) {
      player.currentTime = outro.end;
    }
  };

  return (
    <>
      <div className="bg-base-200 rounded-lg w-full aspect-video">
        <div
          className={`flex justify-center ${
            streamSettings.episode.loadingStream ? "" : "skeleton"
          } items-center w-full h-full`}
        >
          {streamSettings.episode.loadingStream &&
          !streamSettings?.episode?.proxiedStream ? (
            <span className="loading loading-lg loading-spinner"></span>
          ) : (
            <MediaPlayer
              title={streamSettings?.episode?.title}
              poster={streamSettings?.episode?.meta?.image}
              controls
              playsInline
              onTimeUpdate={handleTimeUpdate}
              src={streamSettings?.episode?.proxiedStream || ""}
            >
              <MediaProvider />
              <Track
                src={streamSettings?.episode?.subtitles?.at(0)?.url}
                kind="subtitles"
                label="English"
                lang="en-US"
                default
              />
            </MediaPlayer>
          )}
        </div>
      </div>
    </>
  );
}
