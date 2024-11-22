import { VideoDisplayProps } from "@/types";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaTimeUpdateEventDetail,
  Poster,
  Track,
  QualitySlider,
  Controls,
  ToggleButton,
  Menu,
  Time,
  TimeSlider,
  Volume,
  PlayButton,
  MuteButton,
  FullscreenButton,
  CaptionButton,
  SeekButton,
  MenuButton,
  MenuItem,
  MenuPortal,
  Tooltip,
  VolumeSlider,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useRef } from "react";
import { 
  FaHeart, 
  FaThumbsDown, 
  FaThumbsUp,
  FaCog,
  FaBackward,
  FaForward
} from "react-icons/fa";

export default function VideoDisplay(props: VideoDisplayProps) {
  const { contentEnvironment, animeData } = props;
  const videoRef = useRef<MediaPlayerInstance | null>(null);

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
              {contentEnvironment.stream.subtitles.map((subtitle) => {
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
              })}
              
              <Controls.Root className="controls-root">
                {/* Time Slider */}
                <Controls.Group className="controls-group">
                  <TimeSlider.Root className="time-slider" />
                </Controls.Group>

                {/* Bottom Controls */}
                <Controls.Group className="bottom controls-group">
                  <PlayButton className="play-button" />
                  <SeekButton seconds={-10}>
                    <FaBackward className="w-4 h-4" />
                  </SeekButton>
                  <SeekButton seconds={10}>
                    <FaForward className="w-4 h-4" />
                  </SeekButton>
                  {/* <Volume> */}
                    {/* <MuteButton /> */}
                    {/* <VolumeSlider/> */}
                  {/* </Volume> */}
                  <Time className="time" />
                  
                  <div className="flex items-center gap-2 ml-auto">
                    {/* <Menu.Root> */}
                      {/* <MenuButton className="menu-button">
                        <FaCog className="w-4 h-4" />
                      </MenuButton> */}
                      {/* <MenuPortal> */}
                        {/* <Menu.Content className="menu-content"> */}
                          {/* <Menu.RadioGroup className="quality-radio-group"> */}
                            {/* <QualitySlider /> */}
                          {/* </Menu.RadioGroup> */}
                        {/* </Menu.Content> */}
                      {/* </MenuPortal> */}
                    {/* </Menu.Root> */}
                    <CaptionButton />
                    <FullscreenButton />
                  </div>
                </Controls.Group>
              </Controls.Root>

            </MediaPlayer>
          )}
        </div>
      </div>
    </>
  );
}