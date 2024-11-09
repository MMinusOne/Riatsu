import NextImage from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaStar } from 'react-icons/fa';

interface AnimeEntry {
  title: string;
  episodes: number;
  rating: number;
  currentEpisode?: number;
  type: 'TV' | 'Movie' | 'ONA';
  imageUrl: string;
  link: string;
}

interface AnimeMapProps {
  sectionTitle: string;
  animeList: AnimeEntry[];
  showViewMore?: boolean;
}

const AnimeMap: FC<AnimeMapProps> = ({ sectionTitle, animeList }) => {
  return (
    <div className="p-20 anime-section">
      <h2 className="mb-4 font-semibold text-pink-300 text-xl">{sectionTitle}</h2>
      
      <div className="gap-4 grid">
        {animeList.map((anime, index) => (
          <Link href={anime.link} key={index} className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded">
            <div className="relative w-16 h-24">
              <NextImage
                src={anime.imageUrl}
                alt={anime.title}
                fill
                className="rounded object-cover"
              />
            </div>
            
            <div className="flex flex-col flex-1">
              <h3 className="font-medium text-white">{anime.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-green-800 px-2 py-0.5 rounded text-sm">
                  ▶ {anime.episodes}
                </span>
                <span className="bg-blue-800 px-2 py-0.5 rounded text-sm">
                  <FaStar /> {anime.rating}
                </span>
                {anime.currentEpisode && (
                  <span className="text-gray-400 text-sm">
                    {anime.currentEpisode}
                  </span>
                )}
                <span className="text-gray-400 text-sm">• {anime.type}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeMap;