import { InfoDisplayProps } from "@/types";
import Link from "next/link";

export default function InfoDisplay(props: InfoDisplayProps) {
  const { animeData } = props;
  return (
    <>
      <div className="lg:block flex bg-base-200 p-4 rounded-lg w-full lg:w-80 h-none md:h-full">
        <div className="lg:flex-row flex-col w-full">
          <img
            src={animeData.image}
            alt="Anime Cover"
            className="opacity-90 rounded-lg w-full h-72 object-cover"
          />
          <h2 className="mt-4 font-bold text-xl">
            { /**@ts-ignore */}
            {animeData?.title!?.english! || animeData.title}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {animeData.genres.slice(0, 4).map((genre: string) => (
              <span key={genre} className="badge badge-primary">
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:flex-row flex-col p-4 lg:p-0 w-full h-full">
          <p className="mt-4 p-4 lg:p-1 text-sm">
            <span
              dangerouslySetInnerHTML={{ __html: animeData.description }}
            ></span>
          </p>
          <div className="mt-4">
            <Link
              target="_blank"
              href={`https://anilist.co/anime/${animeData.id}`}
              className="w-full btn btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
