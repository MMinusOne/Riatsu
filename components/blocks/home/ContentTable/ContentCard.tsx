import { IAnimeResult } from "@consumet/extensions";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ContentCard(props: IAnimeResult) {
  if (!props.image) return <></>;
  const [cardImageLoaded, setCardImageLoaded] = useState(false);

  return (
    <>
      <Link
        className="relative flex flex-col w-[105px] sm:w-[135px] md:w-[155px] xl:w-[175px] h-full hover:cursor-pointer group"
        href={`/wiki/${props.cardType}/${props.id}`}
      >
        <div className="relative rounded-xl xl:rounded-2xl w-[105px] sm:w-[135px] md:w-[155px] xl:w-[175px] h-[160px] sm:h-[190px] md:h-[230px] xl:h-[255px] overflow-hidden">
          <div
            className={`flex-shrink-0 bg-[#1e1e24] shadow-[4px_0px_5px_0px_rgba(0,0,0,0.3)] rounded-xl xl:rounded-2xl w-full h-full overflow-hidden group ${
              cardImageLoaded ? null : "skeleton"
            }`}
          >
            <NextImage
              unoptimized
              src={props?.image}
              alt={
                //@ts-ignore
                props?.title!?.userPreferred! ||
                props?.id?.toString() ||
                "Image"
              }
              fill
              className="group-hover:scale-105 opacity-90 rounded-[inherit] transition-transform duration-300 overflow-hidden object-cover"
              onLoad={() => {
                setCardImageLoaded(true);
              }}
              style={{ display: cardImageLoaded ? "block" : "hidden" }}
            />
          </div>
        </div>
        <div className="w-full h-10">
          <p className="inline-block w-full h-full font-semibold text-center truncate whitespace-nowrap">
            {/**@ts-ignore */}
            {props?.title!?.userPreferred! || props.title}
          </p>
        </div>
      </Link>
    </>
  );
}
