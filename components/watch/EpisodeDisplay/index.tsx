export default function EpisodeDisplay(props) {
  const { episodesData, selectedEpisode } = props;
  if (!episodesData) return <></>;
  return (
    <>
      <div className="bg-base-200 rounded-lg w-72 h-screen">
        <div className="bg-base-300 p-4 h-full">
          <div className="w-full max-h-full overflow-hidden overflow-y-scroll join join-vertical">
            {episodesData.map((episodeData, episodeIndex) => (
              <button
                key={episodeIndex}
                onClick={() => props.onEpisodeSelect(episodeData, episodeIndex)}
                className={`justify-start btn join-item truncate text-sm ${
                  episodeIndex === selectedEpisode.episodeIndex
                    ? "btn-primary"
                    : "btn-ghost"
                }`}
              >
                {episodeData.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
