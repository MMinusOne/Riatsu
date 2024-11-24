import { IAnimeResult } from "@consumet/extensions";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContentCard(props: IAnimeResult) {
  if (!props.image) return <></>;
  console.log(props);
  const [cardImageLoaded, setCardImageLoaded] = useState(false);

  return (
    <>
      <Link
        href={`/watch/anime/${props.id}`}
        className="flex bg-base-200 opacity-90 rounded-md w-64 h-72 overflow-hidden"
      >
        <div className="z-50 flex flex-col justify-end items-center gap-4 w-1/5 h-full">
          <p
            style={{ transform: "rotate(-90deg)" }}
            className="w-full font-semibold text-center text-lg whitespace-nowrap"
          >
            { /**@ts-ignore */}
            {props.title}
          </p>
          <div className="flex justify-center items-center opacity-90 w-full font-bold text-primary text-xl aspect-square">
            {props.cardIndex+1 < 10 ? `0${props.cardIndex+1}` : props.cardIndex+1}
          </div>
        </div>

        <div className="z-0 w-4/5 h-full overflow-hidden">
          <NextImage
            unoptimized
            src={props.image}
            alt={"Anime Card"}
            height={1000}
            width={1000}
            className="z-0 w-full h-full transition-transform duration-300 overflow-hidden hover:scale-110"
          />
        </div>
      </Link>
    </>
  );
}
