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
      <div className="flex flex-col gap-0">
        <div className="flex p-2">
          <p className="font-semibold text-xl">{props.title}</p>
        </div>
        <div className="flex px-6 p-2 w-full h-72">
          <div
            className="flex gap-20 w-full h-fit overflow-hidden"
            ref={scrollRef}
          >
            {props?.data?.map((cardInfo: IAnimeResult) => {
              return (
                <ContentCard
                  {...cardInfo}
                  cardType={props.type}
                  key={cardInfo.id}
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-3 p-2 h-[inherit]">
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
