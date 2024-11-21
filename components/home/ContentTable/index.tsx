import NextImage from "next/image";
import {
  ISearch,
  IAnimeResult,
  IMangaResult,
  IMovieResult,
} from "@consumet/extensions";
import { FaArrowRight, FaArrowLeft, FaLine } from "react-icons/fa";
import { useRef } from "react";
import { ContentCard } from "../../misc/ContentCard/ContentCard";

export default function ContentTable(props: {
  title: string;
  type: "anime" | "movie" | "manga";
  data: IAnimeResult[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "right" ? 200 : -200; // Adjust scroll amount as needed
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-0 h-96">
        <div className="flex items-start p-2 w-full">
          <p className="font-semibold text-xl md:text-2xl">{props.title}</p>
        </div>
        <div className="flex justify-center items-center px-1 md:px-6 p-2 w-full h-full md:h-80">
          <div
            className="flex gap-20 w-full h-full md:h-fit overflow-hidden"
            ref={scrollRef}
          >
            {props?.data?.map((cardInfo: IAnimeResult) => {
              return (
               <div className="flex justify-center items-center h-full">
                 <ContentCard
                  {...cardInfo}
                  cardType={props.type}
                  key={cardInfo.id}
                />
               </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-3 py-4 p-2 h-full">
            <button
              className="h-1/2 btn btn-square"
              onClick={() => scroll("right")}
            >
              <FaArrowRight />
            </button>
            <button
              className="h-1/2 btn btn-square"
              onClick={() => scroll("left")}
            >
              <FaArrowLeft />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
