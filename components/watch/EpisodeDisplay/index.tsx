import { EpisodeDisplayProps } from "@/types";

export default function EpisodeDisplay(props: EpisodeDisplayProps) {
  const { episodesData, selectedEpisode, onEpisodeSelect } = props;
  if (!episodesData) return <></>;
  return (
    <>
      <div className="bg-base-200 rounded-lg w-full md:w-72 h-[40rem] md:h-screen overflow-hidden">
        <div className="bg-base-300 p-4 w-full h-full overflow-y-auto">
          <div className="w-full max-h-full join join-vertical">
            {episodesData.map((episodeData, episodeIndex) => (
              <button
                key={episodeIndex}
                onClick={() => onEpisodeSelect(episodeData, episodeIndex)}
                className={`justify-start btn join-item text-sm w-full ${
                  episodeIndex === selectedEpisode.episodeIndex
                    ? "btn-primary"
                    : "btn-ghost"
                } hover:btn-primary`}
              >
                <span className="text-center truncate">
                  {episodeIndex + 1}. {episodeData.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
