import { IAnimeResult } from "@consumet/extensions";
import { FaArrowRight, FaArrowLeft, FaLine } from "react-icons/fa";
import { useRef } from "react";
import ContentCard from "../ContentCard";

export default function ContentTable(props: {
  title: string;
  type: "anime" | "movie" | "manga";
  data: IAnimeResult[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "right" ? 300 : -300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        
        <div className="flex items-start p-2 w-full">
          <p className="font-semibold text-xl md:text-2xl">{props.title}</p>
        </div>

        <div className="flex justify-center items-center gap-1 px-1 md:px-6 p-2 w-full h-full">

          <div
            className="flex gap-20 w-full h-full overflow-hidden overflow-x-scroll md:overflow-x-hidden"
            ref={scrollRef}
          >
            {props?.data?.map((cardInfo: IAnimeResult, cardIndex) => {
              return (
                <div
                  className="flex justify-center items-center h-[22rem]"
                  key={cardInfo.id}
                >
                  <ContentCard
                    {...cardInfo}
                    cardIndex={cardIndex}
                    cardType={props.type}
                  />
                </div>
              );
            })}
          </div>

          <div className="md:flex flex-col items-center gap-3 hidden py-4 p-2 h-full">
            <button
              className="h-32 btn btn-square"
              onClick={() => scroll("right")}
            >
              <FaArrowRight />
            </button>
            <button
              className="h-32 btn btn-square"
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
