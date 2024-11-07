import Image from "next/image";
import { ISearch, IAnimeResult } from "@consumet/extensions";
import { FaArrowRight, FaArrowLeft, FaLine } from "react-icons/fa";
import { useRef } from "react";

export default function AnimeTable(props: {
  title: string;
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
      <div className="flex flex-col gap-2 b">
        <div className="flex p-4">
          <p className="font-semibold text-xl">{props.title}</p>
        </div>
        <div className="flex p-4 w-full h-72">
          <div
            className="flex gap-20 w-full h-fit overflow-hidden"
            ref={scrollRef}
          >
            {props?.data.map((card) => {
              return <Card {...card} key={card.id} />;
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

function Card(props: IAnimeResult) {
  if (!props.image) return <></>;
  return (
    <>
      <a
        className="relative flex flex-col w-[105px] sm:w-[135px] md:w-[155px] xl:w-[175px] h-full hover:cursor-pointer group"
        href="/"
      >
        <div className="relative rounded-xl xl:rounded-2xl w-[105px] sm:w-[135px] md:w-[155px] xl:w-[175px] h-[160px] sm:h-[190px] md:h-[230px] xl:h-[255px]">
          <div className="flex-shrink-0 bg-[#1e1e24] shadow-[4px_0px_5px_0px_rgba(0,0,0,0.3)] rounded-xl xl:rounded-2xl w-full h-full overflow-hidden group">
            <Image
              src={props?.image}
              alt={
                //@ts-ignore
                props?.title!?.userPreferred! ||
                props?.id?.toString() ||
                "Image"
              }
              width={375}
              height={230}
              className="group-hover:scale-110 opacity-90 transition-transform duration-300 object-cover scale-105"
            />
          </div>
        </div>
        <div className="w-full h-20">
          <p className="inline-block w-full h-full font-semibold text-center truncate whitespace-nowrap">
            {/**@ts-ignore */}
            {props?.title!?.userPreferred!}
          </p>
        </div>
      </a>
    </>
  );
}
