import { InfoDisplayProps } from "@/types";
import Link from "next/link";

export default function InfoDisplay(props: InfoDisplayProps) {
  const { animeData } = props;
  return (
    <>
      <div className="bg-base-200 p-4 rounded-lg w-80">
        <img
          src={animeData.image}
          alt="Anime Cover"
          className="opacity-90 rounded-lg w-full h-72 object-cover"
        />
        <h2 className="mt-4 font-bold text-xl">
          {animeData?.title!?.english! || animeData.title}
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {animeData.genres.slice(0, 4).map((genre: string) => (
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
            href={`https://anilist.co/anime/${animeData.id}`}
            className="w-full btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}
